import React from 'react';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesOverview from '@/components/services/ServicesOverview';
import SourcingProcess from '@/components/services/SourcingProcess';
import Stats from '@/components/home/Stats';
import FAQ from '@/components/home/FAQ';
import Certificates from '@/components/home/Certificates';
import Offices from '@/components/home/Offices';

export const metadata = {
  title: 'B2B Sourcing & Custom Manufacturing Services | Al Badar Impex',
  description: "Explore Al Badar Impex's custom manufacturing services — from raw fabric sourcing, pattern CAD design, and prototyping to dye sublimation and global door-to-door delivery."
};

export default function ServicesPage() {
  return (
    <>
      {/* 1. Services Hero */}
      <ServicesHero />

      {/* 2. Stats Section */}
      <Stats />

      {/* 3. Core Services Scope */}
      <ServicesOverview />

      {/* 4. Steps Sourcing Process Pipeline */}
      <SourcingProcess />

      {/* 5. FAQ */}
      <FAQ />
    </>
  );
}
