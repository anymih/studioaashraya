import React from 'react'
import { Eyebrow } from './Eyebrow'

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
    <div className={`grid gap-4 mb-7 md:mb-12 ${className}`}>
      {eyebrow && (
        <Eyebrow className={isBand ? 'text-[var(--band-muted)]' : 'text-[var(--muted)]'}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={`font-display font-extrabold uppercase text-[clamp(36px,5.4vw,68px)] leading-[0.95] tracking-[0.005em] text-balance ${
          isBand ? 'text-[var(--on-band)]' : 'text-[var(--ink)]'
        } ${titleClassName}`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`font-sans text-[clamp(17px,1.5vw,19px)] leading-relaxed max-w-[62ch] ${
            isBand ? 'text-[var(--band-muted)]' : 'text-[var(--muted)]'
          } ${leadClassName}`}
        >
          {lead}
        </p>
      )}
    </div>
  )
}
