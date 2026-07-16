'use client';

import React from 'react';
import { Plane, Ship, Package, CheckCircle2 } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animations';

const REGIONS = [
  {
    region: "North America",
    markets: ["United States", "Canada", "Mexico"],
    shippingMethod: "Air Cargo (5–7 Days)",
    icon: Plane,
    volume: "40%",
    label: "Export Volume"
  },
  {
    region: "European Union",
    markets: ["Germany", "Netherlands", "France", "Spain"],
    shippingMethod: "Sea + Air Freight (7–14 Days)",
    icon: Ship,
    volume: "25%",
    label: "Export Volume"
  },
  {
    region: "Middle East & GCC",
    markets: ["UAE", "Saudi Arabia", "Qatar", "Kuwait"],
    shippingMethod: "Air Cargo (3–5 Days)",
    icon: Plane,
    volume: "20%",
    label: "Export Volume"
  },
  {
    region: "Asia Pacific",
    markets: ["Australia", "New Zealand", "Singapore"],
    shippingMethod: "Air + Sea Freight (10–18 Days)",
    icon: Package,
    volume: "15%",
    label: "Export Volume"
  }
];

export default function GlobalMarkets() {
  return (
    <section className="py-24 bg-[#f9fafb] text-black border-b border-neutral-200 relative overflow-hidden">

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-200/30 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

        {/* Section Title */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
              Export & Distribution Network
            </span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
              GLOBAL EXPORT MARKETS
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <div className="h-0.5 w-12 bg-black mx-auto mt-4"></div>
          </AnimatedSection>
        </div>

        {/* 2×2 Regional Cards */}
        <StaggerContainer delay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {REGIONS.map((region, idx) => {
            const Icon = region.icon;
            return (
              <StaggerItem
                key={idx}
                className="bg-white border border-neutral-100/60 rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 group relative text-left"
              >
                {/* Dark header band */}
                <div className="bg-black px-6 py-5 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-500 block mb-1">
                      Export Region
                    </span>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">
                      {region.region}
                    </h3>
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-black text-white leading-none">{region.volume}</span>
                    <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-500 pb-0.5">{region.label}</span>
                  </div>
                </div>

                {/* Body content */}
                <div className="px-6 py-5 space-y-4">
                  {/* Markets list */}
                  <div>
                    <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-400 block mb-2">
                      Key Markets
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {region.markets.map((market, mIdx) => (
                        <span key={mIdx} className="text-[9px] font-bold uppercase tracking-wide text-neutral-700 bg-neutral-100/80 border border-neutral-200/30 px-2.5 py-1 rounded">
                          {market}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Shipping method */}
                  <div className="flex items-center gap-3 border-t border-neutral-100 pt-4">
                    <div className="h-7 w-7 rounded-md bg-neutral-50 border border-neutral-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-3.5 w-3.5 text-neutral-500" />
                    </div>
                    <div>
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-400 block">Logistics Mode</span>
                      <span className="text-[10px] font-bold text-neutral-800">{region.shippingMethod}</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom wide strip: global note */}
        <div className="mt-12 max-w-5xl mx-auto bg-white border border-neutral-100 rounded-lg px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-black flex-shrink-0" />
            <p className="text-xs text-neutral-600 font-light">
              All export shipments are fully insured with documented country-of-origin certificates, lab-tested quality approvals, and customs pre-clearance packages.
            </p>
          </div>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400 flex-shrink-0">
            40+ Countries Served
          </span>
        </div>

      </div>
    </section>
  );
}
