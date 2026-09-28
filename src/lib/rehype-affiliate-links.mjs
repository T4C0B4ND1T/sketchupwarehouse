// Rehype plugin: tags Amazon links with the Associates ID and marks all
// affiliate/external commercial links rel="sponsored nofollow" as Google requires.
const AMAZON_HOSTS = /(^|\.)amazon\.(com|co\.uk|ca|de)$|^amzn\.to$/;

export default function rehypeAffiliateLinks({ amazonTag = '' } = {}) {
  return (tree) => walk(tree);

  function walk(node) {
    if (node.type === 'element' && node.tagName === 'a' && typeof node.properties?.href === 'string') {
      rewrite(node);
    }
    for (const child of node.children ?? []) walk(child);
  }

  function rewrite(node) {
    let url;
    try {
      url = new URL(node.properties.href);
    } catch {
      return; // relative link
    }
    if (!AMAZON_HOSTS.test(url.hostname)) {
      node.properties.rel = ['noopener'];
      return;
    }
    if (amazonTag && url.hostname !== 'amzn.to') url.searchParams.set('tag', amazonTag);
    node.properties.href = url.toString();
    node.properties.rel = ['sponsored', 'nofollow', 'noopener'];
  }
}
