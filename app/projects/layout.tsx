import { siteConfig } from '@/lib/site'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Architecture Projects in Bihar and Patna | Portfolio — Studio Aashraya',
  description:
    "Explore Studio Aashraya's architecture projects across Patna and Bihar — residential homes, institutional buildings, and concept designs focused on climate-responsive, vernacular architecture.",
  keywords: [
    'architecture projects Patna',
    'residential architecture portfolio Bihar',
    'house design examples Patna',
    'sustainable homes Bihar',
    'IIT architect projects',
  ],
  openGraph: {
    title: 'Architecture Projects in Bihar and Patna | Portfolio — Studio Aashraya',
    description:
      "Explore Studio Aashraya's architecture projects across Patna and Bihar — residential homes, institutional buildings, and concept designs.",
    url: `${siteConfig.siteUrl}/projects`,
    type: 'website',
    images: [
      {
        url: `${siteConfig.siteUrl}/assets/og-projects.jpg`,
        width: 1200,
        height: 630,
        alt: 'Studio Aashraya architecture projects portfolio in Patna and Bihar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Architecture Projects in Bihar and Patna | Portfolio — Studio Aashraya',
    description:
      "Explore Studio Aashraya's climate-responsive architecture portfolio in Patna and Bihar.",
    images: [`${siteConfig.siteUrl}/assets/og-projects.jpg`],
    site: '@studioaashraya',
  },
  alternates: {
    canonical: `${siteConfig.siteUrl}/projects`,
  },
}

const projectsSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Projects', item: `${siteConfig.siteUrl}/projects` },
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
