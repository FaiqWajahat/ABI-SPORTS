import React from 'react';
import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-neutral-455 border-t border-neutral-900 relative overflow-hidden">
      {/* Background ambient texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)', backgroundSize: '48px 48px' }}
      />

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Column 1: About & Compliance Badges (2/5 width) */}
          <div className="lg:col-span-2 space-y-6 text-left">
            <Link href="/" className="inline-block">
              <span className="text-xl font-black tracking-tighter text-white uppercase font-sans">
                AL BADAR <span className="text-white opacity-80">IMPEX</span>
              </span>
            </Link>
            <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-sm">
              Al Badar Impex is a leading custom apparel manufacturer specializing in premium-quality Activewear, Swimwear, Teamwear, and Streetwear. We provide end-to-end manufacturing solutions, from design and fabric sourcing to printing, embroidery, and worldwide delivery.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              {['WRAP Certified', 'SEDEX Compliant', 'ISO 9001:2015'].map((badge) => (
                <span key={badge} className="text-[8px] bg-neutral-950 border border-neutral-800 text-neutral-400 font-extrabold tracking-widest px-3 py-1.5 rounded uppercase font-mono">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Active Wear Subcategories (1/5 width) */}
          <div className="lg:col-span-1 space-y-4 text-left">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white whitespace-nowrap">Active Wear</h3>
            <ul className="space-y-2.5 text-xs font-medium">
              {[
                { label: 'All Active Wear', href: '/products?category=active-wear' },
                { label: 'Gym Wear', href: '/products?category=active-wear&sub=gym-wear' },
                { label: 'Swim Wear', href: '/products?category=active-wear&sub=swim-wear' },
                { label: 'Running', href: '/products?category=active-wear&sub=running' },
                { label: 'Cycling', href: '/products?category=active-wear&sub=cycling' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-neutral-550 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Team Wear Subcategories (1/5 width) */}
          <div className="lg:col-span-1 space-y-4 text-left">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white whitespace-nowrap">Team Wear</h3>
            <ul className="space-y-2.5 text-xs font-medium">
              {[
                { label: 'All Team Wear', href: '/products?category=team-wear' },
                { label: 'Baseball', href: '/products?category=team-wear&sub=baseball' },
                { label: 'Basketball', href: '/products?category=team-wear&sub=basketball' },
                { label: 'Soccer / Football', href: '/products?category=team-wear&sub=soccer' },
                { label: 'American Football', href: '/products?category=team-wear&sub=american-football' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-neutral-550 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Global Offices (1/5 width) */}
          <div className="lg:col-span-1 space-y-4 text-left">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white whitespace-nowrap">Global Offices</h3>
            <ul className="space-y-4 text-[11px] sm:text-xs">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-neutral-350 uppercase tracking-wide">Head Office (Sialkot)</p>
                  <p className="text-neutral-500 font-light leading-relaxed mt-0.5">Next to Faisal Bank, Daska Road, Sialkot</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-neutral-350 uppercase tracking-wide">USA Office (NY)</p>
                  <p className="text-neutral-500 font-light leading-relaxed mt-0.5">369 N Niagara Ave, Lindenhurst, NY 11757</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-neutral-350 uppercase tracking-wide">Canada Office</p>
                  <p className="text-neutral-500 font-light leading-relaxed mt-0.5">3503 James Mowatt Trail SW, Apt 619</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-white flex-shrink-0" />
                <a href="mailto:orders@abisportswear.com" className="text-neutral-350 font-bold hover:text-white transition-colors">
                  orders@abisportswear.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright area */}
      <div className="border-t border-neutral-900 bg-black py-8 px-4 sm:px-6 lg:px-8 text-[10px] font-semibold uppercase tracking-wider text-neutral-600 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Al Badar Impex. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-neutral-400 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-neutral-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
