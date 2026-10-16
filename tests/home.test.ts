import { describe, expect, it } from 'vitest';
import { homeImpactGroups, selectHomeInitiatives } from '../src/utils/home';
import type { Pillar } from '../src/data/pillars';

const entry = (id: string, pillar: Pillar, status = 'active', featured = false, order = 1) => ({
  id,
  data: {
    primaryPillar: pillar,
    status,
    featured,
    order,
    title: { en: id, pt: id },
    achievedResults: [],
  },
});

describe('homepage highlights', () => {
  it('prioritizes active initiatives over planned editorial highlights', () => {
    const active = entry('executing', 'technology');
    expect(
      selectHomeInitiatives([entry('planned', 'research', 'planning', true), active], 1)
    ).toEqual([active]);
  });
  it('represents the three pillars without duplicating initiatives', () => {
    const selected = selectHomeInitiatives([
      entry('research-a', 'research', 'active', true),
      entry('research-b', 'research', 'active', true),
      entry('extension', 'extension'),
      entry('technology', 'technology'),
    ]);
    expect(selected.map((item) => item.id)).toEqual(['research-a', 'extension', 'technology']);
    expect(new Set(selected.map((item) => item.id)).size).toBe(3);
  });
  it('honors editorial selection and order within the same pillar and execution state', () => {
    expect(
      selectHomeInitiatives(
        [
          entry('normal', 'research', 'active', false, 1),
          entry('featured-later', 'research', 'active', true, 10),
          entry('featured-first', 'research', 'active', true, 2),
        ],
        1
      )[0].id
    ).toBe('featured-first');
  });
});

describe('verified homepage results', () => {
  it('hides the whole section without publications or achieved results', () => {
    expect(homeImpactGroups([entry('planned', 'technology', 'planning')], [], [])).toEqual([]);
  });
  it('counts non-draft historical publications without linking them to current projects', () => {
    const groups = homeImpactGroups(
      [],
      [],
      [{ data: { draft: false } }, { data: { draft: true } }]
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].pillar.id).toBe('research');
    expect(groups[0].publicationCount).toBe(1);
    expect(groups[0].results).toEqual([]);
  });
  it('reveals extension and technology only when achieved results exist', () => {
    const result = { description: { en: 'Verified achievement', pt: 'Realização verificada' } };
    const technology = {
      id: 'solution',
      data: { primaryPillar: 'technology' as const, achievedResults: [result] },
    };
    const extension = {
      id: 'program',
      data: { primaryPillar: 'extension' as const, achievedResults: [result] },
    };
    const groups = homeImpactGroups([technology], [extension], []);
    expect(groups.map((group) => group.pillar.id)).toEqual(['extension', 'technology']);
    expect(groups[0].results[0].sourcePath).toBe('/extension');
    expect(groups[1].results[0].sourcePath).toBe('/initiatives/solution');
  });
});
