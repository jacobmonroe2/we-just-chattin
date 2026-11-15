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

// Most-watched reel: load each TikTok embed only as it nears the viewport
const toks = document.querySelectorAll('.tok-frame iframe[data-src]');
if (toks.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(({ target: f, isIntersecting }) => {
      if (isIntersecting && !f.src) { f.src = f.dataset.src; io.unobserve(f); }
    });
  }, { root: null, rootMargin: '400px 0px', threshold: 0 });
  toks.forEach(f => io.observe(f));
} else {
  toks.forEach(f => { f.src = f.dataset.src; });
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
