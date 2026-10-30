// =============================================
// LUXE NOIR - Products Data & Rendering
// =============================================

// Product Database
const productsData = [
  // MENS
  {
    id: 1, name: "Slim Fit Oxford Shirt", category: "men", badge: "new",
    image: "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=600&q=80",
    imageHover: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=600&q=80",
    price: 1299, originalPrice: 1799, discount: 28,
    sizes: ["S","M","L","XL","XXL"], colors: ["#ffffff","#1a1a2e","#4a90d9"],
    description: "Premium cotton oxford shirt with a tailored slim fit. Perfect for both formal and smart-casual occasions. Features a spread collar and button-down placket.",
    inStock: true, isNew: true
  },
  {
    id: 2, name: "Classic Chino Trousers", category: "men", badge: null,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
    imageHover: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    price: 1899, originalPrice: 2499, discount: 24,
    sizes: ["S","M","L","XL","XXL"], colors: ["#c9a96e","#1a1a2e","#555"],
    description: "Versatile slim-cut chino trousers crafted from stretch cotton blend. Features a mid-rise waist and tapered leg for a modern silhouette.",
    inStock: true, isNew: false
  },
  {
    id: 3, name: "Premium Merino Sweater", category: "men", badge: "hot",
    image: "https://images.unsplash.com/photo-1556906781-9a412961d28d?w=600&q=80",
    imageHover: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&q=80",
    price: 2499, originalPrice: 3499, discount: 29,
    sizes: ["S","M","L","XL"], colors: ["#0a0a0a","#8B4513","#2c3e50"],
    description: "Luxuriously soft 100% merino wool sweater with a classic crew neck. Naturally temperature-regulating for year-round comfort.",
    inStock: true, isNew: false
  },
  {
    id: 4, name: "Tailored Blazer", category: "men", badge: null,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    imageHover: "https://images.unsplash.com/photo-1555069519-127aadecd180?w=600&q=80",
    price: 4999, originalPrice: 7499, discount: 33,
    sizes: ["M","L","XL","XXL"], colors: ["#2c3e50","#0a0a0a","#555"],
    description: "Sharp two-button tailored blazer in a refined wool-blend fabric. Features notch lapels, two flap pockets and a fully lined interior for structured elegance.",
    inStock: true, isNew: false
  },
  // WOMENS
  {
    id: 5, name: "Flowing Midi Dress", category: "women", badge: "new",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    imageHover: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    price: 2299, originalPrice: 3199, discount: 28,
    sizes: ["XS","S","M","L","XL"], colors: ["#f5f5f0","#1a1a2e","#c9a96e"],
    description: "Effortlessly elegant midi dress in a luxurious flowing fabric. Features a V-neckline, adjustable spaghetti straps and a flattering A-line silhouette.",
    inStock: true, isNew: true
  },
  {
    id: 6, name: "Oversized Linen Blazer", category: "women", badge: "hot",
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80",
    imageHover: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&q=80",
    price: 3499, originalPrice: 4999, discount: 30,
    sizes: ["XS","S","M","L"], colors: ["#f5e6d3","#555","#0a0a0a"],
    description: "Contemporary oversized blazer crafted from premium linen. Perfectly structured shoulders with a relaxed, fashion-forward silhouette.",
    inStock: true, isNew: false
  },
  {
    id: 7, name: "High-Rise Tailored Trousers", category: "women", badge: null,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    imageHover: "https://images.unsplash.com/photo-1542295669297-4d352b042bca?w=600&q=80",
    price: 1999, originalPrice: 2799, discount: 29,
    sizes: ["XS","S","M","L","XL"], colors: ["#0a0a0a","#c9a96e","#555"],
    description: "Sleek high-rise tailored trousers with a straight leg cut. Features a concealed side zip and belt loops for versatile styling.",
    inStock: true, isNew: false
  },
  {
    id: 8, name: "Silk Blend Wrap Top", category: "women", badge: "sale",
    image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80",
    imageHover: "https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=600&q=80",
    price: 1499, originalPrice: 2499, discount: 40,
    sizes: ["XS","S","M","L"], colors: ["#fff","#c9a96e","#e8d5c4"],
    description: "Elegant wrap-style top in a luxurious silk-blend fabric. Features adjustable tie fastening and a flattering draped neckline.",
    inStock: true, isNew: false
  },
  // KIDS
  {
    id: 9, name: "Kids Denim Jacket", category: "kids", badge: "new",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80",
    imageHover: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80",
    price: 999, originalPrice: 1399, discount: 29,
    sizes: ["2Y","4Y","6Y","8Y","10Y"], colors: ["#4a90d9","#0a0a0a"],
    description: "Classic denim jacket for kids with a modern slim fit. Features button closure and two chest pockets for everyday adventures.",
    inStock: true, isNew: true
  },
  {
    id: 10, name: "Colourblock Hoodie", category: "kids", badge: null,
    image: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80",
    imageHover: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80",
    price: 799, originalPrice: 1099, discount: 27,
    sizes: ["4Y","6Y","8Y","10Y","12Y"], colors: ["#e74c3c","#3498db","#2ecc71"],
    description: "Fun and vibrant colourblock hoodie made from super-soft cotton blend. Features a front kangaroo pocket and adjustable drawstring hood.",
    inStock: true, isNew: false
  },
  {
    id: 11, name: "Kids Floral Dress", category: "kids", badge: "hot",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf5?w=600&q=80",
    imageHover: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf5?w=600&q=80",
    price: 699, originalPrice: 999, discount: 30,
    sizes: ["2Y","4Y","6Y","8Y"], colors: ["#ff69b4","#fff","#c9a96e"],
    description: "Sweet floral print dress with a ruffled hem and smocked bodice. Made from breathable cotton fabric, perfect for warm days.",
    inStock: true, isNew: false
  },
  // ACCESSORIES
  {
    id: 12, name: "Premium Leather Belt", category: "accessories", badge: null,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    imageHover: "https://images.unsplash.com/photo-1622396636134-5b06e5db8eb4?w=600&q=80",
    price: 899, originalPrice: 1299, discount: 31,
    sizes: ["S","M","L","XL"], colors: ["#0a0a0a","#8B4513","#c9a96e"],
    description: "Full-grain genuine leather belt with a polished silver buckle. A timeless accessory that pairs beautifully with both formal and casual outfits.",
    inStock: true, isNew: false
  },
  {
    id: 13, name: "Classic Aviator Sunglasses", category: "accessories", badge: "hot",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    imageHover: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80",
    price: 1499, originalPrice: 2199, discount: 32,
    sizes: ["ONE SIZE"], colors: ["#c9a96e","#0a0a0a"],
    description: "Iconic aviator-style sunglasses with UV400 polarized lenses. Lightweight metal frame with spring hinges for a comfortable all-day fit.",
    inStock: true, isNew: false
  },
  {
    id: 14, name: "Cashmere Blend Scarf", category: "accessories", badge: "new",
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80",
    imageHover: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80",
    price: 1299, originalPrice: 1899, discount: 32,
    sizes: ["ONE SIZE"], colors: ["#f5e6d3","#0a0a0a","#c9a96e"],
    description: "Indulgently soft cashmere-blend scarf with a subtle herringbone weave. Lightweight yet warm, perfect for layering in any season.",
    inStock: true, isNew: true
  },
  // SALE items
  {
    id: 15, name: "Linen Summer Shirt", category: "sale", badge: "sale",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    imageHover: "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=600&q=80",
    price: 799, originalPrice: 1999, discount: 60,
    sizes: ["S","M","L","XL","XXL"], colors: ["#fff","#4a90d9","#c9a96e"],
    description: "Breathable 100% linen summer shirt with a relaxed fit. Perfect for beach days or casual evenings out.",
    inStock: true, isNew: false
  },
  {
    id: 16, name: "Floral Wrap Skirt", category: "sale", badge: "sale",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
    imageHover: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
    price: 699, originalPrice: 1599, discount: 56,
    sizes: ["XS","S","M","L"], colors: ["#e8d5c4","#c9a96e","#0a0a0a"],
    description: "Versatile wrap skirt with a vibrant floral print. Adjustable waist tie for a perfect fit. Midi length for effortless style.",
    inStock: true, isNew: false
  }
];

