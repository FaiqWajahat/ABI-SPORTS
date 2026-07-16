'use client';

import React from 'react';

// List of B2B client brand placeholders
// You can easily replace these text elements with <Image> or <img> tags once you have the logo image assets ready.
const BRANDS = [
  { id: 1, name: 'Nike' },
  { id: 2, name: 'Adidas' },
  { id: 3, name: 'Puma' },
  { id: 4, name: 'Under Armour' },
  { id: 5, name: 'Gymshark' },
  { id: 6, name: 'Reebok' },
  { id: 7, name: 'Asics' },
  { id: 8, name: 'New Balance' },
  { id: 9, name: 'Champion' }
];

export default function Marquee() {
  return (
    <section className="py-6 sm:py-8 bg-white border-b border-neutral-200 overflow-hidden relative select-none">
      
      {/* Soft gradient fade overlays on left and right for premium look */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <div className="flex overflow-hidden w-full">
        {/* Infinite Marquee Track (Duplicates content to enable seamless looping) */}
        <div className="animate-marquee flex items-center space-x-12 sm:space-x-16 pr-12 sm:pr-16">
          
          {/* First loop of brands */}
          {BRANDS.map((brand) => (
            <div 
              key={`loop1-${brand.id}`} 
              className="flex-shrink-0 flex items-center justify-center grayscale opacity-45 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              {/* NOTE: To use image files later, replace this span with: 
                  <img src={`/logos/${brand.name.toLowerCase()}.png`} alt={brand.name} className="h-8 w-auto object-contain" />
              */}
              <span className="text-[13px] font-black tracking-[0.22em] text-neutral-800 uppercase font-sans">
                {brand.name}
              </span>
            </div>
          ))}

          {/* Second loop of brands (identical copy for seamless reset) */}
          {BRANDS.map((brand) => (
            <div 
              key={`loop2-${brand.id}`} 
              className="flex-shrink-0 flex items-center justify-center grayscale opacity-45 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              {/* NOTE: To use image files later, replace this span with: 
                  <img src={`/logos/${brand.name.toLowerCase()}.png`} alt={brand.name} className="h-8 w-auto object-contain" />
              */}
              <span className="text-[13px] font-black tracking-[0.22em] text-neutral-800 uppercase font-sans">
                {brand.name}
              </span>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
