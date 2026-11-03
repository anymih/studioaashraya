export interface Testimonial {
  id: string
  name: string
  relationship: string
  city: string
  quote: string
  hasPermission: boolean
}

// B7 Default: No testimonials rendered until owner provides real testimonials with written permission
export const testimonials: Testimonial[] = []
