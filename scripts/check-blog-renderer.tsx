import React from 'react';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync } from 'node:fs';
import PostBody, { splitFaq } from '../components/blog/PostBody';
import { headingIds } from '../lib/content/richtext';

// tsx honors the application's preserve setting; supply React for test JSX.
Object.assign(globalThis, { React });
const text = (value: string) => ({ type: 'text', text: value });
const heading = (tag: string, value: string) => ({ type: 'heading', tag, children: [text(value)] });
const paragraph = (value: string) => ({ type: 'paragraph', children: [text(value)] });
const doc = (...children: any[]) => ({ root: { type: 'root', children } });
const value = doc(heading('h2', 'Before booking'), paragraph('Useful body.'), heading('h2', 'FAQs'), heading('h3', 'Before booking'), paragraph('Useful answer.'));
const markup = renderToStaticMarkup(<PostBody content={value} />);
for (const { id } of headingIds(value).values()) assert.ok(markup.includes(`id="${id}"`), id + ' survives FAQ splitting');
assert.ok(markup.includes('<details'));
assert.ok(markup.includes('<h3'));
assert.ok(markup.includes('Useful answer.'));
for (const tricky of [
  doc(heading('h2', 'FAQs'), paragraph('Keep this introduction.'), heading('h3', 'Question?'), paragraph('Answer.')),
  doc(heading('h2', 'FAQs'), heading('h3', 'Question?'), paragraph('Answer.'), heading('h2', 'Next section'), paragraph('Keep this ending.')),
  doc(heading('h2', 'FAQs'), heading('h3', 'Question without answer?'))
]) {
  assert.equal(splitFaq(tricky).body, tricky, 'Ambiguous FAQ content remains intact');
  assert.equal(splitFaq(tricky).faqs.length, 0);
}
const duplicates = [...headingIds(doc(heading('h2', 'Repeated'), heading('h2', 'Repeated'), heading('h2', 'Repeated-2'))).values()].map((h) => h.id);
assert.equal(new Set(duplicates).size, 3);
console.log('PASS FAQ anchors, duplicate headings, semantic questions and lossless fallback');

const illustrated = doc(paragraph('Image context.'), { type: 'upload', value: { url: '/qa-image.webp', width: 1200, height: 800, alt: 'QA image description', caption: 'QA attribution' } });
const imageMarkup = renderToStaticMarkup(<PostBody content={illustrated} />);
assert.match(imageMarkup, /width="1200" height="800"/);
assert.ok(imageMarkup.includes('/_next/image?'));
assert.ok(imageMarkup.includes('QA attribution'));
assert.ok(imageMarkup.includes('alt="QA image description"'));
console.log('PASS optimized body image, intrinsic dimensions, alt and caption');

const fixtureAt = process.argv.indexOf('--draft-fixture');
if (fixtureAt !== -1) {
  const drafts = JSON.parse(readFileSync(process.argv[fixtureAt + 1], 'utf8'));
  for (const draft of drafts) {
    const html = renderToStaticMarkup(<PostBody content={draft.content} />);
    assert.ok(html.length > 0, draft.slug);
    for (const { id } of headingIds(draft.content).values()) assert.ok(html.includes(`id="${id}"`), draft.slug + ': ' + id);
    assert.ok(!html.includes('<h1'), draft.slug + ': body has no H1');
    console.log('PASS current draft renderer: ' + draft.slug);
  }
}
