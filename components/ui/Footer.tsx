import React from 'react'
import Link from 'next/link'
import { siteConfig } from '@/lib/site'
import { Phone, MessageSquare, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] pt-12 md:pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
        {/* Col 1: Studio */}
        <div className="space-y-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display font-extrabold text-[22px] leading-none text-[var(--ink)] no-underline select-none"
          >
            <i className="block w-3 h-3 bg-[var(--accent)] shrink-0 not-italic" aria-hidden="true" />
            <span>Studio Aashraya</span>
          </Link>
          <p className="font-sans text-sm text-[var(--muted)] leading-relaxed max-w-[32ch]">
            IIT-led architecture and construction for private homes in Gurugram and Delhi NCR. On time, or 10% back. 15-year warranty.
          </p>
          <div className="space-y-2 pt-2">
            <Link
              href="/guarantee"
              className="block font-mono text-xs text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
            >
              → On-Time Guarantee & Warranty
            </Link>
            <Link
              href="/technology"
              className="block font-mono text-xs text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
            >
              → Construction Technology
            </Link>
          </div>
        </div>

        {/* Col 2: Services */}
        <div>
          <span className="block font-mono text-xs text-[var(--muted)] mb-4">
            Services
          </span>
          <ul className="space-y-2.5 font-sans text-sm">
            <li>
              <Link href="/services/buildability" className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                Free Plot Check & Buildability Report
              </Link>
            </li>
            <li>
              <Link href="/services/design-build" className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                Turnkey Design and Build
              </Link>
            </li>
            <li>
              <Link href="/services/nri-remote-build" className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                NRI Remote Build Management
              </Link>
            </li>
            <li>
              <Link href="/services/redevelopment" className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                House Redevelopment & Difficult Sites
              </Link>
            </li>
            <li>
              <Link href="/method" className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                Our Method (8 Stages, 4 Gates)
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Areas & Tools */}
        <div>
          <span className="block font-mono text-xs text-[var(--muted)] mb-4">
            Areas & Tools
          </span>
          <ul className="space-y-2.5 font-sans text-sm mb-6">
            <li>
              <Link href="/areas/gurugram" className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                Gurugram (Focus Area)
              </Link>
            </li>
            <li>
              <Link href="/areas/delhi" className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                Delhi NCR
              </Link>
            </li>
            <li>
              <Link href="/areas/patna" className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                Patna & Bihar
              </Link>
            </li>
            <li>
              <Link href="/areas/almora" className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                Almora & Uttarakhand
              </Link>
            </li>
          </ul>
          <span className="block font-mono text-xs text-[var(--muted)] mb-2">
            Client Tools
          </span>
          <ul className="space-y-2 font-sans text-sm">
            <li>
              <Link href="/calculators" className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                All Calculators & Tools
              </Link>
            </li>
            <li>
              <Link href="/calculators/site-feasibility" className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                Site Feasibility CAD
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact & Locations */}
        <div>
          <span className="block font-mono text-xs text-[var(--muted)] mb-4">
            Contact
          </span>
          <div className="space-y-3 font-sans text-sm text-[var(--muted)] mb-4">
            <div className="flex items-start gap-2 text-[var(--ink)]">
              <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{siteConfig.address}</p>
                <a
                  href={siteConfig.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--accent)] hover:underline inline-block mt-0.5"
                >Get directions ↗</a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <a href={`tel:${siteConfig.phone}`} className="text-[var(--ink)] hover:text-[var(--accent)]">
                {siteConfig.phoneDisplay}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--ink)] hover:text-[var(--accent)]"
              >WhatsApp the architect</a>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="text-[var(--ink)] hover:text-[var(--accent)]">
                {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--line)] font-sans text-xs text-[var(--muted)] space-y-1">
            <p><b className="text-[var(--ink)]">Patna Studio:</b> D103, Road 6B, Rajiv Nagar, Patna 800016</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 border-t border-[var(--line)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--muted)]">
        <div>
          <span>COA-registered architect</span> · <span>© 2026 Studio Aashraya.</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/about" className="hover:text-[var(--ink)]">About</Link>
          <Link href="/method" className="hover:text-[var(--ink)]">Method</Link>
          <Link href="/technology" className="hover:text-[var(--ink)]">Technology</Link>
          <Link href="/guarantee" className="hover:text-[var(--ink)]">Guarantee</Link>
        </div>
      </div>
    </footer>
  )
}
