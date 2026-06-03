import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminFromCookie } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const testimonials = await db.testimonial.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const testimonial = await db.testimonial.create({
      data: {
        name: data.name,
        location: data.location || '',
        rating: data.rating || 5,
        review: data.review || '',
        image: data.image || '',
        order: data.order || 0,
        active: data.active !== undefined ? data.active : true,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
