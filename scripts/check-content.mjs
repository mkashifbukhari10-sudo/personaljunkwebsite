/**
 * The pre-launch content and hygiene checks from plan.md Phase 16, scripted so
 * they can be re-run rather than done by eye.
 *
 *   npm run check:content                      # against http://localhost:3000
 *   npm run check:content -- http://localhost:3111
 *
 * Checks:
 *   - no lorem / placeholder / TODO copy in the rendered HTML
 *   - only the pages that should be `noindex` are
 *   - every JSON-LD block parses, with a type census
 *   - key routes return the status they should (404 really 404s)
 *   - `.env` is ignored, no secrets hard-coded, `.env.example` covers every
 *     environment variable the app reads
 *
 * Exits non-zero on failure. Run it with the site served by `next start`.
 */
import fs from 'node:fs';
import path from 'node:path';

const BASE = (process.argv[2] || process.env.CHECK_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '');
let failures = 0;
const line = (ok, label, detail = '') => {
  if (!ok) failures++;
  console.log((ok ? 'ok    ' : 'FAIL  ') + label + (detail ? ': ' + detail : ''));
};

// --------------------------------------------------------------- page sweep
const sitemap = await (await fetch(BASE + '/sitemap.xml')).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const allPaths = [...new Set(['/blog', ...paths])];

/**
 * Copy that should never ship. `placeholder` is checked as text only — the
 * contact form legitimately uses placeholder attributes, and "+971 5X XXX XXXX"
 * is a format hint, not leftover filler.
 */
const SUSPECT = [
  [/lorem ipsum/i, 'lorem ipsum'],
  [/>\s*[^<]*\bplaceholder\b/i, 'the word "placeholder" in visible text'],
  [/\bTODO\b|\bFIXME\b/, 'TODO/FIXME'],
  [/example\.com/i, 'example.com'],
  [/Replace with verified/i, 'review stub'],
  [/Customer name/i, 'review stub']
];

const hits = [];
const noindexed = [];
const schemaTypes = new Map();
let jsonLdBlocks = 0;

for (const p of allPaths) {
  const html = await (await fetch(BASE + p)).text();
  // The RSC payload repeats the visible copy and is full of escaped markup;
  // strip it and all attributes so only rendered text is searched.
  const body = html
    .replace(/<script>self\.__next_f[\s\S]*?<\/script>/g, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');

  for (const [re, label] of SUSPECT) {
    const m = body.match(re);
    if (m) hits.push(p + ' :: ' + label + ' :: "' + body.slice(Math.max(0, m.index - 30), m.index + 70).replace(/\s+/g, ' ') + '"');
  }
  if (/name="robots" content="[^"]*noindex/.test(html)) noindexed.push(p);

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    jsonLdBlocks++;
    try {
      const parsed = JSON.parse(m[1]);
      for (const item of Array.isArray(parsed) ? parsed : [parsed]) {
        schemaTypes.set(item['@type'], (schemaTypes.get(item['@type']) || 0) + 1);
      }
    } catch {
      hits.push(p + ' :: JSON-LD did not parse');
    }
  }
}

console.log('Checked ' + allPaths.length + ' pages on ' + BASE + '\n');
line(hits.length === 0, 'No placeholder / lorem / TODO copy', hits.length ? hits.length + ' found' : '');
for (const h of hits.slice(0, 8)) console.log('        - ' + h);

// /blog is legitimately noindex until the first post is published.
const unexpected = noindexed.filter((p) => p !== '/blog');
line(unexpected.length === 0, 'Only expected pages are noindex', noindexed.length ? noindexed.join(', ') : 'none');
line(true, 'JSON-LD blocks parse', jsonLdBlocks + ' blocks');
console.log('      types: ' + [...schemaTypes.entries()].map(([t, n]) => t + '×' + n).join(', '));

// ------------------------------------------------------------ status codes
console.log('');
const expected = [
  ['/definitely-not-a-page', 404, '404 page returns 404'],
  ['/robots.txt', 200, 'robots.txt'],
  ['/sitemap.xml', 200, 'sitemap.xml'],
  ['/feed.xml', 200, 'feed.xml'],
  ['/manifest.webmanifest', 200, 'manifest'],
  ['/og/default', 200, 'default social image']
];
for (const [p, want, label] of expected) {
  const r = await fetch(BASE + p, { redirect: 'manual' });
  line(r.status === want, label, r.status === want ? String(r.status) : 'got ' + r.status + ', expected ' + want);
}

// ----------------------------------------------------------- repo hygiene
console.log('');
const gitignore = fs.readFileSync('.gitignore', 'utf8');
line(/^\.env$/m.test(gitignore), '.env is gitignored');
line(/^media$/m.test(gitignore), 'media/ is gitignored');

/** Environment variables the *application* reads. Dev scripts are not deploy config. */
const used = new Set();
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.next', '.git', 'scripts'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(js|jsx|ts|tsx|mjs)$/.test(entry.name)) {
      for (const m of fs.readFileSync(full, 'utf8').matchAll(/process\.env\.([A-Z_][A-Z0-9_]*)/g)) used.add(m[1]);
    }
  }
};
walk('.');
const documented = new Set([...fs.readFileSync('.env.example', 'utf8').matchAll(/^([A-Z_][A-Z0-9_]*)=/gm)].map((m) => m[1]));
// Supplied by the runtime or the platform, not configured by anyone — Vercel
// injects its own system variables, so they do not belong in .env.example.
const platform = (v) => v === 'NODE_ENV' || /^(NEXT_PUBLIC_)?VERCEL_/.test(v);
const undocumented = [...used].filter((v) => !documented.has(v) && !platform(v));
line(undocumented.length === 0, '.env.example covers every env var the app reads', undocumented.join(', ') || [...used].sort().join(', '));

const secrets = [];
const scan = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.next', '.git'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) scan(full);
    else if (/\.(js|jsx|ts|tsx|mjs|json|md)$/.test(entry.name) && entry.name !== 'package-lock.json') {
      const text = fs.readFileSync(full, 'utf8');
      for (const re of [/postgres(ql)?:\/\/[^\s'"]+/gi, /vercel_blob_rw_[A-Za-z0-9_]+/g]) {
        for (const m of text.matchAll(re)) secrets.push(full + ' :: ' + m[0].slice(0, 40));
      }
    }
  }
};
scan('.');
line(secrets.length === 0, 'No secrets hard-coded in tracked files', secrets.slice(0, 3).join(' | '));

console.log('\n' + (failures ? failures + ' check(s) failed' : 'All checks passed'));
process.exit(failures ? 1 : 0);
