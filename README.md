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
4. **Allow the bot to push.** *Settings → Actions → General → Workflow permissions → Read and write*. Also tick "Allow GitHub Actions to create pull requests". Article requests and review mode need it.
5. **Test it.** *Actions → Generate article → Run workflow*. After a few minutes a new article should be live.

## Turning on revenue

All monetization settings are **repository variables** (*Settings → Secrets and variables → Actions → Variables*). You don't need to edit any code. Once a variable is set, the next deploy picks it up.

| Variable | What it does |
|---|---|
| `PUBLIC_ADSENSE_CLIENT` | Your AdSense ID, e.g. `ca-pub-1234…`. Loads AdSense and generates `ads.txt`. |
| `PUBLIC_ADSENSE_SLOT_DISPLAY` / `PUBLIC_ADSENSE_SLOT_IN_ARTICLE` | Ad unit IDs for the designated ad zones (see below). |
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

## Request an article

Give a topic or a link to an article. It gets researched and written, and it's published only after you approve it.

**From your phone or browser (easiest):** open a new issue in this repository and choose **Article request**. Enter a topic, a link, or both, and optionally an angle and category. Then pick what should happen:
- **Write it now and send me a draft to approve.** Within about 5–15 minutes a comment on the issue links to a pull request with the draft, its word count and its sources. Read it in *Files changed*. **Merge** the pull request to publish it (the issue closes too), or **close** it to reject it.
- **Add it to the topic list for a scheduled post.** The topic goes to the end of the list (see below) and the issue closes.

If something goes wrong, the issue gets a comment explaining why. Fix the issue text and add the `retry` label to run it again. Only issues you open are acted on.

**From the Actions tab:** *Actions → Generate article → Run workflow*, then fill in **topic** and/or **link**. Requested articles always wait for your approval as a pull request, whatever `PUBLISH_MODE` is set to.

**Links:** the linked article is a starting point. It's read, checked against official docs and cited, and the post is written from scratch in the site's own words.

## Topic list

Scheduled articles come from a running list of topics that you can keep adding to and editing. Edit it at **https://sketchupwarehouse.com/admin/** → **Topic list** (or in `content-queue/topics.json`).
- **Adding a topic:** only a topic is required. Category, search keyword, angle/notes and a link are optional; the writer fills in anything left empty.
- **Order:** each run writes the first topic that isn't paused and hasn't been written yet, top to bottom. Drag topics to reorder them.
- **Paused:** keeps a topic in the list but skips it.
- **Written as:** filled in automatically with the article's file name once it's written. Clear it to have the topic written again.
- **Review mode:** with `PUBLISH_MODE=review`, a topic waiting in an open pull request isn't picked again. If you close that pull request without merging, the topic goes back in line; pause it if you don't want it.

The list covers SketchUp itself plus the tools SketchUp users work alongside: Autodesk (Revit, AutoCAD, 3ds Max), Chaos (V-Ray, Enscape, Vantage, Cosmos), Lumion, Twinmotion, D5, Rhino and Grasshopper, extensions and plugins, components and Revit families. Every article is written from the SketchUp user's point of view.

## Admin: write and edit articles yourself

Go to **https://sketchupwarehouse.com/admin/** to write new articles, edit or delete existing ones (including the AI-written ones), and upload your own images. It runs [Sveltia CMS](https://sveltiacms.app), a free editor that runs in your browser. When you save, it commits to this repository and the site redeploys in about a minute.

**Sign in (first time):**
1. On the admin page, click **Sign In Using Access Token**. The dialog links to GitHub's token page with the right permission already selected.
2. Alternatively, create a *fine-grained personal access token* yourself at GitHub → Settings → Developer settings. Give it **Only select repositories → sketchupwarehouse** and **Contents: Read and write**, and set an expiry you're comfortable with.
3. Paste the token. It's stored only in your browser. Anyone with the token can edit the repository, so don't share it.

**Security:**
- **What the public sees:** `/admin/` shows only a sign-in screen. Changing anything needs a GitHub token with write access to this repository. The page is hidden from search engines.
- **Pinned editor:** the editor is pinned to an exact version with an integrity hash, so browsers refuse to run it if the file on the CDN is ever altered.
- **Restricted page:** a Content Security Policy only lets the page run that pinned editor and talk to GitHub.
- **Keeping it current:** the *Update admin editor* workflow checks for new releases monthly and opens a PR. Before pinning, it verifies the CDN file matches the official npm package. To update by hand, run `node scripts/update-admin.mjs`.
- **Your part:**
  - Turn on 2-factor authentication on your GitHub account.
  - Give the token a 30–90 day expiry.
  - Click **Sign Out** (top-right menu) when you're done. The token is stored in your browser for the whole `sketchupwarehouse.com` site, so signing out removes it.

