import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AuraLens | Luxury Photography',
  description: 'Experience timeless elegance. We specialize in capturing the essence of luxury through our lens.',
};

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        height: '90vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Abstract luxury background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, var(--bg-color) 70%)',
          zIndex: -1
        }} />
        
        <div className="container" style={{ textAlign: 'center', zIndex: 10 }}>
          <div className="animate-fade-in">
            <h1 style={{ 
              fontSize: 'clamp(3rem, 8vw, 6rem)', 
              fontWeight: 700, 
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
              background: 'linear-gradient(to right, var(--text-main), var(--accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Timeless <br /> Elegance
            </h1>
          </div>
          <p className="text-muted animate-fade-in stagger-1" style={{ 
            fontSize: '1.25rem', 
            maxWidth: '600px', 
            margin: '0 auto 3rem auto',
            fontWeight: 300
          }}>
            We capture the finest moments with unparalleled artistry. Exquisite luxury photography for those who demand perfection.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in stagger-2">
            <Link href="/portfolio" className="btn-primary">
              Discover Portfolio
            </Link>
            <Link href="/booking" className="btn-secondary">
              Book a Session
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="container" style={{ padding: '6rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '2rem', textAlign: 'center' }}>
          Our <span style={{ color: 'var(--accent)' }}>Philosophy</span>
        </h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%' }}>
          {[
            { title: 'Artistry', desc: 'Every frame is hand-crafted to represent your true self in the most beautiful light.' },
            { title: 'Exclusivity', desc: 'We take only a limited number of clients per year to ensure unparalleled quality.' },
            { title: 'Legacy', desc: 'Your photographs are not just images; they are heirlooms for future generations.' }
          ].map((item, i) => (
            <div key={i} className="glass-panel hover-lift" style={{ padding: '3rem 2rem', textAlign: 'center', transition: 'transform 0.4s ease' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent)' }}>{item.title}</h3>
              <p className="text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
