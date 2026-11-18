/* The whales on the species cards and in the size line-up swim in place: the tail beats (the same strip warp as the hero whale in
   js/scene.js, a little gentler) and the body drifts up and down slowly. They never move forward.
   Each card's whale is drawn on a small canvas over its picture, only while the card is on screen. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const whales = [];   // { fig, img, canvas, ctx, w, h, beat, offset, visible }

  function fit(wh) {
    const box = wh.fig.getBoundingClientRect();
    const iw = wh.img.naturalWidth, ih = wh.img.naturalHeight;
    if (!box.width || !iw) return false;
    // the same box the picture fills with object-fit: contain, plus room above and below for the tail
    const scale = Math.min(box.width / iw, box.height / ih);
    wh.w = Math.round(iw * scale * ratio);
    wh.h = Math.round(ih * scale * ratio);
    wh.pad = Math.round(wh.h * 0.12);
    wh.canvas.width = Math.round(box.width * ratio);
    wh.canvas.height = Math.round(box.height * ratio);
    wh.x0 = Math.round((wh.canvas.width - wh.w) / 2);
    wh.y0 = Math.round((wh.canvas.height - wh.h) / 2);
    return true;
  }

  function draw(wh, t) {
    const { ctx, img, w, h, x0, y0 } = wh;
    ctx.clearRect(0, 0, wh.canvas.width, wh.canvas.height);
    const phase = ((t + wh.offset) / wh.beat) * Math.PI * 2;
    const amp = h * 0.045;
    const strip = Math.max(2, Math.round(2 * ratio));
    const sw = img.naturalWidth / w;
    for (let x = 0; x < w; x += strip) {
      const u = x / w;                                   // 0 = head (left), 1 = tail (right)
      const body = Math.max(0, (u - 0.3) / 0.7);
      const bend = body * body * (3 - 2 * body);
      const dy = amp * bend * Math.sin(phase - u * 2.4) - amp * 0.1 * Math.sin(phase + 0.6);
      ctx.drawImage(img, x * sw, 0, strip * sw + 0.5, img.naturalHeight, x0 + x, y0 + dy, strip + 0.5, h);
    }
  }

  function loop(now) {
    const t = now / 1000;
    if (!document.hidden) whales.forEach((wh) => { if (wh.visible && wh.w) draw(wh, t); });
    requestAnimationFrame(loop);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const wh = whales.find((x) => x.fig === e.target);
      if (wh) { wh.visible = e.isIntersecting; if (wh.visible && !wh.w) fit(wh); }
    });
  }, { rootMargin: '100px' });

  function setup(img, i) {
    const fig = img.parentElement;   // .card-image on the cards, .lu-go in the size line-up
    const canvas = document.createElement('canvas');
    canvas.className = 'card-swim';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.animationDelay = `${-(i * 1.7) % 7}s`;
    const wh = { fig, img, canvas, ctx: canvas.getContext('2d'), beat: 2.8 + (i % 4) * 0.25, offset: i * 0.9, visible: false };
    if (!fit(wh)) wh.w = 0;
    fig.appendChild(canvas);
    fig.classList.add('swimming');
    whales.push(wh);
    io.observe(fig);
  }

  document.querySelectorAll('.card-image img, .lu-go img').forEach((img, i) => {
    const go = () => { if (!img.classList.contains('img-missing') && img.naturalWidth) setup(img, i); };
    if (img.complete) go(); else img.addEventListener('load', go, { once: true });
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => whales.forEach((wh) => { wh.w = 0; if (wh.visible) fit(wh); }), 150);
  });
  requestAnimationFrame(loop);
})();
