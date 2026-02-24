import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Mail, Github, Linkedin, MessageSquare, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const l = locale as Locale;
  const isRTL = l === 'ar';

  const contactItems = [
    {
      icon: Mail,
      label: t('social.email'),
      value: 'malaakbalzoubi@gmail.com',
      href: 'mailto:malaakbalzoubi@gmail.com',
      color: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/malaak-al-zoubi',
      href: 'https://www.linkedin.com/in/malaak-al-zoubi/',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/malaakb1',
      href: 'https://github.com/malaakb1',
      color: 'bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300',
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Header */}
      <div className="relative bg-[var(--color-bg-2)] border-b border-[var(--color-border)] overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className={cn('relative max-w-6xl mx-auto px-4 sm:px-6 py-16', isRTL && 'text-right')}>
          <h1 className="text-4xl sm:text-5xl font-serif mb-3">{t('title')}</h1>
          <p className="text-[var(--color-text-muted)] text-lg max-w-xl">{t('subtitle')}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12">
        <div className={cn('grid lg:grid-cols-2 gap-12', isRTL && 'direction-rtl')}>

          {/* Left — Contact Information */}
          <div>
            <h2 className={cn('text-2xl sm:text-3xl font-serif mb-8', isRTL && 'text-right')}>
              {isRTL ? (
                <>{'معلومات '}<span className="text-primary-500">{'التواصل'}</span></>
              ) : (
                <>{'Contact '}<span className="text-primary-500">{'Information'}</span></>
              )}
            </h2>

            <div className="space-y-4">
              {contactItems.map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center gap-4 p-5 rounded-2xl transition-all duration-200',
                    'bg-[var(--color-card)] border border-[var(--color-border)]',
                    'hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md group',
                    isRTL && 'flex-row-reverse text-right',
                  )}
                >
                  <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0', color)} aria-hidden="true">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--color-text)]">{label}</p>
                    <p className="text-sm text-[var(--color-text-muted)] group-hover:text-primary-500 transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Let's Collaborate */}
          <div>
            <h2 className={cn('text-2xl sm:text-3xl font-serif mb-8', isRTL && 'text-right')}>
              {isRTL ? (
                <>{'لنتعاون '}<span className="text-primary-500">{'معاً'}</span></>
              ) : (
                <>{"Let's "}<span className="text-primary-500">{'Collaborate'}</span></>
              )}
            </h2>

            <div className={cn(
              'rounded-2xl p-8 space-y-6',
              'bg-[var(--color-bg-2)] border border-[var(--color-border)]',
            )}>
              {/* CTA card */}
              <div className={cn('flex items-center gap-3 mb-2', isRTL && 'flex-row-reverse')}>
                <Sparkles className="w-5 h-5 text-primary-500" aria-hidden="true" />
                <h3 className="text-lg font-bold text-[var(--color-text)]">{t('cta.heading')}</h3>
              </div>
              <p className={cn('text-sm text-[var(--color-text-muted)] leading-relaxed', isRTL && 'text-right')}>
                {t('cta.description')}
              </p>

              {/* Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href="mailto:malaakbalzoubi@gmail.com"
                  className={cn(
                    'flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200',
                    'bg-primary-500 text-white hover:bg-primary-600 shadow-sm hover:shadow-md',
                    isRTL && 'flex-row-reverse',
                  )}
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  {t('cta.sendEmail')}
                </a>
                <a
                  href="https://www.linkedin.com/in/malaak-al-zoubi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200',
                    'border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)]',
                    'hover:border-primary-300 dark:hover:border-primary-700 hover:text-primary-500',
                    isRTL && 'flex-row-reverse',
                  )}
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                  {t('cta.connectLinkedIn')}
                </a>
              </div>
            </div>

            {/* Availability note */}
            <div className={cn(
              'mt-6 flex items-start gap-3 p-4 rounded-xl',
              'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40',
              isRTL && 'flex-row-reverse text-right',
            )}>
              <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{t('info.availability')}</p>
                <p className="text-xs text-emerald-600/80 dark:text-emerald-400/70">{t('info.responseTime')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
