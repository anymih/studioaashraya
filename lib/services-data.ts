import { FaqItem } from './faq-data'

export interface ServiceDetail {
  slug: string
  title: string
  lead: string
  audience: string[]
  receive: string[]
  steps: string[]
  notIncluded: string[]
  faq: FaqItem[]
}

export const servicesData: ServiceDetail[] = [
  {
    slug: 'buildability',
    title: 'Land Buildability Report for Plots in Gurugram',
    lead: 'Know what your plot allows, and what it will cost to build well, before you commit to a design.',
    audience: [
      'Plot owners planning to build a custom private residence',
      'Families evaluating a plot purchase and wanting to verify regulations beforehand',
      'Owners deciding whether to build new or purchase an existing property',
    ],
    steps: [
      'Step 1: The Consultation — A structured technical review of your plot, brief, budget range and timeline. You leave with the main risks and a recommended next step.',
      'Step 2: The Report — Permissible development analysis (setbacks, coverage, FAR, height, parking), basement/structural risk screening, sun path, drainage, sanction route, and an indicative cost and timeline range.',
    ],
    receive: [
      'Permissible development analysis (setbacks, coverage, FAR, height, parking under applicable code)',
      'Basement and structural risk notes with recommended soil investigation',
      'Sun path, privacy, drainage and services routing notes',
      'Approval route and expected municipal queries',
      'Indicative cost and timeline range',
      'Recommended architectural approach and next steps',
    ],
    notIncluded: [
      'Sanction drawing submission to authorities before appointment',
      'Soil test lab fees (billed at actuals if commissioned)',
    ],
    faq: [
      {
        id: 'faq-b-1',
        question: 'What do I need to share before the consultation?',
        answer:
          'Plot location, dimensions or layout plan, your rough timeline, and any specific requirements you have in mind.',
      },
      {
        id: 'faq-b-2',
        question: 'How is the report fee determined?',
        answer:
          'The Land and Buildability Report fee is quoted after the initial consultation based on plot complexity and jurisdiction.',
      },
    ],
  },
  {
    slug: 'design-build',
    title: 'Architecture, Engineering and Turnkey Build',
    lead: 'One agreement for design, structure, approvals, construction and interiors.',
    audience: [
      'Families building a private home who want a single accountable team',
      'Plot owners who require architectural rigor coordinated with engineering and on-site execution',
    ],
    steps: [
      '1. Design and quantities: Concept, plans, sections, structural coordination, and an item-by-item bill of quantities.',
      '2. Fixed-scope agreement: Clear scope, exclusions, timeline and milestone payment schedule.',
      '3. Approvals: Municipal sanction drawings submitted and tracked with authorities.',
      '4. Construction with gates: Execution with four written quality gates before pours and wall closures.',
      '5. Handover: Snag-free handover file with as-built drawings and records.',
    ],
    receive: [
      'Bespoke architectural design and layouts',
      'Structural coordination and engineering',
      'Specification schedule and bill of quantities',
      'Sanction drawings and approval tracking',
      'Construction with four written quality gates',
      'Interiors planned with structure and services',
      'Complete handover file with as-built documentation',
    ],
    notIncluded: [
      'Municipal statutory fees and utility connection charges',
      'Unplanned client changes (priced against bill of quantities before work begins)',
    ],
    faq: [
      {
        id: 'faq-db-1',
        question: 'How are client-requested changes handled during construction?',
        answer:
          'The agreement lists scope, exclusions, timeline and payment schedule. Changes you ask for are priced against the bill of quantities before work begins.',
      },
    ],
  },
  {
    slug: 'nri-remote-build',
    title: 'NRI Remote Build Management',
    lead: 'Build a home in Delhi NCR from abroad without flying in for every decision.',
    audience: [
      'Non-resident Indian families building in Gurugram, Delhi NCR or Bihar',
      'Plot owners based abroad needing transparent on-ground architectural representation',
    ],
    steps: [
      '1. Video consultation: Scheduled for your local time zone to discuss brief, site and timeline.',
      '2. Transparent agreement: Fixed deliverables, gate-linked payment terms, and POA guidance.',
      '3. Remote execution: Weekly video walkthroughs, dated photo archive, and written decision log.',
      '4. Gate sign-offs: Structural and MEP quality checks verified before any stage progress.',
      '5. Final handover: Move-in ready home with digital and physical records.',
    ],
    receive: [
      'One named architect as your single point of contact',
      'Weekly video walkthrough of the site',
      'Dated photo and video archive, organized by stage',
      'Written decision log recording every approval',
      'Payments linked strictly to stages that have passed their gate',
      'Calls scheduled for your local time zone',
      'Coordination with your legal and tax representatives',
    ],
    notIncluded: [
      'Direct legal or tax advice on property remittances',
      'Statutory property registration fees',
    ],
    faq: [
      {
        id: 'faq-nri-1',
        question: 'Can I approve designs remotely?',
        answer:
          'Yes, by video review and written approval, recorded in the decision log.',
      },
      {
        id: 'faq-nri-2',
        question: 'What if I want to visit the site?',
        answer:
          'We plan site visits around gates so you can see work before it is covered.',
      },
      {
        id: 'faq-nri-3',
        question: 'Who signs on site?',
        answer:
          "The studio's architect signs the gate records.",
      },
    ],
  },
  {
    slug: 'redevelopment',
    title: 'House Redevelopment in Delhi',
    lead: 'Condition survey, retain-strengthen-rebuild options and construction for old houses, tight plots and basements.',
    audience: [
      'Owners of older homes in Delhi / Gurugram considering rebuild vs retrofit',
      'Owners of tight urban plots with complex structural adjacencies',
    ],
    steps: [
      '1. Condition survey: Thorough inspection of existing structure, cracks, settlement, and party walls.',
      '2. Feasibility options: We price retain-and-retrofit vs complete rebuild so you can make an informed call.',
      '3. Shoring and demolition: Safe dismantling plan with neighbor protection.',
      '4. Construction: The same disciplined 8 stages and 4 quality gates as a new build.',
    ],
    receive: [
      'Condition survey report of the existing structure',
      'Retain, strengthen, or rebuild evaluation with clear cost ranges',
      'Demolition, excavation shoring, and party wall protection approach',
      'Sanction and compliance roadmaps for redevelopment',
      'Turnkey construction with four written quality gates',
    ],
    notIncluded: [
      'Tenant eviction or municipal dispute litigation',
      'Demolition permits fees charged by municipal corporation',
    ],
    faq: [
      {
        id: 'faq-redev-1',
        question: 'How do you protect adjacent buildings during excavation?',
        answer:
          'We prepare engineered shoring and underpinning plans based on site conditions, monitoring party walls throughout basement and foundation excavation.',
      },
    ],
  },
]

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return servicesData.find(s => s.slug === slug)
}
