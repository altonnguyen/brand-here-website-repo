(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  var cursor=document.querySelector('.c2-cursor');
  if(cursor&&matchMedia('(pointer:fine)').matches){
    addEventListener('pointermove',function(e){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';cursor.classList.add('visible')});
    document.querySelectorAll('a,button').forEach(function(el){el.addEventListener('pointerenter',function(){cursor.classList.add('action')});el.addEventListener('pointerleave',function(){cursor.classList.remove('action')})});
  }

  var canvas=document.getElementById('coutureField');
  if(canvas){
    var ctx=canvas.getContext('2d'),w=0,h=0,dpr=1,pointer={x:.68,y:.42};
    function size(){var r=canvas.getBoundingClientRect();w=r.width;h=r.height;dpr=Math.min(devicePixelRatio||1,2);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
    function move(e){var r=canvas.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width;pointer.y=(e.clientY-r.top)/r.height}
    function draw(time){ctx.clearRect(0,0,w,h);var t=time*.00018;var gradient=ctx.createRadialGradient(w*pointer.x,h*pointer.y,0,w*pointer.x,h*pointer.y,w*.7);gradient.addColorStop(0,'rgba(25,225,232,.22)');gradient.addColorStop(.24,'rgba(52,100,255,.15)');gradient.addColorStop(.48,'rgba(196,45,222,.12)');gradient.addColorStop(.7,'rgba(255,75,113,.07)');gradient.addColorStop(1,'rgba(7,8,9,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,w,h);var colours=['75,226,255','82,116,255','163,73,235','245,57,139','255,143,61','78,226,201','212,190,255'];for(var band=0;band<7;band++){ctx.beginPath();for(var x=-40;x<=w+40;x+=12){var phase=x/w*5.7+t*(band%2?1:-1)+band*.72;var centre=h*(.35+band*.055);var y=centre+Math.sin(phase)*h*(.055+band*.006)+Math.cos(phase*.47+t)*h*.035+(pointer.y-.5)*35;if(x===-40)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.strokeStyle='rgba('+colours[band]+','+(0.055+band*.014)+')';ctx.lineWidth=band===3?1.4:.8;ctx.stroke()}if(!reduce)requestAnimationFrame(draw)}
    addEventListener('resize',size);canvas.addEventListener('pointermove',move);size();draw(0);
  }

  var sculpture=document.getElementById('c2Sculpture'),hero=document.querySelector('.c2-hero');
  if(sculpture&&hero&&matchMedia('(pointer:fine)').matches&&!reduce){hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;sculpture.style.transform='rotateY('+(x*-13)+'deg) rotateX('+(y*10)+'deg) translate3d('+(x*18)+'px,'+(y*12)+'px,0)'});hero.addEventListener('pointerleave',function(){sculpture.style.transform=''})}

  var questionCopy={
    direction:['The strategic question','Where will we play—and what will we refuse?','Turn competing ambitions into a coherent set of decisions the organisation can act on.','what-we-do.html','Explore Strategy Consulting ↗'],
    intelligence:['The transformation question','Where should AI change the decision—not just the task?','Move beyond scattered experiments into accountable human–AI systems with measurable value.','advisory-lab.html','Test AI readiness ↗'],
    trust:['The confidence question','How do we move faster without creating invisible risk?','Build governance, compliance and information safeguards into the operating model before friction grows.','experts.html','Meet the expert network ↗'],
    growth:['The commercial question','Does the opportunity still work after the spreadsheet?','Pressure-test demand, channels, margin and operating reality before committing to scale.','commerce-lab.html','Open Commerce Lab ↗']
  };
  document.querySelectorAll('.c2-portal').forEach(function(button){
    function select(){document.querySelectorAll('.c2-portal').forEach(function(x){x.classList.remove('active');x.setAttribute('aria-selected','false')});button.classList.add('active');button.setAttribute('aria-selected','true');var c=questionCopy[button.dataset.question];document.getElementById('c2AnswerLabel').textContent=c[0];document.getElementById('c2AnswerTitle').textContent=c[1];document.getElementById('c2AnswerBody').textContent=c[2];var link=document.getElementById('c2AnswerLink');link.href=c[3];link.textContent=c[4]}
    button.addEventListener('click',select);button.addEventListener('pointerenter',function(){if(matchMedia('(hover:hover)').matches)select()});button.addEventListener('focus',select);
  });

  var method=document.querySelector('.c2-method'),sticky=document.querySelector('.c2-method-sticky'),acts=Array.from(document.querySelectorAll('.c2-method-stage article'));
  function updateMethod(){if(!method||!sticky)return;var r=method.getBoundingClientRect(),travel=Math.max(1,method.offsetHeight-innerHeight),p=Math.max(0,Math.min(1,-r.top/travel)),index=Math.min(acts.length-1,Math.floor(p*acts.length));acts.forEach(function(a,i){a.classList.toggle('active',i===index)});sticky.dataset.act=index;document.getElementById('c2ActNumber').textContent=String(index+1).padStart(2,'0');document.getElementById('c2ActProgress').style.width=((index+1)/acts.length*100)+'%'}
  addEventListener('scroll',updateMethod,{passive:true});addEventListener('resize',updateMethod);updateMethod();

  var workItems=Array.from(document.querySelectorAll('.c2-work-list>a')),workTimer;
  function showWork(item,index){workItems.forEach(function(x){x.classList.toggle('active',x===item)});var art=document.getElementById('c2WorkArt');if(!art)return;art.style.opacity='.35';clearTimeout(workTimer);workTimer=setTimeout(function(){art.className='c2-work-art tone-'+item.dataset.tone;document.getElementById('c2WorkMark').textContent=item.dataset.mark;document.getElementById('c2WorkNumber').textContent=String(index+1).padStart(2,'0');art.style.opacity='1'},140)}
  workItems.forEach(function(item,index){item.addEventListener('pointerenter',function(){showWork(item,index)});item.addEventListener('focus',function(){showWork(item,index)})});
})();
