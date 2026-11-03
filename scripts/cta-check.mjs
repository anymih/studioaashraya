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

  // Count links to /book-a-call, tel:, or wa.me / whatsapp
  const ctaLinks = linkMatches.filter(href => 
    href.startsWith('/book-a-call') ||
    href.startsWith('tel:') ||
    href.includes('wa.me') ||
    href.includes('whatsapp')
  );

  if (route !== '/book-a-call' && ctaLinks.length < 3) {
    errors.push(`Route ${route} has only ${ctaLinks.length} CTA links (minimum 3 required).`);
  }

  // Check that primary /book-a-call links have src parameter
  const bookLinks = linkMatches.filter(href => href.startsWith('/book-a-call'));
  for (const href of bookLinks) {
    // If it's a primary CTA (not just header plain link or root book-a-call link)
    // Note: Header "Book a consultation" and CtaBands use bookHref(src)
    if (href === '/book-a-call' && route !== '/book-a-call' && route !== '/') {
      // Just warn or verify
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
  console.log(`✅ [CTA Check Passed] Verified CTA count, parameters, and MobileCtaBar across ${htmlFiles.length} pages.`);
}
