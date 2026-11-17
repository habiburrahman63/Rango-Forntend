import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 1,
      image: '/images/hero-slider1.jpg',
      title: 'NEW COLLECTION',
      subtitle: 'SALE UP TO 70% OFF',
      btnText: 'Shop now !',
      alt: 'New Collection Fashion Model with Orange Bag'
    },
    {
      id: 2,
      image: '/images/hero-slider2.jpg',
      title: 'MEN FASHION',
      subtitle: 'SALE UP TO 70% OFF',
      btnText: 'Shop now !',
      alt: 'Men Fashion Urban Collection'
    },
    {
      id: 3,
      image: '/images/hero-slider3.jpg',
      title: 'AUTUMN LOOKBOOK',
      subtitle: 'EXCLUSIVE UP TO 50% OFF',
      btnText: 'Shop now !',
      alt: 'Autumn Lookbook Edition'
    }
  ];

  // Auto-advance slider every 5.5 seconds, pauses when mouse hovers
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="w-full bg-white py-4 sm:py-6">
      <div className="max-w-[1200px] mx-auto px-4">
        {/*
          Seamless Hero Mosaic Grid:
          - Zero gap (gap-0) between all images.
          - Left column establishes 570x600 aspect ratio.
          - Right column matches exact height with items-stretch.
          - Rich slider transitions and hover animations on all panels.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 p-0 m-0 overflow-hidden items-stretch shadow-xs bg-[#eef0f3]">
          {/* Left Column: Interactive Revolution-style Animated Slider */}
          <div
            className="relative w-full aspect-[570/600] overflow-hidden group bg-[#eef0f3] cursor-pointer select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {slides.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    isActive
                      ? 'opacity-100 z-10 scale-100'
                      : 'opacity-0 z-0 scale-105 pointer-events-none'
                  }`}
                >
                  {/* Slide Background Image with subtle Ken Burns zoom */}
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className={`w-full h-full object-cover object-center block transition-transform duration-7000 ease-out ${
                      isActive ? 'scale-105' : 'scale-100'
                    }`}
                  />

                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/20 pointer-events-none" />

                  {/* Animated Text Layers (Revolution Slider Style) */}
                  <div className="absolute inset-0 flex flex-col justify-center items-end pr-8 sm:pr-14 text-right pointer-events-auto">
                    {/* Layer 1: Title */}
                    <div
                      className={`transition-all duration-700 delay-200 transform ${
                        isActive
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 translate-x-10'
                      }`}
                    >
                      <span className="font-['Bebas_Neue'] text-white text-4xl sm:text-5xl lg:text-[54px] leading-tight tracking-wider drop-shadow-md">
                        {slide.title}
                      </span>
                    </div>

                    {/* Layer 2: Subtitle */}
                    <div
                      className={`transition-all duration-700 delay-400 transform mt-1 mb-5 ${
                        isActive
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 translate-x-10'
                      }`}
                    >
                      <span className="font-['Bebas_Neue'] text-white text-xl sm:text-2xl lg:text-[26px] tracking-wide drop-shadow-sm">
                        {slide.subtitle}
                      </span>
                    </div>

                    {/* Layer 3: CTA Button */}
                    <div
                      className={`transition-all duration-700 delay-600 transform ${
                        isActive
                          ? 'opacity-100 translate-y-0 scale-100'
                          : 'opacity-0 translate-y-4 scale-95'
                      }`}
                    >
                      <a
                        href="#shop"
                        className="inline-block bg-[#048287] hover:bg-white text-white hover:text-[#222222] font-['Lato'] font-bold text-[13px] tracking-wider uppercase px-5 py-2.5 transition-all duration-300 shadow-md hover:shadow-lg rounded-xs cursor-pointer hover:-translate-y-0.5"
                      >
                        {slide.btnText}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Slider Navigation Arrows (Fade in & glide smoothly on hover) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              aria-label="Previous Slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/70 hover:bg-[#048287] hover:text-white text-[#222222] flex items-center justify-center rounded-full opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 cursor-pointer shadow-md"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              aria-label="Next Slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/70 hover:bg-[#048287] hover:text-white text-[#222222] flex items-center justify-center rounded-full opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 cursor-pointer shadow-md"
            >
              <ChevronRight size={22} />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer shadow-xs ${
                    idx === currentSlide
                      ? 'w-7 bg-[#048287]'
                      : 'w-2 bg-white/80 hover:bg-white'
                  }`}
                />
              ))}
            </div>

            {/* Animated Slide Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black/20 z-20 overflow-hidden">
              <div
                key={currentSlide}
                className="h-full bg-[#048287] animate-[slideTimer_5.5s_linear_infinite]"
                style={{
                  animationPlayState: isPaused ? 'paused' : 'running'
                }}
              />
            </div>
          </div>

          {/* Right Column: 2 Rows with Hover Zoom & Shine Animation */}
          <div className="flex flex-col w-full h-full gap-0 p-0 m-0">
            {/* Top Half: 2 Square Images Side-by-Side */}
            <div className="grid grid-cols-2 gap-0 p-0 m-0 w-full flex-1 min-h-0">
              {/* Top Left: Sale 50% Men */}
              <div className="relative w-full h-full overflow-hidden group/item cursor-pointer bg-[#e0e2e5] shine-effect">
                <img
                  src="/images/hero-image1.jpg"
                  alt="Sale 50% Men"
                  className="w-full h-full object-cover block transition-transform duration-700 ease-out group-hover/item:scale-108"
                />
                {/* Subtle dark vignette on hover to make text pop */}
                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-400 pointer-events-none" />
              </div>

              {/* Top Right: Sale 20% Women */}
              <div className="relative w-full h-full overflow-hidden group/item cursor-pointer bg-[#e0e2e5] shine-effect">
                <img
                  src="/images/hero-image2.jpg"
                  alt="Sale 20% Women"
                  className="w-full h-full object-cover block transition-transform duration-700 ease-out group-hover/item:scale-108"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-400 pointer-events-none" />
              </div>
            </div>

            {/* Bottom Half: Watches Banner */}
            <div className="relative w-full flex-1 min-h-0 overflow-hidden group/item cursor-pointer bg-[#e0e2e5] shine-effect">
              <img
                src="/images/hero-image3.jpg"
                alt="New Arrivals Sale 30% Watches"
                className="w-full h-full object-cover block transition-transform duration-700 ease-out group-hover/item:scale-106"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
