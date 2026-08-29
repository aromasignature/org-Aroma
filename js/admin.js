// =============================================================================
// AROMA SIGNATURE+ — ADMIN DASHBOARD CONTROLLER & DATABASE SYNC
// =============================================================================
// Features:
// 1. Products Management: Add / Edit / Delete / Reorder + Visual Photos Manager
// 2. Hero Carousel Banners: Add / Edit / Delete / Reorder / Enable-Disable + Live Preview
// 3. Botanical Showcase Slideshow: Add / Edit / Delete / Reorder / Enable-Disable / Upload + Live Preview
// 4. Website Settings & Security: Announcement Bar, Contacts, Socials, Change Password
// 5. Instant Real-Time Database Sync across all live pages
// =============================================================================

const DEFAULT_ADMIN_PASSWORD = 'aroma2024';

const CATEGORIES = [
  { id: 'skin-care',       name: 'Skin Care' },
  { id: 'facial-kits',    name: 'Facial Kits' },
  { id: 'hair-care',      name: 'Hair Care' },
  { id: 'hair-treatment', name: 'Hair Treatment' },
  { id: 'self-care',      name: 'Self Care' },
];

// ─── State ────────────────────────────────────────────────────────────────────
let adminProducts = [];
let adminBanners = [];
let adminShowcaseSlides = [];
let adminSiteConfig = {};
let currentTab = 'products';

// ─── Server Base URL & Dynamic Auto-Discovery ─────────────────────────────
let resolvedApiBaseUrl = null;

async function getApiBaseUrl() {
  if (resolvedApiBaseUrl) {
    return resolvedApiBaseUrl;
  }

  const candidates = [];
  if (window.location.protocol.startsWith('http')) {
    candidates.push(window.location.origin);
  }
  candidates.push('http://localhost:3000');
  candidates.push('http://127.0.0.1:3000');
  candidates.push('http://localhost:3001');
  candidates.push('http://localhost:8080');

  const uniqueCandidates = [...new Set(candidates)];
  for (const url of uniqueCandidates) {
    try {
      const res = await fetch(`${url}/api/ping`, {
        signal: AbortSignal.timeout(600),
        cache: 'no-store'
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.ok) {
          resolvedApiBaseUrl = url;
          console.log(`[Admin] Connected to API server at ${url}`);
          return url;
        }
      }
    } catch (e) {
      // Continue searching next candidate
    }
  }

  resolvedApiBaseUrl = 'http://localhost:3000';
  return resolvedApiBaseUrl;
}

