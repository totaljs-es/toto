'use strict';
const Fs=require('node:fs'),Path=require('node:path'),Assert=require('node:assert/strict'),Zlib=require('node:zlib'),VM=require('node:vm');
const root=Path.resolve(__dirname,'..'),read=n=>Fs.readFileSync(Path.join(root,n));
const manifest=JSON.parse(read('assets/poses/manifest.json'));
Assert.equal(manifest.brand,'Spanish Total.js');Assert(manifest.poses.length>=6);Assert.equal(manifest.license,'LicenseRef-Spanish-Totaljs-Toto-Proprietary');
const ids=new Set(),sizeOf=f=>Fs.statSync(Path.join(root,f)).size;
function transparency(file){
 const b=read(file);Assert.equal(b.subarray(0,8).toString('hex'),'89504e470d0a1a0a');const w=b.readUInt32BE(16),h=b.readUInt32BE(20);
 Assert.equal(b[24],8,'Expected 8-bit PNG');Assert.equal(b[25],6,'Expected RGBA PNG');Assert.equal(b[28],0,'Expected non-interlaced PNG');
 const chunks=[];for(let i=8;i<b.length;){const len=b.readUInt32BE(i),type=b.toString('ascii',i+4,i+8);if(type==='IDAT')chunks.push(b.subarray(i+8,i+8+len));i+=len+12;}
 const data=Zlib.inflateSync(Buffer.concat(chunks)),stride=w*4;Assert.equal(data.length,(stride+1)*h);let previous=Buffer.alloc(stride),clear=0,visible=0;
 const paeth=(a,b,c)=>{const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);return pa<=pb&&pa<=pc?a:pb<=pc?b:c;};
 for(let y=0;y<h;y++){
  const offset=y*(stride+1),filter=data[offset],line=Buffer.alloc(stride);Assert(filter<=4,'Invalid PNG filter');
  for(let x=0;x<stride;x++){const a=x>=4?line[x-4]:0,up=previous[x],c=x>=4?previous[x-4]:0;const add=filter===0?0:filter===1?a:filter===2?up:filter===3?Math.floor((a+up)/2):paeth(a,up,c);line[x]=(data[offset+1+x]+add)&255;}
  for(let x=3;x<stride;x+=4){if(line[x]===0)clear++;if(line[x]>0)visible++;}previous=line;
 }
 Assert(clear>w*h*.05,'PNG needs real transparent space');Assert(visible>w*h*.1,'PNG needs a visible character');return {w,h};
}
for(const pose of manifest.poses){Assert(!ids.has(pose.id));ids.add(pose.id);Assert(!pose.file.includes('..'));const {w,h}=transparency(pose.file);Assert.equal(pose.width,w);Assert.equal(pose.height,h);Assert(pose.alt.es&&pose.alt.en);const web=read(pose.web.file);Assert.equal(web.toString('ascii',0,4),'RIFF');Assert.equal(web.toString('ascii',8,16),'WEBPVP8X');Assert(web[20]&0x10,'WebP needs alpha');Assert.equal(1+web.readUIntLE(24,3),pose.web.width);Assert(web.length<200000,'WebP too heavy');const sm=read(pose.web.small.file);Assert.equal(sm.toString('ascii',8,16),'WEBPVP8X');Assert(sm[20]&0x10,'Small WebP needs alpha');Assert.equal(1+sm.readUIntLE(24,3),pose.web.small.width);Assert(sm.length<sizeOf(pose.web.file),'Small WebP must be lighter');console.log('PNG OK',pose.id,w+'×'+h,'real transparency');}
const sandbox={window:{}};VM.runInNewContext(read('assets/poses/catalog.js').toString(),sandbox);Assert.equal(JSON.stringify(sandbox.window.TOTO_POSES),JSON.stringify(manifest));
for(const page of ['index.html','es/index.html','404.html']){
 const html=read(page).toString().replace(/<pre[\s\S]*?<\/pre>/g,'');
 for(const m of html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)){const target=m[1].split('#')[0];if(/^[a-z]+:/i.test(target)||!target)continue;Assert(Fs.existsSync(Path.resolve(root,Path.dirname(page),target)),'Broken HTML asset in '+page+': '+target);}
}
Assert(Fs.existsSync(Path.join(root,'.nojekyll')),'Missing .nojekyll for GitHub Pages');
for(const page of ['index.html','es/index.html']){
 const html=read(page).toString(),base=Path.dirname(page);
 for(const m of html.matchAll(/srcset="([^"]+)"/g))for(const part of m[1].split(',')){const file=part.trim().split(/\s+/)[0];Assert(Fs.existsSync(Path.resolve(root,base,file)),'Broken srcset in '+page+': '+file);}
 for(const m of html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g))Assert(/^https:\/\//.test(m[2]),'hreflang must be absolute in '+page);
 Assert(/hreflang="x-default"/.test(html),'Missing x-default in '+page);
 Assert(/<link rel="canonical" href="https:\/\//.test(html),'Missing canonical in '+page);
 const ld=/<script type="application\/ld\+json">([^<]+)<\/script>/.exec(html);Assert(ld,'Missing JSON-LD in '+page);const graph=JSON.parse(ld[1])['@graph'];Assert(graph.some(n=>n['@type']==='ImageObject'&&n.license&&n.creditText),'JSON-LD image license missing in '+page);
 Assert(!/<a class="brand"[^>]*aria-label/.test(html),'Brand link name must come from its visible text in '+page);
 for(const m of html.matchAll(/<img\b[^>]*>/g))Assert(/\balt="/.test(m[0])&&/\bwidth="/.test(m[0])&&/\bheight="/.test(m[0]),'Image needs alt, width and height in '+page);
}
Assert(read('robots.txt').toString().includes('Sitemap: https://totaljs-es.github.io/toto/sitemap.xml'));
for(const url of read('sitemap.xml').toString().matchAll(/<loc>([^<]+)<\/loc>/g))Assert(url[1].startsWith('https://totaljs-es.github.io/toto/'));
const webmanifest=JSON.parse(read('manifest.webmanifest'));for(const icon of webmanifest.icons)Assert(Fs.existsSync(Path.join(root,icon.src)),'Missing manifest icon '+icon.src);
for(const name of ['README.md','README.es.md','LICENSE.md','LICENSE.es.md',...Fs.readdirSync(Path.join(root,'docs')).filter(n=>n.endsWith('.md')).map(n=>'docs/'+n),...Fs.readdirSync(Path.join(root,'docs/es')).map(n=>'docs/es/'+n)]){
 const source=read(name).toString();for(const m of source.matchAll(/\]\(([^)#]+)(?:#[^)]*)?\)/g)){if(/^[a-z]+:/i.test(m[1]))continue;Assert(Fs.existsSync(Path.resolve(root,Path.dirname(name),m[1])),'Broken documentation link in '+name+': '+m[1]);}
}
Assert(read('LICENSE.md').toString().includes('limited-use license'));
for(const f of ['LICENSE.md','LICENSE.es.md','README.md','README.es.md','index.html','es/index.html'])Assert(/totaljs\.(com|es)/.test(read(f).toString()),'Built-with-Total.js link missing in '+f);
for(const f of ['LICENSE.md','LICENSE.es.md','README.md','README.es.md','index.html','es/index.html','docs/poses.md','docs/es/poses.md'])Assert(!/asistencia de IA|AI-assisted|prompt/i.test(read(f).toString()),'Creation details must not appear in '+f);
console.log('OK: '+manifest.poses.length+' poses + WebP, real alpha, matching catalogs, local document links and presentation assets.');
