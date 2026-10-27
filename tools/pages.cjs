'use strict';
// Builds the documentation pages of the website from the Markdown sources.
// Usage: node tools/pages.cjs --write   (npm run generate calls it)
const Fs=require('node:fs'),Path=require('node:path');
const ROOT=Path.resolve(__dirname,'..');
const SITE='https://totaljs-es.github.io/toto/';
const GITHUB='https://github.com/totaljs-es/toto/blob/main/';
const read=file=>Fs.readFileSync(Path.join(ROOT,file),'utf8').replace(/\r\n/g,'\n');

// One entry per document: source Markdown and published page, per language.
const DOCS=[
 {id:'story',en:{src:'docs/story.md',url:'story/',nav:'Story'},es:{src:'docs/es/historia.md',url:'es/historia/',nav:'Historia'}},
 {id:'identity',en:{src:'docs/identity.md',url:'identity/',nav:'Identity'},es:{src:'docs/es/identidad.md',url:'es/identidad/',nav:'Identidad'}},
 {id:'poses',en:{src:'docs/poses.md',url:'poses/',nav:'Poses'},es:{src:'docs/es/poses.md',url:'es/poses/',nav:'Poses'}},
 {id:'favicon',en:{src:'docs/favicon.md',url:'favicon/',nav:'Favicons'},es:{src:'docs/es/favicon.md',url:'es/favicon/',nav:'Favicons'}},
 {id:'trademark',en:{src:'docs/trademark.md',url:'trademark/',nav:'Trademark'},es:{src:'docs/es/marca.md',url:'es/marca/',nav:'Marca'}},
 {id:'license',en:{src:'LICENSE.md',url:'license/',nav:'License',desc:'Toto is free for the Total.js community, with one condition: show clearly that your app, website or service was built with Total.js, with a link to totaljs.com or totaljs.es.'},es:{src:'LICENSE.es.md',url:'es/licencia/',nav:'Licencia',desc:'Toto es libre para la comunidad Total.js, con una condición: indica con claridad que tu app, web o servicio está creado con Total.js, con un enlace a totaljs.com o a totaljs.es.'}}
];
const HOME={en:'',es:'es/'};
const STRINGS={
 en:{lang:'en',locale:'en_GB',altLocale:'es_ES',home:'Home',skip:'Skip to content',main:'Main',docs:'Documentation',toc:'On this page',switchLabel:'Español',switchLang:'es',
  copy:'Copy',copied:'Copied',source:'Edit this page on GitHub',agents:'For AI agents',trademark:'Toto™ · Mark of Spanish Total.js · OEPM M4411785',licenseNav:'Limited-use license',
  eyebrow:'Toto · Documentation',table:'Table',footerLang:'Versión en español ↗',tagline:'Toto, official mascot of Spanish Total.js.'},
 es:{lang:'es',locale:'es_ES',altLocale:'en_GB',home:'Inicio',skip:'Saltar al contenido',main:'Principal',docs:'Documentación',toc:'En esta página',switchLabel:'English',switchLang:'en',
  copy:'Copiar',copied:'Copiado',source:'Editar esta página en GitHub',agents:'Para agentes de IA',trademark:'Toto™ · Marca de Spanish Total.js · OEPM M4411785',licenseNav:'Licencia de uso limitado',
  eyebrow:'Toto · Documentación',table:'Tabla',footerLang:'English version ↗',tagline:'Toto, mascota oficial de Spanish Total.js.'}
};

