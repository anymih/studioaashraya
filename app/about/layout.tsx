import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Studio Aashraya | Architecture Firm in Patna, Bihar',
  description: 'Meet the architect behind Studio Aashraya and learn how the firm designs better homes in Patna and Bihar through climate-conscious, practical residential design.',
  keywords: ['architecture firm Patna', 'architect Bihar', 'residential architect Patna', 'home design firm Bihar', 'best architecture studio Patna', 'sustainable home design Bihar', 'house architect near Patna', 'architecture design company Bihar'],
  openGraph: {
    title: 'About Studio Aashraya | Architecture Firm in Patna, Bihar',
    description: 'Meet the architect behind Studio Aashraya and learn how the firm designs better homes in Patna and Bihar through climate-conscious, practical residential design.',
    url: 'https://studioaashraya.site/about',
    type: 'profile',
    images: [{ url: 'https://studioaashraya.site/assets/og-about.jpg', width: 1200, height: 630, alt: 'Studio Aashraya architecture firm Patna Bihar — meet our architect' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Studio Aashraya | Architecture Firm in Patna, Bihar',
    description: 'Meet the architect behind Studio Aashraya and learn how the firm designs better homes in Patna and Bihar through climate-conscious, practical residential design.',
    images: ['https://studioaashraya.site/assets/og-about.jpg'],
    site: '@studioaashraya',
  },
  alternates: { canonical: 'https://studioaashraya.site/about' },
}

const aboutSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://studioaashraya.site' },
        { '@type': 'ListItem', position: 2, name: 'About', item: 'https://studioaashraya.site/about' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What makes Studio Aashraya different from other architects in Patna?',
          acceptedAnswer: { '@type': 'Answer', text: 'Studio Aashraya combines IIT (BHU) Varanasi-level design thinking with deep knowledge of Bihar\'s climate, culture, and local materials. Every home we design uses passive cooling strategies, vernacular materials, and climate-adaptive layouts — so your home stays cooler, looks better, and costs less to run.' },
        },
        {
          '@type': 'Question',
          name: 'How much does architecture design cost in Bihar?',
          acceptedAnswer: { '@type': 'Answer', text: 'Design fees in Bihar typically range from 3% to 8% of total construction cost depending on project scope and services included. For a residential project of ₹40–70 lakh, design fees are approximately ₹1.5–4 lakh. Use our Construction Cost Estimator for a range estimate.' },
        },
        {
          '@type': 'Question',
          name: 'Do you offer virtual consultations?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. We offer free 30-minute video or phone clarity calls for clients across Bihar, Delhi NCR, and for NRI clients. Book directly from our website.' },
        },
        {
          '@type': 'Question',
          name: 'How long does the architecture design process take?',
          acceptedAnswer: { '@type': 'Answer', text: 'A full residential design process — from site analysis to final construction drawings — takes 3 to 6 months depending on project complexity. Construction supervision adds the duration of the build, typically 9 to 18 months for a residential project.' },
        },
        {
          '@type': 'Question',
          name: 'What cities do you work in?',
          acceptedAnswer: { '@type': 'Answer', text: 'We primarily serve Patna and Bihar (Gaya, Nalanda, Muzaffarpur, and surrounding towns). We also work with clients in Delhi NCR and NRI clients worldwide for projects in Bihar.' },
        },
        {
          '@type': 'Question',
          name: 'What is passive cooling design?',
          acceptedAnswer: { '@type': 'Answer', text: 'Passive cooling is a design approach that uses building orientation, cross-ventilation, shading (jaali, overhangs, deep windows), thermal mass, and local materials to keep a home naturally cooler — reducing or eliminating AC dependence. In Bihar\'s climate, a well-designed passive home can be 6–10°C cooler than a conventional build.' },
        },
        {
          '@type': 'Question',
          name: 'Are you IIT-trained?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Studio Aashraya is led by Anumeh Prakhar, a graduate of IIT (BHU) Varanasi\'s architecture program — one of India\'s most rigorous design education institutions.' },
        },
        {
          '@type': 'Question',
          name: 'How do I book a free clarity call?',
          acceptedAnswer: { '@type': 'Answer', text: 'Click \'Book a Free Clarity Call\' on our homepage or visit studioaashraya.site/book-a-call. Fill in your name, contact details, project type, and budget. We\'ll confirm within 24 hours with a Zoom or phone link.' },
        },
      ],
    },
  ],
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      {children}
    </>
  )
}
