'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { trackCalculatorComplete, trackCTAClick } from '@/lib/analytics'
import { Ruler } from 'lucide-react'
import { FAR_PRESETS } from '@/lib/calculator-constants'

const FAR_FAQ_DATA = [
  { q: 'What is FAR and why does it matter?', a: 'Floor Area Ratio (FAR) determines the total built-up area allowed on your plot. For example, a FAR of 2.0 on a 1,000 sq ft plot means you can build up to 2,000 sq ft across all floors. Knowing your FAR prevents legal issues and helps plan your home design.' },
  { q: 'What is the FAR limit in Patna?', a: 'FAR in Patna varies by zone and road width. Typical residential plots on wider roads get FAR of 2.0–2.5, while narrow-lane plots may be limited to 1.5. Municipal rules also set ground coverage limits (usually 50–60%).' },
  { q: 'Can I build a basement? Does it count in FAR?', a: 'Basements are generally allowed in Patna under certain conditions. Depending on local building bylaws, basements used for parking or utilities may be partially or fully exempt from FAR calculations.' },
  { q: 'How do I maximize buildable area on a small plot?', a: 'Work with an architect to optimize floor plan efficiency, use stilt parking to free ground coverage, design vertically where FAR allows multiple floors, and eliminate wasted corridor space. An architect in Patna familiar with local norms can help significantly.' },
]

function FarFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {FAR_FAQ_DATA.map((faq, i) => (
        <div key={i} style={{ borderBottom: '1px solid #E2D8CA' }}>
          <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', textAlign: 'left', gap: '12px' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 500, color: '#184A45', lineHeight: 1.5 }}>{faq.q}</span>
            <span style={{ fontSize: '18px', color: '#184A45', flexShrink: 0, transition: 'transform 0.2s ease', transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
          </button>
          <div style={{ maxHeight: openIdx === i ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#666666', lineHeight: 1.7, margin: '0 0 16px 0' }}>{faq.a}</p>
          </div>
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

    const preset = FAR_PRESETS[roadType]
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

  return (
    <>
      {/* Page header */}
      <section className="pt-10 pb-6 px-4 text-center">
        <h1 className="font-heading text-[var(--text-h1-m)] md:text-[var(--text-h1)] mb-3">
          FAR &amp; Built-up Area Checker for Patna
        </h1>
        <p className="text-muted font-body max-w-xl mx-auto">
          FAR (Floor Area Ratio) determines how much total built-up area you can construct on your plot.
          A higher FAR means you can build more floors.
        </p>
      </section>

      {/* Form card */}
      <section className="px-4 pb-8">
        <div className="max-w-[480px] mx-auto bg-surface rounded-card shadow-card border border-border p-6 md:p-8">
          {/* Plot area */}
          <div className="mb-5">
            <label className="block text-sm font-body font-medium mb-2">Plot Area</label>
            <div className="relative">
              <input
                type="number"
                placeholder="e.g. 2000"
                value={plotArea}
                onChange={(e) => setPlotArea(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-input font-body text-sm
                           bg-bg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                           transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-xs font-body">
                sq ft
              </span>
            </div>
          </div>

          {/* Road width */}
          <div className="mb-6">
            <label className="block text-sm font-body font-medium mb-2">Road Width / Plot Type</label>
            <div className="space-y-2">
              {roadOptions.map((option) => (
                <label
                  key={option.key}
                  className={`flex items-start gap-3 p-3 rounded-input border cursor-pointer transition-all ${
                    roadType === option.key
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="roadType"
                    value={option.key}
                    checked={roadType === option.key}
                    onChange={(e) => setRoadType(e.target.value)}
                    className="mt-1 accent-primary"
                  />
                  <div>
                    <p className="text-sm font-body font-medium">{option.label}</p>
                    <p className="text-xs text-muted font-body">{option.detail}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Calculate button */}
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleCalculate}
            icon={<Ruler size={18} />}
          >
            Check Buildable Area
          </Button>
        </div>
      </section>

      {/* Result card */}
      {result && (
        <section className="px-4 pb-8 animate-fade-in-up">
          <div className="max-w-[480px] mx-auto bg-surface rounded-card shadow-card border border-border p-6 md:p-8">
            <div className="grid grid-cols-1 gap-4">
              {/* Max built-up */}
              <div>
                <p className="text-sm text-muted font-body mb-1">Max Built-up Area</p>
                <p className="font-heading text-[var(--text-h2)] text-primary">
                  {result.maxBuiltUp.toLocaleString()} sq ft
                </p>
                <p className="text-xs text-muted font-body">FAR: {result.far}×</p>
              </div>

              {/* Ground coverage */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted font-body mb-1">Max Ground Coverage</p>
                <p className="font-body font-semibold text-lg text-text">
                  {result.maxGroundCoverage.toLocaleString()} sq ft
                </p>
                <p className="text-xs text-muted font-body">Coverage: {(result.coverage * 100).toFixed(0)}%</p>
              </div>

              {/* Floors */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted font-body mb-1">Floors (approx)</p>
                <p className="font-body font-semibold text-lg text-text">
                  {result.approxFloors} floors
                </p>
              </div>
            </div>

            <p className="mt-5 text-xs text-muted font-body italic leading-relaxed">
              *Indicative only — actual limits depend on local authority rules and specific plot conditions.
              Setbacks, zoning, and other regulations may further restrict buildable area.
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-4 pb-12">
        <div className="max-w-[480px] mx-auto bg-primary rounded-2xl p-6 md:p-8 text-center">
          <h3 className="font-heading text-xl text-white mb-2">
            Understand what this means for your plot
          </h3>
          <p className="text-white/70 font-body text-sm mb-5">
            Let us help you plan the optimum design within your FAR limits.
          </p>
          <Button
            href="/book-a-call"
            onClick={() => trackCTAClick('discuss_far_results', 'calculator_result')}
            variant="secondary"
            className="!border-white !text-white hover:!bg-white hover:!text-primary"
          >
            Book a Call
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 pb-16">
        <div className="max-w-[480px] mx-auto">
          <h2 className="font-heading text-2xl text-primary mb-6">
            FAR & Plot Planning FAQs
          </h2>
          <FarFAQ />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAR_FAQ_DATA.map(faq => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }) }}
        />
      </section>
    </>
  )
}