const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const slug=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const plain=s=>s.replace(/<br>/g,' ').replace(/!?\[([^\]]*)\]\([^)]*\)/g,'$1').replace(/[*`_]/g,'').replace(/\s+/g,' ').trim();

// Maps every Markdown source to its page so links between documents become site links.
const pageBySource=new Map();
for(const doc of DOCS)for(const lang of ['en','es'])pageBySource.set(doc[lang].src,{doc,lang,url:doc[lang].url});

function relative(fromUrl,toPath){
 const from=Path.posix.dirname(fromUrl.endsWith('/')?fromUrl+'index.html':fromUrl);
 const rel=Path.posix.relative(from===''?'.':from,toPath)||'.';
 return rel.endsWith('/')||toPath.endsWith('/')?(rel.endsWith('/')?rel:rel+'/'):rel;
}
function rewrite(target,source,pageUrl){
 if(/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(target))return target;
 const [file,hash]=target.split('#'),resolved=Path.posix.normalize(Path.posix.join(Path.posix.dirname(source),file));
 const suffix=hash?'#'+hash:'';
 if(pageBySource.has(resolved))return relative(pageUrl,pageBySource.get(resolved).url)+suffix;
 if(resolved.startsWith('assets/'))return relative(pageUrl,resolved)+suffix;
 return GITHUB+resolved+suffix;
}

function inline(text,source,pageUrl){
 const holds=[],hold=html=>{holds.push(html);return '\u0000'+(holds.length-1)+'\u0000';};
 let s=text.replace(/`([^`]+)`/g,(m,code)=>hold('<code>'+esc(code)+'</code>'));
 s=s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(m,label,target)=>{
  const href=rewrite(target,source,pageUrl),external=/^https?:/i.test(href);
  return hold('<a href="'+esc(href)+'"'+(external?' rel="noopener"':'')+'>'+label+'</a>');
 });
 s=s.replace(/(^|[\s(*])(https?:\/\/[^\s)<*]+)/g,(m,lead,url)=>lead+hold('<a href="'+esc(url)+'" rel="noopener">'+esc(url)+'</a>'));
 s=esc(s).replace(/&lt;br&gt;/g,'<br>');
 s=s.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/(^|[^*])\*([^*\s][^*]*)\*/g,'$1<em>$2</em>');
 // Link labels were kept raw above so emphasis inside them is still processed.
 return s.replace(/\u0000(\d+)\u0000/g,(m,i)=>{
  const html=holds[+i];return html.replace(/>([^<]+)<\/a>$/,(mm,label)=>'>'+esc(label).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/(^|[^*])\*([^*\s][^*]*)\*/g,'$1<em>$2</em>')+'</a>');
 });
}

