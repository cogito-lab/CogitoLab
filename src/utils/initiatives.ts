type InitiativeData = {
  status: string;
  order: number;
  title: { en: string; pt: string };
  primaryPillar: string;
  relatedPillars: string[];
};

/** Execution state takes priority over editorial order and title. Legacy open stays last. */
export function compareInitiatives(a: { data: InitiativeData }, b: { data: InitiativeData }) {
  const priority = (status: string) => (status === 'active' ? 0 : status === 'completed' ? 1 : 2);
  return (
    priority(a.data.status) - priority(b.data.status) ||
    a.data.order - b.data.order ||
    a.data.title.en.localeCompare(b.data.title.en)
  );
}

export function technologyInitiatives<T extends { data: InitiativeData }>(entries: T[]): T[] {
  return entries
    .filter(
      ({ data }) =>
        data.primaryPillar === 'technology' || data.relatedPillars.includes('technology')
    )
    .sort(compareInitiatives);
}

export function initiativeGroups<T extends { data: InitiativeData }>(entries: T[]) {
  const sorted = [...entries].sort(compareInitiatives);
  return [
    {
      id: 'active',
      title: { en: 'In progress', pt: 'Em execução' },
      entries: sorted.filter((entry) => entry.data.status === 'active'),
    },
    {
      id: 'completed',
      title: { en: 'Completed', pt: 'Concluídas' },
      entries: sorted.filter((entry) => entry.data.status === 'completed'),
    },
    {
      id: 'other',
      title: { en: 'Other initiatives', pt: 'Outras iniciativas' },
      entries: sorted.filter((entry) => !['active', 'completed'].includes(entry.data.status)),
    },
  ].filter((group) => group.entries.length > 0);
}
