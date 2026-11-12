import React from 'react'
import Link from 'next/link'

export interface NoticeProps {
  label?: string
  children: React.ReactNode
  actionText?: string
  actionHref?: string
  className?: string
}

export function Notice({
  label = 'Coverage notice',
  children,
  actionText,
  actionHref,
  className = '',
}: NoticeProps) {
  return (
    <div
      className={`border border-[var(--line)] bg-[var(--surface)] p-4 md:p-5 text-sm text-[var(--ink)] ${className}`}
      role="region"
      aria-label={label}
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
        <div>
          <span className="block font-mono text-xs text-[var(--muted)] mb-1">
            {label}
          </span>
          <p className="font-sans text-sm text-[var(--ink)] leading-relaxed">{children}</p>
        </div>
        {actionText && actionHref && (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-1 font-mono text-xs text-[var(--accent-text)] hover:text-[var(--accent-hi)] font-semibold shrink-0 underline underline-offset-4"
          >
            {actionText} &rarr;
          </Link>
        )}
      </div>
    </div>
  )
}
