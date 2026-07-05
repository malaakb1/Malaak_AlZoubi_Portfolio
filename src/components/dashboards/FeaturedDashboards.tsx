'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BarChart3, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { ColumnSection } from '@/components/ui/ColumnSection';
import { Stagger } from '@/components/ui/Reveal';
import { ViewAllLink } from '@/components/projects/ProjectCard';
import { fadeUp } from '@/lib/motion';
import { getFeaturedDashboards } from '@/data/dashboards';
import type { Locale } from '@/types';

interface FeaturedDashboardsProps {
  locale: Locale;
}

export function FeaturedDashboards({ locale }: FeaturedDashboardsProps) {
  const featured = getFeaturedDashboards().slice(0, 4);
  const isRTL = locale === 'ar';

  if (featured.length === 0) return null;

  return (
    <ColumnSection
      id="dashboards"
      isRTL={isRTL}
      eyebrow={isRTL ? 'تحليلات' : 'Data Stories'}
      title={isRTL ? 'لوحات البيانات' : 'Dashboards'}
      subtitle={isRTL
        ? 'لوحات تحليلية تفاعلية مبنية بـ Power BI و Tableau و Python'
        : 'Interactive analytics dashboards built with Power BI, Tableau & Python'}
      action={<ViewAllLink href={`/${locale}/dashboards`} label={isRTL ? 'عرض الكل' : 'View All'} isRTL={isRTL} />}
    >
      <Stagger className="grid sm:grid-cols-2 gap-5">
        {featured.map((dashboard) => (
          <motion.article key={dashboard.slug} variants={fadeUp} className="group card flex flex-col">
            <Link href={`/${locale}/dashboards/${dashboard.slug}`} className="flex flex-col flex-1 focus-visible:outline-none">
              <div className="relative aspect-video bg-ink-800 overflow-hidden">
                <div className="absolute inset-0 grid place-items-center text-[var(--color-text-muted)]">
                  <BarChart3 className="w-10 h-10 opacity-20" />
                </div>
                <Image
                  src={dashboard.thumbnail}
                  alt={dashboard.title[locale]}
                  fill
                  className="relative object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 350px"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" aria-hidden="true" />
                {dashboard.liveUrl && (
                  <span className={cn('absolute top-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-500 text-ink-950', isRTL ? 'left-3' : 'right-3')}>
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-950 animate-pulse" />
                    {isRTL ? 'مباشر' : 'LIVE'}
                  </span>
                )}
              </div>

              <div className="flex-1 p-5 space-y-2.5">
                <h3 className={cn('font-serif text-lg font-bold leading-snug text-[var(--color-text)] group-hover:text-primary-300 transition-colors', isRTL && 'text-right')}>
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

              <div className={cn('px-5 py-4 border-t border-[var(--color-border)] flex items-center justify-between gap-2', isRTL && 'flex-row-reverse')}>
                <div className={cn('flex gap-4', isRTL && 'flex-row-reverse')}>
                  {dashboard.kpis.slice(0, 2).map((kpi) => (
                    <span key={kpi.label.en} className="text-xs text-[var(--color-text-muted)]">
                      <span className="font-bold text-gold-400 tabular-nums">{kpi.value}</span>{' '}
                      {kpi.label[locale]}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="w-4 h-4 text-primary-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </div>
            </Link>
          </motion.article>
        ))}
      </Stagger>
    </ColumnSection>
  );
}
