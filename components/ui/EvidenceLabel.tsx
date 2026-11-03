import React from 'react'
import Link from 'next/link'

export type EvidenceState = 'measured' | 'simulated' | 'owner-attested' | 'pending' | 'removed'

export interface EvidenceLabelProps {
  state?: EvidenceState | string
  type?: EvidenceState | string
  methodHref?: string
  methodLink?: string
  className?: string
}

export function EvidenceLabel({
  state,
  type,
  methodHref,
  methodLink,
  className = '',
}: EvidenceLabelProps) {
  const finalState = state || type || 'measured'
  const finalHref = methodHref || methodLink || '/method#verification'

  if (finalState === 'pending' || finalState === 'removed') {
    return null
  }

  const isMeasured = finalState === 'measured'
  const text = isMeasured ? 'Measured' : 'Simulated at design stage'

  return (
    <Link
      href={finalHref}
      title="View measurement and simulation methodology"
      className={`inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--muted)] hover:text-[var(--ink)] hover:underline rounded-none ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-none ${isMeasured ? 'bg-[var(--ink)]' : 'bg-[var(--accent)]'}`} />
      <span>{text}</span>
    </Link>
  )
}

export default EvidenceLabel
