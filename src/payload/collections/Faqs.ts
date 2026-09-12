import type { CollectionConfig } from 'payload';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate';

/**
 * The shared FAQ pool (plan.md Phase 8).
 *
 * Entries with no `service` and no `area` are site-wide and render on the
 * homepage (and feed its FAQPage structured data). Entries scoped to a service
 * or an area are available for reuse; the per-page question lists on Services
 * and Areas stay on those documents, because they are page copy and are
 * ordered by hand.
 */
export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  access: { read: () => true },
  admin: {
    useAsTitle: 'q',
    defaultColumns: ['q', 'service', 'area', 'order'],
    description: 'Questions and answers. Leave both relationships empty for a site-wide question.'
  },
  defaultSort: 'order',
  hooks: {
    afterChange: [revalidateAfterChange('faqs', ['/'])],
    afterDelete: [revalidateAfterDelete('faqs', ['/'])]
  },
  fields: [
    { name: 'q', type: 'text', required: true, label: 'Question' },
    { name: 'a', type: 'textarea', required: true, label: 'Answer' },
    {
      name: 'more',
      type: 'group',
      label: 'Read-more link',
      admin: { description: 'Optional link shown under the answer. Both fields are needed for it to render.' },
      fields: [
        { name: 'href', type: 'text', admin: { description: 'Site-relative path, e.g. /how-it-works' } },
        { name: 'label', type: 'text' }
      ]
    },
    {
      type: 'row',
      fields: [
        { name: 'service', type: 'relationship', relationTo: 'services', admin: { width: '50%' } },
        { name: 'area', type: 'relationship', relationTo: 'areas', admin: { width: '50%' } }
      ]
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar', description: 'Lowest first.' } }
  ]
};
