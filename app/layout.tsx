import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import BottomNav from '@/components/ui/BottomNav'
import { GoogleAnalytics } from '@next/third-parties/google'
import { ScrollTracker } from '@/components/ui/ScrollTracker'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Architect in Patna, Bihar | House & Home Design — Studio Aashraya',
  description: 'Looking for an architect in Patna? Studio Aashraya designs residential homes, 3D house plans, and sustainable buildings across Bihar. Free 30-min consultation. Call now.',
  keywords: ['architect Patna', 'architect in Patna', 'residential architect Bihar', 'house design Patna', 'home design Bihar', 'architecture firm Patna', '3D house design Bihar', 'best architect Patna', 'ghar ka design Patna', 'building design Bihar', 'architecture services Patna'],
  authors: [{ name: 'Anumeh Prakhar, Studio Aashraya' }],
  openGraph: {
    title: 'Architect in Patna, Bihar | House & Home Design — Studio Aashraya',
    description: 'Looking for an architect in Patna? Studio Aashraya designs residential homes, 3D house plans, and sustainable buildings across Bihar. Free 30-min consultation. Call now.',
    url: 'https://studioaashraya.site',
    siteName: 'Studio Aashraya',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://studioaashraya.site/assets/og-social-card.jpg',
        width: 1200,
        height: 630,
        alt: 'Architect in Patna Bihar — residential home design by Studio Aashraya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Architect in Patna, Bihar | House & Home Design — Studio Aashraya',
    description: 'Looking for an architect in Patna? Studio Aashraya designs residential homes, 3D house plans, and sustainable buildings across Bihar. Free 30-min consultation. Call now.',
    images: ['https://studioaashraya.site/assets/og-social-card.jpg'],
    site: '@studioaashraya',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://studioaashraya.site',
  },
}

const globalSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'Architect'],
      '@id': 'https://studioaashraya.site/#business',
      name: 'Studio Aashraya',
      alternateName: 'Studio Aashraya Architecture',
      description: 'IIT-trained architecture studio in Patna, Bihar designing climate-responsive, vernacular homes and commercial buildings. Specializing in sustainable architecture, passive cooling design, and vernacular materials.',
      url: 'https://studioaashraya.site',
      logo: {
        '@type': 'ImageObject',
        url: 'https://studioaashraya.site/assets/logo.png',
        width: 200,
        height: 60,
      },
      image: 'https://studioaashraya.site/assets/og-social-card.jpg',
      telephone: '+919473031016',
      email: 'hello@studioaashraya.site',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'D103, Road 6B, Rajiv Nagar',
        addressLocality: 'Patna',
        addressRegion: 'Bihar',
        postalCode: '800016',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 25.5941,
        longitude: 85.1376,
      },
      areaServed: [
        { '@type': 'City', name: 'Patna' },
        { '@type': 'State', name: 'Bihar' },
        { '@type': 'City', name: 'Gaya' },
        { '@type': 'City', name: 'Nalanda' },
        { '@type': 'City', name: 'Delhi' },
        { '@type': 'City', name: 'Noida' },
        { '@type': 'City', name: 'Gurugram' },
      ],
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: 25.5941,
          longitude: 85.1376,
        },
        geoRadius: '500000',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Architecture and Design Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Residential Architecture Design', description: 'Climate-responsive residential home design for Bihar. Passive cooling, vernacular materials, and site-specific design.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Interior Design', description: 'Interior design services rooted in comfort, culture, and material honesty.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sustainable Architecture', description: 'Energy-efficient, climate-adaptive building design using passive cooling and local materials.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Construction Supervision', description: 'On-site and remote construction supervision to ensure design intent is faithfully executed.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '3D Visualization', description: 'Photorealistic 3D renders and walkthroughs for residential and commercial projects.' } },
        ],
      },
      founder: {
        '@type': 'Person',
        '@id': 'https://studioaashraya.site/#founder',
        name: 'Anumeh Prakhar',
        jobTitle: 'Principal Architect',
        alumniOf: { '@type': 'EducationalOrganization', name: 'IIT (BHU) Varanasi' },
        knowsAbout: ['Sustainable Architecture', 'Passive Cooling Design', 'Vernacular Architecture', 'Climate-Responsive Design', 'Residential Architecture Bihar'],
        url: 'https://studioaashraya.site/about',
      },
      priceRange: '₹₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, Bank Transfer',
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '19:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '10:00', closes: '14:00' },
      ],
      sameAs: [
        'https://www.instagram.com/studioaashraya',
        'https://www.linkedin.com/company/studioaashraya',
      ],
    },
    {
      '@type': 'Organization',
      '@id': 'https://studioaashraya.site/#organization',
      name: 'Studio Aashraya',
      url: 'https://studioaashraya.site',
      logo: 'https://studioaashraya.site/assets/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+919473031016',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://studioaashraya.site/#website',
      url: 'https://studioaashraya.site',
      name: 'Studio Aashraya',
      description: 'IIT-trained architecture studio in Patna, Bihar. Climate-responsive, sustainable residential and commercial architecture.',
      publisher: { '@id': 'https://studioaashraya.site/#organization' },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'Service',
      serviceType: 'Architecture Design',
      provider: { '@id': 'https://studioaashraya.site/#business' },
      areaServed: [
        { '@type': 'City', name: 'Patna' },
        { '@type': 'State', name: 'Bihar' },
      ],
      description: 'Full-service residential and commercial architecture design in Bihar. Specializing in climate-responsive, sustainable, and vernacular architecture.',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        priceRange: '₹₹₹',
        eligibleRegion: { '@type': 'Country', name: 'India' },
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnects */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Geo & Author meta */}
        <meta name="author" content="Anumeh Prakhar, Studio Aashraya" />
        <meta name="geo.region" content="IN-BR" />
        <meta name="geo.placename" content="Patna, Bihar, India" />
        <meta name="geo.position" content="25.5941;85.1376" />
        <meta name="ICBM" content="25.5941, 85.1376" />

        {/* Global JSON-LD @graph — Blocks 1, 2, 3, 7 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>
      <body className="bg-bg antialiased" style={{
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        margin: 0,
        padding: 0,
      }}>
        <ScrollTracker />
        <Header />
        <main style={{width: '100%', paddingBottom: '80px'}}>
          {children}
        </main>
        <Footer />
        <BottomNav />
        <GoogleAnalytics gaId="G-MQSCXRFH76" />
      </body>
    </html>
  )
}
