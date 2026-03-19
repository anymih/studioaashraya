import { Leaf, Droplets, Sun } from 'lucide-react'

const icons = {
  leaf: Leaf,
  drop: Droplets,
  sun: Sun,
}

interface MetricBadgeProps {
  icon: 'leaf' | 'drop' | 'sun'
  text: string
}

export default function MetricBadge({ icon, text }: MetricBadgeProps) {
  const Icon = icons[icon]
  return (
    <div className="flex items-center gap-2 text-sm text-muted">
      <Icon size={16} className="text-accent" />
      <span>{text}</span>
    </div>
  )
}
