import type { Metadata, Viewport } from 'next'
import { Big_Shoulders, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import MobileCtaBar from '@/components/ui/MobileCtaBar'
import SampleBanner from '@/components/ui/SampleBanner'
import { GoogleAnalytics } from '@next/third-parties/google'
import { ScrollTracker } from '@/components/ui/ScrollTracker'
import { siteConfig } from '@/lib/site'

const fontDisplay = Big_Shoulders({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Arial Narrow', 'Impact', 'sans-serif'],
})

const fontSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'monospace'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    template: '%s | Studio Aashraya',
    default: 'Architect and Builder in Gurugram, Delhi NCR | Studio Aashraya',
  },
  description:
    'IIT-led architecture and construction for private homes in Gurugram and Delhi NCR. Design, engineering, approvals and build under one accountable team.',
  authors: [{ name: 'Anumeh Prakhar, Studio Aashraya' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Architect and Builder in Gurugram, Delhi NCR | Studio Aashraya',
    description:
      'IIT-led architecture and construction for private homes in Gurugram and Delhi NCR. Design, engineering, approvals and build under one accountable team.',
    url: siteConfig.siteUrl,
    siteName: 'Studio Aashraya',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Architect and Builder in Gurugram, Delhi NCR | Studio Aashraya',
    description:
      'IIT-led architecture and construction for private homes in Gurugram and Delhi NCR. Design, engineering, approvals and build under one accountable team.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteConfig.siteUrl,
  },
}

const rootSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'HomeAndConstructionBusiness'],
      '@id': `${siteConfig.siteUrl}/#organization`,
      name: 'Studio Aashraya',
      url: siteConfig.siteUrl,
      description:
        'IIT-led architecture and construction for private homes in Gurugram and Delhi NCR. On time, or 10% back. 15-year warranty.',
      telephone: siteConfig.phone,
      email: siteConfig.email,
      sameAs: siteConfig.sameAs,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'C93, Old DLF Colony, Sector 14',
        addressLocality: 'Gurugram',
        addressRegion: 'Haryana',
        addressCountry: 'IN',
      },
      areaServed: [
        { '@type': 'City', name: 'Gurugram' },
        { '@type': 'City', name: 'Delhi' },
        { '@type': 'City', name: 'Patna' },
        { '@type': 'City', name: 'Almora' },
      ],
      founder: {
        '@type': 'Person',
        name: 'Anumeh Prakhar',
        jobTitle: 'Principal Architect & Builder',
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Indian Institute of Technology (BHU) Varanasi',
        },
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
    <html
      lang="en-IN"
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var url=new URL(window.location.href);var q=url.searchParams.get('theme');var t=q||localStorage.getItem('sa-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchema) }}
        />
      </head>
      <body className="bg-[var(--bg)] text-[var(--ink)] font-sans antialiased selection:bg-[var(--accent)] selection:text-[var(--on-accent)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--ink)] focus:text-[var(--bg)] focus:font-mono focus:text-xs focus: focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          Skip to content
        </a>
        <ScrollTracker />
        <SampleBanner />
        <Header />
        <main id="main-content" className="w-full pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}
