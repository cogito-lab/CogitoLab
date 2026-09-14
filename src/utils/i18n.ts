export type Lang = 'en' | 'pt';
export type Localized<T = string> = Record<Lang, T>;

export const languageNames: Record<Lang, string> = { en: 'English', pt: 'Português' };

export function pick<T>(value: Localized<T>, lang: Lang): T {
  return value[lang];
}

const ui = {
  en: {
    nav: ['Research', 'Initiatives', 'People', 'Publications', 'Opportunities', 'About'],
    routes: ['research', 'initiatives', 'people', 'publications', 'opportunities', 'about'],
    menu: 'Menu', close: 'Close menu', language: 'Read in Portuguese', theme: 'Change color theme',
    home: 'Home', explore: 'Explore our work', learnMore: 'Learn more', viewAll: 'View all',
    people: 'People', initiatives: 'Initiatives', opportunities: 'Opportunities', areas: 'Research areas',
    relatedPeople: 'People involved', relatedInitiatives: 'Related initiatives', relatedOpportunities: 'Related opportunities',
    skills: 'Useful skills', participation: 'Ways to participate', defined: 'What is established',
    work: 'Work ahead', deliverables: 'Expected outcomes', status: 'Status', type: 'Type', institution: 'Institution',
    topic: 'Research topic', publications: 'Publications', funded: 'Funding', noPublications: 'No verified publications have been added yet.',
    editHint: 'Publications are added as validated Markdown records and will appear here automatically by year.',
    back: 'Back', active: 'Active', open: 'Open', planning: 'Planning', paused: 'Paused', completed: 'Completed',
  },
  pt: {
    nav: ['Pesquisa', 'Iniciativas', 'Pessoas', 'Publicações', 'Oportunidades', 'Sobre'],
    routes: ['research', 'initiatives', 'people', 'publications', 'opportunities', 'about'],
    menu: 'Menu', close: 'Fechar menu', language: 'Read in English', theme: 'Alterar tema de cores',
    home: 'Início', explore: 'Conheça nosso trabalho', learnMore: 'Saiba mais', viewAll: 'Ver tudo',
    people: 'Pessoas', initiatives: 'Iniciativas', opportunities: 'Oportunidades', areas: 'Áreas de pesquisa',
    relatedPeople: 'Pessoas envolvidas', relatedInitiatives: 'Iniciativas relacionadas', relatedOpportunities: 'Oportunidades relacionadas',
    skills: 'Competências úteis', participation: 'Formas de participação', defined: 'O que está definido',
    work: 'Trabalho a realizar', deliverables: 'Entregas esperadas', status: 'Situação', type: 'Tipo', institution: 'Instituição',
    topic: 'Tema de pesquisa', publications: 'Publicações', funded: 'Financiamento', noPublications: 'Nenhuma publicação verificada foi adicionada ainda.',
    editHint: 'Publicações são adicionadas como registros Markdown validados e aparecerão aqui automaticamente por ano.',
    back: 'Voltar', active: 'Ativa', open: 'Aberta', planning: 'Planejamento', paused: 'Pausada', completed: 'Concluída',
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
