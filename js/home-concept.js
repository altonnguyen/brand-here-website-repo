(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canvas=document.getElementById('bridgeField');
  if(canvas){
    var ctx=canvas.getContext('2d'),w=0,h=0,dpr=1,pointer={x:-9999,y:-9999,active:false},particles=[];
    function resize(){dpr=Math.min(devicePixelRatio||1,2);var r=canvas.getBoundingClientRect();w=r.width;h=r.height;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);seed()}
    function seed(){particles=[];var count=Math.min(130,Math.max(58,Math.round(w/10)));for(var i=0;i<count;i++){var t=i/(count-1),arc=Math.sin(t*Math.PI);particles.push({t:t,x:w*(.47+t*.42)+(Math.random()-.5)*80,y:h*(.59-arc*.27)+(Math.random()-.5)*110,vx:0,vy:0,s:Math.random()*1.9+1})}}
    function move(e){var r=canvas.getBoundingClientRect(),p=e.touches?e.touches[0]:e;pointer.x=p.clientX-r.left;pointer.y=p.clientY-r.top;pointer.active=true}
    function draw(){ctx.clearRect(0,0,w,h);var time=performance.now()*.00035;particles.forEach(function(p,i){var arc=Math.sin(p.t*Math.PI),tx=w*(.47+p.t*.42),ty=h*(.59-arc*.27)+Math.sin(time*4+p.t*15)*7;var dx=p.x-pointer.x,dy=p.y-pointer.y,dist=Math.sqrt(dx*dx+dy*dy)||1;if(pointer.active&&dist<150){var force=(150-dist)/150;p.vx+=dx/dist*force*2.3;p.vy+=dy/dist*force*2.3}p.vx+=(tx-p.x)*.012;p.vy+=(ty-p.y)*.012;p.vx*=.91;p.vy*=.91;p.x+=p.vx;p.y+=p.vy;ctx.beginPath();ctx.fillStyle=i%9===0?'rgba(215,169,47,.85)':'rgba(211,224,235,'+(.18+arc*.42)+')';ctx.arc(p.x,p.y,p.s+(arc*1.2),0,Math.PI*2);ctx.fill();if(i>0&&i%3===0){var q=particles[i-1];ctx.beginPath();ctx.strokeStyle='rgba(176,197,214,.08)';ctx.moveTo(q.x,q.y);ctx.lineTo(p.x,p.y);ctx.stroke()}});if(!reduce)requestAnimationFrame(draw)}
    canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerleave',function(){pointer.active=false});canvas.addEventListener('touchmove',move,{passive:true});window.addEventListener('resize',resize);resize();draw()
  }
  var copy={strategy:['CHOICE','A coherent set of decisions'],ai:['ADOPTION','Accountable human–AI systems'],brand:['SIGNAL','Experience made visible'],commerce:['GROWTH','Economics before expansion']};
  document.querySelectorAll('.capability').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.capability').forEach(function(x){x.classList.remove('active');x.setAttribute('aria-selected','false')});btn.classList.add('active');btn.setAttribute('aria-selected','true');var mode=btn.dataset.mode,visual=document.querySelector('.capability-visual');visual.dataset.mode=mode;document.getElementById('visualWord').textContent=copy[mode][0];document.getElementById('visualNote').textContent=copy[mode][1]})});
  document.querySelectorAll(".capability").forEach(function(btn){
    btn.addEventListener("pointerenter",function(){if(window.matchMedia("(hover:hover)").matches&&!btn.classList.contains("active"))btn.click()});
    btn.addEventListener("focus",function(){if(!btn.classList.contains("active"))btn.click()});
    btn.addEventListener("click",function(){var visual=document.querySelector(".capability-visual");visual.classList.add("is-changing");window.setTimeout(function(){visual.classList.remove("is-changing")},260)});
  });
  var steps=Array.from(document.querySelectorAll('.build-track li')),bar=document.querySelector('.build-progress i');steps.forEach(function(step,i){step.addEventListener('mouseenter',function(){steps.forEach(function(x){x.classList.remove('active')});step.classList.add('active');bar.style.width=((i+1)/steps.length*100)+'%'});step.addEventListener('focusin',function(){step.dispatchEvent(new Event('mouseenter'))})});
})();
