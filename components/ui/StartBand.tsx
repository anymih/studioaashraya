'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { trackCTAClick, trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics'
import { siteConfig } from '@/lib/site'
import { Phone, MessageSquare, ArrowRight } from 'lucide-react'

export interface StartBandProps {
  headline?: string
  promiseLine?: string
  buttonText?: string
  ctaId?: string
  className?: string
}

export function StartBand({
  headline = 'Get a free plot check.',
  promiseLine = 'On time, or 10% back · 15-year warranty · In writing',
  buttonText = 'Get my plot check',
  ctaId = 'closing-start-band',
  className = '',
}: StartBandProps) {
  const pathname = usePathname()

  return (
    <section
      aria-label="Call to action"
      className={`w-full bg-[var(--accent)] text-[var(--on-accent)] py-14 sm:py-20 border-t-[1.5px] border-[var(--ink)] ${className}`}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
          <h2 className="font-display font-extrabold text-[clamp(36px,6vw,72px)] leading-[0.92] uppercase tracking-tight text-[var(--on-accent)] mb-3">
            {headline}
          </h2>
          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[var(--on-accent)]/90 mb-8">
            {promiseLine}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <Link
            href={`/book-a-call?src=${encodeURIComponent(ctaId)}`}
            onClick={() => trackCTAClick(ctaId, pathname, 'start_band')}
            className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[var(--on-accent)] text-[var(--accent)] font-sans font-bold text-sm sm:text-base uppercase tracking-wider hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors select-none text-center min-h-[48px]"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick(pathname, ctaId)}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 border-[1.5px] border-[var(--on-accent)] bg-transparent text-[var(--on-accent)] font-mono text-xs uppercase tracking-wider hover:bg-[var(--on-accent)]/10 transition-colors select-none min-h-[48px]"
          >
            <MessageSquare className="w-4 h-4 text-[var(--on-accent)]" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`tel:${siteConfig.phone}`}
            onClick={() => trackPhoneClick(pathname, ctaId)}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 border-[1.5px] border-[var(--on-accent)] bg-transparent text-[var(--on-accent)] font-mono text-xs uppercase tracking-wider hover:bg-[var(--on-accent)]/10 transition-colors select-none min-h-[48px]"
          >
            <Phone className="w-4 h-4 text-[var(--on-accent)]" />
            <span>Call {siteConfig.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default StartBand
