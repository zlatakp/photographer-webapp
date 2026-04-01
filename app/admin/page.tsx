import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import ThemeSwitcher from './ThemeSwitcher'; // Client component

export default async function AdminDashboard() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 600 }}>Welcome, {session.user?.name}</h1>
        <p className="text-muted">Manage your photography business settings and bookings here.</p>
      </header>
      
      <div className="grid container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', padding: 0 }}>
        
        {/* Bookings Summary (Mocked) */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)' }}></span>
            Recent Bookings
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { name: 'Elena Romanova', type: 'Wedding', date: '2026-05-12' },
              { name: 'Marcus Sterling', type: 'Luxury Portrait', date: '2026-06-03' }
            ].map((booking, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <p style={{ fontWeight: 500 }}>{booking.name}</p>
                  <p className="text-muted" style={{ fontSize: '0.85rem' }}>{booking.type}</p>
                </div>
                <div className="text-muted" style={{ fontSize: '0.85rem' }}>{booking.date}</div>
              </div>
            ))}
            <button className="btn-secondary" style={{ width: '100%', marginTop: '1rem' }}>View All Bookings</button>
          </div>
        </div>

        {/* Theme Settings Panel */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Theme Settings</h2>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>
            Customize the public interface of AuraLens. Changes apply instantly across all pages.
          </p>
          <ThemeSwitcher />
        </div>

      </div>
    </div>
  );
}
