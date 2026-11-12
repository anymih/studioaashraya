'use client'

import React from 'react'
import Link from 'next/link'
import { siteConfig } from '@/lib/site'
import { trackCTAClick, trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics'
import { Phone, MessageSquare, ArrowRight } from 'lucide-react'

export type CtaBandVariant =
  | 'plot-check'
  | 'guarantee'
  | 'nri'
  | 'tech'
  | 'projects'
  | 'old-house'

interface CtaBandConfig {
  headline: string
  body: string
  buttonText: string
}

const variantConfigs: Record<CtaBandVariant, CtaBandConfig> = {
  'plot-check': {
    headline: 'Get a free plot check.',
    body: 'Send your plot details. We reply in writing with setbacks, coverage, FAR and the main risks, within 2 working days.',
    buttonText: 'Get my plot check',
  },
  guarantee: {
    headline: 'On time, or 10% back.',
    body: 'Your handover date goes into the agreement. Put us to it.',
    buttonText: 'Start my project',
  },
  nri: {
    headline: 'Building from abroad?',
    body: 'Book a call in your time zone.',
    buttonText: 'Book my call',
  },
  tech: {
    headline: 'See the instruments on your own plot.',
    body: 'BIM, scans, lab tests and a live dashboard, applied to your build.',
    buttonText: 'Book a consultation',
  },
  projects: {
    headline: 'Want a home like this on your plot?',
    body: 'Tell us the plot. We tell you what it can hold.',
    buttonText: 'Get my plot check',
  },
  'old-house': {
    headline: 'Own an old house?',
    body: 'We survey it first, then price your options to retain, strengthen or rebuild.',
    buttonText: 'Book a survey call',
  },
}

interface CtaBandProps {
  id?: string
  ctaId?: string
  variant?: CtaBandVariant
  headline?: string
  body?: string
  buttonText?: string
  className?: string
  dark?: boolean
}

export function CtaBand({
  id,
  ctaId,
  variant = 'plot-check',
  headline,
  body,
  buttonText,
  className = '',
  dark = false,
}: CtaBandProps) {
  const finalId = ctaId || id || 'cta-band'
  const config = variantConfigs[variant]
  const finalHeadline = headline || config.headline
  const finalBody = body || config.body
  const finalButtonText = buttonText || config.buttonText

  const handlePrimaryClick = () => {
    trackCTAClick(finalId, typeof window !== 'undefined' ? window.location.pathname : '', 'cta_band', variant)
  }

  const handlePhoneClick = () => {
    trackPhoneClick(typeof window !== 'undefined' ? window.location.pathname : '', finalId)
  }

  const handleWhatsAppClick = () => {
    trackWhatsAppClick(typeof window !== 'undefined' ? window.location.pathname : '', finalId)
  }

  return (
    <section
      id={finalId}
      className={`w-full py-12 md:py-16 px-4 md:px-8 border-y border-[var(--line)] ${
        dark
          ? 'bg-[var(--band)] text-[var(--on-band)] border-[var(--band-line)]'
          : 'bg-[var(--surface)] text-[var(--ink)]'
      } ${className}`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
        <div className="max-w-2xl">
          <h2
            className={`font-display text-3xl md:text-4xl font-bold   leading-[0.95] mb-3 ${
              dark ? 'text-[var(--on-band)]' : 'text-[var(--ink)]'
            }`}
          >
            {finalHeadline}
          </h2>
          <p
            className={`font-sans text-base md:text-lg leading-relaxed ${
              dark ? 'text-[var(--band-muted)]' : 'text-[var(--muted)]'
            }`}
          >
            {finalBody}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
          <Link
            href={`/book-a-call?src=${encodeURIComponent(finalId)}`}
            onClick={handlePrimaryClick}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[var(--accent)] text-[var(--on-accent)] font-sans font-semibold text-[15px] leading-none hover:opacity-95 transition-opacity min-h-[48px] select-none text-center"
          >
            <span>{finalButtonText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${siteConfig.phone}`}
              onClick={handlePhoneClick}
              className={`inline-flex items-center justify-center gap-2 px-4 py-4 border font-mono text-[13px] leading-none min-h-[48px] transition-colors select-none ${
                dark
                  ? 'border-[var(--band-line)] text-[var(--on-band)] hover:bg-[var(--band-line)]'
                  : 'border-[var(--line)] text-[var(--ink)] hover:bg-[var(--wash)]'
              }`}
              title="Call Studio Aashraya"
            >
              <Phone className="w-4 h-4 text-[var(--accent-text)]" />
              <span>Call</span>
            </a>

            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className={`inline-flex items-center justify-center gap-2 px-4 py-4 border font-mono text-[13px] leading-none min-h-[48px] transition-colors select-none ${
                dark
                  ? 'border-[var(--band-line)] text-[var(--on-band)] hover:bg-[var(--band-line)]'
                  : 'border-[var(--line)] text-[var(--ink)] hover:bg-[var(--wash)]'
              }`}
              title="WhatsApp Studio Aashraya"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaBand
