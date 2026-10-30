# LUXE NOIR | Luxury Clothing E-Commerce Website

A modern, responsive, high-aesthetic fashion e-commerce web platform inspired by luxury labels such as Zara, Massimo Dutti, and H&M.

Built with **pure HTML5, Vanilla CSS3, JavaScript (ES6+), Bootstrap 5, Bootstrap Icons, and LocalStorage**.

---

## 🌟 Key Features

### 1. Curated Storefront & Navigation
- **Announcement Bar:** Global promotional banner highlighting current sales and promo codes (e.g., NOIR15).
- **Sticky Glassmorphism Navbar:** Backdrop-blur navigation with brand logo, department links, mobile slide drawer, search modal, and live badge counters for cart and wishlist.
- **Hero Carousel:** High-fashion lookbook slider with responsive banners and call-to-actions.
- **Value Propositions:** Express delivery, 30-day effortless returns, authentic quality, and concierge support.
- **Curated Department Tiles:** Men, Women, Kids, and Accessories collections.
- **Editorial Winter Atelier Banner:** High-fashion storytelling split layout.
- **Customer Testimonials & Reviews:** Verified buyer social proof with star ratings.
- **Atelier Newsletter & Payment Badges:** Modern newsletter subscription with toast feedback and trust badges.

### 2. Comprehensive Catalog (products.html / shop.html)
- **Department Filter Pills:** Instant filtering by *All*, *Men*, *Women*, *Kids*, *Accessories*, and *Sale*.
- **Sorting Options:** Featured, Newest First, Price (Low to High), Price (High to Low), and Highest Discount.
- **Price Range Filter:** Filter products by budget tiers.
- **Real-Time Search:** Search bar filtering through titles, categories, and item descriptions.

### 3. Product Detail Page (product-detail.html)
- Multi-angle gallery viewport with interactive thumbnail switcher.
- Color swatches and interactive size selector with **Size Guide modal**.
- Quantity stepper with stock checks.
- Accordion panels for fabric & care guidelines and shipping/returns policy.
- Dynamic *You May Also Like* related products carousel.

### 4. Interactive Shopping Cart (cart.html & Slide-Out Drawer)
- **Slide-Out Cart Drawer:** Real-time **Free Shipping Progress Bar** showing how much more is needed to reach complimentary shipping.
- **Full Dedicated Cart:** Itemized list with thumbnail, selected size/color, quantity steppers, unit price, and subtotal.
- **Promo Code Engine:** Apply coupons (NOIR15 for 15% off, LUXE20 for 20% off) with dynamic discount deductions.
- Persistent state saved to browser LocalStorage.

### 5. Wishlist Management (wishlist.html)
- Save favorites from any product card.
- Move items directly to cart or remove with instant counter updates.

### 6. Checkout Flow (checkout.html)
- 3-Step checkout: Contact details, Shipping address, and Payment method (UPI/QR, Credit/Debit, Cash on Delivery).
- Input validation for phone numbers, email, and 6-digit pincode.
- Order confirmation screen with generated order ID (#LN...) and auto-resetting cart.

---

## 💻 Tech Stack

- **Markup:** HTML5 (Semantic tags, accessible structure)
- **Styling:** CSS3 (Vanilla CSS, custom design tokens, responsive typography)
- **Frameworks & Icons:** Bootstrap 5.3.3, Bootstrap Icons 1.11.3
- **Logic & State:** Pure ES6+ JavaScript, Web Storage API (LocalStorage)

---

## 🚀 Getting Started

1. Clone or download this repository:
   `ash
   git clone https://github.com/ayushi-0008/Clothing-Ecommerce.git
   `
2. Open index.html in any modern web browser, or serve locally with:
   `ash
   python -m http.server 8080
   `
3. Navigate to http://localhost:8080/index.html in your browser.

---

## 📄 License
This project is open source and available under the MIT License.
