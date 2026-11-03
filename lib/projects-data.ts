/**
 * Studio Aashraya: six SAMPLE projects.
 * Copied from docs/rebuild/06_SAMPLE_PROJECTS.ts per Revision 2 specs.
 * `placeholder: true` means invented sample content.
 * Metric values with evidence "sample" render with the tag "Sample figure".
 */

export type Evidence = 'measured' | 'simulated' | 'sample'
export type ProjectStatus = 'built' | 'under-construction' | 'design'
export type TechId =
  | 'bim-clash'
  | 'lidar-twin'
  | 'thermal-sim'
  | 'structural-seismic'
  | 'concrete-testing'
  | 'rebar-scan'
  | 'flood-test'
  | 'dashboard-cpm'

export interface Metric {
  label: string
  value: string
  evidence: Evidence
  method?: string
}

export interface Project {
  slug: string
  key: string // image id prefix: proj-<key>-cover, -g1, -g2, -g3, -plan
  name: string
  city: string
  region: 'Delhi NCR' | 'Bihar' | 'Uttarakhand'
  type: 'Residential' | 'Institutional' | 'Concept'
  status: ProjectStatus
  placeholder: boolean
  year?: number
  plotArea?: string
  builtUp?: string
  floors: string
  climateZone: string
  delivery?: { agreed: string; delivered?: string }
  warrantyYears: 15
  headline: string
  summary: string
  galleryCaptions: [string, string, string]
  narrative: { problem: string; approach: string; solution: string }
  strategies: { name: string; description: string }[]
  materials: string[]
  technology: TechId[]
  metrics: Metric[]
  seo: { title: string; description: string }
}

