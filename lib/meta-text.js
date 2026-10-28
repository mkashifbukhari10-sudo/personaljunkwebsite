/**
 * Title and meta-description limits used by every page.
 *
 * The rendered <title> must be the string returned here. Callers pass the
 * keyword phrase they want; nothing appends "| Junk Services Dubai" afterwards.
 */

export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 160;

/** Short phone cue. Added only when the description does not already ask the reader to get in touch. */
const PHONE_CTA = ' Call or WhatsApp +971 55 103 1255.';

/** Area landing titles: "Junk Removal {Area} | Same-Day, Fixed Price", kept within the limit. */
export function areaPageTitle(name) {
  const titled = 'Junk Removal ' + name + ' | Same-Day, Fixed Price';
  return titled.length <= TITLE_MAX ? titled : fitTitle('Junk Removal ' + name);
}

export function fitTitle(input, max = TITLE_MAX) {
  let title = String(input || '').replace(/\s+/g, ' ').trim();
  if (title.length <= max) return title;
  const stripped = title.replace(/\s*[|–—-]\s*Junk Services Dubai\s*$/i, '').trim();
  if (stripped !== title && stripped.length <= max && stripped.length >= 20) return stripped;
  title = stripped;

  const colon = title.indexOf(': ');
  if (colon >= 24 && colon <= max) return title.slice(0, colon).trim();

  const slice = title.slice(0, max + 1);
  const space = slice.lastIndexOf(' ');
  const cut = space >= 24 ? title.slice(0, space) : title.slice(0, max);
  return cut.replace(/[\s|,;:–—-]+$/g, '').trim();
}

function trimTo(text, max) {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const sentence = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('! '), slice.lastIndexOf('? '));
  if (sentence >= Math.min(48, Math.floor(max * 0.45))) return slice.slice(0, sentence + 1).trim();
  const space = slice.lastIndexOf(' ');
  return (space > 24 ? slice.slice(0, space) : slice).replace(/[\s,;:–—-]+$/g, '').trim();
}

function withCue(text) {
  return text.replace(/[\s.]+$/g, '') + '.' + PHONE_CTA;
}

/**
 * Keep a meta description inside 160 characters. Where it still fits, add the
 * phone cue. Descriptions that already mention WhatsApp or the phone number
 * are left as written, then trimmed on a sentence boundary if they are long.
 */
export function fitDescription(input, max = DESCRIPTION_MAX) {
  const text = String(input || '').replace(/\s+/g, ' ').trim();
  if (!text) return text;
  const hasCue = /whatsapp|\+971|call us/i.test(text);
  if (!hasCue) {
    const joined = withCue(text);
    if (joined.length <= max) return joined;
    const room = max - PHONE_CTA.length;
    if (room < 48) return trimTo(text, max);
    return withCue(trimTo(text, room));
  }
  return text.length <= max ? text : trimTo(text, max);
}
