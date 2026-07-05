'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { viewportOnce } from '@/lib/motion';

interface SectionHeaderProps {
  /** Small kicker/eyebrow label above the title. */
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  isRTL?: boolean;
  align?: 'start' | 'center';
  id?: string;
  className?: string;
  /** Optional action rendered on the opposite side (e.g. "View all"). */
  action?: ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  isRTL = false,
  align = 'start',
  id,
  className,
  action,
}: SectionHeaderProps) {
  const centered = align === 'center';

  return (
    <div
      className={cn(
        'mb-12 gap-4',
        action && !centered ? 'flex flex-col sm:flex-row sm:items-end justify-between' : '',
        centered && 'text-center flex flex-col items-center',
        className,
      )}
      style={action && !centered ? { flexDirection: isRTL ? undefined : undefined } : undefined}
    >
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(centered && 'flex flex-col items-center', isRTL && !centered && 'text-right')}
      >
        {eyebrow && (
          <span
            className={cn(
              'inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary-400 mb-3',
              centered && 'justify-center',
            )}
          >
            <span className="h-px w-6 bg-gradient-to-r from-primary-400 to-transparent" aria-hidden />
            {eyebrow}
          </span>
        )}
        <h2
          id={id}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-bold leading-[1.05] tracking-tight"
        >
          {title}
        </h2>
        {subtitle && (
          <p className={cn('mt-3 text-[var(--color-text-muted)] max-w-xl', centered && 'mx-auto')}>
            {subtitle}
          </p>
        )}
      </motion.div>

      {action && !centered && (
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="flex-shrink-0"
        >
          {action}
        </motion.div>
      )}
    </div>
  );
}
