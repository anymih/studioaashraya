import React from 'react'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Plot FAR & Built-up Area Checker | Studio Aashraya',
  description:
    'Calculate FAR and permissible built-up area for your plot in Gurugram, Delhi NCR and Bihar according to building bylaws.',
  openGraph: {
    title: 'Plot FAR & Built-up Area Checker | Studio Aashraya',
    description:
      'Calculate FAR and permissible built-up area for your plot in Gurugram, Delhi NCR and Bihar according to building bylaws.',
    url: `${siteConfig.siteUrl}/calculators/far-checker`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plot FAR & Built-up Area Checker | Studio Aashraya',
    description:
      'Calculate FAR and permissible built-up area for your plot in Gurugram, Delhi NCR and Bihar.',
  },
  alternates: {
    canonical: `${siteConfig.siteUrl}/calculators/far-checker`,
  },
}

const farCheckerSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${siteConfig.siteUrl}/calculators` },
    { '@type': 'ListItem', position: 3, name: 'FAR & Built-up Area Checker', item: `${siteConfig.siteUrl}/calculators/far-checker` },
  ],
}

export default function FarCheckerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(farCheckerSchema) }}
      />
      {children}
    </>
  )
}
