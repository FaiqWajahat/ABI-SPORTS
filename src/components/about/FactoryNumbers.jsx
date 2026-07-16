'use client';

import React from 'react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animations';

const STATS = [
  { value: "5M+", label: "Garments Manufactured Annually" },
  { value: "42", label: "Years of Production Legacy" },
  { value: "650+", label: "Skilled Craftsmen Employed" },
  { value: "40+", label: "Countries Shipped Globally" },
  { value: "72h", label: "Sample Turnaround Target" },
  { value: "100%", label: "Vertically Integrated Facility" },
];

export default function FactoryNumbers() {
  return (
    <section className="py-24 bg-white text-black border-b border-neutral-200 relative overflow-hidden">

      {/* Background huge watermark text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[16vw] font-black text-neutral-50 uppercase tracking-tighter leading-none whitespace-nowrap">
          ABI SPORTS
        </span>
      </div>

      <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

        <div className="text-center mb-20 max-w-2xl mx-auto">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
              Operational Scale & Scope
            </span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
              OUR FACTORY BY NUMBERS
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <div className="h-0.5 w-12 bg-black mx-auto mt-4"></div>
          </AnimatedSection>
        </div>

        {/* 3×2 editorial counter grid */}
        <StaggerContainer delay={0.1} className="grid grid-cols-2 md:grid-cols-3 gap-0 border border-neutral-100 rounded-lg overflow-hidden max-w-5xl mx-auto shadow-sm">
          {STATS.map((stat, idx) => (
            <StaggerItem
              key={idx}
              className={`relative p-8 sm:p-10 text-left bg-white border-neutral-100 hover:bg-[#f9fafb] transition-colors duration-300 group
                ${idx % 3 !== 2 ? 'border-r' : ''}
                ${idx < 3 ? 'border-b' : ''}
              `}
            >
              {/* Animated top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-black transition-colors duration-500" />

              <div className="text-4xl sm:text-5xl font-black text-black tracking-tighter leading-none font-sans mb-3">
                {stat.value}
              </div>
              <div className="text-[9px] font-extrabold text-neutral-500 uppercase tracking-widest leading-tight max-w-[120px]">
                {stat.label}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
