import React from 'react'

export interface PromiseCardProps {
  figure: string
  title: string
  description: string
  conditions?: string
  className?: string
}

export function PromiseCard({
  figure,
  title,
  description,
  conditions = 'Conditions are in your agreement',
  className = '',
}: PromiseCardProps) {
  return (
    <div
      className={`border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="stat-numeral text-[var(--ink)] select-none mb-3">
          {figure}
        </div>
        <h3 className="font-sans font-semibold text-xl text-[var(--ink)] mb-2">
          {title}
        </h3>
        <p className="font-sans text-sm text-[var(--muted)] leading-relaxed mb-4">
          {description}
        </p>
      </div>
      {conditions && (
        <span className="font-sans text-xs text-[var(--muted)] border-t border-[var(--line)] pt-3 block">
          {conditions}
        </span>
      )}
    </div>
  )
}

export default PromiseCard
