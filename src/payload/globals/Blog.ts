import type { GlobalConfig } from 'payload';
import { seoField } from '../fields/seo';
import { revalidateGlobalAfterChange } from '../hooks/revalidate';

/**
 * Copy for the blog index (plan.md Phase 12). The posts themselves are the
 * Posts collection; this is only the framing around them, so an editor can
 * change the heading and the standfirst without a deploy.
 *
 * `emptyState` is what /blog says before the first post is published. While
 * there are no published posts the page is also `noIndex`, so an empty index
 * can never be indexed.
 */
export const Blog: GlobalConfig = {
  slug: 'blog',
  label: 'Blog index',
  access: { read: () => true },
  admin: { description: 'The heading, standfirst and metadata of /blog. Posts are managed under Posts.' },
  hooks: { afterChange: [revalidateGlobalAfterChange('posts', ['/blog'])] },
  fields: [
    { name: 'h1', type: 'text', label: 'H1', admin: { description: 'The descriptive heading of the index page.' } },
    {
      name: 'intro',
      type: 'textarea',
      admin: { description: 'The paragraph under the heading. Plain text; inline links use [label](/path).' }
    },
    {
      name: 'emptyState',
      type: 'textarea',
      admin: { description: 'Shown when no posts are published yet. The page stays out of search results until one is.' }
    },
    seoField()
  ]
};
