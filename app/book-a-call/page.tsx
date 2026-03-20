'use client'

import { useState } from 'react'

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
      // @ts-ignore
      window.gtag?.('event', 'booking_form_submitted', {
        event_category: 'Lead',
        event_label: 'Book a Call Form',
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
              Let's Talk About Your Project
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              color: '#555555',
              lineHeight: 1.75,
              margin: 0,
            }}>
              You don't need drawings, perfect ideas, or technical knowledge. Bring your plot details, goals, and questions.
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
          <form onSubmit={handleSubmit} style={{
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
              <a href='https://wa.me/919473031016' target='_blank' rel='noopener noreferrer' style={{ color: '#184A45', fontWeight: 600 }}>
                WhatsApp
              </a>
            </p>
          </form>
        )}
      </div>
    </main>
  )
}
