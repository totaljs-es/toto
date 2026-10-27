'use strict';
(function() {
 const header=document.querySelector('.header-shell');
 if(header){
  const syncHeaderHeight=()=>document.documentElement.style.setProperty('--header-height',header.getBoundingClientRect().height+'px');
  syncHeaderHeight();
  if(window.ResizeObserver)new ResizeObserver(syncHeaderHeight).observe(header);
  else window.addEventListener('resize',syncHeaderHeight);
 }
 const es=document.documentElement.lang==='es',label=es?'Copiar':'Copy',done=es?'Copiado':'Copied';
 if(!navigator.clipboard)return;
 const status=document.createElement('p');status.className='sr-only';status.setAttribute('role','status');document.body.append(status);
 document.querySelectorAll('.code-block').forEach(block=>{
  const button=document.createElement('button');button.type='button';button.className='copy-button';button.textContent=label;
  button.addEventListener('click',()=>{
   navigator.clipboard.writeText(block.querySelector('code').textContent).then(()=>{
    button.textContent=done;status.textContent=done;
    setTimeout(()=>{button.textContent=label;status.textContent='';},1800);
   }).catch(()=>{});
  });
  block.append(button);
 });
})();
