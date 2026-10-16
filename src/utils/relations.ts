type Organization = {
  name: string;
  relationship: string;
  disclosure: 'authorized' | 'anonymous' | 'restricted';
  publicLabel?: { en: string; pt: string };
  website?: string;
  logo?: string;
};

type Entry = {
  id: string;
  data: {
    areas?: string[];
    people?: string[];
    initiatives?: string[];
    initiative?: string;
    primaryPillar?: string;
    relatedPillars?: string[];
    entityType?: string;
    program?: string;
    extensionCode?: string;
    organization?: Organization;
    developmentStage?: string;
    relatedInitiatives?: { initiative: string; relation: string }[];
  };
};

/** Return only information authorized for public rendering. */
export function publicOrganization(organization?: Organization) {
  if (!organization || organization.disclosure === 'restricted') return undefined;
  if (organization.disclosure === 'anonymous')
    return organization.publicLabel ? { label: organization.publicLabel } : undefined;
  return {
    label: { en: organization.name, pt: organization.name },
    website: organization.website,
    logo: organization.logo,
  };
}

export function validateRelations(
  collections: Record<
    'people' | 'initiatives' | 'opportunities' | 'programs' | 'publications' | 'news',
    Entry[]
  >,
  areas: string[]
) {
  const errors: string[] = [];
  const slug = (id: string) => id.replace(/\.md$/, '').split('/').pop()!;
  const known = Object.fromEntries(
    Object.entries(collections).map(([name, entries]) => [
      name,
      new Set(entries.map((entry) => slug(entry.id))),
    ])
  );
  const check = (owner: string, field: string, values: string[], ids?: Set<string>) => {
    const seen = new Set<string>();
    for (const value of values) {
      if (seen.has(value)) errors.push(`${owner}: duplicate ${field} "${value}"`);
      seen.add(value);
      if (ids && !ids.has(value)) errors.push(`${owner}: unknown ${field} "${value}"`);
    }
  };
  for (const [collection, entries] of Object.entries(collections)) {
    for (const { id, data } of entries) {
      const owner = `${collection}/${slug(id)}`;
      check(owner, 'area', data.areas ?? [], new Set(areas));
      check(owner, 'person', data.people ?? [], known.people);
      check(owner, 'initiative', data.initiatives ?? [], known.initiatives);
      if (data.initiative) check(owner, 'initiative', [data.initiative], known.initiatives);
      if (collection !== 'initiatives') continue;
      const secondary = data.relatedPillars ?? [];
      check(owner, 'relatedPillars', secondary);
      if (secondary.includes(data.primaryPillar!))
        errors.push(`${owner}: primary pillar repeated as related pillar`);
      if (data.program) {
        check(owner, 'program', [data.program], known.programs);
        const program = collections.programs.find((entry) => slug(entry.id) === data.program);
        if (program && ![data.primaryPillar, ...secondary].includes(program.data.primaryPillar))
          errors.push(`${owner}: program pillar must match an initiative pillar`);
      }
      const requiredPillar: Record<string, string> = {
        'research-project': 'research',
        'extension-project': 'extension',
        'technology-project': 'technology',
        'technology-solution': 'technology',
        product: 'technology',
        tool: 'technology',
        'internal-project': 'technology',
      };
      if (
        requiredPillar[data.entityType!] &&
        requiredPillar[data.entityType!] !== data.primaryPillar
      )
        errors.push(`${owner}: entityType incompatible with primaryPillar`);
      if (data.extensionCode && data.program !== 'cogito-transfer')
        errors.push(`${owner}: extensionCode requires Cogito Transfer membership`);
      if (
        (data.organization || data.developmentStage) &&
        ![data.primaryPillar, ...secondary].includes('technology')
      )
        errors.push(`${owner}: organization/developmentStage requires the technology pillar`);
      const org = data.organization;
      if (org && org.disclosure !== 'authorized' && (org.website || org.logo))
        errors.push(`${owner}: unauthorized public organization website/logo`);
      if (org?.disclosure === 'restricted' && org.publicLabel)
        errors.push(`${owner}: restricted relationship cannot have a public label`);
      if (
        org?.disclosure === 'anonymous' &&
        (!org.publicLabel?.en.trim() || !org.publicLabel?.pt.trim())
      )
        errors.push(`${owner}: anonymous relationship requires bilingual publicLabel`);
      const relations = data.relatedInitiatives ?? [];
      check(
        owner,
        'related initiative',
        relations.map((relation) => relation.initiative),
        known.initiatives
      );
      if (relations.some((relation) => relation.initiative === slug(id)))
        errors.push(`${owner}: self relationship`);
    }
  }
  return errors;
}
