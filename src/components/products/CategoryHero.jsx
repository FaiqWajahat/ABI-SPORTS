'use client';

import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animations';

// =========================================================================
// CONFIGURE YOUR CATEGORIES HERO BG IMAGES, SHOWCASE CARDS AND TEXTS HERE
// =========================================================================
const HERO_CONFIGS = {
  'active-wear': {
    bgImage: '/active-wear-bg.jpeg', // Background image overlay
    img1: '/active-wear.png',      // Tall showcase card image
    img2: '/hero.png',             // Top right card image
    img3: '/active.png',           // Bottom right card image
    label1: 'Performance',
    label2: 'Activewear Fit',
    label3: 'Athleisure',
    label4: 'Stitching',
    pillars: [
      "4-Way Stretch Lycra",
      "Moisture-Wicking Tech",
      "Ergonomic Flatlock Seams"
    ]
  },
  'team-wear': {
    bgImage: '/about-hero-bg.png', // Background image overlay
    img1: '/team-wear.png',        // Tall showcase card image
    img2: '/hero-02.png',          // Top right card image
    img3: '/production-hero-02.png',// Bottom right card image
    label1: 'Club Kits',
    label2: 'Teamwear Match',
    label3: 'Sublimation',
    label4: 'Embroidery',
    pillars: [
      "Custom Sublimated Kits",
      "Official Team Graphics",
      "League Standard Durability"
    ]
  }
};

export default function CategoryHero({ activeCategoryKey, categoryData }) {
  // Get config or default to active-wear parameters
  const config = HERO_CONFIGS[activeCategoryKey] || HERO_CONFIGS['active-wear'];

  return (
    <div className="relative overflow-hidden bg-white border border-neutral-200 rounded-2xl mb-16 p-8 sm:p-12">
      {/* Background image watermark overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        <Image
          src={config.bgImage}
          alt="Background Pattern"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.6] filter "
        />
      </div>

      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <AnimatedSection direction="up" delay={0.05}>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white block font-mono">
                Manufacturing Divisions
              </span>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-none font-sans">
                {categoryData?.title}
              </h1>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.15}>
              <div className="h-0.5 w-12 bg-white mt-2 mb-4" />
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-sm sm:text-[15px] text-white  leading-relaxed max-w-xl">
                {categoryData?.description}
              </p>
            </AnimatedSection>

            {/* Dynamic Sourcing/Manufacturing Pillars */}
            <StaggerContainer delay={0.25} className="flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-neutral-200">
              {config.pillars.map((item, i) => (
                <StaggerItem key={i} className="flex items-center space-x-2">
                  <span className="flex-shrink-0 flex items-center justify-center h-4.5 w-4.5 rounded-full border border-black/35">
                    <Check className="h-2.5 w-2.5 text-white" />
                  </span>
                  <span className="text-[11px] font-bold text-white tracking-tight">{item}</span>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Right Column: 3-Card image showcase */}
        

        </div>
      </div>
    </div>
  );
}
