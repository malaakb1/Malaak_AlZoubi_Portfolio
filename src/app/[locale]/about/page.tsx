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
      <header className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div
          className="blob blob-purple w-[34rem] h-[34rem] -top-44 -start-32 animate-aurora"
          aria-hidden="true"
        />
        <div
          className="blob blob-pink w-[26rem] h-[26rem] -bottom-40 end-0 animate-aurora"
          style={{ animationDelay: '4s' }}
          aria-hidden="true"
        />

        <div
          className={cn(
            'relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20',
            isRTL && 'text-right',
          )}
        >
          <div className={cn('flex items-start gap-6', isRTL && 'flex-row-reverse')}>
            {/* Avatar with gradient ring + glow */}
            <div className="relative flex-shrink-0">
              <div
                className="absolute -inset-1 rounded-full bg-gradient-brand opacity-70 blur-[6px] animate-pulse-soft"
                aria-hidden="true"
              />
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[2px] bg-gradient-brand">
                <div className="w-full h-full rounded-full overflow-hidden bg-ink-900">
                  <Image
                    src="/images/avatar-removebg-preview.png"
                    alt="Malaak Al Zoubi"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </div>

            <div>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary-400 mb-3">
                <span className="h-px w-6 bg-gradient-to-r from-primary-400 to-transparent" aria-hidden="true" />
                {isRTL ? 'نبذة' : 'Profile'}
              </span>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight mb-2">
                {t('title')}
              </h1>
              <p className="text-[var(--color-text-muted)] text-lg max-w-2xl leading-relaxed">
                {t('subtitle')}
              </p>
              <div className={cn('flex items-center gap-2 mt-4 text-sm text-[var(--color-text-muted)]', isRTL && 'flex-row-reverse justify-end')}>
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0" aria-hidden="true" />
                <span>{t('location')}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 space-y-16">

        {/* Bio */}
        <section aria-labelledby="bio-section">
          <div className={cn('space-y-4 text-[var(--color-text-muted)] leading-relaxed', isRTL && 'text-right')}>
            <p>{t('bio1')}</p>
            <p>{t('bio2')}</p>
          </div>
          <div className={cn('mt-8', isRTL && 'flex justify-end')}>
            <a
              href="/cv/malaak-cv.pdf"
              download
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm',
                'bg-primary-500 text-cream hover:bg-primary-400 hover:shadow-glow-mint transition-all duration-200',
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
          <div className={cn('mb-6', isRTL && 'text-right')}>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary-400 mb-3">
              <span className="h-px w-6 bg-gradient-to-r from-primary-400 to-transparent" aria-hidden="true" />
              {isRTL ? 'الأكاديمية' : 'Academic'}
            </span>
            <h2
              id="education-title"
              className="text-2xl sm:text-3xl font-serif font-bold tracking-tight"
            >
              {t('education.title')}
            </h2>
          </div>
          <div className={cn('card p-6 flex gap-4', isRTL && 'flex-row-reverse')}>
            <div
              className="w-11 h-11 rounded-full bg-gold-500/12 text-gold-400 ring-1 ring-gold-500/40 shadow-glow-gold flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className={cn(isRTL && 'text-right')}>
              <p className="font-semibold text-[var(--color-text)]">{t('education.degree')}</p>
              <p className="text-primary-400 font-medium text-sm mt-0.5">
                {t('education.institution')}
              </p>
              <p className="text-sm font-semibold text-gold-400 mt-1">{t('education.grade')}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{t('education.note')}</p>
            </div>
          </div>
        </section>

        {/* Languages & Soft Skills — side by side */}
        <div className="grid sm:grid-cols-2 gap-10">
          {/* Languages */}
          <section aria-labelledby="languages-title">
            <div className={cn('mb-5', isRTL && 'text-right')}>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary-400 mb-3">
                <span className="h-px w-6 bg-gradient-to-r from-primary-400 to-transparent" aria-hidden="true" />
                {isRTL ? 'التواصل' : 'Fluency'}
              </span>
              <h2
                id="languages-title"
                className="text-2xl sm:text-3xl font-serif font-bold tracking-tight"
              >
                {t('languages.title')}
              </h2>
            </div>
            <ul className="space-y-3">
              {languageItems.map(({ language, level }) => (
                <li
                  key={language}
                  className={cn('card p-4 flex items-center gap-3', isRTL && 'flex-row-reverse')}
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
            <div className={cn('mb-5', isRTL && 'text-right')}>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-magenta-400 mb-3">
                <span className="h-px w-6 bg-gradient-to-r from-magenta-400 to-transparent" aria-hidden="true" />
                {isRTL ? 'الشخصية' : 'Human'}
              </span>
              <h2
                id="soft-skills-title"
                className="text-2xl sm:text-3xl font-serif font-bold tracking-tight"
              >
                {t('softSkills.title')}
              </h2>
            </div>
            <div className={cn('flex flex-wrap gap-2', isRTL && 'flex-row-reverse')}>
              {softSkillItems.map((skill) => (
                <span
                  key={skill}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
                    'border border-[var(--color-border)] bg-[var(--surface)] text-[var(--color-text)]',
                    'hover:border-magenta-400/60 hover:text-magenta-400 transition-colors',
                  )}
                >
                  <Heart className="w-3 h-3 text-magenta-400" aria-hidden="true" />
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
