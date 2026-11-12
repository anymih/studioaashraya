import React from 'react'
import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { GateRecord } from '@/components/ui/GateRecord'
import { CtaBand } from '@/components/ui/CtaBand'
import { MethodStageSection } from '@/components/method/MethodStageSection'
import { verifiableArtifacts } from '@/lib/method-data'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Our Method: Eight Stages, Four Gates | Studio Aashraya',
  description:
    'How a home goes from plot review to handover, with written gates and instruments at each. Studio Aashraya architect and builder.',
  alternates: {
    canonical: `${siteConfig.siteUrl}/method`,
  },
}

export default function MethodPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Method', href: '/method' },
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
        name: 'Method',
        item: `${siteConfig.siteUrl}/method`,
      },
    ],
  }

  return (
    <article className="flex flex-col w-full bg-[var(--bg)] text-[var(--ink)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header & Breadcrumb */}
      <section className="pt-8 pb-12 md:pb-16 max-w-6xl mx-auto px-4 md:px-6 w-full">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        <div className="max-w-4xl">
                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[0.92] mb-6">
            Eight stages. Four gates.
          </h1>
          <p className="font-sans text-lg md:text-xl text-[var(--muted)] leading-relaxed">
            A gate is a written check by the architect, with instruments. Work on the next stage does not start until the gate record is signed. Clients abroad receive each gate record with photographs, a 360° scan and a walkthrough.
          </p>
        </div>
      </section>

      {/* Expandable Stage List on Dark Band */}
      <section className="py-16 md:py-24 bg-[var(--band)] text-[var(--on-band)] border-b border-[var(--line)]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-xs text-[var(--band-muted)] font-semibold block mb-2">
                Construction Sequence
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl text-[var(--on-band)]">
                The Eight Stages
              </h2>
            </div>
            <p className="font-mono text-xs text-[var(--band-muted)] max-w-[40ch]">
              Expand any stage to see what we do, what you receive, and the checks and instruments used.
            </p>
          </div>

          <MethodStageSection />
        </div>
      </section>

      {/* Mid CTA Band */}
      <CtaBand id="method-mid" variant="guarantee" />

      {/* What You Can Verify & Sample Gate Record */}
      <section className="py-16 md:py-24 border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div>
                                <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-3">
                  What you can verify
                </h2>
                <p className="font-sans text-base text-[var(--muted)] leading-relaxed mb-6">
                  Every stage leaves concrete, permanent records that remain in your project archive.
                </p>
              </div>

              <ul className="border-t-[1.5px] border-[var(--ink)] divide-y divide-[var(--line)] list-none p-0 m-0">
                {verifiableArtifacts.map((item, idx) => (
                  <li key={idx} className="py-3.5 flex items-center justify-between text-base font-sans font-medium text-[var(--ink)]">
                    <span>{item}</span>
                    <span className="font-mono text-xs text-[var(--accent-text)] font-semibold">0{idx + 1}</span>
                  </li>
                ))}
              </ul>
              <p className="font-mono text-xs text-[var(--muted)] pt-4">
                Inspection records are signed on site with instruments before work on subsequent stages proceeds.
              </p>
            </div>

            <div className="lg:col-span-7">
              <GateRecord
                project="—"
                gate="Gate 1: Foundation and first pour"
                date="—"
                checkedBy="Anumeh Prakhar, Lead Architect & Builder"
                items={[
                  'Excavation level and soil at founding level verified',
                  'Reinforcement checked against bar schedule',
                  'Cover blocks and rebar spacers positioned',
                  'Concrete mix confirmed and cube samples taken',
                  '360° LiDAR scan compared with the BIM model',
                ]}
                result="Passed. Signed checklist, scan data and dated photographs archived."
                caption="Sample format"
              />
            </div>
          </div>
        </div>
      </section>

      {/* End CTA Band */}
      <CtaBand id="method-end" variant="plot-check" />
    </article>
  )
}
