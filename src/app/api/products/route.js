import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({ status: 'active' })
      .populate('category')
      .populate('subcategory')
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Public Products GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
