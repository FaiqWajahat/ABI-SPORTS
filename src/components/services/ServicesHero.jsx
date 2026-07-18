'use client';

import React from 'react';
import Image from 'next/image';
import { Check, Compass, Layers, Milestone } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animations';

export default function ServicesHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-white text-black py-12 sm:py-16 overflow-hidden border-b border-neutral-200">
      
      {/* Background image watermark overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-white">
        <Image
          src="/services-hero-bg.png"
          alt="Services Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.18] filter grayscale"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">

          {/* Left Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <AnimatedSection direction="up" delay={0.1}>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-neutral-400 block mb-2 font-mono">
                B2B Sourcing & Production
              </span>
              <h1 className="text-5xl sm:text-7xl lg:text-[4rem] font-black tracking-tighter text-black uppercase leading-[1.02] font-sans">
                TAILORED<br />
                SERVICES.<br />
                BUILT TO SCALE.
              </h1>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-sm sm:text-[15px] text-neutral-600 font-light leading-relaxed max-w-lg">
                From high-performance textile development and CAD pattern modeling to Italian dye-sublimation and verified export logistics — we provide complete manufacturing solutions for global activewear brands.
              </p>
            </AnimatedSection>

            {/* 3 pillars */}
            <StaggerContainer delay={0.25} className="flex flex-wrap gap-x-8 gap-y-4 pt-6 border-t border-neutral-200">
              {[
                "Custom Fabric Sourcing",
                "OEM/ODM Tech Pack Ready",
                "Frictionless Air Cargo Shipping"
              ].map((item, i) => (
                <StaggerItem key={i} className="flex items-center space-x-2">
                  <span className="flex-shrink-0 flex items-center justify-center h-4.5 w-4.5 rounded-full border border-black/35">
                    <Check className="h-2.5 w-2.5 text-black" />
                  </span>
                  <span className="text-[12px] font-semibold text-neutral-800 tracking-tight">{item}</span>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Right Column: Visual services grid cards */}
          <div className="lg:col-span-5 w-full">
            <StaggerContainer delay={0.15} className="grid grid-cols-12 gap-4 items-stretch">
              
              {/* Sourcing card (Tall Left) */}
              <StaggerItem className="col-span-7 relative h-full rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group shadow-sm hover:-translate-y-1.5 hover:shadow-md transition-all duration-500 min-h-[320px]">
                <Image
                  src="/eco-friendly-values.png"
                  alt="Custom Sourcing & Fabric Milling"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-center group-hover:scale-104 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                <div className="absolute top-4 left-4 bg-white text-black text-[9px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Compass className="h-3 w-3" /> Custom Milling
                </div>

                <div className="absolute bottom-6 left-6">
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Fabric Tech</p>
                  <p className="text-sm font-black text-white uppercase tracking-wider mt-0.5">Sourcing & Milling</p>
                </div>
              </StaggerItem>

              {/* Right: 2 stacked cards */}
              <div className="col-span-5 flex flex-col gap-4 h-full">
                
                {/* Sampling card */}
                <StaggerItem className="relative flex-1 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group shadow-sm min-h-[148px] hover:-translate-y-1 hover:shadow-md transition-all duration-500">
                  <Image
                    src="/compatibility-tech-pack.png"
                    alt="Sportswear Sampling"
                    fill
                    sizes="15vw"
                    className="object-cover object-center group-hover:scale-104 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-white text-black text-[8px] font-black tracking-wider uppercase px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Layers className="h-2.5 w-2.5" /> Pattern CAD
                  </div>

                  <div className="absolute bottom-3 left-4 text-left">
                    <p className="text-[9px] text-neutral-450 font-bold uppercase tracking-wider">Sampling</p>
                    <p className="text-xs font-black text-white uppercase tracking-wider mt-0.5">OEM Prototype</p>
                  </div>
                </StaggerItem>

                {/* Logistics card */}
                <StaggerItem className="relative flex-1 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group shadow-sm min-h-[148px] hover:-translate-y-1 hover:shadow-md transition-all duration-500">
                  <Image
                    src="/compatibility-logistics.png"
                    alt="Custom Warehousing & Shipping"
                    fill
                    sizes="15vw"
                    className="object-cover object-center group-hover:scale-104 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-white text-black text-[8px] font-black tracking-wider uppercase px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Milestone className="h-2.5 w-2.5" /> Logistics
                  </div>

                  <div className="absolute bottom-3 left-4 text-left">
                    <p className="text-[9px] text-neutral-450 font-bold uppercase tracking-wider">Shipping</p>
                    <p className="text-xs font-black text-white uppercase tracking-wider mt-0.5">DDP Dispatch</p>
                  </div>
                </StaggerItem>

              </div>
            </StaggerContainer>
          </div>

        </div>
      </div>
    </section>
  );
}
