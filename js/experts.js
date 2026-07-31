document.addEventListener('DOMContentLoaded', function () {
  function toggleExpert(btn) {
    var card = btn.closest('.expert-card');
    var expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    card.classList.toggle('open', !expanded);
  }

  document.querySelectorAll('.expert-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () { toggleExpert(btn); });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        toggleExpert(btn);
      }
    });
  });
});
