# Article presentation QA — 2026-09-21

## Scope and data state

Completed the existing partial implementation without changing Payload fields, collections, relationships, database schema or article content. No import or publishing scripts were executed. The user confirmed that this workspace should be used and all drafts left unchanged.

The current database contains **seven drafts and zero published articles**. A read-only query confirmed:

| Draft | Cover attached | Body uploads |
|---|---|---|
| end-of-tenancy-clearance-dubai | Yes | 0 |
| junk-gone-today-dubai | Yes | 0 |
| palm-frond-disposal-dubai | Yes | 0 |
| service-lift-booking-dubai | No | 0 |
| sofa-wont-fit-through-door-dubai | No | 0 |
| villa-handover-clearance-dubai | No | 0 |
| washing-machine-removal-dubai | Yes | 0 |

An older Next content cache initially exposed four article snapshots, one with an embedded image. Those snapshots were useful for populated listing/article browser checks, but are **not evidence of current publication**. The old local fetch cache was moved aside inside `.next/cache`, and a fresh build now correctly renders an empty, noindex blog. No database rows were altered.

## Verification results

- **Production build:** passed compilation, TypeScript validation and generation of 101 routes/pages. Non-blocking remote image timeouts occurred while generating unrelated service/area social cards. Existing database-driver SSL and image-library warnings remain outside this change.
- **Renderer regressions:** passed duplicate-heading IDs, FAQ heading/question anchors, semantic H3 questions, lossless fallback for ambiguous/non-final FAQ content, and optimized body images with intrinsic dimensions, alt text and captions.
- **Seven current draft bodies:** passed direct rendering and heading-anchor checks using read-only copies of the stored documents.
- **Seven complete draft previews:** all returned HTTP 200, one H1, working TOC targets, noindex and no BlogPosting schema. Since the workspace has no configured preview secret, a temporary loopback-only QA server used an in-memory test secret and was stopped afterward. No persistent configuration changed.
- **Responsive browser checks:** populated listing and article snapshots inspected at 390, 768 and 1440 CSS pixels. No horizontal document overflow. Mobile uses one card column and a collapsible TOC; tablet cards use two columns; desktop uses three columns and a sticky article TOC. Loaded cover/body images were inspected.
- **Keyboard:** card focus reached the existing primary bronze (`#C79A52`) with a visible outline. Enter opened the mobile TOC; section links reached headings below the fixed navigation. FAQ disclosures use native summary/details controls; renderer tests verify their structure and targets. Reduced-motion styles disable smooth scrolling and decorative card transitions.
- **SEO regression:** four cached published snapshots passed canonical, BlogPosting and breadcrumb checks without FAQPage markup. Current draft previews remain noindex without BlogPosting. Final sitemap/feed reflect zero published articles.
- **Final site crawl:** `check:content` and `check:links` passed across 49 HTML pages (48 indexable). Zero broken links, redirect chains, duplicate titles/descriptions, missing canonicals, invalid JSON-LD, H1-count issues or sitemap mismatches.
- **Final `check:blog`:** passed renderer fixtures and the current empty listing; it correctly reports zero published posts rather than inventing a seven-post success.

## Remaining editorial dependencies

Missing covers/body images remain unchanged per the user's instruction. Publication QA must resolve those gaps according to the locked image rules before publishing. No CMS model change or approval is required for the completed presentation system. Deployment and publication were not performed.

## Changed implementation

Shared article route, `PostBody`, `PostCard`, new `TableOfContents`, `RelatedLinks`, `Media`, rich-text heading/renderer helpers, related-post filtering and global article styles. Documentation is linked from the existing content rules and structure guide. A missing draft flag in the pre-existing `_fix.ts` script was corrected solely to unblock type checking; the script was not executed. Missing optional environment-variable documentation was added so the existing content checks pass.
