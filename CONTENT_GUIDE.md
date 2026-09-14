# Content guide

Content is Markdown with YAML frontmatter. Astro validates every field and stops the build when a required value or relationship is malformed.

English is the official language, but public-facing text should be entered in both `en` and `pt` fields.

## People

Add `src/content/people/name-slug.md`. Supported categories are:

- `faculty`
- `postdoc`
- `phd`
- `masters`
- `undergraduate`
- `collaborator`
- `staff`
- `visiting`
- `alumni`

Categories appear only when at least one person uses them. Relationships use filenames without `.md`.

```yaml
---
name: Example Person
category: postdoc
institution: Example University
role: { en: Postdoctoral Researcher, pt: Pesquisador de Pós-Doutorado }
topic: { en: Research topic, pt: Tema de pesquisa }
summary: { en: Short biography., pt: Biografia curta. }
areas: [software-quality]
initiatives: [qualidade-software-ia]
links:
  orcid: https://orcid.org/0000-0000-0000-0000
order: 15
---
```

## Initiatives

Add `src/content/initiatives/initiative-slug.md`. The collection accepts research, applied projects, products, extension, consulting, and internal projects. Use the structured bilingual lists for established facts, work ahead, expected deliverables, and participation modes.

## Opportunities

Add `src/content/opportunities/opportunity-slug.md`. Set `initiative` to an initiative filename and `people` to zero or more person filenames. An opportunity links to its initiative; it also appears on every linked person's profile.

Use `open` only for work that is actively accepting contributors. Use `expressions-of-interest` when scope, supervision, timing, or funding must first be agreed.

## Publications

Copy `src/content/publications/_template.md` to a descriptive `.md` filename, set `draft: false`, and replace every example value with verified bibliographic data. Publications are sorted newest-first and grouped by `year` automatically. Do not add placeholder records to the live collection.

## Research areas

The stable research taxonomy and its translations live in `src/data/areas.ts`. Current identifiers are:

- `ai-for-software-engineering`
- `software-quality`
- `software-testing`
- `configurable-mobile-iot`
- `collaborative-empirical-se`
- `innovation-transfer`

The site name and repository link are centralized in `src/data/site.ts`. During GitHub Actions builds, the repository link is derived automatically from `GITHUB_REPOSITORY`.

## Images and identity

Place optimized public images under `public/images/`. Person records may use a root-relative `photo` path. The current visual identity is intentionally provisional and can be changed centrally through `src/styles/global.css`, `src/components/Logo.astro`, and the SVG files under `public/`.
