'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@zlatajpeg.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      redirectTo: '/admin',
    });

    if (res?.error) {
      setError('Invalid credentials');
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '80vh', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '3rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Admin Access</h1>
        <p className="text-muted" style={{ marginBottom: '2rem' }}>Authenticate to manage Zlata JPEG.</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
          {error && <div style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '4px', fontSize: '0.9rem' }}>{error}</div>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-main)', outline: 'none' }}
              placeholder="admin@zlatajpeg.com"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-main)', outline: 'none' }}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
