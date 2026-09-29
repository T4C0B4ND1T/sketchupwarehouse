#!/usr/bin/env node
// Reads an "Article request" issue (.github/ISSUE_TEMPLATE/article-request.yml)
// from the GitHub event and either:
//   - prints the request fields to $GITHUB_OUTPUT so the workflow can start
//     "Generate article" with them, or
//   - with --add, appends the request to content-queue/topics.json.
//
// Usage (in the Action): node scripts/topic-request.mjs [--add]
// Locally: GITHUB_EVENT_PATH=event.json node scripts/topic-request.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const QUEUE_FILE = path.join(root, 'content-queue/topics.json');
const CATEGORIES = ['tutorials', 'extensions', 'rendering', 'workflows', 'hardware'];

// Issue forms render each field as "### Label\n\nvalue"; empty fields read "_No response_".
function parseForm(body) {
  const fields = {};
  for (const part of (body ?? '').split(/^### /m).slice(1)) {
    const nl = part.indexOf('\n');
    const label = part.slice(0, nl).trim();
    const value = part.slice(nl + 1).trim();
    fields[label] = value === '_No response_' ? '' : value;
  }
  return fields;
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
    .replace(/-$/, '');
}

function readRequest() {
  const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const f = parseForm(event.issue.body);
  const oneLine = (s) => (s ?? '').replace(/\s+/g, ' ').trim();
  const request = {
    add: /topic list/i.test(f['What should happen?'] ?? ''),
    topic: oneLine(f['Topic']).slice(0, 200),
    link: oneLine(f['Link to an article']),
    notes: oneLine(f['Angle or notes']).slice(0, 1000),
    category: CATEGORIES.includes(f['Category']) ? f['Category'] : '',
  };
  if (!request.topic && !request.link) throw new Error('The request needs a topic or a link.');
  if (request.link) {
    let url;
    try {
      url = new URL(request.link);
    } catch {
      throw new Error(`"${request.link}" isn't a valid link.`);
    }
    if (!/^https?:$/.test(url.protocol)) throw new Error('The link must start with http:// or https://.');
  }
  return request;
}

function addToQueue(request) {
  const queue = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));
  // Without a topic the link's address stands in as the title until you edit it.
  const title = request.topic || `Article based on ${request.link}`;
  const id = slugify(title) || `request-${Date.now()}`;
  if (queue.topics.some((t) => (t.id || slugify(t.title ?? '')) === id)) {
    throw new Error(`"${title}" is already in the topic list.`);
  }
  queue.topics.push({
    title,
    ...(request.category ? { category: request.category } : {}),
    ...(request.notes ? { angle: request.notes } : {}),
    ...(request.link ? { link: request.link } : {}),
  });
  fs.writeFileSync(QUEUE_FILE, `${JSON.stringify(queue, null, 2)}\n`);
  return { title, position: queue.topics.length };
}

function output(values) {
  const lines = Object.entries(values).map(([k, v]) => `${k}=${String(v).replace(/[\r\n]+/g, ' ')}`);
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `${lines.join('\n')}\n`);
  else console.log(lines.join('\n'));
}

try {
  const request = readRequest();
  if (process.argv.includes('--add')) output(addToQueue(request));
  else output({ ...request, error: '' });
} catch (err) {
  console.error('[error]', err.message);
  output({ error: err.message });
  process.exit(1);
}
