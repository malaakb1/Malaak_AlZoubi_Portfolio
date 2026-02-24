'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { getFeaturedDashboards } from '@/data/dashboards';
import type { Locale } from '@/types';

interface FeaturedDashboardsProps {
  locale: Locale;
}

export function FeaturedDashboards({ locale }: FeaturedDashboardsProps) {
  const featured = getFeaturedDashboards().slice(0, 3);
  const isRTL = locale === 'ar';

  if (featured.length === 0) return null;

  return (
    <section className="section-padding" aria-labelledby="featured-dashboards-title">
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
            <h2 id="featured-dashboards-title" className="text-3xl sm:text-4xl font-serif mb-2">
              {isRTL ? 'لوحات البيانات' : 'Dashboards'}
            </h2>
            <p className="text-[var(--color-text-muted)]">
              {isRTL
                ? 'لوحات تحليلية تفاعلية مبنية بـ Power BI و Tableau و Python'
                : 'Interactive analytics dashboards built with Power BI, Tableau & Python'}
            </p>
          </div>
          <Link
            href={`/${locale}/dashboards`}
            className={cn(
              'inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors whitespace-nowrap',
              isRTL && 'flex-row-reverse',
            )}
          >
            {isRTL ? 'عرض الكل' : 'View All'}
            <ArrowRight className="w-4 h-4" aria-hidden="true" style={{ transform: isRTL ? 'scaleX(-1)' : undefined }} />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((dashboard, i) => (
            <motion.article
              key={dashboard.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="card flex flex-col group overflow-hidden"
            >
              <Link href={`/${locale}/dashboards/${dashboard.slug}`} className="flex flex-col flex-1">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-[var(--color-bg-2)] overflow-hidden">
                <Image
                  src={dashboard.thumbnail}
                  alt={dashboard.title[locale]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-muted)]">
                  <BarChart3 className="w-10 h-10 opacity-20" />
                </div>
                {dashboard.liveUrl && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500 text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      {isRTL ? 'مباشر' : 'Live'}
                    </span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="flex-1 p-5 space-y-2.5">
                <h3 className={cn('font-serif text-lg font-medium text-[var(--color-text)] leading-snug', isRTL && 'text-right')}>
                  {dashboard.title[locale]}
                </h3>
                <p className={cn('text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2', isRTL && 'text-right')}>
                  {dashboard.shortDescription[locale]}
                </p>
                <div className={cn('flex flex-wrap gap-1 pt-1', isRTL && 'flex-row-reverse')}>
                  {dashboard.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="default">{tag}</Badge>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className={cn('px-5 py-4 border-t border-[var(--color-border)] flex items-center', isRTL ? 'flex-row-reverse justify-between' : 'justify-between')}>
                <div className={cn('flex gap-2', isRTL && 'flex-row-reverse')}>
                  {dashboard.kpis.slice(0, 2).map((kpi) => (
                    <span key={kpi.label.en} className="text-xs text-[var(--color-text-muted)]">
                      <span className="font-semibold text-[var(--color-text)]">{kpi.value}</span>{' '}
                      {kpi.label[locale]}
                    </span>
                  ))}
                </div>
              </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
