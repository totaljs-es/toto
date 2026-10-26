'use strict';
(function() {
 const gallery=document.getElementById('poseGallery');
 const lang=document.documentElement.lang==='en'?'en':'es',root=document.documentElement.dataset.root||'';
 const text={es:{view:'Ver imagen oficial ↗',png:'PNG original ↗',tail:'Transparente'},en:{view:'View official image ↗',png:'Original PNG ↗',tail:'Transparent'}}[lang];
 for(const pose of window.TOTO_POSES.poses) {
  const card=document.createElement('article');card.className='pose-card';
  const stage=document.createElement('div');stage.className='pose-stage';
  const image=document.createElement('img');image.src=root+pose.web.file;image.width=pose.web.width;image.height=pose.web.height;image.alt=pose.alt[lang];image.loading='lazy';stage.append(image);
  const info=document.createElement('div');info.className='pose-info';
  const meta=document.createElement('div');meta.className='pose-meta';
  const heading=document.createElement('h3');heading.textContent=pose.name[lang];
  const id=document.createElement('code');id.textContent=pose.id;meta.append(heading,id);
  const description=document.createElement('p');description.textContent=pose.usage[lang];
  const link=document.createElement('a');link.className='pose-link';link.href=root+pose.web.file;link.textContent=text.view;link.target='_blank';link.rel='noopener';
  const original=document.createElement('a');original.className='pose-link';original.href=root+pose.file;original.textContent=text.png;original.target='_blank';original.rel='noopener';original.style.marginLeft='14px';
  const format=document.createElement('span');format.className='pose-format';format.textContent=`WebP ${pose.web.width} px · PNG ${pose.width} px · ${text.tail}`;
  info.append(meta,description,link,original,format);card.append(stage,info);gallery.append(card);
 }
 gallery.dataset.background='light';
 document.querySelectorAll('[data-background]').forEach(button=>button.addEventListener('click',function(){
  gallery.dataset.background=this.dataset.background;
  document.querySelectorAll('[data-background]').forEach(item=>item.setAttribute('aria-pressed',String(item===this)));
 }));
})();
