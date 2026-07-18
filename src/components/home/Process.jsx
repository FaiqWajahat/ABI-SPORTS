'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animations';

const PROCESS_STEPS = [
  {
    id: 1,
    stepNumber: "01",
    phase: "Design",
    title: "Design & Tech Packs",
    description: "Blueprint CAD patterns, CLO3D 3D simulations, fit validation models and full size spec sheets.",
    image: "/process-01.png"
  },
  {
    id: 2,
    stepNumber: "02",
    phase: "Sourcing",
    title: "Fabric Sourcing & Validation",
    description: "High-performance athletic yarns, GSM density validation, shrinkage controls, custom dye lab tests.",
    image: "/process-02.png"
  },
  {
    id: 3,
    stepNumber: "03",
    phase: "Cutting",
    title: "Precision Panel Cutting",
    description: "Computerized laser-cutting tables, automatic pattern laying and zero-variance dimension control.",
    image: "/process-03.png"
  },
  {
    id: 4,
    stepNumber: "04",
    phase: "Print",
    title: "Embellishment & Printing",
    description: "Sublimation pressing, Tajima embroidery, silicone 3D heat transfers and screen printing options.",
    image: "/process-04.png"
  },
  {
    id: 5,
    stepNumber: "05",
    phase: "Assembly",
    title: "Stitching & Assembly",
    description: "Flatlock seam systems, reinforced twin-needle joins, and specialty sportswear thread alignment.",
    image: "/process-05.png"
  },
  {
    id: 6,
    stepNumber: "06",
    phase: "Quality",
    title: "Quality Control & Ship",
    description: "100% manual inspections, seam tensile pull-testing, branding attachments, compliant packaging.",
    image: "/process-06.png"
  }
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(1);
  const active = PROCESS_STEPS.find(s => s.id === activeStep);

  return (
    <section className="py-24 bg-black text-white border-b border-neutral-900 relative overflow-hidden">

      {/* Subtle background texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
              Manufacturing Workflow
            </span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
              OUR PRODUCTION PROCESS
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <div className="h-0.5 w-12 bg-white mx-auto mt-4"></div>
          </AnimatedSection>
        </div>

        {/* Main Layout: Step Selector (Left) + Active Preview (Right) */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch">

          {/* LEFT: Step selector list */}
          <div className="lg:w-5/12 flex flex-col gap-2">
            {PROCESS_STEPS.map((step) => {
              const isActive = activeStep === step.id;
              return (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  whileTap={{ scale: 0.99 }}
                  className={`relative w-full text-left rounded-lg px-5 py-4 flex items-center gap-5 cursor-pointer transition-all duration-300 overflow-hidden border
                    ${isActive
                      ? 'bg-white text-black border-white shadow-md'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-900 hover:border-neutral-800 hover:bg-neutral-900/60'
                    }`}
                >
                  {/* Active sliding background indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeStepBg"
                      className="absolute inset-0 bg-white z-0 rounded-lg"
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  )}

                  <div className="relative z-10 flex items-center gap-5 w-full">
                    {/* Step number */}
                    <span className={`text-xs font-black tracking-widest flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-neutral-400' : 'text-neutral-700'}`}>
                      {step.stepNumber}
                    </span>

                    {/* Divider */}
                    <div className={`w-px h-6 flex-shrink-0 transition-colors duration-300 ${isActive ? 'bg-neutral-200' : 'bg-neutral-800'}`} />

                    {/* Phase + Title */}
                    <div className="flex-grow min-w-0">
                      <span className={`text-[8px] font-extrabold uppercase tracking-widest block mb-0.5 transition-colors duration-300 ${isActive ? 'text-neutral-500' : 'text-neutral-600'}`}>
                        {step.phase}
                      </span>
                      <h3 className={`text-xs font-bold uppercase tracking-wide truncate transition-colors duration-300 ${isActive ? 'text-black' : 'text-neutral-300'}`}>
                        {step.title}
                      </h3>
                    </div>

                    {/* Arrow indicator */}
                    <ArrowRight className={`h-3.5 w-3.5 flex-shrink-0 transition-all duration-300 ${isActive ? 'text-black translate-x-0.5' : 'text-neutral-700 -translate-x-1 opacity-0'}`} />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT: Active step preview panel */}
          <div className="lg:w-7/12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative w-full h-full min-h-[420px] sm:min-h-[480px] rounded-lg overflow-hidden bg-neutral-950 border border-neutral-900"
              >
                {/* Background image */}
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover object-center opacity-30"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-10">

                  {/* Top: big oversized step serial */}
                  <div className="flex items-start justify-between">
                    <span className="text-[80px] sm:text-[110px] font-black text-white/10 leading-none tracking-tighter select-none pointer-events-none">
                      {active.stepNumber}
                    </span>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 bg-black/50 border border-neutral-800 px-2.5 py-1 rounded-md backdrop-blur-sm mt-3">
                      {active.phase}
                    </span>
                  </div>

                  {/* Bottom: step details */}
                  <div className="space-y-4">
                    <div className="h-0.5 w-10 bg-white opacity-40" />
                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                      {active.title}
                    </h3>
                    <p className="text-neutral-300 text-sm font-light leading-relaxed max-w-md">
                      {active.description}
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-500">
                        Step {activeStep} of {PROCESS_STEPS.length}
                      </span>
                      <div className="flex gap-1.5">
                        {PROCESS_STEPS.map(s => (
                          <button
                            key={s.id}
                            onClick={() => setActiveStep(s.id)}
                            className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${s.id === activeStep ? 'w-6 bg-white' : 'w-1.5 bg-neutral-700 hover:bg-neutral-500'}`}
                          />
                        ))}
                      </div>
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
