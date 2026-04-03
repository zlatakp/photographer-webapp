'use client';

import React, { useState, ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number; // Legacy prop, no longer affects movement
  radius?: number;   // Legacy prop, no longer affects movement
  scaleOnHover?: boolean;
}

/**
 * Refactored: Previously a magnetic "tug" component.
 * Now provides a premium, centered enlargement effect on hover 
 * to satisfy the request for "no tug, just enlargement".
 */
export default function MagneticButton({
  children,
  className = '',
  scaleOnHover = true,
}: MagneticButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-block',
        position: 'relative',
        transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: isHovered && scaleOnHover ? 'scale(1.08)' : 'scale(1)',
        willChange: 'transform',
        zIndex: isHovered ? 2 : 1 // Prevents clipping with neighbors during scale
      }}
    >
      <div style={{
          transition: 'transform 0.4s ease-out',
          display: 'block'
      }}>
        {children}
      </div>
    </div>
  );
}
