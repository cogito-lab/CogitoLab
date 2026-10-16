import { describe, expect, it } from 'vitest';
import { compareInitiatives, technologyInitiatives } from '../src/utils/initiatives';

const entry = (
  id: string,
  status: string,
  order: number,
  primaryPillar = 'technology',
  relatedPillars: string[] = []
) => ({
  id,
  data: { status, order, title: { en: id, pt: id }, primaryPillar, relatedPillars },
});

describe('technology catalog selection and ordering', () => {
  it('prioritizes active, then completed, then other states regardless of editorial order', () => {
    const items = [
      entry('open', 'open', 0),
      entry('planned', 'planning', 1),
      entry('done', 'completed', 90),
      entry('active', 'active', 100),
    ];
    expect([...items].sort(compareInitiatives).map((item) => item.id)).toEqual([
      'active',
      'done',
      'open',
      'planned',
    ]);
    expect(items[0].id).toBe('open');
  });
  it('breaks ties by editorial order and then title', () => {
    expect(
      technologyInitiatives([
        entry('Zulu', 'active', 1),
        entry('Alpha', 'active', 1),
        entry('First', 'active', 0),
      ]).map((item) => item.id)
    ).toEqual(['First', 'Alpha', 'Zulu']);
  });
  it('includes explicit secondary technology membership once, without inferring it from research', () => {
    const cross = entry('cross', 'active', 0, 'research', ['technology']);
    expect(
      technologyInitiatives([
        cross,
        entry('science', 'active', 1, 'research'),
        entry('product', 'open', 2),
      ])
    ).toEqual([cross, entry('product', 'open', 2)]);
  });
});
