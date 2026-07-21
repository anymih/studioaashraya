import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Site Feasibility Calculator | Studio Aashraya',
  description: 'Draw plot boundaries, test setbacks, review road edges, and estimate development potential with our site feasibility calculator.',
  keywords: [
    'site feasibility calculator',
    'plot feasibility calculator',
    'building setback calculator',
    'development potential calculator',
    'FAR calculator Bihar',
    'plot boundary tool Patna',
  ],
}

export default function SiteFeasibilityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
