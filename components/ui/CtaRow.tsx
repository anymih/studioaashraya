'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { trackCTAClick, trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics'
import { siteConfig } from '@/lib/site'
import { ArrowRight, Phone, MessageSquare } from 'lucide-react'

export interface CtaRowProps {
  headline: string
  buttonText: string
  ctaId: string
  secondaryLinks?: boolean
  className?: string
}

export function CtaRow({
  headline,
  buttonText,
  ctaId,
  secondaryLinks = true,
  className = '',
}: CtaRowProps) {
  const pathname = usePathname()

  return (
    <div
      className={`border-[1.5px] border-[var(--ink)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${className}`}
    >
      <div className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)]">
        {headline}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Link
          href={`/book-a-call?src=${encodeURIComponent(ctaId)}`}
          onClick={() => trackCTAClick(ctaId, pathname, 'cta_row')}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--accent)] text-[var(--on-accent)] font-sans font-semibold text-sm hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors select-none text-center min-h-[48px]"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        {secondaryLinks && (
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <a
              href={`tel:${siteConfig.phone}`}
              onClick={() => trackPhoneClick(pathname, ctaId)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 border border-[var(--line)] bg-transparent text-[var(--ink)] font-mono text-xs hover:bg-[var(--wash)] transition-colors min-h-[48px]"
              aria-label="Call Studio Aashraya"
            >
              <Phone className="w-3.5 h-3.5 text-[var(--accent-text)]" />
              <span>Call</span>
            </a>
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(pathname, ctaId)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 border border-[var(--line)] bg-transparent text-[var(--ink)] font-mono text-xs hover:bg-[var(--wash)] transition-colors min-h-[48px]"
              aria-label="WhatsApp Studio Aashraya"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default CtaRow
