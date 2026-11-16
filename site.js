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


// Submit a prompt: posts into the existing "Submit a Question to We Just Chattin" Google Form
// (forms.gle/vDZNpmKJJKwaNk2fA). Field IDs come from that form's viewform page.
const GFORM = {
  action: 'https://docs.google.com/forms/d/e/1FAIpQLSc9SlSyv2TjT7oyOdWRL9bVRzURPA8oCS2pVTiSn0mSEm655A/formResponse',
  fields: { prompt: 'entry.603961555', name: 'entry.1803886240', ideas: 'entry.1909569520' }
};
const pform = document.getElementById('prompt-form');
if (pform) {
  const text = pform.querySelector('#p-text');
  const status = pform.querySelector('.prompt-status');
  const submit = pform.querySelector('button[type="submit"]');
  document.querySelectorAll('.chip-btn').forEach(b => b.addEventListener('click', () => { text.value = b.textContent; text.focus(); }));
  pform.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(pform).entries());
    if (data._gotcha) return;
    if (!data.prompt || data.prompt.trim().length < 8) { status.className = 'prompt-status err'; status.textContent = 'Give us the whole question first.'; text.focus(); return; }
    status.className = 'prompt-status'; status.textContent = 'Sending\u2026'; submit.disabled = true;
    const body = new URLSearchParams();
    body.set(GFORM.fields.prompt, data.prompt.trim());
    body.set(GFORM.fields.name, (data.name || '').trim());
    body.set(GFORM.fields.ideas, (data.ideas || '').trim());
    try {
      await fetch(GFORM.action, { method: 'POST', mode: 'no-cors', body });
      pform.reset(); status.className = 'prompt-status ok'; status.textContent = 'Got it. If it makes the cut you\u2019ll see it on the Yard.';
    } catch (err) {
      status.className = 'prompt-status err'; status.textContent = 'That didn\u2019t go through. Try again, or DM it to @wejchattin.';
    }
    submit.disabled = false;
  });
}
