import { ImageResponse } from 'next/og';
import { c } from '@/lib/theme';

/**
 * Apple touch icon generated from the existing brand mark.
 * To use real artwork instead, delete this file and add app/apple-icon.png (180x180).
 */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', background: c.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 78, height: 78, background: c.bronze }} />
      </div>
    ),
    size
  );
}
