import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

function getProductOptions(product) {
  const category = (product.category || '').toLowerCase();

  if (category.includes('watch') || category.includes('accessor')) {
    return {
      sizeLabel: 'Case Size',
      sizes: ['38mm', '40mm', '42mm'],
      defaultSize: '40mm',
      colorLabel: 'Finish / Strap',
      colors: [
        { name: 'Rose Gold & Leather', hex: '#b76e79', imgTarget: 'primary' },
        { name: 'Yellow Gold Mesh', hex: '#d4af37', imgTarget: 'secondary' },
        { name: 'Silver Classic', hex: '#c0c0c0', imgTarget: 'primary' },
        { name: 'Matte Black', hex: '#222222', imgTarget: 'primary' }
      ]
    };
  }

  if (category.includes('footwear') || category.includes('shoe') || category.includes('sandal')) {
    return {
      sizeLabel: 'Shoe Size (EU)',
      sizes: ['36', '37', '38', '39', '40'],
      defaultSize: '38',
      colorLabel: 'Color',
      colors: [
        { name: 'Gold Metallic', hex: '#d4af37' },
        { name: 'Classic Black', hex: '#222222' },
        { name: 'Nude / Tan', hex: '#d2b48c' },
        { name: 'Silver Shimmer', hex: '#c0c0c0' }
      ]
    };
  }

  if (category.includes('bag')) {
    return {
      sizeLabel: 'Size',
      sizes: ['Standard', 'Mini', 'Large'],
      defaultSize: 'Standard',
      colorLabel: 'Leather Color',
      colors: [
        { name: 'Caramel Brown', hex: '#8b5a2b' },
        { name: 'Midnight Black', hex: '#1a1a1a' },
        { name: 'Burgundy', hex: '#800020' },
        { name: 'Taupe', hex: '#b38b6d' }
      ]
    };
  }

  // Default Apparel (Jackets, Sweaters, Dresses, Tops)
  return {
    sizeLabel: 'Select Size',
    sizes: ['S', 'M', 'L', 'XL'],
    defaultSize: 'M',
    colorLabel: 'Color',
    colors: [
      { name: 'Olive', hex: '#556b2f' },
      { name: 'Navy', hex: '#1e3a8a' },
      { name: 'Sand', hex: '#d2b48c' },
      { name: 'Charcoal', hex: '#374151' }
    ]
  };
}

function QuickViewDialog({ product, onClose }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const options = getProductOptions(product);

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(options.defaultSize);
  const [selectedColor, setSelectedColor] = useState(options.colors[0]?.name || 'Default');
  const [quantity, setQuantity] = useState(1);

  const inWishlist = isInWishlist(product.id);
  const activeImg = selectedImage || product.image;

  const handleAdd = () => {
    addToCart(
      {
        ...product,
        selectedSize,
        selectedColor
      },
      quantity
    );
    onClose();
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color.name);
    // If selecting yellow gold mesh and secondary image exists, switch preview
    if (color.imgTarget === 'secondary' && product.hoverImage) {
      setSelectedImage(product.hoverImage);
    } else if (color.imgTarget === 'primary') {
      setSelectedImage(product.image);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-3xl shadow-2xl rounded-xs overflow-hidden z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 text-gray-400 hover:text-gray-700 bg-white/90 p-1.5 rounded-full transition-colors cursor-pointer shadow-xs"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Images */}
          <div className="p-6 bg-[#fbfbfb] flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
            <div className="relative w-full aspect-[4/5] overflow-hidden mb-3 bg-white border border-gray-100 flex items-center justify-center p-2">
              <img
                src={activeImg}
                alt={product.title}
                className="w-full h-full object-contain object-center transition-all duration-300"
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
                  type="button"
                  onClick={() => setSelectedImage(product.image)}
                  className={`w-14 h-18 border-2 cursor-pointer overflow-hidden p-1 bg-white transition-all duration-200 ${
                    activeImg === product.image
                      ? 'border-[#048287] shadow-xs'
                      : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                  title="View primary image"
                >
                  <img
                    src={product.image}
                    alt={`${product.title} View 1`}
                    className="w-full h-full object-contain"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedImage(product.hoverImage)}
                  className={`w-14 h-18 border-2 cursor-pointer overflow-hidden p-1 bg-white transition-all duration-200 ${
                    activeImg === product.hoverImage
                      ? 'border-[#048287] shadow-xs'
                      : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                  title="View alternate image"
                >
                  <img
                    src={product.hoverImage}
                    alt={`${product.title} View 2`}
                    className="w-full h-full object-contain"
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
                  {options.sizeLabel}: <span className="font-normal text-[#048287]">{selectedSize}</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {options.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 h-8 border text-xs font-semibold cursor-pointer transition-colors ${
                        selectedSize === s
                          ? 'border-[#048287] bg-[#048287] text-white'
                          : 'border-gray-200 text-gray-700 hover:border-gray-400 bg-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color / Finish Selector */}
              <div className="mb-6">
                <span className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  {options.colorLabel}: <span className="font-normal text-[#048287]">{selectedColor}</span>
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {options.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => handleColorSelect(c)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-7 h-7 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all shadow-xs ${
                        selectedColor === c.name ? 'border-[#048287] scale-110 ring-2 ring-[#048287]/30' : 'border-white'
                      }`}
                      title={c.name}
                    >
                      {selectedColor === c.name && <Check size={12} className="text-white drop-shadow-sm" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions: Quantity + Add to Cart + Wishlist */}
            <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-gray-200 h-11 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 text-gray-600 hover:bg-gray-100 h-full flex items-center cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 text-sm font-semibold text-gray-800">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 text-gray-600 hover:bg-gray-100 h-full flex items-center cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 bg-[#048287] hover:bg-[#036b6f] text-white h-11 font-['Lato'] font-bold text-[13px] tracking-wider uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <ShoppingBag size={16} />
                <span>Add to Cart</span>
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`w-11 h-11 border border-gray-200 flex items-center justify-center transition-colors cursor-pointer ${
                  inWishlist
                    ? 'bg-[#048287] text-white border-[#048287]'
                    : 'text-gray-600 hover:text-[#048287] hover:border-[#048287] bg-white'
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

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct } = useCart();

  if (!quickViewProduct) return null;

  return (
    <QuickViewDialog
      key={quickViewProduct.id}
      product={quickViewProduct}
      onClose={() => setQuickViewProduct(null)}
    />
  );
}
