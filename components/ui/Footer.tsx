import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1a1a1a',
      width: '100%',
      padding: '64px 80px 32px',
      boxSizing: 'border-box',
    }}>

      {/* 3-column grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0',
        maxWidth: '1100px',
        margin: '0 auto',
        alignItems: 'flex-start',
      }}>

        {/* Column 1 — Brand */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '48px'}}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/assets/logo image.svg" 
              alt="Studio Aashraya Logo Mark" 
              style={{ height: '36px', width: 'auto', objectFit: 'contain', filter: 'invert(1) brightness(1.5)' }}
            />
            <img 
              src="/assets/logo text.svg" 
              alt="Studio Aashraya" 
              style={{ height: '32px', width: 'auto', objectFit: 'contain', filter: 'invert(1) brightness(1.5)', marginTop: '2px' }}
            />
          </div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7,
            margin: 0,
          }}>
            Rooted in earth, reaching for the sky. We design spaces that honor tradition and embrace the future of sustainable living.
          </p>
        </div>

        {/* Column 2 — Contact */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '48px'}}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.40)',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            Contact
          </p>
          <a href="mailto:studioaashraya@gmail.com" style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            color: 'rgba(255,255,255,0.75)',
            textDecoration: 'none',
          }}>
            studioaashraya@gmail.com
          </a>
          <a href="tel:+919473031016" style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            color: 'rgba(255,255,255,0.75)',
            textDecoration: 'none',
          }}>
            +91 94730 31016
          </a>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            color: 'rgba(255,255,255,0.75)',
            margin: 0,
            lineHeight: 1.6,
          }}>
            D103, Road 6B, Rajiv Nagar,<br />Patna, Bihar, India
          </p>
        </div>

        {/* Column 3 — Planning Tools & Follow */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.40)',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              Planning Tools
            </p>
            <Link href="/calculators/site-feasibility" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: 'rgba(255,255,255,0.85)',
              textDecoration: 'none',
              fontWeight: 500,
            }}>
              Site Feasibility Calculator
            </Link>
            <Link href="/calculators/cost-estimator" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: 'rgba(255,255,255,0.75)',
              textDecoration: 'none',
            }}>
              Cost Estimator
            </Link>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.40)',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              Follow
            </p>
            {['Instagram', 'LinkedIn', 'Pinterest'].map(platform => (
              <a key={platform} href="#" style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
              }}>
                {platform}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Divider */}
      <div style={{
        maxWidth: '1100px',
        margin: '48px auto 0',
        borderTop: '1px solid rgba(255,255,255,0.10)',
        paddingTop: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: 'rgba(255,255,255,0.30)',
          margin: 0,
          letterSpacing: '0.05em',
        }}>
          © 2026 STUDIO AASHRAYA. ALL RIGHTS RESERVED.
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: 'rgba(255,255,255,0.30)',
          margin: 0,
          letterSpacing: '0.05em',
        }}>
          ARCHITECTURE. INTERIORS. VERNACULAR DESIGN.
        </p>
      </div>

    </footer>
  )
}
