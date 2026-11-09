import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Faq } from '@/components/ui/Faq'
import { CtaBand } from '@/components/ui/CtaBand'
import { nriFaqs, generateFaqSchema } from '@/lib/faq-data'
import { siteConfig } from '@/lib/site'
import { ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NRI Home Construction in Gurugram and Delhi NCR | Studio Aashraya',
  description:
    'Build in Delhi NCR from abroad. Weekly video, 360° scans, a live dashboard and gate-linked payments. Studio Aashraya architect and builder.',
  alternates: {
    canonical: `${siteConfig.siteUrl}/nri`,
  },
}

export default function NriPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'NRI', href: '/nri' },
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

  const faqSchema = generateFaqSchema(nriFaqs)

  const deliverables = [
    'A named architect as your single point of contact.',
    'A weekly video walkthrough of the site.',
    '360° scans at every gate, compared with the model.',
    'A live dashboard: schedule, gate status, cost against the bill of quantities, photographs and scans.',
    'A dated photo and video archive, organised by stage.',
    'A written decision log. Every approval you give is recorded.',
    'Payments linked to stages that have passed their gate.',
    'Calls scheduled for your time zone.',
  ]

  const rhythms = [
    {
      cadence: 'Weekly',
      deliverable: 'Video walkthrough, archive update, open decisions.',
    },
    {
      cadence: 'At each gate',
      deliverable: 'Gate record, scan, walkthrough.',
    },
    {
      cadence: 'Monthly',
      deliverable: 'Cost to date against the bill of quantities and progress against the handover date.',
    },
    {
      cadence: 'At handover',
      deliverable: 'Complete handover file with as-built drawings and warranty documentation.',
    },
  ]

  const prerequisites = [
    'A power of attorney or an authorised representative, if you will not sign in person.',
    'Your lawyer and tax advisor, for title, transfer and remittance questions. We coordinate with them and do not give legal or tax advice.',
  ]

  return (
    <article className="flex flex-col w-full bg-[var(--bg)] text-[var(--ink)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header & Breadcrumb */}
      <section className="pt-8 pb-12 md:pb-16 max-w-6xl mx-auto px-4 md:px-6 w-full">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        <div className="max-w-4xl">
          <Eyebrow text="For NRI families" className="mb-3" />
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[0.92] mb-6">
            Build in India without flying in for every decision.
          </h1>
          <p className="font-sans text-lg md:text-xl text-[var(--muted)] leading-relaxed">
            You should be able to see your house from wherever you are. This is how.
          </p>
        </div>
      </section>

      {/* Top CTA */}
      <CtaBand id="nri-top" variant="nri" />

      {/* What You Receive */}
      <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="mb-10">
            <Eyebrow text="Reporting System" className="mb-2" />
            <h2 className="font-display text-3xl md:text-4xl font-extrabold">
              What you receive
            </h2>
          </div>

          <div className="border-t-[1.5px] border-[var(--ink)]">
            <ol className="divide-y divide-[var(--line)] list-none p-0 m-0">
              {deliverables.map((item, idx) => (
                <li key={idx} className="py-5 flex items-start gap-4">
                  <span className="font-mono text-xs font-semibold text-[var(--accent)] pt-0.5 shrink-0">
                    0{idx + 1}
                  </span>
                  <span className="font-sans text-base md:text-lg font-medium text-[var(--ink)] leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Reporting Rhythm Table */}
      <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="mb-10">
            <Eyebrow text="Schedule" className="mb-2" />
            <h2 className="font-display text-3xl md:text-4xl font-extrabold">
              Reporting rhythm
            </h2>
          </div>

          <div className="border-[1.5px] border-[var(--ink)] bg-[var(--surface)] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 border-b-[1.5px] border-[var(--ink)] bg-[var(--wash)] font-mono text-xs font-semibold text-[var(--muted)] p-4 sm:p-5">
              <div className="md:col-span-4">Cadence</div>
              <div className="md:col-span-8 mt-1 md:mt-0">Reporting Deliverable</div>
            </div>
            <div className="divide-y divide-[var(--line)]">
              {rhythms.map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 items-baseline">
                  <div className="md:col-span-4 font-display font-extrabold text-xl text-[var(--ink)]">
                    {row.cadence}
                  </div>
                  <div className="md:col-span-8 font-sans text-base text-[var(--muted)] leading-relaxed mt-1 md:mt-0">
                    {row.deliverable}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <CtaBand id="nri-mid" variant="nri" />

      {/* Before You Start & Backed by Guarantee */}
      <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-7">
              <Eyebrow text="Prerequisites" className="mb-2" />
              <h2 className="font-display text-3xl font-extrabold mb-4">
                Before you start
              </h2>
              <ul className="space-y-4 border-t-[1.5px] border-[var(--ink)] pt-6 list-none p-0">
                {prerequisites.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-4 border border-[var(--line)] bg-[var(--bg)]">
                    <span className="w-1.5 h-1.5 mt-2.5 bg-[var(--accent)] shrink-0 rounded-none" />
                    <p className="font-sans text-base leading-relaxed text-[var(--ink)]">
                      {req}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 p-8 border border-[var(--line)] bg-[var(--band)] text-[var(--on-band)]">
              <ShieldCheck className="w-8 h-8 text-[var(--accent)] mb-3" />
              <h3 className="font-display text-2xl font-bold mb-2">
                Backed by the guarantee
              </h3>
              <p className="font-sans text-sm text-[var(--band-muted)] leading-relaxed mb-4">
                On time, or 10% back, and a 15-year warranty from handover. Conditions are in your agreement.
              </p>
              <Link
                href="/guarantee"
                className="font-mono text-xs text-[var(--accent)] hover:underline inline-block font-semibold"
              >
                Read guarantee details →
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <div className="mb-8">
              <Eyebrow text="Questions" className="mb-2" />
              <h2 className="font-display text-3xl font-bold">
                Frequently asked questions
              </h2>
            </div>
            <Faq items={nriFaqs} />
          </div>
        </div>
      </section>

      {/* End CTA */}
      <CtaBand id="nri-end" variant="nri" />
    </article>
  )
}
