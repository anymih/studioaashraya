# Studio Aashraya — On-Code SEO + Performance Implementation Brief for Antigravity

Audience: Antigravity dev team (Next.js / React)
Scope: Implement all on-code SEO and performance fixes in one coherent pass, for `studioaashraya.site`.
Goal: Eliminate remaining technical SEO gaps and Core Web Vitals blockers without changing visual design.

---

## 1. next.config.ts — Images, Cache-Control, and Bundle Optimization

### 1.1. Extend `images` configuration

**Current** (simplified):

```ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}
```

**Change to:**

1. Enable modern image formats (AVIF + WebP) for all images.
2. Declare device sizes to help Next generate correct responsive variants.

```ts
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}
```

This ensures that when you switch hero/portfolio images to use `next/image`, they will automatically serve AVIF/WebP where supported.

### 1.2. Add Cache-Control headers for static assets

Goal: Long-lived caching for images/fonts/static chunks; short-lived for HTML.

**Extend `headers()`** as follows:

```ts
const nextConfig: NextConfig = {
  images: { /* as above */ },
  async headers() {
    return [
      // Global security headers (already present)
      { source: '/(.*)', headers: securityHeaders },

      // Long-lived caching for images
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      // Long-lived caching for Next static assets
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      // Long-lived caching for fonts
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      // Short-lived caching for HTML documents
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ]
  },
}
```

Exact paths (`/images`, `/fonts`) should match actual directories in `public/`. Adjust if assets currently live under `/assets/`.

### 1.3. Turn on SWC minification and basic code splitting

Even though Next 13+ does automatic optimizations, explicitly configuring them makes intent clear.

Add:

```ts
const nextConfig: NextConfig = {
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
  },
  images: { /* as above */ },
  async headers() { /* as above */ },
}
```

This enables SWC minify and ensures scroll restoration is handled by the framework, which can marginally reduce layout shifts.

---

## 2. Routing-Level SEO: Sitemap and Robots

Use Next.js App Router-native `sitemap.ts` and `robots.ts` instead of static XML files. This keeps all routing logic in code.

### 2.1. `app/sitemap.ts`

Create `app/sitemap.ts` with the following initial structure:

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://studioaashraya.site'

  return [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/book-a-call`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/calculators/cost-estimator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/calculators/far-checker`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    // Add each project detail route here once you have slugs
    // Example:
    // { url: `${baseUrl}/projects/the-clay-house`, lastModified: new Date('2025-12-01'), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
```

This will automatically serve `/sitemap.xml` at the root once deployed.

### 2.2. `app/robots.ts`

Create `app/robots.ts` to define crawl rules and sitemap reference:

```ts
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://studioaashraya.site'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/draft', '/staging'], // adjust or remove if not used
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

This replaces the need for a manually maintained `robots.txt` and keeps sitemap discovery consistent.

---

## 3. Global Layout: Hero Preload and Font Behavior

File: `app/layout.tsx`

### 3.1. Preload hero image above the fold

You already preconnect to Google Fonts and Analytics. Add a hero preload inside `<head>`.

Assumptions:
- Hero image public path: `/assets/hero-home.jpg` or similar.
- If you migrate to `next/image`, still preload the largest viewport variant.

Add inside `<head>` in `RootLayout`:

```tsx
<head>
  {/* Existing preconnects */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link rel="dns-prefetch" href="https://www.google-analytics.com" />
  <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
    rel="stylesheet"
  />

  {/* Hero image preload — use actual file path */}
  <link
    rel="preload"
    as="image"
    href="/assets/hero-home-1920.webp" // or .avif / .jpg depending on implementation
    imagesrcset="/assets/hero-home-1200.webp 1200w, /assets/hero-home-1920.webp 1920w"
    imageSizes="(max-width: 768px) 100vw, 1200px"
  />

  {/* Geo & Author meta */}
  <meta name="author" content="Anumeh Prakhar, Studio Aashraya" />
  <meta name="geo.region" content="IN-BR" />
  <meta name="geo.placename" content="Patna, Bihar, India" />
  <meta name="geo.position" content="25.5941;85.1376" />
  <meta name="ICBM" content="25.5941, 85.1376" />

  {/* Global JSON-LD */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
  />
</head>
```

Adjust path names and formats to match actual hero asset filenames.

### 3.2. Reduce font blocking impact

Fonts are currently loaded via CSS URL with `display=swap` in the query string, but you can further minimize blocking paint:

1. Keep the existing `<link>` to Google Fonts.
2. Add a short inline style block that sets a system fallback for body text.

Inside `<head>` in `RootLayout`, just after the font `<link>`:

```tsx
<style
  dangerouslySetInnerHTML={{
    __html: `
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      }
    `,
  }}
/>
```

