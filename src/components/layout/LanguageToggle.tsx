'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { motion } from 'framer-motion';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // returns path WITHOUT locale prefix

  const handleToggle = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.push(pathname, { locale: nextLocale });
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      className={`
        relative flex items-center gap-1.5 px-3 py-1.5 rounded-full
        text-sm font-semibold transition-all duration-200
        border border-primary-200 dark:border-primary-800
        bg-primary-50 dark:bg-primary-900/20
        text-primary-700 dark:text-primary-300
        hover:bg-primary-100 dark:hover:bg-primary-900/40
        hover:border-primary-300 dark:hover:border-primary-700
        focus-visible:ring-2 focus-visible:ring-primary-400
      `}
    >
      <span className="text-base leading-none" aria-hidden="true">🌐</span>
      <span>{locale === 'en' ? 'عربي' : 'English'}</span>
    </motion.button>
  );
}
