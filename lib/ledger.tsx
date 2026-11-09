import React from 'react'
import { EvidenceLabel } from '@/components/ui/EvidenceLabel'

export type ClaimState =
  | 'measured'
  | 'simulated'
  | 'owner-attested'
  | 'contractual'
  | 'sourced'
  | 'owner-directed'
  | 'pending'
  | 'removed'

export type CapabilityState = 'live' | 'pending'

export interface Claim {
  id: string
  text?: string
  source?: string
  sourceUrl?: string
  state: ClaimState
  displayRule?: string
  method?: string
  ownerOverride?: boolean
  internalNote?: string
}

export interface Capability {
  id: string
  title?: string
  state: CapabilityState
  description?: string
  usedAt?: string
}

export const CLAIMS: Record<string, Claim> = {
  'c.track': {
    id: 'c.track',
    text: '50+ projects designed, 30+ constructed',
    source: 'Owner',
    state: 'owner-attested',
    displayRule: 'Show everywhere',
  },
  'c.credentials': {
    id: 'c.credentials',
    text: 'B.Arch IIT BHU Varanasi (2024), COA-registered, Data Science for AEC certificate',
    source: 'Owner',
    state: 'owner-attested',
    displayRule: 'Show',
  },
  'c.ontime': {
    id: 'c.ontime',
    text: 'Every home handed over on time',
    source: 'Owner',
    state: 'owner-attested',
    displayRule: 'Show',
  },
  'c.refund': {
    id: 'c.refund',
    text: 'If we miss the handover date in your agreement, we refund 10% of the total construction amount',
    source: 'Contract',
    state: 'contractual',
    displayRule: 'Show with "Conditions are in your agreement"',
  },
  'c.warranty': {
    id: 'c.warranty',
    text: '15-year warranty from handover',
    source: 'Contract',
    state: 'contractual',
    displayRule: 'Show with "Scope and exclusions are in your agreement"',
  },
  'c.thermal': {
    id: 'c.thermal',
    text: '4 to 6 °C cooler indoors than a conventional envelope',
    source: 'Owner, measured site data',
    state: 'measured',
    displayRule: 'Show with EvidenceLabel "Measured"',
    method: '/technology#measurement',
  },
  'c.energy': {
    id: 'c.energy',
    text: '30% lower energy bills',
    source: 'Owner, measured site data',
    state: 'measured',
    displayRule: 'Show with EvidenceLabel "Measured"',
    method: '/technology#measurement',
  },
  'c.approval': {
    id: 'c.approval',
    text: '100% of sanction submissions approved',
    source: 'Owner',
    state: 'owner-attested',
    displayRule: 'Show',
  },
  'c.delay62': {
    id: 'c.delay62',
    text: '62% of under-construction housing projects across 50 Indian cities were delayed',
    source: 'Liases Foras survey, 2017',
    sourceUrl:
      'https://mas360.moneylife.in/article/delay-in-62-percentage-of-housing-projects-in-50-indian-cities-finds-liases-foras-survey/2477.html',
    state: 'sourced',
    internalNote:
      'Survey is from Nov 2017 and measures delay only, not leaks. Do not paraphrase it as leaks.',
  },
  'c.seismic': {
    id: 'c.seismic',
    text: 'Delhi NCR lies in Seismic Zone IV',
    source: 'IS 1893 (Part 1): 2016',
    state: 'owner-attested',
    displayRule: 'Show in technology and structure copy',
  },
}

export const claimsRegistry = CLAIMS

