import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const projectsFilePath = path.resolve(root, 'lib', 'projects-data.ts')
const areasFilePath = path.resolve(root, 'lib', 'areas-data.ts')
const servicesFilePath = path.resolve(root, 'lib', 'services-data.ts')

if (!fs.existsSync(projectsFilePath)) {
  console.error('❌ [Projects Check] Missing lib/projects-data.ts')
  process.exit(1)
}

const content = fs.readFileSync(projectsFilePath, 'utf8')
const slugMatches = Array.from(content.matchAll(/slug:\s*['"]([a-z0-9-]+)['"]/g)).map((m) => m[1])

if (slugMatches.length === 0) {
  console.error('❌ [Projects Check Failed] No project slugs found in lib/projects-data.ts')
  process.exit(1)
}

const expectedSlugs = [
  'jali-house',
  'basement-villa',
  'south-delhi-redevelopment',
  'hillside-house-almora',
  'courtyard-home-patna',
  'nri-farmhouse-sohna',
]

const missingSlugs = expectedSlugs.filter((s) => !slugMatches.includes(s))
if (missingSlugs.length > 0) {
  console.error(`❌ [Projects Check Failed] Missing required sample slugs: ${missingSlugs.join(', ')}`)
  process.exit(1)
}

if (!content.includes('export function validateProjects') && !content.includes('function validateProjects')) {
  console.error('❌ [Projects Check Failed] Missing validateProjects() function in lib/projects-data.ts')
  process.exit(1)
}

// 1. Check areas-data.ts
if (!fs.existsSync(areasFilePath)) {
  console.error('❌ [Projects Check Failed] Missing lib/areas-data.ts')
  process.exit(1)
}

const areasContent = fs.readFileSync(areasFilePath, 'utf8')

// Parse areas and their projectSlugs
const areaBlocks = areasContent.split(/slug:\s*['"]([a-z0-9-]+)['"]/).slice(1)
const areas = []
for (let i = 0; i < areaBlocks.length; i += 2) {
  const areaSlug = areaBlocks[i]
  const block = areaBlocks[i + 1] || ''
  const projectSlugsMatch = block.match(/projectSlugs:\s*\[([\s\S]*?)\]/)
  const slugs = projectSlugsMatch
    ? Array.from(projectSlugsMatch[1].matchAll(/['"]([a-z0-9-]+)['"]/g)).map((m) => m[1])
    : []
  areas.push({ slug: areaSlug, slugs })
}

if (areas.length === 0) {
  console.error('❌ [Projects Check Failed] No areas found in lib/areas-data.ts')
  process.exit(1)
}

let areaErrors = 0
for (const area of areas) {
  if (area.slugs.length === 0) {
    console.error(`❌ [Projects Check Failed] Area "${area.slug}" has 0 projects assigned.`)
    areaErrors++
  }
  for (const s of area.slugs) {
    if (!slugMatches.includes(s)) {
      console.error(`❌ [Projects Check Failed] Area "${area.slug}" references non-existent project slug "${s}".`)
      areaErrors++
    }
  }
}

// 2. Check services-data.ts
if (!fs.existsSync(servicesFilePath)) {
  console.error('❌ [Projects Check Failed] Missing lib/services-data.ts')
  process.exit(1)
}

const servicesContent = fs.readFileSync(servicesFilePath, 'utf8')
const serviceProjectMatches = Array.from(servicesContent.matchAll(/projectSlugs:\s*\[([\s\S]*?)\]/g))
for (const match of serviceProjectMatches) {
  const slugs = Array.from(match[1].matchAll(/['"]([a-z0-9-]+)['"]/g)).map((m) => m[1])
  for (const s of slugs) {
    if (!slugMatches.includes(s)) {
      console.error(`❌ [Projects Check Failed] services-data.ts references non-existent project slug "${s}".`)
      areaErrors++
    }
  }
}

if (areaErrors > 0) {
  console.error(`❌ [Projects Check Failed] Found ${areaErrors} error(s) in area/service project mappings.`)
  process.exit(1)
}

console.log(`✅ [Projects Check Passed] All ${slugMatches.length} projects (${slugMatches.join(', ')}) verified across areas and services.`)
process.exit(0)
