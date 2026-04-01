'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Packages', path: '/packages' },
    { name: 'Booking', path: '/booking' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: mounted && scrolled ? 'var(--header-bg)' : 'transparent',
        backdropFilter: mounted && scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: mounted && scrolled ? 'blur(16px)' : 'none',
        borderBottom: mounted && scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        transition: 'all 0.4s ease',
        padding: '1rem 0',
      }}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <Camera style={{ color: 'var(--accent)' }} size={28} />
          <span>Aura<span className="text-muted">Lens</span></span>
        </Link>
        
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                style={{
                  color: isActive ? 'var(--accent)' : 'var(--text-main)',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  position: 'relative',
                }}
              >
                {link.name}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-6px',
                      left: '0',
                      width: '100%',
                      height: '2px',
                      backgroundColor: 'var(--accent)',
                      borderRadius: '2px',
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
