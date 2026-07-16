import React from 'react';
import Link from 'next/link';
import { Shield, Eye, Lock, FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | ABI SPORTS — B2B Sportswear Manufacturers',
  description:
    'Read the ABI Sports privacy policy. Learn how we handle corporate contact information, design briefs, vector logos, CAD templates, and intellectual property protection.',
};

export default function PrivacyPage() {
  const sections = [
    {
      icon: Eye,
      title: '1. Information Collection & Scope',
      content:
        'We collect corporate contact information (name, business email, phone number, shipping address) when you submit a B2B inquiry or request a physical prototype. Additionally, we receive vector artwork files (AI, EPS, PDF), technical design packages, size measurements, and CAD grading briefs specifically required to execute custom sample development and bulk clothing manufacturing runs.',
    },
    {
      icon: Lock,
      title: '2. Use of Information & Procurement',
      content:
        'All client data is strictly utilized to process production cost quotes, develop physical pre-production samples, coordinate bulk fabric milling, schedule embroidery or sublimation assemblies, compile customs export paperwork, and manage global freight shipping. We do not use your brand templates or details for third-party marketing or retail distribution.',
    },
    {
      icon: Shield,
      title: '3. Intellectual Property Protection (Critical B2B Secrecy)',
      content:
        'As an OEM/ODM apparel manufacturer, we enforce absolute confidentiality regarding proprietary designs. Your tech packs, custom CAD sizing templates, logo placements, unique fit patterns, and fabric specifications are treated as exclusive intellectual property. We sign Non-Disclosure Agreements (NDAs) upon request, and under no circumstances do we reuse or share your designs, patterns, or overstock with other clients or retail markets.',
    },
    {
      icon: FileText,
      title: '4. Information Security & Physical Protection',
      content:
        'Digital artwork, grading templates, and order files are stored on secure local servers with restricted access controls to prevent unauthorized data leaks. Sialkot manufacturing facilities employ strict security standards, ensuring physical screens, layout tables, sublimation paper rolls, and fabric cutters are cleared of proprietary design remains after production runs.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black py-20 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.01] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 text-left">
        {/* Header */}
        <div className="mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-widest text-neutral-450 hover:text-black border border-neutral-200 hover:border-black rounded-lg px-4 py-2.5 transition-all duration-300 mb-8 cursor-pointer bg-white"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Home
          </Link>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 block mb-2 font-mono">
            Last Updated: July 14, 2026
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black leading-none">
            Privacy Policy
          </h1>
          <div className="h-0.5 w-12 bg-black mt-4 mb-4" />
          <p className="text-neutral-500 text-sm font-light leading-relaxed max-w-2xl">
            ABI Sports is committed to protecting your personal information and corporate intellectual property. This policy explains our data management, design protection rules, and manufacturing confidentiality guidelines.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12 border-t border-neutral-100 pt-12">
          {sections.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                {/* Column A: Icon & Title */}
                <div className="md:col-span-4 flex items-center md:items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h2 className="text-xs font-black uppercase tracking-wider text-black mt-1">
                    {s.title}
                  </h2>
                </div>
                {/* Column B: Content */}
                <div className="md:col-span-8">
                  <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed">
                    {s.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Accent / Contact */}
        <div className="border-t border-neutral-200 pt-12 mt-16 bg-[#f9fafb] p-6 sm:p-8 rounded-xl border">
          <h3 className="text-xs font-black uppercase tracking-wider text-black mb-3">
            Inquiries & Data Access Requests
          </h3>
          <p className="text-neutral-500 text-xs font-light leading-relaxed mb-6">
            If you have questions regarding this privacy policy, require custom NDA contracts, or want to verify data deletion from our servers, contact our compliance officer at:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center text-xs">
            <a
              href="mailto:compliance@abisportswear.com"
              className="text-black font-extrabold underline hover:text-neutral-700"
            >
              compliance@abisportswear.com
            </a>
            <span className="hidden sm:inline text-neutral-300">|</span>
            <span className="text-neutral-500 font-medium">ABI Sports Corp — Compliance Division</span>
          </div>
        </div>
      </div>
    </div>
  );
}
