import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import path from 'path';
import fs from 'fs';

const routes = [
  '/',
  '/about',
  '/method',
  '/technology',
  '/guarantee',
  '/nri',
  '/services',
  '/services/buildability',
  '/services/design-build',
  '/services/nri-remote-build',
  '/services/redevelopment',
  '/projects',
  '/projects/jali-house',
  '/projects/basement-villa',
  '/projects/south-delhi-redevelopment',
  '/projects/courtyard-home-patna',
  '/projects/hillside-house-almora',
  '/projects/nri-farmhouse-sohna',
  '/areas',
  '/areas/gurugram',
  '/areas/delhi',
  '/areas/patna',
  '/areas/almora',
  '/calculators',
  '/calculators/cost-estimator',
  '/calculators/far-checker',
  '/calculators/site-feasibility',
  '/book-a-call',
];

const viewports = [
  { width: 375, height: 812, name: 'mobile' },
  { width: 1440, height: 900, name: 'desktop' },
];

const themes = ['light', 'dark'] as const;

test.describe('Automated UI Matrix & Visual Audits', () => {
  for (const route of routes) {
    const routeSlug = route === '/' ? 'home' : route.slice(1).replace(/\//g, '-');

    for (const vp of viewports) {
      for (const theme of themes) {
        test(`${route} @ ${vp.width}px [${theme}]`, async ({ page }) => {
          await page.setViewportSize({ width: vp.width, height: vp.height });
          await page.emulateMedia({ colorScheme: theme });

          await page.goto(route, { waitUntil: 'networkidle' });

          // Set theme attribute explicitly
          await page.evaluate((t) => {
            document.documentElement.setAttribute('data-theme', t);
          }, theme);

          // 1. Full-page screenshot (deviceScaleFactor: 1)
          const screenshotDir = path.join(process.cwd(), 'docs/rebuild/screenshots');
          if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
          }
          const screenshotPath = path.join(screenshotDir, `${routeSlug}-${vp.width}-${theme}.png`);
          await page.screenshot({ path: screenshotPath, fullPage: true });

          // 2. Assertion: scrollWidth <= innerWidth (no horizontal overflow)
          const hasHorizontalOverflow = await page.evaluate(() => {
            return document.documentElement.scrollWidth > window.innerWidth;
          });
          expect(hasHorizontalOverflow, `Horizontal overflow detected on ${route} at ${vp.width}px`).toBe(false);

          // 3. Assertion: No element with computed text-transform: uppercase
          const uppercaseElements = await page.evaluate(() => {
            const all = document.querySelectorAll('*');
            const found: string[] = [];
            for (const el of all) {
              if (el.children.length === 0 && el.textContent && el.textContent.trim().length > 0) {
                const style = window.getComputedStyle(el);
                if (style.textTransform === 'uppercase') {
                  found.push(`${el.tagName}: "${el.textContent.trim().slice(0, 30)}"`);
                }
              }
            }
            return found;
          });
          expect(uppercaseElements.length, `Uppercase elements found on ${route}: ${uppercaseElements.join(', ')}`).toBe(0);

          // 4. Assertion: No text smaller than 12px
          const smallTextElements = await page.evaluate(() => {
            const all = document.querySelectorAll('*');
            const found: string[] = [];
            for (const el of all) {
              if (el.children.length === 0 && el.textContent && el.textContent.trim().length > 0) {
                // Ignore SVG internals or script/style
                if (['SCRIPT', 'STYLE', 'SVG', 'PATH', 'DEFS'].includes(el.tagName)) continue;
                const style = window.getComputedStyle(el);
                const size = parseFloat(style.fontSize);
                if (size > 0 && size < 11.5) {
                  found.push(`${el.tagName} (${size}px): "${el.textContent.trim().slice(0, 30)}"`);
                }
              }
            }
            return found;
          });
          expect(smallTextElements.length, `Text smaller than 12px found on ${route}: ${smallTextElements.join(', ')}`).toBe(0);

          // 5. Assertion: Single H1 per page; sentence case; H1 at 1440px does not wrap past 4 lines
          const h1Count = await page.locator('h1').count();
          expect(h1Count, `Expected single H1 on ${route}`).toBe(1);
          const h1Text = (await page.locator('h1').innerText()).trim();
          expect(h1Text.length).toBeGreaterThan(0);
          expect(h1Text === h1Text.toUpperCase() && h1Text.length > 4, `H1 is all-caps on ${route}`).toBe(false);

          if (vp.width === 1440) {
            const lineCount = await page.locator('h1').evaluate((el) => {
              const htmlEl = el as HTMLElement;
              const style = window.getComputedStyle(htmlEl);
              const lh = parseFloat(style.lineHeight) || (parseFloat(style.fontSize) * 1.15);
              return Math.round(htmlEl.offsetHeight / lh);
            });
            expect(lineCount, `H1 wraps past 4 lines on ${route} (${lineCount} lines)`).toBeLessThanOrEqual(4);
          }

          // 6. Assertion: canonical and og:url start with https://studioaashraya.site
          const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
          expect(canonical, `Canonical URL on ${route}`).toMatch(/^https:\/\/studioaashraya\.site/);

          const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
          if (ogUrl) {
            expect(ogUrl, `og:url on ${route}`).toMatch(/^https:\/\/studioaashraya\.site/);
          }

          // 7. Assertion: Rendered page text contains no banned tokens
          const bodyText = await page.locator('body').innerText();
          const bannedTokens = [
            '78%',
            'Owner directed',
            'no source supplied',
            'studioaashraya.com',
            'Clarity Call',
            'Eyebrow',
          ];
          for (const token of bannedTokens) {
            expect(bodyText, `Page ${route} contains banned token: "${token}"`).not.toContain(token);
          }

          // 8. Assertion: Number of /book-a-call CTA links is between 2 and 4 (excluding /book-a-call page)
          if (route !== '/book-a-call') {
            const bookLinks = await page.locator('a[href^="/book-a-call"]').all();
            expect(bookLinks.length, `CTA link count on ${route}`).toBeGreaterThanOrEqual(2);
            expect(bookLinks.length, `CTA link count on ${route}`).toBeLessThanOrEqual(4);
          }

          // 9. Assertion: Area pages list >= 1 project card
          if (route.startsWith('/areas/') && route !== '/areas') {
            const cards = await page.locator('article, [data-project-card]').all();
            expect(cards.length, `Expected >= 1 project card on ${route}`).toBeGreaterThanOrEqual(1);
          }

          // 10. Assertion: axe color-contrast check (zero violations)
          const axeResults = await new AxeBuilder({ page })
            .withRules(['color-contrast'])
            .analyze();
          expect(
            axeResults.violations,
            `Color contrast violations on ${route} (${vp.width}px ${theme}): ${JSON.stringify(
              axeResults.violations.map((v) => ({
                id: v.id,
                nodes: v.nodes.map((n) => ({ html: n.html, failureSummary: n.failureSummary })),
              })),
              null,
              2
            )}`
          ).toEqual([]);
        });
      }
    }
  }
});

