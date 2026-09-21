import Hero from '@/components/home/Hero';
import ActionStrip from '@/components/home/ActionStrip';
import ServicesExplorer from '@/components/home/ServicesExplorer';
import SameDay from '@/components/home/SameDay';
import ClutterClear from '@/components/home/ClutterClear';
import Clearance from '@/components/home/Clearance';
import Crew from '@/components/home/Crew';
import Disposal from '@/components/home/Disposal';
import DubaiMap from '@/components/home/DubaiMap';
import Reviews from '@/components/home/Reviews';
import BlogHighlights from '@/components/home/BlogHighlights';
import Faq from '@/components/home/Faq';
import FinalCta from '@/components/home/FinalCta';
import { site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import { getServiceGroups } from '@/lib/content/services';
import { getHomeMapAreas } from '@/lib/content/areas';
import JsonLd from '@/components/JsonLd';
import { faqPageSchema } from '@/lib/schema';
import { getSiteFaqs } from '@/lib/content/faqs';
import { getReviews } from '@/lib/content/reviews';
import { getSiteImages } from '@/lib/content/settings';
import { getPosts } from '@/lib/content/posts';

// Title is omitted so the layout default applies (the template is not used for the homepage).
export const metadata = pageMetadata({
  description: site.description,
  path: '/',
  og: {
    title: 'Junk Services Dubai — You point. We lift. It is gone.',
    description: site.shortDescription
  }
});

export default async function HomePage() {
  const [groups, allMapAreas, reviews, faqs, images, { posts }] = await Promise.all([
    getServiceGroups(),
    getHomeMapAreas(),
    getReviews(),
    getSiteFaqs(),
    getSiteImages(),
    getPosts({ page: 1, perPage: 3 })
  ]);
  const mapAreas = allMapAreas.map((a) => ({ slug: a.slug, name: a.name, home: a.home }));
  return (
    <>
      <Hero />
      <ActionStrip />
      <ServicesExplorer groups={groups} />
      <SameDay />
      <ClutterClear before={images.beforeRoom} after={images.afterRoom} />
      <Clearance />
      <Crew />
      <Disposal />
      <DubaiMap areas={mapAreas} />
      <BlogHighlights posts={posts} />
      <Reviews items={reviews} />
      <Faq />
      <FinalCta />
      <JsonLd data={faqPageSchema(faqs)} />
    </>
  );
}
