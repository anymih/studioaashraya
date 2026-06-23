import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plot FAR Calculator Patna | Built-up Area Checker — Studio Aashraya',
  description: 'Check how much you can build on your plot in Patna using our free FAR calculator and built-up area checker.',
  keywords: ['FAR calculator Patna', 'plot FAR Bihar', 'kitna ghar ban sakta hai Patna', 'how much can I build on my plot Bihar', 'floor area ratio Patna', 'built-up area calculator Bihar', 'plot coverage Patna', 'construction limit Bihar plot'],
  openGraph: {
    title: 'Plot FAR Calculator Patna | Built-up Area Checker — Studio Aashraya',
    description: 'Check how much you can build on your plot in Patna using our free FAR calculator and built-up area checker.',
    url: 'https://studioaashraya.site/calculators/far-checker',
    type: 'website',
    images: [{ url: 'https://studioaashraya.site/assets/og-social-card.jpg', width: 1200, height: 630, alt: 'Plot FAR and built-up area calculator for Patna Bihar by Studio Aashraya' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plot FAR Calculator Patna | Built-up Area Checker — Studio Aashraya',
    description: 'Check how much you can build on your plot in Patna using our free FAR calculator and built-up area checker.',
    images: ['https://studioaashraya.site/assets/og-social-card.jpg'],
    site: '@studioaashraya',
  },
  alternates: { canonical: 'https://studioaashraya.site/calculators/far-checker' },
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
