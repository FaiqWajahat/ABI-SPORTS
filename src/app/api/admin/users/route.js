import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'abi_sports_fallback_secret_key_12345';

// Verify session token and decode identity payload
function checkAuth(req) {
  const session = req.cookies.get('admin_session')?.value;
  if (!session) {
    throw new Error('Unauthorized');
  }
  try {
    const decoded = jwt.verify(session, JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error('Unauthorized');
  }
}

export async function GET(req) {
  try {
    checkAuth(req);
    await connectDB();
    const users = await User.find({}, '-password').sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Users GET error:', error);
    return NextResponse.json(
      { error: error.message === 'Unauthorized' ? 'Unauthorized' : 'Failed to fetch users' },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

export async function POST(req) {
  try {
    const adminUser = checkAuth(req);
    
    // Only superadmins can register new administrative accounts
    if (adminUser.role !== 'superadmin') {
      return NextResponse.json(
        { error: 'Forbidden: Only superadmins can create admin users' }, 
        { status: 403 }
      );
    }

    await connectDB();
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    const newUser = await User.create({
      name,
      email,
      password, // Pre-save hooks hashes this
      role: role || 'admin',
      isActive: true,
    });

    return NextResponse.json({ 
      success: true, 
      user: { name: newUser.name, email: newUser.email, role: newUser.role } 
    });
  } catch (error) {
    console.error('User POST error:', error);
    return NextResponse.json(
      { error: error.message === 'Unauthorized' ? 'Unauthorized' : 'Failed to create user' },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const adminUser = checkAuth(req);
    
    if (adminUser.role !== 'superadmin') {
      return NextResponse.json(
        { error: 'Forbidden: Only superadmins can update admin users' }, 
        { status: 403 }
      );
    }

    await connectDB();
    const body = await req.json();
    const { id, name, email, role, isActive, password } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;
    if (password) user.password = password; // triggers pre-save schema hash hook

    await user.save();

    return NextResponse.json({ 
      success: true, 
      user: { name: user.name, email: user.email, role: user.role, isActive: user.isActive } 
    });
  } catch (error) {
    console.error('User PUT error:', error);
    return NextResponse.json(
      { error: error.message === 'Unauthorized' ? 'Unauthorized' : 'Failed to update user' },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const adminUser = checkAuth(req);
    
    if (adminUser.role !== 'superadmin') {
      return NextResponse.json(
        { error: 'Forbidden: Only superadmins can delete admin users' }, 
        { status: 403 }
      );
    }

    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }

    // Prevent deleting oneself
    if (id === adminUser.userId) {
      return NextResponse.json({ error: 'Cannot delete your own admin session account' }, { status: 400 });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('User DELETE error:', error);
    return NextResponse.json(
      { error: error.message === 'Unauthorized' ? 'Unauthorized' : 'Failed to delete user' },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}
