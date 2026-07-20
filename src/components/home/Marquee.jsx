'use client';

import React from 'react';

const LOGO_PATHS = [
  '/client-01.png',
  '/client-02.png',
  '/client-03.png',
  '/client-04.png',
  '/client-05.png',
  '/client-06.png',
  '/client-07.png',
  '/client-08.png',
  '/client-09.jpeg',
  '/client-10.png',
];

export default function Marquee() {
  return (
    <section className="py-6 sm:py-8 bg-white border-b border-neutral-200 overflow-hidden relative select-none">
      
      {/* Soft gradient fade overlays */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <div className="flex overflow-hidden w-full">
        {/* Infinite Marquee Track */}
        <div className="animate-marquee flex items-center space-x-8 sm:space-x-12 pr-8 sm:pr-12">
          
          {/* First loop of logos */}
          {LOGO_PATHS.map((src, index) => (
            <div 
              key={`loop1-${index}`} 
              // THE FIX: A fixed bounding box (w-28 sm:w-36 and h-12 sm:h-16) guarantees spacing is perfectly identical
              className="flex-shrink-0 flex items-center justify-center w-28 sm:w-36 h-12 sm:h-16 opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <img 
                src={src} 
                alt="Client logo" 
                // THE FIX: max-w-full and max-h-full ensure the image never breaks out of the box, object-contain prevents stretching
                className="max-w-full max-h-full object-contain" 
              />
            </div>
          ))}

          {/* Second loop of logos */}
          {LOGO_PATHS.map((src, index) => (
            <div 
              key={`loop2-${index}`} 
              className="flex-shrink-0 flex items-center justify-center w-28 sm:w-36 h-12 sm:h-16 opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <img 
                src={src} 
                alt="Client logo" 
                className="max-w-full max-h-full object-contain" 
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}