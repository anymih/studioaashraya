'use client'

import React, { useState, useEffect, useMemo } from 'react'
import ProjectCard from '@/components/ui/ProjectCard'
import Button from '@/components/ui/Button'
import { Project } from '@/lib/projects-data'
import { trackEvent } from '@/lib/analytics'

export function ProjectsDirectory({ initialProjects }: { initialProjects: Project[] }) {
  const [cityFilter, setCityFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Read URL hash on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const hash = window.location.hash.replace('#', '').toLowerCase()
        if (hash) {
          const parts = hash.split('-')
          // Check for matches
          if (parts.includes('built')) setStatusFilter('built')
          else if (parts.includes('under') && parts.includes('construction')) setStatusFilter('under-construction')
          else if (parts.includes('design')) setStatusFilter('design')

          if (parts.includes('delhi')) setCityFilter('Delhi NCR')
          else if (parts.includes('bihar')) setCityFilter('Bihar')
          else if (parts.includes('uttarakhand')) setCityFilter('Uttarakhand')

          if (parts.includes('residential')) setTypeFilter('residential')
          else if (parts.includes('institutional')) setTypeFilter('institutional')
          else if (parts.includes('concept')) setTypeFilter('concept')
        }
      } catch {
        // ignore hash errors
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  // Update hash when filters change
  const updateFilters = (city: string, type: string, status: string) => {
    setCityFilter(city)
    setTypeFilter(type)
    setStatusFilter(status)

    const tokens: string[] = []
    if (status !== 'all') tokens.push(status)
    if (city !== 'all') tokens.push(city.toLowerCase().replace(/\s+/g, '-'))
    if (type !== 'all') tokens.push(type)

    const newHash = tokens.length > 0 ? `#${tokens.join('-')}` : ''
    try {
      window.history.replaceState(null, '', newHash || window.location.pathname)
    } catch {
      // ignore history error
    }

    const filteredCount = initialProjects.filter((p) => {
      const matchCity = city === 'all' || p.region === city
      const matchType = type === 'all' || p.type === type
      const matchStatus = status === 'all' || p.status === status
      return matchCity && matchType && matchStatus
    }).length

    trackEvent('project_filter', {
      city,
      type,
      status,
      results: filteredCount,
    })
  }

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      const matchCity = cityFilter === 'all' || p.region === cityFilter
      const matchType = typeFilter === 'all' || p.type === typeFilter
      const matchStatus = statusFilter === 'all' || p.status === statusFilter
      return matchCity && matchType && matchStatus
    })
  }, [initialProjects, cityFilter, typeFilter, statusFilter])

  const clearFilters = () => {
    updateFilters('all', 'all', 'all')
  }

  return (
    <div className="space-y-10">
      {/* Filters Bar */}
      <div className="border-[1.5px] border-[var(--ink)] bg-[var(--surface)] p-6 md:p-8 space-y-6">
        {/* City Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-6">
          <span className="font-mono text-xs text-[var(--muted)] font-semibold w-24 shrink-0">
            Region:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Regions' },
              { id: 'Delhi NCR', label: 'Delhi NCR' },
              { id: 'Bihar', label: 'Bihar' },
              { id: 'Uttarakhand', label: 'Uttarakhand' },
            ].map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={cityFilter === c.id}
                onClick={() => updateFilters(c.id, typeFilter, statusFilter)}
                className={`font-mono text-xs   px-3 py-1.5 border-[1.5px] transition-colors cursor-pointer rounded-none ${
                  cityFilter === c.id
                    ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)] font-semibold'
                    : 'border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] hover:border-[var(--ink)]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-6 border-t border-[var(--line)] pt-4">
          <span className="font-mono text-xs text-[var(--muted)] font-semibold w-24 shrink-0">
            Typology:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Types' },
              { id: 'residential', label: 'Residential' },
              { id: 'institutional', label: 'Institutional' },
              { id: 'concept', label: 'Concept' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={typeFilter === t.id}
                onClick={() => updateFilters(cityFilter, t.id, statusFilter)}
                className={`font-mono text-xs   px-3 py-1.5 border-[1.5px] transition-colors cursor-pointer rounded-none ${
                  typeFilter === t.id
                    ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)] font-semibold'
                    : 'border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] hover:border-[var(--ink)]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-6 border-t border-[var(--line)] pt-4">
          <span className="font-mono text-xs text-[var(--muted)] font-semibold w-24 shrink-0">
            Status:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Status' },
              { id: 'built', label: 'Built' },
              { id: 'under-construction', label: 'Under construction' },
              { id: 'design', label: 'Design stage' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={statusFilter === s.id}
                onClick={() => updateFilters(cityFilter, typeFilter, s.id)}
                className={`font-mono text-xs   px-3 py-1.5 border-[1.5px] transition-colors cursor-pointer rounded-none ${
                  statusFilter === s.id
                    ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)] font-semibold'
                    : 'border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] hover:border-[var(--ink)]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <ProjectCard
              key={proj.slug}
              project={proj}
            />
          ))}
        </div>
      ) : (
        <div className="border-[1.5px] border-[var(--ink)] p-12 bg-[var(--surface)] text-center space-y-4">
          <h3 className="font-display font-extrabold text-2xl text-[var(--ink)]">
            No projects match these filters.
          </h3>
          <p className="font-sans text-base text-[var(--muted)] max-w-md mx-auto">
            Try adjusting your region, typology, or status selections.
          </p>
          <div className="pt-2">
            <Button variant="alt" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
