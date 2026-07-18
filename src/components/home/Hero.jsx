'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animations';

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // Force muted properties programmatically to bypass React hydration issues
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Autoplay failed or was blocked by browser:', err);
        });
      }
    }
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center bg-white text-black py-8 sm:py-12 overflow-hidden border-b border-neutral-200">
      
      {/* Background video overlay (Pixabay loop for sewing machine factory) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-white">
        <video
          ref={videoRef}
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover opacity-[0.14] pointer-events-none"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Left Column: Wording & Pillars */}
          <div className="lg:col-span-7 space-y-8 text-left">


            <AnimatedSection direction="up" delay={0.12}>
              <h1 className="text-5xl sm:text-7xl lg:text-[4rem] font-black tracking-tighter text-black uppercase leading-[1.02] font-sans">
                ENGINEERED<br />
                FOR ATHLETES.<br />
                BUILT FOR BRANDS.
              </h1>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-sm sm:text-[15px] text-neutral-600 font-light leading-relaxed max-w-xl">
                From advanced fabric R&D to retail-ready cartons. Partner with a vertically integrated manufacturer trusted by global activewear labels and professional sports teams.
              </p>
            </AnimatedSection>

            {/* Limton-style Horizontal Pillars Row */}
            <StaggerContainer delay={0.25} className="flex flex-wrap gap-x-8 gap-y-4 pt-6 border-t border-neutral-200">
              <StaggerItem className="flex items-center space-x-2">
                <span className="flex-shrink-0 flex items-center justify-center h-4.5 w-4.5 rounded-full border border-black/35">
                  <Check className="h-2.5 w-2.5 text-black" />
                </span>
                <span className="text-[12px] font-semibold text-neutral-800 tracking-tight">50-Unit Flexible MOQs</span>
              </StaggerItem>

              <StaggerItem className="flex items-center space-x-2">
                <span className="flex-shrink-0 flex items-center justify-center h-4.5 w-4.5 rounded-full border border-black/35">
                  <Check className="h-2.5 w-2.5 text-black" />
                </span>
                <span className="text-[12px] font-semibold text-neutral-800 tracking-tight">Technical Fabric R&D</span>
              </StaggerItem>

              <StaggerItem className="flex items-center space-x-2">
                <span className="flex-shrink-0 flex items-center justify-center h-4.5 w-4.5 rounded-full border border-black/35">
                  <Check className="h-2.5 w-2.5 text-black" />
                </span>
                <span className="text-[12px] font-semibold text-neutral-800 tracking-tight">Doorstep USA & EU Delivery</span>
              </StaggerItem>

             
            </StaggerContainer>

            {/* Action Buttons Row */}
            <AnimatedSection direction="up" delay={0.4} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/inquiry" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-black hover:bg-neutral-900 text-white font-extrabold text-xs tracking-wider uppercase py-6 px-9 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors">
                  Start Your Program <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/inquiry" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-white hover:bg-neutral-100 text-black font-extrabold text-xs tracking-wider uppercase py-6 px-9 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all duration-300">
                  Schedule Strategy Call <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </AnimatedSection>
          </div>

          {/* Right Column: Exact Limton 5-Card Rounded Grid */}
          <div className="lg:col-span-5 w-full">
            <StaggerContainer delay={0.15} className="grid grid-cols-12 gap-4 items-stretch">
              
              {/* 1. Tall Left Card (NHL hockey shoe close-up) */}
              <StaggerItem className="col-span-7 relative h-full rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group shadow-sm hover:-translate-y-1.5 hover:shadow-md hover:border-neutral-350 transition-all duration-500 min-h-[368px]">
                <Image
                  src="/hero-01.png"
                  alt="Fully Custom apparel details close-up"
                  fill
                  sizes="(max-w-768px) 100vw, 25vw"
                  className="object-cover object-center group-hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"></div>
                
                {/* Badge overlay at top-left */}
                <div className="absolute top-4 left-4 bg-white hover:bg-neutral-100 text-black text-[9px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  Our Facility <ArrowRight className="h-2.5 w-2.5" />
                </div>
                
                {/* Title overlay at bottom-left */}
                <div className="absolute bottom-6 left-6">
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Manufacturing</p>
                  <p className="text-sm font-black text-white uppercase tracking-wider mt-0.5">Fully Custom</p>
                </div>
              </StaggerItem>

              {/* Right Column containing 3 smaller stacked cards */}
              <div className="col-span-5 flex flex-col gap-4 justify-between h-full">
                
                {/* 2. Embroidery Card */}
                <StaggerItem className="relative flex-1 aspect-square sm:aspect-auto rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group shadow-sm min-h-[112px] hover:-translate-y-1 hover:shadow-md hover:border-neutral-350 transition-all duration-500">
                  <Image
                    src="/hero-02.png"
                    alt="Embroidery machinery close-up"
                    fill
                    sizes="(max-w-768px) 100vw, 15vw"
                    className="object-cover object-center group-hover:scale-104 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4">
                    <p className="text-[10px] font-black text-white uppercase tracking-wider">Embroidery</p>
                  </div>
                </StaggerItem>

                {/* 3. Screen Printing Card */}
                <StaggerItem className="relative flex-1 aspect-square sm:aspect-auto rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group shadow-sm min-h-[112px] hover:-translate-y-1 hover:shadow-md hover:border-neutral-350 transition-all duration-500">
                  <Image
                    src="/hero-03.png"
                    alt="Screen Printing apparel machine"
                    fill
                    sizes="(max-w-768px) 100vw, 15vw"
                    className="object-cover object-center group-hover:scale-104 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4">
                    <p className="text-[10px] font-black text-white uppercase tracking-wider">Screen Printing</p>
                  </div>
                </StaggerItem>

                {/* 4. High Quality Equipment Card */}
                <StaggerItem className="relative flex-1 aspect-square sm:aspect-auto rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group shadow-sm min-h-[112px] hover:-translate-y-1 hover:shadow-md hover:border-neutral-350 transition-all duration-500">
                  <Image
                    src="/hero-04.png"
                    alt="Precision sewing machines"
                    fill
                    sizes="(max-w-768px) 100vw, 15vw"
                    className="object-cover object-center group-hover:scale-104 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4">
                    <p className="text-[10px] font-black text-white uppercase tracking-wider">High Quality Equipment</p>
                  </div>
                </StaggerItem>

              </div>

              {/* 5. Custom Labels Horizontal bottom card */}
              <StaggerItem className="col-span-12 relative aspect-[4.2/1] rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-neutral-350 transition-all duration-500">
                <Image
                  src="/hero-05.png"
                  alt="Custom woven clothing tags"
                  fill
                  sizes="(max-w-768px) 100vw, 40vw"
                  className="object-cover object-center group-hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <p className="text-[11px] font-black text-white uppercase tracking-widest">Custom Labels</p>
                </div>
              </StaggerItem>

            </StaggerContainer>
          </div>

        </div>
      </div>
    </section>
  );
}
