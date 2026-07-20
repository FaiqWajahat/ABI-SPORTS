'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Menu, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeWearExpanded, setActiveWearExpanded] = useState(false);
  const [teamWearExpanded, setTeamWearExpanded] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const sub = searchParams.get('sub');

  const isActive = (path, catValue = null, subValue = null) => {
    if (catValue) {
      if (subValue) {
        return pathname === path && category === catValue && sub === subValue;
      }
      return pathname === path && category === catValue;
    }
    if (path === '/') {
      return pathname === '/';
    }
    return pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Initialize Cal.com Embed Widget Script
    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let c = C.Cal = C.Cal || function () {
        let a = c; a.q = a.q || [];
        let arr = [];
        for (let i = 0; i < arguments.length; i++) arr.push(arguments[i]);
        p(a, arr);
      };
      if (C.Cal.__esModule) return;
      C.Cal.__esModule = true;
      let s = A.createElement(L);
      s.src = "https://app.cal.com/embed/embed.js";
      s.async = true;
      let firstScript = A.getElementsByTagName(L)[0];
      if (firstScript) {
        firstScript.parentNode.insertBefore(s, firstScript);
      } else {
        A.head.appendChild(s);
      }
    })(window, document, "script");

    setTimeout(() => {
      if (window.Cal) {
        window.Cal("init", { origin: "https://cal.com" });
        window.Cal("ui", {
          "styles": { "branding": { "brandColor": "#000000" } },
          "hideEventTypeDetails": false,
          "layout": "month_view"
        });
      }
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Top Banner (Limton-style Production Strategy Call) */}
      <div className="bg-black text-white text-[10px] sm:text-xs border-b border-neutral-900 py-2 px-3 sm:px-6 lg:px-8 text-center">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-x-2 gap-y-1 tracking-wide">
          <span className="font-extrabold uppercase flex items-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse mr-1.5"></span>
            Book a Production Strategy Call
          </span>
          <Link
            href="https://cal.com/faiq-wajahat-xjtj6c/strategy-call"
            data-cal-link="faiq-wajahat-xjtj6c/strategy-call"
            data-cal-config='{"layout":"month_view"}'
            className="text-neutral-400 hover:text-white underline transition-colors flex items-center gap-1 font-light cursor-pointer"
          >
            Schedule a Meeting <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`sticky top-0 z-50 transition-all duration-300 bg-black ${
          scrolled ? 'border-b border-neutral-900 py-3' : 'border-b border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="flex-shrink-0"
            >
              <Link href="/" className="flex items-center gap-2">
                <Image src='/logo.png' alt='ABI SPORTS Logo' width={48} height={28} className="object-contain" />
              </Link>
            </motion.div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className={`text-[13px] font-medium transition-colors ${isActive('/') ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'}`}>
                Home
              </Link>

              {/* Active Wear Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className={`flex items-center space-x-1 text-[13px] font-medium transition-colors focus:outline-none cursor-pointer ${isActive('/products', 'active-wear') ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'}`}>
                  <span>Active Wear</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black border border-neutral-900 text-neutral-300 p-2 min-w-[180px] rounded-none">
                  <DropdownMenuItem className="focus:bg-neutral-900 focus:text-white cursor-pointer py-2 text-xs">
                    <Link href="/products?category=active-wear" className={`w-full ${isActive('/products', 'active-wear') && !sub ? 'text-white font-bold' : 'text-neutral-300 hover:text-white'}`}>
                      All Active Wear
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-neutral-900 focus:text-white cursor-pointer py-2 text-xs">
                    <Link href="/products?category=active-wear&sub=gym-wear" className={`w-full ${isActive('/products', 'active-wear', 'gym-wear') ? 'text-white font-bold' : 'text-neutral-300 hover:text-white'}`}>
                      Gym Wear
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-neutral-900 focus:text-white cursor-pointer py-2 text-xs">
                    <Link href="/products?category=active-wear&sub=swim-wear" className={`w-full ${isActive('/products', 'active-wear', 'swim-wear') ? 'text-white font-bold' : 'text-neutral-300 hover:text-white'}`}>
                      Swim Wear
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-neutral-900 focus:text-white cursor-pointer py-2 text-xs">
                    <Link href="/products?category=active-wear&sub=running" className={`w-full ${isActive('/products', 'active-wear', 'running') ? 'text-white font-bold' : 'text-neutral-300 hover:text-white'}`}>
                      Running
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-neutral-900 focus:text-white cursor-pointer py-2 text-xs">
                    <Link href="/products?category=active-wear&sub=cycling" className={`w-full ${isActive('/products', 'active-wear', 'cycling') ? 'text-white font-bold' : 'text-neutral-300 hover:text-white'}`}>
                      Cycling
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Team Wear Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className={`flex items-center space-x-1 text-[13px] font-medium transition-colors focus:outline-none cursor-pointer ${isActive('/products', 'team-wear') ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'}`}>
                  <span>Team Wear</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black border border-neutral-900 text-neutral-300 p-2 min-w-[180px] rounded-none">
                  <DropdownMenuItem className="focus:bg-neutral-900 focus:text-white cursor-pointer py-2 text-xs">
                    <Link href="/products?category=team-wear" className={`w-full ${isActive('/products', 'team-wear') && !sub ? 'text-white font-bold' : 'text-neutral-300 hover:text-white'}`}>
                      All Team Wear
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-neutral-900 focus:text-white cursor-pointer py-2 text-xs">
                    <Link href="/products?category=team-wear&sub=baseball" className={`w-full ${isActive('/products', 'team-wear', 'baseball') ? 'text-white font-bold' : 'text-neutral-300 hover:text-white'}`}>
                      Baseball
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-neutral-900 focus:text-white cursor-pointer py-2 text-xs">
                    <Link href="/products?category=team-wear&sub=basketball" className={`w-full ${isActive('/products', 'team-wear', 'basketball') ? 'text-white font-bold' : 'text-neutral-300 hover:text-white'}`}>
                      Basketball
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-neutral-900 focus:text-white cursor-pointer py-2 text-xs">
                    <Link href="/products?category=team-wear&sub=soccer" className={`w-full ${isActive('/products', 'team-wear', 'soccer') ? 'text-white font-bold' : 'text-neutral-300 hover:text-white'}`}>
                      Soccer / Football
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-neutral-900 focus:text-white cursor-pointer py-2 text-xs">
                    <Link href="/products?category=team-wear&sub=american-football" className={`w-full ${isActive('/products', 'team-wear', 'american-football') ? 'text-white font-bold' : 'text-neutral-300 hover:text-white'}`}>
                      American Football
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/production" className={`text-[13px] font-medium transition-colors ${isActive('/production') ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'}`}>
                Production
              </Link>
              <Link href="/services" className={`text-[13px] font-medium transition-colors ${isActive('/services') ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'}`}>
                Services
              </Link>
              <Link href="/portfolio" className={`text-[13px] font-medium transition-colors ${isActive('/portfolio') ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'}`}>
                Portfolio
              </Link>
              <Link href="/about" className={`text-[13px] font-medium transition-colors ${isActive('/about') ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'}`}>
                About Us
              </Link>
            </nav>

            {/* Right Side Button Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/inquiry">
                  <Button className="bg-white hover:bg-neutral-200 text-black font-extrabold text-xs tracking-wider px-6 py-3 rounded-lg flex items-center gap-2 cursor-pointer transition-colors">
                    Request a Quote <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Navigation controls */}
            <div className="md:hidden flex items-center space-x-2.5">
              <Link href="/inquiry">
                <Button className="bg-white hover:bg-neutral-200 text-black font-extrabold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-lg cursor-pointer shadow-xs">
                  Quote →
                </Button>
              </Link>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className="text-white p-2 bg-neutral-900 border border-neutral-800 rounded-lg cursor-pointer inline-flex items-center justify-center hover:bg-neutral-850 transition-colors">
                  <Menu className="h-5 w-5 text-white" />
                </SheetTrigger>
                <SheetContent side="right" className="bg-black text-white border-neutral-900 w-[300px] max-w-[85vw] p-6 overflow-y-auto flex flex-col justify-between">
                  <div>
                    {/* Sheet Brand Header */}
                    <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-900">
                      <Image src="/logo.png" alt="ABI SPORTS" width={40} height={24} className="object-contain" />
                      <SheetTitle className="text-white font-black tracking-wider uppercase text-sm font-sans">
                        AL BADAR <span className="text-neutral-400">IMPEX</span>
                      </SheetTitle>
                    </div>

                    {/* Sheet Links */}
                    <div className="flex flex-col space-y-4 mt-6">
                      <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className={`text-sm font-bold text-left transition-colors py-1.5 ${isActive('/') ? 'text-white font-black' : 'text-neutral-300 hover:text-white'}`}
                      >
                        Home
                      </Link>
                      
                      {/* Active Wear Accordion */}
                      <div className="border-t border-neutral-900/80 pt-3 flex flex-col">
                        <button
                          onClick={() => setActiveWearExpanded(!activeWearExpanded)}
                          className="flex justify-between items-center w-full text-left text-sm font-bold text-neutral-300 hover:text-white py-1.5 focus:outline-none"
                        >
                          <span className={isActive('/products', 'active-wear') ? 'text-white font-black' : ''}>Active Wear</span>
                          <ChevronDown className={`h-4 w-4 text-neutral-500 transition-transform duration-300 ${activeWearExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        <motion.div
                          initial={false}
                          animate={{ height: activeWearExpanded ? 'auto' : 0, opacity: activeWearExpanded ? 1 : 0 }}
                          className="overflow-hidden flex flex-col pl-2"
                        >
                          <div className="pt-2 pb-2 flex flex-col space-y-2.5 border-l border-neutral-850 ml-1 pl-3.5">
                            <Link
                              href="/products?category=active-wear"
                              onClick={() => setIsOpen(false)}
                              className={`text-xs font-semibold text-left transition-colors ${isActive('/products', 'active-wear') && !sub ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                            >
                              All Active Wear
                            </Link>
                            <Link
                              href="/products?category=active-wear&sub=gym-wear"
                              onClick={() => setIsOpen(false)}
                              className={`text-xs font-semibold text-left transition-colors ${isActive('/products', 'active-wear', 'gym-wear') ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                            >
                              Gym Wear
                            </Link>
                            <Link
                              href="/products?category=active-wear&sub=swim-wear"
                              onClick={() => setIsOpen(false)}
                              className={`text-xs font-semibold text-left transition-colors ${isActive('/products', 'active-wear', 'swim-wear') ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                            >
                              Swim Wear
                            </Link>
                            <Link
                              href="/products?category=active-wear&sub=running"
                              onClick={() => setIsOpen(false)}
                              className={`text-xs font-semibold text-left transition-colors ${isActive('/products', 'active-wear', 'running') ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                            >
                              Running
                            </Link>
                            <Link
                              href="/products?category=active-wear&sub=cycling"
                              onClick={() => setIsOpen(false)}
                              className={`text-xs font-semibold text-left transition-colors ${isActive('/products', 'active-wear', 'cycling') ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                            >
                              Cycling
                            </Link>
                          </div>
                        </motion.div>
                      </div>

                      {/* Team Wear Accordion */}
                      <div className="border-t border-neutral-900/80 pt-3 flex flex-col">
                        <button
                          onClick={() => setTeamWearExpanded(!teamWearExpanded)}
                          className="flex justify-between items-center w-full text-left text-sm font-bold text-neutral-300 hover:text-white py-1.5 focus:outline-none"
                        >
                          <span className={isActive('/products', 'team-wear') ? 'text-white font-black' : ''}>Team Wear</span>
                          <ChevronDown className={`h-4 w-4 text-neutral-500 transition-transform duration-300 ${teamWearExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        <motion.div
                          initial={false}
                          animate={{ height: teamWearExpanded ? 'auto' : 0, opacity: teamWearExpanded ? 1 : 0 }}
                          className="overflow-hidden flex flex-col pl-2"
                        >
                          <div className="pt-2 pb-2 flex flex-col space-y-2.5 border-l border-neutral-850 ml-1 pl-3.5">
                            <Link
                              href="/products?category=team-wear"
                              onClick={() => setIsOpen(false)}
                              className={`text-xs font-semibold text-left transition-colors ${isActive('/products', 'team-wear') && !sub ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                            >
                              All Team Wear
                            </Link>
                            <Link
                              href="/products?category=team-wear&sub=baseball"
                              onClick={() => setIsOpen(false)}
                              className={`text-xs font-semibold text-left transition-colors ${isActive('/products', 'team-wear', 'baseball') ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                            >
                              Baseball
                            </Link>
                            <Link
                              href="/products?category=team-wear&sub=basketball"
                              onClick={() => setIsOpen(false)}
                              className={`text-xs font-semibold text-left transition-colors ${isActive('/products', 'team-wear', 'basketball') ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                            >
                              Basketball
                            </Link>
                            <Link
                              href="/products?category=team-wear&sub=soccer"
                              onClick={() => setIsOpen(false)}
                              className={`text-xs font-semibold text-left transition-colors ${isActive('/products', 'team-wear', 'soccer') ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                            >
                              Soccer / Football
                            </Link>
                            <Link
                              href="/products?category=team-wear&sub=american-football"
                              onClick={() => setIsOpen(false)}
                              className={`text-xs font-semibold text-left transition-colors ${isActive('/products', 'team-wear', 'american-football') ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                            >
                              American Football
                            </Link>
                          </div>
                        </motion.div>
                      </div>

                      <div className="border-t border-neutral-900/80 pt-3 flex flex-col space-y-3.5">
                        <Link
                          href="/production"
                          onClick={() => setIsOpen(false)}
                          className={`text-sm font-bold text-left transition-colors py-1 ${isActive('/production') ? 'text-white font-black' : 'text-neutral-300 hover:text-white'}`}
                        >
                          Production
                        </Link>
                        <Link
                          href="/services"
                          onClick={() => setIsOpen(false)}
                          className={`text-sm font-bold text-left transition-colors py-1 ${isActive('/services') ? 'text-white font-black' : 'text-neutral-300 hover:text-white'}`}
                        >
                          Services
                        </Link>
                        <Link
                          href="/portfolio"
                          onClick={() => setIsOpen(false)}
                          className={`text-sm font-bold text-left transition-colors py-1 ${isActive('/portfolio') ? 'text-white font-black' : 'text-neutral-300 hover:text-white'}`}
                        >
                          Portfolio
                        </Link>
                        <Link
                          href="/about"
                          onClick={() => setIsOpen(false)}
                          className={`text-sm font-bold text-left transition-colors py-1 ${isActive('/about') ? 'text-white font-black' : 'text-neutral-300 hover:text-white'}`}
                        >
                          About Us
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Sheet Bottom CTAs */}
                  <div className="border-t border-neutral-900 pt-5 mt-6 space-y-2.5">
                    <Link
                      href="/inquiry"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2 bg-white text-black font-black text-xs uppercase tracking-wider py-3 px-4 rounded-xl shadow-sm hover:bg-neutral-200 transition-colors cursor-pointer"
                    >
                      <span>Request a Quote</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href="https://cal.com/faiq-wajahat-xjtj6c/strategy-call"
                      data-cal-link="faiq-wajahat-xjtj6c/strategy-call"
                      data-cal-config='{"layout":"month_view"}'
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800 font-bold text-[11px] uppercase tracking-wider py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
                    >
                      <span>Book Strategy Call</span>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Navbar;
