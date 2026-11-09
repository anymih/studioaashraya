import React from 'react'

export type ProjectStatus = 'built' | 'under-construction' | 'design'

export function StatusBadge({
  status,
  className = '',
}: {
  status: ProjectStatus | string
  className?: string
}) {
  const norm = status.toLowerCase()

  if (norm === 'built') {
    return (
      <span className={`font-sans text-xs text-[var(--ink)] ${className}`}>
        Built
      </span>
    )
  }

  if (norm === 'under-construction' || norm === 'under construction') {
    return (
      <span className={`font-sans text-xs text-[var(--muted)] ${className}`}>
        Under construction
      </span>
    )
  }

  return (
    <span className={`font-sans text-xs text-[var(--muted)] ${className}`}>
      Design stage
    </span>
  )
}
