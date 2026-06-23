"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProjectCard from '@/components/ui/ProjectCard'
import { projects } from '@/lib/projects-data'
import { trackCTAClick } from '@/lib/analytics'

const FAQ_DATA = [
  { q: 'How much does an architect charge in Patna?', a: 'Fees depend on project scope. At Studio Aashraya, residential design packages in Patna typically start from ₹5–8 per sq ft for design drawings. We offer a free initial consultation to discuss your specific requirements and provide a transparent quote.' },
  { q: 'What is included in a house design package?', a: 'A full package includes site analysis, concept design, 2D floor plans, 3D elevations, structural coordination, electrical and plumbing layouts, and construction guidance. We tailor deliverables based on your project needs.' },
  { q: 'Do you design 2D and 3D house plans?', a: 'Yes. Every project includes detailed 2D floor plans for construction and realistic 3D elevation views so you can visualize your home before building begins.' },
  { q: 'Can you help with construction guidance in Bihar?', a: 'Absolutely. We provide on-site supervision and construction guidance across Patna and Bihar to ensure the built outcome matches the design intent, including material selection and contractor coordination.' },
  { q: 'Do you work on small plots and duplex homes?', a: 'Yes — small and compact plots are a specialty. We design space-efficient duplexes, independent homes, and multi-storey residential buildings optimized for typical Patna plot sizes.' },
  { q: 'How long does a first concept take?', a: 'After the initial consultation and site visit, a first concept with floor plans and 3D views is typically ready within 2–3 weeks, depending on project complexity.' },
  { q: 'Do you provide climate-conscious home design?', a: 'Yes. Every Studio Aashraya design incorporates passive cooling, cross-ventilation, sun path analysis, and locally sourced materials — reducing energy costs and improving comfort in Bihar\'s climate.' },
  { q: 'Can I book a consultation before finalizing my plot layout?', a: 'Yes, and we recommend it. A pre-purchase consultation can help you evaluate plot potential, FAR limits, orientation, and design feasibility before you commit.' },
]

const TESTIMONIALS_DATA = [
  {
    name: 'Samir Singh',
    rating: 5,
    text: 'The firm has an excellent sense of design and aesthetics while keeping functionality in mind.',
  },
  {
    name: 'Amit Vikram Ojha',
    rating: 5,
    text: 'Great team — Anumeh is equal to great work.',
    badge: 'Local Guide',
  },
  {
    name: 'Amit Kumar',
    rating: 5,
    text: 'मुझे Studio Aashraya Patna के साथ काम करना एक बेहतरीन अनुभव रहा। Anumeh और उनकी टीम ने मेरे विचारों को ध्यान से सुना और समझा, फिर उन्हें एक अद्भुत डिजाइन में बदल दिया। मैं पूरी तरह संतुष्ट हूँ और निश्चित रूप से उन्हें recommend करूंगा।',
    badge: 'Local Guide',
  },
]

function HomepageFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {FAQ_DATA.map((faq, i) => (
        <div key={i} style={{ borderBottom: '1px solid #E2D8CA' }}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 0',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              textAlign: 'left',
              gap: '16px',
            }}
          >
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              fontWeight: 500,
              color: '#184A45',
              lineHeight: 1.5,
            }}>{faq.q}</span>
            <span style={{
              fontSize: '20px',
              color: '#184A45',
              flexShrink: 0,
              transition: 'transform 0.2s ease',
              transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
            }}>+</span>
          </button>
          <div style={{
            maxHeight: openIndex === i ? '300px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: '#666666',
              lineHeight: 1.7,
              margin: '0 0 20px 0',
              paddingRight: '40px',
            }}>{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  const featured = projects.slice(0, 3)

  const CONTAINER = {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 40px',
    width: '100%',
    boxSizing: 'border-box' as const,
  }

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section style={{
        position: 'relative',
        height: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        width: '100vw',
        marginLeft: 'calc(-1 * ((100vw - 100%) / 2))',
      }}>

        {/* Background image */}
        <img
          src="/images/hero.webp"
          alt="IIT-trained architect Studio Aashraya — sustainable home design Bihar"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundColor: 'transparent',
            objectPosition: 'center',
            zIndex: 0,
          }}
        />

        {/* Content wrapper */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: '40px',
          boxSizing: 'border-box',
          maxWidth: '80rem',
          margin: '0 auto',
        }}>
          {/* White content card */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.92)',
            borderRadius: '20px',
            padding: '48px 40px',
            width: '420px',
            maxWidth: 'calc(100vw - 48px)',
            boxSizing: 'border-box',
            backdropFilter: 'blur(8px)',
            marginTop: '0',
          }}>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '3rem',
            fontWeight: 600,
            lineHeight: 1.15,
            color: '#184A45',
            margin: '0 0 16px 0',
            padding: 0,
            width: '100%',
            display: 'block',
          }}>
            Cooler, smarter homes for Bihar
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            lineHeight: 1.7,
            color: '#555555',
            margin: '0 0 32px 0',
            width: '100%',
            display: 'block',
          }}>
            Designing climate-responsive architecture that blends vernacular wisdom with modern efficiency.
          </p>

          <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
            <a href="/book-a-call" onClick={() => trackCTAClick('hero_book_call', 'hero')} style={{
              backgroundColor: '#184A45',
              color: '#ffffff',
              borderRadius: '9999px',
              padding: '12px 24px',
              fontSize: '14px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              textDecoration: 'none',
              display: 'inline-block',
              whiteSpace: 'nowrap',
            }}>
              Book a Free Clarity Call
            </a>
            <a href="/projects" onClick={() => trackCTAClick('hero_explore_projects', 'hero')} style={{
              backgroundColor: 'transparent',
              color: '#184A45',
              border: '1.5px solid #184A45',
              borderRadius: '9999px',
              padding: '12px 24px',
              fontSize: '14px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              textDecoration: 'none',
              display: 'inline-block',
              whiteSpace: 'nowrap',
            }}>
              Explore Projects
            </a>
          </div>

        </div>
        </div>
      </section>

      {/* SECTION 3 — Featured Projects */}
      <section className="py-24 w-full">
        <div style={CONTAINER}>
          <h2 className="text-primary mb-4 text-4xl">Featured Projects</h2>
        <div className="flex items-center justify-between gap-4 mb-8 w-full">
          <p className="text-base min-w-0 flex-1"
             style={{color: '#666666', fontFamily: "'Inter', sans-serif"}}>
            Creating sanctuaries that breathe with the environment.
          </p>
          <a href="/projects"
             className="text-sm font-medium whitespace-nowrap flex-shrink-0 underline underline-offset-4"
             style={{color: '#184A45', fontFamily: "'Inter', sans-serif"}}>
            View Portfolio →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {featured.map((project) => (
            <div key={project.slug} className="min-w-0">
              <ProjectCard
                image={project.heroImage}
                tag={project.type}
                title={project.title}
                location={project.location}
                area={project.area}
                metric={project.metric}
                metricIcon={project.metricIcon}
                slug={project.slug}
              />
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* ADDITIONAL SECTION — How We Work */}
      <section className="py-24 w-full" style={{backgroundColor: '#FAF4EC'}}>
        <div style={CONTAINER}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Image */}
            <div className="relative min-w-0">
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square relative z-10">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAdbV4_m1K40zhwn8ZJhuZa3TcSTZxImESK4xhBL__zoSLDh65Bpg7qcP9djyK0Dt8Hm2iPUFOH1wFtQIdGjm0sxm_MoVbCWOiGiJ57zotleK2tHeEC6E5GsgwWVxWqbx3qmrhLlOoBr6tNQEGjv4n9ZPq9SaesifRvdr07XiBPSFnm5SG2DcmyLHQWaA21Dhz8CS8JmBg6CyuVHNkUoMYjB6b-TpTX4Hz5nhBFtS_gcueK4-s0llPpHzxx5JWgeTH6lzla9m-vL8"
                  alt="Architectural drawing"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full z-0" style={{backgroundColor: '#EDE8E0'}}></div>
            </div>
            
            {/* Right Content */}
            <div className="min-w-0">
              <h2 className="text-primary mb-12 text-4xl">
                How We Work
              </h2>
              <div className="space-y-10 w-full">
                {[
                  { num: '01', title: 'The Clarity Call', desc: 'Understanding your vision, lifestyle requirements, and site potential.' },
                  { num: '02', title: 'Passive Design Strategy', desc: 'Analyzing sun paths and wind flows to naturally cool your space.' },
                  { num: '03', title: 'Material Selection', desc: 'Curating local materials that age beautifully and reduce carbon footprint.' },
                  { num: '04', title: 'Execution & Handover', desc: 'Overseeing construction to ensure every detail matches the architectural intent.' },
                ].map((step) => (
                  <div key={step.num} className="flex gap-6 w-full">
                    <span className="font-heading italic text-3xl text-primary mt-1 flex-shrink-0">{step.num}</span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-primary mb-2 text-2xl">{step.title}</h3>
                      <p className="font-body text-muted leading-relaxed text-[15px]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SERVICES IN PATNA ========== */}
      <section className="py-20 w-full" style={{backgroundColor: '#ffffff'}}>
        <div style={CONTAINER}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.5rem',
            fontWeight: 600,
            color: '#184A45',
            margin: '0 0 12px 0',
            lineHeight: 1.2,
          }}>
            Architectural Services in Patna
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            color: '#666666',
            lineHeight: 1.7,
            margin: '0 0 40px 0',
            maxWidth: '600px',
          }}>
            From first concept to construction guidance — everything a homeowner in Bihar needs to build with confidence.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}>
            {[
              { icon: '🏠', title: 'Custom House Design', desc: 'Homes designed around your family\'s lifestyle, plot, and Bihar\'s climate.' },
              { icon: '📐', title: '2D Floor Plans', desc: 'Detailed, build-ready floor plans optimized for your plot dimensions.' },
              { icon: '🏗️', title: '3D Elevation Design', desc: 'Realistic 3D views so you can see your home before construction begins.' },
              { icon: '🏡', title: 'Residential Architecture', desc: 'Full architectural service for independent houses, duplexes, and villas.' },
              { icon: '🌿', title: 'Sustainable Home Design', desc: 'Climate-responsive design using passive cooling, natural light, and local materials.' },
              { icon: '🧱', title: 'Construction Guidance', desc: 'On-site support and supervision to ensure quality matches the design intent.' },
              { icon: '📏', title: 'Plot Planning', desc: 'Site analysis, setback optimization, and FAR-compliant layout design.' },
              { icon: '💬', title: 'Design Consultation', desc: 'A free clarity call to discuss your goals, budget, and design direction.' },
            ].map((service) => (
              <div key={service.title} style={{
                backgroundColor: '#FAF4EC',
                borderRadius: '16px',
                padding: '28px 24px',
                border: '1px solid #E2D8CA',
              }}>
                <span style={{ fontSize: '28px', display: 'block', marginBottom: '12px' }}>{service.icon}</span>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#184A45',
                  margin: '0 0 8px 0',
                }}>{service.title}</h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  color: '#666666',
                  lineHeight: 1.65,
                  margin: 0,
                }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHAT WE DESIGN ========== */}
      <section className="py-20 w-full" style={{backgroundColor: '#FAF4EC'}}>
        <div style={CONTAINER}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.5rem',
            fontWeight: 600,
            color: '#184A45',
            margin: '0 0 12px 0',
            lineHeight: 1.2,
          }}>
            What We Design
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            color: '#666666',
            lineHeight: 1.7,
            margin: '0 0 40px 0',
            maxWidth: '560px',
          }}>
            Every home is different. Here are the building types we specialize in across Patna and Bihar.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}>
            {[
              'Duplex Homes',
              'Independent Villas',
              'Compact Plot Homes',
              'Rental Buildings',
              'Multi-Storey Residential',
              'Climate-Conscious Homes',
            ].map((type) => (
              <div key={type} style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px 24px',
                border: '1px solid #E2D8CA',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#184A45',
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#184A45',
                }}>{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== AREAS WE SERVE ========== */}
      <section className="py-20 w-full" style={{backgroundColor: '#ffffff'}}>
        <div style={CONTAINER}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.5rem',
            fontWeight: 600,
            color: '#184A45',
            margin: '0 0 12px 0',
            lineHeight: 1.2,
          }}>
            Areas We Serve
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            color: '#666666',
            lineHeight: 1.7,
            margin: '0 0 32px 0',
            maxWidth: '560px',
          }}>
            Based in Rajiv Nagar, Patna — we design homes across the city and throughout Bihar.
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            {[
              'Patna', 'Rajiv Nagar', 'Kankarbagh', 'Bailey Road', 'Danapur',
              'Saguna More', 'Patliputra Colony', 'Bihta', 'Patna City', 'Boring Road',
              'Greater Bihar',
            ].map((area) => (
              <span key={area} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: 500,
                color: '#184A45',
                backgroundColor: '#FAF4EC',
                border: '1px solid #E2D8CA',
                borderRadius: '9999px',
                padding: '8px 20px',
                whiteSpace: 'nowrap',
              }}>{area}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TRUST / WHY STUDIO AASHRAYA ========== */}
      <section className="py-20 w-full" style={{backgroundColor: '#FAF4EC'}}>
        <div style={CONTAINER}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.5rem',
            fontWeight: 600,
            color: '#184A45',
            margin: '0 0 12px 0',
            lineHeight: 1.2,
          }}>
            Why Homeowners Choose Studio Aashraya
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            color: '#666666',
            lineHeight: 1.7,
            margin: '0 0 40px 0',
            maxWidth: '600px',
          }}>
            We are not a listing page or a directory. Studio Aashraya is a named, practicing <a href="/about" style={{color: '#184A45', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '3px'}}>architecture firm in Patna</a> with real projects and real outcomes.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}>
            {[
              { num: '01', title: 'Named, IIT-Educated Architect', desc: 'Every project is personally led by the founder — not outsourced to anonymous freelancers.' },
              { num: '02', title: 'Real Projects, Real Outcomes', desc: 'Browse completed homes with photos, locations, and measurable design outcomes.' },
              { num: '03', title: 'Practical, Budget-Conscious', desc: 'We design within Bihar\'s real construction costs and local material availability.' },
              { num: '04', title: 'Climate-Responsive by Default', desc: 'Passive cooling, cross-ventilation, and sun path analysis built into every design.' },
            ].map((item) => (
              <div key={item.num} style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '28px 24px',
                border: '1px solid #E2D8CA',
              }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '2rem',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'rgba(24,74,69,0.25)',
                  display: 'block',
                  marginBottom: '12px',
                }}>{item.num}</span>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  color: '#184A45',
                  margin: '0 0 8px 0',
                }}>{item.title}</h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  color: '#666666',
                  lineHeight: 1.65,
                  margin: 0,
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section className="py-20 w-full" style={{backgroundColor: '#ffffff'}}>
        <div style={CONTAINER}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.5rem',
            fontWeight: 600,
            color: '#184A45',
            margin: '0 0 12px 0',
            lineHeight: 1.2,
          }}>
            Frequently Asked Questions
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            color: '#666666',
            lineHeight: 1.7,
            margin: '0 0 40px 0',
            maxWidth: '560px',
          }}>
            Common questions homeowners in Patna ask before hiring an architect.
          </p>
          <HomepageFAQ />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_DATA.map(faq => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }) }}
        />
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-20 w-full" style={{backgroundColor: '#FAF4EC'}}>
        <div style={CONTAINER}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.5rem',
            fontWeight: 600,
            color: '#184A45',
            margin: '0 0 12px 0',
            lineHeight: 1.2,
          }}>
            What Our Clients Say
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            color: '#666666',
            lineHeight: 1.7,
            margin: '0 0 40px 0',
            maxWidth: '560px',
          }}>
            Real reviews from homeowners who worked with Studio Aashraya in Patna.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {TESTIMONIALS_DATA.map((review) => (
              <div key={review.name} style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '32px 28px',
                border: '1px solid #E2D8CA',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} style={{ color: '#F4B400', fontSize: '18px' }}>★</span>
                  ))}
                </div>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: '#444444',
                  lineHeight: 1.7,
                  margin: 0,
                  fontStyle: 'italic',
                }}>"{review.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 'auto' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#184A45',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    flexShrink: 0,
                  }}>{review.name.charAt(0)}</div>
                  <div>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#184A45',
                      margin: 0,
                    }}>{review.name}</p>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '11px',
                      color: '#999999',
                      margin: 0,
                    }}>{'badge' in review ? `${review.badge} · Google Review` : 'Google Review'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Studio Aashraya',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5.0',
              reviewCount: '3',
              bestRating: '5',
            },
            review: TESTIMONIALS_DATA.map(r => ({
              '@type': 'Review',
              author: { '@type': 'Person', name: r.name },
              reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
              reviewBody: r.text,
            })),
          }) }}
        />
      </section>

      <section style={{
        width: '100%',
        backgroundColor: '#FAF4EC',
        padding: '80px 0',
      }}>
        <div style={{
          ...CONTAINER,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '48px',
          minWidth: 0,
          overflow: 'hidden',
        }}>

          {/* Heading block — dark green pill card */}
          <div style={{
            backgroundColor: '#184A45',
            borderRadius: '20px',
            padding: '40px 48px',
            textAlign: 'center',
            width: '100%',
            boxSizing: 'border-box',
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2.5rem',
              fontWeight: 600,
              color: '#ffffff',
              margin: '0 0 12px 0',
              lineHeight: 1.2,
            }}>
              Plan Before You Build
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              color: 'rgba(255,255,255,0.70)',
              margin: 0,
              lineHeight: 1.7,
              maxWidth: '480px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              Free tools to help you take the first step towards your dream home.
            </p>
          </div>

          {/* Calculator cards — white, side by side */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            width: '100%',
          }}>

            {/* Card 1 */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid #E2D8CA',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <span style={{fontSize: '24px'}}>🧮</span>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.4rem',
                fontWeight: 600,
                color: '#184A45',
                margin: 0,
              }}>
                Estimate Construction Cost
              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#666666',
                lineHeight: 1.65,
                margin: 0,
                flex: 1,
              }}>
                Get a rough estimate based on your square footage and finish preferences in Bihar.
              </p>
              <a href="/calculators/cost-estimator" style={{
                display: 'inline-block',
                backgroundColor: '#184A45',
                color: '#ffffff',
                borderRadius: '9999px',
                padding: '10px 22px',
                fontSize: '13px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                textDecoration: 'none',
                alignSelf: 'flex-start',
                marginTop: '8px',
              }}>
                Launch Tool →
              </a>
            </div>

            {/* Card 2 */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid #E2D8CA',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <span style={{fontSize: '24px'}}>📐</span>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.4rem',
                fontWeight: 600,
                color: '#184A45',
                margin: 0,
              }}>
                Check Plot FAR
              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#666666',
                lineHeight: 1.65,
                margin: 0,
                flex: 1,
              }}>
                Calculate the Floor Area Ratio and permissible built-up area for your specific city plot.
              </p>
              <a href="/calculators/far-checker" style={{
                display: 'inline-block',
                backgroundColor: '#184A45',
                color: '#ffffff',
                borderRadius: '9999px',
                padding: '10px 22px',
                fontSize: '13px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                textDecoration: 'none',
                alignSelf: 'flex-start',
                marginTop: '8px',
              }}>
                Check Now →
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5 — Have a plot in Bihar? */}
      <section className="w-full py-20" style={{backgroundColor: '#FAF4EC'}}>
        <div style={CONTAINER}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left — Image */}
            <div className="w-full rounded-2xl overflow-hidden aspect-[4/3] min-w-0">
              <img
                src="/images/book-call.jpg"
                alt="Book a clarity call"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right — Text */}
            <div className="min-w-0 flex flex-col items-start gap-4">
              <h2 className="text-4xl lg:text-5xl font-semibold leading-tight"
                  style={{fontFamily: "'Cormorant Garamond', serif", color: '#184A45'}}>
                Have a plot in Bihar?
              </h2>
              <p className="text-base leading-relaxed w-full"
                 style={{fontFamily: "'Inter', sans-serif", color: '#555555'}}>
                Let's discuss how to design a home that's cooler, sustainable, and truly yours.
              </p>
              <a href="/book-a-call"
                 onClick={() => trackCTAClick('homepage_bottom_book_call', 'homepage')}
                 className="mt-2 px-7 py-3.5 rounded-full text-white text-sm font-medium"
                 style={{backgroundColor: '#184A45', fontFamily: "'Inter', sans-serif"}}>
                Book Your Clarity Call
              </a>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
