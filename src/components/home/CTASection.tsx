'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { viewportOnce } from '@/lib/motion';
import type { Locale } from '@/types';

interface CTASectionProps {
  locale: Locale;
}

export function CTASection({ locale }: CTASectionProps) {
  const t = useTranslations('cta');
  const isRTL = locale === 'ar';

  return (
    <section aria-labelledby="cta-title" className="scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] p-8 sm:p-12 text-center"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-hero" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-40" aria-hidden="true" />
        <div className="absolute -top-20 left-1/4 w-56 h-56 blob blob-pink animate-aurora" aria-hidden="true" />
        <div className="absolute -bottom-20 right-1/4 w-56 h-56 blob blob-mint animate-aurora" style={{ animationDelay: '3s' }} aria-hidden="true" />

        <div className="relative z-10">
          <h2 id="cta-title" className="text-2xl sm:text-4xl font-serif font-bold leading-[1.05] tracking-tight mb-4">
            <span className="gradient-text-animated">{t('title')}</span>
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-lg mx-auto mb-8 text-base">
            {t('subtitle')}
          </p>
          <div className={cn('flex flex-col sm:flex-row items-center justify-center gap-3', isRTL && 'sm:flex-row-reverse')}>
            <Link
              href={`/${locale}/contact`}
              className={cn('inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-primary-500 text-ink-950 hover:bg-primary-400 hover:shadow-glow-mint transition-all active:scale-95', isRTL && 'flex-row-reverse')}
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              {t('button')}
            </Link>
            <Link
              href={`/${locale}/projects`}
              className={cn('group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border border-[var(--color-border)] text-[var(--color-text)] hover:border-primary-400 hover:text-primary-300 transition-all', isRTL && 'flex-row-reverse')}
            >
              {isRTL ? 'استعرض أعمالي' : 'Browse Projects'}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" style={{ transform: isRTL ? 'scaleX(-1)' : undefined }} />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
