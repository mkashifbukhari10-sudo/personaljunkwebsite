import { absoluteUrl, indexable } from '@/lib/site';

/** Must live at app/ root (root-only convention; ignored inside a route group). */

export default function robots() {
  // A deployment without its own origin — a preview, or production still on
  // its …vercel.app address — must not be crawled: it would compete with the
  // real site for the same content. Setting NEXT_PUBLIC_SITE_URL turns this on.
  if (!indexable) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    // The admin UI, the REST API and the draft-preview entry point are not
    // for crawlers. /api covers /api/preview, which is listed anyway so the
    // intent survives any future narrowing of the /api rule.
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/api/preview'] }],
    sitemap: absoluteUrl('/sitemap.xml')
  };
}
