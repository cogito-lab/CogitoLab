import { describe, expect, it } from 'vitest';
import {
  hasParticipation,
  initiativeConnections,
  explicitlyLinked,
} from '../src/utils/connections';

describe('explicit contextual relationships', () => {
  it('resolves participation recorded on either side without inferring other membership', () => {
    const person = { id: 'person', data: { initiatives: ['one'] } };
    expect(hasParticipation(person, { id: 'one', data: { people: [] } })).toBe(true);
    expect(hasParticipation(person, { id: 'two', data: { people: ['person'] } })).toBe(true);
    expect(hasParticipation(person, { id: 'three', data: { people: [] } })).toBe(false);
  });
  it('resolves incoming initiative links with direction and without duplicating reciprocal records', () => {
    const one = {
      id: 'one',
      data: { relatedInitiatives: [{ initiative: 'two', relation: 'originates' as const }] },
    };
    const two = {
      id: 'two',
      data: { relatedInitiatives: [] as { initiative: string; relation: 'originates' }[] },
    };
    expect(initiativeConnections(two, [one, two])).toEqual([
      { entry: one, relation: 'originates', incoming: true },
    ]);
    expect(initiativeConnections(one, [one, two])).toEqual([
      { entry: two, relation: 'originates', incoming: false },
    ]);
    two.data.relatedInitiatives.push({ initiative: 'one', relation: 'originates' });
    expect(initiativeConnections(one, [one, two])).toHaveLength(1);
  });
  it('leaves historical publications and news unlinked regardless of topical similarity', () => {
    const historical = { data: { initiatives: [], draft: false }, title: 'Same topic' };
    const linked = { data: { initiatives: ['project'], draft: false } };
    const draft = { data: { initiatives: ['project'], draft: true } };
    expect(explicitlyLinked([historical, linked, draft], 'project')).toEqual([linked]);
    expect(explicitlyLinked([historical], 'project')).toEqual([]);
  });
});
