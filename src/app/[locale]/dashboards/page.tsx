import type { Metadata } from 'next';
import { DashboardFilters } from '@/components/dashboards/DashboardFilters';
import type { Locale } from '@/types';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'لوحات البيانات' : 'Dashboards',
    description: isAr
      ? 'لوحات تحليلية تفاعلية مبنية بـ Power BI و Tableau و Python'
      : 'Interactive analytics dashboards built with Power BI, Tableau & Python',
  };
}

export default async function DashboardsPage({ params }: Props) {
  const { locale } = await params;
  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero header */}
      <div className="relative bg-[var(--color-bg-2)] border-b border-[var(--color-border)] overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className={`relative max-w-6xl mx-auto px-4 sm:px-6 py-16 ${isRTL ? 'text-right' : ''}`}>
          <h1 className="text-4xl sm:text-5xl font-serif mb-3">
            {isRTL ? 'لوحات البيانات' : 'Dashboards'}
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-xl text-lg">
            {isRTL
              ? 'لوحات تحليلية تفاعلية مبنية بـ Power BI و Tableau و Python لتحويل البيانات إلى رؤى قابلة للتنفيذ.'
              : 'Analytics dashboards built with Power BI, Tableau & Python — turning raw data into actionable insights.'}
          </p>
        </div>
      </div>

      {/* Dashboards grid with filters */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        <DashboardFilters locale={locale as Locale} />
      </div>
    </div>
  );
}
