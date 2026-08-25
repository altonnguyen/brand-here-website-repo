(function(){
  var sequence=document.getElementById('buildSequence');if(!sequence)return;
  var sticky=sequence.querySelector('.sequence-sticky'),buttons=Array.from(sequence.querySelectorAll('.sequence-nav button'));
  var title=document.getElementById('sequenceTitle'),body=document.getElementById('sequenceBody'),number=document.getElementById('sequenceNumber');
  var content=[
    ['Positioning','Finding the strategic edge and choosing the role Brand Here should own.'],
    ['Identity','Turning the strategy into a visual system people can recognize and remember.'],
    ['Voice','Giving the business language that is clear, credible and distinctly its own.'],
    ['Labs','Transforming ideas into interactive tools that let people experience the thinking.'],
    ['Deployment','Shipping a real company website—not a presentation, prototype or AI demo.']
  ];
  var current=-1,manualUntil=0;
  function activate(step){step=Math.max(0,Math.min(content.length-1,step));if(step===current)return;current=step;sticky.dataset.step=step;number.textContent=String(step+1).padStart(2,'0');title.textContent=content[step][0];body.textContent=content[step][1];buttons.forEach(function(button,i){button.classList.toggle('active',i===step);button.setAttribute('aria-current',i===step?'step':'false')})}
  function update(){if(Date.now()<manualUntil)return;var rect=sequence.getBoundingClientRect(),travel=Math.max(1,sequence.offsetHeight-innerHeight),progress=Math.max(0,Math.min(.999,-rect.top/travel));activate(Math.floor(progress*content.length))}
  buttons.forEach(function(button,i){button.addEventListener('click',function(){manualUntil=Date.now()+900;var top=sequence.getBoundingClientRect().top+scrollY,travel=sequence.offsetHeight-innerHeight;scrollTo({top:top+(i/(content.length-1))*travel,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});activate(i)})});
  addEventListener('scroll',update,{passive:true});addEventListener('resize',update);activate(0);update();
})();
