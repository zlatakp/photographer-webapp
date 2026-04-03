'use client';

import { Sparkles, Award, Camera, Calendar } from 'lucide-react';
import TiltCard from '@/components/TiltCard';

export default function About() {
  return (
    <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* Ambient Decorations */}
      <div className="animate-float" style={{ position: 'absolute', top: '15%', left: '5%', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(194, 153, 113, 0.04), transparent)', border: '1px solid rgba(255,255,255,0.02)', zIndex: 0 }}></div>
      <div className="animate-float stagger-2" style={{ position: 'absolute', bottom: '10%', right: '10%', width: '80px', height: '80px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.03), transparent)', border: '1px solid rgba(194, 153, 113, 0.05)', zIndex: 0 }}></div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', alignItems: 'center', maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <div style={{ textAlign: 'center' }} className="animate-fade-in">
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            marginBottom: '1rem',
            background: 'linear-gradient(to right, var(--text-main), var(--accent), var(--text-main))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% auto',
            animation: 'glint 8s linear infinite'
          }}>
            The Creative <span style={{ color: 'var(--accent)' }}>Vision</span>
          </h1>
          <p className="text-muted" style={{ fontSize: '1.2rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Zlata JPEG • Artist & Founder</p>
        </div>

        <div style={{ width: '100%', perspective: '1500px' }} className="animate-fade-in stagger-1">
          <TiltCard maxTilt={5}>
            <div className="glass-panel" style={{ 
              width: '100%', 
              aspectRatio: '21/9', 
              backgroundColor: 'rgba(255,255,255,0.02)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '1px solid var(--border-color)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(194,153,113,0.1), transparent)', opacity: 0.5 }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 1 }}>
                <Camera size={48} color="var(--accent)" className="animate-float" />
                <span className="text-muted" style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Signature Portrait Visual</span>
              </div>
            </div>
          </TiltCard>
        </div>

        <div className="animate-fade-in stagger-2" style={{ fontSize: '1.25rem', lineHeight: 1.8, color: 'var(--text-main)', textAlign: 'center', fontWeight: 300 }}>
          <p style={{ marginBottom: '2rem' }}>
            Founded in Paris and now serving exclusive clientele globally, <span style={{ color: 'var(--accent)', fontWeight: 500 }}>Zlata JPEG</span> is the culmination of over a decade of pursuit of visual perfection.
          </p>
          <p style={{ marginBottom: '2rem' }}>
            I believe that photography is more than just capturing light; it is about encapsulating the sheer emotion, the profound unspoken stories, and the <span className="glint-sweep" style={{ color: 'var(--accent)', padding: '0 4px' }}>pure elegance</span> of my subjects. 
          </p>
          <p>
            Using a blend of classical composition and modern cinematic lighting, my work transforms fleeting moments into timeless works of art, curated for those who value the extraordinary.
          </p>
        </div>

        <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, var(--border-color), transparent)', margin: '2rem 0' }}></div>

        <div style={{ display: 'flex', gap: 'clamp(2rem, 10vw, 6rem)', textAlign: 'center', flexWrap: 'wrap', justifyContent: 'center' }} className="animate-fade-in stagger-3">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Calendar size={20} color="var(--accent)" />
                <h4 style={{ fontSize: '2.5rem', color: 'var(--accent)', fontWeight: 700, margin: 0 }}>10+</h4>
            </div>
            <span className="text-muted" style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Years in Excellence</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Camera size={20} color="var(--accent)" />
                <h4 style={{ fontSize: '2.5rem', color: 'var(--accent)', fontWeight: 700, margin: 0 }}>200+</h4>
            </div>
            <span className="text-muted" style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Global Editorials</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Award size={20} color="var(--accent)" />
                <h4 style={{ fontSize: '2.5rem', color: 'var(--accent)', fontWeight: 700, margin: 0 }}>5</h4>
            </div>
            <span className="text-muted" style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Artistic Awards</span>
          </div>
        </div>
      </div>
    </div>
  );
}
