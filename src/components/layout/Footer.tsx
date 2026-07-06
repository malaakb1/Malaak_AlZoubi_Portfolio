import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Github, Linkedin, Mail, MapPin, ArrowUpRight, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const navT = useTranslations('nav');
  const ctaT = useTranslations('cta');
  const isRTL = locale === 'ar';

  const socials = [
    { icon: Github,   href: 'https://github.com/malaakb1',                  label: 'GitHub'   },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/malaak-al-zoubi/', label: 'LinkedIn' },
    { icon: Mail,     href: 'mailto:malaakbalzoubi@gmail.com',              label: 'Email'    },
  ];

  const links = [
    { href: `/${locale}`,              label: navT('home')         },
    { href: `/${locale}/projects`,     label: navT('projects')     },
    { href: `/${locale}/dashboards`,   label: navT('dashboards')   },
    { href: `/${locale}/certificates`, label: navT('certificates') },
    { href: `/${locale}/about`,        label: navT('about')        },
    { href: `/${locale}/contact`,      label: navT('contact')      },
  ];

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-[var(--color-border)]">
      {/* Big CTA band */}
      <div className="relative">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="blob blob-purple absolute -top-24 left-[10%] w-[420px] h-[420px] animate-aurora" />
          <div className="blob blob-pink absolute top-0 right-[8%] w-[360px] h-[360px] animate-aurora" style={{ animationDelay: '3s' }} />
        </div>

        <div className={cn('max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center', isRTL && 'dir-rtl')}>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary-400 mb-4">
            {t('tagline')}
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.05] tracking-tight mb-8">
            <span className="gradient-text-animated">{ctaT('title')}</span>
          </h2>
          <div className={cn('flex flex-wrap items-center justify-center gap-3')}>
            <Link
              href={`/${locale}/contact`}
              className={cn(
                'inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-primary-500 text-cream hover:bg-primary-400 hover:shadow-glow-mint transition-all active:scale-95',
                isRTL && 'flex-row-reverse',
              )}
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              {ctaT('button')}
            </Link>
            <a
              href="/cv/malaak-cv.pdf"
              download
              className={cn(
                'inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-[var(--color-border)] text-[var(--color-text)] hover:border-primary-400 hover:text-primary-400 transition-all',
                isRTL && 'flex-row-reverse',
              )}
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              {navT('downloadCV')}
            </a>
          </div>
        </div>
      </div>

      {/* Lower bar */}
      <div className="border-t border-[var(--color-border)] bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-10', isRTL && 'text-right')}>
            {/* Brand */}
            <div className="space-y-3">
              <p className="font-serif text-lg font-bold">
                {isRTL ? 'ملاك الزعبي' : 'Malaak Al Zoubi'}
              </p>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-xs">
                {isRTL
                  ? 'مطوّرة ذكاء اصطناعي تبني حلول GenAI و RAG و NLP عربية قابلة للنشر.'
                  : 'AI Developer building practical GenAI, RAG & Arabic NLP systems.'}
              </p>
              <div className={cn('flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]', isRTL && 'justify-end')}>
                <MapPin className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
                <span>{t('location')}</span>
              </div>
            </div>

            {/* Nav */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-400 mb-4">
                {isRTL ? 'الروابط' : 'Explore'}
              </h3>
              <ul className="grid grid-cols-2 gap-2">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        'group inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-primary-400 transition-colors',
                        isRTL && 'flex-row-reverse',
                      )}
                    >
                      {label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 transition-all" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-400 mb-4">
                {isRTL ? 'تواصل' : 'Connect'}
              </h3>
              <div className={cn('flex items-center gap-3', isRTL && 'justify-end')}>
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--surface)] text-[var(--color-text-muted)] hover:text-primary-400 hover:border-primary-400/60 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
              <p className="mt-4 text-xs text-[var(--color-text-muted)]">malaakbalzoubi@gmail.com</p>
            </div>
          </div>

          {/* Bottom row */}
          <div className={cn(
            'mt-10 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-text-muted)]',
            isRTL && 'sm:flex-row-reverse',
          )}>
            <p>© {new Date().getFullYear()} Malaak Al Zoubi. {t('rights')}</p>
            <p>{t('builtWith')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
