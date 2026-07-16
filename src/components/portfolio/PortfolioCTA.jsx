'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Package, Clock, ShieldCheck } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animations';

const DIVISIONS = [
  {
    division: 'Division 01',
    title: 'Team Kits',
    desc: 'Custom sublimated match kits, tournament uniforms, and club programs. Home, away, and third colourways with player personalisation and RFID integration.',
    image: '/active-wear.png',
    href: '/portfolio',
  },
  {
    division: 'Division 02',
    title: 'Activewear',
    desc: 'Private-label performance activewear — compression tights, training tops, gym wear, and cycling kits. Built from certified sustainable fabrics with 50-unit MOQs.',
    image: '/team-wear.png',
    href: '/portfolio',
  },
];

const STEPS = [
  { icon: Package,     num: '01', title: 'Submit Brief',      desc: 'Send your tech pack or sketches. We respond with a full production quote within 12 business hours.' },
  { icon: Clock,       num: '02', title: '72-hr Sample',      desc: 'A physical sample is produced and couriered to your door within 72 business hours of approval.' },
  { icon: ShieldCheck, num: '03', title: 'Full Production',   desc: 'Once you sign off on the sample, mass production begins with weekly progress updates.' },
];

export default function PortfolioCTA() {
  return (
    <>
      {/* ── Category showcase — matches Categories.jsx pattern exactly ── */}
      <section className="py-24 bg-black text-white border-b border-neutral-900 relative overflow-hidden">

        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-neutral-900/30 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-neutral-900/30 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center mb-20 max-w-2xl mx-auto">
            <AnimatedSection direction="up" delay={0.05}>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
                Our Product Divisions
              </span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
                EXPLORE BY CATEGORY
              </h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.15}>
              <div className="h-0.5 w-12 bg-white mx-auto mt-4" />
            </AnimatedSection>
          </div>

          <StaggerContainer delay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {DIVISIONS.map((item, i) => (
              <StaggerItem
                key={i}
                className="relative aspect-[3/4] rounded-lg overflow-hidden group shadow-md hover:shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              >
                <Link href={item.href} className="absolute inset-0 block">
                  <Image src={item.image} alt={item.title} fill sizes="40vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 z-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 z-10" />
                  <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end z-20 text-left">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400 mb-1.5 block">{item.division}</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider mb-3 leading-tight">{item.title}</h3>
                    <p className="text-neutral-400 text-[11px] leading-relaxed font-light mb-8 opacity-90">{item.desc}</p>
                    <div className="flex items-center space-x-1.5 text-[9px] font-extrabold uppercase tracking-widest text-white pt-4 border-t border-white/10">
                      <span>View Collection</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── How We Work process strip — white bg ── */}
      <section className="py-24 bg-[#f9fafb] text-black border-b border-neutral-200 relative overflow-hidden">
        <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

          <div className="text-center mb-16 max-w-2xl mx-auto">
            <AnimatedSection direction="up" delay={0.05}>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">Start a Project</span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">HOW WE WORK</h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.14}>
              <div className="h-0.5 w-12 bg-black mx-auto mt-4" />
            </AnimatedSection>
          </div>

          <StaggerContainer delay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={i} className="bg-white border border-neutral-200 rounded-lg p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 relative group">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-black rounded-t-lg" />
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-10 w-10 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-300">
                      <Icon className="h-4 w-4 text-neutral-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-[10px] font-black text-neutral-200 font-mono">{step.num}</span>
                  </div>
                  <h3 className="text-sm font-black text-black uppercase tracking-wider mb-2">{step.title}</h3>
                  <p className="text-neutral-500 text-xs font-light leading-relaxed">{step.desc}</p>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* CTA buttons */}
          <AnimatedSection direction="up" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-sm mx-auto">
              <Link href="/inquiry" className="flex-1">
                <div className="w-full inline-flex items-center justify-center gap-2 text-[9px] font-extrabold uppercase tracking-widest text-white bg-black hover:bg-neutral-800 rounded-lg px-6 py-3.5 transition-all duration-300 cursor-pointer">
                  Submit Your Brief
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
              <Link href="/contact" className="flex-1">
                <div className="w-full inline-flex items-center justify-center gap-2 text-[9px] font-extrabold uppercase tracking-widest text-black bg-white hover:bg-neutral-100 rounded-lg px-6 py-3.5 transition-all duration-300 cursor-pointer border border-neutral-200">
                  Contact Sales
                </div>
              </Link>
            </div>
          </AnimatedSection>

        </div>
      </section>
    </>
  );
}
