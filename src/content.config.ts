import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z.object({ en: z.string(), pt: z.string() });
const localizedList = z.object({ en: z.array(z.string()), pt: z.array(z.string()) });
const pillar = z.enum(['research', 'extension', 'technology']);
const result = z.object({
  description: localized,
  type: z.string().optional(),
  date: z.iso.date().optional(),
  url: z.url().optional(),
  indicator: z.object({ value: z.number().nonnegative(), unit: localized }).optional(),
});

const people = defineCollection({
  loader: glob({ base: './src/content/people', pattern: '**/*.md' }),
  schema: z.object({
    name: z.string(),
    category: z.enum([
      'faculty',
      'postdoc',
      'phd',
      'masters',
      'undergraduate',
      'collaborator',
      'staff',
      'visiting',
      'alumni',
    ]),
    institution: z.string(),
    role: localized,
    topic: localized,
    summary: localized,
    areas: z.array(z.string()),
    initiatives: z.array(z.string()).default([]),
    links: z
      .object({
        email: z.string().optional(),
        github: z.url().optional(),
        orcid: z.url().optional(),
        scholar: z.url().optional(),
        lattes: z.url().optional(),
        linkedin: z.url().optional(),
        website: z.url().optional(),
      })
      .default({}),
    photo: z.string().optional(),
    order: z.number().default(100),
  }),
});

const initiatives = defineCollection({
  loader: glob({ base: './src/content/initiatives', pattern: '**/*.md' }),
  schema: z.object({
    title: localized,
    shortTitle: localized.optional(),
    summary: localized,
    kind: z.enum(['research', 'applied', 'product', 'extension', 'consulting', 'internal']),
    primaryPillar: pillar,
    relatedPillars: z.array(pillar).default([]),
    entityType: z.enum([
      'program',
      'research-project',
      'extension-project',
      'technology-project',
      'tool',
      'product',
      'internal-project',
      'initiative',
      'technology-solution',
    ]),
    program: z.string().optional(),
    relatedInitiatives: z
      .array(
        z.object({
          initiative: z.string(),
          relation: z.enum([
            'originates',
            'uses',
            'complements',
            'applies-knowledge-from',
            'linked-to',
          ]),
        })
      )
      .default([]),
    organization: z
      .object({
        name: z.string().min(1),
        relationship: z.enum([
          'client',
          'development-partner',
          'collaborating-institution',
          'funder',
        ]),
        disclosure: z.enum(['authorized', 'anonymous', 'restricted']),
        publicLabel: localized.optional(),
        website: z.url().optional(),
        logo: z.string().optional(),
      })
      .optional(),
    developmentStage: z
      .enum([
        'concept',
        'proof-of-concept',
        'prototype',
        'mvp',
        'product-in-development',
        'available',
        'deployed',
      ])
      .optional(),
    expectedResults: localizedList,
    achievedResults: z.array(result).default([]),
    kindLabel: localized,
    extensionCode: z.enum(['P1', 'P2', 'P3', 'P4']).optional(),
    status: z.enum(['active', 'open', 'planning', 'paused', 'completed']),
    statusLabel: localized,
    areas: z.array(z.string()),
    people: z.array(z.string()).default([]),
    funding: z
      .object({ agency: z.string(), process: z.string(), period: z.string().optional() })
      .optional(),
    defined: localizedList.default({ en: [], pt: [] }),
    work: localizedList,
    skills: z.array(z.string()),
    participation: localizedList,
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

const opportunities = defineCollection({
  loader: glob({ base: './src/content/opportunities', pattern: '**/*.md' }),
  schema: z.object({
    title: localized,
    summary: localized,
    type: z.enum([
      'research',
      'undergraduate',
      'thesis',
      'masters',
      'phd',
      'collaboration',
      'engineering',
    ]),
    status: z.enum(['open', 'expressions-of-interest', 'closed']),
    initiative: z.string(),
    people: z.array(z.string()).default([]),
    areas: z.array(z.string()),
    skills: z.array(z.string()),
    commitment: localized.optional(),
    funded: z.boolean().optional(),
    order: z.number().default(100),
  }),
});

const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.md' }),
  schema: z.object({
    draft: z.boolean().default(false),
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number().int(),
    type: z.enum([
      'journal',
      'conference',
      'workshop',
      'book',
      'chapter',
      'thesis',
      'preprint',
      'conference-abstract',
      'abstract',
    ]),
    doi: z.string().optional(),
    url: z.url().optional(),
    areas: z.array(z.string()).default([]),
    initiatives: z.array(z.string()).default([]),
    abstract: localized.optional(),
  }),
});

const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '**/*.md' }),
  schema: z.object({
    draft: z.boolean().default(false),
    title: localized,
    date: z.string(),
    displayDate: localized,
    summary: localized,
    category: z.enum(['award', 'paper', 'event', 'talk', 'general']).default('general'),
    categoryLabel: localized,
    initiatives: z.array(z.string()).default([]),
    people: z.array(z.string()).default([]),
    areas: z.array(z.string()).default([]),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
        })
      )
      .default([]),
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

const programs = defineCollection({
  loader: glob({ base: './src/content/programs', pattern: '**/*.md' }),
  schema: z.object({
    name: localized,
    description: localized,
    primaryPillar: pillar,
    objectives: localizedList,
    institutionalStatus: localized,
    audience: localized.optional(),
    achievedResults: z.array(result).default([]),
  }),
});

export const collections = { people, initiatives, opportunities, publications, news, programs };
