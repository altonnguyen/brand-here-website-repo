(function () {
  if (document.getElementById('bh-back-to-top')) return;

  var btn = document.createElement('button');
  btn.id = 'bh-back-to-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '&#8593;';
  document.body.appendChild(btn);

  var style = document.createElement('style');
  style.textContent =
    '#bh-back-to-top{position:fixed;left:22px;bottom:22px;bottom:calc(22px + env(safe-area-inset-bottom));' +
    'width:48px;height:48px;border-radius:50%;border:1px solid rgba(45,41,38,.3);' +
    'background:#F3F0E8;color:#2D2926;font-family:Manrope,Arial,sans-serif;font-size:20px;line-height:1;display:none;' +
    'align-items:center;justify-content:center;cursor:pointer;z-index:40;' +
    'box-shadow:0 12px 34px rgba(0,0,0,.16);opacity:0;transform:translateY(6px);' +
    'transition:opacity .25s ease,transform .25s ease;}' +
    '#bh-back-to-top.visible{display:flex;opacity:1;transform:translateY(0);}' +
    '#bh-back-to-top:hover,#bh-back-to-top:focus-visible{border-color:#E03C31;outline:0;}' +
    '@media (max-width:520px){#bh-back-to-top{left:16px;bottom:16px;bottom:calc(16px + env(safe-area-inset-bottom));width:44px;height:44px;font-size:18px;}}' +
    '@media (prefers-reduced-motion:reduce){#bh-back-to-top{transition:none;}}';
  document.head.appendChild(style);

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function toggle() {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
})();
