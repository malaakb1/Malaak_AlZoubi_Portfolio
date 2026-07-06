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

// Category chips — bright accent text on a translucent tint (dark theme).
export const categoryColors: Record<string, string> = {
  genai:   'bg-primary-500/15 text-primary-300 border border-primary-500/40',
  nlp:     'bg-magenta-500/15 text-magenta-300 border border-magenta-500/40',
  cv:      'bg-lavender-500/15 text-lavender-300 border border-lavender-500/40',
  data:    'bg-gold-500/15 text-gold-300 border border-gold-500/40',
  mlops:   'bg-primary-500/15 text-primary-300 border border-primary-500/40',
  webapi:  'bg-magenta-500/15 text-magenta-300 border border-magenta-500/40',
  product: 'bg-gold-500/15 text-gold-300 border border-gold-500/40',
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
