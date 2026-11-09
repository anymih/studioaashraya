'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/lib/site'
import { trackCTAClick, trackPhoneClick, trackThemeToggle } from '@/lib/analytics'
import { Phone, ArrowRight, X, Menu } from 'lucide-react'
import { MenuOverlay } from './MenuOverlay'

export default function Header() {
  const pathname = usePathname()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem('sa-theme')
        if (stored === 'light' || stored === 'dark') {
          setTheme(stored)
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          setTheme('dark')
        }
      } catch {
        // fallback
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    try {
      document.documentElement.setAttribute('data-theme', nextTheme)
      localStorage.setItem('sa-theme', nextTheme)
    } catch {
      // ignore
    }
    trackThemeToggle(nextTheme)
  }

  const navLinks = [
    { label: 'Technology', href: '/technology' },
    { label: 'Method', href: '/method' },
    { label: 'Homes', href: '/projects' },
    { label: 'Guarantee', href: '/guarantee' },
    { label: 'NRI clients', href: '/nri' },
    { label: 'About', href: '/about' },
    { label: 'Tools', href: '/calculators' },
  ]

  const handleHeaderCta = (placement: string) => {
    trackCTAClick(placement, pathname, 'header')
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-30 bg-[var(--bg)] border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex items-center justify-between gap-4 py-3">
        {/* Brand wordmark with 12px accent square */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display font-extrabold text-[24px] sm:text-[26px] leading-none text-[var(--ink)] no-underline select-none shrink-0"
          aria-label="Studio Aashraya, home"
        >
          <i className="block w-3 h-3 bg-[var(--accent)] shrink-0 not-italic" aria-hidden="true" />
          <span>Studio Aashraya</span>
        </Link>

        {/* Desktop Nav (900px and up) */}
        <nav aria-label="Primary" className="hidden min-[900px]:block">
          <ul className="flex items-center gap-5 xl:gap-6 text-[14px] font-sans">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`no-underline transition-colors py-1 ${
                      isActive
                        ? 'text-[var(--ink)] font-semibold border-b-2 border-[var(--accent)]'
                        : 'text-[var(--muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Email link on desktop */}
          <a
            href={`mailto:${siteConfig.email}`}
            className="hidden 2xl:flex items-center gap-1.5 font-mono text-xs text-[var(--muted)] hover:text-[var(--ink)] transition-colors mr-1"
          >
            <span>{siteConfig.email}</span>
          </a>

          {/* Phone link on desktop */}
          <a
            href={`tel:${siteConfig.phone}`}
            onClick={() => trackPhoneClick(pathname, 'header_phone')}
            className="hidden xl:flex items-center gap-1.5 font-mono text-xs text-[var(--muted)] hover:text-[var(--ink)] transition-colors mr-1"
          >
            <Phone className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>{siteConfig.phoneDisplay}</span>
          </a>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className="font-mono font-medium text-xs px-2.5 py-2 border border-[var(--line)] bg-transparent text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--ink)] transition-colors cursor-pointer select-none rounded-none"
            aria-label="Switch colour theme"
          >
            {theme === 'dark' ? 'Light' : 'Theme'}
          </button>

          {/* Desktop Primary CTA: "Book a consultation" */}
          <Link
            href="/book-a-call?src=header"
            onClick={() => handleHeaderCta('header')}
            className="hidden min-[900px]:inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[var(--accent)] text-[var(--on-accent)] font-sans font-semibold text-xs hover:bg-[var(--ink)] transition-colors select-none text-center"
          >
            <span>Book a consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile 44px Menu Button (under 900px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-[900px]:hidden w-[44px] h-[44px] border border-[var(--line)] text-[var(--ink)] flex items-center justify-center"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Full-screen Menu Sheet Overlay */}
      <MenuOverlay
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </header>
  )
}
