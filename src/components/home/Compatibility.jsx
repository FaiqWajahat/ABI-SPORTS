'use client';

import React from 'react';
import Image from 'next/image';
import { FileSpreadsheet, Layers, Ruler, Ship } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animations';

const COMPATIBILITIES = [
  {
    id: 1,
    icon: FileSpreadsheet,
    title: "Tech Packs & 3D Design",
    description: "Send us your tech packs in PDF, Excel, or Adobe Illustrator (.AI) formats. We are fully compatible with CLO3D, Browzwear files, and CAD pattern software to build exact fitting samples.",
    specs: ["Adobe Illustrator (.AI)", "CLO3D / CAD Patterns", "Tech Pack PDFs", "Size Spec Sheets"],
    placeholderImage: "/active-wear.png"
  },
  {
    id: 2,
    icon: Layers,
    title: "Customization & Prints",
    description: "Support for advanced B2B decoration protocols including high-density screen printing, Tajima embroidery, silicone 3D prints, reflective heat transfers, and high-resolution sublimation.",
    specs: ["Tajima Embroidery", "Dye-Sublimation", "High-Density Prints", "Silicone Heat Transfer"],
    placeholderImage: "/team-wear.png"
  },
  {
    id: 3,
    icon: Ruler,
    title: "Sizing & Fit Grading",
    description: "Compatible with international standard charts (US, EU, Asian markets). We offer custom fit grading across sportswear product categories from youth sizes up to athletic plus-sizing.",
    specs: ["US & EU Standard Fit", "Custom Size Charts", "In-House Fit Grading", "Youth to Plus Sizes"],
    placeholderImage: "/active-wear.png"
  },
  {
    id: 4,
    icon: Ship,
    title: "Logistics & Integrations",
    description: "Fully compliant with retail logistics requirements. We support GS1 barcoding, Amazon FBA packaging, custom tags/inserts, poly-bag labeling, and direct-to-warehouse global distribution.",
    specs: ["GS1 Barcoding", "Amazon FBA Compliant", "Shopify Warehouses", "Custom Trims & Labeling"],
    placeholderImage: "/team-wear.png"
  }
];

export default function Compatibility() {
  return (
    <section className="py-24 bg-white text-black border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-20">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
              Integrated B2B Specifications
            </span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
              TECHNICAL COMPATIBILITY
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <div className="h-0.5 w-12 bg-black mx-auto mt-4"></div>
          </AnimatedSection>
        </div>

        {/* Alternate Editorial Compatibility Grid */}
        <StaggerContainer delay={0.15} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {COMPATIBILITIES.map((item) => {
            const Icon = item.icon;
            const isEven = item.id % 2 === 0;
            return (
              <StaggerItem 
                key={item.id} 
                className={`bg-[#fcfcfc] rounded-lg overflow-hidden flex flex-col ${isEven ? 'sm:flex-row-reverse' : 'sm:flex-row'} shadow-sm hover:shadow-md transition-all duration-500 group`}
              >
                
                {/* Image Section (Alternates left/right side on desktop screen sizing) */}
                <div className="sm:w-[42%] relative aspect-square sm:aspect-auto min-h-[220px] bg-neutral-100 overflow-hidden">
                  <Image
                    src={item.placeholderImage}
                    alt={item.title}
                    fill
                    sizes="(max-w-768px) 100vw, 20vw"
                    className="object-cover object-center group-hover:scale-104 transition-transform duration-700"
                  />
                </div>

                {/* Content Section */}
                <div className="sm:w-[58%] p-8 flex flex-col justify-between">
                  <div>
                    {/* Header: Icon + Large Index Number */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="h-9 w-9 rounded-lg bg-white border border-neutral-200 flex items-center justify-center shadow-sm">
                        <Icon className="h-4.5 w-4.5 text-black" />
                      </div>
                      <span className="text-2xl font-black text-neutral-200/80 tracking-widest leading-none font-sans">
                        0{item.id}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-neutral-500 text-[11px] leading-relaxed font-light mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Technical Badges at bottom */}
                  <div className="border-t border-neutral-100 pt-4 mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                      {item.specs.map((spec, sIdx) => (
                        <span 
                          key={sIdx} 
                          className="text-[8px] font-bold uppercase tracking-wider bg-white text-neutral-600 border border-neutral-200 rounded px-2.5 py-1"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
}
