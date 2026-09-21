export const MIN_ARTICLE_WORDS = 2000;

function bodyText(node) {
  if (!node || typeof node !== 'object') return '';
  // Uploaded media metadata/captions must never contribute to the word count.
  if (node.type === 'upload') return '';
  if (node.type === 'text') return typeof node.text === 'string' ? node.text : '';
  if (node.type === 'linebreak') return '\n';
  if (!Array.isArray(node.children)) return '';
  const text = node.children.map(bodyText).join('');
  return ['paragraph', 'heading', 'listitem', 'quote', 'list'].includes(node.type) ? text + '\n' : text;
}

export function countArticleWords(value) {
  const text = bodyText(value?.root).trim();
  return text ? text.split(/\s+/u).filter((word) => /[\p{L}\p{N}]/u.test(word)).length : 0;
}

