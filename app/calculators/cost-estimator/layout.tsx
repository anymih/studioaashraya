import React from 'react'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Construction Cost Estimator | Studio Aashraya',
  description:
    'Estimate house construction cost for your plot in Gurugram, Delhi NCR and Bihar with Studio Aashraya.',
  openGraph: {
    title: 'Construction Cost Estimator | Studio Aashraya',
    description:
      'Estimate house construction cost for your plot in Gurugram, Delhi NCR and Bihar with Studio Aashraya.',
    url: `${siteConfig.siteUrl}/calculators/cost-estimator`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Construction Cost Estimator | Studio Aashraya',
    description:
      'Estimate house construction cost for your plot in Gurugram, Delhi NCR and Bihar.',
  },
  alternates: {
    canonical: `${siteConfig.siteUrl}/calculators/cost-estimator`,
  },
}

const costEstimatorSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${siteConfig.siteUrl}/calculators` },
    { '@type': 'ListItem', position: 3, name: 'Construction Cost Estimator', item: `${siteConfig.siteUrl}/calculators/cost-estimator` },
  ],
}

export default function CostEstimatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(costEstimatorSchema) }}
      />
      {children}
    </>
  )
}