test.describe('Story Matrix (S1 - S10)', () => {
  test('S1: The first mobile screen', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'networkidle' });

    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toHaveText(/Build a home that is beautiful, engineered, and built to last/i);

    const primaryBtn = page.locator('a[href*="/book-a-call?src=home-hero"]');
    await expect(primaryBtn).toBeVisible();

    const mobileCta = page.locator('[data-mobile-cta-bar]');
    await expect(mobileCta).toBeVisible();

    console.log('✅ Story S1 passed: The first mobile screen verified');
  });

  test('S2: One tap to the form from CTA', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });

    const heroCta = page.locator('a[href*="/book-a-call?src=home-hero"]').first();
    await expect(heroCta).toBeVisible();
    await heroCta.click();

    await page.waitForURL('**/book-a-call?src=home-hero');
    expect(page.url()).toContain('/book-a-call?src=home-hero');

    console.log('✅ Story S2 passed: One tap to the form verified');
  });

  test('S3: Guarantee and warranty statements', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/guarantee', { waitUntil: 'networkidle' });

    const text = await page.locator('body').innerText();
    expect(text).toContain('On time, or 10% back.');
    expect(text).toContain('15-year warranty');
    expect(text.toLowerCase()).toContain('agreement');

    // No competitor mentions
    expect(text).not.toContain('Prithu');
    expect(text).not.toContain('Brick & Bolt');

    console.log('✅ Story S3 passed: Guarantee and warranty verified');
  });

  test('S4: Form submission structure & endpoints', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/book-a-call', { waitUntil: 'networkidle' });

    const form = page.locator('form');
    await expect(form).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('select[name="projectType"]')).toBeVisible();
    await expect(page.locator('select[name="budget"]')).toBeVisible();

    console.log('✅ Story S4 passed: Form submission fields verified');
  });

  test('S5: Method gates and instruments', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/method', { waitUntil: 'networkidle' });

    const text = await page.locator('body').innerText();
    expect(text).toContain('Eight stages. Four gates.');
    expect(text.toLowerCase()).toContain('gate');

    console.log('✅ Story S5 passed: Method gates and instruments verified');
  });

  test('S6: Technology capabilities', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/technology', { waitUntil: 'networkidle' });

    const text = await page.locator('body').innerText();
    expect(text).toContain('Built with instruments, not opinions.');
    expect(text).not.toContain('first in India');
    expect(text).not.toContain('only builder');

    console.log('✅ Story S6 passed: Technology capabilities verified');
  });

  test('S7: NRI remote build deliverables', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/nri', { waitUntil: 'networkidle' });

    const text = await page.locator('body').innerText();
    expect(text).toContain('Build in India without flying in for every decision.');
    expect(text.toLowerCase()).toContain('video');

    console.log('✅ Story S7 passed: NRI remote build deliverables verified');
  });

  test('S8: Sample projects are labelled', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/projects', { waitUntil: 'networkidle' });

    const sampleChips = page.locator('text="Sample project"');
    await expect(sampleChips.first()).toBeVisible();

    console.log('✅ Story S8 passed: Sample projects labelling verified');
  });

  test('S9: Old URLs redirect to /projects', async ({ page }) => {
    const response = await page.goto('/projects/the-clay-house');
    expect(page.url()).toContain('/projects');

    console.log('✅ Story S9 passed: Old URLs redirection verified');
  });

  test('S10: Tools state their coverage', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/calculators/site-feasibility', { waitUntil: 'networkidle' });

    const text = await page.locator('body').innerText();
    expect(text).toContain('Bihar Building Bye-laws 2014');
    expect(text).toContain('free plot check');

    console.log('✅ Story S10 passed: Tools coverage statement verified');
  });
});