export const SAMPLE_PROJECTS: Project[] = [
  {
    slug: 'jali-house',
    key: 'jali',
    name: 'Jali House',
    city: 'Gurugram',
    region: 'Delhi NCR',
    type: 'Residential',
    status: 'built',
    placeholder: true,
    year: 2025,
    plotArea: '500 sq yd',
    builtUp: '8,200 sq ft',
    floors: 'Ground + 2',
    climateZone: 'Composite',
    delivery: { agreed: '2025-05', delivered: '2025-05' },
    warrantyYears: 15,
    headline: 'A west façade that works as a heat shield.',
    summary:
      'A corner-plot family home where a brick jali screen with an air gap takes the afternoon sun before it reaches the wall.',
    galleryCaptions: [
      'Double-height courtyard with a skylight slot',
      'Jali screen and air gap in section',
      'Courtyard looking up through the neem',
    ],
    narrative: {
      problem:
        'The plot faces west. In a Gurugram summer a plain west wall takes direct sun for five hours, and the rooms behind it become the hottest in the house.',
      approach:
        'We moved the heat out before it arrived. A handmade-brick jali screen stands 150 mm off the wall, and a double-height courtyard pulls hot air up and out through a skylight slot.',
      solution:
        'The wall behind the jali stays in shade. The courtyard carries daylight to the centre of the plan, so the inner rooms need little artificial light through the day.',
    },
    strategies: [
      { name: 'Jali screen with air gap', description: 'Brick screen 150 mm clear of the wall shades the façade and lets air move behind it.' },
      { name: 'Stack-effect courtyard', description: 'A double-height void with a high skylight slot draws hot air upward and out.' },
      { name: 'Cavity walls on the west', description: 'A sealed air cavity and insulation slow the heat that does reach the wall.' },
      { name: 'Low-solar-gain glazing', description: 'Double glazing with a low solar heat gain coefficient on west and south openings.' },
    ],
    materials: ['Handmade brick jali', 'Dholpur sandstone cladding on SS clamps', 'Kota stone floors', 'Teak joinery', 'Lime-washed walls'],
    technology: ['thermal-sim', 'bim-clash', 'structural-seismic', 'concrete-testing', 'flood-test', 'dashboard-cpm'],
    metrics: [
      { label: 'West-room peak afternoon temperature vs conventional reference', value: '-5 °C', evidence: 'sample' },
      { label: 'Daylight reaching inner rooms without artificial light', value: 'Most of the day', evidence: 'sample' },
      { label: 'Sanction approval', value: 'First submission', evidence: 'sample' },
    ],
    seo: {
      title: 'Jali House, Gurugram',
      description: 'A corner-plot home in Gurugram with a brick jali screen and a stack-effect courtyard, designed and built by Studio Aashraya.',
    },
  },
  {
    slug: 'basement-villa',
    key: 'basement',
    name: 'Basement Villa',
    city: 'Gurugram',
    region: 'Delhi NCR',
    type: 'Residential',
    status: 'under-construction',
    placeholder: true,
    plotArea: '600 sq yd',
    builtUp: '11,500 sq ft',
    floors: 'Basement + Ground + 2',
    climateZone: 'Composite',
    delivery: { agreed: '2027-02' },
    warrantyYears: 15,
    headline: 'A deep basement that is built to stay dry.',
    summary:
      'A basement-led villa where the retaining walls, drainage and membrane are coordinated and tested before any wall is closed.',
    galleryCaptions: [
      'Basement retaining wall with membrane and drainage board',
      'Second-floor slab pour in progress',
      'Reinforcement stacked by diameter on site',
    ],
    narrative: {
      problem:
        'A deep basement on a plot with a high water table is where leaks and clashes are most expensive. Water pressure on the walls, and services crossing structure, decide whether the basement stays usable.',
      approach:
        'We model the basement in BIM so every duct, sleeve and drain is placed before the pour, and we specify the waterproofing as a system with a protection board and a perimeter drain.',
      solution:
        'The retaining walls are poured to a coordinated sleeve plan. The membrane is laid and tested before the backfill. Progress is recorded at each gate and shared with the client.',
    },
    strategies: [
      { name: 'Clash-free services', description: 'Ducts, drains and sleeves coordinated in BIM so no beam is cut after casting.' },
      { name: 'Membrane and drainage board', description: 'Wall membrane with a protection board and a perimeter drain at the footing.' },
      { name: 'Sleeve plan before the pour', description: 'Every penetration is cast in at the position drawn.' },
      { name: 'Gate-linked payments', description: 'Payments follow the gates, so money moves when work has been checked.' },
    ],
    materials: ['RCC frame', 'Crystalline admixture in basement concrete', 'Wall membrane with protection board', 'Perimeter drain', 'Fly-ash brick infill above ground'],
    technology: ['bim-clash', 'lidar-twin', 'structural-seismic', 'concrete-testing', 'rebar-scan', 'flood-test', 'dashboard-cpm'],
    metrics: [
      { label: 'Services clashes resolved in the model before casting', value: 'All logged and closed', evidence: 'sample' },
      { label: 'Gates passed', value: '2 of 4', evidence: 'sample' },
      { label: 'Schedule status', value: 'On the agreed plan', evidence: 'sample' },
    ],
    seo: {
      title: 'Basement Villa, Gurugram',
      description: 'A basement villa under construction in Gurugram with coordinated services, a tested membrane and gate-linked reporting.',
    },
  },
  {
    slug: 'south-delhi-redevelopment',
    key: 'delhi',
    name: 'South Delhi Redevelopment',
    city: 'Delhi',
    region: 'Delhi NCR',
    type: 'Residential',
    status: 'built',
    placeholder: true,
    year: 2025,
    plotArea: '300 sq yd',
    builtUp: '6,400 sq ft',
    floors: 'Ground + 2 (one new)',
    climateZone: 'Composite',
    delivery: { agreed: '2025-09', delivered: '2025-09' },
    warrantyYears: 15,
    headline: 'An old house, strengthened and given a new floor.',
    summary:
      'A 1970s house that kept its character and gained strength, light and a new top floor.',
    galleryCaptions: [
      'Restored ground-floor living room with original arches',
      'Lime plaster and brass door hardware',
      'Staircase before and after restoration',
    ],
    narrative: {
      problem:
        'The family loved the house and doubted the structure. Cracks ran at the column heads, the roof leaked, and the family needed one more floor.',
      approach:
        'We surveyed the existing structure, tested the concrete, and priced three options: retain, strengthen or rebuild. The family chose to strengthen and add one floor.',
      solution:
        'Columns were jacketed, the roof was rebuilt with a sloped waterproofed screed, and a light new top floor was added. The arches and floors the family valued stayed.',
    },
    strategies: [
      { name: 'Condition survey first', description: 'Rebound readings, cores and a crack map before any option was priced.' },
      { name: 'Column jacketing', description: 'Existing columns strengthened with reinforced concrete jackets.' },
      { name: 'Lightweight top floor', description: 'A light new floor sized to the strengthened frame.' },
      { name: 'Roof rebuilt as a system', description: 'Sloped screed, membrane and protection layer, flood-tested before finishes.' },
    ],
    materials: ['Lime plaster', 'Restored oxide floors', 'Kota stone threshold', 'Brass hardware', 'Steel-frame new floor'],
    technology: ['structural-seismic', 'concrete-testing', 'rebar-scan', 'flood-test', 'lidar-twin', 'dashboard-cpm'],
    metrics: [
      { label: 'Option chosen after pricing three routes', value: 'Strengthen and add one floor', evidence: 'sample' },
      { label: 'Roof leak test', value: 'Passed at gate 3', evidence: 'sample' },
      { label: 'Delivery against agreed date', value: 'On the date', evidence: 'sample' },
    ],
    seo: {
      title: 'South Delhi Redevelopment',
      description: 'A 1970s Delhi house strengthened and extended by Studio Aashraya, keeping its arches and floors.',
    },
  },
  {
    slug: 'hillside-house-almora',
    key: 'almora',
    name: 'Hillside House',
    city: 'Almora',
    region: 'Uttarakhand',
    type: 'Residential',
    status: 'built',
    placeholder: true,
    year: 2024,
    plotArea: '250 sq m',
    builtUp: '3,100 sq ft',
    floors: 'Ground + 1, stepped',
    climateZone: 'Temperate',
    delivery: { agreed: '2024-10', delivered: '2024-10' },
    warrantyYears: 15,
    headline: 'A house that steps with the slope.',
    summary:
      'A stone and slate home that follows the contour, with retaining walls that double as terraces and a rainwater tank at the lowest level.',
    galleryCaptions: [
      'Stone house set into the terraced slope',
      'Slate roof and aged deodar timber',
      'Stepped dry-stone retaining wall with drainage',
    ],
    narrative: {
      problem:
        'A steep site with heavy monsoon runoff. Excavation and drainage, not the house, were the risk. Materials had to be carried up the slope.',
      approach:
        'We stepped the plan with the contour, used the local stone, and designed the retaining walls and drainage before the house.',
      solution:
        'Each level sits on its own terrace. Water is led away along planned channels and collected in a tank at the bottom, and the stone keeps the rooms cool in summer and warm in winter.',
    },
    strategies: [
      { name: 'Stepped plan', description: 'The house follows the contour, which cuts excavation and retaining height.' },
      { name: 'Drainage first', description: 'Channels and weep holes were set out before the walls were built.' },
      { name: 'Local stone masonry', description: 'Thick stone walls give thermal mass and reduce transport.' },
      { name: 'Rainwater tank', description: 'Roof water is collected at the lowest terrace for the garden.' },
    ],
    materials: ['Local stone masonry', 'Slate roofing', 'Aged deodar timber', 'Dry-stone retaining walls', 'Lime mortar'],
    technology: ['structural-seismic', 'concrete-testing', 'flood-test', 'dashboard-cpm'],
    metrics: [
      { label: 'Excavation compared with a flat-plan scheme', value: 'Reduced', evidence: 'sample' },
      { label: 'Monsoon performance, first season', value: 'No water ingress', evidence: 'sample' },
      { label: 'Delivery against agreed date', value: 'On the date', evidence: 'sample' },
    ],
    seo: {
      title: 'Hillside House, Almora',
      description: 'A stepped stone and slate home on a steep Almora site, designed and built by Studio Aashraya.',
    },
  },
  {
    slug: 'courtyard-home-patna',
    key: 'patna',
    name: 'Courtyard Home',
    city: 'Patna',
    region: 'Bihar',
    type: 'Residential',
    status: 'built',
    placeholder: true,
    year: 2024,
    plotArea: '2,400 sq ft',
    builtUp: '3,200 sq ft',
    floors: 'Ground + 1',
    climateZone: 'Hot and humid',
    delivery: { agreed: '2024-06', delivered: '2024-06' },
    warrantyYears: 15,
    headline: 'A courtyard and a veranda for a hot, wet climate.',
    summary:
      'A brick and lime home built around a courtyard, with a deep veranda that keeps the monsoon out and the air moving.',
    galleryCaptions: [
      'Central courtyard with planting',
      'Exposed brick and jali openings',
      'Veranda in monsoon light',
    ],
    narrative: {
      problem:
        'Patna is hot and humid, and the plot is narrow. The family wanted a home that was cool without running air-conditioning all day.',
      approach:
        'We opened the plan around a courtyard, added a deep veranda on the sun side, and used brick and lime so the walls can breathe.',
      solution:
        'Cross-ventilation runs through the jali openings and the courtyard. The veranda keeps rain and direct sun off the walls.',
    },
    strategies: [
      { name: 'Courtyard planning', description: 'Rooms open onto a central courtyard for light and air.' },
      { name: 'Deep veranda', description: 'A deep overhang keeps sun and rain off the walls.' },
      { name: 'Jali cross-ventilation', description: 'Openings aligned for breeze across each room.' },
      { name: 'Breathable walls', description: 'Brick and lime plaster that releases moisture.' },
    ],
    materials: ['Exposed brick', 'Lime plaster', 'Jali blocks', 'Stone drain', 'Terracotta tile roof layer'],
    technology: ['thermal-sim', 'structural-seismic', 'concrete-testing', 'flood-test', 'dashboard-cpm'],
    metrics: [
      { label: 'Rooms with cross-ventilation', value: 'All principal rooms', evidence: 'sample' },
      { label: 'Indoor temperature vs conventional reference, peak afternoon', value: '-4 °C', evidence: 'sample' },
      { label: 'Delivery against agreed date', value: 'On the date', evidence: 'sample' },
    ],
    seo: {
      title: 'Courtyard Home, Patna',
      description: 'A brick and lime courtyard home in Patna with a deep veranda and cross-ventilation, built by Studio Aashraya.',
    },
  },
  {
    slug: 'nri-farmhouse-sohna',
    key: 'farm',
    name: 'NRI Farmhouse',
    city: 'Sohna, Gurugram',
    region: 'Delhi NCR',
    type: 'Residential',
    status: 'design',
    placeholder: true,
    plotArea: '1 acre',
    builtUp: '9,800 sq ft',
    floors: 'Ground + 1',
    climateZone: 'Composite',
    warrantyYears: 15,
    headline: 'A farmhouse planned for an owner who lives abroad.',
    summary:
      'A low-slung farmhouse of rammed earth and stone, designed so the family can follow every stage of the build from overseas.',
    galleryCaptions: [
      'Deep verandas on the south side',
      'Rammed-earth wall and battered stone plinth',
      'Aerial view of the house, water channel and orchard',
    ],
    narrative: {
      problem:
        'The family lives overseas and will visit twice a year. They need to decide, approve and verify without being on site.',
      approach:
        'We planned the house with long verandas for shade, thick earth walls for thermal mass, and a reporting rhythm built around their time zone.',
      solution:
        'Weekly walkthroughs, a decision log and four gate records give the family one place to see where the build stands and what is waiting on them.',
    },
    strategies: [
      { name: 'Deep verandas', description: 'Long overhangs shade the south and west sides.' },
      { name: 'Rammed-earth walls', description: 'Thick earth walls add thermal mass and keep rooms stable.' },
      { name: 'Water channel and orchard', description: 'A planned channel cools the air and feeds the planting.' },
      { name: 'Remote build plan', description: 'Weekly video, gate records and a written decision log in the owner\'s time zone.' },
    ],
    materials: ['Rammed earth', 'Battered stone plinth', 'Timber rafters', 'Lime plaster', 'Stone paving'],
    technology: ['thermal-sim', 'structural-seismic', 'bim-clash', 'dashboard-cpm'],
    metrics: [
      { label: 'Time-zone-fit reporting', value: 'Weekly walkthrough', evidence: 'sample' },
      { label: 'Gate records planned', value: '4', evidence: 'sample' },
      { label: 'Thermal simulation', value: 'Complete at design stage', evidence: 'simulated', method: 'OWNER_TO_SUPPLY' },
    ],
    seo: {
      title: 'NRI Farmhouse, Sohna',
      description: 'A design-stage farmhouse near Gurugram for an owner abroad, with a remote-build plan, from Studio Aashraya.',
    },
  },
]

