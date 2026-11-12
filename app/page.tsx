import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { StageList } from '@/components/ui/StageList'
import { SectionHead } from '@/components/ui/SectionHead'
import ProjectCard from '@/components/ui/ProjectCard'
import { Faq } from '@/components/ui/Faq'
import { CtaBand } from '@/components/ui/CtaBand'
import { projects, type Project } from '@/lib/projects-data'
import { homeFaqs, generateFaqSchema } from '@/lib/faq-data'
import { methodStages } from '@/lib/method-data'
import { siteConfig } from '@/lib/site'
import { CLAIMS } from '@/lib/ledger'
import { ClaimNote } from '@/components/ui/ClaimNote'
import { Phone, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Architect and Builder in Gurugram, Delhi NCR | Studio Aashraya',
  description:
    'IIT-led architecture and construction for private homes in Gurugram and Delhi NCR. On time or 10% back, with a 15-year warranty.',
  alternates: {
    canonical: siteConfig.siteUrl,
  },
}

export default function HomePage() {
  const faqSchema = generateFaqSchema(homeFaqs)
  const homeProjects = projects.slice(0, 6)

  const condensedStages = methodStages.map((st) => ({
    id: `stage-${st.num}`,
    number: st.num,
    title: st.name,
    summary: st.description,
    gate: st.gate,
  }))

  const techCapabilities = [
    { name: 'BIM clash detection', desc: 'Architecture, structure and services coordinated in 3D before site work begins.' },
    { name: 'Climate simulation', desc: 'Thermal mass, sun path and daylight modeled for local weather patterns.' },
    { name: '360° LiDAR scans', desc: 'Digital reality capture verifying as-built conditions against architectural models.' },
    { name: 'Drone audits', desc: 'Aerial inspection of roof slabs, parapets and external site geometry.' },
    { name: 'Lab-tested concrete', desc: 'Core and cube compressive testing at NABL-accredited facilities.' },
    { name: 'Rebar & pulse velocity scans', desc: 'Non-destructive structural verification of cover depth and concrete density.' },
    { name: 'Flood-tested waterproofing', desc: '72-hour pond testing under standing water before finishing layers.' },
    { name: 'Total station digital layout', desc: 'Millimeter-accurate boundary and grid alignment on site.' },
    { name: 'Thermal imaging audits', desc: 'Infrared diagnostics identifying envelope leaks and insulation voids.' },
    { name: 'Live client dashboard', desc: 'Weekly video walkthroughs, signed gate records and budget tracking.' },
  ]

  const nriDeliverables = [
    'Weekly 4K video walkthroughs',
    '360° digital scans at every quality gate',
    'Architect-certified gate inspection records',
    'Material test reports and manufacturer warranties',
    'Transparent milestone payment releases',
    'Live critical-path schedule tracking',
    'Digital drawing register and revision control',
    'Dedicated project architect as single point of contact',
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="w-full bg-[var(--bg)] text-[var(--ink)]">
        {/* Section 1: Hero */}
        <section className="wrap pt-10 pb-16 md:pt-14 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-[var(--ink)] mb-[var(--space-h1-intro)]">
                Build a home that is beautiful, engineered, and built to last.
              </h1>
              <p className="text-[var(--muted)] mb-[var(--space-p-cta)]">
                Architect and builder in Gurugram and Delhi NCR, led by an IIT-trained architect. Every home handed over on time, backed by a 10% refund clause and a 15-year warranty.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/book-a-call?src=home-hero"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[var(--accent)] text-[var(--on-accent)] font-sans font-bold text-sm hover:opacity-95 transition-opacity min-h-[48px] select-none"
                >
                  <span>Get a free plot check</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] font-sans text-xs hover:bg-[var(--wash)] transition-colors min-h-[48px] select-none"
                >
                  <Phone className="w-4 h-4 text-[var(--accent-text)]" />
                  <span>Call {siteConfig.phoneDisplay}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="m-0">
                <div className="relative bg-[var(--surface)] aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/home/hero-home.jpg"
                    alt="Three-storey sandstone and brick-jali home in Gurugram at sunset."
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 font-sans text-xs text-[var(--muted)]">
                  Illustration
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Section 2: Proof strip (4 factual metrics) */}
        <section className="w-full bg-[var(--surface)] border-y border-[var(--line)] py-12">
          <div className="wrap">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="stat-numeral text-[var(--ink)] mb-1">15 yrs</div>
                <div className="font-sans text-xs text-[var(--muted)]">Structural warranty</div>
              </div>
              <div>
                <div className="stat-numeral text-[var(--ink)] mb-1">10%</div>
                <div className="font-sans text-xs text-[var(--muted)]">Refund clause if delayed</div>
              </div>
              <div>
                <div className="stat-numeral text-[var(--ink)] mb-1">8</div>
                <div className="font-sans text-xs text-[var(--muted)]">Quality sign-off gates</div>
              </div>
              <div>
                <div className="stat-numeral text-[var(--ink)] mb-1">1</div>
                <div className="font-sans text-xs text-[var(--muted)]">Single point of contact</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Problem (62% delay figure) */}
        <section className="wrap section-pad">
          <div className="max-w-3xl">
            <SectionHead
              title="62% of under-construction housing projects in 50 Indian cities are delayed."
              lead="We commit to the handover date in writing. If we miss it, we refund 10% of the total construction amount. Conditions, scope and exclusions are in your agreement."
              className="mb-4"
            />
            <ClaimNote
              source={CLAIMS['c.delay62'].source}
              sourceUrl={CLAIMS['c.delay62'].sourceUrl}
            />
          </div>
        </section>

        {/* Section 4: How we build (8 stages, sign-off gates) */}
        <section className="w-full bg-[var(--band)] text-[var(--on-band)] border-y border-[var(--band-line)] section-pad">
          <div className="wrap">
            <div className="max-w-3xl mb-[var(--space-intro-content)]">
              <SectionHead
                title="How we build"
                lead="Work on the next stage does not start until the architect signs off the current gate."
                theme="band"
                className="mb-[var(--space-p-cta)]"
              />
              <Link
                href="/method"
                className="font-sans text-sm text-[var(--on-band)] underline underline-offset-4 inline-block"
              >
                Read the full method (8 stages, 4 gates) →
              </Link>
            </div>

            <StageList stages={condensedStages} className="mb-4" />
          </div>
        </section>

        {/* Section 5: Technology (10 capabilities) */}
        <section className="wrap section-pad">
          <div className="max-w-3xl mb-[var(--space-intro-content)]">
            <SectionHead
              title="Built with instruments, not opinions."
              lead="Most of what goes wrong in a house is hidden behind plaster by the time anyone looks. We measure it before it is covered."
              className="mb-[var(--space-p-cta)]"
            />
            <Link
              href="/technology"
              className="font-sans text-sm text-[var(--accent-text)] font-semibold hover:underline inline-block"
            >
              See all technology details →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {techCapabilities.map((tech, idx) => (
              <div key={idx} className="card-standard p-6 flex flex-col justify-between">
                <div>
                  <h3 className="mb-2 text-base font-semibold">{tech.name}</h3>
                  <p className="font-sans text-xs text-[var(--muted)] leading-relaxed">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Guarantee */}
        <section className="w-full bg-[var(--surface)] border-y border-[var(--line)] section-pad">
          <div className="wrap">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <SectionHead
                  title="On time, or 10% back."
                  lead="Before work starts, your agreement fixes a handover date. If we miss it, we refund 10% of the total construction amount. Your home also comes with a 15-year structural warranty."
                  className="mb-[var(--space-p-cta)]"
                />
                <Link
                  href="/guarantee"
                  className="font-sans text-sm text-[var(--accent-text)] font-semibold hover:underline"
                >
                  Read the full guarantee →
                </Link>
              </div>

              <div className="lg:col-span-4">
                <div className="border border-[var(--line)] bg-[var(--bg)] p-6">
                  <ShieldCheck className="w-10 h-10 text-[var(--accent-text)] mb-3" />
                  <div className="stat-numeral text-[var(--ink)] mb-1">10%</div>
                  <span className="font-sans text-xs text-[var(--muted)]">Refund clause in writing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Projects (6 sample projects in simple grid) */}
        <section className="wrap section-pad">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-[var(--space-intro-content)]">
            <SectionHead
              title="Sample projects"
              lead="Representative designs and built homes across Delhi NCR, Patna and Almora."
              leadClassName="font-sans text-sm"
              className="mb-0"
            />
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-sans text-sm text-[var(--ink)] hover:text-[var(--accent-text)] shrink-0"
            >
              <span>See all projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homeProjects.map((p: Project) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>

        {/* Section 8: NRI clients */}
        <section className="w-full bg-[var(--surface)] border-y border-[var(--line)] section-pad">
          <div className="wrap">
            <div className="max-w-3xl mb-[var(--space-intro-content)]">
              <SectionHead
                title="Build in India without flying in for every decision."
                lead="For families living abroad who want a home built in India with complete transparency and weekly documentation."
                className="mb-[var(--space-p-cta)]"
              />
              <Link
                href="/nri"
                className="font-sans text-sm text-[var(--accent-text)] font-semibold hover:underline inline-block"
              >
                Explore NRI build management →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {nriDeliverables.map((item, idx) => (
                <div key={idx} className="card-standard p-5 flex items-start gap-3 bg-[var(--bg)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-0.5" />
                  <span className="font-sans text-xs text-[var(--ink)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 9: Where we work */}
        <section className="wrap section-pad">
          <SectionHead
            title="Regions we design and build in"
            lead="Studio Aashraya designs and builds private homes from our office in Gurugram and regional project desks."
            leadClassName="font-sans text-sm"
            className="max-w-3xl"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/areas/gurugram"
              className="card-standard hover:border-[var(--ink)] transition-colors group block"
            >
              <p className="font-sans text-xs text-[var(--muted)] mb-2">Focus area</p>
              <h3 className="mb-2 text-base font-semibold group-hover:text-[var(--accent-text)] transition-colors">
                Gurugram
              </h3>
              <p className="font-sans text-xs text-[var(--muted)] leading-relaxed">
                Private homes and tight-plot redevelopments from our Gurugram office.
              </p>
            </Link>

            <Link
              href="/areas/delhi"
              className="card-standard hover:border-[var(--ink)] transition-colors group block"
            >
              <p className="font-sans text-xs text-[var(--muted)] mb-2">Capital region</p>
              <h3 className="mb-2 text-base font-semibold group-hover:text-[var(--accent-text)] transition-colors">
                Delhi
              </h3>
              <p className="font-sans text-xs text-[var(--muted)] leading-relaxed">
                Legacy homes, floor additions and urban redevelopments.
              </p>
            </Link>

            <Link
              href="/areas/patna"
              className="card-standard hover:border-[var(--ink)] transition-colors group block"
            >
              <p className="font-sans text-xs text-[var(--muted)] mb-2">Regional studio</p>
              <h3 className="mb-2 text-base font-semibold group-hover:text-[var(--accent-text)] transition-colors">
                Patna
              </h3>
              <p className="font-sans text-xs text-[var(--muted)] leading-relaxed">
                Climate-responsive courtyard homes where our practice began.
              </p>
            </Link>

            <Link
              href="/areas/almora"
              className="card-standard hover:border-[var(--ink)] transition-colors group block"
            >
              <p className="font-sans text-xs text-[var(--muted)] mb-2">Regional desk</p>
              <h3 className="mb-2 text-base font-semibold group-hover:text-[var(--accent-text)] transition-colors">
                Almora
              </h3>
              <p className="font-sans text-xs text-[var(--muted)] leading-relaxed">
                Hillside homes engineered for slope stability and drainage.
              </p>
            </Link>
          </div>
        </section>

        {/* Section 10: FAQ + final CTA band */}
        <section className="wrap section-pad border-t border-[var(--line)]">
          <SectionHead title="Frequently asked questions" />

          <Faq items={homeFaqs} className="mb-16" />

          <CtaBand id="home-final" variant="plot-check" />
        </section>
      </div>
    </>
  )
}
