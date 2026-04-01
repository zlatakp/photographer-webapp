import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import db from '@/lib/db';

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { orders } = await request.json(); // Array of { id: string, order_index: number }

    if (!Array.isArray(orders)) {
        return NextResponse.json({ success: false, message: 'Orders array is required' }, { status: 400 });
    }

    // Use a transaction to update all orders
    const client = await db.connect();
    try {
      await client.query('BEGIN');
      for (const item of orders) {
        await client.query(
          'UPDATE service_packages SET order_index = $1 WHERE id = $2',
          [item.order_index, item.id]
        );
      }
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }

    return NextResponse.json({ success: true, message: 'Packages reordered successfully' });
  } catch (error) {
    console.error('Packages reorder error:', error);
    return NextResponse.json({ success: false, message: 'Failed to reorder packages' }, { status: 500 });
  }
}
