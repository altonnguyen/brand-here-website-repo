/* Brand Here — Homepage interactive/motion layer (Concept 3.2 behaviour layer).
   Three signature interactions: hero differential motion, the Adaptation Gap
   scroll narrative, and the evidence story reveal. Self-contained: does not
   depend on js/reveal.js (which is not loaded on the homepage). Every piece
   is progressive enhancement — if it does not run, the page already shows a
   complete, static, readable composition (see css/motion-home.css). */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canAnimate = !reduceMotion && 'IntersectionObserver' in window && 'requestAnimationFrame' in window;

  function clamp01(n) { return Math.max(0, Math.min(1, n)); }

  /* ---- Moment 01: Hero differential motion ---- */
  function initHero() {
    if (!canAnimate) return;
    var hero = document.querySelector('.hero.enterprise-hero');
    if (!hero) return;
    var fast = hero.querySelector('[data-motion="fast"]');
    var slow = hero.querySelector('[data-motion="slow"]');
    var action = hero.querySelector('[data-motion="action"]');
    if (!fast && !slow) return;

    var active = false;
    var raf = null;
    var slowCurrent = 0;

    function frame() {
      raf = null;
      var rect = hero.getBoundingClientRect();
      var vh = window.innerHeight || 1;
      var progress = clamp01(-rect.top / vh);

      if (fast) {
        fast.style.transform = 'translateY(' + (-progress * 46) + 'px)';
      }
      if (slow) {
        var target = -progress * 14;
        slowCurrent += (target - slowCurrent) * 0.06;
        slow.style.transform = 'translateY(' + slowCurrent + 'px)';
      }
      if (action) {
        var settle = clamp01(progress * 2.4);
        action.style.opacity = String(0.55 + settle * 0.45);
        action.style.transform = 'translateY(' + (6 - settle * 6) + 'px)';
      }
      if (active) raf = requestAnimationFrame(frame);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        active = entry.isIntersecting;
        if (active && !raf) raf = requestAnimationFrame(frame);
      });
    }, { threshold: 0 });
    io.observe(hero);

    window.addEventListener('scroll', function () {
      if (active && !raf) raf = requestAnimationFrame(frame);
    }, { passive: true });
  }

  /* ---- Moment 02: The Adaptation Gap scroll narrative ---- */
  function initGapDistance() {
    var el = document.querySelector('[data-gap-distance]');
    if (!el) return;
    if (!canAnimate) return; // stays in its complete static layout

    var techNode = el.querySelector('.gap-node-tech');
    var businessNode = el.querySelector('.gap-node-business');
    var bridgeSpans = Array.prototype.slice.call(el.querySelectorAll('.gap-bridge span'));
    var titleEl = el.querySelector('.gap-distance-title');

    var thresholds = [0.30, 0.40, 0.50, 0.60, 0.70];

    function setHeight() {
      var isMobile = window.innerWidth <= 760;
      el.style.minHeight = (isMobile ? 160 : 240) + 'vh';
    }
    setHeight();
    window.addEventListener('resize', setHeight, { passive: true });

    el.classList.add('gap-distance--live');

    var active = false;
    var raf = null;

    function frame() {
      raf = null;
      var rect = el.getBoundingClientRect();
      var scrollable = Math.max(1, el.offsetHeight - window.innerHeight);
      var progress = clamp01(-rect.top / scrollable);

      var arc = Math.sin(progress * Math.PI); // 0 -> 1 -> 0: gap opens, then closes
      if (techNode) techNode.style.transform = 'translateY(' + (-arc * 70) + 'px)';
      if (businessNode) businessNode.style.transform = 'translateY(' + (arc * 18) + 'px)';

      el.classList.toggle('is-title-visible', progress > 0.12 && progress < 0.98);
      if (titleEl) {
        titleEl.style.setProperty('--rule-width', Math.round(clamp01((progress - 0.12) / 0.2) * 64) + 'px');
      }

      bridgeSpans.forEach(function (span, i) {
        span.classList.toggle('is-in', progress > (thresholds[i] || 0.7));
      });

      el.classList.toggle('is-resolved', progress > 0.86);

      if (active) raf = requestAnimationFrame(frame);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        active = entry.isIntersecting;
        if (active && !raf) raf = requestAnimationFrame(frame);
      });
    }, { threshold: 0 });
    io.observe(el);

    window.addEventListener('scroll', function () {
      if (active && !raf) raf = requestAnimationFrame(frame);
    }, { passive: true });
  }

  /* ---- Moment 03: Evidence story reveal ---- */
  function initEvidenceStory() {
    var items = document.querySelectorAll('.evidence-story-item');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });

    // Safety net, mirroring the sitewide reveal.js pattern: never leave
    // content permanently hidden if the observer misfires.
    setTimeout(function () {
      items.forEach(function (el) { el.classList.add('is-in'); });
    }, 2500);
  }

  function init() {
    initHero();
    initGapDistance();
    initEvidenceStory();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
