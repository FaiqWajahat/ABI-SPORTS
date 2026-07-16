'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Globe2, Landmark, Building2, MapPin } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/animations';

const LOCATIONS = [
  {
    id: 'sialkot',
    name: "Sialkot Factory",
    subtitle: "Manufacturing Headquarters",
    timeZone: "Asia/Karachi",
    tzLabel: "PKT (UTC+5)",
    hours: "09:00 AM - 06:00 PM",
    openHour: 9,
    closeHour: 18,
    type: "Production Hub"
  },
  {
    id: 'usa',
    name: "USA Office",
    subtitle: "New York Corporate Office",
    timeZone: "America/New_York",
    tzLabel: "EST/EDT (UTC-5/UTC-4)",
    hours: "09:00 AM - 05:00 PM",
    openHour: 9,
    closeHour: 17,
    type: "Corporate Sales"
  },
  {
    id: 'canada',
    name: "Canada Office",
    subtitle: "Toronto Sales Division",
    timeZone: "America/Toronto",
    tzLabel: "EST/EDT (UTC-5/UTC-4)",
    hours: "09:00 AM - 05:00 PM",
    openHour: 9,
    closeHour: 17,
    type: "Distribution Desk"
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
    <div className="relative h-24 w-24 rounded-full border border-neutral-100 bg-white flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-105">
      {/* Center point */}
      <div className="h-2 w-2 rounded-full bg-black z-30 shadow-sm"></div>
      
      {/* Hour Hand */}
      <div 
        className="absolute w-0.75 h-7 bg-black origin-bottom rounded-full z-10"
        style={{ 
          transform: `rotate(${rotation.hr}deg)`, 
          bottom: '50%',
          transformOrigin: '50% 100%'
        }}
      ></div>

      {/* Minute Hand */}
      <div 
        className="absolute w-[1.5px] h-10 bg-neutral-600 origin-bottom rounded-full z-20"
        style={{ 
          transform: `rotate(${rotation.min}deg)`, 
          bottom: '50%',
          transformOrigin: '50% 100%'
        }}
      ></div>

      {/* Second Hand */}
      <div 
        className="absolute w-[0.75px] h-11 bg-red-500 origin-bottom rounded-full z-20"
        style={{ 
          transform: `rotate(${rotation.sec}deg)`, 
          bottom: '50%',
          transformOrigin: '50% 100%'
        }}
      ></div>

      {/* Dial Hour markers */}
      <div className="absolute top-1.5 w-0.5 h-1.5 bg-neutral-300"></div>
      <div className="absolute bottom-1.5 w-0.5 h-1.5 bg-neutral-300"></div>
      <div className="absolute left-1.5 h-0.5 w-1.5 bg-neutral-300"></div>
      <div className="absolute right-1.5 h-0.5 w-1.5 bg-neutral-300"></div>
    </div>
  );
}

function TimeDisplay({ location }) {
  const [timeStr, setTimeStr] = useState("");
  const [isOpenNow, setIsOpenNow] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = now.toLocaleTimeString('en-US', {
          timeZone: location.timeZone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        setTimeStr(formatted);

        const partsFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: location.timeZone,
          hour: 'numeric',
          hour12: false
        });
        const hour = parseInt(partsFormatter.format(now), 10);
        setIsOpenNow(hour >= location.openHour && hour < location.closeHour);
      } catch (err) {
        setTimeStr(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [location]);

  return (
    <div className="bg-[#fcfcfc] rounded-lg p-6 sm:p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 border border-neutral-100/60 relative overflow-hidden group">
      
      {/* Decorative vertical stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-200 group-hover:bg-black transition-colors duration-500" />
      
      <div className="w-full flex justify-between items-center mb-6">
        <span className="text-[8px] font-black uppercase tracking-widest text-neutral-400 bg-neutral-100/80 px-2.5 py-1 rounded">
          {location.type}
        </span>
        <span className={`inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
          isOpenNow 
            ? 'text-green-600 bg-green-50/80 border border-green-200/30' 
            : 'text-neutral-500 bg-neutral-100/85 border border-neutral-200/20'
        }`}>
          <span className={`h-1 w-1 rounded-full ${isOpenNow ? 'bg-green-500 animate-pulse' : 'bg-neutral-450'}`}></span>
          {isOpenNow ? "Open" : "Closed"}
        </span>
      </div>

      {/* Clock display */}
      <div className="mb-6">
        <AnalogClock timeZone={location.timeZone} />
      </div>

      {/* Location Titles */}
      <h3 className="text-sm font-black text-black uppercase tracking-wider mb-1">
        {location.name}
      </h3>
      <p className="text-[10px] text-neutral-400 font-light uppercase tracking-wide mb-4">
        {location.subtitle}
      </p>

      {/* Large Digital Clock display */}
      <div className="w-full bg-white rounded-lg py-3 px-4 shadow-inner border border-neutral-100/50 text-xl sm:text-2xl font-black text-black uppercase tracking-widest font-sans leading-none mb-6">
        {timeStr || "00:00:00 AM"}
      </div>

      {/* Details list */}
      <div className="w-full border-t border-neutral-100/80 pt-4 space-y-2 text-left">
        <div className="flex justify-between text-[10px] text-neutral-500 font-light">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-neutral-400" /> Operating:
          </span>
          <span className="font-semibold text-neutral-800">{location.hours}</span>
        </div>
        <div className="flex justify-between text-[10px] text-neutral-500 font-light">
          <span className="flex items-center gap-1.5">
            <Globe2 className="h-3 w-3 text-neutral-400" /> Zone:
          </span>
          <span className="font-bold text-neutral-700">{location.tzLabel}</span>
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
    <section className="py-24 bg-white text-black border-b border-neutral-200 relative overflow-hidden">
      {/* Background soft ambient radial light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-neutral-50 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
            Real-Time Operations coordination
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
            OUR ACTIVE BUSINESS HOURS
          </h2>
          <div className="h-0.5 w-12 bg-black mx-auto mt-4"></div>
        </div>

        {/* 3-Column Grid for Clocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {LOCATIONS.map((loc) => (
            <TimeDisplay key={loc.id} location={loc} />
          ))}
        </div>

      </div>
    </section>
  );
}
