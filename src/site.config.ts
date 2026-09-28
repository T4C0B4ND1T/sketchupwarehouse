// Central site settings. Monetization IDs come from PUBLIC_* env vars so they
// can be set as GitHub repository variables without touching code.
const env = import.meta.env;

export const SITE = {
  name: 'SketchUp Warehouse',
  tagline: 'Tutorials, extensions, rendering and news for SketchUp users',
  description:
    'Practical SketchUp tutorials, extension reviews, rendering guides and industry news for architects, designers, woodworkers and 3D modelers.',
  author: 'SketchUp Warehouse Editorial',
  contactEmail: env.PUBLIC_CONTACT_EMAIL || 'hello@sketchupwarehouse.com',
  postsPerPage: 12,
};

export const MONETIZATION = {
  // Google AdSense publisher ID, e.g. "ca-pub-1234567890123456". Empty = no ads rendered.
  adsenseClient: env.PUBLIC_ADSENSE_CLIENT || '',
  // Optional per-placement slot IDs. When empty, AdSense Auto ads handle placement.
  adSlots: {
    inArticle: env.PUBLIC_ADSENSE_SLOT_IN_ARTICLE || '',
    sidebar: env.PUBLIC_ADSENSE_SLOT_SIDEBAR || '',
    footer: env.PUBLIC_ADSENSE_SLOT_FOOTER || '',
  },
  // Amazon Associates tag, appended to amazon.com links in posts at build time.
  amazonTag: env.PUBLIC_AMAZON_TAG || '',
  // Newsletter form endpoint (e.g. Buttondown/MailerLite free tier embed URL).
  newsletterAction: env.PUBLIC_NEWSLETTER_ACTION || '',
};

export const ANALYTICS = {
  // Cloudflare Web Analytics token (free, cookieless). Empty = disabled.
  cloudflareToken: env.PUBLIC_CF_ANALYTICS_TOKEN || '',
  // Google Analytics 4 measurement ID, e.g. "G-XXXXXXX". Empty = disabled.
  ga4Id: env.PUBLIC_GA4_ID || '',
};

export const CATEGORIES = {
  tutorials: {
    title: 'Tutorials',
    description: 'Step-by-step SketchUp modeling techniques for beginners and pros.',
  },
  extensions: {
    title: 'Extensions & Plugins',
    description: 'Reviews and roundups of the best SketchUp extensions.',
  },
  rendering: {
    title: 'Rendering',
    description: 'Photorealistic rendering with V-Ray, Enscape, D5, Twinmotion and more.',
  },
  workflows: {
    title: 'Industry Workflows',
    description: 'SketchUp for architecture, interiors, woodworking, landscape and 3D printing.',
  },
  hardware: {
    title: 'Hardware & Setup',
    description: 'Computers, GPUs, mice and peripherals for smooth SketchUp performance.',
  },
  news: {
    title: 'News',
    description: 'SketchUp releases, Trimble announcements and industry updates.',
  },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
export const CATEGORY_KEYS = Object.keys(CATEGORIES) as [CategoryKey, ...CategoryKey[]];
