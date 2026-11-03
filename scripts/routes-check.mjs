import fs from 'node:fs'
import path from 'node:path'

const baselinePath = path.resolve(process.cwd(), 'scripts', 'routes-baseline.json')
if (!fs.existsSync(baselinePath)) {
  console.error('❌ [Routes Check] Missing scripts/routes-baseline.json')
  process.exit(1)
}

const baselineRoutes = JSON.parse(fs.readFileSync(baselinePath, 'utf-8'))
const appPathsManifestPath = path.resolve(process.cwd(), '.next', 'server', 'app-paths-manifest.json')
const prerenderManifestPath = path.resolve(process.cwd(), '.next', 'prerender-manifest.json')

if (!fs.existsSync(appPathsManifestPath)) {
  console.error('❌ [Routes Check] .next/server/app-paths-manifest.json not found. Run "npm run build" first.')
  process.exit(1)
}

const appPaths = JSON.parse(fs.readFileSync(appPathsManifestPath, 'utf-8'))
let prerenderRoutes = {}
if (fs.existsSync(prerenderManifestPath)) {
  const prerender = JSON.parse(fs.readFileSync(prerenderManifestPath, 'utf-8'))
  prerenderRoutes = prerender.routes || {}
}

const registeredAppRoutes = Object.keys(appPaths)

let missing = []

for (const route of baselineRoutes) {
  // Check direct matches
  if (route === '/') {
    if (!registeredAppRoutes.includes('/page')) missing.push(route)
    continue
  }

  const pagePattern = `${route}/page`
  const routePattern = `${route}/route`

  const hasDirectPage = registeredAppRoutes.includes(pagePattern)
  const hasDirectRoute = registeredAppRoutes.includes(routePattern)
  const hasPrerender = Boolean(prerenderRoutes[route])

  // If it's a dynamic project route like /projects/the-clay-house
  const isProjectSlug = route.startsWith('/projects/')
  const hasProjectDynamicRoute = registeredAppRoutes.includes('/projects/[slug]/page')

  if (isProjectSlug && hasProjectDynamicRoute) {
    continue
  }

  if (!hasDirectPage && !hasDirectRoute && !hasPrerender) {
    missing.push(route)
  }
}

if (missing.length > 0) {
  console.error(`\n❌ [Routes Check Failed] The following baseline routes are missing from build output:`)
  for (const m of missing) {
    console.error(`  - ${m}`)
  }
  process.exit(1)
} else {
  console.log(`✅ [Routes Check Passed] All ${baselineRoutes.length} baseline routes verified in build output.`)
  process.exit(0)
}
