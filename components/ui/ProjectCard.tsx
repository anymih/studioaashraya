import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { StatusBadge, ProjectStatus } from './StatusBadge'
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

  return (
    <article className={`border-[1.5px] border-[var(--ink)] bg-[var(--surface)] min-w-0 flex flex-col justify-between ${className}`}>
      <Link href={`/projects/${finalSlug}`} className="block group">
        <div className="relative aspect-[4/3] w-full bg-[var(--wash)] overflow-hidden hatched-pattern flex items-center justify-center">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            />
          ) : (
            <small className="font-mono text-[11px] text-[var(--muted)]">
              Drawing archive
            </small>
          )}

          {/* City Tag */}
          <span className="absolute left-3 top-3 bg-[var(--ink)] text-[var(--bg)] font-mono font-medium text-[11px] px-2 py-1 select-none">
            {displayCity}
          </span>

          {/* Status Badge */}
          <div className="absolute right-3 top-3">
            <StatusBadge status={displayStatus} />
          </div>

          {/* Sample Project Chip (PRD S8 / Section 8.1) */}
          {isPlaceholder && (
            <span className="absolute left-3 bottom-3 bg-[var(--bg)] border border-[var(--line)] text-[var(--ink)] font-mono text-[10px] px-2 py-0.5 select-none shadow-sm">
              Sample project
            </span>
          )}
        </div>
      </Link>

      <dl className="grid grid-cols-2 border-t-[1.5px] border-[var(--ink)] m-0">
        <div className="col-span-2 p-2.5 sm:p-3 border-b border-[var(--line)] min-w-0">
          <dt className="font-mono text-[10px] text-[var(--muted)]">
            Project
          </dt>
          <dd className="mt-1 font-display font-extrabold text-[22px] leading-tight text-[var(--ink)] truncate">
            <Link href={`/projects/${finalSlug}`} className="hover:text-[var(--accent)] transition-colors">
              {displayName}
            </Link>
          </dd>
        </div>

        <div className="p-2.5 sm:p-3 border-b sm:border-b-0 border-r border-[var(--line)] min-w-0">
          <dt className="font-mono text-[10px] text-[var(--muted)]">Typology</dt>
          <dd className="mt-0.5 font-sans text-sm text-[var(--ink)] truncate">{displayType}</dd>
        </div>

        <div className="p-2.5 sm:p-3 border-b sm:border-b-0 min-w-0">
          <dt className="font-mono text-[10px] text-[var(--muted)]">Plot Area</dt>
          <dd className="mt-0.5 font-sans text-sm text-[var(--ink)] truncate">{displayPlotArea}</dd>
        </div>

        <div className="p-2.5 sm:p-3 border-r border-[var(--line)] min-w-0">
          <dt className="font-mono text-[10px] text-[var(--muted)]">Built-up</dt>
          <dd className="mt-0.5 font-sans text-sm text-[var(--ink)] truncate">{displayBuiltUp}</dd>
        </div>

        <div className="p-2.5 sm:p-3 min-w-0">
          <dt className="font-mono text-[10px] text-[var(--muted)]">Handed Over</dt>
          <dd className="mt-0.5 font-sans text-sm text-[var(--ink)] truncate">{displayYear}</dd>
        </div>
      </dl>
    </article>
  )
}
