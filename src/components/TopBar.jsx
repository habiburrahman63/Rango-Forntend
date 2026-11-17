import React, { useState, useRef, useEffect } from 'react';
import { User, Heart, Gift, HelpCircle, LogOut, Package, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function TopBar() {
  const {
    wishlist,
    setIsWishlistOpen,
    user,
    openAuthModal,
    logout,
    setIsGiftVoucherOpen,
    setIsHelpModalOpen,
    setIsOrdersModalOpen,
    orders
  } = useCart();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-[#222222] text-[#999999] text-[12px] font-sans border-b border-[#333333]">
      <div className="max-w-[1200px] mx-auto px-4 h-[38px] flex items-center justify-between">
        {/* Left Links */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setIsGiftVoucherOpen(true)}
            className="flex items-center gap-1.5 hover:text-[#048287] transition-colors cursor-pointer bg-transparent border-0 p-0 text-inherit text-[12px]"
          >
            <Gift size={13} className="text-[#888888]" />
            <span>Gift Voucher</span>
          </button>
          <span className="text-[#444444]">|</span>
          <button
            type="button"
            onClick={() => setIsHelpModalOpen(true)}
            className="flex items-center gap-1.5 hover:text-[#048287] transition-colors cursor-pointer bg-transparent border-0 p-0 text-inherit text-[12px]"
          >
            <HelpCircle size={13} className="text-[#888888]" />
            <span>Help &amp; Advice</span>
          </button>
        </div>

        {/* Right Links */}
        <div className="flex items-center gap-6">
          {/* User Authentication Status */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 hover:text-[#048287] transition-colors cursor-pointer text-white font-medium bg-transparent border-0 p-0 text-[12px]"
              >
                <div className="w-4 h-4 rounded-full bg-[#048287] text-white flex items-center justify-center text-[10px] font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span>Hi, {user.name ? user.name.split(' ')[0] : 'User'}</span>
                <ChevronDown size={12} className="text-[#888888]" />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white text-[#333333] shadow-xl border border-gray-100 rounded-xs py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-2 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOrdersModalOpen(true);
                      setUserDropdownOpen(false);
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs hover:bg-gray-50 flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Package size={14} className="text-[#048287]" />
                    <span>My Orders ({orders.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer transition-colors border-t border-gray-100"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal('signin')}
              className="flex items-center gap-1.5 hover:text-[#048287] transition-colors cursor-pointer bg-transparent border-0 p-0 text-inherit text-[12px]"
            >
              <User size={13} className="text-[#888888]" />
              <span>Login / Sign up</span>
            </button>
          )}

          <span className="text-[#444444]">|</span>

          {/* Wishlist Link */}
          <button
            type="button"
            onClick={() => setIsWishlistOpen(true)}
            className="flex items-center gap-1.5 hover:text-[#048287] transition-colors cursor-pointer bg-transparent border-0 p-0 text-inherit text-[12px]"
          >
            <Heart size={13} className="text-[#888888]" />
            <span>Wishlist ({wishlist.length})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
