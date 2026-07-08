const galleryData = {
  apartments:{title:'Luxury Residences',images:['images/luxury-1.jpeg','images/luxury-2.jpeg','images/luxury-22.jpeg','images/luxury-3.jpeg','images/luxury-4.jpeg','images/luxury-5.jpeg','images/luxury-6.jpeg','images/luxury-7.jpeg','images/luxury-8.jpeg','images/luxury-9.jpeg','images/luxury-10.jpeg','images/luxury-11.jpeg','images/luxury-12.jpeg','images/luxury-13.jpeg','images/luxury-14.jpeg','images/luxury-15.jpeg','images/luxury-16.jpeg','images/luxury-17.jpeg','images/luxury-18.jpeg','images/luxury-19.jpeg','images/luxury-20.jpeg','images/luxury-21.jpeg','images/luxury-23.jpeg','images/luxury-24.jpeg','images/luxury-25.jpeg']},
  hospitality:{title:'Hospitality & Dining',images:['images/hospitality-3.jpeg','images/hospitality-1.jpeg','images/hospitality-2.jpeg','images/hospitality-thumbnail.jpeg','images/hospitality-5.jpeg','images/hospitality-6.jpeg','images/hospitality-7.jpeg','images/hospitality-8.jpeg','images/hospitality-9.jpeg']},
  offices:{title:'Corporate & Workplace',images:['images/corporate-1.jpg','images/corporate-2.jpeg','images/corporate-3.jpeg','images/corporate-4.jpeg']},
  commercial:{title:'Retail & Lifestyle',images:['images/retail-lifestyle-thumbnail.jpeg','images/retail-2.jpeg','images/retail-3.jpeg','images/retail-4.jpeg','images/retail-5.jpeg','images/retail-6.jpeg','images/retail-7.jpeg','images/retail-8.jpeg','images/retail-9.jpeg']},
  landscape:{title:'Landscape & Outdoor Living',images:['images/landscape-1.jpg','images/landscape-2.jpg','images/landscape-3.jpg','images/landscape-4.jpeg','images/landscape-5.jpeg']}
};

function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open');}

function openGallery(cat){
  const data=galleryData[cat];
  if(!data)return;
  document.getElementById('galleryTitle').textContent=data.title;
  const grid=document.getElementById('galleryImages');
  if(data.images.length===0){
    grid.innerHTML='<p class="gallery-empty">Projects coming soon — please check back shortly.</p>';
  }else{
    grid.innerHTML=data.images.map(src=>`<div class="gallery-img-wrap"><img src="${src}" alt="${data.title}" loading="lazy"></div>`).join('');
    grid.querySelectorAll('.gallery-img-wrap').forEach((wrap,i)=>{
      const handler=(e)=>{e.stopPropagation();openLightbox(data.images[i]);};
      wrap.addEventListener('click',handler);
      let touchStartX=0,touchStartY=0;
      wrap.addEventListener('touchstart',(e)=>{
        touchStartX=e.touches[0].clientX;
        touchStartY=e.touches[0].clientY;
      },{passive:true});
      wrap.addEventListener('touchend',(e)=>{
        const dx=Math.abs(e.changedTouches[0].clientX-touchStartX);
        const dy=Math.abs(e.changedTouches[0].clientY-touchStartY);
        if(dx<10&&dy<10){e.preventDefault();handler(e);}
      },{passive:false});
    });
  }
  document.getElementById('galleryModal').classList.add('open');
  document.body.style.overflow='hidden';
}

function closeGallery(){document.getElementById('galleryModal').classList.remove('open');document.body.style.overflow='';}

let currentImages=[],currentIndex=0;

function openLightbox(src){
  const allImgs=Array.from(document.querySelectorAll('#galleryImages .gallery-img-wrap img'));
  currentImages=allImgs.map(img=>img.getAttribute('src'));
  currentIndex=currentImages.indexOf(src);
  if(currentIndex===-1)currentIndex=0;
  updateLightbox();
  document.getElementById('lightbox').classList.add('open');
}

function updateLightbox(){
  const img=document.getElementById('lightboxImg');
  img.style.animation='none';img.offsetHeight;img.style.animation='';
  img.src=currentImages[currentIndex];
  document.getElementById('lightboxCounter').textContent=(currentIndex+1)+' / '+currentImages.length;
}

function lightboxNav(dir){
  currentIndex=(currentIndex+dir+currentImages.length)%currentImages.length;
  const img=document.getElementById('lightboxImg');
  img.classList.remove('slide-left','slide-right');
  void img.offsetWidth;
  img.classList.add(dir>0?'slide-right':'slide-left');
  img.src=currentImages[currentIndex];
  document.getElementById('lightboxCounter').textContent=(currentIndex+1)+' / '+currentImages.length;
}
function closeLightbox(){document.getElementById('lightbox').classList.remove('open');document.getElementById('lightboxImg').src='';}

function handleHomeForm(e){
  e.preventDefault();
  const form=e.target;
  const fields=form.querySelectorAll('input,select,textarea');
  let msg='Hello, I would like to enquire about an interior design project.%0A%0A';
  fields.forEach(f=>{
    if(f.value&&f.value.trim()!==''){
      const label=f.closest('.form-group')?.querySelector('label');
      const name=label?label.textContent.trim():f.placeholder||f.type;
      msg+=`*${name}:* ${encodeURIComponent(f.value.trim())}%0A`;
    }
  });
  const btn=document.getElementById('homeSubmitBtn');
  const success=document.getElementById('homeFormSuccess');
  btn.textContent='Sending...';
  setTimeout(()=>{
    window.open(`https://wa.me/919873466057?text=${msg}`,'_blank');
    btn.textContent='Enquiry Sent ✓';
    btn.style.background='#25D366';
    success.style.display='block';
    form.reset();
    setTimeout(()=>{btn.textContent='Submit Enquiry →';btn.style.background='';success.style.display='none';},5000);
  },800);
}

