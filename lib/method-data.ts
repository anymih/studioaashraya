export interface MethodStage {
  num: string
  name: string
  description: string
  receive: string
  gate?: string
  checks?: string[]
}

export const methodStages: MethodStage[] = [
  {
    num: '01',
    name: 'Plot review',
    description:
      'Meet, walk the plot, record the brief, budget range, timeline and who decides.',
    receive:
      'Written plot review: dimensions, roads, setbacks, coverage, FAR, approval route.',
    checks: ['none'],
  },
  {
    num: '02',
    name: 'Buildability',
    description:
      'Test the brief against the plot: basement, soil risk, drainage, sun path, privacy, services routing. Run solar and heat-gain simulation.',
    receive:
      'Buildability summary, main risks, indicative cost and timeline range.',
    checks: ['Climate simulation'],
  },
  {
    num: '03',
    name: 'Design and quantities',
    description:
      'Concept, façade, plans, sections, structural coordination, specification. Model the building in BIM and run clash detection.',
    receive:
      'Drawing set, clash report, specification schedule, bill of quantities, agreement with handover date, scope, payment schedule.',
    checks: ['BIM clash detection'],
  },
  {
    num: '04',
    name: 'Approvals',
    description:
      'Prepare sanction drawings and follow them through with the authority.',
    receive: 'Sanctioned plans and a query log.',
    checks: ['none'],
  },
  {
    num: '05',
    name: 'Foundation (Gate 1)',
    description: 'Excavation, reinforcement, first pour.',
    receive: 'Gate 1 record, photographs, 360° scan, dashboard update.',
    gate: 'Gate 1',
    checks: [
      'Excavation level and soil at founding level',
      'Reinforcement against the bar schedule',
      'Cover and spacers',
      'Concrete mix confirmed and cube samples taken',
      '360° LiDAR scan compared with the model',
    ],
  },
  {
    num: '06',
    name: 'Structure (Gate 2)',
    description: 'Columns, beams, slabs, floor by floor.',
    receive: 'Gate 2 record for each pour.',
    gate: 'Gate 2',
    checks: [
      'Reinforcement before every pour',
      'Shuttering levels',
      'Conduit and sleeve positions against the BIM model',
      'Cube tests at NABL-accredited labs',
      'Ultrasonic pulse velocity testing and rebar scanning on cured elements',
      '360° scan',
      'Drone audit',
    ],
  },
  {
    num: '07',
    name: 'Services and waterproofing (Gate 3)',
    description:
      'Electrical, plumbing, drainage and waterproofing before walls close.',
    receive: 'Gate 3 record with test results.',
    gate: 'Gate 3',
    checks: [
      'Conduit and pipe positions against the model',
      'Pressure and drainage checks',
      'Waterproofing laid to specification and flood-tested',
      '360° scan before walls close',
    ],
  },
  {
    num: '08',
    name: 'Finishes and handover (Gate 4)',
    description: 'Joinery, tiling, paint, fittings, interiors.',
    receive:
      'Gate 4 record, closed snag list, as-built drawings, test records, warranty terms.',
    gate: 'Gate 4',
    checks: [
      'Finishes checked room by room against drawings',
      'Snag list closed',
      'Handover file complete',
      'Final 360° scan archived',
    ],
  },
]

export const verifiableArtifacts: string[] = [
  'Gate records',
  'Cube test certificates per pour',
  '360° scans',
  'Clash report',
  'Bill of quantities',
  'Specification schedule',
  'As-built drawings',
  'Decision log',
]
