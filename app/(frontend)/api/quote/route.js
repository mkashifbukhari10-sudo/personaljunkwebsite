/**
 * The contact form's submit target.
 *
 * `components/contact/QuoteForm.jsx` posts here, and this route emails the
 * pickup request to the business through Resend. The email is the only channel
 * behind the form, so a failure returns an error the form shows to the
 * customer, who can then use the WhatsApp or phone buttons instead.
 *
 * Configuration: RESEND_API_KEY is required. CONTACT_TO_EMAIL (comma-separated
 * for several inboxes) and CONTACT_FROM_EMAIL are optional and default to the
 * owner's inbox and Resend's shared test sender. That sender can only deliver
 * to the Resend account's own address; to send from the business domain or to
 * other inboxes, verify the domain in Resend and set both variables.
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

const DEFAULT_TO = 'mkashifshah10@gmail.com';
const DEFAULT_FROM = 'Junk Services Dubai <onboarding@resend.dev>';

const FIELDS = [
  ['Name', 'name'],
  ['Phone', 'phone'],
  ['Area', 'area'],
  ['Preferred time', 'time'],
  ['Items', 'items']
];

/** The form shrinks photos before sending; this caps what reaches Resend. */
const MAX_PHOTO_BYTES = 4 * 1024 * 1024;

/**
 * The form sends multipart data (fields plus an optional `photo`); plain JSON
 * without a photo is still accepted. Returns the fields and the photo, if any.
 */
async function readRequest(request) {
  const type = request.headers.get('content-type') || '';
  if (type.startsWith('multipart/form-data')) {
    const form = await request.formData();
    const body = {};
    for (const key of ['name', 'phone', 'area', 'items', 'time', 'company']) {
      const value = form.get(key);
      if (typeof value === 'string') body[key] = value;
    }
    const photo = form.get('photo');
    return { body, photo: photo && typeof photo === 'object' && photo.size > 0 ? photo : null };
  }
  return { body: await request.json(), photo: null };
}

export async function POST(request) {
  let body;
  let photo;
  try {
    ({ body, photo } = await readRequest(request));
  } catch {
    return json({ error: 'Expected form data or a JSON body.' }, 400);
  }
  if (photo && (!String(photo.type).startsWith('image/') || photo.size > MAX_PHOTO_BYTES)) {
    return json({ error: 'The photo must be an image under 4 MB.' }, 400);
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
  const to = (process.env.CONTACT_TO_EMAIL || DEFAULT_TO).split(',').map((s) => s.trim()).filter(Boolean);
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;
  if (!apiKey) {
    console.error('[quote] email delivery is not configured: RESEND_API_KEY is not set');
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
        text: text + (photo ? '\n\nPhoto attached.' : ''),
        html: html + (photo ? '<p style="color:#555">Photo attached.</p>' : ''),
        ...(photo
          ? {
              attachments: [
                {
                  filename: String(photo.name || 'photo.jpg').replace(/[^\w.-]+/g, '_').slice(0, 100) || 'photo.jpg',
                  content: Buffer.from(await photo.arrayBuffer()).toString('base64')
                }
              ]
            }
          : {})
      }),
      signal: AbortSignal.timeout(15000)
    });
    if (!res.ok) throw new Error('Resend HTTP ' + res.status + ': ' + (await res.text()).slice(0, 300));
    const sent = await res.json();
    return json({ ok: true, id: sent.id }, 201);
  } catch (err) {
    console.error('[quote] could not send the request:', err && err.message ? err.message : err);
    return json({ error: 'Could not send the request.' }, 500);
  }
}
