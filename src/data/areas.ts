import type { Localized } from '@/utils/i18n';

export interface ResearchArea {
  id: string;
  number: string;
  title: Localized;
  shortTitle: Localized;
  description: Localized;
  topics: Localized[];
  tone: 'mint' | 'amber' | 'blue' | 'coral' | 'violet';
}

export const areas: ResearchArea[] = [
  {
    id: 'ai-for-software-engineering',
    number: '01',
    title: { en: 'AI for Software Engineering', pt: 'IA para Engenharia de Software' },
    shortTitle: { en: 'AI for Software', pt: 'IA para Software' },
    description: {
      en: 'We study how language models and intelligent agents can support the design, construction, evaluation, and evolution of software.',
      pt: 'Estudamos como modelos de linguagem e agentes inteligentes podem apoiar o projeto, a construção, a avaliação e a evolução de software.',
    },
    topics: [
      { en: 'Code generation', pt: 'Geração de código' },
      { en: 'AI agents', pt: 'Agentes de IA' },
      { en: 'Software architecture', pt: 'Arquitetura de software' },
    ],
    tone: 'mint',
  },
  {
    id: 'software-quality',
    number: '02',
    title: {
      en: 'Software Quality, Technical Debt & Refactoring',
      pt: 'Qualidade de Software, Dívida Técnica e Refatoração',
    },
    shortTitle: { en: 'Software Quality', pt: 'Qualidade de Software' },
    description: {
      en: 'We investigate measurable quality, technical debt, code anomalies, and safer ways to maintain evolving systems.',
      pt: 'Investigamos qualidade mensurável, dívida técnica, anomalias de código e formas mais seguras de manter sistemas em evolução.',
    },
    topics: [
      { en: 'Technical debt', pt: 'Dívida técnica' },
      { en: 'Code quality', pt: 'Qualidade de código' },
      { en: 'Refactoring', pt: 'Refatoração' },
    ],
    tone: 'amber',
  },
  {
    id: 'software-testing',
    number: '03',
    title: { en: 'Software Testing & Reliability', pt: 'Testes de Software e Confiabilidade' },
    shortTitle: { en: 'Testing & Reliability', pt: 'Testes e Confiabilidade' },
    description: {
      en: 'We create and evaluate techniques that make software behavior more dependable, observable, and reproducible.',
      pt: 'Criamos e avaliamos técnicas que tornam o comportamento de software mais confiável, observável e reproduzível.',
    },
    topics: [
      { en: 'Automated testing', pt: 'Testes automatizados' },
      { en: 'Test generation', pt: 'Geração de testes' },
      { en: 'Reliability', pt: 'Confiabilidade' },
    ],
    tone: 'blue',
  },
  {
    id: 'configurable-mobile-iot',
    number: '04',
    title: {
      en: 'Configurable Systems, Mobile & IoT',
      pt: 'Sistemas Configuráveis, Mobile e IoT',
    },
    shortTitle: { en: 'Mobile & IoT', pt: 'Mobile e IoT' },
    description: {
      en: 'We explore variability, interaction failures, and dependable software for connected and resource-constrained devices.',
      pt: 'Exploramos variabilidade, falhas de interação e software confiável para dispositivos conectados e com recursos limitados.',
    },
    topics: [
      { en: 'Internet of Things', pt: 'Internet das Coisas' },
      { en: 'Mobile systems', pt: 'Sistemas móveis' },
      { en: 'Configurable systems', pt: 'Sistemas configuráveis' },
    ],
    tone: 'coral',
  },
  {
    id: 'collaborative-empirical-se',
    number: '05',
    title: {
      en: 'Collaborative & Empirical Software Engineering',
      pt: 'Engenharia de Software Colaborativa e Empírica',
    },
    shortTitle: { en: 'Collaborative & Empirical SE', pt: 'ES Colaborativa e Empírica' },
    description: {
      en: 'We use evidence from people, teams, and repositories to understand how software is built in practice.',
      pt: 'Usamos evidências de pessoas, equipes e repositórios para compreender como o software é construído na prática.',
    },
    topics: [
      { en: 'Mining repositories', pt: 'Mineração de repositórios' },
      { en: 'Developer collaboration', pt: 'Colaboração entre desenvolvedores' },
      { en: 'Empirical methods', pt: 'Métodos empíricos' },
    ],
    tone: 'violet',
  },
];

export const innovationArea: ResearchArea = {
  id: 'innovation-transfer',
  number: '06',
  title: {
    en: 'Innovation, Entrepreneurship & Technology Transfer',
    pt: 'Inovação, Empreendedorismo e Transferência de Tecnologia',
  },
  shortTitle: { en: 'Innovation & Transfer', pt: 'Inovação e Transferência' },
  description: {
    en: 'We connect research to real needs through applied projects, products, entrepreneurship, and partnerships.',
    pt: 'Conectamos pesquisa a necessidades reais por meio de projetos aplicados, produtos, empreendedorismo e parcerias.',
  },
  topics: [
    { en: 'Applied research', pt: 'Pesquisa aplicada' },
    { en: 'Entrepreneurship', pt: 'Empreendedorismo' },
    { en: 'Technology transfer', pt: 'Transferência de tecnologia' },
  ],
  tone: 'coral',
};

export const allAreas = [...areas, innovationArea];

export function getArea(id: string) {
  return allAreas.find((area) => area.id === id);
}
