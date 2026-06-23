'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { projects } from '@/lib/projects-data'
import Button from '@/components/ui/Button'
import { MapPin, Ruler, Calendar, CheckCircle, Leaf, Droplets, Sun } from 'lucide-react'
import Link from 'next/link'
import { trackProjectView, trackCTAClick } from '@/lib/analytics'

const metricIcons = {
  leaf: Leaf,
  drop: Droplets,
  sun: Sun,
}

export default function ProjectDetailPage() {
  const params = useParams()
  const project = projects.find((p) => p.slug === params.slug)
  const [mainImage, setMainImage] = useState(0)

  useEffect(() => {
    if (project) {
      trackProjectView({
        projectSlug: project.slug,
        projectName: project.title,
        projectType: project.type,
      })
    }
  }, [project])

  if (!project) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl mb-4">Project Not Found</h1>
          <Button href="/projects" variant="primary">
            Back to Projects
          </Button>
        </div>
      </div>
    )
  }

  const MetricIcon = metricIcons[project.metricIcon]

  const tagColors: Record<string, string> = {
    Residential: 'bg-success text-white',
    Institutional: 'bg-blue-600 text-white',
    Concept: 'bg-accent text-white',
  }

  // Build per-project JSON-LD: Breadcrumb (Block 4) + CreativeWork (Block 5)
  const projectCity = project.location.split(',')[0].trim()
  const projectSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://studioaashraya.site' },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://studioaashraya.site/projects' },
          { '@type': 'ListItem', position: 3, name: project.title, item: `https://studioaashraya.site/projects/${project.slug}` },
        ],
      },
      {
        '@type': 'CreativeWork',
        '@id': `https://studioaashraya.site/projects/${project.slug}#project`,
        name: project.title,
        description: project.story.problem + ' ' + project.story.approach,
        creator: { '@id': 'https://studioaashraya.site/#founder' },
        locationCreated: {
          '@type': 'Place',
          name: project.location,
          address: {
            '@type': 'PostalAddress',
            addressLocality: projectCity,
            addressRegion: 'Bihar',
            addressCountry: 'IN',
          },
        },
        image: `https://studioaashraya.site${project.heroImage}`,
        dateCreated: project.year,
        keywords: `${project.type} ${projectCity}, house design ${projectCity}, residential architecture Bihar, custom home design ${projectCity}, 3D home design Bihar, architecture project Patna, home construction Bihar`,
        about: {
          '@type': 'Thing',
          name: 'Sustainable Architecture, Passive Cooling, Vernacular Design',
        },
      },
    ],
  }

  return (
    <>
      {/* Per-project JSON-LD: Breadcrumb + CreativeWork */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      {/* Hero image */}
      <section className="relative w-full aspect-[16/9] max-h-[500px] overflow-hidden">
        <div
          className="w-full h-full bg-primary/10 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-pill text-xs font-medium ${tagColors[project.type]}`}>
          {project.type}
        </span>
      </section>

      {/* Two-column layout */}
      <section className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-[40%_60%] gap-8 md:gap-12">
          {/* Left col — metadata */}
          <div>
            <h1 className="font-heading text-[var(--text-h1-m)] md:text-[var(--text-h1)] mb-6">
              {project.title}
            </h1>

            {/* Metadata grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: MapPin, label: 'Location', value: project.location },
                { icon: Ruler, label: 'Area', value: project.area },
                { icon: Calendar, label: 'Year', value: project.year },
                { icon: CheckCircle, label: 'Status', value: project.status },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2">
                  <item.icon size={16} className="text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] text-muted font-body uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-body font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Metric */}
            <div className="flex items-center gap-2 mb-8 px-4 py-3 bg-primary/5 rounded-card">
              <MetricIcon size={18} className="text-accent" />
              <span className="text-sm font-medium font-body text-primary">{project.metric}</span>
            </div>

            {/* Passive Strategies */}
            <div className="mb-8">
              <h2 className="font-heading text-lg mb-3">Passive Strategies</h2>
              <ul className="space-y-2">
                {project.passiveStrategies.map((strategy, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-body text-muted leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    {strategy}
                  </li>
                ))}
              </ul>
            </div>

            {/* Materials */}
            <div>
              <h2 className="font-heading text-lg mb-3">Materials</h2>
              <div className="flex flex-wrap gap-2">
                {project.materials.map((material) => (
                  <span
                    key={material}
                    className="px-3 py-1 rounded-pill bg-bg border border-border text-primary text-xs font-body"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right col — image gallery */}
          <div>
            <div className="rounded-card overflow-hidden mb-3 aspect-[4/3] bg-primary/5">
              <div
                className="w-full h-full bg-cover bg-center transition-all duration-300"
                style={{
                  backgroundImage: `url(${project.galleryImages[mainImage] || project.heroImage})`,
                }}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {project.galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(i)}
                  aria-label={`View gallery image ${i + 1} of ${project.title}`}
                  className={`rounded-card overflow-hidden aspect-[4/3] bg-primary/5 border-2 transition-all cursor-pointer ${
                    mainImage === i ? 'border-primary' : 'border-transparent hover:border-border'
                  }`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story of the Home */}
      <section className="max-w-[680px] mx-auto px-4 py-8 md:py-12">
        <h2 className="font-heading text-[var(--text-h2-m)] md:text-[var(--text-h2)] text-center mb-10">
          Story of the Home
        </h2>

        {[
          { title: 'The Problem', content: project.story.problem },
          { title: 'Design Approach', content: project.story.approach },
          { title: 'Outcome', content: project.story.outcome },
        ].map((section) => (
          <div key={section.title} className="mb-8">
            <h3 className="font-heading text-xl mb-3">{section.title}</h3>
            <p className="text-base font-body text-muted leading-[1.7]">{section.content}</p>
          </div>
        ))}
      </section>

      {/* Bottom CTA */}
      <section style={{
        width: '100%',
        padding: '80px 40px',
        backgroundColor: '#FAF4EC',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div style={{
          backgroundColor: '#184A45',
          borderRadius: '20px',
          padding: '56px 64px',
          maxWidth: '700px',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.2rem',
            fontWeight: 600,
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.2,
            width: '100%',
            whiteSpace: 'normal',
          }}>
            Want a similar home?
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.7,
            margin: 0,
            width: '100%',
            whiteSpace: 'normal',
          }}>
            Let's discuss how to bring this kind of design thinking to your plot in Bihar.
          </p>
          <a href="/book-a-call" onClick={() => trackCTAClick('project_bottom_book_call', 'project_detail')} style={{
            marginTop: '8px',
            backgroundColor: '#ffffff',
            color: '#184A45',
            borderRadius: '9999px',
            padding: '14px 32px',
            fontSize: '14px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            textDecoration: 'none',
            display: 'inline-block',
            whiteSpace: 'nowrap',
          }}>
            Book a Clarity Call
          </a>
        </div>
      </section>
    </>
  )
}
