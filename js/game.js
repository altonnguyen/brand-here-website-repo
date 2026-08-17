(function () {
  var canvas = document.getElementById('bridgeGame');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var shell = document.getElementById('gameShell');
  var scoreNode = document.getElementById('gameScore');
  var bestNode = document.getElementById('gameBest');
  var capabilityNode = document.getElementById('gameCapability');
  var startOverlay = document.getElementById('gameStart');
  var resultOverlay = document.getElementById('gameResult');
  var startButton = document.getElementById('gameStartButton');
  var restartButton = document.getElementById('gameRestartButton');
  var resultTitle = document.getElementById('gameResultTitle');
  var resultScore = document.getElementById('gameResultScore');
  var resultMessage = document.getElementById('gameResultMessage');
  var serviceLink = document.getElementById('gameServiceLink');

  var W = canvas.width;
  var H = canvas.height;
  var state = 'ready';
  var score = 0;
  var best = 0;
  var frame = 0;
  var lastTime = 0;
  var speed = 250;
  var gravity = 1100;
  var lift = -400;
  var idea = { x: 220, y: H / 2, vy: 0, radius: 16 };
  var barriers = [];
  var particles = [];
  var capabilityIndex = 0;
  var vi = document.documentElement.lang === 'vi';
  var capabilities = vi ? ['Rõ hướng', 'Chiến lược', 'Năng lực', 'Ứng dụng', 'Mở rộng'] : ['Clarity', 'Strategy', 'Capability', 'Adoption', 'Scale'];
  var gaps = [
    { name: 'The Clarity Gap', message: 'The next move begins by choosing the right problem and direction.', service: 'Explore Strategy Consulting', href: 'what-we-do.html' },
    { name: 'The Strategy Gap', message: 'Ambition needs a coherent set of choices before resources are committed.', service: 'Explore Strategy Consulting', href: 'what-we-do.html' },
    { name: 'The Capability Gap', message: 'Strategy only moves when people, systems and specialist expertise can deliver it.', service: 'Meet the Expert Network', href: 'experts.html' },
    { name: 'The Adoption Gap', message: 'Transformation succeeds when teams understand, use and own the new way of working.', service: 'Explore AI Transformation', href: 'what-we-do.html' },
    { name: 'The Execution Gap', message: 'Progress requires clear ownership, operating discipline and evidence from the market.', service: 'See How We Work', href: 'approach.html' }
  ];
  if (vi) gaps = [
    { name: 'Khoảng cách về sự rõ ràng', message: 'Bước tiếp theo bắt đầu bằng việc chọn đúng vấn đề và hướng đi.', service: 'Khám phá Tư vấn chiến lược', href: 'what-we-do.html' },
    { name: 'Khoảng cách chiến lược', message: 'Tham vọng cần trở thành một hệ thống lựa chọn nhất quán trước khi cam kết nguồn lực.', service: 'Khám phá Tư vấn chiến lược', href: 'what-we-do.html' },
    { name: 'Khoảng cách năng lực', message: 'Chiến lược chỉ chuyển động khi con người, hệ thống và chuyên gia có thể thực thi.', service: 'Gặp mạng lưới chuyên gia', href: 'experts.html' },
    { name: 'Khoảng cách ứng dụng', message: 'Chuyển đổi thành công khi đội ngũ hiểu, sử dụng và làm chủ cách làm việc mới.', service: 'Khám phá Chuyển đổi AI', href: 'what-we-do.html' },
    { name: 'Khoảng cách thực thi', message: 'Tiến bộ cần ownership rõ, kỷ luật vận hành và bằng chứng từ thị trường.', service: 'Xem phương pháp', href: 'approach.html' }
  ];

  try { best = Number(localStorage.getItem('brandHereBridgeBest')) || 0; } catch (e) {}
  bestNode.textContent = best;

  function resizeCanvas() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    W = rect.width;
    H = rect.height;
  }

  function reset() {
    score = 0;
    frame = 0;
    speed = 250;
    capabilityIndex = 0;
    idea = { x: Math.max(78, W * .2), y: H * .5, vy: 0, radius: Math.max(12, Math.min(16, W * .018)) };
    barriers = [];
    particles = [];
    scoreNode.textContent = '0';
    capabilityNode.textContent = capabilities[0];
    spawnBarrier(W + 170);
    spawnBarrier(W + 520);
  }

  function spawnBarrier(x) {
    var gapHeight = Math.max(155, Math.min(205, H * .32 - Math.min(score, 20) * 1.2));
    var margin = Math.max(80, H * .15);
    var center = margin + gapHeight / 2 + Math.random() * Math.max(10, H - margin * 2 - gapHeight);
    barriers.push({
      x: x,
      width: Math.max(72, Math.min(94, W * .085)),
      center: center,
      gap: gapHeight,
      passed: false,
      label: gaps[(score + barriers.length) % gaps.length].name.replace('The ', '').toUpperCase()
    });
  }

  function startGame() {
    resizeCanvas();
    reset();
    state = 'playing';
    startOverlay.classList.remove('active');
    resultOverlay.classList.remove('active');
    lastTime = performance.now();
    shell.classList.add('is-playing');
    requestAnimationFrame(loop);
  }

  function flap() {
    if (state === 'ready') { startGame(); return; }
    if (state !== 'playing') return;
    idea.vy = lift;
    for (var i = 0; i < 6; i++) {
      particles.push({ x: idea.x - 8, y: idea.y, vx: -80 - Math.random() * 80, vy: (Math.random() - .5) * 90, life: 1 });
    }
  }

  function endGame(barrier) {
    if (state !== 'playing') return;
    state = 'ended';
    shell.classList.remove('is-playing');
    best = Math.max(best, score);
    bestNode.textContent = best;
    try { localStorage.setItem('brandHereBridgeBest', String(best)); } catch (e) {}
    var gap = gaps[Math.min(gaps.length - 1, barrier ? barriers.indexOf(barrier) % gaps.length : capabilityIndex)];
    if (!gap || barriers.indexOf(barrier) < 0) gap = gaps[Math.min(capabilityIndex, gaps.length - 1)];
    resultTitle.textContent = gap.name;
    resultScore.textContent = String(score);
    resultMessage.textContent = gap.message;
    serviceLink.textContent = gap.service;
    serviceLink.href = gap.href;
    window.setTimeout(function () { resultOverlay.classList.add('active'); }, 320);
  }

  function update(dt) {
    frame += dt;
    idea.vy += gravity * dt;
    idea.y += idea.vy * dt;
    speed = Math.min(330, 250 + score * 3.5);

    barriers.forEach(function (barrier) {
      barrier.x -= speed * dt;
      var topEnd = barrier.center - barrier.gap / 2;
      var bottomStart = barrier.center + barrier.gap / 2;
      var horizontalHit = idea.x + idea.radius > barrier.x && idea.x - idea.radius < barrier.x + barrier.width;
      var verticalHit = idea.y - idea.radius < topEnd || idea.y + idea.radius > bottomStart;
      if (horizontalHit && verticalHit) endGame(barrier);
      if (!barrier.passed && barrier.x + barrier.width < idea.x) {
        barrier.passed = true;
        score += 1;
        capabilityIndex = Math.min(capabilities.length - 1, Math.floor(score / 3));
        scoreNode.textContent = String(score);
        capabilityNode.textContent = capabilities[capabilityIndex];
      }
    });
    barriers = barriers.filter(function (barrier) { return barrier.x > -barrier.width - 10; });
    if (barriers.length && barriers[barriers.length - 1].x < W - 350) spawnBarrier(W + 80);

    particles.forEach(function (particle) {
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.life -= dt * 1.8;
    });
    particles = particles.filter(function (particle) { return particle.life > 0; });

    if (idea.y + idea.radius > H || idea.y - idea.radius < 0) endGame(null);
  }

  function drawBackground() {
    ctx.fillStyle = '#081A31';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(246,241,230,.055)';
    ctx.lineWidth = 1;
    var grid = Math.max(44, W / 18);
    for (var x = -((frame * speed * .08) % grid); x < W; x += grid) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (var y = 0; y < H; y += grid) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    ctx.fillStyle = 'rgba(212,167,44,.45)';
    ctx.font = '500 10px Inter, sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('CURRENT STATE', 24, H - 24);
    ctx.textAlign = 'right';
    ctx.fillText('FUTURE STATE', W - 24, H - 24);
    ctx.textAlign = 'left';
  }

  function drawBarrier(barrier) {
    var topEnd = barrier.center - barrier.gap / 2;
    var bottomStart = barrier.center + barrier.gap / 2;
    var gradient = ctx.createLinearGradient(barrier.x, 0, barrier.x + barrier.width, 0);
    gradient.addColorStop(0, '#123052');
    gradient.addColorStop(1, '#1B426E');
    ctx.fillStyle = gradient;
    ctx.fillRect(barrier.x, 0, barrier.width, topEnd);
    ctx.fillRect(barrier.x, bottomStart, barrier.width, H - bottomStart);
    ctx.strokeStyle = 'rgba(212,167,44,.65)';
    ctx.lineWidth = 1;
    ctx.strokeRect(barrier.x, -1, barrier.width, topEnd + 1);
    ctx.strokeRect(barrier.x, bottomStart, barrier.width, H - bottomStart + 1);

    ctx.save();
    ctx.fillStyle = 'rgba(246,241,230,.62)';
    ctx.font = '500 9px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.translate(barrier.x + barrier.width / 2, Math.min(topEnd - 14, 105));
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(barrier.label, 0, 3);
    ctx.restore();
  }

  function drawIdea() {
    particles.forEach(function (particle) {
      ctx.fillStyle = 'rgba(212,167,44,' + Math.max(0, particle.life) + ')';
      ctx.beginPath(); ctx.arc(particle.x, particle.y, 2.5, 0, Math.PI * 2); ctx.fill();
    });
    var glow = ctx.createRadialGradient(idea.x, idea.y, 2, idea.x, idea.y, idea.radius * 3.5);
    glow.addColorStop(0, 'rgba(255,224,107,.65)');
    glow.addColorStop(.35, 'rgba(212,167,44,.24)');
    glow.addColorStop(1, 'rgba(212,167,44,0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(idea.x, idea.y, idea.radius * 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#D4A72C';
    ctx.beginPath(); ctx.arc(idea.x, idea.y, idea.radius, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#FFE17B';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#0C2340';
    ctx.font = '600 ' + Math.round(idea.radius * .8) + 'px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('I', idea.x, idea.y + 1);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  }

  function draw() {
    drawBackground();
    barriers.forEach(drawBarrier);
    drawIdea();
  }

  function loop(time) {
    if (state !== 'playing') { draw(); return; }
    var dt = Math.min(.032, (time - lastTime) / 1000 || .016);
    lastTime = time;
    update(dt);
    draw();
    if (state === 'playing') requestAnimationFrame(loop);
  }

  function input(event) {
    if (event.target.closest && event.target.closest('a, button')) return;
    event.preventDefault();
    flap();
  }

  startButton.addEventListener('click', startGame);
  restartButton.addEventListener('click', startGame);
  canvas.addEventListener('pointerdown', input);
  window.addEventListener('keydown', function (event) {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
      if (document.activeElement && /button|a/i.test(document.activeElement.tagName)) return;
      event.preventDefault(); flap();
    }
  });
  window.addEventListener('resize', function () { resizeCanvas(); if (state !== 'playing') { reset(); draw(); } });
  document.addEventListener('visibilitychange', function () { if (document.hidden && state === 'playing') lastTime = performance.now(); });

  resizeCanvas();
  reset();
  draw();

  window.__bridgeGame = {
    getState: function () { return { state: state, score: score, best: best, barriers: barriers.length, y: idea.y }; },
    start: startGame,
    flap: flap
  };
})();
