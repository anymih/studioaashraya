export interface OfficeLocation {
  city: string
  address?: string
  note: string
  region: string
}

export interface SiteConfig {
  siteUrl: string
  name: string
  description: string
  founder: {
    name: string
    title: string
    qualification: string
    coaNumber: string
  }
  phone: string
  phoneDisplay: string
  whatsapp: string
  whatsappLink: string
  address: string
  mapsLink: string
  email: string
  formRoute: string
  offices: OfficeLocation[]
}

export const siteConfig: SiteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://studioaashraya.com',
  name: 'Studio Aashraya',
  description:
    'IIT-led architecture and construction for private homes in Gurugram and Delhi NCR. On time or 10% back, with a 15-year warranty.',
  founder: {
    name: 'Anumeh Prakhar',
    title: 'Principal Architect & Builder',
    qualification:
      'B.Arch, IIT BHU Varanasi, 2024 · COA-registered · Data Science for AEC certificate',
    coaNumber: '', // Default: not supplied yet (B9)
  },
  phone: '+919473031016',
  phoneDisplay: '+91 94730 31016',
  whatsapp: '+919473031016',
  whatsappLink:
    'https://wa.me/919473031016?text=Hi%20Studio%20Aashraya%2C%20I%20would%20like%20a%20free%20plot%20check.',
  address: 'C93, Old DLF Colony, Sector 14, Gurugram',
  mapsLink:
    'https://www.google.com/maps/search/?api=1&query=C93+Old+DLF+Colony+Sector+14+Gurugram',
  email: 'contact@studioaashraya.com',
  formRoute: '/book-a-call',
  offices: [
    {
      city: 'Gurugram',
      address: 'C93, Old DLF Colony, Sector 14, Gurugram',
      note: 'Main Office',
      region: 'Delhi NCR',
    },
    {
      city: 'Patna',
      note: 'Regional Studio',
      region: 'Bihar',
    },
    {
      city: 'Almora',
      note: 'Regional Desk',
      region: 'Uttarakhand',
    },
  ],
}

export const SITE_PHONE = siteConfig.phoneDisplay
export const SITE_TEL = siteConfig.phone
export const SITE_WHATSAPP_URL = siteConfig.whatsappLink
export const SITE_ADDRESS = siteConfig.address
export const SITE_MAPS_URL = siteConfig.mapsLink
export const SITE_EMAIL = siteConfig.email
export const SITE_FORM_ROUTE = siteConfig.formRoute
