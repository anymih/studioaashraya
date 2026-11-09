import fs from 'fs';
import path from 'path';

const APP_DIR = path.join(process.cwd(), '.next/server/app');
if (!fs.existsSync(APP_DIR)) {
  console.error('❌ [CTA Check Failed] .next/server/app not found. Run "npm run build" first.');
  process.exit(1);
}

function findHtmlFiles(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtmlFiles(full, list);
    } else if (entry.name.endsWith('.html') && !entry.name.startsWith('_') && !entry.name.includes('500')) {
      list.push(full);
    }
  }
  return list;
}

const htmlFiles = findHtmlFiles(APP_DIR);
let errors = [];

for (const file of htmlFiles) {
  const relPath = path.relative(APP_DIR, file).replace(/\\/g, '/').replace(/\.html$/, '');
  const route = '/' + (relPath === 'index' ? '' : relPath);

  // Skip api routes, gated empty specifications, etc.
  if (route.startsWith('/api') || route === '/specifications') continue;

  const content = fs.readFileSync(file, 'utf8');

  // Find all links (href="...")
  const linkMatches = [...content.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1]);

  // Links to /book-a-call
  const bookLinks = linkMatches.filter(href => href.startsWith('/book-a-call'));

  // F8 threshold check: min 2, max 4 per page (except /book-a-call page itself)
  if (route !== '/book-a-call') {
    if (bookLinks.length < 2) {
      errors.push(`Route ${route} has only ${bookLinks.length} /book-a-call CTA links (minimum 2 required).`);
    } else if (bookLinks.length > 4) {
      errors.push(`Route ${route} has ${bookLinks.length} /book-a-call CTA links (maximum 4 allowed). Links: ${bookLinks.join(', ')}`);
    }
  }

  // Check that every /book-a-call link has a ?src= parameter
  for (const href of bookLinks) {
    if (route !== '/book-a-call' && !href.includes('src=')) {
      errors.push(`Route ${route} contains /book-a-call link without ?src= parameter: "${href}"`);
    }
  }

  // Check for MobileCtaBar presence
  const hasMobileBar = content.includes('data-mobile-cta') || content.includes('MobileCtaBar') || content.includes('tel:+919473031016') || content.includes('Start your project');
  if (!hasMobileBar && route !== '/book-a-call') {
    errors.push(`Route ${route} is missing MobileCtaBar.`);
  }
}

if (errors.length > 0) {
  console.error('❌ [CTA Check Failed]:');
  errors.forEach(e => console.error('   - ' + e));
  process.exit(1);
} else {
  console.log(`✅ [CTA Check Passed] Verified CTA count (min 2, max 4 per page), parameters, and MobileCtaBar across ${htmlFiles.length} pages.`);
}
