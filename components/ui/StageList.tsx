'use client'

import React, { useState } from 'react'

export interface StageItem {
  id: string
  number: string
  title: string
  summary: string
  gate?: string
  whatWeDo?: string
  whatYouReceive?: string
  checks?: string[]
}

export function StageList({
  stages,
  expandable = false,
  onStageOpen,
  className = '',
}: {
  stages: StageItem[]
  expandable?: boolean
  onStageOpen?: (stageId: string) => void
  className?: string
}) {
  const [openStages, setOpenStages] = useState<Record<string, boolean>>({})

  const toggleStage = (stageId: string) => {
    if (!expandable) return
    const newState = !openStages[stageId]
    setOpenStages((prev) => ({ ...prev, [stageId]: newState }))
    if (newState && onStageOpen) {
      onStageOpen(stageId)
    }
  }

  return (
    <ol className={`border-t border-[var(--band-line)] list-none p-0 m-0 ${className}`}>
      {stages.map((stage) => {
        const isOpen = Boolean(openStages[stage.id])
        return (
          <li
            key={stage.id}
            className="border-b border-[var(--band-line)] py-5 md:py-6 transition-colors"
          >
            <div
              className={`grid grid-cols-[48px_minmax(0,1fr)] md:grid-cols-[72px_minmax(0,240px)_minmax(0,1fr)_auto] gap-x-4 md:gap-x-6 gap-y-2 items-baseline ${
                expandable ? 'cursor-pointer select-none' : ''
              }`}
              onClick={() => toggleStage(stage.id)}
              onKeyDown={(e) => {
                if (expandable && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault()
                  toggleStage(stage.id)
                }
              }}
              role={expandable ? 'button' : undefined}
              tabIndex={expandable ? 0 : undefined}
              aria-expanded={expandable ? isOpen : undefined}
            >
              <span className="font-display font-extrabold text-3xl md:text-[40px] leading-none text-[var(--band-muted)] row-span-2 md:row-span-1 select-none">
                {stage.number}
              </span>

              <h3 className="font-display font-extrabold text-xl md:text-[26px] leading-tight text-[var(--on-band)] m-0">
                {stage.title}
              </h3>

              <p className="col-span-1 font-sans text-sm md:text-base leading-relaxed text-[var(--band-muted)] max-w-[60ch] m-0">
                {stage.summary}
              </p>

              <div className="flex items-center gap-2 justify-self-start md:justify-self-end mt-1 md:mt-0">
                {stage.gate && (
                  <span className="inline-block font-mono text-xs font-medium px-2 py-1.5 bg-[var(--accent-hi)] text-[#1A0F08] whitespace-nowrap rounded-none">
                    {stage.gate}
                  </span>
                )}
                {expandable && (
                  <span className="font-mono text-sm text-[var(--band-muted)] select-none">
                    {isOpen ? '−' : '+'}
                  </span>
                )}
              </div>
            </div>

            {expandable && isOpen && (
              <div className="mt-4 pt-4 border-t border-[var(--band-line)] pl-[48px] md:pl-[72px] grid gap-4 text-sm font-sans text-[var(--on-band)]">
                {stage.whatWeDo && (
                  <div>
                    <span className="block font-mono text-xs text-[var(--band-muted)] mb-1">
                      What we do
                    </span>
                    <p className="text-[var(--on-band)] leading-relaxed max-w-[65ch]">
                      {stage.whatWeDo}
                    </p>
                  </div>
                )}
                {stage.whatYouReceive && (
                  <div>
                    <span className="block font-mono text-xs text-[var(--band-muted)] mb-1">
                      What you receive
                    </span>
                    <p className="text-[var(--on-band)] leading-relaxed max-w-[65ch]">
                      {stage.whatYouReceive}
                    </p>
                  </div>
                )}
                {stage.checks && stage.checks.length > 0 && (
                  <div>
                    <span className="block font-mono text-xs text-[var(--accent-hi)] mb-1.5 font-semibold">
                      Gate checks (work does not proceed until verified)
                    </span>
                    <ul className="space-y-1.5">
                      {stage.checks.map((chk, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--on-band)]">
                          <span className="w-1.5 h-1.5 mt-2 bg-[var(--accent-hi)] shrink-0 rounded-none" />
                          <span>{chk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </li>
        )
      })}
    </ol>
  )
}
