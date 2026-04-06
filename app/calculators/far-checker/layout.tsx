import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAR & Built-up Area Checker | Studio Aashraya',
  description: 'Check your permissible built-up area based on Bihar FAR norms. Enter plot dimensions and number of floors to calculate your maximum allowable coverage.',
  openGraph: {
    title: 'FAR & Built-up Area Checker | Studio Aashraya',
    description: 'Bihar FAR calculator. Check permissible built-up area for your plot.',
  },
}

export default function FarCheckerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
