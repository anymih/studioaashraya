import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'House Construction Cost Estimator for Bihar and Patna | Studio Aashraya',
  description:
    "Estimate house construction cost for your plot in Patna and Bihar with Studio Aashraya's cost estimator tool.",
  keywords: [
    'construction cost estimator Bihar',
    'house cost calculator Patna',
    'ghar banane ka kharcha Bihar',
  ],
  openGraph: {
    title: 'House Construction Cost Estimator for Bihar and Patna | Studio Aashraya',
    description:
      "Quickly estimate construction cost for your home in Bihar using Studio Aashraya's calculator.",
    url: 'https://studioaashraya.site/calculators/cost-estimator',
    type: 'website',
    images: [
      {
        url: 'https://studioaashraya.site/assets/og-social-card.jpg',
        width: 1200,
        height: 630,
        alt: 'House construction cost estimator for Patna Bihar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'House Construction Cost Estimator for Bihar and Patna',
    description:
      'Estimate your house construction budget in Bihar.',
    images: ['https://studioaashraya.site/assets/og-social-card.jpg'],
    site: '@studioaashraya',
  },
  alternates: {
    canonical: 'https://studioaashraya.site/calculators/cost-estimator',
  },
}

const costEstimatorSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://studioaashraya.site' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://studioaashraya.site/calculators/cost-estimator' },
    { '@type': 'ListItem', position: 3, name: 'Construction Cost Estimator', item: 'https://studioaashraya.site/calculators/cost-estimator' },
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
