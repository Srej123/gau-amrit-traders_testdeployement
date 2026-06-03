import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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
