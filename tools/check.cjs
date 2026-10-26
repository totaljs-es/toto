'use strict';
const Fs=require('node:fs'),Path=require('node:path'),Assert=require('node:assert/strict'),Zlib=require('node:zlib'),VM=require('node:vm');
const root=Path.resolve(__dirname,'..'),read=n=>Fs.readFileSync(Path.join(root,n));
const manifest=JSON.parse(read('assets/poses/manifest.json'));
Assert.equal(manifest.brand,'Spanish Total.js');Assert.equal(manifest.poses.length,5);Assert.equal(manifest.license,'LicenseRef-Spanish-Totaljs-Toto-Proprietary');
const ids=new Set();
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
for(const pose of manifest.poses){Assert(!ids.has(pose.id));ids.add(pose.id);Assert(!pose.file.includes('..'));const {w,h}=transparency(pose.file);Assert.equal(pose.width,w);Assert.equal(pose.height,h);Assert(pose.alt.es&&pose.alt.en);console.log('PNG OK',pose.id,w+'×'+h,'real transparency');}
const sandbox={window:{}};VM.runInNewContext(read('assets/poses/catalog.js').toString(),sandbox);Assert.equal(JSON.stringify(sandbox.window.TOTO_POSES),JSON.stringify(manifest));
for(const page of ['index.html','en/index.html']){
 const html=read(page).toString().replace(/<pre[\s\S]*?<\/pre>/g,'');
 for(const m of html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)){const target=m[1].split('#')[0];if(/^[a-z]+:/i.test(target)||!target)continue;Assert(Fs.existsSync(Path.resolve(root,Path.dirname(page),target)),'Broken HTML asset in '+page+': '+target);}
}
Assert(Fs.existsSync(Path.join(root,'.nojekyll')),'Missing .nojekyll for GitHub Pages');
for(const name of ['README.md','README.en.md','docs/historia.md','docs/identidad.md','docs/poses.md']){
 const source=read(name).toString();for(const m of source.matchAll(/\]\(([^)#]+)(?:#[^)]*)?\)/g)){if(/^[a-z]+:/i.test(m[1]))continue;Assert(Fs.existsSync(Path.resolve(root,Path.dirname(name),m[1])),'Broken documentation link in '+name+': '+m[1]);}
}
Assert(read('LICENSE.md').toString().includes('licencia de uso limitada'));
console.log('OK: 5 poses, real alpha, matching catalogs, local document links and presentation assets.');
