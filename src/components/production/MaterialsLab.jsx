'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animations';
import { FlaskConical, Waves, Wind, Leaf, Flame, Droplets, ChevronRight, CheckCircle2 } from 'lucide-react';

const MATERIALS = [
  {
    id: 0,
    name: 'Performance Polyester',
    gsm: '120–180 GSM',
    icon: Waves,
    origin: 'Taiwan / South Korea',
    moq: '500 metres',
    certifications: ['Oeko-Tex 100', 'ISO 9001'],
    properties: ['Moisture Wicking', 'UV Protection', 'Anti-Odor', 'Quick Dry'],
    description: 'Primary substrate for premium activewear. High tenacity thread structure allows sublimation dye embedding at 200°C without fibre damage or colour bleeding.'
  },
  {
    id: 1,
    name: 'Recycled rPET Fabric',
    gsm: '140–200 GSM',
    icon: Leaf,
    origin: 'Japan / Germany',
    moq: '300 metres',
    certifications: ['GRS Certified', 'Bluesign'],
    properties: ['Eco-Certified', 'Tensile Strength', 'Pilling Resistant', 'Carbon Neutral'],
    description: 'Made from post-consumer PET bottles. Offers equivalent performance to virgin polyester while meeting sustainability procurement mandates globally.'
  },
  {
    id: 2,
    name: 'Nylon Stretch Lycra',
    gsm: '150–230 GSM',
    icon: Flame,
    origin: 'Italy / China',
    moq: '200 metres',
    certifications: ['Lycra Authentic', 'Oeko-Tex 100'],
    properties: ['4-Way Stretch', 'Compression Fit', 'Shape Retention', 'Chlorine Resistant'],
    description: 'Bi-elastic nylon-spandex blend ideal for compression legwear, cycling bib shorts, and swimwear. Retains shape under 200+ wash cycles.'
  },
  {
    id: 3,
    name: 'GOTS Organic Cotton',
    gsm: '180–260 GSM',
    icon: Leaf,
    origin: 'India / Pakistan',
    moq: '400 metres',
    certifications: ['GOTS Certified', 'Fair Trade'],
    properties: ['100% Organic', 'Breathable', 'Hypoallergenic', 'Soft Hand Feel'],
    description: 'Certified organic single-jersey and interlock cotton, free from synthetic pesticide residue. Ideal for casual-wear and lifestyle collections.'
  },
  {
    id: 4,
    name: 'Fleece Brushed Terry',
    gsm: '280–380 GSM',
    icon: FlaskConical,
    origin: 'China / Bangladesh',
    moq: '300 metres',
    certifications: ['Oeko-Tex 100', 'ISO 9001'],
    properties: ['Thermal Insulation', 'Soft Touch', 'Pill Resistant', 'Anti-Static'],
    description: 'Heavy-loop brushed interior fabric for cold-weather outerwear. Provides consistent loft and insulation for team training jackets and hoodies.'
  },
  {
    id: 5,
    name: 'Waterproof Shell',
    gsm: '90–130 GSM',
    icon: Droplets,
    origin: 'Taiwan / Japan',
    moq: '200 metres',
    certifications: ['Bluesign', 'ISO 9001'],
    properties: ['10K Waterproof', 'Wind Resistant', 'Taped Seams', '3-Layer Laminate'],
    description: 'Technical 3-layer laminate shell for rain jackets and hard-shell outerwear. DWR-coated face fabric with seam-sealable membrane bonded lining.'
  },
];

