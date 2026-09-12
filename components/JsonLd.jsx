/** Renders one or more schema.org objects as a JSON-LD script tag. */
export default function JsonLd({ data }) {
  const items = Array.isArray(data) ? data : [data];
  return items.map((item, i) => (
    <script
      key={i}
      type="application/ld+json"
      // JSON-LD has to be raw text; escape "<" so it can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, '\\u003c') }}
    />
  ));
}
