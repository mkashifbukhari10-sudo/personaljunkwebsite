/** Deliberately limited to the editorial Markdown used by the four revisions. */
/** @type {{direction: 'ltr', format: '', indent: number, version: number}} */
const common = { direction: 'ltr', format: '', indent: 0, version: 1 };
const text = (value) => ({ type: 'text', text: value, detail: 0, format: 0, mode: 'normal', style: '', version: 1 });

/** @param {string} markdown @param {(url: string) => Record<string, any>} resolveLink @param {(key: string) => string | number} resolveUpload */
export function articleToLexical(markdown, resolveLink = (url) => ({ linkType: 'custom', url, newTab: !url.startsWith('/') }), resolveUpload = (key) => { throw new Error('No upload resolver for ' + key); }) {
  function inline(value) {
    const result = [];
    const links = /\[([^\]]+)\]\(([^)]+)\)/g;
    let offset = 0;
    for (const match of value.matchAll(links)) {
      if (match.index > offset) result.push(text(value.slice(offset, match.index)));
      result.push({ ...common, type: 'link', version: 3, fields: resolveLink(match[2]), children: [text(match[1])] });
      offset = match.index + match[0].length;
    }
    if (offset < value.length) result.push(text(value.slice(offset)));
    return result;
  }
  const children = markdown.trim().split(/\r?\n\s*\r?\n/).map((block) => {
    const image = block.match(/^!\[([^\]]*)\]\(media:([^)]+)\)$/);
    if (image) return { ...common, type: 'upload', version: 3, relationTo: 'media', value: resolveUpload(image[2]), fields: null, children: [] };
    const heading = block.match(/^(#{2,3}) (.+)$/);
    if (heading) return { ...common, type: 'heading', tag: 'h' + heading[1].length, children: inline(heading[2]) };
    if (block.startsWith('- ')) return { ...common, type: 'list', listType: 'bullet', tag: 'ul', start: 1,
      children: block.split(/\r?\n/).map((line, index) => {
        if (!line.startsWith('- ')) throw new Error('Unsupported list continuation: ' + line);
        return { ...common, type: 'listitem', value: index + 1, children: inline(line.slice(2)) };
      }) };
    if (/^#|\*\*|__SOURCE_|^>/m.test(block)) throw new Error('Unsupported editorial markup');
    return { ...common, type: 'paragraph', textFormat: 0, children: inline(block.replace(/\r?\n/g, ' ')) };
  });
  return { root: { ...common, type: 'root', children } };
}
