import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { Highlights } from '@/components/home/Highlights';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { FeaturedDashboards } from '@/components/dashboards/FeaturedDashboards';
import { SkillsStrip } from '@/components/home/SkillsStrip';
import { Recommendations } from '@/components/home/Recommendations';
import { CTASection } from '@/components/home/CTASection';
import type { Locale } from '@/types';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <Hero locale={locale as Locale} />
      <Highlights locale={locale as Locale} />
      <FeaturedProjects locale={locale as Locale} />
      <FeaturedDashboards locale={locale as Locale} />
      <SkillsStrip locale={locale as Locale} />
      <Recommendations locale={locale as Locale} />
      <CTASection locale={locale as Locale} />
    </>
  );
}
