'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface CTASectionProps {
  locale: Locale;
}

export function CTASection({ locale }: CTASectionProps) {
  const t = useTranslations('cta');
  const isRTL = locale === 'ar';

  return (
    <section className="section-padding" aria-labelledby="cta-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn(
            'relative overflow-hidden rounded-3xl p-10 sm:p-16',
            'bg-gradient-to-br from-primary-500 via-primary-600 to-lavender-600',
            'text-white text-center',
          )}
        >
          {/* Orbs */}
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-lavender-300/20 rounded-full blur-2xl" />
          </div>

          <div className="relative z-10">
            <h2
              id="cta-title"
              className={cn('text-3xl sm:text-4xl font-serif mb-4', isRTL && 'font-arabic')}
            >
              {t('title')}
            </h2>
            <p className="text-primary-100 max-w-lg mx-auto mb-8 text-base">
              {t('subtitle')}
            </p>
            <div className={cn('flex flex-col sm:flex-row items-center justify-center gap-3', isRTL && 'sm:flex-row-reverse')}>
              <Link
                href={`/${locale}/contact`}
                className={cn(
                  'inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm',
                  'bg-white text-primary-700 hover:bg-primary-50 transition-colors shadow-soft',
                  isRTL && 'flex-row-reverse',
                )}
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                {t('button')}
              </Link>
              <Link
                href={`/${locale}/projects`}
                className={cn(
                  'inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm',
                  'border border-white/40 text-white hover:bg-white/10 transition-colors',
                  isRTL && 'flex-row-reverse',
                )}
              >
                {isRTL ? 'استعرض أعمالي' : 'Browse Projects'}
                <ArrowRight className="w-4 h-4" aria-hidden="true" style={{ transform: isRTL ? 'scaleX(-1)' : undefined }} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
