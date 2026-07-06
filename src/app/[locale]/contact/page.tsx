import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Mail, Github, Linkedin, MessageSquare, Sparkles, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const l = locale as Locale;
  const isRTL = l === 'ar';

  const contactItems = [
    {
      icon: Mail,
      label: t('social.email'),
      value: 'malaakbalzoubi@gmail.com',
      href: 'mailto:malaakbalzoubi@gmail.com',
      // Neon Mint chip
      chip: 'bg-primary-500/12 text-primary-400 border border-primary-500/30',
      hoverGlow: 'hover:shadow-glow-mint',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/malaak-al-zoubi',
      href: 'https://www.linkedin.com/in/malaak-al-zoubi/',
      // Hot Pink chip
      chip: 'bg-magenta-500/12 text-magenta-400 border border-magenta-500/30',
      hoverGlow: 'hover:shadow-glow-pink',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/malaakb1',
      href: 'https://github.com/malaakb1',
      // Deep Purple chip
      chip: 'bg-lavender-500/15 text-lavender-400 border border-lavender-500/40',
      hoverGlow: 'hover:shadow-glow-purple',
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* ── Hero header ─────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="absolute -top-24 -left-16 w-80 h-80 blob blob-purple animate-aurora" aria-hidden="true" />
        <div
          className="absolute top-10 right-0 w-72 h-72 blob blob-pink animate-aurora"
          style={{ animationDelay: '4s' }}
          aria-hidden="true"
        />

        <div className={cn('relative max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-16', isRTL && 'text-right')}>
          <span
            className={cn(
              'inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary-400 mb-4',
              isRTL && 'flex-row-reverse',
            )}
          >
            <span className="h-px w-6 bg-gradient-to-r from-primary-400 to-transparent" aria-hidden="true" />
            {isRTL ? 'تواصل' : 'Contact'}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.05] mb-4">
            <span className="gradient-text">{t('title')}</span>
          </h1>
          <p className="text-[var(--color-text-muted)] text-lg max-w-xl">{t('subtitle')}</p>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14">
        <div className={cn('grid lg:grid-cols-2 gap-12', isRTL && 'direction-rtl')}>

          {/* Left — Contact Information */}
          <div>
            <h2 className={cn('text-2xl sm:text-3xl font-serif font-bold tracking-tight mb-8', isRTL && 'text-right')}>
              {isRTL ? (
                <>{'معلومات '}<span className="text-primary-400">{'التواصل'}</span></>
              ) : (
                <>{'Contact '}<span className="text-primary-400">{'Information'}</span></>
              )}
            </h2>

            <div className="space-y-4">
              {contactItems.map(({ icon: Icon, label, value, href, chip, hoverGlow }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className={cn(
                    'group card flex items-center gap-4 p-5',
                    hoverGlow,
                    isRTL && 'flex-row-reverse text-right',
                  )}
                >
                  <div
                    className={cn(
                      'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110',
                      chip,
                    )}
                    aria-hidden="true"
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[var(--color-text)]">{label}</p>
                    <p className="text-sm text-[var(--color-text-muted)] group-hover:text-primary-400 transition-colors truncate">
                      {value}
                    </p>
                  </div>
                  <ArrowUpRight
                    className={cn(
                      'w-4 h-4 flex-shrink-0 text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 group-hover:text-primary-400 transition-all',
                      isRTL ? 'mr-auto' : 'ml-auto',
                    )}
                    aria-hidden="true"
                    style={{ transform: isRTL ? 'scaleX(-1)' : undefined }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Let's Collaborate */}
          <div>
            <h2 className={cn('text-2xl sm:text-3xl font-serif font-bold tracking-tight mb-8', isRTL && 'text-right')}>
              {isRTL ? (
                <>{'لنتعاون '}<span className="text-primary-400">{'معاً'}</span></>
              ) : (
                <>{"Let's "}<span className="text-primary-400">{'Collaborate'}</span></>
              )}
            </h2>

            {/* CTA card — gradient-mesh backdrop (à la CTASection) */}
            <div className="relative overflow-hidden rounded-[1.35rem] border border-[var(--color-border)] p-8 space-y-6">
              <div className="absolute inset-0 -z-10 bg-gradient-hero" aria-hidden="true" />
              <div className="absolute inset-0 -z-10 bg-grid opacity-40" aria-hidden="true" />
              <div className="absolute -top-16 -right-10 w-56 h-56 blob blob-pink animate-aurora" aria-hidden="true" />
              <div
                className="absolute -bottom-16 -left-10 w-56 h-56 blob blob-mint animate-aurora"
                style={{ animationDelay: '3s' }}
                aria-hidden="true"
              />

              <div className="relative">
                <div className={cn('flex items-center gap-3 mb-3', isRTL && 'flex-row-reverse')}>
                  <Sparkles className="w-5 h-5 text-primary-400" aria-hidden="true" />
                  <h3 className="text-lg font-bold text-[var(--color-text)]">{t('cta.heading')}</h3>
                </div>
                <p className={cn('text-sm text-[var(--color-text-muted)] leading-relaxed', isRTL && 'text-right')}>
                  {t('cta.description')}
                </p>

                {/* Buttons */}
                <div className="space-y-3 pt-5">
                  <a
                    href="mailto:malaakbalzoubi@gmail.com"
                    className={cn(
                      'flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl text-sm font-semibold transition-all active:scale-95',
                      'bg-primary-500 text-cream hover:bg-primary-400 hover:shadow-glow-mint',
                      isRTL && 'flex-row-reverse',
                    )}
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    {t('cta.sendEmail')}
                  </a>
                  <a
                    href="https://www.linkedin.com/in/malaak-al-zoubi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl text-sm font-semibold transition-all',
                      'border border-[var(--color-border)] text-[var(--color-text)]',
                      'hover:border-primary-400 hover:text-primary-400',
                      isRTL && 'flex-row-reverse',
                    )}
                  >
                    <Linkedin className="w-4 h-4" aria-hidden="true" />
                    {t('cta.connectLinkedIn')}
                  </a>
                </div>
              </div>
            </div>

            {/* Availability note — mint/primary tinted panel */}
            <div
              className={cn(
                'mt-6 flex items-start gap-3 p-4 rounded-xl',
                'bg-primary-500/10 border border-primary-500/30 text-primary-400',
                isRTL && 'flex-row-reverse text-right',
              )}
            >
              <MessageSquare className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-primary-400">{t('info.availability')}</p>
                <p className="text-xs text-primary-400/70">{t('info.responseTime')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
