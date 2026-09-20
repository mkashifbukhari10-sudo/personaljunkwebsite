# Standard article presentation

**Locked standard — 2026-09-21.** Applies to existing and future posts through the shared `/blog/[slug]` template. Editorial authority remains `keywords.md`, `content-rules.md`, `content-structure.md` and `image.md`. Presentation never dictates identical headings or changes search intent.

## Shared components

- `PostCard` serves the listing, pagination and related articles. Cards have 16:9 covers, title, excerpt, date, reading time and existing author information. The whole card links through one keyboard stop. Hover/focus uses the existing primary bronze, with a visible focus outline and reduced-motion support.
- The article route supplies breadcrumbs, one H1, excerpt, real author, publication date, reading time, an optional updated date, a 16:9 cover, body, relevant relationships, related articles and the existing CTA band.
- `PostBody` and `RichText` supply a 68ch reading measure, brand typography, H2/H3/H4 styling, lists, links, blockquotes and framed images. Ordered-list start numbers are preserved. Tables and arbitrary custom blocks remain unsupported by the existing editor.
- `Media` keeps cover and body assets in the existing Next Image optimization pipeline. Covers use object-fit cover without stretching; body images retain intrinsic dimensions. Captions remain visible, including required attribution. Source alt text must be accurate; do not generate it from the article keyword.

## Automatic table of contents

Three or more meaningful H2/H3 headings produce a TOC. Heading IDs derive from heading text; duplicate IDs receive numeric suffixes. Editing heading text changes its anchor, so verify incoming section links after such edits. H4 remains outside the TOC.

At 1100px and wider the TOC occupies a sticky, scrollable sidebar; smaller screens use a native collapsible disclosure. Both use server-rendered links, visible focus and a sticky-header scroll offset. Smooth scrolling respects reduced motion. No Payload TOC field or manually maintained list is permitted.

## Optional FAQ presentation

Only useful, topic-specific FAQs belong in an article. A final H2 beginning with FAQ, FAQs, Frequently asked questions, Common questions or Questions, immediately followed by H3 questions and answers, becomes native keyboard-accessible disclosures. Preserve the original heading IDs for the FAQ heading and each question so TOC links work. Answers use the same rich-text renderer and optimized images.

Introductory prose after the FAQ heading, missing answers, or later headings of another level cause normal rich-text rendering; content must never disappear. For automatic disclosures, place closing prose before the FAQ section: all prose after the last question is its answer. No FAQ collection, relationship, field or FAQPage schema is added.

## Relevance and SEO

Show only services/areas selected in the existing relationships. Related articles must share at least one selected service or area; rank by overlap, then publication order, with at most three. Do not fill empty slots with unrelated recent posts. Contextual body links remain required by the editorial rules.

Preserve metadata, canonical overrides, BlogPosting, breadcrumb schema, sitemap/feed behavior, draft access and draft noindex. Do not add category fields, tables or other CMS features without explicit approval. CTA copy must not invent prices, timing, availability or guarantees.

## Required publishing workflow

CONTENT → CLAIM AUDIT → SEO → INTERNAL LINKING → COVER IMAGE → BODY IMAGE → TABLE OF CONTENTS → ARTICLE UI → FAQ WHEN JUSTIFIED → RELATED CONTENT → CTA → RESPONSIVE/ACCESSIBILITY QA → PUBLISHING QA.

Use meaningful body images where appropriate under the existing image rules; never add decoration to meet a quota. Existing published articles inherit this UI without republishing or rewriting.

Before publishing or changing the renderer:

- Check the listing and article at desktop, tablet and mobile widths: readable measure, no overflow, sensible crops, reserved image space and visible captions.
- Follow every TOC link, including duplicate headings and FAQ questions. Operate TOC/FAQ disclosures with keyboard Enter/Space and confirm visible focus.
- Check card hover/focus color, whole-card navigation and reduced motion.
- Verify alt text, image loading, primary service relationships and relevant related articles.
- Confirm one H1, valid heading order, metadata/canonical, BlogPosting and breadcrumbs; no article FAQPage schema. Check sitemap and internal links.
- Run the production build, `npm run check:blog`, `npm run check:content` and `npm run check:links` against the local production server. Record any environment blockers truthfully.

This is a presentation standard, not permission to publish content or modify the CMS model.
