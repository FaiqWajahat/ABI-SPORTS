'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Award, Leaf, Zap, Globe, Clock } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animations';

const CERTS = [
  { icon: ShieldCheck, label: 'WRAP Platinum', sub: 'Worldwide Responsible Accredited Production' },
  { icon: Award,       label: 'SEDEX SMETA',   sub: '4-Pillar Ethical Trade Audit Certified' },
  { icon: Leaf,        label: 'GOTS Organic',  sub: 'Global Organic Textile Standard' },
  { icon: ShieldCheck, label: 'Oeko-Tex 100',  sub: 'Tested for Harmful Substances' },
  { icon: Zap,         label: 'ISO 9001:2015', sub: 'Quality Management System' },
  { icon: Globe,       label: 'Bluesign®',     sub: 'Sustainable Textile Processing' },
];

const ADVANTAGES = [
  { num: '01', title: 'Vertical Integration', desc: 'From raw yarn sourcing to finished export carton — every process happens under one roof in Sialkot, eliminating third-party delays and quality gaps.' },
  { num: '02', title: 'In-House R&D Lab', desc: 'Our fabric testing lab runs GSM, pilling, tensile, and wash-fastness tests in-house before any material reaches the cutting floor.' },
  { num: '03', title: '72-Hour Sampling', desc: 'Dedicated rapid-sample teams produce physical fit samples from your tech pack within 72 business hours, including courier dispatch.' },
  { num: '04', title: 'Low MOQ Access', desc: 'Emerging brands can start at 50 units per style/colourway. We scale seamlessly from small runs to mass production of millions of units.' },
];

function CertCard({ cert, idx }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = cert.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: idx * 0.07 }}
      className="flex items-start gap-4 bg-white border border-neutral-200 rounded-xl p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="h-10 w-10 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center flex-shrink-0 group-hover:bg-black group-hover:border-black transition-all duration-300">
        <Icon className="h-4.5 w-4.5 text-neutral-500 group-hover:text-white transition-colors duration-300" style={{ height: 18, width: 18 }} />
      </div>
      <div>
        <h4 className="text-xs font-black text-black uppercase tracking-wider mb-0.5">{cert.label}</h4>
        <p className="text-[9px] font-medium text-neutral-400 leading-snug">{cert.sub}</p>
      </div>
    </motion.div>
  );
}

export default function CertificationsAndEdge() {
  return (
    <section className="py-24 bg-[#f9fafb] text-black border-b border-neutral-200 relative overflow-hidden">

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)', backgroundSize: '48px 48px' }}
      />

      <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">

        {/* Top split: heading left, intro right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 max-w-6xl mx-auto items-end">
          <div>
            <AnimatedSection direction="up" delay={0.05}>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-3">Compliance & Accreditation</span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase leading-tight">
                CERTIFICATIONS<br />& COMPLIANCE
              </h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.14}>
              <div className="h-0.5 w-12 bg-black mt-5" />
            </AnimatedSection>
          </div>
          <AnimatedSection direction="up" delay={0.18}>
            <p className="text-neutral-500 text-sm font-light leading-relaxed max-w-md">
              Every production facility at Al Badar Impex holds internationally recognised certifications across social compliance, chemical safety, organic processing, and quality management.
            </p>
          </AnimatedSection>
        </div>

        {/* Certifications grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto mb-24">
          {CERTS.map((cert, idx) => (
            <CertCard key={idx} cert={cert} idx={idx} />
          ))}
        </div>

        {/* Divider */}
        <div className="max-w-6xl mx-auto border-t border-neutral-200 mb-24" />

        {/* Why Al Badar Impex advantages */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedSection direction="up" delay={0.05}>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-3">Competitive Advantages</span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">WHY AL BADAR IMPEX?</h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.14}>
              <div className="h-0.5 w-12 bg-black mx-auto mt-5" />
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-neutral-200 rounded-2xl overflow-hidden">
            {ADVANTAGES.map((adv, idx) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: true, margin: '-40px' });
              const isRight = idx % 2 === 1;
              const isBottom = idx >= 2;
              return (
                <motion.div
                  key={adv.num}
                  ref={ref}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
                  className={`p-8 sm:p-10 bg-white hover:bg-neutral-50 transition-colors duration-300 group
                    ${isRight ? '' : 'border-r border-neutral-200'}
                    ${isBottom ? '' : 'border-b border-neutral-200'}
                  `}
                >
                  <span className="text-[10px] font-black text-neutral-200 font-mono block mb-4 group-hover:text-neutral-400 transition-colors duration-300">{adv.num}</span>
                  <h3 className="text-sm font-black text-black uppercase tracking-wider mb-3">{adv.title}</h3>
                  <p className="text-neutral-500 text-xs font-light leading-relaxed">{adv.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
