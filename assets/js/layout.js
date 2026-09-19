async function loadPartial(url, targetId) {
  const res = await fetch(url);
  document.getElementById(targetId).innerHTML = await res.text();
}

async function initLayout() {
  await Promise.all([
    loadPartial('partials/header.html', 'header-placeholder'),
    loadPartial('partials/footer.html', 'footer-placeholder')
  ]);
  initDarkMode();
  initMobileMenu();
  markActiveNavLink();
}

function initDarkMode() {
  const root = document.documentElement;
  const btn = document.getElementById('darkmode-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    root.classList.toggle('is-dark');
    localStorage.setItem('theme', root.classList.contains('is-dark') ? 'dark' : 'light');
  });
}

function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

function markActiveNavLink() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current) a.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', initLayout);
