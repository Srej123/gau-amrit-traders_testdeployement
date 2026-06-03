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
    const product = await db.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
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

    const updateData: Record<string, unknown> = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.originalPrice !== undefined) updateData.originalPrice = data.originalPrice;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.images !== undefined) updateData.images = JSON.stringify(data.images);
    if (data.videoUrl !== undefined) updateData.videoUrl = data.videoUrl;
    if (data.features !== undefined) updateData.features = JSON.stringify(data.features);
    if (data.specs !== undefined) updateData.specs = JSON.stringify(data.specs);
    if (data.technology !== undefined) updateData.technology = data.technology;
    if (data.capacity !== undefined) updateData.capacity = data.capacity;
    if (data.warranty !== undefined) updateData.warranty = data.warranty;
    if (data.tdsRange !== undefined) updateData.tdsRange = data.tdsRange;
    if (data.order !== undefined) updateData.order = data.order;
    if (data.active !== undefined) updateData.active = data.active;

    // Update slug if name changed
    if (data.name !== undefined) {
      updateData.slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    const product = await db.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
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
    await db.product.delete({ where: { id } });
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
