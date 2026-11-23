import React from 'react';
import { Truck, RotateCcw, Gift, Headphones } from 'lucide-react';
import { mockData } from '../data/mockData';
import { useScrollReveal3D } from '../hooks/useScrollReveal3D';

const iconMap = {
  Truck: Truck,
  RotateCcw: RotateCcw,
  Gift: Gift,
  Headphones: Headphones
};

function BenefitRow({ items, borderBottom = true }) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 ${
        borderBottom ? 'border-b border-gray-100' : ''
      }`}
    >
      {items.map((item) => {
        const IconComponent = iconMap[item.icon] || Truck;
        return (
          <div
            key={item.id}
            className="flex items-center gap-4 group cursor-pointer transition-transform duration-300 hover:-translate-y-1 preserve-3d"
          >
            {/* Circular Teal Icon with 3D Coin Rotation */}
            <div className="w-[42px] h-[42px] rounded-full bg-[#048287] flex items-center justify-center flex-shrink-0 text-white shadow-sm group-hover:bg-[#036b6f] service-icon-3d">
              <IconComponent size={20} strokeWidth={2} className="depth-layer-img" />
            </div>

            {/* Benefit Text */}
            <div className="flex flex-col">
              <h3 className="font-['Lato'] font-bold text-[13px] text-[#222222] tracking-wider uppercase group-hover:text-[#048287] transition-colors">
                {item.title}
              </h3>
              <p className="font-['Lato'] text-[12px] text-[#888888] mt-0.5 leading-snug">
                {item.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ServiceBenefits() {
  const items = mockData.serviceBenefits;
  const revealRef = useScrollReveal3D();

  return (
    <section className="w-full bg-white border-b border-gray-100">
      <div ref={revealRef} className="max-w-[1200px] mx-auto px-4 reveal-on-scroll-3d">
        {/* Section D: First Service Benefits Section */}
        <BenefitRow items={items} borderBottom={true} />

        {/* Section E: Second Service Benefits Section (exact repeated 4-column section) */}
        <BenefitRow items={items} borderBottom={false} />
      </div>
    </section>
  );
}
