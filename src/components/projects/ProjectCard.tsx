'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building2 } from 'lucide-react';
import { cn, categoryColors, categoryLabels } from '@/lib/utils';
import { ToolIconRow } from '@/components/ui/ToolIcon';
import type { Project, Locale } from '@/types';

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  index?: number;
  viewDetailsLabel: string;
}

export function ProjectCard({ project, locale, index = 0, viewDetailsLabel }: ProjectCardProps) {
  const isRTL = locale === 'ar';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="card flex flex-col group h-full"
    >
      {/* Header */}
      <div className={cn('px-5 pt-5 pb-3 flex items-start justify-between gap-2', isRTL && 'flex-row-reverse')}>
        <div className={cn('flex items-center gap-2 flex-wrap', isRTL && 'flex-row-reverse')}>
          <span className={cn(
            'text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0',
            categoryColors[project.category],
          )}>
            {categoryLabels[project.category][locale]}
          </span>
          {project.company && (
            <span className={cn(
              'inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0',
              'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
            )}>
              <Building2 className="w-3 h-3" aria-hidden="true" />
              {project.company}
            </span>
          )}
        </div>
        <span className="text-xs text-[var(--color-text-muted)] flex-shrink-0">{project.year}</span>
      </div>

      {/* Body */}
      <div className="flex-1 px-5 pb-4 space-y-2.5">
        <h3 className={cn('font-serif text-base font-medium text-[var(--color-text)] leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors', isRTL && 'text-right')}>
          {project.title[locale]}
        </h3>
        <p className={cn('text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3', isRTL && 'text-right')}>
          {project.shortDesc[locale]}
        </p>

        {/* Tool icons (no label, compact) */}
        <ToolIconRow
          tools={project.tools.slice(0, 5)}
          size="sm"
          showLabel={false}
          className={cn('pt-1', isRTL && 'flex-row-reverse')}
        />
      </div>

      {/* Footer */}
      <div className={cn('px-5 py-4 border-t border-[var(--color-border)] flex items-center gap-2', isRTL ? 'flex-row-reverse justify-between' : 'justify-between')}>
        <div className={cn('flex flex-wrap gap-1', isRTL && 'flex-row-reverse')}>
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded bg-[var(--color-bg-2)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/${locale}/projects/${project.id}`}
          aria-label={`${viewDetailsLabel}: ${project.title[locale]}`}
          className={cn(
            'flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-primary-500 hover:text-primary-600 transition-colors',
            isRTL && 'flex-row-reverse',
          )}
        >
          {viewDetailsLabel}
          <ArrowRight
            className="w-3 h-3"
            aria-hidden="true"
            style={{ transform: isRTL ? 'scaleX(-1)' : undefined }}
          />
        </Link>
      </div>
    </motion.article>
  );
}
