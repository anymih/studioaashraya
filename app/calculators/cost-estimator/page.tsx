'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { trackCalculatorComplete, trackCTAClick } from '@/lib/analytics'
import { Calculator, Info } from 'lucide-react'
import { COST_RATES, TIMELINE, QUALITY_DESCRIPTIONS, formatLakhs } from '@/lib/calculator-constants'

const cities = ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Other'] as const
const qualities = ['Basic', 'Standard', 'Premium'] as const

export default function CostEstimatorPage() {
  const [area, setArea] = useState('')
  const [quality, setQuality] = useState('Standard')
  const [city, setCity] = useState('Patna')
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

    const rates = COST_RATES[city][quality]
    const min = sqft * rates[0]
    const max = sqft * rates[1]

    setResult({
      min,
      max,
      perSqFtMin: rates[0],
      perSqFtMax: rates[1],
      timeline: TIMELINE[quality],
    })

    trackCalculatorComplete('cost_estimator', {
      built_up_area: sqft,
      quality_level: quality,
      city: city,
      result_min: min,
      result_max: max,
    })
  }

  return (
    <>
      {/* Page header */}
      <section className="pt-10 pb-6 px-4 text-center">
        <h1 className="font-heading text-[var(--text-h1-m)] md:text-[var(--text-h1)] mb-3">
          Construction Cost Estimator for Bihar
        </h1>
        <p className="text-muted font-body max-w-xl mx-auto">
          Get Bihar-specific construction cost estimates based on current market rates in your city.
        </p>
      </section>

      {/* Form card */}
      <section className="px-4 pb-8">
        <div className="max-w-[480px] mx-auto bg-surface rounded-card shadow-card border border-border p-6 md:p-8">
          {/* Area input */}
          <div className="mb-5">
            <label className="block text-sm font-body font-medium mb-2">Built-up Area</label>
            <div className="relative">
              <input
                type="number"
                placeholder="e.g. 1500"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-input font-body text-sm
                           bg-bg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                           transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-xs font-body">
                sq ft
              </span>
            </div>
          </div>

          {/* Quality dropdown */}
          <div className="mb-5">
            <label className="block text-sm font-body font-medium mb-2">Construction Quality</label>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-input font-body text-sm
                         bg-bg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                         transition-all cursor-pointer appearance-none"
            >
              {qualities.map((q) => (
                <option key={q} value={q}>
                  {q} {q === 'Standard' ? '(Recommended)' : ''}
                </option>
              ))}
            </select>
            <div className="mt-2 flex items-start gap-1.5 text-xs text-muted">
              <Info size={12} className="mt-0.5 shrink-0" />
              <span>{QUALITY_DESCRIPTIONS[quality]}</span>
            </div>
          </div>

          {/* City dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-body font-medium mb-2">City in Bihar</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-input font-body text-sm
                         bg-bg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                         transition-all cursor-pointer appearance-none"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c === 'Other' ? 'Other Bihar City' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Calculate button */}
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleCalculate}
            icon={<Calculator size={18} />}
          >
            Calculate Estimate
          </Button>
        </div>
      </section>

      {/* Result card */}
      {result && (
        <section className="px-4 pb-8 animate-fade-in-up">
          <div className="max-w-[480px] mx-auto bg-surface rounded-card shadow-card border border-border p-6 md:p-8">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] text-muted font-body uppercase tracking-wider">
                Current Market Estimate
              </span>
            </div>

            <div className="mb-4">
              <p className="text-sm text-muted font-body mb-1">Estimated Cost Range</p>
              <p className="font-heading text-[var(--text-h2)] text-primary">
                {formatLakhs(result.min)} – {formatLakhs(result.max)}
              </p>
              <p className="text-sm text-muted font-body mt-1">
                Approx. ₹{result.perSqFtMin.toLocaleString()} – ₹{result.perSqFtMax.toLocaleString()} per sq ft
              </p>
            </div>

            <div className="mb-4 pt-4 border-t border-border">
              <p className="text-sm text-muted font-body mb-1">Estimated Timeline</p>
              <p className="font-body font-semibold text-text">{result.timeline}</p>
            </div>

            <p className="text-xs text-muted font-body italic leading-relaxed">
              *This is an indicative estimate based on current Bihar market rates. Actual costs may vary based on
              site conditions, specific material choices, design complexity, and contractor rates. Contact us for a
              detailed estimate.
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-4 pb-12">
        <div className="max-w-[480px] mx-auto bg-primary rounded-2xl p-6 md:p-8 text-center">
          <h3 className="font-heading text-xl text-white mb-2">
            Discuss this estimate with the architect
          </h3>
          <p className="text-white/70 font-body text-sm mb-5">
            Get a personalized assessment based on your specific requirements and plot.
          </p>
          <Button
            href="/book-a-call"
            onClick={() => trackCTAClick('discuss_cost_estimate', 'calculator_result')}
            variant="secondary"
            className="!border-white !text-white hover:!bg-white hover:!text-primary"
          >
            Book a Call
          </Button>
        </div>
      </section>
    </>
  )
}
