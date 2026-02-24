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

export const categoryColors: Record<string, string> = {
  genai:   'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
  nlp:     'bg-lavender-100 text-lavender-700 dark:bg-lavender-900/40 dark:text-lavender-300',
  cv:      'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  data:    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  mlops:   'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  webapi:  'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  product: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
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
