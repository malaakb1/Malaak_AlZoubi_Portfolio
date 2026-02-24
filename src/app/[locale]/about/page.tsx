import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Download, MapPin, Globe, GraduationCap, Heart } from 'lucide-react';
import { Timeline } from '@/components/about/Timeline';
import { CertificationCards } from '@/components/about/CertificationCards';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const l = locale as Locale;
  const isRTL = l === 'ar';

  const languageItems = t.raw('languages.items') as Array<{ language: string; level: string }>;
  const softSkillItems = t.raw('softSkills.items') as string[];

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Header */}
      <div className="relative bg-[var(--color-bg-2)] border-b border-[var(--color-border)] overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div
          className={cn(
            'relative max-w-6xl mx-auto px-4 sm:px-6 py-16',
            isRTL && 'text-right',
          )}
        >
          <div className={cn('flex items-start gap-6', isRTL && 'flex-row-reverse')}>
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gradient-to-b from-primary-100 to-lavender-100 dark:from-primary-900/30 dark:to-lavender-900/30 flex-shrink-0 shadow-glow">
              <Image
                src="/images/avatar-removebg-preview.png"
                alt="Malaak Al Zoubi"
                width={192}
                height={192}
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-serif mb-2">{t('title')}</h1>
              <p className="text-[var(--color-text-muted)] text-lg max-w-2xl">{t('subtitle')}</p>
              <div className={cn('flex items-center gap-2 mt-3 text-sm text-[var(--color-text-muted)]', isRTL && 'flex-row-reverse justify-end')}>
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0" aria-hidden="true" />
                <span>{t('location')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 space-y-16">

        {/* Bio */}
        <section aria-labelledby="bio-section">
          <div className={cn('space-y-4 text-[var(--color-text-muted)] leading-relaxed', isRTL && 'text-right')}>
            <p>{t('bio1')}</p>
            <p>{t('bio2')}</p>
          </div>
          <div className="mt-6">
            <a
              href="/cv/malaak-cv.pdf"
              download
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm',
                'bg-primary-500 hover:bg-primary-600 text-white shadow-soft hover:shadow-glow transition-all duration-200',
                isRTL && 'flex-row-reverse',
              )}
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              {t('downloadCV')}
            </a>
          </div>
        </section>

        {/* Experience timeline */}
        <Timeline locale={l} />

        {/* Education */}
        <section aria-labelledby="education-title">
          <h2
            id="education-title"
            className={cn('text-2xl font-serif mb-6', isRTL && 'text-right')}
          >
            {t('education.title')}
          </h2>
          <div className={cn('flex gap-4', isRTL && 'flex-row-reverse')}>
            <div
              className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className={cn(isRTL && 'text-right')}>
              <p className="font-semibold text-[var(--color-text)]">{t('education.degree')}</p>
              <p className="text-primary-600 dark:text-primary-400 font-medium text-sm mt-0.5">
                {t('education.institution')}
              </p>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">{t('education.grade')}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{t('education.note')}</p>
            </div>
          </div>
        </section>

        {/* Languages & Soft Skills — side by side */}
        <div className="grid sm:grid-cols-2 gap-10">
          {/* Languages */}
          <section aria-labelledby="languages-title">
            <h2
              id="languages-title"
              className={cn('text-2xl font-serif mb-5', isRTL && 'text-right')}
            >
              {t('languages.title')}
            </h2>
            <ul className="space-y-3">
              {languageItems.map(({ language, level }) => (
                <li
                  key={language}
                  className={cn('flex items-center gap-3', isRTL && 'flex-row-reverse')}
                >
                  <Globe className="w-4 h-4 text-primary-400 flex-shrink-0" aria-hidden="true" />
                  <div className={cn(isRTL && 'text-right')}>
                    <span className="font-medium text-sm text-[var(--color-text)]">{language}</span>
                    <span className="text-[var(--color-text-muted)] text-xs ms-2">{level}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Soft skills */}
          <section aria-labelledby="soft-skills-title">
            <h2
              id="soft-skills-title"
              className={cn('text-2xl font-serif mb-5', isRTL && 'text-right')}
            >
              {t('softSkills.title')}
            </h2>
            <div className={cn('flex flex-wrap gap-2', isRTL && 'flex-row-reverse')}>
              {softSkillItems.map((skill) => (
                <span
                  key={skill}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
                    'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300',
                    'border border-primary-200 dark:border-primary-800',
                  )}
                >
                  <Heart className="w-3 h-3" aria-hidden="true" />
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Certifications */}
        <CertificationCards locale={l} />

      </div>
    </div>
  );
}
