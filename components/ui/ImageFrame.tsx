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
    <figure
      aria-label={alt || caption || undefined}
      className={`border border-[var(--line)] bg-[var(--surface)] overflow-hidden m-0 ${className}`}
    >
      <div className={`relative w-full ${aspectClass} overflow-hidden bg-[var(--surface)]`}>
        {isMissing ? (
          <div className="w-full h-full flex flex-col items-end justify-end p-3 select-none">
            <span className="font-sans text-xs text-[var(--muted)]">
              Illustration. Project photographs to follow.
            </span>
          </div>
        ) : (
          children
        )}
      </div>

      {caption && (
        <figcaption className="border-t border-[var(--line)] px-3 py-2 bg-[var(--surface)] font-sans text-xs text-[var(--muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default ImageFrame
