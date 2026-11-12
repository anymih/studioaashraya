import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/site'
import { CtaBand } from '@/components/ui/CtaBand'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Notice } from '@/components/ui/Notice'
import { ArrowRight, Compass, Ruler, Calculator } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Client Tools & Calculators | Studio Aashraya',
  description:
    'Free site feasibility, FAR checker, and construction cost estimators developed by Studio Aashraya. Built for plot owners in Delhi NCR and Bihar.',
  alternates: {
    canonical: `${siteConfig.siteUrl}/calculators`,
  },
}

export default function CalculatorsPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Tools', href: '/calculators' },
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

  const tools = [
    {
      title: 'Site Feasibility CAD',
      href: '/calculators/site-feasibility',
      description:
        'Interactive polygon drawing tool to trace your plot, assign street frontages, and calculate the buildable footprint and setbacks in real time.',
      icon: Compass,
      coverageNotice:
        'Rules loaded: Bihar Building Bye-laws 2014. For plots in Gurugram and Delhi, we run the check by hand. Get a free plot check.',
      cta: 'Open CAD Tool',
    },
    {
      title: 'FAR & Setback Checker',
      href: '/calculators/far-checker',
      description:
        'Quick lookup for permissible Floor Area Ratio (FAR), ground coverage limits, and mandatory setbacks from plot dimensions.',
      icon: Ruler,
      coverageNotice:
        'Rules loaded: Bihar Building Bye-laws 2014. For plots in Gurugram and Delhi, we run the check by hand. Get a free plot check.',
      cta: 'Check Setbacks',
    },
    {
      title: 'Construction Cost Estimator',
      href: '/calculators/cost-estimator',
      description:
        'Calculate indicative construction budgets by built-up area, basement configuration, and finish specifications.',
      icon: Calculator,
      coverageNotice:
        'Rates loaded: Bihar tiers. For Delhi NCR we give an indicative range on request. A fixed figure always comes with a bill of quantities.',
      cta: 'Estimate Cost',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-8 pb-12">
          <Breadcrumb items={breadcrumbItems} className="mb-6" />

                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[0.92] mb-6 max-w-4xl">
            Tools
          </h1>
          <p className="font-sans text-lg md:text-xl text-[var(--muted)] max-w-3xl leading-relaxed">
            Three tools we use with clients, open to everyone.
          </p>
        </div>

        {/* Top CTA */}
        <CtaBand id="tool-index-top" variant="plot-check" />

        <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <div
                  key={tool.href}
                  className="p-8 border border-[var(--line)] bg-[var(--surface)] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--accent-text)] mb-6">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h2 className="font-display text-2xl font-bold mb-3 text-[var(--ink)]">
                      {tool.title}
                    </h2>

                    <p className="font-sans text-sm text-[var(--muted)] leading-relaxed mb-6">
                      {tool.description}
                    </p>

                    <div className="mb-6">
                      <Notice>{tool.coverageNotice}</Notice>
                    </div>
                  </div>

                  <Link
                    href={tool.href}
                    className="inline-flex items-center justify-between w-full px-5 py-3.5 bg-[var(--ink)] text-[var(--bg)] font-sans font-semibold text-xs hover:bg-[var(--accent)] hover:text-[var(--on-accent)] transition-colors select-none"
                  >
                    <span>{tool.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )
            })}
          </div>
        </section>

        {/* End CTA */}
        <CtaBand id="tool-index-end" variant="plot-check" />
      </article>
    </>
  )
}
