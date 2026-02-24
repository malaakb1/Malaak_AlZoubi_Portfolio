'use client';

import { motion } from 'framer-motion';
import { Sparkles, MessageSquare, Eye, BarChart3, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

const icons = { Sparkles, MessageSquare, Eye, BarChart3, Zap };

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

interface HighlightsProps {
  locale: Locale;
}

export function Highlights({ locale }: HighlightsProps) {
  const t = useTranslations('highlights');
  const isRTL = locale === 'ar';

  const items = t.raw('items') as Array<{ icon: string; title: string; desc: string }>;

  const gradients = [
    'from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-900/10',
    'from-lavender-100 to-lavender-50 dark:from-lavender-900/30 dark:to-lavender-900/10',
    'from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10',
    'from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-900/10',
    'from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-900/10',
  ];

  const iconColors = [
    'text-primary-500',
    'text-lavender-500',
    'text-blue-500',
    'text-emerald-500',
    'text-orange-500',
  ];

  return (
    <section className="section-padding bg-[var(--color-bg-2)]" aria-labelledby="highlights-title">
      <div className={cn('max-w-6xl mx-auto px-4 sm:px-6', isRTL && 'text-right')}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 id="highlights-title" className="text-3xl sm:text-4xl font-serif mb-3">
            {t('title')}
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-xl">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {items.map((item, i) => {
            const Icon = icons[item.icon as keyof typeof icons] ?? Sparkles;
            return (
              <motion.div
                key={item.title}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={cn(
                  'relative p-5 rounded-2xl bg-gradient-to-br card overflow-hidden group cursor-default',
                  gradients[i % gradients.length],
                )}
              >
                <div className={cn('mb-3 flex', isRTL ? 'justify-end' : 'justify-start')}>
                  <div className={cn('p-2.5 rounded-xl bg-white/60 dark:bg-white/10', iconColors[i % iconColors.length])}>
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-[var(--color-text)] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
