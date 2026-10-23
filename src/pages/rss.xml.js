import rss from '@astrojs/rss';
import { getFeed, postUrl, showcaseUrl } from '../lib/posts';
import { SITE } from '../site.config';

export async function GET(context) {
  const feed = await getFeed();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    items: feed.slice(0, 50).map((entry) =>
      entry.kind === 'post'
        ? {
            title: entry.post.data.title,
            description: entry.post.data.description,
            pubDate: entry.post.data.pubDate,
            link: postUrl(entry.post),
            categories: [entry.post.data.category, ...entry.post.data.tags],
          }
        : {
            title: `${entry.item.data.title} by ${entry.item.data.creator.name}`,
            description: entry.item.data.description,
            pubDate: entry.item.data.pubDate,
            link: showcaseUrl(entry.item),
            categories: ['showcase', ...entry.item.data.tags],
          }),
  });
}
