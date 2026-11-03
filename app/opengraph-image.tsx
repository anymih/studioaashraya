import { ImageResponse } from 'next/og'
import { OgImage } from '@/components/ui/OgImage'
export const alt = 'Studio Aashraya — Architect and Builder in Gurugram, Delhi NCR'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <OgImage
        title="Architect & Builder in Gurugram, Delhi NCR"
        subtitle="On time, or 10% back. 15-year warranty. IIT-led architecture & turnkey construction."
      />
    ),
    {
      ...size,
    }
  )
}
