import React from 'react'

export interface ThreeUpItem {
  title: string
  body: string
}

export function ThreeUp({
  items,
  className = '',
}: {
  items: ThreeUpItem[]
  className?: string
}) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 border-t-[1.5px] border-[var(--ink)] ${className}`}
    >
      {items.map((item, idx) => (
        <article
          key={idx}
          className={`pt-6 pb-6 md:pb-2 min-w-0 ${
            idx !== 0 ? 'md:pl-7' : ''
          } ${
            idx !== items.length - 1
              ? 'border-b md:border-b-0 md:border-r border-[var(--line)] md:pr-7'
              : ''
          }`}
        >
          <h3 className="font-display font-extrabold text-[28px] leading-tight text-[var(--ink)] mb-3">
            {item.title}
          </h3>
          <p className="font-sans text-base leading-relaxed text-[var(--muted)] max-w-[44ch]">
            {item.body}
          </p>
        </article>
      ))}
    </div>
  )
}
