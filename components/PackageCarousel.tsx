'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Pkg {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export default function PackageCarousel({ packages }: { packages: Pkg[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-fade-in stagger-1" style={{ position: 'relative', width: '100%', margin: '0 auto' }}>
      
      {/* Container to hide overflow and allow scrolling */}
      <div 
        ref={scrollRef}
        className="hide-scroll"
        style={{ 
          display: 'flex', 
          gap: '2rem', 
          overflowX: 'auto', 
          scrollSnapType: 'x mandatory', 
          padding: '2rem 1rem 4rem 1rem',
          scrollBehavior: 'smooth'
        }}
      >
        {packages.map((pkg, i) => (
          <div key={i} style={{ minWidth: '320px', maxWidth: '380px', flex: '0 0 auto', scrollSnapAlign: 'center', display: 'flex' }}>
            
            <div className="glass-panel hover-lift" style={{ 
              position: 'relative',
              padding: '3rem 2rem', 
              display: 'flex', 
              flexDirection: 'column', 
              width: '100%',
              border: pkg.popular ? '1px solid var(--accent)' : '1px solid var(--border-color)',
              boxShadow: pkg.popular ? '0 10px 40px rgba(0,0,0,0.3)' : 'none',
              minHeight: '550px'
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
              
              <Link href={`/booking?package=${pkg.title.toLowerCase()}`} className={pkg.popular ? "btn-primary" : "btn-secondary"} style={{ textAlign: 'center', width: '100%', marginTop: 'auto' }}>
                Select {pkg.title}
              </Link>
            </div>

          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={scrollLeft} 
        style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '1rem', 
          transform: 'translateY(-50%)', 
          width: '3.5rem', 
          height: '3.5rem', 
          borderRadius: '50%', 
          backgroundColor: 'var(--header-bg)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border-color)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'var(--text-main)',
          transition: 'all 0.3s ease',
          zIndex: 10,
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent)'; e.currentTarget.style.color = '#000'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--header-bg)'; e.currentTarget.style.color = 'var(--text-main)'; }}
      >
        <ChevronLeft size={28} />
      </button>

      <button 
        onClick={scrollRight} 
        style={{ 
          position: 'absolute', 
          top: '50%', 
          right: '1rem', 
          transform: 'translateY(-50%)', 
          width: '3.5rem', 
          height: '3.5rem', 
          borderRadius: '50%', 
          backgroundColor: 'var(--header-bg)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border-color)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'var(--text-main)',
          transition: 'all 0.3s ease',
          zIndex: 10,
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent)'; e.currentTarget.style.color = '#000'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--header-bg)'; e.currentTarget.style.color = 'var(--text-main)'; }}
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
}
