import React from 'react'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site'
import { CtaBand } from '@/components/ui/CtaBand'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { EvidenceLabel } from '@/components/ui/EvidenceLabel'
import { measurementNote } from '@/lib/measurement-note'
import { TechTileInteractive } from '@/components/tech/TechTileInteractive'

export const metadata: Metadata = {
  title: 'Construction Technology: BIM, 360° Scans, Lab-Tested Concrete | Studio Aashraya',
  description:
    'The instruments Studio Aashraya uses on every build, and what each one catches before it is covered. BIM, scans, lab tests, live dashboard in Gurugram and Delhi NCR.',
  alternates: {
    canonical: `${siteConfig.siteUrl}/technology`,
  },
}

interface TechItem {
  id: string
  title: string
  whatItIs: string
  whatItCatches: string
  whatYouReceive: string
  usedAt: string
}

const techItems: TechItem[] = [
  {
    id: 'bim',
    title: 'BIM clash detection',
    whatItIs:
      'The building is modelled in 3D with structure, ducts, pipes and conduits, and the model is checked for conflicts.',
    whatItCatches: 'Beams cutting duct routes, missing sleeves, lost ceiling height.',
    whatYouReceive: 'Clash report and coordinated drawings.',
    usedAt: 'Stage 03, before Gate 2',
  },
  {
    id: 'sim',
    title: 'Climate simulation',
    whatItIs:
      'Sun path, heat gain through walls and glass, and daylight are modelled for your plot and orientation.',
    whatItCatches: 'West-facing heat gain, glare, dark rooms.',
    whatYouReceive: 'A summary of the façade and shading decisions the model led to.',
    usedAt: 'Stages 02 and 03',
  },
  {
    id: 'lidar',
    title: '360° LiDAR scans',
    whatItIs:
      'The site is scanned at each gate and the scan is compared with the BIM model.',
    whatItCatches:
      'Positions off the drawing, level errors, missing elements before they are covered.',
    whatYouReceive: 'A scan walkthrough link and deviation notes for each gate.',
    usedAt: 'Every gate',
  },
  {
    id: 'drone',
    title: 'Drone audits',
    whatItIs:
      'Aerial photographs and video of the plot, roof, terrace and façade on a fixed schedule.',
    whatItCatches: 'Progress gaps, roof and terrace defects, site-condition issues.',
    whatYouReceive: 'A dated aerial set.',
    usedAt: 'During structure and finishes',
  },
  {
    id: 'cube',
    title: 'Lab-tested concrete',
    whatItIs:
      'Cube samples taken at every pour and tested at NABL-accredited labs.',
    whatItCatches: 'Concrete below the specified grade.',
    whatYouReceive: 'Lab certificates filed per pour.',
    usedAt: 'Gate 2',
  },
  {
    id: 'upv',
    title: 'Pulse velocity testing',
    whatItIs:
      'Non-destructive ultrasonic check of concrete quality in cured elements.',
    whatItCatches: 'Voids and weak concrete without breaking anything.',
    whatYouReceive: 'Readings per element tested.',
    usedAt: 'After curing, structure stage',
  },
  {
    id: 'rebar',
    title: 'Rebar scanning',
    whatItIs:
      'A scanner reads reinforcement spacing and cover inside cast elements.',
    whatItCatches: 'Bars at the wrong spacing or cover.',
    whatYouReceive: 'Scan images with measured spacing and cover.',
    usedAt: 'Structure stage',
  },
  {
    id: 'flood',
    title: 'Flood-tested waterproofing',
    whatItIs:
      'Waterproofed areas are flooded and monitored before anything covers them.',
    whatItCatches: 'Leaks, before finishes hide them.',
    whatYouReceive: 'Dated photographs and a signed result.',
    usedAt: 'Gate 3',
  },
  {
    id: 'dash',
    title: 'Live dashboard',
    whatItIs:
      'One place for schedule, gate status, cost against the bill of quantities, photographs, scans and decisions.',
    whatItCatches: 'Surprises.',
    whatYouReceive: 'A client login.',
    usedAt: 'Whole build',
  },
]

