'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animations';

const MILESTONES = [
  { year: '2004', event: 'ABI Sports founded in Sialkot, Pakistan' },
  { year: '2009', event: 'First ISO 9001 quality certification obtained' },
  { year: '2013', event: 'Expanded to 650+ machine operators on floor' },
  { year: '2017', event: 'WRAP Platinum & SEDEX SMETA accreditation' },
  { year: '2021', event: 'Launched rPET sustainable fabric division' },
  { year: '2024', event: '5M+ garments produced annually, 60+ countries' },
];

const CERTIFICATIONS = [
  'WRAP Platinum Level',
  'SEDEX SMETA 4-Pillar',
  'GOTS Organic Certified',
  'ISO 9001:2015',
  'Oeko-Tex Standard 100',
  'Bluesign® Approved',
];

export default function CompanyProfile() {
  const ref = useRef(null);
  const timelineRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const timelineInView = useInView(timelineRef, { once: true, margin: '-60px' });

  return (
    <>
      {/* ── SECTION 1: Company story split ── */}
      <section className="py-24 bg-white text-black border-b border-neutral-200 relative overflow-hidden">

        <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12">
          <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-center">

            {/* LEFT: Image stack */}
            <div className="lg:col-span-5 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-72 sm:h-80 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm"
              >
                <Image src="/active-wear.png" alt="ABI Sports factory floor" fill className="object-cover" sizes="45vw" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-black" />
                <div className="absolute top-4 left-4 bg-white text-black text-[9px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-sm">
                  Est. 2004 · Sialkot
                </div>
                <div className="absolute bottom-5 left-5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Main Assembly Floor</p>
                  <p className="text-sm font-black text-white uppercase tracking-wider mt-0.5">ABI Sports Factory</p>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                {['/team-wear.png', '/hero.png'].map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.08 }}
                    className="relative h-36 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  >
                    <Image src={src} alt="ABI Sports production" fill className="object-cover" sizes="20vw" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT: Story content */}
            <div className="lg:col-span-7 space-y-8">

              <div>
                <AnimatedSection direction="up" delay={0.05}>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
                    About the Manufacturer
                  </span>
                </AnimatedSection>
                <AnimatedSection direction="up" delay={0.1}>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase leading-tight">
                    ABI SPORTS —<br />WHO WE ARE
                  </h2>
                </AnimatedSection>
                <AnimatedSection direction="up" delay={0.14}>
                  <div className="h-0.5 w-12 bg-black mt-4" />
                </AnimatedSection>
              </div>

              <AnimatedSection direction="up" delay={0.18}>
                <p className="text-neutral-600 text-sm font-light leading-relaxed">
                  ABI Sports is a vertically integrated sportswear manufacturer based in Sialkot, Pakistan — the world's foremost hub for performance apparel production. Founded in 2004, we have grown from a specialist stitching unit into a full-service manufacturing partner serving professional sports clubs, private-label brands, and global retailers across 60+ countries.
                </p>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.22}>
                <p className="text-neutral-500 text-sm font-light leading-relaxed">
                  Every process — from raw fabric sourcing and CAD pattern cutting through dye sublimation, flatlock stitching, Tajima embroidery, and export packaging — is handled entirely in-house. This vertical integration lets us guarantee consistent quality, fast turnarounds, and competitive pricing at any volume.
                </p>
              </AnimatedSection>

              {/* Certifications */}
              <AnimatedSection direction="up" delay={0.26}>
                <div className="pt-6 border-t border-neutral-100 space-y-4">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400 block">
                    Compliance Certifications
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {CERTIFICATIONS.map((cert, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-black flex-shrink-0" />
                        <span className="text-[10px] font-bold text-neutral-700 tracking-tight">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* CTA */}
              <AnimatedSection direction="up" delay={0.3}>
                <Link href="/about">
                  <div className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-widest text-white bg-black hover:bg-neutral-800 rounded-lg px-5 py-3 transition-all duration-300 cursor-pointer">
                    Full Company Profile
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Company timeline ── */}
      <section className="py-24 bg-[#f9fafb] text-black border-b border-neutral-200 relative overflow-hidden">

        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

          <div className="text-center mb-16 max-w-2xl mx-auto">
            <AnimatedSection direction="up" delay={0.05}>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
                Company History
              </span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
                OUR JOURNEY
              </h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.14}>
              <div className="h-0.5 w-12 bg-black mx-auto mt-4" />
            </AnimatedSection>
          </div>

          {/* Timeline grid */}
          <div ref={timelineRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-neutral-200 rounded-lg overflow-hidden max-w-5xl mx-auto shadow-sm">
            {MILESTONES.map((m, idx) => {
              const isRightCol = idx % 3 === 2;
              const isLastRow = idx >= 3;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
                  className={`relative bg-white p-7 hover:bg-[#f9fafb] transition-colors duration-300 group
                    ${!isRightCol ? 'border-r border-neutral-200' : ''}
                    ${!isLastRow ? 'border-b border-neutral-200' : ''}
                  `}
                >
                  {/* Hover top bar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-black transition-colors duration-400" />

                  <span className="text-2xl font-black text-black tracking-tight block mb-2 leading-none">
                    {m.year}
                  </span>
                  <p className="text-neutral-500 text-xs font-light leading-relaxed">{m.event}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