// =============================================
// Render Product Cards
// =============================================
function formatPrice(price) {
  return '₹' + price.toLocaleString('en-IN');
}

function getBadgeHTML(badge) {
  if (!badge) return '';
  const classes = { new: 'badge-new', sale: 'badge-sale', hot: 'badge-hot' };
  const labels = { new: 'New', sale: 'Sale', hot: 'Hot' };
  return `<span class="${classes[badge]}">${labels[badge]}</span>`;
}

function getColorSwatches(colors, small = true) {
  return colors.map(c => `<span class="color-swatch" style="background:${c};" title="${c}"></span>`).join('');
}

function renderProductCard(product) {
  const wishlist = getWishlist();
  const isWishlisted = wishlist.some(w => w.id === product.id);
  const wishlistClass = isWishlisted ? 'wishlisted' : '';
  const wishlistIcon = isWishlisted ? 'bi-heart-fill' : 'bi-heart';

  return `
    <div class="product-card scroll-reveal" data-id="${product.id}">
      <div class="product-image-wrapper">
        <a href="product-detail.html?id=${product.id}" class="d-block w-100 h-100">
          <img src="${product.image}" alt="${product.name}" class="img-primary" loading="lazy">
          <img src="${product.imageHover}" alt="${product.name}" class="img-hover" loading="lazy">
        </a>
        <div class="product-badges">${getBadgeHTML(product.badge)}</div>
        <div class="product-actions">
          <button class="product-action-btn ${wishlistClass}" id="wl-${product.id}" onclick="toggleWishlistFromCard(${product.id})" aria-label="Add to wishlist" title="Wishlist">
            <i class="bi ${wishlistIcon}"></i>
          </button>
          <button class="product-action-btn" onclick="openQuickView(${product.id})" aria-label="Quick view" title="Quick View">
            <i class="bi bi-eye"></i>
          </button>
        </div>
        <button class="product-add-to-cart" onclick="quickAddToCart(${product.id})">
          <i class="bi bi-bag-plus"></i> Add to Cart
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
        <div class="product-colors">${getColorSwatches(product.colors)}</div>
      </div>
    </div>
  `;
}

