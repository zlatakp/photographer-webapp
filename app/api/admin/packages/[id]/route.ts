import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import db from '@/lib/db';

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;

  try {
    const body = await request.json();
    const { 
      name, slug, price, description, is_popular, order_index,
      duration_min, photos_count, has_unedited, has_mua, has_hair, has_studio,
      has_online_gallery, has_cloud_storage
    } = body;

    if (!name || !slug || !price) {
      return NextResponse.json({ success: false, message: 'Name, slug, and price are required' }, { status: 400 });
    }

    const result = await db.query(
      `UPDATE service_packages
       SET 
        name = $1, slug = $2, price = $3, description = $4, 
        is_popular = $5, order_index = $6, duration_min = $7, photos_count = $8, 
        has_unedited = $9, has_mua = $10, has_hair = $11, has_studio = $12, 
        has_online_gallery = $13, has_cloud_storage = $14
       WHERE id = $15
       RETURNING *`,
      [
        name, slug, price, description ?? '', !!is_popular, order_index ?? 0,
        duration_min ?? 60, photos_count ?? 10, !!has_unedited, !!has_mua, !!has_hair, !!has_studio,
        !!has_online_gallery, !!has_cloud_storage, id
      ]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ success: false, message: 'Package not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, package: result.rows[0] });
  } catch (error) {
    console.error('Packages PUT error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update package' }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;

  try {
    const result = await db.query(
      'DELETE FROM service_packages WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ success: false, message: 'Package not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Packages DELETE error:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete package' }, { status: 500 });
  }
}
