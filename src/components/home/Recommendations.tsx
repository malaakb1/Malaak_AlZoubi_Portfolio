'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { ColumnSection } from '@/components/ui/ColumnSection';
import { recommendations } from '@/data/recommendations';
import type { Locale } from '@/types';

interface RecommendationsProps {
  locale: Locale;
}

const swipeThreshold = 50;

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.96 }),
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
  const initials = rec.name.split(' ').filter((w) => w[0] === w[0].toUpperCase()).map((w) => w[0]).slice(0, 2).join('');

  const controls = (
    <div className={cn('flex items-center gap-2', isRTL && 'flex-row-reverse')}>
      <button
        onClick={() => paginate(isRTL ? 1 : -1)}
        aria-label={t('prev')}
        className="w-9 h-9 rounded-full border border-[var(--color-border)] bg-white/[0.03] text-[var(--color-text-muted)] hover:text-primary-400 hover:border-primary-400/60 transition-colors grid place-items-center"
      >
        {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
      <button
        onClick={() => paginate(isRTL ? -1 : 1)}
        aria-label={t('next')}
        className="w-9 h-9 rounded-full border border-[var(--color-border)] bg-white/[0.03] text-[var(--color-text-muted)] hover:text-primary-400 hover:border-primary-400/60 transition-colors grid place-items-center"
      >
        {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
    </div>
  );

  return (
    <ColumnSection
      id="testimonials"
      isRTL={isRTL}
      eyebrow={isRTL ? 'شهادات' : 'Testimonials'}
      title={t('title')}
      action={controls}
    >
      <div className="relative overflow-hidden">
        <div className="relative min-h-[300px] sm:min-h-[260px] flex items-center">
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
              dragElastic={0.6}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <div className="relative card h-full flex flex-col p-6 sm:p-8">
                <Quote className={cn('w-9 h-9 text-primary-500/30 mb-4', isRTL && 'self-end scale-x-[-1]')} aria-hidden="true" />
                <blockquote className={cn('flex-1 text-base leading-relaxed text-[var(--color-text)] mb-6', isRTL ? 'text-right' : 'text-left')}>
                  {rec.quote[locale]}
                </blockquote>
                <div className={cn('flex items-center gap-3 pt-5 border-t border-[var(--color-border)]', isRTL && 'flex-row-reverse text-right')}>
                  <div className="flex-shrink-0 w-11 h-11 rounded-full grid place-items-center text-sm font-bold text-ink-950 bg-gradient-mint-pink">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[var(--color-text)]">{rec.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                      {rec.title[locale]} — {rec.institution[locale]}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={cn('flex gap-2 mt-6', isRTL && 'flex-row-reverse')}>
          {recommendations.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex([i, i > index ? 1 : -1])}
              aria-label={`${t('goTo')} ${i + 1}`}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === index ? 'w-7 bg-primary-500' : 'w-2 bg-[var(--color-border)] hover:bg-primary-400/60',
              )}
            />
          ))}
        </div>
      </div>
    </ColumnSection>
  );
}
