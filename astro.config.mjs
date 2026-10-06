// @ts-check
import fs from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeAffiliateLinks from './src/lib/rehype-affiliate-links.mjs';
import rehypeAdMarkers from './src/lib/rehype-ad-markers.mjs';

// Last-modified dates for the sitemap, so search engines recrawl what changed:
// each article's updatedDate (or pubDate), and for the home page and topic hubs
// the newest article they list.
function sitemapDates() {
  const dir = new URL('./src/content/posts/', import.meta.url);
  const dates = new Map();
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const fm = fs.readFileSync(new URL(file, dir), 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    const field = (k) => fm.match(new RegExp(`^${k}:\\s*['"]?([^'"\\n]+)`, 'm'))?.[1].trim();
    const date = new Date(field('updatedDate') ?? field('pubDate') ?? '');
    // Drafts and future-dated posts aren't published yet.
    if (isNaN(date.getTime()) || date.getTime() > Date.now() || field('draft') === 'true') continue;
    const newest = (key) => {
      if (!dates.has(key) || dates.get(key) < date) dates.set(key, date);
    };
    newest(`/blog/${file.replace(/\.md$/, '')}/`);
    newest(`/category/${field('category')}/`);
    newest('/');
  }
  return dates;
}
const lastmod = sitemapDates();

export default defineConfig({
  site: process.env.SITE_URL || 'https://sketchupwarehouse.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // Topic hubs with no articles yet are noindex, so keep them out too.
      filter: (page) => !/^\/category\/[^/]+\/$/.test(new URL(page).pathname) || lastmod.has(new URL(page).pathname),
      serialize(item) {
        const date = lastmod.get(new URL(item.url).pathname);
        return date ? { ...item, lastmod: date.toISOString() } : item;
      },
    }),
  ],
  build: {
    format: 'directory',
  },
  // Cover images linked from other sites are downloaded and optimized at build.
  image: {
    remotePatterns: [{ protocol: 'https' }],
  },
  markdown: {
    processor: unified({
      rehypePlugins: [[rehypeAffiliateLinks, { amazonTag: process.env.PUBLIC_AMAZON_TAG || '' }], rehypeAdMarkers],
    }),
  },
});
