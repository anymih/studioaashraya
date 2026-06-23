# ANTIGRAVITY PROMPT — FULL SEO SCHEMA & META IMPLEMENTATION FOR STUDIOAASHRAYA.SITE

## TASK
Implement complete structured data (JSON-LD schema), meta tags, Open Graph tags, Twitter Card tags, canonical tags, and all on-page SEO signals for Studio Aashraya website. This is a single, comprehensive SEO implementation task. Execute it without error or omission.

---

## WHAT TO BUILD

### 1. GLOBAL SEO COMPONENT (inject into <head> on EVERY page)

Create a reusable component called `SeoHead` (or equivalent in Antigravity's component model) that accepts per-page props and injects the following into `<head>`:

#### A. Meta Tags (per-page, passed as props)
```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="index, follow" />
<meta name="googlebot" content="index, follow" />
<title>{pageTitle}</title>
<meta name="description" content="{pageDescription}" />
<meta name="keywords" content="{pageKeywords}" />
<meta name="author" content="Anumeh Prakhar, Studio Aashraya" />
<meta name="geo.region" content="IN-BR" />
<meta name="geo.placename" content="Patna, Bihar, India" />
<meta name="geo.position" content="25.5941;85.1376" />
<meta name="ICBM" content="25.5941, 85.1376" />
<link rel="canonical" href="{canonicalUrl}" />
```

#### B. Open Graph Tags (per-page)
```html
<meta property="og:type" content="{ogType}" />
<meta property="og:title" content="{pageTitle}" />
<meta property="og:description" content="{pageDescription}" />
<meta property="og:url" content="{canonicalUrl}" />
<meta property="og:image" content="{ogImage}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="{ogImageAlt}" />
<meta property="og:site_name" content="Studio Aashraya" />
<meta property="og:locale" content="en_IN" />
```

#### C. Twitter Card Tags (per-page)
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{pageTitle}" />
<meta name="twitter:description" content="{pageDescription}" />
<meta name="twitter:image" content="{ogImage}" />
<meta name="twitter:image:alt" content="{ogImageAlt}" />
<meta name="twitter:site" content="@studioaashraya" />
```

#### D. Preconnects and Performance
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="dns-prefetch" href="https://www.google-analytics.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
```

---

### 2. JSON-LD SCHEMA BLOCKS (inject as <script type="application/ld+json"> in <head>)

#### SCHEMA BLOCK 1 — GlobalLocalBusiness (ALL pages)
Add this to EVERY page, unchanged:
```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Architect"],
  "@id": "https://studioaashraya.site/#business",
  "name": "Studio Aashraya",
  "alternateName": "Studio Aashraya Architecture",
  "description": "IIT-trained architecture studio in Patna, Bihar designing climate-responsive, vernacular homes and commercial buildings. Specializing in sustainable architecture, passive cooling design, and vernacular materials.",
  "url": "https://studioaashraya.site",
  "logo": {
    "@type": "ImageObject",
    "url": "https://studioaashraya.site/assets/logo.png",
    "width": 200,
    "height": 60
  },
  "image": "https://studioaashraya.site/assets/og-social-card.jpg",
  "telephone": "+919473031016",
  "email": "hello@studioaashraya.site",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "D103, Road 6B, Rajiv Nagar",
    "addressLocality": "Patna",
    "addressRegion": "Bihar",
    "postalCode": "800016",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.5941,
    "longitude": 85.1376
  },
  "areaServed": [
    { "@type": "City", "name": "Patna" },
    { "@type": "State", "name": "Bihar" },
    { "@type": "City", "name": "Gaya" },
    { "@type": "City", "name": "Nalanda" },
    { "@type": "City", "name": "Delhi" },
    { "@type": "City", "name": "Noida" },
    { "@type": "City", "name": "Gurugram" }
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 25.5941,
      "longitude": 85.1376
    },
    "geoRadius": "500000"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Architecture and Design Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Residential Architecture Design",
          "description": "Climate-responsive residential home design for Bihar. Passive cooling, vernacular materials, and site-specific design."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Interior Design",
          "description": "Interior design services rooted in comfort, culture, and material honesty."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Sustainable Architecture",
          "description": "Energy-efficient, climate-adaptive building design using passive cooling and local materials."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Construction Supervision",
          "description": "On-site and remote construction supervision to ensure design intent is faithfully executed."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "3D Visualization",
          "description": "Photorealistic 3D renders and walkthroughs for residential and commercial projects."
        }
      }
    ]
  },
  "founder": {
    "@type": "Person",
    "@id": "https://studioaashraya.site/#founder",
    "name": "Anumeh Prakhar",
    "jobTitle": "Principal Architect",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "IIT (BHU) Varanasi"
    },
    "knowsAbout": [
      "Sustainable Architecture",
      "Passive Cooling Design",
      "Vernacular Architecture",
      "Climate-Responsive Design",
      "Residential Architecture Bihar"
    ],
    "url": "https://studioaashraya.site/about"
  },
  "priceRange": "₹₹₹",
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, Bank Transfer",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "10:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "10:00",
      "closes": "14:00"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/studioaashraya",
    "https://www.linkedin.com/company/studioaashraya"
  ]
}
```

#### SCHEMA BLOCK 2 — Organization (Homepage only, in addition to Block 1)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://studioaashraya.site/#organization",
  "name": "Studio Aashraya",
  "url": "https://studioaashraya.site",
  "logo": "https://studioaashraya.site/assets/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+919473031016",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  }
}
```

#### SCHEMA BLOCK 3 — WebSite with Sitelinks Searchbox (Homepage only)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://studioaashraya.site/#website",
  "url": "https://studioaashraya.site",
  "name": "Studio Aashraya",
  "description": "IIT-trained architecture studio in Patna, Bihar. Climate-responsive, sustainable residential and commercial architecture.",
  "publisher": {
    "@id": "https://studioaashraya.site/#organization"
  },
  "inLanguage": "en-IN"
}
```

