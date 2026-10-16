export const pillars = [
  {
    id: 'research',
    route: '/research',
    tone: 'mint',
    title: { en: 'Research', pt: 'Pesquisa' },
    description: {
      en: 'We investigate scientific and technological challenges, producing knowledge and evidence to advance software.',
      pt: 'Investigamos desafios científicos e tecnológicos, produzindo conhecimento e evidências para a evolução do software.',
    },
    action: { en: 'Explore research', pt: 'Explorar pesquisas' },
  },
  {
    id: 'extension',
    route: '/extension',
    tone: 'amber',
    title: { en: 'Extension', pt: 'Extensão' },
    description: {
      en: 'We connect university and society through projects, educational activities and knowledge transfer.',
      pt: 'Conectamos universidade e sociedade por meio de projetos, ações formativas e transferência de conhecimento.',
    },
    action: { en: 'Explore extension', pt: 'Conhecer a extensão' },
  },
  {
    id: 'technology',
    route: '/projects',
    tone: 'blue',
    title: { en: 'Technology Development', pt: 'Desenvolvimento Tecnológico' },
    description: {
      en: 'We turn knowledge into tools, prototypes, platforms and solutions for real problems.',
      pt: 'Transformamos conhecimento em ferramentas, protótipos, plataformas e soluções para problemas reais.',
    },
    action: { en: 'Explore solutions', pt: 'Explorar soluções' },
  },
] as const;

export type Pillar = (typeof pillars)[number]['id'];

export const entityTypeLabels = {
  program: { en: 'Program', pt: 'Programa' },
  'research-project': { en: 'Research project', pt: 'Projeto de pesquisa' },
  'extension-project': { en: 'Extension project', pt: 'Projeto de extensão' },
  'technology-project': { en: 'Technology project', pt: 'Projeto tecnológico' },
  tool: { en: 'Tool', pt: 'Ferramenta' },
  product: { en: 'Product', pt: 'Produto' },
  'internal-project': { en: 'Internal project', pt: 'Projeto interno' },
  initiative: { en: 'Initiative', pt: 'Iniciativa' },
  'technology-solution': { en: 'Technology solution', pt: 'Solução tecnológica' },
} as const;
