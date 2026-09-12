import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/Reveal';
import Breadcrumbs from '@/components/Breadcrumbs';
import { AreaHoverProvider, AreaMarkers, AreaGrid } from '@/components/areas/AreaExplorer';
import { c, mono, shell, eyebrow } from '@/lib/theme';
import { pageMetadata } from '@/lib/seo';
import { getAreas, getFeaturedAreas } from '@/lib/content/areas';
import JsonLd from '@/components/JsonLd';
import { collectionPageSchema } from '@/lib/schema';
import { areaHref } from '@/lib/hrefs';

export const metadata = pageMetadata({
  title: 'Areas We Cover in Dubai',
  description:
    'Dubai-wide junk removal with daily routes from Dubai Marina and Palm Jumeirah to Downtown, Business Bay, JVC, Jumeirah, Arabian Ranches, Dubai Hills, Mirdif, Al Barsha, Deira and Silicon Oasis.',
  path: '/areas'
});

export default async function AreasPage() {
  const [allAreas, allFeatured] = await Promise.all([getAreas(), getFeaturedAreas()]);
  // Only the fields the client grid/markers render — keeps page copy out of the RSC payload.
  const pick = (a) => ({ slug: a.slug, num: a.num, name: a.name, note: a.note, map: a.map });
  const areas = allAreas.map(pick);
  const featured = allFeatured.map(pick);
  const collection = collectionPageSchema({ path: '/areas', name: metadata.title, description: metadata.description, items: areas.map((a) => ({ name: a.name, href: areaHref(a.slug) })) });
  return (
    <AreaHoverProvider>
      <section style={{ background: c.ink, color: '#fff', padding: 'clamp(44px, 6vw, 92px) clamp(16px, 3vw, 44px)' }}>
        <div style={shell}>
          <Breadcrumbs items={[{ href: '/areas', label: 'Areas' }]} />
          <h1 style={{ ...eyebrow(c.bronze), margin: 0, fontWeight: 400 }}>Junk removal areas across Dubai</h1>
          <p style={{ margin: '18px 0 0', fontSize: 'clamp(40px, 6.4vw, 104px)', lineHeight: 0.88, fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase' }}>
            Dubai-wide.
            <br />
            Marina to Mirdif.
          </p>
          <p style={{ margin: '26px 0 0', maxWidth: '50ch', fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6, color: c.onDark, textWrap: 'pretty' }}>
            Crews run daily routes across the city. Pick your community,{' '}
            <Link href="/how-it-works" style={{ color: '#fff', borderBottom: '1px solid ' + c.bronze }}>send a photo</Link> of{' '}
            <Link href="/services" style={{ color: '#fff', borderBottom: '1px solid ' + c.bronze }}>what needs to go</Link>, and we will confirm the next available slot.
          </p>

          <div style={{ marginTop: 'clamp(32px, 4vw, 56px)', position: 'relative', minHeight: 'clamp(340px, 44vw, 560px)', border: '1px solid rgba(255,255,255,0.16)', backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '48px 48px', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: '-8%', top: '60%', width: '130%', height: 2, background: 'rgba(255,255,255,0.16)', transform: 'rotate(-13deg)' }} />
            <div style={{ position: 'absolute', left: '-8%', top: '34%', width: '130%', height: 1, background: 'rgba(255,255,255,0.1)', transform: 'rotate(-13deg)' }} />
            <div style={{ position: 'absolute', left: '-8%', top: '78%', width: '130%', height: 1, background: 'rgba(255,255,255,0.1)', transform: 'rotate(-13deg)' }} />
            <div style={{ position: 'absolute', left: '26%', top: '-10%', width: 1, height: '120%', background: 'rgba(255,255,255,0.1)', transform: 'rotate(11deg)' }} />
            <div style={{ position: 'absolute', left: '58%', top: '-10%', width: 1, height: '120%', background: 'rgba(255,255,255,0.1)', transform: 'rotate(11deg)' }} />

            <AreaMarkers featured={featured} />

            <div style={{ position: 'absolute', left: 18, bottom: 16, fontFamily: mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Illustrative city grid &middot; not to scale</div>
          </div>
        </div>
      </section>

      <Reveal style={{ background: c.mist, padding: 'clamp(48px, 7vw, 100px) clamp(16px, 3vw, 44px)' }}>
        <div style={shell}>
          <AreaGrid areas={areas} />
          <p style={{ margin: 'clamp(24px, 3vw, 36px) 0 0', fontSize: 16, color: c.body, lineHeight: 1.6, maxWidth: '60ch' }}>
            Not on the list? We cover the rest of the city too, including Deira, Al Barsha, Silicon Oasis, Motor City and Dubai South.{' '}
            <Link href="/contact" style={{ color: c.bronzeDeep, borderBottom: '1px solid ' + c.bronze }}>Send us your location</Link> and we will confirm.
          </p>
        </div>
      </Reveal>

      <CtaBand title={<>Tell us your area.<br />We&#8217;ll bring the crew.</>} secondary="book" />
      <JsonLd data={collection} />
    </AreaHoverProvider>
  );
}
