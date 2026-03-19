export const COST_RATES: Record<string, Record<string, [number, number]>> = {
  Patna:       { Basic: [1400, 1700], Standard: [1700, 2100], Premium: [2400, 3200] },
  Gaya:        { Basic: [1300, 1600], Standard: [1600, 1900], Premium: [2200, 2900] },
  Muzaffarpur: { Basic: [1300, 1600], Standard: [1600, 1900], Premium: [2200, 2900] },
  Bhagalpur:   { Basic: [1200, 1500], Standard: [1500, 1800], Premium: [2000, 2700] },
  Other:       { Basic: [1200, 1500], Standard: [1500, 1800], Premium: [2000, 2700] },
}

export const TIMELINE: Record<string, string> = {
  Basic: '8–11 months',
  Standard: '10–13 months',
  Premium: '12–18 months',
}

export const FAR_PRESETS: Record<string, { far: number; coverage: number }> = {
  narrow:   { far: 1.5, coverage: 0.50 },
  standard: { far: 2.0, coverage: 0.60 },
  wide:     { far: 2.5, coverage: 0.70 },
}

export const QUALITY_DESCRIPTIONS: Record<string, string> = {
  Basic: 'Standard materials, basic fixtures, essential fittings',
  Standard: 'Good quality materials, branded fixtures, modern finishes',
  Premium: 'Premium materials, imported fixtures, designer finishes',
}

export function formatLakhs(value: number): string {
  const lakhs = value / 100000
  if (lakhs >= 100) {
    return `₹${(lakhs / 100).toFixed(1)}Cr`
  }
  return `₹${lakhs.toFixed(1)}L`
}
