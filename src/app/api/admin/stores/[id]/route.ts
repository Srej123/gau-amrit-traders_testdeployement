import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminFromCookie } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const store = await db.store.findUnique({ where: { id } });
    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }
    return NextResponse.json(store);
  } catch (error) {
    console.error('Error fetching store:', error);
    return NextResponse.json({ error: 'Failed to fetch store' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();

    const store = await db.store.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.phone !== undefined && { phone: data.phone }),
        ...(data.address !== undefined && { address: data.address }),
        ...(data.googleMapUrl !== undefined && { googleMapUrl: data.googleMapUrl }),
        ...(data.googleReviewUrl !== undefined && { googleReviewUrl: data.googleReviewUrl }),
        ...(data.hours !== undefined && { hours: data.hours }),
        ...(data.isVerified !== undefined && { isVerified: data.isVerified }),
        ...(data.order !== undefined && { order: data.order }),
        ...(data.active !== undefined && { active: data.active }),
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error('Error updating store:', error);
    return NextResponse.json({ error: 'Failed to update store' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await db.store.delete({ where: { id } });
    return NextResponse.json({ message: 'Store deleted successfully' });
  } catch (error) {
    console.error('Error deleting store:', error);
    return NextResponse.json({ error: 'Failed to delete store' }, { status: 500 });
  }
}
