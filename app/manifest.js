import { site } from '@/lib/site';

/** Web app manifest. Icons are generated stand-ins from app/brand/[key]/route.js until brand artwork exists (plan.md Phase 5). Must live at app/ root (root-only convention). */
export default function manifest() {
  return {
    name: site.fullName,
    short_name: site.name,
    description: site.shortDescription,
    start_url: '/',
    display: 'browser',
    background_color: '#101726',
    theme_color: '#101726',
    icons: [
      { src: '/brand/icon-192', sizes: '192x192', type: 'image/png' },
      { src: '/brand/icon-512', sizes: '512x512', type: 'image/png' }
    ]
  };
}
