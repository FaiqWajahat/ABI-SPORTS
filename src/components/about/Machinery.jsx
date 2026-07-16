'use client';

import React from 'react';
import { Cpu, Scissors, ShieldAlert, Award } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animations';

const MACHINERY_ITEMS = [
  {
    id: "01",
    name: "Tajima Embroidery Systems",
    origin: "Japan",
    speed: "1,200 stitches/min",
    purpose: "High-density satin stitching of custom team logos, badges, and crests."
  },
  {
    id: "02",
    name: "Roll-to-Roll Dye Sublimation",
    origin: "Italy / Japan",
    speed: "250m / hour",
    purpose: "Locked-in thermal calendar transfer for vivid, fade-resistant color matching."
  },
  {
    id: "03",
    name: "Computerized CAD Cutters",
    origin: "Germany",
    speed: "99.9% precision",
    purpose: "Zero-variance fabric panel cutting based on digital tech pack coordinates."
  },
  {
    id: "04",
    name: "Yamato Flatlock Stitchers",
    origin: "Japan",
    speed: "6,000 stitches/min",
    purpose: "4-needle, 6-thread low-profile flat seams to eliminate chafing for athletes."
  }
];

export default function Machinery() {
  return (
    <section className="py-24 bg-black text-white border-b border-neutral-900 relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[300px] bg-neutral-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start max-w-7xl mx-auto">
          
          {/* Left Column: Title & Intro */}
          <div className="lg:col-span-5 text-left lg:sticky lg:top-28">
            <AnimatedSection direction="up" delay={0.05}>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
                Factory Infrastructure
              </span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase leading-tight">
                ADVANCED MACHINERY & PLANT SETUP
              </h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.15}>
              <div className="h-0.5 w-12 bg-white mt-6 mb-8"></div>
            </AnimatedSection>
            
            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-md">
                We equip our Sialkot factory with precision machinery sourced from German, Japanese, and Italian manufacturers. This high-end infrastructure allows us to achieve consistent quality, high daily throughput, and rapid sampling cycles.
              </p>
            </AnimatedSection>
          </div>

          {/* Right Column: Grid list */}
          <div className="lg:col-span-7 w-full">
            <StaggerContainer delay={0.15} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {MACHINERY_ITEMS.map((item) => (
                <StaggerItem
                  key={item.id}
                  className="bg-neutral-950 border border-neutral-900 rounded-lg p-6 sm:p-8 flex flex-col justify-between text-left hover:border-neutral-850 hover:bg-neutral-900/40 hover:-translate-y-1 transition-all duration-500 group relative"
                >
                  {/* Top indicator stripe */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-neutral-900 group-hover:bg-white transition-colors duration-500" />
                  
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-2xl font-black text-neutral-800 group-hover:text-white transition-colors duration-500">
                        {item.id}
                      </span>
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded">
                        Imported: {item.origin}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                      {item.name}
                    </h3>
                    <p className="text-neutral-450 text-[10.5px] leading-relaxed font-light mb-6">
                      {item.purpose}
                    </p>
                  </div>

                  <div className="border-t border-neutral-900 pt-4 mt-auto">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-450 font-mono">
                      Rating: {item.speed}
                    </span>
                  </div>

                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

        </div>

      </div>
    </section>
  );
}
