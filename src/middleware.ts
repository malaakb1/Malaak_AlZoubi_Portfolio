import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Force English only — redirect /ar/* to /en/*
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/ar')) {
    const newPath = pathname.replace(/^\/ar/, '/en') || '/en';
    const url = request.nextUrl.clone();
    url.pathname = newPath;
    return NextResponse.redirect(url);
  }
  return intlMiddleware(request);
}

export const config = {
  // Match all request paths EXCEPT for:
  //  - API routes (/api/...)
  //  - Next.js internals (/_next/...)
  //  - Files with extensions (.ico, .png, .pdf, etc.)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
