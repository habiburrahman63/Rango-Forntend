import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { mockData } from '../data/mockData';

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('bestSeller');

  const tabs = [
    { key: 'bestSeller', label: 'BEST SELLER' },
    { key: 'newArrival', label: 'NEW ARRIVAL' },
    { key: 'mostWanted', label: 'MOST WANTED' }
  ];

  const currentProducts = mockData.featuredProducts[activeTab] || [];

  return (
    <section className="w-full bg-white py-14">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Centered Tab Navigation */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 mb-10 border-b border-gray-100 pb-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative pb-3 font-['Bebas_Neue'] text-xl sm:text-2xl tracking-wider transition-colors cursor-pointer ${
                  isActive ? 'text-[#048287]' : 'text-[#222222] hover:text-[#048287]'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#048287]" />
                )}
              </button>
            );
          })}
        </div>

        {/* 4-Product Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
