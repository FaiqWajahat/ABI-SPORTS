'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animations';

const DIVISIONS = [
  {
    id: 1,
    division: "Division 01",
    title: "Active Wear",
    description: "Premium performance gym wear and lifestyle apparel manufactured factory-direct. Custom hoodies, tracksuits, compression leggings, joggers, and quick-dry athletic tees. Tailored for private labels with flexible 50-unit MOQs.",
    image: "/active-wear.png",
    link: "/products?category=active-wear"
  },
  {
    id: 2,
    division: "Division 02",
    title: "Team Wear",
    description: "Professional-grade club kits and teamwear uniforms. Custom cricket kits, sublimated soccer jerseys, basketball uniforms, and rugby jerseys printed with Italian ink. Engineered for durability, stretch, and moisture-wicking fit.",
    image: "/team-wear.png",
    link: "/products?category=team-wear"
  }
];

export default function Categories() {
  return (
    <section className="py-24 bg-black text-white border-b border-neutral-900 relative overflow-hidden">
      
      {/* Background ambient radial gradients to elevate look */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-neutral-900/30 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-neutral-900/30 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
              Our Product Divisions
            </span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
              MANUFACTURING DIVISIONS
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <div className="h-0.5 w-12 bg-white mx-auto mt-4"></div>
          </AnimatedSection>
        </div>

        {/* 2-Card Division Grid: 2 Columns, centered on page */}
        <StaggerContainer delay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {DIVISIONS.map((item) => (
            <StaggerItem 
              key={item.id} 
              className="relative aspect-[3/4] rounded-lg overflow-hidden group shadow-md hover:shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:-translate-y-2 transition-all duration-500 cursor-pointer border-none"
            >
              <Link href={item.link} className="absolute inset-0 block">
                
                {/* Natural Color Background Image (zooms on hover) */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-w-768px) 100vw, 40vw"
                  className="object-cover object-center group-hover:scale-104 transition-transform duration-700 z-0"
                />
                
                {/* Rich Gradient Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 group-hover:via-black/45 group-hover:to-black/15 transition-colors duration-500 z-10"></div>
                
                {/* Content Block overlay (aligned bottom-left) */}
                <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end z-20 text-left">
                  
                  {/* Division Tag */}
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400 mb-1.5 block">
                    {item.division}
                  </span>

                  {/* Category Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider mb-3 leading-tight">
                    {item.title}
                  </h3>

                  {/* Description details */}
                  <p className="text-neutral-350 text-[11px] leading-relaxed font-light mb-8 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>

                  {/* Explore Products action button link */}
                  <div className="flex items-center space-x-1.5 text-[9px] font-extrabold uppercase tracking-widest text-white pt-4 border-t border-white/10 w-full">
                    <span>Explore Catalog</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>

                </div>

              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
