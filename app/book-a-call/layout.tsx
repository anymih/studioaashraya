import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Clarity Call | Studio Aashraya',
  description: 'Book a free 30-minute design clarity call with Studio Aashraya. Discuss your plot, goals, budget, and possible design directions — no commitment required.',
  openGraph: {
    title: 'Book a Clarity Call | Studio Aashraya',
    description: 'Free 30-minute architecture clarity call. No commitment, no drawings needed.',
  },
}

export default function BookACallLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
