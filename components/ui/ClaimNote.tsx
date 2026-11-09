import React from 'react'

export interface ClaimNoteProps {
  source?: string
  sourceUrl?: string
  className?: string
}

export function ClaimNote({ source, sourceUrl, className = '' }: ClaimNoteProps) {
  if (!source) return null

  return (
    <p className={`font-mono text-[11px] text-[var(--muted)]  mt-2 ${className}`}>
      {sourceUrl ? (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--accent)] underline underline-offset-2"
        >
          Source: {source}
        </a>
      ) : (
        `Source: ${source}`
      )}
    </p>
  )
}

export default ClaimNote
