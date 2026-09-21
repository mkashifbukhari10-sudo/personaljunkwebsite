import test from 'node:test';
import assert from 'node:assert/strict';
import { countArticleWords, MIN_ARTICLE_WORDS } from './check-article-length.mjs';
import { articleToLexical } from './article-markdown.mjs';

const text = (value) => ({ type: 'text', text: value });
const doc = (...children) => ({ root: { type: 'root', children } });

test('the minimum is 2000 and the exact boundary passes', () => {
  assert.equal(MIN_ARTICLE_WORDS, 2000);
  for (const length of [1999, 2000, 2001]) {
    assert.equal(countArticleWords(doc({ type: 'paragraph', children: [text('word '.repeat(length))] })), length);
  }
});
test('inline formatting does not create extra words; block boundaries separate words', () => {
  assert.equal(countArticleWords(doc({ type: 'paragraph', children: [text('wash'), text('ing machine')] }, { type: 'paragraph', children: [text('removal')] })), 3);
});
test('media metadata is excluded, list and FAQ text is counted once', () => {
  const content = articleToLexical('Useful text.\n\n## FAQs\n\n### A question?\n\nA useful answer.\n\n- One item\n- Another item');
  const before = countArticleWords(content);
  content.root.children.push({ type: 'upload', value: { alt: 'word '.repeat(2000), caption: 'word '.repeat(2000) } });
  assert.equal(countArticleWords(content), before);
  assert.equal(before, 12);
});
test('markdown links count the visible label, not the destination', () => {
  const content = articleToLexical('Read the [washing machine guide](/blog/washing-machine-removal-dubai).');
  assert.equal(countArticleWords(content), 5);
});
