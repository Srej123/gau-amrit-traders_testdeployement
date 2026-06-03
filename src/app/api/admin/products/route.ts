import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { getAdminFromCookie } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const products = await db.product.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Generate slug from name
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Check for duplicate slug
    const existing = await db.product.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'Product with this name already exists' }, { status: 400 });
    }

    const product = await db.product.create({
      data: {
        name: data.name,
        slug,
        description: data.description || '',
        price: data.price || '0',
        originalPrice: data.originalPrice || '',
        category: data.category || 'ghee',
        images: JSON.stringify(data.images || []),
        videoUrl: data.videoUrl || '',
        features: JSON.stringify(data.features || []),
        specs: JSON.stringify(data.specs || {}),
        technology: data.technology || '',
        capacity: data.capacity || '',
        warranty: data.warranty || '1 Year',
        tdsRange: data.tdsRange || '',
        order: data.order || 0,
        active: data.active !== undefined ? data.active : true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
