import type { ReactNode } from 'react';
import { getLocale } from 'next-intl/server';
import { El_Messiri } from 'next/font/google';
import './globals.css';

const elMessiri = El_Messiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-el-messiri',
  display: 'swap',
});

// Root layout — provides <html> and <body> for ALL routes including not-found.
export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className={elMessiri.variable}>
      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
