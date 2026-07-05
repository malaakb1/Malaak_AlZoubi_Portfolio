import type { Metadata } from 'next';
import { DashboardFilters } from '@/components/dashboards/DashboardFilters';
import { cn } from '@/lib/utils';
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
    <div className="min-h-screen pb-20">
      {/* ─── Dark hero header ─────────────────────────────────────────────── */}
      <header className="relative overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20">
        {/* grid + aurora backdrop */}
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="blob blob-purple absolute -top-24 -left-16 w-[26rem] h-[26rem] animate-aurora" aria-hidden="true" />
        <div
          className="blob blob-mint absolute -bottom-32 -right-10 w-[22rem] h-[22rem] animate-aurora"
          style={{ animationDelay: '-6s' }}
          aria-hidden="true"
        />

        <div className={cn('relative max-w-6xl mx-auto px-4 sm:px-6', isRTL && 'text-right')}>
          <span
            className={cn(
              'inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary-400 mb-4',
              isRTL && 'flex-row-reverse',
            )}
          >
            <span className="h-px w-6 bg-gradient-to-r from-primary-400 to-transparent" aria-hidden />
            {isRTL ? 'تحليلات' : 'Data Stories'}
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.05]">
            {isRTL ? 'لوحات ' : ''}
            <span className="gradient-text">{isRTL ? 'البيانات' : 'Dashboards'}</span>
          </h1>

          <p className="mt-5 text-lg text-[var(--color-text-muted)] max-w-2xl">
            {isRTL
              ? 'لوحات تحليلية تفاعلية مبنية بـ Power BI و Tableau و Python لتحويل البيانات إلى رؤى قابلة للتنفيذ.'
              : 'Analytics dashboards built with Power BI, Tableau & Python — turning raw data into actionable insights.'}
          </p>
        </div>
      </header>

      {/* ─── Dashboards grid with filters ────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <DashboardFilters locale={locale as Locale} />
      </div>
    </div>
  );
}