#### SCHEMA BLOCK 4 — BreadcrumbList (per-page, passed as props)
On every NON-homepage page, inject a dynamic BreadcrumbList. The component should accept a `breadcrumbs` prop: array of `{name, url}` objects. Render:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://studioaashraya.site"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "{pageName}",
      "item": "{pageUrl}"
    }
  ]
}
```
For 3-level pages (e.g., Projects > Clay House), add a third ListItem at position 3.

#### SCHEMA BLOCK 5 — CreativeWork for each Project detail page
On every project detail page, inject:
```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": "https://studioaashraya.site/projects/{projectSlug}#project",
  "name": "{projectName}",
  "description": "{projectDescription}",
  "creator": {
    "@id": "https://studioaashraya.site/#founder"
  },
  "locationCreated": {
    "@type": "Place",
    "name": "{projectLocation}",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "{projectCity}",
      "addressRegion": "Bihar",
      "addressCountry": "IN"
    }
  },
  "image": "{projectMainImageUrl}",
  "dateCreated": "{projectYear}",
  "keywords": "{projectKeywords}",
  "about": {
    "@type": "Thing",
    "name": "Sustainable Architecture, Passive Cooling, Vernacular Design"
  }
}
```
The project's slug, name, description, image, year, city, and keywords must be passed as props from the project data object.

#### SCHEMA BLOCK 6 — FAQPage (About page and optionally Project pages)
On the About page, inject:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What makes Studio Aashraya different from other architects in Patna?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Studio Aashraya combines IIT (BHU) Varanasi-level design thinking with deep knowledge of Bihar's climate, culture, and local materials. Every home we design uses passive cooling strategies, vernacular materials, and climate-adaptive layouts — so your home stays cooler, looks better, and costs less to run."
      }
    },
    {
      "@type": "Question",
      "name": "How much does architecture design cost in Bihar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Design fees in Bihar typically range from 3% to 8% of total construction cost depending on project scope and services included. For a residential project of ₹40–70 lakh, design fees are approximately ₹1.5–4 lakh. Use our Construction Cost Estimator for a range estimate."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer virtual consultations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We offer free 30-minute video or phone clarity calls for clients across Bihar, Delhi NCR, and for NRI clients. Book directly from our website."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the architecture design process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A full residential design process — from site analysis to final construction drawings — takes 3 to 6 months depending on project complexity. Construction supervision adds the duration of the build, typically 9 to 18 months for a residential project."
      }
    },
    {
      "@type": "Question",
      "name": "What cities do you work in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We primarily serve Patna and Bihar (Gaya, Nalanda, Muzaffarpur, and surrounding towns). We also work with clients in Delhi NCR and NRI clients worldwide for projects in Bihar."
      }
    },
    {
      "@type": "Question",
      "name": "What is passive cooling design?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Passive cooling is a design approach that uses building orientation, cross-ventilation, shading (jaali, overhangs, deep windows), thermal mass, and local materials to keep a home naturally cooler — reducing or eliminating AC dependence. In Bihar's climate, a well-designed passive home can be 6–10°C cooler than a conventional build."
      }
    },
    {
      "@type": "Question",
      "name": "Are you IIT-trained?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Studio Aashraya is led by Anumeh Prakhar, a graduate of IIT (BHU) Varanasi's architecture program — one of India's most rigorous design education institutions."
      }
    },
    {
      "@type": "Question",
      "name": "How do I book a free clarity call?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Click 'Book a Free Clarity Call' on our homepage or visit studioaashraya.site/book-a-call. Fill in your name, contact details, project type, and budget. We'll confirm within 24 hours with a Zoom or phone link."
      }
    }
  ]
}
```

