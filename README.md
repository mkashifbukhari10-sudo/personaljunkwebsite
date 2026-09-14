# Junkit Dubai — Next.js + Payload CMS

Junk removal and waste collection site for Junkit (Dubai). App Router, JavaScript, no CSS framework:
design tokens live in `lib/theme.js`, hover/keyframe rules in `app/globals.css`, everything else is
inline styles so each section is self-contained.

## Run

```bash
npm install
cp .env.example .env   # set DATABASE_URI and PAYLOAD_SECRET
npm run seed           # fills an empty database with the launch content
npm run dev
```

All page content lives in Payload, so the site needs a database to build or run. `npm run seed`
creates anything missing and leaves existing documents alone; add `-- --update` to overwrite them
from the seed data.

## Checks

Two scripts assert the things a pre-launch SEO crawl checks. Run the site with `npm run build && npm start`
first, then point them at it:

```bash
npm run check:links   -- http://localhost:3000   # crawl: broken links, redirect chains, duplicate
                                                 # titles/descriptions, canonicals, <h1>, alt, sitemap parity
npm run check:content -- http://localhost:3000   # placeholder copy, noindex, JSON-LD, status codes,
                                                 # .env hygiene, secrets
```

Both exit non-zero on failure, so they work in CI as well as by hand. Lighthouse is not a dependency; run it
ad hoc with `npx lighthouse <url> --preset=desktop` (set `CHROME_PATH` if Chrome is not on the default path).

## Structure

- `app/` — routes: `/`, `/services`, `/services/[slug]` (12 landing pages), `/areas`, `/areas/[slug]` (12 landing pages), `/blog`, `/blog/page/[n]`, `/blog/[slug]`, `/how-it-works`, `/about`, `/contact`
- `lib/content/` — content access layer; every page reads services, areas, posts, FAQs, reviews and site settings through it. Payload is the only source (a missing database is an error, not a fallback)
- `scripts/seed.ts`, `scripts/seed-data/` — one-time bootstrap for an empty database; the site never reads them
- `lib/hrefs.js` — `serviceHref()` / `areaHref()`, the only place URL shapes are defined
- `components/Nav.jsx` — sticky header, hamburger below 1024px
- `components/Footer.jsx` — footer plus the fixed WhatsApp / Call / Book bar
- `components/Reveal.jsx` — one-pass fade-and-rise on scroll (respects prefers-reduced-motion)
- `components/home/` — homepage sections
- `lib/data.js` — code-owned presentation data: homepage service groups, process steps, clutter blocks, disposal stages
- `lib/theme.js` — colours and type tokens

## Deploying to Vercel

**Production origin: `https://junkservicesdubai.com`** (apex, no `www`). Set it as `NEXT_PUBLIC_SITE_URL` in the Vercel
project so both the Build and Runtime environments have it.

**A custom domain is not required to deploy.** With `NEXT_PUBLIC_SITE_URL` unset, absolute URLs fall back to the
deployment’s own `…vercel.app` domain, so canonicals, the sitemap, Open Graph and JSON-LD are all coherent
rather than pointing at `localhost`. In that state the deployment is **noindex**: `robots.txt` disallows
everything and every page carries a `noindex, nofollow` tag, so a staging URL can never compete with the real
site for the same content. Preview deployments are always noindex, whatever is set.

Setting `NEXT_PUBLIC_SITE_URL` on a **production** deployment is the single switch that turns indexing on.

What Vercel needs:

- `DATABASE_URI` and `PAYLOAD_SECRET` in the **Build** environment as well as Runtime — static generation reads
  Payload at build time, so a runtime-only config fails the build (loudly, with a message naming the variable).
- A **pooled** Postgres connection string (Neon’s `-pooler` host, or Vercel Postgres), because every serverless
  invocation opens its own connection.
- `BLOB_READ_WRITE_TOKEN` before anyone uploads an image. Without it uploads land on the serverless filesystem,
  which does not survive the request — see "Images".
- `npm run seed` against the production database once, to create the launch content.

## Before launch

**Deployment and domain** — the domain is registered; these are the steps that connect it:

- Set `NEXT_PUBLIC_SITE_URL` to `https://junkservicesdubai.com` in the hosting environment and redeploy. This also
  flips the site from noindex to indexable, and every canonical URL, `og:url`, sitemap `<loc>`, JSON-LD `url` and
  the RSS self link follows it automatically.
