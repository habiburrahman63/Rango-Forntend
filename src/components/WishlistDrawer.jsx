import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function WishlistDrawer() {
  const { isWishlistOpen, setIsWishlistOpen, wishlist, toggleWishlist, addToCart } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-[#048287]" fill="currentColor" />
              <h3 className="font-['Lato'] font-bold text-base text-[#222222] uppercase tracking-wider">
                My Wishlist ({wishlist.length})
              </h3>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-gray-400">
                <Heart size={48} className="stroke-[1.2] mb-3 text-gray-300" />
                <p className="text-sm font-medium text-gray-600 mb-1">Your wishlist is empty.</p>
                <p className="text-xs text-gray-400">Save items you love to your wishlist!</p>
              </div>
            ) : (
              wishlist.map((item) => (
                <div key={item.id} className="py-4 flex gap-3 items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-20 object-cover bg-gray-50 border border-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-['Lato'] text-[13px] font-medium text-[#222222] truncate hover:text-[#048287]">
                      {item.title}
                    </h4>
                    <p className="text-[12px] text-[#048287] font-bold mt-0.5">
                      {item.formattedPrice || `$${item.price.toFixed(2)}`}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          addToCart(item);
                          toggleWishlist(item);
                        }}
                        className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-[#048287] text-white px-2.5 py-1 rounded-xs hover:bg-[#036b6f] transition-colors cursor-pointer"
                      >
                        <ShoppingBag size={12} />
                        <span>Move to Cart</span>
                      </button>

                      <button
                        onClick={() => toggleWishlist(item)}
                        className="text-gray-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                        title="Remove from Wishlist"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
