(function () {
  const STORAGE_KEY     = 'language';
  const DEFAULT_LANG    = 'hu';
  const SUPPORTED_LANGS = ['hu', 'en'];

  const huToEn = {
    'rolunk':                    'about',
    'kapcsolat':                 'contact',
    'hirek':                     'news',
    'hirek-details':             'news-details',
    'projektek':                 'projects',
    'projektek-details':         'projects-details',
    'szolgaltatasok':            'services',
    'szolgaltatasok-fejlesztes': 'services-development',
    'szolgaltatasok-kivitelezes':'services-design-and-build-services',
    'szolgaltatasok-szakszerviz':'services-certified-repairs',
    'szolgaltatasok-uzemeltetes':'services-operations',
    'szolgaltatasok-tanacsadas':'services-technical-and-financial-consulting',
    'szolgaltatasok-meres':      'services-testing-and-commissioning',
    'index':                     'index'
  };
  const enToHu = Object.fromEntries(
    Object.entries(huToEn).map(([hu, en]) => [en, hu])
  );

  // update the .active / .inactive classes on the two buttons
  function updateButtonState(lang) {
    const btnHu = document.getElementById('btn-hu');
    const btnEn = document.getElementById('btn-en');

    if (lang === 'hu') {
      btnHu.classList.add('active');
      btnHu.classList.remove('inactive');
      btnEn.classList.add('inactive');
      btnEn.classList.remove('active');
    } else {
      btnEn.classList.add('active');
      btnEn.classList.remove('inactive');
      btnHu.classList.add('inactive');
      btnHu.classList.remove('active');
    }
  }

  window.setLanguage = function (targetLang) {
    console.log('[router] setLanguage →', targetLang);

    const parts       = window.location.pathname.split('/').filter(Boolean);
    const currentLang = SUPPORTED_LANGS.includes(parts[0]) ? parts[0] : DEFAULT_LANG;
    const currentSlug = parts[1] || 'index';

    const map = (currentLang === 'hu' && targetLang === 'en')
      ? huToEn
      : (currentLang === 'en' && targetLang === 'hu')
      ? enToHu
      : null;

    const newSlug = map && map[currentSlug] ? map[currentSlug] : 'index';
    const newPath = (newSlug === 'index')
      ? `/${targetLang}/`
      : `/${targetLang}/${newSlug}/`;

    localStorage.setItem(STORAGE_KEY, targetLang);

    // pre-switch the button state for immediate feedback
    updateButtonState(targetLang);

    // then navigate
    window.location.href = newPath;
  };

  document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    const urlLang   = window.location.pathname.split('/')[1];

    // If root or mismatched, bounce into savedLang's index.html
    if (!SUPPORTED_LANGS.includes(urlLang) || savedLang !== urlLang) {
      window.setLanguage(savedLang);
      return;  // page is navigating away
    }

    // otherwise, set button state according to the active language
    updateButtonState(urlLang);
  });
})();
