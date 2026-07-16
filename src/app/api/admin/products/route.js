import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

// Session authentication check helper
function checkAuth(req) {
  const session = req.cookies.get('admin_session')?.value;
  if (!session) {
    throw new Error('Unauthorized');
  }
}

export async function GET(req) {
  try {
    checkAuth(req);
    await connectDB();
    const products = await Product.find()
      .populate('category')
      .populate('subcategory')
      .sort({ createdAt: -1 })
      .lean();
      
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Products GET error:', error);
    return NextResponse.json(
      { error: error.message === 'Unauthorized' ? 'Unauthorized' : 'Failed to fetch products' },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

export async function POST(req) {
  try {
    checkAuth(req);
    await connectDB();
    const body = await req.json();
    const { 
      name, 
      slug, 
      description, 
      images, 
      category, 
      subcategory, 
      minOrderQuantity, 
      specifications, 
      featured, 
      status 
    } = body;

    if (!name || !slug || !description || !category) {
      return NextResponse.json({ error: 'Name, slug, description, and category are required' }, { status: 400 });
    }

    const product = await Product.create({
      name,
      slug,
      description,
      images: images || [],
      category,
      subcategory: subcategory || null,
      minOrderQuantity: minOrderQuantity || 50,
      specifications: specifications || { material: '', weight: '', sizing: 'S - XXL', customization: '' },
      featured: featured || false,
      status: status || 'active',
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Product POST error:', error);
    return NextResponse.json(
      { error: error.message === 'Unauthorized' ? 'Unauthorized' : 'Failed to create product' },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

export async function PUT(req) {
  try {
    checkAuth(req);
    await connectDB();
    const body = await req.json();
    const { 
      id, 
      name, 
      slug, 
      description, 
      images, 
      category, 
      subcategory, 
      minOrderQuantity, 
      specifications, 
      featured, 
      status 
    } = body;

    if (!id || !name || !slug || !description || !category) {
      return NextResponse.json({ error: 'ID, name, slug, description, and category are required' }, { status: 400 });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        slug,
        description,
        images: images || [],
        category,
        subcategory: subcategory || null,
        minOrderQuantity: minOrderQuantity || 50,
        specifications: specifications || { material: '', weight: '', sizing: 'S - XXL', customization: '' },
        featured: featured || false,
        status: status || 'active',
      },
      { new: true }
    );

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Product PUT error:', error);
    return NextResponse.json(
      { error: error.message === 'Unauthorized' ? 'Unauthorized' : 'Failed to update product' },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    checkAuth(req);
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Product DELETE error:', error);
    return NextResponse.json(
      { error: error.message === 'Unauthorized' ? 'Unauthorized' : 'Failed to delete product' },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}