- Point DNS at Vercel and add the domain to the project.
- Configure host-level 301s in Vercel: `http` → `https`, and `www.junkservicesdubai.com` → `junkservicesdubai.com`
  (add both to the project and mark the apex as primary). The app sets `trailingSlash: false`; confirm the host
  does not add one back.
- Verify ownership in Google Search Console with a **URL-prefix property and the HTML meta tag**: paste the token
  into `/admin` → Site settings → Verification, and it renders in the `<head>` on the next request. The property
  must match the canonical origin exactly.
- Submit `https://junkservicesdubai.com/sitemap.xml` in Search Console and check it reports "Success".
- Turn on analytics by setting `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to the domain as registered in Plausible. Until it is
  set no analytics script loads at all. `/admin` is never tracked (it has its own root layout).
- Watch the browser console for **Content-Security-Policy-Report-Only** violations for a week or so, then flip the
  header name in `next.config.mjs` from `Content-Security-Policy-Report-Only` to `Content-Security-Policy`.

**Content and assets:**

1. Add real customer reviews in `/admin` (Reviews) and tick `verified`; nothing shows until then.
2. Upload real photography in `/admin` (Media) and attach it to services, areas and the Site settings image slots (see "Images" below); striped placeholders show until then.
3. Fill in Site settings in `/admin`: street address, coordinates, opening hours and social profiles are empty
   until someone supplies them, and are left out of the business schema until they are. Confirm the phone and
   WhatsApp number there too (`lib/site.js` holds the fallbacks).
4. Create an Author in `/admin` and publish the first post; `/blog` is `noindex` and shows a holding message
   until then.
5. Set `PREVIEW_SECRET` so the admin’s Preview button works (`openssl rand -hex 32`).

## SEO

- `lib/site.js` — site identity, contact details and `navLinks`; the fallback behind the Site settings and Navigation globals, and still the source of `siteUrl`
- Fonts use `display: 'swap'`, so the brand font is always what readers end up seeing. The cost is a layout shift
  when it replaces the fallback: **CLS 0.145 on service pages, 0.08 on the homepage** (desktop; mobile is under
  0.03). `display: 'optional'` removes it entirely but lets a cold-cache first view render in Arial — the owner
  chose the font. See the comment in `app/(frontend)/layout.jsx`, which also notes the route to fixing CLS without
  giving up the font.
- `components/Analytics.jsx` — Plausible, loaded `afterInteractive` and only from the frontend layout. A no-op
  unless `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set. Cookie-free, so the site needs no consent banner.
- `next.config.mjs` sends a **report-only** CSP. It allows `'unsafe-inline'` for styles (the design system is
  inline styles) and for scripts (Next’s hydration bootstrap); tightening either needs nonces through middleware.
- `lib/seo.js` — `pageMetadata()` helper every route uses for title, description, canonical and Open Graph. Pass `seo` (a document’s CMS SEO group) to override title, description, canonical, `noIndex` and the social card
- `lib/schema.js` — site-wide `LocalBusiness` + `WebSite` JSON-LD (async; business facts come from the Site settings global), rendered in `app/(frontend)/layout.jsx`
- `app/robots.js`, `app/sitemap.js`, `app/manifest.js` (root-only conventions), `app/(frontend)/not-found.jsx`
- The sitemap is built from Payload: static routes + services + areas + the blog index, its pagination and its
  posts, with each `lastmod` taken from the document’s real `updatedAt`. Anything marked `noIndex`, any draft,
  and `/blog` while it has no posts are all left out, so the sitemap only ever lists pages we're asking Google to
  index. It re-renders hourly (`revalidate`), which is what keeps it current between deploys.
- `/feed.xml` is an RSS 2.0 feed of published posts (excerpts, not full bodies), linked from every page’s `<head>`.
- `app/(frontend)/icon.jsx`, `apple-icon.jsx` (favicons) and `app/og/[key]/route.js`, `app/brand/[key]/route.js`
  (social images, manifest icons) — generated from the brand mark until real artwork exists

## Adding or editing an area

Do it in `/admin` (Areas). The same fields as a service apply (`seo`, `h1`, `intro`, `body`, `faqs`,
`popularServices`, `nearbyAreas`, `cta`) plus the `map`/`home` marker positions. Publishing creates the page,
the sitemap entry, the OG image, the footer link and the schema. Approved source copy is in
`area-pages-content.md`.

