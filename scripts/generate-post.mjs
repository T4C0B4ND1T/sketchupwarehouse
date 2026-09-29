#!/usr/bin/env node
// Autonomous article generator for SketchUp Warehouse.
//
// Picks the next unused topic from content-queue/topics.json (or, on news days,
// asks Claude to find a fresh SketchUp news story), has Claude research it with
// web search, and writes a Markdown post into src/content/posts/.
//
// Two ways to run it:
//
// 1. Claude API (billed per token):
//   node scripts/generate-post.mjs               # evergreen topic from the queue
//   node scripts/generate-post.mjs --news        # latest-news article
//   node scripts/generate-post.mjs --dry-run     # print the post instead of writing it
//
// 2. Claude Code (billed to a Claude subscription), used by the GitHub Action:
//   node scripts/generate-post.mjs --prepare [--news]   # writes .article/prompt.md
//   ...Claude Code follows the prompt and writes .article/draft.md...
//   node scripts/generate-post.mjs --finalize           # validates the draft and saves the post
//
// Env (API mode only):
//   ANTHROPIC_API_KEY   required
//   CLAUDE_MODEL        optional, defaults to claude-opus-5
//   CLAUDE_EFFORT       optional, low|medium|high (default medium)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';
import YAML from 'yaml';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const POSTS_DIR = path.join(root, 'src/content/posts');
const QUEUE_FILE = path.join(root, 'content-queue/topics.json');

const MODEL = process.env.CLAUDE_MODEL || 'claude-opus-5';
const EFFORT = process.env.CLAUDE_EFFORT || 'medium';
const CATEGORIES = ['tutorials', 'extensions', 'rendering', 'workflows', 'hardware', 'news'];
const MIN_WORDS = 700;
const MIN_SOURCES = 2;

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const prepareMode = args.has('--prepare');
const finalizeMode = args.has('--finalize');
const JOB_DIR = path.join(root, '.article');
const JOB_FILE = path.join(JOB_DIR, 'job.json');
const PROMPT_FILE = path.join(JOB_DIR, 'prompt.md');
const DRAFT_FILE = path.join(JOB_DIR, 'draft.md');
// In finalize mode the mode comes from the prepared job, not the CLI.
const job = finalizeMode ? JSON.parse(fs.readFileSync(JOB_FILE, 'utf8')) : null;
const newsMode = job ? job.news : args.has('--news');

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

function existingPosts() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8');
      const fm = raw.match(/^---\n([\s\S]*?)\n---/);
      const data = fm ? YAML.parse(fm[1]) : {};
      return { slug: f.replace(/\.md$/, ''), title: data.title ?? '', topicId: data.topicId };
    });
}

function nextTopic(published) {
  const queue = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));
  const done = new Set(published.map((p) => p.topicId).filter(Boolean));
  const topic = queue.topics.find((t) => !done.has(t.id));
  if (!topic) throw new Error('Topic queue is empty — add more topics to content-queue/topics.json');
  return topic;
}

const SYSTEM = `You are the staff writer for SketchUp Warehouse (sketchupwarehouse.com), an independent site for SketchUp users: architects, interior designers, woodworkers, landscape designers and hobbyists.

Write genuinely useful, accurate, people-first articles. Standards:
- Research with web search before writing. Prefer official sources (sketchup.com, help.sketchup.com, forums.sketchup.com, extensions.sketchup.com, vendor docs) and reputable publications.
- Never invent version numbers, prices, release dates, menu paths, keyboard shortcuts or features. If you cannot verify a detail, leave it out or say it may vary by version.
- Verify every keyboard shortcut, modifier key (Shift/Ctrl/Option/Alt) and tool behavior you describe against the official SketchUp Help Center (help.sketchup.com) page for that tool before writing it. Modifier keys are easy to mix up — for example, with the Eraser, Shift hides edges while Ctrl/Option softens and smooths them.
- Cite at least 2 distinct sources you actually consulted, including the official help page for any tool whose behavior you describe.
- Be specific: concrete steps, real menu names, real extension names, practical tips from experience, common mistakes and how to fix them.
- Plain, confident, friendly tone. No filler intros ("In today's fast-paced world..."), no "In conclusion", no hype, no emojis.
- Structure with ## and ### headings, short paragraphs, numbered steps for procedures, and a comparison table when comparing options. Use <kbd>X</kbd> for keys.
- Do not start the body with an H1 or repeat the title. Start with a 2–3 sentence intro that answers the reader's question fast.
- End with a short "## FAQ" section of 3–4 real questions people search for.
- Length: 1,000–1,800 words.
- SketchUp and 3D Warehouse are Trimble trademarks; this site is not affiliated with Trimble.
- When recommending physical products (mice, laptops, GPUs, 3D printers), you may link to an Amazon search URL of the form https://www.amazon.com/s?k=product+name — never fabricate product-page URLs.

Output format — return ONLY the finished file, nothing before or after it:
---
title: "<compelling, specific, <= 70 chars, includes the main keyword>"
description: "<meta description, 140–160 chars>"
category: <one of: ${CATEGORIES.join(', ')}>
tags: [<3–6 short lowercase tags>]
imageQuery: "<3–6 word stock-photo search for a real-world scene that fits the article, e.g. 'architect reviewing floor plans', 'woodworking workshop table saw', 'modern kitchen interior'. No brand names, logos or software screenshots.>"
sources:
  - title: "<source title>"
    url: "<source url you actually used>"
---

<markdown body>`;

