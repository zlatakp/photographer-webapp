import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import db from '@/lib/db';
import ThemeSwitcher from './ThemeSwitcher';

export const dynamic = 'force-dynamic';

const STATUS_COLORS: Record<string, string> = {
  pending: '#d4af37',
  confirmed: '#22c55e',
  completed: '#60a5fa',
  cancelled: '#f87171',
};

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect('/admin/login');

  let recentBookings: { id: string; name: string; type: string | null; package_id: string | null; status: string; created_at: string }[] = [];
  let totalCount = 0;
  let pendingCount = 0;

  try {
    const [recentResult, totalResult, pendingResult] = await Promise.all([
      db.query('SELECT id, name, type, package_id, status, created_at FROM bookings ORDER BY created_at DESC LIMIT 5'),
      db.query('SELECT COUNT(*) FROM bookings'),
      db.query("SELECT COUNT(*) FROM bookings WHERE status = 'pending'"),
    ]);
    recentBookings = recentResult.rows;
    totalCount = parseInt(totalResult.rows[0].count, 10);
    pendingCount = parseInt(pendingResult.rows[0].count, 10);
  } catch (err) {
    console.error('Admin dashboard DB error:', err);
  }

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 600 }}>Welcome, {session.user?.name}</h1>
        <p className="text-muted">Manage your photography business from here.</p>
      </header>

      {/* Stat cards */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {[
          { label: 'Total Bookings', value: totalCount },
          { label: 'Pending Review', value: pendingCount, highlight: true },
        ].map(stat => (
          <div key={stat.label} className="glass-panel" style={{ padding: '2rem', borderColor: stat.highlight && pendingCount > 0 ? 'var(--accent)' : 'var(--border-color)' }}>
            <div style={{ fontSize: '3rem', fontWeight: 700, color: stat.highlight ? 'var(--accent)' : 'var(--text-main)' }}>{stat.value}</div>
            <div className="text-muted" style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

        {/* Recent Bookings */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)', display: 'inline-block' }}></span>
              Recent Bookings
            </h2>
            <Link href="/admin/bookings" className="text-muted" style={{ fontSize: '0.85rem' }}>View all →</Link>
          </div>

          {recentBookings.length === 0 ? (
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>No bookings yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentBookings.map(b => (
                <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <p style={{ fontWeight: 500 }}>{b.name}</p>
                    <p className="text-muted" style={{ fontSize: '0.85rem' }}>{b.package_id ?? b.type ?? '—'}</p>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: STATUS_COLORS[b.status] ?? 'var(--text-muted)', textTransform: 'capitalize', border: `1px solid ${STATUS_COLORS[b.status] ?? 'var(--border-color)'}`, padding: '0.2rem 0.6rem', borderRadius: '20px' }}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Theme Settings */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem' }}>Theme Settings</h2>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>
            Customize the public interface of ZLATA JPEG. Changes apply instantly across all pages.
          </p>
          <ThemeSwitcher />
        </div>

      </div>
    </div>
  );
}
