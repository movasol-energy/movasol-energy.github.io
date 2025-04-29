/**
* Template Name: UpConstruction
* Template URL: https://bootstrapmade.com/upconstruction-bootstrap-construction-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("theme-toggle");
    const body = document.body;
    // Ensure your header has the class "header" or update this selector
    const header = document.querySelector(".header");

    // Function to apply theme classes consistently
    function applyThemeClasses(theme) {
        if (theme === "dark") {
            body.classList.add("dark-theme");
            // Only add class to header if header element exists
            if (header) header.classList.add("dark-theme");
            // Update button icon (ensure you have Bootstrap Icons CSS included)
            if (toggleButton) toggleButton.innerHTML = '<i class="bi bi-sun"></i>';
            if (toggleButton) toggleButton.setAttribute('aria-pressed', 'true');
        } else {
            body.classList.remove("dark-theme");
            // Only remove class from header if header element exists
            if (header) header.classList.remove("dark-theme");
            // Update button icon
            if (toggleButton) toggleButton.innerHTML = '<i class="bi bi-moon"></i>';
             if (toggleButton) toggleButton.setAttribute('aria-pressed', 'false');
        }
    }

    // Function to set theme, apply classes, and save preference
    function setTheme(theme) {
        applyThemeClasses(theme);
        localStorage.setItem("theme", theme);
    }

    // --- Initial Theme Determination ---
    let initialTheme = localStorage.getItem("theme"); // Check storage first

    if (!initialTheme) { // If no theme saved in storage...
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            initialTheme = "dark";
        } else {
            initialTheme = "light"; // Default to light
        }
        // Note: We don't save the system preference to localStorage here,
        // allowing it to adapt if the system setting changes later (unless toggled manually).
    }

    // Apply the determined theme (either from storage or system preference)
    applyThemeClasses(initialTheme);
     // Set initial aria state based on the applied theme
    if (toggleButton) {
        toggleButton.setAttribute('aria-pressed', initialTheme === 'dark' ? 'true' : 'false');
    }


    // --- Toggle Button Logic ---
    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            // Determine new theme based on *current* body class
            const newTheme = body.classList.contains("dark-theme") ? "light" : "dark";
            // Set and save the *manual* preference
            setTheme(newTheme);
        });
    }

    // --- Scroll Logic --- (Corrected)
    // This function ONLY handles adding/removing the 'scrolled' class
    function handleScroll() {
        // Check if the header element actually exists
        if (!header) {
            return; // Exit if no header found
        }
        // Add/remove 'scrolled' class based on scroll position
        if (window.scrollY > 50) { // Adjust 50px threshold if needed
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        // The header will *automatically* have the correct theme styles
        // applied via CSS because it will have (or not have) the .dark-theme class
        // managed independently by applyThemeClasses().
    }

    // Add scroll listener ONLY if the header element exists
    if (header) {
        window.addEventListener("scroll", handleScroll);
        // Run once on load to set initial scrolled state correctly
        handleScroll();
    }

     // --- Optional: Listen for system preference changes ---
     // This is useful if the user hasn't manually set a theme yet
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            // Only react if there's NO manually saved theme preference
            if (!localStorage.getItem('theme')) {
                const newSystemTheme = event.matches ? 'dark' : 'light';
                applyThemeClasses(newSystemTheme); // Apply but don't save to storage
                 // Update aria state if button exists
                 if (toggleButton) {
                    toggleButton.setAttribute('aria-pressed', newSystemTheme === 'dark' ? 'true' : 'false');
                }
            }
        });
    }

  });


  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

})();