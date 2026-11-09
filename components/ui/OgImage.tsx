import React from 'react'

export interface OgImageProps {
  title: string
  subtitle?: string
}

export function OgImage({
  title,
  subtitle = 'IIT-Led Architecture & Turnkey Construction · Gurugram, Delhi NCR',
}: OgImageProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px',
        backgroundColor: '#E8E9E4',
        color: '#141A17',
        fontFamily: 'sans-serif',
        backgroundImage:
          'linear-gradient(#DEE0D9 1px, transparent 1px), linear-gradient(90deg, #DEE0D9 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    >
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '16px', height: '16px', backgroundColor: '#C2410C' }} />
        <span
          style={{
            fontSize: '28px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: '',
          }}
        >
          Studio Aashraya
        </span>
      </div>

      {/* Main Title */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '960px' }}>
        <h1
          style={{
            fontSize: '64px',
            fontWeight: 800,
            textTransform: '',
            lineHeight: 1.05,
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: '22px',
            color: '#59615C',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Footer Promise Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          borderTop: '2px solid #C4C8BF',
          paddingTop: '24px',
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: '',
          color: '#141A17',
        }}
      >
        <span>On time, or 10% back</span>
        <span>·</span>
        <span>15-Year Warranty</span>
        <span>·</span>
        <span>IIT-Led & COA-Registered</span>
      </div>
    </div>
  )
}

export default OgImage
