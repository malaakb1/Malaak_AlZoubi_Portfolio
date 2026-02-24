import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Github, Linkedin, Mail, MapPin, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const navT = useTranslations('nav');
  const isRTL = locale === 'ar';

  const socials = [
    { icon: Github,   href: 'https://github.com/malaakb1',                       label: 'GitHub'   },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/malaak-al-zoubi/',      label: 'LinkedIn' },
    { icon: Mail,     href: 'mailto:malaakbalzoubi@gmail.com',                    label: 'Email'    },
  ];

  const links = [
    { href: `/${locale}`,              label: navT('home'         as const) },
    { href: `/${locale}/projects`,     label: navT('projects'     as const) },
    { href: `/${locale}/dashboards`,   label: navT('dashboards'   as const) },
    { href: `/${locale}/certificates`, label: navT('certificates' as const) },
    { href: `/${locale}/about`,        label: navT('about'        as const) },
    { href: `/${locale}/contact`,      label: navT('contact'      as const) },
  ];

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-2)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-10', isRTL && 'text-right')}>
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2" style={{ justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-b from-primary-100 to-lavender-100 dark:from-primary-900/30 dark:to-lavender-900/30 flex-shrink-0">
                <Image
                  src="/images/avatar-removebg-preview.png"
                  alt="Malaak Al Zoubi"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className={cn('font-serif text-lg font-medium', isRTL && 'font-arabic')}>
                {isRTL ? 'ملاك الزعبي' : 'Malaak Al Zoubi'}
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {t('tagline')}
            </p>
            <div className={cn('flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]', isRTL && 'justify-end')}>
              <MapPin className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
              <span>{t('location')}</span>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
              {isRTL ? 'الروابط' : 'Links'}
            </h3>
            <ul className="space-y-2">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--color-text-muted)] hover:text-primary-500 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
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
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-muted)] hover:text-primary-500 hover:border-primary-300 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs text-[var(--color-text-muted)]">
              malaakbalzoubi@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={cn(
          'mt-10 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-muted)]',
          isRTL && 'flex-row-reverse',
        )}>
          <p>
            © {new Date().getFullYear()} Malaak Al Zoubi. {t('rights')}
          </p>
          <p>{t('builtWith')}</p>
          <a
            href="#top"
            aria-label="Back to top"
            className="flex items-center gap-1 hover:text-primary-500 transition-colors"
          >
            <ArrowUp className="w-3 h-3" />
            <span className="hidden sm:inline">{isRTL ? 'أعلى الصفحة' : 'Back to top'}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
