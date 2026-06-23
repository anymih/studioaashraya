import Image from 'next/image'
import Link from 'next/link'
import { Leaf, Droplets, Sun } from 'lucide-react'

interface ProjectCardProps {
  image: string
  tag: 'Residential' | 'Institutional' | 'Concept'
  title: string
  location: string
  area: string
  metric: string
  metricIcon: 'leaf' | 'drop' | 'sun'
  slug: string
}

const tagColors: Record<string, string> = {
  Residential: 'bg-success text-white',
  Institutional: 'bg-blue-600 text-white',
  Concept: 'bg-accent text-white',
}

const metricIcons = {
  leaf: Leaf,
  drop: Droplets,
  sun: Sun,
}

export default function ProjectCard({
  image,
  tag,
  title,
  location,
  area,
  metric,
  metricIcon,
  slug,
}: ProjectCardProps) {
  const MetricIcon = metricIcons[metricIcon]

  return (
    <Link
      href={`/projects/${slug}`}
      className="group block bg-surface rounded-card border border-border shadow-card
                 hover:scale-[1.02] hover:shadow-lg transition-all duration-200 ease-out overflow-hidden"
      style={{
        width: '100%',
        boxSizing: 'border-box',
        minWidth: 0,
        overflow: 'hidden',
      }}
    >
      {/* Image — uses Next.js Image for automatic lazy loading, WebP conversion, and responsive sizing */}
      <div className="relative w-full overflow-hidden" style={{ height: '200px' }}>
        <Image
          src={image}
          alt={`${title} — ${tag.toLowerCase()} architecture project in ${location} by Studio Aashraya`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Tag badge */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-pill text-xs font-medium ${tagColors[tag]} z-10`}
        >
          {tag}
        </span>
      </div>

      {/* Body */}
      <div style={{ width: '100%', boxSizing: 'border-box', padding: '16px' }}>
        <h3 style={{
          width: '100%',
          display: 'block',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          margin: 0,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.1rem',
          fontWeight: 600,
          color: '#222222',
          lineHeight: 1.3,
          marginBottom: '4px',
        }}>
          {title}
        </h3>
        <p style={{
          width: '100%',
          display: 'block',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          margin: 0,
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: '#888888',
          marginBottom: '8px',
        }}>
          {location} · {area}
        </p>

        {/* Metric row */}
        <div className="mt-3 flex items-center gap-2">
          <MetricIcon size={14} className="text-accent" style={{ flexShrink: 0 }} />
          <p style={{
            width: '100%',
            display: 'block',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: '#555555',
          }}>
            {metric}
          </p>
        </div>
      </div>
    </Link>
  )
}
