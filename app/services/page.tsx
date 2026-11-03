import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CtaBand } from '@/components/ui/CtaBand'
import { servicesData } from '@/lib/services-data'
import { siteConfig } from '@/lib/site'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Turnkey Architectural & Construction Services | Studio Aashraya',
  description:
    'One agreement for design, structure, approvals, construction and interiors with written quality gates. Architecture and turnkey build in Gurugram, Delhi NCR and Bihar.',
  alternates: {
    canonical: `${siteConfig.siteUrl}/services`,
  },
}

export default function ServicesPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
  ]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${siteConfig.siteUrl}${item.href}`,
    })),
  }

  return (
    <article className="flex flex-col w-full bg-[var(--bg)] text-[var(--ink)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <section className="pt-8 pb-12 md:pb-16 max-w-6xl mx-auto px-4 md:px-6 w-full">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        <div className="max-w-4xl">
          <Eyebrow text="Services" className="mb-3" />
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-[0.92] mb-6">
            One studio. Complete responsibility.
          </h1>
          <p className="font-sans text-lg md:text-xl text-[var(--muted)] leading-relaxed">
            Four ways to work with Studio Aashraya. Most clients begin with a free plot check.
          </p>
        </div>
      </section>

      {/* Top CTA */}
      <CtaBand id="services-top" variant="plot-check" />

      {/* Services Grid (4 Cards) */}
      <section className="py-16 md:py-20 max-w-6xl mx-auto px-4 md:px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service, idx) => (
            <article
              key={service.slug}
              className="border border-[var(--line)] p-8 bg-[var(--surface)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold">
                    Service 0{idx + 1}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
                    Turnkey
                  </span>
                </div>
                <h2 className="font-display font-extrabold uppercase text-2xl sm:text-3xl text-[var(--ink)] mb-3">
                  {service.title}
                </h2>
                <p className="font-sans text-base text-[var(--muted)] leading-relaxed mb-6">
                  {service.lead}
                </p>

                <div className="border-t border-[var(--line)] pt-4 mb-6">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink)] font-semibold block mb-2">
                    What you receive:
                  </span>
                  <ul className="space-y-1.5 list-none p-0 m-0">
                    {service.receive.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm font-sans text-[var(--muted)]">
                        <span className="w-1.5 h-1.5 mt-2 bg-[var(--accent)] shrink-0 rounded-none" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--line)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <Link
                  href={`/services/${service.slug}`}
                  className="font-mono text-xs uppercase tracking-wider text-[var(--ink)] font-semibold hover:text-[var(--accent)] flex items-center gap-1"
                >
                  <span>View service details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/book-a-call?src=svc-${service.slug}`}
                  className="px-4 py-2.5 bg-[var(--accent)] text-[var(--on-accent)] font-sans font-bold text-xs uppercase tracking-wider text-center"
                >
                  Consult
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* End CTA */}
      <CtaBand id="services-end" variant="plot-check" />
    </article>
  )
}
