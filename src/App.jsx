import React from 'react';
import { CartProvider } from './context/CartContext';
import TopBar from './components/TopBar';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import ServiceBenefits from './components/ServiceBenefits';
import FeaturedProducts from './components/FeaturedProducts';
import CategoryBanners from './components/CategoryBanners';
import WomenFashionShowcase from './components/WomenFashionShowcase';
import DealsOfWeek from './components/DealsOfWeek';
import MenFashionShowcase from './components/MenFashionShowcase';
import DealOfDayBanners from './components/DealOfDayBanners';
import BlogSection from './components/BlogSection';
import BrandLogos from './components/BrandLogos';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import SearchModal from './components/SearchModal';
import QuickViewModal from './components/QuickViewModal';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import GiftVoucherModal from './components/GiftVoucherModal';
import HelpModal from './components/HelpModal';
import OrdersModal from './components/OrdersModal';
import Toast from './components/Toast';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white text-[#555555] font-['Lato'] selection:bg-[#048287] selection:text-white">
        {/* A. Top Utility Bar */}
        <TopBar />

        {/* B. Main Header & Navigation */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* C. Main Hero Banner */}
          <div id="home">
            <HeroSlider />
          </div>

          {/* D & E. First & Second Service Benefits Sections */}
          <div id="pages">
            <ServiceBenefits />
          </div>

          {/* F. Featured Products Section (Best Seller, New Arrival, Most Wanted) */}
          <div id="shop">
            <FeaturedProducts />
          </div>

          {/* G. Promotional Category Banners */}
          <CategoryBanners />

          {/* H. Women's Fashion Product Showcase */}
          <WomenFashionShowcase />

          {/* I. Deals of Weeks Section */}
          <DealsOfWeek />

          {/* J. Men's Fashion Product Showcase */}
          <MenFashionShowcase />

          {/* K. Deal of the Day & New Arrivals */}
          <DealOfDayBanners />

          {/* L. Fashion Blog Section */}
          <div id="blog">
            <BlogSection />
          </div>

          {/* M. Brand Logo Showcase */}
          <div id="portfolios">
            <BrandLogos />
          </div>
        </main>

        {/* N. Footer */}
        <Footer />

        {/* Modals & Interactive Drawers */}
        <CartDrawer />
        <WishlistDrawer />
        <SearchModal />
        <QuickViewModal />
        <AuthModal />
        <CheckoutModal />
        <GiftVoucherModal />
        <HelpModal />
        <OrdersModal />
        <Toast />
      </div>
    </CartProvider>
  );
}
