// =============================================================================
// AROMA SIGNATURE+ — UI COMPONENTS GENERATOR
// =============================================================================
//
// This file renders all reusable UI components (Header, Footer, Product Cards,
// Search, Navigation, Mobile Drawer, Hero, Benefits, Product Carousel,
// Homepage Product Sections) dynamically using SITE_CONFIG and PRODUCTS_DATA.
//
// =============================================================================

const UIComponents = {

  // ─── Render Announcement Bar ──────────────────────────────────────────────
  renderAnnouncementBar: () => {
    if (!SITE_CONFIG.showAnnouncement) return "";

    return `
      <div class="announcement-bar">
        <div class="container announcement-content">
          <svg class="announcement-icon" viewBox="0 0 24 24">
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5-1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5-1.5z"/>
          </svg>
          <span>${SITE_CONFIG.announcementText}</span>
        </div>
      </div>
    `;
  },

  // ─── Render Header & Navigation ──────────────────────────────────────────
  renderHeader: (activePage = "home") => {
    const basePath = window.location.pathname.includes('/categories/') ? '../' : '';

    const navItemsHtml = SITE_CONFIG.navigation.map(item => {
      const isSubmenu = item.submenu && item.submenu.length > 0;
      const itemUrl = basePath + item.url;
      const isActive = activePage.toLowerCase() === item.label.toLowerCase();

      if (isSubmenu) {
        const subLinks = item.submenu.map(sub => `
          <a href="${basePath + sub.url}" class="dropdown-link">${sub.label}</a>
        `).join('');

        return `
          <div class="nav-item-dropdown">
            <a href="${itemUrl}" class="nav-link ${isActive ? 'active' : ''}">
              ${item.label}
              <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
            <div class="dropdown-menu">
              ${subLinks}
            </div>
          </div>
        `;
      }

      return `
        <a href="${itemUrl}" class="nav-link ${isActive ? 'active' : ''}">${item.label}</a>
      `;
    }).join('');

    return `
      ${UIComponents.renderAnnouncementBar()}
      <header class="header-wrapper" id="site-header">
        <div class="container main-header">
          <!-- Logo -->
          <a href="${basePath}index.html" class="header-logo" aria-label="${SITE_CONFIG.brandName}">
            <img src="${basePath}${SITE_CONFIG.logoPath}" alt="${SITE_CONFIG.brandName} Logo">
          </a>

          <!-- Desktop Navigation -->
          <nav class="desktop-nav" aria-label="Main Navigation">
            ${navItemsHtml}
          </nav>

          <!-- Header Actions -->
          <div class="header-actions">
            <!-- Search Box -->
            <div class="search-container">
              <div class="search-input-wrap">
                <input type="text" id="global-search-input" class="search-input" placeholder="Search products..." autocomplete="off" aria-label="Search products">
                <button class="search-btn" aria-label="Submit search">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>
              <div id="search-results-dropdown" class="search-results-dropdown"></div>
            </div>

            <!-- Mobile Hamburger Button -->
            <button class="mobile-toggle" id="mobile-menu-toggle" aria-label="Toggle menu">
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </button>
          </div>
        </div>
      </header>

      <!-- Mobile Menu Drawer -->
      <div class="mobile-menu-overlay" id="mobile-menu-overlay"></div>
      <aside class="mobile-menu-drawer" id="mobile-menu-drawer" aria-label="Mobile Navigation">
        <div class="mobile-drawer-header">
          <img src="${basePath}${SITE_CONFIG.logoPath}" alt="${SITE_CONFIG.brandName}">
          <button class="mobile-close-btn" id="mobile-close-btn" aria-label="Close menu">&times;</button>
        </div>
        <nav class="mobile-nav-list">
          ${SITE_CONFIG.navigation.map(item => {
      const itemUrl = basePath + item.url;
      if (item.submenu) {
        return `
                <div>
                  <div class="mobile-nav-link">${item.label}</div>
                  <div class="mobile-submenu">
                    ${item.submenu.map(sub => `
                      <a href="${basePath + sub.url}" class="mobile-submenu-link">• ${sub.label}</a>
                    `).join('')}
                  </div>
                </div>
              `;
      }
      return `<a href="${itemUrl}" class="mobile-nav-link">${item.label}</a>`;
    }).join('')}
        </nav>
      </aside>
    `;
  },

  // ─── Phase 2: Promotional Hero Carousel ────────────────────────────
  renderHeroBanner: () => {
    const slides = (typeof getActiveBannerSlides === 'function')
      ? getActiveBannerSlides()
      : ((typeof BANNER_SLIDES !== 'undefined' && BANNER_SLIDES.length)
        ? BANNER_SLIDES
        : [{ image: 'Images/Banner.png', subtitle: '✦ Nourish • Revive • Glow Naturally ✦', title: 'Elevate Your <span>Natural Glow</span>', desc: "Indulge in premium botanical skincare, spa facial kits, and intense hair therapies.", ctaText: 'Explore Collection', ctaUrl: 'shop.html', ctaText2: 'Facial Kits', ctaUrl2: 'categories/facial-kits.html' }]);

    const slidesHTML = slides.map((s, i) => `
      <div class="hero-slide ${i === 0 ? 'is-active' : ''}" data-index="${i}">
        <div class="hero-banner-img-wrap">
          <img src="${s.image}" alt="${s.subtitle || 'Aroma Signature+ Banner'}" loading="${i === 0 ? 'eager' : 'lazy'}">
        </div>
        <div class="hero-banner-overlay"></div>
        <div class="container">
          <div class="hero-content">
            ${s.subtitle ? `<span class="hero-tag">${s.subtitle}</span>` : ''}
            <h1 class="hero-title">${s.title || ''}</h1>
            ${s.desc ? `<p class="hero-description">${s.desc}</p>` : ''}
            <div class="hero-cta-group">
              ${s.ctaText ? `<a href="${s.ctaUrl || 'shop.html'}" class="btn btn-accent btn-lg">${s.ctaText}</a>` : ''}
              ${s.ctaText2 ? `<a href="${s.ctaUrl2 || 'shop.html'}" class="btn btn-secondary btn-lg" style="color:#FFF;border-color:rgba(255,255,255,0.4);">${s.ctaText2}</a>` : ''}
            </div>
          </div>
        </div>
      </div>
    `).join('');

    const dotsHTML = slides.length > 1 ? `
      <div class="hero-dots">
        ${slides.map((_, i) => `<button class="hero-dot ${i === 0 ? 'is-active' : ''}" onclick="HeroCarousel.goTo(${i})" aria-label="Slide ${i + 1}"></button>`).join('')}
      </div>` : '';

    const arrowsHTML = slides.length > 1 ? `
      <button class="hero-arrow hero-arrow-prev" onclick="HeroCarousel.prev()" aria-label="Previous slide">&#8249;</button>
      <button class="hero-arrow hero-arrow-next" onclick="HeroCarousel.next()" aria-label="Next slide">&#8250;</button>` : '';

    return `
      <section class="hero-banner hero-carousel" id="hero-carousel">
        <div class="hero-slides-wrap">
          ${slidesHTML}
        </div>
        ${arrowsHTML}
        ${dotsHTML}
      </section>
    `;
  },

  // ─── Phase 2: Benefits Section ────────────────────────────────────────────
  renderBenefitsSection: () => {
    const benefits = [
      {
        name: "Paraben Free",
        desc: "Zero harsh chemical preservatives for complete skin safety.",
        icon: "Images/free.png"
      },
      {
        name: "Sulphate Free",
        desc: "Gentle natural cleansing that respects your skin & hair barrier.",
        icon: "Images/no-toxic.png"
      },
      {
        name: "Cruelty Free",
        desc: "Ethically crafted with love and 0% animal testing.",
        icon: "Images/c.png"
      },
      {
        name: "Dermatologically Tested",
        desc: "Rigorously tested formulas safe for all sensitive skin types.",
        icon: "Images/recycle.png"
      }
    ];

    return `
      <section class="section-padding benefits-section">
        <div class="container">
          <div class="benefits-header">
            <span class="subtitle-tag">Clean • Safe • Effective</span>
            <h2 class="benefits-title">In The Goodness Of Non-Toxic Beauty</h2>
          </div>
          <div class="benefits-grid">
            ${benefits.map(b => `
              <div class="benefit-card">
                <div class="benefit-icon-wrap">
                  <img src="${b.icon}" alt="${b.name}">
                </div>
                <h3 class="benefit-name">${b.name}</h3>
                <p class="benefit-desc">${b.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  },

  // ─── Phase 2: Product Showcase Carousel ────────────────────────────────────
  renderProductCarousel: () => {
    const carouselItems = (typeof getActiveShowcaseSlides === 'function')
      ? getActiveShowcaseSlides()
      : ((typeof SHOWCASE_SLIDES !== 'undefined' && SHOWCASE_SLIDES.length)
        ? SHOWCASE_SLIDES
        : [
          { img: "Images/Coursel/Bridal.jpg.png", title: "Bridal Glow Facial Kit", category: "Facial Kit" },
          { img: "Images/Coursel/Pearl.png", title: "Crystal Diamond Kit", category: "Facial Kit" },
          { img: "Images/Coursel/Diamond.png", title: "Pearl Radiance Kit", category: "Facial Kit" },
          { img: "Images/Coursel/Red Wine.png", title: "Red Wine Facial Kit", category: "Facial Kit" },
          { img: "Images/Coursel/Green Tea.png", title: "Green Tea Detox Kit", category: "Facial Kit" },
          { img: "Images/Coursel/Papaya.png", title: "Papaya Blemish Care Kit", category: "Facial Kit" },
          { img: "Images/Coursel/Whitening.png", title: "Ultra Whitening Kit", category: "Facial Kit" },
          { img: "Images/Coursel/Vitamin C.png", title: "Vitamin C Facial Kit", category: "Facial Kit" },
          { img: "Images/Coursel/Fruit.png", title: "Fruit Facial Kit", category: "Facial Kit" },
        ]);

    return `
      <section class="carousel-section">
        <div class="container">
          <div class="carousel-header">
            <span class="subtitle-tag">Signature Collections</span>
            <h2 class="carousel-title">Botanical Facial & Skin Showcase</h2>
            <p class="carousel-subtitle">Swipe or use arrows to discover our award-winning professional beauty kits.</p>
          </div>

          <div class="carousel-wrapper" id="home-carousel-wrapper">
            <button class="carousel-nav-btn carousel-btn-prev" id="carousel-prev-btn" aria-label="Previous slide">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button class="carousel-nav-btn carousel-btn-next" id="carousel-next-btn" aria-label="Next slide">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <div class="carousel-track-container" id="carousel-track-container">
              <div class="carousel-track" id="carousel-track">
                ${carouselItems.map(item => `
                  <div class="carousel-slide">
                    <img src="${item.img}" alt="${item.title}" class="carousel-slide-img" loading="lazy">
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="carousel-dots" id="carousel-dots-container">
              ${carouselItems.map((_, i) => `
                <button class="carousel-dot ${i === 0 ? 'is-active' : ''}" data-slide="${i}" aria-label="Go to slide ${i + 1}"></button>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    `;
  },

  // ─── Phase 3: Premium Reusable Product Card ───────────────────────────────
  // Contains ONLY: Product Image, Name, Short Description, Price, Rating, SHOP NOW
  // Strictly NO: Add to Cart, Cart, Buy Now, SALE badge, 10% OFF / 20% OFF / 22% OFF / Discount badge
  renderProductCard: (product) => {
    const basePath = window.location.pathname.includes('/categories/') ? '../' : '';
    const productUrl = `${basePath}product.html?id=${product.id}`;
    const primaryImg = basePath + (product.images[0] || 'Images/logo.png');

    // Build pack selector only if product has packs
    const hasPacks = product.packs && product.packs.length > 0;
    const packPrices = (typeof ProductCatalog !== 'undefined' && typeof ProductCatalog.getPackPrices === 'function')
      ? ProductCatalog.getPackPrices(product)
      : (product.packPrices || (product.packs ? product.packs.map(() => product.price) : [product.price]));
    const defaultPrice = (typeof ProductCatalog !== 'undefined' && typeof ProductCatalog.getPackPrice === 'function')
      ? ProductCatalog.getPackPrice(product, 0)
      : (packPrices[0] !== undefined ? packPrices[0] : product.price);

    const packSelectorHtml = hasPacks ? `
      <div class="pack-selector" role="group" aria-label="Select Pack Size">
        <p class="pack-selector-label">SELECT PACK / SIZE</p>
        <div class="pack-options-grid" data-pack-count="${product.packs.length}">
          ${product.packs.map((pack, i) => {
      const price = (typeof ProductCatalog !== 'undefined' && typeof ProductCatalog.getPackPrice === 'function')
        ? ProductCatalog.getPackPrice(product, i)
        : (packPrices[i] !== undefined ? packPrices[i] : product.price);
      return `
            <button
              type="button"
              class="pack-option-btn${i === 0 ? ' is-selected' : ''}"
              onclick="(function(btn){
                var card = btn.closest('.product-card');
                card.querySelectorAll('.pack-option-btn').forEach(function(b){ b.classList.remove('is-selected'); b.setAttribute('aria-pressed', 'false'); });
                btn.classList.add('is-selected');
                btn.setAttribute('aria-pressed', 'true');
                var priceEl = card.querySelector('.current-price');
                if(priceEl) priceEl.textContent = '₹' + btn.dataset.price;
                var ctaLink = card.querySelector('.product-card-cta a');
                if(ctaLink) ctaLink.href = '${productUrl}&pack=' + ${i};
              })(this)"
              data-price="${price}"
              data-pack-index="${i}"
              aria-pressed="${i === 0 ? 'true' : 'false'}"
            >
              <span class="pack-option-name">${pack}</span>
              <span class="pack-option-price">₹${price}</span>
            </button>
          `;
    }).join('')}
        </div>
      </div>
    ` : '';

    return `
      <article class="product-card">
        <div class="product-thumb-wrap">
          <a href="${productUrl}">
            <img src="${primaryImg}" alt="${product.name}" loading="lazy">
          </a>
        </div>
        <div class="product-card-body">
          <h3 class="product-title">
            <a href="${productUrl}">${product.name}</a>
          </h3>
          <p class="product-desc">${product.shortDescription || product.description}</p>
          <div class="product-rating">
            <span class="rating-stars">★★★★★</span>
            <span>${product.rating}</span>
            <span class="rating-count">(${product.reviewCount})</span>
          </div>
          ${packSelectorHtml}
          <div class="product-price-row">
            <span class="current-price">₹${defaultPrice}</span>
          </div>
          <div class="product-card-cta">
            <a href="${productUrl}" class="btn btn-primary btn-full">SHOP NOW</a>
          </div>
        </div>
      </article>
    `;
  },


  // ─── Phase 3: Homepage Category Section Renderer ──────────────────────────
  renderProductSection: (title, subtitle, categoryUrl, productsList) => {
    const basePath = window.location.pathname.includes('/categories/') ? '../' : '';
    const itemsToDisplay = (productsList || []).slice(0, 4);

    return `
      <section class="section-padding product-section-block">
        <div class="container">
          <div class="section-header-flex">
            <div>
              ${subtitle ? `<span class="subtitle-tag">${subtitle}</span>` : ''}
              <h2 class="section-title">${title}</h2>
            </div>
            <a href="${basePath}${categoryUrl}" class="see-more-link">
              See More Products <span>→</span>
            </a>
          </div>

          ${itemsToDisplay.length > 0 ? `
            <div class="product-grid-4">
              ${itemsToDisplay.map(p => UIComponents.renderProductCard(p)).join('')}
            </div>
          ` : `
            <div class="shop-empty-state" style="text-align: center; padding: 2.5rem 1.5rem; background-color: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md);">
              <p style="color: var(--color-text-muted); font-size: 0.95rem;">No products available in this category.</p>
            </div>
          `}
        </div>
      </section>
    `;
  },

  // ─── Phase 3: Render All 6 Homepage Product Sections ───────────────────────
  renderHomepageProductSections: () => {
    const allProducts = (typeof ProductCatalog !== 'undefined' && typeof ProductCatalog.getAll === 'function')
      ? ProductCatalog.getAll()
      : (typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA : []);

    const norm = typeof normalizeCategory === 'function' ? normalizeCategory : (c => c);

    const bestSellers = allProducts.filter(p => p.isBestSeller);
    const skinCare = allProducts.filter(p => norm(p.category) === 'skin-care');
    const facialKits = allProducts.filter(p => norm(p.category) === 'facial-kits');
    const hairCare = allProducts.filter(p => norm(p.category) === 'hair-care');
    const hairTreatment = allProducts.filter(p => norm(p.category) === 'hair-treatment');
    const selfCare = allProducts.filter(p => norm(p.category) === 'self-care');

    return `
      ${UIComponents.renderProductSection('Best Sellers', 'Customer Favorites', 'shop.html?filter=bestseller', bestSellers)}
      ${UIComponents.renderProductSection('Skin Care', 'Radiant Essentials', 'categories/skin-care.html', skinCare)}
      ${UIComponents.renderProductSection('Facial Kits', 'Salon Quality Therapy', 'categories/facial-kits.html', facialKits)}
      ${UIComponents.renderProductSection('Hair Care', 'Nourishing & Purifying', 'categories/hair-care.html', hairCare)}
      ${UIComponents.renderProductSection('Hair Treatment', 'Professional Restoration', 'categories/hair-treatment.html', hairTreatment)}
      ${UIComponents.renderProductSection('Self Care', 'Botanical Wellness', 'categories/self-care.html', selfCare)}
    `;
  },

  // ─── Phase 7: Trust Section ───────────────────────────────────────────────
  renderTrustSection: () => {
    const trustItems = [
      { icon: "🔒", title: "Secure Ordering", desc: "Direct WhatsApp SSL encrypted ordering flow" },
      { icon: "🚚", title: "Free Delivery", desc: "Free delivery on all online orders across India" },
      { icon: "💬", title: "WhatsApp Support", desc: "Instant customer service & order tracking" },
      { icon: "✓", title: "Quality Products", desc: "Botanical & dermatologically tested formulas" },
      { icon: "📦", title: "Easy Ordering", desc: "Quick checkout in under 30 seconds" }
    ];

    return `
      <section class="trust-section">
        <div class="container">
          <div class="trust-grid">
            ${trustItems.map(item => `
              <div class="trust-card">
                <div class="trust-icon">${item.icon}</div>
                <div class="trust-info">
                  <h4 class="trust-title">${item.title}</h4>
                  <p class="trust-desc">${item.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  },

  // ─── Phase 7: Customer Before & After Section ─────────────────────────────
  renderBeforeAfterSection: () => {
    // Note: No medical or guaranteed-result claims.
    const items = [
      {
        product: "Aroma Signature+ Papaya Facial Kit",
        routine: "7 Step Luxury Papaya Facial Therapy",
        description: "A professional facial therapy designed to help reduce pigmentation, blemishes, tan, and dullness while improving the overall appearance of the skin. It helps nourish and hydrate the skin, leaving it looking smoother, brighter, and naturally glowing.",
        beforeLabel: "Before Facial",
        afterLabel: "After Facial",
        beforeImg: "Images/fbefore.png",
        afterImg: "Images/fafter.png"
      },
      {
        product: "AROMA SIGNATURE+ KERATIN HAIR TREATMENT KIT",
        routine: "Intense Keratin Hair Treatment",
        description: "A professional keratin treatment designed to smoothen frizzy and unruly hair while improving softness, manageability, and natural-looking shine. It helps reduce frizz, smooth the hair cuticle, and leaves hair looking sleek, soft, and beautifully glossy.",
        beforeLabel: "Before Treatment",
        afterLabel: "After Treatment",
        beforeImg: "Images/Before Keratin.jpg",
        afterImg: "Images/After Keratin.jpg"
      },
      {
        product: "Aroma Signature+ Green Tea Facial Kit ",
        routine: "Acne Care Green Tea Facial Therapy",
        description: "A refreshing facial therapy that helps gently cleanse away surface impurities, remove excess oil, and revive tired-looking skin. Green Tea care leaves the skin feeling fresh, refined, and visibly radiant with a clean, healthy-looking glow.",
        beforeLabel: "Before Therapy",
        afterLabel: "After Therapy",
        beforeImg: "Images/acnebefore.jpg",
        afterImg: "Images/acneafter.jpg"
      }
    ];

    return `
      <section class="section-padding before-after-section">
        <div class="container">
          <div class="section-header-center">
            <span class="subtitle-tag">Visual Transformations</span>
            <h2 class="section-title">Customer Before & After</h2>
            <p class="section-subtitle">Real application results using Aroma Signature+ botanical kits.</p>
          </div>

          <div class="before-after-grid">
            ${items.map(item => `
              <div class="ba-card">
                <div class="ba-images-container">
                  <div class="ba-img-box">
                    <img src="${item.beforeImg}" alt="${item.product} - ${item.beforeLabel}">
                    <span class="ba-badge ba-badge-before">${item.beforeLabel}</span>
                  </div>
                  <div class="ba-divider-line"></div>
                  <div class="ba-img-box">
                    <img src="${item.afterImg}" alt="${item.product} - ${item.afterLabel}">
                    <span class="ba-badge ba-badge-after">${item.afterLabel}</span>
                  </div>
                </div>
                <div class="ba-card-body">
                  <span class="ba-product-tag">${item.product}</span>
                  <h3 class="ba-card-title">${item.routine}</h3>
                  <p class="ba-card-desc">${item.description}</p>
                </div>
              </div>
            `).join('')}
          </div>

          <p class="ba-disclaimer">
            * Disclaimer: Individual results may vary based on skin/hair type and usage routine. Cosmetic products are intended for appearance enhancement and do not constitute medical treatments or guaranteed outcomes.
          </p>
        </div>
      </section>
    `;
  },

  // ─── Phase 7: Customer Reviews Section ────────────────────────────────────
  renderCustomerReviewsSection: () => {
    // Complies with rules: genuine supplied reviews or clearly marked editable placeholder data.
    const reviews = [
      {
        name: "Priyanka Karan",
        product: "Aroma Signature+ Bridal Glow Facial Kit",
        rating: "★★★★★",
        score: "5.0",
        review: "The Bridal Facial Kit gave my skin a beautiful, fresh glow and made it feel soft and refreshed. Perfect for getting that special bridal-ready look before the big day!"
      },
      {
        name: "Dhruthi K",
        product: "Intense Keratin Hair Treatment Set",
        rating: "★★★★★",
        score: "5.0",
        review: "The Keratin Hair Treatment made my hair feel much smoother, softer, and easier to manage. It helped reduce frizz and dryness while making my hair look healthier and more nourished. I also noticed that my hair felt less rough and was much easier to style after the treatment. Really happy with the overall results."
      },
      {
        name: "Lakshmy Vasudev",
        product: "Aroma Signature+ De Tan Facial Kit",
        rating: "★★★★★",
        score: "5.0",
        review: "The De-Tan Facial Kit left my skin feeling fresh, soft, and clean after the treatment. It helped improve the appearance of dull and tanned skin while giving my face a brighter and more refreshed look. My skin felt smoother and well-nourished, and I really liked how fresh it looked after using the kit. Definitely happy with the results."
      }
    ];

    return `
      <section class="section-padding reviews-section">
        <div class="container">
          <div class="section-header-center">
            <span class="subtitle-tag">Customer Feedback</span>
            <h2 class="section-title">Customer Reviews</h2>
            <div class="placeholder-notice-badge">
              <span>What Our Customer Say About Aroma Signature+</span>
            </div>
          </div>

          <div class="reviews-grid-3">
            ${reviews.map(r => `
              <div class="review-card-item">
                <div class="review-card-top">
                  <div class="review-stars-wrap">
                    <span class="review-stars-gold">${r.rating}</span>
                    <span class="review-score">${r.score}</span>
                  </div>
                  <span class="review-editable-label">Customer</span>
                </div>
                <h4 class="review-product-name">${r.product}</h4>
                <p class="review-quote-text">"${r.review}"</p>
                <div class="review-author-row">
                  <div class="review-author-avatar">${r.name.charAt(1) || 'C'}</div>
                  <div class="review-author-info">
                    <span class="review-author-name">${r.name}</span>
                    <span class="review-buyer-status">Verified Customer</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  },

  // ─── Phase 7: About Aroma Signature+ Section ──────────────────────────────
  renderAboutSection: () => {
    return `
      <section class="section-padding about-section">
        <div class="container">
          <div class="about-grid">
            <div class="about-content">
              <span class="subtitle-tag">Symbol of Beauty</span>
              <h2 class="about-title">About ${SITE_CONFIG.brandName}</h2>
              <p class="about-lead">
                ${SITE_CONFIG.brandName} is dedicated to bringing professional beauty and personal care solutions closer to you. We offer premium facial kits, skincare essentials, hair care products, and salon-inspired treatments designed for effective and convenient beauty care.
              </p>
              <p class="about-text">
                From advanced hair reconstructions to glow-enhancing facial treatments and everyday skin essentials, we blend quality, care, and performance in every product. Experience professional beauty standards made simple, reliable, and accessible.
              </p>
              
              <div class="about-features-list">
                <div class="about-feature-item">
                  <span class="about-feature-icon">✦</span>
                  <div>
                    <strong>Professional Graded Quality:</strong>
                    <span>Effective facial kits, hair treatments, and skin care products designed for visible results.</span>
                  </div>
                </div>
                <div class="about-feature-item">
                  <span class="about-feature-icon">✦</span>
                  <div>
                    <strong>Complete Beauty Care:</strong>
                    <span>Skincare, facial kits, hair care and treatment solutions in one place.</span>
                  </div>
                </div>
                <div class="about-feature-item">
                  <span class="about-feature-icon">✦</span>
                  <div>
                    <strong>Easy Ordering:</strong>
                    <span>Quick and convenient ordering with dedicated customer support.</span>
                  </div>
                </div>
              </div>
              <div class="about-feature-item">
                  <span class="about-feature-icon">✦</span>
                  <div>
                    <strong>Delivery Across India:</strong>
                    <span>Get your favourite Aroma Signature+ products delivered to your doorstep.</span>
                  </div>
                </div>
              <div class="about-contact-strip">
                <span>Contact support: <strong>${SITE_CONFIG.phone}</strong> | <strong>${SITE_CONFIG.email}</strong></span>
              </div>
            </div>

            <div class="about-image-wrap">
              <img src="Images/Banner1.png" alt="${SITE_CONFIG.brandName} Philosophy" loading="lazy">
              <div class="about-image-badge">
                <span class="badge-big">100%</span>
                <span class="badge-sub">Dermetologically Tested </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  // ─── Phase 7: FAQ Accordion Section ────────────────────────────────────────
  // MUST Include EXACTLY:
  // 1. How do I order?
  // 2. Is delivery free?
  // 3. Is Cash on Delivery available?
  // 4. How long does delivery take?
  // 5. How can I contact you?
  // DO NOT include: 10% online discount, return/exchange policy.
  renderFAQSection: () => {
    const faqs = [
      {
        q: "How do I order?",
        a: "Simply click the <strong>SHOP NOW</strong> button on any product page, choose your desired pack size and quantity, fill in your delivery address details, and click submit. You will be automatically redirected to WhatsApp where your order summary is sent directly to our team for processing."
      },
      {
        q: "Is delivery free?",
        a: "Yes! Delivery is completely <strong>FREE</strong> on all online orders across India."
      },
      {
        q: "Is Cash on Delivery available?",
        a: "Cash on Delivery availability depends on your delivery PIN code. Please confirm COD option with our support team on WhatsApp after submitting your order details."
      },
      {
        q: "How long does delivery take?",
        a: "Standard delivery usually takes <strong>5 to 7 business days</strong> across India."
      },
      {
        q: "How can I contact you?",
        a: "You can reach us instantly via the 💬 <strong>Chat with us</strong> WhatsApp button on our website, call us at <strong>${SITE_CONFIG.phone}</strong>, or email us at <strong>${SITE_CONFIG.email}</strong>."
      }
    ];

    return `
      <section class="section-padding faq-section">
        <div class="container" style="max-width: 860px;">
          <div class="section-header-center">
            <span class="subtitle-tag">Got Questions?</span>
            <h2 class="section-title">Frequently Asked Questions</h2>
            <p class="section-subtitle">Find answers to common questions about ordering and delivery.</p>
          </div>

          <div class="faq-accordion-container">
            ${faqs.map((faq, index) => `
              <div class="faq-accordion-item ${index === 0 ? 'is-open' : ''}">
                <button class="faq-accordion-header" onclick="UIComponents.toggleFAQ(this)" aria-expanded="${index === 0 ? 'true' : 'false'}">
                  <span>${faq.q}</span>
                  <svg class="faq-accordion-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div class="faq-accordion-content">
                  <div class="faq-answer-inner">
                    <p>${faq.a}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  },

  toggleFAQ: (btn) => {
    const item = btn.closest('.faq-accordion-item');
    if (!item) return;
    const isOpen = item.classList.contains('is-open');

    // Close other FAQ items in same container
    const container = item.closest('.faq-accordion-container');
    if (container) {
      container.querySelectorAll('.faq-accordion-item').forEach(el => {
        el.classList.remove('is-open');
        const headerBtn = el.querySelector('.faq-accordion-header');
        if (headerBtn) headerBtn.setAttribute('aria-expanded', 'false');
      });
    }

    if (!isOpen) {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }
  },

  // ─── Render Footer (Phase 8 Pure Solid Black Footer) ─────────────────────
  renderFooter: () => {
    const basePath = window.location.pathname.includes('/categories/') ? '../' : '';

    return `
      <footer class="main-footer">
        <!-- Subtle Leaf Decoration Overlay -->
        <div class="footer-leaf-decor" aria-hidden="true"></div>

        <div class="container">
          <div class="footer-top">
            <!-- Brand & Contact Column -->
            <div class="footer-brand">
              <img src="images/wlogo.png" alt="${SITE_CONFIG.brandName}">
              <p style="margin-top: 0.8rem; margin-bottom: 1rem; color: #BBB; font-size: 0.9rem;">
                ${SITE_CONFIG.brandName} — Symbol of Beauty.<br>
                Premium Indian botanical beauty & personal care products.
              </p>
              
              <div class="footer-direct-contact">
                <div class="contact-info-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>Phone: <a href="tel:${SITE_CONFIG.phone}">${SITE_CONFIG.phone}</a></span>
                </div>
                <div class="contact-info-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <span>Email: <a href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a></span>
                </div>
              </div>

              <!-- Social Media Icons (Instagram, Facebook, YouTube, WhatsApp, LinkedIn if configured) -->
              <div class="social-links" style="margin-top: 1.5rem;">
                ${SITE_CONFIG.instagramUrl ? `
                  <a href="${SITE_CONFIG.instagramUrl}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                ` : ''}
                ${SITE_CONFIG.facebookUrl ? `
                  <a href="${SITE_CONFIG.facebookUrl}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="Facebook">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.815V8z"/></svg>
                  </a>
                ` : ''}
                ${SITE_CONFIG.youtubeUrl ? `
                  <a href="${SITE_CONFIG.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="YouTube">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                  </a>
                ` : ''}
                ${SITE_CONFIG.whatsappUrl ? `
                  <a href="${SITE_CONFIG.whatsappUrl}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="WhatsApp">
                    <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor"><path d="M16 2a14 14 0 0 0-12.14 21L2 29.86l7-1.84A14 14 0 1 0 16 2zm0 25.5a11.45 11.45 0 0 1-5.84-1.6l-.42-.25-4.34 1.14 1.16-4.23-.27-.44A11.5 11.5 0 1 1 16 27.5zm6.3-8.54c-.34-.17-2.04-1-2.36-1.12s-.55-.17-.78.17-.9 1.12-1.1 1.35-.4.26-.74.1-.15-.07-2.9-2.52c-2.14-1.9-3.58-4.27-4-5s-.04-.7.13-.87c.15-.15.34-.4.5-.6s.23-.34.34-.57a.7.7 0 0 0 0-.68c-.08-.17-.78-1.88-1.07-2.58s-.57-.59-.78-.6h-.67a1.3 1.3 0 0 0-.94.44A3.94 3.94 0 0 0 7 9.87a6.85 6.85 0 0 0 1.43 3.63c1.72 2.37 4.15 4.3 7.42 5.6 3.27 1.3 3.27.87 3.86.8s1.9-.78 2.17-1.53.27-1.4.19-1.53-.3-.21-.64-.38z"/></svg>
                  </a>
                ` : ''}
                ${SITE_CONFIG.linkedinUrl ? `
                  <a href="${SITE_CONFIG.linkedinUrl}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/></svg>
                  </a>
                ` : ''}
              </div>
            </div>

            <!-- Column 2: Our Products -->
            <div>
              <h4 class="footer-title">Our Products</h4>
              <ul class="footer-links-list">
                <li><a href="${basePath}shop.html?filter=new">New Products</a></li>
                <li><a href="${basePath}categories/skin-care.html">Skin Care</a></li>
                <li><a href="${basePath}categories/facial-kits.html">Facial Kits</a></li>
                <li><a href="${basePath}categories/hair-care.html">Hair Care</a></li>
                <li><a href="${basePath}categories/hair-treatment.html">Hair Treatments</a></li>
                <li><a href="${basePath}categories/self-care.html">Self Care</a></li>
              </ul>
            </div>

            <!-- Column 3: Information -->
            <div>
              <h4 class="footer-title">Information</h4>
              <ul class="footer-links-list">
                <li><a href="${basePath}contact.html">Contact Us</a></li>
                <li><a href="${basePath}about.html">Shipping</a></li>
                <li><a href="${basePath}about.html">Terms & Conditions</a></li>
                <li><a href="${basePath}about.html">Privacy Policy</a></li>
                <li><a href="${basePath}about.html">Cancellation Policy</a></li>
              </ul>
            </div>

          </div>

          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} ${SITE_CONFIG.brandName}. All rights reserved. — ${SITE_CONFIG.tagline}</p>
            <p>Designed for goDaddy Static Hosting</p>
          </div>
        </div>
      </footer>
    `;
  }
};

// ─── Hero Carousel Engine ─────────────────────────────────────────────────────
const HeroCarousel = {
  current: 0,
  timer: null,
  getTotal() {
    return document.querySelectorAll('.hero-slide').length;
  },
  goTo(idx) {
    const total = this.getTotal();
    if (total <= 0) return;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    slides.forEach(s => s.classList.remove('is-active'));
    dots.forEach(d => d.classList.remove('is-active'));
    this.current = (idx + total) % total;
    if (slides[this.current]) slides[this.current].classList.add('is-active');
    if (dots[this.current]) dots[this.current].classList.add('is-active');
  },
  next() {
    this.goTo(this.current + 1);
    this.resetTimer();
  },
  prev() {
    this.goTo(this.current - 1);
    this.resetTimer();
  },
  resetTimer() {
    clearInterval(this.timer);
    if (this.getTotal() > 1) {
      this.timer = setInterval(() => this.next(), 5500);
    }
  },
  init() {
    clearInterval(this.timer);
    this.current = 0;
    if (this.getTotal() > 1) {
      this.timer = setInterval(() => this.next(), 5500);
    }
  }
};

window.HeroCarousel = HeroCarousel;

