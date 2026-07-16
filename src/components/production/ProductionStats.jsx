'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animations';

const STATS = [
  { value: "5M+", label: "Garments Manufactured Annually" },
  { value: "72hr", label: "Sample Turnaround Target" },
  { value: "650+", label: "Skilled Machine Operators" },
  { value: "<0.1%", label: "Production Defect Rate" },
  { value: "40+", label: "Technical Fabrics Sourced" },
  { value: "100%", label: "Vertical Integration" },
];

function StatCell({ stat, idx, total }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const isNotLastCol = (idx + 1) % 3 !== 0;
  const isTopRow = idx < 3;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
      data-cursor="expand"
      className={`relative p-8 sm:p-10 text-left bg-white border-neutral-100 hover:bg-[#f9fafb] transition-colors duration-300 group
        ${isNotLastCol ? 'border-r' : ''}
        ${isTopRow ? 'border-b' : ''}
      `}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-black transition-colors duration-500" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: 'backOut', delay: idx * 0.08 + 0.15 }}
        className="text-4xl sm:text-5xl font-black text-black tracking-tighter leading-none font-sans mb-3"
      >
        {stat.value}
      </motion.div>
      <div className="text-[9px] font-extrabold text-neutral-500 uppercase tracking-widest leading-tight max-w-[140px]">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function ProductionStats() {
  return (
    <section className="py-24 bg-white text-black border-b border-neutral-200 relative overflow-hidden">

      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[14vw] font-black text-neutral-50 uppercase tracking-tighter leading-none whitespace-nowrap">
          PRECISION
        </span>
      </div>

      <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

        <div className="text-center mb-20 max-w-2xl mx-auto">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
              Operational Scale & Output
            </span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
              PRODUCTION BY NUMBERS
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <div className="h-0.5 w-12 bg-black mx-auto mt-4" />
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border border-neutral-100 rounded-lg overflow-hidden max-w-5xl mx-auto shadow-sm">
          {STATS.map((stat, idx) => (
            <StatCell key={idx} stat={stat} idx={idx} total={STATS.length} />
          ))}
        </div>

      </div>
    </section>
  );
}
