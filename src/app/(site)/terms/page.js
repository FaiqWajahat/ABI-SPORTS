import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Landmark, FileCheck, Truck, Scale, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Al Badar Impex — B2B Sportswear Manufacturers',
  description:
    'Read the Al Badar Impex terms of service. Learn about B2B pricing quote validity, payment structures, prototyping policies, size tolerances, and bulk shipping agreements.',
};

export default function TermsPage() {
  const terms = [
    {
      icon: FileCheck,
      title: '1. B2B Quotes & Pricing Validity',
      content:
        'All production quotes issued by Al Badar Impex are valid for exactly 30 calendar days from date of issuance. Due to global cotton, polyester yarn, and dye chemical cost fluctuations, prices may be adjusted beyond this window. Quotes do not include shipping freight, import customs tariffs, or localized VAT, which are itemized separately upon final invoice generation.',
    },
    {
      icon: Landmark,
      title: '2. Payment Terms & Deposit Structure',
      content:
        'Our standard B2B payment terms require a 30% to 50% initial deposit (depending on fabric customization and order volume) before fabric milling, dye sublimation setups, or cutting starts. The remaining balance is strictly due upon completion of production, verified through digital QC reports or physical client inspections, and before shipping containers are released from our Sialkot warehouse.',
    },
    {
      icon: Scale,
      title: '3. Textile & Manufacturing Tolerances',
      content:
        'In accordance with standard international textile manufacturing guidelines, custom-sewn sportswear has an allowed sizing specification tolerance of +/- 3% on body chest, width, and length dimensions. Fabric weights (GSM) may vary within +/- 5% due to industrial dyeing processes. Custom dye lot bulk quantities allow a +/- 2% yield variance from the original order sheet.',
    },
    {
      icon: Truck,
      title: '4. Shipping, Logistics & Delivery Duties',
      content:
        'Unless explicitly specified as DDP (Delivered Duty Paid), all bulk orders are shipped FOB (Free on Board) from Sialkot/Karachi ports. Risk of loss and title transfer pass to the buyer once the carrier logs the shipment. Delivery lead times are estimates; Al Badar Impex is not liable for cargo transit delays caused by customs port congestion or global carrier capacity shortages.',
    },
    {
      icon: ShieldAlert,
      title: '5. Quality Claims & Inspection Policy',
      content:
        'Clients have exactly 14 calendar days from the date of cargo delivery at their target warehouse to inspect the bulk shipment and submit written claims regarding sewing defects, missing items, or size deviations. Claims must be accompanied by photo/video documentation. Confirmed factory defects will be resolved via credit notes or priority replacement runs.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black py-20 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.01] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 text-left">
        {/* Header */}
        <div className="mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-widest text-neutral-450 hover:text-black border border-neutral-200 hover:border-black rounded-lg px-4 py-2.5 transition-all duration-300 mb-8 cursor-pointer bg-white"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Home
          </Link>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 block mb-2 font-mono">
            Last Updated: July 14, 2026
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black leading-none">
            Terms of Service
          </h1>
          <div className="h-0.5 w-12 bg-black mt-4 mb-4" />
          <p className="text-neutral-500 text-sm font-light leading-relaxed max-w-2xl">
            These terms govern B2B sportswear custom manufacturing and logistics agreements between Al Badar Impex and purchase organizations. Please review these specifications before initiating prototyping.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12 border-t border-neutral-100 pt-12">
          {terms.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                {/* Column A: Icon & Title */}
                <div className="md:col-span-4 flex items-center md:items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h2 className="text-xs font-black uppercase tracking-wider text-black mt-1">
                    {t.title}
                  </h2>
                </div>
                {/* Column B: Content */}
                <div className="md:col-span-8">
                  <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed">
                    {t.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Accent / Contact */}
        <div className="border-t border-neutral-200 pt-12 mt-16 bg-[#f9fafb] p-6 sm:p-8 rounded-xl border">
          <h3 className="text-xs font-black uppercase tracking-wider text-black mb-3">
            B2B Contractual Agreements & Sign-off
          </h3>
          <p className="text-neutral-500 text-xs font-light leading-relaxed mb-6">
            All bulk manufacturing operations are governed by these standard terms unless a customized supply contract or master service agreement has been executed and signed by both parties.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center text-xs">
            <a
              href="mailto:legal@abisportswear.com"
              className="text-black font-extrabold underline hover:text-neutral-700"
            >
              legal@abisportswear.com
            </a>
            <span className="hidden sm:inline text-neutral-300">|</span>
            <span className="text-neutral-500 font-medium">Al Badar Impex — Legal & Contract Division</span>
          </div>
        </div>
      </div>
    </div>
  );
}
