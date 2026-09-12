import type { Field } from 'payload';

/**
 * The single reusable SEO field group (plan.md Phase 8). Every page-like
 * collection spreads this so search fields are named and validated the same
 * way everywhere, and so lib/seo.js `pageMetadata({ seo })` can consume the
 * group without knowing which collection it came from.
 *
 * `title` / `description` map to <title> and <meta name="description">;
 * `canonical` overrides the route's own path; `noIndex` emits robots noindex
 * and (Phase 14) drops the URL from the sitemap; `ogImage` / `ogTitle` /
 * `ogDescription` override the generated social card.
 */
export const seoField = ({
  name = 'seo',
  label = 'SEO',
  required = false
}: { name?: string; label?: string; required?: boolean } = {}): Field => ({
  name,
  type: 'group',
  label,
  admin: { description: 'Search and social metadata for this page.' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required,
      maxLength: 80,
      admin: { description: 'Aim for 60 characters or fewer so Google does not truncate it. Hard limit 80.' }
    },
    {
      name: 'description',
      type: 'textarea',
      required,
      maxLength: 200,
      admin: { description: 'Aim for 160 characters or fewer. Hard limit 200.' }
    },
    {
      name: 'canonical',
      type: 'text',
      admin: { description: 'Optional. Absolute URL or site-relative path. Leave empty to use this page\u2019s own URL.' }
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Ask search engines not to index this page. It is also removed from the sitemap.' }
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional. Replaces the generated social share image (1200\u00d7630 works best).' }
    },
    { name: 'ogTitle', type: 'text', admin: { description: 'Optional. Defaults to the SEO title.' } },
    { name: 'ogDescription', type: 'textarea', admin: { description: 'Optional. Defaults to the SEO description.' } }
  ]
});
