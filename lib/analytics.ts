import { sendGAEvent } from '@next/third-parties/google'

type CTALocation =
  | 'hero'
  | 'project_detail'
  | 'calculator_result'
  | 'about_page'
  | 'footer'
  | 'nav'
  | string

type ProjectType = 'residential' | 'institutional' | 'concept' | string
type CalculatorName = 'cost_estimator' | 'far_checker'

// EVENT 1 — BOOKING FORM SUBMIT (primary conversion)
export function trackBookingFormSubmit(params: {
  projectType?: string
  city?: string
  budgetRange?: string
}) {
  sendGAEvent('event', 'generate_lead', {
    event_category: 'Lead',
    event_label: 'book_call_form_submit',
    form_name: 'book_a_call',
    project_type: params.projectType ?? 'not_specified',
    city: params.city ?? 'not_specified',
    budget_range: params.budgetRange ?? 'not_specified',
  })
  // Secondary event for custom funnel reporting
  sendGAEvent('event', 'form_submit', {
    event_category: 'Lead',
    form_name: 'book_a_call',
  })
}

// EVENT 2 — CTA BUTTON CLICK
export function trackCTAClick(ctaLabel: string, location: CTALocation) {
  sendGAEvent('event', 'click', {
    event_category: 'CTA',
    event_label: ctaLabel,
    cta_location: location,
  })
}

// EVENT 3 — PHONE CLICK
export function trackPhoneClick() {
  sendGAEvent('event', 'click', {
    event_category: 'Contact',
    event_label: 'phone_click',
    contact_method: 'phone',
  })
}

// EVENT 4 — WHATSAPP CLICK
export function trackWhatsAppClick() {
  sendGAEvent('event', 'click', {
    event_category: 'Contact',
    event_label: 'whatsapp_click',
    contact_method: 'whatsapp',
  })
}

// EVENT 5 — PROJECT VIEW
export function trackProjectView(params: {
  projectSlug: string
  projectName: string
  projectType: ProjectType
}) {
  sendGAEvent('event', 'view_item', {
    event_category: 'Portfolio',
    event_label: params.projectSlug,
    project_slug: params.projectSlug,
    project_name: params.projectName,
    project_type: params.projectType,
  })
}

// EVENT 6 — CALCULATOR COMPLETION
export function trackCalculatorComplete(
  calculatorName: CalculatorName,
  inputs: Record<string, string | number>
) {
  sendGAEvent('event', 'calculator_complete', {
    event_category: 'Engagement',
    event_label: calculatorName,
    calculator_name: calculatorName,
    ...inputs,
  })
}

// EVENT 7 — 404 PAGE
export function track404(path: string) {
  sendGAEvent('event', 'page_not_found', {
    event_category: 'Error',
    event_label: path,
  })
}
