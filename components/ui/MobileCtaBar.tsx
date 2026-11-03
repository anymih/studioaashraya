'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/lib/site'
import { trackCTAClick, trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics'
import { Phone, MessageSquare } from 'lucide-react'

export function MobileCtaBar() {
  const pathname = usePathname()
  const isBookPage = pathname === '/book-a-call'
  const [isInputFocused, setIsInputFocused] = useState(false)

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        setIsInputFocused(true)
      }
    }

    const handleFocusOut = () => {
      setIsInputFocused(false)
    }

    window.addEventListener('focusin', handleFocusIn)
    window.addEventListener('focusout', handleFocusOut)

    return () => {
      window.removeEventListener('focusin', handleFocusIn)
      window.removeEventListener('focusout', handleFocusOut)
    }
  }, [])

  if (isInputFocused) {
    return null
  }

  return (
    <nav
      aria-label="Quick contact actions"
      className="fixed bottom-0 left-0 right-0 z-40 h-[56px] bg-[var(--bg)] border-t-[1.5px] border-[var(--ink)] flex items-stretch min-[900px]:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Call Button (25% or 50% on /book-a-call) */}
      <a
        href={`tel:${siteConfig.phone}`}
        onClick={() => trackPhoneClick(pathname, 'mobile_cta_bar')}
        className={`${isBookPage ? 'w-1/2' : 'w-[25%]'} flex items-center justify-center gap-1.5 border-r border-[var(--line)] font-mono text-xs uppercase tracking-wider text-[var(--ink)] active:bg-[var(--wash)] select-none min-h-[48px]`}
      >
        <Phone className="w-4 h-4 text-[var(--accent)]" />
        <span>Call</span>
      </a>

      {/* WhatsApp Button (25% or 50% on /book-a-call) */}
      <a
        href={siteConfig.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick(pathname, 'mobile_cta_bar')}
        className={`${isBookPage ? 'w-1/2' : 'w-[25%]'} flex items-center justify-center gap-1.5 ${!isBookPage ? 'border-r border-[var(--line)]' : ''} font-mono text-xs uppercase tracking-wider text-[var(--ink)] active:bg-[var(--wash)] select-none min-h-[48px]`}
      >
        <MessageSquare className="w-4 h-4 text-[#25D366]" />
        <span>WhatsApp</span>
      </a>

      {/* Start your project Button (50%, accent fill; Hidden on /book-a-call) */}
      {!isBookPage && (
        <Link
          href="/book-a-call?src=bar-start"
          onClick={() => trackCTAClick('bar-start', pathname, 'mobile_cta_bar')}
          className="w-[50%] flex items-center justify-center px-2 bg-[var(--accent)] text-[var(--on-accent)] font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider active:bg-[var(--ink)] select-none text-center min-h-[48px]"
        >
          <span>Start your project</span>
        </Link>
      )}
    </nav>
  )
}

export default MobileCtaBar
