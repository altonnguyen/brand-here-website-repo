/* The Alignment Lab — Brand Here
 * A boids model used as an organisational diagnostic.
 * The named state is classified from the balance of the three forces,
 * which is deterministic. The two figures on screen are measured from
 * the field each frame and show what that balance actually produces.
 */
(function () {
  'use strict';

  var stage  = document.getElementById('stage');
  var canvas = document.getElementById('flock');
  if (!stage || !canvas) return;
  var ctx = canvas.getContext('2d');

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var el = {
    sep: document.getElementById('sep'),
    ali: document.getElementById('ali'),
    coh: document.getElementById('coh'),
    sepVal: document.getElementById('sepVal'),
    aliVal: document.getElementById('aliVal'),
    cohVal: document.getElementById('cohVal'),
    order: document.getElementById('mOrder'),
    spread: document.getElementById('mSpread'),
    name: document.getElementById('stateName'),
    body: document.getElementById('stateBody'),
    cost: document.getElementById('stateCost'),
    hint: document.getElementById('hint')
  };

  /* ---------- diagnostic copy ---------- */

  var STATES = {
    groupthink: {
      name: 'Groupthink',
      body: 'Everything has collapsed into a single cluster. This is the state most leaders mistake for alignment, because from the inside it feels like unity. Nobody is at the edge, so nothing new is being found. The organisation has stopped exploring and has given the stoppage a positive name.',
      cost: 'The failure is invisible until the market moves — and by then nobody in the cluster is positioned to see it first.'
    },
    silo: {
      name: 'Silos',
      body: 'Distinct groups have formed and each is protecting its own space. Distance is being managed carefully; proximity is not. Teams avoid collision by avoiding contact. From inside each unit the work looks orderly. From above it does not add up to anything.',
      cost: 'You pay for this in duplicated effort, and in the decisions nobody can make because no one owns the space between two teams.'
    },
    drift: {
      name: 'Drift',
      body: 'Everyone is pointing the same way. That is not the same as everyone going somewhere worth going. Alignment is a transmission mechanism, not a destination — it will carry a wrong direction just as efficiently as a right one, and faster.',
      cost: 'The most dangerous of the four, because every internal metric reads healthy right up until the moment it does not.'
    },
    noise: {
      name: 'Noise',
      body: 'No force is organising this. Everyone is moving; no one is moving together. This is not conflict — conflict would at least imply two positions. It is the absence of any shared force at all, and it usually looks like a very busy company where no two people describe the priority the same way.',
      cost: 'Adding more communication will not fix it. Nothing is being transmitted because nothing has been decided.'
    },
    coherent: {
      name: 'Coherent',
      body: 'Enough cohesion to hold a direction, enough separation to keep people at the edges where new information arrives first. The group changes direction without falling apart, and without waiting for permission to do so.',
      cost: 'Not a settled position. It is a narrow range you have to keep re-entering as the business grows — the same settings that produce this at forty people produce silos at four hundred.'
    },
    contested: {
      name: 'Contested',
      body: 'The three forces are working against each other. Parts of the system are being pulled by incompatible logic at the same time, so the shape keeps reforming and never holds.',
      cost: 'Usually a symptom of a recent reorganisation, an acquisition, or two senior leaders running different operating models without either one being wrong.'
    }
  };

  var PRESETS = {
    silo:       { sep: 88, ali: 22, coh: 40 },
    groupthink: { sep: 10, ali: 78, coh: 96 },
    drift:      { sep: 46, ali: 96, coh: 28 },
    coherent:   { sep: 54, ali: 62, coh: 50 }
  };

  /* ---------- field ---------- */

  var W = 0, H = 0, k = 1, dpr = 1;
  var boids = [];

  function sizeCanvas() {
    var r = stage.getBoundingClientRect();
    if (!r.width) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    k = W / 900;
    canvas.width  = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#081A2F';
    ctx.fillRect(0, 0, W, H);
  }

  function count() {
    return window.innerWidth < 760 ? 22 : 46;
  }

  function seed() {
    boids = [];
    var n = count();
    for (var i = 0; i < n; i++) {
      var a = Math.random() * Math.PI * 2;
      boids.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: Math.cos(a) * 1.4 * k,
        vy: Math.sin(a) * 1.4 * k,
        w: Math.random() * Math.PI * 2,
        size: 0.85 + Math.random() * 0.30,       /* a little depth  */
        gold: i % 9 === 0
      });
    }
  }

  /* ---------- simulation ---------- */

  var mouse = { x: -1e4, y: -1e4, on: false };

  function step() {
    var wSep = (+el.sep.value / 100) * 2.4;
    var wAli = (+el.ali.value / 100) * 1.3;
    var wCoh = (+el.coh.value / 100) * 0.85;

    var R = 105 * k, R2 = R * R;
    var SR = (26 + 64 * (+el.sep.value / 100)) * k, SR2 = SR * SR;
    var maxSpeed = 1.75 * k, maxForce = 0.055 * k;
    var margin = 90 * k;

    /* global centre — shared identity still pulls at a distance */
    var gx = 0, gy = 0, i, j;
    for (i = 0; i < boids.length; i++) { gx += boids[i].x; gy += boids[i].y; }
    gx /= boids.length; gy /= boids.length;

    for (i = 0; i < boids.length; i++) {
      var b = boids[i];
      var sx = 0, sy = 0, sn = 0;
      var ax = 0, ay = 0, an = 0;
      var cx = 0, cy = 0, cn = 0;

      for (j = 0; j < boids.length; j++) {
        if (i === j) continue;
        var o = boids[j];
        var dx = b.x - o.x, dy = b.y - o.y;
        var d2 = dx * dx + dy * dy;
        if (d2 > R2 || d2 === 0) continue;
        if (d2 < SR2) {
          var inv = 1 / Math.sqrt(d2);
          sx += dx * inv * inv; sy += dy * inv * inv; sn++;
        }
        ax += o.vx; ay += o.vy; an++;
        cx += o.x;  cy += o.y;  cn++;
      }

      var fx = 0, fy = 0, s;
      if (sn) { s = steer(sx, sy, b, maxSpeed, maxForce); fx += s.x * wSep; fy += s.y * wSep; }
      if (an) { s = steer(ax, ay, b, maxSpeed, maxForce); fx += s.x * wAli; fy += s.y * wAli; }
      if (cn) {
        s = steer(cx / cn - b.x, cy / cn - b.y, b, maxSpeed, maxForce);
        fx += s.x * wCoh; fy += s.y * wCoh;
      } else {
        s = steer(gx - b.x, gy - b.y, b, maxSpeed, maxForce);
        fx += s.x * wCoh * 0.2; fy += s.y * wCoh * 0.2;
      }

      /* the visitor is one agent among many — influence, not control */
      if (mouse.on) {
        var mx = b.x - mouse.x, my = b.y - mouse.y;
        var md = Math.sqrt(mx * mx + my * my) || 1;
        if (md < 70 * k) { fx += (mx / md) * maxForce * 1.4; fy += (my / md) * maxForce * 1.4; }
        else if (md < 210 * k) { fx += (-mx / md) * maxForce * 0.4; fy += (-my / md) * maxForce * 0.4; }
      }

      /* the field has edges, as every organisation does */
      if (b.x < margin) fx += maxForce * 2.4 * (1 - b.x / margin);
      if (b.x > W - margin) fx -= maxForce * 2.4 * (1 - (W - b.x) / margin);
      if (b.y < margin) fy += maxForce * 2.4 * (1 - b.y / margin);
      if (b.y > H - margin) fy -= maxForce * 2.4 * (1 - (H - b.y) / margin);

      b.w += (Math.random() - 0.5) * 0.4;
      fx += Math.cos(b.w) * maxForce * 0.22;
      fy += Math.sin(b.w) * maxForce * 0.22;

      var fm = Math.sqrt(fx * fx + fy * fy);
      var cap = maxForce * 2.2;
      if (fm > cap) { fx = fx / fm * cap; fy = fy / fm * cap; }

      b.vx += fx; b.vy += fy;
      var sp = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
      if (sp > maxSpeed) { b.vx = b.vx / sp * maxSpeed; b.vy = b.vy / sp * maxSpeed; }
      else if (sp < maxSpeed * 0.35) { b.vx = b.vx / (sp || 1) * maxSpeed * 0.35; b.vy = b.vy / (sp || 1) * maxSpeed * 0.35; }

      b.x += b.vx; b.y += b.vy;
      b.x = Math.max(1, Math.min(W - 1, b.x));
      b.y = Math.max(1, Math.min(H - 1, b.y));
    }
  }

  /* Reynolds steering: desired velocity minus current, limited */
  function steer(x, y, b, maxSpeed, maxForce) {
    var d = Math.sqrt(x * x + y * y) || 1;
    var fx = x / d * maxSpeed - b.vx;
    var fy = y / d * maxSpeed - b.vy;
    var m = Math.sqrt(fx * fx + fy * fy);
    if (m > maxForce) { fx = fx / m * maxForce; fy = fy / m * maxForce; }
    return { x: fx, y: fy };
  }

  /* ---------- render ---------- */

  /* A still chevron silhouette. Direction and collective movement carry
     the meaning; a second wingbeat animation would only add visual noise. */
  function bird(L) {
    var u = L / 56;
    var f = u;
    ctx.beginPath();
    ctx.moveTo(-10 * u, 56 * f);                              // left wingtip
    ctx.quadraticCurveTo(-40 * u, 28 * f, -6 * u, 0);         // trailing edge to the notch
    ctx.quadraticCurveTo(-40 * u, -28 * f, -10 * u, -56 * f); // out to right wingtip
    ctx.quadraticCurveTo(-24 * u, -28 * f, 10 * u, 0);        // leading edge to the point
    ctx.quadraticCurveTo(-24 * u, 28 * f, -10 * u, 56 * f);   // and back
    ctx.closePath();
    ctx.fill();
  }

  function draw() {
    ctx.fillStyle = 'rgba(8,26,47,0.62)';
    ctx.fillRect(0, 0, W, H);

    var n = boids.length, i, j, b;

    /* who can see whom — the mesh is where the teamwork actually is.
       One batched path so this stays cheap. */
    var LR = 95 * k, LR2 = LR * LR;
    ctx.beginPath();
    for (i = 0; i < n; i++) for (j = i + 1; j < n; j++) {
      var dx = boids[i].x - boids[j].x, dy = boids[i].y - boids[j].y;
      if (dx * dx + dy * dy > LR2) continue;
      ctx.moveTo(boids[i].x, boids[i].y);
      ctx.lineTo(boids[j].x, boids[j].y);
    }
    var meshOpacity = {
      noise: 0.012,
      drift: 0.030,
      contested: 0.045,
      coherent: 0.068,
      silo: 0.082,
      groupthink: 0.095
    }[classify()] || 0.045;
    ctx.strokeStyle = 'rgba(160,186,214,' + meshOpacity + ')';
    ctx.lineWidth = 0.7;
    ctx.stroke();

    var base = 6.5 * k;
    for (i = 0; i < n; i++) {
      b = boids[i];
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(Math.atan2(b.vy, b.vx));
      ctx.fillStyle = b.gold ? 'rgba(212,167,44,0.96)' : 'rgba(246,241,230,0.82)';
      bird(base * b.size);
      ctx.restore();
    }
  }

  /* ---------- measurement & diagnosis ---------- */

  function measure() {
    var n = boids.length, i;

    /* polar order: how aligned the headings actually are, 0 to 1 */
    var ux = 0, uy = 0;
    for (i = 0; i < n; i++) {
      var sp = Math.hypot(boids[i].vx, boids[i].vy) || 1;
      ux += boids[i].vx / sp; uy += boids[i].vy / sp;
    }
    var order = Math.hypot(ux, uy) / n;

    /* dispersion: mean distance from the centre, against the field */
    var mx = 0, my = 0;
    for (i = 0; i < n; i++) { mx += boids[i].x; my += boids[i].y; }
    mx /= n; my /= n;
    var rs = 0;
    for (i = 0; i < n; i++) rs += Math.hypot(boids[i].x - mx, boids[i].y - my);
    var spread = (rs / n) / (Math.hypot(W, H) / 2);

    return { order: order, spread: spread };
  }

  function classify() {
    var s = +el.sep.value / 100, a = +el.ali.value / 100, c = +el.coh.value / 100;
    if (s < 0.25 && a < 0.25 && c < 0.25) return 'noise';
    if (c >= 0.70 && s <= 0.40) return 'groupthink';
    if (s >= 0.70 && c <= 0.60 && a <= 0.78) return 'silo';
    if (a >= 0.75 && c <= 0.50) return 'drift';
    if (s >= 0.25 && s <= 0.75 && a >= 0.30 && a <= 0.78 && c >= 0.25 && c <= 0.75) return 'coherent';
    return 'contested';
  }

  var currentKey = null;

  function report() {
    var m = measure();
    el.order.textContent = m.order.toFixed(2);
    el.spread.textContent = m.spread.toFixed(2);
    var key = classify();
    if (key === currentKey) return;
    currentKey = key;
    var s = STATES[key];
    el.name.textContent = s.name;
    el.body.textContent = s.body;
    el.cost.textContent = s.cost;
  }

  /* ---------- wiring ---------- */

  function syncLabels() {
    el.sepVal.textContent = el.sep.value;
    el.aliVal.textContent = el.ali.value;
    el.cohVal.textContent = el.coh.value;
  }

  ['sep', 'ali', 'coh'].forEach(function (id) {
    el[id].addEventListener('input', syncLabels);
  });

  Array.prototype.forEach.call(document.querySelectorAll('.align-preset'), function (btn) {
    btn.addEventListener('click', function () {
      var p = PRESETS[btn.dataset.preset];
      el.sep.value = p.sep; el.ali.value = p.ali; el.coh.value = p.coh;
      syncLabels();
      if (reduced) { for (var i = 0; i < 260; i++) step(); draw(); report(); }
    });
  });

  stage.addEventListener('pointermove', function (e) {
    var r = stage.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true;
  });
  stage.addEventListener('pointerleave', function () { mouse.on = false; });

  var visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }, { threshold: 0.05 }).observe(stage);
  }

  var frame = 0;
  function loop() {
    if (visible && !document.hidden) {
      step();
      draw();
      if (++frame % 20 === 0) report();
    }
    requestAnimationFrame(loop);
  }

  var t;
  window.addEventListener('resize', function () {
    clearTimeout(t);
    t = setTimeout(function () { sizeCanvas(); seed(); }, 200);
  });

  sizeCanvas();
  seed();
  syncLabels();

  if (reduced) {
    for (var i = 0; i < 260; i++) step();
    draw();
    report();
    el.hint.textContent = 'Motion is reduced in your system settings, so the field is shown as a still frame. Use the presets to see each state.';
  } else {
    report();
    loop();
  }
})();