## Adding or editing a service

Do it in `/admin` (Services). Each service carries its landing-page content (`seo`, `h1`, `intro`, `body`,
`faqs`, `relatedServices`, `popularAreas`, `cta`). Paragraphs may contain `[label](/path)` links. The page,
sitemap entry, OG image, footer link and schema are all generated from that one document. The homepage
explorer group is the `group` select; the seven groups themselves are presentation data in `lib/data.js`.
Approved source copy and the facts it may use are documented in `service-pages-content.md`.

## Blog

`/blog`, `/blog/page/[n]` and `/blog/[slug]` are live. Nothing is published yet, so the index shows its
holding message and is `noIndex` until the first post exists.

- Write posts in `/admin` (Posts). An **Author** record has to exist first — none are seeded, because real people
  are not invented. A post needs a title, excerpt, body, author and, to publish, a cover image.
- The body editor offers **h2-h4 only**: the page’s single `<h1>` is the post title. Payload does not enforce that
  server-side, so `lib/content/richtext.jsx` also clamps any `h1` (or `h5`/`h6`) to `h2` when rendering.
- `excerpt` is the meta description unless the SEO tab overrides it; `readingTime` is recomputed from the body on
  every save; `publishedAt` is stamped on first publish and then left alone.
- **No categories or tags.** A taxonomy only earns its archive pages once there is an editorial plan with at least
  three categories of three posts each; until then thin archives would cost more than they return. Adding a
  `Categories` collection later is additive.
- Drafts are invisible to the public API (`read` access is filtered to `_status: published`). Draft Mode preview
  comes with the post page in Phase 13.
- Read posts through `lib/content/posts.js` (`getPosts({ page, perPage })`, `getPostBySlug`, `getPostSlugs`,
  `getRelatedPosts`) and render the body with `lib/content/richtext.jsx` — never by hand.
- The index heading, standfirst, holding message and metadata are the **Blog index** global in `/admin`.
  `POSTS_PER_PAGE` in `lib/content/posts.js` sets the page size (9); page 1 is `/blog` and `/blog/page/1`
  permanently redirects there, so the same list never sits at two URLs.
- **Every post must link to at least one service or area page.** Set `relatedServices` / `relatedAreas` on the
  post (they render as the "What this is about" block) and link to them in the body where it reads naturally.
  If an editor sets neither, the page falls back to the first three services rather than dead-ending the reader.
- **Previewing a draft**: set `PREVIEW_SECRET` in the environment and use the Preview button in the admin. It
  opens `/api/preview`, which turns on Next Draft Mode and renders the working copy at the real URL with a
  banner and `noindex`. Without the cookie that URL 404s. `/api/preview?exit=1` turns it off again.
- Deleting an author that still has posts is refused — reassign the posts first. (Deleting an image a post uses
  is allowed; the post keeps its slug and falls back to the generated social card.)

## Redirects

Manage them in `/admin` (Redirects): `from` is a path like `/old-page`, `to` is a path or a full URL.

- **Changing a published slug writes its own redirect.** Rename a service, area or post and the old URL keeps
  working automatically. Renaming again re-points the first redirect rather than chaining them, and renaming
  back removes the entry instead of leaving a loop.
- They are applied at request time, so a redirect added in the admin works on the next request with no rebuild.
  Only paths with no page behind them reach the lookup, so a redirect can never shadow a live page.
- "Permanent" is sent as a **308** and "temporary" as a **307** — what the App Router emits, and the
  method-preserving equivalents of 301 and 302. Search engines treat 308 exactly as they treat 301.
- A redirect created by a **script** (rather than through the admin or the API) will not take effect until the
  cache expires, because Payload's revalidation hooks only work inside a request. Add them through `/admin`.

## Images

Every photo is uploaded in `/admin` (Media) and stored in Vercel Blob; nothing is served from `public/images`.

- `components/Media.jsx` is the only image component. It takes a descriptor `{ src, alt, width, height, caption? }` and
  renders `next/image` (AVIF/WebP, responsive `srcset`/`sizes`, lazy by default, `priority` for above-the-fold). When the
  descriptor is `null` it renders the striped `Placeholder`, so pages never break before assets exist.
- Slots: a service or area takes its photo from the `image` upload on its own document; the homepage and About page
  slots are Site settings > Images; a homepage service group inherits the photo of the first service in it. Payload
  media is mapped to the descriptor shape by `lib/content/media.js` (`toImageProps`), and `toOgImageProps` picks the
  1200x630 crop for social cards.
