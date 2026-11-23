import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, cartSubtotal, openCheckout } =
    useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-drawer-3d preserve-3d">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#048287]" />
              <h3 className="font-['Lato'] font-bold text-base text-[#222222] uppercase tracking-wider">
                Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-gray-400">
                <ShoppingBag size={48} className="stroke-[1.2] mb-3 text-gray-300" />
                <p className="text-sm font-medium text-gray-600 mb-1">Your cart is currently empty.</p>
                <p className="text-xs text-gray-400">Discover our collection and add your favorite items!</p>
              </div>
            ) : (
              cart.map((item) => (
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
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[13px] font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="text-lg font-bold text-[#048287]">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 text-center">
                Shipping, taxes, and discounts calculated at checkout.
              </p>
              <button
                onClick={openCheckout}
                className="w-full bg-[#048287] hover:bg-[#036b6f] text-white py-3 font-['Lato'] font-bold text-[13px] tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
