import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { EvidenceLabel } from '@/components/ui/EvidenceLabel'
import { SampleTag } from '@/components/ui/SampleTag'
import { Img } from '@/lib/images'
import CtaBand from '@/components/ui/CtaBand'
import { ProjectViewTracker } from '@/components/projects/ProjectViewTracker'
import { projects, getProjectBySlug, validateProjects } from '@/lib/projects-data'
import { siteConfig } from '@/lib/site'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  validateProjects()
  return projects.map((p) => ({
    slug: p.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found | Studio Aashraya',
    }
  }

  const title = project.seo?.title || `${project.name} | Studio Aashraya`
  const description =
    project.seo?.description ||
    `${project.name} in ${project.city}, ${project.region}. ${project.narrative.problem.slice(0, 140)}...`

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.siteUrl}/projects/${project.slug}`,
    },
  }
}

const TECH_TITLES: Record<string, string> = {
  'bim-clash': 'BIM clash detection',
  'thermal-sim': 'Climate simulation',
  'structural-seismic': 'Seismic structural analysis',
  'lidar-twin': '360° LiDAR scans',
  'concrete-testing': 'Lab-tested concrete',
  'pulse-velocity': 'Pulse velocity testing',
  'rebar-scan': 'Rebar scanning',
  'flood-test': 'Flood-tested waterproofing',
  'dashboard-cpm': 'Live dashboard',
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  // Next and previous project navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1]
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0]

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Homes', href: '/projects' },
    { label: project.name },
  ]

  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.narrative.approach,
    creator: {
      '@type': 'HomeAndConstructionBusiness',
      name: 'Studio Aashraya',
      url: siteConfig.siteUrl,
    },
    locationCreated: {
      '@type': 'Place',
      name: `${project.city}, ${project.region}`,
    },
    dateCreated: project.year,
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
        name: 'Homes',
        item: `${siteConfig.siteUrl}/projects`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.name,
        item: `${siteConfig.siteUrl}/projects/${project.slug}`,
      },
    ],
  }

  // Handover outcome calculation per PRD / Page Specs
  let handoverResult = 'In progress'
  if (project.delivery?.delivered) {
    handoverResult = project.delivery.delivered <= project.delivery.agreed ? 'On time' : 'Late'
  }

  const coverId = `proj-${project.key}-cover`

  return (
    <article className="flex flex-col w-full bg-[var(--bg)] text-[var(--ink)]">
      {/* Telemetry Tracking */}
      <ProjectViewTracker
        slug={project.slug}
        city={project.city}
        status={project.status}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. Breadcrumb */}
      <section className="pt-8 pb-4 border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="wrap">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </section>

      {/* 2. Header: H1, StatusBadge, sample chip */}
      <section className="py-8 md:py-12 border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="wrap space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-[var(--muted)]">
              {project.city}, {project.region} · {project.type}
            </span>
            <StatusBadge status={project.status} />
            {project.placeholder && <SampleTag kind="project" />}
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[0.92] text-[var(--ink)]">
            {project.name}
          </h1>
          <p className="font-sans text-lg text-[var(--muted)] max-w-2xl leading-relaxed">
            {project.headline}
          </p>
        </div>
      </section>

      {/* 3. Title-block metrics (Plot, Built-up, Floors, Climate zone, Year, City) */}
      <section className="border-b-[1.5px] border-[var(--ink)] bg-[var(--surface)]">
        <div className="wrap py-0">
          <dl className="grid grid-cols-2 md:grid-cols-6 m-0 divide-y md:divide-y-0 md:divide-x divide-[var(--line)]">
            <div className="p-4 sm:p-5">
              <dt className="font-mono text-xs text-[var(--muted)]">Site Area</dt>
              <dd className="font-sans text-base font-semibold text-[var(--ink)] mt-1">{project.plotArea || '—'}</dd>
            </div>
            <div className="p-4 sm:p-5">
              <dt className="font-mono text-xs text-[var(--muted)]">Built-up</dt>
              <dd className="font-sans text-base font-semibold text-[var(--ink)] mt-1">{project.builtUp || '—'}</dd>
            </div>
            <div className="p-4 sm:p-5">
              <dt className="font-mono text-xs text-[var(--muted)]">Floors</dt>
              <dd className="font-sans text-base font-semibold text-[var(--ink)] mt-1">{project.floors}</dd>
            </div>
            <div className="p-4 sm:p-5">
              <dt className="font-mono text-xs text-[var(--muted)]">Climate Zone</dt>
              <dd className="font-sans text-base font-semibold text-[var(--ink)] mt-1">{project.climateZone}</dd>
            </div>
            <div className="p-4 sm:p-5">
              <dt className="font-mono text-xs text-[var(--muted)]">Year</dt>
              <dd className="font-sans text-base font-semibold text-[var(--ink)] mt-1">{project.year || '—'}</dd>
            </div>
            <div className="p-4 sm:p-5 col-span-2 md:col-span-1">
              <dt className="font-mono text-xs text-[var(--muted)]">Location</dt>
              <dd className="font-sans text-base font-semibold text-[var(--ink)] mt-1">{project.city}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 4. Cover photo with frame and caption */}
      <section className="py-10 md:py-16 border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="wrap">
          <Img id={coverId} priority={true} className="w-full" sizes="(max-width: 1200px) 100vw, 1200px" />
        </div>
      </section>

      {/* 5. Narrative: Problem, Approach, Solution */}
      <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="wrap">
          <div className="max-w-3xl space-y-12">
            <div>
              <span className="font-mono text-xs text-[var(--accent-text)] font-semibold block mb-2">
                01 / The Challenge
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-[var(--ink)] mb-3">
                The Problem
              </h2>
              <p className="font-sans text-base md:text-lg leading-relaxed text-[var(--muted)]">
                {project.narrative.problem}
              </p>
            </div>

            <div className="border-t border-[var(--line)] pt-8">
              <span className="font-mono text-xs text-[var(--accent-text)] font-semibold block mb-2">
                02 / Architectural Response
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-[var(--ink)] mb-3">
                The Approach
              </h2>
              <p className="font-sans text-base md:text-lg leading-relaxed text-[var(--muted)]">
                {project.narrative.approach}
              </p>
            </div>

            <div className="border-t border-[var(--line)] pt-8">
              <span className="font-mono text-xs text-[var(--accent-text)] font-semibold block mb-2">
                03 / Delivered Reality
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-[var(--ink)] mb-3">
                The Solution
              </h2>
              <p className="font-sans text-base md:text-lg leading-relaxed text-[var(--muted)]">
                {project.narrative.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CtaBand project-<slug>-mid */}
      <CtaBand variant="projects" ctaId={`project_${project.slug}_mid`} />

      {/* 7. Key Strategies */}
      <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="wrap">
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-[var(--muted)] font-semibold block mb-2">
              Engineering Logic
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--ink)] mb-8">
              Design & Construction Strategies
            </h2>

            <div className="space-y-6">
              {project.strategies.map((strat, idx) => (
                <div key={idx} className="border-[1.5px] border-[var(--ink)] bg-[var(--surface)] p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs font-bold text-[var(--accent-text)] px-2 py-1 border border-[var(--accent)] shrink-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-xl text-[var(--ink)] mb-2">
                        {strat.name}
                      </h3>
                      <p className="font-sans text-base text-[var(--muted)] leading-relaxed">
                        {strat.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Technology Used (tags linking to /technology#<id>) */}
      {project.technology && project.technology.length > 0 && (
        <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--surface)]">
          <div className="wrap">
            <div className="max-w-3xl">
              <span className="font-mono text-xs text-[var(--accent-text)] font-semibold block mb-2">
                Verification Instruments
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--ink)] mb-4">
                Technology Used
              </h2>
              <p className="font-sans text-base text-[var(--muted)] mb-8">
                Instruments applied to verify structural integrity, thermal performance, and execution quality on this site.
              </p>
              <div className="flex flex-wrap gap-3">
                {project.technology.map((techId) => (
                  <Link
                    key={techId}
                    href={`/technology#${techId}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 border-[1.5px] border-[var(--ink)] bg-[var(--bg)] hover:bg-[var(--surface)] text-[var(--ink)] font-mono text-xs font-semibold transition-colors group"
                  >
                    <span>{TECH_TITLES[techId] || techId}</span>
                    <span className="text-[var(--accent-text)] group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 9. Handover Record */}
      {project.delivery && (
        <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--bg)]">
          <div className="wrap">
            <div className="max-w-3xl">
              <span className="font-mono text-xs text-[var(--accent-text)] font-semibold block mb-2">
                Accountability
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--ink)] mb-8">
                Handover Record
              </h2>
              <div className="border-[1.5px] border-[var(--ink)] bg-[var(--surface)] p-6 sm:p-8">
                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <dt className="font-mono text-xs text-[var(--muted)] mb-1">
                      Agreed Handover Date
                    </dt>
                    <dd className="font-sans text-lg font-bold text-[var(--ink)]">
                      {project.delivery.agreed}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs text-[var(--muted)] mb-1">
                      Actual Handover Date
                    </dt>
                    <dd className="font-sans text-lg font-bold text-[var(--ink)]">
                      {project.delivery.delivered || 'In progress'}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs text-[var(--muted)] mb-1">
                      Schedule Outcome
                    </dt>
                    <dd className="font-mono text-sm font-semibold text-[var(--accent-text)]">
                      {handoverResult}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 10. Performance Block with Evidence Labels */}
      <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="wrap">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="font-mono text-xs text-[var(--accent-text)] font-semibold">
                Verified Metrics
              </span>
              {project.placeholder && <SampleTag kind="figure" />}
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--ink)] mb-8">
              Performance Verification
            </h2>

            <div className="border-[1.5px] border-[var(--ink)] bg-[var(--bg)] divide-y divide-[var(--line)]">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs text-[var(--muted)] block mb-1">
                      {m.label}
                    </span>
                    <span className="font-display font-extrabold text-3xl text-[var(--ink)]">
                      {m.value}
                    </span>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                    <EvidenceLabel state={m.evidence} />
                    {m.method && (
                      <span className="font-mono text-xs text-[var(--muted)] max-w-[32ch] sm:text-right">
                        Method: {m.method}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. Material Palette */}
      <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="wrap">
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-[var(--muted)] font-semibold block mb-2">
              Tactile Materials
            </span>
            <h2 className="font-display font-extrabold text-3xl text-[var(--ink)] mb-6">
              Material Palette
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.materials.map((mat, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 border-[1.5px] border-[var(--ink)] bg-[var(--surface)] font-mono text-xs text-[var(--ink)] font-semibold"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12. Gallery */}
      <section className="py-16 md:py-24 border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="wrap">
          <span className="font-mono text-xs text-[var(--muted)] font-semibold block mb-2">
            Visual Record
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--ink)] mb-4">
            Site Gallery
          </h2>
          <p className="font-sans text-base text-[var(--muted)] mb-8 max-w-2xl">
            Photographs documenting architectural junctions, lighting, and materiality.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.galleryCaptions.map((caption, idx) => {
              const galleryId = `proj-${project.key}-g${idx + 1}`
              return (
                <div key={idx} className="space-y-2">
                  <Img id={galleryId} sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 13. Technical Plans sheet */}
      <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="wrap">
          <span className="font-mono text-xs text-[var(--muted)] font-semibold block mb-2">
            Architectural Drawings
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--ink)] mb-4">
            Technical Plans
          </h2>
          <p className="font-sans text-base text-[var(--muted)] mb-8 max-w-2xl">
            Floor layouts and architectural sections drawn to scale.
          </p>
          <div>
            <Img id={`proj-${project.key}-plan`} sizes="100vw" />
          </div>
        </div>
      </section>

      {/* 14. Next and previous project navigation */}
      <section className="border-b-[1.5px] border-[var(--ink)] bg-[var(--wash)]">
        <div className="wrap py-0">
          <nav className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--line)]">
            <Link
              href={`/projects/${prevProject.slug}`}
              className="p-6 md:p-8 flex flex-col justify-between hover:bg-[var(--surface)] transition-colors group"
            >
              <span className="font-mono text-xs text-[var(--muted)] mb-2">
                &larr; Previous Project
              </span>
              <span className="font-display font-extrabold text-2xl text-[var(--ink)] group-hover:text-[var(--accent-text)]">
                {prevProject.name}
              </span>
            </Link>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="p-6 md:p-8 flex flex-col justify-between md:items-end hover:bg-[var(--surface)] transition-colors group text-left md:text-right"
            >
              <span className="font-mono text-xs text-[var(--muted)] mb-2">
                Next Project &rarr;
              </span>
              <span className="font-display font-extrabold text-2xl text-[var(--ink)] group-hover:text-[var(--accent-text)]">
                {nextProject.name}
              </span>
            </Link>
          </nav>
        </div>
      </section>

      {/* 15. Final CtaBand */}
      <CtaBand variant="projects" ctaId={`project_${project.slug}_end`} />
    </article>
  )
}
