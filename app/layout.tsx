import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import BottomNav from '@/components/ui/BottomNav'
import { GoogleAnalytics } from '@next/third-parties/google'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Studio Aashraya | Sustainable Architecture, Patna Bihar',
  description: 'IITian-led architecture studio in Patna designing climate-responsive, vernacular homes for Bihar\'s modern families. Sustainable, cost-conscious, process-transparent.',
  keywords: ['architect Patna', 'architecture firm Bihar', 'IIT architect Bihar', 'sustainable architecture Patna', 'house design Bihar', 'residential architect Patna'],
  openGraph: {
    title: 'Studio Aashraya | Sustainable Architecture, Patna Bihar',
    description: 'IITian-led architecture studio designing climate-smart, vernacular homes for Bihar.',
    url: 'https://studioaashraya.site',
    siteName: 'Studio Aashraya',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Aashraya | Sustainable Architecture, Patna Bihar',
    description: 'IITian-led architecture studio designing climate-smart, vernacular homes for Bihar.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg antialiased" style={{
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        margin: 0,
        padding: 0,
      }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'LocalBusiness',
                  '@id': 'https://studioaashraya.site/#business',
                  name: 'Studio Aashraya',
                  description: 'IITian-led architecture studio in Patna designing climate-responsive, vernacular homes for Bihar\'s modern families.',
                  url: 'https://studioaashraya.site',
                  telephone: '+919473031016',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Patna',
                    addressRegion: 'Bihar',
                    addressCountry: 'IN',
                  },
                  geo: {
                    '@type': 'GeoCoordinates',
                    latitude: '25.5941',
                    longitude: '85.1376',
                  },
                  openingHoursSpecification: {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                    opens: '09:00',
                    closes: '18:00',
                  },
                  priceRange: '₹₹',
                  image: 'https://studioaashraya.site/images/hero.webp',
                  sameAs: [],
                },
                {
                  '@type': 'Architect',
                  '@id': 'https://studioaashraya.site/#architect',
                  name: 'Studio Aashraya',
                  url: 'https://studioaashraya.site',
                  description: 'IITian-led architecture studio specializing in climate-responsive, vernacular residential architecture in Bihar.',
                  knowsAbout: ['Vernacular Architecture', 'Climate-Responsive Design', 'Sustainable Construction', 'Residential Architecture'],
                  areaServed: { '@type': 'State', name: 'Bihar' },
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://studioaashraya.site/#website',
                  url: 'https://studioaashraya.site',
                  name: 'Studio Aashraya',
                  publisher: { '@id': 'https://studioaashraya.site/#business' },
                },
                {
                  '@type': 'WebPage',
                  '@id': 'https://studioaashraya.site/#webpage',
                  url: 'https://studioaashraya.site',
                  name: 'Studio Aashraya | Sustainable Architecture, Patna Bihar',
                  isPartOf: { '@id': 'https://studioaashraya.site/#website' },
                  about: { '@id': 'https://studioaashraya.site/#architect' },
                  description: 'IITian-led architecture studio designing climate-responsive, vernacular homes for Bihar\'s modern families.',
                },
              ],
            }),
          }}
        />
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
