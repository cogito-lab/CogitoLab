export type Lang = 'en' | 'pt';
export type Localized<T = string> = Record<Lang, T>;

export const languageNames: Record<Lang, string> = { en: 'English', pt: 'Português' };

export function pick<T>(value: Localized<T>, lang: Lang): T {
  return value[lang];
}

const portugueseSkills: Record<string, string> = {
  Accessibility: 'Acessibilidade',
  Agriculture: 'Agricultura',
  Authentication: 'Autenticação',
  'Automated testing': 'Testes automatizados',
  Automation: 'Automação',
  Communication: 'Comunicação',
  'Content design': 'Design de conteúdo',
  Data: 'Dados',
  'Data APIs': 'APIs de dados',
  Databases: 'Bancos de dados',
  'Empirical methods': 'Métodos empíricos',
  Entrepreneurship: 'Empreendedorismo',
  Experimentation: 'Experimentação',
  Graphs: 'Grafos',
  Innovation: 'Inovação',
  Integration: 'Integração',
  'IoT APIs': 'APIs de IoT',
  'LLM agents': 'Agentes de modelos de linguagem',
  LLMs: 'Modelos de linguagem',
  'Machine learning': 'Aprendizado de máquina',
  Messaging: 'Mensageria',
  Product: 'Produto',
  'Project management': 'Gestão de projetos',
  Requirements: 'Requisitos',
  Security: 'Segurança',
  'Static analysis': 'Análise estática',
  Testing: 'Testes',
  'Web APIs': 'APIs web',
  'WhatsApp APIs': 'APIs do WhatsApp',
};

/** Keep technology names and stored identifiers intact while translating editorial skills. */
export function skillLabel(value: string, lang: Lang) {
  return lang === 'pt' ? (portugueseSkills[value] ?? value) : value;
}

const ui = {
  en: {
    nav: [
      'Research',
      'Extension',
      'Projects & Solutions',
      'People',
      'Publications',
      'News',
      'Opportunities',
      'About',
    ],
    routes: [
      'research',
      'extension',
      'projects',
      'people',
      'publications',
      'news',
      'opportunities',
      'about',
    ],
    menu: 'Menu',
    close: 'Close menu',
    language: 'Read in Portuguese',
    theme: 'Change color theme',
    home: 'Home',
    explore: 'Explore our work',
    learnMore: 'Learn more',
    viewAll: 'View all',
    people: 'People',
    initiatives: 'Initiatives',
    opportunities: 'Opportunities',
    areas: 'Research areas',
    news: 'News & Activities',
    contact: 'Contact',
    labCoordinator: 'Lab Coordinator',
    relatedPeople: 'People involved',
    relatedInitiatives: 'Related initiatives',
    relatedOpportunities: 'Related opportunities',
    skills: 'Useful skills',
    participation: 'Ways to participate',
    defined: 'What is established',
    work: 'Work ahead',
    deliverables: 'Expected outcomes',
    status: 'Status',
    type: 'Type',
    institution: 'Institution',
    topic: 'Research topic',
    publications: 'Publications',
    funded: 'Funding',
    noPublications: 'No verified publications have been added yet.',
    editHint:
      'Publications are added as validated Markdown records and will appear here automatically by year.',
    back: 'Back',
    active: 'Active',
    open: 'Open',
    planning: 'Planning',
    paused: 'Paused',
    completed: 'Completed',
  },
  pt: {
    nav: [
      'Pesquisa',
      'Extensão',
      'Projetos e Soluções',
      'Pessoas',
      'Publicações',
      'Notícias',
      'Oportunidades',
      'Sobre',
    ],
    routes: [
      'research',
      'extension',
      'projects',
      'people',
      'publications',
      'news',
      'opportunities',
      'about',
    ],
    menu: 'Menu',
    close: 'Fechar menu',
    language: 'Read in English',
    theme: 'Alterar tema de cores',
    home: 'Início',
    explore: 'Conheça nosso trabalho',
    learnMore: 'Saiba mais',
    viewAll: 'Ver tudo',
    people: 'Pessoas',
    initiatives: 'Iniciativas',
    opportunities: 'Oportunidades',
    areas: 'Áreas de pesquisa',
    news: 'Notícias e Atividades',
    contact: 'Contato',
    labCoordinator: 'Coordenador do Laboratório',
    relatedPeople: 'Pessoas envolvidas',
    relatedInitiatives: 'Iniciativas relacionadas',
    relatedOpportunities: 'Oportunidades relacionadas',
    skills: 'Competências úteis',
    participation: 'Formas de participação',
    defined: 'O que está definido',
    work: 'Trabalho a realizar',
    deliverables: 'Entregas esperadas',
    status: 'Situação',
    type: 'Tipo',
    institution: 'Instituição',
    topic: 'Tema de pesquisa',
    publications: 'Publicações',
    funded: 'Financiamento',
    noPublications: 'Nenhuma publicação verificada foi adicionada ainda.',
    editHint:
      'Publicações são adicionadas como registros Markdown validados e aparecerão aqui automaticamente por ano.',
    back: 'Voltar',
    active: 'Ativa',
    open: 'Aberta',
    planning: 'Planejamento',
    paused: 'Pausada',
    completed: 'Concluída',
  },
} as const;

export function t(lang: Lang) {
  return ui[lang];
}

export function localizedPath(path: string, lang: Lang): string {
  const clean = path === '/' ? '' : `/${path.replace(/^\/+|\/+$/g, '')}`;
  return lang === 'pt' ? `/pt${clean || '/'}` : clean || '/';
}

export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}
