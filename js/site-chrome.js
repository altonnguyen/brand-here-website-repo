(function () {
  var header = document.querySelector('header.site-header');
  if (!header) return;

  var toggle = header.querySelector('.mobile-toggle');
  var links = header.querySelector('.nav-links');
  if (!toggle || !links) return;

  if (!links.id) links.id = 'navLinks';
  toggle.setAttribute('aria-controls', links.id);
  toggle.setAttribute('aria-expanded', 'false');

  var vi = document.documentElement.lang === 'vi';
  var openLabel = vi ? 'Mở điều hướng' : 'Open navigation';
  var closeLabel = vi ? 'Đóng điều hướng' : 'Close navigation';

  function setOpen(open) {
    links.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? closeLabel : openLabel);
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  links.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') setOpen(false);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1180) setOpen(false);
  }, { passive: true });
})();
