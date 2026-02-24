'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ProjectCard } from './ProjectCard';
import { projects } from '@/data/projects';
import type { Locale, ProjectCategory } from '@/types';

interface ProjectFiltersProps {
  locale: Locale;
}

const categories: Array<{ key: 'all' | ProjectCategory; i18nKey: string }> = [
  { key: 'all',     i18nKey: 'all'     },
  { key: 'genai',   i18nKey: 'genai'   },
  { key: 'nlp',     i18nKey: 'nlp'     },
  { key: 'cv',      i18nKey: 'cv'      },
  { key: 'data',    i18nKey: 'data'    },
  { key: 'mlops',   i18nKey: 'mlops'   },
  { key: 'webapi',  i18nKey: 'webapi'  },
  { key: 'product', i18nKey: 'product' },
];

export function ProjectFilters({ locale }: ProjectFiltersProps) {
  const t = useTranslations('projects');
  const isRTL = locale === 'ar';

  const [activeCategory, setActiveCategory] = useState<'all' | ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result = projects;

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.en.toLowerCase().includes(q) ||
          p.title.ar.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          p.tools.some((tool) => tool.name.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  return (
    <div className={cn(isRTL && 'text-right')}>
      {/* Search */}
      <div className="relative mb-6">
        <Search
          className={cn(
            'absolute top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]',
            isRTL ? 'right-3' : 'left-3',
          )}
          aria-hidden="true"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchPlaceholder')}
          className={cn(
            'w-full py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]',
            'text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)]',
            'focus:outline-none focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-700',
            'transition-all duration-200',
            isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4',
          )}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
            className={cn(
              'absolute top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
              isRTL ? 'left-3' : 'right-3',
            )}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category filters */}
      <div
        role="group"
        aria-label="Filter by category"
        className={cn('flex flex-wrap gap-2 mb-8', isRTL && 'flex-row-reverse')}
      >
        {categories.map(({ key, i18nKey }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            aria-pressed={activeCategory === key}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border',
              activeCategory === key
                ? 'bg-primary-500 border-primary-500 text-white shadow-soft'
                : 'border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-muted)] hover:border-primary-300 hover:text-[var(--color-text)]',
            )}
          >
            {t(`filters.${i18nKey}` as Parameters<typeof t>[0])}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className={cn('text-sm text-[var(--color-text-muted)] mb-6', isRTL && 'text-right')}>
        {t('resultsCount', { count: filtered.length })}
      </p>

      {/* Project grid */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                locale={locale}
                index={i}
                viewDetailsLabel={t('viewDetails')}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-20 text-center"
          >
            <p className="text-[var(--color-text-muted)] text-lg">{t('noResults')}</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-4 text-sm text-primary-500 hover:text-primary-600 font-medium"
            >
              {isRTL ? 'مسح الفلاتر' : 'Clear filters'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
