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
      <h2
        id="certs-title"
        className={cn('text-2xl font-serif mb-6', isRTL && 'text-right')}
      >
        {t('title')}
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.title.en}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card p-5 flex flex-col gap-3"
          >
            {/* Top row */}
            <div className={cn('flex items-start gap-3', isRTL && 'flex-row-reverse')}>
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${cert.color}22`, color: cert.color }}
                aria-hidden="true"
              >
                <Award className="w-4 h-4" />
              </div>
              <div className={cn('flex-1 min-w-0', isRTL && 'text-right')}>
                <p className="font-semibold text-sm text-[var(--color-text)] leading-snug">
                  {cert.title[locale]}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {cert.issuer}
                </p>
              </div>
              <span className="text-xs text-[var(--color-text-muted)] flex-shrink-0">
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
                  'inline-flex items-center gap-1 text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors',
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
