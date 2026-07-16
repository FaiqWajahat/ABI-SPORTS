'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MessageSquare, FileText, Phone } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animations';

const CONTACT_OPTIONS = [
  {
    icon: FileText,
    title: 'Submit a Tech Pack',
    desc: 'Upload your design files, size charts, and spec sheets. Our engineers review and respond within 12 hours.',
    cta: 'Start Inquiry',
    href: '/inquiry',
    primary: true,
  },
  {
    icon: MessageSquare,
    title: 'Talk to Our Sales Desk',
    desc: 'Speak directly with our B2B sales team about pricing, MOQs, lead times, and custom production capabilities.',
    cta: 'Contact Sales',
    href: '/contact',
    primary: false,
  },
  {
    icon: Phone,
    title: 'Book a Factory Audit',
    desc: 'Schedule an in-person or virtual audit of our Sialkot production facilities, including compliance walkthroughs.',
    cta: 'Request Audit',
    href: '/contact',
    primary: false,
  },
];

const TRUST_POINTS = [
  '50-unit MOQ — no heavy inventory risk',
  '72-hour physical sample turnaround',
  'WRAP Platinum & SEDEX certified facilities',
  'Direct air cargo delivery in 5–7 days',
  'Dedicated account manager assigned',
  '12-hour inquiry response guarantee',
];

export default function ProductionCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-24 bg-black text-white border-b border-neutral-900 relative overflow-hidden">

      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)', backgroundSize: '72px 72px' }}
      />

      {/* Big watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[18vw] font-black text-white/[0.025] uppercase tracking-tighter leading-none whitespace-nowrap">
          ABI SPORTS
        </span>
      </div>

      <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">

        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-3">
              Start Your Manufacturing Program
            </span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase leading-tight">
              READY TO BUILD<br />YOUR COLLECTION?
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <div className="h-0.5 w-12 bg-white mx-auto mt-6 mb-6" />
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.18}>
            <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-xl mx-auto">
              From a single sample to a 5-million unit annual program — our team is ready to scope, plan, and manufacture your sportswear line with zero compromise on quality.
            </p>
          </AnimatedSection>
        </div>

        {/* Contact option cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-20">
          {CONTACT_OPTIONS.map((opt, idx) => {
            const Icon = opt.icon;
            return (
              <motion.div
                key={idx}
                ref={idx === 0 ? ref : null}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
                className={`flex flex-col rounded-2xl border p-7 transition-all duration-300 group ${
                  opt.primary
                    ? 'bg-white border-white text-black'
                    : 'bg-neutral-950 border-neutral-800 text-white hover:border-neutral-600'
                }`}
              >
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-5 ${
                  opt.primary ? 'bg-black' : 'bg-neutral-900 border border-neutral-800 group-hover:border-neutral-600 transition-colors duration-300'
                }`}>
                  <Icon className={`h-4.5 w-4.5 ${opt.primary ? 'text-white' : 'text-neutral-400'}`} style={{ height: 18, width: 18 }} />
                </div>

                <h3 className={`text-sm font-black uppercase tracking-wider mb-2 ${opt.primary ? 'text-black' : 'text-white'}`}>
                  {opt.title}
                </h3>
                <p className={`text-xs font-light leading-relaxed flex-grow mb-6 ${opt.primary ? 'text-neutral-600' : 'text-neutral-500'}`}>
                  {opt.desc}
                </p>

                <Link href={opt.href}>
                  <div className={`inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-widest rounded-lg px-4 py-2.5 transition-all duration-300 cursor-pointer w-full justify-center ${
                    opt.primary
                      ? 'bg-black text-white hover:bg-neutral-800'
                      : 'bg-neutral-900 text-white border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800'
                  }`}>
                    {opt.cta}
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Trust strip */}
        <div className="max-w-5xl mx-auto border-t border-neutral-800 pt-10">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-600 block text-center mb-6">
              Why manufacturers choose ABI Sports
            </span>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {TRUST_POINTS.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-wider text-neutral-500"
              >
                <div className="h-1 w-1 rounded-full bg-neutral-600 flex-shrink-0" />
                {point}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
