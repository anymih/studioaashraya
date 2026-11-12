'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Notice } from '@/components/ui/Notice'
import { Button } from '@/components/ui/Button'
import CtaBand from '@/components/ui/CtaBand'
import { trackCalculatorComplete } from '@/lib/analytics'
import { Calculator } from 'lucide-react'
import { COST_RATES, TIMELINE, formatLakhs } from '@/lib/calculator-constants'

const COST_FAQ_DATA = [
  { q: 'How much does it cost to build a house?', a: 'Construction cost typically ranges from ₹1,400–₹3,200 per sq ft depending on the location, soil conditions, and finish quality (basic, standard, or premium). For Gurugram and Delhi NCR plots, cost structures depend on basement excavation, stilt parking, and local municipal bylaws.' },
  { q: 'What factors affect house construction cost?', a: 'Key factors include plot location, soil conditions, structural requirements, number of basements/floors, material specifications, and design complexity.' },
  { q: 'Does an architect increase building cost?', a: 'An architect helps optimize costs by avoiding structural and spatial errors, reducing material waste, and ensuring disciplined procurement. Turnkey architectural execution eliminates contractor markups.' },
  { q: 'How do I plan my construction budget?', a: 'Start with your permissible built-up area and define requirements clearly before excavation. Working with a single design-and-build team ensures budget alignment from the first sketch.' },
]

function CostFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  return (
    <div className="flex flex-col border-t border-[var(--line)]">
      {COST_FAQ_DATA.map((faq, i) => (
        <div key={i} className="border-b border-[var(--line)]">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex justify-between items-center py-4 text-left gap-3 bg-transparent border-0 cursor-pointer"
          >
            <span className="font-sans text-sm font-semibold text-[var(--ink)] leading-snug">{faq.q}</span>
            <span className="text-lg font-mono text-[var(--accent-text)] shrink-0 transition-transform">
              {openIdx === i ? '−' : '+'}
            </span>
          </button>
          {openIdx === i && (
            <p className="font-sans text-xs sm:text-sm text-[var(--muted)] leading-relaxed pb-4">
              {faq.a}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

const cities = ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Delhi NCR', 'Other'] as const
const qualities = ['Basic', 'Standard', 'Premium'] as const

export default function CostEstimatorPage() {
  const [area, setArea] = useState('')
  const [quality, setQuality] = useState('Standard')
  const [city, setCity] = useState<string>('Patna')
  const [isNcr, setIsNcr] = useState(false)
  const [result, setResult] = useState<{
    min: number
    max: number
    perSqFtMin: number
    perSqFtMax: number
    timeline: string
  } | null>(null)

  const handleCalculate = () => {
    const sqft = parseInt(area)
    if (!sqft || sqft <= 0) return

    if (city === 'Delhi NCR') {
      setIsNcr(true)
      setResult(null)
      trackCalculatorComplete('cost_estimator', {
        built_up_area: sqft,
        quality_level: quality,
        city: 'Delhi NCR',
      })
      return
    }

    setIsNcr(false)
    const rates = COST_RATES[city as keyof typeof COST_RATES] || COST_RATES.Other
    const selectedRates = rates[quality as keyof typeof rates] || rates.Standard
    const min = sqft * selectedRates[0]
    const max = sqft * selectedRates[1]

    setResult({
      min,
      max,
      perSqFtMin: selectedRates[0],
      perSqFtMax: selectedRates[1],
      timeline: TIMELINE[quality as keyof typeof TIMELINE],
    })

    trackCalculatorComplete('cost_estimator', {
      built_up_area: sqft,
      quality_level: quality,
      city: city,
      result_min: min,
      result_max: max,
    })
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Tools', href: '/calculators' },
    { label: 'Cost Estimator' },
  ]

  return (
    <article className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      {/* Breadcrumb & Header */}
      <div className="wrap pt-8 pb-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[0.92] mb-4">
          Construction Cost Estimator
        </h1>
        <p className="font-sans text-base md:text-lg text-[var(--muted)] max-w-2xl leading-relaxed mb-6">
          Calculate indicative construction budgets by built-up area and finish specifications.
        </p>

        {/* Coverage notice per Section 12 */}
        <Notice label="Rates coverage">
          Rates loaded: Bihar tiers. For Delhi NCR we give an indicative range on request. A fixed figure always comes with a bill of quantities.
        </Notice>
      </div>

      {/* Top CTA Band */}
      <CtaBand id="tool-cost-top" variant="plot-check" />

      {/* Form section */}
      <section className="py-12 md:py-16 border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="wrap max-w-xl mx-auto">
          <div className="border-[1.5px] border-[var(--ink)] bg-[var(--bg)] p-6 sm:p-8 space-y-6">
            <h2 className="font-display font-bold text-2xl text-[var(--ink)]">
              Estimate Your Build
            </h2>

            {/* Area input */}
            <div>
              <label className="block font-mono text-xs text-[var(--muted)] mb-2">
                Built-up Area (sq ft)
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="e.g. 2500"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-4 py-3 border-[1.5px] border-[var(--ink)] bg-[var(--surface)] font-mono text-base text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
            </div>

            {/* Quality dropdown */}
            <div>
              <label className="block font-mono text-xs text-[var(--muted)] mb-2">
                Specification Standard
              </label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full px-4 py-3 border-[1.5px] border-[var(--ink)] bg-[var(--surface)] font-mono text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] cursor-pointer"
              >
                {qualities.map((q) => (
                  <option key={q} value={q}>
                    {q} Specification
                  </option>
                ))}
              </select>
            </div>

            {/* City dropdown */}
            <div>
              <label className="block font-mono text-xs text-[var(--muted)] mb-2">
                Location / Region
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 border-[1.5px] border-[var(--ink)] bg-[var(--surface)] font-mono text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] cursor-pointer"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Calculate button */}
            <Button
              variant="primary"
              className="w-full"
              onClick={handleCalculate}
            >
              <Calculator size={18} className="mr-2 inline" /> Calculate Estimate
            </Button>
          </div>
        </div>
      </section>

      {/* Result Section */}
      {(result || isNcr) && (
        <section className="py-12 border-b border-[var(--line)] bg-[var(--bg)]">
          <div className="wrap max-w-xl mx-auto">
            {isNcr ? (
              <div className="border-[1.5px] border-[var(--accent)] bg-[var(--surface)] p-6 sm:p-8 space-y-4">
                <span className="font-mono text-xs text-[var(--accent-text)] font-semibold block">
                  Delhi NCR Estimate
                </span>
                <h3 className="font-display font-extrabold text-3xl text-[var(--ink)]">
                  Indicative range on request
                </h3>
                <p className="font-sans text-base text-[var(--muted)] leading-relaxed">
                  For plots in Gurugram and Delhi NCR, construction cost varies by basement requirement, soil condition, and structural frame specifications. We give an indicative range on request, followed by a detailed bill of quantities after consultation.
                </p>
                <div className="pt-2">
                  <Link
                    href="/book-a-call?src=tool-cost-result"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--accent)] text-[var(--on-accent)] font-mono text-xs font-semibold hover:bg-[var(--ink)] transition-colors"
                  >
                    Get Indicative Quote &rarr;
                  </Link>
                </div>
              </div>
            ) : result ? (
              <div className="border-[1.5px] border-[var(--ink)] bg-[var(--surface)] p-6 sm:p-8 space-y-6">
                <div>
                  <span className="font-mono text-xs text-[var(--muted)] font-semibold block mb-1">
                    Market Rate Estimate ({city})
                  </span>
                  <div className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--accent-text)]">
                    {formatLakhs(result.min)} – {formatLakhs(result.max)}
                  </div>
                  <p className="font-mono text-xs text-[var(--muted)] mt-1">
                    Approx. ₹{result.perSqFtMin.toLocaleString()} – ₹{result.perSqFtMax.toLocaleString()} per sq ft
                  </p>
                </div>

                <div className="border-t border-[var(--line)] pt-4">
                  <span className="font-mono text-xs text-[var(--muted)] block mb-1">
                    Estimated Construction Timeline
                  </span>
                  <p className="font-sans font-semibold text-base text-[var(--ink)]">{result.timeline}</p>
                </div>

                <p className="font-mono text-xs text-[var(--muted)] italic leading-relaxed">
                  *Indicative estimate based on local rates. Final construction cost is guaranteed in writing with a complete bill of quantities.
                </p>
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="wrap max-w-xl mx-auto">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--ink)] mb-6">
            Cost & Estimation FAQs
          </h2>
          <CostFAQ />
        </div>
      </section>

      {/* Result CTA Band */}
      <CtaBand id="tool-cost-result" variant="plot-check" />
    </article>
  )
}
