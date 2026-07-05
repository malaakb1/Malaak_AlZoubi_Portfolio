'use client';

import { useTranslations } from 'next-intl';
import { ColumnSection } from '@/components/ui/ColumnSection';
import { Stagger } from '@/components/ui/Reveal';
import { ViewAllLink } from '@/components/projects/ProjectCard';
import { ProjectRow } from '@/components/projects/ProjectRow';
import { getFeaturedProjects } from '@/data/projects';
import type { Locale } from '@/types';

interface FeaturedProjectsProps {
  locale: Locale;
}

export function FeaturedProjects({ locale }: FeaturedProjectsProps) {
  const t = useTranslations('featured');
  const featured = getFeaturedProjects();
  const isRTL = locale === 'ar';

  return (
    <ColumnSection
      id="projects"
      isRTL={isRTL}
      eyebrow={isRTL ? 'مختارات' : 'Selected Work'}
      title={t('title')}
      action={<ViewAllLink href={`/${locale}/projects`} label={t('viewAll')} isRTL={isRTL} />}
    >
      <Stagger className="flex flex-col gap-3">
        {featured.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            locale={locale}
            index={i}
            viewDetailsLabel={t('viewDetails')}
            useVariant
          />
        ))}
      </Stagger>
    </ColumnSection>
  );
}
