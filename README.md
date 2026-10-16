# Junk Services Dubai — Next.js

Junk removal and waste collection site for Junk Services Dubai (junkservicesdubai.com; branded "Junkit" until 2026-09-15). App Router, JavaScript, no CSS framework:
design tokens live in `lib/theme.js`, hover/keyframe rules in `app/globals.css`, everything else is
inline styles so each section is self-contained.

There is no CMS and no database. All content lives in the repository (`content/` and
`docs/content-system/articles/`); a change goes live when it is committed and deployed. The site used Payload CMS
on Postgres until 2026-10-16. That setup is in the Git history before the commit that removed it.

## Run

```bash
npm install
cp .env.example .env   # only needed for the contact form (Resend) and analytics
npm run dev
```

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

- `app/` — routes: `/`, `/services`, `/services/[slug]` (12 landing pages), `/areas`, `/areas/[slug]` (30 landing pages), `/blog`, `/blog/page/[n]`, `/blog/[slug]`, `/how-it-works`, `/about`, `/contact`, and `/api/quote` (the contact form)
- `content/` — the site's content:
  - `services.js`, `areas.js` + `areas-expansion.js` — landing-page copy for every service and area
  - `faqs.js` — the site-wide FAQ list; `blog.js` — the blog index copy
  - `images.js` — site photography (Vercel Blob URLs, alt text, attribution) and which service, area and homepage slot uses each photo
  - `page-dates.js` — last-modified time of each service and area page (feeds the sitemap)
  - `file-posts.js` — every blog post's metadata, plus the images posts use
- `docs/content-system/articles/` — every blog post body, one Markdown file per slug
- `lib/content/` — content access layer; every page reads services, areas, posts, FAQs, reviews and site settings through it
- `lib/site.js` — site identity, contact details and `navLinks`
- `lib/hrefs.js` — `serviceHref()` / `areaHref()`, the only place URL shapes are defined
- `components/Nav.jsx` — sticky header, hamburger below 1024px
- `components/Footer.jsx` — footer plus the fixed WhatsApp / Call / Book bar
- `components/Reveal.jsx` — one-pass fade-and-rise on scroll (respects prefers-reduced-motion)
- `components/home/` — homepage sections
- `lib/data.js` — code-owned presentation data: homepage service groups, process steps, clutter blocks, disposal stages
- `lib/theme.js` — colours and type tokens

## Deploying to Vercel

**Production origin: `https://www.junkservicesdubai.com`.** Set it as `NEXT_PUBLIC_SITE_URL` in the Vercel project.

**A custom domain is not required to deploy.** With `NEXT_PUBLIC_SITE_URL` unset, absolute URLs fall back to the
deployment’s own `…vercel.app` domain, so canonicals, the sitemap, Open Graph and JSON-LD are all coherent
rather than pointing at `localhost`. In that state the deployment is **noindex**: `robots.txt` disallows
everything and every page carries a `noindex, nofollow` tag, so a staging URL can never compete with the real
site for the same content. Preview deployments are always noindex, whatever is set.

Setting `NEXT_PUBLIC_SITE_URL` on a **production** deployment is the single switch that turns indexing on.

Environment variables (see `.env.example`):

- `NEXT_PUBLIC_SITE_URL` — the canonical origin.
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` — contact form delivery. Without them the form shows an
  error and asks the customer to use WhatsApp or the phone instead. The sender must be on a domain verified in Resend.
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional) — analytics.

The build needs no database or secrets: every page is generated from the repository.

## Before launch

- Point DNS at Vercel and add the domain to the project, with host-level 301s: `http` → `https` and the
  non-primary host → the primary one. The app sets `trailingSlash: false`; confirm the host does not add one back.
- Verify ownership in Google Search Console. For the HTML meta-tag method, put the token in `business` in
  `lib/content/settings.js` (`googleSiteVerification`). Submit `/sitemap.xml` and check it reports "Success".
- Turn on analytics by setting `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to the domain as registered in Plausible. Until it is
  set no analytics script loads at all.
- Watch the browser console for **Content-Security-Policy-Report-Only** violations for a week or so, then flip the
  header name in `next.config.mjs` from `Content-Security-Policy-Report-Only` to `Content-Security-Policy`.
- Business facts nobody has supplied yet — street address, coordinates, opening hours, social profiles — are empty in
  `business` in `lib/content/settings.js` and are left out of the business schema until real values are added.
- Reviews: add genuine, verified reviews to `lib/content/reviews.js`; the homepage section stays hidden until then.

## SEO

