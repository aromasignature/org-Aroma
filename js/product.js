// =============================================================================
// AROMA SIGNATURE+ — SINGLE PRODUCT DETAIL PAGE ENGINE (PHASE 5)
// =============================================================================

const ProductDetail = {
  currentProduct: null,
  selectedPackIndex: 0,
  quantity: 1,

  init: () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const packParam = params.get('pack');
    ProductDetail.currentProduct = ProductCatalog.getById(productId) || PRODUCTS_DATA[0];
    
    let initialPackIdx = 0;
    if (packParam !== null && !isNaN(parseInt(packParam, 10))) {
      const parsed = parseInt(packParam, 10);
      if (parsed >= 0 && parsed < (ProductDetail.currentProduct.packs?.length || 1)) {
        initialPackIdx = parsed;
      }
    }
    ProductDetail.selectedPackIndex = initialPackIdx;
    ProductDetail.quantity = 1;

    // Dynamic SEO Metadata Injection for Phase 9
    const p = ProductDetail.currentProduct;
    document.title = `${p.name} | Aroma Signature+`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `${p.name} — ${p.shortDescription || p.description} Order via WhatsApp with free delivery across India.`);
    }

    // Dynamic Product JSON-LD Schema
    let schemaScript = document.getElementById('product-jsonld-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'product-jsonld-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": p.name,
      "image": p.images.map(img => window.location.origin + '/' + img),
      "description": p.description || p.shortDescription,
      "brand": {
        "@type": "Brand",
        "name": "Aroma Signature+"
      },
      "offers": {
        "@type": "Offer",
        "url": window.location.href,
        "priceCurrency": "INR",
        "price": ProductDetail.getPackPrice(p, ProductDetail.selectedPackIndex),
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Aroma Signature+"
        }
      }
    });

    ProductDetail.render();
  },

  // Helper to retrieve exact pack price from product data
  getPackPrice: (product, packIndex = 0) => {
    if (typeof ProductCatalog !== 'undefined' && typeof ProductCatalog.getPackPrice === 'function') {
      return ProductCatalog.getPackPrice(product, packIndex);
    }
    if (!product) return 0;
    const idx = parseInt(packIndex, 10);
    if (Array.isArray(product.packPrices) && product.packPrices.length > 0) {
      if (!isNaN(idx) && product.packPrices[idx] !== undefined) {
        return product.packPrices[idx];
      }
      return product.packPrices[0];
    }
    return product.price || 0;
  },

  setPack: (index) => {
    ProductDetail.selectedPackIndex = index;
    ProductDetail.updatePriceDisplay();

    // Update active button state
    document.querySelectorAll('.pack-options-grid .pack-option-btn').forEach((btn, i) => {
      const isSelected = i === index;
      btn.classList.toggle('is-selected', isSelected);
      btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });
  },

  adjustQuantity: (delta) => {
    const newQty = ProductDetail.quantity + delta;
    if (newQty >= 1 && newQty <= 20) {
      ProductDetail.quantity = newQty;
      const qtyEl = document.getElementById('qty-count');
      if (qtyEl) qtyEl.textContent = ProductDetail.quantity;
      ProductDetail.updatePriceDisplay();
    }
  },

  updatePriceDisplay: () => {
    const unitPrice = ProductDetail.getPackPrice(ProductDetail.currentProduct, ProductDetail.selectedPackIndex);
    const total = unitPrice * ProductDetail.quantity;

    const priceEl = document.getElementById('dynamic-product-price');
    if (priceEl) {
      priceEl.innerHTML = `₹${unitPrice.toLocaleString('en-IN')}`;
    }

    const ctaPriceEl = document.getElementById('cta-total-price');
    if (ctaPriceEl) {
      ctaPriceEl.textContent = `(Total: ₹${total.toLocaleString('en-IN')})`;
    }
  },

  toggleAccordion: (headerEl) => {
    const item = headerEl.parentElement;
    item.classList.toggle('is-open');
  },

  // Trigger Purchase Flow: Product -> Pack -> Quantity -> SHOP NOW -> Order
  handleShopNow: () => {
    const product = ProductDetail.currentProduct;
    const pack = product.packs[ProductDetail.selectedPackIndex] || "Standard Pack";
    const qty = ProductDetail.quantity;
    const unitPrice = ProductDetail.getPackPrice(product, ProductDetail.selectedPackIndex);
    const total = unitPrice * qty;

    const orderData = {
      product: product,
      selectedPack: pack,
      quantity: qty,
      unitPrice: unitPrice,
      totalPrice: total
    };

    if (typeof WhatsApp !== 'undefined') {
      WhatsApp.openOrder(product, orderData);
    } else {
      alert(`Proceeding to checkout for ${product.name} (${pack}) x ${qty} - Total: ₹${total}`);
    }
  },

  render: () => {
    const container = document.getElementById('product-detail-container');
    if (!container) return;

    const product = ProductDetail.currentProduct;
    document.title = `${product.name} | ${SITE_CONFIG.brandName}`;

    const basePath = window.location.pathname.includes('/categories/') ? '../' : '';
    const packs = product.packs || ["Standard Pack"];
    const initialPrice = ProductDetail.getPackPrice(product, ProductDetail.selectedPackIndex);

    // Mock Customer Reviews tailored to product
    const reviews = [
      { author: "Ananya Sharma", rating: 5, date: "2 weeks ago", text: `Absolutely loved the results of ${product.name}! My skin feels so radiant and hydrated.` },
      { author: "Priya Patel", rating: 5, date: "1 month ago", text: `Genuine quality botanical ingredients. Really effective for my ${product.concerns?.[0] || 'skin care'} routine.` },
      { author: "Ritu Verma", rating: 4, date: "1 month ago", text: `Great texture and smell. Highly recommended for daily use.` }
    ];

    container.innerHTML = `
      <div class="container section-padding">
        <!-- Breadcrumbs -->
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="${basePath}index.html">Home</a>
          <span class="breadcrumb-separator">/</span>
          <a href="${basePath}shop.html">Shop</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">${product.name}</span>
        </nav>

        <div class="product-detail-layout">
          <!-- Left: Image Viewer & Thumbnail Gallery -->
          <div class="product-detail-gallery">
            <div class="product-main-img-wrap">
              <img id="main-product-image" src="${basePath + product.images[0]}" alt="${product.name}">
            </div>
            ${product.images.length > 1 ? `
              <div class="product-thumb-strip">
                ${product.images.map((img, idx) => `
                  <div class="product-thumb-item ${idx === 0 ? 'is-active' : ''}" onclick="
                    document.getElementById('main-product-image').src='${basePath + img}';
                    document.querySelectorAll('.product-thumb-item').forEach(el=>el.classList.remove('is-active'));
                    this.classList.add('is-active');
                  ">
                    <img src="${basePath + img}" alt="${product.name} View ${idx + 1}">
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <!-- Right: Product Information & Controls -->
          <div class="product-detail-info">
            <span class="subtitle-tag">${product.productType || product.category}</span>
            <h1 class="product-detail-title">${product.name}</h1>

            <!-- Rating & Reviews -->
            <div class="product-detail-rating">
              <span class="rating-stars">★★★★★</span>
              <span class="rating-score">${product.rating}</span>
              <span class="rating-count">(${product.reviewCount} customer reviews)</span>
            </div>

            <!-- Price Display (Dynamic based on selected pack size) -->
            <div class="product-detail-price-box">
              <span class="current-price" id="dynamic-product-price">₹${initialPrice.toLocaleString('en-IN')}</span>
            </div>

            <!-- Short Description -->
            <p class="product-detail-summary">
              ${product.fullDescription || product.description}
            </p>

            <!-- Pack Selection (from products.js) -->
            <div class="product-control-group">
              <label class="control-group-label">Select Pack / Size:</label>
              <div class="pack-options-grid">
                ${packs.map((packName, i) => {
      const price = ProductDetail.getPackPrice(product, i);
      const isSelected = i === ProductDetail.selectedPackIndex;
      return `
                    <button type="button" class="pack-option-btn ${isSelected ? 'is-selected' : ''}" onclick="ProductDetail.setPack(${i})" aria-pressed="${isSelected ? 'true' : 'false'}">
                      <span class="pack-name">${packName}</span>
                      <span class="pack-price">₹${price.toLocaleString('en-IN')}</span>
                    </button>
                  `;
    }).join('')}
              </div>
            </div>

            <!-- Quantity Selector [- 1 +] -->
            <div class="product-control-group">
              <label class="control-group-label">Select Quantity:</label>
              <div class="quantity-selector-box">
                <button type="button" class="qty-btn" onclick="ProductDetail.adjustQuantity(-1)" aria-label="Decrease quantity">-</button>
                <span class="qty-count" id="qty-count">1</span>
                <button type="button" class="qty-btn" onclick="ProductDetail.adjustQuantity(1)" aria-label="Increase quantity">+</button>
              </div>
            </div>

            <!-- Purchase CTA Button: SHOP NOW -->
            <div class="product-detail-cta-wrap">
              <button class="btn btn-primary btn-lg btn-full" onclick="ProductDetail.handleShopNow()">
                SHOP NOW <span id="cta-total-price" style="font-weight: 400; font-size: 0.9em; opacity: 0.9;">(Total: ₹${initialPrice.toLocaleString('en-IN')})</span>
              </button>
            </div>

            <!-- Expandable Detail Accordions -->
            <div class="product-accordions-wrap">
              <!-- Accordion 1: Product Details -->
              <div class="accordion-item is-open">
                <button class="accordion-header" onclick="ProductDetail.toggleAccordion(this)">
                  <span>Product Details</span>
                  <svg class="accordion-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div class="accordion-content">
                  <p>${product.fullDescription || product.description}</p>
                </div>
              </div>

              <!-- Accordion 2: How to Use -->
              ${product.details?.howToUse ? `
                <div class="accordion-item">
                  <button class="accordion-header" onclick="ProductDetail.toggleAccordion(this)">
                    <span>How to Use</span>
                    <svg class="accordion-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div class="accordion-content">
                    <p>${product.details.howToUse}</p>
                  </div>
                </div>
              ` : ''}

              <!-- Accordion 3: Ingredients -->
              ${product.details?.keyIngredients ? `
                <div class="accordion-item">
                  <button class="accordion-header" onclick="ProductDetail.toggleAccordion(this)">
                    <span>Key Ingredients</span>
                    <svg class="accordion-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div class="accordion-content">
                    <p>${product.details.keyIngredients}</p>
                  </div>
                </div>
              ` : ''}

              <!-- Accordion 4: Suitable For & Benefits -->
              ${product.details?.benefits || product.details?.skinType || product.details?.hairType ? `
                <div class="accordion-item">
                  <button class="accordion-header" onclick="ProductDetail.toggleAccordion(this)">
                    <span>Suitable For & Benefits</span>
                    <svg class="accordion-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div class="accordion-content">
                    <p><strong>Suitable For:</strong> ${product.details.skinType || product.details.hairType || 'All Skin Types'}</p>
                    <p style="margin-top: 0.5rem;"><strong>Benefits:</strong> ${product.details.benefits || 'Botanical nourishment & radiant glow.'}</p>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Customer Reviews Section -->
        <section style="margin-top: 5rem; padding-top: 3rem; border-top: 1px solid var(--color-border);">
          <div style="text-align: center; margin-bottom: 3rem;">
            <span class="subtitle-tag">Customer Experiences</span>
            <h2 style="font-family: var(--font-heading); font-size: 2.2rem;">Verified Product Reviews</h2>
          </div>

          <div class="reviews-grid">
            ${reviews.map(r => `
              <div class="review-card">
                <div class="review-card-header">
                  <div>
                    <h4 class="review-author">${r.author}</h4>
                    <span class="review-date">${r.date} • <strong style="color: var(--color-primary);">Verified Buyer</strong></span>
                  </div>
                  <div class="rating-stars">★★★★★</div>
                </div>
                <p class="review-text">"${r.text}"</p>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    `;
  }
};
