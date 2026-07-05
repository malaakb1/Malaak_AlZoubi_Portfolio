import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import type { Locale } from '@/types';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen pb-24">
      {/* Dark hero header */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div
          className="blob blob-purple w-[34rem] h-[34rem] -top-40 -start-40 animate-aurora"
          aria-hidden="true"
        />
        <div
          className="blob blob-mint w-[26rem] h-[26rem] -top-24 end-0 animate-aurora"
          style={{ animationDelay: '-6s' }}
          aria-hidden="true"
        />

        <div className={`relative max-w-6xl mx-auto px-4 sm:px-6 ${isRTL ? 'text-right' : ''}`}>
          <span
            className={`inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.28em] text-primary-400 mb-4 ${
              isRTL ? 'flex-row-reverse' : ''
            }`}
          >
            <span className="h-px w-6 bg-gradient-to-r from-primary-400 to-transparent" aria-hidden="true" />
            {isRTL ? 'أعمال مختارة' : 'Selected Work'}
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.05]">
            {t('title')}
          </h1>

          <p className="mt-5 text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Projects grid with filters */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ProjectFilters locale={locale as Locale} />
      </div>
    </div>
  );
}
