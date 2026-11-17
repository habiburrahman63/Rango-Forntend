import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } =
    useCart();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Default');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWishlist = isInWishlist(product.id);
  const activeImg = selectedImage || product.image;

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Olive', hex: '#556b2f' },
    { name: 'Navy', hex: '#1e3a8a' },
    { name: 'Sand', hex: '#d2b48c' },
    { name: 'Charcoal', hex: '#374151' }
  ];

  const handleAdd = () => {
    addToCart(product, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-3xl shadow-2xl rounded-xs overflow-hidden z-10 my-8">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 text-gray-400 hover:text-gray-700 bg-white/80 p-1.5 rounded-full transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Images */}
          <div className="p-6 bg-[#fbfbfb] flex flex-col items-center justify-center">
            <div className="relative w-full aspect-[4/5] overflow-hidden mb-3 bg-white border border-gray-100">
              <img
                src={activeImg}
                alt={product.title}
                className="w-full h-full object-cover object-top"
              />
              {product.badge && (
                <span
                  className={`absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 text-white ${
                    product.badge === 'NEW' ? 'bg-[#222222]' : 'bg-[#048287]'
                  }`}
                >
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.hoverImage && product.hoverImage !== product.image && (
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedImage(product.image)}
                  className={`w-14 h-18 border cursor-pointer overflow-hidden ${
                    activeImg === product.image ? 'border-[#048287]' : 'border-gray-200'
                  }`}
                >
                  <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={() => setSelectedImage(product.hoverImage)}
                  className={`w-14 h-18 border cursor-pointer overflow-hidden ${
                    activeImg === product.hoverImage ? 'border-[#048287]' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={product.hoverImage}
                    alt="Thumbnail 2"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#048287] font-semibold">
                {product.category || 'Fashion Apparel'}
              </span>

              <h2 className="font-['Lato'] font-bold text-xl text-[#222222] mt-1 mb-2">
                {product.title}
              </h2>

              {/* Star Rating */}
              <div className="flex items-center gap-1 text-[#048287] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
                <span className="text-xs text-gray-500 ml-1.5">(12 Customer Reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mb-4">
                {product.formattedOriginalPrice && (
                  <span className="text-gray-400 line-through text-base">
                    {product.formattedOriginalPrice}
                  </span>
                )}
                <span className="text-2xl font-bold text-[#048287]">
                  {product.formattedPrice}
                </span>
              </div>

              {/* Description */}
              <p className="font-['Lato'] text-[13px] text-[#666666] leading-relaxed mb-6">
                {product.description ||
                  'Crafted with premium materials and signature design. Perfectly suited for contemporary casual elegance.'}
              </p>

              {/* Size Selector */}
              <div className="mb-4">
                <span className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Select Size
                </span>
                <div className="flex gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-9 h-9 border text-xs font-semibold cursor-pointer transition-colors ${
                        selectedSize === s
                          ? 'border-[#048287] bg-[#048287] text-white'
                          : 'border-gray-200 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-6">
                <span className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Color: {selectedColor}
                </span>
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-7 h-7 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all ${
                        selectedColor === c.name ? 'border-[#048287] scale-110' : 'border-white'
                      }`}
                      title={c.name}
                    >
                      {selectedColor === c.name && <Check size={12} className="text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions: Quantity + Add to Cart + Wishlist */}
            <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-gray-200 h-11">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 text-gray-600 hover:bg-gray-100 h-full flex items-center cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 text-sm font-semibold text-gray-800">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 text-gray-600 hover:bg-gray-100 h-full flex items-center cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAdd}
                className="flex-1 bg-[#048287] hover:bg-[#036b6f] text-white h-11 font-['Lato'] font-bold text-[13px] tracking-wider uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <ShoppingBag size={16} />
                <span>Add to Cart</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-11 h-11 border border-gray-200 flex items-center justify-center transition-colors cursor-pointer ${
                  inWishlist
                    ? 'bg-[#048287] text-white border-[#048287]'
                    : 'text-gray-600 hover:text-[#048287] hover:border-[#048287]'
                }`}
                title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
