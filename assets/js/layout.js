const layoutScript = document.currentScript;
const siteRoot = layoutScript
  ? new URL('../../', layoutScript.src)
  : new URL('./', window.location.href);

async function loadPartial(path, targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  try {
    const response = await fetch(new URL(path, siteRoot));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    target.innerHTML = await response.text();
  } catch (error) {
    console.error(`Could not load ${path}:`, error);
  }
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
  const button = document.getElementById('darkmode-toggle');
  if (!button) return;

  button.addEventListener('click', () => {
    root.classList.toggle('is-dark');
    localStorage.setItem(
      'theme',
      root.classList.contains('is-dark') ? 'dark' : 'light'
    );
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

  document.querySelectorAll('#main-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && new URL(href, window.location.href).pathname.split('/').pop() === current) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', initLayout);
