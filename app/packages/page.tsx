import type { Metadata } from 'next';
import db from '@/lib/db';
import PackageCarousel from '@/components/PackageCarousel';

export const metadata: Metadata = {
  title: 'Packages | Zlata JPEG',
  description: 'Explore our tiered photography service packages tailored to capture your luxury moments.',
};

export default async function Packages() {
  // Fetch packages from DB
  const packageRes = await db.query(
    'SELECT * FROM service_packages ORDER BY order_index ASC'
  );
  const packages = packageRes.rows.map(pkg => {
    // Reconstruct readable features from structured fields
    const features = [];
    
    // Duration
    if (pkg.duration_min >= 60) {
      const hours = pkg.duration_min / 60;
      features.push(`${hours === 1 ? '1-hour' : `${hours}-hour`} session`);
    } else {
      features.push(`${pkg.duration_min}-minute session`);
    }

    // Photos
    features.push(`${pkg.photos_count} high-end retouched images`);

    // Booleans
    if (pkg.has_online_gallery) features.push('Online private gallery');
    if (pkg.has_unedited) features.push('Access to all unedited photos');
    if (pkg.has_mua) features.push('Professional MUA (Make-up Artist)');
    if (pkg.has_hair) features.push('Professional Hair Stylist');
    if (pkg.has_studio) features.push('Studio rental cost included');
    if (pkg.has_cloud_storage) features.push('Includes cloud storage');

    return {
      ...pkg,
      title: pkg.name,
      popular: pkg.is_popular,
      features
    };
  });

  // Fetch addons from DB
  const addonRes = await db.query(
    'SELECT * FROM service_addons ORDER BY order_index ASC'
  );
  const addons = addonRes.rows;

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
              {addons.filter(a => a.category === 'photo').map((addon) => (
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
              {addons.filter(a => a.category === 'video').map((addon) => (
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
