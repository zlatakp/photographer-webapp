'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Pkg {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const CARD_WIDTH = 500;
const GAP = 32; // 2rem

export default function PackageCarousel({ packages }: { packages: Pkg[] }) {
  const n = packages.length;
  // Triple the array so we always have clones on both sides to scroll into
  const cloned = [...packages, ...packages, ...packages];

  // Start at the "real" first item (offset by one full copy)
  const [index, setIndex] = useState(n);
  const [animate, setAnimate] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(n); // Mirrors index but always up-to-date in event handlers
  const isAnimating = useRef(false);

  // Measure container width for centering
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Re-enable animation after a silent (no-transition) index reset
  useEffect(() => {
    if (!animate) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
          isAnimating.current = false;
        });
      });
    }
  }, [animate]);

  const step = CARD_WIDTH + GAP;
  const centerOffset = containerWidth ? (containerWidth - CARD_WIDTH) / 2 : 0;
  const translateX = -(indexRef.current * step) + centerOffset;

  const navigate = (dir: 1 | -1) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    const newIdx = indexRef.current + dir;
    indexRef.current = newIdx;
    setAnimate(true);
    setIndex(newIdx);
  };

  const handleTransitionEnd = () => {
    const current = indexRef.current;
    // If we drifted into a clone region, silently jump back to the real copy
    if (current >= n * 2) {
      const newIdx = current - n;
      indexRef.current = newIdx;
      setAnimate(false);
      setIndex(newIdx);
    } else if (current < n) {
      const newIdx = current + n;
      indexRef.current = newIdx;
      setAnimate(false);
      setIndex(newIdx);
    } else {
      isAnimating.current = false;
    }
  };

  const goToReal = (realIdx: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    const newIdx = n + realIdx;
    indexRef.current = newIdx;
    setAnimate(true);
    setIndex(newIdx);
  };

  const activeRealIndex = ((indexRef.current % n) + n) % n;

  const btnBase: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
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
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
  };

  return (
    <div
      ref={containerRef}
      className="animate-fade-in stagger-1"
      style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '2rem 0 5rem' }}
    >
      {/* Scrolling track */}
      <div
        style={{
          display: 'flex',
          gap: `${GAP}px`,
          transform: containerWidth ? `translateX(${translateX}px)` : undefined,
          transition: animate ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
          willChange: 'transform',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {cloned.map((pkg, i) => {
          const isActive = i === indexRef.current;
          return (
            <div
              key={i}
              style={{
                minWidth: `${CARD_WIDTH}px`,
                width: `${CARD_WIDTH}px`,
                flex: '0 0 auto',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                opacity: isActive ? 1 : 0.45,
                transform: isActive ? 'scale(1)' : 'scale(0.92)',
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              <div
                className="glass-panel hover-lift"
                style={{
                  position: 'relative',
                  padding: '3rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  border: '1px solid var(--border-color)',
                  boxShadow: pkg.popular ? '0 10px 40px rgba(0,0,0,0.3)' : 'none',
                  minHeight: '550px',
                }}
              >
                {pkg.popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-15px',
                      left: '50%',
                      transform: 'translateX(60%)',
                      backgroundColor: 'var(--accent)',
                      color: '#000',
                      padding: '0.25rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <h2 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                  {pkg.title}
                </h2>
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

                <Link
                  href={`/booking?package=${pkg.title.toLowerCase()}`}
                  className={'btn-secondary'}
                  style={{ textAlign: 'center', width: '100%', marginTop: 'auto' }}
                >
                  Select {pkg.title}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prev button */}
      <button
        onClick={() => navigate(-1)}
        style={{ ...btnBase, left: '1rem' }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent)'; e.currentTarget.style.color = '#000'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--header-bg)'; e.currentTarget.style.color = 'var(--text-main)'; }}
        aria-label="Previous package"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Next button */}
      <button
        onClick={() => navigate(1)}
        style={{ ...btnBase, right: '1rem' }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent)'; e.currentTarget.style.color = '#000'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--header-bg)'; e.currentTarget.style.color = 'var(--text-main)'; }}
        aria-label="Next package"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dot indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
        }}
      >
        {packages.map((_, i) => (
          <button
            key={i}
            onClick={() => goToReal(i)}
            aria-label={`Go to package ${i + 1}`}
            style={{
              width: activeRealIndex === i ? '1.5rem' : '0.5rem',
              height: '0.5rem',
              borderRadius: '999px',
              backgroundColor: activeRealIndex === i ? 'var(--accent)' : 'var(--border-color)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