export const TECH: Record<string, Capability> = {
  'bim-clash': {
    id: 'bim-clash',
    title: 'BIM clash detection before pours',
    description: 'Structure, ducts and pipes checked against each other before the pour.',
    usedAt: 'Stage 03, before Gate 2',
    state: 'live',
  },
  'thermal-sim': {
    id: 'thermal-sim',
    title: 'Solar-path, heat-gain and daylight simulation',
    description: 'Sun, heat gain and daylight modelled before the façade is fixed.',
    usedAt: 'Stages 02 and 03',
    state: 'live',
  },
  'lidar-twin': {
    id: 'lidar-twin',
    title: '360° LiDAR scans at each gate, compared with the model',
    description: 'Each gate scanned and compared with the model.',
    usedAt: 'Every gate',
    state: 'live',
  },
  'drone-audit': {
    id: 'drone-audit',
    title: 'Drone progress audits',
    description: 'Roof, terrace and façade photographed from above, on schedule.',
    usedAt: 'During structure and finishes',
    state: 'live',
  },
  'concrete-testing': {
    id: 'concrete-testing',
    title: 'Concrete cube testing at NABL-accredited labs',
    description: 'Cube samples from every pour, tested at NABL-accredited labs.',
    usedAt: 'Gate 2',
    state: 'live',
  },
  'pulse-velocity': {
    id: 'pulse-velocity',
    title: 'Pulse velocity testing',
    description: 'Non-destructive ultrasonic check of concrete quality in cured elements.',
    usedAt: 'After curing, structure stage',
    state: 'live',
  },
  'rebar-scan': {
    id: 'rebar-scan',
    title: 'Rebar scanning of cast elements',
    description: 'Cast elements checked without breaking them.',
    usedAt: 'Structure stage',
    state: 'live',
  },
  'flood-test': {
    id: 'flood-test',
    title: 'Flood tests on waterproofing',
    description: 'Water stands on it before anything covers it.',
    usedAt: 'Gate 3',
    state: 'live',
  },
  'dashboard-cpm': {
    id: 'dashboard-cpm',
    title: 'Live client dashboard and critical path scheduling',
    description: 'Schedule, gates, cost, photos, scans, decisions.',
    usedAt: 'Whole build',
    state: 'live',
  },
  'structural-seismic': {
    id: 'structural-seismic',
    title: 'Seismic structural analysis',
    description: 'Lateral load structural analysis for Seismic Zone IV.',
    usedAt: 'Stage 03',
    state: 'live',
  },
  // Operational deliverables
  'o.video': {
    id: 'o.video',
    title: 'Weekly video walkthrough',
    description: 'Weekly video walkthrough of the site.',
    usedAt: 'Weekly',
    state: 'live',
  },
  'o.photos': {
    id: 'o.photos',
    title: 'Dated photo and video archive',
    description: 'Dated photo and video archive, organised by stage.',
    usedAt: 'Whole build',
    state: 'live',
  },
  'o.log': {
    id: 'o.log',
    title: 'Written decision log',
    description: 'Every approval you give is recorded in writing.',
    usedAt: 'Whole build',
    state: 'live',
  },
  'o.gatepay': {
    id: 'o.gatepay',
    title: 'Payments linked to passed gates',
    description: 'Payments follow stages that have passed their gate inspection.',
    usedAt: 'Gates 1 to 4',
    state: 'live',
  },
  'o.gates': {
    id: 'o.gates',
    title: 'Four written gates',
    description: 'Written sign-off by the architect with instruments at 4 milestones.',
    usedAt: 'Stages 05, 06, 07, 08',
    state: 'live',
  },
  'o.boq': {
    id: 'o.boq',
    title: 'Bill of quantities with every design',
    description: 'Complete bill of quantities so you can see how figures are built up.',
    usedAt: 'Stage 03',
    state: 'live',
  },
  'o.lead': {
    id: 'o.lead',
    title: 'Named single point of contact',
    description: 'The architect who draws the house also builds it.',
    usedAt: 'Whole build',
    state: 'live',
  },
  'o.thirdparty': {
    id: 'o.thirdparty',
    title: 'Independent third-party structural check',
    state: 'pending', // Pending, never renders per spec
  },
}

export const capabilitiesRegistry = TECH

export function showClaim(id: string): string | null {
  const claim = CLAIMS[id]
  if (!claim) {
    throw new Error(`[Ledger Error] Unknown claim id requested: "${id}"`)
  }
  if (claim.state === 'removed' || claim.state === 'pending') {
    return null
  }
  return claim.text || null
}

export function Claim({
  id,
  className = '',
}: {
  id: string
  className?: string
}) {
  const claim = CLAIMS[id]
  if (!claim) {
    throw new Error(`[Ledger Error] Unknown claim id requested: "${id}"`)
  }
  if (claim.state === 'removed' || claim.state === 'pending') {
    return null
  }

  const isSimulated = claim.state === 'simulated'
  const isMeasured = claim.state === 'measured'

  if (!isSimulated && !isMeasured) {
    return <span className={className}>{claim.text}</span>
  }

  return (
    <span className={`inline-flex items-baseline gap-2 flex-wrap ${className}`}>
      <span>{claim.text}</span>
      {isSimulated && (
        <EvidenceLabel
          type="simulated"
          methodLink={claim.method || '/method'}
        />
      )}
      {isMeasured && (
        <EvidenceLabel
          type="measured"
          methodLink={claim.method || '/technology#measurement'}
        />
      )}
    </span>
  )
}

export function Cap({
  id,
  className = '',
}: {
  id: string
  className?: string
}) {
  const cap = TECH[id]
  if (!cap || cap.state !== 'live') {
    return null
  }
  return (
    <span className={`inline-block font-sans ${className}`}>
      {cap.title}
    </span>
  )
}

export default Claim
