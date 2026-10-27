'use strict';

const {test}=require('node:test'),Assert=require('node:assert/strict');
const Fs=require('node:fs'),Path=require('node:path');
const ROOT=Path.resolve(__dirname,'..'),llms=require('../tools/llms.cjs');
const read=file=>Fs.readFileSync(Path.join(ROOT,file),'utf8').replace(/\r\n/g,'\n');
const pkg=JSON.parse(read('package.json'));
const skillNames=Fs.readdirSync(Path.join(ROOT,'.claude/skills')).sort();
const metadata=source=>{
 const match=/^---\nname: ([^\n]+)\ndescription: ([^\n]+)\n---\n/.exec(source);
 Assert(match,'Missing skill metadata');return match.slice(1);
};

function validateLinks(file,source=read(file)){
 const targets=[...source.matchAll(/\]\(([^)\s]+)\)/g),...source.matchAll(/\bsrc="([^"]+)"/g)];
 for(const match of targets){
  const target=match[1].split('#')[0];
  if(!target||/^[a-z]+:/i.test(target))continue;
  const resolved=Path.resolve(ROOT,Path.dirname(file),decodeURIComponent(target));
  Assert(resolved.startsWith(ROOT+Path.sep),'Link escapes repository in '+file+': '+target);
  Assert(Fs.existsSync(resolved),'Broken local link in '+file+': '+target);
 }
 for(const match of source.matchAll(/npm run ([\w:-]+)/g))Assert(pkg.scripts[match[1]],'Unknown npm script in '+file+': '+match[1]);
 if(/\bnpm test\b/.test(source))Assert(pkg.scripts.test,'Missing npm test target');
}

test('assistant entry points resolve to the maintained project guide',()=>{
 for(const file of ['CLAUDE.md','GEMINI.md'])Assert.match(read(file),/^@AGENTS\.md$/m);
 Assert(read('.github/copilot-instructions.md').includes('../AGENTS.md'));
 Assert(read('README.md').includes('docs/ai.md'));
 Assert(read('README.es.md').includes('docs/ai.md'));
});

test('each Codex skill routes to its shared checklist with matching metadata',()=>{
 Assert(skillNames.length>0);
 Assert.deepEqual(Fs.readdirSync(Path.join(ROOT,'.agents/skills')).sort(),skillNames);
 for(const name of skillNames){
  const entry='.agents/skills/'+name+'/SKILL.md',shared='.claude/skills/'+name+'/SKILL.md';
  const meta=metadata(read(shared));Assert.equal(meta[0],name);Assert(meta[1].length>30);
  Assert.deepEqual(metadata(read(entry)),meta);
  const link=/\[Shared checklist\]\(([^)]+)\)/.exec(read(entry));Assert(link,'Missing shared checklist link');
  Assert.equal(Path.resolve(ROOT,Path.dirname(entry),link[1]),Path.join(ROOT,shared));
  Assert(Fs.statSync(Path.join(ROOT,shared)).isFile());
 }
});

test('documentation and workflows reference existing files and npm commands',()=>{
 const files=new Set(['CLAUDE.md','GEMINI.md','.github/copilot-instructions.md',...llms.PAGES.map(page=>page[1]).filter(file=>file.endsWith('.md'))]);
 for(const name of skillNames)for(const area of ['.agents','.claude'])files.add(area+'/skills/'+name+'/SKILL.md');
 for(const file of files)validateLinks(file);
});

test('link and command validation reject broken guidance',()=>{
 Assert.throws(()=>validateLinks('AGENTS.md','[missing](docs/does-not-exist.md)'),/Broken local link/);
 Assert.throws(()=>validateLinks('AGENTS.md','Run npm run does-not-exist'),/Unknown npm script/);
 Assert.throws(()=>validateLinks('AGENTS.md','[outside](../outside.md)'),/Link escapes repository/);
});

test('the model index covers every documentation page and its sources exist',()=>{
 const listed=llms.PAGES.map(page=>page[1]);Assert.equal(new Set(listed).size,listed.length);
 for(const file of listed)Assert(Fs.statSync(Path.join(ROOT,file)).isFile(),'Missing indexed source: '+file);
 for(const name of Fs.readdirSync(Path.join(ROOT,'docs')).filter(name=>name.endsWith('.md')))Assert(listed.includes('docs/'+name),'Unindexed documentation: '+name);
 const links=[...llms.index().matchAll(/^- \[[^\]]+\]\(([^)]+)\): /gm)].map(match=>match[1]);
 Assert.deepEqual(links,listed.map(file=>llms.BASE+file));
});

test('both generated llms files match the current source documents',()=>{
 Assert.equal(read('llms.txt'),llms.index(),'Stale index: run npm run generate');
 Assert.equal(read('llms-full.txt'),llms.full(),'Stale full documentation: run npm run generate');
});

test('Claude command permissions point to existing checks without remote operations',()=>{
 const settings=JSON.parse(read('.claude/settings.json'));
 const scripts=new Set();
 for(const rule of settings.permissions.allow){
  const npm=/^Bash\(npm (?:run ([\w:-]+)|(test))\)$/.exec(rule);
  if(npm){const name=npm[1]||npm[2];Assert(pkg.scripts[name],'Unknown permission target: '+name);scripts.add(name);}
  else Assert.match(rule,/^Bash\(git (?:status|diff|log) \*\)$/,'Unexpected command permission');
 }
 for(const name of ['check','check:ai','generate'])Assert(scripts.has(name));
 Assert(settings.permissions.deny.includes('Read(./.env)'));
 Assert(read('.gitignore').includes('.claude/settings.local.json'));
});
