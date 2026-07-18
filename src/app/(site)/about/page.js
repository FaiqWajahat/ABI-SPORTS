import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import FactoryNumbers from '@/components/about/FactoryNumbers';
import Machinery from '@/components/about/Machinery';
import History from '@/components/about/History';
import Pillars from '@/components/about/Pillars';
import QualityControl from '@/components/about/QualityControl';
import Leadership from '@/components/about/Leadership';
import GlobalMarkets from '@/components/about/GlobalMarkets';
import Sustainability from '@/components/about/Sustainability';
import Stats from '@/components/home/Stats';
import FAQ from '@/components/home/FAQ';
import Certificates from '@/components/home/Certificates';
import Offices from '@/components/home/Offices';

export const metadata = {
  title: "About Us | Al Badar Impex — Custom Sportswear Manufacturers",
  description: "Explore the manufacturing history, quality control audits, leadership, and sustainability commitments of Al Badar Impex."
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Stats/>
      {/* <FactoryNumbers /> */}
      <History />
      <Machinery />
      <Offices/>
      <Leadership />
      <GlobalMarkets />
       <Pillars />
      <Sustainability />
      <Certificates/>
      <FAQ />
    </>
  );
}
