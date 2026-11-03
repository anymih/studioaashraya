import React from 'react'

export interface ClaimNoteProps {
  note?: string
  source?: string
  className?: string
}

export function ClaimNote({ note, source, className = '' }: ClaimNoteProps) {
  const text = note || (source ? `Source: ${source}` : 'Source: to be added')

  return (
    <p className={`font-mono text-[11px] text-[var(--muted)] tracking-wider mt-2 ${className}`}>
      {text}
    </p>
  )
}

export default ClaimNote
