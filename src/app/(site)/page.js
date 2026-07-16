import React from 'react';
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Marquee from '@/components/home/Marquee';
import Compatibility from '@/components/home/Compatibility';
import Offices from '@/components/home/Offices';
import Process from '@/components/home/Process';
import Categories from '@/components/home/Categories';
import Vision from '@/components/home/Vision';
import MapSection from '@/components/home/MapSection';
import TimeSection from '@/components/home/TimeSection';
import Capacity from '@/components/home/Capacity';
import Certificates from '@/components/home/Certificates';
import FAQ from '@/components/home/FAQ';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Marquee />
      <Compatibility />
      <Categories />
      <Offices />
      <Process />
      <Vision />
      <MapSection />
      <TimeSection />
      <Capacity />
      <Certificates />
      <FAQ />
    </>
  );
}
