import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Particle configuration for the floating dots overlay.
 * Each particle has a random position and animation delay
 * for an organic, non-uniform effect.
 */
interface Particle {
  /** Unique identifier for React key prop */
  id: number;
  /** Horizontal position as percentage (0-100) */
  x: number;
  /** Vertical position as percentage (0-100) */
  y: number;
  /** Diameter in pixels */
  size: number;
  /** Animation delay in seconds for stagger effect */
  delay: number;
  /** Animation duration in seconds */
  duration: number;
}

/**
 * AnimatedCoin — Framer Motion component that renders the hero coin image
 * with an infinite floating animation and decorative particle overlay.
 *
 * Implements component-blueprint.md Section 3:
 * - Infinite float (translateY + rotate ±2°)
 * - Floating lilac particle dots
 * - will-change: transform optimization
 * - Respects prefers-reduced-motion
 *
 * @returns {JSX.Element} Animated hero coin with particle overlay
 */
export const AnimatedCoin: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  /**
   * Generate particle configurations once.
   * Uses deterministic pseudo-random values seeded from index
   * to avoid layout shift on re-render.
   */
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: ((i * 37 + 13) % 100),
      y: ((i * 53 + 7) % 100),
      size: 4 + (i % 4) * 2,
      delay: (i * 0.4) % 3,
      duration: 3 + (i % 3),
    }));
  }, []);

  /**
   * Float animation variants for the main coin image.
   * Subtle vertical translation + slight rotation for a premium feel.
   */
  const floatAnimation = shouldReduceMotion
    ? {}
    : {
        y: [0, -14, -6, -20, 0],
        rotate: [0, 1.5, -1, 2, 0],
      };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '520px',
        aspectRatio: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-hidden="true"
    >
      {/* Floating Particles Layer */}
      {!shouldReduceMotion &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              background: 'rgba(194, 82, 112, 0.4)',
              willChange: 'transform',
              pointerEvents: 'none',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

      {/* Main Coin Image */}
      <motion.img
        src={`${import.meta.env.BASE_URL}assets/hero/click-coin.webp`}
        alt="CLICK — Moneda del Aprendiz. Símbolo del conocimiento en un clic"
        width={480}
        height={480}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          willChange: 'transform',
          filter: 'drop-shadow(0 20px 40px rgba(59, 34, 68, 0.3))',
        }}
        animate={floatAnimation}
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default AnimatedCoin;
