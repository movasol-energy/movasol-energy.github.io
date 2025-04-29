(function() {
  const STORAGE_KEY = 'theme';
  const html   = document.documentElement;
  const body   = document.body;

  // Bootstrap v5 theming via data-bs-theme, plus custom .dark-theme hook
  function applyTheme(theme, toggleBtn) {
    // 1) BS5 attribute
    html.setAttribute('data-bs-theme', theme);

    // 2) Custom dark-theme class (for any bespoke overrides)
    body.classList.toggle('dark-theme', theme === 'dark');
    const header = document.querySelector('.header') || document.getElementById('header');
    if (header) header.classList.toggle('dark-theme', theme === 'dark');

    // 3) Button icon + aria state
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

    // If no manual preference, fallback to system
    if (!current) {
      current = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    // 1) Initialize UI
    applyTheme(current, toggleBtn);

    // 2) Persist if user toggles
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const next = html.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
        applyTheme(next, toggleBtn);
        localStorage.setItem(STORAGE_KEY, next);
      });
    }

    // 3) Optional: listen for OS-level changes if no manual override
    if (!localStorage.getItem(STORAGE_KEY) && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', e => {
        const sys = e.matches ? 'dark' : 'light';
        applyTheme(sys, toggleBtn);
      });
    }
  }

  // Kick off after DOM is parsed
  document.addEventListener('DOMContentLoaded', initThemeModule);
})();