'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animations';

const TESTIMONIALS = [
  {
    quote: "ABI Sports delivered 800 tournament kits with perfect sublimation in under 30 days. The flatlock seam quality and player name accuracy across all sizes was flawless. Three seasons in and we've never looked back.",
    shortQuote: "Perfect sublimation, flawless seam quality, 30-day delivery. Three seasons in.",
    name: 'Marcus Hoffmann',
    role: 'Kit Manager',
    company: 'Blaze United FC',
    country: 'Germany',
    rating: 5,
    initials: 'MH',
  },
  {
    quote: "We switched to ABI Sports for our private-label activewear line and the difference was immediate. GSM accuracy is spot-on every single order, and the Oeko-Tex certification satisfied our Scandinavian retail buyers without a second question.",
    shortQuote: "GSM accuracy spot-on every order. Oeko-Tex certification sealed the deal.",
    name: 'Lena Bergström',
    role: 'Head of Sourcing',
    company: 'Nordiq Athletic',
    country: 'Sweden',
    rating: 5,
    initials: 'LB',
  },
  {
    quote: "The 72-hour sample turnaround is real — not a marketing claim. I sent my tech pack Monday morning and had a physical sample in Dubai by Thursday. Perfect fit on first pass. Never experienced that level of speed with any other Sialkot manufacturer.",
    shortQuote: "Tech pack Monday. Physical sample in Dubai by Thursday. First-pass perfect fit.",
    name: 'Tariq Al-Rashidi',
    role: 'Founder',
    company: 'Apex Sport',
    country: 'UAE',
    rating: 5,
    initials: 'TA',
  },
  {
    quote: "Our compression cycling range requires very tight dimensional accuracy. ABI Sports nailed the silicone gripper placement and chamois pad spec on every unit across the run. The dedicated account manager made reordering seamless.",
    shortQuote: "Dimensional accuracy on every unit. Reordering is completely seamless.",
    name: 'Sophie Marchetti',
    role: 'Product Director',
    company: 'Velo Pro',
    country: 'Italy',
    rating: 5,
    initials: 'SM',
  },
];

function StarRow({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-black text-black" />
      ))}
    </div>
  );
}

export default function TestimonialsStrip() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const featured = TESTIMONIALS[active];

  return (
    <section className="py-24 bg-[#f9fafb] text-black border-b border-neutral-200 relative overflow-hidden">

      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6 max-w-6xl mx-auto">
          <div>
            <AnimatedSection direction="up" delay={0.05}>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
                Client Feedback
              </span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
                WHAT CLIENTS SAY
              </h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.14}>
              <div className="h-0.5 w-12 bg-black mt-4" />
            </AnimatedSection>
          </div>
          <AnimatedSection direction="up" delay={0.18}>
            <p className="text-neutral-500 text-sm font-light leading-relaxed max-w-sm">
              Trusted by professional clubs, private labels, and performance brands across 60+ countries.
            </p>
          </AnimatedSection>
        </div>

        {/* ── Main layout: featured left + sidebar right ── */}
        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">

          {/* ── FEATURED testimonial (left, 7 cols) ── */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-black text-white rounded-lg overflow-hidden h-full min-h-[340px] flex flex-col p-8 sm:p-10 shadow-lg"
              >
                {/* Giant quote mark watermark */}
                <div className="absolute top-4 right-6 opacity-[0.06] pointer-events-none select-none">
                  <Quote className="h-32 w-32 text-white" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: featured.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-white text-white" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-white text-sm sm:text-base font-light leading-relaxed flex-grow mb-8 relative z-10">
                  "{featured.quote}"
                </blockquote>

                {/* Author row */}
                <div className="flex items-center justify-between gap-4 pt-6 border-t border-neutral-800">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="h-10 w-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-black text-white">{featured.initials}</span>
                    </div>
                    <div>
                      <div className="text-xs font-black text-white uppercase tracking-wider">{featured.name}</div>
                      <div className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-500 mt-0.5">
                        {featured.role} · {featured.company}
                      </div>
                      <div className="text-[8px] font-bold text-neutral-600 mt-0.5 font-mono">{featured.country}</div>
                    </div>
                  </div>

                  {/* Navigation arrows */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                      className="h-8 w-8 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white hover:bg-neutral-700 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setActive((a) => (a + 1) % TESTIMONIALS.length)}
                      className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-black hover:bg-neutral-200 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Sidebar: compact testimonial cards (right, 5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {TESTIMONIALS.map((t, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActive(idx)}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: idx * 0.07 }}
                className={`text-left w-full rounded-lg border p-4 transition-all duration-300 cursor-pointer group ${
                  active === idx
                    ? 'bg-white border-black shadow-md -translate-x-0.5'
                    : 'bg-white border-neutral-200 hover:border-neutral-400 hover:shadow-sm'
                }`}
              >
                {/* Active left bar */}
                {active === idx && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-black rounded-l-lg" />
                )}

                <div className="flex items-start gap-3 relative">
                  {/* Avatar */}
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-black transition-all duration-300 ${
                    active === idx ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200'
                  }`}>
                    {t.initials}
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={`text-[10px] font-black uppercase tracking-wide truncate transition-colors duration-300 ${
                        active === idx ? 'text-black' : 'text-neutral-600'
                      }`}>
                        {t.name}
                      </span>
                      <StarRow count={t.rating} />
                    </div>
                    <p className="text-[9px] text-neutral-500 font-light leading-snug line-clamp-2">
                      {t.shortQuote}
                    </p>
                    <span className="text-[7.5px] font-extrabold uppercase tracking-widest text-neutral-400 mt-1.5 block font-mono">
                      {t.company} · {t.country}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}

            {/* Progress dots */}
            <div className="flex gap-1.5 pt-1 pl-1">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === active ? 'w-6 h-1.5 bg-black' : 'w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-500'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
