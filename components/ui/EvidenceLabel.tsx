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
  const text = isMeasured ? '(measured)' : '(simulated)'

  return (
    <Link
      href={finalHref}
      title="View measurement and simulation methodology"
      className={`font-sans text-xs text-[var(--muted)] hover:text-[var(--ink)] hover:underline ${className}`}
    >
      {text}
    </Link>
  )
}

export default EvidenceLabel
