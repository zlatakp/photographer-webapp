'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function LensFlare() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lagPos, setLagPos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      setLagPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.05, // Smoother (was 0.1)
        y: prev.y + (mousePos.y - prev.y) * 0.05,
      }));
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mousePos, isVisible]);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      {/* Primary Flare (Close to cursor) */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(194, 153, 113, 0.06) 0%, transparent 70%)',
        left: lagPos.x - 150,
        top: lagPos.y - 150,
        filter: 'blur(30px)',
        mixBlendMode: 'screen',
        willChange: 'transform'
      }} />

      {/* Hexagonal Artifacts (Offset from center) */}
      {[200, -300, 500].map((offset, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${60 - i * 10}px`,
          height: `${60 - i * 10}px`,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(194, 153, 113, ${0.04 - i * 0.01}), transparent)`,
          left: lagPos.x + (lagPos.x - window.innerWidth / 2) * (offset / 1000) - (30 - i * 5),
          top: lagPos.y + (lagPos.y - window.innerHeight / 2) * (offset / 1000) - (30 - i * 5),
          border: '1px solid rgba(255,255,255,0.02)',
          backdropFilter: 'blur(3px)',
          mixBlendMode: 'screen',
          willChange: 'transform'
        }} />
      ))}
    </div>
  );
}
