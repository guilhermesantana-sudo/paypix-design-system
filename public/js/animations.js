/* ============================================================
   animations.js: confete, ripple, shake, flip, loop automático
   ============================================================ */

const CONFETTI_COLORS = ['#F39208', '#F8AF4F', '#EF7E5A', '#A7C945', '#9ED7EB', '#B26F9A'];

function spawnConfetti(stage, count) {
  count = count || 24;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    piece.style.background = color;
    piece.style.left = Math.random() * 100 + '%';
    piece.style.animationDelay = (Math.random() * 0.4) + 's';
    piece.style.animationDuration = (1.4 + Math.random() * 0.8) + 's';
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    if (Math.random() > 0.6) piece.style.borderRadius = '50%';
    if (Math.random() > 0.5) { piece.style.width = '6px'; piece.style.height = '10px'; }
    stage.appendChild(piece);
    setTimeout(() => piece.remove(), 2400);
  }
}

function replaySuccess() {
  const stage = document.getElementById('stage-success');
  if (!stage) return;
  const check = stage.querySelector('.success-check');
  const text  = stage.querySelector('.success-text');
  if (check) { const c = check.cloneNode(true); check.replaceWith(c); }
  if (text)  { const t = text.cloneNode(true);  text.replaceWith(t); }
  spawnConfetti(stage, 18);
}

function replayConfetti() {
  const stage = document.getElementById('stage-confetti');
  if (!stage) return;
  spawnConfetti(stage, 36);
}

function replayFlip() {
  const flip = document.getElementById('stage-flip');
  if (!flip) return;
  flip.classList.toggle('is-flipped');
}

function replayShake() {
  const card = document.getElementById('stage-shake');
  if (!card) return;
  const clone = card.cloneNode(true);
  clone.id = 'stage-shake';
  card.replaceWith(clone);
}

function replayRipple() {
  const btn = document.getElementById('stage-ripple');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  if (!rect.width) return;
  const ripple = document.createElement('span');
  ripple.className = 'ripple-effect';
  const size = Math.max(rect.width, rect.height) * 0.5;
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (rect.width  / 2 - size / 2) + 'px';
  ripple.style.top  = (rect.height / 2 - size / 2) + 'px';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
}

function replayPaypixPay() {
  const stage = document.getElementById('stage-paypix-pay');
  if (!stage) return;
  const root = stage.querySelector('#ppa-root');
  if (!root) return;
  const clone = root.cloneNode(true);
  clone.id = 'ppa-root';
  root.replaceWith(clone);
}

// Ripple no clique real do botão
document.querySelectorAll('.ripple-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    const size = Math.max(rect.width, rect.height) * 0.5;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top  = (e.clientY - rect.top  - size / 2) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// Hooks dos botões "↻ Repetir"
document.querySelectorAll('[data-replay]').forEach(btn => {
  btn.addEventListener('click', () => {
    const kind = btn.getAttribute('data-replay');
    if (kind === 'success')    replaySuccess();
    if (kind === 'confetti')   replayConfetti();
    if (kind === 'flip')       replayFlip();
    if (kind === 'shake')      replayShake();
    if (kind === 'ripple')     replayRipple();
    if (kind === 'paypix-pay') replayPaypixPay();
  });
});

// ---- Auto-loop: roda apenas enquanto a demo esta no viewport ----
const _reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const _timers = {};
function _loop(key, fn, ms) {
  if (_reduceMotion || _timers[key]) return;
  fn();
  _timers[key] = setInterval(fn, ms);
}
function _stopLoop(key) {
  if (!_timers[key]) return;
  clearInterval(_timers[key]);
  delete _timers[key];
}

const successCard   = document.querySelector('[data-anim="success"]');
const confettiCard  = document.querySelector('[data-anim="confetti"]');
const flipCard      = document.querySelector('[data-anim="flip"]');
const shakeCard     = document.querySelector('[data-anim="shake"]');
const rippleCard    = document.querySelector('[data-anim="ripple"]');
const payPixPayCard = document.querySelector('[data-anim="paypix-pay"]');

if ('IntersectionObserver' in window) {
  const map = new Map([
    [successCard,   ['success', replaySuccess, 4200]],
    [confettiCard,  ['confetti', replayConfetti, 3200]],
    [flipCard,      ['flip', replayFlip, 4000]],
    [shakeCard,     ['shake', replayShake, 2800]],
    [rippleCard,    ['ripple', replayRipple, 2200]],
    [payPixPayCard, ['paypixpay', replayPaypixPay, 4200]],
  ].filter(([el]) => el));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const config = map.get(entry.target);
      if (!config) return;
      const [key, fn, ms] = config;
      if (entry.isIntersecting) _loop(key, fn, ms);
      else _stopLoop(key);
    });
  }, { threshold: 0.5 });
  if (successCard)   io.observe(successCard);
  if (confettiCard)  io.observe(confettiCard);
  if (flipCard)      io.observe(flipCard);
  if (shakeCard)     io.observe(shakeCard);
  if (rippleCard)    io.observe(rippleCard);
  if (payPixPayCard) io.observe(payPixPayCard);
}
