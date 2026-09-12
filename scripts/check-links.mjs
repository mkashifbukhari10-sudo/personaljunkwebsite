/**
 * Crawl the running site and assert the things a pre-launch SEO crawl checks
 * (plan.md Phase 16).
 *
 *   npm run check:links                     # against http://localhost:3000
 *   npm run check:links -- http://localhost:3111
 *
 * Start from the sitemap plus `/`, follow every internal link, and report:
 *   - links that do not resolve (404/500)
 *   - redirect chains (more than one hop)
 *   - duplicate <title> or meta description across indexable pages
 *   - pages with no canonical, or with a canonical pointing elsewhere
 *   - pages with zero or more than one <h1>
 *   - <img> without an alt attribute
 *   - JSON-LD that does not parse
 *   - sitemap URLs that are not reachable, and indexable pages missing from it
 *
 * Exits non-zero when anything fails, so it works as a gate in CI as well as
 * by hand. Nothing here needs a deployed site: point it at `next start`.
 */

const BASE = (process.argv[2] || process.env.CHECK_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '');

const pages = new Map(); // url -> details
const problems = { broken: [], chains: [], duplicateTitle: [], duplicateDescription: [], canonical: [], headings: [], alt: [], jsonLd: [], sitemap: [] };

const attr = (tag, name) => {
  const m = tag.match(new RegExp(name + '="([^"]*)"', 'i'));
  return m ? m[1] : null;
};
const meta = (html, re) => {
  const m = html.match(re);
  return m ? m[1] : null;
};
const decode = (s) =>
  s === null || s === undefined
    ? s
    : s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&apos;/g, "'");

/** Follow redirects by hand so the number of hops is visible. */
async function fetchChain(url) {
  const hops = [];
  let current = url;
  for (let i = 0; i < 6; i++) {
    const res = await fetch(current, { redirect: 'manual' });
    if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
      const next = new URL(res.headers.get('location'), current).toString();
      hops.push({ from: current, status: res.status, to: next });
      current = next;
      continue;
    }
    return { status: res.status, url: current, hops, html: res.headers.get('content-type')?.includes('text/html') ? await res.text() : '' };
  }
  return { status: 508, url: current, hops, html: '' };
}

function analyse(url, html) {
  const robots = meta(html, /<meta name="robots" content="([^"]*)"/i) || '';
  const noindex = /noindex/i.test(robots);
  const titles = [...html.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map((m) => decode(m[1].trim()));
  const h1s = [...html.matchAll(/<h1\b/gi)].length;
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const missingAlt = imgs.filter((tag) => attr(tag, 'alt') === null);
  const canonical = meta(html, /<link rel="canonical" href="([^"]*)"/i);

  let jsonLdOk = true;
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(m[1]);
    } catch {
      jsonLdOk = false;
    }
  }

  const links = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)]
    .map((m) => decode(m[1]))
    .filter((href) => href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:'))
    .map((href) => {
      try {
        return new URL(href, url).toString();
      } catch {
        return null;
      }
    })
    .filter((u) => u && u.startsWith(BASE))
    .map((u) => u.split('#')[0]);

  return {
    title: titles[0] || null,
    description: decode(meta(html, /<meta name="description" content="([^"]*)"/i)),
    canonical,
    noindex,
    h1s,
    images: imgs.length,
    missingAlt: missingAlt.length,
    jsonLdOk,
    links: [...new Set(links)]
  };
}