function MaterialRow({ material, idx, isActive, onClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = material.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: idx * 0.07 }}
      onClick={onClick}
      className={`flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer transition-all duration-300 border group ${
        isActive
          ? 'bg-black text-white border-black shadow-md'
          : 'bg-white text-black border-neutral-100 hover:border-neutral-300 hover:shadow-sm'
      }`}
    >
      {/* Icon box */}
      <div className={`h-9 w-9 rounded-lg flex-shrink-0 flex items-center justify-center border transition-colors duration-300 ${
        isActive ? 'bg-white/10 border-white/20' : 'bg-neutral-50 border-neutral-100'
      }`}>
        <Icon className={`h-4 w-4 flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
      </div>

      {/* Name + GSM */}
      <div className="flex-grow min-w-0">
        <h4 className={`text-xs font-black uppercase tracking-wider truncate ${isActive ? 'text-white' : 'text-black'}`}>
          {material.name}
        </h4>
        <span className={`text-[8.5px] font-bold uppercase tracking-widest font-mono ${isActive ? 'text-neutral-400' : 'text-neutral-400'}`}>
          {material.gsm}
        </span>
      </div>

      {/* Index */}
      <span className={`text-[9px] font-black font-mono flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-neutral-500' : 'text-neutral-200'}`}>
        0{idx + 1}
      </span>

      <ChevronRight className={`h-3.5 w-3.5 flex-shrink-0 transition-all duration-300 ${
        isActive ? 'text-white' : 'text-neutral-300 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
      }`} />
    </motion.div>
  );
}

export default function MaterialsLab() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = MATERIALS[activeIdx];
  const Icon = active.icon;

  return (
    <section className="py-24 bg-white text-black border-b border-neutral-200 relative overflow-hidden">

      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
              Raw Material Sourcing
            </span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
              FABRIC MATERIALS LAB
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <div className="h-0.5 w-12 bg-black mx-auto mt-4" />
          </AnimatedSection>
        </div>

        {/* Interactive Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">

          {/* LEFT: Clickable material list */}
          <div className="lg:col-span-5 space-y-2">
            {MATERIALS.map((mat, idx) => (
              <MaterialRow
                key={mat.id}
                material={mat}
                idx={idx}
                isActive={activeIdx === idx}
                onClick={() => setActiveIdx(idx)}
              />
            ))}
          </div>

          {/* RIGHT: Sticky detail panel */}
          <div className="lg:col-span-7 lg:sticky lg:top-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm"
              >
                {/* Black header band */}
                <div className="bg-black px-8 py-8 relative overflow-hidden">
                  {/* Faint watermark icon */}
                  <div className="absolute -right-4 -top-4 opacity-[0.06] pointer-events-none">
                    <Icon className="h-44 w-44 text-white" />
                  </div>

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-500 block mb-2 font-mono">
                        Fabric Reference — 0{activeIdx + 1} / 06
                      </span>
                      <h3 className="text-lg sm:text-2xl font-black text-white uppercase tracking-wider leading-tight">
                        {active.name}
                      </h3>
                      <p className="text-[9px] font-bold text-neutral-500 mt-1 font-mono">{active.gsm}</p>
                    </div>

                    <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  {/* Property tags — white on black */}
                  <div className="flex flex-wrap gap-2 mt-6 relative z-10">
                    {active.properties.map((p, i) => (
                      <span
                        key={i}
                        className="text-[8px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded border border-neutral-700 text-neutral-300 bg-white/5 font-mono"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* White body */}
                <div className="px-8 py-7 space-y-6">

                  <p className="text-neutral-500 text-xs sm:text-sm font-light leading-relaxed">
                    {active.description}
                  </p>

                  {/* Metadata grid */}
                  <div className="grid grid-cols-2 gap-0 border border-neutral-100 rounded-lg overflow-hidden">
                    <div className="p-4 border-r border-neutral-100">
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-400 block mb-1.5">Country of Origin</span>
                      <span className="text-xs font-black text-black">{active.origin}</span>
                    </div>
                    <div className="p-4">
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-400 block mb-1.5">Minimum Order Qty</span>
                      <span className="text-xs font-black text-black">{active.moq}</span>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="space-y-3">
                    <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-400 block">
                      Compliance Certifications
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {active.certifications.map((cert, i) => (
                        <div key={i} className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-200 px-3 py-1.5 rounded-lg">
                          <CheckCircle2 className="h-3 w-3 text-black flex-shrink-0" />
                          <span className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-700">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
