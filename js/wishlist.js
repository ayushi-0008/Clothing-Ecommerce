// =============================================
// LUXE NOIR - Wishlist Management
// =============================================

function renderWishlistPage() {
  const wishlist = getWishlist();
  const container = document.getElementById('wishlistGrid');
  const emptyMsg = document.getElementById('wishlistEmpty');
  const countEl = document.getElementById('wishlistCount');

  if (countEl) countEl.textContent = `${wishlist.length} item${wishlist.length !== 1 ? 's' : ''}`;

  if (!container) return;

  if (wishlist.length === 0) {
    container.style.display = 'none';
    if (emptyMsg) emptyMsg.style.display = 'block';
    return;
  }

  container.style.display = 'grid';
  if (emptyMsg) emptyMsg.style.display = 'none';

  container.innerHTML = wishlist.map(product => `
    <div class="product-card scroll-reveal" data-id="${product.id}">
      <div class="product-image-wrapper">
        <a href="product-detail.html?id=${product.id}" class="d-block w-100 h-100">
          <img src="${product.image}" alt="${product.name}" class="img-primary" loading="lazy">
          <img src="${product.imageHover || product.image}" alt="${product.name}" class="img-hover" loading="lazy">
        </a>
        <div class="product-badges">${getBadgeHTML(product.badge)}</div>
        <div class="product-actions">
          <button class="product-action-btn wishlisted" onclick="removeWishlistItem(${product.id})" title="Remove from wishlist">
            <i class="bi bi-heart-fill"></i>
          </button>
          <button class="product-action-btn" onclick="openQuickView(${product.id})" title="Quick View">
            <i class="bi bi-eye"></i>
          </button>
        </div>
        <button class="product-add-to-cart" onclick="moveToCart(${product.id})">
          <i class="bi bi-bag-plus"></i> Move to Cart
        </button>
      </div>
      <div class="product-info">
        <span class="product-category-tag">${product.category}</span>
        <a href="product-detail.html?id=${product.id}" class="product-name text-decoration-none d-block">${product.name}</a>
        <div class="product-price-wrapper">
          <span class="product-price">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="product-price-original">${formatPrice(product.originalPrice)}</span>` : ''}
          ${product.discount ? `<span class="product-discount">-${product.discount}%</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  initScrollReveal();
}

function removeWishlistItem(productId) {
  let wishlist = getWishlist();
  const product = wishlist.find(w => w.id === productId);
  wishlist = wishlist.filter(w => w.id !== productId);
  saveWishlist(wishlist);
  showToast(`${product ? product.name : 'Item'} removed from wishlist`, 'info');
  renderWishlistPage();
}

function moveToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;
  openQuickView(productId);
}

function clearWishlist() {
  saveWishlist([]);
  showToast('Wishlist cleared', 'info');
  renderWishlistPage();
}
