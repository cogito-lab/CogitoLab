import { pillars, type Pillar } from '../data/pillars';
import type { Localized } from './i18n';

type FeaturedEntry = {
  id: string;
  data: {
    primaryPillar: Pillar;
    status: string;
    featured: boolean;
    order: number;
    title: Localized;
  };
};

/** Prefer execution, then editorial highlights; give available pillars equal visibility. */
export function selectHomeInitiatives<T extends FeaturedEntry>(entries: T[], limit = 3): T[] {
  const ranked = [...entries].sort(
    (a, b) =>
      Number(b.data.status === 'active') - Number(a.data.status === 'active') ||
      Number(b.data.featured) - Number(a.data.featured) ||
      a.data.order - b.data.order ||
      a.data.title.en.localeCompare(b.data.title.en)
  );
  const selected: T[] = [];
  for (const active of [true, false]) {
    const candidates = ranked.filter((entry) => (entry.data.status === 'active') === active);
    for (const entry of candidates) {
      if (selected.length >= limit) break;
      if (!selected.some((item) => item.data.primaryPillar === entry.data.primaryPillar))
        selected.push(entry);
    }
    for (const entry of candidates) {
      if (selected.length >= limit) break;
      if (!selected.some((item) => item.id === entry.id)) selected.push(entry);
    }
  }
  return selected;
}

type Result = { description: Localized; url?: string };
type ResultEntry = { id: string; data: { primaryPillar: Pillar; achievedResults: Result[] } };

/** Drafts, expected deliverables and project counts never contribute to impact. */
export function homeImpactGroups(
  initiatives: ResultEntry[],
  programs: ResultEntry[],
  publications: { data: { draft: boolean } }[]
) {
  return pillars
    .map((pillar) => ({
      pillar,
      publicationCount:
        pillar.id === 'research' ? publications.filter((item) => !item.data.draft).length : 0,
      results: [
        ...initiatives
          .filter((entry) => entry.data.primaryPillar === pillar.id)
          .flatMap((entry) =>
            entry.data.achievedResults.map((result) => ({
              ...result,
              sourcePath: `/initiatives/${entry.id.replace(/\.md$/, '')}`,
            }))
          ),
        ...programs
          .filter((entry) => entry.data.primaryPillar === pillar.id)
          .flatMap((entry) =>
            entry.data.achievedResults.map((result) => ({ ...result, sourcePath: pillar.route }))
          ),
      ],
    }))
    .filter((group) => group.publicationCount > 0 || group.results.length > 0);
}
