import { describe, expect, it } from 'vitest';
import { publicOrganization, validateRelations } from '../src/utils/relations';

const fixture = () => ({
  people: [{ id: 'person', data: { initiatives: ['project'] } }],
  initiatives: [
    {
      id: 'project',
      data: {
        primaryPillar: 'technology',
        entityType: 'technology-project',
        people: ['person'],
        relatedInitiatives: [] as { initiative: string; relation: string }[],
        areas: ['quality'],
        program: undefined as string | undefined,
      },
    },
  ],
  programs: [],
  publications: [],
  opportunities: [],
  news: [],
});

describe('content relationship integrity', () => {
  it('accepts optional relationships and historical publications without projects', () => {
    const data = fixture();
    expect(
      validateRelations({ ...data, publications: [{ id: 'historical', data: {} }] }, ['quality'])
    ).toEqual([]);
  });
  it('reports missing references with their owner, including publications and news', () => {
    const data = fixture();
    data.initiatives[0].data.program = 'missing';
    data.initiatives[0].data.people = ['missing'];
    data.initiatives[0].data.areas = ['missing'];
    const errors = validateRelations(
      {
        ...data,
        publications: [{ id: 'paper', data: { initiatives: ['missing'] } }],
        news: [{ id: 'story', data: { people: ['missing'] } }],
      },
      ['quality']
    ).join('\n');
    expect(errors).toContain('initiatives/project: unknown program');
    expect(errors).toContain('initiatives/project: unknown person');
    expect(errors).toContain('initiatives/project: unknown area');
    expect(errors).toContain('publications/paper: unknown initiative');
    expect(errors).toContain('news/story: unknown person');
  });
  it('rejects duplicate and self relationships and incompatible types', () => {
    const data = fixture();
    data.initiatives[0].data.relatedInitiatives = [
      { initiative: 'project', relation: 'uses' },
      { initiative: 'project', relation: 'uses' },
    ];
    data.initiatives[0].data.entityType = 'research-project';
    const errors = validateRelations(data, ['quality']).join('\n');
    expect(errors).toContain('duplicate related initiative');
    expect(errors).toContain('self relationship');
    expect(errors).toContain('entityType incompatible');
  });
});

describe('organization disclosure', () => {
  const organization = {
    name: 'Private name',
    relationship: 'client',
    disclosure: 'restricted' as const,
  };
  it('omits restricted organizations and exposes only the anonymous label', () => {
    expect(publicOrganization(organization)).toBeUndefined();
    expect(
      publicOrganization({
        ...organization,
        disclosure: 'anonymous',
        publicLabel: { en: 'Private organization', pt: 'Organização privada' },
      })
    ).toEqual({ label: { en: 'Private organization', pt: 'Organização privada' } });
    expect(publicOrganization({ ...organization, disclosure: 'authorized' })?.label.en).toBe(
      'Private name'
    );
  });
  it('rejects public assets without authorization', () => {
    const data = fixture();
    const initiatives = [
      {
        ...data.initiatives[0],
        data: {
          ...data.initiatives[0].data,
          organization: { ...organization, website: 'https://private.example' },
        },
      },
    ];
    expect(validateRelations({ ...data, initiatives }, ['quality']).join('\n')).toContain(
      'unauthorized public organization'
    );
  });
});
