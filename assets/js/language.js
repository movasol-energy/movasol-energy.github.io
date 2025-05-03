(function() {
  const STORAGE_KEY = 'language';
  const DEFAULT_LANG = 'hu';

  window.setLanguage = function(lang) {
    const path = window.location.pathname;
  
    // Detect current language and filename
    const parts = path.split('/');
    const currentLang = parts[parts.length - 2]; // 'en' or 'hu'
    const filename = parts[parts.length - 1];    // e.g., 'index.html'
  
    // Redirect to the same file in the target language folder
    const newUrl = path.replace(`/${currentLang}/`, `/${lang}/`);
    window.location.href = newUrl;
  
    // Optional: store preference
    localStorage.setItem('language', lang);
  };

  document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    applyLanguage(lang);
  });

  function applyLanguage(lang) {
    localStorage.setItem(STORAGE_KEY, lang);

    fetch(`"/assets/lang/${lang}.json`)
      .then(res => res.json())
      .then(data => document.querySelectorAll('[data-translate]')
        .forEach(el => {
          const key = el.dataset.translate;
          if (data[key] != null) el.textContent = data[key];
        })
      )
      .catch(err => console.error('Language JSON load failed:', err));

    document.documentElement.setAttribute('lang', lang);

    updateSwitcher(lang);
  }

  function updateSwitcher(lang) {
    const btnHu = document.getElementById('btn-hu');
    const btnEn = document.getElementById('btn-en');
    if (!btnHu || !btnEn) return;

    btnHu.classList.toggle('active',   lang === 'hu');
    btnHu.classList.toggle('inactive', lang !== 'hu');
    btnEn.classList.toggle('active',   lang === 'en');
    btnEn.classList.toggle('inactive', lang !== 'en');
  }
})();
