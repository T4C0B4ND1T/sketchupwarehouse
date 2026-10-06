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
  // AdSense ad unit IDs (the data-ad-slot number). Create two units in AdSense:
  // a Display ad (used by every display zone) and an In-article ad.
  adSlots: {
    display: env.PUBLIC_ADSENSE_SLOT_DISPLAY || '',
    inArticle: env.PUBLIC_ADSENSE_SLOT_IN_ARTICLE || '',
  },
  // Local design preview only: draws each zone's box and size instead of a real ad.
  // Never set this in the deploy workflow.
  adPreview: env.PUBLIC_AD_PREVIEW === 'true',
  // Amazon Associates tag, appended to amazon.com links in posts at build time.
  amazonTag: env.PUBLIC_AMAZON_TAG || '',
  // Newsletter form endpoint (e.g. Buttondown/MailerLite free tier embed URL).
  newsletterAction: env.PUBLIC_NEWSLETTER_ACTION || '',
};

// Designated ad zones. Switch a zone off by setting enabled: false.
// shape → size, chosen from the zone's own width (see "Ads" in global.css):
//   banner    728×90 when the zone is at least 728px wide, otherwise 320×100
//   rectangle 336×280 when at least 336px wide, otherwise 300×250
//   sidebar   300×250 (hidden when the sidebar is narrower than 300px)
//   native    AdSense in-article unit, full width of the text column
export const AD_ZONES = {
  pageTop: { enabled: true, shape: 'banner', label: 'Below page header · 728×90 / 320×100' },
  feed: { enabled: true, shape: 'banner', label: 'In article list · 728×90 / 320×100' },
  inArticle: { enabled: true, shape: 'native', label: 'In-article · fluid, text-column width' },
  sidebar: { enabled: true, shape: 'sidebar', label: 'Sidebar · 300×250' },
  articleEnd: { enabled: true, shape: 'rectangle', label: 'After article · 336×280 / 300×250' },
  sectionBreak: { enabled: true, shape: 'banner', label: 'Between sections · 728×90 / 320×100' },
} as const;
export type AdZoneKey = keyof typeof AD_ZONES;

export const ANALYTICS = {
  // Cloudflare Web Analytics token (free, cookieless). Empty = disabled.
  cloudflareToken: env.PUBLIC_CF_ANALYTICS_TOKEN || '',
  // Google Analytics 4 measurement ID, e.g. "G-XXXXXXX". Empty = disabled.
  ga4Id: env.PUBLIC_GA4_ID || '',
};

// Search engine ownership checks. Paste only the content="..." value of the
// HTML-tag method. Empty = no tag (not needed if you verified by DNS).
export const VERIFICATION = {
  google: env.PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  bing: env.PUBLIC_BING_SITE_VERIFICATION || '',
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
