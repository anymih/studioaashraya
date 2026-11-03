import { siteConfig } from '@/lib/site'
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
    url: `${siteConfig.siteUrl}/calculators/cost-estimator`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.siteUrl}/assets/og-social-card.jpg`,
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
    images: [`${siteConfig.siteUrl}/assets/og-social-card.jpg`],
    site: '@studioaashraya',
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
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${siteConfig.siteUrl}/calculators/cost-estimator` },
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
