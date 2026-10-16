import { validateRelations } from './relations';
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

export async function getPrograms() {
  return getCollection('programs');
}

export async function validateContentRelations() {
  const [people, initiatives, opportunities, programs, publications, news] = await Promise.all([
    getPeople(),
    getInitiatives(),
    getOpportunities(),
    getPrograms(),
    getCollection('publications'),
    getCollection('news'),
  ]);
  const areas = (await import('@/data/areas')).allAreas.map((area) => area.id);
  const errors = validateRelations(
    { people, initiatives, opportunities, programs, publications, news },
    areas
  );
  if (errors.length) throw new Error('Invalid content relationships:\n' + errors.join('\n'));
}
