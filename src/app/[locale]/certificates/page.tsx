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
      <header className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div
          className="blob blob-purple w-[34rem] h-[34rem] -top-40 -start-32 animate-aurora"
          aria-hidden="true"
        />
        <div
          className="blob blob-mint w-[26rem] h-[26rem] -bottom-40 end-0 animate-aurora"
          style={{ animationDelay: '4s' }}
          aria-hidden="true"
        />

        <div className={`relative max-w-6xl mx-auto px-4 sm:px-6 py-20 ${isRTL ? 'text-right' : ''}`}>
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary-400 mb-4">
            <span className="h-px w-6 bg-gradient-to-r from-primary-400 to-transparent" aria-hidden="true" />
            {isRTL ? 'الإنجازات' : 'Credentials'}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-4">
            {isRTL ? 'الشهادات' : 'Certificates'}
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-xl text-lg leading-relaxed">
            {isRTL
              ? 'شهادات مهنية ودورات في الذكاء الاصطناعي وعلم البيانات والتحليلات.'
              : 'Professional certificates and courses in AI, data science, and analytics.'}
          </p>
        </div>
      </header>

      {/* Certificates grid with filters */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12">
        <CertificateFilters locale={locale as Locale} />
      </div>
    </div>
  );
}
