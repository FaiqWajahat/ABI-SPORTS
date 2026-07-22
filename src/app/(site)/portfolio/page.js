import React from 'react';
import PortfolioHero      from '@/components/portfolio/PortfolioHero';
import PortfolioStats     from '@/components/portfolio/ClientLogos';
import PortfolioGrid      from '@/components/portfolio/PortfolioGrid';
import FeaturedProject    from '@/components/portfolio/CaseStudy';

import TestimonialsStrip  from '@/components/portfolio/TestimonialsStrip';
import PortfolioCTA       from '@/components/portfolio/PortfolioCTA';
import Stats from '@/components/home/Stats';
import Marquee from '@/components/home/Marquee';

export const metadata = {
  title: 'Portfolio | Al Badar Impex — Custom Sportswear Manufacturers',
  description:
    "Browse Al Badar Impex's portfolio of custom sportswear collections — team kits, performance activewear, sublimated uniforms, and private-label programs.",
};

export default function PortfolioPage() {
  return (
    <>
      {/* 1. Hero — white, same as About & Production */}
      <PortfolioHero />

      {/* 2. Animated counter strip — black */}
      {/* <PortfolioStats /> */}
      <Stats/>

      {/* 3. Filterable gallery — white */}
      <PortfolioGrid />

      {/* 4. Featured case study — bg-[#f9fafb] */}
      <FeaturedProject />
      <Marquee/>

      {/* 5. Redesigned testimonials — featured + sidebar */}
      <TestimonialsStrip />

      {/* 7. Category showcase (black) + How We Work (light) */}
      {/* <PortfolioCTA /> */}
    </>
  );
}
