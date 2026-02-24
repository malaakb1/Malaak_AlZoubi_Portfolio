'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Download, Search, X } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { certificates } from '@/data/certificates';
import type { Locale, CertificateCategory } from '@/types';

interface CertificateFiltersProps {
  locale: Locale;
}

const categoryFilters: Array<{ key: 'all' | CertificateCategory; label: { en: string; ar: string } }> = [
  { key: 'all',                label: { en: 'All',                ar: 'الكل'             } },
  { key: 'ml',                 label: { en: 'Machine Learning',   ar: 'تعلم آلي'         } },
  { key: 'data-science',       label: { en: 'Data Science',       ar: 'علم بيانات'       } },
  { key: 'genai',              label: { en: 'Generative AI',      ar: 'ذكاء اصطناعي توليدي' } },
  { key: 'bi-tools',           label: { en: 'BI Tools',           ar: 'أدوات BI'         } },
  { key: 'prompt-engineering',  label: { en: 'Prompt Engineering', ar: 'هندسة الأوامر'    } },
  { key: 'automation',         label: { en: 'Automation',         ar: 'أتمتة'            } },
];

export function CertificateFilters({ locale }: CertificateFiltersProps) {
  const isRTL = locale === 'ar';
  const [activeCategory, setActiveCategory] = useState<'all' | CertificateCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result = certificates;

    if (activeCategory !== 'all') {
      result = result.filter((c) => c.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.en.toLowerCase().includes(q) ||
          c.title.ar.toLowerCase().includes(q) ||
          c.issuer.toLowerCase().includes(q) ||
          c.skills.some((s) => s.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  return (
    <div className={cn(isRTL && 'text-right')}>
      {/* Search */}
      <div className="relative mb-6">
        <Search
          className={cn(
            'absolute top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]',
            isRTL ? 'right-4' : 'left-4',
          )}
          aria-hidden="true"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={isRTL ? 'ابحث في الشهادات…' : 'Search certificates or skills…'}
          className={cn(
            'w-full py-3 border border-[var(--color-border)] rounded-xl bg-[var(--color-card)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-primary-400 transition-shadow text-sm',
            isRTL ? 'pr-11 pl-10' : 'pl-11 pr-10',
          )}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
              isRTL ? 'left-4' : 'right-4',
            )}
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category filter pills */}
      <div className={cn('flex flex-wrap gap-2 mb-8', isRTL && 'flex-row-reverse')}>
        {categoryFilters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border',
              activeCategory === key
                ? 'bg-primary-500 text-white border-primary-500 shadow-soft'
                : 'bg-[var(--color-card)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:border-primary-300 hover:text-[var(--color-text)]',
            )}
          >
            {label[locale]}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        {filtered.length} {isRTL ? 'شهادة' : 'certificate(s)'} {isRTL ? 'موجودة' : 'found'}
      </p>

      {/* Certificate grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.06 }}
              className="card flex flex-col group overflow-hidden"
            >
              {/* Certificate image */}
              {cert.image && (
                <div className="relative w-full aspect-[16/10] bg-[var(--color-bg-2)] overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.title[locale]}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}

              <div className="p-5 flex flex-col gap-3 flex-1">
              {/* Top row */}
              <div className={cn('flex items-start gap-3', isRTL && 'flex-row-reverse')}>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                  style={{ background: `${cert.color}22`, color: cert.color }}
                  aria-hidden="true"
                >
                  <Award className="w-5 h-5" />
                </div>
                <div className={cn('flex-1 min-w-0', isRTL && 'text-right')}>
                  <p className="font-semibold text-sm text-[var(--color-text)] leading-snug">
                    {cert.title[locale]}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    {cert.issuer}
                  </p>
                </div>
                <span className="text-xs text-[var(--color-text-muted)] flex-shrink-0 font-medium">
                  {cert.date}
                </span>
              </div>

              {/* Skills */}
              <div className={cn('flex flex-wrap gap-1', isRTL && 'flex-row-reverse')}>
                {cert.skills.map((skill) => (
                  <Badge key={skill} variant="default">{skill}</Badge>
                ))}
              </div>

              {/* Actions */}
              <div className={cn('flex gap-3 mt-auto pt-1', isRTL && 'flex-row-reverse')}>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex items-center gap-1 text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors',
                      isRTL && 'flex-row-reverse',
                    )}
                  >
                    {isRTL ? 'عرض الشهادة' : 'View Credential'}
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                )}
                {cert.certificateFile && (
                  <a
                    href={cert.certificateFile}
                    download
                    className={cn(
                      'inline-flex items-center gap-1 text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors',
                      isRTL && 'flex-row-reverse',
                    )}
                  >
                    {isRTL ? 'تحميل PDF' : 'Download PDF'}
                    <Download className="w-3 h-3" aria-hidden="true" />
                  </a>
                )}
              </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Award className="w-12 h-12 mx-auto text-[var(--color-text-muted)] opacity-40 mb-4" />
          <p className="text-[var(--color-text-muted)]">
            {isRTL ? 'لا توجد شهادات مطابقة.' : 'No certificates found. Try a different filter.'}
          </p>
        </div>
      )}
    </div>
  );
}
