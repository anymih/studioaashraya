'use client'

import React, { useState } from 'react'
import { trackTechBlockOpen } from '@/lib/analytics'
import { ChevronDown } from 'lucide-react'

interface TechItem {
  id: string
  title: string
  whatItIs: string
  whatItCatches: string
  whatYouReceive: string
  usedAt: string
}

export function TechTileInteractive({ item }: { item: TechItem }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    const next = !isOpen
    setIsOpen(next)
    if (next) {
      trackTechBlockOpen(item.id)
    }
  }

  return (
    <div
      id={item.id}
      className="p-6 border border-[var(--line)] bg-[var(--surface)] flex flex-col justify-between scroll-mt-24 transition-colors"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-[11px] text-[var(--accent)] font-semibold">
            {item.usedAt}
          </span>
          <button
            type="button"
            onClick={toggle}
            className="md:hidden p-1 text-[var(--muted)] hover:text-[var(--ink)]"
            aria-label={`Toggle ${item.title}`}
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        <h3 className="font-display text-2xl font-bold text-[var(--ink)] mb-3 leading-tight">
          {item.title}
        </h3>

        <div className="space-y-3 font-sans text-sm text-[var(--muted)] leading-relaxed">
          <div>
            <strong className="text-[var(--ink)] block text-xs font-mono mb-1">
              What it is:
            </strong>
            <p>{item.whatItIs}</p>
          </div>

          <div className={`${isOpen ? 'block' : 'hidden md:block'} space-y-3 pt-2 border-t border-[var(--line)]`}>
            <div>
              <strong className="text-[var(--ink)] block text-xs font-mono mb-1">
                What it catches:
              </strong>
              <p>{item.whatItCatches}</p>
            </div>

            <div>
              <strong className="text-[var(--ink)] block text-xs font-mono mb-1">
                What you receive:
              </strong>
              <p>{item.whatYouReceive}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TechTileInteractive
