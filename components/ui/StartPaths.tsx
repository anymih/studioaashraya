'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { trackCTAClick } from '@/lib/analytics'
import { ArrowRight } from 'lucide-react'

export interface StartPathItem {
  id: string
  situation: string
  description: string
  buttonText: string
  href: string
}

const defaultDoors: StartPathItem[] = [
  {
    id: 'door-plot',
    situation: 'I own a plot.',
    description: 'Find out what it can hold and what it will cost to build well.',
    buttonText: 'Check my plot',
    href: '/book-a-call?src=door-plot',
  },
  {
    id: 'door-abroad',
    situation: 'I live abroad.',
    description: 'Build in India with weekly video, scans and a live dashboard.',
    buttonText: 'Plan from abroad',
    href: '/book-a-call?src=door-abroad',
  },
  {
    id: 'door-old',
    situation: 'I have an old house.',
    description: 'We survey it, then price retain, strengthen and rebuild.',
    buttonText: 'Survey my house',
    href: '/book-a-call?src=door-old',
  },
]

export function StartPaths({ doors = defaultDoors }: { doors?: StartPathItem[] }) {
  const pathname = usePathname()

  return (
    <div className="w-full">
      {/* Desktop 3 columns / Mobile horizontal scroll swipe row (82% card width) */}
      <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
        {doors.map((door) => (
          <Link
            key={door.id}
            href={door.href}
            onClick={() => trackCTAClick(door.id, pathname, 'start_paths')}
            className="w-[82vw] sm:w-[320px] md:w-auto shrink-0 snap-start border-[1.5px] border-[var(--ink)] bg-[var(--surface)] p-6 sm:p-7 flex flex-col justify-between hover:border-[var(--accent)] transition-colors no-underline group select-none"
          >
            <div>
              <span className="font-mono text-xs text-[var(--accent)] font-semibold block mb-3">
                Path
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mb-3">
                {door.situation}
              </h3>
              <p className="font-sans text-sm sm:text-base text-[var(--muted)] leading-relaxed mb-6">
                {door.description}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 font-sans font-semibold text-xs sm:text-sm text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors pt-4 border-t border-[var(--line)]">
              <span>{door.buttonText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default StartPaths
