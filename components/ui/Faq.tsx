import React from 'react'

export interface FaqItem {
  question: string
  answer: string
}

export function Faq({
  items,
  className = '',
  emitSchema = true,
}: {
  items: FaqItem[]
  className?: string
  emitSchema?: boolean
}) {
  const schema = emitSchema
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null

  return (
    <div className={`faq border-t-[1.5px] border-[var(--ink)] ${className}`}>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      {items.map((item, idx) => (
        <details
          key={idx}
          className="group border-b border-[var(--line)] transition-colors"
        >
          <summary className="cursor-pointer list-none flex items-center justify-between gap-5 py-5 font-display font-extrabold text-[24px] leading-tight uppercase tracking-[0.01em] text-[var(--ink)] select-none [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span
              className="font-mono text-2xl font-medium text-[var(--accent)] shrink-0 transition-transform duration-150"
              aria-hidden="true"
            >
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">&minus;</span>
            </span>
          </summary>
          <div className="pb-6 pt-1 text-[var(--muted)] font-sans text-base leading-relaxed max-w-[64ch]">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  )
}
