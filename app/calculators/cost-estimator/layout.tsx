import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'House Construction Cost Calculator Patna Bihar | Free Estimator — Studio Aashraya',
  description: 'Free house construction cost estimator for Patna and Bihar. Enter your plot size and quality level. Get an instant cost range in INR. No signup needed.',
  keywords: ['house construction cost Patna', 'ghar banane ka kharcha Bihar', 'construction cost calculator Bihar', 'home building cost Patna', 'cost of building a house Bihar', 'construction estimate Patna', 'ghar ka budget calculator Bihar', 'building cost per sq ft Patna'],
  openGraph: {
    title: 'House Construction Cost Calculator Patna Bihar | Free Estimator — Studio Aashraya',
    description: 'Free house construction cost estimator for Patna and Bihar. Enter your plot size and quality level. Get an instant cost range in INR. No signup needed.',
    url: 'https://studioaashraya.site/calculators/cost-estimator',
    type: 'website',
    images: [{ url: 'https://studioaashraya.site/assets/og-social-card.jpg', width: 1200, height: 630, alt: 'Free house construction cost calculator for Patna Bihar by Studio Aashraya' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'House Construction Cost Calculator Patna Bihar | Free Estimator — Studio Aashraya',
    description: 'Free house construction cost estimator for Patna and Bihar. Enter your plot size and quality level. Get an instant cost range in INR.',
    images: ['https://studioaashraya.site/assets/og-social-card.jpg'],
    site: '@studioaashraya',
  },
  alternates: { canonical: 'https://studioaashraya.site/calculators/cost-estimator' },
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
