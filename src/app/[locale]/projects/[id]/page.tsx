import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, ArrowRight, Github, ExternalLink, Play, Image as ImageIcon, Linkedin, Building2 } from 'lucide-react';
import { getProjectById, projects } from '@/data/projects';
import { ToolIconRow } from '@/components/ui/ToolIcon';
import { ArchitectureDiagram } from '@/components/projects/ArchitectureDiagram';
import { cn, categoryColors, categoryLabels } from '@/lib/utils';
import type { Locale } from '@/types';

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateStaticParams() {
  return projects.flatMap((project) =>
    ['en', 'ar'].map((locale) => ({ locale, id: project.id })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const project = getProjectById(id);
  if (!project) return {};
  return {
    title: project.title[locale as Locale],
    description: project.shortDesc[locale as Locale],
  };
}

const linkIcons = {
  github:   Github,
  demo:     ExternalLink,
  video:    Play,
  images:   ImageIcon,
  linkedin: Linkedin,
  other:    ExternalLink,
};

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, id } = await params;
  const project = getProjectById(id);

  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: 'projects.caseStudy' });
  const l = locale as Locale;
  const isRTL = l === 'ar';
  const backLabel = t('backToProjects');

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Back link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Link
          href={`/${locale}/projects`}
          className={cn(
            'inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-muted)] hover:text-primary-500 transition-colors',
            isRTL && 'flex-row-reverse',
          )}
        >
          {isRTL ? (
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          )}
          {backLabel}
        </Link>
      </div>

      <article className={cn('max-w-4xl mx-auto px-4 sm:px-6', isRTL && 'text-right')}>
        {/* Header */}
        <header className="mb-10">
          <div className={cn('flex flex-wrap items-center gap-3 mb-4', isRTL && 'flex-row-reverse')}>
            <span className={cn('text-xs font-semibold px-3 py-1 rounded-full', categoryColors[project.category])}>
              {categoryLabels[project.category][l]}
            </span>
            {project.company && (
              <span className={cn(
                'inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full',
                'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
              )}>
                <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                {project.company}
              </span>
            )}
            <span className="text-xs text-[var(--color-text-muted)]">{project.year}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-4 leading-tight">
            {project.title[l]}
          </h1>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed max-w-3xl">
            {project.shortDesc[l]}
          </p>

          {/* Tool icons row */}
          <div className="mt-6">
            <ToolIconRow tools={project.tools} size="md" showLabel className={cn(isRTL && 'flex-row-reverse')} />
          </div>

          {/* Links */}
          {project.links.length > 0 && (
            <div className={cn('flex flex-wrap gap-3 mt-6', isRTL && 'flex-row-reverse')}>
              {project.links.map((link) => {
                const Icon = linkIcons[link.type] ?? ExternalLink;
                return (
                  <a
                    key={link.type + link.label.en}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label[l]}
                    className={cn(
                      'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200',
                      'border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-muted)]',
                      'hover:border-primary-300 hover:text-primary-600 dark:hover:border-primary-700 dark:hover:text-primary-400',
                      isRTL && 'flex-row-reverse',
                    )}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    {link.label[l]}
                  </a>
                );
              })}
            </div>
          )}
        </header>

        {/* Divider */}
        <hr className="border-[var(--color-border)] mb-10" />

        {/* Sections */}
        <div className="space-y-10">

          {/* Overview / Full description */}
          <section aria-labelledby="cs-overview">
            <h2 id="cs-overview" className="text-xl font-serif mb-4">{t('overview')}</h2>
            <div className="text-[var(--color-text-muted)] leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {project.fullDesc[l]}
            </div>
          </section>

          {/* Features */}
          <section aria-labelledby="cs-features">
            <h2 id="cs-features" className="text-xl font-serif mb-4">{t('features')}</h2>
            <ul className={cn('space-y-2', isRTL ? 'list-none' : 'list-none')}>
              {project.features.map((f, i) => (
                <li
                  key={i}
                  className={cn(
                    'flex items-start gap-3 text-sm text-[var(--color-text-muted)]',
                    isRTL && 'flex-row-reverse',
                  )}
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center text-xs font-bold mt-0.5" aria-hidden="true">
                    ✓
                  </span>
                  {f[l]}
                </li>
              ))}
            </ul>
          </section>

          {/* Architecture */}
          <section
            aria-labelledby="cs-architecture"
            className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-2)]"
          >
            <h2 id="cs-architecture" className="text-xl font-serif mb-4">{t('solution')}</h2>
            <ArchitectureDiagram
              architecture={project.architecture}
              locale={l}
              title={t('architectureFlow')}
            />
          </section>

          {/* Tech Stack */}
          <section aria-labelledby="cs-tech">
            <h2 id="cs-tech" className="text-xl font-serif mb-4">{t('techStack')}</h2>
            <ToolIconRow tools={project.tools} size="lg" showLabel className={cn(isRTL && 'flex-row-reverse')} />
          </section>

          {/* Role */}
          <section aria-labelledby="cs-role">
            <h2 id="cs-role" className="text-xl font-serif mb-4">{t('role')}</h2>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              {project.role[l]}
            </p>
          </section>

          {/* Results */}
          <section
            aria-labelledby="cs-results"
            className="p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-lavender-50 dark:from-primary-900/20 dark:to-lavender-900/20 border border-primary-100 dark:border-primary-900/30"
          >
            <h2 id="cs-results" className="text-xl font-serif mb-4">{t('results')}</h2>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              {project.results[l]}
            </p>
          </section>

          {/* Challenges */}
          <section aria-labelledby="cs-challenges">
            <h2 id="cs-challenges" className="text-xl font-serif mb-4">{t('challenges')}</h2>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              {project.challenges[l]}
            </p>
          </section>

          {/* Gallery placeholder */}
          {project.gallery && project.gallery.length > 0 && (
            <section aria-labelledby="cs-gallery">
              <h2 id="cs-gallery" className="text-xl font-serif mb-4">{t('gallery')}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.gallery.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt={`${project.title[l]} screenshot ${i + 1}`}
                    className="rounded-xl border border-[var(--color-border)] w-full object-cover aspect-video"
                    loading="lazy"
                  />
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Bottom nav */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <Link
            href={`/${locale}/projects`}
            className={cn(
              'inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-muted)] hover:text-primary-500 transition-colors',
              isRTL && 'flex-row-reverse',
            )}
          >
            {isRTL ? (
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            ) : (
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            )}
            {backLabel}
          </Link>
        </div>
      </article>
    </div>
  );
}
