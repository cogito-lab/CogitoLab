# Cogito Lab website

The public, bilingual website for Cogito Lab. English is the canonical language and Portuguese is available under `/pt/`. The site is a fully static Astro application designed for GitHub Pages.

## Technology

- Astro and TypeScript
- Validated Markdown content collections
- Plain, component-scoped CSS with no client framework
- Progressive enhancement for search, filters, navigation, and themes
- GitHub Actions validation and deployment

## Local development

Use Node.js 24 (see `.nvmrc`), which is also used in CI. Older Node.js installations such as version 20 cannot run the current Astro build.

```bash
npm install
npm run dev
```

Before opening a pull request:

```bash
npm run check
npm test
npm run build
```

Browser smoke tests check the built site, including all internal links, research anchors, search, language switching, mobile layouts, and navigation when browser storage is unavailable:

```bash
npx playwright install chromium
npm run test:browser
```

Run `npm run build` before the browser tests. They also support a build with a GitHub Pages base path. `TEST_CHROME_PATH` can optionally point to an installed Chrome executable.

## Editing content

Public content lives in `src/content/`:

- `people/` — one Markdown record per person
- `initiatives/` — research, products, extension, consulting, and internal work
- `opportunities/` — opportunities linked to initiatives and people
- `publications/` — verified publications, grouped automatically by year

See [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) for fields, categories, relationships, and examples.

## Deployment

The workflow in `.github/workflows/deploy.yml` validates pull requests and publishes the same tested build when changes reach `main`.

1. Open [the repository's Pages settings](https://github.com/cogito-lab/CogitoLab/settings/pages).
2. Under **Build and deployment → Source**, select **GitHub Actions**. The repository already has a workflow; no template or `gh-pages` branch is needed.
3. Commit and push the application changes to `main`, or merge the pull request containing them.
4. Open [Actions](https://github.com/cogito-lab/CogitoLab/actions/workflows/deploy.yml). You can also select **Run workflow → main** to deploy manually.
5. Wait for both `validate` and `deploy` to finish successfully. A successful pull-request validation alone does not publish the website.
6. Visit [the English website](https://cogito-lab.github.io/CogitoLab/) or [the Portuguese website](https://cogito-lab.github.io/CogitoLab/pt/).

The deployment environment is `github-pages`; if GitHub asks for environment approval, a repository administrator must approve that deployment. Leave HTTPS enforcement enabled in Pages settings. A deployment error saying `Ensure GitHub Pages has been enabled` means step 2 has not yet been completed.

The Astro configuration calculates `/CogitoLab` automatically in CI. For a custom domain, configure it in Pages settings and define repository Actions variables `ASTRO_SITE` (the complete HTTPS origin) and `ASTRO_BASE` (`/` when hosted at the domain root). The workflow passes these variables to the build. No tokens or backend service are required.

## Content provenance

The people and initiatives were migrated from the former `cogito_lab_wiki`. All current content lives in `src/content/`; the removed candidate projects and wiki are not build or runtime dependencies. Candidate-site records explicitly labeled as samples were not published. No unverified publication records were carried into the production site.
