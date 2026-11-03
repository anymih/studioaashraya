import React from 'react'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Get a Free Plot Check | Studio Aashraya',
  description:
    'Send your plot details and get a written note on what it allows within 2 working days.',
  openGraph: {
    title: 'Get a Free Plot Check | Studio Aashraya',
    description:
      'Send your plot details and get a written note on what it allows within 2 working days.',
    url: `${siteConfig.siteUrl}/book-a-call`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get a Free Plot Check | Studio Aashraya',
    description:
      'Send your plot details and get a written note on what it allows within 2 working days.',
  },
  alternates: {
    canonical: `${siteConfig.siteUrl}/book-a-call`,
  },
}

const bookCallSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Get a Free Plot Check', item: `${siteConfig.siteUrl}/book-a-call` },
  ],
}

export default function BookACallLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookCallSchema) }}
      />
      {children}
    </>
  )
}
