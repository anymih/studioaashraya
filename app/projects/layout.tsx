import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'House Design Portfolio in Patna | Residential Projects — Studio Aashraya',
  description: 'Browse residential architecture and home design projects by Studio Aashraya in Patna and Bihar, including custom plans, sustainable ideas, and build-ready concepts.',
  keywords: ['house design portfolio Patna', 'residential architecture projects Bihar', 'home design examples Patna', 'architecture portfolio Bihar', 'completed house designs Patna', 'residential building design Bihar', '3D house plans Patna'],
  openGraph: {
    title: 'House Design Portfolio in Patna | Residential Projects — Studio Aashraya',
    description: 'Browse residential architecture and home design projects by Studio Aashraya in Patna and Bihar, including custom plans, sustainable ideas, and build-ready concepts.',
    url: 'https://studioaashraya.site/projects',
    type: 'website',
    images: [{ url: 'https://studioaashraya.site/assets/og-projects.jpg', width: 1200, height: 630, alt: 'Residential architecture portfolio by Studio Aashraya — house designs in Patna Bihar' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'House Design Portfolio in Patna | Residential Projects — Studio Aashraya',
    description: 'Browse residential architecture and home design projects by Studio Aashraya in Patna and Bihar.',
    images: ['https://studioaashraya.site/assets/og-projects.jpg'],
    site: '@studioaashraya',
  },
  alternates: { canonical: 'https://studioaashraya.site/projects' },
}

const projectsSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://studioaashraya.site' },
    { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://studioaashraya.site/projects' },
  ],
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
      {children}
    </>
  )
}