#### SCHEMA BLOCK 7 — Service schema (Services mentioned on Homepage or About)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Architecture Design",
  "provider": {
    "@id": "https://studioaashraya.site/#business"
  },
  "areaServed": [
    { "@type": "City", "name": "Patna" },
    { "@type": "State", "name": "Bihar" }
  ],
  "description": "Full-service residential and commercial architecture design in Bihar. Specializing in climate-responsive, sustainable, and vernacular architecture.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "priceRange": "₹₹₹",
    "eligibleRegion": {
      "@type": "Country",
      "name": "India"
    }
  }

### 3. PER-PAGE META VALUES

Apply the following exact values to each page using the SeoHead component props.

**Keyword philosophy applied here:**
- "architects near me" is the #1 searched term globally (18,000/mo) [web:20] — Google resolves it using the visitor's location. The GBP + LocalBusiness schema + NAP consistency handles this automatically. You do not need to literally write "near me" in meta tags — instead, plant location signals (Patna, Bihar, Delhi NCR, city names) in every title and description so Google correctly matches the page to local intent queries.
- Primary keywords selected from validated search data: "architect Patna" (high local intent), "house design Patna", "residential architect Bihar", "home construction Patna", "3D house design", "architecture firm Bihar", "ghar ka design", "best architect Patna" [web:20][web:23][web:26]
- IIT credential: retained in keywords but NOT the headline of any description. It signals credibility and differentiates from competitors — but nobody searches "IIT architect". People search "architect Patna" and then the IIT factor converts them after they land.
- Every description is written to answer the search intent directly in the first 8 words — the words Google shows in SERP before truncation.

---

#### Homepage (/)
- **pageTitle**: `Architect in Patna, Bihar | House & Home Design — Studio Aashraya`
- **pageDescription**: `Looking for an architect in Patna? Studio Aashraya designs residential homes, 3D house plans, and sustainable buildings across Bihar. Free 30-min consultation. Call now.`
- **pageKeywords**: `architect Patna, architect in Patna, residential architect Bihar, house design Patna, home design Bihar, architecture firm Patna, 3D house design Bihar, best architect Patna, ghar ka design Patna, building design Bihar, architecture services Patna`
- **canonicalUrl**: `https://studioaashraya.site`
- **ogType**: `website`
- **ogImage**: `https://studioaashraya.site/assets/og-social-card.jpg`
- **ogImageAlt**: `Architect in Patna Bihar — residential home design by Studio Aashraya`
- **Schema blocks**: Block 1 + Block 2 + Block 3 + Block 7

---

