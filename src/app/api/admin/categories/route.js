import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

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
    const categories = await Category.find()
      .populate('parentCategory')
      .sort({ createdAt: -1 })
      .lean();
      
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error('Categories GET error:', error);
    return NextResponse.json(
      { error: error.message === 'Unauthorized' ? 'Unauthorized' : 'Failed to fetch categories' },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

export async function POST(req) {
  try {
    checkAuth(req);
    await connectDB();
    const body = await req.json();
    const { name, slug, description, parentCategory, image } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
    }

    const category = await Category.create({
      name,
      slug,
      description,
      parentCategory: parentCategory || null,
      image: image || '',
    });

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error('Category POST error:', error);
    return NextResponse.json(
      { error: error.message === 'Unauthorized' ? 'Unauthorized' : 'Failed to create category' },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

export async function PUT(req) {
  try {
    checkAuth(req);
    await connectDB();
    const body = await req.json();
    const { id, name, slug, description, parentCategory, image } = body;

    if (!id || !name || !slug) {
      return NextResponse.json({ error: 'ID, name and slug are required' }, { status: 400 });
    }

    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        slug,
        description,
        parentCategory: parentCategory || null,
        image: image || '',
      },
      { new: true }
    );

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error('Category PUT error:', error);
    return NextResponse.json(
      { error: error.message === 'Unauthorized' ? 'Unauthorized' : 'Failed to update category' },
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
      return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }

    // Check if there are subcategories using this category as a parent
    const hasChildren = await Category.findOne({ parentCategory: id });
    if (hasChildren) {
      return NextResponse.json(
        { error: 'Cannot delete category that has subcategories' },
        { status: 400 }
      );
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Category DELETE error:', error);
    return NextResponse.json(
      { error: error.message === 'Unauthorized' ? 'Unauthorized' : 'Failed to delete category' },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}
