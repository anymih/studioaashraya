import React from 'react'
import Image from 'next/image'
import { ImageFrame } from '@/components/ui/ImageFrame'

export type ImageKind = 'generated' | 'coded' | 'photo'

export interface ImageRegistryEntry {
  id: string
  group: 'home' | 'tech' | 'services' | 'nri' | 'method' | 'areas' | 'about' | 'book' | 'projects'
  ratio: '4:5' | '4:3' | '3:2' | '16:9'
  width: number
  height: number
  alt: string
  caption?: string
  kind: ImageKind
  priority?: boolean
  src?: string
  missing?: boolean
}

export const IMAGE_REGISTRY: Record<string, ImageRegistryEntry> = {
  // General images (24)
  'hero-home': {
    id: 'hero-home',
    group: 'home',
    ratio: '4:5',
    width: 1600,
    height: 2000,
    alt: 'Three-storey sandstone and brick-jali home in Gurugram at sunset.',
    caption: 'Illustration',
    kind: 'generated',
    priority: true,
  },
  'home-problem': {
    id: 'home-problem',
    group: 'home',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Damp stains and peeling paint on a wall below a terrace slab.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'tech-bim': {
    id: 'tech-bim',
    group: 'tech',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Cutaway 3D model of a house showing structure, ducts and services with clash points marked.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'tech-lidar': {
    id: 'tech-lidar',
    group: 'tech',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Point-cloud scan of a half-built concrete house with the design model overlaid.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'tech-thermal': {
    id: 'tech-thermal',
    group: 'tech',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Heat map of a west-facing façade showing the jali screen running cooler than the plain wall.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'tech-structural': {
    id: 'tech-structural',
    group: 'tech',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Structural analysis model of a concrete frame under seismic load.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'tech-concrete': {
    id: 'tech-concrete',
    group: 'tech',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Concrete test cubes in a laboratory beside a compression testing machine.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'tech-rebar': {
    id: 'tech-rebar',
    group: 'tech',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Scanner being moved across a concrete wall to locate reinforcement bars.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'tech-flood': {
    id: 'tech-flood',
    group: 'tech',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Terrace slab filled with water for a leak test.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'tech-drone': {
    id: 'tech-drone',
    group: 'tech',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Aerial drone progress audit of roof, terrace and façade.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'svc-buildability': {
    id: 'svc-buildability',
    group: 'services',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Empty residential plot marked with survey pegs and setback lines.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'svc-design-build': {
    id: 'svc-design-build',
    group: 'services',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'House at first-floor slab stage with shuttering and reinforcement in place.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'svc-redevelopment': {
    id: 'svc-redevelopment',
    group: 'services',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Old two-storey house propped and scaffolded for redevelopment.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'nri-hero': {
    id: 'nri-hero',
    group: 'nri',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Laptop showing a live site walkthrough on a desk at dusk.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'gate-foundation': {
    id: 'gate-foundation',
    group: 'method',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Foundation reinforcement cage with cover blocks before concrete is poured.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'gate-structure': {
    id: 'gate-structure',
    group: 'method',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Slab reinforcement with conduits and sleeves in place before pouring.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'gate-waterproofing': {
    id: 'gate-waterproofing',
    group: 'method',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Bathroom slab with waterproofing coat and test water held to a marked level.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'gate-finishes': {
    id: 'gate-finishes',
    group: 'method',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Finished room with small tape flags marking items to correct.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'area-gurugram': {
    id: 'area-gurugram',
    group: 'areas',
    ratio: '16:9',
    width: 2000,
    height: 1125,
    alt: 'Tree-lined residential street in Gurugram.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'area-delhi': {
    id: 'area-delhi',
    group: 'areas',
    ratio: '16:9',
    width: 2000,
    height: 1125,
    alt: 'Residential lane in Delhi with old bungalows and one new stone-clad home.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'area-patna': {
    id: 'area-patna',
    group: 'areas',
    ratio: '16:9',
    width: 2000,
    height: 1125,
    alt: 'Residential street in Patna under monsoon clouds.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'area-almora': {
    id: 'area-almora',
    group: 'areas',
    ratio: '16:9',
    width: 2000,
    height: 1125,
    alt: 'Stone house on a terraced hillside in Almora.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'about-studio': {
    id: 'about-studio',
    group: 'about',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: "Architect's desk with plans, a study model and a laptop.",
    caption: 'Illustration',
    kind: 'generated',
  },
  'book-plot': {
    id: 'book-plot',
    group: 'book',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Folded plan on a parapet overlooking an empty plot at sunset.',
    caption: 'Illustration',
    kind: 'generated',
  },

  // Project 1: jali (Jali House, Gurugram)
  'proj-jali-cover': {
    id: 'proj-jali-cover',
    group: 'projects',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Jali House exterior with brick screen and sandstone façade.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-jali-g1': {
    id: 'proj-jali-g1',
    group: 'projects',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Double-height courtyard with skylight slot in Jali House.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-jali-g2': {
    id: 'proj-jali-g2',
    group: 'projects',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Jali screen and cavity wall detail with SS clamps.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-jali-g3': {
    id: 'proj-jali-g3',
    group: 'projects',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Courtyard looking up through neem tree to sky slot.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-jali-plan': {
    id: 'proj-jali-plan',
    group: 'projects',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Ground and first floor architectural plan for Jali House.',
    caption: 'Sample drawing',
    kind: 'generated',
  },

  // Project 2: basement (Basement Villa, Gurugram)
  'proj-basement-cover': {
    id: 'proj-basement-cover',
    group: 'projects',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Basement Villa concrete frame at second-slab stage from street.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-basement-g1': {
    id: 'proj-basement-g1',
    group: 'projects',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Basement retaining wall with waterproofing membrane and protection board.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-basement-g2': {
    id: 'proj-basement-g2',
    group: 'projects',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Slab pour in progress with pump boom and vibrator pokers.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-basement-g3': {
    id: 'proj-basement-g3',
    group: 'projects',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Neatly stacked reinforcement bars by diameter on site.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-basement-plan': {
    id: 'proj-basement-plan',
    group: 'projects',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Basement layout and coordinated services sleeve plan.',
    caption: 'Sample drawing',
    kind: 'generated',
  },

  // Project 3: delhi (South Delhi Redevelopment, Delhi)
  'proj-delhi-cover': {
    id: 'proj-delhi-cover',
    group: 'projects',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Redeveloped South Delhi house with lime-plaster off-white façade.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-delhi-g1': {
    id: 'proj-delhi-g1',
    group: 'projects',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Restored ground-floor living room with original arches.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-delhi-g2': {
    id: 'proj-delhi-g2',
    group: 'projects',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Lime plaster wall, brass hardware, and restored oxide floor.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-delhi-g3': {
    id: 'proj-delhi-g3',
    group: 'projects',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Staircase before and after restoration.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-delhi-plan': {
    id: 'proj-delhi-plan',
    group: 'projects',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Plan showing retained walls and strengthened column positions.',
    caption: 'Sample drawing',
    kind: 'generated',
  },

  // Project 4: almora (Hillside House, Almora)
  'proj-almora-cover': {
    id: 'proj-almora-cover',
    group: 'projects',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Stepped stone and slate home on a terraced Almora slope.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-almora-g1': {
    id: 'proj-almora-g1',
    group: 'projects',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Living area with local stone wall and deodar timber rafters.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-almora-g2': {
    id: 'proj-almora-g2',
    group: 'projects',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Dry-stone masonry junction with slate roof overhang.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-almora-g3': {
    id: 'proj-almora-g3',
    group: 'projects',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Stepped dry-stone retaining wall with drainage channel.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-almora-plan': {
    id: 'proj-almora-plan',
    group: 'projects',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Contour-following stepped plan and rainwater tank layout.',
    caption: 'Sample drawing',
    kind: 'generated',
  },

  // Project 5: patna (Courtyard Home, Patna)
  'proj-patna-cover': {
    id: 'proj-patna-cover',
    group: 'projects',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Exposed brick courtyard home in Patna with deep veranda.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-patna-g1': {
    id: 'proj-patna-g1',
    group: 'projects',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Central courtyard with lush monsoon planting and stone drain.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-patna-g2': {
    id: 'proj-patna-g2',
    group: 'projects',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Jali opening in exposed brick for cross-ventilation.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-patna-g3': {
    id: 'proj-patna-g3',
    group: 'projects',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Deep shaded veranda with rain falling onto perimeter drain.',
    caption: 'Illustration',
    kind: 'generated',
  },
  'proj-patna-plan': {
    id: 'proj-patna-plan',
    group: 'projects',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Courtyard-centred ground floor plan with cross-breeze arrows.',
    caption: 'Sample drawing',
    kind: 'generated',
  },

  // Project 6: farm (NRI Farmhouse, Sohna)
  'proj-farm-cover': {
    id: 'proj-farm-cover',
    group: 'projects',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Rammed-earth farmhouse with stone plinth and deep verandas in Sohna.',
    caption: 'Design render',
    kind: 'generated',
  },
  'proj-farm-g1': {
    id: 'proj-farm-g1',
    group: 'projects',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Living pavilion looking out onto orchard and water channel.',
    caption: 'Design render',
    kind: 'generated',
  },
  'proj-farm-g2': {
    id: 'proj-farm-g2',
    group: 'projects',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Rammed-earth wall texture and timber post junction.',
    caption: 'Design render',
    kind: 'generated',
  },
  'proj-farm-g3': {
    id: 'proj-farm-g3',
    group: 'projects',
    ratio: '3:2',
    width: 1800,
    height: 1200,
    alt: 'Aerial view of house, water channel, and orchard grid.',
    caption: 'Design render',
    kind: 'generated',
  },
  'proj-farm-plan': {
    id: 'proj-farm-plan',
    group: 'projects',
    ratio: '4:3',
    width: 1600,
    height: 1200,
    alt: 'Master site plan showing house, verandas, channel, and orchard.',
    caption: 'Sample drawing',
    kind: 'generated',
  },
}

export interface ImgProps {
  id: string
  className?: string
  priority?: boolean
  sizes?: string
}

export function Img({ id, className = '', priority, sizes }: ImgProps) {
  const entry = IMAGE_REGISTRY[id]

  if (!entry) {
    return (
      <ImageFrame
        aspectRatio="4/3"
        alt={`Missing image [${id}]`}
        caption="Image unlisted"
        isMissing={true}
        className={className}
      />
    )
  }

  const ratioString = entry.ratio.replace(':', '/')
  const isImageMissing = entry.missing || !entry.src

  if (isImageMissing) {
    return (
      <ImageFrame
        aspectRatio={ratioString}
        alt={entry.alt}
        caption={entry.caption}
        isMissing={true}
        className={className}
      />
    )
  }

  return (
    <ImageFrame
      aspectRatio={ratioString}
      alt={entry.alt}
      caption={entry.caption}
      className={className}
    >
      <Image
        src={entry.src!}
        alt={entry.alt}
        width={entry.width}
        height={entry.height}
        priority={priority ?? entry.priority}
        sizes={sizes || '(max-width: 900px) 100vw, 50vw'}
        className="w-full h-full object-cover"
      />
    </ImageFrame>
  )
}

export default Img
