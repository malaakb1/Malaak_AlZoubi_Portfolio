import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Providers } from '@/components/providers/Providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://malaak.dev';

  return {
    title: {
      default: t('title'),
      template: '%s | Malaak Al Zoubi',
    },
    description: t('description'),
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: siteUrl,
      siteName: 'Malaak Al Zoubi',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    alternates: {
      canonical: siteUrl,
      languages: {
        en: `${siteUrl}/en`,
        ar: `${siteUrl}/ar`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'ar')) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <>
      <Providers>
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-link">
            {isRTL ? 'تخطى إلى المحتوى' : 'Skip to content'}
          </a>
          <Header locale={locale as 'en' | 'ar'} />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer locale={locale as 'en' | 'ar'} />
        </NextIntlClientProvider>
      </Providers>
    </>
  );
}
