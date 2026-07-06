'use client';

import { motion } from 'framer-motion';
import { Briefcase, Users, GraduationCap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface TimelineProps {
  locale: Locale;
  /** Hide the built-in "Journey / Experience" header (when a parent already supplies one). */
  hideHeader?: boolean;
}

const typeIcons = {
  work:      Briefcase,
  volunteer: Users,
  education: GraduationCap,
};

/** Per-type dot accent (mint / magenta / gold) for the dark timeline. */
const typeDot = {
  work:      { bg: 'bg-primary-500/12', text: 'text-primary-400', ring: 'ring-primary-500/40', glow: 'shadow-glow-mint' },
  volunteer: { bg: 'bg-magenta-500/12', text: 'text-magenta-400', ring: 'ring-magenta-500/40', glow: 'shadow-glow-pink' },
  education: { bg: 'bg-gold-500/12',    text: 'text-gold-400',    ring: 'ring-gold-500/40',    glow: 'shadow-glow-gold' },
};

export function Timeline({ locale, hideHeader = false }: TimelineProps) {
  const t = useTranslations('timeline');
  const aboutT = useTranslations('about');
  const experienceTitle = aboutT('experience.title');
  const isRTL = locale === 'ar';

  const items = t.raw('items') as Array<{
    role: string;
    company: string;
    period: string;
    description: string;
    type: 'work' | 'volunteer' | 'education';
  }>;

  return (
    <section aria-labelledby={hideHeader ? undefined : 'experience-title'} aria-label={hideHeader ? experienceTitle : undefined}>
      {!hideHeader && (
        <div className={cn('mb-8', isRTL && 'text-right')}>
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary-400 mb-3">
            <span className="h-px w-6 bg-gradient-to-r from-primary-400 to-transparent" aria-hidden="true" />
            {isRTL ? 'المسيرة' : 'Journey'}
          </span>
          <h2
            id="experience-title"
            className="text-2xl sm:text-3xl font-serif font-bold tracking-tight"
          >
            {experienceTitle}
          </h2>
        </div>
      )}

      <div className="relative">
        {/* Gradient vertical line (mint → purple) */}
        <div
          className={cn(
            'absolute top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-magenta-500 to-lavender-500 opacity-60',
            isRTL ? 'right-5' : 'left-5',
          )}
          aria-hidden="true"
        />

        <ol className="space-y-6">
          {items.map((item, i) => {
            const Icon = typeIcons[item.type] ?? Briefcase;
            const dot = typeDot[item.type] ?? typeDot.work;
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'relative flex gap-5',
                  isRTL && 'flex-row-reverse',
                )}
              >
                {/* Icon dot */}
                <div
                  className={cn(
                    'relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ring-1',
                    dot.bg,
                    dot.text,
                    dot.ring,
                    dot.glow,
                  )}
                  aria-hidden="true"
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Content */}
                <div className={cn('card flex-1 p-5', isRTL && 'text-right')}>
                  <div className={cn('flex items-start flex-wrap gap-2 mb-1', isRTL && 'flex-row-reverse')}>
                    <h3 className="font-semibold text-[var(--color-text)]">{item.role}</h3>
                    <span className="text-[var(--color-text-muted)]">·</span>
                    <span className="text-primary-400 font-medium">
                      {item.company}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[var(--color-text-muted)] mb-2">
                    {item.period}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
