import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Packages | AuraLens',
  description: 'Explore our tiered photography service packages tailored to capture your luxury moments.',
};

export default function Packages() {
  const packages = [
    {
      title: 'Express',
      price: '£250',
      description: 'A quick and elegant session perfect for headshots or a brief portrait highlight.',
      features: [
        '30-minute session',
        '3 high-end retouched images',
        'Online private gallery',
      ],
    },
    {
      title: 'Standard',
      price: '£500',
      description: 'Our most popular session offering comprehensive classic portraiture.',
      features: [
        '1-hour session',
        '7 high-end retouched images',
        'Online private gallery',
      ],
      popular: true,
    },
    {
      title: 'Premium',
      price: '£950',
      description: 'An extended experience allowing for multiple looks and complete access.',
      features: [
        '2-hour session',
        '15 high-end retouched images',
        'Access to all unedited photos',
        'Multiple outfit changes',
      ],
    },
    {
      title: 'Platinum',
      price: '£1,800',
      description: 'The ultimate luxury experience providing a full suite of elevated services.',
      features: [
        '2-hour premium session',
        '20 high-end retouched images',
        'Access to all unedited photos',
        'Studio rental cost included',
        'Professional MUA (Make-up Artist)',
        'Professional Hair Stylist',
      ],
    },
  ];

  return (
    <div className="container" style={{ paddingTop: '6rem', paddingBottom: '8rem', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="animate-fade-in">
        <h1 style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '1rem' }}>
          Investment <span style={{ color: 'var(--accent)' }}>Options</span>
        </h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}>
          Select the level of artistry and service that suits your vision. Each package is meticulously tailored to deliver an unforgettable experience.
        </p>
      </div>

      <div className="grid animate-fade-in stagger-1" style={{ 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '2rem',
        alignItems: 'stretch'
      }}>
        {packages.map((pkg, i) => (
          <div key={i} className="glass-panel hover-lift" style={{ 
            position: 'relative',
            padding: '3rem 2rem', 
            display: 'flex', 
            flexDirection: 'column', 
            border: pkg.popular ? '1px solid var(--accent)' : '1px solid var(--border-color)',
            transform: pkg.popular ? 'scale(1.05)' : 'none',
            zIndex: pkg.popular ? 10 : 1,
            boxShadow: pkg.popular ? '0 20px 40px rgba(0,0,0,0.4)' : 'none'
          }}>
            {pkg.popular && (
              <div style={{
                position: 'absolute',
                top: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'var(--accent)',
                color: '#000',
                padding: '0.25rem 1rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Most Popular
              </div>
            )}
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '0.5rem', color: pkg.popular ? 'var(--accent)' : 'var(--text-main)' }}>{pkg.title}</h2>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>{pkg.price}</div>
            <p className="text-muted" style={{ marginBottom: '2rem', flex: 1 }}>{pkg.description}</p>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pkg.features.map((feature, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--accent)', marginTop: '2px' }}>✓</span>
                  <span style={{ fontSize: '0.95rem' }}>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link href={`/booking?package=${pkg.title.toLowerCase()}`} className={pkg.popular ? "btn-primary" : "btn-secondary"} style={{ textAlign: 'center', width: '100%' }}>
              Select {pkg.title}
            </Link>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '8rem' }} className="animate-fade-in stagger-2">
        <h2 style={{ fontSize: '2.5rem', fontWeight: 600, textAlign: 'center', marginBottom: '3rem' }}>Optional <span style={{ color: 'var(--accent)' }}>Add-ons</span></h2>
        
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Additional Photo Services</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Rush Delivery (3 days)</span> <strong>£150</strong></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Access to All Unedited Images</span> <strong>£220</strong></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Additional Edited Images</span> <strong>£40 / img</strong></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Colour Correction Only</span> <strong>£20 / img</strong></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Custom Retouch Add-on</span> <strong>£15 / img</strong></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Retouching Third-Party Images</span> <strong>£35 / img</strong></li>
              <li style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <span>Cropping/Resizing Specific Formats</span> <strong>£30 flat</strong>
                <p className="text-muted" style={{ fontSize: '0.85rem', width: '100%', marginTop: '0.5rem' }}>Includes: Instagram posts, stories, web, LinkedIn, or print. Includes background extensions for framing.</p>
              </li>
            </ul>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Video Services</h3>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>Short-form vertical video captured intentionally during the session (stylized movement, close-ups, and detail shots). Includes light editing and music sync.</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Teaser (5–10 seconds)</span> <strong>£50</strong></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Edit (15 seconds)</span> <strong>£75</strong></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Extended (30 seconds)</span> <strong>£150</strong></li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
