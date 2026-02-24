'use client';

import { motion } from 'framer-motion';
import { Briefcase, Users, GraduationCap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface TimelineProps {
  locale: Locale;
}

const typeIcons = {
  work:      Briefcase,
  volunteer: Users,
  education: GraduationCap,
};

const typeColors = {
  work:      'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400',
  volunteer: 'bg-lavender-100 text-lavender-600 dark:bg-lavender-900/30 dark:text-lavender-400',
  education: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
};

export function Timeline({ locale }: TimelineProps) {
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
    <section aria-labelledby="experience-title">
      <h2
        id="experience-title"
        className={cn('text-2xl font-serif mb-8', isRTL && 'text-right')}
      >
        {experienceTitle}
      </h2>

      <div className="relative">
        {/* Vertical line */}
        <div
          className={cn(
            'absolute top-0 bottom-0 w-px bg-[var(--color-border)]',
            isRTL ? 'right-5' : 'left-5',
          )}
          aria-hidden="true"
        />

        <ol className="space-y-6">
          {items.map((item, i) => {
            const Icon = typeIcons[item.type] ?? Briefcase;
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={cn(
                  'relative flex gap-5',
                  isRTL && 'flex-row-reverse',
                )}
              >
                {/* Icon dot */}
                <div
                  className={cn(
                    'relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
                    typeColors[item.type],
                  )}
                  aria-hidden="true"
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Content */}
                <div className={cn('flex-1 pb-2', isRTL && 'text-right')}>
                  <div className={cn('flex items-start flex-wrap gap-2 mb-1', isRTL && 'flex-row-reverse')}>
                    <h3 className="font-semibold text-[var(--color-text)]">{item.role}</h3>
                    <span className="text-[var(--color-text-muted)]">·</span>
                    <span className="text-primary-600 dark:text-primary-400 font-medium">
                      {item.company}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] mb-2 font-medium">
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
