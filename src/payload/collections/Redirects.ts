import type { CollectionConfig } from 'payload';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate';

/**
 * Editor-managed URL redirects (plan.md Phase 14).
 *
 * Two things write here:
 * - an editor, for a URL that moved or a link someone printed wrong;
 * - the slug-change hook, which records a 301 automatically whenever a
 *   published page's slug changes (see src/payload/hooks/slug-redirect.ts).
 *
 * They are applied at request time by the catch-all route, so a new redirect
 * works immediately without a rebuild. Only paths that match no real route
 * reach that lookup, so a redirect can never shadow a live page.
 *
 * On the wire, "permanent" is a 308 and "temporary" a 307 — that is what the
 * App Router emits, and they are the method-preserving equivalents of 301 and
 * 302. Search engines treat 308 exactly as they treat 301.
 */

/** Leading slash, no scheme, no whitespace — e.g. /old-page or /services/old. */
const PATH = /^\/[^\s?#]*$/;

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  labels: { singular: 'Redirect', plural: 'Redirects' },
  access: { read: () => true },
  admin: {
    useAsTitle: 'from',
    defaultColumns: ['from', 'to', 'type', 'updatedAt'],
    description: 'Send an old URL to a new one. Applied to any path that does not match a live page.'
  },
  hooks: {
    afterChange: [revalidateAfterChange('redirects')],
    afterDelete: [revalidateAfterDelete('redirects')]
  },
  fields: [
    {
      name: 'from',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'The old path, starting with a slash: /old-page. No domain, no query string.' },
      validate: (value: unknown) => {
        if (typeof value !== 'string' || !PATH.test(value)) return 'Use a site-relative path starting with "/", e.g. /old-page.';
        return true;
      }
    },
    {
      name: 'to',
      type: 'text',
      required: true,
      admin: { description: 'Where it should land: a path like /services/sofa-removal, or a full https:// URL.' },
      validate: (value: unknown) => {
        if (typeof value !== 'string' || !value.trim()) return 'Required.';
        const v = value.trim();
        if (PATH.test(v) || /^https?:\/\/\S+$/.test(v)) return true;
        return 'Use a path starting with "/" or a full http(s) URL.';
      }
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: '301',
      options: [
        { value: '301', label: 'Permanent — passes ranking to the new URL' },
        { value: '302', label: 'Temporary — the old URL is coming back' }
      ],
      admin: { position: 'sidebar', description: 'Permanent is sent as 308, temporary as 307 — the modern equivalents of 301 and 302.' }
    },
    {
      name: 'note',
      type: 'text',
      admin: { position: 'sidebar', description: 'Why this exists. Filled in automatically for slug changes.' }
    }
  ]
};
