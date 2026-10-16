import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const canonical = readFileSync('dist/index.html', 'utf8').match(
  /rel="canonical" href="([^"]+)"/
)![1];
const base = new URL(canonical).pathname.replace(/\/$/, '');
const route = (path: string) => `${base}${path}`;
const walk = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]
  );
const paths = walk('dist')
  .filter((file) => file.endsWith('.html'))
  .map(
    (file) =>
      '/' +
      relative('dist', file)
        .replaceAll('\\', '/')
        .replace(/index\.html$/, '')
  );

test('all generated pages have language parity, metadata and a semantic heading hierarchy', async ({
  page,
  request,
}) => {
  test.setTimeout(120000);
  for (const path of paths) {
    await page.goto(route(path));
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute(
      'lang',
      path.startsWith('/pt/') ? 'pt-BR' : 'en'
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
    const headings = await page
      .locator('main :is(h1,h2,h3,h4,h5,h6)')
      .evaluateAll((nodes) =>
        nodes.map((node) => ({ level: Number(node.tagName[1]), text: node.textContent?.trim() }))
      );
    for (let index = 1; index < headings.length; index++)
      expect(headings[index].level, `${path}: ${headings[index].text}`).toBeLessThanOrEqual(
        headings[index - 1].level + 1
      );
    const alternate = await page.locator('.header-actions .language').getAttribute('href');
    expect((await request.get(alternate!)).status(), alternate!).toBe(200);
    if (await page.locator('meta[name="robots"][content="noindex"]').count()) {
      await expect(page.locator('link[rel="alternate"]')).toHaveCount(0);
    } else {
      await expect(page.locator('link[rel="alternate"][hreflang="pt-BR"]')).toHaveAttribute(
        'href',
        /\/pt\//
      );
    }
  }
});

test('WCAG automatic checks pass in light and dark themes on all generated pages', async ({
  page,
}) => {
  test.setTimeout(240000);
  for (const path of paths) {
    for (const theme of ['light', 'dark']) {
      await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: theme as 'light' | 'dark' });
      await page.goto(route(path));
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(
        results.violations.map((violation) => ({
          id: violation.id,
          nodes: violation.nodes.map((node) => ({
            target: node.target,
            summary: node.failureSummary,
          })),
        })),
        `${path} (${theme})`
      ).toEqual([]);
    }
  }
});

test('keyboard navigation, modal focus isolation and skip link work', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route('/pt/initiatives'));
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  const opener = page.locator('[data-menu-open]');
  await opener.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  expect(await page.locator('main').evaluate((node) => (node as HTMLElement).inert)).toBe(true);
  await expect(dialog.locator('a').first()).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.locator('a').last()).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(dialog.locator('a').first()).toBeFocused();
  const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(audit.violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
  expect(await page.locator('main').evaluate((node) => (node as HTMLElement).inert)).toBe(false);
});

test('static catalog remains available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:4322${route('/pt/initiatives')}`);
    await expect(page.locator('main [data-filter-item]:visible')).toHaveCount(16);
    await expect(page.locator('[data-filter-group]:visible')).toHaveCount(2);
    await expect(page.locator('[data-filter-root]')).toBeHidden();
    await page.locator('main .card__link').first().click();
    await expect(page.locator('main h1')).toBeVisible();
  } finally {
    await context.close();
  }
});
