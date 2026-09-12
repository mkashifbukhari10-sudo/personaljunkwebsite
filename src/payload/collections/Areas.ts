import type { CollectionConfig } from 'payload';
import { seoField } from '../fields/seo';
import { slugField } from '../fields/slug';
import { bodyField, ctaField, faqsField, imageField, introField } from '../fields/content';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate';
import { recordSlugChange } from '../hooks/slug-redirect';

/**
 * The coverage-area landing pages (/areas/[slug]).
 *
 * Field names are exactly the ones the frontend already reads from
 * lib/areas.js (locked in plan.md Phase 4) — do not rename them.
 *
 * `map` is the marker position on the /areas city grid. `home` is the marker
 * position and order on the homepage grid; only areas with `home.featured`
 * appear there and in the footer.
 */
export const Areas: CollectionConfig = {
  slug: 'areas',
  labels: { singular: 'Area', plural: 'Areas' },
  access: { read: () => true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['num', 'name', 'slug', '_status'],
    description: 'One document per /areas/[slug] landing page.'
  },
  versions: { drafts: true },
  defaultSort: 'num',
  hooks: {
    afterChange: [recordSlugChange((slug) => '/areas/' + slug), revalidateAfterChange('areas', ['/', '/areas'], (doc) => ['/areas/' + doc.slug])],
    afterDelete: [revalidateAfterDelete('areas', ['/', '/areas'], (doc) => ['/areas/' + doc.slug])]
  },
  fields: [
    slugField('name'),
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '70%', description: 'Display name, e.g. "Dubai Marina".' } },
        { name: 'num', type: 'text', required: true, admin: { width: '30%', description: 'Two-digit order key, e.g. "01". Also drives sort order.' } }
      ]
    },
    { name: 'note', type: 'text', required: true, admin: { description: 'Short line shown next to the area in lists, e.g. "Tower pickups with service-lift booking handled."' } },
    { name: 'h1', type: 'text', required: true, label: 'H1' },
    introField,
    bodyField,
    faqsField,
    {
      type: 'row',
      fields: [
        {
          name: 'popularServices',
          type: 'relationship',
          relationTo: 'services',
          hasMany: true,
          admin: { width: '50%', description: 'Shown as "What we pick up here", in this order.' }
        },
        {
          name: 'nearbyAreas',
          type: 'relationship',
          relationTo: 'areas',
          hasMany: true,
          admin: { width: '50%', description: 'Lateral links to neighbouring areas.' },
          filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true)
        }
      ]
    },
    ctaField,
    imageField,
    seoField({ required: true }),
    {
      type: 'collapsible',
      label: 'Map positions',
      admin: { description: 'Percentages of the illustrative city grid. Not real coordinates.' },
      fields: [
        {
          name: 'map',
          type: 'group',
          label: 'Areas page marker',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'x', type: 'number', required: true, min: 0, max: 100, admin: { width: '50%' } },
                { name: 'y', type: 'number', required: true, min: 0, max: 100, admin: { width: '50%' } }
              ]
            }
          ]
        },
        {
          name: 'home',
          type: 'group',
          label: 'Homepage marker',
          fields: [
            { name: 'featured', type: 'checkbox', defaultValue: false, admin: { description: 'Show this area on the homepage map and in the footer.' } },
            {
              type: 'row',
              admin: { condition: (_data, siblingData) => Boolean(siblingData?.featured) },
              fields: [
                { name: 'x', type: 'number', min: 0, max: 100, admin: { width: '33%' } },
                { name: 'y', type: 'number', min: 0, max: 100, admin: { width: '33%' } },
                { name: 'order', type: 'number', min: 1, admin: { width: '33%', description: 'Tile order on the homepage grid.' } }
              ]
            }
          ]
        }
      ]
    }
  ]
};
