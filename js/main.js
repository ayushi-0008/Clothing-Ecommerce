// =============================================
// LUXE NOIR - Main Application JavaScript
// =============================================

// =============================================
// Page Loader
// =============================================
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 400);
  }
  initScrollReveal();
});

// =============================================
// Navbar scroll effect
// =============================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Set active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPage || (currentPage === 'index.html' && href === '#') || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// =============================================
// Mobile Navigation
// =============================================
function initMobileNav() {
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileOverlay = document.getElementById('mobileNavOverlay');

  if (!hamburger || !mobileNav) return;

  function toggleMobileNav() {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    mobileOverlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMobileNav);
  if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMobileNav);
}

// =============================================
// Search Overlay
// =============================================
function initSearch() {
  const searchBtn = document.getElementById('searchBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');

  if (!searchBtn) return;

  searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    searchInput.focus();
    document.body.style.overflow = 'hidden';
  });

  function closeSearch() {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (searchClose) searchClose.addEventListener('click', closeSearch);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      closeCartSidebar();
    }
  });

  // Search submit
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && searchInput.value.trim()) {
        const query = encodeURIComponent(searchInput.value.trim());
        window.location.href = `products.html?search=${query}`;
        closeSearch();
      }
    });
  }
}

// =============================================
// Toast Notifications
// =============================================
function showToast(message, type = 'success', duration = 3000) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container-custom';
    document.body.appendChild(container);
  }

  const icons = {
    success: '<i class="bi bi-check-circle-fill toast-success-icon toast-icon"></i>',
    error: '<i class="bi bi-x-circle-fill toast-error-icon toast-icon"></i>',
    info: '<i class="bi bi-info-circle-fill toast-info-icon toast-icon"></i>'
  };

  const toast = document.createElement('div');
  toast.className = `toast-custom ${type}`;
  toast.innerHTML = `
    ${icons[type] || icons.info}
    <span class="toast-message">${message}</span>
    <button class="toast-close" onclick="this.closest('.toast-custom').remove()">
      <i class="bi bi-x"></i>
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// =============================================
// Quick View Modal
// =============================================
let currentQuickViewProduct = null;
let selectedSize = null;
let selectedColor = null;
let quickViewQty = 1;

function openQuickView(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  currentQuickViewProduct = product;
  selectedSize = product.sizes[0];
  selectedColor = product.colors[0];
  quickViewQty = 1;

  // Populate modal
  document.getElementById('qvImage').src = product.image;
  document.getElementById('qvCategory').textContent = product.category;
  document.getElementById('qvName').textContent = product.name;
  document.getElementById('qvPrice').textContent = formatPrice(product.price);
  document.getElementById('qvPriceOriginal').textContent = product.originalPrice ? formatPrice(product.originalPrice) : '';
  const discBadge = document.getElementById('qvDiscountBadge');
  if (product.discount) {
    discBadge.textContent = `-${product.discount}%`;
    discBadge.style.display = '';
  } else {
    discBadge.style.display = 'none';
  }
  document.getElementById('qvDesc').textContent = product.description;
  document.getElementById('qvQty').value = 1;

  // Sizes
  const sizesContainer = document.getElementById('qvSizes');
  sizesContainer.innerHTML = product.sizes.map((size, i) => `
    <button class="size-btn ${i === 0 ? 'selected' : ''}" data-size="${size}" onclick="selectSize(this, '${size}')">${size}</button>
  `).join('');

  // Colors
  const colorsContainer = document.getElementById('qvColors');
  colorsContainer.innerHTML = product.colors.map((color, i) => `
    <button class="color-option-btn ${i === 0 ? 'selected' : ''}" 
            data-color="${color}" 
            style="background:${color};${color === '#fff' || color === '#ffffff' || color === '#f5f5f0' || color === '#f5e6d3' || color === '#e8d5c4' ? 'border:2px solid #ccc;' : ''}"
            onclick="selectColor(this, '${color}')" 
            title="${color}">
    </button>
  `).join('');

  // Wishlist button
  const wishlist = getWishlist();
  const isWishlisted = wishlist.some(w => w.id === product.id);
  const wlBtn = document.getElementById('qvWishlistBtn');
  if (wlBtn) {
    wlBtn.innerHTML = isWishlisted 
      ? '<i class="bi bi-heart-fill"></i> Remove from Wishlist'
      : '<i class="bi bi-heart"></i> Add to Wishlist';
    wlBtn.className = `quickview-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`;
  }

  // Open modal
  const modal = new bootstrap.Modal(document.getElementById('quickViewModal'));
  modal.show();
}

function selectSize(btn, size) {
  document.querySelectorAll('#qvSizes .size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedSize = size;
}

function selectColor(btn, color) {
  document.querySelectorAll('#qvColors .color-option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedColor = color;
}

function changeQvQty(delta) {
  const input = document.getElementById('qvQty');
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  if (val > 10) val = 10;
  input.value = val;
  quickViewQty = val;
}

function addToCartFromModal() {
  if (!currentQuickViewProduct) return;
  const product = currentQuickViewProduct;
  const qty = parseInt(document.getElementById('qvQty').value) || 1;

  // Validate size for clothing (not accessories with ONE SIZE)
  if (!product.sizes.includes('ONE SIZE') && !selectedSize) {
    showToast('Please select a size', 'error');
    document.getElementById('qvSizes').style.animation = 'none';
    document.getElementById('qvSizes').offsetHeight;
    document.getElementById('qvSizes').style.animation = 'badgeBump 0.3s ease';
    return;
  }

  addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    size: selectedSize || product.sizes[0],
    color: selectedColor || product.colors[0],
    quantity: qty
  });

  // Close modal
  const modalEl = document.getElementById('quickViewModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
}

function addToWishlistFromModal() {
  if (!currentQuickViewProduct) return;
  toggleWishlistFromCard(currentQuickViewProduct.id);
  // Update button
  const wishlist = getWishlist();
  const isWishlisted = wishlist.some(w => w.id === currentQuickViewProduct.id);
  const wlBtn = document.getElementById('qvWishlistBtn');
  if (wlBtn) {
    wlBtn.innerHTML = isWishlisted 
      ? '<i class="bi bi-heart-fill"></i> Remove from Wishlist'
      : '<i class="bi bi-heart"></i> Add to Wishlist';
    wlBtn.className = `quickview-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`;
  }
}

// =============================================
// Newsletter form
// =============================================
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    if (input && input.value) {
      showToast('Thank you for subscribing! Welcome to Luxe Noir.', 'success', 4000);
      input.value = '';
    }
  });
}

// =============================================
// Products Page - Filtering & Sorting
// =============================================
let currentCategory = 'all';
let currentSort = 'default';
let currentSearch = '';
let currentMaxPrice = Infinity;

function initProductsPage() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  // Check URL params
  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get('category');
  const searchParam = params.get('search');

  if (categoryParam) {
    currentCategory = categoryParam;
    // Activate the right pill
    document.querySelectorAll('.filter-pill').forEach(pill => {
      if (pill.dataset.category === categoryParam) pill.classList.add('active');
      else pill.classList.remove('active');
    });
    // Update page title
    const titles = { men: "Men's Collection", women: "Women's Collection", kids: "Kids' Collection", accessories: "Accessories", sale: "Sale" };
    const titleEl = document.getElementById('productsPageTitle');
    if (titleEl && titles[categoryParam]) titleEl.textContent = titles[categoryParam];
  }

  if (searchParam) {
    currentSearch = searchParam;
    const searchField = document.getElementById('productSearchInput');
    if (searchField) searchField.value = searchParam;
  }

  // Filter pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.category || 'all';
      renderProducts();
    });
  });

  // Sort select
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      renderProducts();
    });
  }

  // Price filter
  const priceSelect = document.getElementById('priceFilter');
  if (priceSelect) {
    priceSelect.addEventListener('change', () => {
      currentMaxPrice = parseInt(priceSelect.value) || Infinity;
      renderProducts();
    });
  }

  // Search
  const searchBtn = document.getElementById('productSearchBtn');
  const searchInput = document.getElementById('productSearchInput');
  function doSearch() {
    currentSearch = searchInput ? searchInput.value.trim().toLowerCase() : '';
    renderProducts();
  }
  if (searchBtn) searchBtn.addEventListener('click', doSearch);
  if (searchInput) searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('resultsCount');
  if (!grid) return;

  let filtered = [...productsData];

  // Category filter
  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  // Price filter
  if (currentMaxPrice !== Infinity) {
    filtered = filtered.filter(p => p.price <= currentMaxPrice);
  }

  // Search filter
  if (currentSearch) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(currentSearch) ||
      p.category.toLowerCase().includes(currentSearch) ||
      p.description.toLowerCase().includes(currentSearch)
    );
  }

  // Sort
  switch (currentSort) {
    case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
    case 'newest': filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    case 'discount': filtered.sort((a, b) => b.discount - a.discount); break;
  }

  if (countEl) countEl.textContent = `${filtered.length} products`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-products">
        <i class="bi bi-search"></i>
        <h3 style="font-family:var(--font-serif);font-size:1.4rem;margin-bottom:8px;">No products found</h3>
        <p style="color:#666;">Try adjusting your filters or search term.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(renderProductCard).join('');
  initScrollReveal();
}

// =============================================
// Checkout Page
// =============================================
function initCheckoutPage() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;

  // Render order summary
  renderOrderSummary();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateCheckoutForm()) {
      placeOrder();
    }
  });
}

function renderOrderSummary() {
  const cart = getCart();
  const itemsContainer = document.getElementById('orderItems');
  const { subtotal, delivery, total } = getCartTotals();

  if (itemsContainer) {
    itemsContainer.innerHTML = cart.map(item => `
      <div class="order-item">
        <img src="${item.image}" alt="${item.name}" class="order-item-img">
        <div class="order-item-info">
          <div class="order-item-name">${item.name} x${item.quantity}</div>
          <div class="order-item-meta">${item.size ? `Size: ${item.size}` : ''}</div>
          <div class="order-item-price">${formatPrice(item.price * item.quantity)}</div>
        </div>
      </div>
    `).join('');
  }

  const subEl = document.getElementById('orderSubtotal');
  const delEl = document.getElementById('orderDelivery');
  const totEl = document.getElementById('orderTotal');
  if (subEl) subEl.textContent = formatPrice(subtotal);
  if (delEl) delEl.textContent = delivery === 0 ? 'FREE' : formatPrice(delivery);
  if (totEl) totEl.textContent = formatPrice(total);
}

function validateCheckoutForm() {
  let isValid = true;
  const required = document.querySelectorAll('.form-control-custom[required]');

  required.forEach(field => {
    field.classList.remove('is-invalid');
    if (!field.value.trim()) {
      field.classList.add('is-invalid');
      isValid = false;
    }
  });

  // Email validation
  const emailField = document.getElementById('emailField');
  if (emailField && emailField.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value)) {
      emailField.classList.add('is-invalid');
      isValid = false;
    }
  }

  // Phone validation
  const phoneField = document.getElementById('phoneField');
  if (phoneField && phoneField.value) {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneField.value.replace(/\s/g, ''))) {
      phoneField.classList.add('is-invalid');
      isValid = false;
    }
  }

  // Pincode validation
  const pincodeField = document.getElementById('pincodeField');
  if (pincodeField && pincodeField.value) {
    if (!/^[0-9]{6}$/.test(pincodeField.value)) {
      pincodeField.classList.add('is-invalid');
      isValid = false;
    }
  }

  if (!isValid) {
    showToast('Please fill all required fields correctly', 'error');
  }

  return isValid;
}

function placeOrder() {
  const { total } = getCartTotals();
  const name = document.getElementById('firstNameField').value;
  const orderNumber = 'LN' + Date.now().toString().slice(-8);

  // Clear cart
  localStorage.removeItem(CART_KEY);
  updateCartBadge();

  // Show confirmation
  const checkoutContent = document.getElementById('checkoutContent');
  const confirmation = document.getElementById('orderConfirmation');

  if (checkoutContent) checkoutContent.style.display = 'none';
  if (confirmation) {
    confirmation.style.display = 'block';
    document.getElementById('confirmOrderNum').textContent = orderNumber;
    document.getElementById('confirmName').textContent = name;
    document.getElementById('confirmTotal').textContent = formatPrice(total);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =============================================
// Init App
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initSearch();
  initCart();
  initNewsletter();
  updateWishlistBadge();
  updateCartBadge();

  // Page-specific init
  const page = window.location.pathname.split('/').pop() || 'index.html';

  if (page === 'products.html') {
    initProductsPage();
  } else if (page === 'wishlist.html') {
    renderWishlistPage();
  } else if (page === 'checkout.html') {
    initCheckoutPage();
  } else {
    // Homepage trending products
    const trendingGrid = document.getElementById('trendingGrid');
    if (trendingGrid) {
      const trending = productsData.slice(0, 8);
      trendingGrid.innerHTML = trending.map(renderProductCard).join('');
      initScrollReveal();
    }
  }
});
