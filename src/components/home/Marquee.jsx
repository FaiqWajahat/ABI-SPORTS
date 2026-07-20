'use client';

import React from 'react';

// A clean, simple array containing only the paths to your logo images
const LOGO_PATHS = [
  '/client-01.png',
  '/client-02.png',
  '/client-03.png',
  '/client-04.png',
  '/client-05.png',
  '/client-06.png',
  '/client-07.png',
  '/client-08.png',
  '/client-09.png',
];

export default function Marquee() {
  return (
    <section className="py-6 sm:py-8 bg-white border-b border-neutral-200 overflow-hidden relative select-none">
      
      {/* Soft gradient fade overlays on left and right for a premium, polished look */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <div className="flex overflow-hidden w-full">
        {/* Infinite Marquee Track */}
        <div className="animate-marquee flex items-center space-x-12 sm:space-x-16 pr-12 sm:pr-16">
          
          {/* First loop of logos */}
          {LOGO_PATHS.map((src, index) => (
            <div 
              key={`loop1-${index}`} 
              className="flex-shrink-0 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <img 
                src={src} 
                alt="Client logo" 
                className="h-8 w-auto object-contain" 
              />
            </div>
          ))}

          {/* Second loop of logos (identical copy for seamless continuous scrolling) */}
          {LOGO_PATHS.map((src, index) => (
            <div 
              key={`loop2-${index}`} 
              className="flex-shrink-0 flex items-center justify-center opacity-100 duration-300"
            >
              <img 
                src={src} 
                alt="Client logo" 
                className="h-14 w-auto object-contain" 
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}