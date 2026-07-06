'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Award } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { certifications } from '@/data/certifications';
import type { Locale } from '@/types';

interface CertificationCardsProps {
  locale: Locale;
}

export function CertificationCards({ locale }: CertificationCardsProps) {
  const t = useTranslations('about.certifications');
  const isRTL = locale === 'ar';

  return (
    <section aria-labelledby="certs-title">
      <div className={cn('mb-6', isRTL && 'text-right')}>
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary-400 mb-3">
          <span className="h-px w-6 bg-gradient-to-r from-primary-400 to-transparent" aria-hidden="true" />
          {isRTL ? 'الإنجازات' : 'Credentials'}
        </span>
        <h2
          id="certs-title"
          className="text-2xl sm:text-3xl font-serif font-bold tracking-tight"
        >
          {t('title')}
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.title.en}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="card group p-5 flex flex-col gap-3"
          >
            {/* Per-certificate accent hairline */}
            <span
              className="absolute inset-x-0 top-0 h-[3px] z-[1] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
              aria-hidden="true"
            />

            {/* Top row */}
            <div className={cn('flex items-start gap-3', isRTL && 'flex-row-reverse')}>
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ background: `${cert.color}22`, color: cert.color }}
                aria-hidden="true"
              >
                <Award className="w-4 h-4" />
              </div>
              <div className={cn('flex-1 min-w-0', isRTL && 'text-right')}>
                <p className="font-semibold text-sm text-[var(--color-text)] leading-snug group-hover:text-primary-400 transition-colors">
                  {cert.title[locale]}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {cert.issuer}
                </p>
              </div>
              <span className="font-mono text-xs text-[var(--color-text-muted)] flex-shrink-0">
                {cert.year}
              </span>
            </div>

            {/* Link */}
            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-1 text-xs font-semibold text-primary-400 hover:text-primary-400 transition-colors',
                  isRTL && 'flex-row-reverse self-end',
                )}
              >
                {t('viewCert')}
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
