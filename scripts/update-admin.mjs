#!/usr/bin/env node
// Pins the /admin editor (Sveltia CMS) to an exact version with a Subresource
// Integrity hash, so the browser refuses to run the file if it was altered.
//
// It downloads the file from unpkg AND from the official npm tarball, checks
// they're byte-identical (so the CDN is serving exactly what was published),
// then rewrites the <script> tag in public/admin/index.html.
//
// Usage:
//   node scripts/update-admin.mjs            # pin the latest release
//   node scripts/update-admin.mjs 0.223.0    # pin a specific version
// Prints "unchanged" or "updated <old> -> <new>" and sets GITHUB_OUTPUT
// `version`/`changed` when run in Actions.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HTML = path.join(root, 'public/admin/index.html');
const PKG = '@sveltia/cms';
const FILE = 'dist/sveltia-cms.js';

async function get(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} fetching ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const meta = JSON.parse(
    (await get(`https://registry.npmjs.org/${PKG}/${process.argv[2] || 'latest'}`)).toString(),
  );
  const version = meta.version;

  // Official npm tarball, checked against the registry's own sha512.
  const tgz = await get(meta.dist.tarball);
  const expected = meta.dist.integrity;
  const actual = `sha512-${crypto.createHash('sha512').update(tgz).digest('base64')}`;
  if (expected !== actual) throw new Error(`npm tarball integrity mismatch for ${version}`);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sveltia-'));
  fs.writeFileSync(path.join(tmp, 'pkg.tgz'), tgz);
  execFileSync('tar', ['-xzf', 'pkg.tgz', `package/${FILE}`], { cwd: tmp });
  const fromNpm = fs.readFileSync(path.join(tmp, 'package', FILE));
  fs.rmSync(tmp, { recursive: true, force: true });

  // The CDN copy the browser will actually load must match the npm copy.
  const url = `https://unpkg.com/${PKG}@${version}/${FILE}`;
  const fromCdn = await get(url);
  if (!fromCdn.equals(fromNpm)) throw new Error(`unpkg file differs from the npm package for ${version}`);

  const sri = `sha384-${crypto.createHash('sha384').update(fromCdn).digest('base64')}`;
  const tag = `<script src="${url}" integrity="${sri}" crossorigin="anonymous"></script>`;

  const html = fs.readFileSync(HTML, 'utf8');
  const re = /<script src="https:\/\/unpkg\.com\/@sveltia\/cms[^"]*"[^>]*><\/script>/;
  if (!re.test(html)) throw new Error('Sveltia <script> tag not found in public/admin/index.html');
  const old = html.match(/@sveltia\/cms@([\d.]+)/)?.[1] ?? 'unpinned';
  const next = html.replace(re, tag);

  const changed = next !== html;
  if (changed) fs.writeFileSync(HTML, next);
  console.log(changed ? `updated ${old} -> ${version}` : `unchanged (${version})`);
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `version=${version}\nchanged=${changed}\n`);
  }
}

main().catch((err) => {
  console.error('[update-admin]', err.message);
  process.exit(1);
});
