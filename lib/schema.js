import { site, contact, absoluteUrl } from './site';
import { serviceHref, areaHref, postHref } from './hrefs';
import { getServices } from './content/services';
import { getSiteSettings } from './content/settings';

/**
 * Site-wide structured data.
 *
 * Business facts come from the SiteSettings global (plan.md Phase 8) and fall
 * back to lib/site.js. The facts that only the business can supply — street
 * address, geographic coordinates, opening hours, social profiles — are
 * omitted entirely until they are filled in, so nothing is ever invented here.
 */
export async function localBusinessSchema() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': absoluteUrl('/#business'),
    name: settings.siteName,
    url: absoluteUrl('/'),
    image: absoluteUrl('/og/default'),
    description: settings.description,
    telephone: settings.phoneE164,
    foundingDate: settings.foundingYear,
    address: {
      '@type': 'PostalAddress',
      addressLocality: settings.city,
      addressCountry: settings.countryCode,
      ...(settings.address || {})
    },
    areaServed: { '@type': 'City', name: settings.city },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: settings.phoneE164,
      contactType: 'customer service',
      url: settings.whatsapp
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Junk removal services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, description: s.blurb, areaServed: { '@type': 'City', name: settings.city } }
      }))
    }
  };
  if (settings.geo) {
    schema.geo = { '@type': 'GeoCoordinates', latitude: settings.geo.latitude, longitude: settings.geo.longitude };
  }
  if (settings.openingHours.length) {
    schema.openingHoursSpecification = settings.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes
    }));
  }
  if (settings.sameAs.length) schema.sameAs = settings.sameAs;
  return schema;
}

export async function webSiteSchema() {
  const settings = await getSiteSettings();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    name: settings.siteName,
    url: absoluteUrl('/'),
    inLanguage: settings.language,
    publisher: { '@id': absoluteUrl('/#business') }
  };
}

/** Per-service landing page schema. Only fields backed by the approved content are set. */
export function serviceSchema(service) {
  const url = absoluteUrl(serviceHref(service.slug));
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': url + '#service',
    name: service.name,
    serviceType: service.name,
    description: service.seo.description,
    url,
    provider: { '@id': absoluteUrl('/#business') },
    areaServed: { '@type': 'City', name: site.city },
    availableChannel: {
      '@type': 'ServiceChannel',
      name: 'WhatsApp',
      serviceUrl: contact.whatsapp
    }
  };
  if (service.audience === 'business') schema.audience = { '@type': 'BusinessAudience' };
  return schema;
}

/**
 * A blog post. `publisher` points at the one business entity rather than
 * repeating it, and `author` is the Person from the Authors collection.
 * Fields with nothing behind them are left out rather than guessed.
 */
export function blogPostingSchema(post) {
  const url = absoluteUrl(postHref(post.slug));
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url + '#post',
    headline: post.title,
    description: post.seo.description || post.excerpt,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@id': absoluteUrl('/#website') },
    publisher: { '@id': absoluteUrl('/#business') },
    inLanguage: site.language
  };
  if (post.publishedAt) schema.datePublished = post.publishedAt;
  if (post.updatedAt || post.publishedAt) schema.dateModified = post.updatedAt || post.publishedAt;
  if (post.coverImage) schema.image = absoluteUrl(post.coverImage.src);
  if (post.author) {
    const author = { '@type': 'Person', name: post.author.name };
    if (post.author.role) author.jobTitle = post.author.role;
    if (post.author.bio) author.description = post.author.bio;
    if (post.author.sameAs && post.author.sameAs.length) author.sameAs = post.author.sameAs;
    if (post.author.photo) author.image = absoluteUrl(post.author.photo.src);
    schema.author = author;
  }
  if (post.readingTime) schema.timeRequired = 'PT' + post.readingTime + 'M';
  return schema;
}

/** FAQPage for a list of { q, a }. Callers should only use it with >= 2 items. */
export function faqPageSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

/**
 * Per-area landing page schema: the business's service scoped to a Place.
 * Deliberately NOT a second LocalBusiness — there is one business and no
 * per-area premises.
 */
export function areaServiceSchema(area) {
  const url = absoluteUrl(areaHref(area.slug));
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': url + '#service',
    name: 'Junk removal in ' + area.name,
    serviceType: 'Junk removal',
    description: area.seo.description,
    url,
    provider: { '@id': absoluteUrl('/#business') },
    areaServed: { '@type': 'Place', name: area.name, containedInPlace: { '@type': 'City', name: site.city } },
    availableChannel: {
      '@type': 'ServiceChannel',
      name: 'WhatsApp',
      serviceUrl: contact.whatsapp
    }
  };
}

/** /how-it-works: the five process steps. */
export function howToSchema(steps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': absoluteUrl('/how-it-works#howto'),
    name: 'How to book a junk removal pickup with Junkit in Dubai',
    description: 'Send a photo on WhatsApp, get a fixed price, choose a slot and the crew clears it.',
    step: steps.map((st, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: st.title,
      text: st.body,
      url: absoluteUrl('/how-it-works')
    }))
  };
}

/** Generic WebPage subtype for /about and /contact, pointing at the business entity. */
export function webPageSchema(type, { path, name, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': absoluteUrl(path) + '#webpage',
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { '@id': absoluteUrl('/#website') },
    about: { '@id': absoluteUrl('/#business') },
    inLanguage: site.language
  };
}

/** Hub pages (/services, /areas): a CollectionPage whose main entity lists the child pages. */
export function collectionPageSchema({ path, name, description, items }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': absoluteUrl(path) + '#webpage',
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { '@id': absoluteUrl('/#website') },
    about: { '@id': absoluteUrl('/#business') },
    inLanguage: site.language,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
        url: absoluteUrl(it.href)
      }))
    }
  };
}
