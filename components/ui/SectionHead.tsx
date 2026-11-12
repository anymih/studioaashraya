import React from 'react'

export interface SectionHeadProps {
  title: string | React.ReactNode
  lead?: string | React.ReactNode
  className?: string
  titleClassName?: string
  leadClassName?: string
  theme?: 'default' | 'band'
}

export function SectionHead({
  title,
  lead,
  className = '',
  titleClassName = '',
  leadClassName = '',
  theme = 'default',
}: SectionHeadProps) {
  const isBand = theme === 'band'

  return (
    <div className={`mb-[var(--space-intro-content)] ${className}`}>
      <h2
        className={`${
          isBand ? 'text-[var(--on-band)]' : 'text-[var(--ink)]'
        } ${titleClassName}`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-[var(--space-h2-intro)] ${
            isBand ? 'text-[var(--band-muted)]' : 'text-[var(--muted)]'
          } ${leadClassName}`}
        >
          {lead}
        </p>
      )}
    </div>
  )
}