// ─── File-Write Helper ───────────────────────────────────────────────────────
// Sends the updated products array to the API server, which atomically rewrites
// js/products.js on disk as the permanent source of truth.
async function writeProductsToDisk(products) {
  try {
    const baseUrl = await getApiBaseUrl();
    const res = await fetch(`${baseUrl}/api/save-products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products })
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    const data = await res.json();
    if (data && data.ok) {
      console.log(`[Admin] js/products.js saved successfully — ${data.count} products on disk.`);
      return true;
    } else {
      console.error('[Admin] Server error while saving products:', data?.error);
      showToast(`⚠️ File write failed: ${data?.error || 'Unknown error'}`);
      return false;
    }
  } catch (err) {
    console.error('[Admin] Could not reach server to write js/products.js:', err.message);
    showToast('⚠️ Could not save to js/products.js — ensure server is running (npm start)');
    return false;
  }
}

let editingProductId = null;
let editingBannerIdx = null;
let editingShowcaseIdx = null;

let currentProductImages = [];
let searchQuery = '';
let filterCategory = 'all';
let draggedShowcaseIdx = null;

// ─── Authentication & Password Management ─────────────────────────────────────
function getStoredAdminPassword() {
  return localStorage.getItem('admin_password') || DEFAULT_ADMIN_PASSWORD;
}

function adminInit() {
  if (!sessionStorage.getItem('admin_auth')) {
    showLoginScreen();
    return;
  }
  showDashboard();
}

function showLoginScreen() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('dashboard-screen').style.display = 'none';
}

async function showDashboard() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('dashboard-screen').style.display = 'block';
  await loadData();
  renderCurrentTab();
}

function adminLogin() {
  const pwInput = document.getElementById('admin-password-input');
  const enteredPw = pwInput.value.trim();
  const currentPassword = getStoredAdminPassword();

  if (enteredPw === currentPassword) {
    sessionStorage.setItem('admin_auth', '1');
    document.getElementById('login-error').style.display = 'none';
    pwInput.value = '';
    showDashboard();
  } else {
    document.getElementById('login-error').style.display = 'block';
    pwInput.classList.add('shake');
    setTimeout(() => pwInput.classList.remove('shake'), 500);
  }
}

function adminLogout() {
  sessionStorage.removeItem('admin_auth');
  showLoginScreen();
}

function openPasswordModal() {
  document.getElementById('modal-new-pw').value = '';
  document.getElementById('modal-confirm-pw').value = '';
  document.getElementById('password-error').style.display = 'none';
  document.getElementById('password-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closePasswordModal() {
  document.getElementById('password-modal').style.display = 'none';
  document.body.style.overflow = '';
}

function saveNewPasswordFromModal() {
  const newPw = document.getElementById('modal-new-pw').value.trim();
  const confirmPw = document.getElementById('modal-confirm-pw').value.trim();
  const errorEl = document.getElementById('password-error');

  if (!newPw) {
    errorEl.textContent = '⚠️ Password cannot be empty.';
    errorEl.style.display = 'block';
    return;
  }

  if (newPw.length < 4) {
    errorEl.textContent = '⚠️ Password must be at least 4 characters long.';
    errorEl.style.display = 'block';
    return;
  }

  if (newPw !== confirmPw) {
    errorEl.textContent = '⚠️ Passwords do not match.';
    errorEl.style.display = 'block';
    return;
  }

  localStorage.setItem('admin_password', newPw);
  closePasswordModal();
  showToast('Admin password updated successfully! 🔑');
}

function handlePasswordChangeFromSettings() {
  const newPw = document.getElementById('set-new-password').value.trim();
  const confirmPw = document.getElementById('set-confirm-password').value.trim();

  if (!newPw) {
    showToast('⚠️ Please enter a new password.');
    return;
  }

  if (newPw.length < 4) {
    showToast('⚠️ Password must be at least 4 characters long.');
    return;
  }

  if (newPw !== confirmPw) {
    showToast('⚠️ Passwords do not match.');
    return;
  }

  localStorage.setItem('admin_password', newPw);
  document.getElementById('set-new-password').value = '';
  document.getElementById('set-confirm-password').value = '';
  showToast('Admin password updated successfully! 🔑');
}

// ─── Image Optimizer Utility ──────────────────────────────────────────────────
// Compresses uploaded images using HTML5 Canvas to keep storage lightweight and fast
function optimizeImageFile(file, maxWidth = 1200, maxHeight = 900, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Export as WebP if supported, fallback to JPEG
        let dataUrl = '';
        try {
          dataUrl = canvas.toDataURL('image/webp', quality);
          if (!dataUrl.startsWith('data:image/webp')) {
            dataUrl = canvas.toDataURL('image/jpeg', quality);
          }
        } catch (err) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image file.'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
}

// ─── Tab Switching ────────────────────────────────────────────────────────────
function switchTab(tab) {
  currentTab = tab;
  ['products', 'banners', 'showcase', 'settings'].forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    const sec = document.getElementById(`section-${t}`);
    if (btn) btn.classList.toggle('is-active', t === tab);
    if (sec) sec.classList.toggle('is-active', t === tab);
  });
  renderCurrentTab();
}

function renderCurrentTab() {
  if (currentTab === 'products') renderDashboard();
  else if (currentTab === 'banners') renderBanners();
  else if (currentTab === 'showcase') renderShowcaseSlides();
  else if (currentTab === 'settings') renderSettingsForm();
}

// ─── Load / Save State ────────────────────────────────────────────────────────
// loadData() is the entry point called when the Admin dashboard opens.
// The file js/products.js on disk is the SINGLE SOURCE OF TRUTH.
async function loadData() {
  // Clear any legacy localStorage override so it never masks disk changes
  localStorage.removeItem('admin_products');

  // 1. Products — fetch directly from disk via the local dev server API
  let loadedFromServer = false;
  try {
    const baseUrl = await getApiBaseUrl();
    const res = await fetch(`${baseUrl}/api/products?_t=${Date.now()}`, {
      signal: AbortSignal.timeout(2000),
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.ok && Array.isArray(data.products) && data.products.length > 0) {
        adminProducts = data.products;
        if (typeof PRODUCTS_DATA !== 'undefined') {
          PRODUCTS_DATA = adminProducts;
        }
        loadedFromServer = true;
        console.log(`[Admin] Products loaded directly from js/products.js on disk (${adminProducts.length} items).`);
      }
    }
  } catch (err) {
    console.warn('[Admin] Could not fetch products from API, falling back to loaded products.js:', err.message);
  }

  if (!loadedFromServer) {
    // Fall back to PRODUCTS_DATA loaded from <script src="js/products.js">
    if (typeof PRODUCTS_DATA !== 'undefined' && Array.isArray(PRODUCTS_DATA) && PRODUCTS_DATA.length > 0) {
      adminProducts = JSON.parse(JSON.stringify(PRODUCTS_DATA));
    } else {
      adminProducts = [];
    }
  }

  // 2. Hero Banners
  const savedBanners = localStorage.getItem('admin_banners');
  if (savedBanners) {
    try { adminBanners = JSON.parse(savedBanners); } catch (e) { adminBanners = []; }
  } else if (typeof DEFAULT_BANNER_SLIDES !== 'undefined' && DEFAULT_BANNER_SLIDES.length) {
    adminBanners = JSON.parse(JSON.stringify(DEFAULT_BANNER_SLIDES));
    saveBanners(false);
  } else if (typeof BANNER_SLIDES !== 'undefined' && BANNER_SLIDES.length) {
    adminBanners = JSON.parse(JSON.stringify(BANNER_SLIDES));
    saveBanners(false);
  } else {
    adminBanners = [];
  }

  // 3. Botanical Showcase Slides
  const savedShowcase = localStorage.getItem('admin_showcase_slides');
  if (savedShowcase) {
    try { adminShowcaseSlides = JSON.parse(savedShowcase); } catch (e) { adminShowcaseSlides = []; }
  } else if (typeof DEFAULT_SHOWCASE_SLIDES !== 'undefined' && DEFAULT_SHOWCASE_SLIDES.length) {
    adminShowcaseSlides = JSON.parse(JSON.stringify(DEFAULT_SHOWCASE_SLIDES));
    saveShowcaseSlides(false);
  } else if (typeof SHOWCASE_SLIDES !== 'undefined' && SHOWCASE_SLIDES.length) {
    adminShowcaseSlides = JSON.parse(JSON.stringify(SHOWCASE_SLIDES));
    saveShowcaseSlides(false);
  } else {
    adminShowcaseSlides = [];
  }

  // 4. Site Settings
  const savedConfig = localStorage.getItem('admin_site_config');
  if (savedConfig) {
    try { adminSiteConfig = JSON.parse(savedConfig); } catch (e) { adminSiteConfig = {}; }
  } else if (typeof DEFAULT_SITE_CONFIG !== 'undefined') {
    adminSiteConfig = JSON.parse(JSON.stringify(DEFAULT_SITE_CONFIG));
    saveSiteConfig(false);
  } else {
    adminSiteConfig = {};
  }
}

function notifyLiveWebsite() {
  if (typeof refreshGlobalConfig === 'function') refreshGlobalConfig();
  // Dispatch custom storage event for same-tab / parent listeners
  window.dispatchEvent(new Event('storage'));
}

async function saveProducts(notify = true) {
  // 1. Update in-memory reference immediately for active session
  if (typeof PRODUCTS_DATA !== 'undefined') {
    PRODUCTS_DATA = adminProducts;
  }
  // 2. Remove stale localStorage override so disk is always the truth
  localStorage.removeItem('admin_products');

  // 3. Write permanently to js/products.js on disk
  const saved = await writeProductsToDisk(adminProducts);
  if (notify) notifyLiveWebsite();
  return saved;
}

function saveBanners(notify = true) {
  localStorage.setItem('admin_banners', JSON.stringify(adminBanners));
  if (typeof BANNER_SLIDES !== 'undefined') {
    BANNER_SLIDES = adminBanners;
  }
  if (notify) notifyLiveWebsite();
}

function saveShowcaseSlides(notify = true) {
  localStorage.setItem('admin_showcase_slides', JSON.stringify(adminShowcaseSlides));
  if (typeof SHOWCASE_SLIDES !== 'undefined') {
    SHOWCASE_SLIDES = adminShowcaseSlides;
  }
  if (notify) notifyLiveWebsite();
}

function saveSiteConfig(notify = true) {
  localStorage.setItem('admin_site_config', JSON.stringify(adminSiteConfig));
  if (typeof SITE_CONFIG !== 'undefined') {
    SITE_CONFIG = { ...SITE_CONFIG, ...adminSiteConfig };
  }
  if (notify) notifyLiveWebsite();
}

// ══════════════════════════════════════════════════════════════════════════════
//  PRODUCTS SECTION
// ══════════════════════════════════════════════════════════════════════════════

function renderDashboard() {
  renderStats();
  renderProductTable();
}

function renderStats() {
  const total = adminProducts.length;
  const byCategory = {};
  CATEGORIES.forEach(c => byCategory[c.id] = 0);
  adminProducts.forEach(p => {
    if (byCategory[p.category] !== undefined) byCategory[p.category]++;
  });
  const bestSellers = adminProducts.filter(p => p.isBestSeller).length;
  const newArr = adminProducts.filter(p => p.isNew).length;

  const statTotal = document.getElementById('stat-total');
  const statBestsellers = document.getElementById('stat-bestsellers');
  const statNew = document.getElementById('stat-new');
  const catList = document.getElementById('stat-categories');

  if (statTotal) statTotal.textContent = total;
  if (statBestsellers) statBestsellers.textContent = bestSellers;
  if (statNew) statNew.textContent = newArr;

  if (catList) {
    catList.innerHTML = CATEGORIES.map(c =>
      `<div class="stat-cat-item">
        <span class="stat-cat-name">${c.name}</span>
        <span class="stat-cat-count">${byCategory[c.id] || 0}</span>
      </div>`
    ).join('');
  }
}

function renderProductTable() {
  let filtered = adminProducts;

  if (filterCategory !== 'all') {
    filtered = filtered.filter(p => p.category === filterCategory);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.productType || '').toLowerCase().includes(q)
    );
  }

  const tbody = document.getElementById('product-table-body');
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="empty-table-msg">
          <div>🔍 No products found</div>
          <small>Try a different search or category filter</small>
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((p) => {
    const realIdx = adminProducts.findIndex(prod => prod.id === p.id);
    const catName = CATEGORIES.find(c => c.id === p.category)?.name || p.category;
    const badges = [
      p.isBestSeller ? '<span class="badge badge-gold">⭐ Best</span>' : '',
      p.isNew ? '<span class="badge badge-green">🆕 New</span>' : '',
      p.isFeatured ? '<span class="badge badge-blue">✦ Featured</span>' : '',
    ].filter(Boolean).join(' ');

    const primaryImg = (p.images && p.images[0]) ? p.images[0] : 'Images/logo.png';

    return `
      <tr class="product-row" data-id="${p.id}">
        <td class="td-num">${realIdx + 1}</td>
        <td class="td-img">
          <img src="${primaryImg}" 
               alt="${p.name}" 
               class="product-thumb"
               onerror="this.src='Images/logo.png'">
        </td>
        <td class="td-name">
          <div class="product-name-cell">${p.name}</div>
          <div class="product-id-cell">${p.id}</div>
          ${badges ? `<div class="product-badges">${badges}</div>` : ''}
        </td>
        <td class="td-cat"><span class="cat-tag cat-${p.category}">${catName}</span></td>
        <td class="td-price">
          <span class="price-current">₹${(p.price || 0).toLocaleString('en-IN')}</span>
          ${p.oldPrice ? `<span class="price-old">₹${p.oldPrice.toLocaleString('en-IN')}</span>` : ''}
        </td>
        <td class="td-rating">
          <span class="rating-star">★</span> ${p.rating || '-'}
          <span class="review-count">(${p.reviewCount || 0})</span>
        </td>
        <td class="td-actions">
          <button class="btn-action btn-edit" onclick="openEditModal('${p.id}')" title="Edit">
            ✏️ Edit
          </button>
          <button class="btn-action btn-delete" onclick="deleteProduct('${p.id}')" title="Delete">
            🗑️ Delete
          </button>
          <button class="btn-action btn-move-up" onclick="moveProduct('${p.id}', -1)" title="Move Up" ${realIdx === 0 ? 'disabled' : ''}>↑</button>
          <button class="btn-action btn-move-down" onclick="moveProduct('${p.id}', 1)" title="Move Down" ${realIdx === adminProducts.length - 1 ? 'disabled' : ''}>↓</button>
        </td>
      </tr>`;
  }).join('');
}

function handleSearch(val) {
  searchQuery = val.trim();
  renderProductTable();
}

function handleCategoryFilter(val) {
  filterCategory = val;
  renderProductTable();
}

function moveProduct(id, direction) {
  const idx = adminProducts.findIndex(p => p.id === id);
  if (idx < 0) return;
  const newIdx = idx + direction;
  if (newIdx < 0 || newIdx >= adminProducts.length) return;
  [adminProducts[idx], adminProducts[newIdx]] = [adminProducts[newIdx], adminProducts[idx]];
  saveProducts();
  renderDashboard();
  showToast('Product order updated ✅');
}

function deleteProduct(id) {
  const product = adminProducts.find(p => p.id === id);
  if (!product) return;
  if (!confirm(`🗑️ Delete "${product.name}"?\n\nThis will remove it from the live catalog immediately.`)) return;
  adminProducts = adminProducts.filter(p => p.id !== id);
  saveProducts();
  renderDashboard();
  showToast(`"${product.name}" deleted successfully ✅`);
}

function resetProductsToOriginal() {
  if (!confirm('⚠️ Reset all product changes and restore original catalog?')) return;
  localStorage.removeItem('admin_products');
  if (typeof PRODUCTS_DATA !== 'undefined') {
    adminProducts = JSON.parse(JSON.stringify(PRODUCTS_DATA));
    saveProducts();
  }
  renderDashboard();
  showToast('Products reset to original catalog ✅');
}

// ─── Product Modal ────────────────────────────────────────────────────────────
function openAddModal() {
  editingProductId = null;
  resetProductForm();
  document.getElementById('modal-title').textContent = '➕ Add New Product';
  document.getElementById('product-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function openEditModal(id) {
  const product = adminProducts.find(p => p.id === id);
  if (!product) return;
  editingProductId = id;
  fillProductForm(product);
  document.getElementById('modal-title').textContent = '✏️ Edit Product';
  document.getElementById('product-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('product-modal').style.display = 'none';
  document.body.style.overflow = '';
  editingProductId = null;
}

function resetProductForm() {
  document.getElementById('product-form').reset();
  document.getElementById('f-id').value = '';
  document.getElementById('f-packs').value = '';
  document.getElementById('f-pack-prices').value = '';
  document.getElementById('f-concerns').value = '';
  document.getElementById('f-images').value = '';
  document.getElementById('f-new-image-input').value = '';
  document.getElementById('f-is-bestseller').checked = false;
  document.getElementById('f-is-featured').checked = false;
  document.getElementById('f-is-new').checked = false;
  currentProductImages = [];
  renderProductImagesPreview();
}

function fillProductForm(p) {
  document.getElementById('f-id').value = p.id || '';
  document.getElementById('f-name').value = p.name || '';
  document.getElementById('f-category').value = p.category || '';
  document.getElementById('f-product-type').value = p.productType || '';
  document.getElementById('f-price').value = p.price || '';
  document.getElementById('f-old-price').value = p.oldPrice || '';
  document.getElementById('f-rating').value = p.rating || '';
  document.getElementById('f-review-count').value = p.reviewCount || '';
  document.getElementById('f-description').value = p.description || '';
  document.getElementById('f-full-description').value = p.fullDescription || '';
  document.getElementById('f-packs').value = (p.packs || []).join('\n');
  document.getElementById('f-pack-prices').value = (p.packPrices || []).join('\n');
  document.getElementById('f-concerns').value = (p.concerns || []).join('\n');
  document.getElementById('f-skin-type').value = p.details?.skinType || p.details?.hairType || '';
  document.getElementById('f-ingredients').value = p.details?.keyIngredients || '';
  document.getElementById('f-how-to-use').value = p.details?.howToUse || '';
  document.getElementById('f-benefits').value = p.details?.benefits || '';
  document.getElementById('f-is-bestseller').checked = !!p.isBestSeller;
  document.getElementById('f-is-featured').checked = !!p.isFeatured;
  document.getElementById('f-is-new').checked = !!p.isNew;

  currentProductImages = Array.isArray(p.images) ? [...p.images] : [];
  document.getElementById('f-images').value = currentProductImages.join('\n');
  renderProductImagesPreview();
}

function renderProductImagesPreview() {
  const container = document.getElementById('product-images-preview-grid');
  if (!container) return;

  if (currentProductImages.length === 0) {
    container.innerHTML = `<div style="color:var(--text-muted);font-size:0.8rem;grid-column:1/-1;padding:0.5rem 0;">No photos added yet. Add an image path or upload below.</div>`;
    return;
  }

  container.innerHTML = currentProductImages.map((img, idx) => `
    <div class="image-thumb-card ${idx === 0 ? 'is-primary' : ''}">
      <img src="${img}" alt="Photo ${idx+1}" onerror="this.src='Images/logo.png'">
      ${idx === 0 ? '<span class="primary-tag">Primary</span>' : ''}
      <div class="image-thumb-actions">
        ${idx > 0 ? `<button type="button" class="img-action-btn" onclick="movePhoto(${idx}, -1)" title="Move Left / Make Primary">←</button>` : ''}
        ${idx < currentProductImages.length - 1 ? `<button type="button" class="img-action-btn" onclick="movePhoto(${idx}, 1)" title="Move Right">→</button>` : ''}
        <button type="button" class="img-action-btn btn-del" onclick="deletePhoto(${idx})" title="Remove Photo">✕</button>
      </div>
    </div>
  `).join('');
}

function addPhotoToProductForm() {
  const input = document.getElementById('f-new-image-input');
  const path = input.value.trim();
  if (!path) return;
  currentProductImages.push(path);
  input.value = '';
  document.getElementById('f-images').value = currentProductImages.join('\n');
  renderProductImagesPreview();
}

async function handleProductImageUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  try {
    showToast('Optimizing photo… ⏳');
    const optimizedDataUrl = await optimizeImageFile(file, 800, 800, 0.82);
    currentProductImages.push(optimizedDataUrl);
    document.getElementById('f-images').value = currentProductImages.join('\n');
    renderProductImagesPreview();
    showToast('Photo uploaded & optimized ✅');
  } catch (err) {
    showToast('⚠️ Could not process image file');
  }
}

function deletePhoto(idx) {
  currentProductImages.splice(idx, 1);
  document.getElementById('f-images').value = currentProductImages.join('\n');
  renderProductImagesPreview();
}

function movePhoto(idx, dir) {
  const target = idx + dir;
  if (target < 0 || target >= currentProductImages.length) return;
  [currentProductImages[idx], currentProductImages[target]] = [currentProductImages[target], currentProductImages[idx]];
  document.getElementById('f-images').value = currentProductImages.join('\n');
  renderProductImagesPreview();
}

function syncImagesFromTextarea() {
  currentProductImages = document.getElementById('f-images').value
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean);
  renderProductImagesPreview();
}

function generateId(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function saveProduct() {
  const name = document.getElementById('f-name').value.trim();
  const id = document.getElementById('f-id').value.trim();
  const category = document.getElementById('f-category').value;
  const price = parseFloat(document.getElementById('f-price').value);

  if (!name) { showFormError('Product name is required'); return; }
  if (!id) { showFormError('Product ID is required'); return; }
  if (!category) { showFormError('Please select a category'); return; }
  if (!price || isNaN(price)) { showFormError('Valid price is required'); return; }

  if (!editingProductId && adminProducts.find(p => p.id === id)) {
    showFormError(`ID "${id}" already exists. Please choose a different ID or edit existing.`);
    return;
  }

  const parseLines = (fieldId) =>
    document.getElementById(fieldId).value
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

  const parseNumberLines = (fieldId) =>
    parseLines(fieldId).map(Number).filter(n => !isNaN(n));

  const skinOrHairType = document.getElementById('f-skin-type').value.trim();
  const isHair = category.includes('hair');

  const product = {
    id,
    name,
    category,
    productType: document.getElementById('f-product-type').value.trim(),
    description: document.getElementById('f-description').value.trim(),
    fullDescription: document.getElementById('f-full-description').value.trim(),
    images: currentProductImages.length > 0 ? currentProductImages : parseLines('f-images'),
    price,
    oldPrice: parseFloat(document.getElementById('f-old-price').value) || null,
    rating: parseFloat(document.getElementById('f-rating').value) || 4.8,
    reviewCount: parseInt(document.getElementById('f-review-count').value) || 0,
    packs: parseLines('f-packs'),
    packPrices: parseNumberLines('f-pack-prices'),
    concerns: parseLines('f-concerns'),
    details: {
      [isHair ? 'hairType' : 'skinType']: skinOrHairType,
      keyIngredients: document.getElementById('f-ingredients').value.trim(),
      howToUse: document.getElementById('f-how-to-use').value.trim(),
      benefits: document.getElementById('f-benefits').value.trim(),
    },
    isBestSeller: document.getElementById('f-is-bestseller').checked,
    isFeatured: document.getElementById('f-is-featured').checked,
    isNew: document.getElementById('f-is-new').checked,
  };

  if (editingProductId) {
    const idx = adminProducts.findIndex(p => p.id === editingProductId);
    if (idx >= 0) adminProducts[idx] = product;
    showToast(`"${product.name}" updated on live website ✅`);
  } else {
    adminProducts.push(product);
    showToast(`"${product.name}" added to live catalog ✅`);
  }

  saveProducts();
  closeModal();
  renderDashboard();
}

function showFormError(msg) {
  const el = document.getElementById('form-error');
  el.textContent = '⚠️ ' + msg;
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  setTimeout(() => { el.style.display = 'none'; }, 4000);
}

function exportProducts() {
  const code = `const PRODUCTS_DATA = ${JSON.stringify(adminProducts, null, 2)};`;
  copyToClipboard(code, '✅ Product catalog backup copied to clipboard!');
}


// ══════════════════════════════════════════════════════════════════════════════
//  HERO CAROUSEL BANNERS SECTION
// ══════════════════════════════════════════════════════════════════════════════

function renderBanners() {
  const container = document.getElementById('banners-grid-container');
  if (!container) return;

  if (adminBanners.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-second);background:var(--bg-card);border-radius:var(--radius-lg);border:1px solid var(--border);">
        <div style="font-size:2rem;margin-bottom:0.5rem;">🖼️</div>
        <h3>No banner slides created</h3>
        <p style="color:var(--text-muted);font-size:0.85rem;margin-top:0.25rem;">Click "Add Banner Slide" to create your first homepage hero banner.</p>
      </div>`;
    return;
  }

  container.innerHTML = adminBanners.map((b, idx) => {
    const isEnabled = b.enabled !== false;
    return `
      <div class="banner-card ${isEnabled ? '' : 'is-disabled'}">
        <div class="banner-preview-wrap">
          <img src="${b.image}" class="banner-preview-img" alt="${b.subtitle || 'Banner Slide'}" onerror="this.src='Images/Banner.png'">
          <div class="banner-preview-overlay">
            <span class="banner-card-tag">${b.subtitle || '✦ Featured'}</span>
            <h3 class="banner-card-title">${b.title || 'Slide Title'}</h3>
          </div>
          <div class="card-badge-top">
            <span class="status-pill ${isEnabled ? 'active' : 'disabled'}">${isEnabled ? 'Active' : 'Disabled'}</span>
            <span class="banner-card-badge">Slide #${idx + 1}</span>
          </div>
        </div>

        <div class="banner-card-content">
          <div class="banner-card-desc">${b.desc || 'No description provided'}</div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:auto;">
            <div>🔘 <strong>${b.ctaText || 'Button 1'}:</strong> ${b.ctaUrl || '-'}</div>
            ${b.ctaText2 ? `<div>🔘 <strong>${b.ctaText2}:</strong> ${b.ctaUrl2 || '-'}</div>` : ''}
          </div>
        </div>

        <div class="banner-card-footer">
          <div style="display:flex;gap:0.3rem;">
            <button class="btn-action btn-move-up" onclick="moveBanner(${idx}, -1)" title="Move Left" ${idx === 0 ? 'disabled' : ''}>←</button>
            <button class="btn-action btn-move-down" onclick="moveBanner(${idx}, 1)" title="Move Right" ${idx === adminBanners.length - 1 ? 'disabled' : ''}>→</button>
          </div>
          <div style="display:flex;gap:0.4rem;align-items:center;">
            <button class="btn-action btn-edit" onclick="openEditBannerModal(${idx})">✏️ Edit</button>
            <button class="btn-action btn-delete" onclick="deleteBanner(${idx})">🗑️</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function openAddBannerModal() {
  editingBannerIdx = null;
  resetBannerForm();
  document.getElementById('banner-modal-title').textContent = '➕ Add Carousel Banner Slide';
  document.getElementById('banner-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
  updateBannerLivePreview();
}

function openEditBannerModal(idx) {
  const b = adminBanners[idx];
  if (!b) return;
  editingBannerIdx = idx;
  fillBannerForm(b);
  document.getElementById('banner-modal-title').textContent = `✏️ Edit Banner Slide #${idx + 1}`;
  document.getElementById('banner-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
  updateBannerLivePreview();
}

function closeBannerModal() {
  document.getElementById('banner-modal').style.display = 'none';
  document.body.style.overflow = '';
  editingBannerIdx = null;
}

function resetBannerForm() {
  document.getElementById('banner-form').reset();
  document.getElementById('bf-image').value = 'Images/Banner.png';
  document.getElementById('bf-subtitle').value = '✦ Nourish • Revive • Glow Naturally ✦';
  document.getElementById('bf-title').value = 'Elevate Your <span>Natural Glow</span>';
  document.getElementById('bf-desc').value = "Indulge in premium botanical skincare, spa facial kits, and intense hair therapies.";
  document.getElementById('bf-cta-text').value = 'Explore Collection';
  document.getElementById('bf-cta-url').value = 'shop.html';
  document.getElementById('bf-cta-text2').value = 'Facial Kits';
  document.getElementById('bf-cta-url2').value = 'categories/facial-kits.html';
  document.getElementById('bf-enabled').checked = true;
}

function fillBannerForm(b) {
  document.getElementById('bf-image').value = b.image || '';
  document.getElementById('bf-subtitle').value = b.subtitle || '';
  document.getElementById('bf-title').value = b.title || '';
  document.getElementById('bf-desc').value = b.desc || '';
  document.getElementById('bf-cta-text').value = b.ctaText || '';
  document.getElementById('bf-cta-url').value = b.ctaUrl || '';
  document.getElementById('bf-cta-text2').value = b.ctaText2 || '';
  document.getElementById('bf-cta-url2').value = b.ctaUrl2 || '';
  document.getElementById('bf-enabled').checked = b.enabled !== false;
}

function updateBannerLivePreview() {
  const img = document.getElementById('bf-image').value || 'Images/Banner.png';
  const sub = document.getElementById('bf-subtitle').value || '✦ Tag Line';
  const title = document.getElementById('bf-title').value || 'Banner Heading';
  const desc = document.getElementById('bf-desc').value || 'Short description text';

  const previewImg = document.getElementById('bf-preview-img');
  if (previewImg) previewImg.src = img;

  const previewTag = document.getElementById('bf-preview-tag');
  if (previewTag) previewTag.textContent = sub;

  const previewTitle = document.getElementById('bf-preview-title');
  if (previewTitle) previewTitle.innerHTML = title;

  const previewDesc = document.getElementById('bf-preview-desc');
  if (previewDesc) previewDesc.textContent = desc;
}

async function handleBannerImageUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  try {
    showToast('Optimizing banner image… ⏳');
    const optimized = await optimizeImageFile(file, 1600, 900, 0.85);
    document.getElementById('bf-image').value = optimized;
    updateBannerLivePreview();
    showToast('Banner image uploaded & optimized ✅');
  } catch (err) {
    showToast('⚠️ Failed to load banner image.');
  }
}

function saveBannerSlide() {
  const image = document.getElementById('bf-image').value.trim();
  if (!image) {
    showBannerFormError('Image path or uploaded image is required');
    return;
  }

  const slide = {
    id: editingBannerIdx !== null && adminBanners[editingBannerIdx]?.id ? adminBanners[editingBannerIdx].id : `banner-${Date.now()}`,
    image,
    subtitle: document.getElementById('bf-subtitle').value.trim(),
    title: document.getElementById('bf-title').value.trim(),
    desc: document.getElementById('bf-desc').value.trim(),
    ctaText: document.getElementById('bf-cta-text').value.trim() || 'Explore',
    ctaUrl: document.getElementById('bf-cta-url').value.trim() || 'shop.html',
    ctaText2: document.getElementById('bf-cta-text2').value.trim() || '',
    ctaUrl2: document.getElementById('bf-cta-url2').value.trim() || '',
    enabled: document.getElementById('bf-enabled').checked
  };

  if (editingBannerIdx !== null && editingBannerIdx >= 0) {
    adminBanners[editingBannerIdx] = slide;
    showToast(`Banner Slide #${editingBannerIdx + 1} updated on homepage ✅`);
  } else {
    adminBanners.push(slide);
    showToast(`New banner slide added and published ✅`);
  }

  saveBanners();
  closeBannerModal();
  renderBanners();
}

function showBannerFormError(msg) {
  const el = document.getElementById('banner-form-error');
  el.textContent = '⚠️ ' + msg;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 4000);
}

function deleteBanner(idx) {
  if (!confirm(`🗑️ Delete Banner Slide #${idx + 1}?\n\nThis will remove it from the homepage hero carousel.`)) return;
  adminBanners.splice(idx, 1);
  saveBanners();
  renderBanners();
  showToast(`Banner slide deleted from homepage ✅`);
}

function moveBanner(idx, dir) {
  const target = idx + dir;
  if (target < 0 || target >= adminBanners.length) return;
  [adminBanners[idx], adminBanners[target]] = [adminBanners[target], adminBanners[idx]];
  saveBanners();
  renderBanners();
  showToast('Banner order updated ✅');
}

function resetBannersToOriginal() {
  if (!confirm('⚠️ Reset all banner slides to default?')) return;
  localStorage.removeItem('admin_banners');
  if (typeof DEFAULT_BANNER_SLIDES !== 'undefined') {
    adminBanners = JSON.parse(JSON.stringify(DEFAULT_BANNER_SLIDES));
  }
  saveBanners();
  renderBanners();
  showToast('Hero banners reset to default ✅');
}

function exportBanners() {
  const code = `const BANNER_SLIDES = ${JSON.stringify(adminBanners, null, 2)};`;
  copyToClipboard(code, '✅ Banner slides backup copied to clipboard!');
}


// ══════════════════════════════════════════════════════════════════════════════
//  BOTANICAL SHOWCASE SLIDESHOW SECTION
// ══════════════════════════════════════════════════════════════════════════════

function renderShowcaseSlides() {
  const container = document.getElementById('showcase-grid-container');
  if (!container) return;

  if (adminShowcaseSlides.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-second);background:var(--bg-card);border-radius:var(--radius-lg);border:1px solid var(--border);">
        <div style="font-size:2.5rem;margin-bottom:0.5rem;">🌟</div>
        <h3>No showcase posters created</h3>
        <p style="color:var(--text-muted);font-size:0.85rem;margin-top:0.25rem;">Click "Upload New Poster" to add your first interactive showcase poster.</p>
      </div>`;
    return;
  }

  container.innerHTML = adminShowcaseSlides.map((slide, idx) => {
    const isEnabled = slide.enabled !== false;
    return `
      <div class="showcase-card ${isEnabled ? '' : 'is-disabled'}" 
           draggable="true" 
           data-index="${idx}"
           ondragstart="handleShowcaseDragStart(event, ${idx})"
           ondragover="handleShowcaseDragOver(event)"
           ondragleave="handleShowcaseDragLeave(event)"
           ondrop="handleShowcaseDrop(event, ${idx})"
           ondragend="handleShowcaseDragEnd(event)">
        
        <div class="drag-handle" title="Drag to reorder slide">⠿</div>

        <div class="showcase-poster-wrap">
          <img src="${slide.img}" class="showcase-poster-img" alt="${slide.title}" onerror="this.src='Images/logo.png'">
          <div class="showcase-poster-overlay">
            <span class="showcase-card-tag">${slide.category || 'Facial Kit'}</span>
            <h3 class="showcase-card-title">${slide.title}</h3>
          </div>
          <div class="card-badge-top">
            <span class="status-pill ${isEnabled ? 'active' : 'disabled'}">${isEnabled ? 'Active' : 'Disabled'}</span>
            <span class="banner-card-badge">#${idx + 1}</span>
          </div>
        </div>

        <div class="showcase-card-content">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <label class="switch-wrap" title="Toggle active status on homepage">
              <span class="toggle-switch">
                <input type="checkbox" ${isEnabled ? 'checked' : ''} onchange="toggleShowcaseSlide(${idx})">
                <span class="toggle-slider"></span>
              </span>
              <span>${isEnabled ? 'Visible on site' : 'Hidden'}</span>
            </label>
          </div>
        </div>

        <div class="showcase-card-footer">
          <div style="display:flex;gap:0.3rem;">
            <button class="btn-action btn-move-up" onclick="moveShowcaseSlide(${idx}, -1)" title="Move Left / Earlier" ${idx === 0 ? 'disabled' : ''}>←</button>
            <button class="btn-action btn-move-down" onclick="moveShowcaseSlide(${idx}, 1)" title="Move Right / Later" ${idx === adminShowcaseSlides.length - 1 ? 'disabled' : ''}>→</button>
          </div>
          <div style="display:flex;gap:0.4rem;align-items:center;">
            <button class="btn-action btn-edit" onclick="openEditShowcaseModal(${idx})">✏️ Edit</button>
            <button class="btn-action btn-delete" onclick="deleteShowcaseSlide(${idx})" title="Delete poster">🗑️</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Drag and Drop reordering handlers
function handleShowcaseDragStart(e, idx) {
  draggedShowcaseIdx = idx;
  e.currentTarget.classList.add('is-dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', idx);
}

function handleShowcaseDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  const card = e.currentTarget.closest('.showcase-card');
  if (card) card.classList.add('drag-over');
}

function handleShowcaseDragLeave(e) {
  const card = e.currentTarget.closest('.showcase-card');
  if (card) card.classList.remove('drag-over');
}

function handleShowcaseDrop(e, targetIdx) {
  e.preventDefault();
  const card = e.currentTarget.closest('.showcase-card');
  if (card) card.classList.remove('drag-over');

  if (draggedShowcaseIdx !== null && draggedShowcaseIdx !== targetIdx) {
    const movedItem = adminShowcaseSlides.splice(draggedShowcaseIdx, 1)[0];
    adminShowcaseSlides.splice(targetIdx, 0, movedItem);
    saveShowcaseSlides();
    renderShowcaseSlides();
    showToast('Showcase slides reordered successfully ✅');
  }
}

function handleShowcaseDragEnd(e) {
  draggedShowcaseIdx = null;
  document.querySelectorAll('.showcase-card').forEach(c => {
    c.classList.remove('is-dragging');
    c.classList.remove('drag-over');
  });
}

function openAddShowcaseModal() {
  editingShowcaseIdx = null;
  resetShowcaseForm();
  document.getElementById('showcase-modal-title').textContent = '➕ Upload Slideshow Poster';
  document.getElementById('showcase-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
  updateShowcaseLivePreview();
}

function openEditShowcaseModal(idx) {
  const slide = adminShowcaseSlides[idx];
  if (!slide) return;
  editingShowcaseIdx = idx;
  fillShowcaseForm(slide);
  document.getElementById('showcase-modal-title').textContent = `✏️ Edit Showcase Poster #${idx + 1}`;
  document.getElementById('showcase-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
  updateShowcaseLivePreview();
}

function closeShowcaseModal() {
  document.getElementById('showcase-modal').style.display = 'none';
  document.body.style.overflow = '';
  editingShowcaseIdx = null;
}

function resetShowcaseForm() {
  document.getElementById('showcase-form').reset();
  document.getElementById('sf-img').value = 'Images/Coursel/Bridal.jpg.png';
  document.getElementById('sf-title').value = 'Bridal Glow Facial Kit';
  document.getElementById('sf-category').value = 'Facial Kit';
  document.getElementById('sf-enabled').checked = true;
}

function fillShowcaseForm(s) {
  document.getElementById('sf-img').value = s.img || '';
  document.getElementById('sf-title').value = s.title || '';
  document.getElementById('sf-category').value = s.category || 'Facial Kit';
  document.getElementById('sf-enabled').checked = s.enabled !== false;
}

function updateShowcaseLivePreview() {
  const img = document.getElementById('sf-img').value || 'Images/Coursel/Bridal.jpg.png';
  const title = document.getElementById('sf-title').value || 'Bridal Glow Facial Kit';
  const category = document.getElementById('sf-category').value || 'Facial Kit';

  const previewImg = document.getElementById('sf-preview-img');
  if (previewImg) previewImg.src = img;

  const previewTitle = document.getElementById('sf-preview-title');
  if (previewTitle) previewTitle.textContent = title;

  const previewTag = document.getElementById('sf-preview-tag');
  if (previewTag) previewTag.textContent = category;
}

async function handleShowcaseImageUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  try {
    showToast('Optimizing poster image… ⏳');
    const optimized = await optimizeImageFile(file, 900, 900, 0.85);
    document.getElementById('sf-img').value = optimized;
    updateShowcaseLivePreview();
    showToast('Poster uploaded & optimized ✅');
  } catch (err) {
    showToast('⚠️ Failed to load poster image.');
  }
}

function saveShowcaseSlide() {
  const img = document.getElementById('sf-img').value.trim();
  const title = document.getElementById('sf-title').value.trim();
  const category = document.getElementById('sf-category').value.trim() || 'Facial Kit';
  const enabled = document.getElementById('sf-enabled').checked;

  if (!img) {
    showShowcaseFormError('Poster image or upload is required');
    return;
  }
  if (!title) {
    showShowcaseFormError('Poster title is required');
    return;
  }

  const slide = {
    id: editingShowcaseIdx !== null && adminShowcaseSlides[editingShowcaseIdx]?.id ? adminShowcaseSlides[editingShowcaseIdx].id : `showcase-${Date.now()}`,
    img,
    title,
    category,
    enabled
  };

  if (editingShowcaseIdx !== null && editingShowcaseIdx >= 0) {
    adminShowcaseSlides[editingShowcaseIdx] = slide;
    showToast(`Showcase poster "${slide.title}" updated on live homepage ✅`);
  } else {
    adminShowcaseSlides.push(slide);
    showToast(`New showcase poster "${slide.title}" published to live website ✅`);
  }

  saveShowcaseSlides();
  closeShowcaseModal();
  renderShowcaseSlides();
}

function showShowcaseFormError(msg) {
  const el = document.getElementById('showcase-form-error');
  el.textContent = '⚠️ ' + msg;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 4000);
}

function deleteShowcaseSlide(idx) {
  const slide = adminShowcaseSlides[idx];
  if (!slide) return;
  if (!confirm(`🗑️ Are you sure you want to delete poster "${slide.title}"?\n\nThis will remove it from the homepage showcase carousel immediately.`)) return;
  adminShowcaseSlides.splice(idx, 1);
  saveShowcaseSlides();
  renderShowcaseSlides();
  showToast(`Poster "${slide.title}" removed from homepage ✅`);
}

function toggleShowcaseSlide(idx) {
  if (!adminShowcaseSlides[idx]) return;
  adminShowcaseSlides[idx].enabled = !adminShowcaseSlides[idx].enabled;
  saveShowcaseSlides();
  renderShowcaseSlides();
  showToast(`Slide #${idx + 1} ${adminShowcaseSlides[idx].enabled ? 'enabled' : 'disabled'} on homepage ✅`);
}

function moveShowcaseSlide(idx, dir) {
  const target = idx + dir;
  if (target < 0 || target >= adminShowcaseSlides.length) return;
  [adminShowcaseSlides[idx], adminShowcaseSlides[target]] = [adminShowcaseSlides[target], adminShowcaseSlides[idx]];
  saveShowcaseSlides();
  renderShowcaseSlides();
  showToast('Showcase slide order updated ✅');
}

function resetShowcaseToOriginal() {
  if (!confirm('⚠️ Reset all showcase posters to default?')) return;
  localStorage.removeItem('admin_showcase_slides');
  if (typeof DEFAULT_SHOWCASE_SLIDES !== 'undefined') {
    adminShowcaseSlides = JSON.parse(JSON.stringify(DEFAULT_SHOWCASE_SLIDES));
  }
  saveShowcaseSlides();
  renderShowcaseSlides();
  showToast('Botanical showcase reset to default ✅');
}

function exportShowcase() {
  const code = `const SHOWCASE_SLIDES = ${JSON.stringify(adminShowcaseSlides, null, 2)};`;
  copyToClipboard(code, '✅ Showcase slideshow backup copied to clipboard!');
}


// ══════════════════════════════════════════════════════════════════════════════
//  SETTINGS & SECURITY SECTION
// ══════════════════════════════════════════════════════════════════════════════

function renderSettingsForm() {
  const cfg = adminSiteConfig || {};
  const showAnn = document.getElementById('set-show-announcement');
  const annText = document.getElementById('set-announcement-text');
  const brandName = document.getElementById('set-brand-name');
  const whatsapp = document.getElementById('set-whatsapp');
  const phone = document.getElementById('set-phone');
  const email = document.getElementById('set-email');
  const instagram = document.getElementById('set-instagram');
  const facebook = document.getElementById('set-facebook');
  const youtube = document.getElementById('set-youtube');

  if (showAnn) showAnn.checked = cfg.showAnnouncement !== false;
  if (annText) annText.value = cfg.announcementText || 'FREE DELIVERY ON ONLINE ORDERS';
  if (brandName) brandName.value = cfg.brandName || 'Aroma Signature+';
  if (whatsapp) whatsapp.value = cfg.whatsappNumber || '918086339777';
  if (phone) phone.value = cfg.phone || '8086339777';
  if (email) email.value = cfg.email || 'aromasignature.in@gmail.com';
  if (instagram) instagram.value = cfg.instagramUrl || '';
  if (facebook) facebook.value = cfg.facebookUrl || '';
  if (youtube) youtube.value = cfg.youtubeUrl || '';
}

function saveSiteSettingsForm() {
  adminSiteConfig = {
    ...adminSiteConfig,
    showAnnouncement: document.getElementById('set-show-announcement').checked,
    announcementText: document.getElementById('set-announcement-text').value.trim(),
    brandName: document.getElementById('set-brand-name').value.trim() || 'Aroma Signature+',
    whatsappNumber: document.getElementById('set-whatsapp').value.trim() || '918086339777',
    phone: document.getElementById('set-phone').value.trim() || '8086339777',
    email: document.getElementById('set-email').value.trim() || 'aromasignature.in@gmail.com',
    instagramUrl: document.getElementById('set-instagram').value.trim(),
    facebookUrl: document.getElementById('set-facebook').value.trim(),
    youtubeUrl: document.getElementById('set-youtube').value.trim(),
  };

  saveSiteConfig();
  showToast('Website settings saved & updated on live website! ✅');
}


// ─── Helpers & Utilities ──────────────────────────────────────────────────────
function copyToClipboard(text, msg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast(msg)).catch(() => fallbackCopy(text, msg));
  } else {
    fallbackCopy(text, msg);
  }
}

function fallbackCopy(text, msg) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast(msg);
}

function showToast(msg) {
  const toast = document.getElementById('admin-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

function setupEventListeners() {
  const nameInput = document.getElementById('f-name');
  if (nameInput) {
    nameInput.addEventListener('input', function() {
      if (editingProductId === null) {
        document.getElementById('f-id').value = generateId(this.value);
      }
    });
  }

  // Dropzone drag & drop support for showcase upload
  const dropzone = document.getElementById('showcase-dropzone');
  if (dropzone) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      }, false);
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files && files.length > 0) {
        handleShowcaseImageUpload({ target: { files } });
      }
    });
  }

  // Backdrop clicks
  document.addEventListener('click', function(e) {
    if (e.target.id === 'product-modal') closeModal();
    if (e.target.id === 'banner-modal') closeBannerModal();
    if (e.target.id === 'showcase-modal') closeShowcaseModal();
    if (e.target.id === 'password-modal') closePasswordModal();
  });

  // Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
      closeBannerModal();
      closeShowcaseModal();
      closePasswordModal();
    }
  });
}

// ─── Entry Point ──────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  adminInit();
});
