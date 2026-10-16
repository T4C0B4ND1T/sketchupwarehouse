#!/usr/bin/env node
// Connects free components to their 3D Warehouse pages, with no copy-pasting.
//
// It reads the public model list of the site's 3D Warehouse account and, for
// each component in src/content/components/ without `warehouseUrl`, looks for
// an uploaded model with the same title (or one whose description links the
// component's /components/<slug>/ page). When it finds one it:
//   1. writes `warehouseUrl` into the component's front matter, and
//   2. writes the announcement post (category news, author joel) if the
//      component doesn't have one yet, using the preview as its cover.
//
// Usage:  node scripts/link-warehouse.mjs [--dry-run]
// WAREHOUSE_CREATOR_ID overrides the account (its 3D Warehouse user id).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const COMPONENTS_DIR = path.join(root, 'src/content/components');
const POSTS_DIR = path.join(root, 'src/content/posts');
const API = process.env.WAREHOUSE_API_BASE || 'https://3dwarehouse.sketchup.com/warehouse/v1.0';
// The components@sketchupwarehouse.com account ("Sketchup C." on 3D Warehouse).
const CREATOR = process.env.WAREHOUSE_CREATOR_ID || '934ffd1a-74c3-47f2-9222-dfcc4ec0dbcd';
const dryRun = process.argv.includes('--dry-run');

const normalize = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

function read(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`No front matter in ${path.basename(file)}`);
  return { raw, fm: m[1], data: YAML.parse(m[1]), body: m[2] };
}

// Same shape as the links 3D Warehouse gives when you copy a model's URL.
export function modelUrl(entry) {
  const slug = String(entry.title).replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `https://3dwarehouse.sketchup.com/model/${entry.id}${slug ? `/${slug}` : ''}`;
}

async function listModels() {
  const models = [];
  for (let start = 1; ; start += 100) {
    const q = new URLSearchParams({
      contentType: '3dw',
      fq: `creatorId==${CREATOR}`,
      startRow: String(start),
      endRow: String(start + 99),
    });
    const res = await fetch(`${API}/entities?${q}`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`3D Warehouse list failed (${res.status})`);
    const { entries = [], total = 0 } = await res.json();
    models.push(...entries);
    if (!entries.length || models.length >= total) break;
  }
  return models.filter((e) => e.id && e.title && !e.isPrivate && !e.isHidden);
}

export function findModel(slug, title, models) {
  const want = normalize(title);
  return (
    models.find((e) => normalize(e.title) === want) ||
    models.find((e) => String(e.description || '').includes(`/components/${slug}/`))
  );
}

function hasAnnouncement(slug) {
  return fs.readdirSync(POSTS_DIR).some((f) => {
    if (!f.endsWith('.md')) return false;
    const { data, body } = read(path.join(POSTS_DIR, f));
    return (data.tags || []).includes('free components') && body.includes(`/components/${slug}/`);
  });
}

function announcement(slug, data, body, url) {
  const title = `Free SketchUp Model: ${data.title}`.slice(0, 110);
  // The component's description without its closing "Category ..." note.
  const summary = String(data.description).replace(/\s*Category\b.*$/, '').trim();
  const more = ' Free to download, or open it on 3D Warehouse.';
  const description = (summary.length + more.length <= 200 ? summary + more : summary).slice(0, 200);
  // The category is the first tag, e.g. "22 Plumbing" → "plumbing".
  const category = String(data.tags?.[0] || '').replace(/^\d+\s*/, '').toLowerCase();
  const tags = ['free components', ...(category ? [category] : []), '3d warehouse'];
  const ext = path.extname(data.preview.src);
  const cover = `free-sketchup-${slug}-model${ext}`;

  const [intro, ...rest] = body.trim().split(/\n(?=## )/);
  const frontMatter = {
    title,
    description,
    pubDate: new Date().toISOString().slice(0, 10),
    category: 'news',
    tags,
    aiAssisted: true,
    author: 'joel',
    sources: [{ title: `${data.title} on 3D Warehouse`, url }],
    cover: { src: `./images/${cover}`, alt: data.preview.alt },
  };
  const text = [
    `${intro.trim()} It's free for personal and commercial projects.`,
    `**Get it:** [download the .skp](/components/${slug}/) from our library, or [open it on 3D Warehouse](${url}) to load it straight into SketchUp.`,
    ...rest.map((s) => s.trim()),
  ].join('\n\n');
  return {
    file: path.join(POSTS_DIR, `free-sketchup-${slug}-model.md`),
    content: `---\n${YAML.stringify(frontMatter, { lineWidth: 0 }).trim()}\n---\n\n${text}\n`,
    coverFrom: path.join(COMPONENTS_DIR, data.preview.src),
    coverTo: path.join(POSTS_DIR, 'images', cover),
  };
}

async function main() {
  const pending = fs
    .readdirSync(COMPONENTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ slug: f.replace(/\.md$/, ''), file: path.join(COMPONENTS_DIR, f), ...read(path.join(COMPONENTS_DIR, f)) }))
    .filter((c) => !c.data.warehouseUrl && !c.data.draft);
  if (!pending.length) return console.log('Every component already has its 3D Warehouse link.');

  const models = await listModels();
  console.log(`${models.length} public models on the 3D Warehouse account; ${pending.length} components without a link.`);

  for (const c of pending) {
    const model = findModel(c.slug, c.data.title, models);
    if (!model) {
      console.log(`- ${c.slug}: not on 3D Warehouse yet`);
      continue;
    }
    const url = modelUrl(model);
    console.log(`- ${c.slug}: ${url}`);
    // Insert the line after `file:` so the rest of the front matter stays as written.
    const fm = /^file:.*$/m.test(c.fm) ? c.fm.replace(/^(file:.*)$/m, `$1\nwarehouseUrl: ${url}`) : `${c.fm}\nwarehouseUrl: ${url}`;
    if (!dryRun) fs.writeFileSync(c.file, c.raw.replace(c.fm, fm));

    if (hasAnnouncement(c.slug)) continue;
    const post = announcement(c.slug, c.data, c.body, url);
    console.log(`  + post ${path.relative(root, post.file)}`);
    if (dryRun) continue;
    fs.writeFileSync(post.file, post.content);
    fs.copyFileSync(post.coverFrom, post.coverTo);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
