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
    const { name, slug, price, description, category, orderIndex } = await request.json();

    if (!name || !slug || !price) {
      return NextResponse.json({ success: false, message: 'Name, slug, and price are required' }, { status: 400 });
    }

    const result = await db.query(
      `UPDATE service_addons
       SET name = $1, slug = $2, price = $3, description = $4, category = $5, order_index = $6
       WHERE id = $7
       RETURNING *`,
      [name, slug, price, description ?? '', category ?? 'photo', orderIndex ?? 0, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ success: false, message: 'Addon not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, addon: result.rows[0] });
  } catch (error) {
    console.error('Addons PUT error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update addon' }, { status: 500 });
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
      'DELETE FROM service_addons WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ success: false, message: 'Addon not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Addon deleted successfully' });
  } catch (error) {
    console.error('Addons DELETE error:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete addon' }, { status: 500 });
  }
}
