import fs from 'node:fs'
import path from 'node:path'

// Banned patterns per Revision 2 PRD Section 6 (Truth System):
// fails on: 78%, AQI under, 50-year, 7-layer, 5D, zero seepage, zero delays, never seen,
// first in india, only builder, longer than any, escrow, and any competitor name
const BANNED_PATTERNS = [
  { pattern: /\b78\s?%/i, label: '78% (banned claim)' },
  { pattern: /AQI under/i, label: 'AQI under' },
  { pattern: /50-year/i, label: '50-year' },
  { pattern: /7-layer/i, label: '7-layer' },
  { pattern: /\b5D\b/i, label: '5D' },
  { pattern: /zero seepage/i, label: 'zero seepage' },
  { pattern: /zero delays?/i, label: 'zero delay(s)' },
  { pattern: /never seen/i, label: 'never seen' },
  { pattern: /first in india/i, label: 'first in india' },
  { pattern: /only builder/i, label: 'only builder' },
  { pattern: /longer than any/i, label: 'longer than any' },
  { pattern: /\bescrow\b/i, label: 'escrow' },
  { pattern: /\bPrithu\b/i, label: 'Prithu' },
  { pattern: /Brick\s*&\s*Bolt/i, label: 'Brick & Bolt' },
  { pattern: /Tron\s+Homes/i, label: 'Tron Homes' },
  { pattern: /ANJ\s+Homes/i, label: 'ANJ Homes' },
  { pattern: /ConsYard/i, label: 'ConsYard' },
  { pattern: /\bOberoi\b/i, label: 'Oberoi' },
]

const TARGET_DIRS = ['app', 'components', 'lib']

let violations = []

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        scanDirectory(fullPath)
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name)
      if (['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json'].includes(ext)) {
        // Exclude lib/ledger.ts and lib/ledger.tsx from standard ledger patterns
        if (entry.name.startsWith('ledger.')) {
          const content = fs.readFileSync(fullPath, 'utf-8')
          if (/\b78\s?%/i.test(content) || /c\.market78/.test(content)) {
            violations.push({
              file: fullPath,
              line: 1,
              label: '78% or c.market78 in ledger',
              snippet: '78% is permanently removed from the ledger',
            })
          }
          continue
        }
        checkFile(fullPath)
      }
    }
  }
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')

  lines.forEach((line, index) => {
    for (const { pattern, label } of BANNED_PATTERNS) {
      if (pattern.test(line)) {
        violations.push({
          file: filePath,
          line: index + 1,
          label,
          snippet: line.trim(),
        })
      }
    }

    // Check if any component renders claim.note or claim?.note or claim['note']
    if (/claim(\?|\.)note\b|claim\[['"]note['"]\]/.test(line)) {
      violations.push({
        file: filePath,
        line: index + 1,
        label: 'claim.note render attempt (banned field)',
        snippet: line.trim(),
      })
    }

    // Check if any component renders internalNote (excluding ledger definition itself)
    if (!filePath.includes('ledger.ts') && !filePath.includes('ledger.tsx') && /\binternalNote\b/.test(line)) {
      violations.push({
        file: filePath,
        line: index + 1,
        label: 'internalNote render attempt (internal notes must never render)',
        snippet: line.trim(),
      })
    }
  })
}

for (const dir of TARGET_DIRS) {
  scanDirectory(path.resolve(process.cwd(), dir))
}

if (violations.length > 0) {
  console.error(`\n❌ [Ledger Check Failed] Found ${violations.length} banned claim/competitor pattern(s):`)
  for (const v of violations) {
    console.error(`  - ${v.file}:${v.line} [${v.label}] -> "${v.snippet}"`)
  }
  process.exit(1)
} else {
  console.log(`✅ [Ledger Check Passed] Scanned ${TARGET_DIRS.join(', ')}: 0 violations found.`)
  process.exit(0)
}
