(function () {
  var choices = {
    value: ['01', 'VALUE', 'AI OPPORTUNITY', 'Where should we actually use AI?', 'Find the few opportunities where better decisions, redesigned work and measurable economics justify action.', 'contact.html?focus=ai-opportunity'],
    workflow: ['02', 'WORK', 'WORKFLOW REDESIGN', 'Why has AI use barely changed productivity?', 'Move beyond faster individual tasks. Redesign the end-to-end workflow, roles, decisions and measures around the outcome.', 'executive-ai-lab.html'],
    scale: ['03', 'SCALE', 'TRANSFORMATION', 'How do we move beyond scattered experiments?', 'Build a governed portfolio: prove value quickly, stop weak ideas and scale the few changes the organisation can absorb.', 'what-we-do.html'],
    governance: ['04', 'TRUST', 'RESPONSIBLE DEPLOYMENT', 'How do we govern AI without slowing innovation?', 'Set practical decision rights, risk tiers, evidence standards and human accountability before deployment becomes fragmented.', 'contact.html?focus=ai-governance']
  };
  var buttons = document.querySelectorAll('.decision-tabs button');
  var orbit = document.querySelector('.dial-orbit');
  buttons.forEach(function (button, index) {
    button.addEventListener('click', function () {
      buttons.forEach(function (item) { item.classList.remove('active'); });
      button.classList.add('active');
      var item = choices[button.dataset.decision];
      document.getElementById('dialNumber').textContent = item[0];
      document.getElementById('dialWord').textContent = item[1];
      document.getElementById('decisionTag').textContent = item[2];
      document.getElementById('decisionTitle').textContent = item[3];
      document.getElementById('decisionBody').textContent = item[4];
      document.getElementById('decisionLink').href = item[5];
      orbit.style.transform = 'rotate(' + (-18 + index * 31) + 'deg)';
    });
  });
}());

(function () {
  var menu = document.querySelector('.home-menu');
  var nav = document.getElementById('homeNav');
  if (!menu || !nav) return;
  function closeMenu() { nav.classList.remove('open'); document.body.classList.remove('nav-open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); }
  menu.addEventListener('click', function () { var open = nav.classList.toggle('open'); document.body.classList.toggle('nav-open', open); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
  nav.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', function () { if (window.innerWidth > 1180) closeMenu(); }, { passive: true });
}());

(function () {
  var bar = document.getElementById('methodIndexBar');
  var detailView = document.getElementById('methodDetailView');
  var numEl = document.getElementById('methodDetailNum');
  var titleEl = document.getElementById('methodDetailTitle');
  var bodyEl = document.getElementById('methodDetailBody');

  if (bar && detailView && numEl && titleEl && bodyEl) {
    var items = bar.querySelectorAll('.method-index-item');
    items.forEach(function (item) {
      function select() {
        items.forEach(function (btn) {
          btn.classList.remove('is-active');
          btn.setAttribute('aria-selected', 'false');
        });
        item.classList.add('is-active');
        item.setAttribute('aria-selected', 'true');
        
        detailView.style.opacity = '0';
        setTimeout(function () {
          numEl.textContent = item.dataset.step;
          titleEl.textContent = item.dataset.title;
          bodyEl.textContent = item.dataset.desc;
          detailView.style.opacity = '1';
        }, 150);
      }
      item.addEventListener('click', select);
    });
  }

  var accordion = document.getElementById('methodMobileAccordion');
  if (accordion) {
    var accItems = accordion.querySelectorAll('.method-acc-item');
    accItems.forEach(function (acc) {
      var header = acc.querySelector('.method-acc-header');
      if (header) {
        header.addEventListener('click', function () {
          accItems.forEach(function (other) {
            var otherHeader = other.querySelector('.method-acc-header');
            other.classList.remove('is-open');
            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          });
          acc.classList.add('is-open');
          header.setAttribute('aria-expanded', 'true');
        });
      }
    });
  }
}());

