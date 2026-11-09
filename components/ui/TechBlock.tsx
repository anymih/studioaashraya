'use client'

import React, { useState } from 'react'
import { trackTechBlockOpen } from '@/lib/analytics'
import { Plus, Minus } from 'lucide-react'

export interface TechBlockProps {
  id: string
  title: string
  whatItIs: string
  whatItCatches: string
  whatYouReceive: string
  usedAt: string
  imageComponent?: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export function TechBlock({
  id,
  title,
  whatItIs,
  whatItCatches,
  whatYouReceive,
  usedAt,
  imageComponent,
  defaultOpen = false,
  className = '',
}: TechBlockProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const handleToggle = () => {
    const nextState = !isOpen
    setIsOpen(nextState)
    if (nextState) {
      trackTechBlockOpen(id)
    }
  }

  return (
    <article
      id={id}
      className={`border-[1.5px] border-[var(--ink)] bg-[var(--surface)] scroll-mt-[88px] ${className}`}
    >
      {/* Mobile Accordion Trigger (under 768px) */}
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        className="md:hidden w-full min-h-[48px] p-5 flex items-center justify-between text-left border-b border-[var(--line)] bg-[var(--wash)]/50"
      >
        <span className="font-display font-extrabold text-xl text-[var(--ink)]">
          {title}
        </span>
        <span className="font-mono text-sm text-[var(--accent)] shrink-0 ml-3">
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>

      {/* Main Content (Always visible on desktop >= 768px; Collapsible on mobile) */}
      <div className={`${isOpen ? 'block' : 'hidden md:block'} p-6 sm:p-8`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Visual slot (Image / Mock) */}
          {imageComponent && (
            <div className="lg:col-span-5 order-first lg:order-last">
              {imageComponent}
            </div>
          )}

          {/* Facts grid */}
          <div className={imageComponent ? 'lg:col-span-7 space-y-5' : 'lg:col-span-12 space-y-5'}>
            <div className="hidden md:block border-b border-[var(--line)] pb-3 mb-2">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold block mb-1">
                Instrument
              </span>
              <h3 className="font-display font-extrabold text-3xl text-[var(--ink)]">
                {title}
              </h3>
            </div>

            <div className="space-y-4 font-sans text-sm sm:text-base leading-relaxed">
              <div>
                <span className="font-mono text-xs text-[var(--muted)] font-semibold block mb-1">
                  What it is
                </span>
                <p className="text-[var(--ink)]">{whatItIs}</p>
              </div>

              <div>
                <span className="font-mono text-xs text-[var(--accent)] font-semibold block mb-1">
                  What it catches
                </span>
                <p className="text-[var(--ink)] font-medium">{whatItCatches}</p>
              </div>

              <div>
                <span className="font-mono text-xs text-[var(--muted)] font-semibold block mb-1">
                  What you receive
                </span>
                <p className="text-[var(--ink)]">{whatYouReceive}</p>
              </div>

              <div>
                <span className="font-mono text-xs text-[var(--muted)] font-semibold block mb-1">
                  Used at
                </span>
                <span className="font-mono text-xs px-2 py-1 bg-[var(--wash)] border border-[var(--line)] text-[var(--ink)] font-semibold inline-block">
                  {usedAt}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default TechBlock
