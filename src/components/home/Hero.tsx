'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { ColumnSection } from '@/components/ui/ColumnSection';
import { Marquee } from '@/components/ui/Marquee';
import { Counter } from '@/components/ui/Counter';
import { viewportOnce } from '@/lib/motion';
import { projects } from '@/data/projects';
import { dashboards } from '@/data/dashboards';
import { certificates } from '@/data/certificates';
import { recommendations } from '@/data/recommendations';
import type { Locale } from '@/types';

const SPECIALISATIONS = [
  'GenAI', 'RAG', 'LangChain', 'NLP', 'Arabic AI', 'Computer Vision',
  'FastAPI', 'Azure AI', 'Hugging Face', 'Stable Diffusion', 'FAISS', 'OpenAI',
];

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const t = useTranslations('hero');
  const isRTL = locale === 'ar';

  const stats = [
    { value: projects.length,        suffix: '+', label: isRTL ? 'مشاريع' : 'Projects' },
    { value: dashboards.length,      suffix: '',  label: isRTL ? 'لوحات' : 'Dashboards' },
    { value: certificates.length,    suffix: '',  label: isRTL ? 'شهادات' : 'Certificates' },
    { value: recommendations.length, suffix: '',  label: isRTL ? 'توصيات' : 'Recommendations' },
  ];

  return (
    <ColumnSection
      id="intro"
      isRTL={isRTL}
      size="lg"
      title={t('title')}
      subtitle={t('subtitle')}
      eyebrow={
        <>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
          </span>
          {isRTL ? 'متاحة للفرص' : 'Open to work'}
        </>
      }
    >
      {/* Stats */}
      <motion.dl
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={cn('grid grid-cols-2 sm:grid-cols-4 gap-4', isRTL && 'text-right')}
      >
        {stats.map((s) => (
          <div key={s.label} className="card p-4">
            <dt className="sr-only">{s.label}</dt>
            <dd className="text-3xl sm:text-4xl font-bold gradient-text tabular-nums leading-none">
              <Counter value={s.value} suffix={s.suffix} />
            </dd>
            <span className="text-[11px] text-[var(--color-text-muted)] leading-tight block mt-2">
              {s.label}
            </span>
          </div>
        ))}
      </motion.dl>

      {/* Specialisation marquee */}
      <div className="mt-8 -mx-4 sm:mx-0">
        <Marquee speed={30} className="py-1" itemClassName="gap-3">
          {SPECIALISATIONS.map((tag) => (
            <span
              key={tag}
              className="mx-1.5 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--surface)] text-sm text-[var(--color-text-muted)] font-mono normal-case"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500" aria-hidden="true" />
              {tag}
            </span>
          ))}
        </Marquee>
      </div>
    </ColumnSection>
  );
}
