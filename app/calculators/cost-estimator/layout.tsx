import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Construction Cost Estimator | Studio Aashraya',
  description: 'Get accurate Bihar-specific construction cost estimates. Input your built-up area, choose quality tier, and get instant cost range for Patna, Gaya, Muzaffarpur, Bhagalpur.',
  openGraph: {
    title: 'Construction Cost Estimator | Studio Aashraya',
    description: 'Bihar-specific construction cost calculator. Instant estimates for residential projects.',
  },
}

export default function CostEstimatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
