import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | ZLATA JPEG',
  description: 'Learn more about the artistic visionary behind Zlata JPEG photography.',
};

export default function About() {
  return (
    <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center' }} className="animate-fade-in">
          <h1 style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Meet the <span style={{ color: 'var(--accent)' }}>Artist</span>
          </h1>
        </div>

        <div className="glass-panel animate-fade-in stagger-1" style={{ width: '100%', aspectRatio: '21/9', backgroundColor: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="text-muted">Signature Photographer Portrait</span>
        </div>

        <div className="animate-fade-in stagger-2" style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Founded in Paris and now serving exclusive clientele globally, Zlata JPEG is the culmination of over a decade of pursuit of visual perfection.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            I believe that photography is more than just capturing light; it is about encapsulating the sheer emotion, the profound unspoken stories, and the pure elegance of my subjects. Using a blend of classical composition and modern cinematic lighting, my work transforms fleeting moments into timeless works of art.
          </p>
          <p>
            Whether it is an intimate portrait, a grandiose wedding, or a high-fashion editorial, my commitment remains unyielding: to provide an experience as flawless as the final photograph.
          </p>
        </div>

        <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border-color)', margin: '2rem 0' }}></div>

        <div style={{ display: 'flex', gap: '4rem', textAlign: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div>
            <h4 style={{ fontSize: '2rem', color: 'var(--accent)', fontWeight: 700 }}>10+</h4>
            <span className="text-muted">Years Experience</span>
          </div>
          <div>
            <h4 style={{ fontSize: '2rem', color: 'var(--accent)', fontWeight: 700 }}>200+</h4>
            <span className="text-muted">Luxury Events</span>
          </div>
          <div>
            <h4 style={{ fontSize: '2rem', color: 'var(--accent)', fontWeight: 700 }}>5</h4>
            <span className="text-muted">International Awards</span>
          </div>
        </div>
      </div>
    </div>
  );
}
