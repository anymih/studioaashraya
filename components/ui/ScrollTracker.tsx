'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { sendGAEvent } from '@next/third-parties/google'

export function ScrollTracker() {
  const pathname = usePathname()
  const firedRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    // Reset on page navigation
    firedRef.current = new Set()

    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const pct = Math.round((scrollTop / docHeight) * 100)

      ;[25, 50, 75, 90].forEach((threshold) => {
        if (pct >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold)
          sendGAEvent('event', 'scroll', {
            event_category: 'Engagement',
            event_label: `${threshold}%`,
            scroll_depth_threshold: threshold,
            page_path: pathname,
          })
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return null
}
