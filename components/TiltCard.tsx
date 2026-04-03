'use client';

import React, { useState, useRef, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
}

export default function TiltCard({
  children,
  className = '',
  style = {},
  maxTilt = 10,
  perspective = 1000,
  scale = 1.02
}: TiltCardProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: `perspective(${perspective}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? scale : 1}, ${isHovered ? scale : 1}, 1)`,
        willChange: 'transform'
      }}
    >
      <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d', height: '100%', width: '100%' }}>
        {children}
      </div>
    </div>
  );
}
