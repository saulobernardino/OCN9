(function () {
  'use strict';

  const panel = document.getElementById('panel-preprod');
  if (!panel) return;

  const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
  const oil = panel.querySelector('[data-oil]');
  const svg = oil.querySelector('svg');
  const follower = oil.querySelector('[data-oil-pointer]');
  const drops = Array.from(oil.querySelectorAll('[data-oil-drop]'), (drop, i) => ({
    drop, x: Number(drop.getAttribute('cx')), y: Number(drop.getAttribute('cy')),
    radius: Number(drop.getAttribute('r')), phase: i * 1.64
  }));
  const canvas = panel.querySelector('.hero__noise');
  const ctx = canvas.getContext('2d');
  const grain = document.createElement('canvas');
  grain.width = grain.height = 128;
  const grainCtx = grain.getContext('2d');
  const pixels = grainCtx.createImageData(grain.width, grain.height);

  let showOil = false;
  let showPhoto = false;
  let frame = 0;
  let previous = 0;
  let untilGrain = 0;
  let oilTime = 0;
  let x = 153;
  let y = 122;
  let target = null;

  function drawNoise() {
    if (!ctx) return;
    for (let i = 0; i < pixels.data.length; i += 4) {
      const value = Math.random() < 0.5 ? 0 : 255;
      pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = value;
      pixels.data[i + 3] = Math.random() * 98;
    }
    grainCtx.putImageData(pixels, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = ctx.createPattern(grain, 'repeat');
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function resizeNoise() {
    canvas.width = Math.max(1, canvas.clientWidth);
    canvas.height = Math.max(1, canvas.clientHeight);
    drawNoise();
  }

  function drawOil(t, step) {
    drops.forEach(({ drop, x, y, radius, phase }, i) => {
      const angle = t * (0.68 + i * 0.12) + phase;
      drop.setAttribute('cx', x + Math.cos(angle) * (17 + i * 3));
      drop.setAttribute('cy', y + Math.sin(angle + i) * (16 + i * 1.6));
      drop.setAttribute('r', radius + Math.sin(angle) * 3);
    });
    const to = target || { x: 153 + Math.cos(t * 0.92) * 31, y: 118 + Math.sin(t * 0.79) * 23 };
    const response = 1 - Math.exp(-step * 10);
    x += (to.x - x) * response;
    y += (to.y - y) * response;
    follower.setAttribute('cx', x);
    follower.setAttribute('cy', y);
  }

  function tick(now) {
    frame = 0;
    const step = previous ? Math.min(0.05, (now - previous) / 1000) : 0;
    previous = now;
    if (showOil) {
      oilTime += step;
      drawOil(oilTime, step);
    }
    if (showPhoto && now >= untilGrain) {
      drawNoise();
      untilGrain = now + 83;
    }
    sync();
  }

  function sync() {
    const run = motion.matches && !document.hidden && (showOil || showPhoto);
    if (run && !frame) frame = requestAnimationFrame(tick);
    if (!run) {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
    }
  }

  const visibility = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.target === oil) showOil = entry.isIntersecting;
      else showPhoto = entry.isIntersecting;
    });
    sync();
  });
  visibility.observe(oil);
  visibility.observe(canvas);
  new ResizeObserver(resizeNoise).observe(canvas);
  motion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);

  oil.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || !motion.matches) return;
    const matrix = svg.getScreenCTM();
    if (matrix) target = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
  }, { passive: true });

  oil.addEventListener('pointerleave', () => { target = null; });
})();
