/* ============================================================
   Catherine Gaeun Choi — Portfolio
   main.js
   ============================================================ */

// ---- CUSTOM CURSOR (desktop only) ----
const cursor = document.getElementById('cursor');
const isMobileWidth = () => window.innerWidth <= 600;

document.addEventListener('mousemove', e => {
  if (isMobileWidth()) return;
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, button, .project-card, .service-item, .skill-item').forEach(el => {
  el.addEventListener('mouseenter', () => { if (!isMobileWidth()) cursor.classList.add('hover'); });
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ---- SCROLL REVEAL (project cards) ----
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach(card => revealObserver.observe(card));

// ---- NAV SHRINK ON SCROLL ----
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const mobile  = window.innerWidth <= 600;
  const tablet  = window.innerWidth <= 900;
  const px      = mobile ? '20px' : tablet ? '28px' : '48px';
  const py      = window.scrollY > 60
    ? '12px'
    : mobile ? '16px' : tablet ? '18px' : '22px';
  nav.style.padding = `${py} ${px}`;
});

// ---- HAMBURGER / MOBILE NAV ----
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
let menuOpen = false;

function toggleMenu(open) {
  menuOpen = open;
  hamburger.classList.toggle('open', open);
  mobileNav.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

hamburger.addEventListener('click', () => toggleMenu(!menuOpen));

// Close when a nav link is tapped
document.querySelectorAll('.mobile-nav-link, .mobile-nav-email').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

// Close if viewport resizes to desktop width
window.addEventListener('resize', () => {
  if (window.innerWidth > 600 && menuOpen) toggleMenu(false);
});
