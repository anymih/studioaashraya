import React from 'react'

export interface SampleTagProps {
  label?: string
  kind?: 'project' | 'figure'
  className?: string
}

export function SampleTag({ label, kind = 'project', className = '' }: SampleTagProps) {
  const showBanner = process.env.NEXT_PUBLIC_SHOW_SAMPLE_BANNER !== 'false'
  if (!showBanner) return null

  const displayLabel = label || (kind === 'figure' ? 'Sample figure' : 'Sample project')

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 border border-[var(--accent)] font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] bg-[var(--surface)] font-medium ${className}`}
    >
      {displayLabel}
    </span>
  )
}

export default SampleTag
