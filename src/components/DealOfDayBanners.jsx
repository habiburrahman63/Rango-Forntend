import React from 'react';
import { mockData } from '../data/mockData';

export default function DealOfDayBanners() {
  const { left, right } = mockData.dealOfDayBanners;

  return (
    <section className="w-full bg-white pb-14">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Banner: Deal of the Day - Girl's Bags */}
          <a
            href={left.link}
            className="relative block overflow-hidden group bg-[#f5f5f5] shadow-xs cursor-pointer"
          >
            <img
              src={left.image}
              alt={`${left.title} - ${left.subtitle}`}
              className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
          </a>

          {/* Right Banner: New Arrivals - Sale 40% */}
          <a
            href={right.link}
            className="relative block overflow-hidden group bg-[#f5f5f5] shadow-xs cursor-pointer"
          >
            <img
              src={right.image}
              alt={`${right.title} - ${right.subtitle}`}
              className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
          </a>
        </div>
      </div>
    </section>
  );
}
