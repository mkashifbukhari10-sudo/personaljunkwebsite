import type { CollectionConfig } from 'payload';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate';

/**
 * Customer reviews (plan.md Phase 8).
 *
 * Only documents with `verified` checked are ever read by the frontend: a
 * review must be traceable to a real source before it can appear on the site
 * or in structured data. Unverified drafts stay invisible.
 */
export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: { singular: 'Review', plural: 'Reviews' },
  access: { read: () => true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'meta', 'source', 'rating', 'verified'],
    description: 'Real customer reviews. Nothing renders until "verified" is checked.'
  },
  defaultSort: 'order',
  hooks: {
    afterChange: [revalidateAfterChange('reviews', ['/'])],
    afterDelete: [revalidateAfterDelete('reviews', ['/'])]
  },
  fields: [
    { name: 'quote', type: 'textarea', required: true, admin: { description: 'The customer\u2019s own words. Do not rewrite them.' } },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%', description: 'As the customer published it.' } },
        { name: 'meta', type: 'text', admin: { width: '50%', description: 'Area \u00b7 Service, e.g. "JVC \u00b7 Sofa removal".' } }
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'source',
          type: 'text',
          admin: { width: '50%', description: 'Where it was published (URL or platform). Required evidence for "verified".' }
        },
        { name: 'rating', type: 'number', min: 1, max: 5, admin: { width: '25%' } },
        { name: 'order', type: 'number', defaultValue: 0, admin: { width: '25%', description: 'Lowest first.' } }
      ]
    },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Tick only when the review exists at the source above. Unticked reviews never render.' }
    }
  ]
};
