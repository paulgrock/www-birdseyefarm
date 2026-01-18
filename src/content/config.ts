import { defineCollection, z } from 'astro:content';

const goatsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    aka: z.string(),
    slug: z.string(),
    date: z.string(),
    adgaPedigree: z.string().url(),
    pedigree: z.string().optional(),
    kiddingDate: z.string().optional(),
    sire: z.object({
      name: z.string(),
      link: z.string(),
      sire: z.object({
        name: z.string(),
        link: z.string().optional()
      }).optional(),
      dam: z.object({
        name: z.string(),
        link: z.string().optional()
      }).optional()
    }),
    dam: z.object({
      name: z.string(),
      link: z.string(),
      sire: z.object({
        name: z.string(),
        link: z.string().optional()
      }).optional(),
      dam: z.object({
        name: z.string(),
        link: z.string().optional()
      }).optional()
    }),
    mate: z.object({
      name: z.string(),
      slug: z.string(),
      link: z.string()
    }).optional(),
    copy: z.array(z.string()).default([]),
    notes: z.array(z.string()).default([]),
    prices: z.array(z.string()).default([]),
    images: z.array(z.object({
      filename: z.string(),
      alt: z.string()
    })).optional()
  })
});

export const collections = {
  goats: goatsCollection
};
