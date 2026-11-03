export interface SpecRow {
  element: string
  specification: string
  inspectionGate: string
  live: boolean
}

// PRD Section 11: Ships only when specSchedule has live rows; otherwise /specifications 404s
export const specSchedule: SpecRow[] = []
