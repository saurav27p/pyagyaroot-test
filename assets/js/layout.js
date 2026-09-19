/* ============================================================
   PragyaRoot — Master Layout Script
   Injects header + footer, handles theme toggle, mobile menu,
   and auto-updates the footer year.
   ============================================================ */

(function () {
  'use strict';

  // -------- 1. Inject Header & Footer --------
  function injectPartial(placeholderId, file, callback) {
    var el = document.getElementById(placeholderId);
    if (!el) return;

    fetch(file)
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load ' + file);
        return res.text();
      })
      .then(function (html) {
        el.innerHTML = html;
        if (typeof callback === 'function') callback();
      })
      .catch(function (err) {
        console.warn('[PragyaRoot] ' + err.message);
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectPartial('header-placeholder', 'assets/partials/header.html', initHeader);
    injectPartial('footer-placeholder', 'assets/partials/footer.html', initFooter);
  });

  // -------- 2. Header interactions --------
  function initHeader() {
    // Theme toggle
    var toggle = document.getElementById('themeToggle');
    if (toggle) {
      updateThemeIcon(toggle);
      toggle.addEventListener('click', function () {
        var isDark = document.documentElement.classList.toggle('is-dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(toggle);
      });
    }

    // Mobile burger
    var burger = document.getElementById('prBurger');
    var nav = document.getElementById('prNav');
    if (burger && nav) {
      burger.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        burger.innerHTML = open
          ? '<i class="fas fa-times"></i>'
          : '<i class="fas fa-bars"></i>';
      });

      // Close menu when a link is clicked
      nav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          nav.classList.remove('is-open');
          burger.setAttribute('aria-expanded', 'false');
          burger.innerHTML = '<i class="fas fa-bars"></i>';
        });
      });
    }
  }

  function updateThemeIcon(btn) {
    var isDark = document.documentElement.classList.contains('is-dark');
    btn.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  }

  // -------- 3. Footer interactions --------
  function initFooter() {
    var yearEl = document.getElementById('prYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

})();
