'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';

interface Pkg {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const CARD_WIDTH = 500;
const GAP = 32; // 2rem
const VISIBLE_WINDOW = 3; // Number of cards to render on each side of the active one

export default function PackageCarousel({ packages }: { packages: Pkg[] }) {
  const n = packages.length;
  if (n === 0) return null;

  // Initial large index to allow infinite bidirectional scroll without negative numbers
  // This avoids the 'snap back' and complex edge reset logic entirely.
  const START_INDEX = n * 500; 

  const [virtualIndex, setVirtualIndex] = useState(START_INDEX);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isIdle, setIsIdle] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  const resetIdleTimer = () => {
    setIsIdle(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIsIdle(true), 4000);
  };

  // Measure container width for centering
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    resetIdleTimer();
    return () => {
      window.removeEventListener('resize', measure);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  const step = CARD_WIDTH + GAP;
  const centerOffset = containerWidth ? (containerWidth - CARD_WIDTH) / 2 : 0;
  
  // Total track displacement is purely based on the virtual index
  const translateX = -(virtualIndex * step) + centerOffset;

  const navigate = (dir: 1 | -1) => {
    resetIdleTimer();
    setVirtualIndex(prev => prev + dir);
  };

  const goToReal = (realIdx: number) => {
    resetIdleTimer();
    // Find the nearest virtual index that maps to this real index
    const currentReal = virtualIndex % n;
    let diff = realIdx - currentReal;
    // Shortest path logic (optional, but premium feel)
    if (diff > n / 2) diff -= n;
    else if (diff < -n / 2) diff += n;
    
    setVirtualIndex(prev => prev + diff);
  };

  const activeRealIndex = virtualIndex % n;

  // Window of virtual slots to render
  const windowSlots = useMemo(() => {
    const slots = [];
    for (let i = virtualIndex - VISIBLE_WINDOW; i <= virtualIndex + VISIBLE_WINDOW; i++) {
      slots.push(i);
    }
    return slots;
  }, [virtualIndex]);

  const btnBase: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    width: '4.5rem',
    height: '4.5rem',
    borderRadius: '50%',
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'blur(16px)',
    border: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-main)',
    transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
    zIndex: 10,
    cursor: 'pointer',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
  };

  const arrowOffset = containerWidth > 1350 ? `calc(50% - 640px)` : '1.5rem';

  return (
    <div
      ref={containerRef}
      className="animate-fade-in stagger-1"
      style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '4rem 0 8rem', perspective: '1200px' }}
      onMouseMove={resetIdleTimer}
    >
      {/* Background Decorations */}
      <div className="animate-float" style={{ position: 'absolute', top: '10%', right: '5%', width: '100px', height: '100px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(194, 153, 113, 0.03), transparent)', border: '1px solid rgba(255,255,255,0.02)', zIndex: 0 }}></div>
      <div className="animate-float stagger-2" style={{ position: 'absolute', bottom: '15%', left: '8%', width: '60px', height: '60px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.02), transparent)', border: '1px solid rgba(194,153,113,0.05)', zIndex: 0 }}></div>

      {/* Scrolling track */}
      <div
        style={{
          position: 'relative',
          height: '650px', // Maintain track height
          transform: containerWidth ? `translateX(${translateX}px)` : undefined,
          transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          willChange: 'transform',
          transformStyle: 'preserve-3d'
        }}
      >
        {windowSlots.map((vIdx) => {
          const pkg = packages[((vIdx % n) + n) % n];
          const isActive = vIdx === virtualIndex;
          
          return (
            <div
              key={vIdx}
              style={{
                position: 'absolute',
                left: `${vIdx * step}px`,
                width: `${CARD_WIDTH}px`,
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                opacity: isActive ? 1 : 0.3,
                transform: isActive ? 'scale(1) translateZ(0)' : 'scale(0.85) translateZ(-100px)',
                pointerEvents: 'auto',
                transformStyle: 'preserve-3d',
                cursor: isActive ? 'default' : 'pointer'
              }}
              onClick={!isActive ? () => setVirtualIndex(vIdx) : undefined}
            >
              <div
                className={`glass-panel ${!isActive ? 'hover-boost' : ''}`}
                style={{
                  position: 'relative',
                  padding: '3rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  border: isActive ? '1px solid var(--accent)' : '1px solid var(--border-color)',
                  boxShadow: pkg.popular ? '0 20px 80px rgba(0,0,0,0.5)' : '0 10px 40px rgba(0,0,0,0.2)',
                  minHeight: '580px',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
                  transition: 'all 0.6s ease'
                }}
              >
                {pkg.popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-15px',
                      left: '50%',
                      transform: 'translateX(60%) translateZ(30px)',
                      backgroundColor: 'var(--accent)',
                      color: '#000',
                      padding: '0.25rem 1.25rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)'
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <h2 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)', transform: 'translateZ(20px)' }}>
                  {pkg.title}
                </h2>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--accent)', transform: 'translateZ(30px)' }}>{pkg.price}</div>
                <p className="text-muted" style={{ marginBottom: '2.5rem', flex: 1, fontSize: '1.05rem', transform: 'translateZ(10px)' }}>{pkg.description}</p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem', transform: 'translateZ(15px)' }}>
                  {pkg.features.map((feature, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <span style={{ color: 'var(--accent)', marginTop: '2px' }}>✓</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 300 }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {isActive ? (
                  <Link
                    href={`/booking?package=${pkg.title.toLowerCase()}`}
                    className="btn-secondary glint-sweep hover-lift"
                    style={{ textAlign: 'center', width: '100%', marginTop: 'auto', display: 'block', padding: '1rem' }}
                  >
                    Select {pkg.title}
                  </Link>
                ) : (
                  <div
                    className="btn-secondary"
                    style={{ textAlign: 'center', width: '100%', marginTop: 'auto', display: 'block', padding: '1rem', opacity: 0.6 }}
                  >
                    Select {pkg.title}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Prev button */}
      {containerWidth > 0 && (
        <MagneticButton radius={120}>
          <button
            onClick={() => navigate(-1)}
            style={{ 
              ...btnBase, 
              left: arrowOffset,
              top: 'calc(4rem + 290px)', // Centered on Card Content
              transform: 'translateY(-50%) translateZ(100px)', // Depth awareness
              border: isIdle ? '1px solid var(--accent)' : '1px solid var(--border-color)',
              boxShadow: isIdle ? '0 0 20px rgba(194, 153, 113, 0.4)' : btnBase.boxShadow,
              animation: isIdle ? 'glint 4s linear infinite' : 'none'
            }}
            className="hover-lift"
            aria-label="Previous package"
          >
            <ChevronLeft size={32} className={isIdle ? 'text-accent' : ''} />
          </button>
        </MagneticButton>
      )}

      {/* Next button */}
      {containerWidth > 0 && (
        <MagneticButton radius={120}>
          <button
            onClick={() => navigate(1)}
            style={{ 
              ...btnBase, 
              right: arrowOffset,
              top: 'calc(4rem + 290px)',
              transform: 'translateY(-50%) translateZ(100px)',
              border: isIdle ? '1px solid var(--accent)' : '1px solid var(--border-color)',
              boxShadow: isIdle ? '0 0 20px rgba(194, 153, 113, 0.4)' : btnBase.boxShadow,
              animation: isIdle ? 'glint 4s linear infinite' : 'none'
            }}
            className="hover-lift"
            aria-label="Next package"
          >
            <ChevronRight size={32} className={isIdle ? 'text-accent' : ''} />
          </button>
        </MagneticButton>
      )}

      {/* Dot indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '1.25rem',
          alignItems: 'center',
          zIndex: 5,
          padding: '1rem 2rem',
          borderRadius: '40px',
          backgroundColor: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {packages.map((_, i) => (
          <MagneticButton key={i} radius={40}>
            <button
              onClick={() => goToReal(i)}
              aria-label={`Go to package ${i + 1}`}
              style={{
                width: activeRealIndex === i ? '3.5rem' : '0.7rem',
                height: '0.7rem',
                borderRadius: '999px',
                backgroundColor: activeRealIndex === i ? 'var(--accent)' : 'rgba(255,255,255,0.15)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {activeRealIndex === i && <div className="glint-sweep" style={{ opacity: 0.4 }} />}
            </button>
          </MagneticButton>
        ))}
      </div>
    </div>
  );
}
