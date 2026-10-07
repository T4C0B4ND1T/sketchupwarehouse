// Shares newly published articles and free components on the SketchUp
// Warehouse Facebook Page.
//
//   node scripts/facebook-post.mjs --find
//     After a build: compares dist's sitemap with the live site's and prints
//     the articles and components this deploy makes public, as JSON. Run
//     before deploying, while the live sitemap is still the old one.
//
//   node scripts/facebook-post.mjs --post
//     Posts each article in $NEW_POSTS (the JSON from --find) to the Page,
//     once its URL is live.
//
//   node scripts/facebook-post.mjs --share <article URL>
//     Posts one article by hand (the "Share on Facebook" workflow).
//
// Needs FACEBOOK_PAGE_TOKEN, a Page access token with pages_manage_posts.
// Without it, posting is skipped and nothing fails.
import fs from 'node:fs';

const SITE = (process.env.SITE_URL || 'https://sketchupwarehouse.com').replace(/\/$/, '');
const GRAPH = `https://graph.facebook.com/${process.env.FACEBOOK_GRAPH_VERSION || 'v23.0'}`;
const TOKEN = process.env.FACEBOOK_PAGE_TOKEN || '';
// A deploy normally makes one article public, occasionally a few scheduled
// ones together. Many more means URLs changed (e.g. renamed pages),
// and posting them all would flood the Page, so nothing is posted.
const MAX_PER_DEPLOY = 5;

const decode = (s) =>
  s
    .replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&');

const meta = (html, p) => decode(html.match(new RegExp(`<meta (?:property|name)="${p}" content="([^"]*)"`))?.[1] ?? '');
const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1].trim()));
// Articles and free components; listing pages and hubs aren't shared.
const SHAREABLE = /^\/(blog|components)\/[^/]+\/$/;

// Paths of every page in a sitemap index, read with the given loader.
async function sitemapPaths(read) {
  const paths = new Set();
  for (const sitemap of locs(await read('sitemap-index.xml'))) {
    for (const loc of locs(await read(new URL(sitemap).pathname.slice(1)))) paths.add(new URL(loc).pathname);
  }
  return paths;
}

async function find() {
  const built = await sitemapPaths((file) => fs.readFileSync(`dist/${file}`, 'utf8'));
  let live;
  try {
    live = await sitemapPaths(async (file) => {
      const res = await fetch(`${SITE}/${file}`, { signal: AbortSignal.timeout(30_000) });
      if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`);
      return res.text();
    });
  } catch (err) {
    console.error(`Couldn't read the live sitemap (${err.message}), so nothing will be shared this time.`);
    return [];
  }
  if (![...live].some((p) => SHAREABLE.test(p))) {
    console.error('The live site has no articles yet, so nothing will be shared this time.');
    return [];
  }
  const fresh = [...built].filter((p) => SHAREABLE.test(p) && !live.has(p));
  if (fresh.length > MAX_PER_DEPLOY) {
    console.error(`${fresh.length} pages look new, more than ${MAX_PER_DEPLOY}, so none will be shared.`);
    return [];
  }
  return fresh.map((path) => {
    const html = fs.readFileSync(`dist${path}index.html`, 'utf8');
    const description = meta(html, 'og:description');
    return {
      link: `${SITE}${path}`,
      title: meta(html, 'og:title'),
      description: path.startsWith('/components/') ? `Free SketchUp model: ${description}` : description,
    };
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// GitHub Pages can take a minute to serve a new deploy everywhere.
async function waitUntilLive(url) {
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
      if (res.ok) return true;
    } catch {}
    await sleep(15_000);
  }
  return false;
}

async function postToPage({ link, description }) {
  const body = new URLSearchParams({ link, message: description, access_token: TOKEN });
  const res = await fetch(`${GRAPH}/me/feed`, { method: 'POST', body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) throw new Error(data.error?.message || `HTTP ${res.status}`);
  return data.id;
}

async function post(articles) {
  if (articles.length === 0) return console.log('No new articles to share.');
  if (!TOKEN) {
    console.log('FACEBOOK_PAGE_TOKEN is not set, so these were not shared:');
    for (const a of articles) console.log(`  ${a.link}`);
    return;
  }
  let failed = 0;
  for (const article of articles) {
    if (!(await waitUntilLive(article.link))) {
      console.error(`Not shared, the page never went live: ${article.link}`);
      failed++;
      continue;
    }
    try {
      const id = await postToPage(article);
      console.log(`Shared ${article.link} (post ${id})`);
    } catch (err) {
      console.error(`Facebook refused ${article.link}: ${err.message}`);
      failed++;
    }
  }
  if (failed) process.exitCode = 1;
}

async function share(url) {
  if (!TOKEN) throw new Error('Add the FACEBOOK_PAGE_TOKEN secret first (see "Facebook Page" in the README).');
  if (!url?.startsWith('http')) throw new Error('Give the full article URL, e.g. https://sketchupwarehouse.com/blog/<slug>/');
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} returned HTTP ${res.status}`);
  const html = await res.text();
  await post([{ link: url, title: meta(html, 'og:title'), description: meta(html, 'og:description') }]);
}

const [mode, arg] = process.argv.slice(2);
if (mode === '--find') console.log(JSON.stringify(await find()));
else if (mode === '--post') await post(JSON.parse(process.env.NEW_POSTS || '[]'));
else if (mode === '--share') await share(arg);
else {
  console.error('Usage: facebook-post.mjs --find | --post | --share <url>');
  process.exitCode = 2;
}
