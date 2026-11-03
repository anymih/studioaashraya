export interface TechItem {
  id: string
  title: string
  whatItIs: string
  whatItCatches: string
  whatYouReceive: string
  usedAt: string
  imageKey: string
  headlineSentence: string
}

export const TECH_ITEMS: TechItem[] = [
  {
    id: 'bim-clash',
    title: 'BIM clash detection',
    whatItIs:
      'The building is modelled in 3D with structure, ducts, pipes and conduits, and the model is checked for conflicts.',
    whatItCatches: 'Beams cutting duct routes, missing sleeves, lost ceiling height.',
    whatYouReceive: 'Clash report and coordinated drawings.',
    usedAt: 'Stage 03, before Gate 2',
    imageKey: 'tech-bim',
    headlineSentence: 'Structure, ducts and pipes checked against each other before the pour.',
  },
  {
    id: 'thermal-sim',
    title: 'Climate simulation',
    whatItIs:
      'Sun path, heat gain through walls and glass, and daylight are modelled for your plot and orientation.',
    whatItCatches: 'West-facing heat gain, glare, dark rooms.',
    whatYouReceive: 'A summary of the façade and shading decisions the model led to.',
    usedAt: 'Stages 02 and 03',
    imageKey: 'tech-thermal',
    headlineSentence: 'Sun, heat gain and daylight modelled before the façade is fixed.',
  },
  {
    id: 'structural-seismic',
    title: 'Seismic structural analysis',
    whatItIs:
      'The frame is analysed for lateral load under the seismic provisions that apply to Delhi NCR, which lies in Seismic Zone IV.',
    whatItCatches: 'Slender or irregular frames and weak load paths.',
    whatYouReceive: 'A structural analysis summary and the design basis.',
    usedAt: 'Stage 03',
    imageKey: 'tech-structural',
    headlineSentence: 'Lateral load analysis for Seismic Zone IV compliance.',
  },
  {
    id: 'lidar-twin',
    title: '360° LiDAR scans',
    whatItIs:
      'The site is scanned at each gate and the scan is compared with the BIM model.',
    whatItCatches: 'Positions off the drawing, level errors, missing elements before they are covered.',
    whatYouReceive: 'A scan walkthrough link and deviation notes for each gate.',
    usedAt: 'Every gate',
    imageKey: 'tech-lidar',
    headlineSentence: 'Each gate scanned and compared with the model.',
  },
  {
    id: 'drone-audit',
    title: 'Drone audits',
    whatItIs:
      'Aerial photographs and video of the plot, roof, terrace and façade on a fixed schedule.',
    whatItCatches: 'Progress gaps, roof and terrace defects, site-condition issues.',
    whatYouReceive: 'A dated aerial set.',
    usedAt: 'During structure and finishes',
    imageKey: 'svc-buildability',
    headlineSentence: 'Roof, terrace and façade photographed from above, on schedule.',
  },
  {
    id: 'concrete-testing',
    title: 'Lab-tested concrete',
    whatItIs:
      'Cube samples taken at every pour and tested at NABL-accredited labs.',
    whatItCatches: 'Concrete below the specified grade.',
    whatYouReceive: 'Lab certificates filed per pour.',
    usedAt: 'Gate 2',
    imageKey: 'tech-concrete',
    headlineSentence: 'Cube samples from every pour, tested at NABL-accredited labs.',
  },
  {
    id: 'pulse-velocity',
    title: 'Pulse velocity testing',
    whatItIs:
      'Non-destructive ultrasonic check of concrete quality in cured elements.',
    whatItCatches: 'Voids and weak concrete without breaking anything.',
    whatYouReceive: 'Readings per element tested.',
    usedAt: 'After curing, structure stage',
    imageKey: 'tech-concrete',
    headlineSentence: 'Cast elements checked without breaking them.',
  },
  {
    id: 'rebar-scan',
    title: 'Rebar scanning',
    whatItIs:
      'A scanner reads reinforcement spacing and cover inside cast elements.',
    whatItCatches: 'Bars at the wrong spacing or cover.',
    whatYouReceive: 'Scan images with measured spacing and cover.',
    usedAt: 'Structure stage',
    imageKey: 'tech-rebar',
    headlineSentence: 'Spacing and concrete cover measured non-destructively.',
  },
  {
    id: 'flood-test',
    title: 'Flood-tested waterproofing',
    whatItIs:
      'Waterproofed areas are flooded and monitored before anything covers them.',
    whatItCatches: 'Leaks, before finishes hide them.',
    whatYouReceive: 'Dated photographs and a signed result.',
    usedAt: 'Gate 3',
    imageKey: 'tech-flood',
    headlineSentence: 'Water stands on it before anything covers it.',
  },
  {
    id: 'dashboard-cpm',
    title: 'Live dashboard',
    whatItIs:
      'One place for schedule, gate status, cost against the bill of quantities, photographs, scans and decisions.',
    whatItCatches: 'Surprises.',
    whatYouReceive: 'A client login.',
    usedAt: 'Whole build',
    imageKey: 'dashboard-mock',
    headlineSentence: 'Schedule, gates, cost, photos, scans and decisions in one place.',
  },
]
