import type { MetadataRoute } from 'next'
import { servicesData } from '@/lib/services-data'
import { projects, type Project } from '@/lib/projects-data'
import { areasData } from '@/lib/areas-data'
import { siteConfig } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl
  const now = new Date()

  // Base core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/guarantee`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/technology`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/method`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/nri`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/areas`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/book-a-call`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/calculators`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/calculators/site-feasibility`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/calculators/cost-estimator`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/calculators/far-checker`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  // Service routes
  const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  // Project routes (only projects with status 'built' or valid cover in production)
  const projectRoutes: MetadataRoute.Sitemap = projects.map((p: Project) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Area routes (only live areas)
  const areaRoutes: MetadataRoute.Sitemap = areasData
    .filter((a) => a.live)
    .map((a) => ({
      url: `${baseUrl}/areas/${a.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: a.tier === 'primary' ? 0.9 : 0.8,
    }))

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...areaRoutes]
}
