#!/usr/bin/env node
// Adds a cover photo to every post that doesn't have one yet.
//
// For each post in src/content/posts/ without `cover`, it searches Pexels
// (free stock photos, commercial use allowed) with the post's `imageQuery`,
// or a category default when there isn't one. It picks a landscape photo no
// other post uses, saves a 1600px JPEG to src/content/posts/images/, and
// writes `cover` (image, alt text, photographer credit) into the front matter.
//
// Usage:  PEXELS_API_KEY=... node scripts/add-images.mjs [--dry-run]
// Without PEXELS_API_KEY it prints a notice and exits 0, so publishing an
// article never fails just because images aren't set up.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const POSTS_DIR = path.join(root, 'src/content/posts');
const IMAGES_DIR = path.join(POSTS_DIR, 'images');
const API = process.env.PEXELS_API_BASE || 'https://api.pexels.com/v1';
const KEY = process.env.PEXELS_API_KEY;
const dryRun = process.argv.includes('--dry-run');

// Used when a post has no imageQuery of its own.
const CATEGORY_QUERIES = {
  tutorials: 'architect working 3d model computer',
  extensions: 'designer workstation monitors',
  rendering: 'modern interior design living room',
  workflows: 'architecture model building',
  hardware: 'computer workstation desk setup',
  news: 'modern architecture building',
};

function readPost(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`No front matter in ${path.basename(file)}`);
  return { data: YAML.parse(m[1]), body: m[2] };
}

function writePost(file, data, body) {
  fs.writeFileSync(file, `---\n${YAML.stringify(data, { lineWidth: 0 }).trim()}\n---\n${body}`);
}

async function search(query) {
  const url = `${API}/search?${new URLSearchParams({ query, orientation: 'landscape', per_page: '30' })}`;
  const res = await fetch(url, { headers: { Authorization: KEY } });
  if (!res.ok) throw new Error(`Pexels search failed (${res.status}) for "${query}"`);
  return (await res.json()).photos ?? [];
}

async function download(photo, dest) {
  const src = new URL(photo.src.original);
  src.search = new URLSearchParams({ auto: 'compress', cs: 'tinysrgb', w: '1600', fm: 'jpg' }).toString();
  const res = await fetch(src);
  if (!res.ok) throw new Error(`Image download failed (${res.status})`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

async function main() {
  if (!KEY) {
    console.error('[images] PEXELS_API_KEY not set; skipping cover photos.');
    return;
  }
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md')).map((f) => path.join(POSTS_DIR, f));
  const posts = files.map((file) => ({ file, slug: path.basename(file, '.md'), ...readPost(file) }));
  const used = new Set(posts.map((p) => p.data.cover?.pexelsId).filter(Boolean));
  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  let added = 0;
  for (const post of posts.filter((p) => !p.data.cover)) {
    const query = post.data.imageQuery || CATEGORY_QUERIES[post.data.category] || 'architecture design';
    const photos = await search(query);
    // Prefer genuinely wide photos that no other post uses.
    const photo = photos.find((ph) => !used.has(ph.id) && ph.width >= 1600 && ph.width / ph.height >= 1.3);
    if (!photo) {
      console.error(`[images] no unused photo for "${query}" (${post.slug}); skipping`);
      continue;
    }
    used.add(photo.id);
    const rel = `./images/${post.slug}.jpg`;
    const cover = {
      src: rel,
      alt: (photo.alt || query).trim(),
      credit: photo.photographer,
      creditUrl: photo.url,
      pexelsId: photo.id,
    };
    console.error(`[images] ${post.slug}: "${query}" → ${photo.url} (${photo.photographer})`);
    if (dryRun) continue;
    await download(photo, path.join(IMAGES_DIR, `${post.slug}.jpg`));
    writePost(post.file, { ...post.data, cover }, post.body);
    added++;
  }
  console.error(`[images] ${added} cover photo(s) added`);
}

main().catch((err) => {
  console.error('[images] error:', err.message);
  process.exit(1);
});
