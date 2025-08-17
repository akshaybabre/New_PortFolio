import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedBackgroundProps {
  variant?: 'particles' | 'geometric' | 'gradient' | 'minimal';
  className?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  variant = 'particles', 
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      if (variant === 'particles') {
        // Create floating particles
        for (let i = 0; i < 50; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          const size = gsap.utils.random(2, 8);
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.left = `${gsap.utils.random(0, 100)}%`;
          particle.style.top = `${gsap.utils.random(0, 100)}%`;
          container.appendChild(particle);

          gsap.to(particle, {
            y: `${gsap.utils.random(-100, 100)}px`,
            x: `${gsap.utils.random(-100, 100)}px`,
            rotation: 360,
            duration: gsap.utils.random(10, 20),
            repeat: -1,
            yoyo: true,
            ease: 'none',
          });
        }
      } else if (variant === 'geometric') {
        // Create floating geometric shapes
        const shapes = ['▲', '●', '■', '♦'];
        for (let i = 0; i < 20; i++) {
          const shape = document.createElement('div');
          shape.className = 'floating-shape text-6xl font-light';
          shape.textContent = shapes[i % shapes.length];
          shape.style.left = `${gsap.utils.random(0, 100)}%`;
          shape.style.top = `${gsap.utils.random(0, 100)}%`;
          shape.style.color = `hsl(${gsap.utils.random(200, 300)}, 70%, 50%)`;
          container.appendChild(shape);

          gsap.to(shape, {
            y: `${gsap.utils.random(-200, 200)}px`,
            x: `${gsap.utils.random(-200, 200)}px`,
            rotation: 360,
            scale: gsap.utils.random(0.5, 1.5),
            duration: gsap.utils.random(15, 25),
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
          });
        }
      } else if (variant === 'gradient') {
        // Create gradient orbs
        for (let i = 0; i < 8; i++) {
          const orb = document.createElement('div');
          orb.className = 'absolute rounded-full opacity-20 blur-3xl';
          const size = gsap.utils.random(200, 400);
          orb.style.width = `${size}px`;
          orb.style.height = `${size}px`;
          orb.style.background = `linear-gradient(45deg, hsl(${gsap.utils.random(200, 300)}, 70%, 50%), hsl(${gsap.utils.random(200, 300)}, 70%, 60%))`;
          orb.style.left = `${gsap.utils.random(-10, 110)}%`;
          orb.style.top = `${gsap.utils.random(-10, 110)}%`;
          container.appendChild(orb);

          gsap.to(orb, {
            x: `${gsap.utils.random(-100, 100)}px`,
            y: `${gsap.utils.random(-100, 100)}px`,
            scale: gsap.utils.random(0.8, 1.2),
            duration: gsap.utils.random(20, 30),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }
      }
    }, container);

    return () => ctx.revert();
  }, [variant]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: -1 }}
    />
  );
};