function userPrompt(topic) {
  if (newsMode) {
    const recent = existingPosts()
      .slice(-40)
      .map((p) => `- ${p.title}`)
      .join('\n');
    return `Today is ${new Date().toISOString().slice(0, 10)}. Search for the most significant SketchUp-related news from the last 14 days (SketchUp releases and updates, Trimble announcements, major extension or renderer releases such as V-Ray, Enscape, D5 Render, Twinmotion, notable 3D Warehouse or LayOut changes).

Pick ONE story that is not already covered by these existing articles:
${recent || '(none yet)'}

Write a news article in the "news" category explaining what changed, who it matters to, and what readers should do about it. Cite the primary source. If you cannot find any genuinely new story from the last 14 days, instead write an evergreen "what's new in the current version of SketchUp" explainer based on the latest official release notes.`;
  }
  return `Write an article on this topic.

Topic: ${topic.title}
Target search keyword: ${topic.keyword}
Category: ${topic.category}
Angle / notes: ${topic.angle ?? 'Practical and specific.'}`;
}

async function callClaude(prompt) {
  const client = new Anthropic();
  const messages = [{ role: 'user', content: prompt }];
  const tools = [{ type: 'web_search_20260209', name: 'web_search', max_uses: 8 }];
  const useFallbacks = MODEL === 'claude-opus-5';

  // Server tools can pause long turns (stop_reason "pause_turn"); resume until done.
  for (let i = 0; i < 5; i++) {
    const stream = client.beta.messages.stream({
      model: MODEL,
      max_tokens: 32000,
      system: SYSTEM,
      thinking: { type: 'adaptive' },
      output_config: { effort: EFFORT },
      tools,
      messages,
      ...(useFallbacks ? { betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' } : {}),
    });
    const msg = await stream.finalMessage();
    console.error(
      `[claude] stop=${msg.stop_reason} in=${msg.usage.input_tokens} out=${msg.usage.output_tokens} searches=${msg.usage.server_tool_use?.web_search_requests ?? 0}`,
    );

    if (msg.stop_reason === 'refusal') throw new Error('Model declined this topic; skipping.');
    if (msg.stop_reason === 'pause_turn') {
      messages.push({ role: 'assistant', content: msg.content });
      continue;
    }
    if (msg.stop_reason === 'max_tokens') throw new Error('Output hit max_tokens; article truncated.');

    const text = msg.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('');
    return text;
  }
  throw new Error('Too many pause_turn continuations.');
}

function parseArticle(raw) {
  // Tolerate stray prose or a code fence around the file.
  const start = raw.indexOf('---\n');
  if (start === -1) throw new Error('No frontmatter found in model output.');
  const text = raw.slice(start).replace(/\n```\s*$/, '');
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error('Malformed frontmatter in model output.');
  const data = YAML.parse(m[1]);
  const body = m[2].trim();

  const problems = [];
  if (typeof data.title !== 'string' || data.title.length < 10 || data.title.length > 110) problems.push('title');
  if (typeof data.description !== 'string' || data.description.length < 50 || data.description.length > 200)
    problems.push('description');
  if (!CATEGORIES.includes(data.category)) problems.push(`category "${data.category}"`);
  if (!Array.isArray(data.tags)) data.tags = [];
  if (!Array.isArray(data.sources)) data.sources = [];
  data.sources = data.sources.filter((s) => {
    try {
      return s && typeof s.title === 'string' && new URL(s.url).protocol.startsWith('http');
    } catch {
      return false;
    }
  });
  const words = body.split(/\s+/).length;
  if (words < MIN_WORDS) problems.push(`too short (${words} words)`);
  const distinctSources = new Set(data.sources.map((src) => src.url.replace(/[#?].*$/, '').replace(/\/$/, '')));
  if (distinctSources.size < MIN_SOURCES) problems.push(`only ${distinctSources.size} source(s), need ${MIN_SOURCES}`);
  if (/^#\s/m.test(body)) problems.push('body contains an H1');
  if (problems.length) throw new Error(`Article failed quality checks: ${problems.join(', ')}`);

  return { data, body, words };
}

function toMarkdown(data, body) {
  const fm = YAML.stringify(data, { lineWidth: 0 }).trim();
  return `---\n${fm}\n---\n\n${body}\n`;
}

function savePost(raw, topic, published) {
  const { data, body, words } = parseArticle(raw);

  const today = new Date().toISOString().slice(0, 10);
  const post = {
    title: data.title,
    description: data.description,
    pubDate: today,
    category: newsMode ? 'news' : topic.category,
    tags: data.tags.map((t) => String(t).toLowerCase()).slice(0, 6),
    aiAssisted: true,
    ...(topic ? { topicId: topic.id } : {}),
    ...(typeof data.imageQuery === 'string' && data.imageQuery.trim() ? { imageQuery: data.imageQuery.trim().slice(0, 80) } : {}),
    sources: data.sources.slice(0, 8),
  };

  let slug = slugify(topic?.slug ?? data.title);
  const taken = new Set(published.map((p) => p.slug));
  if (taken.has(slug)) slug = `${slug}-${today}`;
  if (taken.has(slug)) throw new Error(`Slug collision: ${slug}`);

  const file = path.join(POSTS_DIR, `${slug}.md`);
  const md = toMarkdown(post, body);
  if (dryRun) {
    process.stdout.write(md);
  } else {
    fs.writeFileSync(file, md);
  }
  console.error(`[done] ${dryRun ? '(dry run) ' : ''}${path.relative(root, file)} — ${words} words`);
  // Expose the title to the GitHub Action for the commit message.
  if (process.env.GITHUB_OUTPUT && !dryRun) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `title=${post.title.replace(/\n/g, ' ')}\nslug=${slug}\n`);
  }
}

function prepare(topic) {
  fs.mkdirSync(JOB_DIR, { recursive: true });
  fs.writeFileSync(JOB_FILE, JSON.stringify({ news: newsMode, topic }, null, 2));
  fs.rmSync(DRAFT_FILE, { force: true });
  const prompt = `${SYSTEM}

## Your assignment

${userPrompt(topic)}

## How to deliver it

- Use the WebSearch and WebFetch tools to research before writing.
- Write the finished file (front matter + body, exactly in the output format above) to \`.article/draft.md\` using the Write tool.
- Do not create, edit or delete any other file, and do not run git commands. A script validates and publishes the draft after you finish.
`;
  fs.writeFileSync(PROMPT_FILE, prompt);
  console.error(`[prepared] ${path.relative(root, PROMPT_FILE)}`);
}

async function main() {
  const published = existingPosts();

  if (finalizeMode) {
    if (!fs.existsSync(DRAFT_FILE)) throw new Error('No draft found at .article/draft.md — Claude Code did not finish the article.');
    savePost(fs.readFileSync(DRAFT_FILE, 'utf8'), job.topic, published);
    return;
  }

  const topic = newsMode ? null : nextTopic(published);
  console.error(newsMode ? '[topic] latest news' : `[topic] ${topic.id}: ${topic.title}`);

  if (prepareMode) {
    prepare(topic);
    return;
  }

  const raw = await callClaude(userPrompt(topic));
  savePost(raw, topic, published);
}

main().catch((err) => {
  if (err instanceof Anthropic.RateLimitError) console.error('[error] rate limited:', err.message);
  else if (err instanceof Anthropic.AuthenticationError) console.error('[error] bad ANTHROPIC_API_KEY');
  else if (err instanceof Anthropic.APIError) console.error(`[error] API ${err.status}:`, err.message);
  else console.error('[error]', err.message);
  process.exit(1);
});
