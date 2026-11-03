'use client'

import React from 'react'
import Link from 'next/link'
import { trackTechBlockOpen } from '@/lib/analytics'
import { ArrowRight } from 'lucide-react'

export interface TechTileProps {
  id: string
  title: string
  sentence: string
  usedAt: string
  onBand?: boolean
  className?: string
}

export function TechTile({
  id,
  title,
  sentence,
  usedAt,
  onBand = false,
  className = '',
}: TechTileProps) {
  return (
    <Link
      href={`/technology#${id}`}
      onClick={() => trackTechBlockOpen(id)}
      className={`block border-[1.5px] p-5 sm:p-6 no-underline select-none transition-colors group ${
        onBand
          ? 'bg-[var(--band)] border-[var(--band-line)] hover:border-[var(--accent-hi)] text-[var(--on-band)]'
          : 'bg-[var(--surface)] border-[var(--ink)] hover:border-[var(--accent)] text-[var(--ink)]'
      } ${className}`}
    >
      <div className="flex justify-between items-start mb-4">
        <span
          className={`font-mono text-[10.5px] sm:text-[11px] uppercase tracking-wider font-semibold ${
            onBand ? 'text-[var(--accent-hi)]' : 'text-[var(--accent)]'
          }`}
        >
          {usedAt}
        </span>
        <ArrowRight
          className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
            onBand ? 'text-[var(--accent-hi)]' : 'text-[var(--accent)]'
          }`}
        />
      </div>

      <h3
        className={`font-display font-extrabold text-xl sm:text-2xl uppercase tracking-tight mb-2 ${
          onBand ? 'text-[var(--on-band)]' : 'text-[var(--ink)]'
        }`}
      >
        {title}
      </h3>

      <p
        className={`font-sans text-xs sm:text-sm leading-relaxed ${
          onBand ? 'text-[var(--band-muted)]' : 'text-[var(--muted)]'
        }`}
      >
        {sentence}
      </p>
    </Link>
  )
}

export default TechTile
