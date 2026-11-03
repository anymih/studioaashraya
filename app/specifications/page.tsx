import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { specSchedule } from '@/lib/spec-schedule'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CtaBand } from '@/components/ui/CtaBand'

export const metadata: Metadata = {
  title: 'Specifications Schedule | Studio Aashraya',
  description: 'Verified structural and architectural specification schedule for Studio Aashraya projects.',
}

export default function SpecificationsPage() {
  const liveSpecs = specSchedule.filter((row) => row.live)

  if (liveSpecs.length === 0) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] pt-12 pb-16">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <Eyebrow text="STANDARDS &amp; QUALITY" />
        <h1 className="font-display text-4xl md:text-5xl font-light uppercase tracking-tight text-[var(--ink)] mt-2 mb-6">
          Specifications Schedule
        </h1>
        <p className="text-[var(--ink-muted)] max-w-2xl text-base mb-8">
          Every specification is verified through formal engineering inspection gates before release.
        </p>

        <div className="overflow-x-auto border border-[var(--line)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--surface)] text-[var(--ink)] uppercase text-xs tracking-wider border-b border-[var(--line)]">
              <tr>
                <th className="py-3 px-4 font-semibold">Element</th>
                <th className="py-3 px-4 font-semibold">Specification</th>
                <th className="py-3 px-4 font-semibold">Inspection Gate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {liveSpecs.map((row, idx) => (
                <tr key={idx} className="hover:bg-[var(--surface)]/50 transition">
                  <td className="py-3 px-4 font-mono font-medium">{row.element}</td>
                  <td className="py-3 px-4">{row.specification}</td>
                  <td className="py-3 px-4 text-xs font-mono text-[var(--ink-muted)]">
                    {row.inspectionGate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12">
          <CtaBand variant="plot-check" />
        </div>
      </div>
    </div>
  )
}
