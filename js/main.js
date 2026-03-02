/* Villa Eliana sul Mare — main.js */
(function () {
  'use strict';

  /* Sticky nav */
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
    if (window.scrollY > 60) header.classList.add('scrolled');
  }

  /* Mobile menu */
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      navLinks.classList.toggle('open', !open);
      document.body.style.overflow = !open ? 'hidden' : '';
    });
    navLinks.querySelectorAll('.nav-link').forEach(l => {
      l.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* FAQ accordion */
  const faq = document.getElementById('faq-accordion');
  if (faq) {
    faq.querySelectorAll('.faq-q').forEach(btn => {
      btn.addEventListener('click', function () {
        const open = this.classList.contains('open');
        faq.querySelectorAll('.faq-q').forEach(b => {
          b.classList.remove('open');
          b.setAttribute('aria-expanded', 'false');
          const a = document.getElementById(b.getAttribute('aria-controls'));
          if (a) a.style.maxHeight = '0';
        });
        if (!open) {
          this.classList.add('open');
          this.setAttribute('aria-expanded', 'true');
          const ans = document.getElementById(this.getAttribute('aria-controls'));
          if (ans) ans.style.maxHeight = ans.scrollHeight + 'px';
        }
      });
    });
  }

  /* Lightbox */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');
  if (lb && lbImg) {
    document.querySelectorAll('[data-lb]').forEach(el => {
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', () => {
        lbImg.src = el.dataset.lb;
        lbImg.alt = el.getAttribute('alt') || '';
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
        lbClose && lbClose.focus();
      });
    });
    const closeLb = () => {
      lb.classList.remove('active');
      lbImg.src = '';
      document.body.style.overflow = '';
    };
    lbClose && lbClose.addEventListener('click', closeLb);
    lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && lb.classList.contains('active')) closeLb(); });
  }

  /* Scroll reveal */
  if ('IntersectionObserver' in window) {
    const targets = document.querySelectorAll('.reveal');
    targets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity .65s ease, transform .65s ease';
    });
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: .1 });
    targets.forEach(el => obs.observe(el));
  }

})();
