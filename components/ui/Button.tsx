import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  type?: 'button' | 'submit'
  className?: string
  onClick?: () => void
  disabled?: boolean
  icon?: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white shadow-btn hover:opacity-90 hover:scale-[1.02]',
  secondary:
    'bg-transparent border-[1.5px] border-accent text-accent hover:bg-accent hover:text-white',
}

const sizeStyles: Record<ButtonSize, string> = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  className = '',
  onClick,
  disabled = false,
  icon,
}: ButtonProps) {
  const classes = `
    inline-flex items-center justify-center gap-2
    rounded-pill font-body font-medium
    transition-all duration-200 ease-out
    cursor-pointer select-none
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.trim()

  if (href) {
    return (
      <Link href={href} className={classes}>
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  )
}
