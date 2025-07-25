(function() {
  const STORAGE_KEY = 'theme';
  const html   = document.documentElement;
  const body   = document.body;

  function applyTheme(theme, toggleBtn) {
    html.setAttribute('data-bs-theme', theme);

    body.classList.toggle('dark', theme === 'dark');
    const header = document.querySelector('.header') || document.getElementById('header');
    if (header) header.classList.toggle('dark', theme === 'dark');

    if (toggleBtn) {
      toggleBtn.innerHTML = theme === 'dark'
        ? '<i class="bi bi-sun"></i>'
        : '<i class="bi bi-moon"></i>';
      toggleBtn.setAttribute('aria-pressed', theme === 'dark');
    }
  }

  function initThemeModule() {
    const toggleBtn = document.getElementById('theme-toggle');
    let current = localStorage.getItem(STORAGE_KEY);

    if (!current) {
      current = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    applyTheme(current, toggleBtn);

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const next = html.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
        applyTheme(next, toggleBtn);
        localStorage.setItem(STORAGE_KEY, next);
      });
    }

    if (!localStorage.getItem(STORAGE_KEY) && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', e => {
        const sys = e.matches ? 'dark' : 'light';
        applyTheme(sys, toggleBtn);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initThemeModule);
})();