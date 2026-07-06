'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Building2 } from 'lucide-react';
import { cn, categoryColors, categoryLabels } from '@/lib/utils';
import { ToolIconRow } from '@/components/ui/ToolIcon';
import { fadeUp } from '@/lib/motion';
import type { Project, Locale } from '@/types';

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  index?: number;
  viewDetailsLabel: string;
  /** Use the shared `fadeUp` variant (inside a Stagger container) instead of self-animating. */
  useVariant?: boolean;
}

export function ProjectCard({ project, locale, index = 0, viewDetailsLabel, useVariant = false }: ProjectCardProps) {
  const isRTL = locale === 'ar';

  const motionProps = useVariant
    ? { variants: fadeUp }
    : {
        initial: { opacity: 0, y: 26 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <motion.article {...motionProps} className="group card flex flex-col h-full">
      <Link
        href={`/${locale}/projects/${project.id}`}
        aria-label={`${viewDetailsLabel}: ${project.title[locale]}`}
        className="flex flex-col h-full focus-visible:outline-none"
      >
        {/* Header */}
        <div className={cn('px-5 pt-5 flex items-start justify-between gap-2', isRTL && 'flex-row-reverse')}>
          <div className={cn('flex items-center gap-2 flex-wrap', isRTL && 'flex-row-reverse')}>
            <span className={cn('text-[11px] font-semibold px-2.5 py-1 rounded-full', categoryColors[project.category])}>
              {categoryLabels[project.category][locale]}
            </span>
            {project.company && (
              <span className={cn('inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-gold-500/12 text-gold-400 border border-gold-500/30', isRTL && 'flex-row-reverse')}>
                <Building2 className="w-3 h-3" aria-hidden="true" />
                {project.company}
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-[var(--color-text-muted)] flex-shrink-0">{project.year}</span>
        </div>

        {/* Body */}
        <div className="flex-1 px-5 pt-4 pb-4 space-y-3">
          <h3 className={cn('font-serif text-lg font-bold leading-snug text-[var(--color-text)] group-hover:text-primary-400 transition-colors', isRTL && 'text-right')}>
            {project.title[locale]}
          </h3>
          <p className={cn('text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3', isRTL && 'text-right')}>
            {project.shortDesc[locale]}
          </p>
          <ToolIconRow
            tools={project.tools.slice(0, 5)}
            size="sm"
            showLabel={false}
            className={cn('pt-1', isRTL && 'flex-row-reverse')}
          />
        </div>

        {/* Footer */}
        <div className={cn('px-5 py-4 border-t border-[var(--color-border)] flex items-center justify-between gap-2', isRTL && 'flex-row-reverse')}>
          <div className={cn('flex flex-wrap gap-1', isRTL && 'flex-row-reverse')}>
            {project.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[var(--surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
                {tag}
              </span>
            ))}
          </div>
          <span className={cn('flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-primary-400', isRTL && 'flex-row-reverse')}>
            {viewDetailsLabel}
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

/** Small standalone "view all" link, kept here so cards + link share styling. */
export function ViewAllLink({ href, label, isRTL }: { href: string; label: string; isRTL: boolean }) {
  return (
    <Link
      href={href}
      className={cn('group inline-flex items-center gap-1.5 text-sm font-semibold text-primary-400 hover:text-primary-400 transition-colors whitespace-nowrap', isRTL && 'flex-row-reverse')}
    >
      {label}
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" style={{ transform: isRTL ? 'scaleX(-1)' : undefined }} />
    </Link>
  );
}
