'use client';

import React, { useState } from 'react';
import { FileText, Compass, Settings, CheckSquare, Send, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animations';

const PIPELINE_STEPS = [
  {
    step: "01",
    tabLabel: "Inquiry Submission",
    title: "Tech Pack Analysis & Quote Estimate",
    icon: FileText,
    duration: "12 Business Hours",
    description: "Submit your tech pack specs, sizing grids, quantity profiles, and CAD patterns. Our engineering team reviews construction elements and returns a DDP/FOB quote estimate.",
    deliverables: [
      "Construction & seams feasibility scan",
      "Detailed per-piece cost analysis sheet",
      "FOB Sialkot or DDP Delivery quotes",
      "Lead time and sample schedule proposal"
    ],
    badge: "Initial Step"
  },
  {
    step: "02",
    tabLabel: "Fabric Sourcing",
    title: "Yarn Sourcing & Lab Testing",
    icon: Compass,
    duration: "3 - 5 Days",
    description: "We source matching performance yarns or mill custom fabric rolls to meet target GSM weight, color shade (checked in D65 light box), and stretch profile parameters.",
    deliverables: [
      "Custom lab-dip dye shade matching",
      "GSM weight verification audits",
      "Fibre composition certification (GRS/GOTS)",
      "Physical swatches shipped for approval"
    ],
    badge: "Material Sourcing"
  },
  {
    step: "03",
    tabLabel: "Prototyping & Samples",
    title: "Prototype Construction & Fit Review",
    icon: Settings,
    duration: "7 - 10 Days",
    description: "Our pattern master drafts a CAD template and sews a prototype sample using the approved fabric. The sample is shipped directly to your design studio for fit feedback.",
    deliverables: [
      "Pre-production sample assembly",
      "Sizing chart grading validation",
      "Fabric sublimation or print test audit",
      "Direct express shipping of prototype"
    ],
    badge: "Sample Approval"
  },
  {
    step: "04",
    tabLabel: "Bulk Assembly",
    title: "Vertically Integrated Mass Production",
    icon: CheckSquare,
    duration: "18 - 25 Days",
    description: "Upon fit approval and PO confirmation, we roll out bulk fabrication. Cutting, sublimation heat press, flatlock seaming, and labeling are executed under strict ISO supervision.",
    deliverables: [
      "Computerized CAD fabric panel cutting",
      "Yamato flatlock seam stitching audits",
      "Tajima logo embroidery density checks",
      "Daily progress tracker updates"
    ],
    badge: "Mass Fabrication"
  },
  {
    step: "05",
    tabLabel: "Logistics Dispatch",
    title: "Quality Scan, Customs Clearance & Delivery",
    icon: Send,
    duration: "5 - 7 Days (Air Cargo)",
    description: "Every item passes final metal detectors and hand audits. We manage export documentation, customs clearance, and deliver cargo directly to your warehouse.",
    deliverables: [
      "100% metal detector safety validation",
      "Barcoded SKU tracking labels applied",
      "Customs export/import clearances cleared",
      "Door-to-door DDP courier dispatch"
    ],
    badge: "Final Delivery"
  }
];

export default function SourcingProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const active = PIPELINE_STEPS[activeStep];
  const Icon = active.icon;

  return (
    <section className="py-24 bg-white text-black border-b border-neutral-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2 font-mono">
              Operational Workflow
            </span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black uppercase">
              OUR STEP-BY-STEP PIPELINE
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <div className="h-0.5 w-12 bg-black mx-auto mt-4"></div>
          </AnimatedSection>
        </div>

        {/* Split Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-stretch">
          
          {/* LEFT: Pipeline Navigator Buttons */}
          <div className="lg:col-span-4 flex flex-col gap-2 justify-center">
            {PIPELINE_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const StepIcon = step.icon;
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
                  <div className="flex items-center gap-4 relative z-10 text-left">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center border transition-colors duration-300
                      ${isActive ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-150 text-neutral-400 group-hover:text-black'}`}>
                      <StepIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[8px] font-extrabold uppercase tracking-widest block mb-0.5 text-neutral-400">
                        Phase {step.step}
                      </span>
                      <h4 className="text-xs font-bold uppercase tracking-wider">
                        {step.tabLabel}
                      </h4>
                    </div>
                  </div>
                  <ArrowRight className={`h-3.5 w-3.5 transition-all duration-300 ${isActive ? 'text-white translate-x-0.5' : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-black'}`} />
                </button>
              );
            })}
          </div>

          {/* RIGHT: Detailed Active Step Panel */}
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
                {/* Accent line on top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-black" />

                <div className="space-y-6">
                  {/* Step Metadata Header */}
                  <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400">
                      Processing Phase
                    </span>
                    <div className="flex gap-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500 bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded">
                        Duration: {active.duration}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500 bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded">
                        {active.badge}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="text-lg sm:text-xl font-black text-black uppercase tracking-wider flex items-center gap-3">
                      <Icon className="h-5 w-5 text-black flex-shrink-0" />
                      {active.title}
                    </h3>
                    <p className="text-neutral-500 text-xs sm:text-sm font-light leading-relaxed">
                      {active.description}
                    </p>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-450">
                      Phase Deliverables & Audits
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {active.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-neutral-800">
                          <ShieldCheck className="h-4 w-4 text-black flex-shrink-0" />
                          <span className="text-xs font-semibold tracking-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footnote */}
                <div className="border-t border-neutral-100 pt-6 mt-8 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-green-600">
                      Pipeline Active
                    </span>
                  </div>
                  <span className="text-[80px] font-black text-neutral-100 leading-none select-none pointer-events-none absolute bottom-4 right-6 group-hover/panel:text-neutral-150 transition-colors duration-500 font-sans">
                    {active.step}
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
