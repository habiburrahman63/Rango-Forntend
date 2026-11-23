import React from 'react';
import ProductCard from './ProductCard';
import { mockData } from '../data/mockData';
import { use3DTilt } from '../hooks/use3DTilt';
import { useScrollReveal3D } from '../hooks/useScrollReveal3D';

export default function MenFashionShowcase() {
  const { banner, products } = mockData.menFashionShowcase;
  const bannerTiltRef = use3DTilt({ maxTilt: 4, perspective: 1100, scale: 1.01 });
  const revealRef = useScrollReveal3D();

  return (
    <section className="w-full bg-white py-14">
      <div className="max-w-[1200px] mx-auto px-4">
        <div
          ref={revealRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch reveal-on-scroll-3d"
        >
          {/* Left: Large Men's Fashion Promotional Banner with 3D Depth */}
          <div
            ref={bannerTiltRef}
            className="lg:col-span-5 xl:col-span-5 relative overflow-hidden group min-h-[440px] lg:min-h-[500px] bg-[#f0f0f0] shadow-sm hover:shadow-2xl transition-all duration-300 tilt-card-3d preserve-3d"
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />

            {/* Centered Overlay Content in 3D Space */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 sm:p-10 text-white preserve-3d">
              <span className="font-serif italic text-lg sm:text-xl text-[#048287] bg-white/90 px-3 py-0.5 rounded-xs mb-3 shadow-md depth-layer-badge">
                {banner.badge}
              </span>
              <h2 className="font-['Bebas_Neue'] text-3xl sm:text-4xl lg:text-[42px] tracking-wider uppercase drop-shadow-md mb-4 text-white depth-layer-actions">
                {banner.title}
              </h2>
              <p className="font-['Lato'] text-[13px] sm:text-[14px] leading-relaxed text-gray-100 max-w-[340px] drop-shadow-sm mb-6 depth-layer-img">
                {banner.description}
              </p>
              <a
                href="#shop"
                className="inline-block bg-[#048287] hover:bg-white text-white hover:text-[#222222] font-['Lato'] font-bold text-[12px] tracking-widest uppercase px-6 py-2.5 transition-all duration-300 shadow-md hover:shadow-xl rounded-xs depth-layer-pop"
              >
                Discover Now
              </a>
            </div>
          </div>

          {/* Right: 3 Product Cards */}
          <div className="lg:col-span-7 xl:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5 items-center">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
