# Junk Services Dubai — SEO Roadmap (`plan.md`)

> 2026-09-15: the homepage before/after slider now wipes between two Site settings photos (`beforeRoom`/`afterRoom`, filled from `Before.jpg`/`After.jpg`) and keeps the block illustration only as the fallback when either slot is empty.
>
> 2026-09-15: area coverage expanded from 12 to 30 pages (`scripts/seed-data/areas-expansion.js`, seeded create-or-skip; none featured on the homepage). Photos and cross-links follow the Phase 4/5 pattern.
>
> Renamed from "Junkit" on 2026-09-15 to match the supplied logo and the production domain: `lib/site.js`, page copy, JSON-LD, manifest, seed data, and the live Site settings / Navigation / Media alt text in the CMS. Earlier phase notes below still say "Junkit"; they are historical.

Source of truth for all remaining SEO work. Next.js 15 App Router, JavaScript, no CMS today; final target includes Payload CMS with a CMS-managed blog.

Last updated: 2026-09-14 · Current state: Phases 1–14 ✅; Phases 15–16 ⚠️ code complete and verified locally. **The production domain is `https://junkservicesdubai.com` and is configured in the codebase**; what remains in 15–16 needs the site actually deployed on it (DNS, Search Console, live-URL validators). (Photography still not supplied; no posts written yet.) · **NEXT: connect the domain in Vercel and deploy, then finish 15 and 16 against the live site**

---

## Execution workflow (applies to every phase)

1. Work on **one phase at a time**, in order. Never start a phase that is not marked `NEXT`.
2. Before starting: read this file top to bottom, then inspect the current code for the files listed under that phase. Do not rely on memory of earlier phases.
3. Implement **only** that phase's approved scope. Anything under "Must NOT change" or "Deferred" is out of bounds.
4. Run `npm run build` and every item in the phase's Verification checklist. Static routes must stay static unless the phase explicitly changes rendering.
5. Update this file: tick checkboxes, add a short "Notes" line under the phase (what changed, decisions taken, anything unresolved), move the `NEXT` marker to the following phase.
6. Report: files created/changed, what was verified (with evidence from build output / rendered HTML), and anything unresolved.
7. **STOP.** Wait for explicit approval before the next phase. Never continue automatically.
8. If a phase needs a business fact, content, asset, credential or decision that is not available in the repo or this file, **stop and list exactly what is needed**. Do not invent addresses, hours, reviews, copy, images, domains, IDs or facts.

Conventions locked by Phases 1–2 (do not regress):

- Every route exports metadata via `pageMetadata()` from `lib/seo.js` (title, description, canonical path, OG block incl. `defaultOgImage`).
- `lib/site.js` is the single source for site identity, `siteUrl` (`NEXT_PUBLIC_SITE_URL`), contact details and `navLinks`.
- `lib/services.js` and `lib/areas.js` are the single sources for services/areas; `serviceHref()` / `areaHref()` are the only places that know the URL shape.
- Root layout owns `<header>/<nav aria-label="Primary">/<main id="main">/<footer>`; pages return fragments.
- One descriptive `<h1>` per page (eyebrow slot); display slogan is a `<p>`; cards use `<h2>/<h3>` with `.jk-h`.
- `Reveal` is visible-first; breakpoints are CSS (`.jk-nav-*`, `.jk-map-label`, `.jk-clutter-sm`), never `window.innerWidth` state.
- Placeholder reviews are filtered in production (`placeholder: true`).
- Site-wide JSON-LD (`LocalBusiness`, `WebSite`) lives in `lib/schema.js`; `Breadcrumbs.jsx` emits `BreadcrumbList`.

---

## Phase index

| # | Phase | Status |
|---|---|---|
| 1 | SEO Foundation | ✅ Complete |
| 2 | Architecture Cleanup + On-page SEO | ✅ Complete |
| 3 | Content access layer + `/services/[slug]` landing pages | ✅ Complete |
| 4 | `/areas/[slug]` landing pages + service↔area cross-linking | ✅ Complete |
| 5 | Image / `next/image` SEO architecture | ✅ Complete (assets pending) |
| 6 | Remaining technical, structured-data, accessibility and performance cleanup | ✅ Complete (Lighthouse → Phase 16) |
| 7 | Payload CMS installation and integration | ✅ Complete |
| 8 | Payload collections, globals and reusable SEO field architecture | ✅ Complete |
| 9 | Migration of hard-coded content into Payload | ✅ Complete |
| 10 | Media management through Payload | ✅ Complete (assets pending) |
| 11 | Blog content model | ✅ Complete |
| 12 | `/blog` listing page | ✅ Complete |
| 13 | `/blog/[slug]` single post page | ✅ Complete |
| 14 | Dynamic sitemap, redirects and indexing controls for CMS content | ✅ Complete |
| 15 | Production domain, Search Console and analytics readiness | ⚠️ Code complete; deployment steps blocked on the domain |
| 16 | Final technical SEO validation and launch checklist | ⚠️ Local checks complete; deployed-site checks blocked on the domain |

---

## Phase 1 — SEO Foundation ✅ COMPLETE

Delivered: `lib/site.js`, `lib/seo.js`, `lib/schema.js`, `components/JsonLd.jsx`; per-route metadata on all 6 routes; `metadataBase`, title template, canonicals, OG/Twitter, robots meta; `app/robots.js`, `app/sitemap.js` (6 static routes), `app/not-found.jsx`; generated `app/icon.jsx`, `app/apple-icon.jsx`, `app/opengraph-image.jsx`; `.env.example` with `NEXT_PUBLIC_SITE_URL`; the four `'use client'` pages converted to server pages with extracted client components. Site-wide `LocalBusiness` + `WebSite` JSON-LD.

Known carry-overs (tracked in later phases): `NEXT_PUBLIC_SITE_URL` unset (Phase 15); generated icons/OG image are stand-ins (Phase 5); address/geo/hours/`sameAs` absent from schema (Phase 8/9 via Site Settings, Phase 15).

## Phase 2 — Architecture Cleanup + On-page SEO ✅ COMPLETE

Delivered: Nav/Footer moved into `app/layout.jsx` with semantic landmarks and skip link; `lib/services.js` (12 services + 7 groups) and `lib/areas.js` (12 areas, 9 featured) as single sources; descriptive H1s with slogans as supporting text; `<h2>/<h3>` on cards, steps, FAQs, stages; `Breadcrumbs.jsx` on all subpages; footer links to real `/services#slug` and `/areas#slug` anchors; contextual links on every page; FAQ and services explorer rebuilt on `<button aria-expanded>`; CSS-driven breakpoints (no hydration CLS); visible-first `Reveal`; hero LCP text un-animated; placeholder reviews stripped from production.

Known carry-overs: descriptive H1 is styled as the small eyebrow (design decision, revisit in Phase 6 if wanted); `/` and `/about` still share the Disposal block (Phase 6); list markup for POINTS/PREP/LADDER still `<div>` (Phase 6).

---

## Phase 3 — Content access layer + `/services/[slug]` landing pages ✅ COMPLETE

### Goal
Give every one of the 12 services its own indexable landing page, built on a content-access layer that Payload will later replace without touching the pages.

### Exact scope
- Create `lib/content/` — the **only** module pages import content from. Today it reads `lib/services.js` / `lib/areas.js` / `lib/data.js`; in Phase 8 its internals switch to Payload's Local API with the same function signatures.
  - `lib/content/services.js`: `getServices()`, `getServiceBySlug(slug)`, `getServiceGroups()`, `getRelatedServices(slug)`.
  - `lib/content/areas.js`: `getAreas()`, `getFeaturedAreas()`, `getAreaBySlug(slug)` (read-only wrappers now; consumed in Phase 4).
  - All functions `async` from day one so the Payload swap is signature-compatible.
- Extend each entry in `lib/services.js` with the fields a landing page needs. **Field names are the Payload schema names used in Phase 8** — do not rename later:
  `slug`, `name`, `num`, `blurb`, `seo: { title, description }`, `h1`, `intro`, `body` (array of `{ heading, paragraphs[] }`), `typical`, `crew`, `time` (moved/copied from the matching group), `faqs[]` (`{ q, a }`), `relatedServices[]` (slugs), `popularAreas[]` (slugs), `image` (null until Phase 5).
- Create `app/services/[slug]/page.jsx` (server, static): `generateStaticParams()` from `getServices()`, `generateMetadata()` via `pageMetadata()`, `notFound()` for unknown slugs.
- Page structure (reuse existing components/tokens; no new design language): `Breadcrumbs` (Home / Services / {name}); descriptive `<h1>` (`h1` field) with a display line (`name` or approved slogan) as `<p>`; intro; body sections as `<h2>` + paragraphs; "What we take / typical / crew / on site" facts block; service-specific FAQ (reuse `Faq` pattern, must be accessible and in DOM); related services links; popular areas links (to `/areas#slug` until Phase 4 ships, via `areaHref()`); `CtaBand`.
- JSON-LD on each page: `Service` (`name`, `description`, `provider` → `{ '@id': absoluteUrl('/#business') }`, `areaServed` Dubai, `url`) + `BreadcrumbList` (already emitted by `Breadcrumbs`). Add `FAQPage` only if the page renders ≥ 2 FAQs.
- Switch `serviceHref(slug)` in `lib/services.js` to return `/services/${slug}`. This automatically upgrades footer, home explorer, Clearance cards, FAQ "more" links and About links. Keep `id={slug}` on `/services` cards so old `#slug` URLs still land.
- `/services` hub: make each `ServiceGrid` card a link to its page (card `<h2>` wraps `<Link>`), keep hover behaviour.
- `app/sitemap.js`: append service URLs from `getServices()`.
- Add a per-service OG image route `app/services/[slug]/opengraph-image.jsx` using the existing text template (name + tagline) — no artwork invented.

### Files / architecture likely involved
`lib/content/services.js` (new), `lib/content/areas.js` (new), `lib/services.js`, `app/services/[slug]/page.jsx` (new), `app/services/[slug]/opengraph-image.jsx` (new), `components/services/ServiceGrid.jsx`, `components/services/ServiceFaq.jsx` (new, or generalise `components/home/Faq.jsx` to accept `items`), `components/services/RelatedServices.jsx` (new), `app/sitemap.js`, `lib/schema.js` (add `serviceSchema()`), `README.md`.

### Dependencies
- **Blocking input:** unique, approved page copy per service (`h1`, `intro`, at least 2 body sections, ≥ 2 FAQs). Existing `blurb`/`typical`/`crew`/`time` are facts that can be reused, but 12 pages built only from them would be thin near-duplicates of `/services`. If copy is not supplied, build the template and data fields, ship pages with `robots: { index: false }` set per-service via `seo.noIndex: true`, exclude them from the sitemap, and report that copy is required to index them.
- Slug list confirmation: the 12 slugs in `lib/services.js` become permanent URLs and Payload slugs.

### Must NOT change in this phase
- Phase 1 metadata helpers, layout landmarks, Nav/Footer structure (other than hrefs resolving through `serviceHref`).
- `lib/areas.js` data (Phase 4), no `/areas/[slug]`.
- No Payload, no TypeScript migration, no images (`image: null`), no blog.
- No new homepage sections; homepage copy unchanged.

### Implementation checklist
- [x] `lib/content/services.js` and `lib/content/areas.js` created; every page/component that needs service/area data imports from `lib/content/*` (leave `Footer`, `DubaiMap`, `QuoteForm` etc. reading `lib/services.js`/`lib/areas.js` only if they are server components that will be migrated in Phase 9 — note which).
- [x] Service entries extended with `seo`, `h1`, `intro`, `body`, `faqs`, `relatedServices`, `popularAreas`, `image: null`, facts.
- [x] Copy received/approved for all 12 services, or `seo.noIndex` fallback applied and documented.
- [x] `app/services/[slug]/page.jsx` with `generateStaticParams`, `generateMetadata`, `notFound`.
- [x] `Service` JSON-LD + breadcrumbs; `FAQPage` only when ≥ 2 FAQs.
- [x] `serviceHref()` returns the real route; `/services` cards link to pages; `#slug` ids retained.
- [x] Sitemap includes all indexable service pages.
- [x] Per-service OG image route.
- [x] README updated (content layer, how to add a service).

### Verification checklist
- [x] `npm run build`: 12 `/services/[slug]` routes listed as `●` (SSG) with the 6 original routes still `○`.
- [x] Each service HTML: unique `<title>`, description, canonical `/services/{slug}`, one `<h1>`, `og:image` pointing at its own route, `Service` + `BreadcrumbList` JSON-LD valid JSON.
- [x] `/services/does-not-exist` returns the 404 page.
- [x] Footer service links and home explorer links resolve to `/services/{slug}` (grep rendered HTML).
- [x] `sitemap.xml` lists 6 + 12 URLs (or 6 + indexable subset).
- [x] No page imports `lib/services.js` directly except `lib/content/services.js` and `lib/schema.js` (grep).

### Completion criteria
All 12 service pages build statically with unique metadata, valid schema and breadcrumbs; every existing service link points at them; sitemap updated; content is read only through `lib/content/`.

### Deferred / boundary
Area pages, service↔area matrix pages, images, Payload-managed copy, per-service reviews. Any rich-results validation happens in Phase 16.

Notes (2026-09-11):
- Copy source: `service-pages-content.md` (approved). All 12 pages indexable; every item marked `NEEDS BUSINESS INPUT` there was omitted (appliance disconnection FAQ, waste rubble FAQ, garden unattended-access FAQ, same-day surcharge FAQ, commercial invoicing FAQ, commercial crew size). The "insured on site" claim was not reused.
- URL helpers moved to `lib/hrefs.js` (dependency-free) so client components can import `serviceHref`/`areaHref`/`groupHref` without pulling the content layer (which will import Payload in Phase 8). `lib/services.js`/`lib/areas.js` re-export them for compatibility.
- Client components (`ServiceGrid`, `ServicesExplorer`) now receive data as props from server pages; `Footer` is an async server component reading `lib/content/*`.
- Inline links in paragraphs use `[label](href)` rendered by `components/InlineText.jsx`; Payload rich text replaces this in Phase 8/11.
- `components/FaqAccordion.jsx` is the shared accessible accordion; `components/home/Faq.jsx` is now a thin server wrapper around it.
- Added optional `cta` (two display lines) and `audience` ('business' → `BusinessAudience` in schema) fields to services; Phase 8 should include both in the Payload collection.
- Verification evidence: build lists 12 `●` `/services/[slug]` + 12 OG routes, 6 original routes `○`; 12 unique titles/descriptions/H1s; no duplicate content H2s or FAQs across pages or with the homepage; every page has `Service` + `BreadcrumbList` + `FAQPage` (all have ≥ 3 FAQs) JSON-LD that parses; canonical and `og:image`/`twitter:image` per page; `/services/does-not-exist` → HTTP 404 + `noindex` (`dynamicParams = false`); sitemap = 18 URLs; 12 `#slug` ids retained on `/services`; footer/home/about links resolve to `/services/{slug}` with zero legacy `#` links left; only `lib/schema.js` imports `lib/services.js` outside the content layer.
- Still reading `lib/areas.js` directly (client components, migrate in Phase 4): `components/areas/AreaExplorer.jsx`, `components/home/DubaiMap.jsx`, `components/contact/QuoteForm.jsx`.
- Open business questions from `service-pages-content.md` remain open; answering them unlocks the omitted FAQs/sentences without structural change.

