import React from 'react';
import { mockData } from '../data/mockData';

export default function BrandLogos() {
  const logos = mockData.brandLogos;

  return (
    <section className="w-full bg-white py-10 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {logos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="border border-[#e8e8e8] bg-white h-[90px] sm:h-[100px] flex items-center justify-center p-4 transition-all duration-300 hover:border-[#048287] hover:shadow-xs group cursor-pointer"
            >
              <img
                src={logo.image}
                alt={logo.name}
                className="max-h-[50px] max-w-[130px] w-auto h-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
