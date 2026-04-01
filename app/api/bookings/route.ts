import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { name, email, type, packageId, extras, message } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ success: false, message: 'Name and email are required' }, { status: 400 });
    }

    const result = await db.query(
      `INSERT INTO bookings (name, email, type, package_id, extras, message)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, email, type ?? null, packageId ?? null, extras ?? [], message ?? null]
    );

    return NextResponse.json({ success: true, booking: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Booking POST error:', error);
    return NextResponse.json({ success: false, message: 'Failed to process request' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await db.query(
      'SELECT * FROM bookings ORDER BY created_at DESC'
    );
    return NextResponse.json({ success: true, bookings: result.rows });
  } catch (error) {
    console.error('Booking GET error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch bookings' }, { status: 500 });
  }
}
