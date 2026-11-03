import React from 'react'
import Link from 'next/link'

export interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'alt' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg' | string
  icon?: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  'aria-label'?: string
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const sizeClasses =
    size === 'sm'
      ? 'px-[14px] py-[8px] text-[13px] min-h-[36px]'
      : size === 'lg'
      ? 'px-[28px] py-[16px] text-[16px] min-h-[48px]'
      : 'px-[22px] py-[14px] text-[15px] min-h-[44px]'

  const baseClasses =
    `inline-flex items-center justify-center gap-2 ${sizeClasses} font-sans font-semibold leading-none border-[1.5px] rounded-none cursor-pointer transition-colors duration-150 select-none text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-[3px] disabled:opacity-50 disabled:cursor-not-allowed`

  const variantClasses =
    variant === 'primary'
      ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)] hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-[var(--on-accent)]'
      : 'border-[var(--ink)] bg-transparent text-[var(--ink)] hover:bg-[var(--ink)] hover:border-[var(--ink)] hover:text-[var(--bg)]'

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`

  if (href && !disabled) {
    return (
      <Link href={href} className={combinedClasses} aria-label={ariaLabel} onClick={onClick}>
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  )
}

export { Button }
