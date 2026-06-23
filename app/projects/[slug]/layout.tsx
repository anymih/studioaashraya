import { Metadata } from 'next'
import { projects } from '@/lib/projects-data'

type Props = {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}

  const projectCity = project.location.split(',')[0].trim()
  const title = `${project.title} | Residential Home Design in ${projectCity}, Bihar — Studio Aashraya`
  const description = `${project.title} — a ${project.type} in ${projectCity}, Bihar. Designed by Studio Aashraya: custom floor plan, 3D visualization, and construction supervision. ${project.metric}.`
  const keywords = [
    `${project.type} ${projectCity}`,
    `house design ${projectCity}`,
    `residential architecture Bihar`,
    `custom home design ${projectCity}`,
    `3D home design Bihar`,
    `architecture project Patna`,
    `home construction Bihar`
  ]
  const canonicalUrl = `https://studioaashraya.site/projects/${slug}`
  const ogImage = `https://studioaashraya.site${project.heroImage}`
  const ogImageAlt = `${project.title} — ${project.type} in ${projectCity} Bihar designed by Studio Aashraya architect`

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      site: '@studioaashraya',
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default function ProjectLayout({ children }: Props) {
  return <>{children}</>;
}
