import React from 'react'

export interface EyebrowProps {
  children?: React.ReactNode
  text?: string
  className?: string
  as?: 'p' | 'span' | 'div'
}

export function Eyebrow({ children, text, className = '', as: Component = 'p' }: EyebrowProps) {
  return (
    <Component className={`font-mono text-[12px]   text-[var(--muted)] ${className}`}>
      {text ?? children}
    </Component>
  )
}
