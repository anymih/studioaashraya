# Studio Aashraya

Studio Aashraya is an IITian-led architecture studio based in Patna, Bihar, specializing in climate-responsive, vernacular home design for Bihar's next-generation families.

## Brand Vision

"Cooler, smarter homes for Bihar."

Studio Aashraya designs homes that stay cooler, use local materials, and respect both budget and culture. From the first sketch to construction cost clarity, we help homeowners and NRIs turn confusing "architect near me" searches into a calm, end-to-end design partnership.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Analytics:** [Google Analytics 4 (GA4)](https://marketingplatform.google.com/about/analytics/) via `@next/third-parties`
- **SEO:** Structured data (JSON-LD schema) for LocalBusiness, FAQ, CreativeWork, and Breadcrumbs.

## Key Features

- **Climate-Smart Design:** Passive cooling strategies, cross-ventilation, and sun path analysis integrated into architectural designs.
- **Construction Cost Estimator:** A tool for homeowners to estimate construction costs in various cities in Bihar (Patna, Gaya, Muzaffarpur, etc.).
- **FAR & Built-up Area Checker:** A calculator to help users understand how much they can build on their plots based on local norms.
- **Project Portfolio:** Showcasing real projects like "The Clay House" and "The Veranda Villa" with detailed case studies.
- **SEO & Analytics:** Optimized for local search with comprehensive meta tags and conversion tracking.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
  - `about/`: About page detailing the founder's story and approach.
  - `book-a-call/`: Lead capture form for consultations.
  - `calculators/`: Construction cost and FAR calculators.
  - `projects/`: Portfolio listing and detail pages.
- `components/`: Reusable UI components.
- `lib/`: Shared utilities, constants, and data (analytics, projects, etc.).
- `public/`: Static assets (images, favicon).
- `styles/`: Global styles and Tailwind configuration.

## SEO & Positioning

The project follows a strict positioning strategy:
- **Primary:** IITian-led (background credibility signal).
- **Brand Identity:** Climate-responsive + vernacular design for Bihar.
- **Target:** Modern Bihar families, homeowners, and NRIs.

Detailed SEO schema and brand directives can be found in `POSITIONING.md` and `antigravity_schema_seo_prompt_v2.md`.

## Analytics

Conversion events are tracked using GA4, including:
- Lead form submissions (`generate_lead`).
- CTA clicks.
- Calculator completions.
- Project views.

Tracking logic is centralized in `lib/analytics.ts`.
