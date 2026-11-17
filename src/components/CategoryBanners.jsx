import React from 'react';
import { mockData } from '../data/mockData';

export default function CategoryBanners() {
  const banners = mockData.categoryBanners;

  return (
    <section className="w-full bg-white pb-14">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[270fr_570fr_270fr] gap-6 md:gap-[30px] items-start">
          {banners.map((b) => (
            <a
              key={b.id}
              href={b.link}
              className="relative block overflow-hidden group bg-[#f5f5f5] cursor-pointer shine-effect"
            >
              <img
                src={b.image}
                alt={`${b.title} ${b.subtitle}`}
                className="w-full h-auto block object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
