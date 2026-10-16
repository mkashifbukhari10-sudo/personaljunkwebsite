/**
 * The contact form's submit target.
 *
 * `components/contact/QuoteForm.jsx` posts here, and this route emails the
 * pickup request to the business through Resend. The email is the only channel
 * behind the form, so a failure returns an error the form shows to the
 * customer, who can then use the WhatsApp or phone buttons instead.
 *
 * Configuration: RESEND_API_KEY, CONTACT_TO_EMAIL (comma-separated for several
 * inboxes) and CONTACT_FROM_EMAIL (a sender on a domain verified in Resend).
 *
 * Spam: the form carries a honeypot field that real people leave empty, and
 * every value is length-capped below. That stops casual bots, not a determined
 * one. If this endpoint starts attracting volume, put Cloudflare Turnstile in
 * front of it — the fields and limits here do not change.
 */
export const dynamic = 'force-dynamic';

/** Longest value accepted per field, so a bot cannot post a novel into an inbox. */
const LIMITS = { name: 120, phone: 40, area: 120, items: 2000, time: 80 };

function json(body, status) {
  return Response.json(body, { status, headers: { 'cache-control': 'no-store' } });
}

/** Collapse whitespace and cap length; anything that is not a string becomes ''. */
function clean(value, max) {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim().slice(0, max);
}

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const FIELDS = [
  ['Name', 'name'],
  ['Phone', 'phone'],
  ['Area', 'area'],
  ['Preferred time', 'time'],
  ['Items', 'items']
];

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Expected a JSON body.' }, 400);
  }

  // Honeypot: a filled "company" field means a bot. Pretend it worked.
  if (clean(body.company, 200)) return json({ ok: true }, 200);

  const data = {
    name: clean(body.name, LIMITS.name),
    phone: clean(body.phone, LIMITS.phone),
    area: clean(body.area, LIMITS.area),
    items: clean(body.items, LIMITS.items),
    time: clean(body.time, LIMITS.time)
  };

  if (!data.name || !data.phone) {
    return json({ error: 'A name and a phone number are required.' }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = (process.env.CONTACT_TO_EMAIL || '').split(',').map((s) => s.trim()).filter(Boolean);
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to.length || !from) {
    console.error('[quote] email delivery is not configured (RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL)');
    return json({ error: 'Could not send the request.' }, 500);
  }

  const rows = FIELDS.filter(([, key]) => data[key]);
  const text = rows.map(([label, key]) => label + ': ' + data[key]).join('\n');
  const html =
    '<h2 style="margin:0 0 12px">New pickup request</h2><table cellpadding="6" style="border-collapse:collapse">' +
    rows
      .map(([label, key]) => '<tr><td style="color:#555;vertical-align:top"><strong>' + label + '</strong></td><td>' + escapeHtml(data[key]) + '</td></tr>')
      .join('') +
    '</table>';

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: 'Bearer ' + apiKey, 'content-type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        subject: 'Pickup request: ' + data.name + (data.area ? ' (' + data.area + ')' : ''),
        text,
        html
      }),
      signal: AbortSignal.timeout(10000)
    });
    if (!res.ok) throw new Error('Resend HTTP ' + res.status + ': ' + (await res.text()).slice(0, 300));
    const sent = await res.json();
    return json({ ok: true, id: sent.id }, 201);
  } catch (err) {
    console.error('[quote] could not send the request:', err && err.message ? err.message : err);
    return json({ error: 'Could not send the request.' }, 500);
  }
}
