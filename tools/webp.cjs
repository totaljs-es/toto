'use strict';
// Genera assets/poses/webp/: toto-<id>.webp (800 px) y toto-<id>-480.webp (480 px), con transparencia. Requiere cwebp.
const Fs=require('node:fs'),Path=require('node:path'),{execFileSync}=require('node:child_process');
const dir=Path.resolve(__dirname,'../assets/poses');
Fs.mkdirSync(Path.join(dir,'webp'),{recursive:true});
for(const name of Fs.readdirSync(dir).filter(n=>/^toto-.+\.png$/.test(n))){
 for(const [width,suffix] of [[800,''],[480,'-480']]){
  execFileSync('cwebp',['-quiet','-q','85','-alpha_q','100','-resize',String(width),'0',Path.join(dir,name),'-o',Path.join(dir,'webp',name.replace(/\.png$/,suffix+'.webp'))]);
 }
 console.log('WebP ready:',name);
}