export const ALL_PROJECTS = SAMPLE_PROJECTS
export const projects = SAMPLE_PROJECTS
export const PROJECTS = SAMPLE_PROJECTS

export function getAllProjects(): Project[] {
  return ALL_PROJECTS
}

export function getProjectBySlug(slug: string): Project | undefined {
  return ALL_PROJECTS.find((p) => p.slug === slug)
}

/**
 * Validates project records per Section 8.2 & Implementation Plan:
 * - 'built' requires 'year' and 'delivery.delivered'
 * - Every metric has 'evidence'
 * - Throws Error if invalid
 */
export function validateProjects(projects: Project[] = ALL_PROJECTS): boolean {
  for (const p of projects) {
    if (!p.slug || !p.key || !p.name) {
      throw new Error(`Project validation error: missing identity for slug "${p.slug}"`)
    }
    if (p.status === 'built') {
      if (!p.year) {
        throw new Error(`Project "${p.slug}" has status "built" but is missing year`)
      }
      if (!p.delivery?.delivered) {
        throw new Error(`Project "${p.slug}" has status "built" but is missing delivery.delivered`)
      }
    }
    for (const m of p.metrics) {
      if (!m.evidence) {
        throw new Error(`Project "${p.slug}" metric "${m.label}" is missing evidence`)
      }
    }
  }
  return true
}

// Self-validate at load
validateProjects()
