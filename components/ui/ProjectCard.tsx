import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { ProjectStatus } from './StatusBadge'
import type { Project } from '@/lib/projects-data'

export interface ProjectCardProps {
  slug?: string
  name?: string
  title?: string
  city?: string
  location?: string
  status?: ProjectStatus | string
  type?: string
  tag?: string
  plotArea?: string
  builtUp?: string
  area?: string
  year?: string | number
  placeholder?: boolean
  cover?: {
    src: string
    alt: string
  }
  image?: string
  metric?: string
  metricIcon?: string
  className?: string
  project?: Partial<Project>
}

export default function ProjectCard({
  slug,
  name,
  title,
  city,
  location,
  status,
  type,
  tag,
  plotArea,
  builtUp,
  area,
  year,
  placeholder,
  cover,
  image,
  className = '',
  project,
}: ProjectCardProps) {
  const p = (project || {}) as Partial<Project> & {
    title?: string
    location?: string
    heroImage?: string
    area?: string
    cover?: { src: string; alt: string }
  }
  const finalSlug = slug || p.slug
  const displayName = name || title || p.name || p.title || 'Untitled Project'
  const displayCity = city || location || p.city || p.location || 'India'
  const displayType = type || tag || p.type || 'Residential'
  const displayStatus = status || p.status || 'built'
  const imageSrc = cover?.src || image || p.cover?.src || p.heroImage || (p.key ? `/images/projects/proj-${p.key}-cover.webp` : undefined)
  const imageAlt = cover?.alt || p.cover?.alt || `${displayName} in ${displayCity}`
  const displayBuiltUp = builtUp || area || p.builtUp || p.area || '—'
  const displayPlotArea = plotArea || p.plotArea || '—'
  const displayYear = year ? String(year) : p.year ? String(p.year) : '—'
  const isPlaceholder = placeholder ?? p.placeholder ?? true
  const normStatus = String(displayStatus).toLowerCase()
  const statusLabel =
    normStatus === 'built'
      ? 'Built'
      : normStatus === 'under-construction' || normStatus === 'under construction'
        ? 'Under construction'
        : 'Design stage'

  return (
    <article className={`card-standard min-w-0 flex flex-col justify-between p-0 overflow-hidden ${className}`}>
      <Link href={`/projects/${finalSlug}`} className="block group">
        <div className="relative aspect-[4/3] w-full bg-[var(--surface)] border-b border-[var(--line)] overflow-hidden flex items-center justify-center">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              loading="eager"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            />
          ) : (
            <span className="font-sans text-xs text-[var(--muted)] p-4 text-center">
              Illustration. Project photographs to follow.
            </span>
          )}
        </div>
      </Link>

      <div className="p-3 sm:p-4 border-b border-[var(--line)] min-w-0">
        <p className="font-sans text-xs text-[var(--muted)] mb-1">
          {displayCity} · {statusLabel}
        </p>
        <h3 className="font-display font-extrabold text-[22px] leading-tight text-[var(--ink)] truncate">
          <Link href={`/projects/${finalSlug}`} className="hover:text-[var(--accent-text)] transition-colors">
            {displayName}
          </Link>
        </h3>
        {isPlaceholder && (
          <p className="mt-1 font-sans text-xs text-[var(--muted)]">
            Sample project
          </p>
        )}
      </div>

      <dl className="grid grid-cols-2 m-0">
        <div className="p-2.5 sm:p-3 border-b border-r border-[var(--line)] min-w-0">
          <dt className="font-sans text-sm text-[var(--muted)]">Typology</dt>
          <dd className="mt-0.5 font-sans text-sm text-[var(--ink)] truncate">{displayType}</dd>
        </div>

        <div className="p-2.5 sm:p-3 border-b border-[var(--line)] min-w-0">
          <dt className="font-sans text-sm text-[var(--muted)]">Plot area</dt>
          <dd className="mt-0.5 font-sans text-sm text-[var(--ink)] truncate">{displayPlotArea}</dd>
        </div>

        <div className="p-2.5 sm:p-3 border-r border-[var(--line)] min-w-0">
          <dt className="font-sans text-sm text-[var(--muted)]">Built-up</dt>
          <dd className="mt-0.5 font-sans text-sm text-[var(--ink)] truncate">{displayBuiltUp}</dd>
        </div>

        <div className="p-2.5 sm:p-3 min-w-0">
          <dt className="font-sans text-sm text-[var(--muted)]">Handed over</dt>
          <dd className="mt-0.5 font-sans text-sm text-[var(--ink)] truncate">{displayYear}</dd>
        </div>
      </dl>
    </article>
  )
}
