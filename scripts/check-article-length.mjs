/** Read-only prepublication check. Accepts a Lexical document, post or posts export. */
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

import { countArticleWords, MIN_ARTICLE_WORDS } from '../lib/content/article-word-count.js';
export { countArticleWords, MIN_ARTICLE_WORDS };

function main(files) {
  if (!files.length) throw new Error('Supply a JSON file: npm run check:article-length -- path/to/article.json');
  let failures = 0;
  for (const file of files) {
    const input = JSON.parse(readFileSync(file, 'utf8'));
    const posts = Array.isArray(input) ? input : Array.isArray(input.docs) ? input.docs : [input];
    if (!posts.length) throw new Error(file + ': export contains no articles');
    for (const [index, post] of posts.entries()) {
      const content = post?.content ?? post;
      if (!Array.isArray(content?.root?.children)) throw new Error(file + ': expected a Lexical root.children array');
      const words = countArticleWords(content);
      const pass = words >= MIN_ARTICLE_WORDS;
      if (!pass) failures++;
      console.log(`${pass ? 'PASS' : 'FAIL'} ${post.slug || post.title || `${file} [${index + 1}]`}: ${words} words / ${MIN_ARTICLE_WORDS} minimum${pass ? '' : `; needs ${MIN_ARTICLE_WORDS - words} more useful words`}`);
    }
  }
  if (failures) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { main(process.argv.slice(2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
