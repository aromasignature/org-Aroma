// =============================================================================
// AROMA SIGNATURE+ — WHATSAPP CHECKOUT ENGINE & FLOATING WIDGET (PHASE 6)
// =============================================================================
//
// This file handles the complete checkout flow:
//   1. Customer clicks SHOP NOW on product.html
//   2. Premium Customer Details form modal opens
//   3. Fields: Name, Phone, Email, Address, City, District, State, PIN
//   4. Order Summary: Product Name, Pack, Qty, Subtotal, FREE Delivery, Total
//   5. WhatsApp message generated with EXACT format and URL-encoded
//   6. WhatsApp opens via wa.me using SITE_CONFIG.whatsappNumber (config.js ONLY)
//   7. Order Success screen shown inside modal
//   8. Floating "💬 Chat with us" button rendered on all pages
//
// IMPORTANT:
//   - NO discount, NO 10%, NO online discount
//   - Delivery is always FREE
//   - WhatsApp number is ONLY from SITE_CONFIG.whatsappNumber (js/config.js)
//
// =============================================================================

const WhatsApp = {
  activeOrder: null,

  // ─── Helper: Resolve base path for links ───────────────────────────────────
  _basePath: () => window.location.pathname.includes('/categories/') ? '../' : '',

  // ─── 1. Open Checkout Modal Form ──────────────────────────────────────────
  openOrder: (product, customOrderData = null) => {
    // If order data passed from ProductDetail page, use it; else default to first pack
    const pack     = customOrderData?.selectedPack || product.packs?.[0] || 'Standard Pack';
    const qty      = customOrderData?.quantity      || 1;
    const unitPrice = customOrderData?.unitPrice    || product.price;
    const totalPrice = customOrderData?.totalPrice  || (unitPrice * qty);

    WhatsApp.activeOrder = {
      product: product,
      selectedPack: pack,
      quantity: qty,
      unitPrice: unitPrice,
      totalPrice: totalPrice
    };

    WhatsApp.renderCheckoutModal();
  },

  // ─── 2. Render Checkout Form Modal ────────────────────────────────────────
  renderCheckoutModal: () => {
    let overlay = document.getElementById('checkout-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'checkout-modal-overlay';
      overlay.className = 'checkout-modal-overlay';
      // Click outside closes modal
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) WhatsApp.closeCheckoutModal();
      });
      document.body.appendChild(overlay);
    }

    const order = WhatsApp.activeOrder;
    const fmtSubtotal = order.totalPrice.toLocaleString('en-IN');
    const fmtTotal    = order.totalPrice.toLocaleString('en-IN');

    overlay.innerHTML = `
      <div class="checkout-modal-container" id="checkout-modal-container" role="dialog" aria-modal="true" aria-labelledby="checkout-dialog-title">

        <!-- Modal Header -->
        <div class="checkout-modal-header">
          <div>
            <span class="subtitle-tag">Instant Checkout</span>
            <h2 class="checkout-modal-title" id="checkout-dialog-title">Customer Details</h2>
          </div>
          <button class="checkout-close-btn" onclick="WhatsApp.closeCheckoutModal()" aria-label="Close checkout">&times;</button>
        </div>

        <div class="checkout-modal-body">

          <!-- ── Order Summary ─────────────────────────────────────── -->
          <div class="checkout-summary-card">
            <h3 class="summary-card-title">Order Summary</h3>

            <!-- Product Name -->
            <div class="summary-item-row">
              <span class="summary-item-name">${order.product.name}</span>
            </div>

            <!-- Pack & Quantity -->
            <div class="summary-item-details">
              <span>Pack: <strong>${order.selectedPack}</strong></span>
              <span>Qty: <strong>${order.quantity}</strong></span>
            </div>

            <!-- Price Breakdown -->
            <div class="summary-breakdown">
              <div class="breakdown-row">
                <span>💰 Subtotal</span>
                <span>₹${fmtSubtotal}</span>
              </div>
              <div class="breakdown-row">
                <span>🚚 Delivery</span>
                <span class="delivery-free-badge">FREE</span>
              </div>
              <div class="breakdown-row total-row">
                <span>💵 Total</span>
                <span class="total-amount">₹${fmtTotal}</span>
              </div>
            </div>
          </div>

          <!-- ── Customer Details Form ────────────────────────────── -->
          <form id="checkout-customer-form" onsubmit="WhatsApp.handleFormSubmit(event)" novalidate>
            <h3 class="form-section-title">Your Delivery Details</h3>

            <div class="form-grid">

              <!-- Customer Name -->
              <div class="form-group" id="fg-name">
                <label for="cust-name">Customer Name <span class="form-required">*</span></label>
                <input
                  type="text"
                  id="cust-name"
                  class="form-control"
                  placeholder="Enter your full name"
                  autocomplete="name"
                  required
                >
                <span class="form-error-msg" id="err-name">Please enter your full name.</span>
              </div>

              <!-- Phone Number -->
              <div class="form-group" id="fg-phone">
                <label for="cust-phone">Phone Number <span class="form-required">*</span></label>
                <input
                  type="tel"
                  id="cust-phone"
                  class="form-control"
                  placeholder="10-digit mobile number"
                  autocomplete="tel"
                  required
                  pattern="[6-9][0-9]{9}"
                  maxlength="10"
                  inputmode="numeric"
                >
                <span class="form-error-msg" id="err-phone">Please enter a valid 10-digit mobile number.</span>
              </div>

              <!-- Email -->
              <div class="form-group form-group-full" id="fg-email">
                <label for="cust-email">Email Address <span class="form-required">*</span></label>
                <input
                  type="email"
                  id="cust-email"
                  class="form-control"
                  placeholder="name@example.com"
                  autocomplete="email"
                  required
                >
                <span class="form-error-msg" id="err-email">Please enter a valid email address.</span>
              </div>

              <!-- Full Delivery Address -->
              <div class="form-group form-group-full" id="fg-address">
                <label for="cust-address">Full Delivery Address <span class="form-required">*</span></label>
                <textarea
                  id="cust-address"
                  class="form-control"
                  rows="2"
                  placeholder="House / Flat No., Street, Landmark"
                  autocomplete="street-address"
                  required
                ></textarea>
                <span class="form-error-msg" id="err-address">Please enter your complete delivery address.</span>
              </div>

              <!-- City -->
              <div class="form-group" id="fg-city">
                <label for="cust-city">City <span class="form-required">*</span></label>
                <input
                  type="text"
                  id="cust-city"
                  class="form-control"
                  placeholder="City"
                  autocomplete="address-level2"
                  required
                >
                <span class="form-error-msg" id="err-city">Please enter your city.</span>
              </div>

              <!-- District -->
              <div class="form-group" id="fg-district">
                <label for="cust-district">District <span class="form-required">*</span></label>
                <input
                  type="text"
                  id="cust-district"
                  class="form-control"
                  placeholder="District"
                  required
                >
                <span class="form-error-msg" id="err-district">Please enter your district.</span>
              </div>

              <!-- State -->
              <div class="form-group" id="fg-state">
                <label for="cust-state">State <span class="form-required">*</span></label>
                <input
                  type="text"
                  id="cust-state"
                  class="form-control"
                  placeholder="State"
                  autocomplete="address-level1"
                  required
                >
                <span class="form-error-msg" id="err-state">Please enter your state.</span>
              </div>

              <!-- PIN Code -->
              <div class="form-group" id="fg-pincode">
                <label for="cust-pincode">PIN Code <span class="form-required">*</span></label>
                <input
                  type="text"
                  id="cust-pincode"
                  class="form-control"
                  placeholder="6-digit PIN code"
                  autocomplete="postal-code"
                  required
                  pattern="[0-9]{6}"
                  maxlength="6"
                  inputmode="numeric"
                >
                <span class="form-error-msg" id="err-pincode">Please enter a valid 6-digit PIN code.</span>
              </div>

            </div><!-- /.form-grid -->

            <!-- Submit -->
            <div class="checkout-submit-wrap">
              <button type="submit" class="btn btn-whatsapp btn-lg btn-full" id="checkout-submit-btn">
                <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M16 2a14 14 0 0 0-12.14 21L2 29.86l7-1.84A14 14 0 1 0 16 2zm0 25.5a11.45 11.45 0 0 1-5.84-1.6l-.42-.25-4.34 1.14 1.16-4.23-.27-.44A11.5 11.5 0 1 1 16 27.5zm6.3-8.54c-.34-.17-2.04-1-2.36-1.12s-.55-.17-.78.17-.9 1.12-1.1 1.35-.4.26-.74.1-.15-.07-2.9-2.52c-2.14-1.9-3.58-4.27-4-5s-.04-.7.13-.87c.15-.15.34-.4.5-.6s.23-.34.34-.57a.7.7 0 0 0 0-.68c-.08-.17-.78-1.88-1.07-2.58s-.57-.59-.78-.6h-.67a1.3 1.3 0 0 0-.94.44A3.94 3.94 0 0 0 7 9.87a6.85 6.85 0 0 0 1.43 3.63c1.72 2.37 4.15 4.3 7.42 5.6 3.27 1.3 3.27.87 3.86.8s1.9-.78 2.17-1.53.27-1.4.19-1.53-.3-.21-.64-.38z"/>
                </svg>
                Place Order via WhatsApp
              </button>
              <p class="checkout-note">You will be redirected to WhatsApp to confirm your order.</p>
            </div>

          </form>

        </div><!-- /.checkout-modal-body -->
      </div>
    `;

    overlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    // Focus first input for accessibility
    setTimeout(() => {
      const firstInput = document.getElementById('cust-name');
      if (firstInput) firstInput.focus();
    }, 100);
  },

  // ─── Close Modal ──────────────────────────────────────────────────────────
  closeCheckoutModal: () => {
    const overlay = document.getElementById('checkout-modal-overlay');
    if (overlay) {
      overlay.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  },

  // ─── 3. Handle Form Submission & Generate Exact WhatsApp Message ──────────
  handleFormSubmit: (e) => {
    e.preventDefault();

    // ── Custom field-by-field validation ──────────────────────────────────
    let isValid = true;

    const validate = (fieldId, groupId, errId, checkFn) => {
      const el  = document.getElementById(fieldId);
      const grp = document.getElementById(groupId);
      const err = document.getElementById(errId);
      const ok  = el && checkFn(el.value.trim());
      if (grp) grp.classList.toggle('has-error', !ok);
      if (err) err.style.display = ok ? 'none' : 'block';
      if (!ok) isValid = false;
      return ok ? (el ? el.value.trim() : '') : '';
    };

    const name     = validate('cust-name',    'fg-name',    'err-name',    v => v.length >= 2);
    const phone    = validate('cust-phone',   'fg-phone',   'err-phone',   v => /^[6-9][0-9]{9}$/.test(v));
    /* email collected but not in WA message per spec */
    validate('cust-email',   'fg-email',   'err-email',   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
    const address  = validate('cust-address', 'fg-address', 'err-address', v => v.length >= 5);
    const city     = validate('cust-city',    'fg-city',    'err-city',    v => v.length >= 2);
    const district = validate('cust-district','fg-district','err-district',v => v.length >= 2);
    const state    = validate('cust-state',   'fg-state',   'err-state',   v => v.length >= 2);
    const pincode  = validate('cust-pincode', 'fg-pincode', 'err-pincode', v => /^[0-9]{6}$/.test(v));

    if (!isValid) {
      // Scroll first error into view
      const firstErr = document.querySelector('.form-group.has-error');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // ── Build full address ─────────────────────────────────────────────────
    const fullAddress = `${address}, ${city}, ${district}, ${state} – ${pincode}`;

    const order = WhatsApp.activeOrder;
    const fmtSubtotal = order.totalPrice.toLocaleString('en-IN');
    const fmtTotal    = order.totalPrice.toLocaleString('en-IN');

    // ── Format current date (e.g. 9 Aug 2026) ─────────────────────────────
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-IN', {
      day:   'numeric',
      month: 'short',
      year:  'numeric'
    });

    // ── EXACT WhatsApp Message Format (per spec) ───────────────────────────
    const message =
`📦 WhatsApp Order

🛍️ NEW ORDER – AROMA SIGNATURE+

👤 Customer: ${name}
📱 Phone: ${phone}

🛒 Order Details:
• ${order.product.name} – ${order.selectedPack} × ${order.quantity}

💰 Subtotal: ₹${fmtSubtotal}
🚚 Delivery: FREE
💵 Total: ₹${fmtTotal}

📍 Delivery Address:
${fullAddress}

📅 Order Date: ${formattedDate}`;

    // ── Read WhatsApp number ONLY from js/config.js ────────────────────────
    const whatsappNum = SITE_CONFIG.whatsappNumber;
    const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(message)}`;

    // ── Open WhatsApp ──────────────────────────────────────────────────────
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // ── Show Order Success screen ──────────────────────────────────────────
    WhatsApp.renderOrderSuccess();
  },

  // ─── 4. Render Order Success Screen ──────────────────────────────────────
  renderOrderSuccess: () => {
    const container = document.getElementById('checkout-modal-container');
    if (!container) return;

    const shopUrl = WhatsApp._basePath() + 'shop.html';

    container.innerHTML = `
      <div class="order-success-card" role="region" aria-label="Order Placed">

        <div class="success-checkmark-wrap">
          <div class="success-icon-badge" aria-hidden="true">✓</div>
          <div class="success-ripple success-ripple-1"></div>
          <div class="success-ripple success-ripple-2"></div>
        </div>

        <h2 class="success-title">ORDER PLACED!</h2>

        <p class="success-subtitle">
          Thank you for shopping<br>
          with <strong>Aroma Signature+</strong>
        </p>

        <p class="success-desc">
          Your order details have<br>
          been sent to WhatsApp.
        </p>

        <div class="success-actions">
          <a
            href="${shopUrl}"
            class="btn btn-primary btn-lg"
            onclick="WhatsApp.closeCheckoutModal()"
            id="continue-shopping-btn"
          >
            Continue Shopping
          </a>
        </div>

      </div>
    `;
  },

  // ─── 5. Render Floating WhatsApp Button ──────────────────────────────────
  renderFloatingButton: () => {
    if (document.getElementById('whatsapp-float-widget')) return;

    // Read WhatsApp number ONLY from js/config.js
    const whatsappNum = SITE_CONFIG.whatsappNumber;
    const generalMsg  = SITE_CONFIG.whatsappGeneralMessage
      || "Hi! I'd like to know more about Aroma Signature+ products.";
    const link = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(generalMsg)}`;

    const widget = document.createElement('div');
    widget.id = 'whatsapp-float-widget';
    widget.className = 'whatsapp-float-widget';
    widget.setAttribute('role', 'complementary');
    widget.setAttribute('aria-label', 'WhatsApp Chat');

    widget.innerHTML = `
      <a
        href="${link}"
        target="_blank"
        rel="noopener noreferrer"
        class="whatsapp-float-link"
        aria-label="Chat with us on WhatsApp"
        id="whatsapp-float-link"
      >
        <span class="whatsapp-float-label">💬 Chat with us</span>
        <div class="whatsapp-float-icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor">
            <path d="M16 2a14 14 0 0 0-12.14 21L2 29.86l7-1.84A14 14 0 1 0 16 2zm0 25.5a11.45 11.45 0 0 1-5.84-1.6l-.42-.25-4.34 1.14 1.16-4.23-.27-.44A11.5 11.5 0 1 1 16 27.5zm6.3-8.54c-.34-.17-2.04-1-2.36-1.12s-.55-.17-.78.17-.9 1.12-1.1 1.35-.4.26-.74.1-.15-.07-2.9-2.52c-2.14-1.9-3.58-4.27-4-5s-.04-.7.13-.87c.15-.15.34-.4.5-.6s.23-.34.34-.57a.7.7 0 0 0 0-.68c-.08-.17-.78-1.88-1.07-2.58s-.57-.59-.78-.6h-.67a1.3 1.3 0 0 0-.94.44A3.94 3.94 0 0 0 7 9.87a6.85 6.85 0 0 0 1.43 3.63c1.72 2.37 4.15 4.3 7.42 5.6 3.27 1.3 3.27.87 3.86.8s1.9-.78 2.17-1.53.27-1.4.19-1.53-.3-.21-.64-.38z"/>
          </svg>
        </div>
      </a>
    `;

    document.body.appendChild(widget);
  }
};
