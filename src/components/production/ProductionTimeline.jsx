'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const STEPS = [
  {
    id: '01',
    label: 'Tech Pack Review',
    day: 'Day 1',
    time: '4–6 hrs',
    image: '/active-wear.png',
    description:
      'Spec sheets, vector artwork, and size grading are checked for production compatibility before any material is cut.',
    specs: ['Vector outline scaling', 'Colour code verification', 'Grading chart review'],
  },
  {
    id: '02',
    label: 'Fabric Sourcing',
    day: 'Day 1–3',
    time: '2–3 days',
    image: '/team-wear.png',
    description:
      'Performance yarns are sourced and lab-tested for weight, shrinkage, and colour fastness before cutting begins.',
    specs: ['GSM density check', 'Shrinkage tolerance test', 'Dye lot matching'],
  },
  {
    id: '03',
    label: 'CAD Cutting',
    day: 'Day 4',
    time: '6–8 hrs',
    image: '/active-wear.png',
    description:
      'Digitised grading files are laser-cut across every ply, holding pattern variance to zero.',
    specs: ['Laser cutter mapping', 'Layer stack balancing', 'Panel tag labelling'],
  },
  {
    id: '04',
    label: 'Sublimation',
    day: 'Day 4–5',
    time: '1–2 days',
    image: '/team-wear.png',
    description:
      'Graphics are heat-pressed into the polyester fibre at 200°C, locking colour in permanently.',
    specs: ['Sublimation ink validation', 'Lightbox shade match', 'Bleed boundary control'],
  },
  {
    id: '05',
    label: 'Stitching',
    day: 'Day 5–8',
    time: '3–4 days',
    image: '/active-wear.png',
    description:
      '4-needle, 6-thread flatlock seams join every panel to a zero-ridge finish built for competition.',
    specs: ['12–14 SPI target', 'Stretch load testing', 'Thread trim inspection'],
  },
  {
    id: '06',
    label: 'QA & Packing',
    day: 'Day 9–10',
    time: '1–2 days',
    image: '/team-wear.png',
    description:
      'Every garment is metal-detected, barcoded, and sealed in anti-humidity packaging for export.',
    specs: ['100% metal detection', 'Barcode SKU mapping', 'Export weight audit'],
  },
];

/* ─────────────────────────────────────────────────────────────
   STEP NUMBER + CONNECTOR (shared desktop / mobile)
───────────────────────────────────────────────────────────── */
function StepMarker({ isActive, isPast, id, isLast, orientation }) {
  const line =
    orientation === 'horizontal'
      ? 'h-px flex-grow mx-2'
      : 'w-px flex-grow my-2 mx-auto';

  return (
    <div className={orientation === 'horizontal' ? 'flex items-center flex-grow' : 'flex flex-col items-center'}>
      <span
        className={`flex items-center justify-center flex-shrink-0 rounded-full border font-mono text-[11px] font-semibold transition-colors duration-300 ${
          isActive
            ? 'h-8 w-8 border-white bg-white text-black'
            : isPast
            ? 'h-8 w-8 border-white/25 text-white/50'
            : 'h-8 w-8 border-white/10 text-white/25'
        }`}
      >
        {id}
      </span>
      {!isLast && (
        <span
          className={line}
          style={{
            backgroundImage:
              'repeating-linear-gradient(' +
              (orientation === 'horizontal' ? '90deg' : '180deg') +
              ', currentColor 0, currentColor 3px, transparent 3px, transparent 7px)',
            color: isPast ? '#FFFFFF' : 'rgba(255,255,255,0.12)',
          }}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DESKTOP — horizontal stepper, single detail panel below
───────────────────────────────────────────────────────────── */
function DesktopProcess() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <div className="hidden lg:block">
      {/* Stepper row */}
      <div className="flex items-center mb-16">
        {STEPS.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setActive(idx)}
            className="flex items-center flex-grow group"
            aria-current={idx === active}
          >
            <StepMarker
              id={s.id}
              isActive={idx === active}
              isPast={idx < active}
              isLast={idx === STEPS.length - 1}
              orientation="horizontal"
            />
          </button>
        ))}
      </div>

      {/* Labels row, aligned under markers */}
      <div className="flex mb-20 -mt-12">
        {STEPS.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setActive(idx)}
            className="flex-grow text-left pr-6"
          >
            <span
              className={`block text-xs font-medium uppercase tracking-wide transition-colors duration-300 ${
                idx === active ? 'text-white' : 'text-white/35 hover:text-white/60'
              }`}
            >
              {s.label}
            </span>
            <span className="block text-[11px] font-mono text-white/25 mt-1">{s.day}</span>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="grid grid-cols-12 gap-12 items-start"
        >
          <div className="col-span-7">
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/60">
              Step {step.id} — {step.time}
            </span>
            <h3 className="text-3xl font-semibold text-white mt-3 mb-5 tracking-tight">
              {step.label}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-md mb-8">
              {step.description}
            </p>
            <ul className="space-y-2.5">
              {step.specs.map((spec) => (
                <li key={spec} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="h-1 w-1 rounded-full bg-white flex-shrink-0" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-5 relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10">
            <Image
              src={step.image}
              alt={step.label}
              fill
              sizes="(min-width: 1024px) 35vw, 90vw"
              className="object-cover"
              priority={active === 0}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MOBILE — vertical, always expanded
───────────────────────────────────────────────────────────── */
function MobileProcess() {
  return (
    <div className="lg:hidden space-y-0">
      {STEPS.map((s, idx) => (
        <div key={s.id} className="flex gap-5">
          <StepMarker
            id={s.id}
            isActive={false}
            isPast={idx > 0}
            isLast={idx === STEPS.length - 1}
            orientation="vertical"
          />
          <div className="flex-grow pb-12">
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/60">
              {s.day} — {s.time}
            </span>
            <h3 className="text-xl font-semibold text-white mt-2 mb-3 tracking-tight">
              {s.label}
            </h3>
            <div className="relative aspect-video w-full rounded-sm overflow-hidden border border-white/10 mb-4">
              <Image src={s.image} alt={s.label} fill sizes="90vw" className="object-cover" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4">{s.description}</p>
            <ul className="space-y-2">
              {s.specs.map((spec) => (
                <li key={spec} className="flex items-center gap-3 text-xs text-white/60">
                  <span className="h-1 w-1 rounded-full bg-white flex-shrink-0" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ROOT EXPORT
───────────────────────────────────────────────────────────── */
export default function ProcessSection() {
  return (
    <section className="bg-[#0A0A0A] text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
        {/* Header */}
        <div className="mb-20 max-w-lg">
          <span className="text-xs font-mono uppercase tracking-widest text-white/60">
            Manufacturing Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mt-4">
            From tech pack to shipment.
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mt-4">
            Six stages, ten working days. Every uniform passes through the same
            controlled sequence, start to finish.
          </p>
        </div>

        <DesktopProcess />
        <MobileProcess />
      </div>
    </section>
  );
}