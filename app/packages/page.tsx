import type { Metadata } from 'next';
import PackageCarousel from '@/components/PackageCarousel';
import { PACKAGE_TIERS, SERVICES, ADDONS } from '@/config/packages.config';

export const metadata: Metadata = {
  title: 'Packages | Zlata JPEG',
  description: 'Explore our tiered photography service packages tailored to capture your luxury moments.',
};

export default async function Packages() {
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
    <div className="container" style={{ paddingTop: '6rem', paddingBottom: '8rem', minHeight: '100vh' }}>
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
          Package <span style={{ color: 'var(--accent)' }}>Options</span>
        </h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}>
          Select the level of artistry and service that suits your vision. Each package is meticulously tailored to deliver an unforgettable experience.
        </p>
      </div>

      <PackageCarousel packages={packages} />

      <div style={{ marginTop: '8rem' }} className="animate-fade-in stagger-2">
        <h2 style={{ fontSize: '2.5rem', fontWeight: 600, textAlign: 'center', marginBottom: '3rem' }}>Optional <span style={{ color: 'var(--accent)' }}>Add-ons</span></h2>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Additional Photo Services</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {ADDONS.filter(a => a.category === 'photo').map((addon) => (
                <li key={addon.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <span>{addon.name}</span>
                    {addon.description && <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>{addon.description}</p>}
                  </div>
                  <strong style={{ marginLeft: '1rem' }}>{addon.price}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Video Services</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {ADDONS.filter(a => a.category === 'video').map((addon) => (
                <li key={addon.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <span>{addon.name}</span>
                    {addon.description && <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>{addon.description}</p>}
                  </div>
                  <strong style={{ marginLeft: '1rem' }}>{addon.price}</strong>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
