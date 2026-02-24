import type { Metadata } from 'next';
import { CertificateFilters } from '@/components/certificates/CertificateFilters';
import type { Locale } from '@/types';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'الشهادات' : 'Certificates',
    description: isAr
      ? 'شهادات مهنية ودورات في الذكاء الاصطناعي وعلم البيانات والتحليلات.'
      : 'Professional certificates and courses in AI, data science, and analytics.',
  };
}

export default async function CertificatesPage({ params }: Props) {
  const { locale } = await params;
  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero header */}
      <div className="relative bg-[var(--color-bg-2)] border-b border-[var(--color-border)] overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className={`relative max-w-6xl mx-auto px-4 sm:px-6 py-16 ${isRTL ? 'text-right' : ''}`}>
          <h1 className="text-4xl sm:text-5xl font-serif mb-3">
            {isRTL ? 'الشهادات' : 'Certificates'}
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-xl text-lg">
            {isRTL
              ? 'شهادات مهنية ودورات في الذكاء الاصطناعي وعلم البيانات والتحليلات.'
              : 'Professional certificates and courses in AI, data science, and analytics.'}
          </p>
        </div>
      </div>

      {/* Certificates grid with filters */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        <CertificateFilters locale={locale as Locale} />
      </div>
    </div>
  );
}
