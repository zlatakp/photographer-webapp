'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera } from 'lucide-react';
import { useEffect, useState } from 'react';
import MagneticButton from '@/components/MagneticButton';

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
    { name: 'Packages', path: '/packages' },
    { name: 'Booking', path: '/booking' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header
      className={`navbar-header ${mounted && scrolled ? 'navbar-scrolled' : ''}`}
      style={{
        transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
        boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.3)' : 'none'
      }}
    >
      <div className="container flex items-center justify-between">
        <MagneticButton strength={20} radius={40}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-main)', transition: 'all 0.3s' }}>
            <Camera style={{ color: 'var(--accent)' }} size={28} />
            <span style={{ transform: 'translateY(1px)' }}>
              Zlata<span style={{ color: 'var(--accent)', fontWeight: 700 }}>.JPEG</span>
            </span>
          </Link>
        </MagneticButton>

        <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {navLinks.map((link) => {
            const isActive = mounted && pathname === link.path;
            return (
              <MagneticButton key={link.name} strength={15} radius={30}>
                <Link
                  href={link.path}
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--text-main)',
                    fontWeight: isActive ? 600 : 300,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    position: 'relative',
                    padding: '0.5rem 0',
                    display: 'inline-block',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {link.name}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: '0',
                        width: '100%',
                        height: '1px',
                        backgroundColor: 'var(--accent)',
                        borderRadius: '1px',
                        boxShadow: '0 0 10px var(--accent)'
                      }}
                    />
                  )}
                </Link>
              </MagneticButton>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
