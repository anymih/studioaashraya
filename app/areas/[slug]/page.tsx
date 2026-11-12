import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SectionHead } from '@/components/ui/SectionHead'
import ProjectCard from '@/components/ui/ProjectCard'
import { Faq } from '@/components/ui/Faq'
import CtaBand from '@/components/ui/CtaBand'
import { areasData, getAreaBySlug } from '@/lib/areas-data'
import { projects, type Project } from '@/lib/projects-data'
import { siteConfig } from '@/lib/site'

interface AreaPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return areasData.filter((a) => a.live).map((a) => ({
    slug: a.slug,
  }))
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { slug } = await params
  const area = getAreaBySlug(slug)

  if (!area) {
    return {
      title: 'Area Not Found | Studio Aashraya',
    }
  }

  const titles: Record<string, string> = {
    gurugram: 'Architect and builder in Gurugram | Studio Aashraya',
    delhi: 'Architect and builder in Delhi | Studio Aashraya',
    patna: 'Architect and builder in Patna and Bihar | Studio Aashraya',
    almora: 'Architect and builder in Almora and Uttarakhand | Studio Aashraya',
  }

  const descriptions: Record<string, string> = {
    gurugram: 'Private homes on Gurugram plots, designed, engineered and built by one team from Sector 14.',
    delhi: 'Private homes, legacy houses and redevelopments in Delhi, designed and built by one team.',
    patna: 'Climate-responsive homes in Patna and across Bihar, with construction under the same roof.',
    almora: 'Homes on hill sites where slope, access and drainage decide the structure.',
  }

  return {
    title: titles[slug] || `${area.h1} | Studio Aashraya`,
    description: descriptions[slug] || area.lead,
    alternates: {
      canonical: `${siteConfig.siteUrl}/areas/${slug}`,
    },
  }
}

export default async function AreaDetailPage({ params }: AreaPageProps) {
  const { slug } = await params
  const area = getAreaBySlug(slug)

  if (!area || !area.live) {
    notFound()
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Areas', href: '/areas' },
    { label: area.name },
  ]

  const areaProjects = projects.filter((p: Project) => (area.projectSlugs || []).includes(p.slug))

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Studio Aashraya',
    url: siteConfig.siteUrl,
    areaServed: {
      '@type': 'City',
      name: area.name,
    },
    description: area.lead,
  }

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
      {
        '@type': 'ListItem',
        position: 3,
        name: area.name,
        item: `${siteConfig.siteUrl}/areas/${area.slug}`,
      },
    ],
  }

  const ctaVariant = area.ctaVariant || 'plot-check'

  return (
    <div className="flex flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header & Breadcrumb */}
      <section className="pt-8 pb-12 md:pb-16 border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="wrap">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-[var(--accent-text)] font-semibold block mb-3">
              Regional Studio · {area.region}
            </span>
            <h1 className="font-display font-extrabold text-[clamp(36px,5vw,72px)] leading-[0.95] text-[var(--ink)] mb-6 text-balance">
              {area.h1}
            </h1>
            <p className="font-sans text-lg md:text-xl leading-relaxed text-[var(--muted)]">
              {area.lead}
            </p>
          </div>
        </div>
      </section>

      {/* Top CtaBand */}
      <CtaBand variant={ctaVariant} ctaId={`area_${area.slug}_top`} />

      {/* Contact Card for Gurugram */}
      {area.slug === 'gurugram' && (
        <section className="py-12 border-b border-[var(--line)] bg-[var(--wash)]">
          <div className="wrap">
            <div className="border-[1.5px] border-[var(--ink)] bg-[var(--surface)] p-6 sm:p-8 max-w-2xl">
              <span className="font-mono text-xs text-[var(--accent-text)] font-semibold block mb-2">
                Gurugram Office
              </span>
              <h2 className="font-display font-extrabold text-2xl text-[var(--ink)] mb-4">
                Studio Aashraya Gurugram
              </h2>
              <address className="not-italic font-sans text-base text-[var(--muted)] mb-4 leading-relaxed">
                {siteConfig.address}
              </address>
              <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
                <a
                  href={siteConfig.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)] font-semibold hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-colors"
                >Get directions &rarr;</a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-[var(--ink)] font-semibold hover:text-[var(--accent-text)] underline"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Context & Specifics Sections */}
      <section className="py-16 md:py-24 border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="wrap">
          <div className="max-w-3xl space-y-12">
            {area.sections.map((sec, idx) => (
              <div key={idx} className={idx > 0 ? 'border-t border-[var(--line)] pt-10' : ''}>
                <span className="font-mono text-xs text-[var(--accent-text)] font-semibold block mb-2">
                  0{idx + 1} / Regional Context
                </span>
                <h2 className="font-display font-extrabold text-2xl md:text-3xl text-[var(--ink)] mb-3">
                  {sec.title}
                </h2>
                <p className="font-sans text-base md:text-lg leading-relaxed text-[var(--muted)]">
                  {sec.content}
                </p>

                {/* For Patna: Links to calculators */}
                {area.slug === 'patna' && sec.title.includes('Tools') && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                    <Link
                      href="/calculators/site-feasibility"
                      className="p-4 border border-[var(--line)] bg-[var(--bg)] hover:border-[var(--ink)] transition-colors group"
                    >
                      <span className="font-mono text-xs text-[var(--muted)] block mb-1">Tool 01</span>
                      <span className="font-display font-extrabold text-sm text-[var(--ink)] group-hover:text-[var(--accent-text)]">
                        Site Feasibility &rarr;
                      </span>
                    </Link>
                    <Link
                      href="/calculators/far-checker"
                      className="p-4 border border-[var(--line)] bg-[var(--bg)] hover:border-[var(--ink)] transition-colors group"
                    >
                      <span className="font-mono text-xs text-[var(--muted)] block mb-1">Tool 02</span>
                      <span className="font-display font-extrabold text-sm text-[var(--ink)] group-hover:text-[var(--accent-text)]">
                        FAR Checker &rarr;
                      </span>
                    </Link>
                    <Link
                      href="/calculators/cost-estimator"
                      className="p-4 border border-[var(--line)] bg-[var(--bg)] hover:border-[var(--ink)] transition-colors group"
                    >
                      <span className="font-mono text-xs text-[var(--muted)] block mb-1">Tool 03</span>
                      <span className="font-display font-extrabold text-sm text-[var(--ink)] group-hover:text-[var(--accent-text)]">
                        Cost Estimator &rarr;
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work to See */}
      {areaProjects.length > 0 && (
        <section className="py-16 md:py-24 border-b border-[var(--line)] bg-[var(--bg)]">
          <div className="wrap">
            <SectionHead
              eyebrow="Delivered work"
              title="Work to see."
              lead={`Projects completed or in progress representing our work in ${area.name}.`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {areaProjects.map((proj: Project) => (
                <ProjectCard
                  key={proj.slug}
                  project={proj}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {area.faq && area.faq.length > 0 && (
        <section className="py-16 md:py-24 border-b border-[var(--line)] bg-[var(--surface)]">
          <div className="wrap">
            <SectionHead
              eyebrow="Questions"
              title="Frequently asked questions."
              lead={`Common questions from plot owners and clients building in ${area.name}.`}
            />

            <Faq items={area.faq} emitSchema={true} />
          </div>
        </section>
      )}

      {/* End CtaBand */}
      <CtaBand variant={ctaVariant} ctaId={`area_${area.slug}_end`} />
    </div>
  )
}
