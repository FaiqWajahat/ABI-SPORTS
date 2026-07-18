'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, ArrowRight, X, ChevronLeft, ChevronRight, Image as ImageIcon, Phone, Mail, ExternalLink } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animations';

const FACILITIES = [
  {
    id: 'sialkot',
    tabLabel: 'Sialkot Factory',
    tag: 'Manufacturing',
    title: 'Sialkot Production Facility',
    description: 'Our flagship vertical manufacturing headquarters in Sialkot, Pakistan. Coordinates raw fabric knitting, cutting, custom screen printing, Tajima embroidery, precision stitching, quality checking, and export packaging in a streamlined workflow.',
    address: 'Next to Faisal Bank, Daska Road, Sialkot, Pakistan',
    phone: '+92 348 4488019',
    email: 'jamil.badar@abisportswear.com',
    driveLink: 'https://drive.google.com/drive/folders/10c4RmH5EcAQIz7P6p8j5ZXGuWWebLfzM?usp=sharing',
    mainImage: '/sialkot-factory.png',
    gallery: [
      '/sialkot-factory.png',
      '/canada-office.png',
      '/usa-office.png'
    ]
  },
  {
    id: 'canada',
    tabLabel: 'Canada Office',
    tag: 'Logistics & Showroom',
    title: 'Toronto Corporate Showroom',
    description: 'Serving our Canadian sportswear brands and retail clients. Houses our sales consultants, physical fabric catalog showroom, sample library, and customer account portals for seamless local communication.',
    address: '3503 James Mowatt Trail SW, Apartment 619, Canada',
    phone: '+1 (437) 848-9003',
    email: 'orders@abisportswear.com',
    driveLink: 'https://drive.google.com/drive/folders/1FnbF8skbxjJUCfezlU3Zx9bF3cauNmuO?usp=drive_link',
    mainImage: '/canada-office.png',
    gallery: [
      '/canada-office.png',
      '/sialkot-factory.png',
      '/usa-office.png'
    ]
  },
  {
    id: 'usa',
    tabLabel: 'USA Office',
    tag: 'Distribution Center',
    title: 'New York Office',
    description: 'Our primary USA customer support hub and logistics center. Handles customs clearances, domestic warehousing distribution programs, and fast shipping fulfillment for US activewear lines.',
    address: '369 N Niagara Ave, Lindenhurst, NY 11757, United States',
    phone: '+1 (347) 515-7182',
    email: 'orders@abisportswear.com',
    driveLink: 'https://drive.google.com/drive/folders/1J__jLVaT86BdqBRPr-2irWpuj4W_yj1v?usp=drive_link',
    mainImage: '/usa-office.png',
    gallery: [
      '/usa-office.png',
      '/sialkot-factory.png',
      '/canada-office.png'
    ]
  }
];

export default function Offices() {
  const [activeTab, setActiveTab] = useState('sialkot');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const activeFacility = FACILITIES.find((f) => f.id === activeTab);

  // Close gallery on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsGalleryOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openGallery = (images) => {
    setGalleryImages(images);
    setCurrentImgIndex(0);
    setIsGalleryOpen(true);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  return (
    <section className="py-24 bg-white text-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <AnimatedSection direction="up" delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2">
              Explore Our Spaces
            </span>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
              OUR FACILITIES & OFFICES
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.15}>
            <p className="text-xs sm:text-[13px] text-neutral-600 font-light mt-4 leading-relaxed">
              From our flagship Sialkot factory to our Toronto and New York offices — explore the spaces where Al Badar Impex designs, manufactures, and ships.
            </p>
          </AnimatedSection>
        </div>

        {/* Premium Sliding Tab Switcher (Segmented Control) */}
        <div className="relative flex bg-neutral-100 p-1.5 rounded-full max-w-md mx-auto mb-14 shadow-inner border border-neutral-200">
          {FACILITIES.map((facility) => {
            const isActive = facility.id === activeTab;
            return (
              <button
                key={facility.id}
                onClick={() => setActiveTab(facility.id)}
                className="relative flex-1 py-3 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-colors duration-300 z-10 select-none cursor-pointer"
                style={{
                  color: isActive ? '#ffffff' : '#737373',
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-black rounded-full z-[-1] shadow-md"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                {facility.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Floating Card Container for Tab Content */}
        <div className=" rounded-lg  p-6 sm:p-10 lg:p-12  transition-shadow duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
            >
              
              {/* Left Column: Facility Information (Slightly narrower: lg:col-span-5) */}
              <div className="lg:col-span-5 lg:order-first space-y-6 text-left flex flex-col justify-center">
                <div>
                  <span className="inline-block text-[8px] font-extrabold uppercase tracking-widest text-neutral-600 bg-neutral-50 border border-neutral-200 rounded px-2.5 py-1">
                    {activeFacility.tag}
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight leading-tight mt-3">
                    {activeFacility.title}
                  </h3>
                  
                  <p className="text-neutral-500 text-xs sm:text-[13px] leading-relaxed font-light mt-3">
                    {activeFacility.description}
                  </p>
                </div>

                {/* Premium Unified Contact Details Card */}
                <div className="bg-neutral-50/60 border border-neutral-200 rounded-xl p-6 sm:p-7 space-y-5 shadow-sm">
                  {/* Address Row */}
                  <div className="flex items-start space-x-4">
                    <div className="p-2.5 bg-black rounded-lg text-white flex-shrink-0 mt-0.5">
                      <MapPin className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="text-[9px] text-neutral-400 block uppercase font-bold tracking-widest leading-none mb-1">Global Address</span>
                      <p className="text-[13px] font-bold text-neutral-800 leading-relaxed">{activeFacility.address}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-neutral-200/60 w-full" />

                  {/* Phone Row */}
                  <div className="flex items-center space-x-4">
                    <div className="p-2.5 bg-neutral-100 border border-neutral-200 rounded-lg text-black flex-shrink-0">
                      <Phone className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="text-[9px] text-neutral-400 block uppercase font-bold tracking-widest leading-none mb-1">Phone Number</span>
                      <a href={`tel:${activeFacility.phone.replace(/[^0-9+]/g, '')}`} className="text-[13px] font-bold text-neutral-800 hover:underline block">{activeFacility.phone}</a>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-neutral-200/60 w-full" />

                  {/* Email Row */}
                  <div className="flex items-center space-x-4">
                    <div className="p-2.5 bg-neutral-100 border border-neutral-200 rounded-lg text-black flex-shrink-0">
                      <Mail className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="text-[9px] text-neutral-400 block uppercase font-bold tracking-widest leading-none mb-1">Email Address</span>
                      <a href={`mailto:${activeFacility.email}`} className="text-[13px] font-bold text-neutral-800 hover:underline block break-all">{activeFacility.email}</a>
                    </div>
                  </div>
                </div>

                {/* Outline Action Button for Gallery */}
                <div>
                  <button 
                    onClick={() => openGallery(activeFacility.gallery)}
                    className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-black bg-neutral-100 hover:bg-neutral-200 rounded-lg px-6 py-3.5 transition-all duration-300 gap-2 cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <span>Explore Gallery</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              
              {/* Right Column: Larger Image Frame with animated overlays (Wider: lg:col-span-7, Taller: aspect-[4/3] or aspect-[1.4/1]) */}
              <div className="lg:col-span-7 lg:order-last relative group">
                <div 
                  onClick={() => openGallery(activeFacility.gallery)}
                  className="relative aspect-[4/3] sm:aspect-[1.4/1] w-full rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50 shadow-sm cursor-pointer hover:border-neutral-350 transition-colors duration-300"
                >
                  <Image
                    src={activeFacility.mainImage}
                    alt={activeFacility.title}
                    fill
                    sizes="(max-w-768px) 100vw, 45vw"
                    className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
                  {/* Photo count badge (Top-Left) */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-neutral-200 text-black text-[9px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                    <ImageIcon className="h-3 w-3 text-neutral-800" />
                    <span>{activeFacility.gallery.length} Photos</span>
                  </div>

                  {/* View Gallery overlay button (Slide & Fade in on Hover) */}
                  <div className="absolute bottom-4 right-4 bg-black text-white text-[9px] font-extrabold tracking-wider uppercase px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow-md opacity-90 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 md:opacity-0 transition-all duration-300">
                    <span>View Gallery</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* LIGHTBOX POPUP GALLERY MODAL */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsGalleryOpen(false)}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 backdrop-blur-md p-4 sm:p-6"
          >
            
            {/* Modal Header */}
            <div className="flex justify-between items-center w-full max-w-6xl mx-auto z-10">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                {activeFacility.tabLabel} — {currentImgIndex + 1} of {galleryImages.length}
              </span>
              <button 
                onClick={() => setIsGalleryOpen(false)}
                className="h-10 w-10 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white rounded-lg flex items-center justify-center cursor-pointer transition-colors shadow-md"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Image Slider */}
            <div 
              className="relative flex-grow flex items-center justify-center max-w-6xl w-full mx-auto my-6"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Prev Button */}
              <button 
                onClick={prevImage}
                className="absolute left-2 sm:left-4 z-10 h-12 w-12 bg-neutral-900/80 hover:bg-neutral-850 border border-neutral-800 text-white rounded-lg flex items-center justify-center cursor-pointer transition-colors shadow-lg"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Image Frame */}
              <div className="relative w-full h-[55vh] sm:h-[65vh] rounded-lg overflow-hidden border border-neutral-900 bg-neutral-950">
                <Image
                  src={galleryImages[currentImgIndex]}
                  alt={`Gallery photo ${currentImgIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Next Button */}
              <button 
                onClick={nextImage}
                className="absolute right-2 sm:right-4 z-10 h-12 w-12 bg-neutral-900/80 hover:bg-neutral-850 border border-neutral-800 text-white rounded-lg flex items-center justify-center cursor-pointer transition-colors shadow-lg"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

            </div>

            {/* Modal Thumbnails Row */}
            <div 
              className="flex justify-center space-x-3 overflow-x-auto py-4 max-w-6xl w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryImages.map((img, idx) => {
                const isSelected = idx === currentImgIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentImgIndex(idx)}
                    className={`relative w-20 h-14 rounded-md overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-colors ${
                      isSelected ? 'border-white' : 'border-neutral-800 hover:border-neutral-600'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
