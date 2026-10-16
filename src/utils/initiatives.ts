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
