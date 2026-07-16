'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, X, CheckCircle2 } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animations';

const FILTERS = ['All', 'Team Kits', 'Activewear', 'Training Wear', 'Outerwear'];

const ITEMS = [
  {
    id: 1, title: 'Europa FC — Match Kit',
    category: 'Team Kits', image: '/active-wear.png', tag: '2024 Season',
    desc: 'Full home/away/third kit program. Allover sublimation, flatlock seaming, player name heat transfer, and RFID badge integration.',
    specs: ['MOQ: 500 units', 'Lead Time: 28 days', '160gsm Performance Polyester', 'WRAP Certified Production'],
    col: 'lg:col-span-7', h: 'h-[400px]',
  },
  {
    id: 2, title: 'Aura — Performance Tee',
    category: 'Activewear', image: '/team-wear.png', tag: 'Private Label',
    desc: 'Moisture-wicking performance tee with 4-way stretch Lycra side panels and bonded silicone logo print.',
    specs: ['MOQ: 200 units', 'Lead Time: 21 days', '140gsm rPET Fabric', 'Oeko-Tex 100 Certified'],
    col: 'lg:col-span-5', h: 'h-[400px]',
  },
  {
    id: 3, title: 'Titan — Training Set',
    category: 'Training Wear', image: '/team-wear.png', tag: 'Club Program',
    desc: 'Full training kit: sublimated top, shorts, and tracksuit with laser-cut mesh ventilation panels.',
    specs: ['MOQ: 100 units', 'Lead Time: 24 days', '180gsm Interlock', 'Anti-odour treatment'],
    col: 'lg:col-span-4', h: 'h-[320px]',
  },
  {
    id: 4, title: 'Peak — Compression Tights',
    category: 'Activewear', image: '/active-wear.png', tag: 'Performance',
    desc: 'High-compression Nylon-Lycra tights with gradient sublimation and silicone leg-grip waistband.',
    specs: ['MOQ: 150 units', 'Lead Time: 18 days', '200gsm Lycra', 'Chlorine resistant'],
    col: 'lg:col-span-4', h: 'h-[320px]',
  },
  {
    id: 5, title: 'Nordiq — Winter Shell',
    category: 'Outerwear', image: '/hero.png', tag: 'Cold Weather',
    desc: '3-layer waterproof laminate shell jacket with taped seams, packable hood and laser-bonded construction.',
    specs: ['MOQ: 80 units', 'Lead Time: 35 days', '110gsm Shell Laminate', '10K waterproof rating'],
    col: 'lg:col-span-4', h: 'h-[320px]',
  },
  {
    id: 6, title: 'Iron Club — Gym Wear',
    category: 'Activewear', image: '/active-wear.png', tag: 'Gym Collection',
    desc: 'Premium gym range — tank, shorts, hoodie. Seamless-look flatlock construction with rubber-print branding.',
    specs: ['MOQ: 150 units', 'Lead Time: 22 days', '220gsm Brushed Terry', 'Anti-static finish'],
    col: 'lg:col-span-6', h: 'h-[360px]',
  },
  {
    id: 7, title: 'Storm — Packable Jacket',
    category: 'Outerwear', image: '/team-wear.png', tag: 'Wind-Proof',
    desc: 'Ultra-lightweight packable wind jacket with DWR coating, reflective print, and internal stuffsack.',
    specs: ['MOQ: 60 units', 'Lead Time: 28 days', '90gsm Ripstop Nylon', 'DWR water repellent'],
    col: 'lg:col-span-6', h: 'h-[360px]',
  },
];

function ProjectCard({ item, onOpen }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onOpen(item)}
      className={`relative rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 group cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-500 ${item.col} ${item.h}`}
    >
      <Image
        src={item.image} alt={item.title} fill sizes="50vw"
        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Tag */}
      <div className="absolute top-4 left-4">
        <span className="text-[7.5px] font-extrabold uppercase tracking-widest text-white bg-white/15 backdrop-blur-sm border border-white/15 px-2.5 py-1 rounded-full">
          {item.tag}
        </span>
      </div>

      {/* Expand icon on hover */}
      <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-md">
        <ArrowUpRight className="h-3.5 w-3.5 text-black" />
      </div>

      {/* Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-500 block mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {item.category}
        </span>
        <h3 className="text-sm font-black text-white uppercase tracking-wide leading-tight">
          {item.title}
        </h3>
      </div>
    </motion.div>
  );
}

function ProjectModal({ item, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg overflow-hidden max-w-2xl w-full shadow-2xl border border-neutral-200"
      >
        {/* Image */}
        <div className="relative h-64 sm:h-72 w-full bg-neutral-100">
          <Image src={item.image} alt={item.title} fill className="object-cover" sizes="700px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/60 border border-neutral-700 flex items-center justify-center text-white hover:bg-black transition-colors cursor-pointer">
            <X className="h-3.5 w-3.5" />
          </button>
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-black" />
          <div className="absolute bottom-5 left-6">
            <span className="text-[7.5px] font-extrabold uppercase tracking-widest text-neutral-400 font-mono block mb-1">
              {item.category} — {item.tag}
            </span>
            <h3 className="text-base font-black text-white uppercase tracking-wider">{item.title}</h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed">{item.desc}</p>
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-neutral-100">
            {item.specs.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-black flex-shrink-0" />
                <span className="text-[10px] font-bold text-neutral-700 uppercase tracking-wide">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioGrid() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const visible = filter === 'All' ? ITEMS : ITEMS.filter(i => i.category === filter);

  return (
    <section className="py-24 bg-white text-black border-b border-neutral-200 relative overflow-hidden">

      <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6 max-w-6xl mx-auto">
          <div>
            <AnimatedSection direction="up" delay={0.05}>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">Selected Works</span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">PORTFOLIO GALLERY</h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.14}>
              <div className="h-0.5 w-12 bg-black mt-4" />
            </AnimatedSection>
          </div>

          {/* Filter pills — same style as site buttons */}
          <AnimatedSection direction="up" delay={0.18}>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-[8px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                    filter === f
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400 hover:text-black'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-5 max-w-6xl mx-auto"
          >
            {visible.map((item) => (
              <ProjectCard key={item.id} item={item} onOpen={setSelected} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Count */}
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-400 font-mono">
            {visible.length} projects · Click any card for details
          </span>
          <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-400 font-mono">
            ABI SPORTS MFG. — Sialkot, Pakistan
          </span>
        </div>

      </div>

      <AnimatePresence>
        {selected && <ProjectModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
