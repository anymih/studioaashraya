import React from 'react'
import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CtaBand } from '@/components/ui/CtaBand'
import { ProjectsDirectory } from '@/components/projects/ProjectsDirectory'
import { projects } from '@/lib/projects-data'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Delivered Homes | Studio Aashraya',
  description:
    'Homes designed and built by Studio Aashraya in Delhi NCR, Bihar and Uttarakhand. Architectural design, engineering and construction under one accountable team.',
  alternates: {
    canonical: `${siteConfig.siteUrl}/projects`,
  },
}

export default function ProjectsPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
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
        name: 'Projects',
        item: `${siteConfig.siteUrl}/projects`,
      },
    ],
  }

  // Active projects in directory
  const activeProjects = projects

  return (
    <article className="flex flex-col w-full bg-[var(--bg)] text-[var(--ink)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <section className="pt-8 pb-12 md:pb-16 max-w-6xl mx-auto px-4 md:px-6 w-full">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow text="Portfolio" className="mb-3" />
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-[0.92] mb-4">
              Homes built, not rendered.
            </h1>
            <p className="font-sans text-lg text-[var(--muted)] leading-relaxed">
              Private homes, farmsteads, and villas designed and built under one accountable team.
            </p>
          </div>
          <div className="border border-[var(--line)] p-4 bg-[var(--surface)] shrink-0">
            <span className="font-display font-extrabold text-2xl uppercase tracking-wider text-[var(--ink)]">
              30+ <span className="text-xs font-mono uppercase font-normal text-[var(--muted)]">built</span> · 50+{' '}
              <span className="text-xs font-mono uppercase font-normal text-[var(--muted)]">designed</span>
            </span>
          </div>
        </div>
      </section>

      {/* Top CTA Band */}
      <CtaBand id="projects-top" variant="projects" />

      {/* Filterable Directory */}
      <section className="py-12 md:py-20 border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <ProjectsDirectory initialProjects={activeProjects} />
        </div>
      </section>

      {/* End CTA Band */}
      <CtaBand id="projects-end" variant="plot-check" />
    </article>
  )
}
