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
      className={`border-[1.5px] border-[var(--ink)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="font-display font-extrabold text-[clamp(72px,12vw,160px)] leading-[0.88] text-[var(--accent)] tracking-tight select-none mb-2">
          {figure}
        </div>
        <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-wide text-[var(--ink)] mb-2">
          {title}
        </h3>
        <p className="font-sans text-sm sm:text-base text-[var(--muted)] leading-relaxed mb-4">
          {description}
        </p>
      </div>
      {conditions && (
        <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted)] border-t border-[var(--line)] pt-3 block">
          {conditions}
        </span>
      )}
    </div>
  )
}

export default PromiseCard
