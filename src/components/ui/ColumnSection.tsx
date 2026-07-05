'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { viewportOnce } from '@/lib/motion';

interface ColumnSectionProps {
  id?: string;
  eyebrow?: ReactNode;
  /** Section title — the LAST word is rendered as an outlined second line (Sawad style). */
  title: string;
  subtitle?: ReactNode;
  action?: ReactNode;
  isRTL?: boolean;
  className?: string;
  /** 'lg' = oversized hero heading; 'md' = standard section heading. */
  size?: 'md' | 'lg';
  children: ReactNode;
}

/**
 * A right-column section for the sticky-profile home layout.
 * Renders a big two-line heading (solid line 1 + outlined line 2), mirroring the
 * "SOFTWARE / ENGINEER" treatment, then its children below.
 */
export function ColumnSection({
  id,
  eyebrow,
  title,
  subtitle,
  action,
  isRTL = false,
  className,
  size = 'md',
  children,
}: ColumnSectionProps) {
  const parts = title.trim().split(/\s+/);
  const last = parts.length > 1 ? parts.pop()! : '';
  const first = parts.join(' ');
  const headingSize =
    size === 'lg'
      ? 'text-5xl sm:text-6xl lg:text-[4.75rem] xl:text-[5.5rem]'
      : 'text-4xl sm:text-5xl lg:text-[3.5rem]';

  return (
    <section id={id} className={cn('scroll-mt-28', className)}>
      <div className={cn('flex items-end justify-between gap-4 mb-8', isRTL && 'flex-row-reverse text-right')}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow && (
            <span className={cn('inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-primary-400 mb-3', isRTL && 'flex-row-reverse')}>
              <span className="h-px w-6 bg-gradient-to-r from-primary-400 to-transparent" aria-hidden="true" />
              {eyebrow}
            </span>
          )}
          <h2
            className={cn(
              'font-serif font-bold leading-[0.85] tracking-tight break-words',
              headingSize,
              !isRTL && 'uppercase',
            )}
          >
            {first ? (
              <>
                <span className="text-[var(--color-text)]">{first}</span>
                <br />
                <span className="text-outline">{last}</span>
              </>
            ) : (
              <span className="gradient-text">{title}</span>
            )}
          </h2>
          {subtitle && <p className="mt-4 text-[var(--color-text-muted)] max-w-lg text-base normal-case">{subtitle}</p>}
        </motion.div>

        {action && <div className="flex-shrink-0 hidden sm:block">{action}</div>}
      </div>

      {children}
    </section>
  );
}
