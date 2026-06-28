import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Free Architecture Clarity Call | Studio Aashraya Patna, Bihar',
  description:
    'Schedule a free 30-minute clarity call with Studio Aashraya to discuss your home or building project in Patna, Bihar, or Delhi NCR.',
  keywords: [
    'book architect consultation Patna',
    'architecture clarity call Bihar',
    'free architect call Patna',
  ],
  openGraph: {
    title: 'Book a Free Architecture Clarity Call | Studio Aashraya',
    description:
      'Schedule a free architecture clarity call for your home or building project in Bihar.',
    url: 'https://studioaashraya.site/book-a-call',
    type: 'website',
    images: [
      {
        url: 'https://studioaashraya.site/assets/og-social-card.jpg',
        width: 1200,
        height: 630,
        alt: 'Book an architecture clarity call with Studio Aashraya in Patna Bihar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Free Architecture Clarity Call | Studio Aashraya',
    description:
      'Talk to an IIT-trained architect about your project in Patna or Bihar.',
    images: ['https://studioaashraya.site/assets/og-social-card.jpg'],
    site: '@studioaashraya',
  },
  alternates: {
    canonical: 'https://studioaashraya.site/book-a-call',
  },
}

const bookCallSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://studioaashraya.site' },
    { '@type': 'ListItem', position: 2, name: 'Book a Call', item: 'https://studioaashraya.site/book-a-call' },
  ],
}

export default function BookACallLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookCallSchema) }}
      />
      {children}
    </>
  )
}