This ensures initial paint uses system fonts while Google Fonts load, reducing perceived FCP delay.

---

## 4. Page-Level Metadata for All Key Routes

You already have good metadata for root and `/about`. Align other key pages.

### 4.1. `app/projects/layout.tsx`

Create `app/projects/layout.tsx` if it does not exist, with page-specific SEO.

```tsx
// app/projects/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Architecture Projects in Bihar and Patna  Portfolio  Studio Aashraya',
  description:
    'Explore Studio Aashraya\'s architecture projects across Patna and Bihar  residential homes, institutional buildings, and concept designs focused on climate-responsive, vernacular architecture.',
  keywords: [
    'architecture projects Patna',
    'residential architecture portfolio Bihar',
    'house design examples Patna',
    'sustainable homes Bihar',
    'IIT architect projects',
  ],
  openGraph: {
    title: 'Architecture Projects in Bihar and Patna  Portfolio  Studio Aashraya',
    description:
      'Explore Studio Aashraya\'s architecture projects across Patna and Bihar  residential homes, institutional buildings, and concept designs.',
    url: 'https://studioaashraya.site/projects',
    type: 'website',
    images: [
      {
        url: 'https://studioaashraya.site/assets/og-projects.jpg',
        width: 1200,
        height: 630,
        alt: 'Studio Aashraya architecture projects portfolio in Patna and Bihar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Architecture Projects in Bihar and Patna  Portfolio  Studio Aashraya',
    description:
      'Explore Studio Aashraya\'s climate-responsive architecture portfolio in Patna and Bihar.',
    images: ['https://studioaashraya.site/assets/og-projects.jpg'],
    site: '@studioaashraya',
  },
  alternates: {
    canonical: 'https://studioaashraya.site/projects',
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

Create `/assets/og-projects.jpg` aligned with existing OG card style.

### 4.2. `app/book-a-call/layout.tsx`

```tsx
// app/book-a-call/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Free Architecture Clarity Call  Studio Aashraya Patna, Bihar',
  description:
    'Schedule a free 30-minute clarity call with Studio Aashraya to discuss your home or building project in Patna, Bihar, or Delhi NCR.',
  keywords: [
    'book architect consultation Patna',
    'architecture clarity call Bihar',
    'free architect call Patna',
  ],
  openGraph: {
    title: 'Book a Free Architecture Clarity Call  Studio Aashraya',
    description:
      'Schedule a free architecture clarity call for your home or building project in Bihar.',
    url: 'https://studioaashraya.site/book-a-call',
    type: 'website',
    images: [
      {
        url: 'https://studioaashraya.site/assets/og-book-call.jpg',
        width: 1200,
        height: 630,
        alt: 'Book an architecture clarity call with Studio Aashraya in Patna Bihar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Free Architecture Clarity Call  Studio Aashraya',
    description:
      'Talk to an IIT-trained architect about your project in Patna or Bihar.',
    images: ['https://studioaashraya.site/assets/og-book-call.jpg'],
    site: '@studioaashraya',
  },
  alternates: {
    canonical: 'https://studioaashraya.site/book-a-call',
  },
}

export default function BookCallLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

Again, create `/assets/og-book-call.jpg`.

### 4.3. Calculators layouts (`cost-estimator`, `far-checker`)

For each calculator route, add layout files with specific metadata and canonicals.

Example: `app/calculators/cost-estimator/layout.tsx`:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'House Construction Cost Estimator for Bihar and Patna  Studio Aashraya',
  description:
    'Estimate house construction cost for your plot in Patna and Bihar with Studio Aashraya\'s cost estimator tool.',
  keywords: [
    'construction cost estimator Bihar',
    'house cost calculator Patna',
    'ghar banane ka kharcha Bihar',
  ],
  openGraph: {
    title: 'House Construction Cost Estimator for Bihar and Patna  Studio Aashraya',
    description:
      'Quickly estimate construction cost for your home in Bihar using Studio Aashraya\'s calculator.',
    url: 'https://studioaashraya.site/calculators/cost-estimator',
    type: 'website',
    images: [
      {
        url: 'https://studioaashraya.site/assets/og-cost-estimator.jpg',
        width: 1200,
        height: 630,
        alt: 'House construction cost estimator for Patna Bihar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'House Construction Cost Estimator for Bihar and Patna',
    description:
      'Estimate your house construction budget in Bihar.',
    images: ['https://studioaashraya.site/assets/og-cost-estimator.jpg'],
    site: '@studioaashraya',
  },
  alternates: {
    canonical: 'https://studioaashraya.site/calculators/cost-estimator',
  },
}

export default function CostEstimatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

Repeat similarly for `far-checker`.

---

## 5. GA4 Conversion Event Wiring

File(s): `app/book-a-call/page.tsx` and any calculator pages.

Goal: Fire GA4 events for:
- Book-a-call form submission.
- Calculator completion.
- Phone/WhatsApp click.

### 5.1. Add a client-side hook for form submission

In `book-a-call/page.tsx`:

1. Ensure the component is a Client Component (`"use client"` at the top).
2. Wrap form submission handler to include `gtag` or `dataLayer` events.

Example skeleton:

```tsx
'use client'

import { useState } from 'react'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

export default function BookCallPage() {
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)

    const form = event.currentTarget

    // Extract minimal fields for event parameters
    const projectType = (form.elements.namedItem('projectType') as HTMLSelectElement)?.value
    const budget = (form.elements.namedItem('budget') as HTMLInputElement)?.value

    // Fire GA4 event if available
    if (window.gtag) {
      window.gtag('event', 'book_call_submit', {
        event_category: 'lead',
        event_label: projectType || 'unknown',
        value: budget ? Number(budget) || 0 : 0,
      })
    } else if (window.dataLayer) {
      window.dataLayer.push({
        event: 'book_call_submit',
        projectType,
        budget,
      })
    }

    // Existing submission logic (API call, redirect, etc.)
    // await submitForm(...)

    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* existing fields */}
      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting' : 'Book a Free Clarity Call'}
      </button>
    </form>
  )
}
```

This preserves existing visual UI but wires GA4 lead events.

### 5.2. Calculator completion events

For each calculator page, after the result is computed and displayed, fire an event.

Example (inside calculator component):

```tsx
const handleCalculate = () => {
  // ... existing calculation logic
  const result = /* computed value */

  if (window.gtag) {
    window.gtag('event', 'calculator_complete', {
      event_category: 'engagement',
      event_label: 'cost_estimator',
      value: result,
    })
  }

  setResult(result)
}
```

No visual changes, just event wiring.

---

## 6. Image Migration Plan (Optional but Recommended)

Once `nextConfig.images` is updated, migrate key images to `next/image` stepwise.

### 6.1. Hero image

In the homepage component (`app/page.tsx`):

```tsx
import Image from 'next/image'

export default function HomePage() {
  return (
    <section className="hero">
      <div className="hero-image-wrapper">
        <Image
          src="/assets/hero-home-1920.webp" // or .jpg; Next will handle formats
          alt="Climate-responsive residential architecture design in Bihar by Studio Aashraya"
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1200px, 1920px"
          className="hero-image"
        />
      </div>
      {/* existing hero text */}
    </section>
  )
}
```

Key flags:
- `priority` ensures hero is loaded early.
- `sizes` reduces over-fetching.

### 6.2. Portfolio images (lazy loading)

In project card component (`components/ProjectCard.tsx`):

```tsx
import Image from 'next/image'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <a href={`/projects/${project.slug}`}>
        <div className="project-image-wrapper">
          <Image
            src={project.coverImageSrc} // e.g. `/assets/projects/clay-house-800.webp`
            alt={`${project.name}  ${project.location}`}
            width={800}
            height={600}
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        {/* existing text */}
      </a>
    </article>
  )
}
```

This defers non-critical images.

---

## 7. Verification Checklist After Deployment

### 7.1. Technical SEO

- `/sitemap.xml` accessible and lists all key routes.
- `https://studioaashraya.site/robots.txt` returns rules with sitemap reference.
- View source of `/`, `/about`, `/projects`, `/book-a-call`, calculators:
  - Canonical matches live URL.
  - OG and Twitter images resolve (no 404s).
  - JSON-LD for LocalBusiness, Organization, WebSite exists on root.
  - FAQPage + BreadcrumbList exist on `/about`.

### 7.2. Performance and Core Web Vitals

Run PageSpeed Insights (mobile) for `/` and `/projects`:
- LCP element should be the hero or main heading.
- Target LCP ≤ 2.5s, FCP improved vs. previous runs.

Verify in Chrome DevTools:
- Network tab: hero image is preloaded.
- Non-critical project images load as you scroll.
- Static assets have long-lived `Cache-Control` headers.

### 7.3. Analytics

In GA4 DebugView:
- `book_call_submit` events appear on test form submissions.
- `calculator_complete` events appear after calculator usage.

---

This single brief, once implemented, closes the remaining on-code SEO and performance gaps without changing copy, layout, or branding. Antigravity can run through sections 1–7 sequentially, commit in small PRs, and validate using the final checklist.