'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Shirt, Send } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* ── Background CAD boundary grid elements (Premium Athletic Theme) ── */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
        {/* Sports field outline detail in background */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 border-4 border-dashed border-white rounded-full" />
      </div>

      {/* Subtle ambient light leak */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10 space-y-8">
        
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 font-mono block">
            Error Code 404
          </span>
          <h1 className="text-8xl sm:text-9xl font-black uppercase tracking-tighter text-white font-mono leading-none select-none">
            404
          </h1>
          <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-white">
            Page Out of Bounds
          </h2>
          <div className="h-[2px] w-12 bg-white mx-auto mt-4" />
        </motion.div>

        {/* Text Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed max-w-md mx-auto"
        >
          The page or technical brief you are trying to view does not exist, has been archived, or was moved outside our active routing directories.
        </motion.p>

        {/* Redirect Controls */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider text-black bg-white hover:bg-neutral-100 rounded-xl px-6 py-4 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            <Home className="h-4 w-4" />
            Go to Home
          </Link>

          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-850 rounded-xl px-6 py-4 transition-all duration-200 border border-neutral-800 cursor-pointer"
          >
            <Shirt className="h-4 w-4 text-neutral-450" />
            Browse Products
          </Link>

          <Link
            href="/inquiry"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider text-neutral-400 hover:text-white rounded-xl px-6 py-4 transition-all duration-200 cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            Get B2B Quote
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
