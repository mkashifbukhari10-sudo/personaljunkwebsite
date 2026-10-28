import { c, mono } from '@/lib/theme';

/**
 * Trust facts from the business config. Renders nothing until the owner
 * supplies real values. Never shows a rating, review, licence or address
 * that is not in that config.
 */
function formatAddress(address) {
  return [address.streetAddress, address.addressLocality, address.addressRegion, address.postalCode, address.addressCountry]
    .filter(Boolean)
    .join(', ');
}

export default function TrustSignals({ settings, onDark = false }) {
  if (!settings) return null;
  const labelColor = onDark ? 'rgba(255,255,255,0.56)' : c.bronzeDeep;
  const textColor = onDark ? 'rgba(255,255,255,0.88)' : 'inherit';
  const rows = [];
  if (settings.rating) {
    rows.push({ label: 'Google rating', value: settings.rating.value + ' from ' + settings.rating.count + ' reviews' });
  }
  if (settings.tradeLicence) rows.push({ label: 'Trade licence', value: settings.tradeLicence });
  if (settings.address && settings.address.streetAddress) rows.push({ label: 'Address', value: formatAddress(settings.address) });
  if (settings.googleBusinessProfile) {
    rows.push({ label: 'Google Business Profile', value: 'View profile', href: settings.googleBusinessProfile });
  }
  const reviews = settings.reviews || [];
  if (!rows.length && !reviews.length) return null;

  return (
    <section aria-label="Business details" style={{ marginTop: 28, display: 'grid', gap: 14, maxWidth: '46ch' }}>
      {rows.length ? (
        <dl style={{ margin: 0, display: 'grid', gap: 10 }}>
          {rows.map((row) => (
            <div key={row.label}>
              <dt style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: labelColor }}>{row.label}</dt>
              <dd style={{ margin: '4px 0 0', fontSize: 15, lineHeight: 1.5, color: textColor }}>
                {row.href ? (
                  <a href={row.href} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', borderBottom: '1px solid ' + c.bronze }}>
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
      {reviews.length ? (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12 }}>
          {reviews.map((review) => (
            <li key={review.author + review.body.slice(0, 24)} style={{ fontSize: 15, lineHeight: 1.55, color: textColor }}>
              <blockquote style={{ margin: 0 }}>&ldquo;{review.body}&rdquo;</blockquote>
              <div style={{ marginTop: 4, fontFamily: mono, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {review.author}
                {review.date ? ' · ' + review.date : ''}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
