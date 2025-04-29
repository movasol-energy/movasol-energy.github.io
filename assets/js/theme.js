(function() {
    const KEY = 'theme';
    const html = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
  
    document.addEventListener('DOMContentLoaded', () => {
      const saved = localStorage.getItem(KEY) || 'light';
      html.setAttribute('data-bs-theme', saved);
      updateButtonText(saved);
      bindToggle();
    });
  
    function updateButtonText(theme) {
      toggle.innerHTML = theme === 'dark'
        ? '<i class="bi bi-sun"></i> Light Mode'
        : '<i class="bi bi-moon"></i> Dark Mode';
    }
  
    function bindToggle() {
      if (!toggle) return;
      toggle.addEventListener('click', () => {
        const next = html.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
        html.setAttribute('data-bs-theme', next);
        localStorage.setItem(KEY, next);
        updateButtonText(next);
      });
    }
  })();
  