'use client';

import React, { useState } from 'react';
import { Leaf, Droplet, Sun, Recycle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animations';

const INITIATIVES = [
  {
    id: "01",
    title: "Recycled Activewear Fabrics",
    icon: Recycle,
    tagline: "Eco-Activewear Yarn",
    description: "Offering premium performance polyester options woven from recycled plastic bottles, drastically decreasing carbon output per manufacturing batch."
  },
  {
    id: "02",
    title: "GOTS Organic Raw Cotton",
    icon: Leaf,
    tagline: "Certified Organic Sourcing",
    description: "Sourcing 100% raw organic cotton certified by the Global Organic Textile Standard. Absolutely zero harsh chemical pesticides or toxic fertilizers."
  },
  {
    id: "03",
    title: "Water Filtration Recycling Loop",
    icon: Droplet,
    tagline: "Resource Efficiency",
    description: "Equipped with dedicated wastewater filtration systems inside our dye plants, enabling water purification and filtering before standard loop discharge."
  },
  {
    id: "04",
    title: "Non-Toxic Italian Sublimation Dyes",
    icon: Sun,
    tagline: "Chemical Safety",
    description: "Exclusively running non-toxic, allergen-free Italian sublimation inks and fabric dyes that are certified skin-friendly for professional athletes."
  }
];

export default function Sustainability() {
  const [hoveredIdx, setHoveredIdx] = useState(0);

  return (
    <section className="py-24 bg-[#f9fafb] text-black border-b border-neutral-200 relative overflow-hidden">
      
      {/* Background soft ambient details */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-neutral-100 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
              Environmental Responsibility
            </span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
              SUSTAINABILITY COMMITMENT
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <div className="h-0.5 w-12 bg-black mx-auto mt-4"></div>
          </AnimatedSection>
        </div>

        {/* Asymmetrical split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start max-w-6xl mx-auto">
          
          {/* LEFT COLUMN: Large statement card */}
          <div className="lg:col-span-5 text-left lg:sticky lg:top-24 space-y-8">
            <div className="bg-white rounded-lg p-8 border border-neutral-150 shadow-md space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-black" />
              
              <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-400 block">
                Ecological Pledge
              </span>
              <h3 className="text-xl font-black text-black uppercase tracking-tight leading-tight">
                0% HARSH TOXINS.<br />
                100% RESPONSIBLE.
              </h3>
              <p className="text-neutral-500 text-xs font-light leading-relaxed">
                We believe in manufacturing with a clean conscience. By partnering with standard global bodies, we make sure our activewear options limit raw textile waste.
              </p>
              
              <div className="border-t border-neutral-100 pt-4 flex items-center gap-2 text-neutral-450">
                <HelpCircle className="h-4 w-4" />
                <span className="text-[9px] font-extrabold uppercase tracking-widest">OEKO-TEX / GOTS Audited</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Vertical list of initiatives */}
          <div className="lg:col-span-7 divide-y divide-neutral-200/80 w-full">
            {INITIATIVES.map((item, idx) => {
              const Icon = item.icon;
              const isHovered = hoveredIdx === idx;
              return (
                <div 
                  key={idx}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className="py-6 text-left transition-all duration-300 relative group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-4">
                      {/* Icon with smooth background transition */}
                      <div className={`h-9 w-9 rounded-lg border flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300
                        ${isHovered ? 'bg-black border-black text-white' : 'bg-white border-neutral-200 text-neutral-400 group-hover:text-black'}`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      
                      <div className="space-y-2">
                        <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-450 block">
                          {item.tagline}
                        </span>
                        <h4 className="text-sm font-black text-black uppercase tracking-wide group-hover:text-neutral-700 transition-colors">
                          {item.title}
                        </h4>
                        
                        {/* Smooth expanding description */}
                        <div className={`transition-all duration-300 overflow-hidden ${isHovered ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                          <p className="text-neutral-500 text-xs font-light leading-relaxed pt-1.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <span className="text-lg font-black text-neutral-300 font-sans tracking-widest leading-none pt-2">
                      {item.id}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
