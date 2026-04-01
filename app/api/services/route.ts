import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const packagesRes = await db.query(
      'SELECT * FROM service_packages ORDER BY order_index ASC'
    );
    const addonsRes = await db.query(
      'SELECT * FROM service_addons ORDER BY order_index ASC'
    );

    return NextResponse.json({
      success: true,
      packages: packagesRes.rows,
      addons: addonsRes.rows
    });
  } catch (error) {
    console.error('Services GET error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch services' }, { status: 500 });
  }
}
