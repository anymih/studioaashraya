'use client'

import React from 'react'
import Button, { ButtonProps } from './Button'
import { trackEvent } from '@/lib/analytics'

export interface CtaButtonProps extends ButtonProps {
  ctaId?: string
  section?: string
  intent?: string
  page?: string
}

export function CtaButton({
  ctaId,
  section,
  intent,
  page = '/',
  onClick,
  ...props
}: CtaButtonProps) {
  const handleClick = () => {
    trackEvent('cta_click', {
      cta_id: ctaId || 'cta_button',
      page,
      section: section || 'general',
      intent: intent || 'consultation',
    })
    if (onClick) {
      onClick()
    }
  }

  return <Button onClick={handleClick} {...props} />
}

export default CtaButton
