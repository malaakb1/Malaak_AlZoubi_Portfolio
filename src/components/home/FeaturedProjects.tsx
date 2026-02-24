'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn, categoryColors, categoryLabels } from '@/lib/utils';
import { ToolIconRow } from '@/components/ui/ToolIcon';
import { getFeaturedProjects } from '@/data/projects';
import type { Locale } from '@/types';

interface FeaturedProjectsProps {
  locale: Locale;
}

export function FeaturedProjects({ locale }: FeaturedProjectsProps) {
  const t = useTranslations('featured');
  const featured = getFeaturedProjects();
  const isRTL = locale === 'ar';

  return (
    <section className="section-padding" aria-labelledby="featured-title">
      <div className={cn('max-w-6xl mx-auto px-4 sm:px-6', isRTL && 'text-right')}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          style={{ flexDirection: isRTL ? 'row-reverse' : undefined }}
        >
          <div>
            <h2 id="featured-title" className="text-3xl sm:text-4xl font-serif mb-2">
              {t('title')}
            </h2>
            <p className="text-[var(--color-text-muted)]">{t('subtitle')}</p>
          </div>
          <Link
            href={`/${locale}/projects`}
            className={cn(
              'inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors whitespace-nowrap',
              isRTL && 'flex-row-reverse',
            )}
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4" aria-hidden="true" style={{ transform: isRTL ? 'scaleX(-1)' : undefined }} />
          </Link>
        </motion.div>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="card flex flex-col group overflow-hidden"
            >
              {/* Category pill */}
              <div className={cn('px-5 pt-5 pb-0 flex items-start justify-between', isRTL && 'flex-row-reverse')}>
                <div className={cn('flex items-center gap-2 flex-wrap', isRTL && 'flex-row-reverse')}>
                  <span className={cn(
                    'text-xs font-semibold px-2.5 py-1 rounded-full',
                    categoryColors[project.category],
                  )}>
                    {categoryLabels[project.category][locale]}
                  </span>
                  {project.company && (
                    <span className={cn(
                      'inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
                      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
                    )}>
                      <Building2 className="w-3 h-3" aria-hidden="true" />
                      {project.company}
                    </span>
                  )}
                </div>
                <span className="text-xs text-[var(--color-text-muted)]">{project.year}</span>
              </div>

              {/* Body */}
              <div className="flex-1 p-5 space-y-3">
                <h3 className={cn('font-serif text-lg font-medium text-[var(--color-text)] leading-snug', isRTL && 'text-right')}>
                  {project.title[locale]}
                </h3>
                <p className={cn('text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3', isRTL && 'text-right')}>
                  {project.shortDesc[locale]}
                </p>

                {/* Tool icons */}
                <ToolIconRow
                  tools={project.tools.slice(0, 4)}
                  size="sm"
                  showLabel={false}
                  className={cn('pt-1', isRTL && 'flex-row-reverse')}
                />
              </div>

              {/* Footer */}
              <div className={cn('px-5 py-4 border-t border-[var(--color-border)] flex items-center', isRTL ? 'justify-start flex-row-reverse' : 'justify-between')}>
                <div className={cn('flex flex-wrap gap-1', isRTL && 'flex-row-reverse')}>
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded bg-[var(--color-bg-2)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/${locale}/projects/${project.id}`}
                  aria-label={`View case study: ${project.title[locale]}`}
                  className={cn(
                    'flex-shrink-0 ms-2 inline-flex items-center gap-1 text-xs font-semibold text-primary-500 hover:text-primary-600 transition-colors',
                    isRTL && 'flex-row-reverse',
                  )}
                >
                  {t('viewDetails')}
                  <ArrowRight className="w-3 h-3" aria-hidden="true" style={{ transform: isRTL ? 'scaleX(-1)' : undefined }} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
