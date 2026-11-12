import React from 'react'
import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumb({
  items,
  className = '',
}: {
  items: BreadcrumbItem[]
  className?: string
}) {
  return (
    <nav aria-label="Breadcrumb" className={`font-mono text-[12px]   ${className}`}>
      <ol className="flex flex-wrap items-center gap-2 text-[var(--muted)]">
        <li>
          <Link href="/" className="hover:text-[var(--ink)] transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <React.Fragment key={idx}>
              <li aria-hidden="true" className="select-none text-[var(--muted)]">
                /
              </li>
              <li>
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-[var(--ink)] transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[var(--ink)] font-medium" aria-current={isLast ? 'page' : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
