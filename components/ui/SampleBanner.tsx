import React from 'react'

export function SampleBanner() {
  const showBanner = process.env.NEXT_PUBLIC_SHOW_SAMPLE_BANNER !== 'false'
  if (!showBanner) return null

  return (
    <aside
      aria-label="Sample Content Notice"
      className="w-full bg-[var(--accent)] text-[var(--on-accent)] px-4 py-1.5 text-center font-mono text-[11px] sm:text-xs font-medium z-30"
    >
      Sample projects. Replace before launch.
    </aside>
  )
}

export default SampleBanner
