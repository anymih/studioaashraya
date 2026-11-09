import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SectionHead } from '@/components/ui/SectionHead'
import CtaBand from '@/components/ui/CtaBand'
import { areasData } from '@/lib/areas-data'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Where We Build: Gurugram, Delhi, Bihar & Uttarakhand | Studio Aashraya',
  description:
    'Private homes, villas, farmhouses and redevelopments designed and built under one accountable roof across Delhi NCR, Bihar and Uttarakhand.',
  alternates: {
    canonical: `${siteConfig.siteUrl}/areas`,
  },
}

export default function AreasIndexPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Areas' },
  ]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Areas',
        item: `${siteConfig.siteUrl}/areas`,
      },
    ],
  }

  const liveAreas = areasData.filter((a) => a.live)

  return (
    <div className="flex flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header & Breadcrumb */}
      <section className="pt-8 pb-12 md:pb-16 border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="wrap">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />
          <div className="max-w-3xl">
            <SectionHead
              eyebrow="Geography"
              title="Where we build."
              lead="Architectural design, municipal approvals, and turnkey construction managed under one accountable agreement."
              className="mb-0"
            />
          </div>
        </div>
      </section>

      {/* Top CTA */}
      <CtaBand variant="plot-check" ctaId="areas_index_top" />

      {/* Areas Grid (Delhi NCR first) */}
      <section className="py-16 md:py-24 border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {liveAreas.map((area) => (
              <article
                key={area.slug}
                className="border-[1.5px] border-[var(--ink)] p-8 bg-[var(--bg)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="font-mono text-xs text-[var(--accent)] font-semibold">
                      {area.region}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--muted)]">
                      {area.tier === 'primary' ? 'Primary Focus' : 'Established Work'}
                    </span>
                  </div>
                  <h2 className="font-display font-extrabold text-2xl md:text-3xl text-[var(--ink)] mb-3">
                    {area.h1}
                  </h2>
                  <p className="font-sans text-base text-[var(--muted)] leading-relaxed mb-6">
                    {area.lead}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between">
                  <Link
                    href={`/areas/${area.slug}`}
                    className="font-mono text-xs text-[var(--ink)] font-semibold hover:text-[var(--accent)]"
                  >
                    View location details &rarr;
                  </Link>
                  <Link
                    href={`/book-a-call?src=areas_${area.slug}`}
                    className="font-mono text-xs text-[var(--accent)] font-semibold hover:underline"
                  >
                    Free plot check &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CtaBand variant="plot-check" ctaId="areas_index_end" />
    </div>
  )
}
