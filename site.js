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

// Clips reel: load + play only when visible, tap for sound (one at a time)
const clips = document.querySelectorAll('.clip video[data-src]');
if (clips.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(({ target: v, isIntersecting }) => {
      if (isIntersecting) {
        if (!v.src) { v.src = v.dataset.src; v.load(); }
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, { root: null, rootMargin: '200px 0px', threshold: 0.25 });
  clips.forEach(v => io.observe(v));

  clips.forEach(v => v.parentElement.addEventListener('click', () => {
    const fig = v.parentElement;
    const wasOn = fig.classList.contains('sound');
    clips.forEach(o => { o.muted = true; o.parentElement.classList.remove('sound'); });
    if (!wasOn) { v.muted = false; fig.classList.add('sound'); v.currentTime = 0; v.play().catch(() => {}); }
  }));
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
