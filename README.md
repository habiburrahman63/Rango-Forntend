# Rango Demo 04 — Premium Frontend Recreation

A pixel-perfect, frontend-only recreation of the **Rango Demo 04** eCommerce homepage built with React 19, Vite 8, Tailwind CSS v4, and Lucide Icons.

## 🚀 Quick Start

```bash
# 1. Navigate to the project directory
cd rango-demo04

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`.

To build for production:
```bash
npm run build
```

## 📁 Project Structure

```
rango-demo04/
├── public/
│   └── images/              # All high-resolution images (Hero, banners, products, blog, logos)
├── src/
│   ├── components/          # Reusable, modular UI components
│   │   ├── TopBar.jsx               # Dark charcoal utility bar (#222222)
│   │   ├── Header.jsx               # Main navigation header with teal active item
│   │   ├── HeroSlider.jsx           # Zero-gap hero mosaic with slider & hover animations
│   │   ├── ServiceBenefits.jsx      # Two 4-column benefits sections (D & E)
│   │   ├── FeaturedProducts.jsx     # Tabs: Best Seller, New Arrival, Most Wanted
│   │   ├── ProductCard.jsx          # Interactive card with hover actions [Wishlist | Cart | Compare]
│   │   ├── CategoryBanners.jsx      # 3-column promo banners
│   │   ├── WomenFashionShowcase.jsx # Split showcase with promo hero
│   │   ├── DealsOfWeek.jsx          # Full-width deals with live countdown timer
│   │   ├── MenFashionShowcase.jsx   # Split showcase with promo hero
│   │   ├── DealOfDayBanners.jsx     # Side-by-side promotional cards
│   │   ├── BlogSection.jsx          # Featured large post + 2 stacked posts
│   │   ├── BrandLogos.jsx           # 5-logo bordered showcase
│   │   ├── Footer.jsx               # Dark charcoal multi-column footer (#333333 & #222222)
│   │   ├── CartDrawer.jsx           # Slide-over interactive cart drawer
│   │   ├── WishlistDrawer.jsx       # Slide-over interactive wishlist drawer
│   │   ├── QuickViewModal.jsx       # Product quick-view modal with gallery & options
│   │   ├── SearchModal.jsx          # Instant live search overlay
│   │   └── Toast.jsx                # Action notification alerts
│   ├── context/
│   │   └── CartContext.jsx  # Global cart, wishlist, and modal state management
│   ├── data/
│   │   └── mockData.js      # Complete mock product catalog, banners, blog, and footer links
│   ├── App.jsx              # Main page assembly
│   ├── index.css            # Tailwind CSS v4 & custom animations
│   └── main.jsx             # React root entry point
├── index.html               # Google Fonts (Bebas Neue, Lato, Roboto, Dosis)
├── package.json
└── vite.config.js
```

## ✨ Key Features
- **Zero-Gap Hero Mosaic**: Equal height (`614.73px`), zero-gap alignment between all 4 images, smooth slide transitions with animated text layers, shine-sweep hover effects, and auto-pause on hover.
- **Product Card Hover**: Magnifying glass zoom icon in center on hover, 3 teal action buttons (`[ Wishlist ] [ ADD TO CART ] [ Compare ]`), dotted divider, bold teal price, and teal 5-star rating.
- **Interactive UI**: Slide-over Cart drawer with real-time subtotal, Wishlist drawer with "Move to Cart", live Search modal, Quick View modal with size/color swatches, and ticking countdown timer.
- **Global `cursor: pointer`**: Consistent pointer cursors across all interactive elements.
