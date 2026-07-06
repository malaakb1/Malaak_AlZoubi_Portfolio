'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface HeaderProps {
  locale: Locale;
}

type NavKey = 'home' | 'projects' | 'dashboards' | 'certificates' | 'about' | 'contact';

const navLinks: Array<{ key: NavKey; href: string }> = [
  { key: 'home',         href: '/'             },
  { key: 'projects',     href: '/projects'     },
  { key: 'dashboards',   href: '/dashboards'   },
  { key: 'certificates', href: '/certificates' },
  { key: 'about',        href: '/about'        },
  { key: 'contact',      href: '/contact'      },
];

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isRTL = locale === 'ar';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    const localePath = `/${locale}${href}`;
    if (href === '/') return pathname === localePath;
    return pathname?.startsWith(localePath);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'relative rounded-full transition-all duration-300',
          isScrolled ? 'glass border border-[var(--color-border)] shadow-card' : 'glass border border-[var(--color-border)]/60',
        )}
      >
        <div className="flex items-center gap-1 h-12 sm:h-14 px-2 sm:px-2.5">
          {/* Desktop nav pill */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ key, href }) => {
              const active = isActive(href);
              return (
                <Link
                  key={key}
                  href={`/${locale}${href}`}
                  className={cn(
                    'relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors duration-200',
                    active ? 'text-cream' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary-500 shadow-glow-mint"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{t(key)}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-[var(--color-text)] hover:text-primary-400 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'md:hidden absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[min(92vw,340px)]',
                'glass border border-[var(--color-border)] shadow-card rounded-2xl p-2',
              )}
            >
              <nav className={cn('flex flex-col gap-1', isRTL && 'text-right')}>
                {navLinks.map(({ key, href }, i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: isRTL ? 12 : -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i }}
                  >
                    <Link
                      href={`/${locale}${href}`}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                        isActive(href)
                          ? 'bg-primary-500/12 text-primary-400 border border-primary-500/30'
                          : 'text-[var(--color-text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--color-text)]',
                        isRTL && 'flex-row-reverse',
                      )}
                    >
                      {t(key)}
                      <ArrowUpRight className="w-4 h-4 opacity-60" aria-hidden="true" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
