/* Brand Here — Labs research-signals evidence data.
   Structured config so future stats can be swapped without touching markup.
   Update lastVerified whenever a figure is re-checked against its source. */
(function () {
  var EVIDENCE = {
    en: [
      {
        id: 'deloitte-job-redesign',
        stat: '84%',
        statement: 'of organisations have not redesigned jobs or workflows around AI.',
        editorialLine: 'The technology arrived.<br>The work didn’t change.',
        sourceOrganisation: 'Deloitte',
        sourceTitle: '“AI adoption to AI adaptation”',
        publishedDate: '9 July 2026',
        sourceUrl: 'https://www.deloitte.com/us/en/insights/topics/talent/ai-adoption-to-ai-adaptation.html',
        scope: null,
        lastVerified: '2026-08-30'
      },
      {
        id: 'deloitte-daily-use',
        stat: '<60%',
        statement: 'of workers with access to AI actually use it in their daily workflow.',
        editorialLine: 'Access was given.<br>Daily behaviour didn’t follow.',
        sourceOrganisation: 'Deloitte',
        sourceTitle: '“AI adoption to AI adaptation”',
        publishedDate: '9 July 2026',
        sourceUrl: 'https://www.deloitte.com/us/en/insights/topics/talent/ai-adoption-to-ai-adaptation.html',
        scope: null,
        lastVerified: '2026-08-30'
      },
      {
        id: 'deloitte-reimagine',
        stat: '34%',
        statement: 'of organisations are truly reimagining the business with AI.',
        editorialLine: 'AI is scaling.<br>Business reimagination isn’t.',
        sourceOrganisation: 'Deloitte',
        sourceTitle: '“The State of AI in the Enterprise — 2026”',
        publishedDate: '2026',
        sourceUrl: 'https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html',
        scope: null,
        lastVerified: '2026-08-30'
      },
      {
        id: 'pwc-skills-velocity',
        stat: '2× faster',
        statement: 'Skills needed for the most AI-exposed jobs are changing more than twice as fast as those for the least AI-exposed jobs.',
        editorialLine: 'The work is changing.<br>Can the organisation keep up?',
        sourceOrganisation: 'PwC',
        sourceTitle: '2026 Global AI Jobs Barometer',
        publishedDate: '15 June 2026',
        sourceUrl: 'https://www.pwc.com/gx/en/news-room/press-releases/2026/pwc-2026-ai-jobs-barometer.html',
        scope: null,
        lastVerified: '2026-08-30'
      },
      {
        id: 'bcg-logistics-roi',
        stat: '70% → 13%',
        statement: 'In BCG’s 2026 survey of 30 leading global logistics players, 70% reported having an AI strategy, while only 13% said AI was delivering measurable financial impact.',
        editorialLine: 'Strategy exists.<br>Impact lags.',
        sourceOrganisation: 'Boston Consulting Group',
        sourceTitle: '“AI Hasn’t Fully Paid Off Yet in Logistics. But It Will.”',
        publishedDate: '24 August 2026',
        sourceUrl: 'https://www.bcg.com/publications/2026/why-ai-isnt-delivering-roi-logistics',
        scope: 'Logistics sector',
        lastVerified: '2026-08-30'
      }
    ],
    vi: [
      {
        id: 'deloitte-job-redesign',
        stat: '84%',
        statement: 'doanh nghiệp chưa thiết kế lại công việc hay quy trình xung quanh AI.',
        editorialLine: 'Công nghệ đã đến.<br>Công việc chưa đổi.',
        sourceOrganisation: 'Deloitte',
        sourceTitle: '“AI adoption to AI adaptation”',
        publishedDate: '9/7/2026',
        sourceUrl: 'https://www.deloitte.com/us/en/insights/topics/talent/ai-adoption-to-ai-adaptation.html',
        scope: null,
        lastVerified: '2026-08-30'
      },
      {
        id: 'deloitte-daily-use',
        stat: '<60%',
        statement: 'nhân sự có quyền dùng AI thực sự dùng nó trong công việc hằng ngày.',
        editorialLine: 'Quyền truy cập đã có.<br>Hành vi hằng ngày thì chưa.',
        sourceOrganisation: 'Deloitte',
        sourceTitle: '“AI adoption to AI adaptation”',
        publishedDate: '9/7/2026',
        sourceUrl: 'https://www.deloitte.com/us/en/insights/topics/talent/ai-adoption-to-ai-adaptation.html',
        scope: null,
        lastVerified: '2026-08-30'
      },
      {
        id: 'deloitte-reimagine',
        stat: '34%',
        statement: 'doanh nghiệp thực sự tái định hình mô hình kinh doanh với AI.',
        editorialLine: 'AI đang mở rộng quy mô.<br>Tái định hình kinh doanh thì chưa.',
        sourceOrganisation: 'Deloitte',
        sourceTitle: '“The State of AI in the Enterprise — 2026”',
        publishedDate: '2026',
        sourceUrl: 'https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html',
        scope: null,
        lastVerified: '2026-08-30'
      },
      {
        id: 'pwc-skills-velocity',
        stat: 'Nhanh gấp 2 lần',
        statement: 'Kỹ năng cần cho các công việc chịu ảnh hưởng AI nhiều nhất đang thay đổi nhanh hơn gấp đôi so với nhóm ít chịu ảnh hưởng nhất.',
        editorialLine: 'Công việc đang thay đổi.<br>Tổ chức có theo kịp không?',
        sourceOrganisation: 'PwC',
        sourceTitle: 'Global AI Jobs Barometer 2026',
        publishedDate: '15/6/2026',
        sourceUrl: 'https://www.pwc.com/gx/en/news-room/press-releases/2026/pwc-2026-ai-jobs-barometer.html',
        scope: null,
        lastVerified: '2026-08-30'
      },
      {
        id: 'bcg-logistics-roi',
        stat: '70% → 13%',
        statement: 'Trong khảo sát 2026 của BCG với 30 doanh nghiệp logistics toàn cầu hàng đầu, 70% đã có chiến lược AI, nhưng chỉ 13% cho biết AI mang lại tác động tài chính đo lường được.',
        editorialLine: 'Chiến lược đã có.<br>Tác động vẫn chậm.',
        sourceOrganisation: 'Boston Consulting Group',
        sourceTitle: '“AI Hasn’t Fully Paid Off Yet in Logistics. But It Will.”',
        publishedDate: '24/8/2026',
        sourceUrl: 'https://www.bcg.com/publications/2026/why-ai-isnt-delivering-roi-logistics',
        scope: 'Ngành logistics',
        lastVerified: '2026-08-30'
      }
    ]
  };

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function render() {
    var container = document.getElementById('evidenceList');
    if (!container) return;
    var lang = (document.documentElement.getAttribute('lang') || 'en').indexOf('vi') === 0 ? 'vi' : 'en';
    var sourceLabel = lang === 'vi' ? 'Nguồn' : 'Source';
    var items = EVIDENCE[lang] || EVIDENCE.en;
    var html = items.map(function (item) {
      var scopeTag = item.scope ? '<span class="evidence-scope">' + escapeHtml(item.scope) + '</span>' : '';
      return (
        '<article class="evidence-item reveal">' +
          '<div class="evidence-figure">' + escapeHtml(item.stat) + '</div>' +
          '<div class="evidence-body">' +
            scopeTag +
            '<p class="evidence-statement">' + escapeHtml(item.statement) + '</p>' +
            '<p class="evidence-editorial">' + item.editorialLine + '</p>' +
            '<p class="evidence-source">' +
              escapeHtml(item.sourceOrganisation) + ' · ' + escapeHtml(item.publishedDate) +
              ' <a href="' + escapeHtml(item.sourceUrl) + '" target="_blank" rel="noopener">' + sourceLabel + ' ↗</a>' +
            '</p>' +
          '</div>' +
        '</article>'
      );
    }).join('');
    container.innerHTML = html;
    if (window.IntersectionObserver) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px 60px 0px' });
      container.querySelectorAll('.evidence-item').forEach(function (el) { obs.observe(el); });
    } else {
      container.querySelectorAll('.evidence-item').forEach(function (el) { el.classList.add('visible'); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
