'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

function Counter({ from, to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(from, to, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setCount(Math.floor(v)),
    });
    return () => ctrl.stop();
  }, [inView, from, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const STATS = [
  { from: 0, to: 500,  suffix: '+',  label: 'Collections Delivered' },
  { from: 0, to: 60,   suffix: '+',  label: 'Countries Served' },
  { from: 0, to: 20,   suffix: '+',  label: 'Years of Expertise' },
  { from: 0, to: 250,  suffix: '+',  label: 'Brands Partnered' },
];

export default function PortfolioStats() {
  return (
    <section className="py-6 sm:py-8 bg-black border-b border-neutral-900 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          {STATS.map((s, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none font-sans">
                  <Counter from={s.from} to={s.to} suffix={s.suffix} />
                </span>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1.5">
                  {s.label}
                </span>
              </div>
              {i < STATS.length - 1 && (
                <div className="hidden md:block h-6 w-px bg-neutral-800" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
