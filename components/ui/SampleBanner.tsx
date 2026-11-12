export function SampleBanner() {
  if (process.env.NEXT_PUBLIC_PREVIEW !== 'true') {
    return null
  }

  return (
    <div
      role="status"
      className="w-full bg-[var(--accent)] text-[var(--on-accent)] text-center font-sans text-xs py-1.5 px-4"
    >
      Sample projects. Replace before launch.
    </div>
  )
}

export default SampleBanner
