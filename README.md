# SketchUp Warehouse

A static SketchUp content site that runs on its own: GitHub Actions has Claude research and write new articles on a schedule, checks that the site still builds, publishes them and redeploys. Money comes from Google AdSense, Amazon Associates links and (optionally) a newsletter.

- **Site:** [Astro](https://astro.build) static site, fast, SEO-ready (sitemap, RSS, canonical URLs, Open Graph, JSON-LD `BlogPosting`/`BreadcrumbList`, `robots.txt`, `ads.txt`).
- **Hosting:** GitHub Pages, $0.
- **Content engine:** by default, [Claude Code](https://github.com/anthropics/claude-code-action) runs inside GitHub Actions on your Claude subscription. It researches with web search and writes a cited Markdown article. `scripts/generate-post.mjs` picks the topic beforehand and runs quality checks on the result. It can also call the Claude API directly if you prefer pay-per-use billing.
- **Schedule:** evergreen articles Mon/Wed/Fri, a news article on Tuesdays, and a daily rebuild. That's about 17 articles a month.

## Monthly running cost

| Item | Cost |
|---|---|
| Domain (already owned) | about $1/mo ($10–20/yr renewal) |
| Hosting (GitHub Pages) | $0 |
| Build minutes (GitHub Actions) | $0 (a public repo, or well under the private-repo free tier) |
| Article writing with Claude Code (default) | $0 extra, uses your Claude Pro/Max plan's usage limits |
| *or* Claude API with `claude-opus-5` (`ARTICLE_ENGINE=api`) | about $5–10 |
| **Total** | **about $1/mo on top of your Claude plan** |

With Claude Code, each run shares your plan's usage limits with your own Claude use. At about 4 articles a week, that's a noticeable share on Pro and comfortable on Max. If a run hits your limit, that article fails, nothing gets published, and the next scheduled run tries again.

## One-time setup (about 30 minutes)

1. **Enable GitHub Pages.** Repo → *Settings → Pages → Source: GitHub Actions*.
2. **Point the domain at it.** At your registrar, add these DNS records:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `t4c0b4nd1t.github.io`

   Then, in *Settings → Pages*, set the custom domain to `sketchupwarehouse.com` and tick **Enforce HTTPS**. (`public/CNAME` is already committed.)
3. **Connect your Claude subscription.** On your computer, install Claude Code (`npm install -g @anthropic-ai/claude-code`), then run `claude setup-token` and sign in with your Claude account. Copy the token it prints and add it under *Settings → Secrets and variables → Actions → Secrets* as `CLAUDE_CODE_OAUTH_TOKEN`.
   - *Alternative, pay-per-use API:* create a key at [console.anthropic.com](https://console.anthropic.com) with web search enabled. Add it as the secret `ANTHROPIC_API_KEY`, and set the repository variable `ARTICLE_ENGINE` to `api`.
4. **Allow the bot to push.** *Settings → Actions → General → Workflow permissions → Read and write*. Also tick "Allow GitHub Actions to create pull requests" if you plan to use review mode.
5. **Test it.** *Actions → Generate article → Run workflow*. After a few minutes a new article should be live.

## Turning on revenue

All monetization settings are **repository variables** (*Settings → Secrets and variables → Actions → Variables*). You don't need to edit any code. Once a variable is set, the next deploy picks it up.

| Variable | What it does |
|---|---|
| `PUBLIC_ADSENSE_CLIENT` | Your AdSense ID, e.g. `ca-pub-1234…`. Loads AdSense and generates `ads.txt`. |
| `PUBLIC_ADSENSE_SLOT_IN_ARTICLE` / `_FOOTER` | Optional manual ad units. Without them, turn on **Auto ads** in AdSense. |
| `PUBLIC_AMAZON_TAG` | Amazon Associates tag. It's added to every Amazon link automatically, and those links are marked `rel="sponsored"`. |
| `PUBLIC_NEWSLETTER_ACTION` | Form endpoint from a free newsletter tool (Buttondown, MailerLite, Kit). Shows a signup box. |
| `PUBLIC_CF_ANALYTICS_TOKEN` or `PUBLIC_GA4_ID` | Free analytics. |
| `PUBLIC_CONTACT_EMAIL` | Shown on the Contact and Privacy pages. |
| `ARTICLE_ENGINE` | `claude-code` (default, uses your subscription) or `api` (uses `ANTHROPIC_API_KEY`). |
| `CLAUDE_CODE_MODEL` | Optional model for Claude Code runs, e.g. `sonnet` to use less of your plan's usage. If unset, your plan's default model is used. |
| `CLAUDE_MODEL` / `CLAUDE_EFFORT` | API engine only. The model defaults to `claude-opus-5` and effort to `medium`. |
| `PUBLISH_MODE` | `auto` (default) publishes straight away. `review` opens a PR that you merge to publish. |

Suggested order:

1. **Now:** submit the site to Google Search Console and Bing Webmaster Tools, and give them `/sitemap-index.xml`.
2. **After about 25–30 articles (roughly 6–8 weeks):** apply for AdSense. For EU/UK visitors, turn on Google's free consent message under *Privacy & messaging* in AdSense.
3. **Right away:** Amazon Associates (hardware articles), plus the Chaos (V-Ray/Enscape) and D5 affiliate programs if they're accepting partners.
4. **At about 10k sessions/month:** move from AdSense to Journey by Mediavine or Ezoic, which usually pay about 2–3× more per visitor.

## Content quality guardrails

Google demotes sites that publish large amounts of low-value AI text. The generator is set up to avoid that:

- It researches with web search and must cite sources. Articles with no sources, fewer than 700 words, or broken front matter are rejected, and nothing gets published.
- It picks from a curated list of real search-intent topics in `content-queue/topics.json` (87 topics to start). You can reorder or add topics at any time.
- Posts are labeled as AI-assisted and link to the editorial standards on `/about/`.
- It publishes about 4 articles a week instead of hundreds.
- **Best thing you can add:** spend 10 minutes a week reading new posts, or set `PUBLISH_MODE=review` and merge the PRs. Adding your own screenshots and experience is what makes a niche site stand out in search.

## Local development

```bash
npm install
npm run dev                                   # http://localhost:4321
ANTHROPIC_API_KEY=... npm run generate:dry    # print an article without saving it
ANTHROPIC_API_KEY=... npm run generate -- --news

# Claude Code engine, as the Action runs it:
node scripts/generate-post.mjs --prepare        # writes .article/prompt.md
claude "Read .article/prompt.md and follow it"  # writes .article/draft.md
node scripts/generate-post.mjs --finalize       # validates and saves the post
```

Articles are plain Markdown files in `src/content/posts/`. You can edit, delete or write your own there. A post dated in the future goes live on its date, thanks to the daily rebuild.

## Trademark note

SketchUp and 3D Warehouse are trademarks of Trimble Inc. The site says it is independent in the footer, on the About page and in the 404 page. It also sends people looking for models to the official 3D Warehouse. Keep it that way: don't copy Trimble's logo or styling, and don't present the site as an official model library.
