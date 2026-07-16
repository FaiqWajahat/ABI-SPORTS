'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Check, CheckCircle2,
  Package, Shirt, Scissors, ShieldCheck,
  Clock, Zap, Globe, User, Settings,
  Tag, FileText, Send, ChevronDown
} from 'lucide-react';

// ─── Constants ───────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, icon: User,     label: 'Your Company',  desc: 'Contact & brand info' },
  { id: 2, icon: Shirt,    label: 'Product',       desc: 'What are you building?' },
  { id: 3, icon: Settings, label: 'Specifications',desc: 'Quantities & timeline' },
  { id: 4, icon: Tag,      label: 'Branding',      desc: 'Print & decoration' },
  { id: 5, icon: FileText, label: 'Review',        desc: 'Confirm & submit' },
];

const PRODUCT_TYPES = [
  { id: 'team-kits',    icon: Shirt,       label: 'Team Kits',      sub: 'Match & tournament kits' },
  { id: 'activewear',   icon: Package,     label: 'Activewear',     sub: 'Gym & performance wear' },
  { id: 'training',     icon: Zap,         label: 'Training Wear',  sub: 'Training tops & bottoms' },
  { id: 'outerwear',    icon: ShieldCheck, label: 'Outerwear',      sub: 'Jackets & shell layers' },
  { id: 'private-label',icon: Scissors,    label: 'Private Label',  sub: 'OEM / custom branding' },
  { id: 'other',        icon: Globe,       label: 'Other / Mixed',  sub: 'Multiple categories' },
];

const FABRICS = [
  { id: 'poly',    label: 'Performance Polyester', gsm: '120–180 GSM' },
  { id: 'rpet',    label: 'Recycled rPET',         gsm: '140–200 GSM' },
  { id: 'lycra',   label: 'Nylon-Lycra Stretch',   gsm: '150–230 GSM' },
  { id: 'cotton',  label: 'GOTS Organic Cotton',   gsm: '180–260 GSM' },
  { id: 'fleece',  label: 'Fleece Brushed Terry',  gsm: '280–380 GSM' },
  { id: 'shell',   label: 'Waterproof Shell',      gsm: '90–130 GSM' },
  { id: 'unsure',  label: 'Need Recommendation',   gsm: "We'll advise" },
];

const PRINT_METHODS = [
  { id: 'sublimation',   label: 'Dye Sublimation',   sub: 'Full-colour allover prints' },
  { id: 'embroidery',    label: 'Tajima Embroidery',  sub: 'Logos, crests & badges' },
  { id: 'heat-transfer', label: '3D Heat Transfer',   sub: 'Silicone names & numbers' },
  { id: 'screen',        label: 'Screen Print',       sub: 'Block-colour graphics' },
  { id: 'none',          label: 'Plain / No Print',   sub: 'Blank garments only' },
];

const MOQ_RANGES  = ['50–99', '100–249', '250–499', '500–999', '1,000–4,999', '5,000+'];
const TIMELINES   = ['Rush — within 3 weeks', 'Standard — 4–6 weeks', 'Relaxed — 6–10 weeks', 'Flexible / Planning stage'];
const SIZES       = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', 'Kids (2–14yr)', 'Custom Sizing'];
const PACKAGING   = ['Custom woven label', 'Custom hang tag', 'Branded polybag', 'Barcode / SKU label', 'Anti-humidity silica', 'RFID tag integration'];

const TRUST = [
  { icon: Clock,        text: '12-hr response time' },
  { icon: CheckCircle2, text: '72-hr sample delivery' },
  { icon: ShieldCheck,  text: 'WRAP Platinum certified' },
  { icon: Globe,        text: '60+ countries shipped' },
];

// ─── Primitive inputs ────────────────────────────────────────────────────────

function FieldLabel({ children, required, hint }) {
  return (
    <div className="flex items-center justify-between mb-2">
      <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-500">
        {children}
        {required && <span className="text-black ml-0.5">*</span>}
      </label>
      {hint && <span className="text-[8px] font-medium text-neutral-400 normal-case tracking-normal">{hint}</span>}
    </div>
  );
}

