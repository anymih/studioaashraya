import React from 'react'

export interface ImageFrameProps {
  aspectRatio?: '4/3' | '16/9' | '3/2' | '4/5' | '1/1' | string
  caption?: string
  alt?: string
  isMissing?: boolean
  className?: string
  children?: React.ReactNode
}

export function ImageFrame({
  aspectRatio = '4/3',
  caption,
  alt = '',
  isMissing = false,
  className = '',
  children,
}: ImageFrameProps) {
  const aspectClass =
    aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '3/2'
      ? 'aspect-[3/2]'
      : aspectRatio === '4/5'
      ? 'aspect-[4/5]'
      : 'aspect-[4/3]'

  return (
    <figure className={`border-[1.5px] border-[var(--ink)] bg-[var(--surface)] overflow-hidden m-0 ${className}`}>
      <div className={`relative w-full ${aspectClass} overflow-hidden bg-[var(--wash)]`}>
        {isMissing ? (
          // Hatched architectural placeholder per spec (repeating 135° lines in --line over --wash)
          <div
            className="w-full h-full flex flex-col items-center justify-center p-4 text-center select-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg, var(--line) 0, var(--line) 1px, transparent 1px, transparent 12px)',
            }}
          >
            <span className="font-mono text-xs uppercase px-2 py-1 bg-[var(--surface)] border border-[var(--ink)] text-[var(--ink)] font-semibold shadow-sm max-w-[90%] truncate">
              {alt || 'Architectural Illustration'}
            </span>
          </div>
        ) : (
          children
        )}
      </div>

      {caption && (
        <figcaption className="border-t border-[var(--line)] px-3 py-2 bg-[var(--surface)] font-mono text-[11px] text-[var(--muted)] tracking-wider uppercase flex items-center justify-between">
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  )
}

export default ImageFrame
