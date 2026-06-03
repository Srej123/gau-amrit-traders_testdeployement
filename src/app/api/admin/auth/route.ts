import { NextResponse } from 'next/server';
import { getAdminFromCookie } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await getAdminFromCookie();
    return NextResponse.json({ authenticated: !!admin, admin: admin || null });
  } catch {
    return NextResponse.json({ authenticated: false, admin: null });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  response.cookies.set('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  return response;
}
