/* =============================================
   AI Ready School — Interactions & 3D Effects
   ============================================= */

// ---- Custom Cursor ----
const cursor = document.getElementById('cursor');
let mx = -100, my = -100, cx = -100, cy = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
});

(function animCursor() {
  cx += (mx - cx) * 0.18;
  cy += (my - cy) * 0.18;
  if (cursor) cursor.style.transform = `translate(${cx - 5}px, ${cy - 5}px)`;
  requestAnimationFrame(animCursor);
})();

// Cursor scale on hover
document.querySelectorAll('a, button, .pcard, .wcard, .tcard').forEach(el => {
  el.addEventListener('mouseenter', () => { if(cursor) cursor.style.transform += ' scale(2.5)'; cursor && (cursor.style.opacity='0.5'); });
  el.addEventListener('mouseleave', () => { cursor && (cursor.style.opacity='1'); });
});

// ---- Nav scroll ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ---- Mobile menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ---- 3D Card Tilt on mouse move ----
const scene = document.getElementById('scene');
const mainCard = document.querySelector('.card--main');
const cardShine = document.querySelector('.card__shine');

if (scene && mainCard) {
  scene.addEventListener('mousemove', e => {
    const rect = scene.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0–1
    const y = (e.clientY - rect.top) / rect.height;    // 0–1
    const rotY = (x - 0.5) * 20;   // -10 to +10 deg
    const rotX = (0.5 - y) * 12;   // -6 to +6 deg
    mainCard.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg) translateY(-4px)`;
    // Shine follows mouse
    if (cardShine) {
      cardShine.style.background = `radial-gradient(circle at ${x*100}% ${y*100}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
    }
  });

  scene.addEventListener('mouseleave', () => {
    mainCard.style.transform = 'rotateY(-8deg) rotateX(4deg)';
    if (cardShine) cardShine.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)';
  });
}

// ---- Product cards 3D tilt ----
document.querySelectorAll('.pcard').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotY = (x - 0.5) * 10;
    const rotX = (0.5 - y) * 8;
    card.style.transform = `translateY(-6px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ---- Scroll-in animations ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 60 * (entry.target.dataset.delay || 0));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.pcard, .wcard, .tcard, .sec-hd, .why__lft').forEach((el, i) => {
  el.classList.add('fade-up');
  el.dataset.delay = i;
  observer.observe(el);
});

// ---- Smooth anchor scroll with nav offset ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset - 16, behavior: 'smooth' });
  });
});

// ---- Typing animation on chat bubble (looped) ----
const chatBubbles = document.querySelectorAll('.cmsg__bub');
if (chatBubbles.length > 0) {
  // subtle opacity pulse on last bubble
  const last = chatBubbles[chatBubbles.length - 1];
  let visible = true;
  setInterval(() => {
    // just a gentle pulse to suggest activity
    last.style.opacity = visible ? '1' : '0.7';
    visible = !visible;
  }, 2000);
}