import React from 'react';
import { mockData } from '../data/mockData';

export default function BlogSection() {
  const { subtitle, title, featured, posts } = mockData.blog;

  return (
    <section className="w-full bg-white pb-16">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <p className="font-serif italic text-sm text-[#777777] mb-1">
            {subtitle}
          </p>
          <h2 className="font-['Bebas_Neue'] text-3xl sm:text-4xl tracking-wider text-[#222222] uppercase">
            {title}
          </h2>
        </div>

        {/* 2-Column Blog Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Featured Large Post */}
          <article className="group cursor-pointer flex flex-col">
            <div className="relative overflow-hidden mb-4 bg-gray-100 aspect-[16/10]">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Date Badge */}
              <div className="absolute top-3 left-3 bg-[#048287] text-white px-2.5 py-1 text-center font-['Bebas_Neue'] shadow-sm">
                <span className="block text-lg leading-none">{featured.day}</span>
                <span className="block text-[11px] uppercase tracking-wider leading-none mt-0.5 font-sans">
                  {featured.month}
                </span>
              </div>
            </div>

            <div className="flex flex-col text-left">
              <h3 className="font-['Lato'] font-bold text-lg text-[#222222] group-hover:text-[#048287] transition-colors mb-1.5 uppercase">
                {featured.title}
              </h3>
              <div className="text-[12px] text-[#888888] mb-2.5 flex items-center gap-1.5">
                <span>by</span>
                <span className="text-[#048287] font-medium">{featured.author}</span>
                <span className="text-gray-400">/</span>
                <span>{featured.date}</span>
              </div>
              <p className="font-['Lato'] text-[13px] text-[#666666] leading-relaxed line-clamp-3">
                {featured.excerpt}
              </p>
            </div>
          </article>

          {/* Right: 2 Stacked Posts */}
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group cursor-pointer grid grid-cols-1 sm:grid-cols-12 gap-4 items-center border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
              >
                <div className="sm:col-span-5 relative overflow-hidden bg-gray-100 aspect-[16/11]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Date Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-[#048287] text-white px-2 py-0.5 text-center font-['Bebas_Neue'] shadow-sm">
                    <span className="block text-base leading-none">{post.day}</span>
                    <span className="block text-[10px] uppercase tracking-wider leading-none font-sans">
                      {post.month}
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-7 flex flex-col text-left">
                  <h4 className="font-['Lato'] font-bold text-[15px] text-[#222222] group-hover:text-[#048287] transition-colors mb-1.5 uppercase">
                    {post.title}
                  </h4>
                  <div className="text-[12px] text-[#888888] mb-2 flex items-center gap-1.5">
                    <span>by</span>
                    <span className="text-[#048287] font-medium">{post.author}</span>
                    <span className="text-gray-400">/</span>
                    <span>{post.date}</span>
                  </div>
                  <p className="font-['Lato'] text-[13px] text-[#666666] leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
