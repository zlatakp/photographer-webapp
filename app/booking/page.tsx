'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react';

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
    const params = new URLSearchParams(window.location.search);
    const pkg = params.get('package');
    if (pkg) {
      setFormData(prev => ({ ...prev, packageId: pkg }));
      setStep(2); // Jump to step 2 if a package was dynamically requested
    }
  }, []);

  const handleExtraToggle = (extra: string) => {
    setExtras(prev => prev.includes(extra) ? prev.filter(e => e !== extra) : [...prev, extra]);
  };

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.email)) return;
    setDirection('forward');
    setStep(s => s + 1);
  };

  const prevStep = () => {
    setDirection('backward');
    setStep(s => s - 1);
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

  return (
    <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '750px', width: '100%' }} className="animate-fade-in">
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Book Your <br /><span style={{ color: 'var(--accent)' }}>Session</span>
          </h1>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>
            Let's design your perfect visual narrative together.
          </p>
        </div>

        {status === 'success' ? (
          <div className="glass-panel slide-forward" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(212, 175, 55, 0.1)', color: 'var(--accent)', marginBottom: '2rem' }}>
              <Check size={40} />
            </div>
            <h3 style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem' }}>Request Received.</h3>
            <p className="text-muted">Your inquiry has been successfully captured. We look forward to creating magic together.</p>
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '3rem 3rem', position: 'relative', overflow: 'hidden' }}>
            
            {/* Progress Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent)' }}>
              <span>Step {step} of 4</span>
              <span>{Math.round((step / 4) * 100)}%</span>
            </div>
            <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', marginBottom: '3rem', overflow: 'hidden' }}>
              <div style={{ width: `${(step / 4) * 100}%`, height: '100%', backgroundColor: 'var(--accent)', transition: 'width 0.5s cubic-bezier(0.25, 1, 0.5, 1)' }} />
            </div>

            <form onSubmit={handleSubmit} style={{ minHeight: '350px', display: 'flex', flexDirection: 'column' }}>
              
              <div className={direction === 'forward' ? 'slide-forward' : 'slide-backward'} key={step} style={{ flexGrow: 1 }}>
                
                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 500 }}>Let's start with the basics</h2>
                    
                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                      <label htmlFor="name" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Full Name *</label>
                      <input id="name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Focus Lightman" style={{ padding: '1.2rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-main)', outline: 'none', transition: 'border 0.2s' }} onFocus={e => e.target.style.borderColor='var(--accent)'} onBlur={e => e.target.style.borderColor='var(--border-color)'} />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                      <label htmlFor="email" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Email Address *</label>
                      <input id="email" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="focus@auralens.com" style={{ padding: '1.2rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-main)', outline: 'none', transition: 'border 0.2s' }} onFocus={e => e.target.style.borderColor='var(--accent)'} onBlur={e => e.target.style.borderColor='var(--border-color)'} />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 500 }}>What are we capturing?</h2>
                    
                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                      <label htmlFor="type" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Type of Shoot</label>
                      <select id="type" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} style={{ padding: '1.2rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: '#111', color: 'var(--text-main)', outline: 'none', cursor: 'pointer' }}>
                        <option value="portrait">Luxury Portrait</option>
                        <option value="wedding">Wedding / Elopement</option>
                        <option value="commercial">Commercial / Fashion</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                      <label htmlFor="package" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Desired Package</label>
                      <select id="package" value={formData.packageId} onChange={e => setFormData({...formData, packageId: e.target.value})} style={{ padding: '1.2rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: '#111', color: 'var(--text-main)', outline: 'none', cursor: 'pointer' }}>
                        <option value="" disabled>Select a package (Optional)</option>
                        <option value="express">Express (30 min)</option>
                        <option value="standard">Standard (1 hr)</option>
                        <option value="premium">Premium (2 hr)</option>
                        <option value="platinum">Platinum (2 hr + Extras)</option>
                      </select>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                      <label style={{ fontWeight: 500, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Elevate Your Experience with Add-ons (Select all that apply) <Sparkles size={16} color="var(--accent)" />
                      </label>
                      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem', paddingTop: '1rem' }}>
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
                          <label key={addon.id} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.75rem', 
                            fontSize: '0.9rem', 
                            cursor: 'pointer', 
                            transition: 'all 0.2s',
                            padding: '1rem',
                            borderRadius: '4px',
                            border: extras.includes(addon.id) ? '1px solid var(--accent)' : '1px solid var(--border-color)',
                            backgroundColor: extras.includes(addon.id) ? 'rgba(212, 175, 55, 0.05)' : 'rgba(0,0,0,0.2)'
                          }}>
                            <input 
                              type="checkbox" 
                              checked={extras.includes(addon.id)}
                              onChange={() => handleExtraToggle(addon.id)}
                              style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer', accentColor: 'var(--accent)' }}
                            />
                            <span style={{ color: extras.includes(addon.id) ? 'var(--accent)' : 'inherit' }}>{addon.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 500 }}>Almost there</h2>
                    
                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                      <label htmlFor="message" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Any specific vision or details?</label>
                      <textarea id="message" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={6} placeholder="Tell us about the vibe, location ideas, or stylistic inspiration..." style={{ padding: '1.2rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-main)', outline: 'none', resize: 'vertical', transition: 'border 0.2s' }} onFocus={e => e.target.style.borderColor='var(--accent)'} onBlur={e => e.target.style.borderColor='var(--border-color)'}></textarea>
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

                {step < 4 ? (
                  <button type="button" onClick={nextStep} disabled={step === 1 && (!formData.name || !formData.email)} className={step === 1 && (!formData.name || !formData.email) ? 'btn-secondary' : 'btn-primary'} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '120px', justifyContent: 'center', opacity: step === 1 && (!formData.name || !formData.email) ? 0.5 : 1 }}>
                    Next <ChevronRight size={18} />
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
