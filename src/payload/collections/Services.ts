import type { CollectionConfig } from 'payload';
import { seoField } from '../fields/seo';
import { slugField } from '../fields/slug';
import { bodyField, ctaField, faqsField, imageField, introField } from '../fields/content';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate';
import { recordSlugChange } from '../hooks/slug-redirect';

/**
 * The service landing pages (/services/[slug]).
 *
 * Field names are exactly the ones the frontend already reads from
 * lib/services.js (locked in plan.md Phase 3) — do not rename them.
 *
 * `group` is the homepage explorer group this service belongs to. The seven
 * groups themselves stay code-owned presentation data in lib/services.js
 * (order, blurb, image slot); only the service-to-group mapping is editable
 * here. See the Phase 8 notes in plan.md for the reasoning.
 */
export const SERVICE_GROUPS = [
  'junk-removal',
  'furniture-sofa',
  'appliances',
  'garbage-waste',
  'garden-waste',
  'clearance',
  'same-day'
] as const;

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  access: { read: () => true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['num', 'name', 'slug', 'group', '_status'],
    description: 'One document per /services/[slug] landing page.'
  },
  versions: { drafts: true },
  defaultSort: 'num',
  hooks: {
    afterChange: [recordSlugChange((slug) => '/services/' + slug), revalidateAfterChange('services', ['/', '/services'], (doc) => ['/services/' + doc.slug])],
    afterDelete: [revalidateAfterDelete('services', ['/', '/services'], (doc) => ['/services/' + doc.slug])]
  },
  fields: [
    slugField('name'),
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '70%', description: 'Display name, e.g. "Sofa Removal".' } },
        { name: 'num', type: 'text', required: true, admin: { width: '30%', description: 'Two-digit order key, e.g. "03". Also drives sort order.' } }
      ]
    },
    { name: 'blurb', type: 'textarea', required: true, admin: { description: 'One sentence used on /services and in listings.' } },
    { name: 'h1', type: 'text', required: true, label: 'H1', admin: { description: 'The descriptive heading, e.g. "Sofa removal in Dubai from any floor".' } },
    introField,
    bodyField,
    {
      type: 'collapsible',
      label: 'Typical job',
      fields: [
        { name: 'typical', type: 'text', required: true, admin: { description: 'What we usually take on this job.' } },
        { name: 'crew', type: 'text', required: true },
        { name: 'time', type: 'text', required: true, label: 'On site' }
      ]
    },
    faqsField,
    {
      type: 'row',
      fields: [
        {
          name: 'relatedServices',
          type: 'relationship',
          relationTo: 'services',
          hasMany: true,
          admin: { width: '50%', description: 'Shown as "Also worth a look", in this order.' },
          filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true)
        },
        {
          name: 'popularAreas',
          type: 'relationship',
          relationTo: 'areas',
          hasMany: true,
          admin: { width: '50%', description: 'Shown as "Where we do this most", in this order.' }
        }
      ]
    },
    ctaField,
    imageField,
    seoField({ required: true }),
    {
      name: 'group',
      type: 'select',
      options: SERVICE_GROUPS.map((value) => ({ value, label: value })),
      admin: { position: 'sidebar', description: 'Homepage explorer group. Leave empty to keep this service off the homepage explorer.' }
    },
    {
      name: 'audience',
      type: 'select',
      options: [{ value: 'business', label: 'Business' }],
      admin: { position: 'sidebar', description: 'Set to Business to emit schema.org BusinessAudience on this page.' }
    }
  ]
};
