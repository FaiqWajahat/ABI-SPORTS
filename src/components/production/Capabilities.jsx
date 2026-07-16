'use client';

import React, { useState } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animations';

const CAPABILITIES = [
  { id: 0, label: 'Pattern & Cutting', title: 'Computerized CAD Fabric Cutting', description: 'Our automated laser-guided CAD cutting tables operate at sub-millimeter precision, eliminating human variance from fabric panel production.', specs: ['Zero-variance pattern accuracy', 'Automated marker laying system', 'Up to 120 plies simultaneous cut', 'German-engineered cutter heads'] },
  { id: 1, label: 'Flatlock Stitching', title: 'Yamato 4-Needle Flatlock Seaming', description: 'Industrial Yamato flatlock machines create perfectly flat, low-profile seam joins that eliminate internal chafing for professional athletes.', specs: ['6,000 stitches per minute output', '4-needle 6-thread seam structure', 'Zero internal ridge seam profile', 'Tensile break-test validated'] },
  { id: 2, label: 'Dye Sublimation', title: 'Roll-to-Roll Sublimation Heat Press', description: 'Italian calendar heat-press systems lock vivid colors permanently into polyester fibers at precise curing temperatures for maximum wash-fastness.', specs: ['200°C precision curing temperature', 'Italian Kian sublimation ink certified', 'D65 standard lightbox shade match', 'Anti-bleed print boundary control'] },
  { id: 3, label: 'Tajima Embroidery', title: 'Multi-Head Tajima Embroidery Systems', description: 'Japanese Tajima machines deliver ultra-dense satin stitch embroidery for team logos, badge crests, and custom branding details.', specs: ['1,200 stitches per minute speed', 'Up to 15 color thread capacity', 'High-density 3D puff available', 'DST digital file conversion'] },
  { id: 4, label: 'Heat Transfer', title: 'Silicone 3D Heat Transfer Application', description: 'Custom molded silicone heat transfers for raised 3D branding elements, player names, numbers, and technical surface textures on performance fabrics.', specs: ['300+ micron raised silicone profile', 'Wash-proof bond at 160°C press', 'Full Pantone color matching', 'Custom mold tooling in-house'] },
  { id: 5, label: 'Packaging & QA', title: 'Final Inspection & Export Packaging', description: 'Every finished garment passes through industrial metal detectors, thread inspections, barcode verification, and anti-humidity polybag sealing.', specs: ['100% metal detector pass rate', 'SMETA compliant packaging process', 'Barcode SKU mapping verified', 'Anti-humidity silica insert packs'] },
];

export default function Capabilities() {
  const [activeTab, setActiveTab] = useState(0);
  const active = CAPABILITIES[activeTab];

  return (
    <section className="py-24 bg-white text-black border-b border-neutral-200 relative overflow-hidden">

      {/* Light Theme Dot Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />

      <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

        {/* Section Title */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
              Manufacturing Capabilities
            </span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
              OUR PRODUCTION SYSTEMS
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <div className="h-0.5 w-12 bg-black mx-auto mt-4" />
          </AnimatedSection>
        </div>

        {/* Tab Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 max-w-6xl mx-auto items-stretch">

          {/* Left: Tab Buttons */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {CAPABILITIES.map((cap) => {
              const isActive = activeTab === cap.id;
              return (
                <motion.button
                  key={cap.id}
                  onClick={() => setActiveTab(cap.id)}
                  whileTap={{ scale: 0.99 }}
                  className={`relative w-full text-left rounded-lg px-5 py-4 flex items-center justify-between cursor-pointer transition-all duration-300 overflow-hidden border
                    ${isActive
                      ? 'bg-black text-white border-black shadow-lg shadow-black/10'
                      : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-100'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCapTab"
                      className="absolute inset-0 bg-black z-0 rounded-lg"
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-4 w-full">
                    <span className={`text-xs font-black tracking-widest flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-neutral-400' : 'text-neutral-400'}`}>
                      0{cap.id + 1}
                    </span>
                    <div className={`w-px h-5 flex-shrink-0 transition-colors duration-300 ${isActive ? 'bg-neutral-700' : 'bg-neutral-300'}`} />
                    <h4 className={`text-xs font-bold uppercase tracking-wider truncate transition-colors ${isActive ? 'text-white' : 'text-neutral-700'}`}>
                      {cap.label}
                    </h4>
                  </div>
                  <ArrowRight className={`h-3.5 w-3.5 relative z-10 transition-all duration-300 ${isActive ? 'text-white translate-x-0.5' : 'text-neutral-400 -translate-x-1 opacity-0'}`} />
                </motion.button>
              );
            })}
          </div>

          {/* Right: Detail Panel */}
          <div className="lg:col-span-8" data-cursor="expand">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-white border border-neutral-200 shadow-xl shadow-black/5 rounded-lg p-8 sm:p-10 h-full flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-black" />

                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400">
                      Active System
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-neutral-600 bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded">
                      Stage 0{activeTab + 1} of 06
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-black uppercase tracking-wider">
                    {active.title}
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
                    {active.description}
                  </p>

                  {/* Specs checklist */}
                  <div className="space-y-3 pt-4">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">
                      Technical Specifications
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {active.specs.map((spec, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-neutral-700">
                          <ShieldCheck className="h-4 w-4 text-black flex-shrink-0 mt-0.5" />
                          <span className="text-xs font-bold tracking-tight">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Large watermark index (Now Light Gray) */}
                <span className="absolute bottom-4 right-6 text-[100px] font-black text-neutral-50/80 leading-none select-none pointer-events-none font-sans z-0">
                  0{activeTab + 1}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}