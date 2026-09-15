import type { CollectionBeforeOperationHook, CollectionConfig } from 'payload';
import { slugify } from '../fields/slug';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate';

/**
 * Every image on the site (plan.md Phase 10).
 *
 * - `alt` is required, so no image can be uploaded without alt text.
 * - `resizeOptions` caps the stored original at 2400px on the long edge and,
 *   with `withMetadata: false`, runs it through sharp — which is what strips
 *   EXIF and any GPS coordinates the camera wrote. Without a resize the
 *   original would be stored byte-for-byte, metadata included.
 * - `imageSizes` are the crops Payload generates. The frontend does not need
 *   them (next/image resizes from the original), but `og` is the exact
 *   1200x630 social card and the rest keep the admin light.
 * - `focalPoint` decides what stays in frame when a size has to crop.
 *
 * Storage: Vercel Blob when `BLOB_READ_WRITE_TOKEN` is set (see
 * payload.config.ts), otherwise Payload's local `media/` directory, which is
 * gitignored and fine for development.
 */

/** "My Photo (1).JPG" -> "my-photo-1.jpg". Keeps URLs clean and predictable. */
const slugifyFilename: CollectionBeforeOperationHook = ({ operation, req }) => {
  if (operation !== 'create' && operation !== 'update') return;
  const file = req.file;
  if (!file || !file.name) return;
  const dot = file.name.lastIndexOf('.');
  const stem = dot > 0 ? file.name.slice(0, dot) : file.name;
  const ext = dot > 0 ? file.name.slice(dot + 1).toLowerCase() : '';
  const slug = slugify(stem) || 'image';
  file.name = ext ? slug + '.' + ext : slug;
};

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Image', plural: 'Media' },
  access: { read: () => true },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    description: 'Photography for service, area and homepage slots. Alt text is required.'
  },
  hooks: {
    beforeOperation: [slugifyFilename],
    // Media is embedded in service/area pages, so a replaced photo must flush both.
    afterChange: [revalidateAfterChange(['services', 'areas'], ['/'])],
    afterDelete: [revalidateAfterDelete(['services', 'areas'], ['/'])]
  },
  upload: {
    mimeTypes: ['image/*'],
    focalPoint: true,
    crop: true,
    // Re-encode the original: caps runaway uploads and drops EXIF/GPS.
    resizeOptions: { width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true },
    withMetadata: false,
    imageSizes: [
      { name: 'thumbnail', width: 400, fit: 'inside', withoutEnlargement: true },
      { name: 'card', width: 800, fit: 'inside', withoutEnlargement: true },
      { name: 'hero', width: 1600, fit: 'inside', withoutEnlargement: true },
      // Social cards are a fixed frame, so this one crops to the focal point.
      { name: 'og', width: 1200, height: 630, fit: 'cover' }
    ]
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description:
          'Describe the photo for someone who cannot see it — "Two Junk Services Dubai crew carrying a grey sofa into a covered truck". No keyword lists.'
      }
    },
    { name: 'caption', type: 'text', admin: { description: 'Optional. Shown under the image where the layout allows it.' } },
    // Set by scripts/seed-images.ts so a re-run finds the document it created
    // even after Payload has renamed the file ("x.jpg" -> "x-1.jpg"). Hidden
    // from editors; empty on anything uploaded through the admin.
    { name: 'seedKey', type: 'text', index: true, admin: { hidden: true } }
  ]
};
