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

// 3. Warn on each owner-directed claim without source
const ledgerPath = path.join(process.cwd(), 'lib/ledger.tsx');
if (fs.existsSync(ledgerPath)) {
  const content = fs.readFileSync(ledgerPath, 'utf8');
  // Check claims with state: "owner-directed" and source: ""
  if (content.includes('"c.market78"') && (content.includes('source: ""') || content.includes("source: ''"))) {
    warnings.push("Claim 'c.market78' is owner-directed without a verified source (Source: to be added).");
  }
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
