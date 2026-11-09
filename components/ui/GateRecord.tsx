import React from 'react'

export interface GateRecordProps {
  project?: string
  gate?: string
  date?: string
  checkedBy?: string
  items?: string[]
  result?: string
  caption?: string
  className?: string
}

export function GateRecord({
  project = '—',
  gate = 'Gate 1: Foundation and first pour',
  date = '—',
  checkedBy = 'Anumeh Prakhar, Lead Architect',
  items = [
    'Excavation level and soil at founding level verified',
    'Reinforcement checked against bar bending schedule',
    'Cover blocks and rebar spacers positioned',
    'Concrete mix design confirmed and test cubes cast',
  ],
  result = 'Passed. Signed checklist and dated photographs archived.',
  caption = 'Sample format',
  className = '',
}: GateRecordProps) {
  return (
    <figure className={`border-[1.5px] border-[var(--ink)] bg-[var(--surface)] rounded-none ${className}`}>
      <div className="p-4 sm:p-6 border-b border-[var(--line)]">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="font-mono text-[11px] text-[var(--accent)] font-semibold">
            Quality Gate Record
          </span>
          <span className="font-mono text-[10px] text-[var(--muted)]">
            {caption}
          </span>
        </div>
        <h4 className="font-display font-extrabold text-2xl text-[var(--ink)]">
          {gate}
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-[var(--line)]">
        <div className="p-3.5 border-b sm:border-b-0 sm:border-r border-[var(--line)]">
          <span className="block font-mono text-[10px] text-[var(--muted)]">Project</span>
          <b className="block font-sans text-sm font-medium text-[var(--ink)] mt-1">{project}</b>
        </div>
        <div className="p-3.5 border-b sm:border-b-0 sm:border-r border-[var(--line)]">
          <span className="block font-mono text-[10px] text-[var(--muted)]">Date & Time</span>
          <b className="block font-sans text-sm font-medium text-[var(--ink)] mt-1">{date}</b>
        </div>
        <div className="p-3.5">
          <span className="block font-mono text-[10px] text-[var(--muted)]">Inspected By</span>
          <b className="block font-sans text-sm font-medium text-[var(--ink)] mt-1">{checkedBy}</b>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <span className="block font-mono text-[10px] text-[var(--muted)] mb-3">
          Verification Checklist
        </span>
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 font-sans text-sm text-[var(--ink)]">
              <span className="w-1.5 h-1.5 mt-2 bg-[var(--accent)] shrink-0 rounded-none" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 pt-4 border-t border-[var(--line)] flex items-center justify-between flex-wrap gap-2">
          <span className="font-mono text-[10px] text-[var(--muted)]">Result</span>
          <span className="font-sans text-xs font-semibold text-[var(--ink)]">{result}</span>
        </div>
      </div>
    </figure>
  )
}
