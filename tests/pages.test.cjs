'use strict';

const {test}=require('node:test'),Assert=require('node:assert/strict');
const Fs=require('node:fs'),Path=require('node:path');
const ROOT=Path.resolve(__dirname,'..'),pages=require('../tools/pages.cjs');
const read=file=>Fs.readFileSync(Path.join(ROOT,file),'utf8');
const built=pages.build();
const htmlFiles=Object.keys(built).filter(file=>file.endsWith('.html'));

test('generated pages and sitemap match their Markdown sources',()=>{
 for(const [file,content] of Object.entries(built))Assert.equal(read(file),content,'Stale '+file+': run npm run generate');
});

test('every document has a page in both languages',()=>{
 const sources=new Set();
 for(const doc of pages.DOCS)for(const lang of ['en','es'])sources.add(doc[lang].src);
 for(const dir of ['docs','docs/es'])for(const name of Fs.readdirSync(Path.join(ROOT,dir)).filter(n=>n.endsWith('.md')&&n!=='ai.md'))Assert(sources.has(dir+'/'+name),'No page for '+dir+'/'+name);
 for(const source of sources)Assert(Fs.existsSync(Path.join(ROOT,source)),'Missing source '+source);
 Assert.equal(htmlFiles.length,pages.DOCS.length*2);
});

test('local links and assets in generated pages exist',()=>{
 for(const file of htmlFiles){
  const html=built[file];
  for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
   const target=match[1];
   if(/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(target))continue;
   const resolved=Path.resolve(ROOT,Path.dirname(file),target.split('#')[0]);
   Assert(resolved.startsWith(ROOT),'Link escapes the site in '+file+': '+target);
   Assert(Fs.existsSync(resolved)&&(Fs.statSync(resolved).isFile()||Fs.existsSync(Path.join(resolved,'index.html'))),'Broken link in '+file+': '+target);
  }
 }
});

test('language alternates are absolute, reciprocal and canonical',()=>{
 for(const doc of pages.DOCS){
  const en=built[doc.en.url+'index.html'],es=built[doc.es.url+'index.html'];
  for(const html of [en,es]){
   Assert(html.includes('hreflang="en" href="'+pages.SITE+doc.en.url+'"'));
   Assert(html.includes('hreflang="es" href="'+pages.SITE+doc.es.url+'"'));
   Assert(html.includes('hreflang="x-default" href="'+pages.SITE+doc.en.url+'"'));
  }
  Assert(en.includes('<link rel="canonical" href="'+pages.SITE+doc.en.url+'">'));
  Assert(es.includes('<link rel="canonical" href="'+pages.SITE+doc.es.url+'">'));
  Assert(en.includes('<html lang="en"')&&es.includes('<html lang="es"'));
  for(const html of [en,es])Assert(/<h1>[^<]+<\/h1>/.test(html)&&/<meta name="description" content="[^"]{40,}">/.test(html)&&html.includes('application/ld+json'));
 }
});

test('the sitemap lists the home pages and every documentation page',()=>{
 const sitemap=built['sitemap.xml'];
 for(const url of ['',' es/'.trim(),...pages.DOCS.flatMap(doc=>[doc.en.url,doc.es.url])])Assert(sitemap.includes('<loc>'+pages.SITE+url+'</loc>'),'Missing in sitemap: '+url);
});

test('no Markdown syntax or escaped markup leaks into the pages',()=>{
 for(const file of htmlFiles){
  const body=built[file].replace(/<div class="code-block">[\s\S]*?<\/div>/g,'').replace(/<script[\s\S]*?<\/script>/g,'');
  Assert(!/\]\(/.test(body)&&!/\*\*/.test(body)&&!/&lt;br&gt;/.test(body)&&!/%TABLE%/.test(body),'Markdown leaked into '+file);
 }
});

test('the converter handles tables, code, links and emphasis',()=>{
 const md='# Title\n\nIntro with **bold**, *italic*, `code` and [a doc](docs/poses.md).\n\n| A | B |\n| --- | --- |\n| 1 | `two` |\n\n```html\n<b>x</b>\n```\n\n- one\n- two\n\n1. first\n2. second\n\nSee **https://www.totaljs.com**.\n';
 const out=pages.markdown(md,'story/','README.md');
 Assert.equal(out.title,'Title');
 Assert(out.html.includes('<strong>bold</strong>')&&out.html.includes('<em>italic</em>')&&out.html.includes('<code>code</code>'));
 Assert(out.html.includes('href="../poses/"'));
 Assert(out.html.includes('<th scope="col">A</th>')&&out.html.includes('<td><code>two</code></td>'));
 Assert(out.html.includes('&lt;b&gt;x&lt;/b&gt;'));
 Assert(out.html.includes('<ul><li>one</li><li>two</li></ul>')&&out.html.includes('<ol><li>first</li><li>second</li></ol>'));
 Assert(out.html.includes('<strong><a href="https://www.totaljs.com" rel="noopener">https://www.totaljs.com</a></strong>'));
 Assert.equal(pages.rewrite('../assets/brand/og.jpg','docs/story.md','story/'),'../assets/brand/og.jpg');
 Assert.equal(pages.rewrite('../AGENTS.md','docs/ai.md','story/'),'https://github.com/totaljs-es/toto/blob/main/AGENTS.md');
 Assert.equal(pages.rewrite('https://example.com/x','docs/story.md','story/'),'https://example.com/x');
});
