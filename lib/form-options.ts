export interface FormOption {
  value: string
  label: string
}

export const intentOptions: FormOption[] = [
  { value: 'buildability', label: 'Buildability consultation' },
  { value: 'plot-audit', label: 'Plot audit' },
  { value: 'nri-remote-build', label: 'NRI remote build' },
  { value: 'redevelopment', label: 'Redevelopment' },
  { value: 'other', label: 'Something else' },
]

export const regionOptions: FormOption[] = [
  { value: 'delhi-ncr', label: 'Delhi NCR' },
  { value: 'bihar', label: 'Bihar' },
  { value: 'uttarakhand', label: 'Uttarakhand' },
  { value: 'other', label: 'Other' },
]

export const stageOptions: FormOption[] = [
  { value: 'own-plot', label: 'I own a plot' },
  { value: 'buying-plot', label: 'I am buying a plot' },
  { value: 'redevelopment', label: 'I have an old house to redevelop' },
  { value: 'deciding', label: 'I am still deciding' },
]

export const budgetOptions: FormOption[] = [
  { value: 'under-3cr', label: 'Under ₹3 Cr' },
  { value: '3-to-6cr', label: '₹3 to 6 Cr' },
  { value: '6-to-10cr', label: '₹6 to 10 Cr' },
  { value: '10cr-plus', label: '₹10 Cr and above' },
  { value: 'not-sure', label: 'Not sure' },
]

export const timelineOptions: FormOption[] = [
  { value: 'within-3m', label: 'Within 3 months' },
  { value: '3-to-6m', label: '3 to 6 months' },
  { value: '6-to-12m', label: '6 to 12 months' },
  { value: 'exploring', label: 'Just exploring' },
]

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpqyberw'
