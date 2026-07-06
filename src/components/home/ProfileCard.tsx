'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Github, Linkedin, Mail, Sparkles, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface ProfileCardProps {
  locale: Locale;
}

const socials = [
  { icon: Github,   href: 'https://github.com/malaakb1',                  label: 'GitHub'   },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/malaak-al-zoubi/', label: 'LinkedIn' },
  { icon: Mail,     href: 'mailto:malaakbalzoubi@gmail.com',              label: 'Email'    },
];

/**
 * Sticky identity card (Sawad-style). Sits at the inline-start of the home grid,
 * so it renders on the LEFT in LTR (English) and on the RIGHT in RTL (Arabic)
 * automatically via CSS writing direction.
 */
export function ProfileCard({ locale }: ProfileCardProps) {
  const nav = useTranslations('nav');
  const about = useTranslations('about');
  const hero = useTranslations('hero');
  const isRTL = locale === 'ar';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative card p-4 sm:p-5 text-center overflow-visible"
    >
      {/* soft wine glow behind the card */}
      <div className="absolute -inset-2 -z-10 rounded-[1.7rem] bg-gradient-brand opacity-25 blur-2xl" aria-hidden="true" />

      {/* top accent line */}
      <div className="absolute top-0 inset-x-6 h-[3px] rounded-b bg-gradient-to-r from-transparent via-primary-400 to-transparent" aria-hidden="true" />

      {/* dashed orbit decoration */}
      <svg className="absolute -top-3 -right-2 w-24 h-24 text-primary-300/45 pointer-events-none" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path d="M6 58 A46 46 0 0 1 96 42" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 8" strokeLinecap="round" />
      </svg>

      {/* Photo in a gradient frame */}
      <div className="relative mx-auto w-full max-w-[190px] sm:max-w-[200px]">
        <div className="rounded-2xl p-[2px] bg-gradient-brand shadow-glow-pink">
          <div className="relative aspect-[4/5] rounded-[0.9rem] overflow-hidden bg-ink-800">
            <Image
              src="/images/malaak-new.jpeg"
              alt="Malaak Al Zoubi"
              fill
              sizes="240px"
              className="object-cover object-center"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* floating badge */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full grid place-items-center bg-primary-500 text-cream shadow-glow-pink ring-4 ring-[var(--color-card)]"
        >
          <Sparkles className="w-4 h-4" aria-hidden="true" />
        </motion.div>
      </div>

      {/* Name + role */}
      <h1 className="mt-6 font-serif text-2xl sm:text-[1.6rem] font-bold leading-tight text-[var(--color-text)]">
        {hero('name')}
      </h1>
      <p className="mt-1.5 text-[11px] font-mono uppercase tracking-[0.25em] text-primary-300">
        {hero('title')}
      </p>

      {/* Short bio */}
      <p className="mt-3.5 text-[13px] sm:text-sm text-[var(--color-text-muted)] leading-relaxed px-1">
        {about('subtitle')}
      </p>

      {/* Socials */}
      <div className="mt-4 flex items-center justify-center gap-2.5">
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={label}
            className="w-10 h-10 grid place-items-center rounded-xl border border-[var(--color-border)] bg-[var(--surface)] text-[var(--color-text-muted)] hover:text-cream hover:bg-primary-500 hover:border-primary-500 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="/cv/malaak-cv.pdf"
        download
        className={cn(
          'mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold bg-primary-500 text-cream hover:bg-primary-400 hover:shadow-glow-pink transition-all active:scale-[0.98]',
          isRTL && 'flex-row-reverse',
        )}
      >
        <Download className="w-4 h-4" aria-hidden="true" />
        {nav('downloadCV')}
      </a>
    </motion.div>
  );
}
