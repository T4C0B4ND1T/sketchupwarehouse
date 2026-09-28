// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeAffiliateLinks from './src/lib/rehype-affiliate-links.mjs';

export default defineConfig({
  site: process.env.SITE_URL || 'https://sketchupwarehouse.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
  markdown: {
    processor: unified({
      rehypePlugins: [[rehypeAffiliateLinks, { amazonTag: process.env.PUBLIC_AMAZON_TAG || '' }]],
    }),
  },
});
