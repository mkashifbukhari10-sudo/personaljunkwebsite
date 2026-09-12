import Script from 'next/script';

/**
 * Plausible analytics (plan.md Phase 15).
 *
 * Chosen over GA4 because it sets no cookies and stores no personal data, so
 * the site needs no consent banner — which keeps the page simple and keeps a
 * banner out of the way of Core Web Vitals.
 *
 * A no-op unless `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set, so development and
 * preview deployments record nothing without any code change. It is rendered
 * only from the frontend root layout, so `/admin` — which has its own root
 * layout — is never tracked.
 *
 * `afterInteractive` keeps it off the critical path: the script loads once the
 * page is usable, so it cannot delay LCP.
 */
export default function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  // Self-hosted instances override the script origin; the default is Plausible's cloud.
  const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || 'https://plausible.io/js/script.js';

  return <Script src={src} data-domain={domain} strategy="afterInteractive" defer />;
}
