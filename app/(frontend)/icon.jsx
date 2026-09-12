import { ImageResponse } from 'next/og';
import { c } from '@/lib/theme';

/**
 * Favicon generated from the existing brand mark (bronze square on ink, see Nav.jsx).
 * To use real artwork instead, delete this file and add app/icon.png (32x32 or larger).
 */
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', background: c.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 14, height: 14, background: c.bronze }} />
      </div>
    ),
    size
  );
}
