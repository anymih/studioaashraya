import React from 'react'

export interface DashboardMockProps {
  className?: string
}

export function DashboardMock({ className = '' }: DashboardMockProps) {
  return (
    <div
      className={`card-standard ${className}`}
      aria-label="Client dashboard preview"
    >
      {/* Header with Title and "Illustration" caption */}
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 mb-5">
        <div>
          <span className="font-sans text-xs text-[var(--muted)] block">
            Client portal live view
          </span>
          <div className="font-sans font-semibold text-lg text-[var(--ink)]">
            Project dashboard
          </div>
        </div>
        <span className="font-sans text-xs text-[var(--muted)]">
          Illustration
        </span>
      </div>

      {/* Critical Path Schedule Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center font-mono text-xs mb-2">
          <span className="text-[var(--ink)] font-semibold">Critical Path Schedule</span>
          <span className="text-[var(--muted)]">Day 142 of 280 (On Track)</span>
        </div>
        <div className="w-full h-4 bg-[var(--wash)] border border-[var(--line)] flex overflow-hidden">
          <div className="w-[30%] bg-[var(--ink)]" title="Foundation (Complete)" />
          <div className="w-[25%] bg-[var(--accent)]" title="Structure (Active)" />
          <div className="w-[45%] bg-transparent" title="Services & Finishes (Scheduled)" />
        </div>
        <div className="flex justify-between font-mono text-xs text-[var(--muted)] mt-1.5">
          <span>Start: May 2025</span>
          <span className="text-[var(--accent-text)] font-semibold">Current: Gate 2 (Pour 3)</span>
          <span>Target Handover: Feb 2026</span>
        </div>
      </div>

      {/* Gate Status Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        <div className="p-3 border border-[var(--line)] bg-[var(--bg)]">
          <span className="font-mono text-xs text-[var(--muted)] block">Gate 01</span>
          <span className="font-display font-bold text-sm text-[var(--ink)] block">Foundation</span>
          <span className="font-mono text-xs text-[var(--accent-text)] font-semibold mt-1 block">Passed (20 May)</span>
        </div>
        <div className="p-3 border border-[var(--accent)] bg-[var(--wash)]">
          <span className="font-mono text-xs text-[var(--muted)] block">Gate 02</span>
          <span className="font-display font-bold text-sm text-[var(--ink)] block">Structure</span>
          <span className="font-mono text-xs text-[var(--accent-text)] font-semibold mt-1 block">Inspection due</span>
        </div>
        <div className="p-3 border border-[var(--line)] bg-[var(--bg)] opacity-60">
          <span className="font-mono text-xs text-[var(--muted)] block">Gate 03</span>
          <span className="font-display font-bold text-sm text-[var(--ink)] block">Services</span>
          <span className="font-mono text-xs text-[var(--muted)] mt-1 block">SCHEDULED</span>
        </div>
        <div className="p-3 border border-[var(--line)] bg-[var(--bg)] opacity-60">
          <span className="font-mono text-xs text-[var(--muted)] block">Gate 04</span>
          <span className="font-display font-bold text-sm text-[var(--ink)] block">Handover</span>
          <span className="font-mono text-xs text-[var(--muted)] mt-1 block">SCHEDULED</span>
        </div>
      </div>

      {/* Photos & Scans Strip */}
      <div className="mb-6">
        <div className="flex justify-between items-center font-mono text-xs mb-2 text-[var(--ink)]">
          <span className="font-semibold">Recent Gate Verifications</span>
          <span className="text-[var(--muted)] font-normal text-xs">8 scans · 42 records</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="h-16 border border-[var(--line)] bg-[var(--wash)] flex items-center justify-center font-mono text-xs text-[var(--muted)] text-center p-1">
            Cube test cert #04 (NABL)
          </div>
          <div className="h-16 border border-[var(--line)] bg-[var(--wash)] flex items-center justify-center font-mono text-xs text-[var(--muted)] text-center p-1">
            360° LiDAR scan (Gate 1)
          </div>
          <div className="h-16 border border-[var(--line)] bg-[var(--wash)] flex items-center justify-center font-mono text-xs text-[var(--muted)] text-center p-1">
            Weekly video #18
          </div>
        </div>
      </div>

      {/* Payments Linked to Gates */}
      <div className="border-t border-[var(--line)] pt-4">
        <div className="flex justify-between items-center font-mono text-xs text-[var(--ink)] mb-2">
          <span className="font-semibold">Gate-Linked Payments</span>
          <span className="text-[var(--muted)]">Agreed Milestone Contract</span>
        </div>
        <div className="space-y-1.5 font-mono text-xs text-[var(--muted)]">
          <div className="flex justify-between py-1 border-b border-[var(--line)]/50">
            <span>Milestone 1: Gate 1 Passed (Foundation)</span>
            <span className="text-[var(--ink)] font-semibold">Cleared (Receipt filed)</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Milestone 2: Gate 2 Passed (Structure)</span>
            <span className="text-[var(--accent-text)] font-semibold">Pending Gate Sign-off</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardMock
