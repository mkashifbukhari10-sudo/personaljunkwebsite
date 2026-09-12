import type { CollectionConfig, FieldHook } from 'payload';
import {
  BlockquoteFeature,
  BoldFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
  UploadFeature,
  lexicalEditor
} from '@payloadcms/richtext-lexical';
import { seoField } from '../fields/seo';
import { slugField } from '../fields/slug';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate';
import { recordSlugChange } from '../hooks/slug-redirect';

/**
 * Blog posts (plan.md Phase 11). The index is /blog (Phase 12) and the post
 * page is /blog/[slug] (Phase 13), which also previews drafts.
 *
 * The page's single `<h1>` is the post title, so the editor offers **h2-h4
 * only**: an `<h1>` inside the body would compete with it. The serializer in
 * lib/content/richtext.jsx clamps anything that slips through anyway.
 *
 * No categories or tags. The plan only allows a taxonomy once an editorial
 * plan promises at least three categories with three posts each; with no plan
 * and no posts, archive pages would be thin. See the Phase 11 notes.
 */

/** ~200 words a minute, rounded up, minimum 1. Recomputed on every save. */
const setReadingTime: FieldHook = ({ siblingData }) => {
  const words = countWords(siblingData?.content);
  return Math.max(1, Math.ceil(words / 200));
};

/** Walks the Lexical tree and counts words in text nodes. */
function countWords(node: any): number {
  if (!node || typeof node !== 'object') return 0;
  if (typeof node.text === 'string') {
    const trimmed = node.text.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }
  const children = node.root ? [node.root] : node.children;
  if (!Array.isArray(children)) return 0;
  return children.reduce((total: number, child: any) => total + countWords(child), 0);
}

/** Stamps the first publish date and leaves it alone afterwards. */
const setPublishedAt: FieldHook = ({ data, siblingData, value }) => {
  if (value) return value;
  return data?._status === 'published' || siblingData?._status === 'published' ? new Date().toISOString() : value;
};

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Post', plural: 'Posts' },
  access: {
    // Drafts are invisible to the public API; the frontend reads through the
    // Local API with overrideAccess, and Draft Mode preview lands in Phase 13.
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } })
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedAt', '_status'],
    description: 'Blog posts. A cover image is required before a post can be published.',
    // The Preview button opens Next's Draft Mode route, which renders the
    // working copy at the real URL with noindex (plan.md Phase 13).
    preview: (doc) => {
      const secret = process.env.PREVIEW_SECRET;
      if (!secret || !doc?.slug) return null;
      const base = process.env.NEXT_PUBLIC_SITE_URL || '';
      return base + '/api/preview?secret=' + encodeURIComponent(secret) + '&slug=' + encodeURIComponent(String(doc.slug));
    }
  },
  versions: { drafts: true },
  defaultSort: '-publishedAt',
  hooks: {
    afterChange: [recordSlugChange((slug) => '/blog/' + slug), revalidateAfterChange('posts', ['/blog'], (doc) => ['/blog/' + doc.slug])],
    afterDelete: [revalidateAfterDelete('posts', ['/blog'], (doc) => ['/blog/' + doc.slug])]
  },
  fields: [
    slugField('title'),
    { name: 'title', type: 'text', required: true },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        description:
          'One or two sentences. Shown on /blog and used as the meta description unless the SEO tab overrides it. Aim for 160 characters.'
      }
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Required to publish. Also the default social card for this post.' },
      validate: (value: unknown, { data }: { data?: Record<string, any> }) =>
        data?._status === 'published' && !value ? 'A cover image is required before a post can be published.' : true
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: [
          ParagraphFeature(),
          // h1 is the post title; the body starts at h2.
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          BoldFeature(),
          ItalicFeature(),
          LinkFeature({
            enabledCollections: ['posts', 'services', 'areas'],
            fields: ({ defaultFields }) => [
              ...defaultFields,
              {
                name: 'nofollow',
                type: 'checkbox',
                label: 'Add rel="nofollow"',
                admin: { description: 'For paid, untrusted or user-submitted destinations.' }
              }
            ]
          }),
          UnorderedListFeature(),
          OrderedListFeature(),
          BlockquoteFeature(),
          UploadFeature({ collections: { media: { fields: [] } } }),
          HorizontalRuleFeature(),
          InlineToolbarFeature()
        ]
      })
    },
    {
      type: 'row',
      fields: [
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'authors',
          required: true,
          admin: { width: '50%', description: 'Create the person under Authors first.' }
        },
        {
          name: 'publishedAt',
          type: 'date',
          admin: {
            width: '50%',
            description: 'Set automatically on first publish. Change it only to correct the record.',
            date: { pickerAppearance: 'dayAndTime' }
          },
          hooks: { beforeChange: [setPublishedAt] }
        }
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'relatedServices',
          type: 'relationship',
          relationTo: 'services',
          hasMany: true,
          admin: { width: '50%', description: 'Links back into the service pages this post is about.' }
        },
        {
          name: 'relatedAreas',
          type: 'relationship',
          relationTo: 'areas',
          hasMany: true,
          admin: { width: '50%' }
        }
      ]
    },
    seoField(),
    {
      name: 'readingTime',
      type: 'number',
      label: 'Reading time (minutes)',
      admin: { position: 'sidebar', readOnly: true, description: 'Counted from the body on every save.' },
      hooks: { beforeChange: [setReadingTime] }
    }
  ]
};
