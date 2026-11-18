/* Motion: the hero whale, scroll parallax, marine snow, and the whale that swims across the screen.
   With "reduce motion" turned on, none of it runs and the page is complete as it is. */
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const heroImg = document.getElementById('hero-whale');
  heroImg.src = window.Page.speciesById.blue.image;
  let hero = heroImg; // replaced by the swimming canvas below when motion is allowed

  const swimmer = document.getElementById('swimmer');

  function swim(image) {
    if (reduceMotion || !window.gsap) return;
    swimmer.src = image;
    gsap.killTweensOf(swimmer);
    const start = () => gsap.fromTo(swimmer,
      { x: -swimmer.getBoundingClientRect().width - 40, y: 0, opacity: 0 },
      { x: innerWidth * 0.95, duration: 5.5, ease: 'sine.inOut',
        onUpdate() {
          const p = this.progress();
          gsap.set(swimmer, { y: Math.sin(p * Math.PI * 2) * 24, rotation: Math.cos(p * Math.PI * 2) * -3, opacity: Math.min(1, p * 6, (1 - p) * 6) * 0.9 });
        } });
    if (swimmer.complete && swimmer.naturalWidth) start(); else swimmer.onload = start;
  }
  window.Scene = { swim };

  if (reduceMotion || !window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);

  // Opening: the title rises once
  gsap.from('.hero-title .line', { yPercent: 40, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out' });

  /* The hero whale swims across the opening at a steady speed, forever, head first (the image faces left,
     so it swims from right to left), then comes round again. Nothing is tied to scrolling.
     It pauses while the opening is off screen. */
  const SPEED = 70; // pixels per second
  const heroSection = document.querySelector('.hero');

  /* Realistic swimming: the whale picture is drawn onto a canvas in thin vertical strips, and each strip is
     moved up or down by a wave that runs from the head to the tail. Whales beat their tail up and down,
     so in side view this makes the body flex and the flukes sweep, strongest at the tail and almost
     nothing at the head. The flippers ride along with the body. */
  const whale = document.createElement('canvas');
  whale.className = 'hero-whale';
  whale.setAttribute('aria-hidden', 'true');
  heroImg.after(whale);
  heroImg.style.display = 'none';
  hero = whale;
  const wc = whale.getContext('2d');
  /* Where the pectoral flipper is in the blue whale picture, as shares of its width (u) and height (v).
     Estimated from a screenshot; adjust if the swing looks off. */
  const FLIPPER = { u0: 0.26, u1: 0.46, v0: 0.62, swing: 0.05, rate: 1, lag: -0.9 };   // where the pectoral flipper sits (fractions of the image) and how far it swings
  const PAD = 0.14;          // extra room above and below for the tail to move into (share of image height)
  const BEAT = 2.6;          // seconds per tail beat
  let drawW = 0, drawH = 0, ratio = 1, running = true;

  function sizeWhale() {
    if (!heroImg.naturalWidth) return;
    ratio = Math.min(devicePixelRatio || 1, 2);
    const cssW = whale.getBoundingClientRect().width || 600;   // the width comes from the CSS
    drawW = Math.round(cssW * ratio);
    drawH = Math.round(drawW * heroImg.naturalHeight / heroImg.naturalWidth);
    whale.width = drawW;
    whale.height = Math.round(drawH * (1 + PAD * 2));
    whale.style.aspectRatio = `${whale.width} / ${whale.height}`;
  }

  function drawWhale(now) {
    if (running && drawW) {
      const t = now / 1000;
      const phase = (t / BEAT) * Math.PI * 2;
      const amp = drawH * 0.06;                 // tail travel
      const top = drawH * PAD;
      const strip = Math.max(3, Math.round(3 * ratio));
      const sw = heroImg.naturalWidth / drawW;   // source pixels per canvas pixel
      wc.clearRect(0, 0, whale.width, whale.height);
      const F = FLIPPER;
      const shPerPx = heroImg.naturalHeight / drawH;
      const fy0 = F.v0 * drawH;                    // where the flipper starts, below the belly
      const flap = Math.sin(phase * F.rate + F.lag); // the flipper paddles a little behind the tail beat
      for (let x = 0; x < drawW; x += strip) {
        const u = x / drawW;                     // 0 = head (left), 1 = tail (right)
        const body = Math.max(0, (u - 0.28) / 0.72);
        const bend = body * body * (3 - 2 * body);            // smooth: still at the head, full at the tail
        const dy = amp * bend * Math.sin(phase - u * 2.4)     // wave travelling back along the body
                 - amp * 0.12 * Math.sin(phase + 0.6);        // the head dips a little against the tail
        const sx = x * sw;
        if (u < F.u0 || u > F.u1) {
          wc.drawImage(heroImg, sx, 0, strip * sw, heroImg.naturalHeight, x, top + dy, strip, drawH);
          continue;
        }
        // Flipper column: the body above the flipper root is drawn as usual. Below it the strip is stretched a
        // little, more towards the tip, so the flipper swings up and down from its root. The stretch fades out
        // at both sides of the column, so there is no seam.
        const w = Math.sin(Math.PI * (u - F.u0) / (F.u1 - F.u0));
        const reach = flap * F.swing * drawH * w;   // how far the bottom of the strip moves
        wc.drawImage(heroImg, sx, 0, strip * sw, fy0 * shPerPx, x, top + dy, strip, fy0 + 0.5);
        wc.drawImage(heroImg, sx, fy0 * shPerPx, strip * sw, (drawH - fy0) * shPerPx,
          x, top + dy + fy0, strip, drawH - fy0 + reach);
      }
    }
    requestAnimationFrame(drawWhale);
  }

  let swimTween;
  function startSwim() {
    swimTween?.kill();
    gsap.set(hero, { y: 0 });
    sizeWhale();
    const from = heroSection.clientWidth;
    const to = -hero.getBoundingClientRect().width;
    swimTween = gsap.fromTo(hero, { x: from }, {
      x: to, duration: (from - to) / SPEED, ease: 'none', repeat: -1, force3D: true,
    });
    // start part-way through, so the whale is already in view when the page opens
    swimTween.progress(0.35);
  }
  // a slow rise and fall in time with the tail beat
  const bob = gsap.to(hero, { y: 6, duration: BEAT / 2, ease: 'sine.inOut', yoyo: true, repeat: -1, force3D: true });
  if (heroImg.complete && heroImg.naturalWidth) startSwim(); else heroImg.addEventListener('load', startSwim, { once: true });
  requestAnimationFrame(drawWhale);
  // The title's size changes once the web fonts arrive, so measure the lane again then
  document.fonts?.ready.then(() => heroImg.naturalWidth && startSwim());
  addEventListener('load', () => heroImg.naturalWidth && startSwim());
  let resizeTimer;
  addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(startSwim, 300); });
  new IntersectionObserver(([e]) => {
    running = e.isIntersecting;
    if (running) { swimTween?.resume(); bob.resume(); } else { swimTween?.pause(); bob.pause(); }
  }).observe(heroSection);

  /* Marine snow: small particles drifting up, denser the deeper you go */
  const canvas = document.getElementById('snow');
  const c = canvas.getContext('2d');
  let w, h, flakes = [];
  function resize() {
    const r = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    canvas.width = w * r; canvas.height = h * r; c.setTransform(r, 0, 0, r, 0, 0);
    flakes = Array.from({ length: Math.round((w * h) / 14000) }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.6 + 0.3,
      v: Math.random() * 0.25 + 0.05, phase: Math.random() * Math.PI * 2, glow: Math.random() > 0.9, pink: Math.random() > 0.6,
    }));
  }
  resize();
  addEventListener('resize', resize);
  let lastDepth = -1;
  function draw(t) {
    const depth = window.depthRatio || 0;
    if (depth !== lastDepth) { canvas.style.opacity = Math.min(1, depth * 3); lastDepth = depth; }
    if (depth > 0.01 && !document.hidden) {
      c.clearRect(0, 0, w, h);
      for (const f of flakes) {
        f.y -= f.v; f.x += Math.sin(t / 3000 + f.phase) * 0.12;
        if (f.y < -4) { f.y = h + 4; f.x = Math.random() * w; }
        const shine = f.glow ? 0.5 + 0.5 * Math.sin(t / 700 + f.phase) : 0;
        c.beginPath();
        // deeper down the glowing specks turn bioluminescent: cyan, with some pink in the midnight zone
        const col = f.pink && depth > 0.33 ? '255,111,216' : depth > 0.07 ? '79,240,255' : '255,225,140';
        c.fillStyle = f.glow ? `rgba(${col},${(0.35 + shine * 0.65) * Math.min(1, depth * 2)})` : `rgba(210,235,240,${0.35 * (0.4 + depth)})`;
        c.arc(f.x, f.y, f.r + (f.glow ? 0.6 : 0), 0, Math.PI * 2);
        c.fill();
      }
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();
