import { sendGAEvent } from '@next/third-parties/google'

// UNIVERSAL EVENT DISPATCHER
export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  try {
    sendGAEvent('event', eventName, params)
  } catch {
    // ignore if GA not loaded
  }
}

// PRIMARY CONVERSION — BOOKING FORM SUBMIT
export function trackBookingFormSubmit(params: {
  projectType?: string
  city?: string
  budgetRange?: string
  src?: string
}) {
  trackEvent('generate_lead', {
    event_category: 'Lead',
    event_label: 'book_call_form_submit',
    form_name: 'book_a_call',
    project_type: params.projectType ?? 'not_specified',
    city: params.city ?? 'not_specified',
    budget_range: params.budgetRange ?? 'not_specified',
    src: params.src ?? 'direct',
  })
  trackEvent('form_submit', {
    event_category: 'Lead',
    form_name: 'book_a_call',
  })
}

export function trackLead(params: Record<string, unknown> = {}) {
  trackEvent('generate_lead', {
    event_category: 'Lead',
    ...params,
  })
}

// CTA CLICK — With cta_id, page, section, variant
export function trackCTAClick(
  ctaId: string,
  page: string,
  section?: string,
  variant?: string
) {
  trackEvent('cta_click', {
    cta_id: ctaId,
    page,
    section: section ?? '',
    variant: variant ?? '',
  })
}

// PHONE CLICK
export function trackPhoneClick(page: string = '', section: string = '') {
  trackEvent('phone_click', {
    page,
    section,
  })
}

// WHATSAPP CLICK
export function trackWhatsAppClick(page: string = '', section: string = '') {
  trackEvent('whatsapp_click', {
    page,
    section,
  })
}

// MAPS / DIRECTIONS CLICK
export function trackMapsClick(page: string = '') {
  trackEvent('maps_click', {
    page,
  })
}

// PROJECT FILTER
export function trackProjectFilter(
  city: string,
  type: string,
  status: string,
  results: number
) {
  trackEvent('project_filter', {
    city,
    type,
    status,
    results,
  })
}

// PROJECT VIEW
export function trackProjectView(slug: string, city: string = '', status: string = '') {
  trackEvent('project_view', {
    slug,
    city,
    status,
  })
}

// METHOD STAGE EXPANDED
export function trackMethodStageOpen(stage: string | number) {
  trackEvent('method_stage_open', {
    stage: String(stage),
  })
}

// TECHNOLOGY BLOCK EXPANDED
export function trackTechBlockOpen(id: string) {
  trackEvent('tech_block_open', {
    id,
  })
}

// CALCULATOR START / COMPLETE
export function trackCalculatorStart(tool: string) {
  trackEvent('calculator_start', {
    tool,
  })
}

export function trackCalculatorComplete(
  tool: string,
  inputs?: Record<string, unknown>
) {
  trackEvent('calculator_complete', {
    tool,
    ...(inputs || {}),
  })
}

// THEME TOGGLE
export function trackThemeToggle(to: 'light' | 'dark') {
  trackEvent('theme_toggle', {
    to,
  })
}

// SCROLL DEPTH
export function trackScrollDepth(page: string, pct: number) {
  trackEvent('scroll_depth', {
    page,
    pct,
  })
}

// FORM PAGE VIEW
export function trackFormPageView(src: string = 'direct') {
  trackEvent('form_page_view', {
    src,
  })
}

// 404 PAGE
export function track404(path: string) {
  trackEvent('page_not_found', {
    event_category: 'Error',
    event_label: path,
  })
}
