// =============================================================================
// AROMA SIGNATURE+ — MAIN APPLICATION SCRIPT
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Determine active page identifier for navigation highlight
  const path = window.location.pathname.split('/').pop() || 'index.html';
  let activePage = "home";
  if (path.includes('shop.html')) activePage = "shop";
  else if (path.includes('offers.html')) activePage = "offers";
  else if (path.includes('about.html')) activePage = "about us";
  else if (path.includes('contact.html')) activePage = "contacts";
  else if (path.includes('skin-care')) activePage = "shop";

  // 1. Mount Header
  const headerContainer = document.getElementById("header-mount");
  if (headerContainer) {
    headerContainer.innerHTML = UIComponents.renderHeader(activePage);
  }

  // 2. Mount Footer
  const footerContainer = document.getElementById("footer-mount");
  if (footerContainer) {
    footerContainer.innerHTML = UIComponents.renderFooter();
  }

  // 3. Mount Floating WhatsApp Button
  WhatsApp.renderFloatingButton();

  // 4. Initialize Mobile Menu Drawer Handlers
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileOverlay = document.getElementById("mobile-menu-overlay");
  const mobileDrawer = document.getElementById("mobile-menu-drawer");
  const mobileClose = document.getElementById("mobile-close-btn");

  const openMobileMenu = () => {
    mobileToggle?.classList.add("is-active");
    mobileOverlay?.classList.add("is-active");
    mobileDrawer?.classList.add("is-active");
    document.body.style.overflow = "hidden";
  };

  const closeMobileMenu = () => {
    mobileToggle?.classList.remove("is-active");
    mobileOverlay?.classList.remove("is-active");
    mobileDrawer?.classList.remove("is-active");
    document.body.style.overflow = "";
  };

  mobileToggle?.addEventListener("click", openMobileMenu);
  mobileOverlay?.addEventListener("click", closeMobileMenu);
  mobileClose?.addEventListener("click", closeMobileMenu);

  // Global Escape key listener for accessibility (closing drawers, modals, dropdowns)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileMenu();
      if (typeof WhatsApp !== 'undefined') WhatsApp.closeCheckoutModal();
      const searchDropdown = document.getElementById("search-results-dropdown");
      if (searchDropdown) searchDropdown.classList.remove("is-visible");
    }
  });

  // 5. Sticky Header Scroll Effect
  const header = document.getElementById("site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header?.classList.add("is-scrolled");
    } else {
      header?.classList.remove("is-scrolled");
    }
  });

  // 6. Live Search Dropdown Handler
  const searchInput = document.getElementById("global-search-input");
  const searchDropdown = document.getElementById("search-results-dropdown");

  if (searchInput && searchDropdown) {
    const basePath = window.location.pathname.includes('/categories/') ? '../' : '';

    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim();

      if (query.length < 2) {
        searchDropdown.classList.remove("is-visible");
        searchDropdown.innerHTML = "";
        return;
      }

      const results = ProductCatalog.search(query);

      if (results.length === 0) {
        searchDropdown.innerHTML = `<div class="search-no-results">No products found for "${query}"</div>`;
      } else {
        searchDropdown.innerHTML = results.slice(0, 5).map(item => `
          <a href="${basePath}product.html?id=${item.id}" class="search-result-item">
            <img src="${basePath + item.images[0]}" class="search-result-img" alt="${item.name}">
            <div class="search-result-info">
              <div class="search-result-title">${item.name}</div>
              <div class="search-result-price">₹${item.price}</div>
            </div>
          </a>
        `).join('');
      }

      searchDropdown.classList.add("is-visible");
    });

    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.remove("is-visible");
      }
    });

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `${basePath}shop.html?q=${encodeURIComponent(query)}`;
        }
      }
    });
  }

  // 7. Phase 2: Product Showcase Carousel Interactive Controller
  initProductCarousel();

  // 8. Page Specific Initializations
  if (path.includes('shop.html') || window.location.pathname.includes('/categories/')) {
    if (typeof ShopLogic !== 'undefined') {
      ShopLogic.init();
    }
  }

  if (path.includes('product.html')) {
    if (typeof ProductDetail !== 'undefined') {
      ProductDetail.init();
    }
  }

  // 9. Real-Time Admin Live Sync (Reflect edits immediately across tabs/windows)
  window.addEventListener('storage', (e) => {
    if (typeof refreshGlobalConfig === 'function') refreshGlobalConfig();

    // Re-mount header & announcement
    if (headerContainer && typeof UIComponents !== 'undefined') {
      headerContainer.innerHTML = UIComponents.renderHeader(activePage);
    }

    // If on homepage, re-render dynamic sections
    const heroMount = document.getElementById("hero-mount");
    if (heroMount && typeof UIComponents !== 'undefined') {
      heroMount.innerHTML = UIComponents.renderHeroBanner();
      if (typeof HeroCarousel !== 'undefined') HeroCarousel.init();
    }

    const carouselMount = document.getElementById("carousel-mount");
    if (carouselMount && typeof UIComponents !== 'undefined') {
      carouselMount.innerHTML = UIComponents.renderProductCarousel();
      initProductCarousel();
    }

    const productSectionsMount = document.getElementById("product-sections-mount");
    if (productSectionsMount && typeof UIComponents !== 'undefined') {
      productSectionsMount.innerHTML = UIComponents.renderHomepageProductSections();
    }

    // If on shop page, re-render products
    if (typeof ShopLogic !== 'undefined' && (path.includes('shop.html') || path.includes('offers.html'))) {
      ShopLogic.render();
    }
  });
});


// ─── Carousel Controller Function ─────────────────────────────────────────────
function initProductCarousel() {
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  const dotsContainer = document.getElementById('carousel-dots-container');
  const wrapper = document.getElementById('home-carousel-wrapper');

  if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

  const slides = Array.from(track.children);
  const dots = Array.from(dotsContainer.children);
  let currentIndex = 0;
  let autoplayTimer = null;

  const updateCarousel = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentIndex);
    });
  };

  prevBtn.addEventListener('click', () => {
    updateCarousel(currentIndex - 1);
    resetAutoplay();
  });

  nextBtn.addEventListener('click', () => {
    updateCarousel(currentIndex + 1);
    resetAutoplay();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideIndex = parseInt(e.target.dataset.slide, 10);
      updateCarousel(slideIndex);
      resetAutoplay();
    });
  });

  // Touch Swipe Support for Mobile
  let startX = 0;
  let currentX = 0;
  let isSwiping = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
    clearInterval(autoplayTimer);
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    currentX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    if (!isSwiping) return;
    const diffX = startX - currentX;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        updateCarousel(currentIndex + 1);
      } else {
        updateCarousel(currentIndex - 1);
      }
    }
    isSwiping = false;
    resetAutoplay();
  });

  // Autoplay functionality
  const startAutoplay = () => {
    autoplayTimer = setInterval(() => {
      updateCarousel(currentIndex + 1);
    }, 4500);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
    wrapper.addEventListener('mouseleave', startAutoplay);
  }

  startAutoplay();
}
