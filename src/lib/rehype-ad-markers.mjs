// Rehype plugin: marks where in-article ads may go, so ads sit at section
// breaks instead of mid-paragraph. The first marker goes before the 3rd H2
// (after the intro and first two sections); long articles (7+ H2s) get a
// second one about two-thirds of the way through. The article page fills
// markers with the in-article ad zone, or leaves them as empty divs.
export default function rehypeAdMarkers() {
  return (tree) => {
    const h2s = [];
    tree.children.forEach((node, i) => {
      if (node.type === 'element' && node.tagName === 'h2') h2s.push(i);
    });
    if (h2s.length < 3) return;
    const before = [h2s[2]];
    if (h2s.length >= 7) {
      const second = h2s[Math.round(h2s.length * 0.65)];
      if (second !== undefined && h2s.indexOf(second) - 2 >= 3) before.push(second);
    }
    // Insert from the end so earlier indices stay valid.
    for (const index of before.reverse()) {
      tree.children.splice(index, 0, {
        type: 'element',
        tagName: 'div',
        properties: { className: ['ad-marker'], dataAdZone: 'inArticle' },
        children: [],
      });
    }
  };
}
