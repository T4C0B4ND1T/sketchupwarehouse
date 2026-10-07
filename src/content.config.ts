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
    // Cover photo: a file in ./images (uploaded in /admin or fetched from
    // Pexels) or a link to an image elsewhere. Both are optimized at build time.
    cover: z
      .object({
        src: z.union([z.string().url(), image()]),
        alt: z.string(),
        credit: z.string().optional(),
        creditUrl: z.string().url().optional(),
        pexelsId: z.number().optional(),
      })
      .optional(),
  }),
});

// Free SketchUp components: one Markdown file per model, its .skp in
// public/downloads/components/ and its preview in ./images.
const components = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/components' }),
  schema: ({ image }) => z.object({
    title: z.string().max(80),
    description: z.string().max(200),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    // Site path of the .skp download, e.g. /downloads/components/side-table.skp
    file: z.string().regex(/^\/downloads\/components\/[a-z0-9-]+\.skp$/),
    preview: z.object({ src: image(), alt: z.string() }),
    // Overall size as modeled, e.g. "18 × 18 × 22 in (W × D × H)".
    dimensions: z.string().optional(),
    // Set once the model is live on 3D Warehouse.
    warehouseUrl: z.string().url().optional(),
  }),
});

export const collections = { posts, components };
