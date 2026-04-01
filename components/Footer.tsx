import Link from 'next/link';
import { Camera, Heart, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ 
      borderTop: '1px solid var(--border-color)', 
      padding: '4rem 0 2rem 0',
      backgroundColor: 'var(--card-bg)',
      marginTop: 'auto'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '2rem' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Aura<span className="text-muted">Lens</span>
          </h2>
          <p className="text-muted" style={{ maxWidth: '400px', margin: '0 auto', fontSize: '0.9rem' }}>
            Capturing the most exquisite moments with a touch of timeless elegance. We specialize in luxury portraiture and event photography.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" className="text-muted" style={{ transition: 'color 0.2s' }} aria-label="Portfolio">
            <Camera size={20} />
          </a>
          <a href="#" className="text-muted" style={{ transition: 'color 0.2s' }} aria-label="Favorites">
            <Heart size={20} />
          </a>
          <a href="mailto:hello@auralens.com" className="text-muted" style={{ transition: 'color 0.2s' }} aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
        
        <div style={{ 
          width: '100%', 
          borderTop: '1px solid var(--border-color)', 
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <p>&copy; {new Date().getFullYear()} AuraLens Photography. All rights reserved.</p>
          <Link href="/admin" style={{ opacity: 0.5, transition: 'opacity 0.2s' }}>
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
}
