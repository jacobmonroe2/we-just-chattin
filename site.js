document.getElementById('year').textContent = new Date().getFullYear();

const btn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav nav');
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
