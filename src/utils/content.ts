import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

export type Person = CollectionEntry<'people'>;
export type Initiative = CollectionEntry<'initiatives'>;
export type Opportunity = CollectionEntry<'opportunities'>;
export type News = CollectionEntry<'news'>;

export async function getPeople() {
  return (await getCollection('people')).sort(
    (a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name)
  );
}

export async function getInitiatives() {
  return (await getCollection('initiatives')).sort(
    (a, b) => a.data.order - b.data.order || a.data.title.en.localeCompare(b.data.title.en)
  );
}

export async function getOpportunities() {
  return (await getCollection('opportunities')).sort(
    (a, b) => a.data.order - b.data.order || a.data.title.en.localeCompare(b.data.title.en)
  );
}

export async function getNews() {
  return (await getCollection('news'))
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => b.data.date.localeCompare(a.data.date) || a.data.order - b.data.order);
}

export const categoryOrder = [
  'faculty',
  'postdoc',
  'phd',
  'masters',
  'undergraduate',
  'collaborator',
  'staff',
  'visiting',
  'alumni',
] as const;

export const categoryLabels: Record<string, Record<Lang, string>> = {
  faculty: { en: 'Faculty', pt: 'Docentes' },
  postdoc: { en: 'Postdoctoral researchers', pt: 'Pós-doutorandos' },
  phd: { en: 'PhD researchers', pt: 'Doutorandos' },
  masters: { en: "Master's researchers", pt: 'Mestrandos' },
  undergraduate: { en: 'Undergraduate researchers', pt: 'Pesquisadores de graduação' },
  collaborator: { en: 'Collaborators', pt: 'Colaboradores' },
  staff: { en: 'Research staff', pt: 'Equipe de pesquisa' },
  visiting: { en: 'Visiting researchers', pt: 'Pesquisadores visitantes' },
  alumni: { en: 'Former members', pt: 'Ex-membros' },
};

export function entrySlug(id: string) {
  return id.replace(/\.md$/, '').split('/').pop()!;
}

export async function validateContentRelations() {
  const [people, initiatives, opportunities] = await Promise.all([
    getPeople(),
    getInitiatives(),
    getOpportunities(),
  ]);
  const personIds = new Set(people.map((entry) => entrySlug(entry.id)));
  const initiativeIds = new Set(initiatives.map((entry) => entrySlug(entry.id)));
  const areaIds = new Set((await import('@/data/areas')).allAreas.map((area) => area.id));
  const errors: string[] = [];
  const check = (owner: string, kind: string, values: string[], known: Set<string>) =>
    values.forEach((value) => {
      if (!known.has(value)) errors.push(`${owner}: unknown ${kind} "${value}"`);
    });
  people.forEach((entry) => {
    const id = `people/${entrySlug(entry.id)}`;
    check(id, 'area', entry.data.areas, areaIds);
    check(id, 'initiative', entry.data.initiatives, initiativeIds);
  });
  initiatives.forEach((entry) => {
    const id = `initiatives/${entrySlug(entry.id)}`;
    check(id, 'area', entry.data.areas, areaIds);
    check(id, 'person', entry.data.people, personIds);
  });
  opportunities.forEach((entry) => {
    const id = `opportunities/${entrySlug(entry.id)}`;
    check(id, 'area', entry.data.areas, areaIds);
    check(id, 'person', entry.data.people, personIds);
    check(id, 'initiative', [entry.data.initiative], initiativeIds);
  });
  if (errors.length) throw new Error(`Invalid content relationships:\n${errors.join('\n')}`);
}
