'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations('notFound');
  const isRTL = locale === 'ar';

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden">
      {/* Decorative aurora blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-grid" />
        <div className="blob blob-pink absolute top-16 left-1/4 w-96 h-96 animate-aurora" />
        <div
          className="blob blob-mint absolute bottom-16 right-1/4 w-80 h-80 animate-aurora"
          style={{ animationDelay: '4s' }}
        />
        <div
          className="blob blob-purple absolute top-1/3 right-1/3 w-72 h-72 animate-aurora"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="relative z-10 space-y-6">
        <div
          className="text-[7rem] sm:text-[10rem] font-serif font-bold leading-none tracking-tight gradient-text-animated"
          aria-hidden="true"
        >
          {t('title')}
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[var(--color-text)]">
          {t('heading')}
        </h1>
        <p className="text-[var(--color-text-muted)] max-w-md mx-auto">
          {t('subtitle')}
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4"
          style={{ flexDirection: isRTL ? 'row-reverse' : undefined }}
        >
          <Link
            href={`/${locale}`}
            className={cn(
              'inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-primary-500 text-cream hover:bg-primary-400 hover:shadow-glow-mint transition-all active:scale-95',
              isRTL && 'flex-row-reverse',
            )}
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            {t('button')}
          </Link>
          <Link
            href={`/${locale}/projects`}
            className={cn(
              'group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border border-[var(--color-border)] text-[var(--color-text)] hover:border-primary-400 hover:text-primary-400 transition-all',
              isRTL && 'flex-row-reverse',
            )}
          >
            {t('projectsButton')}
            <ArrowRight
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
              style={{ transform: isRTL ? 'scaleX(-1)' : undefined }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
