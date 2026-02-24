import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  BarChart3,
  Database,
  Lightbulb,
  Wrench,
  FileText,
} from 'lucide-react';
import { getDashboardBySlug, dashboards } from '@/data/dashboards';
import { ToolIconRow } from '@/components/ui/ToolIcon';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return dashboards.flatMap((d) =>
    ['en', 'ar'].map((locale) => ({ locale, slug: d.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const dashboard = getDashboardBySlug(slug);
  if (!dashboard) return {};
  const l = locale as Locale;
  return {
    title: dashboard.title[l],
    description: dashboard.shortDescription[l],
    openGraph: {
      title: dashboard.title[l],
      description: dashboard.shortDescription[l],
      images: dashboard.heroImage ? [{ url: dashboard.heroImage }] : undefined,
    },
  };
}

export default async function DashboardDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const dashboard = getDashboardBySlug(slug);

  if (!dashboard) notFound();

  const l = locale as Locale;
  const isRTL = l === 'ar';

  const sectionTitle = (icon: React.ReactNode, en: string, ar: string) => (
    <h2 className={cn('flex items-center gap-2 text-xl font-serif mb-4', isRTL && 'flex-row-reverse')}>
      {icon}
      {isRTL ? ar : en}
    </h2>
  );

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Back link */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <Link
          href={`/${locale}/dashboards`}
          className={cn(
            'inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-muted)] hover:text-primary-500 transition-colors',
            isRTL && 'flex-row-reverse',
          )}
        >
          {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          {isRTL ? '← العودة إلى لوحات البيانات' : '← Back to Dashboards'}
        </Link>
      </div>

      {/* ─── Hero Image ─────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-10">
        <div className="relative aspect-[16/8] rounded-2xl overflow-hidden bg-[var(--color-bg-2)] border border-[var(--color-border)]">
          <Image
            src={dashboard.heroImage}
            alt={dashboard.title[l]}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          {/* Fallback */}
          <div className="absolute inset-0 flex items-center justify-center">
            <BarChart3 className="w-16 h-16 text-[var(--color-text-muted)] opacity-20" />
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          {/* Title on hero */}
          <div className={cn('absolute bottom-0 left-0 right-0 p-6 sm:p-10', isRTL && 'text-right')}>
            <h1 className="text-2xl sm:text-4xl font-serif text-white mb-2 drop-shadow-lg">
              {dashboard.title[l]}
            </h1>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl drop-shadow">
              {dashboard.shortDescription[l]}
            </p>
            {/* CTAs */}
            <div className={cn('flex gap-3 mt-4', isRTL && 'flex-row-reverse')}>
              {dashboard.liveUrl && (
                <a
                  href={dashboard.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-gray-900 hover:bg-gray-100 transition-colors shadow-soft"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {isRTL ? 'فتح اللوحة المباشرة' : 'Open Live Dashboard'}
                </a>
              )}
              {dashboard.repoUrl && (
                <a
                  href={dashboard.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold border border-white/40 text-white hover:bg-white/10 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <article className={cn('max-w-5xl mx-auto px-4 sm:px-6 space-y-12', isRTL && 'text-right')}>
        {/* ─── KPI Cards ──────────────────────────────────────────────── */}
        {dashboard.kpis.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {dashboard.kpis.map((kpi) => (
              <div
                key={kpi.label.en}
                className="card p-4 text-center"
              >
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {kpi.value}
                </div>
                <div className="text-xs text-[var(--color-text-muted)] mt-1">
                  {kpi.label[l]}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── About / Story ─────────────────────────────────────────── */}
        <section>
          {sectionTitle(
            <FileText className="w-5 h-5 text-primary-500" />,
            'About this Dashboard',
            'حول هذه اللوحة',
          )}
          <div className="prose prose-sm dark:prose-invert max-w-none text-[var(--color-text-muted)] leading-relaxed whitespace-pre-line">
            {dashboard.longDescription[l]}
          </div>
        </section>

        {/* ─── Data Sources ──────────────────────────────────────────── */}
        <section>
          {sectionTitle(
            <Database className="w-5 h-5 text-emerald-500" />,
            'Data Sources',
            'مصادر البيانات',
          )}
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            {dashboard.dataSources[l]}
          </p>
          {dashboard.datasetName && (
            <Badge variant="secondary" className="mt-3">
              {dashboard.datasetName}
            </Badge>
          )}
        </section>

        {/* ─── Modeling / Transformations ─────────────────────────────── */}
        <section>
          {sectionTitle(
            <Wrench className="w-5 h-5 text-amber-500" />,
            'Modeling & Transformations',
            'النمذجة والتحويلات',
          )}
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            {dashboard.modeling[l]}
          </p>
        </section>

        {/* ─── Key Insights ──────────────────────────────────────────── */}
        {dashboard.keyInsights.length > 0 && (
          <section>
            {sectionTitle(
              <Lightbulb className="w-5 h-5 text-yellow-500" />,
              'Key Insights',
              'أهم الرؤى',
            )}
            <ul className={cn('space-y-2', isRTL && 'list-inside')}>
              {dashboard.keyInsights.map((insight, i) => (
                <li
                  key={i}
                  className={cn(
                    'flex items-start gap-2 text-sm text-[var(--color-text-muted)] leading-relaxed',
                    isRTL && 'flex-row-reverse',
                  )}
                >
                  <span className="text-primary-500 font-bold mt-0.5">•</span>
                  {insight[l]}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ─── Screenshots Gallery ───────────────────────────────────── */}
        {dashboard.screenshots.length > 0 && (
          <section>
            {sectionTitle(
              <BarChart3 className="w-5 h-5 text-lavender-500" />,
              'Screenshots',
              'لقطات الشاشة',
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              {dashboard.screenshots.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-video rounded-xl overflow-hidden bg-[var(--color-bg-2)] border border-[var(--color-border)]"
                >
                  <Image
                    src={src}
                    alt={`${dashboard.title[l]} screenshot ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-[var(--color-text-muted)] opacity-15" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── Tech Stack ────────────────────────────────────────────── */}
        {dashboard.techStack.length > 0 && (
          <section>
            {sectionTitle(
              <Wrench className="w-5 h-5 text-cyan-500" />,
              'Tech Stack',
              'التقنيات المستخدمة',
            )}
            <ToolIconRow
              tools={dashboard.techStack}
              size="md"
              showLabel
              className={cn(isRTL && 'flex-row-reverse')}
            />
          </section>
        )}

        {/* ─── Role ──────────────────────────────────────────────────── */}
        {dashboard.role && (
          <section className="card p-6">
            <h3 className={cn('text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-2', isRTL && 'text-right')}>
              {isRTL ? 'دوري' : 'My Role'}
            </h3>
            <p className="text-sm text-[var(--color-text)] leading-relaxed">
              {dashboard.role[l]}
            </p>
          </section>
        )}

        {/* ─── Links ─────────────────────────────────────────────────── */}
        <div className={cn('flex flex-wrap gap-3 pt-4', isRTL && 'flex-row-reverse')}>
          {dashboard.liveUrl && (
            <a
              href={dashboard.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold bg-primary-500 hover:bg-primary-600 text-white shadow-soft transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {isRTL ? 'فتح اللوحة المباشرة' : 'Open Live Dashboard'}
            </a>
          )}
          {dashboard.repoUrl && (
            <a
              href={dashboard.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-bg-2)] transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
          )}
        </div>
      </article>
    </div>
  );
}
