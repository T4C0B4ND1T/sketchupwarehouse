import rss from '@astrojs/rss';
import { getPublishedPosts, postUrl } from '../lib/posts';
import { SITE } from '../site.config';

export async function GET(context) {
  const posts = await getPublishedPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    items: posts.slice(0, 50).map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: postUrl(post),
      categories: [post.data.category, ...post.data.tags],
    })),
  });
}
