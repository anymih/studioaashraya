# Project Rules — Studio Aashraya Site Feasibility Calculator

## Spec Reference
This feature implements docs/studio-aashraya-site-feasibility-prd-trd.md
Always re-read this file before planning any new module. Do not deviate from
its phasing (Phase 1 → Phase 2 → Phase 3) without explicit approval.

## Confirmed Stack (match existing codebase, do not introduce a new stack)
- Framework: Next.js 16.1.7, App Router (app/ directory)
- Library: React 19.2.3
- Language: TypeScript 5.x
- Styling: Tailwind CSS v4.0 (PostCSS integration via @tailwindcss/postcss)
- Icons: Lucide React
- Linting: ESLint v9.x with Next.js config
- Package manager: npm (respect package-lock.json, do not switch to yarn/pnpm)

## Directory Conventions
- New feature routes go under app/calculators/site-feasibility/ (mirrors existing
  app/calculators/ pattern)
- Reusable UI (map view, road-width bubbles, setback visualizer) goes under
  /components, matching existing Header.tsx/Footer.tsx style
- Non-UI helpers, geometry math, FAR calculations go under /lib
  (matches existing analytics.ts, projects-data.ts convention)
- Do not create a separate backend service. Use Next.js Route Handlers under
  app/api/ for anything needing a server (external API calls, DB, RAG).
  Prefer Server Actions only for simple form mutations, not for external
  data-fetch heavy logic (elevation, wind, bye-law lookups).

## Coding Standards
- Strict TypeScript, no implicit any
- Functional React components, hooks-based state
- Tailwind utility classes only, no separate CSS files unless unavoidable
- Every new component gets a co-located type definition
- Run existing ESLint config before marking any task complete; fix all warnings

## Scope Discipline
- Work only on Phase 1 (Minimal Viable Tool) as defined in the TRD unless told
  otherwise: plot drawing/geometry, manual road-width bubbles, one hard-coded
  city's bye-law rules, setback + FAR calculation, red/green visualization
- Do NOT call paid external APIs (Google Maps, Mapbox, meteoblue, Elevation)
  until explicitly instructed — use placeholder/mock data first
- Do NOT touch existing routes (about, book-a-call, projects) unless required
  for navigation/linking to the new calculator

## Process
- Before writing code, produce a plan artifact for review
- After scaffolding, run npm run build / npm run dev and report any errors
- Flag any ambiguity in the spec instead of guessing
