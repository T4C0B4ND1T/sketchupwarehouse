import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** Published posts, newest first. Future-dated posts stay hidden until their date. */
export async function getPublishedPosts(): Promise<Post[]> {
  const now = Date.now();
  const posts = await getCollection('posts', ({ data }) => !data.draft && data.pubDate.getTime() <= now);
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export function postUrl(post: Post): string {
  return `/blog/${post.id}/`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

export function readingTime(body: string | undefined): number {
  const words = (body ?? '').trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 225));
}

/** Posts sharing the most tags / same category, excluding the current one. */
export function relatedPosts(current: Post, all: Post[], limit = 3): Post[] {
  const tags = new Set(current.data.tags);
  return all
    .filter((p) => p.id !== current.id)
    .map((p) => ({
      p,
      score: p.data.tags.filter((t) => tags.has(t)).length * 2 + (p.data.category === current.data.category ? 1 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.p.data.pubDate.getTime() - a.p.data.pubDate.getTime())
    .slice(0, limit)
    .map((x) => x.p);
}
