import type { CollectionConfig } from 'payload';

/**
 * Pickup requests submitted through the contact form.
 *
 * Unlike every other collection here this one is written by the public: the
 * form posts to /api/quote, which creates a document with `overrideAccess:
 * false` so the `create` rule below is what actually admits the write. Reading,
 * updating and deleting are left at Payload's default (an authenticated user),
 * because these documents hold customer phone numbers and must never be
 * readable through the REST API the way services and areas are.
 *
 * Nothing on the site renders from this collection, so it has no cache tag and
 * no revalidation hooks.
 */
export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Pickup request', plural: 'Pickup requests' },
  access: {
    // The contact form is public, so anyone may create one.
    create: () => true
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'area', 'status', 'createdAt'],
    description: 'Requests sent from the contact form. Newest first. The customer also receives a WhatsApp hand-off at the moment they submit.',
    // Editors never author one of these; they only read what arrived.
    group: 'Enquiries'
  },
  defaultSort: '-createdAt',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'phone', type: 'text', required: true, admin: { width: '50%', description: 'As typed by the customer.' } }
      ]
    },
    {
      type: 'row',
      fields: [
        { name: 'area', type: 'text', admin: { width: '50%', description: 'Chosen from the area list, or "Other".' } },
        { name: 'time', type: 'text', label: 'Preferred pickup time', admin: { width: '50%' } }
      ]
    },
    { name: 'items', type: 'textarea', label: 'What needs removing', admin: { description: 'The customer\u2019s own description.' } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Booked', value: 'booked' },
        { label: 'Closed', value: 'closed' }
      ],
      admin: { position: 'sidebar', description: 'Track the request as you work it.' }
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { position: 'sidebar', description: 'Internal only. Never shown to the customer.' }
    }
  ]
};
