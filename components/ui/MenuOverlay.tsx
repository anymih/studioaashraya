'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/lib/site'
import { trackCTAClick, trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics'
import { Phone, MessageSquare, ArrowRight } from 'lucide-react'

export interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
  navLinks: { label: string; href: string }[]
}

export function MenuOverlay({ isOpen, onClose, navLinks }: MenuOverlayProps) {
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation"
      className="fixed inset-0 top-[57px] z-50 bg-[var(--bg)] flex flex-col justify-between overflow-y-auto border-t border-[var(--line)]"
    >
      <nav aria-label="Mobile Navigation" className="w-full divide-y divide-[var(--line)]">
        {navLinks.map((link) => {
          const isActive =
            link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href)
          return (
            <div key={link.href} className="h-[56px] flex items-center px-6">
              <Link
                href={link.href}
                onClick={onClose}
                className={`w-full flex items-center justify-between font-sans text-base ${
                  isActive
                    ? 'text-[var(--accent)] font-bold'
                    : 'text-[var(--ink)] hover:text-[var(--accent)]'
                }`}
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </Link>
            </div>
          )
        })}
        <div className="h-[56px] flex items-center px-6">
          <Link
            href="/calculators"
            onClick={onClose}
            className="w-full flex items-center justify-between font-sans text-base text-[var(--muted)] hover:text-[var(--ink)]"
          >
            <span>Tools</span>
            <ArrowRight className="w-4 h-4 opacity-40" />
          </Link>
        </div>
      </nav>

      {/* Three bottom buttons per spec: Call, WhatsApp, Start your project */}
      <div className="p-4 bg-[var(--surface)] border-t border-[var(--line)] grid grid-cols-1 gap-2.5">
        <Link
          href="/book-a-call?src=menu-sheet"
          onClick={() => {
            trackCTAClick('menu-sheet', pathname, 'menu_sheet')
            onClose()
          }}
          className="w-full h-[52px] bg-[var(--accent)] text-[var(--on-accent)] font-sans font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 select-none active:bg-[var(--ink)]"
        >
          <span>Start your project</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={`tel:${siteConfig.phone}`}
            onClick={() => {
              trackPhoneClick(pathname, 'menu_sheet')
              onClose()
            }}
            className="h-[48px] border border-[var(--line)] flex items-center justify-center gap-2 font-mono text-xs uppercase text-[var(--ink)] select-none hover:bg-[var(--wash)]"
          >
            <Phone className="w-4 h-4 text-[var(--accent)]" />
            <span>Call</span>
          </a>

          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackWhatsAppClick(pathname, 'menu_sheet')
              onClose()
            }}
            className="h-[48px] border border-[var(--line)] flex items-center justify-center gap-2 font-mono text-xs uppercase text-[var(--ink)] select-none hover:bg-[var(--wash)]"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp</span>
          </a>
        </div>

        <div className="pt-2 text-center">
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-mono text-xs text-[var(--muted)] hover:text-[var(--ink)]"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>
    </div>
  )
}

export default MenuOverlay
