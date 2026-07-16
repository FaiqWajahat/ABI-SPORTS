'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animations';

const FAQS = [
  {
    id: 1,
    question: "What is your Minimum Order Quantity (MOQ)?",
    answer: "Our standard MOQ starts at 50 units per design/colorway, which can be split across multiple sizes. This flexible arrangement allows emerging brands to launch activewear collections and private labels without heavy upfront inventory costs."
  },
  {
    id: 2,
    question: "Do you offer custom prototyping and sample runs?",
    answer: "Yes, we have a dedicated rapid prototyping team. We can develop physical fit samples and fabric prototypes from your design sketches or tech packs. Sample turnarounds typically take 3 to 5 business days."
  },
  {
    id: 3,
    question: "Can you help with digital pattern drafting?",
    answer: "Absolutely. Our in-house designers specialize in CLO3D fashion simulation. If you only have sketches or references, we can draft custom CAD size charts, construct 3D mockups, and build retail-ready tech pack files for you."
  },
  {
    id: 4,
    question: "What compliance standards do your facilities hold?",
    answer: "Our Sialkot production factories are fully compliant and hold WRAP (Platinum Level), SEDEX (SMETA 4-Pillar), and GOTS organic certifications. We strictly maintain clean working conditions, fair wages, safety protocols, and environment-friendly processing."
  },
  {
    id: 5,
    question: "What are your shipping methods and timelines?",
    answer: "For express shipments (samples and time-critical team kit orders), we offer direct air cargo delivery to the USA, Canada, and Europe in 5 to 7 business days. For bulk mass production runs, we handle sea freight logistics directly to your distribution warehouses."
  },
  {
    id: 6,
    question: "What payment terms do you support for B2B?",
    answer: "Our standard term is a 50% deposit to initiate yarn sourcing and CAD development, with the remaining 50% balance due upon inspection clearance right before cargo shipping. We support wire transfers, L/C, and major credit cards."
  }
];

function FAQCard({ faq, isOpen, onToggle }) {
  return (
    <div 
      className={`rounded-lg transition-all duration-300 border text-left overflow-hidden ${
        isOpen 
          ? 'bg-white border-neutral-300 shadow-md translate-x-1' 
          : 'bg-[#fcfcfc] border-neutral-100/70 hover:border-neutral-200 hover:bg-white shadow-sm hover:shadow-md'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left p-6 gap-4 cursor-pointer group"
      >
        <span className={`text-xs sm:text-sm font-black uppercase tracking-wide transition-colors ${
          isOpen ? 'text-black' : 'text-neutral-800 group-hover:text-black'
        }`}>
          {faq.question}
        </span>
        
        {/* Toggle Icon container */}
        <span className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          isOpen ? 'bg-black text-white rotate-45' : 'bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200'
        }`}>
          <Plus className="h-4 w-4" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-1 text-[11px] sm:text-xs text-neutral-500 font-light leading-relaxed border-t border-neutral-50">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState(1);

  return (
    <section className="py-24 bg-[#f9fafb] text-black border-b border-neutral-200 relative overflow-hidden">
      
      {/* Ambient background soft light */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-neutral-100 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start max-w-7xl mx-auto">
          
          {/* LEFT: Section Description & Integrated CTA Box */}
          <div className="lg:col-span-5 text-left lg:sticky lg:top-24 space-y-8">
            <div>
              <AnimatedSection direction="up" delay={0.05}>
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
                  Frequently Asked Questions
                </span>
              </AnimatedSection>
              <AnimatedSection direction="up" delay={0.1}>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase leading-tight">
                  PRODUCTION & SHIPPING HELP
                </h2>
              </AnimatedSection>
              <AnimatedSection direction="up" delay={0.15}>
                <div className="h-0.5 w-12 bg-black mt-4"></div>
              </AnimatedSection>
            </div>
            
            <AnimatedSection direction="up" delay={0.2} className="space-y-6">
              <p className="text-neutral-500 text-sm font-light leading-relaxed max-w-md">
                Explore our detailed B2B specifications, or start your manufacturing inquiry right away with our customer service desk.
              </p>
              
              {/* Integrated High-End CTA Panel */}
              <div className="bg-white rounded-lg p-6 sm:p-8 border border-neutral-150 shadow-md space-y-6 max-w-md relative overflow-hidden group">
                {/* Visual Top Highlight bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-black" />

                <div>
                  <h3 className="text-sm font-black text-black uppercase tracking-wider mb-2">
                    Ready to Start Your Program?
                  </h3>
                  <p className="text-neutral-450 text-[11px] font-light leading-relaxed">
                    Submit your sportswear tech pack details. Our sales office answers all quote estimates within 12 business hours.
                  </p>
                </div>

                {/* Trust mini indicators */}
                <div className="grid grid-cols-2 gap-y-2.5 border-t border-neutral-100 pt-4 text-neutral-800">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wide">
                    <CheckCircle2 className="h-3.5 w-3.5 text-black flex-shrink-0" />
                    <span>50-Unit MOQs</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wide">
                    <CheckCircle2 className="h-3.5 w-3.5 text-black flex-shrink-0" />
                    <span>72hr Samples</span>
                  </div>
                </div>

                {/* CTA Action Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <Link href="/inquiry" className="w-full">
                    <button className="w-full inline-flex items-center justify-center text-[10px] font-extrabold uppercase tracking-widest text-white bg-black hover:bg-neutral-900 rounded-lg py-3.5 transition-all duration-300 gap-2 cursor-pointer shadow-sm hover:shadow-md border-none">
                      <span>Start Your Inquiry</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </Link>
                  <Link href="/contact" className="w-full">
                    <button className="w-full inline-flex items-center justify-center text-[10px] font-extrabold uppercase tracking-widest text-black bg-neutral-50 hover:bg-neutral-100 rounded-lg py-3.5 transition-all duration-300 gap-2 cursor-pointer border border-neutral-200/50 shadow-none">
                      <span>Contact Sales Desk</span>
                    </button>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* RIGHT: Individual FAQ cards */}
          <div className="lg:col-span-7 space-y-4 w-full">
            {FAQS.map((faq) => (
              <FAQCard 
                key={faq.id} 
                faq={faq} 
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
