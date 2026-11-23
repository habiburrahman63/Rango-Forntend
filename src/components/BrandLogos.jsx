import React from 'react';
import { mockData } from '../data/mockData';
import { use3DTilt } from '../hooks/use3DTilt';
import { useScrollReveal3D } from '../hooks/useScrollReveal3D';

function BrandLogoItem({ logo }) {
  const tiltRef = use3DTilt({ maxTilt: 6, perspective: 700, scale: 1.04, glare: false });

  return (
    <div
      ref={tiltRef}
      className="border border-[#e8e8e8] bg-white h-[90px] sm:h-[100px] flex items-center justify-center p-4 transition-all duration-300 hover:border-[#048287] hover:shadow-lg group cursor-pointer tilt-card-3d preserve-3d"
    >
      <img
        src={logo.image}
        alt={logo.name}
        className="max-h-[50px] max-w-[130px] w-auto h-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 depth-layer-img"
      />
    </div>
  );
}

export default function BrandLogos() {
  const logos = mockData.brandLogos;
  const revealRef = useScrollReveal3D();

  return (
    <section className="w-full bg-white py-10 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4">
        <div
          ref={revealRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 reveal-on-scroll-3d stagger-3d"
        >
          {logos.map((logo, index) => (
            <BrandLogoItem key={`${logo.id}-${index}`} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
