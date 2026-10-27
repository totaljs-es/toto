'use strict';

const Fs=require('node:fs'),Path=require('node:path');
const ROOT=Path.resolve(__dirname,'..');
const BASE='https://raw.githubusercontent.com/totaljs-es/toto/main/';
const SUMMARY='Toto is the official European red fox mascot of Spanish Total.js: identity, transparent artwork, reusable face icons and a bilingual static presentation.';
const DETAILS='Limited-use license for the Total.js community: apps, sites and services showing Toto must state they were built with Total.js and link to totaljs.com or totaljs.es; public access does not grant an open asset license. English is the default (README.md, LICENSE.md, docs/); Spanish is in README.es.md, LICENSE.es.md and docs/es/. Node.js 18+ runs the local checks without dependencies. Artwork and trademark metadata describe this repository, not external verification.';

const PAGES=[
 ['Start here','README.md','Meet Toto','English introduction and collection previews'],
 ['Start here','README.es.md','Hola, soy Toto','Spanish introduction and collection previews'],
 ['Start here','AGENTS.md','Agent guidance','Repository map, visual invariants, source files and commands'],
 ['Start here','docs/ai.md','AI kit','Assistant entry points, shared workflows and verification scope'],
 ['Identity and use','docs/story.md','His story','Origins and character narrative'],
 ['Identity and use','docs/identity.md','Identity guide','Species, visual features, palette and tone'],
 ['Identity and use','docs/poses.md','Pose integration','Stable IDs, assets, HTML and Total.js examples with the Built with Total.js notice'],
 ['Identity and use','docs/favicon.md','Face icons','Reusable favicon kit and integration'],
 ['Identity and use','docs/trademark.md','Trademark details','Locally recorded mark information and registry reference'],
 ['Identity and use','LICENSE.md','License','Limited-use terms for the Total.js community'],
 ['Spanish','LICENSE.es.md','Licencia','Spanish translation of the license'],
 ['Spanish','docs/es/historia.md','Su historia','Spanish version of the story'],
 ['Spanish','docs/es/identidad.md','Guía de identidad','Spanish version of the identity guide'],
 ['Spanish','docs/es/poses.md','Poses','Spanish version of the pose guide'],
 ['Spanish','docs/es/favicon.md','Iconos web','Spanish version of the favicon guide'],
 ['Spanish','docs/es/marca.md','Marca','Spanish version of the trademark details'],
 ['Asset data','assets/poses/manifest.json','Pose manifest','Dimensions, paths, bilingual names, alt text and use'],
 ['Asset data','assets/brand/trademark.json','Trademark metadata','Recorded office, identifier and local status']
];

function index(){
 const lines=['# Toto','', '> '+SUMMARY,'',DETAILS,''];let section;
 for(const [name,file,title,description]of PAGES){
  if(name!==section){section=name;lines.push('## '+name,'');}
  lines.push('- ['+title+']('+BASE+file+'): '+description);
 }
 return lines.join('\n')+'\n';
}

function full(){
 const parts=['# Toto: documentation and asset metadata','', '> '+SUMMARY,'',DETAILS];
 for(const [,file,title]of PAGES){
  let source=Fs.readFileSync(Path.join(ROOT,file),'utf8').replace(/\r\n/g,'\n').trimEnd();
  if(file.endsWith('.json'))source='```json\n'+source+'\n```';
  parts.push('','---','','<!-- '+title+': '+file+' -->','',source);
 }
 return parts.join('\n')+'\n';
}

module.exports={PAGES,BASE,index,full};
if(require.main===module){
 if(process.argv.includes('--write')){
  Fs.writeFileSync(Path.join(ROOT,'llms.txt'),index());
  Fs.writeFileSync(Path.join(ROOT,'llms-full.txt'),full());
  console.log('Generated llms.txt and llms-full.txt from '+PAGES.length+' sources.');
 }else process.stdout.write(index());
}
