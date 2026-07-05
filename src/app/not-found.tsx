// Root-level 404 — shown when no [locale] segment matches (e.g. bare /unknown path).
// Inherits <html>/<body> from app/layout.tsx. Kept dependency-free (only next/link)
// since it may render outside i18n / theme providers.
import Link from 'next/link';

export default function RootNotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        fontFamily: "'El Messiri', system-ui, sans-serif",
        background: '#050507',
        color: '#FFF8FB',
      }}
    >
      <h1
        style={{
          fontSize: '6rem',
          lineHeight: 1,
          margin: '0 0 1rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          background: 'linear-gradient(110deg, #00E0BA 0%, #FF3483 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
        }}
      >
        404
      </h1>
      <p style={{ color: '#BEB4C8', marginBottom: '2rem' }}>
        Page not found.
      </p>
      <Link
        href="/en"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.75rem',
          borderRadius: '9999px',
          background: '#00E0BA',
          color: '#050507',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Go Home
      </Link>
    </div>
  );
}
