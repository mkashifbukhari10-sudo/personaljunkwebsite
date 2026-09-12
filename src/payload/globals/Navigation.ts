import type { GlobalConfig } from 'payload';
import { revalidateGlobalAfterChange } from '../hooks/revalidate';

/**
 * Header and footer link lists (plan.md Phase 8). Empty until Phase 9; the
 * frontend falls back to `navLinks` in lib/site.js and to the footer's current
 * link list, so an empty global renders exactly today's navigation.
 *
 * The footer's Services and Areas columns are not modelled here — they are
 * generated from the Services and Areas collections.
 */
export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  access: { read: () => true },
  admin: { description: 'Header and footer links. Leave empty to keep the built-in navigation.' },
  hooks: { afterChange: [revalidateGlobalAfterChange('settings', ['/'])] },
  fields: [
    {
      name: 'primary',
      type: 'array',
      label: 'Header links',
      labels: { singular: 'Link', plural: 'Links' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'href', type: 'text', required: true, admin: { width: '50%', description: 'Site-relative path, e.g. /services' } }
          ]
        }
      ]
    },
    {
      name: 'footerColumns',
      type: 'array',
      label: 'Footer link columns',
      labels: { singular: 'Column', plural: 'Columns' },
      fields: [
        { name: 'title', type: 'text', required: true, admin: { description: 'Used from Phase 12 onwards; today only the links render.' } },
        {
          name: 'links',
          type: 'array',
          minRows: 1,
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
                { name: 'href', type: 'text', required: true, admin: { width: '50%' } }
              ]
            }
          ]
        }
      ]
    }
  ]
};
