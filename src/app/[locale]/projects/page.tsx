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
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero header */}
      <div className="relative bg-[var(--color-bg-2)] border-b border-[var(--color-border)] overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className={`relative max-w-6xl mx-auto px-4 sm:px-6 py-16 ${isRTL ? 'text-right' : ''}`}>
          <h1 className="text-4xl sm:text-5xl font-serif mb-3">{t('title')}</h1>
          <p className="text-[var(--color-text-muted)] max-w-xl text-lg">{t('subtitle')}</p>
        </div>
      </div>

      {/* Projects grid with filters */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        <ProjectFilters locale={locale as Locale} />
      </div>
    </div>
  );
}
