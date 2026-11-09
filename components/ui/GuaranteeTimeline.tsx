import React from 'react'

export interface GuaranteeTimelineProps {
  className?: string
}

export function GuaranteeTimeline({ className = '' }: GuaranteeTimelineProps) {
  const steps = [
    { label: 'Agreement signed', note: 'Handover date written into contract', highlight: false },
    { label: 'Completion date', note: '10% refund triggered if late', highlight: true },
    { label: 'Handover', note: 'As-built records & gate file', highlight: false },
    { label: 'Year 15', note: '15-year warranty duration', highlight: true },
  ]

  return (
    <div
      className={`border-[1.5px] border-[var(--ink)] bg-[var(--surface)] p-6 sm:p-8 ${className}`}
      aria-label="Guarantee and warranty milestone timeline"
    >
      <div className="font-mono text-xs text-[var(--muted)] mb-6">
        Agreement Milestone Timeline
      </div>

      {/* Horizontal on >= 640px */}
      <div className="hidden sm:block">
        <div className="relative pt-6 pb-2">
          {/* Hairline connecting line */}
          <div className="absolute top-[32px] left-[10%] right-[10%] h-[1.5px] bg-[var(--line)]" />

          <div className="grid grid-cols-4 gap-4 relative z-10">
            {steps.map((step) => (
              <div key={step.label} className="flex flex-col items-center text-center">
                {/* Node marker */}
                <div
                  className={`w-4 h-4 mb-3 border-[1.5px] ${
                    step.highlight
                      ? 'bg-[var(--accent)] border-[var(--accent)]'
                      : 'bg-[var(--surface)] border-[var(--ink)]'
                  }`}
                  aria-hidden="true"
                />
                <span className="font-display font-bold text-lg text-[var(--ink)] block mb-1">
                  {step.label}
                </span>
                <span className="font-mono text-xs text-[var(--muted)] max-w-[160px] leading-tight block">
                  {step.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vertical under 640px */}
      <div className="sm:hidden relative pl-6 border-l-[1.5px] border-[var(--line)] space-y-6">
        {steps.map((step) => (
          <div key={step.label} className="relative">
            <div
              className={`absolute -left-[31px] top-1.5 w-3.5 h-3.5 border-[1.5px] ${
                step.highlight
                  ? 'bg-[var(--accent)] border-[var(--accent)]'
                  : 'bg-[var(--surface)] border-[var(--ink)]'
              }`}
              aria-hidden="true"
            />
            <div className="font-display font-bold text-lg text-[var(--ink)] mb-0.5">
              {step.label}
            </div>
            <div className="font-mono text-xs text-[var(--muted)]">
              {step.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GuaranteeTimeline
