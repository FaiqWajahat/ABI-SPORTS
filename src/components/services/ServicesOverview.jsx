'use client';

import React from 'react';
import { Compass, Layers, Printer, Sparkles, Tag, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animations';

const SERVICES = [
  {
    index: "01",
    icon: Compass,
    title: 'OEM & ODM Manufacturing',
    description: "Transform your ideas into premium apparel with our complete OEM and ODM manufacturing services. Whether you have a ready-made design or need full product development, our experienced team delivers customized, high-quality garments tailored to your brand's vision.",
    bullets: [
      'Custom tech pack prototype translation',
      'German CAD layout sizing structures',
      'Sample turnaround in 7-10 days',
      'Compliance with international quality codes'
    ]
  },
  {
    index: "02",
    icon: Printer,
    title: 'Sublimation Printing',
    description: 'Bring your designs to life with vibrant, edge-to-edge sublimation printing. Using advanced technology, we produce lightweight, breathable, and fade-resistant apparel with brilliant colors and exceptional durability.',
    bullets: [
      'Edge-to-edge full dye-sublimation',
      'Vivid, wash-proof colors that do not fade',
      'Ideal for custom sportswear & team wear',
      'Italian Kian inks (certified eco-friendly)'
    ]
  },
  {
    index: "03",
    icon: Sparkles,
    title: 'Screen Printing',
    description: 'Achieve bold, long-lasting prints with our premium screen printing services. Perfect for bulk orders, this technique delivers vibrant colors, sharp graphics, and outstanding durability for fashion collections.',
    bullets: [
      'Bold and high-density screen print overlays',
      'Outstanding durability over wash cycles',
      'Vibrant color layers and sharp graphics',
      'Cost-effective for high-volume bulk runs'
    ]
  },
  {
    index: "04",
    icon: Layers,
    title: 'Precision Embroidery',
    description: 'Enhance your apparel with precision embroidery that adds a premium and professional finish. Our advanced embroidery techniques create clean, durable logos and designs, giving every garment a refined look.',
    bullets: [
      'Multi-head automated Tajima embroidery',
      'Dense satin stitching and 3D Puff badges',
      'Refined professional look that lasts',
      'Multi-color thread matches'
    ]
  },
  {
    index: "05",
    icon: Tag,
    title: 'Private Label Manufacturing',
    description: 'Build your brand with confidence through our comprehensive private label manufacturing solutions. From custom labels and hang tags to premium packaging, we help you create apparel that reflects your unique identity.',
    bullets: [
      'Custom woven neck labels & neck prints',
      'Eco-friendly card stock tags & hangtags',
      'Barcoded SKU tracking polybag packaging',
      'Complete private labeling branding kits'
    ]
  },
  {
    index: "06",
    icon: ShieldCheck,
    title: 'DTF & DTG Printing Services',
    description: 'Bring your designs to life with vibrant colors, sharp details, and exceptional durability. Our DTF and DTG printing delivers high-quality, full-color prints with excellent flexibility across multiple fabric types.',
    bullets: [
      'Vibrant full-color Direct to Film prints',
      'Direct to Garment high-precision printing',
      'High stretch resistance and zero cracking',
      'Compatible with cotton, polyester, & blends'
    ]
  }
];

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-[#ffffff] text-black border-b border-neutral-200 relative overflow-hidden">
      {/* Soft, minimal top accent line for the entire section */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-neutral-200/60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="text-left">
            <AnimatedSection direction="up" delay={0.05}>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 block mb-2 font-mono">
                Services Scope
              </span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-black leading-none font-sans">
                CORE CAPABILITIES
              </h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.15}>
              <div className="h-[2px] w-12 bg-black mt-4" />
            </AnimatedSection>
          </div>
          <AnimatedSection direction="up" delay={0.18} className="text-left md:text-right max-w-sm">
            <p className="text-neutral-500 text-xs sm:text-sm font-light leading-relaxed">
              We employ computerized design systems, advanced embroidery units, and eco-certified inks to scale your brand apparel from concept to bulk shipping.
            </p>
          </AnimatedSection>
        </div>

        {/* Minimalist Grid */}
        <StaggerContainer delay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <StaggerItem
                key={idx}
                className="bg-white border border-neutral-200 rounded-lg p-8 flex flex-col justify-between text-left hover:shadow-md hover:border-neutral-300 transition-all duration-300 relative group min-h-[440px]"
              >
                {/* Subtle left-side border indicator sliding down on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-black scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-l-lg" />

                <div>
                  {/* Top Header Row */}
                  <div className="flex justify-between items-center mb-8">
                    <div className="h-10 w-10 rounded-lg bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-700 group-hover:bg-black group-hover:border-black group-hover:text-white transition-colors duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold font-mono text-neutral-400 tracking-wider">
                      [{srv.index}]
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-3 leading-snug flex items-center gap-1.5">
                    {srv.title}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-neutral-400 group-hover:text-black" />
                  </h3>
                  
                  {/* Description */}
                  <p className="text-neutral-500 text-xs font-light leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>

                {/* Bullets Specifications */}
                <div className="border-t border-neutral-100 pt-5 mt-auto">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400 block mb-3 font-mono">
                    Deliverables & Standards
                  </span>
                  <ul className="space-y-2">
                    {srv.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-[11px] font-semibold text-neutral-800 leading-tight">
                        <span className="text-black font-extrabold flex-shrink-0 mt-[-1px] select-none font-mono">—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
}
