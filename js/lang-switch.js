(function(){
  var nav=document.querySelector('nav'); if(!nav||nav.querySelector('.lang-switch'))return;
  var isVi=location.pathname.indexOf('/vi/')>=0;
  var path=location.pathname, target=isVi?path.replace('/vi/','/'):'/vi/'+(path.split('/').pop()||'index.html');
  var sw=document.createElement('div'); sw.className='lang-switch';
  sw.innerHTML=isVi?'<a href="'+target+'">EN</a><strong>VI</strong>':'<strong>EN</strong><a href="'+target+'">VI</a>';
  var cta=nav.querySelector('.nav-cta'); nav.insertBefore(sw,cta||nav.lastChild);
})();
