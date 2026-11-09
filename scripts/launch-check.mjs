import fs from 'fs';
import path from 'path';

let hasErrors = false;
const warnings = [];

// 1. Check NEXT_PUBLIC_SITE_URL in environment or fallback
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
if (!siteUrl) {
  warnings.push('NEXT_PUBLIC_SITE_URL is not set in environment (falling back to default https://studioaashraya.site).');
}

// Check lib/site.ts constants
const siteTsPath = path.join(process.cwd(), 'lib/site.ts');
if (!fs.existsSync(siteTsPath)) {
  console.error('❌ [Launch Check Failed] lib/site.ts does not exist.');
  hasErrors = true;
} else {
  const content = fs.readFileSync(siteTsPath, 'utf8');
  const required = ['SITE_PHONE', 'SITE_TEL', 'SITE_WHATSAPP_URL', 'SITE_ADDRESS', 'SITE_MAPS_URL', 'SITE_EMAIL', 'SITE_FORM_ROUTE'];
  for (const c of required) {
    if (!content.includes(c)) {
      console.error(`❌ [Launch Check Failed] Missing constant ${c} in lib/site.ts`);
      hasErrors = true;
    }
  }
}

// 2. Check projects data for placeholder: true and generated proj-* images
const allowSampleContent = process.env.ALLOW_SAMPLE_CONTENT === 'true';
const projectsTsPath = path.join(process.cwd(), 'lib/projects-data.ts');
if (fs.existsSync(projectsTsPath)) {
  const content = fs.readFileSync(projectsTsPath, 'utf8');
  const hasPlaceholders = content.includes('placeholder: true');
  if (hasPlaceholders) {
    if (!allowSampleContent) {
      console.error('❌ [Launch Check Failed] Sample projects with placeholder: true exist and ALLOW_SAMPLE_CONTENT is not true.');
      hasErrors = true;
    } else {
      warnings.push('Sample projects with placeholder: true exist (permitted by ALLOW_SAMPLE_CONTENT=true).');
    }
  }
}

let imagesTsPath = path.join(process.cwd(), 'lib/images.tsx');
if (!fs.existsSync(imagesTsPath)) {
  imagesTsPath = path.join(process.cwd(), 'lib/images.ts');
}
if (fs.existsSync(imagesTsPath)) {
  const content = fs.readFileSync(imagesTsPath, 'utf8');
  const generatedProjMatches = content.match(/id:\s*['"]proj-[^'"]+['"],[\s\S]*?kind:\s*['"]generated['"]/g);
  if (generatedProjMatches && generatedProjMatches.length > 0) {
    if (!allowSampleContent) {
      console.error(`❌ [Launch Check Failed] ${generatedProjMatches.length} project images have kind: "generated" and ALLOW_SAMPLE_CONTENT is not true.`);
      hasErrors = true;
    } else {
      warnings.push(`${generatedProjMatches.length} project images have kind: "generated" (permitted by ALLOW_SAMPLE_CONTENT=true).`);
    }
  }
}

// 3. Robust Ledger Check
const ledgerPath = path.join(process.cwd(), 'lib/ledger.tsx');
if (fs.existsSync(ledgerPath)) {
  const content = fs.readFileSync(ledgerPath, 'utf8');

  // Check for banned claim c.market78
  if (content.includes('c.market78')) {
    console.error("❌ [Launch Check Failed] Banned claim 'c.market78' found in lib/ledger.tsx. Must use 'c.delay62'.");
    hasErrors = true;
  }

  // Parse claims robustly
  const claimRegex = /['"]([^'"]+)['"]:\s*\{([\s\S]*?)\n\s*\},/g;
  let match;
  while ((match = claimRegex.exec(content)) !== null) {
    const claimId = match[1];
    const block = match[2];

    if (claimId.startsWith('c.')) {
      const stateMatch = block.match(/state:\s*['"]([^'"]+)['"]/);
      const state = stateMatch ? stateMatch[1] : '';

      const sourceMatch = block.match(/source:\s*['"]([^'"]*)['"]/);
      const source = sourceMatch ? sourceMatch[1] : '';

      const overrideMatch = block.match(/ownerOverride:\s*(true|false)/);
      const ownerOverride = overrideMatch ? overrideMatch[1] === 'true' : false;

      // Must error when any claim with state owner-directed or ownerOverride has an empty source,
      // or if any claim has an empty source string.
      if (state === 'owner-directed' || ownerOverride || !source || source.trim() === '') {
        console.error(`❌ [Launch Check Failed] Claim "${claimId}" has state "${state}", ownerOverride: ${ownerOverride}, and source "${source}". All claims must have a verified non-empty source.`);
        hasErrors = true;
      }
    }
  }
}

// 4. Check for banned phrases in source and rendered output:
// "Owner directed", "no source supplied", "to be added", "lorem"
const BANNED_PHRASES = [
  /owner directed/i,
  /no source supplied/i,
  /to be added/i,
  /\blorem\b/i,
];

function scanFilesForBannedPhrases(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        scanFilesForBannedPhrases(fullPath);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (['.ts', '.tsx', '.js', '.jsx', '.html', '.json'].includes(ext)) {
        const text = fs.readFileSync(fullPath, 'utf8');
        for (const pattern of BANNED_PHRASES) {
          if (pattern.test(text)) {
            console.error(`❌ [Launch Check Failed] Banned phrase matching ${pattern} found in: ${fullPath}`);
            hasErrors = true;
          }
        }
      }
    }
  }
}

// Scan app, components, lib, and .next if built
scanFilesForBannedPhrases(path.join(process.cwd(), 'app'));
scanFilesForBannedPhrases(path.join(process.cwd(), 'components'));
scanFilesForBannedPhrases(path.join(process.cwd(), 'lib'));
const nextServerApp = path.join(process.cwd(), '.next/server/app');
if (fs.existsSync(nextServerApp)) {
  scanFilesForBannedPhrases(nextServerApp);
}

// Print warnings
if (warnings.length > 0) {
  console.log('⚠️  [Launch Check Warnings]:');
  warnings.forEach(w => console.log('   - ' + w));
}

if (hasErrors) {
  console.error('\n❌ launch:check failed with errors.');
  process.exit(1);
} else {
  console.log('\n✅ [Launch Check Succeeded] (with expected warnings)');
}
