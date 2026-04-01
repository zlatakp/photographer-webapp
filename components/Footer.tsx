import React from 'react';
import Link from 'next/link';
import { Camera, Aperture, X, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--card-bg)',
      borderTop: '1px solid var(--border-color)',
      padding: '4rem 2rem 2rem',
      marginTop: 'auto'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '3rem',
        marginBottom: '4rem'
      }}>
        {/* Brand Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Camera size={24} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.1em' }}>ZLATA JPEG</span>
          </div>
          <p className="text-muted" style={{ lineHeight: 1.6, fontSize: '0.95rem' }}>
            Capturing the raw essence of luxury and movement. Based in London, available worldwide for editorial, wedding, and portrait commissions.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <a href="https://instagram.com" className="text-muted" style={{ transition: 'color 0.2s' }} aria-label="Instagram">
              <Aperture size={20} />
            </a>
            <a href="https://twitter.com" className="text-muted" style={{ transition: 'color 0.2s' }} aria-label="X (Twitter)">
              <X size={20} />
            </a>
            <a href="mailto:hello@zlatajpeg.com" className="text-muted" style={{ transition: 'color 0.2s' }} aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Quick Links</h4>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <Link href="/portfolio" className="text-muted" style={{ textDecoration: 'none', transition: 'color 0.2s' }}>Portfolio</Link>
            <Link href="/packages" className="text-muted" style={{ textDecoration: 'none', transition: 'color 0.2s' }}>Packages</Link>
            <Link href="/about" className="text-muted" style={{ textDecoration: 'none', transition: 'color 0.2s' }}>The Artist</Link>
            <Link href="/booking" className="text-muted" style={{ textDecoration: 'none', transition: 'color 0.2s' }}>Book a Session</Link>
          </nav>
        </div>

        {/* Contact info shortcut */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Get In Touch</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }} className="text-muted">
            <p>Studio: Mayfair, London</p>
            <p>Email: hello@zlatajpeg.com</p>
            <p>Phone: +44 (0) 20 7946 0000</p>
          </div>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        paddingTop: '2rem',
        textAlign: 'center',
        fontSize: '0.85rem'
      }} className="text-muted">
        <p>© {new Date().getFullYear()} Zlata JPEG. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
