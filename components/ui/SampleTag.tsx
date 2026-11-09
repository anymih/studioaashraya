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
      className={`block font-sans text-xs text-[var(--muted)] mt-1 ${className}`}
    >
      {displayLabel}
    </span>
  )
}

export default SampleTag