#### About Page (/about)
- **pageTitle**: `About Us | Architecture Firm in Patna, Bihar — Studio Aashraya`
- **pageDescription**: `Studio Aashraya is a Patna-based architecture firm. We design custom homes, residential buildings, and sustainable structures across Bihar. Meet our architect and see how we work.`
- **pageKeywords**: `architecture firm Patna, architect Bihar, residential architect Patna, home design firm Bihar, best architecture studio Patna, sustainable home design Bihar, house architect near Patna, architecture design company Bihar`
- **canonicalUrl**: `https://studioaashraya.site/about`
- **ogType**: `profile`
- **ogImage**: `https://studioaashraya.site/assets/og-about.jpg`
- **ogImageAlt**: `Studio Aashraya architecture firm Patna Bihar — meet our architect`
- **breadcrumbs**: `[{name: 'Home', url: 'https://studioaashraya.site'}, {name: 'About', url: 'https://studioaashraya.site/about'}]`
- **Schema blocks**: Block 1 + Block 4 + Block 6

---

#### Projects Listing Page (/projects)
- **pageTitle**: `House Design Portfolio | Residential Architecture Projects — Studio Aashraya Patna`
- **pageDescription**: `See completed residential homes, 3D house designs, and architectural projects by Studio Aashraya in Patna and Bihar. Browse real projects with photos and outcomes.`
- **pageKeywords**: `house design portfolio Patna, residential architecture projects Bihar, home design examples Patna, architecture portfolio Bihar, completed house designs Patna, residential building design Bihar, 3D house plans Patna`
- **canonicalUrl**: `https://studioaashraya.site/projects`
- **ogType**: `website`
- **ogImage**: `https://studioaashraya.site/assets/og-projects.jpg`
- **ogImageAlt**: `Residential architecture portfolio by Studio Aashraya — house designs in Patna Bihar`
- **breadcrumbs**: `[{name: 'Home', url: 'https://studioaashraya.site'}, {name: 'Projects', url: 'https://studioaashraya.site/projects'}]`
- **Schema blocks**: Block 1 + Block 4

---

#### Project Detail Pages (/projects/[slug])
- **pageTitle**: `{projectName} | Residential Home Design in {projectCity}, Bihar — Studio Aashraya`
- **pageDescription**: `{projectName} — a {projectType} in {projectCity}, Bihar. Designed by Studio Aashraya: custom floor plan, 3D visualization, and construction supervision. {one outcome metric, e.g. "30% lower cooling costs."}`
- **pageKeywords**: `{projectType} Patna, house design {projectCity}, residential architecture Bihar, custom home design {projectCity}, 3D home design Bihar, architecture project Patna, home construction Bihar`
- **canonicalUrl**: `https://studioaashraya.site/projects/{slug}`
- **ogType**: `article`
- **ogImage**: `{projectMainImageUrl}`
- **ogImageAlt**: `{projectName} — {projectType} in {projectCity} Bihar designed by Studio Aashraya architect`
- **breadcrumbs**: `[{name: 'Home', ...}, {name: 'Projects', ...}, {name: projectName, ...}]`
- **Schema blocks**: Block 1 + Block 4 + Block 5

---

#### Construction Cost Estimator (/calculators/cost-estimator)
- **pageTitle**: `House Construction Cost Calculator Patna Bihar | Free Estimator — Studio Aashraya`
- **pageDescription**: `Free house construction cost estimator for Patna and Bihar. Enter your plot size and quality level. Get an instant cost range in INR. No signup needed.`
- **pageKeywords**: `house construction cost Patna, ghar banane ka kharcha Bihar, construction cost calculator Bihar, home building cost Patna, cost of building a house Bihar, construction estimate Patna, ghar ka budget calculator Bihar, building cost per sq ft Patna`
- **canonicalUrl**: `https://studioaashraya.site/calculators/cost-estimator`
- **ogType**: `website`
- **ogImage**: `https://studioaashraya.site/assets/og-social-card.jpg`
- **ogImageAlt**: `Free house construction cost calculator for Patna Bihar by Studio Aashraya`
- **breadcrumbs**: `[{name: 'Home', ...}, {name: 'Calculators', ...}, {name: 'Construction Cost Estimator', ...}]`
- **Schema blocks**: Block 1 + Block 4

---

