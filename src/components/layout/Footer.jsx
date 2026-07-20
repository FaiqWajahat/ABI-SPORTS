import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/ABIsportsgear',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/abi_sportswear_co?igsh=MWd5YnhkNm43cjdzcQ==',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'Pinterest',
    href: 'https://www.pinterest.com/abisports/',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/13390628/admin/page-posts/published/',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.239-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="bg-black text-neutral-455 border-t border-neutral-900 relative overflow-hidden">
      {/* Background ambient texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)', backgroundSize: '48px 48px' }}
      />

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Column 1: About & Compliance Badges & Social Links (2/5 width) */}
          <div className="lg:col-span-2 space-y-6 text-left">
            <Link href="/" className="inline-block">
              <span className="text-xl font-black tracking-tighter text-white uppercase font-sans">
                AL BADAR <span className="text-white opacity-80">IMPEX</span>
              </span>
            </Link>
            <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-sm">
              Al Badar Impex is a leading custom apparel manufacturer specializing in premium-quality Activewear, Swimwear, Teamwear, and Streetwear. We provide end-to-end manufacturing solutions, from design and fabric sourcing to printing, embroidery, and worldwide delivery.
            </p>
            <div className="pt-1 flex flex-wrap gap-2">
              {['WRAP Certified', 'SEDEX Compliant', 'ISO 9001:2015'].map((badge) => (
                <span key={badge} className="text-[8px] bg-neutral-950 border border-neutral-800 text-neutral-400 font-extrabold tracking-widest px-3 py-1.5 rounded uppercase font-mono">
                  {badge}
                </span>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 font-mono block mb-3">
                Connect With Us
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="h-9 w-9 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-900 flex items-center justify-center transition-all duration-200 shadow-sm"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
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
            <ul className="space-y-3.5 text-[11px] sm:text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-neutral-350 uppercase tracking-wide">Head Office (Sialkot)</p>
                  <p className="text-neutral-500 font-light leading-relaxed mt-0.5">Next to Faisal Bank, Daska Road, Sialkot</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-neutral-350 uppercase tracking-wide">UK Office</p>
                  <p className="text-neutral-500 font-light leading-relaxed mt-0.5">14 Enfield Avenue, OL8 3DW</p>
                  <p className="text-neutral-400 font-mono text-[10px] mt-0.5 flex items-center gap-1">
                    <Phone className="h-3 w-3 text-neutral-500 inline" /> +44 7534 582421
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-neutral-350 uppercase tracking-wide">USA Office (NY)</p>
                  <p className="text-neutral-500 font-light leading-relaxed mt-0.5">369 N Niagara Ave, Lindenhurst, NY 11757</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-neutral-350 uppercase tracking-wide">Canada Office</p>
                  <p className="text-neutral-500 font-light leading-relaxed mt-0.5">3503 James Mowatt Trail SW, Apt 619</p>
                </div>
              </li>
              <li className="flex items-center gap-2.5 pt-1">
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
