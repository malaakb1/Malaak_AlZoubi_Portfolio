import type { Variants } from 'framer-motion';

/**
 * Shared Framer Motion variants + helpers.
 * All reveal animations respect `prefers-reduced-motion` automatically because
 * Framer Motion reads the OS setting when components use `useReducedMotion`,
 * and our CSS layer also neutralises transitions under that media query.
 */

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Container that staggers its direct children. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Fade + rise. Default child of `staggerContainer`. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/** Fade + rise with a caller-controlled index delay (no parent container needed). */
export const fadeUpDelay = (i = 0, base = 0.06): Variants => ({
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT, delay: i * base },
  },
});

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE_OUT } },
};

/** Slide from the inline-start side (direction supplied by caller for RTL). */
export const slideFrom = (x = -28): Variants => ({
  hidden: { opacity: 0, x },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
});

/** Standard viewport config for scroll-reveals. */
export const viewportOnce = { once: true, amount: 0.2 } as const;
