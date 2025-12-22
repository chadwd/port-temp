import { defineCollection, z } from 'astro:content';

// Case studies collection - will be fleshed out in Phase 4
const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    featured: z.boolean().default(false),
    confidentiality: z.enum(['public', 'partial', 'nda']).default('public'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

// Writing collection - will be fleshed out in Phase 5
const writing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  'case-studies': caseStudies,
  'writing': writing,
};
