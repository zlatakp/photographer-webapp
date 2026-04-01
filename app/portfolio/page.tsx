import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Portfolio | AuraLens',
  description: 'View our exclusive gallery of luxury portraiture and event photography.',
};

export default function Portfolio() {
  return (
    <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="animate-fade-in">
        <h1 style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '1rem' }}>
          The <span style={{ color: 'var(--accent)' }}>Gallery</span>
        </h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}>
          Explore our curated selection of fine art photography, showcasing elegance in every frame.
        </p>
      </div>

      <div className="grid animate-fade-in stagger-1" style={{ 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {/* Placeholder images - will be dynamic later */}
        {[1, 2, 3, 4, 5, 6].map((img) => (
          <div key={img} className="glass-panel" style={{ 
            aspectRatio: '3/4', 
            position: 'relative', 
            overflow: 'hidden', 
            borderRadius: 'var(--radius)',
            cursor: 'zoom-in'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)'
            }}>
              Loading masterpiece...
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '5rem' }}>
        <Link href="/booking" className="btn-primary">
          Interested in your own shoot?
        </Link>
      </div>
    </div>
  );
}
