import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://studioaashraya.site'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/draft', '/staging'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
