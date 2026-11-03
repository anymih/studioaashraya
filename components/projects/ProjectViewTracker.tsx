'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export function ProjectViewTracker({
  slug,
  city,
  status,
}: {
  slug: string
  city: string
  status: string
}) {
  useEffect(() => {
    trackEvent('project_view', { slug, city, status })
  }, [slug, city, status])

  return null
}
