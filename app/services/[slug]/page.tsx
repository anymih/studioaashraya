import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Faq } from '@/components/ui/Faq'
import { CtaBand } from '@/components/ui/CtaBand'
import { servicesData, getServiceBySlug } from '@/lib/services-data'
import { siteConfig } from '@/lib/site'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return servicesData.map((s) => ({
    slug: s.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service Not Found | Studio Aashraya',
    }
  }

  const titles: Record<string, string> = {
    buildability: 'Free Plot Check and Land Buildability Report | Studio Aashraya',
    'design-build': 'Turnkey Home Construction in Gurugram | Studio Aashraya',
    'nri-remote-build': 'NRI Home Construction in Gurugram and Delhi NCR | Studio Aashraya',
    redevelopment: 'House Redevelopment in Delhi | Studio Aashraya',
  }

  const descriptions: Record<string, string> = {
    buildability: 'Find out what your plot allows before you commit to a design. Setbacks, coverage, FAR and key risks in Gurugram and Delhi NCR.',
    'design-build': 'One agreement for design, structure, approvals, construction and interiors with written quality gates and a 15-year warranty.',
    'nri-remote-build': 'Build in Delhi NCR from abroad. Weekly video, 360° scans, a live dashboard and gate-linked payments.',
    redevelopment: 'Condition survey, retain-strengthen-rebuild options and construction for old houses and tight plots.',
  }

  return {
    title: titles[slug] || service.title,
    description: descriptions[slug] || service.lead,
    alternates: {
      canonical: `${siteConfig.siteUrl}/services/${slug}`,
    },
  }
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: service.title, href: `/services/${service.slug}` },
  ]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.lead,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: 'Studio Aashraya',
      url: siteConfig.siteUrl,
    },
    areaServed: [
      { '@type': 'City', name: 'Gurugram' },
      { '@type': 'City', name: 'Delhi' },
      { '@type': 'City', name: 'Patna' },
    ],
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
        name: 'Services',
        item: `${siteConfig.siteUrl}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `${siteConfig.siteUrl}/services/${service.slug}`,
      },
    ],
  }

  return (
    <article className="flex flex-col w-full bg-[var(--bg)] text-[var(--ink)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header & Breadcrumb */}
      <section className="pt-8 pb-12 md:pb-16 max-w-6xl mx-auto px-4 md:px-6 w-full">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        <div className="max-w-4xl">
          <Eyebrow text="Turnkey Service" className="mb-3" />
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[0.92] mb-6">
            {service.title}
          </h1>
          <p className="font-sans text-lg md:text-xl text-[var(--muted)] leading-relaxed">
            {service.lead}
          </p>
        </div>
      </section>

      {/* Top CTA */}
      <CtaBand id={`svc-${service.slug}-top`} variant="plot-check" />

      {/* Who It Is For */}
      <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <Eyebrow text="Audience" className="mb-2" />
            <h2 className="font-display text-3xl font-extrabold mb-4">
              Who this is for
            </h2>
            <div className="border-t-[1.5px] border-[var(--ink)] pt-4">
              <ul className="divide-y divide-[var(--line)] list-none p-0 m-0">
                {service.audience.map((item, idx) => (
                  <li key={idx} className="py-4 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2.5 bg-[var(--accent)] shrink-0 rounded-none" />
                    <span className="font-sans text-base md:text-lg text-[var(--ink)] font-medium leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Runs (Steps) */}
      <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="mb-8">
            <Eyebrow text="Execution" className="mb-2" />
            <h2 className="font-display text-3xl font-extrabold">
              How it runs
            </h2>
          </div>

          <div className="border border-[var(--line)] bg-[var(--surface)] divide-y divide-[var(--line)]">
            {service.steps.map((step, idx) => (
              <div key={idx} className="p-6 md:p-8 flex items-start gap-4 md:gap-6">
                <span className="font-mono text-sm md:text-base font-semibold text-[var(--accent)] shrink-0 pt-0.5">
                  0{idx + 1}
                </span>
                <p className="font-sans text-base md:text-lg text-[var(--ink)] leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Receive */}
      <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <Eyebrow text="Deliverables" className="mb-2" />
              <h2 className="font-display text-3xl font-extrabold mb-4">
                What you receive
              </h2>

              <div className="border-t-[1.5px] border-[var(--ink)] pt-4">
                <ul className="divide-y divide-[var(--line)] list-none p-0 m-0">
                  {service.receive.map((item, idx) => (
                    <li key={idx} className="py-4 flex items-start gap-3">
                      <span className="w-1.5 h-1.5 mt-2.5 bg-[var(--ink)] shrink-0 rounded-none" />
                      <span className="font-sans text-base text-[var(--ink)] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Scope Boundaries / Exclusions */}
            <div className="lg:col-span-5 border border-[var(--line)] p-6 sm:p-8 bg-[var(--bg)]">
              <span className="font-mono text-xs text-[var(--muted)] font-semibold block mb-2">
                Scope Clarity
              </span>
              <h3 className="font-display font-extrabold text-2xl text-[var(--ink)] mb-4">
                What is not included
              </h3>
              <p className="font-sans text-sm text-[var(--muted)] mb-6 leading-relaxed">
                Clear boundaries avoid surprises. These items sit outside this agreement and are handled separately:
              </p>
              <ul className="space-y-3 list-none p-0 m-0">
                {service.notIncluded.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm font-sans text-[var(--muted)]">
                    <span className="w-1.5 h-1.5 mt-2 bg-[var(--muted)] shrink-0 rounded-none" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {service.faq && service.faq.length > 0 && (
        <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--bg)]">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="mb-8">
              <Eyebrow text="Questions" className="mb-2" />
              <h2 className="font-display text-3xl font-extrabold">
                Frequently asked questions
              </h2>
            </div>
            <Faq items={service.faq} emitSchema={true} />
          </div>
        </section>
      )}

      {/* End CTA */}
      <CtaBand id={`svc-${service.slug}-end`} variant="plot-check" />
    </article>
  )
}
