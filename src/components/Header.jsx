import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cartCount, setIsCartOpen, setIsSearchOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  const navItems = [
    { label: 'Home', targetId: 'home' },
    { label: 'Shop', targetId: 'shop' },
    { label: 'Blog', targetId: 'blog' },
    { label: 'Pages', targetId: 'pages' },
    { label: 'Portfolios', targetId: 'portfolios' }
  ];

  const handleNavClick = (item) => {
    setActiveNav(item.label);
    setMobileMenuOpen(false);

    if (item.targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(item.targetId);
      if (el) {
        const headerOffset = 90;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 h-[84px] flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick({ label: 'Home', targetId: 'home' })}
            className="block cursor-pointer bg-transparent border-0 p-0"
            aria-label="Rango Home"
          >
            <img
              src="/images/logo.png"
              alt="Rango Store"
              className="h-[46px] w-auto object-contain"
            />
          </button>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive = activeNav === item.label;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`px-4 py-2 text-[13px] font-bold tracking-wider uppercase transition-colors cursor-pointer rounded-xs ${
                  isActive
                    ? 'bg-[#048287] text-white shadow-xs'
                    : 'text-[#222222] hover:text-[#048287]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-5">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            className="text-[#333333] hover:text-[#048287] transition-colors p-1.5 cursor-pointer"
          >
            <Search size={20} strokeWidth={1.8} />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Cart"
            className="relative text-[#333333] hover:text-[#048287] transition-colors p-1.5 cursor-pointer flex items-center"
          >
            <ShoppingBag size={21} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#048287] text-white text-[11px] font-semibold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="md:hidden text-[#333333] hover:text-[#048287] transition-colors p-1"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeNav === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`text-left px-3 py-2 text-[14px] font-bold tracking-wider uppercase rounded-xs cursor-pointer ${
                    isActive
                      ? 'bg-[#048287] text-white'
                      : 'text-[#222222] hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
