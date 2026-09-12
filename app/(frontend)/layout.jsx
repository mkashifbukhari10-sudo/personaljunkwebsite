import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { site, indexable } from '@/lib/site';
import { openGraphFor, feedAlternate } from '@/lib/seo';
import { localBusinessSchema, webSiteSchema } from '@/lib/schema';
import Analytics from '@/components/Analytics';
import { getNavigation, getSiteSettings } from '@/lib/content/settings';
import './globals.css';

/**
 * `display: 'swap'` — a deliberate choice, not the default (plan.md Phase 16).
 *
 * `swap` means the brand font is always the one readers end up seeing: the
 * metric-matched fallback shows only until Archivo arrives, then it is
 * replaced. The cost is a layout shift when that replacement happens —
 * Lighthouse measured **CLS 0.145** on service pages and attributed it to "Web
 * font loaded". The display heading runs to 104px, so even next/font's
 * size-adjusted Arial fallback (98.7%) changes where the hero wraps, and
 * everything below it moves.
 *
 * `display: 'optional'` removes the shift completely (measured: CLS 0.145 → 0,
 * desktop Performance 100) but lets a cold-cache first view render entirely in
 * Arial. The owner chose the font over the metric. If CLS needs fixing later
 * without giving that up, the route is a hand-tuned fallback @font-face whose
 * metrics match Archivo more closely than next/font's generated one.
 */
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'], // 500 is unused (audited)
  variable: '--font-archivo',
  display: 'swap'
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '600'], // 500 is unused (audited)
  variable: '--font-mono',
  display: 'swap'
});

export const viewport = {
  themeColor: '#101726',
  width: 'device-width',
  initialScale: 1
};

/**
 * Site-wide metadata. It has to be a function rather than a constant because
 * the Search Console verification token lives in Site settings (plan.md
 * Phase 15) — a value an editor pastes in, not something in the code.
 */
export async function generateMetadata() {
  const settings = await getSiteSettings();
  const metadata = {
    metadataBase: new URL(site.url),
    manifest: '/manifest.webmanifest',
    title: {
      default: site.defaultTitle,
      template: site.titleTemplate
    },
    description: site.description,
    applicationName: site.fullName,
    // Canonical, plus feed discovery for readers and crawlers (plan.md Phase 14).
    alternates: { canonical: '/', types: feedAlternate },
    openGraph: openGraphFor('/'),
    twitter: { card: 'summary_large_image' },
    // A deployment with no origin of its own (a preview, or production still
    // on its …vercel.app address) is kept out of the index so it cannot
    // compete with the real site. See `indexable` in lib/site.js.
    robots: indexable
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1
          }
        }
      : { index: false, follow: false, googleBot: { index: false, follow: false } }
  };

  // Only rendered once someone pastes the token into Site settings; an empty
  // verification meta tag is worse than none.
  if (settings.googleSiteVerification) {
    metadata.verification = { google: settings.googleSiteVerification };
  }

  return metadata;
}

export default async function RootLayout({ children }) {
  const [nav, business, website] = await Promise.all([getNavigation(), localBusinessSchema(), webSiteSchema()]);
  return (
    <html lang={site.language}>
      <body className={archivo.variable + ' ' + plexMono.variable}>
        <a href="#main" className="jk-skip">
          Skip to content
        </a>
        <Nav links={nav.primary} />
        <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
          {children}
        </main>
        <Footer />
        <JsonLd data={[business, website]} />
        <Analytics />
      </body>
    </html>
  );
}
