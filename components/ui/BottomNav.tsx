'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutGrid, Compass, MessageSquare } from 'lucide-react'

const navItems = [
  { icon: Home, href: '/', label: 'Home' },
  { icon: LayoutGrid, href: '/projects', label: 'Projects' },
  { icon: Compass, href: '/calculators/cost-estimator', label: 'Calculator' },
  { icon: MessageSquare, href: '/book-a-call', label: 'Book a Call' },
]

export default function BottomNav() {
  const pathname = usePathname()
  console.log('BottomNav pathname:', pathname)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div 
        className="bg-white rounded-[9999px] flex items-center justify-around px-6 py-3"
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}
      >
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className="w-[44px] h-[44px] flex items-center justify-center rounded-[9999px] bg-transparent border-none transition-colors duration-200"
              style={{
                color: active ? '#184A45' : '#8A9BB0',
              }}
            >
              <item.icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
              />
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
