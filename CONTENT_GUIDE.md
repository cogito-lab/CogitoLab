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

### Classification and migration (stage 1)

- `primaryPillar` is required: `research`, `extension`, or `technology`. Optional `relatedPillars` contains distinct secondary pillars, never the primary pillar. Areas describe themes and do not imply a research classification.
- `entityType` is required: `program`, `research-project`, `extension-project`, `technology-project`, `tool`, `product`, `internal-project`, `initiative`, or `technology-solution`. VUEI and Vertentes ScaleUp use `initiative` while their specific institutional role remains unconfirmed. `kind` and `kindLabel` remain for compatibility with existing pages.
- `status` remains `active`, `completed`, `planning`, `paused`, or legacy `open`. Collaboration availability belongs to opportunities. Keep unconfirmed `open` records unchanged; do not infer execution from funding, a working artifact, or recruitment.
- The approved migration marks AgroHub as `active`. AgroCogito, NotificationHub (not started), Central Inteligente de Atendimento, Automação para PMEs, and Gestão Digital para Pequenos Produtores retain `open`. No secondary pillars, external organizations, development stages, or additional relationships were inferred.
- `program` references a file in `src/content/programs/`. Cogito Transfer has four members (P1–P4), declared only in their initiative records. Obtain members through the initiative's `program` field instead of maintaining a second list. Program records contain bilingual `name`, `description`, `objectives`, `institutionalStatus`, a `primaryPillar`, and optional `achievedResults`. Do not infer formal approval or dates.
- `relatedInitiatives` contains `{ initiative: stable-slug, relation: uses }` objects. Supported relations: `originates`, `uses`, `complements`, `applies-knowledge-from`, `linked-to`. References must exist, cannot refer to themselves, and must not repeat the same target. Do not create reciprocal copies; consumers can resolve incoming links.
- `expectedResults: { en: [...], pt: [...] }` replaces `deliverables`. `achievedResults` is an optional array of objects with bilingual `description` and optional `type`, ISO `date`, absolute `url`, and `indicator: { value: 12, unit: { en: ..., pt: ... } }`. Record achieved results only with explicit evidence. Existing planned deliverables were migrated to expected results; no completed results were inferred. `defined` may be omitted when there are no established facts to list.
- Optional `developmentStage`: `concept`, `proof-of-concept`, `prototype`, `mvp`, `product-in-development`, `available`, `deployed`. It does not replace execution status.
- Optional `organization` contains `name`, `relationship` (`client`, `development-partner`, `collaborating-institution`, `funder`) and `disclosure` (`authorized`, `anonymous`, `restricted`). `website` and `logo` require `authorized`. Anonymous disclosure requires a bilingual generic `publicLabel`; restricted relationships cannot have public labels. Use `publicOrganization` from `src/utils/relations.ts` for rendering; never render raw private fields. Organization and development-stage fields require the technology pillar, primary or secondary. Do not commit confidential data merely because rendering is restricted: Markdown sources may be public.

Existing people, opportunities and publications keep their explicit links. News optionally accepts `initiatives`, `people` and `areas`. Historical publications need no initiative link. Never infer links from authors, dates or keywords.

Relationship validation runs when building the site through `validateContentRelations`; errors identify the responsible collection and record. Schema validation runs with `npm run check`. Run `npm test`, `npm run build` and `npm run test:browser` (the latter serves the built `dist` artifact, including the configured GitHub Pages base).

## Homepage and navigation (stage 2)

The main navigation presents Research, Extension, Projects & Solutions, People, Publications, News, Opportunities and About. The transversal Initiatives catalog remains linked from the homepage and footer. Both language versions use the same records and preserve the GitHub Pages base path.

Pillar titles, descriptions and actions live in `src/data/pillars.ts`. The homepage selects up to three initiatives, prioritizing `active`, then `featured`, editorial `order` and title. Within the active set, it seeks different primary pillars before filling additional slots. It never promotes a planned editorial highlight above an active initiative. Homepage opportunities prioritize `open`, then expressions of interest; closed opportunities are excluded.

The impact section counts only non-draft publications and explicitly includes members' historical work, without attributing it to current projects. Other results come only from `achievedResults` on initiatives and programs, grouped by their primary pillar. An empty pillar is omitted; when all groups are empty, the whole section is omitted. Expected results, initiative counts, external organizations and development stages are never treated as completed results. No extension or technology achievements have been added during this stage.

`/projects` and `/pt/projects` link to canonical initiative details. Their initial listing was expanded in stage 4 as described below.

## Research and extension pages (stage 3)

Research preserves all six area identifiers and displays every explicitly linked initiative, without truncating each area's list. Only `entityType: research-project` enters “Research projects”; other linked entities enter “Applications and related initiatives”. Empty groups are omitted. A thematic link, including innovation and transfer, never promotes an initiative to a scientific project.

Extension reads program descriptions, optional bilingual `audience`, objectives and institutional status from the program collection. Membership comes from the initiative's `program` reference, independently of `extensionCode`. Extension initiatives without a program appear separately. Execution status remains distinct from reported institutional registration. Planned activities use `expectedResults`; result sections use only `achievedResults` and are omitted when empty. See `EXTENSION_CONTENT.md` for the editorial treatment of Cogito Transfer and independent collaborations.

## Projects and Solutions (stage 4)

The technology catalog includes initiatives whose primary pillar is `technology` and those explicitly listing it in `relatedPillars`, once per record. Sorting prioritizes `active`, then `completed`, then other states (including legacy `open`); editorial `order` and English title break ties. This ordering currently applies to Projects and Solutions; the transversal catalog is addressed in stage 5.

Filters combine the normalized `entityType`, execution `status` and textual search. Options are derived from the records present. Clearing filters restores the initial ordering. Existing pages retain their legacy kind filters. The page reuses `InitiativeCard` with optional technology details: known development stages use bilingual labels, and organizations are projected through `publicOrganization` before rendering. Only authorized names, websites and logos are exposed; anonymous relations show only the approved public label and relationship type, and restricted relations are omitted. A funder remains identified as a funder, without implying a client relationship.

The technological-results section uses only `achievedResults`, with artifact links when supplied and canonical initiative links otherwise. It is omitted when empty. No development stages, organizations or completed technology results were confirmed for this stage, so all corresponding fields remain unfilled and their display is hidden. Keep those fields optional until information is verified.

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

## Extension

Cogito Transfer is presented at `/extension/` and `/pt/extension/`. Its four initiative records use `kind: extension` and `extensionCode: P1` through `P4`. These are meeting identifiers, not institutional registration numbers. Keep project registration, activity planning and program approval distinct. See EXTENSION_CONTENT.md for provenance.
