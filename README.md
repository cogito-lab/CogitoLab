# Cogito Lab website

The public, bilingual website for Cogito Lab. English is the canonical language and Portuguese is available under `/pt/`. The site is a fully static Astro application designed for GitHub Pages.

## Technology

- Astro and TypeScript
- Validated Markdown content collections
- Plain, component-scoped CSS with no client framework
- Progressive enhancement for search, filters, navigation, and themes
- GitHub Actions validation and deployment

## Local development

Requirements: Node.js 22.12 or newer. Node.js 24 is used in CI.

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

## Editing content

Public content lives in `src/content/`:

- `people/` — one Markdown record per person
- `initiatives/` — research, products, extension, consulting, and internal work
- `opportunities/` — opportunities linked to initiatives and people
- `publications/` — verified publications, grouped automatically by year

See [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) for fields, categories, relationships, and examples.

## Deployment

The workflow in `.github/workflows/deploy.yml` validates pull requests and deploys `main` to GitHub Pages. In the repository settings, select **GitHub Actions** as the Pages source.

The Astro configuration calculates the GitHub project-page base path in CI. For a custom domain, set `ASTRO_SITE` and `ASTRO_BASE` in the workflow or repository environment.

## Content provenance

The people and initiatives were migrated from `cogito_lab_wiki`. Candidate-site records explicitly labeled as samples were not published. No unverified publication records were carried into the production site.
