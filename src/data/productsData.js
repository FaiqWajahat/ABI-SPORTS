export const CATEGORIES = {
  'active-wear': {
    title: 'Active Wear',
    description: 'High-performance gym wear, compression apparel, running singlets, and cycling kits engineered for maximum mobility, moisture management, and durability.',
    heroImage: '/active-wear.png',
    subcategories: {
      'gym-wear': {
        title: 'Gym Wear',
        description: 'High-stretch, moisture-wicking, and compression-fit apparel optimized for weightlifting, intensive fitness, and premium lifestyle athleisure.',
        image: '/active-wear.png'
      },
      'swim-wear': {
        title: 'Swim Wear',
        description: 'Chlorine-resistant, UPF 50+ protected swimwear constructed with low-drag flatlock stitching for professional water performance.',
        image: '/team-wear.png'
      },
      'running': {
        title: 'Running',
        description: 'Ultra-lightweight fabrics with strategic laser-cut ventilation zones, 3M reflective trims, and ergonomic splits for athletic movement.',
        image: '/active-wear.png'
      },
      'cycling': {
        title: 'Cycling',
        description: 'Aerodynamic race-cut jerseys, multi-density Italian chamois bibs, and raw-cut silicone retention bands designed for long endurance rides.',
        image: '/team-wear.png'
      }
    },
    fabricTech: [
      { name: 'AeroDry Polyester', desc: 'Moisture-wicking micro-fiber that pulls sweat away from skin instantly for quick evaporation.' },
      { name: 'rPET Eco-Yarn', desc: 'Sustainable fibers certified by GRS, manufactured from recycled water bottles without losing tensile strength.' },
      { name: 'Nylon-Spandex 4-Way Stretch', desc: 'Premium high-density interlock weave offering modular muscle compression and shape retention.' },
      { name: 'Silver-Ion Anti-Odor', desc: 'Infused fabric coating that inhibits bacterial growth to prevent sweat odors over long-term wear.' }
    ]
  },
  'team-wear': {
    title: 'Team Wear',
    description: 'Professional-grade sublimated kits, customizable team uniforms, and durable warmup gear manufactured to meet league regulatory standards.',
    heroImage: '/team-wear.png',
    subcategories: {
      'baseball': {
        title: 'Baseball',
        description: 'Classic button-up pinstripe jerseys and abrasion-resistant sliding pants with double-reinforced knee structures.',
        image: '/team-wear.png'
      },
      'basketball': {
        title: 'Basketball',
        description: 'Reversible mock-mesh scrim vests and loose-fit game jerseys optimized for fast pivots and unrestricted shooting ranges.',
        image: '/team-wear.png'
      },
      'soccer': {
        title: 'Soccer / Football',
        description: 'Elite sublimated club match jerseys, mesh panels, goalie protective gear, and durable technical team socks.',
        image: '/active-wear.png'
      },
      'american-football': {
        title: 'American Football',
        description: 'Heavyweight spandex panels, reinforced dual-ply yoke shoulders, and integrated padded practice pants built for impact.',
        image: '/hero.png'
      }
    },
    fabricTech: [
      { name: 'DuraGrid Mesh', desc: 'High-tensile open-weave mesh designed to withstand pulling and tearing in high-contact team sports.' },
      { name: 'Kian Subli-Ink Standard', desc: 'Sublimation printing using premium Italian inks for absolute color depth that never cracks, fades, or peels.' },
      { name: 'Dazzle Poly Panels', desc: 'High-sheen, heavy-duty double-layered panels across shoulders and chest to support impact pad protection.' },
      { name: 'DryLock Hydrophobic Finish', desc: 'Anti-water finish that prevents rain saturation, keeping garments light on match days.' }
    ]
  }
};

export const SIZING_GUIDES = {
  tops: [
    { size: 'XS', chest: '34-36"', length: '27"', sleeve: '32"' },
    { size: 'S', chest: '36-38"', length: '28"', sleeve: '33"' },
    { size: 'M', chest: '38-40"', length: '29"', sleeve: '34"' },
    { size: 'L', chest: '40-42"', length: '30"', sleeve: '35"' },
    { size: 'XL', chest: '42-44"', length: '31"', sleeve: '36"' },
    { size: 'XXL', chest: '44-46"', length: '32"', sleeve: '37"' },
    { size: '3XL', chest: '46-48"', length: '33"', sleeve: '38"' }
  ],
  bottoms: [
    { size: 'XS', waist: '26-28"', hip: '32-34"', inseam: '29"' },
    { size: 'S', waist: '28-30"', hip: '34-36"', inseam: '30"' },
    { size: 'M', waist: '30-32"', hip: '36-38"', inseam: '31"' },
    { size: 'L', waist: '32-34"', hip: '38-40"', inseam: '32"' },
    { size: 'XL', waist: '34-36"', hip: '40-42"', inseam: '33"' },
    { size: 'XXL', waist: '36-38"', hip: '42-44"', inseam: '34"' },
    { size: '3XL', waist: '38-40"', hip: '44-46"', inseam: '35"' }
  ]
};