**Images:**
- **Cover image:** upload a photo, or paste a link to an image hosted elsewhere (https://…). If you leave it empty, a Pexels photo is added automatically the next time *Generate article* or *Add cover photos* runs.
- **Images in the article text:** use the image button in the editor.
- Uploaded images go to `src/content/posts/images/` and are resized and converted to WebP automatically, so large photos from a phone or camera are fine.
- Images linked from other sites are downloaded and optimized at build time. Only link images you have the right to use.

**Tips:**
- Tick **Draft** to save an article without publishing it.
- A future **Publish date** schedules the article; it goes live that morning.
- For your own articles, leave **Drafted with AI** off.

## Cover photos

Each article gets a free stock photo from [Pexels](https://www.pexels.com). The photo appears under the article header, on the article's card in lists, and as its social preview image. Pexels photos are free for commercial use. Each photo is credited to its photographer, and the About page credits Pexels.

- **Setup:** create a free API key at [pexels.com/api](https://www.pexels.com/api/). Add it under *Settings → Secrets and variables → Actions → Secrets* as `PEXELS_API_KEY`.
- **Existing articles:** go to *Actions → Add cover photos → Run workflow*. It adds a photo to every article that doesn't have one, then redeploys.
- **New articles:** the writer suggests an `imageQuery` for each article, and *Generate article* fetches the photo automatically. If the key isn't set, the article still publishes without a photo.
- **Change a photo:** replace it in **/admin**. To get a different Pexels photo instead, clear the cover image (and edit **Photo search** if you like), then run *Add cover photos* again.

## Ad zones

Ads appear only in designated zones that fit the site's grid. Each zone chooses the largest standard ad size that fits its own column width:

| Zone | Where | Size |
|---|---|---|
| `pageTop` | Band under the header of article and topic pages | 728×90, or 320×100 on narrow screens |
| `inArticle` | Inside the article text, at section breaks (before the 3rd heading, and about two-thirds through long articles) | Native in-article, full text-column width |
| `sidebar` | Top of the article sidebar, desktop only (not sticky) | 300×250 |
| `articleEnd` | After the article's sources | 336×280, or 300×250 |
| `feed` | Full row after the 6th card in article lists (only when there are more than 6) | 728×90, or 320×100 |
| `sectionBreak` | Homepage, between "Latest articles" and "Browse by topic" | 728×90, or 320×100 |

Setup in AdSense (**Ads → By ad unit**):
1. Create a **Display ad**. Choose the **Fixed** size option; the site's CSS sets the size. Copy its `data-ad-slot` number into the variable `PUBLIC_ADSENSE_SLOT_DISPLAY`.
2. Create an **In-article ad** and put its slot number in `PUBLIC_ADSENSE_SLOT_IN_ARTICLE`.
3. In **Ads → By site**, turn off **Auto ads → In-page ads** so Google doesn't place ads outside these zones. Anchor and vignette ads are optional.

To switch a zone off, set `enabled: false` for it in `AD_ZONES` in `src/site.config.ts`. To preview every zone as a labeled box on your machine, run `PUBLIC_AD_PREVIEW=true PUBLIC_ADSENSE_CLIENT=ca-pub-0 npm run dev`. Never set `PUBLIC_AD_PREVIEW` in the deploy workflow.

## Content quality guardrails

Google demotes sites that publish large amounts of low-value AI text. The generator is set up to avoid that:

- It researches with web search and must cite sources. Articles with no sources, fewer than 700 words, or broken front matter are rejected, and nothing gets published.
- It picks from a curated list of real search-intent topics (the [Topic list](#topic-list), 124 topics to start). You can reorder or add topics at any time.
- Posts are labeled as AI-assisted and link to the editorial standards on `/about/`.
- It publishes about 4 articles a week instead of hundreds.
- **Best thing you can add:** spend 10 minutes a week reading new posts, or set `PUBLISH_MODE=review` and merge the PRs. Adding your own screenshots and experience is what makes a niche site stand out in search.

## Local development

```bash
npm install
npm run dev                                   # http://localhost:4321
ANTHROPIC_API_KEY=... npm run generate:dry    # print an article without saving it
ANTHROPIC_API_KEY=... npm run generate -- --news
ANTHROPIC_API_KEY=... npm run generate -- --topic "Lumion LiveSync with SketchUp"   # a topic you pick
ANTHROPIC_API_KEY=... npm run generate -- --link https://example.com/article          # start from a link

# Claude Code engine, as the Action runs it:
node scripts/generate-post.mjs --prepare        # writes .article/prompt.md
claude "Read .article/prompt.md and follow it"  # writes .article/draft.md
node scripts/generate-post.mjs --finalize       # validates and saves the post
```

Articles are plain Markdown files in `src/content/posts/`. You can edit, delete or write your own there. A post dated in the future goes live on its date, thanks to the daily rebuild.

## Trademark note

SketchUp and 3D Warehouse are trademarks of Trimble Inc. The site says it is independent in the footer, on the About page and in the 404 page. It also sends people looking for models to the official 3D Warehouse. Keep it that way: don't copy Trimble's logo or styling, and don't present the site as an official model library.
