import { site } from '@/lib/site';

/** Web app manifest. Icons are the brand monogram on ink (see lib/brand.js). Must live at app/ root (root-only convention). */
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
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  };
}
