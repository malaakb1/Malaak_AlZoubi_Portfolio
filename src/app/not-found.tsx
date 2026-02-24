// Root-level 404 — shown when no [locale] segment matches (e.g. bare /unknown path).
// Inherits <html>/<body> from app/layout.tsx.
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
        fontFamily: 'system-ui, sans-serif',
        background: '#FAFAF8',
        color: '#1C1C1E',
      }}
    >
      <h1 style={{ fontSize: '5rem', margin: '0 0 1rem', color: '#C4829A' }}>404</h1>
      <p style={{ color: '#6B7280', marginBottom: '2rem' }}>
        Page not found.
      </p>
      <Link
        href="/en"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.75rem',
          borderRadius: '9999px',
          background: '#C4829A',
          color: 'white',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Go Home
      </Link>
    </div>
  );
}
