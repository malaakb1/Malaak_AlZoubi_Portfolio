import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ProfileCard } from '@/components/home/ProfileCard';
import { Hero } from '@/components/home/Hero';
import { Highlights } from '@/components/home/Highlights';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { FeaturedDashboards } from '@/components/dashboards/FeaturedDashboards';
import { ExperienceSection } from '@/components/home/ExperienceSection';
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
  const l = locale as Locale;

  return (
    <div className="relative">
      {/* Ambient page background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-[70vh] bg-grid opacity-60" />
        <div className="blob blob-purple absolute -top-24 -left-24 w-[520px] h-[520px] animate-aurora" />
        <div className="blob blob-pink absolute top-[30%] -right-20 w-[420px] h-[420px] animate-aurora" style={{ animationDelay: '5s' }} />
        <div className="blob blob-mint absolute top-[75%] left-1/3 w-[380px] h-[360px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <div className="grid lg:grid-cols-[minmax(300px,360px)_1fr] gap-8 xl:gap-14 items-start">
          {/* Sticky profile card — inline-start (LEFT in LTR, RIGHT in RTL).
              max-h + internal scroll guarantees the CV button is never clipped
              on short viewports. */}
          <aside className="lg:sticky lg:top-24 self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto no-scrollbar">
            <ProfileCard locale={l} />
          </aside>

          {/* Scrolling content column */}
          <div className="min-w-0 space-y-20 lg:space-y-28">
            <Hero locale={l} />
            <Highlights locale={l} />
            <FeaturedProjects locale={l} />
            <FeaturedDashboards locale={l} />
            <ExperienceSection locale={l} />
            <SkillsStrip locale={l} />
            <Recommendations locale={l} />
            <CTASection locale={l} />
          </div>
        </div>
      </div>
    </div>
  );
}
