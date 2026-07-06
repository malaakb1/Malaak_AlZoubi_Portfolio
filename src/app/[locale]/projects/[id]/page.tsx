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

/** Numbered mono eyebrow + serif title section heading. */
function SectionHeading({
  index,
  title,
  id,
  isRTL,
}: {
  index: string;
  title: string;
  id: string;
  isRTL: boolean;
}) {
  return (
    <div className={cn('mb-6', isRTL && 'text-right')}>
      <span
        className={cn(
          'inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.24em] text-primary-400 mb-2',
          isRTL && 'flex-row-reverse',
        )}
      >
        <span className="text-magenta-400/90">{index}</span>
        <span className="h-px w-5 bg-gradient-to-r from-primary-400 to-transparent" aria-hidden="true" />
      </span>
      <h2 id={id} className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
        {title}
      </h2>
    </div>
  );
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, id } = await params;
  const project = getProjectById(id);

  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: 'projects.caseStudy' });
  const l = locale as Locale;
  const isRTL = l === 'ar';
  const backLabel = t('backToProjects');

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen pb-24">
      {/* ── Dark hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div
          className="blob blob-purple w-[32rem] h-[32rem] -top-40 -start-32 animate-aurora"
          aria-hidden="true"
        />
        <div
          className="blob blob-mint w-[24rem] h-[24rem] top-0 end-0 animate-aurora"
          style={{ animationDelay: '-7s' }}
          aria-hidden="true"
        />

        <div className={cn('relative max-w-4xl mx-auto px-4 sm:px-6', isRTL && 'text-right')}>
          {/* Back link */}
          <Link
            href={`/${locale}/projects`}
            className={cn(
              'inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-muted)] hover:text-primary-400 transition-colors mb-8',
              isRTL && 'flex-row-reverse',
            )}
          >
            <BackArrow className="w-4 h-4" aria-hidden="true" />
            {backLabel}
          </Link>

          {/* Meta row: category chip + company gold badge + year (mono) */}
          <div className={cn('flex flex-wrap items-center gap-3 mb-5', isRTL && 'flex-row-reverse')}>
            <span className={cn('text-xs font-semibold px-3 py-1 rounded-full', categoryColors[project.category])}>
              {categoryLabels[project.category][l]}
            </span>
            {project.company && (
              <span className={cn(
                'inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-gold-500/12 text-gold-400 border border-gold-500/30',
                isRTL && 'flex-row-reverse',
              )}>
                <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                {project.company}
              </span>
            )}
            <span className="font-mono text-xs text-[var(--color-text-muted)]">{project.year}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.05] mb-5">
            {project.title[l]}
          </h1>

          {/* Short description */}
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed max-w-3xl">
            {project.shortDesc[l]}
          </p>

          {/* Tool icons row */}
          <div className="mt-7">
            <ToolIconRow tools={project.tools} size="md" showLabel={false} className={cn(isRTL && 'flex-row-reverse')} />
          </div>

          {/* Links */}
          {project.links.length > 0 && (
            <div className={cn('flex flex-wrap gap-3 mt-7', isRTL && 'flex-row-reverse')}>
              {project.links.map((link, i) => {
                const Icon = linkIcons[link.type] ?? ExternalLink;
                const primary = i === 0;
                return (
                  <a
                    key={link.type + link.label.en}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label[l]}
                    className={cn(
                      'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200',
                      primary
                        ? 'bg-primary-500 text-cream hover:bg-primary-400 hover:shadow-glow-mint'
                        : 'border border-[var(--color-border)] bg-[var(--surface)] text-[var(--color-text)] hover:border-primary-400 hover:text-primary-400',
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
        </div>
      </section>

      <article className={cn('max-w-4xl mx-auto px-4 sm:px-6', isRTL && 'text-right')}>
        {/* Sections */}
        <div className="space-y-16">

          {/* Overview / Full description */}
          <section aria-labelledby="cs-overview">
            <SectionHeading index="01" title={t('overview')} id="cs-overview" isRTL={isRTL} />
            <div className="text-[var(--color-text-muted)] leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {project.fullDesc[l]}
            </div>
          </section>

          {/* Features */}
          <section aria-labelledby="cs-features">
            <SectionHeading index="02" title={t('features')} id="cs-features" isRTL={isRTL} />
            <ul className="grid sm:grid-cols-2 gap-3">
              {project.features.map((f, i) => (
                <li
                  key={i}
                  className={cn(
                    'card flex items-start gap-3 px-4 py-3.5 text-sm text-[var(--color-text)]',
                    isRTL && 'flex-row-reverse text-right',
                  )}
                >
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-500/15 text-primary-400 border border-primary-500/30 flex items-center justify-center text-xs font-bold mt-0.5"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span className="leading-relaxed">{f[l]}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Architecture / Solution */}
          <section
            aria-labelledby="cs-architecture"
            className="card p-6 sm:p-8"
          >
            <SectionHeading index="03" title={t('solution')} id="cs-architecture" isRTL={isRTL} />
            <ArchitectureDiagram
              architecture={project.architecture}
              locale={l}
              title={t('architectureFlow')}
            />
          </section>

          {/* Tech Stack */}
          <section aria-labelledby="cs-tech">
            <SectionHeading index="04" title={t('techStack')} id="cs-tech" isRTL={isRTL} />
            <ToolIconRow tools={project.tools} size="lg" showLabel className={cn(isRTL && 'flex-row-reverse')} />
          </section>

          {/* Role */}
          <section aria-labelledby="cs-role">
            <SectionHeading index="05" title={t('role')} id="cs-role" isRTL={isRTL} />
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              {project.role[l]}
            </p>
          </section>

          {/* Results — highlighted glow / gradient-bordered card */}
          <section aria-labelledby="cs-results" className="relative">
            <div className="gradient-border card p-6 sm:p-8 overflow-hidden shadow-glow-mint">
              <div
                className="blob blob-mint w-64 h-64 -top-24 end-0 opacity-40"
                aria-hidden="true"
              />
              <div
                className="blob blob-purple w-56 h-56 -bottom-24 -start-16 opacity-40"
                aria-hidden="true"
              />
              <div className="relative">
                <SectionHeading index="06" title={t('results')} id="cs-results" isRTL={isRTL} />
                <p className="text-base sm:text-lg text-[var(--color-text)] leading-relaxed">
                  {project.results[l]}
                </p>
              </div>
            </div>
          </section>

          {/* Challenges */}
          <section aria-labelledby="cs-challenges">
            <SectionHeading index="07" title={t('challenges')} id="cs-challenges" isRTL={isRTL} />
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              {project.challenges[l]}
            </p>
          </section>

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section aria-labelledby="cs-gallery">
              <SectionHeading index="08" title={t('gallery')} id="cs-gallery" isRTL={isRTL} />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.gallery.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt={`${project.title[l]} screenshot ${i + 1}`}
                    className="rounded-xl border border-[var(--color-border)] w-full object-cover aspect-video transition-transform duration-300 hover:scale-[1.02] hover:border-primary-400/50"
                    loading="lazy"
                  />
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-[var(--color-border)]">
          <Link
            href={`/${locale}/projects`}
            className={cn(
              'inline-flex items-center gap-1.5 text-sm font-semibold text-primary-400 hover:text-primary-400 transition-colors',
              isRTL && 'flex-row-reverse',
            )}
          >
            <BackArrow className="w-4 h-4" aria-hidden="true" />
            {backLabel}
          </Link>
        </div>
      </article>
    </div>
  );
}
