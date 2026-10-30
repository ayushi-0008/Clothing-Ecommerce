// =============================================
// LUXE NOIR - Cart Management
// =============================================

const CART_KEY = 'luxeNoir_cart';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
  renderCartSidebar();
}

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
    el.classList.remove('bump');
    void el.offsetWidth; // trigger reflow
    el.classList.add('bump');
  });
}

// Add item to cart
function addToCart(item) {
  let cart = getCart();
  // Cart key is id + size + color (prevent duplicate merging with different options)
  const key = `${item.id}_${item.size}_${item.color}`;
  const existing = cart.find(c => `${c.id}_${c.size}_${c.color}` === key);

  if (existing) {
    existing.quantity += (item.quantity || 1);
    showToast(`${item.name} quantity updated in cart!`, 'success');
  } else {
    cart.push({ ...item, quantity: item.quantity || 1 });
    showToast(`${item.name} added to cart!`, 'success');
  }
  saveCart(cart);
  openCartSidebar();
}

// Update quantity
function updateCartQty(index, delta) {
  let cart = getCart();
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart(cart);
}

// Remove item
function removeFromCart(index) {
  let cart = getCart();
  const removed = cart.splice(index, 1);
  showToast(`${removed[0].name} removed from cart`, 'info');
  saveCart(cart);
}

// Calculate totals
function getCartTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const delivery = subtotal > 2000 ? 0 : 99;
  const total = subtotal + delivery;
  return { subtotal, delivery, total, itemCount };
}

// =============================================
// Cart Sidebar UI
// =============================================
function openCartSidebar() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function renderCartSidebar() {
  const cart = getCart();
  const { subtotal, delivery, total, itemCount } = getCartTotals();
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  const countText = document.getElementById('cartCountText');

  if (countText) countText.textContent = `${itemCount} item${itemCount !== 1 ? 's' : ''}`;

  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <i class="bi bi-bag cart-empty-icon"></i>
        <div class="cart-empty-title">Your cart is empty</div>
        <p class="cart-empty-text">Looks like you haven't added anything yet. Start shopping!</p>
        <a href="products.html" class="btn-dark" onclick="closeCartSidebar()">
          <i class="bi bi-bag-plus"></i> Shop Now
        </a>
      </div>
    `;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = 'block';

  body.innerHTML = `
    <div class="cart-items-list">
      ${cart.map((item, i) => `
        <div class="cart-item" id="cart-item-${i}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-meta">
              ${item.size ? `<span>Size: ${item.size}</span>` : ''}
              ${item.color ? `<span><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${item.color};border:1px solid #ccc;vertical-align:middle;"></span></span>` : ''}
            </div>
            <div class="cart-qty-wrapper">
              <button class="cart-qty-btn" onclick="updateCartQty(${i}, -1)" aria-label="Decrease">
                <i class="bi bi-dash"></i>
              </button>
              <span class="cart-qty-value">${item.quantity}</span>
              <button class="cart-qty-btn" onclick="updateCartQty(${i}, 1)" aria-label="Increase">
                <i class="bi bi-plus"></i>
              </button>
            </div>
            <div class="cart-item-price">${formatPrice(item.price * item.quantity)}</div>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${i})" aria-label="Remove item" title="Remove">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      `).join('')}
    </div>
  `;

  const summarySubtotal = document.getElementById('cartSubtotal') || document.getElementById('cartSidebarSubtotal');
  const summaryDelivery = document.getElementById('cartDelivery') || document.getElementById('cartSidebarDelivery');
  const summaryTotal = document.getElementById('cartTotal') || document.getElementById('cartSidebarTotal');
  if (summarySubtotal) summarySubtotal.textContent = formatPrice(subtotal);
  if (summaryDelivery) summaryDelivery.textContent = delivery === 0 ? 'FREE' : formatPrice(delivery);
  if (summaryTotal) summaryTotal.textContent = formatPrice(total);

  // Free shipping progress
  const progressBar = document.getElementById('shippingProgressBar');
  const progressMsg = document.getElementById('shippingProgressMsg');
  if (progressBar && progressMsg) {
    const threshold = 2000;
    const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
    progressBar.style.width = `${pct}%`;
    if (subtotal >= threshold) {
      progressMsg.innerHTML = '<span class="text-success fw-bold"><i class="bi bi-check-circle-fill me-1"></i> You unlocked FREE express shipping!</span>';
    } else {
      const remaining = threshold - subtotal;
      progressMsg.textContent = `Add ${formatPrice(remaining)} more for FREE express shipping`;
    }
  }
}

// Init cart sidebar
function initCart() {
  updateCartBadge();
  renderCartSidebar();

  const cartBtn = document.getElementById('cartBtn') || document.getElementById('cartOpenBtn');
  const cartClose = document.getElementById('cartClose');
  const cartOverlay = document.getElementById('cartOverlay');

  if (cartBtn) cartBtn.addEventListener('click', openCartSidebar);
  if (cartClose) cartClose.addEventListener('click', closeCartSidebar);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartSidebar);
}
