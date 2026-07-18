'use client';

import React, { useRef } from 'react';
import { Award, Flag, Flame, Target } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animations';

const TIMELINE_EVENTS = [
  {
    year: "2011",
    tagline: "The Foundation",
    title: "Small Scale Stitching Setup",
    description: "Al Badar Impex started as a small apparel manufacturing operation in Sialkot, Pakistan, focused on delivering high-quality, reliable sportswear and activewear solutions.",
    icon: Flag
  },
  {
    year: "2015",
    tagline: "Product Expansion",
    title: "Broadening the Apparel Lines",
    description: "Expanded our production capabilities to manufacture Swimwear, Teamwear, and custom activewear lines, securing our first direct international buyers.",
    icon: Flame
  },
  {
    year: "2019",
    tagline: "Tech Integration",
    title: "Modern Embellishment Hub",
    description: "Integrated automated Tajima embroidery machines and premium dye sublimation technology to offer high-speed, edge-to-edge printing in-house.",
    icon: Award
  },
  {
    year: "2024",
    tagline: "Global Sourcing",
    title: "End-to-End Private Labeling",
    description: "Serving leading global activewear and streetwear brands with custom tagging, barcode mapping, and streamlined door-to-door worldwide shipping.",
    icon: Target
  }
];

function TimelineCard({ event, idx }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = idx % 2 === 0;
  const Icon = event.icon;

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-8 relative w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 60 : -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="w-full md:w-1/2 flex justify-end"
      >
        <div className="w-full max-w-lg bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-500 border border-neutral-100 hover:-translate-y-1 group relative text-left overflow-hidden">

          {/* Animated top accent bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            style={{ transformOrigin: 'left' }}
            className="absolute top-0 left-0 right-0 h-1 bg-black rounded-t-lg"
          />

          <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-400 block mb-1">
            {event.tagline}
          </span>
          <h3 className="text-base font-black text-black uppercase tracking-wider mb-3">
            {event.title}
          </h3>
          <p className="text-neutral-500 text-xs sm:text-sm font-light leading-relaxed mb-6">
            {event.description}
          </p>

          <div className="flex items-center gap-2 text-neutral-400 pt-4 border-t border-neutral-50">
            <Icon className="h-4 w-4" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Milestone Verified</span>
          </div>
        </div>
      </motion.div>

      {/* Center dot on vertical line */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.35, ease: "backOut", delay: 0.25 }}
        className="absolute left-1/2 -translate-x-[10px] top-8 h-5 w-5 rounded-full border-2 border-neutral-900 bg-white items-center justify-center hidden md:flex z-20 shadow-sm"
      >
        <div className="h-2 w-2 rounded-full bg-black" />
      </motion.div>

      {/* Year watermark block */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`w-full md:w-1/2 flex items-center ${isEven ? 'justify-start md:pl-12' : 'justify-end md:pr-12'}`}
      >
        <div className="text-left select-none pointer-events-none">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-6xl sm:text-8xl font-black text-neutral-150 tracking-tighter block leading-none font-sans"
          >
            {event.year}
          </motion.span>
          <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-400 block mt-2">
            Chronological Era
          </span>
        </div>
      </motion.div>

    </div>
  );
}

export default function History() {
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true });

  return (
    <section className="py-24 bg-[#f9fafb] text-black border-b border-neutral-200 relative overflow-hidden">

      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neutral-200/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

        {/* Section Title */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
              Our Journey Over Time
            </span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
              OUR FACTORY EVOLUTION
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <div className="h-0.5 w-12 bg-black mx-auto mt-4" />
          </AnimatedSection>
        </div>

        {/* Timeline track */}
        <div ref={lineRef} className="max-w-5xl mx-auto relative">

          {/* Animated growing vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={lineInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-neutral-200 hidden md:block"
          />

          <div className="space-y-16">
            {TIMELINE_EVENTS.map((event, idx) => (
              <TimelineCard key={idx} event={event} idx={idx} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
