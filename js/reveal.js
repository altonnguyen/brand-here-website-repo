document.addEventListener('DOMContentLoaded', function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || els.length === 0) {
    els.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px 100px 0px' });
  els.forEach(function (el) { observer.observe(el); });

  // An toàn: đảm bảo nội dung luôn hiện ra sau tối đa 2.5s,
  // phòng trường hợp scroll bất thường, crawler, hoặc trình duyệt không kích hoạt observer đúng cách.
  setTimeout(function () {
    els.forEach(function (el) { el.classList.add('visible'); });
  }, 2500);
});
