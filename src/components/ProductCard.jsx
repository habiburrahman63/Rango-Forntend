import React, { useState } from 'react';
import { Heart, Search, Copy, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { use3DTilt } from '../hooks/use3DTilt';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, showToast } = useCart();
  const tiltRef = use3DTilt({ maxTilt: 6.5, perspective: 850, scale: 1.02 });

  const inWishlist = isInWishlist(product.id);

  return (
    <div
      ref={tiltRef}
      className="group relative flex flex-col bg-white border border-[#e8e8e8] hover:border-[#048287]/40 hover:shadow-xl transition-all duration-300 p-2.5 sm:p-3 cursor-pointer tilt-card-3d preserve-3d"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setQuickViewProduct(product)}
    >
      {/* Product Image Area with 3D Depth */}
      <div className="relative w-full aspect-[4/5] bg-[#f8f8f8] overflow-hidden mb-3 cursor-pointer depth-layer-img">
        {/* Main Product Image */}
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Badge: New or Sale with 3D Lift */}
        {product.badge && (
          <div className="absolute top-2 left-2 z-10 depth-layer-badge">
            {product.badge === 'NEW' || product.badge === 'New' ? (
              <span className="bg-[#222222] text-white text-[11px] font-medium tracking-wide px-2 py-0.5 shadow-sm inline-block">
                New
              </span>
            ) : (
              <span className="bg-[#048287] text-white text-[11px] font-medium tracking-wide px-2 py-0.5 shadow-sm inline-block">
                Sale
              </span>
            )}
          </div>
        )}

        {/* Center Magnifying Glass Quick-View Icon on Hover with 3D Pop */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100 bg-black/10' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            title="Quick View"
            className="w-10 h-10 rounded-full border-2 border-white bg-black/25 hover:bg-[#048287] hover:border-[#048287] text-white flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer depth-layer-pop"
          >
            <Search size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Product Information Area with 3D Layering */}
      <div className="flex flex-col items-center text-center flex-1 justify-between preserve-3d">
        <div className="w-full flex flex-col items-center depth-layer-img">
          {/* Title */}
          <h4 className="font-['Bebas_Neue'] text-[17px] sm:text-[18px] text-[#222222] hover:text-[#048287] tracking-wider uppercase transition-colors line-clamp-1 cursor-pointer">
            {product.title}
          </h4>

          {/* Dotted divider line below title */}
          <div className="w-14 border-b border-dotted border-gray-300 my-1.5" />

          {/* Price */}
          <div className="flex items-center justify-center gap-1.5 text-[15px] font-bold text-[#048287] mb-1.5">
            {product.formattedOriginalPrice && (
              <span className="text-[#999999] line-through font-normal text-[13px]">
                {product.formattedOriginalPrice}
              </span>
            )}
            <span className="font-bold">{product.formattedPrice}</span>
          </div>

          {/* Star Rating: 5 teal stars */}
          <div className="flex items-center justify-center gap-0.5 text-[#048287]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                fill="currentColor"
                strokeWidth={0}
                className="text-[#048287]"
              />
            ))}
          </div>
        </div>

        {/* 3 Teal Action Buttons Row on HOVER with 3D Depth */}
        <div className="w-full h-9 mt-2 flex items-center justify-center depth-layer-actions">
          <div
            className={`w-full flex items-center justify-center gap-1.5 transition-all duration-300 ${
              isHovered
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-1 pointer-events-none'
            }`}
          >
            {/* Wishlist Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product);
              }}
              title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              className={`w-9 h-9 bg-[#048287] hover:bg-[#036b6f] text-white flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 shadow-xs hover:shadow-md ${
                inWishlist ? 'bg-[#036b6f]' : ''
              }`}
            >
              <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} strokeWidth={2} />
            </button>

            {/* ADD TO CART Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="flex-1 bg-[#048287] hover:bg-[#036b6f] text-white h-9 px-2 font-['Lato'] font-bold text-[11px] sm:text-[12px] tracking-wider uppercase flex items-center justify-center transition-colors cursor-pointer shadow-xs hover:shadow-md"
            >
              ADD TO CART
            </button>

            {/* Compare Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showToast(`Added "${product.title}" to compare list.`);
              }}
              title="Compare"
              className="w-9 h-9 bg-[#048287] hover:bg-[#036b6f] text-white flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 shadow-xs hover:shadow-md"
            >
              <Copy size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
