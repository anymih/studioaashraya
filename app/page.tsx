"use client"

import Image from 'next/image'
import Link from 'next/link'
import ProjectCard from '@/components/ui/ProjectCard'
import { projects } from '@/lib/projects-data'

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
          alt=""
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
            <a href="/book-a-call" onClick={() => {
              // @ts-ignore
              window.gtag?.('event', 'cta_click', {
                event_category: 'Engagement',
                event_label: 'Hero CTA — Book a Call',
              })
            }} style={{
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
            <a href="/projects" style={{
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

      {/* ========== PLAN BEFORE YOU BUILD ========== */}
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
