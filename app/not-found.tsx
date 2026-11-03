'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { track404 } from '@/lib/analytics'

export default function NotFound() {
  useEffect(() => {
    track404(window.location.pathname)
  }, [])

  return (
    <main className="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-[var(--bg)] text-[var(--ink)]">
      <div className="max-w-md border border-[var(--ink)] bg-[var(--surface)] p-8 sm:p-12">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2">
          Error 404
        </span>
        <h1 className="font-display text-6xl sm:text-7xl font-extrabold uppercase tracking-tight leading-none text-[var(--ink)] mb-4">
          404
        </h1>
        <h2 className="font-display text-2xl font-bold uppercase text-[var(--ink)] mb-3">
          Drawing Not Found
        </h2>
        <p className="font-sans text-sm text-[var(--muted)] leading-relaxed mb-8">
          The page or project you requested is not on the board. It may have moved or been renamed.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-3 border border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)] font-sans text-sm font-semibold hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-[var(--on-accent)] transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-5 py-3 border border-[var(--ink)] bg-transparent text-[var(--ink)] font-sans text-sm font-semibold hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors"
          >
            Delivered Homes
          </Link>
          <Link
            href="/book-a-call"
            className="inline-flex items-center justify-center px-5 py-3 border border-[var(--ink)] bg-transparent text-[var(--ink)] font-sans text-sm font-semibold hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors"
          >
            Free Plot Check
          </Link>
        </div>
      </div>
    </main>
  )
}