---

## Phase 4 — `/areas/[slug]` landing pages + service↔area cross-linking ✅ COMPLETE

### Goal
Give each of the 12 coverage areas an indexable local landing page and wire services and areas into a coherent internal-link graph.

### Exact scope
- Extend `lib/areas.js` entries with Payload-aligned fields: `seo: { title, description }`, `h1`, `intro`, `body[]`, `faqs[]`, `popularServices[]` (slugs), `nearbyAreas[]` (slugs), `image: null`. Keep `map`/`home` positions.
- `lib/content/areas.js`: add `getAreaBySlug`, `getNearbyAreas`, `getPopularServicesForArea`.
- Create `app/areas/[slug]/page.jsx` (server, static) + `opengraph-image.jsx`, mirroring the Phase 3 page pattern: breadcrumbs (Home / Areas / {name}), descriptive `<h1>`, intro, body, "popular services here" links (`serviceHref`), nearby areas, area FAQ, `CtaBand secondary="book"`.
- JSON-LD: `LocalBusiness`-scoped `Service` with `areaServed: { '@type': 'Place', name }` or a `WebPage` + `BreadcrumbList`; do **not** create a second `LocalBusiness` per area (no separate physical locations exist).
- Switch `areaHref(slug)` to `/areas/${slug}`; keep `#slug` ids on `/areas` cards; make `AreaGrid` card `<h2>` a link; `DubaiMap` tiles and footer area links upgrade automatically.
- Cross-linking: every service page shows its `popularAreas` as links; every area page shows `popularServices`; `/services` and `/areas` hubs link both ways in their lead copy; `QuoteForm` area `<select>` continues to read `getAreas()`.
- Sitemap: append area URLs.

### Files / architecture likely involved
`lib/areas.js`, `lib/content/areas.js`, `app/areas/[slug]/page.jsx` (new), `app/areas/[slug]/opengraph-image.jsx` (new), `components/areas/AreaExplorer.jsx`, `components/areas/*` (new shared blocks), `components/home/DubaiMap.jsx`, `components/Footer.jsx`, `app/sitemap.js`, `lib/schema.js`.

### Dependencies
Phase 3 (page pattern, content layer, `Service` schema). **Blocking input:** approved copy per area (`h1`, `intro`, ≥ 1 body section). Same `noIndex` fallback rule as Phase 3.

### Must NOT change
Service page template beyond adding the areas block; homepage sections; Phase 1/2 conventions; no images; no Payload.

### Implementation checklist
- [x] Area data extended; content layer functions added.
- [x] Copy received/approved, or `noIndex` fallback documented.
- [x] `/areas/[slug]` page, OG route, `notFound`.
- [x] `areaHref()` switched; hub cards linked; ids retained.
- [x] Service pages render `popularAreas`; area pages render `popularServices` and `nearbyAreas`.
- [x] Sitemap includes indexable area pages.

### Verification checklist
- [x] Build: 12 area routes `●`, all previous routes unchanged.
- [x] Unique title/description/canonical/`og:image` per area; one `<h1>`; valid JSON-LD.
- [x] Every service page links ≥ 2 areas; every area page links ≥ 2 services (script over rendered HTML).
- [x] Footer/DubaiMap/FAQ links resolve to `/areas/{slug}`.
- [x] Sitemap URL count = 6 + services + areas.

### Completion criteria
All area pages live and statically built; service↔area link graph complete; sitemap updated.

### Deferred / boundary
Service-in-area combination pages (`/services/x/areas/y`) — **not planned**; only build if search demand is proven later. Images, Payload.

Notes (2026-09-11):
- Copy source: `area-pages-content.md` (approved). All 12 pages indexable. `[public — verify]` tags stripped; the sentences they marked (property mix) were approved as-is. Downtown's serviced-residence FAQ (`NEEDS BUSINESS INPUT`) omitted.
- `areaHref()` now returns `/areas/{slug}`; `/areas` cards keep `id={slug}` so legacy `#slug` URLs still land. Zero `href="/areas#…"` remain in built HTML.
- Schema: `areaServiceSchema()` emits `Service` with `areaServed: Place (containedInPlace: City Dubai)` + `provider → LocalBusiness @id`; exactly one `LocalBusiness` per page (site-wide), no per-area business entities. `FAQPage` on all 12 (each has ≥ 2 FAQs).
- Client components migrated to props: `AreaExplorer` (`featured`, `areas`), `DubaiMap` (`areas`), `QuoteForm` (`areaNames`). Only `lib/schema.js` imports `lib/services.js`/`lib/areas.js` outside `lib/content/*`.
- Cross-linking: `popularServices` on areas mirrors Phase 3 `popularAreas` (symmetric graph); `nearbyAreas` lateral links; `/areas` lead now links to `/services` and `/how-it-works`; contact `<select>` adds Dubai Silicon Oasis (13 areas + Other).
- Verification evidence: build 62 pages, 12 `●` `/areas/[slug]` + 12 OG; 12 unique titles/descriptions/H1s; no duplicate content H2s/FAQs across areas, services or home; every area page links ≥ 3 service pages, every service page ≥ 2 area pages; `/areas/not-an-area` → HTTP 404; sitemap 6 + 12 + 12 = 30 URLs; Phase 1–3 titles/canonicals unchanged.
- Candid note carried from the content file: area pages are differentiated by logistics + service mix, not local job evidence (~300–420 words each). The 6 non-blocking business questions in `area-pages-content.md` would strengthen them via the same data fields.

---

## Phase 5 — Image / `next/image` SEO architecture ✅ COMPLETE (architecture) — assets pending

### Goal
Replace striped placeholders with a single image abstraction that serves real photography with correct `alt`, dimensions, priority and formats — and that accepts Payload media documents unchanged in Phase 10.

### Exact scope
- `next.config.mjs`: `images` config (`formats: ['image/avif','image/webp']`, `deviceSizes`, `remotePatterns` left empty until Phase 10 decides storage).
- `components/Media.jsx` (server): accepts `{ src, alt, width, height, caption? }` (the shape Payload's Media collection will expose after Phase 10's mapper) and renders `next/image` with `sizes`; falls back to the existing `Placeholder` when `image` is null so nothing breaks before assets exist.
- Replace `Placeholder` usages: `components/home/Crew.jsx`, `components/home/Clearance.jsx`, `components/home/ServicesExplorer.jsx` (detail card), `app/about/page.jsx`, plus `image` slots on service/area pages.
- Hero image policy: if a real hero photo is introduced, it gets `priority` and explicit dimensions; otherwise leave the hero text-only (current LCP is text).
- OG images: when a real image exists for a service/area, `opengraph-image.jsx` composites it; otherwise the text template remains. Replace generated `icon.jsx` / `apple-icon.jsx` / `opengraph-image.jsx` with real `.png` files if brand artwork is supplied.
- `alt` policy documented in README: descriptive, no keyword stuffing, empty `alt=""` only for purely decorative art.

### Files / architecture likely involved
`next.config.mjs`, `components/Media.jsx` (new), `components/Placeholder.jsx`, `public/images/**` (new), the files listed above, `app/opengraph-image.jsx`, `app/services/[slug]/opengraph-image.jsx`, `app/areas/[slug]/opengraph-image.jsx`, `lib/services.js` / `lib/areas.js` (`image` fields), `README.md`.

### Dependencies
Phases 3–4 (image slots exist). **Blocking input:** real photographs and brand artwork with usage rights. Without them, ship `Media.jsx` + config only and keep placeholders.

### Must NOT change
Layout/metadata architecture; copy; Payload not yet installed (no upload pipeline).

### Implementation checklist
- [x] `images` config; `Media.jsx` with placeholder fallback.
- [x] Every `Placeholder` call site routed through `Media`.
- [x] Assets received → added under `public/images` with real `alt` text in data; else documented as pending. **2026-09-15: 17 photos supplied in `public/images/`; 16 uploaded to Media with alt text by `scripts/seed-images.ts` and attached to all 6 site slots + 11 services. Area photos added the same day from Wikimedia Commons (CC BY / CC BY-SA, attribution stored as the Media caption and rendered over the image; credits in `public/images/areas/CREDITS.md`); JVC uses a site crew photo, Dubai Hills and Silicon Oasis use neighbouring-community photos with honest alt text.** **2026-09-17: `same-day-junk-removal` filled too — the supplied "Same-Day Pickup.jpg" shows a parcel locker, not a collection, so the service reuses the street crew photo (`office strip-out.jpg`, two crew checking a job at their truck). Every service now has a photo.**
- [x] Real icons/OG art dropped in if supplied. **2026-09-15: logo supplied (`public/images/Logo.png`, white background). `scripts/brand-assets.mjs` derives transparent light/dark logos, the monogram, favicon, apple icon and manifest icons (`lib/brand.js`); the generated `icon.jsx`/`apple-icon.jsx`/`app/brand/[key]/route.js` stand-ins were deleted. Logo now in Nav, Footer, every OG card and `LocalBusiness.logo`. The site was renamed to match (see the note at the top of this file).**

### Verification checklist
- [x] Build passes; images served as AVIF/WebP with `srcset`/`sizes` (inspect HTML). *Verified with a throwaway test PNG, then reverted: 9 `srcset` candidates, `sizes`, `alt`, lazy loading, `object-fit` fill; OG composite rendered.*
- [ ] Lighthouse: no "image elements do not have explicit width and height", no oversized images, LCP not regressed. *Not run — no Chrome in this environment; structurally satisfied (fill images inside fixed-height containers; intrinsic mode carries width/height). Run in Phase 6/16.*
- [x] Every `<img>` has non-empty `alt` unless decorative. *`Media` requires `alt` in the descriptor (`hasImage()`); zero raw `<img>` in built HTML today.*

### Completion criteria
One image component; no raw `<img>`; placeholders only where assets are still missing (listed in Notes).

### Deferred / boundary
Payload uploads, CDN/storage adapter, image sitemaps (evaluate in Phase 14).

Notes (2026-09-11):
- Architecture shipped without assets, per the phase's own fallback rule. New: `components/Media.jsx` (single image component; `fill` mode for fixed-height slots, intrinsic mode otherwise; placeholder fallback), `lib/images.js` (code-owned slots `siteImages` + `hasImage()`; descriptor shape = Phase 10 `toImageProps()` output), `components/OgTemplate.jsx` (shared 1200×630 layout; composites a photo under a gradient when supplied), `lib/og-image.js` (`loadOgPhoto()` reads `/public` files as data URLs at build), `public/images/` (empty), `next.config.mjs` `images.formats` AVIF/WebP + empty `remotePatterns`.
- Slots: `siteImages` (crew ×2, clearance ×4), `image` on 12 services + 7 service groups, `image` on 12 areas — all `null`. Service pages gained a photo slot beside the "Typical job" facts; area pages beside the "Popular services" heading. `ServicesExplorer` detail card, `Crew`, `Clearance`, About all go through `Media`.
- All three OG routes now use `OgTemplate`; service/area routes composite the record's image automatically once set.
- Also fixed a Phase 3/4 loose end: `/services`, `/areas` and `/` now pass only rendered fields to client grids, so landing-page copy is no longer serialised into those pages' RSC payloads.
- Hero remains text-only by design (LCP is the display text).
- **Still needed to finish this phase's asset items:** photographs with usage rights for the 6 site slots + 12 services + 12 areas (≥ 1600px long edge) with alt text, and brand icon/OG artwork. Drop files in `public/images/`, set descriptors, and (for icons/OG) add `app/icon.png` / `app/apple-icon.png` / `app/opengraph-image.png` and delete the `.jsx` generators. No code changes required.

---

## Phase 6 — Remaining technical, structured-data, accessibility and performance cleanup ✅ COMPLETE

### Goal
Close every remaining audit item that is not CMS- or blog-dependent, so the pre-CMS site is technically complete.

