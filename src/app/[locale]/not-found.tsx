'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations('notFound');
  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Decorative orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="orb orb-rose absolute top-20 left-1/4 w-96 h-96" />
        <div className="orb orb-lavender absolute bottom-20 right-1/4 w-80 h-80" />
      </div>

      <div className="relative z-10 space-y-6">
        <div
          className="text-8xl font-serif font-bold gradient-text"
          aria-hidden="true"
        >
          {t('title')}
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif text-[var(--color-text)]">
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
            className="px-6 py-3 rounded-full font-semibold text-sm bg-primary-500 hover:bg-primary-600 text-white shadow-soft hover:shadow-glow transition-all"
          >
            {t('button')}
          </Link>
          <Link
            href={`/${locale}/projects`}
            className="px-6 py-3 rounded-full font-semibold text-sm border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-primary-300 hover:text-primary-600 transition-all"
          >
            {t('projectsButton')}
          </Link>
        </div>
      </div>
    </div>
  );
}