#### FAR & Built-up Area Checker (/calculators/far-checker)
- **pageTitle**: `Plot FAR Calculator Patna | How Much Can I Build? — Studio Aashraya Bihar`
- **pageDescription**: `Check how much you can build on your plot in Patna or Bihar. Free FAR calculator based on local norms. Enter plot size and get your maximum built-up area instantly.`
- **pageKeywords**: `FAR calculator Patna, plot FAR Bihar, kitna ghar ban sakta hai Patna, how much can I build on my plot Bihar, floor area ratio Patna, built-up area calculator Bihar, plot coverage Patna, construction limit Bihar plot`
- **canonicalUrl**: `https://studioaashraya.site/calculators/far-checker`
- **ogType**: `website`
- **ogImage**: `https://studioaashraya.site/assets/og-social-card.jpg`
- **ogImageAlt**: `Plot FAR and built-up area calculator for Patna Bihar by Studio Aashraya`
- **breadcrumbs**: `[{name: 'Home', ...}, {name: 'Calculators', ...}, {name: 'FAR & Built-up Area Checker', ...}]`
- **Schema blocks**: Block 1 + Block 4

---

#### Book a Call Page (/book-a-call)
- **pageTitle**: `Hire an Architect in Patna | Free Consultation — Studio Aashraya Bihar`
- **pageDescription**: `Ready to build or design your home in Patna or Bihar? Book a free 30-minute call with our architect. We'll discuss your plot, budget, and house plan. No obligation.`
- **pageKeywords**: `hire architect Patna, book architect Bihar, free architect consultation Patna, architect consultation Bihar, residential architect near me Patna, architecture firm consultation Bihar, book a call architect, home design consultation Patna`
- **canonicalUrl**: `https://studioaashraya.site/book-a-call`
- **ogType**: `website`
- **ogImage**: `https://studioaashraya.site/assets/og-social-card.jpg`
- **ogImageAlt**: `Hire an architect in Patna Bihar — free consultation with Studio Aashraya`
- **breadcrumbs**: `[{name: 'Home', url: 'https://studioaashraya.site'}, {name: 'Book a Call', url: 'https://studioaashraya.site/book-a-call'}]`
- **Schema blocks**: Block 1 + Block 4

#### B. Heading Hierarchy — enforce on every page
- ONE `<h1>` per page, contains the primary keyword
- `<h2>` for major sections
- `<h3>` for subsections within h2
- Never skip a level (no h1 → h3)
- Homepage H1: `Cooler, Smarter Homes for Bihar`
- Projects H1: `Our Work: Climate-Smart Architecture in Bihar`
- About H1: `Design Thinking Rooted in Bihar's Climate and Culture`
- Each Calculator H1: `Construction Cost Estimator for Bihar` / `FAR & Built-up Area Checker for Patna`
- Book a Call H1: `Book Your Free Design Clarity Call`

#### C. Image Alt Text — enforce on all images
Every `<img>` must have a descriptive, keyword-rich alt attribute following the pattern:
`{subject} {action/type} in {location} by Studio Aashraya`
Example: `Climate-responsive residential home design in Patna Bihar by Studio Aashraya`
Hero image alt: `IIT-trained architect Studio Aashraya — sustainable home design Bihar`
Never use: `image`, `photo`, `img`, or blank alt (use `alt=""` only for purely decorative images with no informational value).

#### D. GA4 Conversion Event Tracking — add to all interactive elements
Add the following event calls. Place in the JS file or inline script:

```javascript
// Form submission (Book a Call page)
document.querySelector('form[data-form="book-call"]')?.addEventListener('submit', function() {
  gtag('event', 'form_submit', {
    'event_category': 'Lead',
    'event_label': 'book_call_form',
    'page_location': window.location.href
  });
});

// Calculator completion (Cost Estimator)
// Call this when result is displayed
function trackCalculatorComplete(calcName) {
  gtag('event', 'calculator_complete', {
    'event_category': 'Engagement',
    'event_label': calcName,
    'page_location': window.location.href
  });
}

// Phone/WhatsApp click
document.querySelectorAll('a[href^="tel:"], a[href^="https://wa.me"]').forEach(function(el) {
  el.addEventListener('click', function() {
    gtag('event', 'click', {
      'event_category': 'Contact',
      'event_label': this.href.startsWith('tel:') ? 'phone_click' : 'whatsapp_click',
      'page_location': window.location.href
    });
  });
});

// Project detail view
if (window.location.pathname.startsWith('/projects/')) {
  gtag('event', 'project_view', {
    'event_category': 'Engagement',
    'event_label': window.location.pathname,
    'page_location': window.location.href
  });
}
```

