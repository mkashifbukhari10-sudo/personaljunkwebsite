import Image from 'next/image';
import Placeholder from '@/components/Placeholder';
import { hasImage } from '@/lib/images';

/**
 * The single image component for the site. Accepts an image descriptor
 * ({ src, alt, width, height, caption? } — the shape Payload media will be
 * mapped to in Phase 10) and renders next/image with explicit dimensions,
 * responsive `sizes` and AVIF/WebP negotiation. When `image` is null it renders
 * the striped Placeholder so pages never break before assets exist.
 *
 * `fill` mode is used when the slot has a fixed CSS height (the placeholder
 * boxes); otherwise the image keeps its intrinsic aspect ratio. A caption is
 * rendered visibly in both modes: on licensed stock photography it carries the
 * attribution.
 */
export default function Media({ image, label, height, dark = true, align, priority = false, className, sizes = '(min-width: 1024px) 50vw, 100vw', fill = true, style, imgStyle }) {
  if (!hasImage(image)) {
    return <Placeholder label={label} height={height} dark={dark} align={align} style={style} />;
  }

  const common = {
    src: image.src,
    alt: image.alt,
    sizes,
    priority,
    quality: 82
  };

  if (fill && height) {
    return (
      <figure className={className} style={{ margin: 0, position: 'relative', height, overflow: 'hidden', ...style }}>
        <Image {...common} fill style={{ objectFit: 'cover', ...imgStyle }} />
        {image.caption ? (
          // Visible, because for third-party photography the caption is the licence attribution.
          <figcaption style={{ position: 'absolute', right: 0, bottom: 0, margin: 0, padding: '4px 8px', fontSize: 10, lineHeight: 1.4, letterSpacing: '0.02em', color: 'rgba(255,255,255,0.78)', background: 'rgba(16,23,38,0.6)', maxWidth: '100%' }}>
            {image.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className={className} style={{ margin: 0, ...style }}>
      <Image {...common} width={image.width} height={image.height} style={{ width: '100%', height: 'auto', display: 'block', ...imgStyle }} />
      {image.caption ? <figcaption style={{ marginTop: 8, fontSize: 13, opacity: 0.7 }}>{image.caption}</figcaption> : null}
    </figure>
  );
}
