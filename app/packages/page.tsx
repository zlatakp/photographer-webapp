'use client';

import PackageCarousel from '@/components/PackageCarousel';
import { PACKAGE_TIERS, SERVICES, ADDONS } from '@/config/packages.config';
import { Sparkles, Camera, Award } from 'lucide-react';

export default function Packages() {
  // Map configuration data to the carousel format
  const packages = PACKAGE_TIERS.map(tier => {
    // Dynamically build features list based on the SERVICES schema
    const features: string[] = [];
    
    SERVICES.forEach(service => {
      const value = tier.services[service.id];
      if (value !== undefined && value !== false) {
        features.push(service.render(value));
      }
    });

    return {
      title: tier.name,
      price: tier.price,
      description: tier.description,
      popular: tier.isPopular,
      features
    };
  });

  return (
    <div className="container" style={{ paddingTop: '6rem', paddingBottom: '8rem', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      {/* Ambient Decorations */}
      <div className="animate-float" style={{ position: 'absolute', top: '20%', left: '2%', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(194, 153, 113, 0.03), transparent)', border: '1px solid rgba(255,255,255,0.02)', zIndex: 0 }}></div>
      <div className="animate-float stagger-2" style={{ position: 'absolute', bottom: '10%', right: '5%', width: '100px', height: '100px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.02), transparent)', border: '1px solid rgba(194,153,113,0.04)', zIndex: 0 }}></div>

      <div style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 1 }} className="animate-fade-in">
        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 4rem)',
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
          Curated <span style={{ color: 'var(--accent)' }}>Experiences</span>
        </h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', fontWeight: 300 }}>
          Select the level of artistry and service that suits your vision. Each package is meticulously tailored to deliver an unforgettable experience.
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <PackageCarousel packages={packages} />
      </div>

      <div style={{ marginTop: '8rem', position: 'relative', zIndex: 1 }} className="animate-fade-in stagger-2">
        <h2 style={{ fontSize: '2.5rem', fontWeight: 600, textAlign: 'center', marginBottom: '4rem', letterSpacing: '-0.02em' }}>
          Exclusive <span style={{ color: 'var(--accent)' }}>Add-ons</span>
        </h2>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>

          <div className="glass-panel" style={{ padding: '3rem 2.5rem', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Camera size={20} /> Photo Artistry
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {ADDONS.filter(a => a.category === 'photo').map((addon) => (
                <li key={addon.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 500 }}>{addon.name}</span>
                    {addon.description && <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 300 }}>{addon.description}</p>}
                  </div>
                  <strong style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>{addon.price}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel" style={{ padding: '3rem 2.5rem', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Sparkles size={20} /> Cinematic Video
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {ADDONS.filter(a => a.category === 'video').map((addon) => (
                <li key={addon.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 500 }}>{addon.name}</span>
                    {addon.description && <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 300 }}>{addon.description}</p>}
                  </div>
                  <strong style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>{addon.price}</strong>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
