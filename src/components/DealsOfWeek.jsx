import React, { useState, useEffect } from 'react';
import { mockData } from '../data/mockData';

export default function DealsOfWeek() {
  const { left, center, right } = mockData.dealsOfWeek;

  // Dynamic countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 128,
    hours: 14,
    minutes: 36,
    seconds: 48
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-white my-10 relative">
      {/* Surrounding Full-Width Light-Gray Container */}
      <div className="w-full bg-[#f4f4f4] border-y border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 relative min-h-[360px] flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-6 py-6 lg:py-0">
            {/* Left Promotional Area: Male Fashion */}
            <div className="lg:col-span-4 flex items-center justify-center lg:justify-start gap-4">
              <div className="relative group cursor-pointer">
                <img
                  src={left.image}
                  alt={left.title}
                  className="h-[280px] sm:h-[320px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
                {/* Circular Teal Discount Badge */}
                <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-12 h-12 rounded-full bg-[#048287] text-white flex items-center justify-center font-bold text-[13px] shadow-md">
                  {left.discount}
                </div>
              </div>
              <div className="flex flex-col text-left">
                <a
                  href="#mens-fashion"
                  className="font-['Bebas_Neue'] text-xl sm:text-2xl tracking-wider text-[#222222] hover:text-[#048287] transition-colors"
                >
                  {left.title}
                </a>
                <p className="font-['Lato'] text-[13px] text-[#777777] mt-0.5">
                  {left.subtitle}
                </p>
              </div>
            </div>

            {/* Spacer for Center Overlapping Box on desktop */}
            <div className="lg:col-span-4 hidden lg:block" />

            {/* Right Promotional Area: Women's Fashion */}
            <div className="lg:col-span-4 flex items-center justify-center lg:justify-end gap-4">
              <div className="flex flex-col text-right">
                <a
                  href="#womens-fashion"
                  className="font-['Bebas_Neue'] text-xl sm:text-2xl tracking-wider text-[#222222] hover:text-[#048287] transition-colors"
                >
                  {right.title}
                </a>
                <p className="font-['Lato'] text-[13px] text-[#777777] mt-0.5">
                  {right.subtitle}
                </p>
              </div>
              <div className="relative group cursor-pointer">
                <img
                  src={right.image}
                  alt={right.title}
                  className="h-[280px] sm:h-[320px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
                {/* Circular Teal Discount Badge */}
                <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-12 h-12 rounded-full bg-[#048287] text-white flex items-center justify-center font-bold text-[13px] shadow-md">
                  {right.discount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Overlapping Teal Box: Absolute on lg screens to extend above & below */}
      <div className="lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-20 w-full max-w-[420px] mx-auto px-4 lg:px-0">
        <div className="bg-[#048287] text-white p-7 sm:p-9 shadow-xl text-center flex flex-col items-center my-6 lg:my-0">
          <h2 className="font-['Bebas_Neue'] text-3xl sm:text-4xl tracking-wider uppercase mb-2 text-white">
            {center.title}
          </h2>
          <p className="font-['Lato'] text-[13px] text-white/90 leading-relaxed max-w-[320px] mb-6">
            {center.description}
          </p>

          {/* Countdown Timer: 4 Circular Rings */}
          <div className="grid grid-cols-4 gap-3 w-full max-w-[320px] mb-7">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border-2 border-white/60 flex items-center justify-center font-['Bebas_Neue'] text-xl bg-white/10 shadow-inner">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <span className="font-['Lato'] text-[11px] uppercase tracking-wider mt-1 text-white/80">
                Days
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border-2 border-white/60 flex items-center justify-center font-['Bebas_Neue'] text-xl bg-white/10 shadow-inner">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <span className="font-['Lato'] text-[11px] uppercase tracking-wider mt-1 text-white/80">
                Hours
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border-2 border-white/60 flex items-center justify-center font-['Bebas_Neue'] text-xl bg-white/10 shadow-inner">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <span className="font-['Lato'] text-[11px] uppercase tracking-wider mt-1 text-white/80">
                Mins
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border-2 border-white/60 flex items-center justify-center font-['Bebas_Neue'] text-xl bg-white/10 shadow-inner">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <span className="font-['Lato'] text-[11px] uppercase tracking-wider mt-1 text-white/80">
                Secs
              </span>
            </div>
          </div>

          {/* View All Products Button */}
          <a
            href="#all-deals"
            className="inline-block border-2 border-white bg-transparent hover:bg-white text-white hover:text-[#048287] font-['Lato'] font-bold text-[12px] tracking-widest uppercase px-6 py-2.5 transition-all duration-300 shadow-sm"
          >
            {center.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
