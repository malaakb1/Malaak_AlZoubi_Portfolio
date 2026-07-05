import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Locale, BilingualString } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function t(val: BilingualString, locale: Locale): string {
  return val[locale];
}

export function isRTL(locale: Locale): boolean {
  return locale === 'ar';
}

// Category chips — translucent accent-on-dark for the cyber palette.
export const categoryColors: Record<string, string> = {
  genai:   'bg-primary-500/12 text-primary-300 border border-primary-500/30',
  nlp:     'bg-magenta-500/12 text-magenta-300 border border-magenta-500/30',
  cv:      'bg-lavender-400/15 text-lavender-200 border border-lavender-400/30',
  data:    'bg-gold-500/12 text-gold-300 border border-gold-500/30',
  mlops:   'bg-primary-500/12 text-primary-300 border border-primary-500/30',
  webapi:  'bg-magenta-500/12 text-magenta-300 border border-magenta-500/30',
  product: 'bg-gold-500/12 text-gold-300 border border-gold-500/30',
};

export const categoryLabels: Record<string, BilingualString> = {
  genai:   { en: 'GenAI',           ar: 'GenAI'                },
  nlp:     { en: 'NLP',             ar: 'NLP'                  },
  cv:      { en: 'Computer Vision', ar: 'Computer Vision'      },
  data:    { en: 'Data & ML',       ar: 'Data & ML'            },
  mlops:   { en: 'MLOps',           ar: 'MLOps'                },
  webapi:  { en: 'Web & API',       ar: 'Web & API'            },
  product: { en: 'Product',         ar: 'منتج'                 },
};
