'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Site Feasibility', href: '/calculators/site-feasibility' },
  { label: 'About', href: '/about' },
  { label: 'Calculators', href: '/calculators/cost-estimator' },
  { label: 'Book a Call', href: '/book-a-call' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-40 bg-bg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img 
            src="/assets/logo image.svg" 
            alt="Studio Aashraya Logo Mark" 
            className="h-10 w-auto object-contain"
          />
          <img 
            src="/assets/logo text.svg" 
            alt="Studio Aashraya" 
            className="h-9 w-auto object-contain mt-0.5"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 ml-auto">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            
            if (link.label === 'Book a Call') {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-primary text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors ml-4"
                >
                  {link.label}
                </Link>
              )
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all ${
                  active
                    ? 'text-primary underline underline-offset-8 decoration-2'
                    : 'text-muted hover:text-primary hover:underline hover:underline-offset-8'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-primary ml-auto"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-bg border-t border-border px-4 pb-4 shadow-lg">
          {navLinks.map((link) => {
            const active = isActive(link.href)

            if (link.label === 'Book a Call') {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block mt-4 text-center bg-primary text-white text-sm font-medium py-3 rounded-full transition-colors"
                >
                  {link.label}
                </Link>
              )
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 text-sm font-medium border-b border-border/50 ${
                  active
                    ? 'text-primary font-bold'
                    : 'text-muted'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
