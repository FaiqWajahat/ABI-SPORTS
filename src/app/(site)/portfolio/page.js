import React from 'react';
import PortfolioHero      from '@/components/portfolio/PortfolioHero';
import PortfolioStats     from '@/components/portfolio/ClientLogos';
import PortfolioGrid      from '@/components/portfolio/PortfolioGrid';
import FeaturedProject    from '@/components/portfolio/CaseStudy';
import CompanyProfile     from '@/components/portfolio/CompanyProfile';
import TestimonialsStrip  from '@/components/portfolio/TestimonialsStrip';
import PortfolioCTA       from '@/components/portfolio/PortfolioCTA';

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
      <PortfolioStats />

      {/* 3. Filterable gallery — white */}
      <PortfolioGrid />

      {/* 4. Featured case study — bg-[#f9fafb] */}
      <FeaturedProject />

      {/* 5. Redesigned testimonials — featured + sidebar */}
      <TestimonialsStrip />

      {/* 7. Category showcase (black) + How We Work (light) */}
      <PortfolioCTA />
    </>
  );
}
