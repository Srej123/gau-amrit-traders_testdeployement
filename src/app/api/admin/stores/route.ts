import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminFromCookie } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stores = await db.store.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(stores);
  } catch (error) {
    console.error('Error fetching stores:', error);
    return NextResponse.json({ error: 'Failed to fetch stores' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const store = await db.store.create({
      data: {
        name: data.name,
        phone: data.phone || '',
        address: data.address || '',
        googleMapUrl: data.googleMapUrl || '',
        googleReviewUrl: data.googleReviewUrl || '',
        hours: data.hours || 'Mon-Sun 9AM-8PM',
        isVerified: data.isVerified || false,
        order: data.order || 0,
        active: data.active !== undefined ? data.active : true,
      },
    });

    return NextResponse.json(store, { status: 201 });
  } catch (error) {
    console.error('Error creating store:', error);
    return NextResponse.json({ error: 'Failed to create store' }, { status: 500 });
  }
}