- On upload Payload caps the original at 2400px, strips EXIF/GPS, slugifies the filename and generates
  `thumbnail` (400), `card` (800), `hero` (1600) and `og` (1200x630, cropped to the focal point). The responsive
  `srcset` comes from `next/image` resizing the original, not from those sizes.
- Uploads over ~4.5 MB fail on Vercel, whose serverless request body is capped. Resize before uploading, or set
  `clientUploads: true` on the storage plugin — which sends the file straight to Blob and therefore skips the
  server-side resize, EXIF stripping and generated sizes.
- Social images are generated at stable URLs by `app/og/[key]/route.js` (`/og/default`, `/og/service-{slug}`,
  `/og/area-{slug}`); the document’s SEO > `ogImage`, or failing that its page photo, is composited under the brand
  text automatically. Setting SEO > `ogImage` also replaces the `og:image` URL outright with that 1200x630 crop. Manifest
  icons come from `app/brand/[key]/route.js`. To use real artwork: put PNGs in `public/`, point `defaultOgImage.url`
  (`lib/seo.js`) and `app/manifest.js` at them, add `app/(frontend)/icon.png` + `apple-icon.png`, and delete the generators.
- Alt text: `alt` is a required field on every upload, so an image cannot exist without it. Describe what is in the
  photo for someone who cannot see it ("Two crew carrying a grey sofa into a covered truck"). No keyword lists.
  Supply at least 1600px on the long edge.
- The hero stays text-only (its LCP element is the display text); if a hero photo is ever added it must use `priority`.

## Payload CMS

- Admin UI at `/admin`, REST API at `/api/*` (both disallowed in `robots.txt`). Config: `payload.config.ts`;
  collections in `src/payload/collections/`, globals in `src/payload/globals/`, reusable fields in
  `src/payload/fields/` (`seo`, `slug`, shared page content), revalidation hooks in `src/payload/hooks/`;
  generated types in `payload-types.ts`.
- Collections: Services, Areas, Posts, Authors, FAQs, Reviews, Redirects, Media, Users. Globals: Site settings, Navigation, Blog index.
  Services, Areas and Posts use drafts, so only published documents reach the site, and a slug is locked once its
  page is published because the URL is live and indexed.
- Reviews render only when `verified` is ticked. Site settings’ address, coordinates, opening hours and social
  profiles are omitted from structured data until they are filled in; everything else falls back to `lib/site.js`.
- Editing in the admin revalidates the affected pages: `afterChange`/`afterDelete` hooks call `revalidateTag`
  on the cache tags `lib/content/*` reads with, plus `revalidatePath` for the routes involved. The `[slug]`
  routes therefore keep `dynamicParams = true`; with `false`, a revalidated path 404s instead of regenerating.
- Routes are split into two root layouts: `app/(frontend)/` (the public site) and `app/(payload)/` (admin + API).
  Public URLs are unchanged. `robots.js`, `sitemap.js` and `manifest.js` must stay at `app/` root (root-only conventions).
- Env: `PAYLOAD_SECRET`, `DATABASE_URI` (Postgres) and, for blog previews, `PREVIEW_SECRET` — see `.env.example`.
  Payload creates its tables on first run.
  The first visit to `/admin` creates the first admin user.
- Uploads: Vercel Blob via `@payloadcms/storage-vercel-blob`, keyed on `BLOB_READ_WRITE_TOKEN`. Without the token the
  adapter disables itself and files go to a local `media/` directory — fine for development, wrong for a serverless
  deploy, whose filesystem does not survive the request. The Blob host is allow-listed in `next.config.mjs`.
- After changing the Payload config: `npm run generate:importmap && npm run generate:types`.
- `npm run seed` bootstraps an empty database from `scripts/seed-data/` (create-or-skip; `-- --update` overwrites).
  It seeds no reviews on purpose and leaves the unknown business facts empty, listing them at the end of the run.
- **Next is pinned to 15.4.11** (no caret): Payload 3.8x supports Next `>=15.4.11 <15.5.0` or `>=16.2.6`; 15.5.x is excluded.
- Hosting decision: Vercel + Postgres (e.g. Neon / Vercel Postgres). Uploads therefore need external storage — set up in plan.md Phase 10.
