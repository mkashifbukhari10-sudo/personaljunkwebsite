import { ImageResponse } from 'next/og';
import OgTemplate from '@/components/OgTemplate';
import { site } from '@/lib/site';
import { defaultOgImage } from '@/lib/seo';
import { loadOgPhoto, loadOgLogo } from '@/lib/og-image';
import { getServices, getServiceBySlug } from '@/lib/content/services';
import { getAreas, getAreaBySlug } from '@/lib/content/areas';
import { getAllPosts, getPostBySlug } from '@/lib/content/posts';

/**
 * Social share images at stable URLs, statically generated at build:
 *   /og/default                 site-wide image (brand mark + tagline)
 *   /og/service-{slug}          per service (composites the service photo when set)
 *   /og/area-{slug}             per area
 *   /og/post-{slug}             per blog post (cover photo, or text template)
 *
 * A route handler is used instead of the opengraph-image file convention
 * because Next hashes those file routes (e.g. /opengraph-image-4usi79), which
 * cannot be referenced from JSON-LD, the manifest, or explicit metadata.
 */
export const dynamic = 'force-static';
// Unknown keys render on demand (and fall back to the default card), so a
// service or area added in the CMS gets its social image without a rebuild.
export const dynamicParams = true;

const SIZE = { width: defaultOgImage.width, height: defaultOgImage.height };

export async function generateStaticParams() {
  const [services, areas, posts] = await Promise.all([getServices(), getAreas(), getAllPosts()]);
  return [
    { key: 'default' },
    ...services.map((s) => ({ key: 'service-' + s.slug })),
    ...areas.map((a) => ({ key: 'area-' + a.slug })),
    ...posts.map((p) => ({ key: 'post-' + p.slug }))
  ];
}

/**
 * The photo composited under the brand text: the document's own social image
 * if an editor set one, otherwise its page photo, otherwise nothing and the
 * card stays text-only (plan.md Phase 10).
 */
function ogPhotoFor(doc) {
  return (doc.seo && doc.seo.ogImage) || doc.image || null;
}

async function templateFor(key) {
  const logo = await loadOgLogo();
  if (key.startsWith('service-')) {
    const svc = await getServiceBySlug(key.slice('service-'.length));
    if (svc) return <OgTemplate logo={logo} eyebrow={'Service ' + svc.num} title={svc.name} line={svc.blurb} photo={await loadOgPhoto(ogPhotoFor(svc))} />;
  }
  if (key.startsWith('area-')) {
    const area = await getAreaBySlug(key.slice('area-'.length));
    if (area) return <OgTemplate logo={logo} eyebrow="Junk removal in" title={area.name} line={area.note} photo={await loadOgPhoto(ogPhotoFor(area))} />;
  }
  if (key.startsWith('post-')) {
    const post = await getPostBySlug(key.slice('post-'.length));
    if (post) {
      const photo = (post.seo && post.seo.ogImage) || post.coverImage || null;
      return <OgTemplate logo={logo} eyebrow="From the blog" title={post.title} line={post.excerpt} photo={await loadOgPhoto(photo)} />;
    }
  }
  return (
    <OgTemplate
      logo={logo}
      title={<div style={{ display: 'flex', flexDirection: 'column' }}><span>You point. We lift.</span><span style={{ color: '#C79A52' }}>It&#8217;s gone.</span></div>}
      line={site.shortDescription}
    />
  );
}

export async function GET(_request, { params }) {
  const { key } = await params;
  return new ImageResponse(await templateFor(key), SIZE);
}
