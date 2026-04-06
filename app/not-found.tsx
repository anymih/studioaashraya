import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{
      width: '100%',
      backgroundColor: '#FAF4EC',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      boxSizing: 'border-box',
      textAlign: 'center',
    }}>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '6rem',
        fontWeight: 600,
        color: '#184A45',
        margin: 0,
        lineHeight: 1,
      }}>
        404
      </h1>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '2rem',
        fontWeight: 600,
        color: '#184A45',
        margin: '16px 0 12px 0',
      }}>
        Page Not Found
      </h2>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '15px',
        color: '#666666',
        maxWidth: '400px',
        lineHeight: 1.7,
        margin: '0 0 32px 0',
      }}>
        The page you're looking for doesn't exist or may have moved.
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" style={{
          backgroundColor: '#184A45',
          color: '#ffffff',
          borderRadius: '9999px',
          padding: '12px 28px',
          fontSize: '14px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          textDecoration: 'none',
        }}>
          Go Home
        </Link>
        <Link href="/book-a-call" style={{
          backgroundColor: 'transparent',
          color: '#184A45',
          borderRadius: '9999px',
          padding: '12px 28px',
          fontSize: '14px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          textDecoration: 'none',
          border: '2px solid #184A45',
        }}>
          Book a Call
        </Link>
      </div>
    </main>
  )
}