### Exact scope
- Structured data: `HowTo` on `/how-it-works` from `processSteps`; `FAQPage` on `/` from `faqs`; `ContactPage` on `/contact`; `AboutPage` on `/about`; `CollectionPage` on `/services` and `/areas`; `Review`/`AggregateRating` **only** when real reviews exist (Phase 9 data) — otherwise skip.
- Duplicate content: consolidate the Disposal block so `/about#disposal` is the canonical long version and `/` keeps a short summary + link (copy trimmed, not rewritten).
- Semantics: POINTS/PREP/LADDER/TAKES lists → `<ul>/<li>`; "The crew" points in About/Crew as lists.
- Optional H1 presentation: decide whether the descriptive H1 stays eyebrow-styled or becomes a mid-size line between eyebrow and slogan (design call — only if approved).
- `next.config.mjs`: `poweredByHeader: false`; `headers()` for `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and long-lived caching for `/_next/static`. (CSP deferred until analytics/Payload admin needs are known — Phase 15.)
- Fonts: trim Archivo to the weights actually used (audit with grep) — likely 400/600/700/800/900 → verify before removing.
- Motion: gate the infinite `routeMove`/`pulseRing` animations behind `prefers-reduced-motion`.
- Metadata extras: `manifest` (`app/manifest.js`) + `themeColor` via `viewport` export; `formatDetection` left default (phone links wanted).
- Accessibility affecting SEO/quality signals: focus styles on all interactive elements, `aria-current="page"` on active nav link, form fields `name`/`autocomplete` attributes, `QuoteForm` wrapped in `<form onSubmit>` so Enter submits.
- Fixed bottom bar: verify it does not overlap the LCP element on 360px viewports; add `scroll-padding-bottom` if needed.

### Files / architecture likely involved
`lib/schema.js`, `app/page.jsx`, `app/how-it-works/page.jsx`, `app/contact/page.jsx`, `app/about/page.jsx`, `app/services/page.jsx`, `app/areas/page.jsx`, `components/home/Disposal.jsx`, `components/home/Crew.jsx`, `components/home/Clearance.jsx`, `components/contact/QuoteForm.jsx`, `components/Nav.jsx`, `app/layout.jsx` (viewport export, manifest link), `app/manifest.js` (new), `app/globals.css`, `next.config.mjs`.

### Dependencies
Phases 3–5 (so schema and links cover the final pre-CMS route set).

### Must NOT change
Route structure, data field names (Payload-aligned), content copy beyond the Disposal trim, `lib/content/*` signatures.

### Implementation checklist
- [x] Page-level schema builders added and rendered.
- [x] Disposal duplication resolved.
- [x] List semantics converted.
- [x] Security/cache headers, `poweredByHeader: false`.
- [x] Font weights trimmed (after usage audit).
- [x] Reduced-motion gating for infinite animations.
- [x] `manifest.js`, `viewport.themeColor`.
- [x] Nav `aria-current`; form `<form>`, `name`/`autocomplete`.

### Verification checklist
- [x] Build passes; all routes still static.
- [x] Every JSON-LD block parses; types present per route as scoped.
- [ ] Lighthouse (mobile) on `/`, `/services/{one}`, `/areas/{one}`: Performance ≥ 90, Accessibility ≥ 95, SEO 100, Best Practices ≥ 95 (record scores in Notes). **DEFERRED to Phase 16 — headless Chrome cannot be downloaded in this environment.**
- [x] `curl -I` shows the new headers and no `X-Powered-By`.
- [x] Axe/Lighthouse: no heading-order, list, or button-name violations. *Axe not runnable (no Chrome); a structural scan of all 31 built pages found 0 heading jumps, exactly one `<h1>` each, 0 unnamed buttons, 0 empty links, 6/6 contact fields wrapped in `<label>`.*

### Completion criteria
Audit items not dependent on CMS/blog are all closed; scores recorded.

### Deferred / boundary
CSP, analytics, reviews schema (needs real reviews), Payload.

Notes (2026-09-11):
- Schema per route (verified by parsing built HTML): `/` FAQPage; `/services`, `/areas` CollectionPage + ItemList of the 12 child pages; `/how-it-works` HowTo (5 steps); `/about` AboutPage; `/contact` ContactPage — all in addition to site-wide LocalBusiness/WebSite and Breadcrumbs. New builders in `lib/schema.js`: `howToSchema`, `webPageSchema(type, …)`, `collectionPageSchema`. Review/AggregateRating intentionally skipped (no real reviews).
- Disposal dedupe: homepage `Disposal.jsx` now shows the summary paragraph + "How we handle every load →" link only; the five-stage grid and full H2 live solely at `/about#disposal`. Homepage H2 trimmed to "Removing junk is easy."
- Lists: Crew POINTS, About POINTS, How-it-works PREP, Clearance LADDER, Services TAKES items → `<ul class="jk-list"><li>` (styles unchanged).
- `next.config.mjs`: `poweredByHeader: false`; `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` on all routes; `/images/*` immutable cache (Next already sets immutable on `/_next/static` — verified with `curl -I`). CSP left for Phase 15.
- Fonts: Archivo 500 and Plex Mono 500 removed (grep showed 400/600/700/800/900 and mono 400/600 in use).
- Motion: the five infinite `routeMove`/`pulseRing` elements carry `.jk-motion` (+ `aria-hidden` on decorative bars) and are stopped under `prefers-reduced-motion`.
- `app/manifest.js` (icons point at the generated `/apple-icon` stand-in until real artwork), `viewport` export with `themeColor #101726`; `html { scroll-padding-top/bottom }` for the sticky header and fixed action bar.
- A11y: `aria-current="page"` (+ bronze underline) on the active nav link via `usePathname`; global `:focus-visible` outline; `QuoteForm` is a real `<form onSubmit>` with `name`/`autoComplete`/`required`/`inputMode`, submit button, `role="status"` note. Fixed bar does not overlap the LCP text at 360px (hero text starts ~80px from top; bar is bottom 58px).
- H1 presentation left as eyebrow-styled (optional design call not requested).
- **Deferred:** Lighthouse mobile scores — Chrome download is blocked here. Run in Phase 16 (or locally now: `npx lighthouse http://localhost:3000/ --preset=desktop` / mobile default) and record scores.

---

## Phase 7 — Payload CMS installation and integration ✅ COMPLETE

### Goal
Install Payload 3 inside this Next.js app with admin UI and API routes, without yet changing where the frontend reads content.

### Exact scope
- **Decisions required before starting (stop and ask if unresolved):**
  1. Database adapter: Postgres (`@payloadcms/db-postgres`), MongoDB, or SQLite — and where it is hosted.
  2. Hosting target for the Next app (affects file storage in Phase 10 and ISR/revalidation).
  3. TypeScript adoption: Payload 3 config and generated types are TypeScript. Plan: add `tsconfig.json` with `allowJs: true`, keep existing `.jsx` files, write Payload config/collections in `.ts`. Confirm.
- Install `payload`, `@payloadcms/next`, `@payloadcms/richtext-lexical`, chosen DB adapter, `sharp`.
- Restructure routes into groups **without changing public URLs**: move `app/layout.jsx`, `app/page.jsx`, all page routes, `not-found.jsx`, `globals.css`, icons/OG/robots/sitemap into `app/(frontend)/`; add `app/(payload)/admin/[[...segments]]`, `app/(payload)/api/[...slug]`, `app/(payload)/layout.tsx` per Payload's Next install docs. `metadataBase`/canonicals unaffected.
- `payload.config.ts` at project root (empty collections except `Users` + `Media` stub), `withPayload()` wrapping `next.config.mjs`, `PAYLOAD_SECRET` + `DATABASE_URI` in `.env.example`.
- `app/(frontend)/robots.js`: disallow `/admin` and `/api`.
- Confirm `next build` still statically prerenders all frontend routes (Payload routes are dynamic — expected).

### Files / architecture likely involved
`package.json`, `tsconfig.json` (new), `payload.config.ts` (new), `payload-types.ts` (generated), `next.config.mjs`, `app/(frontend)/**` (moved), `app/(payload)/**` (new), `.env.example`, `README.md`.

### Dependencies
Phases 3–6 complete (so the content layer is the single read path to swap). Decisions 1–3 above.

### Must NOT change
Any frontend component or `lib/content/*` behaviour; public URL set; metadata; `lib/services.js` / `lib/areas.js` / `lib/data.js` still the live data source.

### Implementation checklist
- [x] Decisions recorded in Notes.
- [x] Dependencies installed; `tsconfig.json`; `payload.config.ts`; `withPayload`.
- [x] Route groups created; all frontend files moved; `/admin` reachable locally.
- [x] Env vars documented; first admin user created locally (not committed).
- [x] Robots disallows `/admin`, `/api`.

### Verification checklist
- [x] `npm run build` passes; frontend routes still `○`/`●` static; `/admin` and `/api/*` dynamic.
- [x] All 6 + 24 public URLs unchanged (diff sitemap before/after).
- [x] Rendered HTML of `/` byte-identical in `<head>` metadata to pre-phase build (except build hashes).
- [x] `robots.txt` shows the new disallows.

### Completion criteria
Payload admin runs inside the app; frontend unchanged; build green.

### Deferred / boundary
No collections beyond stubs, no content in Payload, no frontend reads from Payload.

Notes (2026-09-11):
- **Decisions:** Postgres (`@payloadcms/db-postgres`), Vercel hosting, TypeScript for Payload files only (`tsconfig.json` with `allowJs`; all existing `.jsx`/`.js` untouched; `jsconfig.json` removed). `package.json` gained `"type": "module"` (required by the Payload CLI; all project JS was already ESM).
- **Next pinned to exactly 15.4.11.** Payload 3.89 peer-requires Next `>=15.4.11 <15.5.0 || >=16.2.6` — the previously installed 15.5.25 is unsupported; staying on 15 per the roadmap. Do not re-add a caret.
- Installed: payload / @payloadcms/next / @payloadcms/db-postgres / @payloadcms/richtext-lexical 3.89.0, sharp, graphql; dev: typescript 5.9, @types/*. GraphQL disabled in config (REST only).
- Structure: `app/(frontend)/**` (all public routes, root layout, icons, not-found, new `[...notFound]` catch-all) and `app/(payload)/**` (layout, `admin/[[...segments]]`, `api/[...slug]`, generated `admin/importMap.js`). `payload.config.ts` at root; `src/payload/collections/{Users,Media}.ts` stubs (Media already requires `alt`). `payload-types.ts` generated. Scripts: `payload`, `generate:importmap`, `generate:types`. `.gitignore` added.
- **Two Next-15.4 consequences fixed here (not in the original scope, but required to keep Phases 1–6 intact):** (1) metadata file routes are hashed in 15.4 (`/opengraph-image-4usi79`, `/apple-icon-…`), so the hard-coded `og:image`, `LocalBusiness.image` and manifest icon URLs broke → replaced by statically generated route handlers at stable URLs: `app/og/[key]/route.js` (`/og/default`, `/og/service-{slug}`, `/og/area-{slug}`, 25 images, photo compositing retained) and `app/brand/[key]/route.js` (`/brand/icon-192|512`); the three `opengraph-image.jsx` files were removed; `lib/seo.js` gained `ogImageUrl()`. Favicons still use the file convention (Next injects the hashed links itself). (2) `robots.js` and `manifest.js` are root-only conventions and were silently ignored inside the route group → moved (with `sitemap.js`) to `app/` root.
- With two root layouts Next cannot use a global not-found; `app/(frontend)/[...notFound]/page.jsx` calls `notFound()` so unmatched URLs get the branded 404 with a 404 status (verified).
- Robots now disallows `/admin` and `/api`.
- Verification: build 65 pages — 31 frontend HTML pages static/SSG, sitemap still exactly 30 URLs, titles/canonicals/robots identical to Phase 6, 143 JSON-LD blocks parse, `/og/*`, `/brand/*`, `/manifest.webmanifest`, `/robots.txt` serve 200 on `next start`. Admin verified with a **temporary SQLite adapter in `next dev`** (no Postgres available here): `/admin` 200, first user created via `/api/users/first-register`, `/api/users/me` authenticated, `/admin/collections/media` 200; then the swap was fully reverted (config restored, package removed, db file deleted). Against the real config without `DATABASE_URI`, `/admin` and `/api` return 500 (`ECONNREFUSED`) as expected.
- **Needed before Phase 8/9 can be verified against a real database:** a Postgres `DATABASE_URI` (Neon / Vercel Postgres) and a `PAYLOAD_SECRET` in the environment.

---

## Phase 8 — Payload collections, globals and reusable SEO field architecture ✅ COMPLETE

### Goal
Model all site content in Payload with one reusable SEO field group, and switch `lib/content/*` to read from Payload behind the same signatures.

### Exact scope
- `src/payload/fields/seo.ts` — reusable group `seo`: `title` (≤ 60 chars hint), `description` (≤ 160), `canonical` (optional override), `noIndex` (boolean), `ogImage` (relationship → Media), `ogTitle`/`ogDescription` (optional). Used by every page-like collection.
- `src/payload/fields/slug.ts` — slug field with auto-generation from `name`/`title`, uniqueness, and a hook that rejects changes to published slugs unless a redirect is created (Phase 14 wires redirects; here just lock).
- Collections: `Services` (fields exactly as named in Phase 3), `Areas` (Phase 4 names), `Faqs` (global FAQ pool with optional `service`/`area` relationship), `Reviews` (`quote`, `name`, `meta`, `source`, `rating?`, `verified` boolean — only `verified` ones render), `Media` (Phase 10 fills storage; here schema with required `alt`), `Users`.
- Globals: `SiteSettings` (`siteName`, `tagline`, `defaultSeo` group, `phone`, `whatsapp`, `address` group, `geo`, `openingHours[]`, `sameAs[]`, `googleSiteVerification`, `foundingYear`) and `Navigation` (`primary[]`, `footerColumns[]`). Fields are empty until Phase 9 migration; frontend falls back to `lib/site.js` values when a field is empty so nothing invented ships.
- `ServiceGroups` as a field on `Services`? No — model groups as a `group` select on each Service plus a `HomepageServiceGroups` array in a `Homepage` global only if Phase 9 confirms the home explorer stays; otherwise keep groups in code. Decide in this phase and record.
- `lib/content/*`: implement Payload Local API reads (`getPayload({ config })`), wrapped in `unstable_cache` with tags `services`, `areas`, `faqs`, `reviews`, `settings`; `afterChange`/`afterDelete` hooks call `revalidateTag` + `revalidatePath` for affected routes. `generateStaticParams` continue to work (build-time reads).
- `lib/schema.js`: read business facts from `SiteSettings` (address/geo/hours/`sameAs` only rendered when populated).
- Draft/publish (`versions: { drafts: true }`) on Services, Areas; content layer reads `draft: false` except in Draft Mode (preview wiring in Phase 13 can be shared).

### Files / architecture likely involved
`payload.config.ts`, `src/payload/collections/*.ts`, `src/payload/globals/*.ts`, `src/payload/fields/*.ts`, `src/payload/hooks/revalidate.ts`, `lib/content/*.js` (or `.ts`), `lib/schema.js`, `lib/site.js` (fallback role), `payload-types.ts`.

### Dependencies
Phase 7. Decision: which content stays code-owned (theme tokens, homepage decorative data like `clutterBlocks`, `processSteps` — recommend code) vs CMS-owned (services, areas, FAQs, reviews, settings, nav, blog).

### Must NOT change
Frontend components' props/expectations; URL shape; metadata helper API (`pageMetadata` gains an optional `seo` override object but stays backward compatible).

### Implementation checklist
- [x] SEO + slug reusable fields.
- [x] Collections and globals created with Payload-aligned names.
- [x] `lib/content/*` reads Payload with caching + revalidation hooks; identical return shapes.
- [x] `pageMetadata()` accepts `seo` override (title/description/canonical/noIndex/ogImage).
- [x] Schema reads SiteSettings with empty-safe rendering.
- [x] Types generated; admin shows all collections.

### Verification checklist
- [x] Build passes with an empty database (content layer must fall back to code data or empty lists without crashing — decide and test). **Decision: fall back to the code data, per collection.**
- [x] With seeded test docs (local only), a service page renders CMS values; editing in admin revalidates the page (`next start` test).
- [x] `noIndex: true` on a doc emits `robots: noindex` and removes it from sitemap (sitemap logic lands in Phase 14 — here verify the metadata part).

### Completion criteria
Every content type has a home in Payload; the frontend reads through the content layer from Payload; revalidation works.

### Deferred / boundary
Actual content migration (Phase 9), media storage (Phase 10), blog collections (Phase 11), redirects/sitemap (Phase 14).

Notes (2026-09-11):

**Decisions**
- **Fallback is per collection, not per document.** While a collection has no published documents (i.e. until the Phase 9 migration), the whole collection falls back to the code data in `lib/services.js` / `lib/areas.js` / `lib/data.js`; as soon as it has one, Payload is the only source for it. No per-document mixing, so a deletion in the admin is never undone by a leftover array in code. Without `DATABASE_URI` nothing Payload-related is imported at all and the build behaves exactly as it did in Phase 7.
- **Service groups stay code-owned.** No `ServiceGroups` collection and no `Homepage` global. The seven homepage explorer groups remain presentation data in `lib/services.js` (now with a `key`); Services gained a `group` select whose options are those keys, so the service→group mapping is CMS-editable. `getServiceGroups()` fills a group from the CMS mapping when any service claims it, otherwise keeps the code membership.
- **Code-owned vs CMS-owned:** CMS — services, areas, FAQ pool, reviews, media, site settings, navigation. Code — theme tokens, `processSteps`, `clutterBlocks`, `disposalStages`, the homepage group presentation data, and every page’s static section copy.
- **Paragraphs stay plain text, not Lexical.** Inline links are still `[label](/path)` rendered by `components/InlineText.jsx`; converting to rich text would change that component’s contract, which this phase must not do. Rich text arrives with the blog in Phase 11.
- **Reviews render only when `verified` is ticked**, and `source` is the evidence field. `Review`/`AggregateRating` structured data is still not emitted (Phase 6 deferred it until real reviews exist — Phase 9).

**Built**
- Reusable fields: `src/payload/fields/seo.ts` (`seoField({ name, label, required })` — title ≤ 70, description ≤ 180, `canonical`, `noIndex`, `ogImage`, `ogTitle`, `ogDescription`), `src/payload/fields/slug.ts` (slugify + auto-generate from `name`, unique, indexed, **rejects a slug change on a published document** until Phase 14 adds redirects), `src/payload/fields/content.ts` (shared `body` / `faqs` / `cta` / `intro` / `image`).
- Collections: `Services`, `Areas` (both `versions: { drafts: true }`, `defaultSort: num`), `Faqs`, `Reviews`, plus the existing `Media` and `Users`. Globals: `SiteSettings` (identity / contact / verification tabs) and `Navigation` (`primary[]`, `footerColumns[]`).
- `src/payload/hooks/revalidate.ts`: `afterChange`/`afterDelete`/global `afterChange` factories calling `revalidateTag` (+ `revalidatePath` for the affected routes and `/sitemap.xml`), wrapped in try/catch so Local-API writes outside a request scope (seed scripts) still succeed.
- Content layer: `lib/content/payload.js` (lazy client, `findAll`/`findGlobal` that never throw, `cached()` = `unstable_cache` with tags `services`/`areas`/`faqs`/`reviews`/`settings`, and a no-op passthrough when the CMS is off), `lib/content/map.js` (document → the exact shapes the pages already consume), and new `faqs.js` / `reviews.js` / `settings.js`. `services.js` / `areas.js` keep their Phase 3/4 signatures.
- `lib/seo.js`: `pageMetadata({ seo })` — the CMS group overrides title, description, canonical, `noIndex` (emits `robots: noindex, follow`) and the social card; callers that pass no `seo` are unaffected.
- `lib/schema.js`: `localBusinessSchema()` and `webSiteSchema()` are now async and read SiteSettings; `address` (street), `geo`, `openingHoursSpecification` and `sameAs` are emitted only when populated. The root layout awaits them.
- Frontend wiring: `Nav` takes `links` (from the Navigation global, default `navLinks`); `Footer` renders its link column from `footerColumns` (default = today’s three links, byte-identical output); `home/Faq` reads the site-wide FAQ pool; `home/Reviews` takes `items` and keeps its production placeholder filter.

**`dynamicParams` had to change (rendering note).** `/services/[slug]`, `/areas/[slug]` and `/og/[key]` were `dynamicParams = false`. With that setting a path revalidated by a Payload hook is no longer in the build-time params list, so Next answers `NoFallbackError` → 404 instead of regenerating (reproduced). They are now `true`: every known slug is still prerendered (`●`, 12 + 12 + 25), unknown slugs render on demand and still `notFound()` → HTTP 404, and a newly published document appears without a rebuild.

**Verification** (no Postgres in this environment, so the CMS path was tested against a **temporary SQLite adapter**, exactly as in Phase 7; the config patch, the `@payloadcms/db-sqlite` package and the `.db` file were all removed afterwards — `payload.config.ts` and `package.json` are back to Postgres-only).
- Empty/absent database: `npm run build` green, 65 pages, all frontend routes `○`/`●`, sitemap 30 URLs, 33 JSON-LD blocks across 8 routes parse with the same `@type` set as Phase 7, `LocalBusiness` identical (no invented address/geo/hours/sameAs), all 12 service titles and canonicals unchanged, nav and footer HTML unchanged, `/services/not-a-service` and `/areas/not-an-area` → 404.
- Seeded database (2 services, 2 areas, 3 FAQs, 2 reviews, both globals): build prerenders only the CMS documents; service page renders CMS `h1`/intro/body/facts/FAQs/CTA, related services and popular areas resolved through relationships, `BusinessAudience` from `audience`; slugs auto-generated from `name`; `noIndex` area → `robots: noindex, follow` **and** absent from the sitemap; drafts invisible (page 404, absent from `/services` and sitemap) and visible immediately after publishing; `getSiteFaqs()` returns only unscoped questions; the unverified review never renders; `LocalBusiness` picks up CMS name/phone/street/geo/hours/`sameAs`, with `description` still falling back to `lib/site.js`.
- Revalidation on `next start`: editing a service `h1` through `/api/services/:id` updated the prerendered page within ~2 s; the same held for the FAQ pool, a verified review and both globals. Attempting to change a published slug returned HTTP 400 with the lock message and left the slug untouched.

**Unresolved / carry-overs**
- **Still needed to run against the real database: a Postgres `DATABASE_URI` and a `PAYLOAD_SECRET`.** Nothing here has been exercised against Postgres.
- `revalidatePath('/sitemap.xml')` does **not** refresh the statically generated sitemap route, so a document published between deploys is missing from `/sitemap.xml` until the next build. Phase 14 owns the sitemap — give it a `revalidate` or make it read through a tagged cache.
- `googleSiteVerification` exists on the global but is not rendered: the root layout’s `metadata` is a static export and would have to become `generateMetadata()`. Phase 15 (Search Console) should do that.
- Contact links in `Nav`/`Footer`/`CtaBand` still read `lib/site.js` rather than SiteSettings. Harmless while the global is empty (identical values); wire them in Phase 9 once it is populated.
- Environment only: `node_modules` had a Linux esbuild build, so `npm run generate:types` / `generate:importmap` failed. Installing `@esbuild/win32-x64` (unsaved) fixed it, and the `.bin` shims are empty symlinks here, so run the CLI as `node node_modules/payload/bin.js generate:types`.
- `README.md` was written by Phase 7 through a PowerShell here-string and had every backtick escaped (`\``), so it rendered as literal backslashes; unescaped and updated for this phase.

---

## Phase 9 — Migration of hard-coded content into Payload ✅ COMPLETE

### Goal
Move the content that editors should own out of `lib/*.js` into Payload, with a repeatable seed script, and retire the code copies.

### Exact scope
- `scripts/seed.ts` (idempotent, keyed by slug): imports `lib/services.js`, `lib/areas.js`, `lib/data.js` (`faqs`, `reviews` — only non-placeholder), `lib/site.js` (`contact`, `site`) → creates/updates Payload docs and `SiteSettings`/`Navigation` globals. Runs via `npm run seed`.
- After successful seed and verification, delete migrated arrays from `lib/services.js`, `lib/areas.js`, `lib/data.js` and make `lib/content/*` Payload-only (remove code fallbacks except for `SiteSettings` empty fields). Keep code-owned data (`processSteps`, `clutterBlocks`, `disposalStages`, theme) unless the Phase 8 decision moved them.
- Remove the placeholder reviews entirely (they must never be seeded); the Reviews section renders only `verified: true` docs.
- Business facts still missing (address, geo, hours, `sameAs`, verification token) are **left empty** in `SiteSettings` and listed in Notes for the owner to fill in via admin.

### Files / architecture likely involved
`scripts/seed.ts` (new), `package.json` (script), `lib/services.js`, `lib/areas.js`, `lib/data.js`, `lib/site.js`, `lib/content/*`, `components/home/Reviews.jsx`, `README.md`.

### Dependencies
Phase 8; a reachable database.

### Must NOT change
Public URLs, slugs, metadata output (should be identical before/after migration), component markup.

### Implementation checklist
- [x] Seed script written, idempotent, documented.
- [x] Seed run; admin shows 12 services, 12 areas, FAQs, settings, nav.
- [x] Code data removed / content layer Payload-only.
- [x] Placeholder reviews deleted from code.

### Verification checklist
- [x] Build passes; rendered HTML for every route diffed against pre-migration build — only build hashes differ.
- [x] `sitemap.xml` identical before/after.
- [x] Re-running seed makes no changes (idempotency).
- [x] Missing business facts listed in Notes, not invented.

### Completion criteria
Editors can change services/areas/FAQs/settings in admin and see the site update; no duplicate data sources remain.

### Deferred / boundary
Images (Phase 10), blog (11–13).

Notes (2026-09-12):

**Decisions**
- **The migrated arrays moved, they were not deleted.** `scripts/seed.ts` has to read them to bootstrap a database, and deleting them would have made `npm run seed` a one-shot script that could never populate the real Postgres instance. They now live in `scripts/seed-data/{services,areas,faqs}.js` — read only by the seed, never by the site, so there is still exactly one runtime source of content. `lib/services.js` and `lib/areas.js` are gone; the homepage explorer groups (the one piece of `lib/services.js` that was presentation, not content) moved to `lib/data.js`, which now holds only code-owned data: `serviceGroups`, `processSteps`, `clutterBlocks`, `disposalStages`.
- **The seed is create-or-skip, not create-or-update.** "Idempotent" has to mean "safe to re-run", and a seed that overwrote documents from code would silently undo an editor’s work the next time anyone ran it. `npm run seed` creates what is missing and touches nothing else; `npm run seed -- --update` is the explicit escape hatch for restoring a document to its original text. Relationships are compared before writing, so a re-run issues no writes at all.
- **A missing database is now an error, not an empty site.** With no code fallback left, `lib/content/payload.js` throws a message naming `DATABASE_URI`, `PAYLOAD_SECRET` and `npm run seed` when the CMS cannot be reached — a failed build is far better than a deploy that silently ships zero service pages. A *reachable but empty* collection is different: that is a legitimate state for a fresh database, so it returns `[]` with a warning rather than throwing, which also keeps `/admin` reachable to fix it. Reviews pass `optional: true`, since "no verified reviews yet" is normal and must not warn.
- **`SiteSettings` and `Navigation` keep their code fallbacks** (per the phase scope): any field left empty falls back to `lib/site.js`, so an unfilled setting cannot blank the header, footer or business schema.
- **No reviews were seeded.** The three placeholders are deleted from the repo entirely. `components/home/Reviews.jsx` no longer needs its production placeholder filter and now simply renders nothing when there are no verified reviews.

**Changed**
- New: `scripts/seed.ts` (+ `npm run seed`), `scripts/seed-data/services.js`, `scripts/seed-data/areas.js`, `scripts/seed-data/faqs.js`.
- Deleted: `lib/services.js`, `lib/areas.js`; `faqs` and `reviews` removed from `lib/data.js`.
- `lib/content/*` is Payload-only (`payload.js` rewritten around the failure modes above; `services.js`, `areas.js`, `faqs.js`, `reviews.js` lost their fallbacks). `lib/content/settings.js` unchanged in behaviour.
- `README.md` (run steps now include `cp .env.example .env` + `npm run seed`; editing a service/area is an admin task; launch checklist points at Site settings) and `.env.example` (`DATABASE_URI` documented as required).

**Phase 8 defect fixed here:** the `seo` field caps (title 70, description 180) rejected three pieces of already-approved copy — the Palm Jumeirah (75) and Arabian Ranches (71) SEO titles and the commercial-junk-removal description (182). The caps were mine, not the plan’s (which asked only for a 60/160 *hint*), and the metadata had to migrate unchanged, so they are now 80 and 200 with the 60/160 guidance kept in the admin hint.

**Verification** (again against a temporary SQLite adapter — no Postgres here — with the config patch, the `@payloadcms/db-sqlite` package and the `.db` file removed afterwards; `payload.config.ts` and `package.json` are back to Postgres-only).
- Seed run on an empty database: 12 areas created, 12 services created, 24 documents wired with relationships, 8 FAQs created, settings and navigation created, 0 reviews.
- **Idempotency:** a second run reports `12 skipped / 12 skipped / already correct / 8 skipped / skipped / skipped`, and a before/after snapshot of every document’s `updatedAt` (plus the four collection counts) is identical — no writes are issued. (The SQLite file’s bytes do change between runs; that is the adapter’s schema-push, not data.)
- **Rendered output:** `npm run build` green, 65 pages, the same 12 service and 12 area pages prerendered. All 33 captured routes were compared before and after the migration with Next’s per-build noise removed (build id, chunk filenames, script preload order, RSC payload flush boundaries): **32 of 33 are byte-identical**, including every `<title>`, description, canonical, robots tag and all 143 JSON-LD blocks. The only difference anywhere is `<lastmod>` in `sitemap.xml`, which is `new Date()` at build time; its 30 URLs are identical.
- **The loud failure works:** a clean build with no `DATABASE_URI` fails at `Collecting page data` with `[content] DATABASE_URI is not set. … then run \`npm run seed\` to populate an empty one.` (An incremental rebuild can still succeed from `.next/cache`, so the check is only visible on a cold build.)

**Business facts still missing — the seed leaves these empty and lists them at the end of every run. Fill them in at /admin > Site settings:**
- Contact > Address (street line) — until then `LocalBusiness.address` carries only `addressLocality: Dubai` / `addressCountry: AE`.
- Contact > Geo (latitude and longitude).
- Contact > Opening hours.
- Contact > Social profiles (`sameAs`).
- Verification > Google site verification (wired up in Phase 15).

**Unresolved / carry-overs**
- **A Postgres `DATABASE_URI` and `PAYLOAD_SECRET` are still required, and `npm run seed` has never been run against Postgres.** Nothing in the repo can build until that happens. The seed itself is adapter-agnostic Local API code, so no changes are expected — but it is unverified on Postgres.
- `Review`/`AggregateRating` structured data is still not emitted (deferred from Phase 6). Add it once real verified reviews exist — the data now has a home.
- Contact links in `Nav`/`Footer`/`CtaBand` still read `lib/theme.js`/`lib/site.js` rather than Site settings. Values are identical today because the seed copied them; wiring them through the content layer is a small follow-up.
- Phase 8’s sitemap carry-over stands: `revalidatePath('/sitemap.xml')` does not refresh the statically generated sitemap route, so a document published between deploys is missing from it until the next build. Phase 14 owns the sitemap.

---

## Phase 10 — Media management through Payload ✅ COMPLETE (architecture) — assets pending

### Goal
Serve all site imagery from Payload's Media collection with required alt text, generated sizes and SEO-safe URLs.

### Exact scope
- **Decision required:** storage — local `/media` on disk (single-server hosts) vs S3/R2/Vercel Blob via `@payloadcms/storage-*` (serverless hosts). Chosen adapter determines `remotePatterns` in `next.config.mjs`.
- `Media` collection: `alt` required, `caption` optional, `imageSizes` (e.g. `thumbnail 400`, `card 800`, `hero 1600`, `og 1200×630`), `focalPoint` on, MIME restricted to images (+ PDF only if needed).
- `lib/content/media.js`: `toImageProps(doc)` → `{ src, alt, width, height }` consumed by `components/Media.jsx` from Phase 5 (no component changes).
- Upload the real photos from Phase 5 into Media; point `Services.image`, `Areas.image`, homepage/about slots (via `Homepage` global or fixed relationships — follow the Phase 8 decision) at Media docs.
- OG image routes read `seo.ogImage` → Media, falling back to the text template.
- Strip EXIF/GPS on upload (sharp) for privacy; filenames slugified.

### Files / architecture likely involved
`src/payload/collections/Media.ts`, `payload.config.ts` (storage plugin), `next.config.mjs` (`remotePatterns`), `lib/content/media.js` (new), `components/Media.jsx`, OG image routes, `.env.example`.

### Dependencies
Phases 5, 8, 9; storage decision; real assets.

### Must NOT change
`Media.jsx` props contract; page templates.

### Implementation checklist
- [x] Storage adapter configured; env documented.
- [x] Media collection sizes/alt/focal point.
- [x] Mapper + frontend consumption; OG fallback chain.
- [x] Assets uploaded with alt text (owner-provided or approved). **2026-09-15: done for 6 site slots + 11 services via `npm run seed:images` (see Phase 5 notes); `same-day-junk-removal` followed on 2026-09-17, so no service draws the placeholder any more. Uploaded to local storage only so far — re-run with `BLOB_READ_WRITE_TOKEN` set before production relies on it.**

### Verification checklist
- [x] Build passes; `<img>` `src` served from configured origin with `srcset`; `alt` present.
- [ ] Lighthouse image audits clean; LCP unchanged or better. **DEFERRED to Phase 16 with the other Lighthouse runs — no Chrome in this environment.**
- [x] Uploading a new image with empty `alt` is rejected in admin.

### Completion criteria
No images referenced from `public/images` (except icons); all imagery editor-managed.

### Deferred / boundary
Video, image sitemap (Phase 14 evaluates).

Notes (2026-09-12):

**Decisions**
- **Storage: Vercel Blob** (`@payloadcms/storage-vercel-blob`), chosen by the owner and consistent with the Phase 7 hosting decision. The adapter disables itself when `BLOB_READ_WRITE_TOKEN` is absent and falls back to Payload’s local `media/` directory, which is what development gets. `alwaysInsertFields: true` keeps the field schema identical with and without the token, so a database created locally matches the one created on Vercel. `next.config.mjs` allow-lists `**.public.blob.vercel-storage.com`.
- **`clientUploads` is off.** It would bypass Vercel’s ~4.5 MB request body cap, but the file would go straight to Blob and skip sharp — losing the EXIF stripping and the generated sizes this phase exists to add. Kept server-side processing and documented the cap (and the escape hatch) in the README instead.
- **Homepage/About photo slots live in `SiteSettings > Images`, not a `Homepage` global.** Phase 8 declined a Homepage global; the plan’s own alternative was "fixed relationships", and six named upload fields on the settings global is exactly that. `lib/images.js` keeps the slot keys as the fallback list (all null) and `getSiteImages()` resolves them.
- **A homepage explorer group takes the photo of the first service in it**, rather than getting its own slot. The groups are code-owned presentation data, so an editor has no place to upload a group photo; inheriting the lead service’s image means every visible slot is editor-managed without a new field.
- **Assets: architecture only**, per the owner. No photography with usage rights exists, so nothing was uploaded and every slot still draws the striped `Placeholder`. Filling them later needs no code change.

**Built**
- `Media`: `alt` required, `caption` optional, `focalPoint` + `crop` on, `mimeTypes: ['image/*']`, sizes `thumbnail` 400 / `card` 800 / `hero` 1600 / `og` 1200x630 (cover, focal-point cropped). `resizeOptions` caps the stored original at 2400px which — with `withMetadata: false` — is what actually strips EXIF/GPS: without a resize Payload stores the original byte-for-byte, metadata included. A `beforeOperation` hook slugifies the filename.
- `lib/content/media.js`: `toImageProps(doc)` (moved out of `map.js`, which now re-exports it) and `toOgImageProps(doc)`, which prefers the generated 1200x630 crop and falls back to the original.
- OG chain: `app/og/[key]/route.js` composites `seo.ogImage` → the page photo → nothing (text-only card). A document with `seo.ogImage` set also has its `og:image` replaced outright by that crop, via the Phase 8 `pageMetadata({ seo })` path.
- `lib/og-image.js` rewritten: reads `/public` paths, **Payload’s local `/api/<collection>/file/<name>` route straight off disk**, and `https://` URLs by fetch (8 s timeout, 8 MB cap). Every failure degrades to a text-only card with a warning rather than failing the build.
- Frontend: `components/home/Crew.jsx` and `components/home/Clearance.jsx` became async server components reading `getSiteImages()`; `app/(frontend)/about/page.jsx` the same. `components/Media.jsx` is untouched — its props contract held, as the phase required.

**A bug this phase found and fixed:** `loadOgPhoto` treated any `/`-prefixed src as a `/public` path, so a media URL from local storage (`/api/media/file/…`) resolved to `public/api/media/file/…` and silently produced a text-only card. Production on Blob would have been fine, which is exactly why it would have gone unnoticed. The before/after is visible in the byte sizes below.

**Verification** (temporary SQLite adapter again, reverted afterwards — `payload.config.ts` and `package.json` are Postgres-only, and `@payloadcms/storage-vercel-blob` is the one dependency this phase adds. Without a Blob token the local-storage path was exercised, which covers everything except Blob’s own URLs.)
- Uploaded a 3000x2000 JPEG carrying EXIF (camera make) and GPS coordinates, named `My Crew Photo (Final).JPG`:
  - **`alt` is required** — creating the document without it fails with `The following field is invalid: Alt`.
  - **filename slugified** → `my-crew-photo-final.jpg`.
  - **original capped** 3000x2000 → 2400x1600.
  - **EXIF/GPS gone** — sharp reports `hasExif: true` on the source and `false` on the stored file.
  - **sizes generated** — `thumbnail` 400x267, `card` 800x533, `hero` 1600x1067, `og` exactly 1200x630.
- Attached to a service, an area’s `seo.ogImage` and three Site settings slots, then rebuilt: the rendered `<img>` carries the alt text, `sizes`, `loading="lazy"` and a **9-entry `srcset`** through `/_next/image`, which serves it 200 `image/jpeg`. Services and slots with no image still render the placeholder, unchanged.
- OG cards: text-only 31537 bytes; with a composited photo 34129; the area using `seo.ogImage` went 31288 → 33232 once the `/api/…` path bug was fixed, which is the proof the photo is now in the card. `og:image` for that area points at the 1200x630 crop; other pages keep `/og/{kind}-{slug}`.
- Build green at 65 pages, sitemap still 30 URLs, no image referenced from `public/images` (only `.gitkeep` remains there).

**Unresolved / carry-overs**
- **Photography:** supplied 2026-09-15 and seeded by `scripts/seed-images.ts` (idempotent; `--update` re-points filled slots). Remaining gap: a same-day collection photo — upload in /admin > Media and attach, or add it to the script's maps.
- **`BLOB_READ_WRITE_TOKEN` has never been exercised** — verification ran on local storage. Connect a Blob store to the Vercel project (which sets the variable automatically) and re-check one upload’s URL.
- Lighthouse image audits and LCP: deferred to Phase 16 with the other Lighthouse runs.
- The OG route composites a page photo at full size (up to 2400px) rather than its 1200x630 crop, because the mapper collapses a media document to one descriptor before the route sees it. Correct output, slightly wasteful at build; worth revisiting only if build time becomes a problem.
- `next.config.mjs` still sets an immutable cache header for `/images/*`. Nothing is served from there now; it is harmless and stays in case a static asset is ever added.

---

## Phase 11 — Blog content model ✅ COMPLETE

### Goal
Define the Posts data model and editorial workflow in Payload before any blog UI exists.

### Exact scope
- `Posts` collection: `title`, `slug` (locked after publish), `excerpt` (used as meta description default), `coverImage` (Media, required for publish), `content` (Lexical rich text with headings limited to h2–h4, links, images, blockquote, lists; **no h1**), `author` (relationship → `Authors`), `publishedAt`, `updatedAt` (system), `status` via drafts, `relatedServices[]`, `relatedAreas[]`, `seo` group (shared field), `readingTime` (computed hook).
- `Authors` collection (`name`, `role`, `bio`, `photo`, `sameAs[]`) → renders `Person` in `BlogPosting.author`. Publisher is the `LocalBusiness` `@id`.
- **Categories/tags decision:** create a `Categories` collection **only if** the editorial plan has ≥ 3 categories with ≥ 3 posts each planned; otherwise no taxonomy (avoid thin archive pages). Record the decision. Tags are **not** planned.
- Lexical → HTML/JSX serializer in `lib/content/richtext.jsx` producing semantic markup, `next/image` for embedded media, `rel="nofollow"` optional per link, external links `target="_blank" rel="noopener"`.
- Access control: only `published` docs are readable without auth; drafts via Draft Mode (Phase 13).
- Revalidation hooks: `posts` tag, `/blog`, `/blog/[slug]`, sitemap.

### Files / architecture likely involved
`src/payload/collections/Posts.ts`, `src/payload/collections/Authors.ts`, (`Categories.ts` if justified), `lib/content/posts.js`, `lib/content/richtext.jsx`, `payload.config.ts`, `payload-types.ts`.

### Dependencies
Phases 8, 10 (Media). Editorial decision on categories and on who the author(s) are (do not invent authors).

### Must NOT change
Existing collections' fields; frontend routes.

### Implementation checklist
- [x] Posts + Authors collections with SEO group.
- [x] Category decision recorded; collection created only if justified. **Not created — see Notes.**
- [x] Rich-text serializer with heading constraints.
- [x] Content-layer functions: `getPosts({ page, perPage })`, `getPostBySlug`, `getPostSlugs`, `getRelatedPosts`.
- [x] Revalidation hooks.

### Verification checklist
- [x] Types generate; admin can create a draft post with a cover and related services.
- [x] Serializer output for a fixture doc contains no `<h1>`, valid nesting, images via `Media.jsx`.
- [x] Unauthenticated API cannot read drafts.

### Completion criteria
Editors can author posts end-to-end (unpublished); frontend has typed access functions.

### Deferred / boundary
Any `/blog` UI (12–13), sitemap (14).

Notes (2026-09-12):

**The database is real now.** `DATABASE_URI` and `PAYLOAD_SECRET` were supplied before this phase, so Payload created its tables against Postgres and `npm run seed` ran there for the first time: 12 areas, 12 services, 24 documents wired, 8 FAQs, both globals, 0 reviews. That retires the Phase 9 carry-over — everything below was verified against Postgres, not SQLite. (The `pg` driver prints an informational notice about a future `sslmode` default change; nothing to act on.)

**Decisions**
- **No `Categories` collection, and no tags.** The plan allows a taxonomy only if the editorial plan promises at least three categories with three posts each; there is no editorial plan and no posts, so archives would be thin pages with nothing on them. Adding the collection later is purely additive. Recorded as required.
- **No authors were created.** "Do not invent authors" — the collection ships empty and an editor adds the real person before the first post. `Authors` carries a slug so Phase 12/13 can add `/blog/author/[slug]` without a migration; nothing links to it yet.
- **Paragraph copy on services and areas stays plain text.** Lexical is introduced here for post bodies only; converting the existing `[label](/path)` + `InlineText` contract was explicitly out of scope from Phase 8 onwards and nothing about it changed.
- **`coverImage` is required to publish, not to save.** A field-level `validate` checks `_status === 'published'`, so a half-written draft is never blocked but a published post always has a social card.

**Built**
- `src/payload/collections/Posts.ts`: `title`, `slug` (locked after publish), `excerpt` (required, ≤ 200, the meta-description default), `coverImage`, `content` (Lexical), `author` (→ Authors, required), `publishedAt` (stamped on first publish, then left alone), `relatedServices[]`, `relatedAreas[]`, shared `seo` group, `readingTime` (read-only, recomputed from the body on every save at ~200 wpm). Drafts on, `defaultSort: '-publishedAt'`, revalidation on the `posts` tag plus `/blog`, `/blog/[slug]` and the sitemap.
- Editor features are a deliberately short list: paragraph, **h2-h4 only**, bold, italic, link, both list types, blockquote, upload, horizontal rule, inline toolbar. The link feature gains a `nofollow` checkbox for paid or untrusted destinations.
- `src/payload/collections/Authors.ts`: `name`, `role`, `bio`, `photo`, `sameAs[]`, slug.
- **Access control**: `read` is filtered to `_status: published` for anyone not logged in. The frontend is unaffected (it reads through the Local API with `overrideAccess`), so this governs the public REST API.
- `lib/content/richtext.jsx`: Lexical → semantic JSX. Handles exactly the enabled node types; clamps stray headings to `h2`; drops empty paragraphs; renders internal links through `next/link` and external ones with `target="_blank" rel="noopener noreferrer"` (plus `nofollow` on request); renders `upload` nodes through `components/Media.jsx` so embedded images are `next/image` with alt text like every other image; falls back to rendering an unknown node’s children rather than dropping its text. Also exports `richTextToPlainText()`.
- `lib/content/posts.js`: `getAllPosts`, `getPostSlugs`, `getPostBySlug`, `getPosts({ page, perPage })` (paged listing cards) and `getRelatedPosts(slug, limit)` (ranked by shared services/areas, then recency). `mapPost`/`mapPostCard`/`mapAuthor` added to `lib/content/map.js`; `postHref()` added to `lib/hrefs.js`; `posts` added to the cache tags.

**Finding worth recording: Payload does not enforce `enabledHeadingSizes` server-side.** A document containing an `h1` node saves without complaint through the Local API — the restriction is a toolbar affordance, not validation. The serializer clamp is therefore the actual guarantee, not a belt-and-braces extra. Verified both halves: the stored document round-trips with only `h2`/`h3`, and a hostile fixture containing `h1` and `h5` renders as two `h2`s with `h1Count: 0`.

**Verification** (against Postgres; every fixture was deleted afterwards and the counts checked back to zero).
- Created a media document, an author and a draft post with a cover and two related services: slug generated from the title, `_status: draft`, `publishedAt` null, `readingTime` computed.
- **Publishing without a cover is refused** with exactly `The following field is invalid: Cover Image`.
- **Drafts are invisible without auth**: `find` with `overrideAccess: false` returns 0 documents and `findByID` on the draft is hidden. After publishing, the same anonymous read returns 1 and `publishedAt` is stamped.
- **Slug locks after publish** (the Phase 8 hook applies to posts too).
- **Serializer on the stored document**: `h1Count: 0`, headings `[h2, h3]`, structure `h2, h3, p, strong, em, a, ul, li, ol, blockquote, hr, Media`; the internal link renders as `next/link` → `/services/junk-removal`; the external links carry `rel="noopener noreferrer"` and `rel="noopener noreferrer nofollow"` with `target="_blank"`; one `Media` component for the embedded upload.
- **Serializer defences**: `h1` and `h5` both clamped to `h2`, empty paragraph dropped, unknown node’s text preserved, empty document renders `null`.
- Build green against Postgres: 65 pages, sitemap still 30 URLs, `/blog` still 404 (no UI yet, as the phase requires), `/api/posts` and `/api/authors` return empty lists.

**Unresolved / carry-overs**
- **An author record, and the first post.** Nothing can be published until someone creates the real person in /admin > Authors.
- **The editorial plan that would justify categories.** If one appears with ≥ 3 categories × ≥ 3 posts, add the collection then.
- `richtext.jsx` takes a `styles` object so it does not import the theme; Phase 13 supplies the real type scale when it builds the post page.
- `BLOB_READ_WRITE_TOKEN` is still empty, so uploads (including post covers) go to the local `media/` directory. Connect a Blob store before publishing anything.
- Phase 14 still owns the sitemap, which does not yet include `/blog` URLs.

---

## Phase 12 — `/blog` listing page ✅ COMPLETE

### Goal
Ship an indexable, paginated blog index built on the existing design system.

### Exact scope
- `app/(frontend)/blog/page.jsx` (page 1) and `app/(frontend)/blog/page/[n]/page.jsx` (page ≥ 2), both static via `generateStaticParams` from post count (per-page constant in `lib/content/posts.js`). `/blog/page/1` redirects to `/blog` (Phase 14 redirect table or `redirect()` here).
- Metadata via `pageMetadata()`: title/description from a `Blog` global or SiteSettings blog fields (editor-set; placeholder copy not invented — ask); canonical self-referencing per page (`/blog`, `/blog/page/2`); page ≥ 2 titles suffixed "— Page n".
- Markup: `Breadcrumbs` (Home / Blog), descriptive `<h1>`, `<article>` per post with `<h2><Link>`, `Media` thumbnail, excerpt, `<time dateTime>`, author; pagination `<nav aria-label="Pagination">` with real links (no JS-only paging).
- JSON-LD: `CollectionPage` + `BreadcrumbList` (+ `ItemList` of posts optional).
- Add "Blog" to `Navigation` global / `navLinks` fallback and the footer secondary links.
- Empty state: if no published posts, page renders a short editor-controlled message and is `noIndex` until ≥ 1 post exists (prevents an empty indexed page).

### Files / architecture likely involved
`app/(frontend)/blog/page.jsx`, `app/(frontend)/blog/page/[n]/page.jsx`, `components/blog/PostCard.jsx`, `components/blog/Pagination.jsx`, `lib/content/posts.js`, `src/payload/globals/Blog.ts` (or fields on SiteSettings), `lib/schema.js`, Navigation.

### Dependencies
Phase 11; blog index title/description from the owner.

### Must NOT change
Post model; other routes.

### Implementation checklist
- [x] Listing + paginated routes, static.
- [x] Metadata/canonical per page; empty-state `noIndex`.
- [x] Cards, pagination, breadcrumbs, schema.
- [x] Nav/footer link.

### Verification checklist
- [x] Build lists `/blog` and `/blog/page/[n]` as static with ≥ 1 test post.
- [x] Canonicals self-reference; page 2 has distinct title; no duplicate content between pages.
- [x] Every card links to a post; pagination links are crawlable `<a href>`.

### Completion criteria
Blog index live, paginated, indexable when it has content.

### Deferred / boundary
Category archives (only if Phase 11 justified them — then add here as a follow-up sub-task), RSS (optional, Phase 14).

Notes (2026-09-12):

**Copy**: the owner approved the blog index title, description, H1 and standfirst (drafted from claims already on the site, no new facts). It lives in `scripts/seed-data/blog.js` and seeds into the new `Blog index` global, so it is editable in /admin from here on.

**Decisions**
- **A `Blog` global rather than fields on SiteSettings.** The index has its own heading, standfirst, holding message and SEO group; hanging four more fields off the business-identity global would have muddled both. Phase 13/14 can extend it.
- **One `BlogIndex` component, two routes.** `/blog` and `/blog/page/[n]` render the same component so the list, cards, pagination and schema cannot drift apart; only the metadata is built per route.
- **`/blog/page/1` is a 308 to `/blog`**, not a duplicate page, and it is deliberately absent from `generateStaticParams`.
- **`dynamicParams = true` on the paginated route**, for the Phase 8 reason: with `false`, a path revalidated by a Payload hook is no longer in the build-time params list and Next serves a 404 instead of regenerating.
- **`POSTS_PER_PAGE = 9`** in `lib/content/posts.js`; both routes derive from it.

**Built**
- `src/payload/globals/Blog.ts` (`h1`, `intro`, `emptyState`, shared `seo` group) + `lib/content/blog.js`. No invented fallback copy: an empty field falls back to the literal label "Blog".
- `app/(frontend)/blog/page.jsx` and `app/(frontend)/blog/page/[n]/page.jsx`; `components/blog/BlogIndex.jsx`, `PostCard.jsx`, `Pagination.jsx` — all server components, so the listing ships no JavaScript of its own.
- Markup: `Breadcrumbs` (Home / Blog) via `PageHero`, descriptive `<h1>`, an `<article>` per post with `<h2><Link>`, `Media` thumbnail, excerpt, `<time dateTime>` and author; pagination is a `<nav aria-label="Pagination">` of real `<a href>` links with `rel="prev"`/`rel="next"` and `aria-current="page"` on the current one.
- `CollectionPage` + `ItemList` JSON-LD (only when there are posts), alongside the existing `BreadcrumbList`.
- "Blog" added to the `navLinks` fallback, the footer’s code fallback, the seed data **and** the live Navigation global (a targeted, idempotent insert rather than a blanket `--update`, so nothing else in the global was touched).
- `blogPageHref()` added to `lib/hrefs.js`.

**A bug found and fixed while cleaning up fixtures.** Deleting a Media document cascades an update onto every document that referenced it, and on that path Payload does not always populate `originalDoc`. The Phase 8 slug hook returned `next || previous`, so with `originalDoc` absent it returned undefined — blanking a required, *live* slug (the delete failed with `ValidationError: slug`, but the same path could have corrupted a URL). The hook now falls back through `originalDoc.slug` → `siblingData.slug` → the incoming value before giving up. Proved with a probe: a published post whose cover image is deleted keeps its slug, stays published, and the media delete succeeds.

**Verification** (against Postgres; 11 fixture posts, an author and a cover image were created, checked, then deleted — the database is back to 0 posts / 0 authors / 0 media, 12 services, 12 areas).
- **Empty state**: `/blog` returns 200 with the approved title, the holding message, and `robots: noindex, follow` because no post is published; `/blog/page/2` is 404.
- **With 11 posts**: build shows `/blog` static (`○`) and `/blog/page/2` prerendered (`●`), 67 pages. `/blog` lists 9 articles newest-first with 9 `<time>` elements and 9 cover images with alt text; `/blog/page/2` lists the remaining 2.
- **No duplication**: zero overlap between pages 1 and 2, 11 distinct posts across them. Canonicals self-reference (`/blog`, `/blog/page/2`); page 2’s title is suffixed "— Page 2"; both are `index, follow` once posts exist.
- **Pagination is crawlable**: real `<a href="/blog/page/2">` links, `rel="next"` on page 1 and `rel="prev"` on page 2, current page as `<span aria-current="page">`.
- `/blog/page/1` → **308** to `/blog`; `/blog/page/3`, `/blog/page/0` and `/blog/page/abc` all 404.
- JSON-LD on both pages: `BreadcrumbList`, `CollectionPage` (ItemList of 9 and 2), plus the site-wide `LocalBusiness` and `WebSite`.
- "Blog" appears three times on the homepage (desktop nav, mobile menu, footer). Sitemap unchanged at 30 URLs — blog URLs are Phase 14’s job.

**Unresolved / carry-overs**
- **No posts and no author exist**, so `/blog` ships as the holding page. It becomes indexable automatically the moment a post is published.
- The sitemap still has no `/blog` URLs; Phase 14 owns that, along with the `revalidatePath('/sitemap.xml')` limitation carried since Phase 8.
- A published post can end up with a null `coverImage` if its image is deleted, because the "cover required to publish" rule is a write-time validation. Nothing breaks (the social card falls back to the text template), but Phase 13 could surface it in the admin list.
- RSS is still optional/Phase 14; category archives remain unjustified (Phase 11 decision).

---

## Phase 13 — `/blog/[slug]` single post page ✅ COMPLETE

### Goal
Ship fully optimised post pages with article metadata, `BlogPosting` schema, breadcrumbs, related services/areas links and draft preview.

### Exact scope
- `app/(frontend)/blog/[slug]/page.jsx`: `generateStaticParams` from published slugs; `generateMetadata` via `pageMetadata()` with `openGraph.type: 'article'`, `publishedTime`, `modifiedTime`, `authors`, cover as `og:image` (falls back to text template); canonical override from `seo.canonical` for syndicated posts; `noIndex` honoured.
- Markup: `Breadcrumbs` (Home / Blog / {title}), `<article>` with single `<h1>`, `<time>` published/updated, author line, serialized body, cover via `Media` with `priority`, related posts, **"Related services / areas" block** from `relatedServices`/`relatedAreas` (falls back to top services if empty), `CtaBand`.
- JSON-LD: `BlogPosting` (`headline`, `image`, `datePublished`, `dateModified`, `author` Person, `publisher` → business `@id`, `mainEntityOfPage`) + `BreadcrumbList`.
- Draft preview: Next Draft Mode route (`app/(frontend)/api/preview`) + Payload `livePreview`/preview URL config; drafts never statically generated and always `noIndex`.
- Per-post OG image route using cover or text template.
- Internal linking rules documented: every post links ≥ 1 service or area page in body or related block.

### Files / architecture likely involved
`app/(frontend)/blog/[slug]/page.jsx`, `app/(frontend)/blog/[slug]/opengraph-image.jsx`, `app/(frontend)/api/preview/route.js`, `components/blog/PostBody.jsx`, `components/blog/RelatedLinks.jsx`, `lib/content/posts.js`, `lib/schema.js` (`blogPostingSchema`), `src/payload/collections/Posts.ts` (preview URL), `lib/seo.js` (article OG support).

### Dependencies
Phases 11–12; at least one real post for verification (do not fabricate published content — use a clearly-marked draft fixture and delete it).

### Must NOT change
Service/area pages; listing page contract.

### Implementation checklist
- [x] Post route with static params, metadata, `notFound`.
- [x] Article OG/Twitter, canonical override, `noIndex`.
- [x] `BlogPosting` + breadcrumbs; author Person.
- [x] Related services/areas block; related posts.
- [x] Draft preview; drafts excluded from build and marked `noIndex`.
- [x] Per-post OG image.

### Verification checklist
- [x] Build: `/blog/[slug]` static for published posts only.
- [x] Rendered HTML: one `<h1>`, `og:type=article`, `article:published_time`, valid `BlogPosting` JSON.
- [x] Preview shows draft content with `noindex`; production URL of a draft 404s.
- [x] Fixture post links to ≥ 1 service/area page.

### Completion criteria
Post pages complete and validated; editors can preview drafts.

### Deferred / boundary
Comments, social share buttons, reading progress — not SEO, not planned.

Notes (2026-09-12):

**Decisions**
- **The per-post social image is the `/og/post-{slug}` route, not `opengraph-image.jsx`.** The plan listed the file convention, but Phase 7 replaced it everywhere because Next 15.4 hashes those routes (`/opengraph-image-4usi79`), which cannot be referenced from metadata or JSON-LD. Posts now join services and areas in `app/og/[key]/route.js`.
- **`draftMode()` in the page, not a separate preview route.** Verified that this keeps `/blog/[slug]` prerendered (`●`) for the public — Next only falls back to a request-time render when the draft cookie is present — so preview costs the published pages nothing.
- **A draft gets no `BlogPosting` markup** and is `noindex`, because it is not a published article.
- **The related block falls back to the first three services** when an editor names no service or area. The internal-linking rule is that every post routes back into the money pages; a fallback enforces it even when someone forgets.
- **`dynamicParams = true`** on the post route, for the Phase 8 reason (a revalidated path that is not in the build-time params list 404s instead of regenerating).

**Built**
- `app/(frontend)/blog/[slug]/page.jsx`: static params from published slugs; `<article>` with a single `<h1>`, published/updated `<time>`, byline, cover via `Media` with `priority`, serialized body, related services/areas, related posts, `CtaBand`. "Updated" only shows when it is more than a day after publication, so a typo fix does not read as a rewrite.
- `components/blog/PostBody.jsx` (the type scale handed to the theme-free serializer) and `components/blog/RelatedLinks.jsx`.
- `lib/schema.js` gained `blogPostingSchema()`: `headline`, `description`, `datePublished`, `dateModified`, `image`, `timeRequired`, `author` as a full `Person` (job title, bio, `sameAs`, photo — each only when present), `publisher` and `isPartOf` pointing at the existing business and website `@id`s.
- Draft preview: `app/(frontend)/api/preview/route.js` + a `preview` URL on the Posts collection. Guards in order — `PREVIEW_SECRET` must be configured (501 if not), the secret must match (401), the slug must be a plain slug (401), and the document must exist (404) — so it is neither an open redirect nor a way to force every post page to render dynamically. `?exit=1` disables it.
- `lib/content/payload.js` gained `findOne()` (uncached, draft-capable) and `lib/content/posts.js` `getDraftPostBySlug()`, which is deliberately never used by a static page.
- `PREVIEW_SECRET` documented in `.env.example`.

**Two bugs found and fixed**
- **`og:image` declared 1200x630 while serving the full-size cover** (1800x1100 in the fixture). `mapPost` now also exposes `coverOgImage`, the generated 1200x630 crop, and the page uses it with its real dimensions.
- **Deleting an author orphaned its posts.** `author` is required on a post, but Payload deleted the author anyway and left published posts holding null — no byline, no `Person` in the structured data. `Authors` now has a `beforeDelete` hook that refuses while posts reference it and names them. Verified: the delete is refused with "This author still has 1 post(s) — Guard probe post…", and succeeds once the post is gone.

**Verification** (against Postgres, with three fixtures — a fully wired post, one with no relationships, and a draft — all deleted afterwards; the database is back to 0 posts / 0 authors / 0 media, 12 services, 12 areas).
- **Build**: 70 pages with the fixtures, `/blog/[slug]` prerendered (`●`) for the two published posts only — the draft is absent. Back to 66 pages once removed.
- **Rendered HTML**: exactly one `<h1>`; self-referencing canonical; `og:type=article`; `article:published_time` 2026-02-01 and `article:modified_time` present; `article:author`; `og:image` the 1200x630 crop with matching `og:image:width/height`.
- **`BlogPosting` JSON-LD** parses with `headline`, `datePublished`, `dateModified`, `image`, `timeRequired: PT1M`, `author` Person (name, jobTitle, description, sameAs) and `publisher`/`mainEntityOfPage` pointing at the right `@id`s. Emitted alongside `BreadcrumbList`, `LocalBusiness` and `WebSite`.
- **Internal linking**: the wired post renders its 3 named services and 2 named areas in the related block (confirmed by scoping the check inside the block, since the footer also lists services and areas), plus an in-body link to `/services/junk-removal`. The post with no relationships renders the 3-service fallback and no areas column.
- **Draft preview**: `/api/preview` with the right secret sets `__prerender_bypass` and 307s to the post, which then renders the draft with the banner and `noindex, follow` and **no** `BlogPosting`. The same URL without the cookie 404s. Wrong/missing secret and a traversal-style slug all 401; unconfigured returns 501. `?exit=1` clears it.
- `/og/post-{slug}` returns 200. Sitemap unchanged at 30 URLs (Phase 14 owns blog URLs).

**Unresolved / carry-overs**
- **No author record and no posts exist**, so the blog ships as a holding page. Create the person in /admin > Authors, then write the first post.
- **`PREVIEW_SECRET` is not set in `.env`** — preview returns 501 until it is. Generate one with `openssl rand -hex 32`.
- The sitemap still has no blog URLs, and `revalidatePath('/sitemap.xml')` still does not refresh the static sitemap route. Both are Phase 14.
- `article:modified_time` comes from the row’s `updatedAt`, so any save bumps it. Fine while posts are edited deliberately; worth revisiting if bulk operations ever touch every row.

---

## Phase 14 — Dynamic sitemap, redirects and indexing controls for CMS content ✅ COMPLETE

### Goal
Make crawl control fully data-driven: sitemap from Payload, editor-managed redirects, and consistent `noIndex` handling everywhere.

### Exact scope
- `app/(frontend)/sitemap.js`: build from `lib/content/*` — static routes + services + areas + blog index/pagination + posts, using real `updatedAt` for `lastModified`; exclude `noIndex` docs and drafts; split into `generateSitemaps()` index if URL count could exceed ~5k (blog growth) — otherwise single file.
- Redirects: `Redirects` collection in Payload (`from`, `to`, `type` 301/302) + `next.config.mjs` `redirects()` reading them at build, **and** a runtime fallback (middleware or `not-found` lookup) so new redirects work without a rebuild. Wire the Phase 8 slug-lock hook to auto-create a 301 when a published slug changes.
- Legacy anchors: keep `/services#slug` → card ids (already), add explicit 301s only for any historic URLs the owner reports (ask; do not guess).
- Indexing controls: `noIndex` from `seo` group → `robots` meta on every CMS-backed route; `/blog/page/1` → `/blog`; trailing-slash policy fixed (`trailingSlash: false`, host-level normalisation confirmed in Phase 15).
- `robots.js`: keep `/admin`, `/api` disallowed; add `/api/preview`.
- Optional: RSS feed `app/(frontend)/feed.xml/route.js` (cheap, helps discovery) — include only if approved.

### Files / architecture likely involved
`app/(frontend)/sitemap.js`, `app/(frontend)/robots.js`, `next.config.mjs`, `middleware.js` (new, if runtime redirects chosen), `src/payload/collections/Redirects.ts`, `src/payload/fields/slug.ts`, `lib/content/redirects.js`.

### Dependencies
Phases 9, 13.

### Must NOT change
URL shapes; metadata helper.

### Implementation checklist
- [x] Data-driven sitemap with `lastModified`, exclusions.
- [x] Redirects collection + runtime handling; slug-change hook. **Build-time `redirects()` deliberately not added — see Notes.**
- [x] `noIndex` enforced on all CMS routes; pagination canonical rules.
- [x] Robots updated.

### Verification checklist
- [x] `sitemap.xml` contains every indexable URL and no drafts/`noIndex`; `lastmod` matches Payload `updatedAt`.
- [x] Changing a published slug produces a working redirect from old to new (308; tested with `curl -I`).
- [x] `noIndex` doc shows `noindex` meta and is absent from sitemap.
- [x] No redirect chains (followed every sitemap URL, 200 on the first hop).

### Completion criteria
Crawl surface is exactly the set of indexable published pages; editors can manage redirects.

### Deferred / boundary
Image/video sitemaps (only if imagery becomes a traffic goal).

Notes (2026-09-12):

**Owner decisions:** no historic URLs to redirect from (new site), and the optional RSS feed was approved.

**Decisions**
- **Redirects are applied at request time only; no build-time `next.config.mjs` redirects().** Reading them in the config would make every `next start` and every admin boot depend on a database query at config-load, and it would still need a rebuild to take effect — which the plan itself rules out by asking for a runtime fallback. The runtime path covers everything the build-time one would, so adding both is redundancy with a cost.
- **The lookup lives in the routes, not in middleware.** Middleware runs on the Edge runtime, which cannot reach the Payload Local API. Doing it in the catch-all (and in the three `[slug]` routes) keeps it on Node, costs nothing on normal traffic because only would-be-404s reach it, and cannot shadow a live page.
- **"Permanent" is a 308, not a 301.** That is what `permanentRedirect()` emits; it is the method-preserving equivalent and Google treats it identically. The admin labels say so rather than promising a 301 the app does not send.
- **One sitemap file, not `generateSitemaps()`.** 30-odd URLs plus one per post; the split is worth adding somewhere north of ~5,000, which is thousands of posts away. The threshold is written into the file so the next person does not have to rediscover it.
- **The sitemap re-renders hourly** (`export const revalidate = 3600`). This is the fix for the carry-over first noted in Phase 8: `revalidatePath('/sitemap.xml')` does not reliably refresh a statically generated metadata route, so a time-based revalidate is what actually keeps it current between deploys.
- **The feed carries excerpts, not full bodies** — discovery without handing scrapers the whole article.

**Built**
- `app/sitemap.js` rewritten: static routes + services + areas + blog index + blog pagination + posts, each with the document’s real `updatedAt` as `lastmod`; listing pages take the newest `updatedAt` of what they list. Excludes `noIndex` documents, drafts, and `/blog` while it has no posts (it is `noindex` in that state, and asking Google to crawl a page we told it to drop is incoherent).
- `Redirects` collection (`from`, `to`, `type`, `note`) with path validation on both ends, plus `lib/content/redirects.js` (cached, tagged, path-normalising) and `redirectOrNotFound()`.
- `src/payload/hooks/slug-redirect.ts`: on a published slug change, writes the redirect, **re-points anything already aimed at the old path** so no chain forms, and **deletes any entry that would become a loop** (the slug changed and then changed back). Wired into Services, Areas and Posts. A failure there logs loudly but never fails the editor’s save.
- The Phase 8 slug lock is gone: changing a published slug is now allowed, because there is finally somewhere for the old URL to go.
- `app/(frontend)/feed.xml/route.js` — RSS 2.0, `noIndex` posts excluded, `atom:self` link, hourly revalidate; discovery `<link>` on every page.
- `robots.js` adds `/api/preview`; `next.config.mjs` sets `trailingSlash: false` explicitly.

**Two bugs found and fixed during verification**
- **The automatic slug redirects never fired.** `/blog/[slug]` matches before `[...notFound]`, so an old slug 404’d inside the post route and the redirect table was never consulted — precisely the URLs the hook exists to protect. The three `[slug]` routes now call `redirectOrNotFound()` instead of `notFound()`. Before the fix `/blog/p14-fixture-new` returned 404; after, 308.
- **The feed `<link>` was missing from every page.** Next replaces `alternates` wholesale between layout and page — the same trap `lib/seo.js` already documents for `openGraph` — so putting it only in the root layout meant every page that sets a canonical (all of them) dropped it. It now goes through `pageMetadata()`.

**Verification** (against Postgres, with three fixture posts, an author, a cover image, several redirects and a throwaway API user — all deleted afterwards; the database is back to 0 posts / 0 redirects / 0 authors / 0 media / 0 users, with 12 services, 12 areas and 8 FAQs untouched).
- **Sitemap**: 33 URLs with fixtures (6 static + 12 services + 12 areas + `/blog` + 2 posts); the `noIndex` post is absent. Back to 30 with the fixtures gone, `/blog` dropping out again. `lastmod` matched Payload’s `updatedAt` exactly for every document checked, and 27 of 33 entries carry distinct timestamps — they are real dates, not the build time.
- **No chains**: followed all 33 sitemap URLs; every one answered **200 on the first hop**.
- **Slug changes**: renaming a published post wrote `/blog/old -> /blog/new`; renaming again left all entries pointing one hop at the final URL rather than chaining; renaming back to the original removed the would-be loop. `curl -I` on the old URL: `308` with a single `Location` header, following to a `200`.
- **Editor path works without a rebuild**: creating a redirect through the REST API against the running server went from 404 to 308 within seconds, including one under `/services/[slug]`.
- **`noIndex`**: the hidden post served `robots: noindex, follow` and was absent from both the sitemap and the feed.
- **Feed**: 200 `application/rss+xml`, 2 items, the `noIndex` post excluded, `atom:self` present, and the discovery `<link>` on the homepage and on a service page.
- **robots.txt** disallows `/admin`, `/api` and `/api/preview`, and points at the sitemap.

**Unresolved / carry-overs**
- **A redirect created by a script does not take effect until the cache expires** — Payload’s `revalidateTag` only works inside a request, the same limitation as the seed. Adding redirects through `/admin` (or the API) is instant, which is how editors will do it. Documented in the README.
- No historic URLs were supplied, so the redirect table ships empty. If the old site’s URLs surface later, Search Console’s coverage report after launch is the place to find them.
- Trailing-slash normalisation at the host (as opposed to the app’s `trailingSlash: false`) is still Phase 15’s to confirm.
- `/blog/page/1 -> /blog` was already a 308 from Phase 12; nothing needed doing here.

---

## Phase 15 — Production domain, Search Console and analytics readiness ⚠️ CODE COMPLETE (deployment steps blocked)

### Goal
Point every absolute URL at the real origin and prepare ownership verification and measurement — without leaking secrets or inventing values.

### Exact scope
- **Required inputs (stop if missing):** production origin (`https://…`, www or apex decision), Google Search Console property choice (domain vs URL-prefix) and verification method, analytics choice (GA4 / Plausible / none) and its ID, cookie-consent requirement for the target market. **All supplied: origin `https://junkservicesdubai.com` (apex, no www) as of 2026-09-14; URL-prefix property with the HTML meta tag; Plausible; no consent banner.**
- Set `NEXT_PUBLIC_SITE_URL` in the hosting env; confirm build warning disappears; host-level 301s: http→https, www↔apex to the canonical one, trailing-slash normalisation.
- `verification.google` (and Bing if wanted) via `SiteSettings.googleSiteVerification` → `pageMetadata`/layout.
- Analytics: `components/Analytics.jsx` loaded with `next/script` `afterInteractive`, gated by env var, no-op when unset; consent gating if required. Exclude `/admin`.
- CSP header (now that script origins are known) added to `next.config.mjs` headers with report-only first.
- Submit sitemap in Search Console after deploy (manual step documented in README/Notes).

### Files / architecture likely involved
`.env.example`, hosting env config, `app/(frontend)/layout.jsx`, `components/Analytics.jsx` (new), `next.config.mjs`, `lib/site.js`, `README.md`.

### Dependencies
Phase 14; a deployed environment and the inputs above.

### Must NOT change
Content, routes, schema (beyond verification token).

### Implementation checklist
- [x] Origin set in the codebase (`NEXT_PUBLIC_SITE_URL=https://junkservicesdubai.com`); build clean of the site-URL warning. **Host-level redirects still to configure in Vercel — see the 2026-09-14 note.**
- [x] Verification meta wired from settings.
- [x] Analytics component (no-op without ID); consent not required (Plausible is cookie-free).
- [x] CSP report-only. **Enforcing it stays open until a real report window exists.**
- [ ] Sitemap submitted. **BLOCKED — needs the live origin.** README documents every manual step.

### Verification checklist
- [ ] `curl -I` on http/www/trailing-slash variants → single 301 to canonical. **Still blocked — host-level, needs the domain connected in Vercel.**
- [x] `<link rel="canonical">`, `og:url`, sitemap `<loc>`, JSON-LD `url` all use the production origin. **Re-verified 2026-09-14 with the real origin across all 31 pages.**
- [ ] Search Console shows verified; sitemap "Success". **BLOCKED — needs the domain.** The meta tag itself renders correctly.
- [x] Analytics: script configured on the frontend and absent from `/admin`. **A real hit cannot be recorded without a Plausible account and a live origin.**

### Completion criteria
Production origin everywhere; ownership verified; measurement live (if chosen).

### Deferred / boundary
Conversion tracking on WhatsApp/call clicks — nice-to-have, add only after analytics is confirmed.

Notes (2026-09-12):

**Owner decisions:** no domain yet; **Plausible** for analytics; Search Console via a **URL-prefix property and the HTML meta tag**; **no consent banner** (Plausible sets no cookies).

**This phase is deliberately unfinished.** Its first line is "Required inputs (stop if missing)", and the production origin is one of them. Everything that does not depend on the domain is built and verified; everything that does is written up as a launch checklist in the README rather than guessed at. The phase index says so, so nobody later reads a tick as "this was done".

**Built**
- `components/Analytics.jsx` — Plausible via `next/script` `afterInteractive`, `data-domain` from `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, script origin overridable for a self-hosted instance. Returns `null` when the variable is unset, so nothing loads in development or on previews. Rendered only from the frontend root layout, which is what keeps `/admin` (a separate root layout) untracked — no path matching needed.
- The root layout’s `metadata` became `generateMetadata()` so it can read `googleSiteVerification` from Site settings. The `verification` key is only added when the field has a value; an empty verification meta tag would be worse than none.
- CSP in `next.config.mjs`, sent as **`Content-Security-Policy-Report-Only`**. Allows Plausible in `script-src`/`connect-src` and Vercel Blob in `img-src`/`connect-src`; `object-src 'none'`, `frame-ancestors 'none'`, `base-uri`/`form-action` `'self'`, plus `upgrade-insecure-requests`.
- `.env.example` documents `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` and `NEXT_PUBLIC_PLAUSIBLE_SRC`.

**Two loose directives, recorded rather than hidden:** `style-src` and `script-src` both keep `'unsafe-inline'`. The design system is inline styles (a Phase 1 decision) and Next’s hydration bootstrap is an inline script; tightening either means threading nonces through middleware. Worth revisiting, not worth blocking launch for — which is also why the header is report-only.

**Verification** (a throwaway build with `NEXT_PUBLIC_SITE_URL=https://junkit.example` and `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=junkit.example`, plus a fake token in Site settings; all three were removed afterwards and the shipped build re-made with none of them).
- **The origin propagates everywhere**: canonical on the homepage and a service page, `og:url`, `og:image`, JSON-LD `url` and `@id`, every sitemap `<loc>`, the `robots.txt` sitemap line and the RSS `atom:self` link. A search for `localhost:3000` across the homepage, a service page and the sitemap found **nothing**, and the build’s "NEXT_PUBLIC_SITE_URL is not set" warning disappeared.
- **Verification meta**: `<meta name="google-site-verification" content="…">` rendered with the token set, and is absent again now the field is empty.
- **Analytics**: with the variable set, the Plausible URL appears as a `<link rel="preload">` and the script props (`src`, `data-domain: junkit.example`, `defer`) are in the RSC payload on both the homepage and a service page, and **absent from `/admin`**. With the variable unset — the shipped state — there is no reference to plausible.io anywhere.
- **CSP**: `Content-Security-Policy-Report-Only` is present on every response and no enforcing `Content-Security-Policy` header is sent. `/admin` still returns 200 under it (report-only never blocks).
- Final build in the shipped state: 67 pages, no analytics, no verification tag, report-only CSP.

**Follow-up (2026-09-12): the site can now be deployed without a domain.** `NEXT_PUBLIC_SITE_URL` being unset no longer means "absolute URLs point at localhost" — `lib/site.js` falls back to Vercel’s stable production domain, then to the per-deployment URL, then to localhost. To stop a `…vercel.app` deployment competing with the real site later, a new `indexable` export gates crawling: on Vercel, a deployment is indexable **only** when it is `production` **and** has been told its own origin. Otherwise `robots.txt` returns `Disallow: /` and every page carries `noindex, nofollow`. Local builds are untouched, so nothing about development or the Phase 16 checks changes.

Verified by resolving `lib/site.js` under six environments and by building and serving two of them:

| environment | siteUrl | indexable |
|---|---|---|
| local, nothing set | `http://localhost:3000` | yes |
| Vercel preview | stable production domain | **no** |
| Vercel production, no origin set | stable production domain | **no** |
| Vercel production, origin set | the origin | yes |
| Vercel production, only a deployment URL | that deployment URL | **no** |
| local, origin set (trailing slash) | the origin, slash stripped | yes |

Served builds confirmed it end to end: with no origin, `robots.txt` is `Disallow: /`, every page is `noindex, nofollow`, and canonicals and the sitemap read `https://junkit-demo.vercel.app/…` with no localhost anywhere. With the origin set, `robots.txt` is back to the normal allow-list with the sitemap line, pages are `index, follow`, canonicals are the real origin and no `vercel.app` string appears in the sitemap.

**Domain configured (2026-09-14): `https://junkservicesdubai.com`, apex, no `www`.**

The centralised architecture meant this was an environment change, not a code change. Everything absolute already derives from `siteUrl` in `lib/site.js` via `absoluteUrl()`, `pageMetadata()` and `lib/schema.js`, so the whole site moved by setting one variable.

**Changed**
- `.env`: `NEXT_PUBLIC_SITE_URL=https://junkservicesdubai.com` (gitignored and local; the same value must be set in the Vercel project).
- `.env.example`: records the production value, and the Plausible example now names the real domain instead of a made-up one.
- `README.md`: the deploy section leads with the production origin, and "Before launch" now reads as steps to take rather than things blocked on a domain that did not exist. The `www` → apex redirect is spelled out.
- **No application code changed.** `lib/site.js` keeps `http://localhost:3000` as its development fallback, which is correct and is what the `indexable` guard is built around.

**Audited before changing anything:** the only hardcoded origins in the repo were that one dev fallback and the `http://localhost:3000` defaults in the two check scripts (correct — they point at a locally served build). A read-only sweep of every CMS document and global found exactly one stored absolute URL, `https://wa.me/923367091357`, which is the WhatsApp contact channel and correctly stays external. No `seo.canonical` overrides exist on any service, area or post, so nothing in the database can beat the env-derived origin.

**Verified** on a production build served locally, across all 31 pages:
- **Sitemap**: 30 URLs, every one on `https://junkservicesdubai.com`.
- **robots.txt**: `Sitemap: https://junkservicesdubai.com/sitemap.xml`, with `/admin`, `/api` and `/api/preview` still disallowed.
- **Per-page metadata**: 0 problems — every `<link rel="canonical">` exactly matches its own URL on the new origin, every `og:url` and `og:image` is on it, and `twitter:card` is present on all 31.
- **JSON-LD**: 146 blocks across the 31 pages, no foreign URLs at all. Every `url` and `@id` is on the new origin; the only external URLs are `schema.org` vocabulary and the WhatsApp channel.
- **RSS**: `atom:self` and the channel `<link>` both on the new origin.
- **Stale-origin sweep**: no `localhost`, `vercel.app`, `example.com/.test` or earlier stand-in domain anywhere in the rendered HTML.
- Both check scripts pass: 31 URLs crawled, zero problems; content checks all green.

**Not verified, and why:** blog post pages and `/blog/page/[n]` have no content yet (no author, no posts). They build their URLs through the same `pageMetadata()` + `postHref()` path that is verified on 24 dynamic service and area pages, so no fixture was created in the production database to prove a shared code path.

**Still to do outside the codebase**
1. Point the domain’s DNS at Vercel and add `junkservicesdubai.com` to the project, with the apex as primary.
2. Add `www.junkservicesdubai.com` as a redirect to the apex, and confirm `http` → `https`.
3. Set `NEXT_PUBLIC_SITE_URL=https://junkservicesdubai.com` in the Vercel project, in **both** Build and Runtime environments.
4. Create the Search Console URL-prefix property for `https://junkservicesdubai.com`, paste the token into /admin > Site settings > Verification, verify, then submit the sitemap.
5. Create the Plausible site for `junkservicesdubai.com` and set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
6. `curl -I` the `http`, `www` and trailing-slash variants once DNS resolves, expecting a single 301 to the apex.

**Superseded by the note above — kept for the record** (also written up in the README’s "Before launch"):
1. Register the domain and decide apex vs `www`.
2. Set `NEXT_PUBLIC_SITE_URL` in the hosting environment and redeploy.
3. Host-level 301s: `http` → `https`, non-canonical host → canonical. Confirm the host does not re-add trailing slashes.
4. Create the URL-prefix property in Search Console, paste the token into Site settings, verify.
5. Submit the sitemap and confirm "Success".
6. Create the Plausible site and set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
7. After a clean report window, change the CSP header name from report-only to enforcing.

**Unresolved / carry-overs**
- Conversion tracking on WhatsApp and call clicks is still deferred, by the phase’s own boundary, until analytics is confirmed live.
- The CSP has no `report-uri`/`report-to` endpoint, so violations only appear in the browser console. Adding a collector is worth it if the report window turns out to be noisy.

---

## Phase 16 — Final technical SEO validation and launch checklist ⚠️ LOCAL CHECKS COMPLETE (deployed checks blocked)

### Goal
Prove the site is production-ready with evidence, then launch.

### Exact scope
- Crawl: run a full crawl of the deployed site (Screaming Frog or a scripted crawler over sitemap + internal links): 0 broken internal links, 0 redirect chains, 0 duplicate titles/descriptions, 0 missing canonicals, 0 pages with >1 `<h1>`, all images with alt.
- Indexability: URL Inspection on `/`, one service, one area, `/blog`, one post — "URL is on Google / can be indexed"; `robots.txt` tester.
- Structured data: Rich Results Test + Schema.org validator on the same sample — 0 errors (warnings recorded).
- Core Web Vitals: Lighthouse mobile + PageSpeed Insights lab on the sample; targets LCP < 2.5 s, INP < 200 ms, CLS < 0.1; record scores. Fix regressions only (no new features).
- Social previews: OG debugger (Meta/LinkedIn) and X card validator on `/` + one post.
- Accessibility spot-check: axe on the sample — 0 critical.
- Pre-launch checklist (all must be ticked): real reviews only (`verified`), no `placeholder`/lorem content anywhere (grep production HTML), SiteSettings complete (phone confirmed, address/hours if provided), all OG/icon assets real or approved stand-ins, `noIndex` off on all launch pages, 404 returns 404 status, `NEXT_PUBLIC_SITE_URL` set, secrets not in repo, `.env.example` current, README current, `plan.md` closed out.

### Files / architecture likely involved
No new architecture. Possible small fixes anywhere; `scripts/check-links.mjs` (new, optional) for repeatable crawl checks.

### Dependencies
All prior phases; production deployment.

### Must NOT change
No new features; only fixes for findings.

### Implementation checklist
- [x] Crawl report clean (summary in Notes). Scripted as `npm run check:links`.
- [ ] Indexability confirmed on sample. **BLOCKED — URL Inspection needs a verified Search Console property.**
- [x] Schema: every block parses, census in Notes. **Rich Results Test itself needs a public URL — blocked.**
- [x] CWV targets met on desktop; mobile LCP marginally over in lab. Scores recorded in Notes.
- [ ] Social previews correct. **BLOCKED — the OG debuggers need a public URL.**
- [x] axe: 0 critical (Lighthouse accessibility 100 on all five sample pages).
- [x] Pre-launch checklist: everything that does not need the domain. Scripted as `npm run check:content`.

### Verification checklist
Same as above — this phase *is* verification. Evidence (scores, screenshots or tool output summaries) recorded in Notes.

### Completion criteria
All checks green; site launched; Search Console monitoring in place.

### Deferred / boundary
Post-launch: content calendar, review acquisition, rank tracking, quarterly re-audit — outside this roadmap.

Notes (2026-09-12) — **local half of the phase**:

**Chrome turned out to be installed on this machine**, so the Lighthouse runs deferred since Phase 5 finally happened. Lighthouse 13.4.1 against Chrome 153, headless, over `next start` on localhost. Lighthouse bundles axe-core 4.13, so its accessibility category is the axe check the plan asks for.

**Two repeatable scripts were added** (the plan allowed for one; the second covers the "grep production HTML" step so it can be re-run at launch rather than done by eye):
- `npm run check:links` — crawls from the sitemap plus every internal link: broken links, redirect chains, duplicate titles and descriptions, missing canonicals, pages without exactly one `<h1>`, images without alt, JSON-LD that does not parse, and sitemap parity in both directions.
- `npm run check:content` — placeholder/lorem/TODO copy in rendered HTML, which pages are `noindex`, a JSON-LD type census, status codes for the key routes, `.env` hygiene, hard-coded secrets, and whether `.env.example` covers every environment variable the app reads.
Both exit non-zero on failure.

**Crawl result: 31 URLs, zero problems** in every category. 30 indexable pages, all 30 in the sitemap and every sitemap URL reachable and indexable.

**Content result: all checks passed.** 146 JSON-LD blocks across 31 pages, all parsing: `LocalBusiness`×31, `WebSite`×31, `BreadcrumbList`×30, `FAQPage`×25, `Service`×24, `CollectionPage`×2, `HowTo`×1, `AboutPage`×1, `ContactPage`×1. `/blog` is the only `noindex` page, correctly, until a post exists. 404 really returns 404.

**Lighthouse, after the fixes below** (mobile = Lighthouse’s throttled preset, desktop = `--preset=desktop`):

| page | mobile perf / a11y / bp / seo | desktop perf / a11y / bp / seo | LCP m/d | CLS |
|---|---|---|---|---|
| `/` | 86 / 100 / 100 / 100 | 99 / 100 / 100 / 100 | 2.9s / 0.6s | 0.08 |
| `/services/junk-removal` | 96 / 100 / 100 / 100 | 94 / 100 / 100 / 100 | 2.5s / 0.6s | **0.145** |
| `/areas/jvc` | 99 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | 2.1s / 0.6s | 0.003 |
| `/blog` | 94 / 100 / 100 / **66** | 100 / 100 / 100 / **66** | 2.5s / 0.6s | 0.024 |
| `/contact` | 97 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | 2.3s / 0.6s | 0.002 |

The SEO 66 on `/blog` is the single audit "Page is blocked from indexing" — deliberate while the blog has no posts, and it becomes 100 the moment one is published. Everything else is 100 on accessibility, best practices and SEO.

**Four defects found and fixed**
- **CLS 0.145 on service pages** (over the 0.1 target, reproducible) — diagnosed, and then **deliberately left in place**. Lighthouse attributed it to "Web font loaded". The `Reveal` animation was ruled out first by re-measuring with `--force-prefers-reduced-motion` (still 0.145), so it is the font swap: the display heading runs to 104px and is capped at `12ch`, and `ch` is itself a font-dependent unit, so when Archivo replaces the size-adjusted Arial fallback the hero re-wraps and everything below it moves. `display: 'optional'` was tested and **removes it completely (CLS 0.145 → 0, desktop Performance 100)**, but it lets a cold-cache first view render entirely in Arial. **The owner chose the brand font over the metric**, so `swap` stands and the shift is accepted and recorded. If it needs fixing later without that trade, the route is a hand-tuned fallback `@font-face` whose metrics match Archivo more closely than next/font's generated one — or replacing the `12ch` cap on the hero with a font-independent width.
- **Five WCAG AA contrast failures**, all small text: the closing CTA’s small print on bronze (4.07:1), breadcrumb links on ink (4.47:1), `bronzeDeep` body links on mist (4.47:1), and two footer greys on inkDeep (3.8:1 and 3.18:1). Fixed by darkening `bronzeDeep` to `#855F1E` and raising the four alpha values. **Accessibility went 92 → 100 on every page.**
- **Touch targets under 24px**: the footer link lists were 15px tall with 10px gaps. `.jk-foot-link` now has 5px of vertical padding.
- **Our own Phase 15 CSP logged a console error on every page** — `upgrade-insecure-requests` is ignored in a report-only policy. Removed, with a note to add it back when the header is switched to enforcing. **Best practices went 96 → 100.**

**Mobile LCP is 2.1–2.9s against a < 2.5s target, and CLS on service pages is 0.145 against < 0.1** — the two metrics not met (the second by choice, above). These are lab numbers from a throttled headless Chrome on a loaded development machine, served from `next start` on localhost with no CDN; the deployed site on Vercel will differ. Do not chase it locally: re-measure with PageSpeed Insights after launch and use the **field** data, which is what Search Console reports on. Desktop LCP is 0.6s.

**Still blocked on the production domain** (all of it needs a public URL):
- URL Inspection in Search Console on the sample pages, and the `robots.txt` tester.
- Rich Results Test and the Schema.org validator — every block parses locally and the type census is above, but Google’s own validators cannot reach localhost.
- Social preview debuggers (Meta, LinkedIn, X).
- `curl -I` on the http / www / trailing-slash variants, which is a host-level concern.
- PageSpeed Insights field data.
- The pre-launch items that are Phase 15’s: `NEXT_PUBLIC_SITE_URL` set, sitemap submitted, analytics live.

**Unresolved / carry-overs**
- **No photography and no blog posts**, so "images without alt" passed vacuously (there are no `<img>` elements yet) and no post page was in the crawl. Re-run both scripts once images and the first post exist.
- Site settings still lack address, coordinates, opening hours and social profiles; the business schema omits them rather than inventing them.
- Lighthouse was installed unsaved for this run and is not a dependency; the README records how to run it ad hoc.
