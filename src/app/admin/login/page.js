'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Mail, Loader2, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Successful login: push user to dashboard
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-row bg-black font-sans selection:bg-neutral-800">

      {/* ── LEFT COLUMN: Brand Panel ─────────────────────────────────── */}
      <div className="hidden lg:flex flex-col flex-1 relative bg-black border-r border-neutral-900 overflow-hidden">
        {/* Subtle ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px]" />
        </div>

        {/* Centered brand lockup */}
        <div className="flex-1 flex flex-col items-center justify-center px-16 relative z-10">
          <p className="text-8xl font-black text-neutral-900 tracking-tighter leading-none select-none">
            ABI
          </p>
          <p className="mt-3 text-xs tracking-[0.5em] text-neutral-800 font-bold uppercase select-none">
            SPORTS
          </p>
          <div className="mt-6 w-16 border-t border-neutral-900" />
          <p className="mt-4 text-[10px] text-neutral-700 tracking-widest uppercase font-semibold select-none text-center">
            Manufacturer Management Portal
          </p>
        </div>

        {/* Bottom secure badge */}
        <div className="p-8 flex items-center gap-2 justify-center">
          <Shield className="h-3 w-3 text-neutral-700" />
          <span className="text-[9px] text-neutral-700 font-bold uppercase tracking-widest">
            Secure Admin Access
          </span>
        </div>
      </div>

      {/* ── RIGHT COLUMN: Login Form ─────────────────────────────────── */}
      <div className="w-full lg:w-[440px] flex-shrink-0 flex flex-col justify-center bg-neutral-950 px-10 lg:px-16 py-16 relative">

        {/* Top-left logo mark */}
        <div className="absolute top-8 left-10 lg:left-16">
          <div className="h-9 w-9 bg-white text-black rounded-xl flex items-center justify-center shadow-sm">
            <Shield className="h-4 w-4" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full"
        >
          {/* Heading */}
          <h1 className="text-2xl font-black text-white tracking-tight mt-8">
            Sign In
          </h1>
          <p className="text-xs text-neutral-500 mt-2 mb-8 leading-relaxed">
            Access the ABI Sports administration portal
          </p>

          {/* Error alert */}
          <AnimatePresence>
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="mb-6 flex items-center gap-3 bg-red-950/20 border border-red-900/30 rounded-xl px-4 py-3"
              >
                <AlertCircle className="h-3.5 w-3.5 text-red-500 flex-shrink-0" />
                <span className="text-[11px] font-bold text-red-400 leading-snug">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-600 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@abisportswear.com"
                  className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg py-3.5 pl-10 pr-4 text-xs text-white placeholder-neutral-600 outline-none transition-colors"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-600 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg py-3.5 pl-10 pr-4 text-xs text-white placeholder-neutral-600 outline-none transition-colors"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-white hover:bg-neutral-100 disabled:bg-neutral-900 text-black disabled:text-neutral-600 font-black text-[10px] uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Authenticating</span>
                </>
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-[8px] text-neutral-700 uppercase tracking-widest font-bold text-center">
            Protected by ABI Sports Security · 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
}
