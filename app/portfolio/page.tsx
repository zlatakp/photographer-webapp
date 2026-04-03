import type { Metadata } from 'next';
import Link from 'next/link';
import TiltCard from '@/components/TiltCard';
import MagneticButton from '@/components/MagneticButton';

export const metadata: Metadata = {
  title: 'Portfolio | Zlata JPEG',
  description: 'View our exclusive gallery of luxury portraiture and event photography.',
};

export default function Portfolio() {
  return (
    <div className="container" style={{ paddingTop: '6rem', paddingBottom: '10rem', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="animate-fade-in">
        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 4rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: '1rem',
          background: 'linear-gradient(to right, var(--text-main), var(--accent))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          The <span style={{ color: 'var(--accent)' }}>Gallery</span>
        </h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}>
          Explore our curated selection of fine art photography, showcasing elegance in every frame.
        </p>
      </div>

      <div className="grid" style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2.5rem'
      }}>
        {/* Placeholder images - will be dynamic later */}
        {[1, 2, 3, 4, 5, 6].map((img, i) => (
          <TiltCard key={img} className={`animate-fade-in stagger-${(i % 3) + 1}`}>
            <div className="glass-panel" style={{
              aspectRatio: '3/4',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 'var(--radius)',
              cursor: 'zoom-in'
            }}>
              <div className="reveal-mask" style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="animate-float" style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Artistry No. {img}</div>
                  <div style={{ fontSize: '0.8rem' }}>Loading masterpiece...</div>
                </div>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '8rem' }}>
        <MagneticButton strength={40} radius={80}>
          <Link href="/booking" className="btn-primary glint-sweep" style={{ padding: '1.25rem 3rem', fontSize: '1.1rem' }}>
            Interested in your own shoot?
          </Link>
        </MagneticButton>
      </div>
    </div>
  );
}
