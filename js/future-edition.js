(function(){
  var hero=document.querySelector('.concept-hero'),idle;
  if(hero){
    function disrupt(){hero.classList.remove('is-aligned');clearTimeout(idle);idle=setTimeout(function(){hero.classList.add('is-aligned')},900)}
    hero.addEventListener('pointermove',disrupt);hero.addEventListener('pointerleave',function(){clearTimeout(idle);idle=setTimeout(function(){hero.classList.add('is-aligned')},450)});idle=setTimeout(function(){hero.classList.add('is-aligned')},1200)
  }

  var portalCopy={strategy:["CHOICE","A coherent set of decisions"],ai:["ADOPTION","Accountable human–AI systems"],trust:["TRUST","Governance that enables growth"],commerce:["GROWTH","Economics before expansion"]};
  var paths={
    strategy:['Clarify the choices that will shape the next stage of the business.','what-we-do.html','Start with Strategy Consulting ↗'],
    ai:['Move from isolated experiments to decisions people can own and use.','advisory-lab.html','Explore AI Transformation ↗'],
    trust:['Build governance, safeguards and confidence before risk slows the business.','experts.html','Strengthen Trust & Compliance ↗'],
    commerce:['Test the economics, channel choices and operating model before scaling.','commerce-lab.html','Test Commerce Growth ↗']
  };
  document.querySelectorAll('.selector-option').forEach(function(button){button.addEventListener('click',function(){document.querySelectorAll('.selector-option').forEach(function(x){x.classList.remove('active');x.setAttribute('aria-selected','false')});button.classList.add('active');button.setAttribute('aria-selected','true');var value=paths[button.dataset.path];document.getElementById('pathSentence').textContent=value[0];var link=document.getElementById('pathLink');link.href=value[1];link.textContent=value[2];var visual=document.querySelector(".selector-resolution .capability-visual"),decision=portalCopy[button.dataset.path];if(visual){visual.dataset.mode=button.dataset.path;document.getElementById("visualWord").textContent=decision[0];document.getElementById("visualNote").textContent=decision[1]}})});
  document.querySelectorAll(".selector-option").forEach(function(button){
    button.addEventListener("pointerenter",function(){if(window.matchMedia("(hover:hover)").matches&&!button.classList.contains("active"))button.click()});
    button.addEventListener("focus",function(){if(!button.classList.contains("active"))button.click()});
  });

  var field=document.getElementById('decisionField');
  if(field){var ctx=field.getContext('2d'),points=[],w=0,h=0,dpr=1,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
    function size(){var r=field.getBoundingClientRect();w=r.width;h=r.height;dpr=Math.min(devicePixelRatio||1,2);field.width=w*dpr;field.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);points=[];for(var i=0;i<90;i++)points.push({x:Math.random()*w,y:Math.random()*h,s:Math.random()*2+1,p:Math.random()*6.28})}
    function render(){var box=field.parentElement.getBoundingClientRect(),progress=Math.max(0,Math.min(1,(innerHeight-box.top)/(innerHeight+box.height)));ctx.clearRect(0,0,w,h);points.forEach(function(p,i){var tx=w*(.18+.64*(i/(points.length-1))),ty=h*(.5+Math.sin(i*.32)*.05),mix=Math.max(0,(progress-.2)*1.5);var x=p.x*(1-mix)+tx*mix,y=(p.y+Math.sin(performance.now()*.001+p.p)*8)*(1-mix)+ty*mix;ctx.beginPath();ctx.fillStyle=i%11===0?'rgba(215,169,47,.9)':'rgba(196,216,233,'+(.12+mix*.4)+')';ctx.arc(x,y,p.s+mix,0,Math.PI*2);ctx.fill()});if(!reduce)requestAnimationFrame(render)}
    addEventListener('resize',size);size();render()
  }

  var archive=document.getElementById('futureArchive');
  if(archive){var cards=Array.from(archive.querySelectorAll('.archive-card')),current=0,start=0,dragging=false;
    function show(next){current=(next+cards.length)%cards.length;cards.forEach(function(card,i){var raw=i-current;if(raw>cards.length/2)raw-=cards.length;if(raw<-cards.length/2)raw+=cards.length;card.style.setProperty('--offset',raw);card.style.setProperty('--distance',Math.min(2,Math.abs(raw)));card.classList.toggle('active',i===current);card.setAttribute('aria-hidden',i===current?'false':'true')});document.getElementById('archiveCurrent').textContent=String(current+1).padStart(2,'0');document.getElementById('archiveProgress').style.width=((current+1)/cards.length*100)+'%'}
    function down(e){dragging=true;start=e.clientX;archive.classList.add('is-dragging');archive.setPointerCapture&&archive.setPointerCapture(e.pointerId)}
    function up(e){if(!dragging)return;dragging=false;archive.classList.remove('is-dragging');var delta=e.clientX-start;if(Math.abs(delta)>45)show(current+(delta<0?1:-1))}
    archive.addEventListener('pointerdown',down);archive.addEventListener('pointerup',up);archive.addEventListener('pointercancel',up);archive.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();show(current+1)}if(e.key==='ArrowLeft'){e.preventDefault();show(current-1)}});document.getElementById('archivePrev').addEventListener('click',function(){show(current-1)});document.getElementById('archiveNext').addEventListener('click',function(){show(current+1)});show(0)
  }
})();
