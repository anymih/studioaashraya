'use client'

import { useState } from 'react'
import { trackBookingFormSubmit, trackWhatsAppClick } from '@/lib/analytics'

const BOOKING_FAQ = [
  { q: 'How much does an architect charge in Patna?', a: 'Fees vary by project scope. At Studio Aashraya, residential design packages typically start from ₹5–8 per sq ft. Book a free consultation to get a transparent quote for your specific project.' },
  { q: 'What happens during the first consultation?', a: 'We discuss your plot details, family needs, budget realism, possible design directions, and next steps. No drawings or technical knowledge needed from your side.' },
  { q: 'Do I need to have my plot finalized before calling?', a: 'Not necessarily. We can help you evaluate plot potential, FAR limits, and orientation before you finalize your purchase.' },
  { q: 'How long does a house design project take?', a: 'A first concept with floor plans and 3D views is typically ready within 2–3 weeks after the initial consultation. Full project timelines depend on scope and approvals.' },
  { q: 'Do you provide construction supervision in Bihar?', a: 'Yes. We offer on-site supervision and construction guidance across Patna and Bihar to ensure quality matches the design intent.' },
]

function BookingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {BOOKING_FAQ.map((faq, i) => (
        <div key={i} style={{ borderBottom: '1px solid #E2D8CA' }}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 0',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              textAlign: 'left',
              gap: '16px',
            }}
          >
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              fontWeight: 500,
              color: '#184A45',
              lineHeight: 1.5,
            }}>{faq.q}</span>
            <span style={{
              fontSize: '20px',
              color: '#184A45',
              flexShrink: 0,
              transition: 'transform 0.2s ease',
              transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
            }}>+</span>
          </button>
          <div style={{
            maxHeight: openIndex === i ? '300px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: '#666666',
              lineHeight: 1.7,
              margin: '0 0 20px 0',
              paddingRight: '40px',
            }}>{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function BookACallPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
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
      })
      setSubmitted(true)
    }
  }

  return (
    <main style={{
      width: '100%',
      backgroundColor: '#FAF4EC',
      minHeight: '100vh',
      padding: '80px 40px',
      boxSizing: 'border-box',
    }}>
      <div style={{
        maxWidth: '960px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'flex-start',
      }}>

        {/* LEFT — Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '3rem',
              fontWeight: 600,
              color: '#184A45',
              lineHeight: 1.15,
              margin: '0 0 16px 0',
            }}>
              Book Your Free Design Clarity Call
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              color: '#555555',
              lineHeight: 1.75,
              margin: 0,
            }}>
              You don&apos;t need drawings, perfect ideas, or technical knowledge. Bring your plot details, goals, and questions.
            </p>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid #E2D8CA',
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: '#184A45',
              textTransform: 'uppercase',
              margin: '0 0 16px 0',
            }}>
              During this call, we will discuss
            </p>
            {[
              'Your family\'s needs and priorities',
              'Plot constraints and opportunities',
              'Budget realism',
              'Possible design directions',
              'Next steps if you choose to proceed',
            ].map((item) => (
              <div key={item} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                marginBottom: '12px',
              }}>
                <span style={{ color: '#184A45', fontSize: '16px', lineHeight: 1.5, flexShrink: 0 }}>→</span>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: '#444444',
                  lineHeight: 1.6,
                  margin: 0,
                }}>{item}</p>
              </div>
            ))}
          </div>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: '#888888',
            lineHeight: 1.65,
            margin: 0,
            fontStyle: 'italic',
          }}>
            I personally review every enquiry and respond within 24 hours.
          </p>
        </div>

        {/* RIGHT — Form */}
        {submitted ? (
          <div style={{
            backgroundColor: '#184A45',
            borderRadius: '20px',
            padding: '48px 40px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}>
            <p style={{ fontSize: '40px', margin: 0 }}>✓</p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.8rem',
              color: '#ffffff',
              margin: 0,
            }}>Request Received</h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.65,
              margin: 0,
            }}>
              Thank you for reaching out. I will personally review your enquiry and respond within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} data-form="book-call" style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '40px',
            border: '1px solid #E2D8CA',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '100%',
            boxSizing: 'border-box',
          }}>
            {[
              { label: 'Full Name', type: 'text', name: 'name', required: true },
              { label: 'Phone', type: 'tel', name: 'phone', required: true },
              { label: 'Email Address', type: 'email', name: 'email', required: true },
              { label: 'City', type: 'text', name: 'city', required: false },
            ].map((field) => (
              <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#444444',
                  letterSpacing: '0.04em',
                }}>
                  {field.label}{field.required && <span style={{ color: '#C96A40' }}> *</span>}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid #D4C9B8',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    color: '#222222',
                    backgroundColor: '#FAF4EC',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            ))}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: 500,
                color: '#444444',
                letterSpacing: '0.04em',
              }}>
                Project Type <span style={{ color: '#C96A40' }}>*</span>
              </label>
              <select name="projectType" required style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #D4C9B8',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#222222',
                backgroundColor: '#FAF4EC',
                outline: 'none',
                boxSizing: 'border-box',
              }}>
                <option value="">Select type</option>
                <option>Residential Home</option>
                <option>Institutional</option>
                <option>Commercial</option>
                <option>Concept / Renovation</option>
                <option>Not sure yet</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: 500,
                color: '#444444',
                letterSpacing: '0.04em',
              }}>
                Budget Range <span style={{ color: '#C96A40' }}>*</span>
              </label>
              <select name="budget" required style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #D4C9B8',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#222222',
                backgroundColor: '#FAF4EC',
                outline: 'none',
                boxSizing: 'border-box',
              }}>
                <option value="">Select range</option>
                <option>Under ₹20 Lakh</option>
                <option>₹20 – 50 Lakh</option>
                <option>₹50 Lakh – 1 Crore</option>
                <option>Above ₹1 Crore</option>
                <option>Not decided yet</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: 500,
                color: '#444444',
                letterSpacing: '0.04em',
              }}>
                Message
              </label>
              <textarea name="message" rows={4} style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #D4C9B8',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#222222',
                backgroundColor: '#FAF4EC',
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box',
              }} />
            </div>

            <button type="submit" style={{
              backgroundColor: '#184A45',
              color: '#ffffff',
              borderRadius: '9999px',
              padding: '14px 32px',
              fontSize: '14px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              marginTop: '8px',
            }}>
              Request a Clarity Call
            </button>
            <p style={{ textAlign: 'center', fontSize: '13px', color: '#888', marginTop: '12px' }}>
              Or message directly on{' '}
              <a href='https://wa.me/919473031016' onClick={trackWhatsAppClick} target='_blank' rel='noopener noreferrer' style={{ color: '#184A45', fontWeight: 600 }}>
                WhatsApp
              </a>
            </p>
          </form>
        )}
      </div>

      {/* FAQ Section */}
      <div style={{
        maxWidth: '960px',
        margin: '80px auto 0',
      }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2rem',
          fontWeight: 600,
          color: '#184A45',
          margin: '0 0 32px 0',
        }}>
          Questions Before Booking?
        </h2>
        <BookingFAQ />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: BOOKING_FAQ.map(faq => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
          })),
        }) }}
      />
    </main>
  )
}
