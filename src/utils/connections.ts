type PersonLink = { id: string; data: { initiatives: string[] } };
type InitiativeLink = { id: string; data: { people: string[] } };
const slug = (id: string) => id.replace(/\.md$/, '').split('/').pop()!;

/** A recorded link on either side establishes participation; no thematic inference. */
export function hasParticipation(person: PersonLink, initiative: InitiativeLink) {
  return (
    person.data.initiatives.includes(slug(initiative.id)) ||
    initiative.data.people.includes(slug(person.id))
  );
}

type Relation = 'originates' | 'uses' | 'complements' | 'applies-knowledge-from' | 'linked-to';
type RelatedEntry = {
  id: string;
  data: { relatedInitiatives: { initiative: string; relation: Relation }[] };
};

export function initiativeConnections<T extends RelatedEntry>(current: T, entries: T[]) {
  return entries
    .filter((entry) => slug(entry.id) !== slug(current.id))
    .flatMap((entry) => {
      const outgoing = current.data.relatedInitiatives.find(
        (link) => link.initiative === slug(entry.id)
      );
      const incoming = entry.data.relatedInitiatives.find(
        (link) => link.initiative === slug(current.id)
      );
      return outgoing
        ? [{ entry, relation: outgoing.relation, incoming: false }]
        : incoming
          ? [{ entry, relation: incoming.relation, incoming: true }]
          : [];
    });
}

export const relationLabels = {
  originates: {
    outgoing: { en: 'Originates', pt: 'Origina' },
    incoming: { en: 'Originates from', pt: 'Origina-se de' },
  },
  uses: {
    outgoing: { en: 'Uses', pt: 'Utiliza' },
    incoming: { en: 'Used by', pt: 'Utilizado por' },
  },
  complements: {
    outgoing: { en: 'Complements', pt: 'Complementa' },
    incoming: { en: 'Complemented by', pt: 'Complementado por' },
  },
  'applies-knowledge-from': {
    outgoing: { en: 'Applies knowledge from', pt: 'Aplica conhecimento de' },
    incoming: { en: 'Knowledge applied by', pt: 'Conhecimento aplicado por' },
  },
  'linked-to': {
    outgoing: { en: 'Linked to', pt: 'Vinculado a' },
    incoming: { en: 'Linked to', pt: 'Vinculado a' },
  },
} as const;

export function explicitlyLinked<T extends { data: { initiatives: string[]; draft?: boolean } }>(
  entries: T[],
  initiativeId: string
) {
  return entries.filter(
    (entry) => !entry.data.draft && entry.data.initiatives.includes(slug(initiativeId))
  );
}
