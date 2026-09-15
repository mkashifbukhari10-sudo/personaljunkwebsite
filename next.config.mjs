import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
/**
 * Content Security Policy (plan.md Phase 15), sent **report-only** for now.
 *
 * Report-only means violations are logged by the browser and nothing breaks,
 * which is the right way to start: this policy has to cover the public site,
 * the Payload admin and Plausible, and the only honest way to know it does is
 * to watch real traffic for a while. Switch the header name to
 * `Content-Security-Policy` once a report window comes back clean.
 *
 * Two directives are deliberately loose:
 * - `'unsafe-inline'` in style-src, because the whole design system is inline
 *   styles (a decision from Phase 1) and nonces would mean rewriting all of it;
 * - `'unsafe-inline'` in script-src, because Next's hydration bootstrap is an
 *   inline script and tightening it needs nonces threaded through middleware.
 * Both are worth revisiting, neither is worth blocking launch for.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com",
  "font-src 'self' data:",
  "connect-src 'self' https://plausible.io https://*.public.blob.vercel-storage.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'"
  // 'upgrade-insecure-requests' is ignored in a report-only policy and Chrome
  // logs an error for it on every page. Add it back when the header is
  // switched to enforcing.
].join('; ');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Content-Security-Policy-Report-Only', value: csp }
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Local builds on small machines: NEXT_BUILD_CPUS=2 caps the static-generation
  // worker pool (each worker loads Payload + a database connection). Unset on
  // Vercel, where Next picks the pool size itself.
  ...(process.env.NEXT_BUILD_CPUS ? { experimental: { cpus: Number(process.env.NEXT_BUILD_CPUS) } } : {}),
  // One canonical form per URL: /services, never /services/ (plan.md Phase 14).
  trailingSlash: false,
  images: {
    // Serve modern formats; Next negotiates per browser.
    formats: ['image/avif', 'image/webp'],
    // Vercel Blob (plan.md Phase 10). Each Blob store gets its own subdomain,
    // so the host is matched by wildcard rather than pinned to one store.
    remotePatterns: [{ protocol: 'https', hostname: '**.public.blob.vercel-storage.com' }]
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      // Next already serves /_next/static as immutable; do the same for site photography.
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] }
    ];
  }
};

export default withPayload(nextConfig);
