'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, ExternalLink, Github, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { dashboards } from '@/data/dashboards';
import type { Locale, DashboardTool, DashboardCategory } from '@/types';

interface DashboardFiltersProps {
  locale: Locale;
}

const toolFilters: Array<{ key: 'all' | DashboardTool; label: string }> = [
  { key: 'all',     label: 'All'      },
  { key: 'powerbi', label: 'Power BI' },
  { key: 'tableau', label: 'Tableau'  },
  { key: 'python',  label: 'Python'   },
  { key: 'excel',   label: 'Excel'    },
  { key: 'sql',     label: 'SQL'      },
];

const categoryFilters: Array<{ key: 'all' | DashboardCategory; label: { en: string; ar: string } }> = [
  { key: 'all',         label: { en: 'All Types',    ar: 'جميع الأنواع'  } },
  { key: 'eda',         label: { en: 'EDA',           ar: 'تحليل استكشافي' } },
  { key: 'monitoring',  label: { en: 'Monitoring',    ar: 'مراقبة'        } },
  { key: 'forecasting', label: { en: 'Forecasting',   ar: 'تنبؤ'          } },
  { key: 'reporting',   label: { en: 'Reporting',     ar: 'تقارير'        } },
  { key: 'finance',     label: { en: 'Finance',       ar: 'مالية'         } },
  { key: 'hr',          label: { en: 'HR',            ar: 'موارد بشرية'   } },
];

