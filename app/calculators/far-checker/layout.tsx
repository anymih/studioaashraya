import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plot FAR & Built-up Area Calculator for Patna, Bihar | Studio Aashraya',
  description:
    'Calculate FAR and permissible built-up area for your plot in Patna and Bihar according to building bylaws.',
  keywords: [
    'FAR calculator Patna',
    'plot FAR Bihar',
    'kitna ghar ban sakta hai Patna',
    'how much can I build on my plot Bihar',
    'floor area ratio Patna',
    'built-up area calculator Bihar',
  ],
  openGraph: {
    title: 'Plot FAR & Built-up Area Calculator for Patna, Bihar | Studio Aashraya',
    description:
      'Calculate FAR and permissible built-up area for your plot in Patna and Bihar according to building bylaws.',
    url: 'https://studioaashraya.site/calculators/far-checker',
    type: 'website',
    images: [
      {
        url: 'https://studioaashraya.site/assets/og-far-checker.jpg',
        width: 1200,
        height: 630,
        alt: 'Plot FAR and built-up area calculator for Patna Bihar by Studio Aashraya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plot FAR & Built-up Area Calculator for Patna, Bihar | Studio Aashraya',
    description:
      'Calculate FAR and permissible built-up area for your plot in Patna and Bihar according to building bylaws.',
    images: ['https://studioaashraya.site/assets/og-far-checker.jpg'],
    site: '@studioaashraya',
  },
  alternates: {
    canonical: 'https://studioaashraya.site/calculators/far-checker',
  },
}

const farCheckerSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://studioaashraya.site' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://studioaashraya.site/calculators/cost-estimator' },
    { '@type': 'ListItem', position: 3, name: 'FAR & Built-up Area Checker', item: 'https://studioaashraya.site/calculators/far-checker' },
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