function handleForm(e){
  e.preventDefault();
  const form = e.target;
  const fields = form.querySelectorAll('input, select, textarea');
  let msg = 'Hello, I would like to enquire about an interior design project.%0A%0A';
  fields.forEach(f => {
    if(f.value && f.value.trim() !== '') {
      const label = form.querySelector(`label[for="${f.id}"]`) ||
                    f.closest('.form-group')?.querySelector('label');
      const name = label ? label.textContent.trim() : f.placeholder || f.name || f.type;
      msg += `*${name}:* ${encodeURIComponent(f.value.trim())}%0A`;
    }
  });
  const btn = form.querySelector('.form-submit');
  btn.textContent = 'Redirecting to WhatsApp ✓';
  setTimeout(() => {
    window.open(`https://wa.me/919873466057?text=${msg}`, '_blank');
    btn.textContent = 'Send Enquiry →';
    form.reset();
  }, 800);
}

function initFadeIns(){
  const els=document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach((entry,i)=>{
      if(entry.isIntersecting){setTimeout(()=>entry.target.classList.add('visible'),i*80);obs.unobserve(entry.target);}
    });
  },{threshold:0.08});
  els.forEach(el=>obs.observe(el));
}

function initLineAnimations(){
  const lineObs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('line-visible');lineObs.unobserve(e.target);}
    });
  },{threshold:0.4});
  document.querySelectorAll('.divider,.gold-rule').forEach(el=>lineObs.observe(el));
}

/* ─── NAV SCROLL BEHAVIOUR ─── */
const isHomePage = !!document.querySelector('.hero');
(function(){
  const nav=document.getElementById('navbar');
  if(nav && !isHomePage){nav.classList.add('scrolled');}
})();
window.addEventListener('scroll',()=>{
  const nav=document.getElementById('navbar');
  if(!nav)return;
  if(window.scrollY>80){nav.classList.add('scrolled');}
  else if(isHomePage){nav.classList.remove('scrolled');}
});

document.addEventListener('keydown',(e)=>{
  if(e.key==='Escape'){closeLightbox();closeGallery();}
  if(e.key==='ArrowRight')lightboxNav(1);
  if(e.key==='ArrowLeft')lightboxNav(-1);
});

/* ─── LIGHTBOX TAP-TO-CLOSE + SWIPE-TO-NAVIGATE ─── */
(function(){
  const lb=document.getElementById('lightbox');
  if(!lb)return;
  let touchStartX=0,touchStartY=0;
  lb.addEventListener('touchstart',(e)=>{
    touchStartX=e.touches[0].clientX;
    touchStartY=e.touches[0].clientY;
  },{passive:true});
  lb.addEventListener('touchend',(e)=>{
    if(e.target.closest('.lightbox-nav, .lightbox-close'))return;
    const dx=e.changedTouches[0].clientX-touchStartX;
    const dy=e.changedTouches[0].clientY-touchStartY;
    const absDx=Math.abs(dx),absDy=Math.abs(dy);
    if(absDx>50&&absDx>absDy){
      e.preventDefault();
      lightboxNav(dx<0?1:-1);
    }else if(absDx<10&&absDy<10){
      e.preventDefault();
      closeLightbox();
    }
  },{passive:false});
})();

/* ─── TESTIMONIAL CAROUSEL ─── */
let tCurrent=0;
function tPerPage(){return window.innerWidth<=900?1:3;}
function initTestimonialCarousel(){
  const track=document.getElementById('testimonialsTrack');
  if(!track)return;
  testimonialGoTo(0);
}
function testimonialGoTo(idx){
  const track=document.getElementById('testimonialsTrack');
  if(!track)return;
  const total=track.children.length;
  const perPage=tPerPage();
  const pages=Math.ceil(total/perPage);
  tCurrent=Math.max(0,Math.min(idx,pages-1));
  const cardW=track.children[0].offsetWidth+1;
  track.style.transform='translateX(-'+(tCurrent*cardW*perPage)+'px)';
  document.getElementById('tPrev').disabled=tCurrent===0;
  document.getElementById('tNext').disabled=tCurrent===pages-1;
}
function testimonialSlide(dir){testimonialGoTo(tCurrent+dir);}
window.addEventListener('resize',()=>testimonialGoTo(0));

/* ─── KEYBOARD ACCESS FOR CATEGORY CARDS ─── */
function initCardKeyboard(){
  document.querySelectorAll('.category-card[role="button"]').forEach(card=>{
    card.addEventListener('keydown',(e)=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();card.click();}
    });
  });
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded',()=>{
  initFadeIns();
  initTestimonialCarousel();
  initLineAnimations();
  initCardKeyboard();
  // Auto-open a gallery on portfolio page if ?cat= is present
  const params=new URLSearchParams(location.search);
  const cat=params.get('cat');
  if(cat && galleryData[cat] && document.getElementById('galleryModal')){
    setTimeout(()=>openGallery(cat),200);
  }
});
