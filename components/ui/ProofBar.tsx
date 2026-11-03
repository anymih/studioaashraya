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
      className={`w-full bg-[var(--ink)] text-[var(--bg)] border-y-[1.5px] border-[var(--ink)] ${className}`}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-[var(--line)]/20">
          {cells.map((cell, idx) => {
            const isLastOnMobile = idx === 4
            return (
              <div
                key={cell.label}
                className={`py-5 sm:py-6 px-3 sm:px-4 text-center ${
                  isLastOnMobile ? 'col-span-2 md:col-span-1' : ''
                }`}
              >
                <div className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase leading-none tracking-tight text-[var(--bg)] mb-1">
                  {cell.figure}
                </div>
                <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[var(--bg)]/70">
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
