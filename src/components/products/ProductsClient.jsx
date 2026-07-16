'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, FileText,
  Calendar, Layers, ShieldCheck, HelpCircle, ChevronDown, Check,
  Activity, Tag, Shield, Scissors, Sparkles, Scale, Info
} from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/animations';
import { CATEGORIES, PRODUCTS, SIZING_GUIDES } from '@/data/productsData';

// ─── FAQ DATA ────────────────────────────────────────────────────────────────
const B2B_FAQS = [
  {
    q: 'Can we submit custom tech packs and specs?',
    a: 'Absolutely. We accept industry-standard tech packs in Adobe Illustrator (AI), PDF, or physical reference garments. Our pattern-grading team translates your specs into custom CAD sizing templates.'
  },
  {
    q: 'What are the minimum order quantities (MOQs)?',
    a: 'Our standard MOQ is 100 units per style/colorway for gym wear, cycling, and soccer kits, and 150 units for compression wear. We offer lower prototyping quantities during the sample approval phase.'
  },
  {
    q: 'What is the sample lead time and cost?',
    a: 'We offer a rapid 72-hour physical proto-sample turnaround. Once your tech pack is approved, samples are constructed and dispatched via DHL Express. Sample fees are 100% deductible from your final bulk order.'
  },
  {
    q: 'Do you provide complete custom labelling & retail packaging?',
    a: 'Yes, we specialize in private-label manufacturing. This includes woven neck tags, hang tags with barcode stickers, custom branded polybags, anti-humidity silica inserts, and RFID tracking labels.'
  }
];

// ─── ACCORDION COMPONENT ─────────────────────────────────────────────────────
function FaqAccordionItem({ item, isOpen, onClick }) {
  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left font-sans cursor-pointer focus:outline-none"
      >
        <span className="text-xs sm:text-sm font-black text-black uppercase tracking-wider flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-neutral-450 flex-shrink-0" />
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-neutral-500 flex-shrink-0 ml-4"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 pt-1 border-t border-neutral-100">
              <p className="text-xs sm:text-sm text-neutral-605 font-light leading-relaxed">
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get('category');
  const subParam = searchParams.get('sub');
  const productParam = searchParams.get('product');

  const [activeFaq, setActiveFaq] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset pagination when subcategory shifts
  useEffect(() => {
    setCurrentPage(1);
  }, [subParam]);

  const [dynamicCategories, setDynamicCategories] = useState(null);
  const [dynamicProducts, setDynamicProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products')
        ]);
        if (catRes.ok && prodRes.ok) {
          const catData = await catRes.json();
          const prodData = await prodRes.json();

          const cats = catData.categories || [];
          const prods = prodData.products || [];

          const formattedCategories = {};
          
          // First pass: add parent categories
          cats.filter(c => !c.parentCategory).forEach(c => {
            formattedCategories[c.slug] = {
              title: c.name,
              description: c.description || '',
              heroImage: c.image || '/active-wear.png',
              subcategories: {},
              fabricTech: CATEGORIES[c.slug]?.fabricTech || [
                { name: 'AeroDry Polyester', desc: 'Moisture-wicking micro-fiber that pulls sweat away from skin instantly.' },
                { name: 'rPET Eco-Yarn', desc: 'Sustainable fibers certified by GRS.' }
              ]
            };
          });

          // Second pass: add subcategories under parent
          cats.filter(c => c.parentCategory).forEach(c => {
            const parentSlug = c.parentCategory.slug || (c.parentCategory.name ? c.parentCategory.slug : c.parentCategory);
            const pSlug = typeof c.parentCategory === 'object' ? c.parentCategory.slug : parentSlug;
            if (formattedCategories[pSlug]) {
              formattedCategories[pSlug].subcategories[c.slug] = {
                title: c.name,
                description: c.description || '',
                image: c.image || '/active-wear.png'
              };
            }
          });

          // Format products
          const formattedProducts = prods.map(p => {
            const catSlug = typeof p.category === 'object' ? p.category?.slug : p.category;
            const subSlug = typeof p.subcategory === 'object' ? p.subcategory?.slug : p.subcategory;
            return {
              id: p.slug || p._id,
              name: p.name,
              category: catSlug || '',
              subcategory: subSlug || '',
              priceRange: 'OEM Bulk Quote',
              image: p.images?.[0] || '/active-wear.png',
              description: p.description || '',
              specs: [
                p.specifications?.material ? `Material: ${p.specifications.material}` : null,
                p.specifications?.weight ? `Weight: ${p.specifications.weight}` : null,
                p.specifications?.sizing ? `Sizing: ${p.specifications.sizing}` : null,
                p.specifications?.customization ? `Customization: ${p.specifications.customization}` : null
              ].filter(Boolean),
              mfgDetails: {
                moq: `${p.minOrderQuantity || 50} Units`,
                leadTime: '18-22 Business Days',
                customization: p.specifications?.customization || 'Custom labels and print'
              },
              performanceTech: p.description || '',
              sizingType: p.specifications?.sizing?.toLowerCase().includes('waist') ? 'bottoms' : 'tops'
            };
          });

          if (Object.keys(formattedCategories).length > 0) {
            setDynamicCategories(formattedCategories);
          }
          if (formattedProducts.length > 0) {
            setDynamicProducts(formattedProducts);
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic storefront data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const finalCategories = dynamicCategories || CATEGORIES;
  const finalProducts = dynamicProducts || PRODUCTS;

  // Helper to change URL query parameters
  const setParams = (newParams) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null) {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  };

  const activeCategoryKey = categoryParam || 'active-wear';
  const categoryData = finalCategories[activeCategoryKey];

  const activeProduct = productParam
    ? finalProducts.find((p) => p.id === productParam)
    : null;

  const subcategoryProducts = subParam
    ? finalProducts.filter((p) => p.category === activeCategoryKey && p.subcategory === subParam)
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-neutral-200 border-t-black animate-spin" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 font-mono">Loading Catalog...</span>
        </div>
      </div>
    );
  }

  // Breadcrumbs
  const renderBreadcrumbs = () => {
    return (
      <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest text-neutral-450 mb-6 font-mono">
        <button onClick={() => setParams({ category: null, sub: null, product: null })} className="hover:text-black transition-colors cursor-pointer">
          Products
        </button>
        <ChevronRight className="h-2.5 w-2.5" />
        <button onClick={() => setParams({ sub: null, product: null })} className="hover:text-black transition-colors cursor-pointer">
          {categoryData?.title}
        </button>
        {subParam && (
          <>
            <ChevronRight className="h-2.5 w-2.5" />
            <button onClick={() => setParams({ product: null })} className="hover:text-black transition-colors cursor-pointer">
              {categoryData?.subcategories[subParam]?.title}
            </button>
          </>
        )}
        {activeProduct && (
          <>
            <ChevronRight className="h-2.5 w-2.5" />
            <span className="text-black font-black">{activeProduct.name}</span>
          </>
        )}
      </div>
    );
  };

  // 1. PRODUCT DETAIL VIEW (ENHANCED)
  if (activeProduct) {
    const sizingGuide = SIZING_GUIDES[activeProduct.sizingType || 'tops'];
    
    // Find related products (same subcategory, excluding current)
    const relatedProducts = finalProducts.filter(
      (p) => p.subcategory === activeProduct.subcategory && p.id !== activeProduct.id
    ).slice(0, 3);

    return (
      <div className="min-h-screen bg-white text-black py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
          {renderBreadcrumbs()}

          <button
            onClick={() => setParams({ product: null })}
            className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 hover:text-black border border-neutral-200 hover:border-black rounded-lg px-4 py-2.5 transition-all duration-300 mb-8 cursor-pointer bg-white"
          >
            <ArrowLeft className="h-3 w-3" /> Back to {categoryData?.subcategories[activeProduct.subcategory]?.title}
          </button>

          {/* MAIN GRID BLOCK */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4">
            {/* Left: Product Image */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm">
                <Image
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-black" />
                <div className="absolute bottom-5 left-5 bg-black/60 backdrop-blur-sm border border-white/10 text-white text-[9px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full">
                  Sialkot Certified
                </div>
              </div>
            </div>

            {/* Right: Specifications & Specs Sheet */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-450 block mb-2 font-mono">
                  {categoryData?.title} · {categoryData?.subcategories[activeProduct.subcategory]?.title}
                </span>
                <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-black leading-tight">
                  {activeProduct.name}
                </h1>
                <div className="h-0.5 w-12 bg-black mt-4 mb-4" />
                <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-white bg-black px-3 py-1.5 rounded">
                  {activeProduct.priceRange}
                </span>
              </div>

              <p className="text-neutral-600 text-sm font-light leading-relaxed">
                {activeProduct.description}
              </p>

              {/* Specs Checklist */}
              <div className="space-y-4 pt-6 border-t border-neutral-100">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-black">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeProduct.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-black flex-shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-neutral-700 leading-snug">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Manufacturing details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-neutral-200 rounded-xl overflow-hidden shadow-sm bg-[#f9fafb]">
                <div className="p-5 border-r border-neutral-200 border-b sm:border-b-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Layers className="h-3.5 w-3.5 text-neutral-500" />
                    <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-450 font-mono">MOQ</span>
                  </div>
                  <span className="text-xs font-bold text-black uppercase">{activeProduct.mfgDetails.moq}</span>
                </div>
                <div className="p-5 border-r border-neutral-200 border-b sm:border-b-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-3.5 w-3.5 text-neutral-500" />
                    <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-440 font-mono">Lead Time</span>
                  </div>
                  <span className="text-xs font-bold text-black uppercase">{activeProduct.mfgDetails.leadTime}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-neutral-500" />
                    <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-440 font-mono">Customization</span>
                  </div>
                  <span className="text-[10px] font-bold text-black leading-snug block">{activeProduct.mfgDetails.customization}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  href={`/inquiry?category=${activeProduct.category}&product=${activeProduct.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-white bg-black hover:bg-neutral-800 rounded-xl py-4 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                >
                  <FileText className="h-4 w-4" /> Request Sample & Bulk Quote
                </Link>
              </div>
            </div>
          </div>

          {/* SECTION: PERFORMANCE TECHNOLOGY DETAILS */}
          {activeProduct.performanceTech && (
            <div className="border-t border-neutral-200 pt-16 mt-16 text-left">
              <div className="max-w-3xl mb-8">
                <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-450 block mb-2 font-mono">Product Engineering</span>
                <h2 className="text-2xl font-black uppercase text-black">Performance Technology</h2>
                <div className="h-0.5 w-8 bg-black mt-3" />
              </div>
              <div className="bg-[#f9fafb] border border-neutral-200 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
                <div className="h-10 w-10 rounded-xl bg-black flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed">
                    {activeProduct.performanceTech}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: SIZING CHART & TECH FIT GUIDE */}
          {sizingGuide && (
            <div className="border-t border-neutral-200 pt-16 mt-16 text-left">
              <div className="max-w-3xl mb-8">
                <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-450 block mb-2 font-mono">Standard Fitment</span>
                <h2 className="text-2xl font-black uppercase text-black">Sizing Chart & Specifications</h2>
                <div className="h-0.5 w-8 bg-black mt-3" />
              </div>
              
              <div className="border border-neutral-200 rounded-xl overflow-hidden shadow-sm max-w-2xl bg-white">
                <div className="px-6 py-4 bg-[#f9fafb] border-b border-neutral-200">
                  <p className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 font-mono">
                    Standard EU/US Body Measurements (inches)
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-200 text-[9px] font-extrabold uppercase tracking-wider text-neutral-450 bg-neutral-50">
                        <th className="px-6 py-3">Size</th>
                        {activeProduct.sizingType === 'tops' ? (
                          <>
                            <th className="px-6 py-3">Chest</th>
                            <th className="px-6 py-3">Length</th>
                            <th className="px-6 py-3">Sleeve</th>
                          </>
                        ) : (
                          <>
                            <th className="px-6 py-3">Waist</th>
                            <th className="px-6 py-3">Hip</th>
                            <th className="px-6 py-3">Inseam</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 font-medium text-neutral-750">
                      {sizingGuide.map((row) => (
                        <tr key={row.size} className="hover:bg-neutral-50 transition-colors">
                          <td className="px-6 py-3 font-black text-black">{row.size}</td>
                          {activeProduct.sizingType === 'tops' ? (
                            <>
                              <td className="px-6 py-3">{row.chest}</td>
                              <td className="px-6 py-3">{row.length}</td>
                              <td className="px-6 py-3">{row.sleeve}</td>
                            </>
                          ) : (
                            <>
                              <td className="px-6 py-3">{row.waist}</td>
                              <td className="px-6 py-3">{row.hip}</td>
                              <td className="px-6 py-3">{row.inseam}</td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex gap-2 items-start mt-4 max-w-2xl text-[9px] font-semibold text-neutral-450 leading-relaxed pl-1 font-mono">
                <Info className="h-3.5 w-3.5 text-neutral-400 flex-shrink-0 mt-0.5" />
                <span>Custom pattern-grading is available during sample development. Specify your measurements in your tech pack if custom sizes are needed.</span>
              </div>
            </div>
          )}

          {/* SECTION: RELATED PRODUCTS */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-neutral-200 pt-16 mt-16 text-left">
              <div className="mb-10">
                <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-450 block mb-2 font-mono">Related Items</span>
                <h2 className="text-2xl font-black uppercase text-black">Explore Similar Lines</h2>
                <div className="h-0.5 w-8 bg-black mt-3" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setParams({ product: p.id })}
                    className="bg-white border border-neutral-200 rounded-xl overflow-hidden group shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
                  >
                    <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden w-full">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="20vw"
                        className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-grow text-left">
                      <span className="text-[7.5px] font-extrabold uppercase tracking-widest text-neutral-400 block mb-1">
                        {categoryData?.subcategories[p.subcategory]?.title}
                      </span>
                      <h4 className="text-xs font-black text-black uppercase tracking-wider mb-2 line-clamp-1">
                        {p.name}
                      </h4>
                      <p className="text-neutral-500 text-[10px] font-light leading-relaxed line-clamp-2 mb-4">
                        {p.description}
                      </p>
                      <div className="flex items-center space-x-1 text-[8px] font-black uppercase tracking-widest text-black pt-3 border-t border-neutral-100 mt-auto">
                        <span>View Specs</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // 2. SUBCATEGORY PRODUCTS GRID VIEW (ENHANCED)
  if (subParam) {
    const subcategoryData = categoryData?.subcategories[subParam];
    
    // Slice products for pagination
    const totalPages = Math.ceil(subcategoryProducts.length / itemsPerPage);
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const paginatedProducts = subcategoryProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
      <div className="min-h-screen bg-[#f9fafb] text-black py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
          {renderBreadcrumbs()}

          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-neutral-200 pb-8 mb-10 gap-6">
            <div>
              <button
                onClick={() => setParams({ sub: null })}
                className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 hover:text-black border border-neutral-200 hover:border-black rounded-lg px-3 py-2 transition-all duration-300 mb-4 cursor-pointer bg-white"
              >
                <ArrowLeft className="h-3 w-3" /> Back to Categories
              </button>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-black leading-none mt-2">
                {subcategoryData?.title}
              </h1>
              <p className="text-neutral-500 text-xs font-light leading-relaxed max-w-xl mt-4">
                {subcategoryData?.description}
              </p>
            </div>
            <div className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400 font-mono">
              {subcategoryProducts.length} Products Found
            </div>
          </div>

          {/* Grid */}
          <StaggerContainer delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((p) => (
              <StaggerItem
                key={p.id}
                onClick={() => setParams({ product: p.id })}
                className="bg-white border border-neutral-200 rounded-xl overflow-hidden group shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-500 cursor-pointer flex flex-col h-full"
              >
                <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden w-full">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover object-center group-hover:scale-104 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-550" />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/10 text-white text-[8px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-350">
                    OEM / ODM
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow text-left">
                  <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-450 block mb-1">
                    {subcategoryData?.title}
                  </span>
                  <h3 className="text-base font-black text-black uppercase tracking-wider mb-2 leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-neutral-500 text-xs font-light leading-relaxed mb-6 line-clamp-2">
                    {p.description}
                  </p>

                  <div className="flex items-center space-x-1.5 text-[9px] font-extrabold uppercase tracking-widest text-black pt-4 border-t border-neutral-100 w-full mt-auto">
                    <span>View Specifications</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Pagination Navigation */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-neutral-200">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-[9px] font-extrabold uppercase tracking-widest bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-black rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer text-black"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 text-[9px] font-extrabold rounded-lg flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                    currentPage === page
                      ? 'bg-black border-black text-white'
                      : 'bg-white border-neutral-200 text-neutral-500 hover:border-neutral-400 hover:text-black'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-[9px] font-extrabold uppercase tracking-widest bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-black rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer text-black"
              >
                Next
              </button>
            </div>
          )}

          {/* ADDED SECTION: B2B FAQ FOR PROCUREMENT */}
          <div className="border-t border-neutral-200 pt-20 mt-20 text-left">
            <div className="max-w-3xl mb-12">
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-450 block mb-2 font-mono">B2B Sourcing Support</span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-black">
                Frequently Asked Questions
              </h2>
              <div className="h-0.5 w-8 bg-black mt-3" />
            </div>

            <div className="grid grid-cols-1 gap-4 max-w-4xl">
              {B2B_FAQS.map((faq, i) => (
                <FaqAccordionItem
                  key={i}
                  item={faq}
                  isOpen={activeFaq === i}
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>

          {/* ADDED SECTION: RAPID SAMPLING WORKFLOW STRIP */}
          <div className="border-t border-neutral-200 pt-20 mt-20 text-left">
            <div className="mb-12">
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-450 block mb-2 font-mono">Workflow Steps</span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-black">
                Prototyping & Development Steps
              </h2>
              <div className="h-0.5 w-8 bg-black mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-neutral-200 rounded-xl overflow-hidden shadow-sm bg-white">
              {[
                { step: '01', title: 'Submit Tech Pack', desc: 'Send us your flat designs or mockups.' },
                { step: '02', title: 'Fabric Milling', desc: 'Sourcing of customized GSM fabric parameters.' },
                { step: '03', title: '72hr Prototyping', desc: 'Physical assembly on Sialkot sampling floor.' },
                { step: '04', title: 'DHL Dispatch', desc: 'Express courier delivery for fit signoff.' }
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`p-6 hover:bg-[#f9fafb] transition-colors duration-300 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200 last:border-b-0 last:border-r-0`}
                >
                  <div>
                    <span className="text-2xl font-black text-black tracking-tight block mb-3 font-mono leading-none">{step.step}</span>
                    <h4 className="text-xs font-black text-black uppercase tracking-wider mb-2">{step.title}</h4>
                    <p className="text-neutral-500 text-[11px] font-light leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 3. MAIN CATEGORY VIEW (Active Wear / Team Wear - ENHANCED)
  const categorySubcategories = Object.entries(categoryData?.subcategories || {});

  return (
    <div className="min-h-screen bg-white text-black py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {renderBreadcrumbs()}

        {/* Dynamic Category Selector Menu Tab */}
        <div className="flex gap-2 border-b border-neutral-200 pb-6 mb-12">
          {Object.entries(finalCategories).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setParams({ category: key, sub: null, product: null })}
              className={`text-[10px] font-extrabold uppercase tracking-widest px-6 py-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                activeCategoryKey === key
                  ? 'bg-black border-black text-white shadow-sm'
                  : 'bg-white border-neutral-200 text-neutral-500 hover:border-neutral-400 hover:text-black'
              }`}
            >
              {data.title}
            </button>
          ))}
        </div>

        {/* Category Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-6 text-left">
            <AnimatedSection direction="up" delay={0.05}>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block font-mono">Manufacturing Divisions</span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-black leading-none font-sans">
                {categoryData?.title}
              </h1>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.15}>
              <div className="h-0.5 w-12 bg-black mt-2 mb-4" />
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-sm sm:text-[15px] text-neutral-600 font-light leading-relaxed max-w-xl">
                {categoryData?.description}
              </p>
            </AnimatedSection>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm">
            <Image
              src={categoryData?.heroImage || '/active-wear.png'}
              alt={categoryData?.title || 'Category'}
              fill
              sizes="(max-width: 768px) 100vw, 35vw"
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-5 left-5 text-white text-[10px] font-extrabold uppercase tracking-widest font-mono">
              ABI Sports Manufacturing Division
            </div>
          </div>
        </div>

        {/* Subcategories list */}
        <div className="border-t border-neutral-200 pt-16">
          <div className="mb-12">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-2 font-mono">Explore Product Lines</span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-black">
              Subcategories & Capabilities
            </h2>
            <div className="h-0.5 w-8 bg-black mt-4" />
          </div>

          <StaggerContainer delay={0.15} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categorySubcategories.map(([subKey, subData]) => (
              <StaggerItem
                key={subKey}
                onClick={() => setParams({ sub: subKey })}
                className="bg-white border border-neutral-250 rounded-xl overflow-hidden group shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-500 cursor-pointer flex flex-col md:flex-row h-full"
              >
                <div className="relative aspect-video md:aspect-auto md:w-2/5 min-h-[160px] bg-neutral-150 overflow-hidden">
                  <Image
                    src={subData.image}
                    alt={subData.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 20vw"
                    className="object-cover object-center group-hover:scale-104 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                <div className="p-6 md:w-3/5 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="text-lg font-black text-black uppercase tracking-wider mb-2">
                      {subData.title}
                    </h3>
                    <p className="text-neutral-500 text-xs font-light leading-relaxed line-clamp-3">
                      {subData.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1.5 text-[9px] font-extrabold uppercase tracking-widest text-black pt-6 mt-4 border-t border-neutral-100">
                    <span>Explore Products</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* ADDED SECTION: DYNAMIC FABRIC TECHNOLOGY LAB */}
        {categoryData?.fabricTech && (
          <div className="border-t border-neutral-200 pt-20 mt-20 text-left">
            <div className="mb-12">
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-450 block mb-2 font-mono">R&D and Sourcing</span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-black">
                Fabric Technology Lab
              </h2>
              <div className="h-0.5 w-8 bg-black mt-3" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryData.fabricTech.map((tech, idx) => (
                <div key={idx} className="bg-white border border-neutral-200 rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group relative">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-black transition-colors duration-300 rounded-t-xl" />
                  <div>
                    <div className="h-9 w-9 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center text-black mb-4 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <h3 className="text-xs font-black text-black uppercase tracking-wider mb-2">
                      {tech.name}
                    </h3>
                    <p className="text-neutral-550 text-[11px] font-light leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADDED SECTION: CUSTOMIZATION CAPABILITIES ACCENT TIMELINE */}
        <div className="border-t border-neutral-200 pt-20 mt-20 text-left">
          <div className="mb-12">
            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-450 block mb-2 font-mono">Expert Embellishment</span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-black">
              Vertical Customization Setup
            </h2>
            <div className="h-0.5 w-8 bg-black mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Scissors, title: 'CAD Grading & Laser Cut', desc: 'Patterns are mapped digitally for sizing consistency, followed by computerized laser-guided cutter beds to ensure exact panel matching.' },
              { icon: Tag, title: 'Italian Sublimation & Prints', desc: 'Vibrant club graphics and Pantone matches are locked into raw polyester fibers at high temperatures, completely resistant to washing.' },
              { icon: Shield, title: 'Embellishments & 3D Badging', desc: 'Premium raised 3D silicone transfers, Japanese Tajima satin embroidery crests, and woven brand labels applied precisely in-line.' }
            ].map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <div key={idx} className="bg-white border border-neutral-200 rounded-xl p-7 flex flex-col justify-between shadow-sm relative group">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-black rounded-t-xl" />
                  <div>
                    <div className="h-9 w-9 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-500 group-hover:bg-black group-hover:text-white transition-colors duration-300 mb-5">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-xs font-black text-black uppercase tracking-wider mb-2">{cap.title}</h3>
                    <p className="text-neutral-500 text-xs font-light leading-relaxed">{cap.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
