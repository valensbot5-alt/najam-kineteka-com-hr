/* Vitalis Najam Kineteka — Vanilla JS */
(function(){
  'use strict';

  /* === Mobile Nav === */
  var hamburger=document.getElementById('hamburger');
  var mobileNav=document.getElementById('mobile-nav');
  var body=document.body;

  if(hamburger&&mobileNav){
    hamburger.addEventListener('click',function(){
      var open=mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded',open);
      body.style.overflow=open?'hidden':'';
    });
    mobileNav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded','false');
        body.style.overflow='';
      });
    });
  }

  /* === FAQ Accordion === */
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click',function(){
      var item=btn.closest('.faq-item');
      var wasOpen=item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item.open').forEach(function(el){
        el.classList.remove('open');
      });
      if(!wasOpen) item.classList.add('open');
    });
  });

  /* === Back to Top === */
  var btt=document.getElementById('back-to-top');
  if(btt){
    var checkScroll=function(){
      if(window.scrollY>600) btt.classList.add('visible');
      else btt.classList.remove('visible');
    };
    window.addEventListener('scroll',checkScroll,{passive:true});
    checkScroll();
    btt.addEventListener('click',function(e){
      e.preventDefault();
      window.scrollTo({top:0,behavior:'smooth'});
    });
  }

  /* === Header scroll shadow === */
  var header=document.querySelector('.header');
  if(header){
    window.addEventListener('scroll',function(){
      if(window.scrollY>20) header.style.boxShadow='0 2px 20px rgba(8,12,20,.08)';
      else header.style.boxShadow='none';
    },{passive:true});
  }

  /* === Fade-in on scroll === */
  var faders=document.querySelectorAll('.fade-in');
  if(faders.length&&'IntersectionObserver' in window){
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
    faders.forEach(function(el){obs.observe(el);});
  } else {
    faders.forEach(function(el){el.classList.add('visible');});
  }

  /* === Smooth scroll for anchor links === */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var target=document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        var offset=80;
        var pos=target.getBoundingClientRect().top+window.scrollY-offset;
        window.scrollTo({top:pos,behavior:'smooth'});
      }
    });
  });

})();