export function DashboardFilters({ locale }: DashboardFiltersProps) {
  const isRTL = locale === 'ar';
  const [activeTool, setActiveTool] = useState<'all' | DashboardTool>('all');
  const [activeCategory, setActiveCategory] = useState<'all' | DashboardCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result = dashboards;

    if (activeTool !== 'all') {
      result = result.filter((d) => d.tools.includes(activeTool));
    }

    if (activeCategory !== 'all') {
      result = result.filter((d) => d.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.en.toLowerCase().includes(q) ||
          d.title.ar.toLowerCase().includes(q) ||
          d.tags.some((tag) => tag.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [activeTool, activeCategory, searchQuery]);

  return (
    <div className={cn(isRTL && 'text-right')}>
      {/* ─── Search ──────────────────────────────────────────────────────── */}
      <div className="relative mb-6">
        <Search
          className={cn(
            'absolute top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]',
            isRTL ? 'right-4' : 'left-4',
          )}
          aria-hidden="true"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={locale === 'ar' ? 'ابحث في لوحات البيانات…' : 'Search dashboards or tags…'}
          className={cn(
            'w-full py-3 rounded-xl bg-[var(--surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow text-sm',
            isRTL ? 'pr-11 pl-10' : 'pl-11 pr-10',
          )}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors',
              isRTL ? 'left-4' : 'right-4',
            )}
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ─── Tool filter pills (mint accent) ─────────────────────────────── */}
      <div className={cn('flex flex-wrap gap-2 mb-4', isRTL && 'flex-row-reverse')}>
        <span className={cn('text-xs font-mono uppercase tracking-[0.15em] text-[var(--color-text-muted)] self-center', isRTL ? 'ml-2' : 'mr-2')}>
          {locale === 'ar' ? 'الأداة:' : 'Tool:'}
        </span>
        {toolFilters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTool(key)}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200',
              activeTool === key
                ? 'bg-primary-500 text-cream border border-primary-500 shadow-glow-mint'
                : 'border border-[var(--color-border)] bg-[var(--surface)] text-[var(--color-text-muted)] hover:border-primary-400/60 hover:text-[var(--color-text)]',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ─── Category filter pills (magenta accent) ──────────────────────── */}
      <div className={cn('flex flex-wrap gap-2 mb-8', isRTL && 'flex-row-reverse')}>
        <span className={cn('text-xs font-mono uppercase tracking-[0.15em] text-[var(--color-text-muted)] self-center', isRTL ? 'ml-2' : 'mr-2')}>
          {locale === 'ar' ? 'النوع:' : 'Type:'}
        </span>
        {categoryFilters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200',
              activeCategory === key
                ? 'bg-magenta-500 text-cream border border-magenta-500 shadow-glow-pink'
                : 'border border-[var(--color-border)] bg-[var(--surface)] text-[var(--color-text-muted)] hover:border-magenta-400/60 hover:text-[var(--color-text)]',
            )}
          >
            {label[locale]}
          </button>
        ))}
      </div>

      {/* ─── Results count ───────────────────────────────────────────────── */}
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        <span className="font-bold text-gold-400 tabular-nums">{filtered.length}</span>{' '}
        {locale === 'ar' ? 'لوحة' : 'dashboard(s)'} {locale === 'ar' ? 'موجودة' : 'found'}
      </p>

      {/* ─── Dashboard cards grid ────────────────────────────────────────── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((dashboard, i) => (
            <motion.article
              key={dashboard.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group card flex flex-col h-full"
            >
              <Link
                href={`/${locale}/dashboards/${dashboard.slug}`}
                aria-label={dashboard.title[locale]}
                className="flex flex-col flex-1 focus-visible:outline-none"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-ink-800 overflow-hidden">
                  {/* Fallback behind image */}
                  <div className="absolute inset-0 grid place-items-center text-[var(--color-text-muted)]">
                    <BarChart3 className="w-10 h-10 opacity-20" />
                  </div>
                  <Image
                    src={dashboard.thumbnail}
                    alt={dashboard.title[locale]}
                    fill
                    className="relative object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" aria-hidden />
                  {dashboard.liveUrl && (
                    <span
                      className={cn(
                        'absolute top-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-500 text-cream',
                        isRTL ? 'left-3' : 'right-3',
                      )}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-ink-950 animate-pulse" />
                      {isRTL ? 'مباشر' : 'LIVE'}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="flex-1 px-5 py-4 space-y-2.5">
                  <div className={cn('flex items-center justify-between', isRTL && 'flex-row-reverse')}>
                    <span className="font-mono text-xs text-[var(--color-text-muted)]">{dashboard.date}</span>
                  </div>
                  <h3
                    className={cn(
                      'font-serif text-lg font-bold leading-snug text-[var(--color-text)] group-hover:text-primary-400 transition-colors',
                      isRTL && 'text-right',
                    )}
                  >
                    {dashboard.title[locale]}
                  </h3>
                  <p className={cn('text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2', isRTL && 'text-right')}>
                    {dashboard.shortDescription[locale]}
                  </p>
                  <div className={cn('flex flex-wrap gap-1 pt-1', isRTL && 'flex-row-reverse')}>
                    {dashboard.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="default">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </Link>

              {/* Footer — Live / GitHub links */}
              <div
                className={cn(
                  'px-5 py-3 border-t border-[var(--color-border)] flex items-center gap-2',
                  isRTL ? 'flex-row-reverse justify-between' : 'justify-between',
                )}
              >
                <div className={cn('flex gap-3', isRTL && 'flex-row-reverse')}>
                  {dashboard.liveUrl && (
                    <a
                      href={dashboard.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn('inline-flex items-center gap-1 text-xs font-semibold text-primary-400 hover:text-primary-400 transition-colors', isRTL && 'flex-row-reverse')}
                      aria-label={`Live: ${dashboard.title[locale]}`}
                    >
                      <ExternalLink className="w-3 h-3" />
                      {locale === 'ar' ? 'مباشر' : 'Live'}
                    </a>
                  )}
                  {dashboard.repoUrl && (
                    <a
                      href={dashboard.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn('inline-flex items-center gap-1 text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors', isRTL && 'flex-row-reverse')}
                      aria-label={`GitHub: ${dashboard.title[locale]}`}
                    >
                      <Github className="w-3 h-3" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* ─── No results ──────────────────────────────────────────────────── */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <BarChart3 className="w-12 h-12 mx-auto text-[var(--color-text-muted)] opacity-40 mb-4" />
          <p className="text-[var(--color-text-muted)]">
            {locale === 'ar' ? 'لا توجد لوحات بيانات مطابقة. جرب بحثاً مختلفاً.' : 'No dashboards found. Try a different search or filter.'}
          </p>
        </div>
      )}
    </div>
  );
}