function TextInput({ label, required, hint, id, type = 'text', placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <FieldLabel required={required} hint={hint}>{label}</FieldLabel>
      <div className={`relative rounded-xl border transition-all duration-200 ${focused ? 'border-black ring-2 ring-black/8' : 'border-neutral-200 hover:border-neutral-300'}`}>
        <input
          id={id} type={type} value={value} onChange={onChange} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className="w-full bg-white px-4 py-3.5 text-sm text-black placeholder-neutral-300 rounded-xl outline-none"
        />
      </div>
    </div>
  );
}

function TextareaInput({ label, required, hint, id, placeholder, rows = 4, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <FieldLabel required={required} hint={hint}>{label}</FieldLabel>
      <div className={`relative rounded-xl border transition-all duration-200 ${focused ? 'border-black ring-2 ring-black/8' : 'border-neutral-200 hover:border-neutral-300'}`}>
        <textarea
          id={id} rows={rows} value={value} onChange={onChange} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className="w-full bg-white px-4 py-3.5 text-sm text-black placeholder-neutral-300 rounded-xl outline-none resize-none"
        />
      </div>
    </div>
  );
}

function SelectInput({ label, required, hint, id, value, onChange, children }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <FieldLabel required={required} hint={hint}>{label}</FieldLabel>
      <div className={`relative rounded-xl border transition-all duration-200 ${focused ? 'border-black ring-2 ring-black/8' : 'border-neutral-200 hover:border-neutral-300'}`}>
        <select
          id={id} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className="w-full bg-white px-4 py-3.5 text-sm text-black rounded-xl outline-none appearance-none cursor-pointer pr-10"
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
      </div>
    </div>
  );
}

// ─── Toggle selectors ────────────────────────────────────────────────────────

function Chip({ selected, onClick, children }) {
  return (
    <button type="button" onClick={onClick}
      className={`px-3.5 py-2.5 rounded-xl border text-[9px] font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
        selected ? 'bg-black border-black text-white shadow-sm' : 'bg-white border-neutral-200 text-neutral-500 hover:border-neutral-400 hover:text-neutral-800'
      }`}
    >
      {selected && <Check className="h-2.5 w-2.5 flex-shrink-0" />}
      {children}
    </button>
  );
}

function ProductCard({ item, selected, onClick }) {
  const Icon = item.icon;
  return (
    <button type="button" onClick={onClick}
      className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer w-full ${
        selected ? 'bg-black border-black shadow-md' : 'bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-sm'
      }`}
    >
      <div className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
        selected ? 'bg-white/15' : 'bg-neutral-100'
      }`}>
        <Icon className={`h-4 w-4 ${selected ? 'text-white' : 'text-neutral-500'}`} />
      </div>
      <div className="flex-grow min-w-0">
        <p className={`text-[10px] font-black uppercase tracking-wider leading-tight ${selected ? 'text-white' : 'text-black'}`}>{item.label}</p>
        <p className={`text-[8px] font-medium mt-0.5 leading-tight ${selected ? 'text-neutral-400' : 'text-neutral-400'}`}>{item.sub}</p>
      </div>
      {selected && <Check className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />}
    </button>
  );
}

function FabricCard({ item, selected, onClick }) {
  return (
    <button type="button" onClick={onClick}
      className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer w-full group ${
        selected ? 'bg-black border-black' : 'bg-white border-neutral-200 hover:border-neutral-300'
      }`}
    >
      <div>
        <p className={`text-[9px] font-black uppercase tracking-wider ${selected ? 'text-white' : 'text-neutral-800'}`}>{item.label}</p>
        <p className={`text-[8px] font-mono mt-0.5 ${selected ? 'text-neutral-500' : 'text-neutral-400'}`}>{item.gsm}</p>
      </div>
      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
        selected ? 'bg-white border-white' : 'border-neutral-300 group-hover:border-neutral-500'
      }`}>
        {selected && <Check className="h-2.5 w-2.5 text-black" />}
      </div>
    </button>
  );
}

