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
