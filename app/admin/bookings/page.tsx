import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import BookingRow from './BookingRow';

export const dynamic = 'force-dynamic';

export default async function BookingsPage() {
  const session = await auth();
  if (!session) redirect('/admin/login');

  let bookings: {
    id: string; created_at: string; name: string; email: string;
    type: string | null; package_id: string | null; extras: string[] | null;
    message: string | null; status: string;
  }[] = [];

  try {
    const result = await db.query('SELECT * FROM bookings ORDER BY created_at DESC');
    bookings = result.rows;
  } catch (err) {
    console.error('Failed to load bookings:', err);
  }

  const statCounts = bookings.reduce<Record<string, number>>((acc, b) => {
    acc[b.status] = (acc[b.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: '0.5rem',
          background: 'linear-gradient(to right, var(--text-main), var(--accent))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          All <span style={{ color: 'var(--accent)' }}>Bookings</span>
        </h1>
        <p className="text-muted">Manage and track all client booking requests.</p>
      </header>

      {/* Stat pills */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {[
          { label: 'Total', value: bookings.length, color: 'var(--accent)' },
          { label: 'Pending', value: statCounts['pending'] ?? 0, color: '#d4af37' },
          { label: 'Confirmed', value: statCounts['confirmed'] ?? 0, color: '#22c55e' },
          { label: 'Completed', value: statCounts['completed'] ?? 0, color: '#60a5fa' },
          { label: 'Cancelled', value: statCounts['cancelled'] ?? 0, color: '#f87171' },
        ].map(stat => (
          <div key={stat.label} className="glass-panel" style={{ padding: '0.75rem 1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, fontSize: '1.4rem', color: stat.color }}>{stat.value}</span>
            <span className="text-muted" style={{ fontSize: '0.85rem' }}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        {bookings.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No bookings yet. They will appear here once clients submit the booking form.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                {['Client', 'Email', 'Package', 'Add-ons', 'Date', 'Status'].map(col => (
                  <th key={col} style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => <BookingRow key={b.id} booking={b} />)}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
