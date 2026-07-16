'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animations';

const HIGHLIGHTS = [
  'Allover sublimation across all 4 kit panels',
  'RFID player tracking badge integration',
  'Anti-slip silicone waistband on shorts',
  'Breathable flatlock seam construction',
  '72-hour rapid sample with courier delivery',
  'WRAP-certified ethical manufacturing',
];

const NUMBERS = [
  { val: '1,200', label: 'Units Produced' },
  { val: '28',    label: 'Days to Delivery' },
  { val: '4',     label: 'Kit Colourways' },
  { val: '100%',  label: 'QA Pass Rate' },
];

export default function FeaturedProject() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 bg-[#f9fafb] text-black border-b border-neutral-200 relative overflow-hidden">

      <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

        {/* Header */}
        <div className="max-w-6xl mx-auto mb-16">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">Featured Case Study</span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
              BLAZE UNITED FC —<br />TOURNAMENT KIT PROGRAM
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.14}>
            <div className="h-0.5 w-12 bg-black mt-4" />
          </AnimatedSection>
        </div>

        {/* Split layout */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-start">

          {/* LEFT: images */}
          <div className="lg:col-span-6 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-72 sm:h-80 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm"
            >
              <Image src="/active-wear.png" alt="Blaze United home kit" fill className="object-cover" sizes="50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-black" />
              <div className="absolute top-4 left-5 bg-white text-black text-[9px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-sm">
                Home Kit
              </div>
              <div className="absolute bottom-5 left-5">
                <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">2024 Tournament Edition</p>
                <p className="text-sm font-black text-white uppercase tracking-wider mt-0.5">Blaze United FC</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {['/team-wear.png', '/hero.png'].map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.12 + i * 0.08 }}
                  className="relative h-40 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <Image src={src} alt="Kit detail" fill className="object-cover" sizes="25vw" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: content */}
          <div className="lg:col-span-6 space-y-8">

            {/* Numbers grid */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-0 border border-neutral-200 rounded-lg overflow-hidden shadow-sm"
            >
              {NUMBERS.map((n, i) => (
                <div
                  key={i}
                  className={`p-6 bg-white hover:bg-[#f9fafb] transition-colors duration-300
                    ${i % 2 === 0 ? 'border-r border-neutral-200' : ''}
                    ${i < 2 ? 'border-b border-neutral-200' : ''}
                  `}
                >
                  <div className="text-2xl font-black text-black tracking-tight mb-1">{n.val}</div>
                  <div className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-400">{n.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Description + checklist */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="space-y-6"
            >
              <p className="text-neutral-600 text-sm font-light leading-relaxed">
                Blaze United commissioned ABI Sports for their 2024 European tournament program — a 1,200-unit run spanning home, away, third, and goalkeeper colourways with allover sublimation and RFID integration for stadium access.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-neutral-100">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400 block mb-3">Program Highlights</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {HIGHLIGHTS.map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-black flex-shrink-0" />
                      <span className="text-xs font-semibold text-neutral-700">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.28 }}
            >
              <Link href="/inquiry">
                <div className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-widest text-white bg-black hover:bg-neutral-800 rounded-lg px-5 py-3 transition-all duration-300 cursor-pointer">
                  Start a Similar Program
                  <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
