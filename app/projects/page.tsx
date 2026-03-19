'use client'

import { useState } from 'react'
import ProjectCard from '@/components/ui/ProjectCard'
import Button from '@/components/ui/Button'
import { projects } from '@/lib/projects-data'

const filterTabs = ['All', 'Residential', 'Institutional', 'Concept'] as const

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.type === activeFilter)

  return (
    <>
      {/* Page header */}
      <section className="pt-10 pb-6 px-4 text-center">
        <h1 className="font-heading text-[var(--text-h1-m)] md:text-[var(--text-h1)] mb-3">
          Our Work
        </h1>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '16px',
          color: '#666666',
          lineHeight: 1.7,
          textAlign: 'center',
          maxWidth: '480px',
          width: '100%',
          margin: '0 auto 40px',
          display: 'block',
          whiteSpace: 'normal',
          wordBreak: 'normal',
        }}>
          Sustainable and vernacular architectural excellence across Bihar and beyond
        </p>
      </section>

      {/* Filter tabs */}
      <section className="px-4 pb-8">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-5 py-2 rounded-pill text-sm font-medium font-body transition-all cursor-pointer ${
                activeFilter === tab
                  ? 'bg-primary text-white'
                  : 'bg-transparent border border-border text-muted hover:border-primary hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Projects grid */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          width: '100%',
          boxSizing: 'border-box',
        }}>
          {filtered.map((project) => (
            <ProjectCard
              key={project.slug}
              image={project.heroImage}
              tag={project.type}
              title={project.title}
              location={project.location}
              area={project.area}
              metric={project.metric}
              metricIcon={project.metricIcon}
              slug={project.slug}
            />
          ))}
        </div>
      </section>

      {/* Bottom sticky CTA */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto bg-primary rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ minWidth: 0, overflow: 'hidden' }}>
          <p className="text-white font-body font-medium text-center sm:text-left">
            Ready to start your project?
          </p>
          <Button
            href="/book-a-call"
            variant="secondary"
            className="!border-white !text-white hover:!bg-white hover:!text-primary"
          >
            Let&apos;s Build Together
          </Button>
        </div>
      </section>
    </>
  )
}
