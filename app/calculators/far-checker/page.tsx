'use client'

import React, { useState } from 'react'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Notice } from '@/components/ui/Notice'
import { Button } from '@/components/ui/Button'
import CtaBand from '@/components/ui/CtaBand'
import { trackCalculatorComplete } from '@/lib/analytics'
import { Ruler } from 'lucide-react'
import { FAR_PRESETS } from '@/lib/calculator-constants'

const FAR_FAQ_DATA = [
  { q: 'What is FAR and why does it matter?', a: 'Floor Area Ratio (FAR) determines the total built-up area allowed on your plot. For example, a FAR of 2.0 on a 1,000 sq ft plot means you can build up to 2,000 sq ft across all floors. Knowing your FAR prevents legal issues and helps plan your home design.' },
  { q: 'What determines the FAR limit for a plot?', a: 'FAR varies by municipal authority, plot size, and abutting road width. Gurugram (HSVP/DTCP), Delhi (MPD 2021), and regional building bye-laws set specific base FAR and purchasable FAR limits.' },
  { q: 'Can I build a basement? Does it count in FAR?', a: 'Basements used for parking or utilities within permissible setbacks are generally exempt from FAR calculations across most urban development authorities, subject to local bye-law conditions.' },
  { q: 'How do I maximize buildable area on a plot?', a: 'Work with an architect to optimize floor plan efficiency, utilize permissible exemptions (balconies, stilt parking), and purchase additional FAR where available under municipal norms.' },
]

function FarFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  return (
    <div className="flex flex-col border-t border-[var(--line)]">
      {FAR_FAQ_DATA.map((faq, i) => (
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

const roadOptions = [
  { key: 'narrow', label: 'Narrow lane (< 9 ft road)', detail: 'FAR 1.5, Coverage 50%' },
  { key: 'standard', label: 'Standard road (9–18 ft)', detail: 'FAR 2.0, Coverage 60%' },
  { key: 'wide', label: 'Wide road / Main road (> 18 ft)', detail: 'FAR 2.5, Coverage 70%' },
]

export default function FARCheckerPage() {
  const [plotArea, setPlotArea] = useState('')
  const [roadType, setRoadType] = useState('standard')
  const [result, setResult] = useState<{
    maxBuiltUp: number
    maxGroundCoverage: number
    approxFloors: number
    far: number
    coverage: number
  } | null>(null)

  const handleCalculate = () => {
    const sqft = parseInt(plotArea)
    if (!sqft || sqft <= 0) return

    const preset = FAR_PRESETS[roadType as keyof typeof FAR_PRESETS] || FAR_PRESETS.standard
    const maxBuiltUp = sqft * preset.far
    const maxGroundCoverage = sqft * preset.coverage
    const approxFloors = Math.round(maxBuiltUp / maxGroundCoverage)

    setResult({
      maxBuiltUp,
      maxGroundCoverage,
      approxFloors,
      far: preset.far,
      coverage: preset.coverage,
    })

    trackCalculatorComplete('far_checker', {
      plot_area: sqft,
      plot_type: roadType,
      permissible_built_up: maxBuiltUp,
      ground_coverage: maxGroundCoverage,
    })
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Tools', href: '/calculators' },
    { label: 'FAR Checker' },
  ]

  return (
    <article className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      {/* Breadcrumb & Header */}
      <div className="wrap pt-8 pb-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[0.92] mb-4">
          FAR & Setback Checker
        </h1>
        <p className="font-sans text-base md:text-lg text-[var(--muted)] max-w-2xl leading-relaxed mb-6">
          Check permissible Floor Area Ratio (FAR), ground coverage limits, and mandatory setbacks from plot dimensions.
        </p>

        {/* Coverage notice per Section 12 */}
        <Notice
          label="Rules coverage"
          actionText="Get a free plot check"
          actionHref="/book-a-call?src=tool-far-coverage"
        >
          Rules loaded: Bihar Building Bye-laws 2014. For plots in Gurugram and Delhi, we run the check by hand.
        </Notice>
      </div>

      {/* Form section */}
      <section className="py-12 md:py-16 border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="wrap max-w-xl mx-auto">
          <div className="border-[1.5px] border-[var(--ink)] bg-[var(--bg)] p-6 sm:p-8 space-y-6">
            <h2 className="font-display font-bold text-2xl text-[var(--ink)]">
              Calculate Maximum Permissible Area
            </h2>

            {/* Plot Area */}
            <div>
              <label className="block font-mono text-xs text-[var(--muted)] mb-2">
                Plot Area (sq ft)
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="e.g. 2000"
                  value={plotArea}
                  onChange={(e) => setPlotArea(e.target.value)}
                  className="w-full px-4 py-3 border-[1.5px] border-[var(--ink)] bg-[var(--surface)] font-mono text-base text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
            </div>

            {/* Road width */}
            <div>
              <label className="block font-mono text-xs text-[var(--muted)] mb-3">
                Road Width / Frontage Category
              </label>
              <div className="space-y-3">
                {roadOptions.map((option) => (
                  <label
                    key={option.key}
                    className={`flex items-start gap-3 p-4 border-[1.5px] cursor-pointer transition-colors ${
                      roadType === option.key
                        ? 'border-[var(--accent)] bg-[var(--surface)]'
                        : 'border-[var(--line)] bg-[var(--bg)] hover:border-[var(--ink)]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="roadType"
                      value={option.key}
                      checked={roadType === option.key}
                      onChange={(e) => setRoadType(e.target.value)}
                      className="mt-1 accent-[var(--accent)]"
                    />
                    <div>
                      <p className="font-sans text-sm font-semibold text-[var(--ink)]">{option.label}</p>
                      <p className="font-mono text-xs text-[var(--muted)] mt-0.5">{option.detail}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Calculate button */}
            <Button
              variant="primary"
              className="w-full"
              onClick={handleCalculate}
            >
              <Ruler size={18} className="mr-2 inline" /> Check Buildable Area
            </Button>
          </div>
        </div>
      </section>

      {/* Result Card */}
      {result && (
        <section className="py-12 border-b border-[var(--line)] bg-[var(--bg)]">
          <div className="wrap max-w-xl mx-auto">
            <div className="border-[1.5px] border-[var(--ink)] bg-[var(--surface)] p-6 sm:p-8 space-y-6">
              <div>
                <span className="font-mono text-xs text-[var(--muted)] font-semibold block mb-1">
                  Permissible Built-up Area
                </span>
                <div className="font-display font-extrabold text-4xl text-[var(--accent-text)]">
                  {result.maxBuiltUp.toLocaleString()} <span className="text-xl font-sans font-normal text-[var(--ink)]">sq ft</span>
                </div>
                <p className="font-mono text-xs text-[var(--muted)] mt-1">
                  FAR: {result.far.toFixed(1)} on {parseInt(plotArea).toLocaleString()} sq ft plot
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-[var(--line)] pt-4">
                <div>
                  <span className="font-mono text-xs text-[var(--muted)] block mb-1">
                    Max Ground Footprint
                  </span>
                  <p className="font-sans font-bold text-lg text-[var(--ink)]">
                    {result.maxGroundCoverage.toLocaleString()} sq ft
                  </p>
                  <span className="font-mono text-xs text-[var(--muted)]">({(result.coverage * 100).toFixed(0)}% coverage)</span>
                </div>
                <div>
                  <span className="font-mono text-xs text-[var(--muted)] block mb-1">
                    Potential Height
                  </span>
                  <p className="font-sans font-bold text-lg text-[var(--ink)]">
                    ~{result.approxFloors} Floors
                  </p>
                  <span className="font-mono text-xs text-[var(--muted)]">(Subject to setbacks)</span>
                </div>
              </div>

              <p className="font-mono text-xs text-[var(--muted)] italic leading-relaxed">
                *Governed by Bihar Building Bye-laws 2014. For plots in Gurugram, Delhi NCR, and Haryana, contact us for an individualized manual check.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="wrap max-w-xl mx-auto">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--ink)] mb-6">
            FAR & Setback FAQs
          </h2>
          <FarFAQ />
        </div>
      </section>

      {/* Result CTA Band */}
      <CtaBand id="tool-far-result" variant="plot-check" />
    </article>
  )
}
