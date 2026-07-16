import React from 'react';

import ProductionHero         from '@/components/production/ProductionHero';
import ProductionStats        from '@/components/production/ProductionStats';
import Capabilities           from '@/components/production/Capabilities';
import ProductionTimeline     from '@/components/production/ProductionTimeline';
import MaterialsLab           from '@/components/production/MaterialsLab';
import FactoryGallery         from '@/components/production/FactoryGallery';
import CertificationsAndEdge  from '@/components/production/CertificationsAndEdge';
import ProductionCTA          from '@/components/production/ProductionCTA';
import Stats from '@/components/home/Stats';
import Certificates from '@/components/home/Certificates';
import FAQ from '@/components/home/FAQ';
import QualityControl from '@/components/about/QualityControl';

export const metadata = {
  title: 'Production | ABI SPORTS — Sportswear Manufacturers',
  description:
    'Explore ABI Sports Sialkot\'s vertically integrated production capabilities — from CAD cutting, flatlock stitching, and dye sublimation to certified packaging and global export logistics.',
};

export default function ProductionPage() {
  return (
    <>
      {/* 1. Hero — full-bleed intro with image grid */}
      <ProductionHero />

      {/* 2. Key production numbers — 3×2 stat grid */}
     <Stats />

      {/* 3. Machine capabilities — interactive tab panel */}
      <Capabilities />

      {/* 4. Sticky-scroll order-to-delivery workflow */}
      <ProductionTimeline />

      {/* 5. Fabric materials lab — interactive split panel */}
      <MaterialsLab />


      {/* 6. Factory floor photo gallery with lightbox */}
      <FactoryGallery />
      <QualityControl/>

      {/* 7. Certifications + competitive advantages */}
      <Certificates/>

      {/* 8. CTA — start your collection */}
    <FAQ/>
    </>
  );
}
