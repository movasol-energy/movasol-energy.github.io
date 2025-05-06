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
    window.location.href = newPath;
  };

  document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    const urlLang   = window.location.pathname.split('/')[1];

    // If root or mismatched, bounce into savedLang's index.html
    if (!SUPPORTED_LANGS.includes(urlLang) || savedLang !== urlLang) {
      window.setLanguage(savedLang);
    }
  });
})();