// =============================================
// Quick Add to Cart (opens modal if sizes)
// =============================================
function quickAddToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;
  // If clothing with sizes (not accessories with ONE SIZE), open quick view
  if (product.sizes.length > 1 && !product.sizes.includes('ONE SIZE')) {
    openQuickView(productId);
    return;
  }
  // Accessories / single size: add directly
  addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    size: product.sizes[0],
    color: product.colors[0],
    quantity: 1
  });
}

// =============================================
// Wishlist Helpers (shared)
// =============================================
function getWishlist() {
  return JSON.parse(localStorage.getItem('luxeNoir_wishlist') || '[]');
}

function saveWishlist(wishlist) {
  localStorage.setItem('luxeNoir_wishlist', JSON.stringify(wishlist));
  updateWishlistBadge();
}

function updateWishlistBadge() {
  const wishlist = getWishlist();
  const count = wishlist.length;
  document.querySelectorAll('.wishlist-badge').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function toggleWishlistFromCard(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;
  let wishlist = getWishlist();
  const idx = wishlist.findIndex(w => w.id === productId);
  const btn = document.getElementById(`wl-${productId}`);

  if (idx === -1) {
    wishlist.push(product);
    saveWishlist(wishlist);
    showToast(`${product.name} added to wishlist`, 'success');
    if (btn) { btn.classList.add('wishlisted'); btn.querySelector('i').className = 'bi bi-heart-fill'; }
  } else {
    wishlist.splice(idx, 1);
    saveWishlist(wishlist);
    showToast(`${product.name} removed from wishlist`, 'info');
    if (btn) { btn.classList.remove('wishlisted'); btn.querySelector('i').className = 'bi bi-heart'; }
  }
}

// =============================================
// Scroll Reveal
// =============================================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('revealed'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}
