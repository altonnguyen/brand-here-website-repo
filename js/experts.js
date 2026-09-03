document.addEventListener('DOMContentLoaded', function () {
  var vi = document.documentElement.lang === 'vi';
  var relevance = {
    technology: vi ? 'Phù hợp khi chiến lược phải trở thành công nghệ an toàn, ổn định và có thể mở rộng.' : 'Relevant when strategy must become secure, dependable technology that can scale.',
    commerce: vi ? 'Phù hợp khi chiến lược thị trường phải chuyển thành vận hành nền tảng và doanh thu thực.' : 'Relevant when market strategy must become platform execution and real revenue.',
    governance: vi ? 'Phù hợp khi thay đổi cần trách nhiệm rõ ràng, bảo vệ thông tin và kiểm soát thực tế.' : 'Relevant when change needs clear accountability, information safeguards and practical controls.',
    finance: vi ? 'Phù hợp khi tăng trưởng cần số liệu minh bạch, dòng tiền bền vững và khả năng chịu thẩm định.' : 'Relevant when growth needs transparent numbers, resilient cash flow and investment readiness.',
    'technology-leadership': vi ? 'Phù hợp khi tham vọng kinh doanh phải kết nối với kiến trúc, đội ngũ và rủi ro triển khai.' : 'Relevant when business ambition must connect with architecture, engineering leadership and delivery risk.'
  };

  document.querySelectorAll('.expert-card').forEach(function (card) {
    var key = Object.keys(relevance).find(function (name) { return card.classList.contains('expert-profile--' + name); });
    var teaser = card.querySelector('.expert-teaser');
    if (!key || !teaser || card.querySelector('.expert-relevance')) return;
    var line = document.createElement('p');
    line.className = 'expert-relevance';
    line.textContent = relevance[key];
    teaser.insertAdjacentElement('afterend', line);
  });

  document.querySelectorAll('.expert-toggle').forEach(function (control) {
    if (control.tagName === 'BUTTON') return;
    var button = document.createElement('button');
    button.type = 'button';
    button.className = control.className;
    Array.from(control.attributes).forEach(function (attribute) {
      if (attribute.name !== 'class' && attribute.name !== 'role' && attribute.name !== 'tabindex') {
        button.setAttribute(attribute.name, attribute.value);
      }
    });
    button.innerHTML = control.innerHTML;
    control.replaceWith(button);
  });

  function setLabel(btn, expanded) {
    var label = btn.querySelector('.expert-more');
    if (label) label.textContent = expanded ? (vi ? 'Đóng hồ sơ −' : 'Close profile −') : (vi ? 'Xem hồ sơ +' : 'View profile +');
  }

  function closeExpert(btn) {
    var card = btn.closest('.expert-card');
    btn.setAttribute('aria-expanded', 'false');
    card.classList.remove('open');
    setLabel(btn, false);
  }

  function toggleExpert(btn) {
    var card = btn.closest('.expert-card');
    var expanded = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.expert-toggle[aria-expanded="true"]').forEach(function (openButton) {
      if (openButton !== btn) closeExpert(openButton);
    });
    btn.setAttribute('aria-expanded', String(!expanded));
    card.classList.toggle('open', !expanded);
    setLabel(btn, !expanded);
  }

  document.querySelectorAll('.expert-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () { toggleExpert(btn); });
    setLabel(btn, false);
  });

  var closing = document.querySelector('.final-cta');
  if (closing) {
    var statement = closing.querySelector('h2');
    var link = closing.querySelector('a');
    if (statement) statement.textContent = vi ? 'Tập hợp đúng đội ngũ cho bước đi quan trọng lúc này.' : 'Build the right team for the move that matters now.';
    if (link) { link.textContent = vi ? 'Trao đổi về thách thức ↗' : 'Discuss the challenge ↗'; link.href = vi ? 'contact?focus=experts' : 'contact?focus=experts'; }
  }
});
