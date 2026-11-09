import React from 'react'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site'
import { CtaBand } from '@/components/ui/CtaBand'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Faq } from '@/components/ui/Faq'
import { guaranteeFaqs, generateFaqSchema } from '@/lib/faq-data'
import { ShieldCheck, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'On-Time Handover Guarantee and 15-Year Warranty | Studio Aashraya',
  description:
    'If we miss the handover date in your agreement, we refund 10% of the construction amount. 15-year warranty from handover on private homes in Gurugram and Delhi NCR.',
  alternates: {
    canonical: `${siteConfig.siteUrl}/guarantee`,
  },
}

export default function GuaranteePage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Guarantee', href: '/guarantee' },
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

  const faqSchema = generateFaqSchema(guaranteeFaqs)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-8 pb-12">
          <Breadcrumb items={breadcrumbItems} className="mb-6" />

                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[0.92] mb-6 max-w-4xl">
            On time, or 10% back.
          </h1>
          <p className="font-sans text-lg md:text-xl text-[var(--muted)] max-w-3xl leading-relaxed">
            Before work starts, your agreement fixes a handover date. If we miss it, we refund 10% of the total construction amount.
          </p>
        </div>

        {/* Top CTA */}
        <CtaBand id="guarantee-top" variant="guarantee" />

        {/* Main Content */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
          {/* Guarantee Badge Callout */}
          <div className="p-8 md:p-12 border border-[var(--line)] bg-[var(--surface)] mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-[var(--accent)] text-[var(--on-accent)] font-display font-extrabold text-4xl flex flex-col items-center justify-center shrink-0">
                <span>10%</span>
                <span className="font-mono text-[10px]">Back</span>
              </div>
              <div>
                <span className="font-mono text-xs text-[var(--accent)] font-semibold block mb-1">
                  Track Record
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-2">
                  Every home we have built has been handed over on time.
                </h2>
                <p className="font-sans text-sm md:text-base text-[var(--muted)]">
                  This refund has never been needed. It is there so you do not have to take our word for it.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works (Numbered Sequence) */}
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold mb-8">
              How the guarantee works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border border-[var(--line)] bg-[var(--surface)]">
                <span className="font-mono text-sm font-bold text-[var(--accent)] block mb-3">01</span>
                <h3 className="font-display text-xl font-bold mb-2">Fixed Handover Date</h3>
                <p className="font-sans text-sm text-[var(--muted)] leading-relaxed">
                  The handover date is fixed in your agreement before ground is broken.
                </p>
              </div>

              <div className="p-6 border border-[var(--line)] bg-[var(--surface)]">
                <span className="font-mono text-sm font-bold text-[var(--accent)] block mb-3">02</span>
                <h3 className="font-display text-xl font-bold mb-2">Weekly Reporting</h3>
                <p className="font-sans text-sm text-[var(--muted)] leading-relaxed">
                  We report progress against it every week on your live client dashboard.
                </p>
              </div>

              <div className="p-6 border border-[var(--line)] bg-[var(--surface)]">
                <span className="font-mono text-sm font-bold text-[var(--accent)] block mb-3">03</span>
                <h3 className="font-display text-xl font-bold mb-2">10% Refund</h3>
                <p className="font-sans text-sm text-[var(--muted)] leading-relaxed">
                  If the date passes, the refund is paid as set out in your agreement.
                </p>
              </div>
            </div>
            <p className="font-mono text-xs text-[var(--muted)] mt-4">
              What the agreement states: the handover date; the conditions that can move it, such as changes you request or delays by the authority; and how the refund is paid. Conditions are in your agreement.
            </p>
          </div>

          {/* 15-Year Warranty Section */}
          <div id="warranty" className="p-8 md:p-12 border border-[var(--line)] bg-[var(--surface)] mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-8 h-8 text-[var(--accent)]" />
                          </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-4">
              15-year warranty.
            </h2>
            <p className="font-sans text-base md:text-lg text-[var(--muted)] leading-relaxed mb-6 max-w-3xl">
              Your home comes with a 15-year warranty from handover. Scope, exclusions and how to make a claim are written into your agreement before you sign. Ask us about the terms in your consultation.
            </p>
          </div>

          {/* Why We Can Offer Both */}
          <div className="p-8 border border-[var(--line)] bg-[var(--wash)] mb-16">
            <h3 className="font-display text-2xl font-bold mb-6">
              Why we can offer both
            </h3>
            <ul className="space-y-4 font-sans text-base text-[var(--ink)]">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                <span><strong>One accountable team:</strong> The architect who designs the home also constructs it.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                <span><strong>Gate records at four stages:</strong> Nothing is poured, closed or covered without written inspection records.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                <span><strong>Instruments that measure:</strong> Concrete lab tests, pulse velocity, rebar scans and flood-tested waterproofing.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                <span><strong>A transparent dashboard:</strong> Reports schedule and cost directly against the contract handover date.</span>
              </li>
            </ul>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="font-display text-3xl font-bold mb-6">
              Guarantee & Warranty Questions
            </h2>
            <Faq items={guaranteeFaqs} />
          </div>
        </section>

        {/* Mid CTA */}
        <CtaBand id="guarantee-mid" variant="guarantee" />

        {/* End CTA */}
        <CtaBand id="guarantee-end" variant="plot-check" />
      </article>
    </>
  )
}
