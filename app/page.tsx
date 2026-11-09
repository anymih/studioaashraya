import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'


import { StageList } from '@/components/ui/StageList'
import ProjectCard from '@/components/ui/ProjectCard'
import { Faq } from '@/components/ui/Faq'
import { CtaBand } from '@/components/ui/CtaBand'
import { projects, type Project } from '@/lib/projects-data'
import { homeFaqs, generateFaqSchema } from '@/lib/faq-data'
import { methodStages } from '@/lib/method-data'
import { siteConfig } from '@/lib/site'
import { CLAIMS } from '@/lib/ledger'
import { ClaimNote } from '@/components/ui/ClaimNote'
import { Phone, MessageSquare, ArrowRight, ShieldCheck, MapPin } from 'lucide-react'

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

  const featuredProjects = projects.slice(0, 3)

  const condensedStages = methodStages.map((st) => ({
    id: `stage-${st.num}`,
    number: st.num,
    title: st.name,
    summary: st.description,
    gate: st.gate,
  }))

  const comparisonRows = [
    {
      conventional: 'The handover date is a promise.',
      aashraya: 'The handover date is in the agreement, backed by a 10% refund.',
    },
    {
      conventional: 'Warranty terms are explained after you pay.',
      aashraya: 'A 15-year warranty, with scope and exclusions written before you sign.',
    },
    {
      conventional: 'Drawings clash on site.',
      aashraya: 'BIM clash detection resolves them before any pour.',
    },
    {
      conventional: 'Concrete quality is assumed.',
      aashraya: 'Every pour is lab-tested and the certificates are filed.',
    },
    {
      conventional: 'You get photographs in a chat group.',
      aashraya: 'You get 360° scans, dated records and a live dashboard.',
    },
    {
      conventional: 'Waterproofing is a product purchase.',
      aashraya: 'Waterproofing is specified, laid and flood-tested.',
    },
  ]

  const techTiles = [
    {
      id: 'bim',
      title: 'BIM clash detection',
      desc: 'Structure, ducts and pipes checked against each other before the pour.',
      stage: 'Stage 03',
    },
    {
      id: 'sim',
      title: 'Climate simulation',
      desc: 'Sun, heat gain and daylight modelled before the façade is fixed.',
      stage: 'Stages 02 & 03',
    },
    {
      id: 'lidar',
      title: '360° LiDAR scans',
      desc: 'Each gate scanned and compared with the model.',
      stage: 'Every gate',
    },
    {
      id: 'drone',
      title: 'Drone audits',
      desc: 'Roof, terrace and façade photographed from above, on schedule.',
      stage: 'Structure & Finishes',
    },
    {
      id: 'cube',
      title: 'Lab-tested concrete',
      desc: 'Cube samples from every pour, tested at NABL-accredited labs.',
      stage: 'Gate 2',
    },
    {
      id: 'upv',
      title: 'Pulse velocity & rebar scans',
      desc: 'Cast elements checked without breaking them.',
      stage: 'Structure stage',
    },
    {
      id: 'flood',
      title: 'Flood-tested waterproofing',
      desc: 'Water stands on it before anything covers it.',
      stage: 'Gate 3',
    },
    {
      id: 'dash',
      title: 'Live dashboard',
      desc: 'Schedule, gates, cost, photos, scans and decisions in one place.',
      stage: 'Whole build',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="w-full bg-[var(--bg)] text-[var(--ink)]">
        {/* 2.1 Hero Section */}
        <section className="wrap pt-8 pb-12 md:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="font-sans text-sm text-[var(--muted)] mb-3">Architect and builder · Gurugram, Delhi NCR</p>
              <h1 className="text-[var(--ink)] mb-4">
                Build a home that is beautiful, engineered, and built to last.
              </h1>

              <p className="text-[var(--muted)] mb-6">
                On time, or 10% back. 15-year warranty. IIT-led · COA-registered.
              </p>

              <p className="text-[var(--muted)] mb-8">
                IIT-led architecture and construction in Gurugram and Delhi NCR. Every home handed over on time. A 15-year warranty. If we miss your handover date, we refund 10% of the construction amount.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/book-a-call?src=hero-primary"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[var(--accent)] text-[var(--on-accent)] font-sans font-bold text-sm hover:opacity-95 transition-opacity min-h-[48px] select-none"
                >
                  <span>Get a free plot check</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] font-mono text-xs hover:bg-[var(--wash)] transition-colors min-h-[48px] select-none"
                >
                  <Phone className="w-4 h-4 text-[var(--accent)]" />
                  <span>Call {siteConfig.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Illustration placeholder */}
            <div className="lg:col-span-5">
              <div className="border border-[var(--line)] bg-[var(--surface)] aspect-[4/3] flex items-end justify-end p-4">
                <span className="font-sans text-xs text-[var(--muted)]">Illustration. Project photographs to follow.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2.2 Proof Bar (Ink Band) */}
        <section className="w-full bg-[var(--ink)] text-[var(--bg)] border-y border-[var(--line)] py-6">
          <div className="wrap">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div>
                <div className="stat-numeral text-[var(--bg)]">30+</div>
                <div className="font-sans text-xs text-[var(--bg)]/60 mt-1">Homes built</div>
              </div>
              <div>
                <div className="stat-numeral text-[var(--bg)]">50+</div>
                <div className="font-sans text-xs text-[var(--bg)]/60 mt-1">Projects designed</div>
              </div>
              <div>
                <div className="font-sans font-semibold text-xl text-[var(--bg)]">Every home</div>
                <div className="font-sans text-xs text-[var(--bg)]/60 mt-1">Handed over on time</div>
              </div>
              <div>
                <div className="stat-numeral text-[var(--bg)]">15 yrs</div>
                <div className="font-sans text-xs text-[var(--bg)]/60 mt-1">Warranty</div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="stat-numeral text-[var(--bg)]">10%</div>
                <div className="font-sans text-xs text-[var(--bg)]/60 mt-1">Back if late</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2.3 Start Here (Three Doors) */}
        <section className="wrap py-16 border-t border-[var(--line)]">
          <div className="mb-8">
            <h2>How would you like to begin?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Door 1: Plot */}
            <div className="card-standard flex flex-col justify-between">
              <div>
                <span className="font-sans text-xs text-[var(--muted)] mb-3 block">Plot owner</span>
                <h3 className="mb-3">I own a plot.</h3>
                <p className="font-sans text-sm text-[var(--muted)] leading-relaxed mb-6">
                  Find out what it can hold and what it will cost to build well.
                </p>
              </div>
              <Link
                href="/book-a-call?src=door-plot"
                className="inline-flex items-center justify-between w-full px-5 py-3.5 bg-[var(--ink)] text-[var(--bg)] font-sans font-semibold text-xs hover:bg-[var(--accent)] hover:text-[var(--on-accent)] transition-colors select-none min-h-[48px]"
              >
                <span>Check my plot</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Door 2: Abroad */}
            <div className="card-standard flex flex-col justify-between">
              <div>
                <span className="font-sans text-xs text-[var(--muted)] mb-3 block">NRI clients</span>
                <h3 className="mb-3">I live abroad.</h3>
                <p className="font-sans text-sm text-[var(--muted)] leading-relaxed mb-6">
                  Build in India with weekly video, scans and a live client dashboard.
                </p>
              </div>
              <Link
                href="/book-a-call?src=door-abroad"
                className="inline-flex items-center justify-between w-full px-5 py-3.5 bg-[var(--ink)] text-[var(--bg)] font-sans font-semibold text-xs hover:bg-[var(--accent)] hover:text-[var(--on-accent)] transition-colors select-none min-h-[48px]"
              >
                <span>Plan from abroad</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Door 3: Old House */}
            <div className="card-standard flex flex-col justify-between">
              <div>
                <span className="font-sans text-xs text-[var(--muted)] mb-3 block">Redevelopment</span>
                <h3 className="mb-3">I have an old house.</h3>
                <p className="font-sans text-sm text-[var(--muted)] leading-relaxed mb-6">
                  We survey it, then price retain, strengthen and rebuild options.
                </p>
              </div>
              <Link
                href="/book-a-call?src=door-old"
                className="inline-flex items-center justify-between w-full px-5 py-3.5 bg-[var(--ink)] text-[var(--bg)] font-sans font-semibold text-xs hover:bg-[var(--accent)] hover:text-[var(--on-accent)] transition-colors select-none min-h-[48px]"
              >
                <span>Survey my house</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 2.4 The Problem & Market Failure Risk */}
        <section className="wrap py-16 border-t border-[var(--line)]">
          <div className="max-w-3xl mb-10">
            <h2 className="mb-4">
              62% of under-construction housing projects in 50 Indian cities are delayed.
            </h2>
            <p className="mb-3">
              We commit to the handover date in writing. If we miss it, we refund 10% of the total construction amount. Conditions, scope and exclusions are in your agreement.
            </p>
            <ClaimNote
              source={CLAIMS['c.delay62'].source}
              sourceUrl={CLAIMS['c.delay62'].sourceUrl}
            />
          </div>

          {/* Comparison Table */}
          <div className="border border-[var(--line)] bg-[var(--surface)] mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--line)]">
              <div className="p-4 md:p-6 bg-[var(--wash)] font-sans text-xs text-[var(--muted)]">
                What often happens
              </div>
              <div className="p-4 md:p-6 bg-[var(--surface)] font-sans text-xs text-[var(--ink)] font-semibold">
                What we do
              </div>
            </div>

            <div className="divide-y divide-[var(--line)]">
              {comparisonRows.map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--line)] font-sans text-sm">
                  <div className="p-4 md:p-5 text-[var(--muted)] bg-[var(--wash)]/40">
                    {row.conventional}
                  </div>
                  <div className="p-4 md:p-5 text-[var(--ink)] font-medium">
                    {row.aashraya}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <CtaBand id="home-after-problem" variant="plot-check" />
        </section>

        {/* 2.5 The Guarantee (Dark Band) */}
        <section className="w-full bg-[var(--band)] text-[var(--on-band)] border-y border-[var(--band-line)] py-16">
          <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <p className="font-sans text-sm text-[var(--band-muted)] mb-3">Guarantee</p>
              <h2 className="text-[var(--on-band)] mb-4">
                On time, or 10% back.
              </h2>
              <p className="text-[var(--band-muted)] mb-4">
                Before work starts, your agreement fixes a handover date. If we miss it, we refund 10% of the total construction amount. Every home we have built has been handed over on time, so this has never been needed. It is there so you do not have to take our word for it.
              </p>
              <p className="font-sans text-xs text-[var(--band-muted)] mb-8">
                Conditions are in your agreement.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/book-a-call?src=home-guarantee"
                  className="inline-flex items-center justify-center px-6 py-4 bg-[var(--accent)] text-[var(--on-accent)] font-sans font-bold text-sm hover:opacity-95 select-none min-h-[48px]"
                >
                  Start my project
                </Link>
                <Link
                  href="/guarantee"
                  className="font-sans text-sm text-[var(--on-band)] hover:text-[var(--accent)] underline underline-offset-4"
                >
                  Read the full guarantee →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="border border-[var(--band-line)] bg-[var(--band)] p-6">
                <ShieldCheck className="w-10 h-10 text-[var(--accent)] mb-3" />
                <div className="stat-numeral text-[var(--on-band)] mb-1">10%</div>
                <span className="font-sans text-xs text-[var(--band-muted)]">Refunded if we miss the handover date</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2.6 Technology Wall */}
        <section className="wrap py-16">
          <div className="max-w-3xl mb-10">
            <h2 className="mb-3">Built with instruments, not opinions.</h2>
            <p>
              Most of what goes wrong in a house is hidden behind plaster by the time anyone looks. We measure it before it is covered.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {techTiles.map((t) => (
              <Link
                key={t.id}
                href={`/technology#${t.id}`}
                className="card-standard flex flex-col justify-between group"
              >
                <div>
                  <span className="font-sans text-xs text-[var(--muted)] block mb-2">
                    {t.stage}
                  </span>
                  <h3 className="mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {t.title}
                  </h3>
                  <p className="font-sans text-xs text-[var(--muted)] leading-relaxed">
                    {t.desc}
                  </p>
                </div>
                <div className="mt-4 font-sans text-xs text-[var(--accent)]">
                  Read spec →
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border border-[var(--line)] bg-[var(--wash)]">
            <span className="font-sans text-sm text-[var(--ink)]">
              These instruments apply to every project, including yours.
            </span>
            <Link
              href="/technology"
              className="font-sans text-sm text-[var(--accent)] font-semibold hover:underline shrink-0"
            >
              See all technology details →
            </Link>
          </div>

          <div className="mt-10">
            <CtaBand id="home-tech" variant="tech" />
          </div>
        </section>

        {/* 2.7 Method Teaser */}
        <section className="w-full bg-[var(--band)] text-[var(--on-band)] border-y border-[var(--band-line)] py-16">
          <div className="wrap">
            <div className="max-w-3xl mb-10">
              <h2 className="text-[var(--on-band)] mb-3">
                Nothing is poured, closed or covered until the last stage is checked.
              </h2>
              <Link
                href="/method"
                className="font-sans text-sm text-[var(--accent)] hover:underline"
              >
                Read the full method (8 stages, 4 gates) →
              </Link>
            </div>

            <StageList stages={condensedStages} className="mb-8" />
          </div>
        </section>

        {/* 2.8 Work */}
        <section className="wrap py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2>Homes built, not rendered.</h2>
            </div>
            <div className="font-sans text-xs text-[var(--muted)]">
              30+ built · 50+ designed
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {featuredProjects.map((p: Project) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-sans text-sm text-[var(--ink)] hover:text-[var(--accent)]"
            >
              <span>See all projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-12">
            <CtaBand id="home-projects" variant="projects" />
          </div>
        </section>

        {/* 2.9 Warranty Block */}
        <section className="wrap py-16 border-t border-[var(--line)]">
          <div className="card-standard grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <p className="font-sans text-xs text-[var(--muted)] mb-2">Warranty</p>
              <h2 className="mb-4">15 years. In writing.</h2>
              <p className="mb-6">
                Your home comes with a 15-year warranty from handover. Scope, exclusions and how to make a claim are written into your agreement before you sign.
              </p>
              <Link
                href="/guarantee#warranty"
                className="font-sans text-sm text-[var(--accent)] font-semibold hover:underline"
              >
                Read the warranty section →
              </Link>
            </div>
            <div className="lg:col-span-4">
              <div className="border border-[var(--line)] bg-[var(--wash)] p-6">
                <div className="stat-numeral text-[var(--ink)] mb-1">15 yrs</div>
                <span className="font-sans text-xs text-[var(--muted)]">Warranty coverage from handover</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2.10 NRI Strip */}
        <section className="wrap py-12">
          <div className="card-standard mb-8">
            <h2 className="mb-3">Build in India without flying in for every decision.</h2>
            <p className="mb-4">
              Weekly video walkthroughs, 360° scans at every gate, a live dashboard and a written decision log. Payments follow passed gates.
            </p>
            <Link
              href="/nri"
              className="font-sans text-sm text-[var(--accent)] font-semibold hover:underline inline-block"
            >
              Explore NRI build management →
            </Link>
          </div>

          <CtaBand id="home-nri" variant="nri" />
        </section>

        {/* 2.11 Services */}
        <section className="wrap py-16 border-t border-[var(--line)]">
          <div className="mb-10">
            <h2>One studio. Complete responsibility.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="card-standard flex flex-col justify-between">
              <div>
                <h3 className="mb-2">Free plot check</h3>
                <p className="font-sans text-xs text-[var(--muted)] leading-relaxed mb-6">
                  A written note on your plot: setbacks, coverage, FAR and the main risks.
                </p>
              </div>
              <Link
                href="/book-a-call?src=home-svc-plot"
                className="inline-flex items-center justify-center w-full py-3 px-4 bg-[var(--accent)] text-[var(--on-accent)] font-sans font-bold text-xs min-h-[48px]"
              >Get my plot check</Link>
            </div>

            {/* Card 2 */}
            <div className="card-standard flex flex-col justify-between">
              <div>
                <h3 className="mb-2">Design and build</h3>
                <p className="font-sans text-xs text-[var(--muted)] leading-relaxed mb-6">
                  One agreement for design, structure, approvals, construction and interiors.
                </p>
              </div>
              <Link
                href="/services/design-build"
                className="inline-flex items-center justify-center w-full py-3 px-4 border border-[var(--line)] bg-[var(--bg)] font-sans text-xs min-h-[48px] hover:bg-[var(--wash)]"
              >
                Learn more →
              </Link>
            </div>

            {/* Card 3 */}
            <div className="card-standard flex flex-col justify-between">
              <div>
                <h3 className="mb-2">NRI remote build</h3>
                <p className="font-sans text-xs text-[var(--muted)] leading-relaxed mb-6">
                  A reporting system built so you do not need to be on site.
                </p>
              </div>
              <Link
                href="/services/nri-remote-build"
                className="inline-flex items-center justify-center w-full py-3 px-4 border border-[var(--line)] bg-[var(--bg)] font-sans text-xs min-h-[48px] hover:bg-[var(--wash)]"
              >
                Learn more →
              </Link>
            </div>

            {/* Card 4 */}
            <div className="card-standard flex flex-col justify-between">
              <div>
                <h3 className="mb-2">Redevelopment</h3>
                <p className="font-sans text-xs text-[var(--muted)] leading-relaxed mb-6">
                  Old houses, tight plots, basements, farmhouses.
                </p>
              </div>
              <Link
                href="/services/redevelopment"
                className="inline-flex items-center justify-center w-full py-3 px-4 border border-[var(--line)] bg-[var(--bg)] font-sans text-xs min-h-[48px] hover:bg-[var(--wash)]"
              >
                Learn more →
              </Link>
            </div>
          </div>
        </section>

        {/* 2.12 Tools Banner */}
        <section className="wrap py-12">
          <div className="card-standard flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="mb-2">Draw your plot. See the buildable area.</h2>
              <p className="font-sans text-sm text-[var(--muted)] leading-relaxed">
                The feasibility tool draws setbacks and the buildable footprint from the Bihar Building Bye-laws 2014. For plots in Gurugram and Delhi, we run the check by hand and send it to you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch gap-3 shrink-0">
              <Link
                href="/calculators/site-feasibility"
                className="inline-flex items-center justify-center px-5 py-3 border border-[var(--line)] bg-[var(--bg)] font-sans text-xs min-h-[48px] hover:bg-[var(--wash)]"
              >
                Try the tool
              </Link>
              <Link
                href="/book-a-call?src=home-tools"
                className="inline-flex items-center justify-center px-5 py-3 bg-[var(--accent)] text-[var(--on-accent)] font-sans font-bold text-xs min-h-[48px]"
              >
                Get a free plot check
              </Link>
            </div>
          </div>
        </section>

        {/* 2.13 Areas */}
        <section className="wrap py-16 border-t border-[var(--line)]">
          <div className="mb-10">
            <h2>Regions we design and build in</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/areas/gurugram"
              className="card-standard hover:border-[var(--ink)] transition-colors group block"
            >
              <p className="font-sans text-xs text-[var(--muted)] mb-2">Focus area</p>
              <h3 className="mb-2 group-hover:text-[var(--accent)] transition-colors">
                Delhi NCR (Gurugram & Delhi)
              </h3>
              <p className="font-sans text-sm text-[var(--muted)] leading-relaxed">
                Private homes, farmhouse plots, and tight-plot redevelopments from our Gurugram office.
              </p>
            </Link>

            <Link
              href="/areas/patna"
              className="card-standard hover:border-[var(--ink)] transition-colors group block"
            >
              <p className="font-sans text-xs text-[var(--muted)] mb-2">Regional studio</p>
              <h3 className="mb-2 group-hover:text-[var(--accent)] transition-colors">
                Patna & Bihar
              </h3>
              <p className="font-sans text-sm text-[var(--muted)] leading-relaxed">
                Climate-responsive homes with courtyards and shaded verandas, where our studio began.
              </p>
            </Link>

            <Link
              href="/areas/almora"
              className="card-standard hover:border-[var(--ink)] transition-colors group block"
            >
              <p className="font-sans text-xs text-[var(--muted)] mb-2">Regional desk</p>
              <h3 className="mb-2 group-hover:text-[var(--accent)] transition-colors">
                Almora & Uttarakhand
              </h3>
              <p className="font-sans text-sm text-[var(--muted)] leading-relaxed">
                Homes on steep hill sites where slope, drainage and access define structural integrity.
              </p>
            </Link>
          </div>
        </section>

        {/* 2.14 FAQ */}
        <section className="wrap py-16 border-t border-[var(--line)]">
          <div className="mb-10">
            <h2>Frequently asked questions</h2>
          </div>

          <Faq items={homeFaqs} />
        </section>

        {/* 2.15 Final CTA */}
        <section className="w-full bg-[var(--surface)] border-t border-[var(--line)] py-16">
          <div className="wrap">
            <h2 className="mb-4">Send us your plot.</h2>
            <p className="mb-8">
              We reply in writing within 2 working days with what your plot allows: setbacks, coverage, FAR and key risks.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-10">
              <Link
                href="/book-a-call?src=home-final"
                className="inline-flex items-center justify-center px-8 py-4 bg-[var(--accent)] text-[var(--on-accent)] font-sans font-bold text-sm hover:opacity-95 select-none min-h-[48px]"
              >
                Get my free plot check
              </Link>

              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-[var(--line)] bg-[var(--bg)] font-sans text-xs text-[var(--ink)] hover:bg-[var(--wash)] select-none min-h-[48px]"
              >
                <Phone className="w-4 h-4 text-[var(--accent)]" />
                <span>Call {siteConfig.phoneDisplay}</span>
              </a>

              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-[var(--line)] bg-[var(--bg)] font-sans text-xs text-[var(--ink)] hover:bg-[var(--wash)] select-none min-h-[48px]"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp us</span>
              </a>
            </div>

            <div className="flex items-center gap-2 font-sans text-xs text-[var(--muted)]">
              <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <span>{siteConfig.address}</span>
              <span>·</span>
              <a
                href={siteConfig.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >Get directions ↗</a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
