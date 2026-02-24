'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface HeaderProps {
  locale: Locale;
}

type NavKey = 'home' | 'projects' | 'dashboards' | 'certificates' | 'about' | 'contact';

const navLinks: Array<{ key: NavKey; href: string }> = [
  { key: 'home',          href: '/'              },
  { key: 'projects',      href: '/projects'      },
  { key: 'dashboards',    href: '/dashboards'    },
  { key: 'certificates',  href: '/certificates'  },
  { key: 'about',         href: '/about'         },
  { key: 'contact',       href: '/contact'       },
];

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isRTL = locale === 'ar';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    const localePath = `/${locale}${href}`;
    if (href === '/') return pathname === localePath;
    return pathname.startsWith(localePath);
  };

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)] shadow-soft'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-b from-primary-100 to-lavender-100 dark:from-primary-900/30 dark:to-lavender-900/30 flex-shrink-0 select-none">
              <Image
                src="/images/avatar-removebg-preview.png"
                alt="Malaak Al Zoubi"
                width={64}
                height={64}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span
              className={cn(
                'font-serif text-lg font-medium text-[var(--color-text)] hidden sm:block',
                isRTL && 'font-arabic',
              )}
            >
              {isRTL ? 'ملاك الزعبي' : 'Malaak Al Zoubi'}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary navigation"
            className={cn('hidden md:flex items-center gap-1', isRTL && 'flex-row-reverse')}
          >
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                href={`/${locale}${href}`}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                  isActive(href)
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
                )}
              >
                {t(key)}
                {isActive(href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary-400"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={cn('flex items-center gap-2', isRTL && 'flex-row-reverse')}>
            <ThemeToggle />
            <a
              href="/cv/malaak-cv.pdf"
              download
              aria-label={t('downloadCV')}
              className={cn(
                'hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200',
                'bg-primary-500 hover:bg-primary-600 text-white shadow-soft hover:shadow-glow',
              )}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{t('downloadCV')}</span>
            </a>

            {/* Mobile hamburger */}
            <button
              aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)]"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-md"
          >
            <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ key, href }) => (
                <Link
                  key={key}
                  href={`/${locale}${href}`}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive(href)
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-2)] hover:text-[var(--color-text)]',
                    isRTL && 'text-right',
                  )}
                >
                  {t(key)}
                </Link>
              ))}
              <a
                href="/cv/malaak-cv.pdf"
                download
                className="mt-2 flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold bg-primary-500 text-white"
              >
                <Download className="w-4 h-4" />
                {t('downloadCV')}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
