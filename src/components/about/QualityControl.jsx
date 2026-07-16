'use client';

import React, { useState } from 'react';
import { Shield, CheckSquare, Search, ClipboardList, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animations';

const QA_STEPS = [
  {
    id: "Step 01",
    tabTitle: "Material Audit",
    title: "Incoming Fabric Density & Shrinkage Test",
    icon: Search,
    description: "Every roll of raw fabric is audited in our lab before cutting. We test vertical/horizontal elongation, color shade matching under D65 lighting, and pre-wash shrinkage indices.",
    checklist: [
      "GSM Weight Validation (Tolerance: ±3%)",
      "Wash shrinkage test (Target: <2%)",
      "D65 Standard Lightbox Shade Match",
      "Fabric roll defect scan"
    ],
    standard: "ISO 9001:2015 Approved"
  },
  {
    id: "Step 02",
    tabTitle: "Stitching Audits",
    title: "In-Line Stitching Tensile Resistance Check",
    icon: ClipboardList,
    description: "Quality inspectors audit sewing rows in real-time. We check stitch counts per inch, seam elasticity under tensile loads, and ensure Yamato flatlock machines align seams perfectly.",
    checklist: [
      "12-14 Stitches Per Inch (SPI) target",
      "Seam tensile break test validation",
      "Flatlock flat-seam alignment check",
      "Internal thread trimming review"
    ],
    standard: "Yamato Stitch Standards"
  },
  {
    id: "Step 03",
    tabTitle: "Color Verification",
    title: "Sublimation Heat Press Tone Verification",
    icon: Shield,
    description: "Printed panels are checked post-heat press against master print targets. We verify sublimation transfer color accuracy, sharpness, and ink curing temperatures.",
    checklist: [
      "Italian sublimation ink density match",
      "Curing heat verification (200°C target)",
      "High-resolution graphic crispness scan",
      "Color bleeding resistance check"
    ],
    standard: "Italian Kian Ink Compliance"
  },
  {
    id: "Step 04",
    tabTitle: "Fulfillment Scan",
    title: "Metal Detection & Barcode Integrity Check",
    icon: CheckSquare,
    description: "Before bagging, 100% of finished apparel goes through industrial metal detectors. Garments are hand-inspected for loose threads, and tags are audited against order manifests.",
    checklist: [
      "100% pass through industrial metal detector",
      "Barcoded SKU sticker mapping verify",
      "Double manual thread-trimming scan",
      "Polybag humidity control pack insert"
    ],
    standard: "Zero-Defect Shipment Target"
  }
];

export default function QualityControl() {
  const [activeStep, setActiveStep] = useState(0);
  const active = QA_STEPS[activeStep];

  return (
    <section className="py-24 bg-white text-black border-b border-neutral-200 relative overflow-hidden">
      <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
              Quality Assurance Protocols
            </span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
              OUR 4-STAGE QUALITY AUDIT
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <div className="h-0.5 w-12 bg-black mx-auto mt-4"></div>
          </AnimatedSection>
        </div>

        {/* Unique Interactive Split Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-stretch">
          
          {/* LEFT: Step Navigator List */}
          <div className="lg:col-span-4 flex flex-col gap-2 justify-center">
            {QA_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const Icon = step.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left rounded-lg p-5 flex items-center justify-between border cursor-pointer transition-all duration-300 relative overflow-hidden group
                    ${isActive 
                      ? 'bg-black text-white border-black shadow-md' 
                      : 'bg-[#fcfcfc] text-neutral-500 border-neutral-100/70 hover:border-neutral-200 hover:bg-white'
                    }`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center border transition-colors duration-300
                      ${isActive ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-150 text-neutral-400 group-hover:text-black'}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className={`text-[8px] font-extrabold uppercase tracking-widest block mb-0.5 ${isActive ? 'text-neutral-400' : 'text-neutral-400'}`}>
                        {step.id}
                      </span>
                      <h4 className="text-xs font-bold uppercase tracking-wider">
                        {step.tabTitle}
                      </h4>
                    </div>
                  </div>
                  <ArrowRight className={`h-3.5 w-3.5 transition-all duration-300 ${isActive ? 'text-white translate-x-0.5' : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-black'}`} />
                </button>
              );
            })}
          </div>

          {/* RIGHT: Detailed Active Step Showcase Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-[#fcfcfc] rounded-lg p-8 sm:p-10 border border-neutral-100 shadow-sm flex flex-col justify-between h-full text-left relative overflow-hidden group/panel"
              >
                {/* Accent top stripe */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-black" />

                <div className="space-y-6">
                  {/* Scope header */}
                  <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400">
                      Active Inspection Stage
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500 bg-neutral-100/80 border border-neutral-200/20 px-2.5 py-1 rounded">
                      {active.standard}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="text-lg sm:text-xl font-black text-black uppercase tracking-wider">
                      {active.title}
                    </h3>
                    <p className="text-neutral-500 text-xs sm:text-sm font-light leading-relaxed">
                      {active.description}
                    </p>
                  </div>

                  {/* Technical Checklist */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-450">
                      Audit Checklist Parameters
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {active.checklist.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-neutral-800">
                          <ShieldCheck className="h-4 w-4 text-black flex-shrink-0" />
                          <span className="text-xs font-semibold tracking-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Verification tag */}
                <div className="border-t border-neutral-100 pt-6 mt-8 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-green-600">
                      Stage Verified
                    </span>
                  </div>
                  <span className="text-[80px] font-black text-neutral-100 leading-none select-none pointer-events-none absolute bottom-4 right-6 group-hover/panel:text-neutral-150 transition-colors duration-500 font-sans">
                    {active.id.split(" ")[1]}
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
