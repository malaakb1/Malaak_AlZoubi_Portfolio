'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Building2 } from 'lucide-react';
import { cn, categoryLabels } from '@/lib/utils';
import { fadeUp } from '@/lib/motion';
import type { Project, Locale } from '@/types';

interface ProjectRowProps {
  project: Project;
  locale: Locale;
  index?: number;
  viewDetailsLabel: string;
  useVariant?: boolean;
}

const thumbGradients = [
  'from-primary-500/30 via-lavender-600/25 to-ink-900',
  'from-magenta-500/30 via-lavender-600/25 to-ink-900',
  'from-lavender-500/35 via-magenta-600/20 to-ink-900',
  'from-gold-500/25 via-magenta-500/25 to-ink-900',
];

function monogram(title: string) {
  const words = title.replace(/[^\p{L}\p{N} ]/gu, ' ').trim().split(/\s+/).filter(Boolean);
  return words.slice(0, 2).map((w) => w[0]).join('').toUpperCase() || '★';
}

export function ProjectRow({ project, locale, index = 0, viewDetailsLabel, useVariant = false }: ProjectRowProps) {
  const isRTL = locale === 'ar';
  const iconTools = project.tools.filter((tl) => tl.iconUrl).slice(0, 3);
  const grad = thumbGradients[index % thumbGradients.length];

  const motionProps = useVariant
    ? { variants: fadeUp }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <motion.article {...motionProps} className="group card">
      <Link
        href={`/${locale}/projects/${project.id}`}
        aria-label={`${viewDetailsLabel}: ${project.title[locale]}`}
        className={cn('flex items-center gap-4 sm:gap-5 p-3 sm:p-4 focus-visible:outline-none', isRTL && 'flex-row-reverse text-right')}
      >
        {/* Thumbnail */}
        <div className={cn('relative flex-shrink-0 w-24 sm:w-28 md:w-32 aspect-[4/3] rounded-xl overflow-hidden border border-[var(--color-border)] bg-gradient-to-br grid place-items-center', grad)}>
          <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
          {iconTools.length > 0 ? (
            <div className="relative flex items-center gap-1.5">
              {iconTools.map((tl) => (
                <span key={tl.name} className="w-7 h-7 rounded-md bg-white/90 p-1.5 grid place-items-center shadow-sm">
                  <Image src={tl.iconUrl!} alt="" width={16} height={16} className="object-contain" unoptimized />
                </span>
              ))}
            </div>
          ) : (
            <span className="relative font-serif text-2xl font-bold text-white/90">{monogram(project.title[locale])}</span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug text-[var(--color-text)] group-hover:text-primary-400 transition-colors line-clamp-1">
            {project.title[locale]}
          </h3>
          <div className={cn('mt-1.5 flex items-center gap-2 text-sm text-[var(--color-text-muted)] min-w-0', isRTL && 'flex-row-reverse')}>
            <span className="text-primary-400 font-medium whitespace-nowrap">{categoryLabels[project.category][locale]}</span>
            {project.company && (
              <>
                <span className="opacity-30" aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 whitespace-nowrap truncate">
                  <Building2 className="w-3 h-3 text-gold-400 flex-shrink-0" aria-hidden="true" />
                  {project.company}
                </span>
              </>
            )}
            <span className="opacity-30" aria-hidden="true">·</span>
            <span className="font-mono text-xs whitespace-nowrap">{project.year}</span>
          </div>
        </div>

        {/* Arrow */}
        <ArrowUpRight
          className="flex-shrink-0 w-5 h-5 text-primary-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
          style={{ transform: isRTL ? 'scaleX(-1)' : undefined }}
        />
      </Link>
    </motion.article>
  );
}
