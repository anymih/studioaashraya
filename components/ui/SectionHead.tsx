import React from 'react'

export interface SectionHeadProps {
  eyebrow?: string
  title: string | React.ReactNode
  lead?: string | React.ReactNode
  className?: string
  titleClassName?: string
  leadClassName?: string
  theme?: 'default' | 'band'
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  className = '',
  titleClassName = '',
  leadClassName = '',
  theme = 'default',
}: SectionHeadProps) {
  const isBand = theme === 'band'

  return (
    <div className={`mb-10 ${className}`}>
      {eyebrow && (
        <p className={`font-sans text-sm mb-3 ${isBand ? 'text-[var(--band-muted)]' : 'text-[var(--muted)]'}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`${
          isBand ? 'text-[var(--on-band)]' : 'text-[var(--ink)]'
        } ${titleClassName}`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 ${
            isBand ? 'text-[var(--band-muted)]' : 'text-[var(--muted)]'
          } ${leadClassName}`}
        >
          {lead}
        </p>
      )}
    </div>
  )
}
