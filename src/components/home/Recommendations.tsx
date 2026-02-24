'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { recommendations } from '@/data/recommendations';
import type { Locale } from '@/types';

interface RecommendationsProps {
  locale: Locale;
}

const swipeThreshold = 50;

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export function Recommendations({ locale }: RecommendationsProps) {
  const t = useTranslations('recommendations');
  const isRTL = locale === 'ar';
  const [[index, direction], setIndex] = useState([0, 0]);

  const paginate = (dir: number) => {
    setIndex(([prev]) => {
      const next = (prev + dir + recommendations.length) % recommendations.length;
      return [next, dir];
    });
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > swipeThreshold) paginate(isRTL ? 1 : -1);
    else if (info.offset.x < -swipeThreshold) paginate(isRTL ? -1 : 1);
  };

  const rec = recommendations[index];

  return (
    <section className="section-padding overflow-hidden" aria-labelledby="rec-title">
      <div className={cn('max-w-4xl mx-auto px-4 sm:px-6', isRTL && 'text-right')}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 id="rec-title" className="text-3xl sm:text-4xl font-serif mb-2">
            {t('title')}
          </h2>
          <p className="text-[var(--color-text-muted)]">{t('subtitle')}</p>
        </motion.div>

        {/* Card carousel */}
        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={() => paginate(isRTL ? 1 : -1)}
            aria-label={t('prev')}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 z-10 p-2 rounded-full',
              'bg-[var(--color-card)] border border-[var(--color-border)] shadow-sm',
              'text-[var(--color-text-muted)] hover:text-primary-500 hover:border-primary-300 transition-colors',
              'hidden sm:flex items-center justify-center',
              isRTL ? '-right-4 sm:-right-14' : '-left-4 sm:-left-14',
            )}
          >
            {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
          <button
            onClick={() => paginate(isRTL ? -1 : 1)}
            aria-label={t('next')}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 z-10 p-2 rounded-full',
              'bg-[var(--color-card)] border border-[var(--color-border)] shadow-sm',
              'text-[var(--color-text-muted)] hover:text-primary-500 hover:border-primary-300 transition-colors',
              'hidden sm:flex items-center justify-center',
              isRTL ? '-left-4 sm:-left-14' : '-right-4 sm:-right-14',
            )}
          >
            {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>

          {/* Swipeable card */}
          <div className="relative min-h-[340px] sm:min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={rec.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <div className={cn(
                  'card p-6 sm:p-8 pb-8 sm:pb-10 h-full flex flex-col',
                  'border border-[var(--color-border)]',
                )}>
                  {/* Quote icon */}
                  <div className={cn('mb-4', isRTL && 'text-right')}>
                    <Quote className="w-8 h-8 text-primary-400/50" aria-hidden="true" />
                  </div>

                  {/* Quote text */}
                  <blockquote className={cn(
                    'flex-1 text-base sm:text-lg leading-relaxed text-[var(--color-text)] italic mb-6',
                    isRTL ? 'text-right' : 'text-left',
                  )}>
                    &ldquo;{rec.quote[locale]}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className={cn(
                    'flex items-center gap-3 pt-4 mt-auto border-t border-[var(--color-border)]',
                    isRTL && 'flex-row-reverse text-right',
                  )}>
                    {/* Avatar circle with initials */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center text-sm font-bold">
                      {rec.name.split(' ').filter(w => w[0] === w[0].toUpperCase()).map(w => w[0]).slice(0, 2).join('')}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[var(--color-text)]">{rec.name}</p>
                      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                        {rec.title[locale]} — {rec.institution[locale]}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {recommendations.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex([i, i > index ? 1 : -1])}
                aria-label={`${t('goTo')} ${i + 1}`}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  i === index
                    ? 'bg-primary-500 w-6'
                    : 'bg-[var(--color-border)] hover:bg-primary-300',
                )}
              />
            ))}
          </div>

          {/* Mobile swipe hint */}
          <p className="text-center text-xs text-[var(--color-text-muted)] mt-3 sm:hidden">
            {t('swipeHint')}
          </p>
        </div>
      </div>
    </section>
  );
}
