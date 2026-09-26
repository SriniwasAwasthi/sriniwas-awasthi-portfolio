'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  width?: 'w-full' | 'w-auto';
  className?: string;
}

/**
 * Ultra-smooth, hardware-accelerated reveal animation.
 * Optimized for 60/120fps scrolling without main-thread spring physics overhead.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.45,
  yOffset = 24,
  xOffset = 0,
  width = 'w-full',
  className = '',
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants = React.useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : yOffset,
        x: shouldReduceMotion ? 0 : xOffset,
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
      },
    }),
    [shouldReduceMotion, yOffset, xOffset],
  );

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : Math.min(delay, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`${width} ${className}`.trim()}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}
