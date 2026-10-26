'use strict';
// Genera assets/poses/webp/*.webp (800 px, con transparencia) desde los PNG. Requiere cwebp.
const Fs=require('node:fs'),Path=require('node:path'),{execFileSync}=require('node:child_process');
const dir=Path.resolve(__dirname,'../assets/poses');
Fs.mkdirSync(Path.join(dir,'webp'),{recursive:true});
for(const name of Fs.readdirSync(dir).filter(n=>/^toto-.+\.png$/.test(n))){
 execFileSync('cwebp',['-quiet','-q','85','-alpha_q','100','-resize','800','0',Path.join(dir,name),'-o',Path.join(dir,'webp',name.replace(/\.png$/,'.webp'))]);
 console.log('WebP ready:',name);
}
