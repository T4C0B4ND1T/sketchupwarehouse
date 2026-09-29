// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeAffiliateLinks from './src/lib/rehype-affiliate-links.mjs';
import rehypeAdMarkers from './src/lib/rehype-ad-markers.mjs';

export default defineConfig({
  site: process.env.SITE_URL || 'https://sketchupwarehouse.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
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
