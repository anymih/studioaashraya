'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { siteConfig } from '@/lib/site'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Faq } from '@/components/ui/Faq'
import {
  trackBookingFormSubmit,
  trackFormPageView,
  trackPhoneClick,
  trackWhatsAppClick,
} from '@/lib/analytics'
import { homeFaqs, generateFaqSchema } from '@/lib/faq-data'
import { Phone, MessageSquare, Mail, MapPin, CheckCircle2, ArrowRight } from 'lucide-react'

function BookCallContent() {
  const searchParams = useSearchParams()
  const src = searchParams.get('src') || 'direct'
  const preselectedType = searchParams.get('type') || ''

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    trackFormPageView(src)
  }, [src])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    try {
      const res = await fetch('https://formspree.io/f/mpqyberw', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        trackBookingFormSubmit({
          projectType: (formData.get('projectType') || 'unknown') as string,
          city: (formData.get('city') || 'unknown') as string,
          budgetRange: (formData.get('budget') || 'unknown') as string,
          src,
        })
        setSubmitted(true)
      } else {
        setError('Submission failed. Please check your network or call us directly.')
      }
    } catch {
      setError('A network error occurred. Please call or WhatsApp us directly.')
    } finally {
      setLoading(false)
    }
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Free Plot Check', href: '/book-a-call' },
  ]

  // Book FAQs per Section 11: FAQ items 1, 3, 4 from Section 2.14
  const bookFaqs = [
    homeFaqs[0], // What is a free plot check?
    homeFaqs[2], // What does on time, or 10% back mean?
    homeFaqs[3], // What does the 15-year warranty cover?
  ]

  const faqSchema = generateFaqSchema(bookFaqs)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-8 pb-16">
          <Breadcrumb items={breadcrumbItems} className="mb-6" />

          {/* Page Heading & Promise Strip */}
          <div className="max-w-3xl mb-8">
                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[0.92] mb-4">
              Send us your plot.
            </h1>
            <p className="font-sans text-lg text-[var(--muted)] leading-relaxed mb-6">
              We reply in writing within 2 working days with what the plot allows: setbacks, coverage, FAR and the main risks.
            </p>

            {/* Promise Strip */}
            <p className="font-sans text-xs text-[var(--muted)]">
              On time, or 10% back. 15-year warranty. IIT-led · COA-registered.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT COLUMN: What to send, What happens next, Contact card */}
            <div className="lg:col-span-5 space-y-8">
              {/* What to send */}
              <div className="p-6 border border-[var(--line)] bg-[var(--surface)]">
                <h2 className="font-display text-2xl font-bold mb-4">
                  What to send
                </h2>
                <ul className="space-y-2.5 font-sans text-sm text-[var(--muted)]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-2 bg-[var(--accent)] shrink-0" />
                    <span>Plot location and dimensions (or plot number / sector).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-2 bg-[var(--accent)] shrink-0" />
                    <span>Sale deed or layout plan, if you have it.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-2 bg-[var(--accent)] shrink-0" />
                    <span>A rough budget range and number of floors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-2 bg-[var(--accent)] shrink-0" />
                    <span>When you want to move in.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-2 bg-[var(--accent)] shrink-0" />
                    <span>Whether you will be in India during construction.</span>
                  </li>
                </ul>
              </div>

              {/* What happens next */}
              <div className="p-6 border border-[var(--line)] bg-[var(--wash)]">
                <span className="font-mono text-xs text-[var(--muted)] font-semibold block mb-3">
                  Process
                </span>
                <h3 className="font-display text-xl font-bold mb-4">
                  What happens next
                </h3>
                <ol className="space-y-3 font-sans text-sm text-[var(--ink)] list-none p-0">
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-[var(--accent-text)] pt-0.5">01</span>
                    <span><strong>We read your details:</strong> The architect examines plot orientation and municipal bye-laws.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-[var(--accent-text)] pt-0.5">02</span>
                    <span><strong>We call or message you:</strong> A structured 20-minute conversation about your brief and timeline.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-[var(--accent-text)] pt-0.5">03</span>
                    <span><strong>You get the written plot check:</strong> Setbacks, permissible FAR, ground coverage, and key risks in writing.</span>
                  </li>
                </ol>
              </div>

              {/* Direct Contact Card */}
              <div className="p-6 border border-[var(--line)] bg-[var(--surface)] space-y-3">
                <span className="font-mono text-xs text-[var(--muted)] font-semibold block mb-2">
                  Prefer direct contact?
                </span>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[var(--accent-text)] shrink-0" />
                  <a
                    href={`tel:${siteConfig.phone}`}
                    onClick={() => trackPhoneClick('/book-a-call', 'book_page_card')}
                    className="font-mono text-xs text-[var(--ink)] hover:text-[var(--accent-text)]"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                  <a
                    href={siteConfig.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('/book-a-call', 'book_page_card')}
                    className="font-mono text-xs text-[var(--ink)] hover:text-[var(--accent-text)]"
                  >WhatsApp the architect</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[var(--accent-text)] shrink-0" />
                  <a href={`mailto:${siteConfig.email}`} className="font-mono text-xs text-[var(--ink)] hover:text-[var(--accent-text)]">
                    {siteConfig.email}
                  </a>
                </div>
                <div className="flex items-start gap-2 pt-2 border-t border-[var(--line)] text-xs text-[var(--muted)]">
                  <MapPin className="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-0.5" />
                  <div>
                    <span>{siteConfig.address}</span>
                    <a
                      href={siteConfig.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[var(--accent-text)] hover:underline mt-0.5"
                    >Get directions ↗</a>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: The Form (Exact PRD R14 intact fields & Formspree) */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="border border-[var(--ink)] bg-[var(--band)] text-[var(--on-band)] p-8 sm:p-12 text-center flex flex-col items-center gap-4">
                  <CheckCircle2 className="w-16 h-16 text-[var(--accent-text)]" />
                  <h2 className="font-display text-3xl font-bold">
                    Plot details received
                  </h2>
                  <p className="font-sans text-base text-[var(--band-muted)] max-w-md leading-relaxed">
                    Thank you. The architect will review your plot parameters and reach out within 2 working days with your written plot check.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  data-form="book-call"
                  className="border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 space-y-5"
                >
                  <div className="border-b border-[var(--line)] pb-4 mb-4">
                    <h2 className="font-display text-2xl font-bold text-[var(--ink)]">
                      Plot Evaluation Request
                    </h2>
                    <p className="font-sans text-xs text-[var(--muted)] mt-1">
                      Fill what you know today. Approximate numbers are completely fine.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 border border-[var(--accent)] bg-[var(--wash)] text-[var(--accent-text)] text-xs font-mono">
                      {error}
                    </div>
                  )}

                  {/* Hidden source field */}
                  <input type="hidden" name="src" value={src} />

                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs text-[var(--ink)] font-medium">
                      Full Name <span className="text-[var(--accent-text)]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--line)] text-base text-[var(--ink)] outline-none focus:border-[var(--accent)] rounded-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs text-[var(--ink)] font-medium">
                      Phone Number (WhatsApp preferred) <span className="text-[var(--accent-text)]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--line)] text-base text-[var(--ink)] outline-none focus:border-[var(--accent)] rounded-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs text-[var(--ink)] font-medium">
                      Email Address <span className="text-[var(--accent-text)]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--line)] text-base text-[var(--ink)] outline-none focus:border-[var(--accent)] rounded-none"
                    />
                  </div>

                  {/* City / Town (label fix only per Section 11) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs text-[var(--ink)] font-medium">
                      City / Town
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="e.g. Gurugram, Delhi, Patna"
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--line)] text-base text-[var(--ink)] outline-none focus:border-[var(--accent)] rounded-none"
                    />
                  </div>

                  {/* Project Typology */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs text-[var(--ink)] font-medium">
                      Project Typology <span className="text-[var(--accent-text)]">*</span>
                    </label>
                    <select
                      name="projectType"
                      required
                      defaultValue={
                        preselectedType.toLowerCase().includes('residential')
                          ? 'Residential Home'
                          : preselectedType.toLowerCase().includes('commercial')
                          ? 'Commercial'
                          : preselectedType.toLowerCase().includes('interior')
                          ? 'Concept / Renovation'
                          : ''
                      }
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--line)] text-base text-[var(--ink)] outline-none focus:border-[var(--accent)] rounded-none cursor-pointer"
                    >
                      <option value="">Select project type</option>
                      <option value="Residential Home">Residential Home</option>
                      <option value="Institutional">Institutional</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Concept / Renovation">Concept / Renovation</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>

                  {/* Budget Range */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs text-[var(--ink)] font-medium">
                      Plot Size / Budget range <span className="text-[var(--accent-text)]">*</span>
                    </label>
                    <select
                      name="budget"
                      required
                      defaultValue=""
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--line)] text-base text-[var(--ink)] outline-none focus:border-[var(--accent)] rounded-none cursor-pointer"
                    >
                      <option value="">Select budget range</option>
                      <option value="Under ₹20 Lakh">Under ₹20 Lakh</option>
                      <option value="₹20 – 50 Lakh">₹20 – 50 Lakh</option>
                      <option value="₹50 Lakh – 1 Crore">₹50 Lakh – 1 Crore</option>
                      <option value="Above ₹1 Crore">Above ₹1 Crore</option>
                      <option value="Not decided yet">Not decided yet</option>
                    </select>
                  </div>

                  {/* Custom Notes / Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs text-[var(--ink)] font-medium">
                      Plot dimensions, locality or custom notes
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="e.g. 300 sq yd plot in Gurugram Sector 45, planning stilt + 4 floors..."
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--line)] text-base text-[var(--ink)] outline-none focus:border-[var(--accent)] rounded-none resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[var(--accent)] text-[var(--on-accent)] font-sans font-bold text-sm hover:opacity-95 transition-opacity disabled:opacity-50 select-none flex items-center justify-center gap-2"
                  >
                    <span>{loading ? 'Submitting...' : 'Get my free plot check'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* FAQs per Section 11 */}
          <div className="mt-16 pt-12 border-t border-[var(--line)]">
                        <h2 className="font-display text-3xl font-bold mb-6">
              Frequently asked questions
            </h2>
            <Faq items={bookFaqs} />
          </div>
        </div>
      </article>
    </>
  )
}

export default function BookACallPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg)] p-12 font-mono text-xs">Loading form...</div>}>
      <BookCallContent />
    </Suspense>
  )
}
