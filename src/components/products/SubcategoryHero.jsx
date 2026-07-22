'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowLeft, Check } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animations';

export default function SubcategoryHero({
  subcategoryData,
  setParams,
  heroVideoRef
}) {
  if (!subcategoryData) return null;

  // Fallbacks for the images
  const img1 = subcategoryData?.heroImage1 || subcategoryData?.image || '/active-wear.png';
  const img2 = subcategoryData?.heroImage2 || '/team-wear.png';
  const img3 = subcategoryData?.heroImage3 || '/hero.png';

  return (
    <section className="relative min-h-[60vh] flex items-center bg-white text-white  py-16 overflow-hidden border-b border-neutral-200">
      {/* Background overlay: Video or Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        {subcategoryData?.heroBgVideo ? (
          <video
            ref={heroVideoRef}
            src={subcategoryData.heroBgVideo}
            autoPlay
            loop
            muted
            playsInline
            className="object-cover absolute inset-0 w-full h-full opacity-[0.39] "
          />
        ) : (
          <Image
            src={subcategoryData?.heroBgImage || '/about-hero-bg.png'}
            alt="Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-[0.3] "
          />
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <AnimatedSection direction="up" delay={0.05}>
              <button
                onClick={() => setParams({ sub: null })}
                className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-widest text-white hover:text-white  border border-neutral-200 hover:border-black rounded-lg px-3.5 py-2 transition-all duration-300 cursor-pointer bg-black backdrop-blur-sm"
              >
                <ArrowLeft className="h-3 w-3" /> Back to Categories
              </button>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.1}>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-white block font-mono">
                Product Line Range
              </span>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.15}>
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white  leading-none">
                {subcategoryData?.heroHeading || subcategoryData?.title}
              </h1>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-sm text-white font-light leading-relaxed max-w-xl">
                {subcategoryData?.heroSubheading || subcategoryData?.description}
              </p>
            </AnimatedSection>

            {/* 3 standard active wear manufacturing pillars */}
            <StaggerContainer delay={0.25} className="flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-neutral-200">
              {[
                "OEM Custom Development",
                "ISO 9001 Approved Seams",
                "Worldwide DDP Logistics"
              ].map((item, i) => (
                <StaggerItem key={i} className="flex items-center space-x-2">
                  <span className="flex-shrink-0 flex items-center justify-center h-4.5 w-4.5 rounded-full border border-black/35">
                    <Check className="h-2.5 w-2.5 text-white " />
                  </span>
                  <span className="text-[11px] font-bold text-white tracking-tight">{item}</span>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Right Column: Visual Showcase images */}
          <div className="lg:col-span-5 w-full">
            <StaggerContainer delay={0.15} className="grid grid-cols-12 gap-4 items-stretch">
              {/* Tall left card */}
              <StaggerItem className="col-span-7 relative h-full rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group shadow-sm hover:-translate-y-1.5 hover:shadow-md transition-all duration-500 min-h-[280px]">
                <Image
                  src={img1}
                  alt="Showcase 1"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-center group-hover:scale-104 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 text-left">
                  <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">Premium Kit</p>
                  <p className="text-xs font-black text-white uppercase tracking-wider mt-0.5">Custom Tailored</p>
                </div>
              </StaggerItem>

              {/* 2 stacked cards on right */}
              <div className="col-span-5 flex flex-col gap-4 h-full">
                <StaggerItem className="relative flex-1 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group shadow-sm min-h-[132px] hover:-translate-y-1 hover:shadow-md transition-all duration-500">
                  <Image
                    src={img2}
                    alt="Showcase 2"
                    fill
                    sizes="15vw"
                    className="object-cover object-center group-hover:scale-104 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-left">
                    <p className="text-[9px] font-black text-white uppercase tracking-wider">Fabric Tech</p>
                  </div>
                </StaggerItem>

                <StaggerItem className="relative flex-1 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group shadow-sm min-h-[132px] hover:-translate-y-1 hover:shadow-md transition-all duration-500">
                  <Image
                    src={img3}
                    alt="Showcase 3"
                    fill
                    sizes="15vw"
                    className="object-cover object-center group-hover:scale-104 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-left">
                    <p className="text-[9px] font-black text-white uppercase tracking-wider">Embroidery</p>
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
