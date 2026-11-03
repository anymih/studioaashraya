import React from 'react'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Site Feasibility Calculator | Studio Aashraya',
  description:
    'Draw plot boundaries, test setbacks, review road edges, and estimate development potential with our site feasibility calculator.',
  openGraph: {
    title: 'Site Feasibility Calculator | Studio Aashraya',
    description:
      'Draw plot boundaries, test setbacks, review road edges, and estimate development potential with our site feasibility calculator.',
    url: `${siteConfig.siteUrl}/calculators/site-feasibility`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Site Feasibility Calculator | Studio Aashraya',
    description:
      'Draw plot boundaries, test setbacks, review road edges, and estimate development potential.',
  },
  alternates: {
    canonical: `${siteConfig.siteUrl}/calculators/site-feasibility`,
  },
}

export default function SiteFeasibilityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
