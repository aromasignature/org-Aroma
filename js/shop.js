// =============================================================================
// AROMA SIGNATURE+ — SHOP ENGINE (SEARCH, MULTI-FILTERING & SORTING)
// =============================================================================

const ShopLogic = {
  searchQuery: '',
  selectedCategories: [],
  currentCategory: '',
  minPrice: 0,
  maxPrice: 5000,
  selectedConcerns: [],
  selectedTypes: [],
  sortBy: 'popular',

  init: () => {
    const params = new URLSearchParams(window.location.search);
    
    // Determine category from URL param, currentCategory property, or category HTML file path
    let targetCategory = params.get('category') || ShopLogic.currentCategory || '';
    if (!targetCategory && window.location.pathname.includes('/categories/')) {
      const filename = window.location.pathname.split('/').pop() || '';
      targetCategory = filename.replace('.html', '');
    }

    if (targetCategory) {
      const normCat = typeof normalizeCategory === 'function' ? normalizeCategory(targetCategory) : targetCategory;
      ShopLogic.selectedCategories = [normCat];
      ShopLogic.currentCategory = normCat;
    }
    
    const filterParam = params.get('filter');
    if (filterParam === 'bestseller') ShopLogic.sortBy = 'popular';
    else if (filterParam === 'new') ShopLogic.sortBy = 'newest';

    ShopLogic.searchQuery = params.get('q') || '';
    ShopLogic.sortBy = params.get('sort') || ShopLogic.sortBy;

    // Build dynamic filter options (concerns, types) from PRODUCTS_DATA
    ShopLogic.populateDynamicFilters();

    // Sync category checkboxes with initial selectedCategories
    ShopLogic.syncCheckboxes();

    // Bind event handlers for search, sort, and filter inputs
    ShopLogic.bindEvents();

    // Perform initial render
    ShopLogic.render();
  },

  // Sync checkboxes with current selectedCategories
  syncCheckboxes: () => {
    const norm = typeof normalizeCategory === 'function' ? normalizeCategory : (c => c);
    document.querySelectorAll('input[name="category"], input[name="category-mobile"]').forEach(cb => {
      cb.checked = ShopLogic.selectedCategories.some(sc => norm(sc) === norm(cb.value));
    });
  },

  // Dynamically extract unique concerns & product types from PRODUCTS_DATA
  populateDynamicFilters: () => {
    const concernsSet = new Set();
    const typesSet = new Set();
    const allProducts = (typeof ProductCatalog !== 'undefined' && typeof ProductCatalog.getAll === 'function')
      ? ProductCatalog.getAll()
      : (typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA : []);

    allProducts.forEach(p => {
      if (p.concerns && Array.isArray(p.concerns)) {
        p.concerns.forEach(c => concernsSet.add(c));
      }
      if (p.productType) {
        typesSet.add(p.productType);
      }
    });

    const concernsList = Array.from(concernsSet).sort();
    const typesList = Array.from(typesSet).sort();

    // Render Concerns Checkboxes
    const renderCheckboxes = (containerId, items, nameAttr) => {
      const el = document.getElementById(containerId);
      if (!el) return;
      el.innerHTML = items.map(item => `
        <label class="filter-checkbox-label">
          <input type="checkbox" name="${nameAttr}" value="${item}">
          <span>${item}</span>
        </label>
      `).join('');
    };

    renderCheckboxes('filter-concerns-desktop', concernsList, 'concern');
    renderCheckboxes('filter-concerns-mobile', concernsList, 'concern-mobile');

    renderCheckboxes('filter-types-desktop', typesList, 'type');
    renderCheckboxes('filter-types-mobile', typesList, 'type-mobile');
  },

  bindEvents: () => {
    // Search Input
    const searchInput = document.getElementById('shop-search-input');
    if (searchInput) {
      searchInput.value = ShopLogic.searchQuery;
      searchInput.addEventListener('input', (e) => {
        ShopLogic.searchQuery = e.target.value.trim();
        ShopLogic.render();
      });
    }

    // Sort Selector
    const sortSelect = document.getElementById('shop-sort-select');
    if (sortSelect) {
      sortSelect.value = ShopLogic.sortBy;
      sortSelect.addEventListener('change', (e) => {
        ShopLogic.sortBy = e.target.value;
        ShopLogic.render();
      });
    }

    // Price Inputs
    const minPriceInput = document.getElementById('price-min');
    const maxPriceInput = document.getElementById('price-max');
    if (minPriceInput && maxPriceInput) {
      minPriceInput.addEventListener('input', (e) => {
        ShopLogic.minPrice = parseFloat(e.target.value) || 0;
        ShopLogic.render();
      });
      maxPriceInput.addEventListener('input', (e) => {
        ShopLogic.maxPrice = parseFloat(e.target.value) || 5000;
        ShopLogic.render();
      });
    }

    // Checkbox Listeners (Desktop & Mobile Sync)
    document.addEventListener('change', (e) => {
      if (e.target.matches('input[name="category"], input[name="category-mobile"]')) {
        ShopLogic.updateSelectedFromCheckboxes('category', 'selectedCategories');
      }
      if (e.target.matches('input[name="concern"], input[name="concern-mobile"]')) {
        ShopLogic.updateSelectedFromCheckboxes('concern', 'selectedConcerns');
      }
      if (e.target.matches('input[name="type"], input[name="type-mobile"]')) {
        ShopLogic.updateSelectedFromCheckboxes('type', 'selectedTypes');
      }
    });

    // Mobile Drawer Open & Close
    const filterMobileBtn = document.getElementById('open-mobile-filter');
    const mobileDrawer = document.getElementById('mobile-filter-drawer');
    const mobileOverlay = document.getElementById('mobile-filter-overlay');
    const mobileCloseBtn = document.getElementById('close-mobile-filter');

    filterMobileBtn?.addEventListener('click', () => {
      mobileDrawer?.classList.add('is-active');
      mobileOverlay?.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    });

    const closeDrawer = () => {
      mobileDrawer?.classList.remove('is-active');
      mobileOverlay?.classList.remove('is-active');
      document.body.style.overflow = '';
    };

    mobileCloseBtn?.addEventListener('click', closeDrawer);
    mobileOverlay?.addEventListener('click', closeDrawer);
  },

  updateSelectedFromCheckboxes: (attrName, stateKey) => {
    const checked = Array.from(document.querySelectorAll(`input[name="${attrName}"]:checked, input[name="${attrName}-mobile"]:checked`))
      .map(cb => cb.value);
    ShopLogic[stateKey] = Array.from(new Set(checked));
    ShopLogic.render();
  },

  // Master Filter Pipeline
  getFilteredProducts: () => {
    const allProducts = (typeof ProductCatalog !== 'undefined' && typeof ProductCatalog.getAll === 'function')
      ? ProductCatalog.getAll()
      : (typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA : []);
    let products = [...allProducts];

    const norm = typeof normalizeCategory === 'function' ? normalizeCategory : (c => c);

    // 1. Strict Category Filter
    if (ShopLogic.selectedCategories && ShopLogic.selectedCategories.length > 0) {
      const selectedNorms = ShopLogic.selectedCategories.map(c => norm(c));
      products = products.filter(p => selectedNorms.includes(norm(p.category)));
    }

    // 2. Text Search (Name, Description, Product Type, Concerns)
    if (ShopLogic.searchQuery) {
      const q = ShopLogic.searchQuery.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.fullDescription && p.fullDescription.toLowerCase().includes(q)) ||
        (p.productType && p.productType.toLowerCase().includes(q)) ||
        (p.concerns && p.concerns.some(c => c.toLowerCase().includes(q)))
      );
    }

    // 3. Price Range Filter
    products = products.filter(p => p.price >= ShopLogic.minPrice && p.price <= ShopLogic.maxPrice);

    // 4. Skin / Hair Concern Filter
    if (ShopLogic.selectedConcerns.length > 0) {
      products = products.filter(p => 
        p.concerns && p.concerns.some(c => ShopLogic.selectedConcerns.includes(c))
      );
    }

    // 5. Product Type Filter
    if (ShopLogic.selectedTypes.length > 0) {
      products = products.filter(p => p.productType && ShopLogic.selectedTypes.includes(p.productType));
    }

    // 6. Sorting Pipeline
    if (ShopLogic.sortBy === 'popular') {
      products.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    } else if (ShopLogic.sortBy === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (ShopLogic.sortBy === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    } else if (ShopLogic.sortBy === 'newest') {
      products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return products;
  },

  resetFilters: () => {
    ShopLogic.searchQuery = '';
    ShopLogic.selectedCategories = [];
    ShopLogic.currentCategory = '';
    ShopLogic.minPrice = 0;
    ShopLogic.maxPrice = 5000;
    ShopLogic.selectedConcerns = [];
    ShopLogic.selectedTypes = [];
    ShopLogic.sortBy = 'popular';

    // Clear inputs in DOM
    const searchInput = document.getElementById('shop-search-input');
    if (searchInput) searchInput.value = '';

    const sortSelect = document.getElementById('shop-sort-select');
    if (sortSelect) sortSelect.value = 'popular';

    const minPriceInput = document.getElementById('price-min');
    const maxPriceInput = document.getElementById('price-max');
    if (minPriceInput) minPriceInput.value = '';
    if (maxPriceInput) maxPriceInput.value = '';

    document.querySelectorAll('.filter-checkbox-label input[type="checkbox"]').forEach(cb => cb.checked = false);

    ShopLogic.render();
  },

  render: () => {
    const gridEl = document.getElementById('shop-product-grid');
    const countEl = document.getElementById('shop-product-count');
    const countMobileEl = document.getElementById('shop-product-count-mobile');
    if (!gridEl) return;

    const filtered = ShopLogic.getFilteredProducts();

    if (countEl) {
      countEl.textContent = `${filtered.length} Product${filtered.length !== 1 ? 's' : ''} Found`;
    }
    if (countMobileEl) {
      countMobileEl.textContent = `${filtered.length} Product${filtered.length !== 1 ? 's' : ''}`;
    }

    // Empty state requirement: clean message
    if (filtered.length === 0) {
      const isCategoryPage = window.location.pathname.includes('/categories/') || (ShopLogic.selectedCategories && ShopLogic.selectedCategories.length > 0);
      gridEl.innerHTML = `
        <div class="shop-empty-state" style="grid-column: 1 / -1; text-align: center; padding: 4.5rem 1.5rem; background-color: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md);">
          <div style="width: 64px; height: 64px; margin: 0 auto 1.2rem; background-color: var(--color-bg-cream); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted);">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <h3 style="font-size: 1.8rem; margin-bottom: 0.6rem; font-family: var(--font-heading);">No products available</h3>
          <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 1.8rem;">${isCategoryPage ? 'No products currently available in this category.' : 'Try changing your search or filters.'}</p>
          ${!window.location.pathname.includes('/categories/') ? `<button class="btn btn-primary" onclick="ShopLogic.resetFilters()">Clear All Filters</button>` : `<a href="../shop.html" class="btn btn-primary">Browse All Products</a>`}
        </div>
      `;
      return;
    }

    gridEl.innerHTML = filtered.map(p => UIComponents.renderProductCard(p)).join('');
  }
};
