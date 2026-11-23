import React from 'react';
import { mockData } from '../data/mockData';
import { use3DTilt } from '../hooks/use3DTilt';
import { useScrollReveal3D } from '../hooks/useScrollReveal3D';

function BannerItem({ banner }) {
  const tiltRef = use3DTilt({ maxTilt: 5, perspective: 1000, scale: 1.015 });

  return (
    <a
      ref={tiltRef}
      href={banner.link}
      className="relative block overflow-hidden group bg-[#f5f5f5] cursor-pointer shine-effect tilt-card-3d preserve-3d shadow-xs hover:shadow-xl transition-all duration-300"
    >
      <img
        src={banner.image}
        alt={`${banner.title} ${banner.subtitle}`}
        className="w-full h-auto block object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
      {/* Subtle hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
    </a>
  );
}

export default function CategoryBanners() {
  const banners = mockData.categoryBanners;
  const revealRef = useScrollReveal3D();

  return (
    <section className="w-full bg-white pb-14">
      <div className="max-w-[1200px] mx-auto px-4">
        <div
          ref={revealRef}
          className="grid grid-cols-1 md:grid-cols-[270fr_570fr_270fr] gap-6 md:gap-[30px] items-start reveal-on-scroll-3d stagger-3d"
        >
          {banners.map((b) => (
            <BannerItem key={b.id} banner={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
