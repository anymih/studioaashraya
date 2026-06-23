import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hire an Architect in Patna | Free Consultation — Studio Aashraya Bihar',
  description: 'Ready to build or design your home in Patna or Bihar? Book a free 30-minute call with our architect. We\'ll discuss your plot, budget, and house plan. No obligation.',
  keywords: ['hire architect Patna', 'book architect Bihar', 'free architect consultation Patna', 'architect consultation Bihar', 'residential architect near me Patna', 'architecture firm consultation Bihar', 'book a call architect', 'home design consultation Patna'],
  openGraph: {
    title: 'Hire an Architect in Patna | Free Consultation — Studio Aashraya Bihar',
    description: 'Ready to build or design your home in Patna or Bihar? Book a free 30-minute call with our architect. We\'ll discuss your plot, budget, and house plan. No obligation.',
    url: 'https://studioaashraya.site/book-a-call',
    type: 'website',
    images: [{ url: 'https://studioaashraya.site/assets/og-social-card.jpg', width: 1200, height: 630, alt: 'Hire an architect in Patna Bihar — free consultation with Studio Aashraya' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire an Architect in Patna | Free Consultation — Studio Aashraya Bihar',
    description: 'Ready to build or design your home in Patna or Bihar? Book a free 30-minute call with our architect.',
    images: ['https://studioaashraya.site/assets/og-social-card.jpg'],
    site: '@studioaashraya',
  },
  alternates: { canonical: 'https://studioaashraya.site/book-a-call' },
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
