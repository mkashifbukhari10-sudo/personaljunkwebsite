import { ImageResponse } from 'next/og';
import { c } from '@/lib/theme';

/**
 * PWA/manifest icons at stable URLs (/brand/icon-192, /brand/icon-512),
 * generated from the existing brand mark. Replace with real artwork by
 * pointing app/manifest.js at PNG files in /public and deleting this route.
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

const SIZES = { 'icon-192': 192, 'icon-512': 512 };

export function generateStaticParams() {
  return Object.keys(SIZES).map((key) => ({ key }));
}

export async function GET(_request, { params }) {
  const { key } = await params;
  const px = SIZES[key] || 192;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', background: c.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: Math.round(px * 0.44), height: Math.round(px * 0.44), background: c.bronze }} />
      </div>
    ),
    { width: px, height: px }
  );
}
