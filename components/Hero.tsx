'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate parallax offsets (Subtle for better UX)
  const textOffset = {
    x: (mousePos.x - 0.5) * 10,
    y: (mousePos.y - 0.5) * 10,
  };

  const bgOffset = {
    x: (mousePos.x - 0.5) * -20,
    y: (mousePos.y - 0.5) * -20,
  };

  return (
    <section style={{
      position: 'relative',
      height: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      perspective: '1200px'
    }}>
      {/* Abstract luxury background with parallax */}
      <div style={{
        position: 'absolute',
        inset: '-10%',
        background: `radial-gradient(circle at ${50 + bgOffset.x}% ${50 + bgOffset.y}%, rgba(194, 153, 113, 0.12) 0%, var(--bg-color) 75%)`,
        zIndex: -1,
        transition: 'background 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
      }} />

      {/* Floating Antigravity Elements (Pure CSS Float for cleaner UX) */}
      <div className="animate-float" style={{ position: 'absolute', top: '15%', left: '10%', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(194, 153, 113, 0.05), transparent)', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.05)', zIndex: 1 }}></div>
      <div className="animate-float stagger-2" style={{ position: 'absolute', bottom: '20%', right: '15%', width: '80px', height: '80px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.03), transparent)', backdropFilter: 'blur(3px)', border: '1px solid rgba(194, 153, 113, 0.1)', zIndex: 1 }}></div>

      <div className="container" style={{ 
        textAlign: 'center', 
        zIndex: 10,
        transform: `translate3d(${textOffset.x}px, ${textOffset.y}px, 60px)`, 
        transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        transformStyle: 'preserve-3d'
      }}>
        <div className="animate-fade-in">
          <h1 style={{
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            marginBottom: '1.5rem',
            background: 'linear-gradient(to right, var(--text-main) 20%, var(--accent), var(--text-main) 80%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
            animation: 'glint 10s linear infinite'
          }}>
            Timeless <br /> Elegance
          </h1>
        </div>
        <p className="text-muted animate-fade-in stagger-1" style={{
          fontSize: '1.25rem',
          maxWidth: '600px',
          margin: '0 auto 3.5rem auto',
          fontWeight: 300,
          letterSpacing: '0.02em'
        }}>
          Guidance from enquiry to delivery by a female photographer. All you need to do is show up.
        </p>
        <div className="flex justify-center gap-8 animate-fade-in stagger-2" style={{ transformStyle: 'preserve-3d' }}>
          <MagneticButton radius={60}>
            <Link href="/portfolio" className="btn-primary glint-sweep" style={{ padding: '1rem 2.5rem', display: 'block' }}>
              Discover Portfolio
            </Link>
          </MagneticButton>
          <MagneticButton radius={60}>
            <Link href="/booking" className="btn-secondary" style={{ padding: '1rem 2.5rem', display: 'block' }}>
              Book a Session
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
