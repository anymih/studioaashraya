export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const homeFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is a free plot check?',
    answer:
      'You send your plot details through the form. Within 2 working days you get a written note with setbacks, coverage, FAR and the main risks for your plot.',
  },
  {
    id: 'faq-2',
    question: 'What does it cost to build with you?',
    answer:
      'Cost depends on the plot, the floors, the structure, the basement and the finish. We quote after the consultation. Every quote comes with a bill of quantities so you can see how the figure is built up.',
  },
  {
    id: 'faq-3',
    question: 'What does on time, or 10% back mean?',
    answer:
      'Your agreement fixes a handover date. If we miss it, we refund 10% of the total construction amount. The conditions are written in the agreement.',
  },
  {
    id: 'faq-4',
    question: 'What does the 15-year warranty cover?',
    answer:
      'The scope, the exclusions and the claim process are written into your agreement before you sign. Ask about them in your consultation.',
  },
  {
    id: 'faq-5',
    question: 'Who is responsible if something goes wrong?',
    answer:
      'The studio. The architect who draws the house also builds it, so drawings, quantities and the work on site sit under one agreement.',
  },
  {
    id: 'faq-6',
    question: 'Which instruments will you use on my project?',
    answer:
      'The instruments for your project are listed in your agreement. They typically include BIM coordination, simulation, scans at each gate, lab-tested concrete and flood-tested waterproofing.',
  },
  {
    id: 'faq-7',
    question: 'Can I manage the build from abroad?',
    answer:
      'Yes. See the NRI page for the weekly video, scans, dashboard and decision log.',
  },
  {
    id: 'faq-8',
    question: 'Which areas do you build in?',
    answer:
      'New plots in Gurugram and across Delhi NCR. We have also built in Bihar and Uttarakhand.',
  },
  {
    id: 'faq-9',
    question: 'Do you handle approvals?',
    answer:
      'Yes. We prepare sanction drawings and follow them through with the authority that governs your plot.',
  },
]

export const guaranteeFaqs: FaqItem[] = [
  {
    id: 'guar-faq-1',
    question: 'What counts as on time?',
    answer: 'The handover date in your agreement.',
  },
  {
    id: 'guar-faq-2',
    question: 'Can the date change?',
    answer: 'Only for the conditions the agreement states.',
  },
  {
    id: 'guar-faq-3',
    question: 'How is the refund paid?',
    answer: 'As set out in the agreement.',
  },
  {
    id: 'guar-faq-4',
    question: 'What does the warranty cover?',
    answer: 'Scope and exclusions are in the agreement.',
  },
]

export const nriFaqs: FaqItem[] = [
  {
    id: 'nri-faq-1',
    question: 'Can I approve designs remotely?',
    answer:
      'Yes, by video review and written approval, recorded in the decision log.',
  },
  {
    id: 'nri-faq-2',
    question: 'What if I want to visit?',
    answer:
      'We plan visits around gates so you see work before it is covered.',
  },
  {
    id: 'nri-faq-3',
    question: 'Who signs on site?',
    answer: "The studio's architect signs each gate record.",
  },
]

export const bookFaqs: FaqItem[] = [
  homeFaqs[0], // What is a free plot check?
  homeFaqs[2], // What does on time, or 10% back mean?
  homeFaqs[3], // What does the 15-year warranty cover?
]

export function generateFaqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
