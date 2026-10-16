import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const home = readFileSync('dist/index.html', 'utf8');
const canonical = home.match(/rel="canonical" href="([^"]+)"/)![1];
const base = new URL(canonical).pathname.replace(/\/$/, '');
const route = (path: string) => `${base}${path}`;

test('every generated page and local asset resolves, with valid research anchors', async ({
  request,
}) => {
  const walk = (directory: string): string[] =>
    readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
      entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]
    );
  const targets = new Set<string>();
  for (const file of walk('dist').filter((file) => file.endsWith('.html'))) {
    targets.add(route('/' + relative('dist', file).replaceAll('\\', '/')));
    const html = readFileSync(file, 'utf8');
    expect(html).not.toContain('Replace with a verified publication title');
    for (const match of html.matchAll(/(?:href|src)="(\/[^"<>]*)"/g)) targets.add(match[1]);
  }
  for (const target of targets) {
    const response = await request.get(target);
    expect(response.status(), target).toBe(200);
    if (target.includes('#'))
      expect(await response.text(), target).toContain(`id="${target.split('#')[1]}"`);
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
  page.on('pageerror', (error) => errors.push(error.message));
  for (const width of [320, 390, 1024, 1201, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      '/',
      '/pt/',
      '/people/',
      '/initiatives/',
      '/opportunities/',
      '/research/',
      '/pt/research/',
      '/extension/',
      '/pt/extension/',
      '/projects/',
      '/pt/projects/',
      '/initiatives/qualidade-software-ia/',
    ]) {
      await page.goto(route(path));
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        `${path} at ${width}px`
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route('/'));
  await page.locator('[data-menu-open]').click();
  await expect(page.locator('[data-mobile-panel]')).toBeVisible();
  expect((await page.locator('[data-mobile-panel]').boundingBox())!.height).toBeGreaterThanOrEqual(
    844
  );
  await page
    .locator('.mobile-nav a')
    .filter({ hasText: /^People/ })
    .click();
  await expect(page).toHaveURL(new RegExp('/people/?$'));
  await page.locator('[data-theme-toggle]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(errors).toEqual([]);
});

test('home pillars, classified highlights and verified impact work in both languages', async ({
  page,
}) => {
  for (const prefix of ['', '/pt']) {
    await page.goto(route(`${prefix}/`));
    await expect(page.locator('main > section').nth(1)).toHaveAttribute('id', 'pillars');
    await expect(page.locator('[data-pillar-card]')).toHaveCount(3);
    for (const [pillar, target] of [
      ['research', '/research'],
      ['extension', '/extension'],
      ['technology', '/projects'],
    ]) {
      const link = page.locator(`[data-pillar-card="${pillar}"] a`);
      await expect(link).toHaveAttribute('href', route(`${prefix}${target}`));
      await link.click();
      await expect(page.locator('main h1')).toBeVisible();
      await expect(page).toHaveURL(new RegExp(`${prefix}${target}/?$`));
      await page.goto(route(`${prefix}/`));
    }
    const highlights = page.locator('#featured [data-filter-item]');
    await expect(highlights).toHaveCount(3);
    expect(
      await highlights.evaluateAll((cards) => cards.map((card) => card.getAttribute('data-status')))
    ).toEqual(['active', 'active', 'active']);
    expect(
      new Set(
        await highlights.evaluateAll((cards) =>
          cards.map((card) => card.getAttribute('data-pillar'))
        )
      ).size
    ).toBe(3);
    await expect(highlights.first()).toContainText(
      prefix ? 'Projeto de pesquisa' : 'Research project'
    );
    await expect(page.locator('[data-impact-pillar]')).toHaveCount(1);
    await expect(page.locator('[data-impact-pillar="research"]')).toContainText(
      prefix ? 'incluindo trabalhos anteriores' : 'including work predating'
    );
    await expect(page.locator('#featured a.button')).toHaveAttribute(
      'href',
      route(`${prefix}/initiatives`)
    );
    await expect(
      page.locator('.site-footer a').filter({ hasText: prefix ? /^Iniciativas$/ : /^Initiatives$/ })
    ).toHaveAttribute('href', route(`${prefix}/initiatives`));
    const navLinks = await page
      .locator('.desktop-nav a')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    expect(navLinks).toEqual(
      [
        'research',
        'extension',
        'projects',
        'people',
        'publications',
        'news',
        'opportunities',
        'about',
      ].map((path) => route(`${prefix}/${path}`))
    );
  }
});

