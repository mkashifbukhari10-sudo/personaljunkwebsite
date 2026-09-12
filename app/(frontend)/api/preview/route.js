import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { postHref } from '@/lib/hrefs';
import { getDraftPostBySlug } from '@/lib/content/posts';

/**
 * Draft Mode entry point (plan.md Phase 13).
 *
 * The admin's "Preview" button links here with the post's slug and a shared
 * secret; this enables Next's Draft Mode cookie and forwards to the post URL,
 * which then renders the working copy at request time with `noindex`.
 *
 * `?exit=1` turns Draft Mode off again.
 *
 * Guards, in order: the secret must match, the slug must be a plain slug, and
 * a document with that slug must actually exist. Without them this would be an
 * open redirect and a way to force every post page to render dynamically.
 */
export const dynamic = 'force-dynamic';

const SLUG = /^[a-z0-9][a-z0-9-]*$/;

function unauthorized(message) {
  return new Response(message, { status: 401, headers: { 'content-type': 'text/plain', 'x-robots-tag': 'noindex' } });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = process.env.PREVIEW_SECRET;

  if (searchParams.get('exit')) {
    const draft = await draftMode();
    draft.disable();
    redirect('/blog');
  }

  if (!secret) {
    return new Response('Preview is not configured: set PREVIEW_SECRET.', {
      status: 501,
      headers: { 'content-type': 'text/plain', 'x-robots-tag': 'noindex' }
    });
  }
  if (searchParams.get('secret') !== secret) return unauthorized('Invalid preview secret.');

  const slug = searchParams.get('slug') || '';
  if (!SLUG.test(slug)) return unauthorized('Invalid slug.');

  const post = await getDraftPostBySlug(slug);
  if (!post) return new Response('No post with that slug.', { status: 404, headers: { 'x-robots-tag': 'noindex' } });

  const draft = await draftMode();
  draft.enable();
  redirect(postHref(slug));
}
