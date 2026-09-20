/** Read-only regression checks against a running local site. */
import assert from 'node:assert/strict';

const base = (process.argv[2] || 'http://localhost:3111').replace(/\/$/, '');
async function page(path) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  return (await response.text()).replace(/<script(?![^>]*application\/ld\+json)[\s\S]*?<\/script>/g, '');
}
const index = await page('/blog');
const paths = [...new Set([...index.matchAll(/href="(\/blog\/[^"#?]+)"/g)].map((m) => m[1]))].filter((p) => !p.startsWith('/blog/page/'));
// Publication status is editorial: never publish drafts just to meet a count.
if (!paths.length) console.log('No published articles; renderer fixtures cover draft presentation.');
for (const path of paths) {
  const html = await page(path);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, path + ': one H1');
  assert.ok(!/name="robots" content="[^"]*noindex/.test(html), path + ': indexable');
  assert.ok(html.includes('rel="canonical"'), path + ': canonical');
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const schemaText = JSON.stringify(schemas);
  assert.ok(schemaText.includes('BlogPosting'), path + ': BlogPosting');
  assert.ok(schemaText.includes('BreadcrumbList'), path + ': breadcrumbs');
  assert.ok(!schemaText.includes('FAQPage'), path + ': no FAQPage');
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(ids.length, new Set(ids).size, path + ': unique IDs');
  const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
  for (const anchor of anchors) assert.ok(ids.includes(anchor), path + ': #' + anchor);
  const body = html.slice(html.indexOf('class="jk-article-content"'), html.indexOf('</article>'));
  if (!body.includes('<img')) console.log('CONTENT GAP ' + path + ': no body image in the stored content');
  const images = [...html.matchAll(/<img\s[^>]*>/g)].map((m) => m[0]);
  for (const img of images) {
    assert.match(img, /alt="[^"]+"/, path + ': nonempty alt');
    assert.ok(img.includes('data-nimg="fill"') || (/width="\d+"/.test(img) && /height="\d+"/.test(img)), path + ': reserved image size');
    if (!img.includes('.svg')) assert.ok(img.includes('/_next/image?'), path + ': image optimization');
  }
  console.log('PASS ' + path + ' — schema, anchors, images, headings');
}
console.log(`PASS ${paths.length} existing articles and /blog`);