test('projects preserve language, active navigation and initiative detail links', async ({
  page,
}) => {
  await page.goto(route('/projects'));
  await expect(page.locator('.desktop-nav a[aria-current="page"]')).toHaveAttribute(
    'href',
    route('/projects')
  );
  await expect(page.locator('main [data-filter-item]')).toHaveCount(7);
  await page.locator('.language').click();
  await expect(page).toHaveURL(new RegExp('/pt/projects/?$'));
  await expect(page.locator('main h1')).toHaveText('Projetos e Soluções');
  await page.locator('main [data-filter-item]').first().locator('.card__link').click();
  await expect(page).toHaveURL(new RegExp('/pt/initiatives/'));
});

test('technology filters combine type, status and search while preserving execution order', async ({
  page,
}) => {
  for (const prefix of ['', '/pt']) {
    await page.goto(route(`${prefix}/projects`));
    const cards = page.locator('#technology-catalog [data-filter-item]:visible');
    await expect(cards).toHaveCount(7);
    expect(
      await cards.evaluateAll((items) => items.map((item) => item.getAttribute('data-status')))
    ).toEqual(['active', 'active', 'open', 'open', 'open', 'open', 'open']);
    await page.locator('#type-filter').selectOption('technology-solution');
    await page.locator('#status-filter').selectOption('open');
    await expect(cards).toHaveCount(2);
    await page.locator('#content-search').fill('NotificationHub');
    await expect(cards).toHaveCount(1);
    await expect(cards.locator('.card__link')).toHaveAttribute(
      'href',
      route(`${prefix}/initiatives/notificationhub`)
    );
    await page.locator('#content-search').fill('');
    await page.locator('#type-filter').selectOption('product');
    await expect(cards).toHaveCount(0);
    await expect(page.locator('[data-filter-empty]')).toBeVisible();
    await page.locator('[data-filter-clear]').click();
    await expect(cards).toHaveCount(7);
    await expect(page.locator('[data-filter-empty]')).toBeHidden();
    await expect(page.locator('#content-search')).toBeFocused();
    await expect(cards.first()).toContainText('AgroHub');
    await expect(
      page.locator('[data-development-stage], [data-public-organization], #technology-results')
    ).toHaveCount(0);
  }
});

test('navigation works when browser storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Storage disabled');
      },
    });
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

test('transversal catalog combines all filters and hides empty groups', async ({ page }) => {
  for (const prefix of ['', '/pt']) {
    await page.goto(route(`${prefix}/initiatives`));
    const cards = page.locator('main [data-filter-item]:visible');
    const groups = page.locator('[data-filter-group]:visible');
    await expect(cards).toHaveCount(16);
    expect(
      await groups.evaluateAll((items) =>
        items.map((item) => item.getAttribute('data-filter-group'))
      )
    ).toEqual(['active', 'other']);
    await expect(page.locator('[data-filter-group="active"] [data-filter-item]')).toHaveCount(5);
    const links = await cards
      .locator('.card__link')
      .evaluateAll((items) => items.map((item) => item.getAttribute('href')));
    expect(new Set(links).size).toBe(16);
    await expect(page.locator('#area-filter option')).toHaveCount(7);
    await page.locator('#pillar-filter').selectOption('technology');
    await page.locator('#type-filter').selectOption('technology-project');
    await page.locator('#status-filter').selectOption('open');
    await page.locator('#area-filter').selectOption('innovation-transfer');
    await expect(cards).toHaveCount(3);
    await expect(groups).toHaveCount(1);
    await page.locator('#content-search').fill('AgroCogito');
    await expect(cards).toHaveCount(1);
    await expect(cards.locator('.card__link')).toHaveAttribute(
      'href',
      route(`${prefix}/initiatives/agrocogito`)
    );
    await page.locator('#status-filter').selectOption('completed');
    await expect(cards).toHaveCount(0);
    await expect(groups).toHaveCount(0);
    await expect(page.locator('[data-filter-empty]')).toBeVisible();
    await page.locator('[data-filter-clear]').click();
    await expect(cards).toHaveCount(16);
    await expect(groups).toHaveCount(2);
    await expect(page.locator('#pillar-filter')).toHaveValue('');
    await expect(page.locator('#area-filter')).toHaveValue('');
    await expect(page.locator('#content-search')).toBeFocused();
    await expect(page.locator('main .program-link a')).toHaveCount(4);
    await expect(page.locator('main .program-link a').first()).toHaveAttribute(
      'href',
      route(`${prefix}/extension#cogito-transfer`)
    );
    // Simulate explicit secondary membership without altering the content sources.
    await cards.first().evaluate((card) => {
      (card as HTMLElement).dataset.pillars = 'research technology';
    });
    await page.locator('#pillar-filter').selectOption('technology');
    await expect(cards).toHaveCount(8);
    const secondaryLinks = await cards
      .locator('.card__link')
      .evaluateAll((items) => items.map((item) => item.getAttribute('href')));
    expect(new Set(secondaryLinks).size).toBe(8);
  }
});