function PrintCard({ item, selected, onClick }) {
  return (
    <button type="button" onClick={onClick}
      className={`flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-all duration-200 cursor-pointer w-full group ${
        selected ? 'bg-black border-black shadow-sm' : 'bg-white border-neutral-200 hover:border-neutral-300'
      }`}
    >
      <div>
        <p className={`text-[10px] font-black uppercase tracking-wider ${selected ? 'text-white' : 'text-black'}`}>{item.label}</p>
        <p className={`text-[8px] mt-0.5 font-medium ${selected ? 'text-neutral-400' : 'text-neutral-400'}`}>{item.sub}</p>
      </div>
      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
        selected ? 'bg-white border-white' : 'border-neutral-300 group-hover:border-neutral-500'
      }`}>
        {selected && <Check className="h-2.5 w-2.5 text-black" />}
      </div>
    </button>
  );
}

function MoqCard({ label, selected, onClick }) {
  return (
    <button type="button" onClick={onClick}
      className={`py-3 px-4 rounded-xl border text-center transition-all duration-200 cursor-pointer w-full ${
        selected ? 'bg-black border-black shadow-sm' : 'bg-white border-neutral-200 hover:border-neutral-300'
      }`}
    >
      <p className={`text-sm font-black tracking-tight ${selected ? 'text-white' : 'text-black'}`}>{label}</p>
      <p className={`text-[7px] font-extrabold uppercase tracking-widest mt-0.5 ${selected ? 'text-neutral-500' : 'text-neutral-400'}`}>units</p>
    </button>
  );
}

// ─── Step panels ─────────────────────────────────────────────────────────────

function StepCompany({ data, set }) {
  const f = (k) => (e) => set(p => ({ ...p, [k]: e.target.value }));
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput label="First Name" required id="fn" placeholder="James" value={data.firstName} onChange={f('firstName')} />
        <TextInput label="Last Name" required id="ln" placeholder="Miller" value={data.lastName} onChange={f('lastName')} />
      </div>
      <TextInput label="Company / Brand Name" required id="co" placeholder="Blaze United FC" value={data.company} onChange={f('company')} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput label="Business Email" required id="em" type="email" placeholder="james@blazeunited.com" value={data.email} onChange={f('email')} />
        <TextInput label="WhatsApp / Phone" id="ph" placeholder="+1 555 000 0000" value={data.phone} onChange={f('phone')} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput label="Country" required id="cn" placeholder="Germany" value={data.country} onChange={f('country')} />
        <TextInput label="Website" id="web" placeholder="https://blazeunited.com" value={data.website} onChange={f('website')} />
      </div>
      <SelectInput label="How did you hear about us?" id="src" value={data.source} onChange={f('source')}>
        <option value="">— Select one —</option>
        {['Google Search','LinkedIn','Industry Referral','Trade Show','Social Media','Previous Customer','Other'].map(o => <option key={o}>{o}</option>)}
      </SelectInput>
    </div>
  );
}

function StepProduct({ data, set }) {
  const toggleArr = (k, v) => set(p => ({ ...p, [k]: p[k].includes(v) ? p[k].filter(x => x !== v) : [...p[k], v] }));
  return (
    <div className="space-y-8">
      <div>
        <FieldLabel hint="Select all that apply">Product Category *</FieldLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
          {PRODUCT_TYPES.map(pt => (
            <ProductCard key={pt.id} item={pt}
              selected={data.productTypes.includes(pt.id)}
              onClick={() => toggleArr('productTypes', pt.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <FieldLabel hint="Select all that apply">Fabric Preference</FieldLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
          {FABRICS.map(f => (
            <FabricCard key={f.id} item={f}
              selected={data.fabrics.includes(f.id)}
              onClick={() => toggleArr('fabrics', f.id)}
            />
          ))}
        </div>
      </div>

      <TextareaInput label="Product Description" id="pd" rows={3}
        placeholder="E.g. Full home/away/third kit for a semi-professional football club. Allover sublimation, player names and squad numbers required, anti-odour treatment."
        value={data.productDesc} onChange={e => set(p => ({ ...p, productDesc: e.target.value }))}
      />
    </div>
  );
}

function StepSpecs({ data, set }) {
  const f = (k) => (e) => set(p => ({ ...p, [k]: e.target.value }));
  const toggleArr = (k, v) => set(p => ({ ...p, [k]: p[k].includes(v) ? p[k].filter(x => x !== v) : [...p[k], v] }));
  return (
    <div className="space-y-8">
      <div>
        <FieldLabel required>Order Quantity</FieldLabel>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mt-1">
          {MOQ_RANGES.map(r => (
            <MoqCard key={r} label={r} selected={data.moq === r} onClick={() => set(p => ({ ...p, moq: r }))} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SelectInput label="Colourways" id="cw" value={data.colorways} onChange={f('colorways')}>
          <option value="">— Select —</option>
          {['1','2','3','4','5','6+'].map(v => <option key={v}>{v}</option>)}
        </SelectInput>
        <SelectInput label="SKUs / Styles" id="sk" value={data.styles} onChange={f('styles')}>
          <option value="">— Select —</option>
          {['1','2–3','4–6','7–10','10+'].map(v => <option key={v}>{v}</option>)}
        </SelectInput>
        <SelectInput label="Budget per Unit" id="bud" value={data.budget} onChange={f('budget')}>
          <option value="">— Select —</option>
          {['Under $8','$8–$15','$15–$25','$25–$50','$50+','Open to quote'].map(v => <option key={v}>{v}</option>)}
        </SelectInput>
      </div>

      <div>
        <FieldLabel required>Required Timeline</FieldLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
          {TIMELINES.map(t => (
            <button key={t} type="button" onClick={() => set(p => ({ ...p, timeline: t }))}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                data.timeline === t ? 'bg-black border-black' : 'bg-white border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-wider ${data.timeline === t ? 'text-white' : 'text-black'}`}>{t}</span>
              {data.timeline === t && <Check className="h-3.5 w-3.5 text-white flex-shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      <div>
        <FieldLabel hint="Select all that apply">Size Range</FieldLabel>
        <div className="flex flex-wrap gap-2 mt-1">
          {SIZES.map(s => (
            <Chip key={s} selected={data.sizes.includes(s)} onClick={() => toggleArr('sizes', s)}>{s}</Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepBranding({ data, set }) {
  const f = (k) => (e) => set(p => ({ ...p, [k]: e.target.value }));
  const toggleArr = (k, v) => set(p => ({ ...p, [k]: p[k].includes(v) ? p[k].filter(x => x !== v) : [...p[k], v] }));
  return (
    <div className="space-y-8">
      <div>
        <FieldLabel hint="Select all that apply">Decoration / Print Methods</FieldLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
          {PRINT_METHODS.map(pm => (
            <PrintCard key={pm.id} item={pm}
              selected={data.printMethods.includes(pm.id)}
              onClick={() => toggleArr('printMethods', pm.id)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectInput label="Brand Assets Available?" id="ass" value={data.assets} onChange={f('assets')}>
          <option value="">— Select —</option>
          <option>Yes — vector files (AI/EPS/PDF)</option>
          <option>Yes — raster files only (PNG/JPG)</option>
          <option>No — need design assistance</option>
          <option>Partially — some files available</option>
        </SelectInput>
        <SelectInput label="Tech Pack / Design Brief?" id="tp" value={data.techPack} onChange={f('techPack')}>
          <option value="">— Select —</option>
          <option>Yes — full tech pack ready</option>
          <option>Yes — design reference only</option>
          <option>No — starting from scratch</option>
          <option>In progress — will send soon</option>
        </SelectInput>
      </div>

      <div>
        <FieldLabel hint="Select all that apply">Labelling & Packaging</FieldLabel>
        <div className="flex flex-wrap gap-2 mt-1">
          {PACKAGING.map(l => (
            <Chip key={l} selected={data.packaging.includes(l)} onClick={() => toggleArr('packaging', l)}>{l}</Chip>
          ))}
        </div>
      </div>

      <TextareaInput label="Additional Notes or Special Requirements" id="notes" rows={4}
        placeholder="E.g. RFID tracking integration required. All kits need UV-reactive ink on third colourway. Delivery to Hamburg warehouse by April 15th."
        value={data.notes} onChange={e => set(p => ({ ...p, notes: e.target.value }))}
      />
    </div>
  );
}

function StepReview({ d }) {
  const FABRICS_MAP = Object.fromEntries(FABRICS.map(f => [f.id, f.label]));
  const PRINT_MAP   = Object.fromEntries(PRINT_METHODS.map(p => [p.id, p.label]));
  const PROD_MAP    = Object.fromEntries(PRODUCT_TYPES.map(p => [p.id, p.label]));

  const Block = ({ title, rows }) => (
    <div className="rounded-xl border border-neutral-200 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 bg-[#f9fafb] border-b border-neutral-200">
        <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500">{title}</span>
      </div>
      <div className="bg-white divide-y divide-neutral-100">
        {rows.filter(r => r.val && (Array.isArray(r.val) ? r.val.length > 0 : true)).map(({ key, val }) => (
          <div key={key} className="flex gap-4 px-5 py-3">
            <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-400 w-28 flex-shrink-0 pt-0.5 leading-relaxed">{key}</span>
            <span className="text-[11px] text-neutral-700 font-medium leading-relaxed">
              {Array.isArray(val) ? val.join(' · ') : val}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="bg-black text-white rounded-xl p-5 flex items-start gap-3 mb-2">
        <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-black uppercase tracking-wider mb-0.5">Ready to submit?</p>
          <p className="text-[10px] text-neutral-400 font-light leading-relaxed">Review your requirements below. Our team will respond within 12 business hours with a detailed production quote.</p>
        </div>
      </div>

      <Block title="Company Information" rows={[
        { key: 'Contact',  val: `${d.company.firstName} ${d.company.lastName}`.trim() },
        { key: 'Company',  val: d.company.company },
        { key: 'Email',    val: d.company.email },
        { key: 'Phone',    val: d.company.phone },
        { key: 'Country',  val: d.company.country },
        { key: 'Website',  val: d.company.website },
      ]} />
      <Block title="Product Requirements" rows={[
        { key: 'Categories', val: d.product.productTypes.map(id => PROD_MAP[id]) },
        { key: 'Fabrics',    val: d.product.fabrics.map(id => FABRICS_MAP[id]) },
        { key: 'Description',val: d.product.productDesc },
      ]} />
      <Block title="Order Specifications" rows={[
        { key: 'Quantity',   val: d.specs.moq ? `${d.specs.moq} units` : '' },
        { key: 'Colourways', val: d.specs.colorways },
        { key: 'SKUs',       val: d.specs.styles },
        { key: 'Timeline',   val: d.specs.timeline },
        { key: 'Budget',     val: d.specs.budget },
        { key: 'Sizes',      val: d.specs.sizes },
      ]} />
      <Block title="Branding & Details" rows={[
        { key: 'Print',      val: d.details.printMethods.map(id => PRINT_MAP[id]) },
        { key: 'Assets',     val: d.details.assets },
        { key: 'Tech Pack',  val: d.details.techPack },
        { key: 'Packaging',  val: d.details.packaging },
        { key: 'Notes',      val: d.details.notes },
      ]} />

      <p className="text-[8px] text-neutral-400 leading-relaxed px-1">
        By submitting you agree to be contacted by the ABI Sports B2B sales team. Your information is kept strictly confidential and never shared with third parties.
      </p>
    </div>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ name, email }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-lg w-full"
      >
        {/* Animated check */}
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
          className="h-20 w-20 rounded-full bg-black flex items-center justify-center mx-auto mb-8 shadow-lg"
        >
          <Check className="h-9 w-9 text-white" strokeWidth={3} />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 block mb-3">Quote Submitted Successfully</span>
          <h1 className="text-3xl font-black text-black uppercase tracking-tight mb-4">We've Got Your Brief</h1>
          <div className="h-0.5 w-12 bg-black mx-auto mb-6" />
          <p className="text-neutral-500 text-sm font-light leading-relaxed mb-8">
            Thank you, <span className="text-black font-semibold">{name}</span>. Our B2B sales team will review your requirements and send a detailed production quote to{' '}
            <span className="text-black font-semibold">{email}</span> within <strong>12 business hours</strong>.
          </p>
        </motion.div>

        {/* Trust grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-3 mb-8"
        >
          {TRUST.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-3 bg-[#f9fafb] border border-neutral-200 rounded-xl p-4 text-left">
              <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center flex-shrink-0">
                <Icon className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-600 leading-tight">{text}</span>
            </div>
          ))}
        </motion.div>

        <motion.a
          href="/"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
          className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-widest text-white bg-black hover:bg-neutral-800 rounded-xl px-6 py-3.5 transition-all duration-300 cursor-pointer"
        >
          Back to Home <ArrowRight className="h-3 w-3" />
        </motion.a>
      </motion.div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const INIT = {
  company:  { firstName: '', lastName: '', company: '', email: '', phone: '', country: '', website: '', source: '' },
  product:  { productTypes: [], fabrics: [], productDesc: '' },
  specs:    { moq: '', colorways: '', styles: '', timeline: '', budget: '', sizes: [] },
  details:  { printMethods: [], assets: '', techPack: '', packaging: [], notes: '' },
};

export default function QuoteForm() {
  const [step, setStep]         = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData]         = useState(INIT);
  const topRef                  = useRef(null);

  const update = (section) => (val) =>
    setData(p => ({ ...p, [section]: typeof val === 'function' ? val(p[section]) : val }));

  const goTo = (n) => {
    setStep(n);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (submitted) return <SuccessScreen name={data.company.firstName || 'there'} email={data.company.email} />;

  const panels = [
    <StepCompany  key={1} data={data.company} set={update('company')} />,
    <StepProduct  key={2} data={data.product} set={update('product')} />,
    <StepSpecs    key={3} data={data.specs}   set={update('specs')} />,
    <StepBranding key={4} data={data.details} set={update('details')} />,
    <StepReview   key={5} d={data} />,
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb]" ref={topRef}>

      {/* ── Page header ── */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pt-10 pb-8">

          {/* Title row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-neutral-400 block mb-2 font-mono">B2B Manufacturing Inquiry</span>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black leading-tight">
                Request a Production Quote
              </h1>
              <div className="h-0.5 w-12 bg-black mt-4" />
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {TRUST.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-black flex-shrink-0" />
                  <span className="text-[8px] font-extrabold uppercase tracking-wider text-neutral-500">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Horizontal step tracker ── */}
          <div className="flex items-center gap-0">
            {STEPS.map((s, i) => {
              const done   = step > s.id;
              const active = step === s.id;
              const Icon   = s.icon;
              return (
                <React.Fragment key={s.id}>
                  <button
                    type="button"
                    onClick={() => done && goTo(s.id)}
                    className={`flex flex-col items-center gap-1.5 flex-shrink-0 transition-all duration-300 ${
                      done ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      active
                        ? 'bg-black border-black text-white scale-110 shadow-md'
                        : done
                        ? 'bg-neutral-800 border-neutral-800 text-white'
                        : 'bg-white border-neutral-200 text-neutral-400'
                    }`}>
                      {done
                        ? <Check className="h-3.5 w-3.5" />
                        : <Icon className="h-3.5 w-3.5" />
                      }
                    </div>
                    <span className={`text-[8px] font-extrabold uppercase tracking-wider hidden sm:block ${
                      active ? 'text-black' : done ? 'text-neutral-500' : 'text-neutral-300'
                    }`}>{s.label}</span>
                  </button>

                  {/* Connector line between steps */}
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-px mx-2 relative overflow-hidden">
                      <div className="absolute inset-0 bg-neutral-200 rounded-full" />
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-black rounded-full"
                        animate={{ width: done ? '100%' : '0%' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── LEFT: Sidebar ── */}
          <div className="lg:col-span-3 lg:sticky lg:top-8 space-y-4">

            {/* Steps list */}
            <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-neutral-100">
                <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-400">Your Progress</span>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex-1 h-1 bg-neutral-100 rounded-full overflow-hidden mr-3">
                    <motion.div className="h-full bg-black rounded-full origin-left"
                      animate={{ scaleX: (step - 1) / (STEPS.length - 1) }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <span className="text-[9px] font-black text-neutral-500 font-mono flex-shrink-0">{step}/{STEPS.length}</span>
                </div>
              </div>

              <div className="divide-y divide-neutral-50">
                {STEPS.map((s) => {
                  const done   = step > s.id;
                  const active = step === s.id;
                  const Icon   = s.icon;
                  return (
                    <button
                      key={s.id} type="button"
                      onClick={() => done && goTo(s.id)}
                      className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all duration-200 ${
                        active ? 'bg-neutral-950 cursor-default'
                        : done  ? 'hover:bg-neutral-50 cursor-pointer'
                        : 'opacity-35 cursor-default'
                      }`}
                    >
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                        active ? 'bg-white' : done ? 'bg-neutral-700' : 'bg-neutral-200'
                      }`}>
                        {done
                          ? <Check className="h-2.5 w-2.5 text-white" />
                          : <Icon className={`h-2.5 w-2.5 ${active ? 'text-black' : 'text-neutral-500'}`} />
                        }
                      </div>
                      <div className="min-w-0 flex-grow">
                        <p className={`text-[9px] font-black uppercase tracking-wider truncate ${
                          active ? 'text-white' : done ? 'text-neutral-600' : 'text-neutral-400'
                        }`}>{s.label}</p>
                        <p className={`text-[7.5px] font-medium truncate mt-0.5 ${
                          active ? 'text-neutral-500' : 'text-neutral-400'
                        }`}>{s.desc}</p>
                      </div>
                      {done && (
                        <span className="text-[7px] font-extrabold text-neutral-400 uppercase tracking-wider flex-shrink-0">Done</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trust card */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-black" />
              <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-400 block">Why ABI Sports</span>
              {TRUST.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-3 w-3 text-black" />
                  </div>
                  <span className="text-[9px] font-bold text-neutral-600 leading-tight">{text}</span>
                </div>
              ))}
            </div>

            {/* Estimated time */}
            <div className="bg-[#f9fafb] border border-neutral-200 rounded-2xl p-4 flex items-start gap-3">
              <Clock className="h-4 w-4 text-neutral-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[9px] font-black uppercase tracking-wider text-neutral-600">Est. ~8 minutes</p>
                <p className="text-[8px] font-light text-neutral-400 mt-0.5 leading-snug">to complete all 5 steps. We respond within 12 business hours.</p>
              </div>
            </div>

          </div>

          {/* ── RIGHT: Form card ── */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">

              {/* ── Card header ── */}
              <div className="px-7 pt-6 pb-5 border-b border-neutral-100">

                {/* Step name + description */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                      {(() => { const Icon = STEPS[step - 1].icon; return <Icon className="h-3.5 w-3.5 text-white" />; })()}
                    </div>
                    <div>
                      <h2 className="text-sm font-black uppercase tracking-wider text-black leading-tight">
                        {STEPS[step - 1].label}
                      </h2>
                      <p className="text-[9px] font-light text-neutral-400 mt-0.5">{STEPS[step - 1].desc}</p>
                    </div>
                  </div>
                  <span className="text-[8px] font-extrabold uppercase tracking-widest text-neutral-300 font-mono flex-shrink-0">
                    Step {step} of {STEPS.length}
                  </span>
                </div>

                {/* Segmented progress bar */}
                <div className="flex gap-1.5">
                  {STEPS.map((s, i) => (
                    <motion.div
                      key={s.id}
                      className={`flex-1 h-1.5 rounded-full transition-colors duration-400 ${
                        i < step ? 'bg-black' : 'bg-neutral-100'
                      }`}
                      layout
                    />
                  ))}
                </div>
              </div>

              {/* ── Form body ── */}
              <div className="px-7 py-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {panels[step - 1]}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Navigation footer ── */}
              <div className="px-7 py-5 border-t border-neutral-100 flex items-center justify-between gap-4">

                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  disabled={step === 1}
                  className={`inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-widest rounded-xl px-5 py-3 transition-all duration-200 border ${
                    step === 1
                      ? 'text-neutral-300 bg-neutral-50 border-neutral-100 cursor-not-allowed'
                      : 'text-black bg-white border-neutral-200 hover:border-black cursor-pointer'
                  }`}
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>

                <div className="flex items-center gap-4">
                  {/* Dot trail */}
                  <div className="hidden sm:flex items-center gap-1.5">
                    {STEPS.map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-full transition-all duration-300 ${
                          i === step - 1 ? 'w-5 h-1.5 bg-black'
                          : i < step - 1  ? 'w-1.5 h-1.5 bg-neutral-400'
                          : 'w-1.5 h-1.5 bg-neutral-200'
                        }`}
                      />
                    ))}
                  </div>

                  {step < STEPS.length ? (
                    <button
                      type="button"
                      onClick={() => goTo(step + 1)}
                      className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-widest text-white bg-black hover:bg-neutral-800 rounded-xl px-6 py-3 transition-all duration-200 cursor-pointer"
                    >
                      Continue
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSubmitted(true)}
                      className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-widest text-white bg-black hover:bg-neutral-800 rounded-xl px-6 py-3 transition-all duration-200 cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Submit Quote Request
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
