'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 28 },
  animate:   { opacity: 1, y: 0  },
  transition:{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

const SPECIALISATIONS = [
  'GenAI & RAG',
  'NLP',
  'Computer Vision',
  'FastAPI',
  'LangChain',
  'Azure AI',
];

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const t = useTranslations('hero');
  const isRTL = locale === 'ar';

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      aria-label="Hero"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />

      {/* Decorative orbs */}
      <div
        className="orb orb-rose absolute -top-40 -left-40 w-[600px] h-[600px]"
        aria-hidden="true"
      />
      <div
        className="orb orb-lavender absolute -bottom-40 -right-40 w-[500px] h-[500px]"
        aria-hidden="true"
      />

      <div className={cn('relative max-w-6xl mx-auto px-4 sm:px-6 py-20', isRTL && 'text-right')}>
        <div className={cn('flex items-center gap-10 lg:gap-16', isRTL ? 'flex-row-reverse' : 'flex-row')}>
        <div className="max-w-3xl flex-1">
          {/* Badge */}
          <motion.div {...fadeUp(0)} className={cn('flex', isRTL ? 'justify-end' : 'justify-start')}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 mb-6">
              <Sparkles className="w-3 h-3" aria-hidden="true" />
              {isRTL ? 'مطورة ذكاء اصطناعي' : 'AI Developer'}
            </span>
          </motion.div>

          {/* Mobile avatar — centered, visible only on small screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className={cn('flex lg:hidden mb-6', isRTL ? 'justify-end' : 'justify-start')}
          >
            <div className="relative w-28 h-28 sm:w-32 sm:h-32">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-300 via-lavender-300 to-primary-400 dark:from-primary-600 dark:via-lavender-600 dark:to-primary-700 animate-pulse opacity-40 blur-lg" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-primary-200 dark:border-primary-700 shadow-glow bg-gradient-to-b from-primary-50 to-lavender-50 dark:from-primary-900/30 dark:to-lavender-900/30">
                <Image
                  src="/images/avatar-removebg-preview.png"
                  alt="Malaak Al Zoubi"
                  width={140}
                  height={140}
                  className="w-full h-full object-cover object-top scale-110"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Greeting + Name */}
          <motion.p
            {...fadeUp(0.1)}
            className="text-lg text-[var(--color-text-muted)] mb-2"
          >
            {t('greeting')}
          </motion.p>
          <motion.h1
            {...fadeUp(0.15)}
            className="text-5xl sm:text-6xl lg:text-7xl font-serif mb-4 leading-tight"
          >
            <span className="gradient-text">{t('name')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.25)}
            className="text-lg sm:text-xl text-[var(--color-text-muted)] leading-relaxed max-w-2xl mb-10"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            {...fadeUp(0.35)}
            className={cn('flex flex-wrap gap-3 mb-12', isRTL && 'justify-end')}
          >
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-primary-500 hover:bg-primary-600 text-white shadow-soft hover:shadow-glow transition-all duration-200 active:scale-95"
            >
              {t('ctaProjects')}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)] hover:border-primary-300 hover:text-primary-600 transition-all duration-200"
            >
              {t('ctaContact')}
            </Link>
            <a
              href="/cv/malaak-cv.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              {t('ctaCV')}
            </a>
          </motion.div>

          {/* Specialisation tags */}
          <motion.div
            {...fadeUp(0.45)}
            className={cn('flex flex-wrap gap-2', isRTL && 'justify-end')}
          >
            {SPECIALISATIONS.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.06, duration: 0.4 }}
                className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text-muted)]"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Avatar illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="hidden lg:block flex-shrink-0"
        >
          <Image
            src="/images/avatar-removebg-preview.png"
            alt="Malaak Al Zoubi"
            width={340}
            height={340}
            className="w-64 xl:w-80 h-auto drop-shadow-xl"
            priority
          />
        </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-[var(--color-text-muted)]">{t('scrollDown')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-0.5 h-8 bg-gradient-to-b from-primary-400 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
