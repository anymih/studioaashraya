'use client'

export default function AboutPage() {
  return (
    <main style={{
      width: '100%',
      backgroundColor: '#FAF4EC',
      boxSizing: 'border-box',
    }}>

      {/* HERO */}
      <section style={{
        width: '100%',
        backgroundColor: '#184A45',
        padding: '100px 40px',
        boxSizing: 'border-box',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '3rem',
            fontWeight: 600,
            color: '#ffffff',
            lineHeight: 1.2,
            margin: '0 0 20px 0',
          }}>
            Design Thinking Rooted in Bihar&apos;s Climate and Culture
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            color: 'rgba(255,255,255,0.70)',
            lineHeight: 1.75,
            margin: 0,
          }}>
            IIT-trained. Bihar-rooted. Building homes that truly work.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section style={{
        width: '100%',
        padding: '80px 40px',
        boxSizing: 'border-box',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'flex-start',
        }}>

          {/* LEFT — Photo */}
          <div style={{
            width: '100%',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
          }}>
            <img
              src="/images/about-me.webp"
              alt="Anumeh Prakhar — Founder, Studio Aashraya"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          {/* RIGHT — Story */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: '#C96A40',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              Our Story
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2.2rem',
              fontWeight: 600,
              color: '#184A45',
              lineHeight: 1.15,
              margin: 0,
            }}>
              Anumeh Prakhar
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 500,
              color: '#C96A40',
              letterSpacing: '0.04em',
              margin: 0,
            }}>
              IIT-trained. Bihar-rooted. Building homes that truly work.
            </p>
            {[
              'Born and raised in Bihar, I grew up watching families invest everything they had into building a home — often only once in a lifetime. Yet many of those homes ended up uncomfortable in summer, poorly planned, or expensive to maintain. That never felt right.',
              'After earning my Bachelor of Architecture from IIT (BHU) Varanasi — one of India\'s most rigorous design programs — I had opportunities to pursue high-paying careers with large firms and multinational companies. Instead, I chose to return and work where the impact matters most: for the people of Bihar.',
              'My training exposed me to complex urban infrastructure projects, environmental design, and multidisciplinary coordination at a national level. But the goal was always to bring that level of thinking back home — to design buildings that are not only beautiful, but deeply comfortable, efficient, and rooted in local realities.',
            ].map((para, i) => (
              <p key={i} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#555555',
                lineHeight: 1.85,
                margin: 0,
              }}>
                {para}
              </p>
            ))}
            <div style={{
              borderLeft: '3px solid #184A45',
              paddingLeft: '20px',
              margin: '8px 0',
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.2rem',
                fontStyle: 'italic',
                color: '#184A45',
                lineHeight: 1.65,
                margin: 0,
              }}>
                &quot;People in Bihar deserve homes designed with the same intelligence and care found in the best cities in the world — without losing their cultural identity or financial practicality.&quot;
              </p>
            </div>
            {[
              'Here, every project is approached as a long-term responsibility, not just a drawing set. Climate, family structure, future needs, construction realities, and lifecycle costs are considered from the very beginning.',
              'Because a home should not only look impressive on day one — it should continue to feel right for decades.',
            ].map((para, i) => (
              <p key={i} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#555555',
                lineHeight: 1.85,
                margin: 0,
              }}>
                {para}
              </p>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '8px' }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#184A45',
                margin: 0,
              }}>
                Anumeh Prakhar
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                color: '#888888',
                margin: 0,
              }}>
                Founder & Principal Architect, Studio Aashraya
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section style={{
        width: '100%',
        backgroundColor: '#ffffff',
        padding: '80px 40px',
        boxSizing: 'border-box',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: '#C96A40',
            textTransform: 'uppercase',
            margin: '0 0 12px 0',
            textAlign: 'center',
          }}>
            Our Approach
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.2rem',
            fontWeight: 600,
            color: '#184A45',
            textAlign: 'center',
            margin: '0 0 56px 0',
            lineHeight: 1.2,
          }}>
            Three Pillars
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }}>
            {[
              {
                icon: '☀️',
                title: 'Climate',
                body: 'Designs that stay cooler and more comfortable with less dependence on air-conditioning.',
              },
              {
                icon: '🏺',
                title: 'Culture',
                body: 'Spaces that respect family structure, lifestyle, and local building traditions.',
              },
              {
                icon: '📐',
                title: 'Cost',
                body: 'Smart planning that prevents wasteful construction and hidden expenses.',
              },
            ].map((pillar) => (
              <div key={pillar.title} style={{
                backgroundColor: '#FAF4EC',
                borderRadius: '16px',
                padding: '36px 32px',
                border: '1px solid #E2D8CA',
              }}>
                <p style={{ fontSize: '32px', margin: '0 0 16px 0' }}>{pillar.icon}</p>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: '#184A45',
                  margin: '0 0 12px 0',
                }}>
                  {pillar.title}
                </h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: '#666666',
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section style={{
        width: '100%',
        padding: '80px 40px',
        boxSizing: 'border-box',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.2rem',
            fontWeight: 600,
            color: '#184A45',
            lineHeight: 1.2,
            margin: 0,
          }}>
            Ready to design a home that works?
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            color: '#666666',
            lineHeight: 1.7,
            margin: 0,
          }}>
            Start with a free 30-minute design clarity call. No commitment required.
          </p>
          <a href="/book-a-call" style={{
            backgroundColor: '#184A45',
            color: '#ffffff',
            borderRadius: '9999px',
            padding: '14px 36px',
            fontSize: '14px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            textDecoration: 'none',
            display: 'inline-block',
          }}>
            Book a Free Clarity Call
          </a>
        </div>
      </section>

    </main>
  )
}
