'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, ArrowRight, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animations';

const MEMBERS = [
  {
    id: 0,
    name: "Muhammad Tariq",
    role: "Chief Executive Officer",
    bio: "Over 35 years of experience in textile management. Led the transition of ABI Sports to a vertically integrated plant, establishing our global export infrastructure.",
    email: "tariq@abisportswear.com",
    department: "Executive Board",
    image: "/active-wear.png"
  },
  {
    id: 1,
    name: "Faisal Tariq",
    role: "Managing Director",
    bio: "Manages global corporate accounts and logistics partnerships across North America and European distribution hubs, ensuring seamless custom clearances.",
    email: "faisal@abisportswear.com",
    department: "Global Sales",
    image: "/team-wear.png"
  },
  {
    id: 2,
    name: "Zahid Ahmed",
    role: "Production & Stitching Head",
    bio: "Controls operational flow across sewing floors. Expert in flatlock construction patterns, line balancing, and automated CAD pattern cutters.",
    email: "zahid@abisportswear.com",
    department: "Operations Plant",
    image: "/active-wear.png"
  },
  {
    id: 3,
    name: "Khurram Shahzad",
    role: "Director of Quality Control",
    bio: "Spearheads quality checklists and ISO standards. Manages annual Smeta and WRAP ethical factory inspection logs.",
    email: "khurram@abisportswear.com",
    department: "Compliance Desk",
    image: "/team-wear.png"
  }
];

export default function Leadership() {
  const [activeLeader, setActiveLeader] = useState(0);
  const active = MEMBERS[activeLeader];

  return (
    <section className="py-24 bg-black text-white border-b border-neutral-900 relative overflow-hidden">

      {/* Subtle dot-grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />

      <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

        {/* Section Title */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
              Management & Operations Team
            </span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
              OUR LEADERSHIP
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <div className="h-0.5 w-12 bg-white mx-auto mt-4"></div>
          </AnimatedSection>
        </div>

        {/* Magazine split leader board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">

          {/* LEFT: Lookbook Profile Display Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLeader}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover object-center opacity-50 group-hover:opacity-60 group-hover:scale-104 transition-all duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                  <div className="absolute bottom-6 left-6 right-6 text-left space-y-2">
                    <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-500 bg-neutral-900/80 border border-neutral-800 px-2 py-0.5 rounded w-fit block">
                      {active.department}
                    </span>
                    <h3 className="text-base font-bold text-white uppercase tracking-wider">
                      {active.name}
                    </h3>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wide font-medium">
                      {active.role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Accordion Profile List */}
          <div className="lg:col-span-7 flex flex-col justify-center divide-y divide-neutral-900">
            {MEMBERS.map((member) => {
              const isActive = activeLeader === member.id;
              return (
                <div key={member.id} className="py-5 text-left">
                  <button
                    onClick={() => setActiveLeader(member.id)}
                    className="w-full flex justify-between items-center py-2 gap-4 cursor-pointer group"
                  >
                    <div>
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-600 block mb-0.5">
                        {member.role}
                      </span>
                      <span className={`text-base font-black uppercase tracking-wider transition-colors ${
                        isActive ? 'text-white' : 'text-neutral-600 group-hover:text-white'
                      }`}>
                        {member.name}
                      </span>
                    </div>
                    <span className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isActive ? 'bg-white text-black rotate-45' : 'bg-neutral-900 text-neutral-500 border border-neutral-800 group-hover:border-neutral-700'
                    }`}>
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 pb-2 space-y-4">
                          <p className="text-neutral-400 text-xs leading-relaxed font-light max-w-md">
                            {member.bio}
                          </p>
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors duration-300 w-fit"
                          >
                            <Mail className="h-3.5 w-3.5" />
                            <span className="text-[9px] font-extrabold uppercase tracking-widest font-mono">
                              {member.email}
                            </span>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
