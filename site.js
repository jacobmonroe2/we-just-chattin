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


// Submit a prompt. Set PROMPT_ENDPOINT to a Formspree / Getform / Basin URL to collect submissions;
// until then the form opens a prefilled email instead.
const PROMPT_ENDPOINT = '';
const PROMPT_EMAIL = 'hello@wejustchattin.com';
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
    if (!data.prompt || data.prompt.trim().length < 8) { status.className = 'prompt-status err'; status.textContent = 'Give us the whole prompt first.'; text.focus(); return; }
    status.className = 'prompt-status'; status.textContent = 'Sending…'; submit.disabled = true;
    if (PROMPT_ENDPOINT) {
      try {
        const r = await fetch(PROMPT_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) });
        if (!r.ok) throw new Error(r.status);
        pform.reset(); status.className = 'prompt-status ok'; status.textContent = 'Got it. If it makes the cut you’ll see it on the Yard.';
      } catch (err) {
        status.className = 'prompt-status err'; status.textContent = 'That didn’t go through. Try again, or DM it to @wejchattin.';
      }
    } else {
      const body = `Prompt: ${data.prompt}\n\nName: ${data.name || '-'}\nHandle: ${data.handle || '-'}\nSchool / city: ${data.school || '-'}\nCredit me: ${data.credit ? 'yes' : 'no'}`;
      window.location.href = `mailto:${PROMPT_EMAIL}?subject=${encodeURIComponent('Prompt for We Just Chattin')}&body=${encodeURIComponent(body)}`;
      status.className = 'prompt-status ok'; status.textContent = 'Your email app should open with the prompt filled in. If it doesn’t, DM it to @wejchattin.';
    }
    submit.disabled = false;
  });
}
