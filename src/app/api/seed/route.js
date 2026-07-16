import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import Product from '@/models/Product';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    // 1. Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    // Seed default admin account
    await User.create({
      name: 'Default Admin',
      email: 'admin@abisportswear.com',
      password: 'adminpassword123', // Schema pre-save hook will hash this securely
      role: 'superadmin',
      isActive: true,
    });

    // 2. Create Main Categories (matching frontend keys)
    const activeWear = await Category.create({
      name: 'Active Wear',
      slug: 'active-wear',
      description: 'High-performance gym wear, compression apparel, running singlets, and cycling kits engineered for maximum mobility, moisture management, and durability.',
      image: '/active-wear.png',
    });

    const teamWear = await Category.create({
      name: 'Team Wear',
      slug: 'team-wear',
      description: 'Professional-grade sublimated kits, customizable team uniforms, and durable warmup gear manufactured to meet league regulatory standards.',
      image: '/team-wear.png',
    });

    // 3. Create Subcategories for Active Wear
    const gymWear = await Category.create({
      name: 'Gym Wear',
      slug: 'gym-wear',
      description: 'High-stretch, moisture-wicking, and compression-fit apparel optimized for weightlifting, intensive fitness, and premium lifestyle athleisure.',
      parentCategory: activeWear._id,
      image: '/active-wear.png',
    });

    const swimWear = await Category.create({
      name: 'Swim Wear',
      slug: 'swim-wear',
      description: 'Chlorine-resistant, UPF 50+ protected swimwear constructed with low-drag flatlock stitching for professional water performance.',
      parentCategory: activeWear._id,
      image: '/team-wear.png',
    });

    const running = await Category.create({
      name: 'Running',
      slug: 'running',
      description: 'Ultra-lightweight fabrics with strategic laser-cut ventilation zones, 3M reflective trims, and ergonomic splits for athletic movement.',
      parentCategory: activeWear._id,
      image: '/active-wear.png',
    });

    const cycling = await Category.create({
      name: 'Cycling',
      slug: 'cycling',
      description: 'Aerodynamic race-cut jerseys, multi-density Italian chamois bibs, and raw-cut silicone retention bands designed for long endurance rides.',
      parentCategory: activeWear._id,
      image: '/team-wear.png',
    });

    // 4. Create Subcategories for Team Wear
    const baseball = await Category.create({
      name: 'Baseball',
      slug: 'baseball',
      description: 'Classic pinstripe game uniforms, customizable button-down jerseys, and dual-layer padded sliders for sliding protection.',
      parentCategory: teamWear._id,
      image: '/team-wear.png',
    });

    const basketball = await Category.create({
      name: 'Basketball',
      slug: 'basketball',
      description: 'Ultra-breathable mock-mesh practice vests, loose-fit game shorts, and customizable jerseys built for full range of motion.',
      parentCategory: teamWear._id,
      image: '/team-wear.png',
    });

    const soccer = await Category.create({
      name: 'Soccer / Football',
      slug: 'soccer',
      description: 'Elite sublimated club match jerseys, mesh panels, goalie protective gear, and durable technical team socks.',
      parentCategory: teamWear._id,
      image: '/active-wear.png',
    });

    const americanFootball = await Category.create({
      name: 'American Football',
      slug: 'american-football',
      description: 'Heavyweight spandex panels, reinforced dual-ply yoke shoulders, and integrated padded practice pants built for impact.',
      parentCategory: teamWear._id,
      image: '/hero.png',
    });

    // 5. Create featured products mapped to subcategories
    const sampleProducts = [
      {
        name: 'Pro-Fit Fleece B2B Hoodie',
        slug: 'pro-fit-fleece-b2b-hoodie',
        description: 'Engineered for optimal warmth and flexibility. Heavyweight 320 GSM brushed fleece. Double-lined hood, ribbed cuffs, and custom fit. Ideal for gym training and team lifestyle wear.',
        images: ['/active-wear.png'],
        category: activeWear._id,
        subcategory: gymWear._id,
        minOrderQuantity: 50,
        specifications: {
          material: '80% Organic Cotton / 20% Polyester Blend',
          weight: '320 GSM',
          sizing: 'XS - 3XL',
          customization: 'Screen Printing, Embroidery, Custom Labelling',
        },
        featured: true,
      },
      {
        name: 'AeroDry Moisture-Wicking Tee',
        slug: 'aerodry-moisture-wicking-tee',
        description: 'High-performance polyester fabric with advanced quick-dry technology. Flatlock stitching eliminates friction. Sublimated print panels available for brand customizations.',
        images: ['/active-wear.png'],
        category: activeWear._id,
        subcategory: running._id,
        minOrderQuantity: 100,
        specifications: {
          material: '100% Interlock Aero-Dry Polyester',
          weight: '140 GSM',
          sizing: 'S - XXL',
          customization: 'Full Sublimation, Heat Transfer Logos, Screen Print',
        },
        featured: true,
      },
      {
        name: 'Elite Sublimated Soccer Jersey',
        slug: 'elite-sublimated-soccer-jersey',
        description: 'Match-grade soccer jersey featuring dynamic sublimated artwork. Ultra-breathable mesh ventilation panels underarms. Built for professional clubs.',
        images: ['/team-wear.png'],
        category: teamWear._id,
        subcategory: soccer._id,
        minOrderQuantity: 50,
        specifications: {
          material: '100% Recycled Polyester Mesh',
          weight: '160 GSM',
          sizing: 'XS - XXL',
          customization: 'Unlimited Sublimation Colors, Player Name & Number, Club Crest',
        },
        featured: true,
      },
      {
        name: 'Elite Match Training Short',
        slug: 'elite-match-training-short',
        description: 'Four-way stretch woven training shorts with reinforced split side hems. Elastic waistband with interior drawstring. Designed for intense drills and matches.',
        images: ['/team-wear.png'],
        category: teamWear._id,
        subcategory: basketball._id,
        minOrderQuantity: 50,
        specifications: {
          material: '92% Polyester / 8% Elastane Stretch Woven',
          weight: '120 GSM',
          sizing: 'S - XL',
          customization: 'Embroidered Club Badge, Heat Seal Sponsor Logo',
        },
        featured: true,
      },
    ];

    await Product.insertMany(sampleProducts);

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully with Categories, Products, and the Default Admin user account!',
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
