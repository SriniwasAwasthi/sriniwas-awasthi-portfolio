'use client';

import * as React from 'react';
import { useReducedMotion } from 'framer-motion';

export function useMotionPresets() {
  const [mounted, setMounted] = React.useState(false);
  const prefersReduced = useReducedMotion();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const shouldReduceMotion = mounted ? Boolean(prefersReduced) : false;

  // Primary animations configurations
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeOut' },
  };

  const slideUp = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: shouldReduceMotion ? 0 : -30 },
    transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }, // custom ease-out
  };

  const slideDown = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] },
  };

  const scaleIn = {
    initial: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: 'easeOut' },
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const hoverCard = shouldReduceMotion
    ? {}
    : {
        whileHover: { y: -6, scale: 1.01 },
        whileTap: { scale: 0.98 },
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      };

  const hoverButton = shouldReduceMotion
    ? {}
    : {
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.97 },
        transition: { type: 'spring', stiffness: 400, damping: 15 },
      };

  return {
    fadeIn,
    slideUp,
    slideDown,
    scaleIn,
    staggerContainer,
    hoverCard,
    hoverButton,
    shouldReduceMotion,
  };
}
