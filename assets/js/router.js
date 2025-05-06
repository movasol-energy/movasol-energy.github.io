(function() {
  const STORAGE_KEY = 'language';
  const DEFAULT_LANG = 'hu';

  window.setLanguage = function(lang) {
    // split "/hu/rolunk/" → ["", "hu", "rolunk", ""]
    const parts = window.location.pathname.split('/').filter(p => p !== '');
    // parts = [ lang, slug, …maybe more ]
    const [, ...rest] = parts.length > 1 ? parts : [DEFAULT_LANG, 'index'];
    // build the new path
    const newPath = `/${lang}/${rest.join('/')}/`;
    // redirect & persist
    localStorage.setItem(STORAGE_KEY, lang);
    window.location.pathname = newPath;
  };

  // on load: if user has a saved lang and it doesn’t match URL, redirect
  document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    const currentLang = window.location.pathname.split('/')[1] || DEFAULT_LANG;
    if (saved !== currentLang) {
      // preserve the rest of the path
      setLanguage(saved);
    }
  });
})();