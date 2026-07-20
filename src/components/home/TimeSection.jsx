'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Globe2, MapPin, Building2, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animations';

const LOCATIONS = [
  {
    id: 'sialkot',
    name: 'Sialkot Factory',
    country: 'Pakistan',
    flag: '🇵🇰',
    subtitle: 'Manufacturing Headquarters',
    timeZone: 'Asia/Karachi',
    tzLabel: 'PKT (UTC+5)',
    hours: '09:00 AM - 06:00 PM',
    openHour: 9,
    closeHour: 18,
    type: 'Production Hub',
    tagline: 'Primary Fabric Milling & Tailoring'
  },
  {
    id: 'uk',
    name: 'UK Office',
    country: 'United Kingdom',
    flag: '🇬🇧',
    subtitle: 'UK Operations Division',
    timeZone: 'Europe/London',
    tzLabel: 'GMT/BST (UTC+0/UTC+1)',
    hours: '09:00 AM - 05:00 PM',
    openHour: 9,
    closeHour: 17,
    type: 'UK Client Desk',
    tagline: 'Oldham Representative Support'
  },
  {
    id: 'usa',
    name: 'USA Office',
    country: 'United States',
    flag: '🇺🇸',
    subtitle: 'New York Corporate Office',
    timeZone: 'America/New_York',
    tzLabel: 'EST/EDT (UTC-5/UTC-4)',
    hours: '09:00 AM - 05:00 PM',
    openHour: 9,
    closeHour: 17,
    type: 'Corporate Sales',
    tagline: 'Lindenhurst Fulfillment Center'
  },
  {
    id: 'canada',
    name: 'Canada Office',
    country: 'Canada',
    flag: '🇨🇦',
    subtitle: 'Toronto Sales Division',
    timeZone: 'America/Toronto',
    tzLabel: 'EST/EDT (UTC-5/UTC-4)',
    hours: '09:00 AM - 05:00 PM',
    openHour: 9,
    closeHour: 17,
    type: 'Distribution Desk',
    tagline: 'Edmonton & Toronto Showroom'
  }
];

function AnalogClock({ timeZone }) {
  const [rotation, setRotation] = useState({ hr: 0, min: 0, sec: 0 });

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: timeZone,
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false
        });
        const parts = formatter.formatToParts(new Date());
        const hr = parseInt(parts.find(p => p.type === 'hour').value, 10);
        const min = parseInt(parts.find(p => p.type === 'minute').value, 10);
        const sec = parseInt(parts.find(p => p.type === 'second').value, 10);

        const secDeg = (sec / 60) * 360;
        const minDeg = (min / 60) * 360 + (sec / 60) * 6;
        const hrDeg = ((hr % 12) / 12) * 360 + (min / 60) * 30;

        setRotation({ hr: hrDeg, min: minDeg, sec: secDeg });
      } catch (err) {
        const now = new Date();
        const hr = now.getHours();
        const min = now.getMinutes();
        const sec = now.getSeconds();
        setRotation({
          hr: ((hr % 12) / 12) * 360 + (min / 60) * 30,
          min: (min / 60) * 360 + (sec / 60) * 6,
          sec: (sec / 60) * 360
        });
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return (
    <div className="relative h-28 w-28 rounded-full border border-neutral-200/80 bg-gradient-to-b from-white to-neutral-50 flex items-center justify-center flex-shrink-0 shadow-md transition-transform duration-500 group-hover:scale-105">
      {/* Outer Dial Ring */}
      <div className="absolute inset-1 rounded-full border border-neutral-100/80" />

      {/* Hour Ticks (12, 3, 6, 9) */}
      <div className="absolute top-2.5 w-0.5 h-2 bg-neutral-900 rounded-full" />
      <div className="absolute bottom-2.5 w-0.5 h-2 bg-neutral-900 rounded-full" />
      <div className="absolute left-2.5 h-0.5 w-2 bg-neutral-900 rounded-full" />
      <div className="absolute right-2.5 h-0.5 w-2 bg-neutral-900 rounded-full" />

      {/* Center Cap */}
      <div className="h-3 w-3 rounded-full bg-black z-30 shadow-md border-2 border-white" />

      {/* Hour Hand */}
      <div
        className="absolute w-1 h-8 bg-black origin-bottom rounded-full z-10 shadow-xs"
        style={{
          transform: `rotate(${rotation.hr}deg)`,
          bottom: '50%',
          transformOrigin: '50% 100%'
        }}
      />

      {/* Minute Hand */}
      <div
        className="absolute w-0.75 h-11 bg-neutral-700 origin-bottom rounded-full z-20"
        style={{
          transform: `rotate(${rotation.min}deg)`,
          bottom: '50%',
          transformOrigin: '50% 100%'
        }}
      />

      {/* Second Hand */}
      <div
        className="absolute w-[1px] h-12 bg-red-500 origin-bottom rounded-full z-20"
        style={{
          transform: `rotate(${rotation.sec}deg)`,
          bottom: '50%',
          transformOrigin: '50% 100%'
        }}
      />
    </div>
  );
}

