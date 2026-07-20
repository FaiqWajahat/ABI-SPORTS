'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Award, ShieldCheck, Leaf, CheckSquare, X, Eye, FileText, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animations';

const CERTIFICATES = [
  {
    id: 1,
    icon: Award,
    title: "WRAP Certified",
    scope: "Platinum Level Standard",
    description: "Worldwide Responsible Accredited Production validation ensuring strictly ethical labor laws, fair compensation, safety protocols, and zero-defect worker protection standards.",
    status: "Facility Registry: Active",
    regId: "Facility ID: WRAP-19822",
    documentImage: "/active-wear.png",
    auditAgency: "Worldwide Responsible Accredited Production (USA)"
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: "SEDEX Smeta Compliant",
    scope: "4-Pillar Ethical Audit",
    description: "Rigorous 4-Pillar SMETA supply chain audit verifying fair working hours, health & safety compliancy, environmental integrity, and strict business ethics.",
    status: "Member ID: Active",
    regId: "Audit ID: SMETA-S-499321",
    documentImage: "/team-wear.png",
    auditAgency: "SGS Global Audit Operations"
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "Pakistan Accord",
    scope: "Building & Fire Safety",
    description: "International Accord for Health and Safety in the Garment Industry certifying workplace safety, structural integrity, and electrical hazard prevention.",
    status: "Signatory Status: Verified",
    regId: "Accord ID: PAK-ACCORD-2024",
    documentImage: "/sialkot-factory.png",
    auditAgency: "International Accord Secretariat"
  },
  {
    id: 4,
    icon: Leaf,
    title: "GOTS Organic Standard",
    scope: "Organic Material Processing",
    description: "Global Organic Textile Standard certification tracking the sourcing, chemical-free processing, and vertical weaving of 100% organic cotton fibers.",
    status: "Registry ID: Active",
    regId: "Registry: GOTS-G-382210",
    documentImage: "/active-wear.png",
    auditAgency: "Control Union Certifications"
  },
  {
    id: 5,
    icon: CheckSquare,
    title: "ISO 9001:2015 Quality",
    scope: "Quality Management",
    description: "Structured quality management standard confirming 100% raw fabric pre-tests, line inspections, tensile stitching checks, and consistent B2B deliveries.",
    status: "Certificate: Active",
    regId: "Standard ID: ISO-9001-2015",
    documentImage: "/team-wear.png",
    auditAgency: "QAS International Compliance"
  }
];

export default function Certificates() {
  const [activeCert, setActiveCert] = useState(null);

  // Close popup on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="py-24 bg-black text-white border-b border-neutral-900 relative overflow-hidden">
      
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-neutral-900/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
              Compliance & Ethics Audit
            </span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
              COMPLIANCE CERTIFICATES
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <div className="h-0.5 w-12 bg-white mx-auto mt-4"></div>
          </AnimatedSection>
        </div>

        {/* 5-Card Certificates Grid */}
        <StaggerContainer delay={0.15} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-7xl mx-auto">
          {CERTIFICATES.map((cert) => {
            const Icon = cert.icon;
            return (
              <StaggerItem 
                key={cert.id} 
                onClick={() => setActiveCert(cert)}
                className="bg-neutral-950 border border-neutral-900 rounded-lg p-6 sm:p-7 hover:border-neutral-800 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left cursor-pointer group shadow-sm hover:shadow-lg"
              >
                <div>
                  {/* Header: Icon & Trigger */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="h-10 w-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center flex-shrink-0 shadow-inner">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 bg-neutral-900/60 border border-neutral-900 rounded-md px-2 py-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Eye className="h-3 w-3" /> View
                    </span>
                  </div>

                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 mb-1.5 block">
                    {cert.scope}
                  </span>

                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 group-hover:text-neutral-200 transition-colors">
                    {cert.title}
                  </h3>
                  
                  <p className="text-neutral-450 text-[11px] leading-relaxed font-light mb-6">
                    {cert.description}
                  </p>
                </div>

                {/* Bottom action bar */}
                <div className="border-t border-neutral-900 pt-4 mt-auto flex justify-between items-center text-neutral-400 group-hover:text-white transition-colors">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest">
                    {cert.status}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 group-hover:text-white flex items-center gap-1 transition-colors">
                    <span>View Docs</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>

              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>

      {/* COMPLIANCE CERTIFICATE MODAL POPUP */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCert(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-black max-w-3xl w-full rounded-lg overflow-hidden relative shadow-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-8"
            >
              
              {/* Close Button */}
              <button 
                onClick={() => setActiveCert(null)}
                className="absolute top-4 right-4 h-9 w-9 bg-neutral-100 hover:bg-neutral-250 border border-neutral-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors shadow-sm z-30"
              >
                <X className="h-4.5 w-4.5 text-black" />
              </button>

              {/* Left Column: Scanned Certificate Document Frame (A4 vertical ratio: aspect-[1/1.41]) */}
              <div className="md:w-1/2 relative aspect-[1/1.4] w-full rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50 shadow-inner flex items-center justify-center group/doc">
                <Image
                  src={activeCert.documentImage}
                  alt={`${activeCert.title} scan copy`}
                  fill
                  className="object-cover object-center group-hover/doc:scale-102 transition-transform duration-700 opacity-95"
                  priority
                />
                
                {/* Visual watermark icon overlay */}
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-white/90 shadow-md flex items-center justify-center">
                    <FileText className="h-6 w-6 text-black animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Verification Metadata */}
              <div className="md:w-1/2 flex flex-col justify-between text-left py-2">
                <div className="space-y-4">
                  <div>
                    <span className="inline-block text-[8px] font-extrabold uppercase tracking-widest text-neutral-600 bg-neutral-50 border border-neutral-200 rounded px-2.5 py-1">
                      {activeCert.scope}
                    </span>
                    <h3 className="text-2xl font-black text-black uppercase tracking-tight leading-tight mt-3">
                      {activeCert.title}
                    </h3>
                  </div>

                  <p className="text-neutral-500 text-xs leading-relaxed font-light">
                    {activeCert.description}
                  </p>

                  {/* Verification specifics */}
                  <div className="bg-neutral-50/70 border border-neutral-200 rounded-lg p-5 space-y-3 shadow-sm">
                    <div>
                      <span className="text-[9px] text-neutral-400 block uppercase font-bold tracking-widest leading-none">Auditing Authority</span>
                      <span className="text-xs font-bold text-neutral-800 mt-1 block leading-relaxed">{activeCert.auditAgency}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-neutral-400 block uppercase font-bold tracking-widest leading-none">Registry Details</span>
                      <span className="text-xs font-bold text-neutral-800 mt-1 block leading-none font-mono">{activeCert.regId}</span>
                    </div>
                  </div>
                </div>

                {/* Audit declaration notice */}
                <div className="border-t border-neutral-100 pt-5 mt-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-green-600">Active Audit Status Verified</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-light mt-1.5 leading-normal">
                    Compliance status is audited annually at our Sialkot facility.
                  </p>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
