import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Settings, BookOpen, LogOut } from 'lucide-react';
import React from 'react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // If we are at the login page, let it through
  // For anything else inside /admin/* we demand auth.
  // Wait, layout runs for all /admin. To avoid redirect loop on /admin/login, we check pathname.
  // We can't check pathname in Server Components easily. We should handle it at the page level or use middleware.
  
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
      {session && (
        <aside style={{
          width: '250px',
          backgroundColor: 'var(--card-bg)',
          borderRight: '1px solid var(--border-color)',
          padding: '2rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <h2 style={{ paddingLeft: '1rem', fontSize: '1.25rem', letterSpacing: '0.1em' }}>AURALENS <span style={{color:'var(--accent)'}}>ADMIN</span></h2>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
            <Link href="/admin" className="admin-nav-link" style={navStyle}>
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link href="/admin/bookings" className="admin-nav-link" style={navStyle}>
              <BookOpen size={20} /> Bookings
            </Link>
            <Link href="/admin#theme" className="admin-nav-link" style={navStyle}>
              <Settings size={20} /> Theme Settings
            </Link>
          </nav>
          <form
            action={async () => {
              'use server';
              const { signOut } = await import('@/auth');
              await signOut();
            }}
          >
            <button style={{ ...navStyle, width: '100%', textAlign: 'left', color: 'var(--text-muted)' }}>
              <LogOut size={20} /> Logout
            </button>
          </form>
        </aside>
      )}
      <main style={{ flex: 1, padding: session ? '3rem' : '0' }}>
        {children}
      </main>
    </div>
  );
}

const navStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '0.75rem 1rem',
  borderRadius: 'var(--radius)',
  color: 'var(--text-main)',
  transition: 'background-color 0.2s',
  fontWeight: 500,
};
