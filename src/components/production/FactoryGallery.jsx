'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Camera, ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animations';

const GALLERY_ITEMS = [
  {
    id: '01',
    image: '/active-wear.png',
    label: 'Laser Cut Layout Table',
    tag: 'Automated Cutting',
    specs: 'German CNC Cutters',
    description: 'Sub-millimeter precision CAD cutters eliminating fabric variance across all pattern grades.',
    col: 'lg:col-span-7',
    rowH: 'h-[380px]',
  },
  {
    id: '02',
    image: '/team-wear.png',
    label: 'Embroidery Control Suite',
    tag: 'Tajima Systems',
    specs: 'Multi-Head Stitching',
    description: 'Japanese Tajima multi-head embroidery systems for ultra-dense satin stitch badge work.',
    col: 'lg:col-span-5',
    rowH: 'h-[380px]',
  },
  {
    id: '03',
    image: '/active-wear.png',
    label: 'Dye Sublimation Press',
    tag: 'Heat Press Loop',
    specs: '200°C Heat Curing',
    description: 'Italian calendar heat-press systems locking vivid colour permanently into polyester fibres.',
    col: 'lg:col-span-4',
    rowH: 'h-[300px]',
  },
  {
    id: '04',
    image: '/team-wear.png',
    label: 'Flatlock Stitching Bay',
    tag: 'Yamato Stitchers',
    specs: '4-Needle Flat Seaming',
    description: 'Yamato industrial flatlock lines producing zero-ridge seams for performance athleticwear.',
    col: 'lg:col-span-4',
    rowH: 'h-[300px]',
  },
  {
    id: '05',
    image: '/active-wear.png',
    label: 'Quality Control Audits',
    tag: 'Final Inspection',
    specs: '100% Manual Inspections',
    description: 'Every finished garment passes ISO-standard thread, metal-detector, and barcode audits.',
    col: 'lg:col-span-4',
    rowH: 'h-[300px]',
  },
];

function GalleryCard({ item, idx, onOpen }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
      onClick={() => onOpen(idx)}
      className={`relative rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 group cursor-pointer ${item.col} ${item.rowH}`}
    >
      {/* Image */}
      <Image
        src={item.image}
        alt={item.label}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-center opacity-50 group-hover:opacity-80 group-hover:scale-[1.04] transition-all duration-700 ease-out"
      />

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Hover overlay tint */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top row */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <span className="text-[7px] font-extrabold uppercase tracking-[0.18em] text-white/80 bg-white/10 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-full">
          {item.tag}
        </span>
        <span className="text-[10px] font-black text-white/20 group-hover:text-white/60 font-mono transition-colors duration-500">
          {item.id}
        </span>
      </div>

      {/* Bottom content — always visible label, hover reveals arrow */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {/* Spec line — slides up on hover */}
        <motion.p
          className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-500 font-mono mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        >
          {item.specs}
        </motion.p>

        <div className="flex items-end justify-between gap-2">
          <h3 className="text-sm font-black text-white uppercase tracking-wider leading-tight">
            {item.label}
          </h3>
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
            <ArrowUpRight className="h-3.5 w-3.5 text-black" />
          </div>
        </div>
      </div>

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-1 ring-white/20 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
}

function Lightbox({ items, startIdx, onClose }) {
  const [current, setCurrent] = useState(startIdx);
  const item = items[current];

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  // Keyboard navigation
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex flex-col"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          <Camera className="h-4 w-4 text-neutral-500" />
          <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-500 font-mono">
            Factory Floor — {item.id} / 0{items.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="h-8 w-8 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Main image area */}
      <div className="flex-grow relative flex items-center justify-center px-20 py-8 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-4xl h-full rounded-xl overflow-hidden border border-neutral-800"
          >
            <Image src={item.image} alt={item.label} fill className="object-cover object-center" sizes="90vw" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-7 right-7">
              <span className="text-[7px] font-extrabold uppercase tracking-widest text-neutral-400 font-mono block mb-1">{item.specs}</span>
              <h3 className="text-base font-black text-white uppercase tracking-wider">{item.label}</h3>
              <p className="text-xs text-neutral-400 font-light mt-1 max-w-lg">{item.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrow buttons */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="flex-shrink-0 border-t border-neutral-800 px-6 py-4 flex items-center justify-center gap-3 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
        {items.map((thumb, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative h-14 w-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-300 ${
              i === current ? 'border-white opacity-100' : 'border-transparent opacity-40 hover:opacity-70'
            }`}
          >
            <Image src={thumb.image} alt={thumb.label} fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default function FactoryGallery() {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  return (
    <section className="py-24 bg-black text-white border-b border-neutral-900 relative overflow-hidden">

      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: '72px 72px'
        }}
      />

      <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 max-w-6xl mx-auto">
          <div>
            <AnimatedSection direction="up" delay={0.05}>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
                Inside Our Sialkot Plant
              </span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
                FACTORY FLOOR LOOKBOOK
              </h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.14}>
              <div className="h-0.5 w-12 bg-white mt-4" />
            </AnimatedSection>
          </div>

          <AnimatedSection direction="up" delay={0.18}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 border border-neutral-800 bg-neutral-950 px-3.5 py-2 rounded-lg text-neutral-400">
                <Camera className="h-3.5 w-3.5" />
                <span className="text-[8px] font-black uppercase tracking-widest font-mono">
                  Verified Plant Photos
                </span>
              </div>
              <div className="flex items-center gap-2 border border-neutral-800 bg-neutral-950 px-3.5 py-2 rounded-lg text-neutral-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                <span className="text-[8px] font-black uppercase tracking-widest font-mono">
                  Click to Expand
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 max-w-6xl mx-auto">
          {GALLERY_ITEMS.map((item, idx) => (
            <GalleryCard
              key={item.id}
              item={item}
              idx={idx}
              onOpen={(i) => setLightboxIdx(i)}
            />
          ))}
        </div>

        {/* Caption footer */}
        <AnimatedSection direction="up" delay={0.2}>
          <div className="max-w-6xl mx-auto mt-8 flex items-center justify-between border-t border-neutral-900 pt-6">
            <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-700 font-mono">
              {GALLERY_ITEMS.length} Verified Production Zones — Sialkot, Pakistan
            </span>
            <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-700 font-mono">
              ABI SPORTS MFG. — EST. 2004
            </span>
          </div>
        </AnimatedSection>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            items={GALLERY_ITEMS}
            startIdx={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
          />
        )}
      </AnimatePresence>

    </section>
  );
}
