import React from 'react'

export interface ProofCell {
  figure: string
  label: string
}

export interface ProofBarProps {
  cells?: ProofCell[]
  className?: string
}

const defaultCells: ProofCell[] = [
  { figure: '30+', label: 'Homes built' },
  { figure: '50+', label: 'Projects designed' },
  { figure: 'Every home', label: 'On time' },
  { figure: '15 years', label: 'Warranty' },
  { figure: '10%', label: 'Back if late' },
]

export function ProofBar({ cells = defaultCells, className = '' }: ProofBarProps) {
  return (
    <section
      aria-label="Track record proof"
      className={`w-full bg-[var(--ink)] text-[var(--bg)] border-y border-[var(--line)] ${className}`}
    >
      <div className="wrap">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[var(--bg)]/10">
          {cells.map((cell, idx) => {
            const isLastOnMobile = idx === 4
            return (
              <div
                key={cell.label}
                className={`py-6 px-4 ${isLastOnMobile ? 'col-span-2 md:col-span-1' : ''}`}
              >
                <div className="stat-numeral text-[var(--bg)] mb-1">
                  {cell.figure}
                </div>
                <div className="font-sans text-xs text-[var(--bg)]/60">
                  {cell.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProofBar
