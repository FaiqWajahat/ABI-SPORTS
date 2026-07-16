'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Leaf, Cpu, Globe2, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animations';

const VISION_TABS = [
  {
    id: 'eco',
    index: '01',
    icon: Leaf,
    tagline: "Zero-Impact Manufacturing",
    title: "Eco-Friendly Operations",
    description: "We prioritize organic fabric blends and water-saving dye processes. By utilizing GOTS-certified organic cotton, recycled polyester, and water-based non-toxic inks, we keep B2B sportswear clean, compliant, and sustainable.",
    mainImage: "/active-wear.png",
    insetImage: "/team-wear.png"
  },
  {
    id: 'tech',
    index: '02',
    icon: Cpu,
    tagline: "Advanced CAD & CLO3D Layouts",
    title: "Technological Precision",
    description: "Our digital design desk builds 3D mockups to check fit and drape before cutting a single yard of fabric. Connected to automatic laser cutters, this eliminates dimension errors and reduces textile waste by 18%.",
    mainImage: "/team-wear.png",
    insetImage: "/active-wear.png"
  },
  {
    id: 'brands',
    index: '03',
    icon: Globe2,
    tagline: "Flexible B2B Custom Solutions",
    title: "Empowering Global Brands",
    description: "We bridge the gap between startup private labels and large scale factories. By offering 50-unit flexible MOQs, fast 10-day sampling turnaround, and compliant FBA global logistics, we build long-term B2B partnerships.",
    mainImage: "/active-wear.png",
    insetImage: "/team-wear.png"
  }
];

export default function Vision() {
  const [activeTabId, setActiveTabId] = useState('eco');
  const activeTab = VISION_TABS.find((t) => t.id === activeTabId);

  return (
    <section className="py-24 bg-white text-black border-b border-neutral-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
              Future of Sportswear
            </span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
              OUR VISION & VALUES
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <div className="h-0.5 w-12 bg-black mx-auto mt-4"></div>
          </AnimatedSection>
        </div>

        {/* 2-Column Interactive Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Selector List (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4 text-left">
            {VISION_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`w-full text-left bg-transparent rounded-lg p-6 flex items-start space-x-5 transition-all duration-300 relative select-none cursor-pointer border-none outline-none ${
                    isActive 
                      ? 'bg-[#fcfcfc] shadow-sm' 
                      : 'hover:bg-neutral-50/50'
                  }`}
                >
                  
                  {/* Vertical sliding indicator line on active tab */}
                  {isActive && (
                    <motion.div
                      layoutId="activeVisionBar"
                      className="absolute left-0 top-6 bottom-6 w-[3px] bg-black rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Icon Badge */}
                  <div className={`h-10 w-10 rounded-lg border flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    isActive 
                      ? 'bg-black border-black text-white shadow-sm' 
                      : 'bg-white border-neutral-200 text-neutral-500 group-hover:text-black'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Text Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400">
                        {tab.tagline}
                      </span>
                      <span className="text-[10px] font-black text-neutral-300 font-sans ml-2">
                        {tab.index}
                      </span>
                    </div>
                    
                    <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-2">
                      {tab.title}
                    </h3>

                    {/* Expandable description block */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: isActive ? "auto" : 0, 
                        opacity: isActive ? 1 : 0,
                        marginTop: isActive ? 8 : 0 
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-neutral-500 text-[11px] leading-relaxed font-light">
                        {tab.description}
                      </p>
                    </motion.div>
                  </div>

                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Layered Collage Frame (lg:col-span-7) */}
          <div className="lg:col-span-7 relative group flex justify-center lg:justify-end">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTabId}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="relative w-full max-w-[580px]"
              >
                
                {/* Main Background Image */}
                <div className="relative aspect-[16/11.5] w-full rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50 shadow-sm">
                  <Image
                    src={activeTab.mainImage}
                    alt={activeTab.title}
                    fill
                    sizes="(max-w-768px) 100vw, 40vw"
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-750"
                    priority
                  />
                </div>

                {/* Overlapping Offset InsetImage (Aspect-square with deep shadow) */}
                <div className="absolute -bottom-8 -left-4 sm:left-0 lg:-left-8 w-[42%] aspect-square rounded-lg overflow-hidden border-4 border-white bg-neutral-100 shadow-xl group-hover:translate-y-1 transition-transform duration-500 hidden sm:block">
                  <Image
                    src={activeTab.insetImage}
                    alt={`${activeTab.title} inset detail`}
                    fill
                    sizes="15vw"
                    className="object-cover object-center group-hover:scale-104 transition-transform duration-750"
                  />
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