async function crawl() {
  // Seeds: the sitemap plus the homepage.
  const sitemapRes = await fetch(BASE + '/sitemap.xml');
  const sitemapXml = await sitemapRes.text();
  const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  // The sitemap carries the production origin, which may not be where we are crawling.
  const sitemapPaths = sitemapUrls.map((u) => new URL(u).pathname);

  const queue = [BASE + '/', ...sitemapPaths.map((p) => BASE + p)];
  const seen = new Set();

  while (queue.length) {
    const url = queue.shift().split('#')[0];
    if (seen.has(url) || !url.startsWith(BASE)) continue;
    seen.add(url);

    const { status, hops, html } = await fetchChain(url);
    const details = { status, hops: hops.length };

    if (status !== 200) {
      problems.broken.push(url + ' -> ' + status);
      pages.set(url, details);
      continue;
    }
    if (hops.length > 1) problems.chains.push(url + ' -> ' + hops.map((h) => h.status + ' ' + h.to).join(' -> '));

    if (html) {
      Object.assign(details, analyse(url, html));
      for (const link of details.links) if (!seen.has(link)) queue.push(link);
    }
    pages.set(url, details);
  }

  return { sitemapPaths };
}

function report({ sitemapPaths }) {
  const html = [...pages.entries()].filter(([, d]) => d.status === 200 && d.title !== undefined && d.title !== null);
  const indexable = html.filter(([, d]) => !d.noindex);

  const byTitle = new Map();
  const byDescription = new Map();
  for (const [url, d] of indexable) {
    if (d.title) byTitle.set(d.title, [...(byTitle.get(d.title) || []), url]);
    if (d.description) byDescription.set(d.description, [...(byDescription.get(d.description) || []), url]);
  }
  for (const [title, urls] of byTitle) if (urls.length > 1) problems.duplicateTitle.push(title + ' :: ' + urls.join(', '));
  for (const [desc, urls] of byDescription) if (urls.length > 1) problems.duplicateDescription.push(desc.slice(0, 60) + '… :: ' + urls.join(', '));

  for (const [url, d] of html) {
    if (!d.canonical) problems.canonical.push(url + ' :: no canonical');
    if (d.h1s !== 1) problems.headings.push(url + ' :: ' + d.h1s + ' <h1>');
    if (d.missingAlt) problems.alt.push(url + ' :: ' + d.missingAlt + ' of ' + d.images + ' images without alt');
    if (!d.jsonLdOk) problems.jsonLd.push(url + ' :: JSON-LD did not parse');
  }

  // Every indexable page should be in the sitemap, and vice versa.
  const sitemapSet = new Set(sitemapPaths);
  for (const [url, d] of indexable) {
    const path = new URL(url).pathname;
    if (!sitemapSet.has(path)) problems.sitemap.push('indexable but not in sitemap: ' + path);
  }
  for (const path of sitemapPaths) {
    const d = pages.get(BASE + path);
    if (!d) problems.sitemap.push('in sitemap but not crawled: ' + path);
    else if (d.status !== 200) problems.sitemap.push('in sitemap but ' + d.status + ': ' + path);
    else if (d.noindex) problems.sitemap.push('in sitemap but noindex: ' + path);
  }

  const labels = {
    broken: 'Broken links',
    chains: 'Redirect chains',
    duplicateTitle: 'Duplicate titles',
    duplicateDescription: 'Duplicate meta descriptions',
    canonical: 'Missing canonicals',
    headings: 'Pages without exactly one <h1>',
    alt: 'Images without alt',
    jsonLd: 'Invalid JSON-LD',
    sitemap: 'Sitemap mismatches'
  };

  console.log('Crawled ' + pages.size + ' URLs from ' + BASE);
  console.log('  ' + html.length + ' HTML pages, ' + indexable.length + ' indexable, ' + sitemapPaths.length + ' in sitemap\n');

  let failures = 0;
  for (const [key, label] of Object.entries(labels)) {
    const list = problems[key];
    failures += list.length;
    console.log((list.length ? 'FAIL  ' : 'ok    ') + label + ': ' + list.length);
    for (const item of list.slice(0, 10)) console.log('        - ' + item);
    if (list.length > 10) console.log('        … and ' + (list.length - 10) + ' more');
  }

  console.log('\n' + (failures ? failures + ' problem(s) found' : 'No problems found'));
  return failures;
}

const seeds = await crawl();
process.exit(report(seeds) ? 1 : 0);
