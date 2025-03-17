function setLanguage(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}

function loadLanguage() {
    let lang = localStorage.getItem('language') || 'hu'; // Default to Hungarian
    fetch(`assets/lang/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll("[data-translate]").forEach(el => {
                el.innerHTML = data[el.getAttribute("data-translate")];
            });
        });
}

document.addEventListener("DOMContentLoaded", loadLanguage);
