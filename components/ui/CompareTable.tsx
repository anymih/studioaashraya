import React from 'react'

export interface CompareRow {
  oftenHappens: string
  whatWeDo: string
}

export interface CompareTableProps {
  rows?: CompareRow[]
  className?: string
}

const defaultRows: CompareRow[] = [
  {
    oftenHappens: 'The handover date is a promise.',
    whatWeDo: 'The handover date is in the agreement, backed by a 10% refund.',
  },
  {
    oftenHappens: 'Warranty terms are explained after you pay.',
    whatWeDo: 'A 15-year warranty, with scope and exclusions written before you sign.',
  },
  {
    oftenHappens: 'Drawings clash on site.',
    whatWeDo: 'BIM clash detection resolves them before any pour.',
  },
  {
    oftenHappens: 'Concrete quality is assumed.',
    whatWeDo: 'Every pour is lab-tested and the certificates are filed.',
  },
  {
    oftenHappens: 'You get photographs in a chat group.',
    whatWeDo: 'You get 360° scans, dated records and a live dashboard.',
  },
  {
    oftenHappens: 'Waterproofing is a product purchase.',
    whatWeDo: 'Waterproofing is specified, laid and flood-tested.',
  },
]

export function CompareTable({ rows = defaultRows, className = '' }: CompareTableProps) {
  return (
    <div
      className={`border-[1.5px] border-[var(--ink)] bg-[var(--surface)] ${className}`}
      aria-label="Process comparison table"
    >
      {/* Desktop Header (>= 700px) */}
      <div className="hidden min-[700px]:grid grid-cols-2 border-b-[1.5px] border-[var(--ink)] bg-[var(--wash)] font-mono text-xs uppercase tracking-wider font-semibold text-[var(--ink)]">
        <div className="p-4 border-r border-[var(--line)]">What often happens</div>
        <div className="p-4">What we do</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-[var(--line)]">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 min-[700px]:grid-cols-2 divide-y min-[700px]:divide-y-0 min-[700px]:divide-x divide-[var(--line)] font-sans text-sm sm:text-base leading-relaxed"
          >
            {/* What often happens */}
            <div className="p-4 sm:p-5 text-[var(--muted)]">
              <span className="min-[700px]:hidden font-mono text-[11px] uppercase tracking-wider text-[var(--muted)] font-semibold block mb-1.5">
                What often happens:
              </span>
              <p>{row.oftenHappens}</p>
            </div>

            {/* What we do */}
            <div className="p-4 sm:p-5 bg-[var(--bg)]/40 min-[700px]:bg-transparent text-[var(--ink)] font-medium flex items-start gap-2.5">
              <i className="block w-2.5 h-2.5 bg-[var(--accent)] shrink-0 mt-1.5 not-italic" aria-hidden="true" />
              <div>
                <span className="min-[700px]:hidden font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] font-semibold block mb-1.5">
                  What we do:
                </span>
                <p>{row.whatWeDo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompareTable
