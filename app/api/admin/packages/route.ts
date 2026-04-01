import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import db from '@/lib/db';

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await db.query(
      'SELECT * FROM service_packages ORDER BY order_index ASC'
    );
    return NextResponse.json({ success: true, packages: result.rows });
  } catch (error) {
    console.error('Packages GET error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

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
      `INSERT INTO service_packages (
        name, slug, price, description, is_popular, order_index,
        duration_min, photos_count, has_unedited, has_mua, has_hair, has_studio,
        has_online_gallery, has_cloud_storage
      )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING *`,
      [
        name, slug, price, description ?? '', !!is_popular, order_index ?? 0,
        duration_min ?? 60, photos_count ?? 10, !!has_unedited, !!has_mua, !!has_hair, !!has_studio,
        !!has_online_gallery, !!has_cloud_storage
      ]
    );

    return NextResponse.json({ success: true, package: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Packages POST error:', error);
    return NextResponse.json({ success: false, message: 'Failed to create package' }, { status: 500 });
  }
}
