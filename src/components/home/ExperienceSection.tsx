'use client';

import { useTranslations } from 'next-intl';
import { ColumnSection } from '@/components/ui/ColumnSection';
import { ViewAllLink } from '@/components/projects/ProjectCard';
import { Timeline } from '@/components/about/Timeline';
import type { Locale } from '@/types';

interface ExperienceSectionProps {
  locale: Locale;
}

/** Home-page Experience block: big column heading + the shared Timeline (header hidden). */
export function ExperienceSection({ locale }: ExperienceSectionProps) {
  const t = useTranslations('about');
  const isRTL = locale === 'ar';

  return (
    <ColumnSection
      id="experience"
      isRTL={isRTL}
      eyebrow={isRTL ? 'المسيرة' : 'Journey'}
      title={t('experience.title')}
      action={<ViewAllLink href={`/${locale}/about`} label={isRTL ? 'المزيد عنّي' : 'More about me'} isRTL={isRTL} />}
    >
      <Timeline locale={locale} hideHeader />
    </ColumnSection>
  );
}
