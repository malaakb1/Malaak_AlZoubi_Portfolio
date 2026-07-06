'use client';

import { motion } from 'framer-motion';
import { Sparkles, MessageSquare, Eye, BarChart3, Zap, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { ColumnSection } from '@/components/ui/ColumnSection';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import type { Locale } from '@/types';

const icons = { Sparkles, MessageSquare, Eye, BarChart3, Zap };

interface Accent {
  glow: string;
  icon: string;
  chip: string;
  num: string;
  blob: string;
  tint: string;
}

const accents: Accent[] = [
  { glow: 'hover:shadow-glow-mint',   icon: 'text-primary-400',  chip: 'group-hover:border-primary-400/60', num: 'text-primary-400',  blob: 'bg-primary-500/25', tint: 'from-primary-500/[0.10]' },
  { glow: 'hover:shadow-glow-pink',   icon: 'text-magenta-400',  chip: 'group-hover:border-magenta-400/60', num: 'text-magenta-400',  blob: 'bg-magenta-500/25', tint: 'from-magenta-500/[0.10]' },
  { glow: 'hover:shadow-glow-purple', icon: 'text-lavender-400', chip: 'group-hover:border-lavender-400/60',num: 'text-lavender-400', blob: 'bg-lavender-500/30', tint: 'from-lavender-500/[0.12]' },
  { glow: 'hover:shadow-glow-gold',   icon: 'text-gold-400',     chip: 'group-hover:border-gold-400/60',    num: 'text-gold-400',     blob: 'bg-gold-500/20',    tint: 'from-gold-500/[0.10]' },
  { glow: 'hover:shadow-glow-mint',   icon: 'text-primary-400',  chip: 'group-hover:border-primary-400/60', num: 'text-primary-400',  blob: 'bg-primary-500/25', tint: 'from-primary-500/[0.10]' },
];

interface HighlightsProps {
  locale: Locale;
}

export function Highlights({ locale }: HighlightsProps) {
  const t = useTranslations('highlights');
  const isRTL = locale === 'ar';
  const items = t.raw('items') as Array<{ icon: string; title: string; desc: string }>;

  return (
    <ColumnSection
      id="capabilities"
      isRTL={isRTL}
      eyebrow={isRTL ? 'الخدمات' : 'Capabilities'}
      title={t('title')}
      subtitle={t('subtitle')}
    >
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-2 gap-4 auto-rows-fr"
      >
        {items.map((item, i) => {
          const Icon = icons[item.icon as keyof typeof icons] ?? Sparkles;
          const a = accents[i % accents.length];
          const feature = i === 0; // first tile spans full width (bento hero)

          return (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className={cn(
                'group relative overflow-hidden card transition-shadow',
                a.glow,
                feature ? 'col-span-2 p-6 sm:p-7 min-h-[180px]' : 'p-5 min-h-[190px]',
                isRTL && 'text-right',
              )}
            >
              {/* faint accent tint */}
              <div className={cn('pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-70', a.tint)} aria-hidden="true" />

              {/* hover glow blob */}
              <div
                className={cn(
                  'pointer-events-none absolute -top-16 w-44 h-44 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                  a.blob,
                  isRTL ? '-left-16' : '-right-16',
                )}
                aria-hidden="true"
              />

              {/* watermark icon */}
              <Icon
                className={cn(
                  'pointer-events-none absolute -bottom-5 opacity-[0.05] transition-all duration-500 group-hover:opacity-[0.10] group-hover:scale-110',
                  feature ? 'w-40 h-40' : 'w-28 h-28',
                  isRTL ? '-left-4' : '-right-4',
                  a.icon,
                )}
                aria-hidden="true"
              />

              {/* content */}
              <div className={cn('relative z-10 flex flex-col h-full', feature && 'sm:max-w-lg')}>
                <div className={cn('flex items-center justify-between mb-4', isRTL && 'flex-row-reverse')}>
                  <div className={cn('grid place-items-center w-12 h-12 rounded-xl border border-[var(--color-border)] bg-[var(--surface-2)] transition-all duration-200 group-hover:-translate-y-0.5', a.chip, a.icon)}>
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className={cn('font-mono text-xs', a.num)}>0{i + 1}</span>
                </div>

                <h3 className={cn('font-serif font-bold text-[var(--color-text)] mb-2 leading-snug', feature ? 'text-2xl sm:text-[1.7rem]' : 'text-lg')}>
                  {item.title}
                </h3>
                <p className={cn('text-[var(--color-text-muted)] leading-relaxed', feature ? 'text-base' : 'text-sm')}>
                  {item.desc}
                </p>

                {feature && (
                  <span className={cn('mt-auto pt-4 inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity', isRTL && 'flex-row-reverse')}>
                    {isRTL ? 'المجال الأساسي' : 'Core focus'}
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" style={{ transform: isRTL ? 'scaleX(-1)' : undefined }} />
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </ColumnSection>
  );
}