#### E. Sitemap (create /sitemap.xml)
Generate a static sitemap.xml file with the following URLs (use today's date as lastmod):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://studioaashraya.site/</loc><lastmod>2026-06-22</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://studioaashraya.site/about</loc><lastmod>2026-06-22</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://studioaashraya.site/projects</loc><lastmod>2026-06-22</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://studioaashraya.site/projects/the-clay-house</loc><lastmod>2026-06-22</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://studioaashraya.site/projects/veranda-villa</loc><lastmod>2026-06-22</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://studioaashraya.site/projects/aashraya-farmstead</loc><lastmod>2026-06-22</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://studioaashraya.site/calculators/cost-estimator</loc><lastmod>2026-06-22</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://studioaashraya.site/calculators/far-checker</loc><lastmod>2026-06-22</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://studioaashraya.site/book-a-call</loc><lastmod>2026-06-22</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>
</urlset>
```
Add each real project slug as it exists in your project data array. If you have more projects, add them.

#### F. Robots.txt (create /robots.txt)
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /_next/
Sitemap: https://studioaashraya.site/sitemap.xml
```

---

### 5. OG SOCIAL CARD IMAGE SPECIFICATIONS

Create or designate the following image assets (these must exist at these paths before the meta tags are live):

| Asset | Path | Size | Content |
|-------|------|------|---------|
| Default OG card | `/assets/og-social-card.jpg` | 1200×630px | Studio logo, tagline "Cooler, Smarter Homes for Bihar", brand color background (#1B4A45) |
| About OG card | `/assets/og-about.jpg` | 1200×630px | Founder photo or studio visual + "IIT-trained Architecture, Patna Bihar" |
| Projects OG card | `/assets/og-projects.jpg` | 1200×630px | Best project render or collage |

If these images don't exist yet, use `/assets/og-social-card.jpg` as the fallback ogImage value for all pages temporarily.

---

### 6. IMPLEMENTATION NOTES FOR ANTIGRAVITY

- All JSON-LD schema blocks must be rendered as `<script type="application/ld+json">` inside `<head>`, not in `<body>`
- Each schema block is a separate `<script>` tag (do not merge multiple schema types into one script tag unless using `@graph`)
- Alternatively, use a single `@graph` array inside one script tag to combine all schemas per page — this is the preferred Google-recommended approach:
```json
{
  "@context": "https://schema.org",
  "@graph": [
    { ... LocalBusiness schema ... },
    { ... BreadcrumbList schema ... },
    { ... CreativeWork schema (on project pages) ... }
  ]
}
```
- Props that vary per page (title, description, canonicalUrl, breadcrumbs, ogImage, projectSlug, etc.) must be passed from each page's data/config into the SeoHead component dynamically
- For project detail pages, the schema props (projectName, projectDescription, projectImage, projectYear, projectCity, projectKeywords) should be pulled from the same project data object used to render the page content — do not duplicate data
- All schema `@id` values use full absolute URLs with fragment identifiers (#business, #founder, #organization, etc.) for cross-schema entity linking
- Validate all schema after implementation at: https://validator.schema.org and https://search.google.com/test/rich-results

---

## VALIDATION CHECKLIST (run after implementation)
- [ ] Every page has a unique <title> (not duplicate)
- [ ] Every page has a unique meta description (not duplicate)
- [ ] Every page has a canonical tag pointing to its own URL
- [ ] All og:image URLs resolve to actual images (200 status)
- [ ] JSON-LD validates without errors on schema.org validator
- [ ] Rich Results Test shows eligible results for LocalBusiness and FAQPage
- [ ] Breadcrumb schema matches visible breadcrumb on page
- [ ] Sitemap.xml is accessible and submitted to Google Search Console
- [ ] Robots.txt is accessible at root domain
- [ ] GA4 events fire correctly (verify in GA4 DebugView)
- [ ] No console errors related to schema or meta tags

