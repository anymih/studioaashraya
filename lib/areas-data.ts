import { FaqItem } from './faq-data'

export interface AreaSection {
  title: string
  content: string
}

export interface AreaDetail {
  slug: string
  name: string
  region: string
  tier: 'primary' | 'secondary'
  h1: string
  lead: string
  sections: AreaSection[]
  faq: FaqItem[]
  projectSlugs: string[]
  live: boolean
  ctaVariant?: 'plot-check' | 'old-house'
}

export const areasData: AreaDetail[] = [
  {
    slug: 'gurugram',
    name: 'Gurugram',
    region: 'Delhi NCR',
    tier: 'primary',
    h1: 'Architect and builder in Gurugram',
    lead: 'Studio Aashraya designs and builds private homes on plots in Gurugram, from our office in Old DLF Colony, Sector 14. One agreement covers plot review, design, engineering, approvals and construction.',
    sections: [
      {
        title: 'Plots we assess',
        content:
          'Plots in established phases and new sectors, farmhouse land, and plots with legacy structures.',
      },
      {
        title: 'What is specific here',
        content:
          'Sanction routes depend on the sector and the authority that governs it. We confirm the authority and the applicable code for your plot, then check setbacks, coverage, FAR, parking and height before any design work. Summers are hot and winters carry smog, so we treat shading, the building envelope and indoor air as engineering questions. Soil and water-table conditions vary between localities, so we recommend a soil investigation before the structure is fixed.',
      },
    ],
    faq: [
      {
        id: 'faq-area-ggn-1',
        question: 'Do you manage construction on Gurugram builder plots?',
        answer:
          'Yes. We handle end-to-end turnkey architecture, structure, approvals, and construction with quality gates.',
      },
    ],
    projectSlugs: ['jali-house', 'basement-villa', 'nri-farmhouse-sohna'],
    live: true,
    ctaVariant: 'plot-check',
  },
  {
    slug: 'delhi',
    name: 'Delhi',
    region: 'Delhi NCR',
    tier: 'primary',
    h1: 'Architect and builder in Delhi',
    lead: 'Private homes, legacy houses and redevelopments in Delhi, designed and built by one team.',
    sections: [
      {
        title: 'Legacy houses and redevelopment',
        content:
          'We start with a condition survey, then price the options to retain, strengthen or rebuild.',
      },
      {
        title: 'Tight plots',
        content:
          'Setbacks, light and privacy decide what a small plot can hold, so we test them before design.',
      },
    ],
    faq: [
      {
        id: 'faq-area-del-1',
        question: 'Can you rebuild on tight residential plots with common walls?',
        answer:
          'Yes. We conduct condition surveys and design engineered shoring and underpinning to protect adjacent structures.',
      },
    ],
    projectSlugs: ['south-delhi-redevelopment'],
    live: true,
    ctaVariant: 'old-house',
  },
  {
    slug: 'patna',
    name: 'Patna and Bihar',
    region: 'Bihar',
    tier: 'secondary',
    h1: 'Architect and builder in Patna and Bihar',
    lead: 'The studio began here. Climate-responsive homes with courtyards, shaded verandas and brick screens, now with construction under the same roof.',
    sections: [
      {
        title: 'Tools for Bihar plots',
        content:
          'We built public calculators for Bihar Building Bye-laws 2014 to give plot owners instant clarity on FAR and setbacks.',
      },
    ],
    faq: [
      {
        id: 'faq-area-pat-1',
        question: 'Where can I see built projects in Bihar?',
        answer:
          'We have delivered homes and institutional projects across Patna, Gaya, Nalanda, and Bhagalpur.',
      },
    ],
    projectSlugs: ['courtyard-home-patna'],
    live: true,
    ctaVariant: 'plot-check',
  },
  {
    slug: 'almora',
    name: 'Almora and Uttarakhand',
    region: 'Uttarakhand',
    tier: 'secondary',
    h1: 'Architect and builder in Almora and Uttarakhand',
    lead: 'Homes on hill sites, where slope, access and drainage decide the structure.',
    sections: [
      {
        title: 'Hill sites',
        content:
          'We assess the slope, the retaining and foundation approach, and how materials reach the site before the design is fixed.',
      },
    ],
    faq: [
      {
        id: 'faq-area-alm-1',
        question: 'How do you handle slope stability and material transport in hills?',
        answer:
          'We evaluate gradient and drainage lines first, tailoring retaining walls and structural mass to local terrain and access.',
      },
    ],
    projectSlugs: ['hillside-house-almora'],
    live: true,
    ctaVariant: 'plot-check',
  },
]

export function getAreaBySlug(slug: string): AreaDetail | undefined {
  return areasData.find((a) => a.slug === slug && a.live)
}
