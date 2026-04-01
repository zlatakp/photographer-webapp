'use client';

import { useState } from 'react';

type Booking = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  type: string | null;
  package_id: string | null;
  extras: string[] | null;
  message: string | null;
  status: string;
};

const STATUS_COLORS: Record<string, string> = {
  pending: '#d4af37',
  confirmed: '#22c55e',
  completed: '#60a5fa',
  cancelled: '#f87171',
};

const PACKAGE_LABELS: Record<string, string> = {
  express: 'Express',
  standard: 'Standard',
  premium: 'Premium',
  platinum: 'Platinum',
};

export default function BookingRow({ booking: initial }: { booking: Booking }) {
  const [booking, setBooking] = useState(initial);
  const [saving, setSaving] = useState(false);

  const updateStatus = async (newStatus: string) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) setBooking(data.booking);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const date = new Date(booking.created_at).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  return (
    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
      <td style={{ padding: '1.25rem 1rem', fontWeight: 500 }}>{booking.name}</td>
      <td style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{booking.email}</td>
      <td style={{ padding: '1.25rem 1rem', fontSize: '0.9rem' }}>
        {booking.package_id ? PACKAGE_LABELS[booking.package_id] ?? booking.package_id : <span style={{ color: 'var(--text-muted)' }}>—</span>}
      </td>
      <td style={{ padding: '1.25rem 1rem', fontSize: '0.85rem', maxWidth: '160px' }}>
        {booking.extras?.length ? (
          <span style={{ color: 'var(--text-muted)' }}>{booking.extras.length} add-on{booking.extras.length > 1 ? 's' : ''}</span>
        ) : <span style={{ color: 'var(--text-muted)' }}>—</span>}
      </td>
      <td style={{ padding: '1.25rem 1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{date}</td>
      <td style={{ padding: '1.25rem 1rem' }}>
        <select
          value={booking.status}
          onChange={e => updateStatus(e.target.value)}
          disabled={saving}
          style={{
            padding: '0.4rem 0.75rem',
            borderRadius: '20px',
            border: `1px solid ${STATUS_COLORS[booking.status] ?? 'var(--border-color)'}`,
            background: 'rgba(0,0,0,0.3)',
            color: STATUS_COLORS[booking.status] ?? 'var(--text-main)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            opacity: saving ? 0.5 : 1,
          }}
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </td>
    </tr>
  );
}
