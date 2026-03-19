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
  description: 'Premium architecture studio in Bihar committed to sustainable, vernacular, and energy-efficient design.',
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
