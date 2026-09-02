(function(){var c={value:['01','GIÁ TRỊ','CƠ HỘI AI','Chúng ta thực sự nên dùng AI ở đâu?','Tìm ra một vài cơ hội nơi quyết định tốt hơn, công việc được tái thiết kế và hiệu quả đo lường được đủ để hành động.','contact.html?focus=ai-opportunity'],workflow:['02','CÔNG VIỆC','TÁI THIẾT KẾ QUY TRÌNH','Vì sao dùng AI nhiều nhưng năng suất thay đổi rất ít?','Vượt khỏi việc làm nhanh hơn từng tác vụ. Tái thiết kế toàn bộ quy trình, vai trò, quyết định và thước đo quanh kết quả.','../executive-ai-lab.html'],scale:['03','MỞ RỘNG','CHUYỂN ĐỔI','Làm sao vượt khỏi các thử nghiệm rời rạc?','Xây danh mục có quản trị: nhanh chóng chứng minh giá trị, dừng ý tưởng yếu và mở rộng những thay đổi tổ chức có thể hấp thụ.','what-we-do.html'],governance:['04','NIỀM TIN','TRIỂN KHAI CÓ TRÁCH NHIỆM','Quản trị AI thế nào mà không làm chậm đổi mới?','Thiết lập quyền quyết định, mức rủi ro, chuẩn bằng chứng và trách nhiệm con người trước khi triển khai trở nên phân mảnh.','contact.html?focus=ai-governance']},b=document.querySelectorAll('.decision-tabs button'),o=document.querySelector('.dial-orbit');b.forEach(function(x,i){x.addEventListener('click',function(){b.forEach(function(y){y.classList.remove('active')});x.classList.add('active');var a=c[x.dataset.decision];document.getElementById('dialNumber').textContent=a[0];document.getElementById('dialWord').textContent=a[1];document.getElementById('decisionTag').textContent=a[2];document.getElementById('decisionTitle').textContent=a[3];document.getElementById('decisionBody').textContent=a[4];document.getElementById('decisionLink').href=a[5];o.style.transform='rotate('+(-18+i*31)+'deg)'})})}());

(function(){var m=document.querySelector('.home-menu'),n=document.getElementById('homeNav');if(!m||!n)return;function c(){n.classList.remove('open');document.body.classList.remove('nav-open');m.setAttribute('aria-expanded','false');m.setAttribute('aria-label','Mở điều hướng')}m.addEventListener('click',function(){var o=n.classList.toggle('open');document.body.classList.toggle('nav-open',o);m.setAttribute('aria-expanded',String(o));m.setAttribute('aria-label',o?'Đóng điều hướng':'Mở điều hướng')});n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',c)});document.addEventListener('keydown',function(e){if(e.key==='Escape')c()});window.addEventListener('resize',function(){if(window.innerWidth>1180)c()},{passive:true})}());

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
      item.addEventListener('mouseenter', select);
    });
  }

  var accordion = document.getElementById('methodMobileAccordion');
  if (accordion) {
    var accItems = accordion.querySelectorAll('.method-acc-item');
    accItems.forEach(function (acc) {
      var header = acc.querySelector('.method-acc-header');
      if (header) {
        header.addEventListener('click', function () {
          var isOpen = acc.classList.contains('is-open');
          accItems.forEach(function (other) { other.classList.remove('is-open'); });
          if (!isOpen) acc.classList.add('is-open');
        });
      }
    });
  }
}());


