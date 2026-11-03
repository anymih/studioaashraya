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
      <span
        className={`inline-block font-mono text-[11px] font-medium uppercase tracking-[0.1em] px-2 py-1 bg-[var(--ink)] text-[var(--bg)] border border-[var(--ink)] rounded-none ${className}`}
      >
        Built
      </span>
    )
  }

  if (norm === 'under-construction' || norm === 'under construction') {
    return (
      <span
        className={`inline-block font-mono text-[11px] font-medium uppercase tracking-[0.1em] px-2 py-1 bg-transparent text-[var(--accent)] border border-[var(--accent)] rounded-none ${className}`}
      >
        Under construction
      </span>
    )
  }

  return (
    <span
      className={`inline-block font-mono text-[11px] font-medium uppercase tracking-[0.1em] px-2 py-1 bg-transparent text-[var(--muted)] border border-[var(--line)] rounded-none ${className}`}
    >
      Design stage
    </span>
  )
}
