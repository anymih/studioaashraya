import React from 'react'

export interface CredItem {
  value: string
  label: string
}

const defaultCreds: CredItem[] = [
  { value: 'IIT BHU', label: 'B.Arch, Varanasi, 2024' },
  { value: 'COA', label: 'Registered architect, Council of Architecture' },
  { value: '50+', label: 'projects designed, 30+ built' },
  { value: 'AEC data', label: 'Certified in data science for architecture, engineering and construction' },
]

export function CredStrip({
  items = defaultCreds,
  className = '',
}: {
  items?: CredItem[]
  className?: string
}) {
  return (
    <div className={`bg-[var(--surface)] border-b border-[var(--line)] ${className}`}>
      <div className="wrap">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <li
              key={idx}
              className={`py-6 md:py-7 ${
                idx !== 0 ? 'sm:pl-5 lg:pl-6' : ''
              } ${
                idx !== items.length - 1 ? 'border-b sm:border-b-0 border-[var(--line)] sm:border-r' : ''
              }`}
            >
              <b className="stat-numeral block text-[var(--ink)]">
                {item.value}
              </b>
              <span className="block mt-2 font-sans text-sm text-[var(--muted)] max-w-[30ch]">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