function markdown(source,pageUrl,srcFile){
 const lines=source.split('\n'),out=[],headings=[];let i=0,title='',description='';
 const il=t=>inline(t,srcFile,pageUrl);
 while(i<lines.length){
  const line=lines[i];
  if(!line.trim()){i++;continue;}
  let m;
  if((m=/^```(\w*)\s*$/.exec(line))){
   const code=[];i++;while(i<lines.length&&!/^```\s*$/.test(lines[i]))code.push(lines[i++]);i++;
   out.push('<div class="code-block"><pre><code'+(m[1]?' class="language-'+m[1]+'"':'')+'>'+esc(code.join('\n'))+'</code></pre></div>');continue;
  }
  if((m=/^(#{1,4})\s+(.+)$/.exec(line))){
   const level=m[1].length,text=m[2].trim();i++;
   if(level===1&&!title){title=plain(text);continue;}
   const id=slug(plain(text));if(level===2)headings.push({id,text:plain(text)});
   out.push('<h'+level+' id="'+id+'">'+il(text)+'</h'+level+'>');continue;
  }
  if(/^---+\s*$/.test(line)){out.push('<hr>');i++;continue;}
  if(/^\|.+\|\s*$/.test(line)&&i+1<lines.length&&/^\|[\s:|-]+\|\s*$/.test(lines[i+1])){
   const cells=row=>row.trim().replace(/^\||\|$/g,'').split('|').map(c=>c.trim());
   const head=cells(line);i+=2;const rows=[];while(i<lines.length&&/^\|.+\|\s*$/.test(lines[i]))rows.push(cells(lines[i++]));
   out.push('<div class="table-wrap" tabindex="0" role="region" aria-label="%TABLE%"><table><thead><tr>'+head.map(c=>'<th scope="col">'+il(c)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+r.map(c=>'<td>'+il(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>');continue;
  }
  if(/^>\s?/.test(line)){const q=[];while(i<lines.length&&/^>\s?/.test(lines[i]))q.push(lines[i++].replace(/^>\s?/,''));out.push('<blockquote><p>'+il(q.join(' '))+'</p></blockquote>');continue;}
  if(/^\s*([-*]|\d+\.)\s+/.test(line)){
   const ordered=/^\s*\d+\./.test(line),items=[];
   while(i<lines.length&&/^\s*([-*]|\d+\.)\s+/.test(lines[i])){let item=lines[i++].replace(/^\s*([-*]|\d+\.)\s+/,'');while(i<lines.length&&/^\s{2,}\S/.test(lines[i]))item+=' '+lines[i++].trim();items.push(item);}
   out.push('<'+(ordered?'ol':'ul')+'>'+items.map(t=>'<li>'+il(t)+'</li>').join('')+'</'+(ordered?'ol':'ul')+'>');continue;
  }
  const para=[];while(i<lines.length&&lines[i].trim()&&!/^(#{1,4}\s|```|---+\s*$|>\s?|\|.+\|\s*$|\s*([-*]|\d+\.)\s+)/.test(lines[i]))para.push(lines[i++]);
  const text=para.join(' ').replace(/<br> /g,'<br>');
  if(description.length<60)description=(description+' '+plain(text)).trim();
  out.push('<p>'+il(text)+'</p>');
 }
 return {title,description,headings,html:out.join('\n')};
}

function trimDescription(text,max=158){
 if(text.length<=max)return text;
 const cut=text.slice(0,max).replace(/\s+\S*$/,'');return cut.replace(/[.,;:·—-]+$/,'')+'…';
}

function pageHtml(doc,lang){
 const t=STRINGS[lang],entry=doc[lang],other=doc[t.switchLang==='es'?'es':'en'],otherLang=t.switchLang;
 const {title,description,headings,html}=markdown(read(entry.src),entry.url,entry.src);
 const depth=entry.url.split('/').filter(Boolean).length,root='../'.repeat(depth);
 let body=html.replace(/%TABLE%/g,t.table);
 // The header already offers the language switch, so a trailing "other language" link would be redundant.
 body=body.replace(/\n<p><a href="[^"]*"[^>]*>(?:Versión en español|English version)<\/a><\/p>$/,'');
 const url=SITE+entry.url,enUrl=SITE+doc.en.url,esUrl=SITE+doc.es.url,otherUrl=relative(entry.url,other.url);
 const desc=trimDescription(entry.desc||description),fullTitle=title+' · Toto';
 const homeUrl=SITE+HOME[lang],homeHref=lang==='en'?root:('../'.repeat(depth-1)||'./');
 const nav=DOCS.map(d=>'<a href="'+relative(entry.url,d[lang].url)+'"'+(d.id===doc.id?' aria-current="page"':'')+'>'+d[lang].nav+'</a>').join('');
 const toc=headings.length>=3?'<nav class="toc" aria-label="'+t.toc+'"><p>'+t.toc+'</p><ol>'+headings.map(h=>'<li><a href="#'+h.id+'">'+esc(h.text)+'</a></li>').join('')+'</ol></nav>':'';
 const graph={"@context":"https://schema.org","@graph":[
  {"@type":"WebPage","@id":url+'#webpage',"url":url,"name":fullTitle,"description":desc,"inLanguage":lang,"isPartOf":{"@id":SITE+'#website'},"about":{"@id":SITE+'#toto'},"publisher":{"@id":'https://www.totaljs.es/#organization'}},
  {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Toto","item":homeUrl},{"@type":"ListItem","position":2,"name":title,"item":url}]}
 ]};
 const licenseUrl=SITE+(lang==='en'?'license/':'es/licencia/');
 return `<!doctype html>
<html lang="${lang}" data-root="${root}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index, follow, max-image-preview:large"><meta name="author" content="Spanish Total.js"><meta name="theme-color" content="#fff9f2">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${enUrl}"><link rel="alternate" hreflang="es" href="${esUrl}"><link rel="alternate" hreflang="x-default" href="${enUrl}">
<meta property="og:type" content="article"><meta property="og:site_name" content="Spanish Total.js"><meta property="og:locale" content="${t.locale}"><meta property="og:locale:alternate" content="${t.altLocale}">
<meta property="og:title" content="${esc(fullTitle)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}assets/brand/og.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${lang==='en'?'Toto, the European red fox of Spanish Total.js, winking.':'Toto, el zorro rojo europeo de Spanish Total.js, guiñando un ojo.'}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(fullTitle)}"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${SITE}assets/brand/og.jpg">
<link rel="license" href="${licenseUrl}"><link rel="manifest" href="${root}manifest.webmanifest"><link rel="alternate" type="text/plain" href="${SITE}llms.txt" title="llms.txt">
<link rel="icon" href="${root}assets/brand/favicon.ico" type="image/vnd.microsoft.icon" sizes="16x16 32x32 48x48">
<link rel="icon" href="${root}assets/brand/favicon-32.png" type="image/png" sizes="32x32">
<link rel="icon" href="${root}assets/brand/favicon-16.png" type="image/png" sizes="16x16">
<link rel="apple-touch-icon" href="${root}assets/brand/apple-touch-icon.png" sizes="180x180">
<link rel="stylesheet" href="${root}styles/presentation.css">
<script src="${root}scripts/doc.js" defer></script>
<script type="application/ld+json">${JSON.stringify(graph)}</script>
</head>
<body class="doc-page">
<a class="skip-link" href="#content">${t.skip}</a>
<div class="header-shell">
<header class="site-header wrap">
<a class="brand" href="${homeHref}"><img class="brand-mark" src="${root}assets/brand/totaljs.svg" alt="" width="45" height="45"><span>Toto<span class="brand-sub">Spanish Total.js</span></span></a>
<a class="repo-link" href="${otherUrl}" hreflang="${otherLang}" lang="${otherLang}">${t.switchLabel} <span aria-hidden="true">↗</span></a>
</header>
</div>
<main id="content" class="wrap doc-wrap">
<nav class="doc-nav" aria-label="${t.docs}"><a href="${homeHref}">${t.home}</a>${nav}</nav>
<article class="doc">
<header class="doc-head"><p class="eyebrow"><span class="status-dot"></span> ${t.eyebrow}</p><h1>${esc(title)}</h1></header>
${toc}
${body}
<p class="doc-source"><a href="${GITHUB}${entry.src}" rel="noopener">${t.source} ↗</a></p>
</article>
</main>
<footer class="wrap"><a class="brand" href="${homeHref}"><img class="brand-mark" src="${root}assets/brand/totaljs.svg" alt="" width="45" height="45"><span>Toto<span class="brand-sub">Spanish Total.js</span></span></a><div>© 2026 Spanish Total.js<br><a href="${relative(entry.url,doc.id==='trademark'?entry.url:DOCS[4][lang].url)}">${t.trademark}</a><br><a href="${relative(entry.url,DOCS[5][lang].url)}">${t.licenseNav}</a></div><div><a href="${otherUrl}" hreflang="${otherLang}" lang="${otherLang}">${t.footerLang}</a><br><a href="${SITE}llms.txt">${t.agents} · llms.txt</a></div></footer>
</body></html>
`;
}

function sitemap(){
 const pair=(en,es)=>[en,es].map(u=>'  <url>\n    <loc>'+SITE+u+'</loc>\n    <xhtml:link rel="alternate" hreflang="en" href="'+SITE+en+'"/>\n    <xhtml:link rel="alternate" hreflang="es" href="'+SITE+es+'"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="'+SITE+en+'"/>\n  </url>').join('\n');
 return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'+[pair('','es/'),...DOCS.map(d=>pair(d.en.url,d.es.url))].join('\n')+'\n</urlset>\n';
}

// Every generated file, keyed by repository path.
function build(){
 const files={};
 for(const doc of DOCS)for(const lang of ['en','es'])files[doc[lang].url+'index.html']=pageHtml(doc,lang);
 files['sitemap.xml']=sitemap();
 return files;
}

module.exports={DOCS,build,markdown,inline,rewrite,relative,SITE};
if(require.main===module){
 const files=build();
 if(process.argv.includes('--write')){
  for(const [file,content] of Object.entries(files)){Fs.mkdirSync(Path.dirname(Path.join(ROOT,file)),{recursive:true});Fs.writeFileSync(Path.join(ROOT,file),content);}
  console.log('Generated '+(Object.keys(files).length-1)+' documentation pages and sitemap.xml.');
 }else console.log(Object.keys(files).join('\n'));
}
