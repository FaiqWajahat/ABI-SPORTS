'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

function Counter({ from, to, duration = 1.5, suffix = "" }) {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-40px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (value) => {
          setCount(Math.floor(value));
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, duration]);

  return (
    <span ref={nodeRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-6 sm:py-8 bg-black border-b border-neutral-900 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          
          {/* Stat 1: Years */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none font-sans">
              <Counter from={0} to={15} suffix="+" />
            </span>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1.5">
              Years Sourcing & Mfg.
            </span>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-6 w-px bg-neutral-800"></div>

          {/* Stat 2: Brands */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none font-sans">
              <Counter from={0} to={250} suffix="+" />
            </span>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1.5">
              Global Brands Served
            </span>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-6 w-px bg-neutral-800"></div>

          {/* Stat 3: Countries */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none font-sans">
              <Counter from={0} to={45} suffix="+" />
            </span>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1.5">
              Countries Shipped
            </span>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-6 w-px bg-neutral-800"></div>

          {/* Stat 4: Employees */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none font-sans">
              <Counter from={0} to={650} suffix="+" />
            </span>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1.5">
              Factory Employees
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
