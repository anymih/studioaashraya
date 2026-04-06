export type Project = {
  slug: string
  title: string
  location: string
  type: 'Residential' | 'Institutional' | 'Concept'
  area: string
  year: string
  status: 'Completed' | 'In Progress' | 'Concept'
  heroImage: string
  galleryImages: string[]
  passiveStrategies: string[]
  materials: string[]
  metric: string
  metricIcon: 'leaf' | 'drop' | 'sun'
  story: { problem: string; approach: string; outcome: string }
}

export const projects: Project[] = [
  {
    slug: 'the-clay-house',
    title: 'The Clay House',
    location: 'Patna, Bihar',
    type: 'Residential',
    area: '2,400 sq ft',
    year: '2024',
    status: 'Completed',
    heroImage: '/images/hero.webp',
    galleryImages: [
      '/images/projects/the-clay-house/gallery-1.jpg',
      '/images/projects/the-clay-house/gallery-2.jpg',
      '/images/projects/the-clay-house/gallery-3.jpg',
    ],
    passiveStrategies: [
      'Cross-ventilation corridors aligned with prevailing winds',
      'Thick earthen walls for thermal mass',
      'Overhanging chajjas reducing solar heat gain by 40%',
      'Internal courtyard acting as thermal chimney',
    ],
    materials: ['Compressed Earth Blocks', 'Exposed Brick', 'Bamboo Rafters', 'Kota Stone', 'Lime Plaster'],
    metric: '40% lower cooling costs',
    metricIcon: 'leaf',
    story: {
      problem:
        'A family of four living in Patna\'s extreme summers faced electricity bills exceeding ₹8,000/month for cooling alone. Their concrete apartment offered no respite from the 45°C peak temperatures.',
      approach:
        'We designed a home using compressed earth blocks with high thermal mass, oriented to capture the dominant southeast winds. Deep verandas and chajjas shade the walls during peak sun hours, while an internal courtyard creates a stack effect for natural cooling.',
      outcome:
        'The family now enjoys a consistently 6–8°C cooler interior without AC during most months. Their cooling bills dropped by 40%, and the home has become a neighborhood landmark for sustainable living in Bihar.',
    },
  },
  {
    slug: 'the-veranda-villa',
    title: 'The Veranda Villa',
    location: 'Gaya, Bihar',
    type: 'Residential',
    area: '3,200 sq ft',
    year: '2024',
    status: 'Completed',
    heroImage: '/images/hero.webp',
    galleryImages: [
      '/images/projects/the-veranda-villa/gallery-1.jpg',
      '/images/projects/the-veranda-villa/gallery-2.jpg',
      '/images/projects/the-veranda-villa/gallery-3.jpg',
    ],
    passiveStrategies: [
      'Wrap-around veranda acting as thermal buffer zone',
      'High ceilings (14ft) with clerestory windows',
      'Green roof insulation reducing heat gain',
      'Rainwater harvesting integrated into design',
    ],
    materials: ['Local Sandstone', 'Reclaimed Teak', 'Clay Tiles', 'Lime Mortar', 'Jute Fiber Insulation'],
    metric: '8°C cooler indoors',
    metricIcon: 'sun',
    story: {
      problem:
        'A retired professor wanted a home that honored Gaya\'s architectural heritage while providing modern comfort. Conventional builders proposed generic RCC structures that ignored the region\'s climate.',
      approach:
        'Drawing from Gaya\'s historic havelis, we designed deep wraparound verandas that create shaded transition spaces. Local sandstone walls provide massive thermal inertia, while high clerestory windows enable hot air to escape naturally.',
      outcome:
        'The home has become a model for climate-responsive living in Gaya. Indoor temperatures stay below 32°C even during peak summer, and the professor hosts architecture students eager to study vernacular adaptation.',
    },
  },
  {
    slug: 'aashraya-farmstead',
    title: 'Aashraya Farmstead',
    location: 'Nalanda, Bihar',
    type: 'Residential',
    area: '4,800 sq ft',
    year: '2025',
    status: 'In Progress',
    heroImage: '/images/hero.webp',
    galleryImages: [
      '/images/projects/aashraya-farmstead/gallery-1.jpg',
      '/images/projects/aashraya-farmstead/gallery-2.jpg',
      '/images/projects/aashraya-farmstead/gallery-3.jpg',
    ],
    passiveStrategies: [
      'Earth-sheltered design utilizing natural ground cooling',
      'Passive solar orientation for winter warmth',
      'Biogas integration from farm waste',
      'Natural stone foundations from local quarry',
    ],
    materials: ['Rammed Earth', 'Local Stone', 'Bamboo', 'Fly Ash Bricks', 'Thatch Roofing'],
    metric: '60% less embodied energy',
    metricIcon: 'leaf',
    story: {
      problem:
        'A farming family in Nalanda wanted a spacious farmstead but refused to use materials imported from outside Bihar. They wanted their home to literally grow from their land.',
      approach:
        'Using rammed earth from the site itself, bamboo from local groves, and stone from a quarry 12 km away, we created a farmstead with zero imported materials. The earth-sheltered design uses the ground\'s natural insulation.',
      outcome:
        'Construction costs came in 35% below conventional building. The farmstead uses 60% less embodied energy than comparable RCC buildings and has inspired three neighbors to adopt similar construction.',
    },
  },
  {
    slug: 'vidya-learning-center',
    title: 'Vidya Learning Center',
    location: 'Muzaffarpur, Bihar',
    type: 'Institutional',
    area: '6,500 sq ft',
    year: '2024',
    status: 'Completed',
    heroImage: '/images/hero.webp',
    galleryImages: [
      '/images/projects/vidya-learning-center/gallery-1.jpg',
      '/images/projects/vidya-learning-center/gallery-2.jpg',
      '/images/projects/vidya-learning-center/gallery-3.jpg',
    ],
    passiveStrategies: [
      'North-south classroom orientation for even daylighting',
      'Jaali screens filtering harsh afternoon sun',
      'Flat roof with reflective coating reducing heat absorption',
      'Stepped floor plan following natural terrain',
    ],
    materials: ['Fly Ash Bricks', 'Steel Frame', 'Bamboo Screens', 'Polished Concrete', 'Recycled Wood'],
    metric: 'Zero AC classrooms',
    metricIcon: 'sun',
    story: {
      problem:
        'An NGO needed a community learning center in Muzaffarpur that could function without electricity for AC, as power cuts are frequent. The center needed to serve 200+ students daily.',
      approach:
        'Every classroom opens to a central courtyard with a large banyan tree. Jaali screens on the west facade filter afternoon glare while allowing air movement. The stepped design follows the natural slope, creating natural ventilation channels.',
      outcome:
        'All classrooms maintain comfortable temperatures year-round without AC. The center serves 250 students daily with minimal operating costs, proving that institutional buildings in Bihar don\'t need active cooling.',
    },
  },
  {
    slug: 'heritage-library-bhagalpur',
    title: 'Heritage Library Bhagalpur',
    location: 'Bhagalpur, Bihar',
    type: 'Institutional',
    area: '5,200 sq ft',
    year: '2025',
    status: 'In Progress',
    heroImage: '/images/hero.webp',
    galleryImages: [
      '/images/projects/heritage-library-bhagalpur/gallery-1.jpg',
      '/images/projects/heritage-library-bhagalpur/gallery-2.jpg',
      '/images/projects/heritage-library-bhagalpur/gallery-3.jpg',
    ],
    passiveStrategies: [
      'Double-skin facade for humidity control',
      'Stack ventilation through central atrium',
      'Reflective pergola canopy for reading courtyard',
      'Landscaped buffer zone for microclimate creation',
    ],
    materials: ['Fired Brick', 'Mild Steel', 'Toughened Glass', 'Local Granite', 'Cork Flooring'],
    metric: '50% less water usage',
    metricIcon: 'drop',
    story: {
      problem:
        'Bhagalpur\'s silk heritage deserves a cultural space. The city lacked a modern, climate-appropriate library that could preserve books in Bihar\'s extreme humidity while remaining open and welcoming.',
      approach:
        'A double-skin brick facade controls humidity naturally, while a central atrium provides daylight to all reading areas. The design references Bhagalpur\'s silk weaving patterns in its jaali screens and floor mosaics.',
      outcome:
        'Currently under construction, the library is designed to maintain 55–65% relative humidity without mechanical systems. Rainwater harvesting and greywater recycling will reduce water consumption by half.',
    },
  },
  {
    slug: 'zero-carbon-pavilion',
    title: 'Zero Carbon Pavilion',
    location: 'Patna, Bihar',
    type: 'Concept',
    area: '1,800 sq ft',
    year: '2025',
    status: 'Concept',
    heroImage: '/images/hero.webp',
    galleryImages: [
      '/images/projects/zero-carbon-pavilion/gallery-1.jpg',
      '/images/projects/zero-carbon-pavilion/gallery-2.jpg',
      '/images/projects/zero-carbon-pavilion/gallery-3.jpg',
    ],
    passiveStrategies: [
      'Net-zero energy design with integrated solar',
      'Modular construction for zero waste',
      'Living walls for natural air purification',
      'Phase-change materials for thermal regulation',
    ],
    materials: ['Hempcrete', 'Cross-Laminated Timber', 'Solar Glass', 'Living Wall Panels', 'Recycled Aluminum'],
    metric: 'Net-zero carbon',
    metricIcon: 'leaf',
    story: {
      problem:
        'Bihar lacks a demonstration project showing that zero-carbon buildings are possible with locally available materials and skills. The construction industry remains skeptical about sustainable alternatives.',
      approach:
        'This concept pavilion combines hempcrete walls (carbon-negative), cross-laminated timber from managed forests, and integrated solar glass to achieve net-zero energy. The modular design allows local craftsmen to build with minimal training.',
      outcome:
        'As a concept project, the pavilion aims to prove that zero-carbon is achievable at Bihar construction budgets. If built, it would be Bihar\'s first net-zero public building and a training center for sustainable construction.',
    },
  },
]
