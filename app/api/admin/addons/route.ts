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
      'SELECT * FROM service_addons ORDER BY order_index ASC'
    );
    return NextResponse.json({ success: true, addons: result.rows });
  } catch (error) {
    console.error('Addons GET error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch addons' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, slug, price, description, category, orderIndex } = await request.json();

    if (!name || !slug || !price) {
      return NextResponse.json({ success: false, message: 'Name, slug, and price are required' }, { status: 400 });
    }

    const result = await db.query(
      `INSERT INTO service_addons (name, slug, price, description, category, order_index)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, slug, price, description ?? '', category ?? 'photo', orderIndex ?? 0]
    );

    return NextResponse.json({ success: true, addon: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Addons POST error:', error);
    return NextResponse.json({ success: false, message: 'Failed to create addon' }, { status: 500 });
  }
}
