function setLanguage(lang) {
    document.getElementById("btn-hu").classList.remove("active", "inactive");
    document.getElementById("btn-en").classList.remove("active", "inactive");
  
    if (lang === "hu") {
      document.getElementById("btn-hu").classList.add("active");
      document.getElementById("btn-en").classList.add("inactive");
    } else {
      document.getElementById("btn-en").classList.add("active");
      document.getElementById("btn-hu").classList.add("inactive");
    }
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
