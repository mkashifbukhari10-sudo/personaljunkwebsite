import type { GlobalConfig } from 'payload';
import { seoField } from '../fields/seo';
import { revalidateGlobalAfterChange } from '../hooks/revalidate';

/**
 * Business identity and the facts that feed LocalBusiness structured data
 * (plan.md Phase 8).
 *
 * Every field starts empty. lib/content/settings.js falls back to the values
 * in lib/site.js for anything not filled in, and structured data omits
 * address / geo / opening hours / sameAs entirely until they are populated —
 * so an empty global can never publish an invented fact.
 */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  access: { read: () => true },
  admin: { description: 'Business identity, contact details and the facts used in structured data.' },
  hooks: { afterChange: [revalidateGlobalAfterChange('settings', ['/'])] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identity',
          fields: [
            { name: 'siteName', type: 'text', admin: { description: 'Falls back to "Junkit Dubai".' } },
            { name: 'tagline', type: 'text' },
            { name: 'foundingYear', type: 'text', admin: { description: 'Four digits, e.g. 2020.' } },
            seoField({ name: 'defaultSeo', label: 'Default SEO' })
          ]
        },
        {
          label: 'Contact',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'phone', type: 'text', admin: { width: '50%', description: 'As displayed, e.g. +971 56 725 6386.' } },
                { name: 'whatsapp', type: 'text', admin: { width: '50%', description: 'Full wa.me link.' } }
              ]
            },
            {
              name: 'address',
              type: 'group',
              admin: { description: 'Leave empty until the registered address is confirmed. Nothing is published from a partly filled address.' },
              fields: [
                { name: 'streetAddress', type: 'text' },
                {
                  type: 'row',
                  fields: [
                    { name: 'addressLocality', type: 'text', admin: { width: '34%' } },
                    { name: 'addressRegion', type: 'text', admin: { width: '33%' } },
                    { name: 'postalCode', type: 'text', admin: { width: '33%' } }
                  ]
                },
                { name: 'addressCountry', type: 'text', admin: { description: 'Two-letter country code, e.g. AE.' } }
              ]
            },
            {
              name: 'geo',
              type: 'group',
              admin: { description: 'Both values are needed before coordinates are published.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'latitude', type: 'number', admin: { width: '50%' } },
                    { name: 'longitude', type: 'number', admin: { width: '50%' } }
                  ]
                }
              ]
            },
            {
              name: 'openingHours',
              type: 'array',
              labels: { singular: 'Opening hours row', plural: 'Opening hours' },
              admin: { description: 'One row per set of days, e.g. Monday\u2013Sunday 08:00\u201320:00.' },
              fields: [
                {
                  name: 'days',
                  type: 'select',
                  hasMany: true,
                  required: true,
                  options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'opens', type: 'text', required: true, admin: { width: '50%', description: '24-hour, e.g. 08:00' } },
                    { name: 'closes', type: 'text', required: true, admin: { width: '50%', description: '24-hour, e.g. 20:00' } }
                  ]
                }
              ]
            },
            {
              name: 'sameAs',
              type: 'array',
              label: 'Social profiles',
              admin: { description: 'Full profile URLs the business actually owns.' },
              fields: [{ name: 'url', type: 'text', required: true }]
            }
          ]
        },
        {
          label: 'Images',
          description:
            'The fixed photo slots on the homepage and the About page. Service and area photos live on those documents instead; any slot left empty draws the striped placeholder.',
          fields: [
            {
              name: 'siteImages',
              type: 'group',
              label: 'Site images',
              fields: [
                {
                  name: 'crewLoadingSofa',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Homepage — the crew',
                  admin: { description: 'Wide photo beside the “the crew” section on the homepage.' }
                },
                {
                  name: 'crewOnSite',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'About — crew and truck',
                  admin: { description: 'Tall photo beside the About page intro.' }
                },
                {
                  name: 'clearanceApartments',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Clearance card — apartments',
                  admin: { description: 'Small photo on the homepage clearance card.' }
                },
                {
                  name: 'clearanceVillas',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Clearance card — villas',
                  admin: { description: 'Small photo on the homepage clearance card.' }
                },
                {
                  name: 'clearanceOffices',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Clearance card — offices',
                  admin: { description: 'Small photo on the homepage clearance card.' }
                },
                {
                  name: 'clearanceCommercial',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Clearance card — commercial',
                  admin: { description: 'Small photo on the homepage clearance card.' }
                }
              ]
            }
          ]
        },
        {
          label: 'Verification',
          fields: [
            {
              name: 'googleSiteVerification',
              type: 'text',
              admin: { description: 'The content value of the google-site-verification meta tag. Wired up in plan.md Phase 15.' }
            }
          ]
        }
      ]
    }
  ]
};
