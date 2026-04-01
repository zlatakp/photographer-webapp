import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // In a real app, this is where we'd insert into Supabase:
    // const { data: booking, error } = await supabase.from('bookings').insert([data])
    
    console.log('Received booking via API:', data);
    
    return NextResponse.json({ success: true, message: 'Booking received successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to process request' }, { status: 500 });
  }
}