export default function TechnologyPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Technology', href: '/technology' },
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

  const firstGroup = techItems.slice(0, 3)
  const remainingGroup = techItems.slice(3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
        {/* Top Header */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-8 pb-12">
          <Breadcrumb items={breadcrumbItems} className="mb-6" />

                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[0.92] mb-6 max-w-4xl">
            Built with instruments, not opinions.
          </h1>
          <p className="font-sans text-lg md:text-xl text-[var(--muted)] max-w-3xl leading-relaxed">
            Every technology below has a job: catch a specific failure before it is covered.
            The instruments for your project are listed in your agreement.
          </p>
        </div>

        {/* Top CTA */}
        <CtaBand id="tech-top" variant="tech" />

        {/* First 3 Tech Blocks */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {firstGroup.map((item) => (
              <TechTileInteractive key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Mid CTA */}
        <CtaBand id="tech-mid" variant="tech" />

        {/* Remaining 6 Tech Blocks */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {remainingGroup.map((item) => (
              <TechTileInteractive key={item.id} item={item} />
            ))}
          </div>

          {/* Scheduling Note */}
          <div className="p-8 border border-[var(--line)] bg-[var(--surface)] mb-12">
            <span className="block font-mono text-xs text-[var(--accent)] mb-2">
              Critical Path Scheduling
            </span>
            <h3 className="font-display text-2xl font-bold mb-3">
              We plan the build on a critical path schedule.
            </h3>
            <p className="font-sans text-base text-[var(--muted)] leading-relaxed">
              The schedule is reported against the handover date in your agreement, updated weekly on your dashboard.
            </p>
          </div>

          {/* Measurement Section */}
          <div id="measurement" className="p-8 border border-[var(--line)] bg-[var(--surface)] mb-12 scroll-mt-24">
            <span className="block font-mono text-xs text-[var(--accent)] mb-2">
              Measured Performance
            </span>
            <h3 className="font-display text-2xl font-bold mb-3">
              Thermal and Energy Verification
            </h3>
            <p className="font-sans text-base text-[var(--muted)] leading-relaxed mb-6">
              Indoor temperature and energy use are measured on our projects and compared with the design-stage simulation. {measurementNote}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-[var(--line)] bg-[var(--bg)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[var(--muted)]">Thermal envelope</span>
                  <EvidenceLabel type="measured" methodLink="/technology#measurement" />
                </div>
                <div className="font-display text-2xl font-bold text-[var(--ink)]">
                  4 to 6 °C cooler indoors
                </div>
                <p className="font-sans text-xs text-[var(--muted)] mt-1">
                  Compared to a conventional envelope under identical summer ambient peaks.
                </p>
              </div>

              <div className="p-4 border border-[var(--line)] bg-[var(--bg)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[var(--muted)]">Energy consumption</span>
                  <EvidenceLabel type="measured" methodLink="/technology#measurement" />
                </div>
                <div className="font-display text-2xl font-bold text-[var(--ink)]">
                  30% lower energy bills
                </div>
                <p className="font-sans text-xs text-[var(--muted)] mt-1">
                  Passive shading, thermal mass and cross-ventilation reduce active cooling loads.
                </p>
              </div>
            </div>
          </div>

          {/* Structure and Soil Note */}
          <div className="p-8 border border-[var(--line)] bg-[var(--surface)]">
            <span className="block font-mono text-xs text-[var(--accent)] mb-2">
              Structure & Seismic Safety
            </span>
            <h3 className="font-display text-2xl font-bold mb-3">
              Seismic Zone IV & Soil Investigation
            </h3>
            <p className="font-sans text-base text-[var(--muted)] leading-relaxed">
              Delhi NCR lies in Seismic Zone IV. Soil and water-table conditions vary between localities, so we recommend a soil investigation before the structure is fixed.
            </p>
          </div>
        </section>

        {/* End CTA */}
        <CtaBand id="tech-end" variant="plot-check" />
      </article>
    </>
  )
}
