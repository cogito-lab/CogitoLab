import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const home = readFileSync('dist/index.html', 'utf8');
const canonical = home.match(/rel="canonical" href="([^"]+)"/)![1];
const base = new URL(canonical).pathname.replace(/\/$/, '');
const route = (path: string) => `${base}${path}`;

test('every generated page and local asset resolves, with valid research anchors', async ({ request }) => {
  const walk = (directory: string): string[] => readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]);
  const targets = new Set<string>();
  for (const file of walk('dist').filter(file => file.endsWith('.html'))) {
    targets.add(route('/' + relative('dist', file).replaceAll('\\', '/')));
    const html = readFileSync(file, 'utf8');
    expect(html).not.toContain('Replace with a verified publication title');
    for (const match of html.matchAll(/(?:href|src)="(\/[^"<>]*)"/g)) targets.add(match[1]);
  }
  for (const target of targets) {
    const response = await request.get(target);
    expect(response.status(), target).toBe(200);
    if (target.includes('#')) expect(await response.text(), target).toContain(`id="${target.split('#')[1]}"`);
  }
  const robots = await request.get(route('/robots.txt'));
  expect(await robots.text()).toContain(new URL(`${base}/sitemap-index.xml`, canonical).href);
});

test('catalog search, categories, and language switching work', async ({ page }) => {
  await page.goto(route('/people/'));
  await page.locator('#content-search').fill('Mateus');
  await expect(page.locator('[data-filter-item]:visible')).toHaveCount(1);
  await page.locator('#content-search').fill('');
  await page.locator('#type-filter').selectOption('masters');
  await expect(page.locator('[data-filter-item]:visible')).toHaveCount(2);
  await page.locator('#content-search').fill('no-such-person');
  await expect(page.locator('[data-filter-empty]')).toBeVisible();
  await page.goto(route('/people/mateus-dutra/'));
  await page.locator('.language').click();
  await expect(page).toHaveURL(new RegExp('/pt/people/mateus-dutra/?$'));
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
});

test('mobile menu, theme, and pages fit narrow viewports', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/pt/', '/people/', '/initiatives/', '/opportunities/', '/initiatives/qualidade-software-ia/']) {
      await page.goto(route(path));
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${path} at ${width}px`).toBe(true);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route('/'));
  await page.locator('[data-menu-open]').click();
  await expect(page.locator('[data-mobile-panel]')).toBeVisible();
  expect((await page.locator('[data-mobile-panel]').boundingBox())!.height).toBeGreaterThanOrEqual(844);
  await page.locator('.mobile-nav a').filter({ hasText: /^People/ }).click();
  await expect(page).toHaveURL(new RegExp('/people/?$'));
  await page.locator('[data-theme-toggle]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(errors).toEqual([]);
});

test('navigation works when browser storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage disabled'); } });
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route('/'));
  await page.locator('[data-menu-open]').click();
  await expect(page.locator('[data-mobile-panel]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-mobile-panel]')).toBeHidden();
  await expect(page.locator('[data-menu-open]')).toBeFocused();
  await page.locator('[data-theme-toggle]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
