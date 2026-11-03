import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const baselinePath = path.join(root, 'scripts', 'form-baseline.json')
const formComponentPath = path.join(root, 'app', 'book-a-call', 'page.tsx')

if (!fs.existsSync(baselinePath)) {
  console.error('Error: scripts/form-baseline.json does not exist')
  process.exit(1)
}

if (!fs.existsSync(formComponentPath)) {
  console.error('Error: app/book-a-call/page.tsx does not exist')
  process.exit(1)
}

const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'))
const formSource = fs.readFileSync(formComponentPath, 'utf8')

const errors = []

// 1. Verify endpoint
if (!formSource.includes(baseline.endpoint)) {
  errors.push(`Endpoint mismatch: expected "${baseline.endpoint}"`)
}

// 2. Verify all field names exist with name="..."
for (const field of baseline.fields) {
  const namePattern = new RegExp(`name=["']${field.name}["']`)
  if (!namePattern.test(formSource)) {
    errors.push(`Missing field name attribute: "${field.name}"`)
  }

  // If select, verify options
  if (field.type === 'select' && Array.isArray(field.options)) {
    for (const opt of field.options) {
      if (!formSource.includes(opt)) {
        errors.push(`Missing select option "${opt}" for field "${field.name}"`)
      }
    }
  }
}

// 3. Verify analytics functions
for (const fn of baseline.analytics) {
  if (!formSource.includes(fn)) {
    errors.push(`Missing analytics tracking call: "${fn}"`)
  }
}

// 4. Report results
if (errors.length > 0) {
  console.error('❌ Form check FAILED with invariance errors:')
  for (const err of errors) {
    console.error(`  - ${err}`)
  }
  process.exit(1)
}

console.log('✅ Form check PASSED: All frozen form attributes and endpoints verified.')
process.exit(0)