export const PRODUCTS = [
  // Gym Wear
  {
    id: 'apex-compression-tee',
    name: 'Apex Compression Tee',
    category: 'active-wear',
    subcategory: 'gym-wear',
    priceRange: 'OEM Bulk Quote',
    image: '/active-wear.png',
    description: 'A premium, high-tension compression shirt engineered to support core muscles and maximize oxygen delivery during intensive workouts. Built with integrated mesh ventilation zones along the spine.',
    specs: [
      '200 GSM Polyester-Lycra blend fabric',
      '4-way elastomeric stretch compression fit',
      'Anti-microbial and moisture-wicking finish',
      'Low-profile flatlock seams to prevent skin chafing'
    ],
    mfgDetails: {
      moq: '150 Units per colorway',
      leadTime: '18-22 Business Days',
      customization: 'Silicone 3D print logo, custom woven back label'
    },
    performanceTech: 'Zoned rib structures around major muscle groups reduce vibrational fatigue, while double-needle flatlock coverstitch creates an entirely flat inner joint profile, preventing seam bites.',
    sizingType: 'tops'
  },
  {
    id: 'precision-joggers',
    name: 'Precision Training Joggers',
    category: 'active-wear',
    subcategory: 'gym-wear',
    priceRange: 'OEM Bulk Quote',
    image: '/active-wear.png',
    description: 'Premium tailored joggers designed with flexible knee articulation panels and secure YKK zippered storage pockets. Ideal for both warmup sessions and cold-weather athletic training.',
    specs: [
      '280 GSM Double-knit fleece cotton-polyester blend',
      'Anatomically articulated knees for mobility',
      'Encased elastic waistband with heavy-duty flat drawcord',
      'Low-profile YKK concealed zipper pockets'
    ],
    mfgDetails: {
      moq: '100 Units',
      leadTime: '21-25 Business Days',
      customization: 'Embroidered crest, custom branded zipper pulls'
    },
    performanceTech: 'Equipped with a heavyweight cotton-poly blend brushed interior to lock body heat, combined with external spandex knee gussets for zero resistance during squats or sprints.',
    sizingType: 'bottoms'
  },
  {
    id: 'tech-fit-hoodie',
    name: 'Tech Fit Performance Hoodie',
    category: 'active-wear',
    subcategory: 'gym-wear',
    priceRange: 'OEM Bulk Quote',
    image: '/active-wear.png',
    description: 'A modern technical training hoodie featuring water-resistant surface coating, laser-bonded zippered chest pockets, and thumbholes in cuffs.',
    specs: [
      '320 GSM Scuba fleece fabric',
      'Water-repellent technical coating',
      'Integrated thumbhole cuffs for hand warmth',
      'Concealed drawcords within scuba hood'
    ],
    mfgDetails: {
      moq: '100 Units',
      leadTime: '24-28 Business Days',
      customization: 'Rubber badge heat press, customized aglets'
    },
    performanceTech: 'Features premium heavy-duty scuba knit panels with micro-pores that vent excess vapor while preventing wind penetration, making it an elite outer layer.',
    sizingType: 'tops'
  },

  // Swim Wear
  {
    id: 'hydro-sub-boardshorts',
    name: 'Hydro Sublimated Boardshorts',
    category: 'active-wear',
    subcategory: 'swim-wear',
    priceRange: 'OEM Bulk Quote',
    image: '/team-wear.png',
    description: 'Professional boardshorts featuring high-resolution dye sublimation with Italian non-bleed inks. Designed with a water-repellent coating for fast dry times out of the water.',
    specs: [
      '140 GSM Quick-dry 4-way stretch polyester',
      'Durable Water Repellent (DWR) fabric coating',
      'Triple-needle reinforced seat and side seams',
      'Integrated rear pocket with drainage grommet and key loop'
    ],
    mfgDetails: {
      moq: '200 Units per design',
      leadTime: '24-28 Business Days',
      customization: 'Full-bleed sublimation, logo heat-transfer'
    },
    performanceTech: 'Engineered with hydrophobic yarns that prevent water absorption, keeping the shorts ultra-light and eliminating thigh cling during competitive watersports.',
    sizingType: 'bottoms'
  },
  {
    id: 'aero-rash-guard',
    name: 'Aero UV Rash Guard',
    category: 'active-wear',
    subcategory: 'swim-wear',
    priceRange: 'OEM Bulk Quote',
    image: '/team-wear.png',
    description: 'Long-sleeve technical rash guard with certified UPF 50+ sun protection. Engineered with flat-locked seaming to eliminate underarm friction during surfing or swimming.',
    specs: [
      '190 GSM Premium Nylon-Lycra stretch fabric',
      'Certified UPF 50+ solar ultraviolet protection',
      'Flatlock 6-thread coverstitch construction',
      'Boardshort attachment loop at front hem'
    ],
    mfgDetails: {
      moq: '150 Units',
      leadTime: '18-21 Business Days',
      customization: 'Sublimated graphics, custom printed neck label'
    },
    performanceTech: 'Certified GRS recycled ocean nylon woven with spandex fibers, delivering consistent compression even when fully saturated, and guarding against surfboard wax abrasions.',
    sizingType: 'tops'
  },

  // Running
  {
    id: 'vapor-running-singlet',
    name: 'Vapor Running Singlet',
    category: 'active-wear',
    subcategory: 'running',
    priceRange: 'OEM Bulk Quote',
    image: '/active-wear.png',
    description: 'An ultra-lightweight running singlet with laser-cut perforation along heat zones for maximum airflow. Keeps athletes cool and dry during long-distance road races.',
    specs: [
      '110 GSM Recycled rPET polyester mesh',
      'Laser-cut ventilation matrix on back panel',
      'Reflective 3M transfers for high-visibility runs',
      'Bonded seamless neck and armhole construction'
    ],
    mfgDetails: {
      moq: '300 Units',
      leadTime: '20-24 Business Days',
      customization: 'Allover sublimation, reflective brand marks'
    },
    performanceTech: 'Constructed from lightweight rPET yarns that weigh under 90 grams in size medium. Utilizes sonic-welded seams rather than traditional stitching to eliminate skin friction.',
    sizingType: 'tops'
  },
  {
    id: 'pace-split-shorts',
    name: 'Pace Split Running Shorts',
    category: 'active-wear',
    subcategory: 'running',
    priceRange: 'OEM Bulk Quote',
    image: '/active-wear.png',
    description: 'Classic running split shorts built for total freedom of movement. Features a moisture-wicking integrated brief liner and a sweatproof zip pocket for key card or nutrition gels.',
    specs: [
      '90 GSM Ultra-light hydrophobic woven polyester shell',
      'Built-in antibacterial micro-mesh inner brief liner',
      'Deep side overlap split for optimal stride length',
      'Sweatproof rear zip pocket'
    ],
    mfgDetails: {
      moq: '200 Units',
      leadTime: '22-26 Business Days',
      customization: 'Custom brief fabric selection, printed drawstring'
    },
    performanceTech: 'The split side geometry is cut at a 3-inch stride radius. Outer shell is coated in hydrophobic dry-spray which shrugs off morning mist and sweat.',
    sizingType: 'bottoms'
  },

  // Cycling
  {
    id: 'velo-aero-jersey',
    name: 'Velo Aero Cycling Jersey',
    category: 'active-wear',
    subcategory: 'cycling',
    priceRange: 'OEM Bulk Quote',
    image: '/team-wear.png',
    description: 'An aerodynamic cycling jersey with a race-cut fit, raw-edge sleeve cuffs, three reinforced rear pockets, and a full YKK lock zipper.',
    specs: [
      '130 GSM Micro-mesh polyester on front, highly ventilated back',
      'Raw-cut sleeves for seamless aerodynamic transition',
      'Three elasticated drop pockets with reflective security strip',
      'Full-length YKK semi-autolock zipper'
    ],
    mfgDetails: {
      moq: '100 Units',
      leadTime: '24-28 Business Days',
      customization: 'Sublimation printing, elastic custom logo hem gripper'
    },
    performanceTech: 'Features Italian elastic raw-cut cuffs which eliminate pressure points on the arms. Rear drop pockets are reinforced with inner webbing to prevent pocket sag when fully loaded.',
    sizingType: 'tops'
  },
  {
    id: 'endurance-bib-shorts',
    name: 'Endurance Cycling Bib Shorts',
    category: 'active-wear',
    subcategory: 'cycling',
    priceRange: 'OEM Bulk Quote',
    image: '/active-wear.png',
    description: 'High-performance compression bib shorts featuring a multi-density Italian gel-foam chamois pad to support riders on long-distance training rides.',
    specs: [
      '220 GSM Warp-knit compression Lycra fabric',
      'Italian triple-density padding/chamois (certified 8+ hours)',
      'Highly elastic, seamless mesh suspender straps',
      '7cm wide laser-cut leg bands with inner silicone dot matrix'
    ],
    mfgDetails: {
      moq: '100 Units',
      leadTime: '25-30 Business Days',
      customization: 'Custom leg band colorways, sublimated side panels'
    },
    performanceTech: 'Warp-knit Lycra provides uniform, multi-directional compression to reduce muscle oscillation during pedaling. Chamois pad is bonded with anti-chafing silver microfiber.',
    sizingType: 'bottoms'
  },

  // Baseball
  {
    id: 'classic-pinstripe-jersey',
    name: 'Classic Pinstripe Baseball Jersey',
    category: 'team-wear',
    subcategory: 'baseball',
    priceRange: 'OEM Bulk Quote',
    image: '/team-wear.png',
    description: 'Traditional button-up baseball jersey featuring custom knit pinstripes and professional tackle twill lettering options. Built with standard moisture-wicking team fabrics.',
    specs: [
      '180 GSM Heavy flatback polyester mesh',
      'Full button-front jersey with authentic spacing',
      'Custom dyed pinstripes or solid options',
      'Double-needle hemmed sleeves and tail'
    ],
    mfgDetails: {
      moq: '120 Units',
      leadTime: '28-32 Business Days',
      customization: 'Tackle twill embroidery, custom neck piping'
    },
    performanceTech: 'Knit flatback mesh combines heavy durability with ventilation pores, keeping the jersey structural and robust while allowing optimal airflow in summer game conditions.',
    sizingType: 'tops'
  },

  // Basketball
  {
    id: 'reversible-mesh-pinnie',
    name: 'Reversible Basketball Pinnie',
    category: 'team-wear',
    subcategory: 'basketball',
    priceRange: 'OEM Bulk Quote',
    image: '/team-wear.png',
    description: 'Double-layered basketball scrimmage pinnie made from open-weave breathable mock mesh. Fully reversible for home and away scrimmage matches.',
    specs: [
      '140 GSM Polyester mock mesh (dual layer)',
      'Fully reversible design with contrasted side panels',
      'Open bottom hem for easy post-production printing access',
      'Oversized athletic shoulder cut'
    ],
    mfgDetails: {
      moq: '150 Units',
      leadTime: '18-22 Business Days',
      customization: 'Sublimation or screen printing, custom labels'
    },
    performanceTech: 'Dual knit panels are sewn only at collar and arm holes, leaving the bottom hem open to allow full ventilation, reducing sweat weight accumulation.',
    sizingType: 'tops'
  },

  // Soccer
  {
    id: 'elite-sublimated-soccer-kit',
    name: 'Elite Sublimated Soccer Kit',
    category: 'team-wear',
    subcategory: 'soccer',
    priceRange: 'OEM Bulk Quote',
    image: '/active-wear.png',
    description: 'Full tournament soccer jersey and matching shorts. Custom sublimated using durable dye inks that keep colors vibrant match after match.',
    specs: [
      '150 GSM Interlock polyester with quick-dry yarn',
      'Sublimated logos, team names, and squad numbers',
      'Ribbed collar and elastic sleeve cuffs',
      'Shorts feature internal drawcord and reinforced seams'
    ],
    mfgDetails: {
      moq: '100 Kits',
      leadTime: '21-26 Business Days',
      customization: 'Custom neck collar design, player name/number fonts'
    },
    performanceTech: 'Sublimated panel fibers are engineered to stay dry and light under intense gameplay, with flat-locked stretch seaming for dynamic movement in the field.',
    sizingType: 'tops'
  },

  // American Football
  {
    id: 'gridiron-tackle-jersey',
    name: 'Gridiron Tackle Football Jersey',
    category: 'team-wear',
    subcategory: 'american-football',
    priceRange: 'OEM Bulk Quote',
    image: '/hero.png',
    description: 'Heavyweight game jersey designed with elastomeric side inserts for a tight fit that prevents defenders from grabbing fabric. Heavy-duty double-layered shoulder zones.',
    specs: [
      '260 GSM Heavyweight Dazzle polyester shoulders',
      'Ribbed spandex knit side panels and sleeve inserts',
      'Double-ply shoulders to fit standard pads',
      'Triple-needle coverstitched major seams'
    ],
    mfgDetails: {
      moq: '100 Units',
      leadTime: '30-35 Business Days',
      customization: 'Sewn-on tackle twill numbers, rib-knit collar logo'
    },
    performanceTech: 'Double layer shoulder panels provide extreme strength where pads slide, while elastomeric spandex body panels hug pads tightly to limit opponents grip reach.',
    sizingType: 'tops'
  }
];