- Fonts use `display: 'swap'`, so the brand font is always what readers end up seeing. The cost is a layout shift
  when it replaces the fallback: **CLS 0.145 on service pages, 0.08 on the homepage** (desktop; mobile is under
  0.03). `display: 'optional'` removes it entirely but lets a cold-cache first view render in Arial — the owner
  chose the font. See the comment in `app/(frontend)/layout.jsx`, which also notes the route to fixing CLS without
  giving up the font.
- `components/Analytics.jsx` — Plausible, loaded `afterInteractive`. A no-op unless `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
  is set. Cookie-free, so the site needs no consent banner.
- `next.config.mjs` sends a **report-only** CSP. It allows `'unsafe-inline'` for styles (the design system is
  inline styles) and for scripts (Next’s hydration bootstrap); tightening either needs nonces through middleware.
- `lib/seo.js` — `pageMetadata()` helper every route uses for title, description, canonical and Open Graph. Pass
  `seo` (a page's SEO group) to override title, description, canonical, `noIndex` and the social card.
- `lib/schema.js` — site-wide `LocalBusiness` + `WebSite` JSON-LD, rendered in `app/(frontend)/layout.jsx`.
- `app/robots.js`, `app/sitemap.js`, `app/manifest.js` (root-only conventions), `app/(frontend)/not-found.jsx`.
- The sitemap lists static routes, services, areas, the blog index, its pagination and its posts. Each service and
  area `lastmod` comes from `content/page-dates.js`, and each post's from its `updatedAt`/`publishedAt`.
- `/feed.xml` is an RSS 2.0 feed of published posts (excerpts, not full bodies), linked from every page’s `<head>`.
- Brand artwork lives in `public/brand/` and `app/(frontend)/icon.png` + `apple-icon.png`, all derived from
  `public/images/Logo.png` by `node scripts/brand-assets.mjs` (`lib/brand.js` lists the files). Re-run it after
  replacing the logo.

## Adding or editing a service or area

Edit the entry in `content/services.js` or `content/areas.js` / `content/areas-expansion.js`. Each one holds the
`seo`, `h1`, `intro`, `body`, `faqs`, related services/areas and `cta`; areas also carry the `map`/`home`
marker positions. Paragraphs may contain `[label](/path)` links. Photos are assigned in `content/images.js`.
Update the page's time in `content/page-dates.js` when its copy changes. The page, sitemap entry, OG image, footer
link and schema are all generated from the entry. The homepage explorer groups are presentation data in
`lib/data.js`. Approved source copy is in `service-pages-content.md` and `area-pages-content.md`.

## Blog

Posts are published from the repository; see *Repository publishing* in
`docs/content-system/article-presentation.md`. In short:

- Write the body in `docs/content-system/articles/{slug}.md`. Use H2/H3 only, because the post title is the page's
  `<h1>`; inline links as `[label](/path)`; and images as `![alt](media:key)`.
- Add an entry to `filePosts` in `content/file-posts.js`: title, excerpt, `publishedAt`, cover image key,
  services, and SEO fields. Images are keys into `fileImages` in the same file; reuse existing images only.
- Commit and deploy; the post appears on `/blog`, in related posts, the sitemap and the feed.
- Reading time is computed from the body (200 words a minute). `POSTS_PER_PAGE` in `lib/content/posts.js` sets the
  page size (9). Page 1 is `/blog`, and `/blog/page/1` permanently redirects there.
- Every post links to at least one service page (its `services`, rendered as the "What this is about" block).

## Redirects

Add them to `REDIRECTS` in `lib/content/redirects.js` as `{ from: '/old-page', to: '/new-page', permanent: true }`.
They apply only to paths with no page behind them, so a redirect can never shadow a live page. "Permanent" is sent
as a **308** and "temporary" as a **307** — the method-preserving equivalents of 301 and 302.

## Images

Photos are served from Vercel Blob and referenced by URL. The site photography is in `content/images.js`; blog
images are in `fileImages` in `content/file-posts.js`.

- `components/Media.jsx` is the only image component. It takes a descriptor `{ src, alt, width, height, caption? }` and
  renders `next/image` (AVIF/WebP, responsive `srcset`/`sizes`, lazy by default, `priority` for above-the-fold).
- Social images are generated at stable URLs by `app/og/[key]/route.js` (`/og/default`, `/og/service-{slug}`,
  `/og/area-{slug}`, `/og/post-{slug}`); posts use their 1200x630 cover crop where one exists.
- Alt text describes what is in the photo for someone who cannot see it. No keyword lists.
- Area photos are Creative Commons photography; the attribution is the `caption` and is shown on the image (credits
  in `public/images/areas/CREDITS.md`).
- The hero stays text-only (its LCP element is the display text); if a hero photo is ever added it must use `priority`.
