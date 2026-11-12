import React from 'react'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ThreeUp } from '@/components/ui/ThreeUp'
import { CtaBand } from '@/components/ui/CtaBand'

export const metadata: Metadata = {
  title: 'About the Studio | Studio Aashraya',
  description:
    'A COA-registered architect with a B.Arch from IIT BHU Varanasi, leading design and construction under one roof in Gurugram, Delhi NCR and Bihar.',
  alternates: {
    canonical: `${siteConfig.siteUrl}/about`,
  },
}

export default function AboutPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
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

  const pillars = [
    {
      title: 'Performance',
      body: 'Structure, climate, waterproofing and maintenance are design inputs from the first sketch.',
    },
    {
      title: 'Craft',
      body: 'Materials are chosen to age well and detailed so they can be built as drawn.',
    },
    {
      title: 'Proof',
      body: 'Every critical stage leaves a record the client can read.',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-8 pb-12">
          <Breadcrumb items={breadcrumbItems} className="mb-6" />

                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[0.92] mb-6 max-w-4xl">
            The architect you deal with is the one who builds.
          </h1>

          {/* Promise Strip */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="font-mono text-xs px-2.5 py-1 bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] font-semibold">
              On time, or 10% back
            </span>
            <span className="font-mono text-xs px-2.5 py-1 bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] font-semibold">
              15-year warranty
            </span>
            <span className="font-mono text-xs px-2.5 py-1 bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] font-semibold">
              IIT-led · COA-registered
            </span>
          </div>
        </div>

        {/* Narrative & Photo / Fact Panel */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Story */}
            <div className="lg:col-span-7 space-y-6 font-sans text-base md:text-lg text-[var(--muted)] leading-relaxed">
              <p className="text-[var(--ink)] font-medium">
                Anumeh Prakhar is a COA-registered architect with a B.Arch from IIT BHU Varanasi. The studio has designed more than 50 projects and built more than 30.
              </p>
              <p>
                Earlier work includes private homes in Patna and Almora, port and harbour projects, and site-quality training for engineers across more than 30 sites. A certificate in data science for architecture, engineering and construction shapes how the studio measures, records and reports.
              </p>
              <p>
                The studio grew out of climate-responsive homes in Bihar: courtyards, shaded verandas, brick screens and thermal mass. That thinking now informs homes in Delhi NCR, where summers are hotter and winters carry smog.
              </p>
            </div>

            {/* Fact Panel */}
            <div className="lg:col-span-5 border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 space-y-6">
              <span className="font-mono text-xs text-[var(--accent-text)] font-bold block">
                Studio Facts
              </span>

              <div className="divide-y divide-[var(--line)] font-sans text-sm">
                <div className="py-3">
                  <span className="font-mono text-xs text-[var(--muted)] block">Qualification</span>
                  <span className="font-semibold text-[var(--ink)]">B.Arch, IIT BHU Varanasi (2024)</span>
                </div>
                <div className="py-3">
                  <span className="font-mono text-xs text-[var(--muted)] block">Registration</span>
                  <span className="font-semibold text-[var(--ink)]">COA-registered architect</span>
                </div>
                <div className="py-3">
                  <span className="font-mono text-xs text-[var(--muted)] block">Specialization</span>
                  <span className="font-semibold text-[var(--ink)]">Data Science for AEC certificate</span>
                </div>
                <div className="py-3">
                  <span className="font-mono text-xs text-[var(--muted)] block">Track Record</span>
                  <span className="font-semibold text-[var(--ink)]">50+ projects designed · 30+ constructed</span>
                </div>
                <div className="py-3">
                  <span className="font-mono text-xs text-[var(--muted)] block">Primary Office</span>
                  <span className="font-semibold text-[var(--ink)]">{siteConfig.address}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mid CTA */}
        <CtaBand id="about-mid" variant="tech" />

        {/* ThreeUp: How We Work */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <div className="mb-10">
                        <h2 className="font-display text-3xl md:text-4xl font-extrabold">
              How we work
            </h2>
          </div>

          <ThreeUp items={pillars} />
        </section>

        {/* End CTA */}
        <CtaBand id="about-end" variant="plot-check" headline="Talk to the architect." body="Send your plot details. We review what the plot allows and answer your questions directly." />
      </article>
    </>
  )
}
