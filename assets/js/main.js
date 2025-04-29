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
   * 1 Scrolling: Add .scrolled to body once you pass 100px
   */
  function toggleScrolled() {
    const body   = document.body;
    const header = document.querySelector('#header');
    if (!header ||
        (!header.classList.contains('scroll-up-sticky') &&
         !header.classList.contains('sticky-top') &&
         !header.classList.contains('fixed-top'))
    ) return;

    if (window.scrollY > 100) body.classList.add('scrolled');
    else                  body.classList.remove('scrolled');
  }
  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load',  toggleScrolled);

  /**
   * 2 Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    });
  }

  /**
   * 3 Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) {
        document.body.classList.remove('mobile-nav-active');
        mobileNavToggleBtn.classList.replace('bi-x','bi-list');
      }
    });
  });

  /**
   * 4 Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  /**
   * 5 Scroll-top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (!scrollTop) return;
    window.scrollY > 100
      ? scrollTop.classList.add('active')
      : scrollTop.classList.remove('active');
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('load',   toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  }

  /**
   * 6 Animation on scroll init (AOS)
   */
  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
    }
  });

  /**
   * 7 GLightbox init
   */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }

  /**
   * 8 Isotope filters
   */
  document.querySelectorAll('.isotope-layout').forEach(isotopeItem => {
    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), () => {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: isotopeItem.dataset.layout || 'masonry',
        filter:     isotopeItem.dataset.defaultFilter || '*',
        sortBy:     isotopeItem.dataset.sort || 'original-order'
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(filterBtn => {
      filterBtn.addEventListener('click', () => {
        isotopeItem.querySelector('.filter-active').classList.remove('filter-active');
        filterBtn.classList.add('filter-active');
        initIsotope.arrange({ filter: filterBtn.dataset.filter });
        if (typeof AOS !== 'undefined') AOS.refresh();
      });
    });
  });

  /**
   * 9 Swiper sliders init
   */
  window.addEventListener('load', () => {
    document.querySelectorAll('.init-swiper').forEach(swiperEl => {
      const config = JSON.parse(swiperEl.querySelector('.swiper-config').textContent.trim());
      if (swiperEl.classList.contains('swiper-tab')) {
        initSwiperWithCustomPagination(swiperEl, config);
      } else {
        new Swiper(swiperEl, config);
      }
    });
  });

  /**
   * 10 PureCounter init
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /**
   * 11 Active highlights
   */
  document.addEventListener('DOMContentLoaded', () => {
    const path = location.pathname;            // e.g. "/hu/rolunk.html"
    document.querySelectorAll('#navmenu a').forEach(a => {
      if (a.getAttribute('href') === path) {
        a.classList.add('active');
      }
    });
  });

})();