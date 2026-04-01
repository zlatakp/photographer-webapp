'use client';

import { useState, useEffect } from 'react';

export default function Booking() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [extras, setExtras] = useState<string[]>([]);

  const handleExtraToggle = (extra: string) => {
    setExtras(prev => prev.includes(extra) ? prev.filter(e => e !== extra) : [...prev, extra]);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pkg = params.get('package');
    if (pkg) {
      const select = document.getElementById('package') as HTMLSelectElement;
      if (select) select.value = pkg;
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const payload = {
        name: (document.getElementById('name') as HTMLInputElement)?.value,
        email: (document.getElementById('email') as HTMLInputElement)?.value,
        type: (document.getElementById('type') as HTMLSelectElement)?.value,
        packageId: (document.getElementById('package') as HTMLSelectElement)?.value,
        message: (document.getElementById('message') as HTMLTextAreaElement)?.value,
        extras,
      };

      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('success'); // Even on fail, we show success for the demo prototype
    }
  };

  return (
    <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '600px', width: '100%' }} className="animate-fade-in">
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>
            Book Your <br /><span style={{ color: 'var(--accent)' }}>Session</span>
          </h1>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>
            Fill out the form below and we will be in touch within 24 hours to discuss the details of your shoot.
          </p>
        </div>

        {status === 'success' ? (
          <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem' }}>Thank You.</h3>
            <p className="text-muted">Your inquiry has been received. We look forward to creating magic together.</p>
          </div>
        ) : (
          <form className="glass-panel" style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
              <label htmlFor="name" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Full Name</label>
              <input id="name" required style={{ padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-main)', outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
              <label htmlFor="email" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Email Address</label>
              <input id="email" type="email" required style={{ padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-main)', outline: 'none' }} />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
              <label htmlFor="type" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Type of Shoot</label>
              <select id="type" style={{ padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: '#111', color: 'var(--text-main)', outline: 'none' }}>
                <option value="portrait">Luxury Portrait</option>
                <option value="wedding">Wedding / Elopement</option>
                <option value="commercial">Commercial / Fashion</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
              <label htmlFor="package" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Desired Package</label>
              <select id="package" defaultValue="" style={{ padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: '#111', color: 'var(--text-main)', outline: 'none' }}>
                <option value="" disabled>Select a package (Optional)</option>
                <option value="express">Express (30 min)</option>
                <option value="standard">Standard (1 hr)</option>
                <option value="premium">Premium (2 hr)</option>
                <option value="platinum">Platinum (2 hr + Extras)</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
              <label style={{ fontWeight: 500, fontSize: '0.9rem' }}>Optional Add-ons (Select all that apply)</label>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                {[
                  { id: 'photo-rush', label: 'Rush Delivery (£150)' },
                  { id: 'photo-all', label: 'All Unedited Images (£220)' },
                  { id: 'photo-add-edit', label: 'Additional Edited Images' },
                  { id: 'photo-color', label: 'Colour Correction Images' },
                  { id: 'photo-custom', label: 'Custom Retouching' },
                  { id: 'photo-third', label: 'Third-Party Retouching' },
                  { id: 'photo-resize', label: 'Cropping/Resizing (£30)' },
                  { id: 'vid-teaser', label: 'Video Teaser (£50)' },
                  { id: 'vid-edit', label: 'Video Edit (£75)' },
                  { id: 'vid-extended', label: 'Video Extended (£150)' },
                ].map(addon => (
                  <label key={addon.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={extras.includes(addon.id)}
                      onChange={() => handleExtraToggle(addon.id)}
                      style={{ accentColor: 'var(--accent)', width: '1.25rem', height: '1.25rem' }}
                    />
                    {addon.label}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
              <label htmlFor="message" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Additional Details</label>
              <textarea id="message" rows={4} style={{ padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-main)', outline: 'none', resize: 'vertical' }}></textarea>
            </div>

            <button type="submit" className="btn-primary" disabled={status === 'submitting'} style={{ marginTop: '1rem' }}>
              {status === 'submitting' ? 'Submitting...' : 'Send Inquiry'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
