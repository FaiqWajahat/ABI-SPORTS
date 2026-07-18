import React, { Suspense } from 'react';
import ProductsClient from '@/components/products/ProductsClient';

export const metadata = {
  title: 'Products | Al Badar Impex — Custom Apparel Manufacturer',
  description:
    "Explore Al Badar Impex's catalog of custom activewear, swimwear, teamwear, and streetwear. Request custom samples and bulk B2B quotes.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-neutral-200 border-t-black animate-spin" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 font-mono">Loading Products...</span>
        </div>
      </div>
    }>
      <ProductsClient />
    </Suspense>
  );
}
