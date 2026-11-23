import React from 'react';
import { mockData } from '../data/mockData';
import { use3DTilt } from '../hooks/use3DTilt';
import { useScrollReveal3D } from '../hooks/useScrollReveal3D';

function DealBannerCard({ item }) {
  const tiltRef = use3DTilt({ maxTilt: 4.5, perspective: 1000, scale: 1.015 });

  return (
    <a
      ref={tiltRef}
      href={item.link}
      className="relative block overflow-hidden group bg-[#f5f5f5] shadow-xs hover:shadow-2xl transition-all duration-300 cursor-pointer tilt-card-3d preserve-3d"
    >
      <img
        src={item.image}
        alt={`${item.title} - ${item.subtitle}`}
        className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
    </a>
  );
}

export default function DealOfDayBanners() {
  const { left, right } = mockData.dealOfDayBanners;
  const revealRef = useScrollReveal3D();

  return (
    <section className="w-full bg-white pb-14">
      <div className="max-w-[1200px] mx-auto px-4">
        <div
          ref={revealRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-on-scroll-3d stagger-3d"
        >
          {/* Left Banner: Deal of the Day - Girl's Bags */}
          <DealBannerCard item={left} />

          {/* Right Banner: New Arrivals - Sale 40% */}
          <DealBannerCard item={right} />
        </div>
      </div>
    </section>
  );
}
