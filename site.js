// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const btn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav nav');
if (btn && nav) {
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? '✕' : '☰';
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = '☰';
  }));
}

// Most-watched reel: poster cards open the platform's player in a lightbox
const player = document.getElementById('player');
if (player) {
  const frame = player.querySelector('iframe');
  const link = player.querySelector('.player-link');
  const close = () => { frame.src = 'about:blank'; player.close(); };
  document.querySelectorAll('.tok-poster').forEach(btn => btn.addEventListener('click', () => {
    player.className = 'player ' + btn.dataset.platform;
    link.href = btn.dataset.link;
    link.textContent = 'Open on ' + (btn.dataset.platform === 'tiktok' ? 'TikTok' : 'Instagram') + ' ↗';
    frame.src = btn.dataset.embed;
    player.showModal();
  }));
  player.querySelector('.player-close').addEventListener('click', close);
  player.addEventListener('click', e => { if (e.target === player) close(); });
  player.addEventListener('cancel', e => { e.preventDefault(); close(); });
}

// Walk N' Talk promo: lazy-load, autoplay muted when visible, tap for sound
const walk = document.querySelector('.walk-video video');
if (walk) {
  const fig = walk.parentElement;
  const io = new IntersectionObserver(es => es.forEach(({isIntersecting}) => {
    if (isIntersecting) { if (!walk.src) { walk.src = walk.dataset.src; } walk.play().catch(() => {}); } else { walk.pause(); }
  }), { threshold: 0.3 });
  io.observe(walk);
  walk.addEventListener('click', () => { walk.muted = !walk.muted; fig.classList.toggle('sound', !walk.muted); if (!walk.muted) { walk.currentTime = 0; walk.play().catch(() => {}); } });
}

// Hero wall: make sure autoplay kicks in on browsers that need a nudge
document.querySelectorAll('.wall video').forEach((v, i) => {
  const offset = i * 9.5; // seconds: columns start on different people and cut at different times
  let done = false;
  const seek = () => {
    if (done || offset === 0) { done = true; return; }
    try { if (v.seekable.length && v.seekable.end(0) > offset) { v.currentTime = offset; done = true; } } catch (e) {}
  };
  seek();
  v.addEventListener('loadedmetadata', seek);
  v.addEventListener('canplay', seek);
  v.addEventListener('progress', seek);
  v.play().catch(() => {});
});

// Past events: photo grid opens a viewer with prev/next
const viewer = document.getElementById('viewer');
if (viewer) {
  const vimg = viewer.querySelector('img');
  const vcap = viewer.querySelector('.viewer-cap');
  let shots = [], idx = 0;
  const show = i => {
    idx = (i + shots.length) % shots.length;
    const im = shots[idx].querySelector('img');
    vimg.src = im.currentSrc || im.src; vimg.alt = im.alt; vcap.textContent = im.alt;
  };
  document.querySelectorAll('.shots').forEach(g => {
    const all = [...g.querySelectorAll('.shot')];
    all.forEach((b, i) => b.addEventListener('click', () => { shots = all; show(i); viewer.showModal(); }));
  });
  viewer.querySelector('.viewer-prev').addEventListener('click', () => show(idx - 1));
  viewer.querySelector('.viewer-next').addEventListener('click', () => show(idx + 1));
  viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', e => { if (e.target === viewer) viewer.close(); });
  viewer.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') show(idx - 1); if (e.key === 'ArrowRight') show(idx + 1); });
  viewer.addEventListener('close', () => { vimg.removeAttribute('src'); });
}
