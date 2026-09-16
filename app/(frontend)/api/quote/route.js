/**
 * The contact form's submit target.
 *
 * `components/contact/QuoteForm.jsx` posts here and, independently, hands the
 * same details to WhatsApp. The two are deliberately not chained: WhatsApp is
 * how the business actually replies, so it opens straight from the click while
 * this request stores the lead in Payload. A failure here must never cost the
 * customer their WhatsApp hand-off.
 *
 * The write goes through `overrideAccess: false`, so the `create` rule on the
 * Leads collection is what admits it rather than this file's say-so.
 *
 * Spam: the form carries a honeypot field that real people leave empty, and
 * every value is length-capped below. That stops casual bots, not a determined
 * one. If this endpoint starts attracting volume, put Cloudflare Turnstile in
 * front of it — the fields and limits here do not change.
 */
export const dynamic = 'force-dynamic';

/** Longest value accepted per field, so a bot cannot post a novel into the database. */
const LIMITS = { name: 120, phone: 40, area: 120, items: 2000, time: 80 };

function json(body, status) {
  return Response.json(body, { status, headers: { 'cache-control': 'no-store' } });
}

/** Trim, collapse whitespace and cap length. Returns '' for anything unusable. */
function clean(value, max) {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim().slice(0, max);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Expected a JSON body.' }, 400);
  }

  // Honeypot: hidden from real users, irresistible to bots. Answer 200 so the
  // bot cannot tell it was rejected, but write nothing.
  if (clean(body.company, 200)) return json({ ok: true }, 200);

  const data = {
    name: clean(body.name, LIMITS.name),
    phone: clean(body.phone, LIMITS.phone),
    area: clean(body.area, LIMITS.area),
    items: clean(body.items, LIMITS.items),
    time: clean(body.time, LIMITS.time)
  };

  // The same two fields the form requires before it will submit.
  if (!data.name || !data.phone) {
    return json({ error: 'A name and a phone number are required.' }, 400);
  }

  try {
    const [{ getPayload }, configModule] = await Promise.all([import('payload'), import('@payload-config')]);
    const payload = await getPayload({ config: configModule.default });
    const doc = await payload.create({ collection: 'leads', data, overrideAccess: false });
    return json({ ok: true, id: doc.id }, 201);
  } catch (err) {
    // Logged rather than returned: the customer gets a generic message and
    // their WhatsApp hand-off regardless, and the detail belongs in the logs.
    console.error('[quote] could not store the request:', err && err.message ? err.message : err);
    return json({ error: 'Could not store the request.' }, 500);
  }
}
