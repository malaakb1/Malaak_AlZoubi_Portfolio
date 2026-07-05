'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
  variants?: Variants;
}

/** Single scroll-reveal wrapper (fade + rise). */
export function Reveal({ children, className, delay = 0, as = 'div', variants }: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={
        variants ?? {
          hidden: { opacity: 0, y: 26 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay } },
        }
      }
    >
      {children}
    </MotionTag>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}

/** Container that staggers children which use the `fadeUp` variant. */
export function Stagger({ children, className, stagger = 0.09, delayChildren = 0 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(stagger, delayChildren)}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'span';
}

export function StaggerItem({ children, className, as = 'div' }: StaggerItemProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag className={cn(className)} variants={fadeUp}>
      {children}
    </MotionTag>
  );
}