test('research preserves six areas and separates scientific projects from applications', async ({
  page,
}) => {
  for (const prefix of ['', '/pt']) {
    await page.goto(route(`${prefix}/research`));
    await expect(page.locator('.area-section')).toHaveCount(6);
    for (const link of await page.locator('.research-index a').all()) {
      const anchor = await link.getAttribute('href');
      await expect(page.locator(anchor!)).toHaveCount(1);
      await expect(link).toHaveAttribute('aria-label', /.+/);
    }
    const science = page.locator('[data-research-group="scientific"] [data-filter-item]');
    expect(await science.count()).toBeGreaterThan(0);
    await expect(
      page.locator(
        '[data-research-group="scientific"] [data-filter-item]:not([data-entity-type="research-project"])'
      )
    ).toHaveCount(0);
    await expect(
      page.locator('[data-research-group="applications"] [data-entity-type="research-project"]')
    ).toHaveCount(0);
    const innovation = page.locator('#innovation-transfer');
    await expect(innovation.locator('[data-research-group="scientific"]')).toHaveCount(0);
    await expect(
      innovation.locator('[data-research-group="applications"] [data-filter-item]')
    ).toHaveCount(9);
    await expect(innovation.locator('[data-research-group="applications"] h3')).toHaveText(
      prefix ? 'Aplicações e iniciativas relacionadas' : 'Applications and related initiatives'
    );
    for (const group of await page.locator('[data-research-group]').all()) {
      expect(await group.locator('[data-filter-item]').count()).toBeGreaterThan(0);
      await expect(group.locator('h4').first()).toBeVisible();
    }
    await science.first().locator('.card__link').click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/initiatives/`));
  }
});

test('extension derives program membership and keeps independent collaborations separate', async ({
  page,
}) => {
  for (const prefix of ['', '/pt']) {
    await page.goto(route(`${prefix}/extension`));
    const program = page.locator('[data-program="cogito-transfer"]');
    await expect(program.locator('h2')).toHaveText('Cogito Transfer');
    await expect(program.locator('[data-program-project]')).toHaveCount(4);
    expect(
      await program
        .locator('[data-program-project]')
        .evaluateAll((items) => items.map((item) => item.getAttribute('data-program-project')))
    ).toEqual([
      'pilotos-transferencia',
      'automacao-transformacao-digital',
      'clinica-qualidade',
      'formacao-comunicacao-transferencia',
    ]);
    await expect(program.locator('[data-status="planning"]')).toHaveCount(4);
    await expect(program.locator('.activity-preview')).toHaveCount(4);
    await expect(program.locator('#program-status')).toContainText(
      prefix ? 'informados como registrados' : 'reported as registered'
    );
    await expect(program.locator('.project-note')).toContainText(
      prefix ? 'não números de registro institucional' : 'not institutional registration numbers'
    );
    const other = page.locator('#other-extension');
    await expect(other.locator('[data-filter-item]')).toHaveCount(2);
    await expect(other.locator('[data-status="active"]')).toHaveCount(1);
    await expect(other.locator('[data-status="planning"]')).toHaveCount(1);
    await expect(other).toContainText(
      prefix ? 'escopo operacional pendente' : 'operational scope pending'
    );
    await expect(other).toContainText(prefix ? 'Participação colaborativa' : 'Collaborative role');
    await expect(page.locator('#extension-results, [data-program-results]')).toHaveCount(0);
    await program.locator('[data-program-project]').first().locator('.card__link').click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/initiatives/pilotos-transferencia/?$`));
  }
  await page.goto(route('/extension'));
  await page.locator('.language').click();
  await expect(page).toHaveURL(new RegExp('/pt/extension/?$'));
});
