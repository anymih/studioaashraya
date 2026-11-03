import fs from 'node:fs'
import path from 'node:path'

const filePath = path.resolve(process.cwd(), 'lib', 'projects-data.ts')
if (!fs.existsSync(filePath)) {
  console.error('❌ [Projects Check] Missing lib/projects-data.ts')
  process.exit(1)
}

const content = fs.readFileSync(filePath, 'utf8')
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

// Check that validateProjects() function exists and is exported
if (!content.includes('export function validateProjects') && !content.includes('function validateProjects')) {
  console.error('❌ [Projects Check Failed] Missing validateProjects() function in lib/projects-data.ts')
  process.exit(1)
}

console.log(`✅ [Projects Check Passed] All ${slugMatches.length} projects (${slugMatches.join(', ')}) verified.`)
process.exit(0)