function TimeDisplay({ location }) {
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [isOpenNow, setIsOpenNow] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString('en-US', {
          timeZone: location.timeZone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        const formattedDate = now.toLocaleDateString('en-US', {
          timeZone: location.timeZone,
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        });
        setTimeStr(formattedTime);
        setDateStr(formattedDate);

        const partsFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: location.timeZone,
          hour: 'numeric',
          hour12: false
        });
        const hour = parseInt(partsFormatter.format(now), 10);
        setIsOpenNow(hour >= location.openHour && hour < location.closeHour);
      } catch (err) {
        setTimeStr(new Date().toLocaleTimeString());
        setDateStr('');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [location]);

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 border border-neutral-200/90 relative overflow-hidden group">
      {/* Top Accent Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neutral-200 via-neutral-900 to-neutral-200 group-hover:from-black group-hover:via-neutral-800 group-hover:to-black transition-all duration-500" />

      {/* Header Row: Flag + Type Tag + Status Badge */}
      <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2.5">
          <span className="text-xl leading-none">{location.flag}</span>
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400 font-mono block leading-none">
              {location.type}
            </span>
            <span className="text-[10px] font-bold text-neutral-800 tracking-tight block mt-0.5">
              {location.country}
            </span>
          </div>
        </div>

        {/* Live Status Badge */}
        <span
          className={`inline-flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border transition-colors ${
            isOpenNow
              ? 'text-emerald-700 bg-emerald-50 border-emerald-200/80 shadow-2xs'
              : 'text-neutral-500 bg-neutral-100/80 border-neutral-200/80'
          }`}
        >
          <span className="relative flex h-2 w-2">
            {isOpenNow && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isOpenNow ? 'bg-emerald-500' : 'bg-neutral-400'
              }`}
            />
          </span>
          {isOpenNow ? 'Active Now' : 'Out of Hours'}
        </span>
      </div>

      {/* Main Content: Analog Clock & Digital Clock Side-by-Side */}
      <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 mb-6">
        {/* Left: Analog Clock */}
        <div className="flex items-center justify-center">
          <AnalogClock timeZone={location.timeZone} />
        </div>

        {/* Right: Titles + Digital Clock */}
        <div className="flex-1 text-center sm:text-left flex flex-col justify-center space-y-2">
          <div>
            <h3 className="text-base font-black text-black uppercase tracking-tight leading-tight">
              {location.name}
            </h3>
            <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider mt-0.5">
              {location.subtitle}
            </p>
          </div>

          {/* Digital Clock Box */}
          <div className="bg-neutral-950 text-white rounded-xl p-3 text-center sm:text-left shadow-inner border border-neutral-900">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-base sm:text-lg font-medium tracking-wider font-mono text-neutral-100 leading-none">
                {timeStr || '00:00:00 AM'}
              </span>
              <span className="text-[9px] font-normal text-neutral-400 font-mono uppercase">
                {dateStr}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Details: Operating Hours & Time Zone */}
      <div className="bg-neutral-50/80 border border-neutral-100 rounded-xl p-3.5 space-y-2 text-xs text-neutral-600">
        <div className="flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 text-neutral-400 font-medium">
            <Clock className="h-3.5 w-3.5 text-neutral-500" />
            Desk Hours:
          </span>
          <span className="font-bold text-black font-mono">{location.hours}</span>
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 text-neutral-400 font-medium">
            <Globe2 className="h-3.5 w-3.5 text-neutral-500" />
            Time Standard:
          </span>
          <span className="font-bold text-neutral-800 font-mono">{location.tzLabel}</span>
        </div>

        <div className="flex items-center justify-between text-[10px] pt-1 border-t border-neutral-200/60">
          <span className="text-neutral-400 font-medium">Scope:</span>
          <span className="text-neutral-700 font-semibold truncate max-w-[200px]">
            {location.tagline}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TimeSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-24 bg-[#fafafa] text-black border-b border-neutral-200 relative overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-neutral-200/40 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 block mb-2 font-mono">
              Global Desk Synchronization
            </span>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black uppercase">
              LIVE OPERATIONS & TIME ZONES
            </h2>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.15}>
            <p className="text-xs sm:text-[13px] text-neutral-500 font-light mt-3 leading-relaxed">
              Real-time active hours across our Sialkot manufacturing headquarters, UK representative desk, USA fulfillment center, and Canadian showroom.
            </p>
            <div className="h-0.5 w-12 bg-black mx-auto mt-4" />
          </AnimatedSection>
        </div>

        {/* 2-Column Grid for Clocks (2 Rows x 2 Columns) */}
        <StaggerContainer delay={0.15} className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {LOCATIONS.map((loc) => (
            <StaggerItem key={loc.id}>
              <TimeDisplay location={loc} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
