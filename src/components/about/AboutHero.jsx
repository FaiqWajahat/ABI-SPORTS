'use client';

import React from 'react';
import Image from 'next/image';
import { Check, ShieldCheck } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animations';

export default function AboutHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-white text-black py-8 sm:py-12 overflow-hidden border-b border-neutral-200">
      
      {/* Background image watermark overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-white">
        <Image
          src="/about-hero-bg.png"
          alt="About Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.2] filter grayscale"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">

          {/* Left Column */}
          <div className="lg:col-span-7 space-y-8 text-left">

            <AnimatedSection direction="up" delay={0.1}>
              <h1 className="text-5xl sm:text-7xl lg:text-[4rem] font-black tracking-tighter text-black uppercase leading-[1.02] font-sans">
                AL BADAR IMPEX.<br />
                PREMIUM APPAREL.<br />
                SINCE 2011.
              </h1>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-sm sm:text-[15px] text-neutral-600 font-light leading-relaxed max-w-lg">
                Al Badar Impex is a leading custom apparel manufacturer specializing in premium-quality Activewear, Swimwear, Teamwear, and Streetwear. We provide end-to-end manufacturing solutions, from design and fabric sourcing to printing, embroidery, and worldwide delivery.
              </p>
            </AnimatedSection>

            {/* 3 pillars */}
            <StaggerContainer delay={0.25} className="flex flex-wrap gap-x-8 gap-y-4 pt-6 border-t border-neutral-200">
              {[
                "15+ Years of Sourcing",
                "OEM & Private Label Support",
                "Global Sourcing Markets"
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

          {/* Right Column: Trimmed 2-card grid (vs 5 on homepage) */}
          <div className="lg:col-span-5 w-full">
            <StaggerContainer delay={0.15} className="grid grid-cols-12 gap-4 items-stretch">

              {/* 1. Tall left card */}
              <StaggerItem className="col-span-7 relative h-full rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group shadow-sm hover:-translate-y-1.5 hover:shadow-md transition-all duration-500 min-h-[320px]">
                <Image
                  src="/about-hero-01.png"
                  alt="ABI Sports Sialkot Factory Floor"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-center group-hover:scale-104 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                <div className="absolute top-4 left-4 bg-white text-black text-[9px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  Est. 2011
                </div>

                <div className="absolute bottom-6 left-6">
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Sialkot Factory</p>
                  <p className="text-sm font-black text-white uppercase tracking-wider mt-0.5">Main Assembly</p>
                </div>
              </StaggerItem>

              {/* Right: 2 stacked cards */}
              <div className="col-span-5 flex flex-col gap-4 h-full">

                <StaggerItem className="relative flex-1 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group shadow-sm min-h-[148px] hover:-translate-y-1 hover:shadow-md transition-all duration-500">
                  <Image
                    src="/about-hero-02.png"
                    alt="Sublimation printing press"
                    fill
                    sizes="15vw"
                    className="object-cover object-center group-hover:scale-104 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <p className="text-[10px] font-black text-white uppercase tracking-wider">Sublimation</p>
                  </div>
                </StaggerItem>

                <StaggerItem className="relative flex-1 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group shadow-sm min-h-[148px] hover:-translate-y-1 hover:shadow-md transition-all duration-500">
                  <Image
                    src="/about-hero-03.png"
                    alt="Flatlock sewing machines"
                    fill
                    sizes="15vw"
                    className="object-cover object-center group-hover:scale-104 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* WRAP badge on this card */}
                  <div className="absolute inset-0 flex items-end p-3">
                    <p className="text-[10px] font-black text-white uppercase tracking-wider">Stitching</p>
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
