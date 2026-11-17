import React, { useState } from 'react';
import { X, Search, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { mockData } from '../data/mockData';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useCart();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  // Flatten all products
  const allProducts = [
    ...mockData.featuredProducts.bestSeller,
    ...mockData.featuredProducts.newArrival,
    ...mockData.featuredProducts.mostWanted
  ];

  // Remove duplicates by id
  const uniqueProducts = Array.from(new Map(allProducts.map((p) => [p.id, p])).values());

  const results = query.trim()
    ? uniqueProducts.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : uniqueProducts.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-white shadow-2xl rounded-xs overflow-hidden z-10">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50">
          <Search size={22} className="text-[#048287]" />
          <input
            type="text"
            placeholder="Search products, categories, styles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-base text-[#222222] outline-none font-['Lato']"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[420px] overflow-y-auto p-4 divide-y divide-gray-100">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
            {query.trim() ? `Search Results (${results.length})` : 'Popular Searches'}
          </p>

          {results.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No products found matching "{query}".
            </div>
          ) : (
            results.map((product) => (
              <div key={product.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-12 h-15 object-cover bg-gray-50 border border-gray-100 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h5 className="font-['Lato'] text-[13px] font-medium text-[#222222] truncate hover:text-[#048287]">
                      {product.title}
                    </h5>
                    <span className="text-xs text-gray-400">{product.category}</span>
                    <p className="text-xs font-bold text-[#048287] mt-0.5">
                      {product.formattedPrice}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart(product);
                    setIsSearchOpen(false);
                  }}
                  className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-[#048287] text-white px-3 py-1.5 rounded-xs hover:bg-[#036b6f] transition-colors cursor-pointer flex-shrink-0"
                >
                  <ShoppingBag size={12} />
                  <span>Add to Cart</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
