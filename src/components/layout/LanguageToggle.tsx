'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // path WITHOUT locale prefix

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
      className="inline-flex items-center gap-1.5 h-10 px-3 rounded-xl text-sm font-semibold border border-[var(--color-border)] bg-white/[0.03] text-[var(--color-text)] hover:border-primary-400/60 hover:text-primary-400 transition-colors"
    >
      <Globe className="w-4 h-4" aria-hidden="true" />
      <span>{locale === 'en' ? 'عربي' : 'EN'}</span>
    </motion.button>
  );
}
