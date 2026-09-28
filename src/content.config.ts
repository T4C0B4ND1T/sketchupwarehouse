import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_KEYS } from './site.config';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: ({ image }) => z.object({
    title: z.string().max(110),
    description: z.string().max(200),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(CATEGORY_KEYS),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    aiAssisted: z.boolean().default(false),
    topicId: z.string().optional(),
    sources: z.array(z.object({ title: z.string(), url: z.string().url() })).default([]),
    // Stock-photo search the image fetcher uses (scripts/add-images.mjs).
    imageQuery: z.string().optional(),
    // Cover photo, stored next to the posts and optimized at build time.
    cover: z
      .object({
        src: image(),
        alt: z.string(),
        credit: z.string(),
        creditUrl: z.string().url(),
        pexelsId: z.number().optional(),
      })
      .optional(),
  }),
});

export const collections = { posts };
