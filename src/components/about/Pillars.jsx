'use client';

import React from 'react';
import { ShieldCheck, Target, Zap } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animations';

const PILLARS = [
  {
    id: "01",
    icon: Target,
    title: "TECHNICAL PRECISION",
    subtitle: "Automated Workflows",
    description: "Integrating CLO3D drafting simulation software and computerized laser cutters to guarantee absolute pattern repeatability across bulk production runs.",
    spec: "CAD Pattern Sizing Variance: ±0.1mm"
  },
  {
    id: "02",
    icon: ShieldCheck,
    title: "COMPLIANCE & ETHICS",
    subtitle: "Annual Audits",
    description: "Maintaining strict certifications including WRAP Platinum level standards and SMETA 4-Pillar logs, assuring fair compensation, safety, and workspace care.",
    spec: "Facility Compliance Audit: 100% Verified"
  },
  {
    id: "03",
    icon: Zap,
    title: "VERTICAL INTEGRATION",
    subtitle: "Single-Site Control",
    description: "Managing fabric milling, computerized dye sublimation printing, satin embroidery details, assembly stitching, and cargo logistics under one Sialkot command structure.",
    spec: "Turnaround Control: 72hr sampling"
  }
];

export default function Pillars() {
  return (
    <section className="py-24 bg-black text-white border-b border-neutral-900 relative overflow-hidden">
      
      {/* Background abstract radial details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-neutral-900/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
              Our Core Operational Pillars
            </span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
              OPERATIONAL COMPASS
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <div className="h-0.5 w-12 bg-white mx-auto mt-4"></div>
          </AnimatedSection>
        </div>

        {/* 3-Column Pillars Grid */}
        <StaggerContainer delay={0.15} className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <StaggerItem 
                key={pillar.id}
                className="bg-neutral-950 border border-neutral-900 rounded-lg p-8 flex flex-col justify-between text-left hover:border-neutral-850 hover:bg-neutral-900/40 hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Top horizontal progress accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-neutral-900 group-hover:bg-white transition-colors duration-500" />

                <div>
                  {/* Header row: Index watermark + Icon */}
                  <div className="flex justify-between items-start mb-10">
                    <span className="text-3xl font-black text-neutral-800 group-hover:text-white transition-colors duration-500 leading-none">
                      {pillar.id}
                    </span>
                    <div className="h-9 w-9 rounded-lg bg-neutral-900 border border-neutral-850 flex items-center justify-center flex-shrink-0 shadow-inner group-hover:bg-white group-hover:text-black transition-colors duration-500">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-500 block mb-1.5">
                    {pillar.subtitle}
                  </span>
                  
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-neutral-450 text-[11px] leading-relaxed font-light mb-8">
                    {pillar.description}
                  </p>
                </div>

                {/* Technical specification details badge */}
                <div className="border-t border-neutral-900 pt-4 mt-auto">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400 font-mono">
                    {pillar.spec}
                  </span>
                </div>

              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
}
