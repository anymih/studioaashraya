import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Studio Aashraya — Climate-Smart Homes in Bihar',
  description: 'Explore Studio Aashraya\'s portfolio of climate-responsive, vernacular residential and institutional projects across Bihar. See how we design cooler, smarter homes.',
  openGraph: {
    title: 'Projects | Studio Aashraya',
    description: 'Climate-responsive architecture projects across Bihar.',
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
