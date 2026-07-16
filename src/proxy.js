import { NextResponse } from 'next/server';

export function proxy(request) {
  const path = request.nextUrl.pathname;

  // Protect all /admin routes except the login screen itself
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const session = request.cookies.get('admin_session')?.value;

    if (!session) {
      // Redirect unauthenticated requests to login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // If already authenticated and accessing login, redirect to dashboard
  if (path === '/admin/login') {
    const session = request.cookies.get('admin_session')?.value;
    if (session) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware exclusively to admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
