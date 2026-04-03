'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Check, Sparkles, User, Mail, Camera, FileText } from 'lucide-react';
import { PACKAGE_TIERS, ADDONS } from '@/config/packages.config';

export default function Booking() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'portrait',
    packageId: '',
    message: '',
  });
  const [extras, setExtras] = useState<string[]>([]);

  useEffect(() => {
    // Handle package from URL
    const params = new URLSearchParams(window.location.search);
    const pkgSlug = params.get('package');
    if (pkgSlug) {
      const foundPkg = PACKAGE_TIERS.find(p => p.slug === pkgSlug);
      if (foundPkg) {
        setFormData(prev => ({ ...prev, packageId: foundPkg.slug }));
        setStep(2);
      }
    }
  }, []);

  const handleExtraToggle = (extraSlug: string) => {
    setExtras(prev => prev.includes(extraSlug) ? prev.filter(e => e !== extraSlug) : [...prev, extraSlug]);
  };

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.email)) return;
    setDirection('forward');
    setStep(s => (s < 6 ? s + 1 : s));
  };

  const prevStep = () => {
    setDirection('backward');
    setStep(s => (s > 1 ? s - 1 : s));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setStep(1);
      return;
    }

    setStatus('submitting');

    try {
      const payload = { ...formData, extras };

      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('success');
    }
  };

  const selectedPkg = PACKAGE_TIERS.find(p => p.slug === formData.packageId);
  const selectedAddons = ADDONS.filter(a => extras.includes(a.slug));

  return (
    <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '750px', width: '100%' }} className="animate-fade-in">

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
            Book Your <span style={{ color: 'var(--accent)' }}>Session</span>
          </h1>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>
            Let's design your perfect visual narrative together.
          </p>
        </div>

        {status === 'success' ? (
          <div className="glass-panel slide-forward" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(194, 153, 113, 0.1)', color: 'var(--accent)', marginBottom: '2rem' }}>
              <Check size={40} />
            </div>
            <h3 style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem' }}>Request Received.</h3>
            <p className="text-muted">Your inquiry has been successfully captured. We look forward to creating magic together.</p>
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '3rem 3rem', position: 'relative', overflow: 'hidden' }}>

            {/* Progress Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent)' }}>
              <span>Step {step} of 5</span>
              <span>{Math.round((step / 5) * 100)}%</span>
            </div>
            <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', marginBottom: '3rem', overflow: 'hidden' }}>
              <div style={{ width: `${(step / 5) * 100}%`, height: '100%', backgroundColor: 'var(--accent)', transition: 'width 0.5s cubic-bezier(0.25, 1, 0.5, 1)' }} />
            </div>

            <form onSubmit={handleSubmit} style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>

              <div className={direction === 'forward' ? 'slide-forward' : 'slide-backward'} key={step} style={{ flexGrow: 1 }}>

                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 500 }}>Let's start with the basics</h2>

                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                      <label htmlFor="name" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Full Name *</label>
                      <input id="name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Your Full Name" style={inputStyle} />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                      <label htmlFor="email" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Email Address *</label>
                      <input id="email" type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Email@example.com" style={inputStyle} />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 500 }}>What are we capturing?</h2>

                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                      <label htmlFor="type" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Type of Shoot</label>
                      <select id="type" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} style={inputStyle}>
                        <option value="portrait">Luxury Portrait</option>
                        <option value="wedding">Wedding / Elopement</option>
                        <option value="commercial">Commercial / Fashion</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                      <label htmlFor="package" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Desired Package</label>
                      <select id="package" value={formData.packageId} onChange={e => setFormData({ ...formData, packageId: e.target.value })} style={inputStyle}>
                        <option value="" disabled>Select a package (Optional)</option>
                        {PACKAGE_TIERS.map(pkg => (
                          <option key={pkg.id} value={pkg.slug}>{pkg.name} ({pkg.price})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                      <label style={{ fontWeight: 500, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Elevate Your Experience with Add-ons <Sparkles size={16} color="var(--accent)" />
                      </label>
                      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem', paddingTop: '1rem' }}>
                        {ADDONS.map(addon => (
                          <label key={addon.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            padding: '1rem',
                            borderRadius: '4px',
                            border: extras.includes(addon.slug) ? '1px solid var(--accent)' : '1px solid var(--border-color)',
                            backgroundColor: extras.includes(addon.slug) ? 'rgba(194, 153, 113, 0.05)' : 'rgba(0,0,0,0.2)'
                          }}>
                            <input
                              type="checkbox"
                              checked={extras.includes(addon.slug)}
                              onChange={() => handleExtraToggle(addon.slug)}
                              style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer', accentColor: 'var(--accent)' }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ color: extras.includes(addon.slug) ? 'var(--accent)' : 'inherit' }}>{addon.name}</span>
                              <span className="text-muted" style={{ fontSize: '0.75rem' }}>{addon.price}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 500 }}>Tell us your story</h2>

                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                      <label htmlFor="message" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Any specific vision or details?</label>
                      <textarea id="message" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={6} placeholder="Tell us about the vibe, location ideas, or stylistic inspiration..." style={{ ...inputStyle, resize: 'vertical' }}></textarea>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 500 }}>Review & Confirm</h2>

                    <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <User size={18} color="var(--accent)" />
                          <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Client</div>
                            <div style={{ fontSize: '1rem' }}>{formData.name} ({formData.email})</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <Camera size={18} color="var(--accent)" />
                          <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Package</div>
                            <div style={{ fontSize: '1rem' }}>{selectedPkg?.name || 'TBD'} • {formData.type}</div>
                          </div>
                        </div>

                        {selectedAddons.length > 0 && (
                          <div style={{ display: 'flex', gap: '1rem' }}>
                            <Sparkles size={18} color="var(--accent)" style={{ flexShrink: 0, marginTop: '1.25rem' }} />
                            <div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Add-ons</div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                                {selectedAddons.map(a => (
                                  <span key={a.id} style={{ fontSize: '0.85rem', backgroundColor: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>{a.name}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <FileText size={18} color="var(--accent)" />
                          <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Message</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                              {formData.message ? `"${formData.message.substring(0, 80)}${formData.message.length > 80 ? '...' : ''}"` : 'No additional message.'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                {step > 1 ? (
                  <button type="button" onClick={prevStep} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '120px', justifyContent: 'center' }}>
                    <ChevronLeft size={18} /> Back
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 6 ? (
                  <button type="button" onClick={nextStep} disabled={step === 1 && (!formData.name || !formData.email)} className={step === 1 && (!formData.name || !formData.email) ? 'btn-secondary' : 'btn-primary'} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '120px', justifyContent: 'center', opacity: step === 1 && (!formData.name || !formData.email) ? 0.5 : 1 }}>
                    {step < 5 ? 'Next' : 'Book'} <ChevronRight size={18} />
                  </button>
                ) : (
                  <button type="submit" disabled={status === 'submitting'} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '150px', justifyContent: 'center' }}>
                    {status === 'submitting' ? 'Submitting...' : 'Complete Booking'}
                  </button>
                )}
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '1.2rem',
  borderRadius: '4px',
  border: '1px solid var(--border-color)',
  background: 'rgba(0,0,0,0.2)',
  color: 'var(--text-main)',
  outline: 'none',
  transition: 'border 0.2s',
  cursor: 'pointer'
};
