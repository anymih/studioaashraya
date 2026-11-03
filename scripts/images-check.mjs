import fs from 'node:fs'
import path from 'node:path'

let imagesPath = path.resolve(process.cwd(), 'lib', 'images.tsx')
if (!fs.existsSync(imagesPath)) {
  imagesPath = path.resolve(process.cwd(), 'lib', 'images.ts')
}
if (!fs.existsSync(imagesPath)) {
  console.error('❌ [Images Check] Missing lib/images.tsx or lib/images.ts')
  process.exit(1)
}

const content = fs.readFileSync(imagesPath, 'utf8')
const entryRegex = /'([a-z0-9-]+)':\s*\{[\s\S]*?id:\s*'([a-z0-9-]+)'[\s\S]*?alt:\s*(['"`])([\s\S]*?)\3[\s\S]*?(?:caption:\s*(['"`])([\s\S]*?)\5[\s\S]*?)?kind:\s*'([a-z]+)'/g

let match
let count = 0
const errors = []
const seenIds = new Set()

while ((match = entryRegex.exec(content)) !== null) {
  count++
  const [, key, id, , alt, , caption, kind] = match

  if (key !== id) {
    errors.push(`Mismatch between key '${key}' and id '${id}'`)
  }
  if (seenIds.has(id)) {
    errors.push(`Duplicate image id '${id}'`)
  }
  seenIds.add(id)

  if (!alt || alt.trim().length === 0) {
    errors.push(`Image [${id}] has empty alt text`)
  } else if (/^image of/i.test(alt.trim())) {
    errors.push(`Image [${id}] alt text starts with banned prefix "image of"`)
  }

  if (kind === 'generated' && (!caption || caption.trim().length === 0)) {
    errors.push(`Image [${id}] has kind "generated" but missing caption`)
  }
}

if (count < 54) {
  errors.push(`Expected 54 registered images, parsed ${count}`)
}

if (errors.length > 0) {
  console.error(`❌ [Images Check Failed] Found ${errors.length} error(s):`)
  for (const err of errors) {
    console.error(`  - ${err}`)
  }
  process.exit(1)
}

console.log(`✅ [Images Check Passed] All ${count} images in registry verified for alt text and caption rules.`)
process.exit(0)
