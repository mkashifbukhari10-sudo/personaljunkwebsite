# Image Rules — Junk Services Dubai

**Status:** Permanent specification for every image on the site — sourcing, licensing, honesty, alt text, captions, preparation and QA.
**Position in the system:**

| File | Answers |
|---|---|
| [`keywords.md`](./keywords.md) | **What** to target, and **where** it lives |
| [`content-rules.md`](./content-rules.md) | **How** content must be written |
| [`content-structure.md`](./content-structure.md) | **What shape** an article takes |
| **`image.md`** (this file) | **Which images** are used, where they come from, and what they may claim |

**Authority:** Subordinate to all three. `content-structure.md` §12 governs where images sit in an article; this file governs which image goes there and whether it may be used at all. On honesty, `content-rules.md` §6 governs and this file applies it to pictures.
**Verified against:** `src/payload/collections/Media.ts`, `components/Media.jsx`, `lib/images.js`, `lib/content/media.js`, `next.config.mjs`, `payload.config.ts`, `app/og/[key]/route.js`, `public/images/areas/CREDITS.md`, `scripts/seed-images.ts` — as at 2026-09-20.

> **The governing idea.** A photograph makes a claim. A picture of a uniformed crew carrying a sofa out of a Dubai tower says *this is us, this is our work, this happened*. If that is not true, the image is a fabricated claim about the business — and `content-rules.md` §6 forbids those whether they are made in words or in pictures. **Every rule below follows from that.**

---

## §0 · The image pipeline

What actually happens to an uploaded file. All of this is verified in code.

```
 UPLOAD (admin or seed script)
     │  mimeTypes: image/* only
     ▼
 FILENAME SLUGIFIED          "My Photo (1).JPG" → "my-photo-1.jpg"
     │
     ▼
 SHARP RE-ENCODE             resizeOptions: 2400px long edge, fit inside,
     │                       withoutEnlargement
     │                       withMetadata: false  → EXIF and GPS stripped
     ▼
 DERIVATIVE SIZES            thumbnail 400 · card 800 · hero 1600
     │                       og 1200×630 (cover crop to focal point)
     ▼
 STORAGE                     Vercel Blob when BLOB_READ_WRITE_TOKEN is set,
     │                       otherwise local ./media (gitignored, invisible
     │                       to a deployed site)
     ▼
 DELIVERY                    next/image · AVIF/WebP negotiated · quality 82
                             responsive sizes per slot
     ▼
 REVALIDATION                changing a Media record flushes services, areas,
                             posts, settings and /, /services, /areas, /blog, /about
```

**Two consequences worth knowing:**

- **EXIF and GPS are stripped automatically.** A photo taken on a crew member's phone will not leak a customer's location. This is a genuine privacy protection, not a reason to be careless (§12).
- **A local upload is invisible to the deployed site.** If `BLOB_READ_WRITE_TOKEN` is unset, files land in a gitignored directory. Uploading images and then wondering why the live site shows placeholders is the predictable failure.

---

## §1 · Where images appear

| Slot | Source | Required? | Renders as |
|---|---|---|---|
| **Blog cover** | `Posts.coverImage` | **Yes — publication is blocked without one** | Full-width band between hero and body, `clamp(220px, 34vw, 520px)`, cover-cropped |
| **Blog body image** | Lexical `upload` node | No | Figure at ~720px, intrinsic ratio |
| **Service page photo** | `Services.image` | No — falls back to a striped placeholder | Page photography |
| **Area page photo** | `Areas.image` | No — falls back to placeholder | Page photography |
| **Homepage / About slots** | Site settings → Images (8 named slots in `lib/images.js`) | No | Crew, clearance cards, before/after slider |
| **Social card** | The `og` derivative of the page's image, else a generated card | Automatic | 1200×630 |

**The homepage before/after slider needs both `beforeRoom` and `afterRoom` set** — with only one, it falls back to the block illustration.

---

## §2 · Hard technical constraints

`HARD` — enforced by the code. Breaking these means the image fails to upload, fails to render, or is silently blocked by the browser.

| Constraint | Detail |
|---|---|
| **Alt text is required, and cannot be empty** | `alt` is `required: true` on Media. Payload’s text validation rejects `undefined`, `null` **and the empty string**, so `alt=""` cannot be saved. No image can exist without real descriptive alt text (§4). |
| **Cover image required to publish** | Field validation blocks publishing a post without one. |
| **Images must be uploaded, never hotlinked** | `next.config.mjs` `remotePatterns` allows only `**.public.blob.vercel-storage.com`, and the CSP `img-src` allows only `'self'`, `data:`, `blob:` and that host. **An external image URL will not render.** Every image goes through Media. |
| **Raster only, `image/*`** | SVG is technically within `image/*` but is not used for photography and should not be uploaded as content imagery. |
| **Long edge capped at 2400px** | Anything larger is downscaled on upload. Uploading a 6000px original wastes bandwidth for no gain. |
| **Metadata is destroyed** | `withMetadata: false`. Any copyright or credit embedded in EXIF/XMP **will not survive** — attribution must live in the `caption` field (§5). |
| **OG card is a fixed 1200×630 crop** | Cropped to the focal point. An image whose subject sits at an extreme edge will lose it on the social card. |

---

## §3 · The Media record contract

Every upload creates a Media document. Three fields matter.

| Field | Rule |
|---|---|
| **`alt`** | Required. Describes the image for someone who cannot see it. **Never a keyword slot.** §4 |
| **`caption`** | Optional, and **visibly rendered**. This is where licence attribution lives. §5 |
| **Focal point** | Set it on any image whose subject is off-centre. It decides what survives the 1200×630 OG crop and the cover-crop in fixed-height slots. **Setting it takes five seconds and prevents decapitated crops on social cards.** |

**Filenames** are slugified automatically, but upload them already sensible: `villa-clearance-crew-loading.jpg`, not `IMG_4417.JPG`.

- Filenames exist primarily for **asset organisation and maintainability** — finding the right file again in a library of hundreds.
- Use **concise, descriptive, human-readable** names.
- **Do not keyword-stuff a filename**, and do not treat it as an SEO or ranking tactic. There is no filename formula here, and none should be introduced.
- Keep it boring. A name that reads like a sentence of keywords is a maintenance problem and looks engineered.

**Reuse before uploading.** Media is a shared library; the same document can be attached to several pages. Uploading a near-duplicate of an existing photo fragments the library and wastes storage. Search the existing alt text first.

---

## §4 · Alt text

The house standard already exists on this site and is unusually good. Match it.

### The standard

> Describe what is in the photo, specifically, as one sentence, for someone who cannot see it.

**Real examples from the current library** — this is the register to write in:

- *"Two uniformed crew carrying a wrapped sofa out of a glass-fronted Dubai building towards their truck"*
- *"Boxes, a rolled rug, an armchair and a lamp gathered for collection in a high-rise apartment overlooking the Burj Khalifa"*
- *"A worker in a hi-vis vest bundling cut palm fronds and bougainvillea trimmings in a villa driveway while a truck is loaded at the gate"*
- *"The same double-height villa living room empty, with clean marble floors after the clearance"*

Note what these do: **concrete nouns, the action, the setting, and enough detail to picture it.** No keywords, no brand-stuffing, no "junk removal Dubai services".

### Rules

| Do | Don't |
|---|---|
| Describe the actual contents | Insert keywords — `content-rules.md` §10 |
| Name the specific items where they matter | Write "image of…" or "photo of…" (screen readers already announce it) |
| Include setting where it carries meaning | Repeat the caption verbatim |
| Keep it to one sentence, typically under ~125 characters | Write a paragraph |
| Describe every image — see the constraint below | Assume a decorative image can be left undescribed |
| **Describe only what is visibly true** | **Assert who the people are unless that is verified** — see §7 |

### Decorative images and empty alt — not available here

`HARD` — **an empty alt value cannot be saved.** `Media.alt` is `required: true`, and Payload’s text validation rejects `undefined`, `null` **and the empty string** (it fails on `!value` and on `value.length === 0`). So the usual accessibility pattern of `alt=""` for purely decorative imagery **cannot be entered through the admin or the API on this site.**

The render layer is more permissive than the CMS: `toImageProps()` falls back to `alt: doc.alt || ''` and `Media.jsx` passes that to `next/image`, so a record written outside validation would render as `alt=""`. **That path is not reachable through normal editing and must not be treated as a workaround.**

**The correct handling, and it needs no code change:**

1. **Every image carries real descriptive alt text.** There is no exception to write around.
2. **If an image has nothing worth describing, it should not be on the page.** A purely decorative image already fails the test in §8 — *does this show something the words cannot?* The constraint and the editorial policy agree here, which is why no workaround is needed.
3. **Where an image’s meaning is already carried by adjacent text** (a cover image restating the headline, say), write a short factual description of what is actually in the frame. Brief is fine; accurate matters more than exhaustive.

> **Documentation note, not a defect to fix:** the docblock in `lib/images.js` says *"`alt: ''` only for purely decorative art"*. That guidance predates the required-field constraint and is not achievable through the CMS. **No code change is requested** — the field description on the Media collection is already correct, and this file is the operative instruction.

### The honesty constraint on alt text

Alt text is page content. *"Two uniformed **Junk Services Dubai** crew…"* is a factual claim that these are this company's employees doing this company's work. **If the image's provenance does not support that, the alt text must describe what is shown without attributing it** — *"Two uniformed crew carrying a wrapped sofa…"* is accurate and equally useful.

This is not pedantry. It is the same rule that forbids inventing a customer testimonial, applied to the caption under a picture.

---

## §5 · Captions and attribution

**The caption is visibly rendered** — this is the mechanism the site uses to satisfy licence attribution, and it is already in production on all 25 Creative Commons area photos.

### How it renders

| Context | Rendering |
|---|---|
| **Fixed-height slots** (blog cover, page photography) | Small overlay, bottom-right, 10px, translucent dark background |
| **Intrinsic-ratio images** (blog body figures) | Below the image, 13px, 70% opacity |

Markup is a proper `<figure>` / `<figcaption>` pair in both cases.

### Rules

- **Any image requiring attribution must carry it in `caption`.** EXIF credits are destroyed on upload (§2) — the caption is the only place attribution survives.
- **Format, matching the existing library:** `Photo: {Author}, {Licence}, via {Source}` — e.g. *"Photo: Francisco Anzola, CC BY 3.0, via Wikimedia Commons"*.
- **Leave it empty when nothing requires it.** A caption is not a place for marketing copy, a keyword, or a restatement of the alt text.
- **A caption may add information the image cannot carry** — but on this site its primary job is attribution, and it should not be used decoratively.

---

## §6 · Licensing and provenance

**Every image must have a known, documented right to be used.** No exceptions, and "it was on the internet" is not a licence.

### Permitted sources, in order of preference

| # | Source | Requirements |
|---|---|---|
| 1 | **The business's own photography** | Confirmed as genuinely taken by or for the business. Consent where people or customer property are identifiable (§12). |
| 2 | **Creative Commons / public domain** | Licence verified on the source page, attribution in `caption`, entry added to the credits register (§6.1). CC BY, CC BY-SA, CC0 and public domain are all acceptable. **Check the specific file's licence, never assume from the site.** |
| 3 | **Properly licensed stock** | Licence covering commercial web use, retained proof of licence, and **only where the image does not imply it depicts this business** (§7). |

### Prohibited outright

- **Any image taken from a competitor's website**, for any purpose.
- **Search-engine image results** used without tracing and verifying the licence.
- **Screenshots of other companies' sites, listings or marketing.**
- **Government or Municipality photography** reused without a licence that permits it — the fact that a body is public does not make its images free.
- **Brand logos, trademarks or vehicle liveries** that are not this business's own.
- **Images whose licence forbids commercial use** (`NC` variants) or **forbids modification** (`ND` variants) — note the pipeline re-encodes and crops every upload, so `ND` is incompatible by design.
- **Anything with an unclear or unverifiable licence.** If the provenance cannot be established, the image is not used.

### §6.1 · The credits register

`public/images/areas/CREDITS.md` is the existing model and should be treated as the pattern: a table of **page · file · author · licence · source URL**, with a note on any image that shows something adjacent to, rather than exactly, its subject.

**Every third-party image added from here on gets an entry in a credits register**, kept alongside the files it documents. Attribution in the caption satisfies the licence; the register is what lets anyone verify it a year later when the original page has moved.

---

## §7 · Honesty in imagery

**The most important section in this file.** `content-rules.md` §6 forbids manufacturing experience. An image can manufacture experience more convincingly than a sentence, and with less scrutiny.

### What an image must not claim falsely

| The image implies | Permitted only if |
|---|---|
| **"This is our crew"** | It genuinely depicts this business's crew |
| **"This is our truck / our uniform / our branding"** | It genuinely is |
| **"This is a job we completed"** | It genuinely is |
| **"This is a customer's property before and after we cleared it"** | It genuinely is, with consent (§12) |
| **"This is a real place in Dubai"** | It genuinely depicts that place, or the alt text says otherwise |
| **"This is what our results look like"** | It is a real result, not a staged or generated ideal |

### Generated and synthetic imagery

**Do not use AI-generated or otherwise synthetic imagery to depict this business, its crew, its vehicles, its customers, or jobs it has completed.** That is a fabricated claim about the business, and it is the visual equivalent of *"from our years of experience…"* — which `content-rules.md` §6 bans outright.

Generated imagery may have a legitimate narrow role — a diagram, an abstract or clearly illustrative graphic — provided it **does not present itself as documentary photography of this business.** Where there is any doubt about how a reader would read it, don't.

Two practical reasons beyond honesty: synthetic images of real-world signage and text commonly contain garbled artefacts that readers notice, and a business that is visibly depicting fake crews undermines exactly the trust the content strategy is built on.

### The existing library — RESOLVED 2026-09-20: AI-generated

**Determination: the supplied image library is AI-generated, not photography.** This is established from signed provenance data in the files themselves, not inferred.

**Confirmed — the four PNGs carry intact C2PA Content Credentials:**

| Field | Value |
|---|---|
| `claim_generator_info.name` | OpenAI Media Service API |
| `softwareAgent` | `gpt-image` v2.0 |
| `digitalSourceType` | `trainedAlgorithmicMedia` — the IPTC code for media generated by a trained algorithmic model |
| Actions | `c2pa.converted`, `c2pa.watermarked` |
| Dated | 2026-09-14 / 2026-09-15 |

Files: `Appliance Disposal.png`, `Garbage & Waste Removal.png`, `sofa and furtnure removal.png` — and `Logo.png`, which carries the same credentials.

**Strong inference — the fourteen JPEGs are from the same source.** They carry no C2PA (consistent with re-encoding, which strips it), but: **no EXIF or XMP on any file**; dimensions no camera produces (twelve at exactly 2400×1792, one at 2048×2048, one at 2752×1536 — all multiples of 64 or known diffusion output sizes); the same date window; and visible generation artefacts — garbled signage in `Same-Day Pickup.jpg`, illegible ID-badge text in `office strip-out.jpg`. **Treat the whole library as generated unless a specific file is shown otherwise.**

**Consequence under §7:** these images may not be used to depict this business, its crew, its vehicles, its customers or jobs it has completed. That rule is unchanged by this finding — the finding is what the rule was written to catch.

**Two live issues follow, both requiring a decision:**

1. **The images are already published** on the homepage, About page and service pages, where they read as documentary photography of this business.
2. **Alt text asserts company ownership.** `scripts/seed-images.ts` line 67 reads *“Two uniformed **Junk Services Dubai crew** carrying a wrapped sofa…”* — an explicit, and now known to be false, claim. Seven further alts describe *“crew”* generically, which on the company’s own site still reads as its crew.

**The area photography is unaffected.** The 25 Wikimedia Commons images under `public/images/areas/` are genuine licensed photography with verified attribution, and remain fully usable.

### Before/after imagery

Before/after pairs are among the most persuasive assets a clearance business has — and among the easiest to fake. **A before/after pair must be the same real room, genuinely cleared by this business, with the customer's consent.** A staged or generated pair is a fabricated case study.

---

## §8 · Choosing an image

### The test

> **Does this image show something the words cannot?**

If the answer is no, the article is better without it. Decorative stock costs load time, dilutes the page, and signals generic content — the exact impression this content strategy is trying to escape.

### Images that earn their place

- **The access problem** — a tight doorway, a stairwell, a service lift, a gate.
- **The scale of a load** — what a full truck actually looks like.
- **A before/after** — genuinely the strongest asset available, subject to §7.
- **An item in context** — a fridge on a landing, a dismantled wardrobe.
- **The crew working** — where provenance supports it.

### Images that do not

- Generic "happy person in a clean living room" stock.
- Abstract "recycling" or "sustainability" imagery.
- Anything showing a scene that is obviously not Dubai when the article is about Dubai.
- An image chosen because the article "needs one".

### Subject fit

**The image must actually depict its subject.** The existing library contains a documented case of this going wrong: `Same-Day Pickup.jpg` shows a parcel locker, not a junk collection, and was correctly excluded from upload rather than used because the filename matched a slot. **Filename is not evidence of content — look at the image.**

Two files in the library are also named for the wrong slot entirely (`crew at work.jpg` is an office strip-out; `office strip-out.jpg` is two crew at a street pickup). `scripts/seed-images.ts` maps them by content rather than by name, and documents why. **Follow that precedent: map by what the picture shows.**

---

## §9 · Blog cover images

**Required — a post cannot publish without one.**

| Property | Spec |
|---|---|
| **Orientation** | Landscape. The slot is wide and short (`clamp(220px, 34vw, 520px)`), cover-cropped. |
| **Composition** | Subject central or toward the horizontal middle. **Set the focal point** — the same file also becomes the 1200×630 social card. |
| **Avoid** | Important detail near the top or bottom edge; text baked into the image; tall/portrait crops; busy compositions that become unreadable at 220px. |
| **Relevance** | Must relate to the article's actual subject, not its general theme. |
| **Caption** | Only if attribution is required. It renders as a small overlay bottom-right. |
| **Reuse** | Permitted, and sometimes the right call. **Prefer** a distinct, genuinely relevant cover where a suitable asset exists, and avoid obviously repetitive imagery across adjacent Keep Reading cards **when practical**. But see the priority order below — uniqueness is the lowest-ranked consideration. |

---

### Uniqueness is a preference, never a requirement

**No article needs its own unique photograph.** When a suitable distinct image exists, use it — a cluster whose cards all share one thumbnail looks auto-generated. When one does not, the priority order is:

> **Relevance → honesty → provenance and licensing → uniqueness.**

**Reusing a strong, legitimate, genuinely relevant image is better than choosing a weak, misleading, synthetic or irrelevant one merely to make every cover different.** An image chosen for novelty that misrepresents the subject breaks §7 and §8; a repeated image that is accurate breaks nothing. If the only way to make a cover unique would be to reach for stock that implies something untrue, **reuse the honest image.**

---

## §10 · Blog body images

Optional. Placement is governed by `content-structure.md` §12 — **after a paragraph, never immediately after a heading.**

| Property | Spec |
|---|---|
| **Rendering** | Intrinsic aspect ratio at ~720px. Portrait and square both work here, unlike the cover. |
| **Purpose** | Only where the image shows something the prose cannot (§8). |
| **Caption** | Renders below the image at 13px. Use for attribution; otherwise leave empty. |
| **Quantity** | No target. Most articles need none. A long access or process piece may genuinely use two or three. |
| **Never** | Image-only information — anything conveyed solely by a picture is invisible to screen readers and to search. Say it in the text as well. |

---

## §11 · Social cards

Automatic, and worth understanding because it changes how a cover image should be composed.

| Page type | Card |
|---|---|
| **Blog post** | The cover image's `og` derivative (1200×630, cropped to focal point) when present; otherwise a generated card compositing the cover photo under brand text |
| **Service / area** | The document's photo composited into the branded template |
| **Everything else** | The default branded card |

Cards are served from stable URLs (`/og/post-{slug}`), statically generated at build, with unknown keys rendering on demand.

**The practical rule:** a cover image is composed for two crops at once — the wide page band and the 1200×630 card. **Set the focal point and the pipeline handles both.** Without it, faces and subjects get cropped out of social previews, which is where first impressions are made.

---

## §12 · People, property and privacy

The strictest area, because the subjects are real people and real homes.

| Rule | Detail |
|---|---|
| **Customer consent** | Never publish an image of a customer's home, possessions or property without explicit permission. A clearance photo shows how someone lives. |
| **Identifiable people** | No recognisable face is published without consent — crew included. Crew consent should be part of employment, not assumed. |
| **Children** | Never. |
| **Vehicle number plates** | Obscure any plate that is not this business's own. |
| **Building and unit identifiers** | No unit numbers, door numbers, name plates or distinctive interiors that identify a specific household. A tower's exterior is public; a customer's hallway is not. |
| **Documents** | No paperwork, labels, addresses or delivery slips legible in frame. Clearance work is full of these. |
| **Location metadata** | Stripped automatically on upload (§0) — a real protection, but do not rely on it as the only one. |
| **Anything sensitive in a load** | Medical items, personal effects, anything embarrassing: not photographed, not published. |

> **The default is no.** If consent is uncertain, the image is not used. There is always another way to illustrate the point.

---

## §13 · Performance

The pipeline does most of the work; the remaining decisions are yours.

- **Upload a good original** — up to 2400px on the long edge. Larger is downscaled and wastes nothing but your time; much smaller and the derivatives will be soft.
- **Do not pre-compress aggressively.** Sharp re-encodes everything at upload and next/image serves AVIF/WebP at quality 82. Uploading an already-crushed JPEG only stacks artefacts.
- **The blog cover is `priority`** — it loads eagerly as the LCP candidate. That is correct, and it is also why an unnecessarily heavy or badly cropped cover is the one image that measurably hurts the page.
- **Body images are lazy by default.** No action needed.
- **Fewer, better images beat more images.** Every one costs bandwidth on a mobile connection.

---

## §14 · Preparation checklist

Before upload:

1. **Look at the image.** Confirm it shows what you think it shows (§8).
2. **Confirm the right to use it** (§6). Record author, licence and source.
3. **Check for people, plates, documents and identifiers** (§12). Crop or obscure.
4. **Crop for the slot** — landscape for covers; any ratio for body figures.
5. **Resize to ~2400px long edge.** Larger is pointless.
6. **Name the file descriptively.** `marina-tower-service-lift.jpg`, not `IMG_2214.JPG`.
7. **Write the alt text before uploading** (§4) — it is required and should not be improvised in the upload dialog.
8. **Prepare the caption** if attribution is required (§5).
9. **Set the focal point** after upload if the subject is off-centre (§3).
10. **Add the credits-register entry** for any third-party image (§6.1).

---

## §15 · Image QA

Run before publishing anything that contains an image.

### RIGHTS
- [ ] Source and licence known and documented
- [ ] Licence permits commercial use **and** modification (the pipeline crops and re-encodes)
- [ ] Attribution in `caption` where required, in the house format
- [ ] Credits-register entry added for third-party images
- [ ] Not taken from a competitor, a search result, or an unverified source

### HONESTY
- [ ] The image does not falsely imply it shows this business, its crew, its vehicles or its work (§7)
- [ ] **Alt text does not assert who the people are** unless provenance supports it
- [ ] No synthetic imagery presented as documentary photography of this business
- [ ] Any before/after pair is a genuine job, with consent
- [ ] The image actually depicts its subject — checked by looking, not by filename

### PRIVACY
- [ ] No identifiable person without consent; no children
- [ ] No customer property or interior without permission
- [ ] No legible documents, addresses, unit numbers or name plates
- [ ] Third-party number plates obscured

### CRAFT
- [ ] `alt` written to the house standard — descriptive, specific, one sentence, no keywords
- [ ] Focal point set if the subject is off-centre
- [ ] Cover is landscape and survives both the page band and the 1200×630 crop
- [ ] Caption empty unless it carries attribution
- [ ] Filename descriptive and human-readable
- [ ] Long edge ≤2400px; not pre-crushed
- [ ] The image earns its place — it shows something the words cannot (§8)
- [ ] Where a suitable distinct asset exists, the cover is not a duplicate of an adjacent article’s in the same cluster — **a preference, outranked by relevance, honesty and licensing (§9)**

### DELIVERY
- [ ] Uploaded to Media — **not** hotlinked from an external URL (it would not render)
- [ ] `BLOB_READ_WRITE_TOKEN` is set, so the file is visible to the deployed site
- [ ] Checked in draft preview at both mobile and desktop widths

---

## §16 · Open dependencies and conflicts

### I-1 · Provenance of the existing library — **RESOLVED 2026-09-20**

**Answer: AI-generated.** Confirmed by signed C2PA Content Credentials in the four PNGs (OpenAI Media Service API · `gpt-image` v2.0 · `digitalSourceType: trainedAlgorithmicMedia`), and strongly inferred for the fourteen JPEGs from identical date window, absent metadata, non-photographic dimensions and visible generation artefacts. Full evidence in §7.

**This closes the question but does not unlock the library.** Under §7 these images cannot depict this business, its crew, its vehicles or its work — which is what a service-page or article cover photograph does by default. **Route D in the image backlog stays closed.**

**Three decisions now sit with the business** (none taken here — all are strategy, not documentation):

| # | Decision | Notes |
|---|---|---|
| **1** | **The published images.** They are live on the homepage, About and service pages, reading as documentary photography of this business. Replace, caption as illustration, or accept knowingly. | The honesty positioning in `keywords.md` rests on this site being more credible than a field of template-spun competitors. This is the most visible place that claim is kept or broken. |
| **2** | **The alt text.** `scripts/seed-images.ts` line 67 explicitly claims *“Junk Services Dubai crew”*. That claim is now known to be false and should be corrected regardless of decision 1. | A code change; not made here. |
| **3** | **Sourcing route for articles.** Route C (licensed stock) is already permitted by §6 and unblocks the four queued covers immediately. Route A (own photography) is stronger and would also resolve decision 1. | See the backlog. |

**Recommendation:** treat decision 2 as a straightforward correction, and take Route C for article covers now while deciding on 1. A half-day shoot with a real crew would settle all three permanently and produce better assets than either alternative.

### I-2 · Cover images are a per-article dependency

Every published post requires a cover image, so **image sourcing scales with publishing and can become the production bottleneck** — the constraint that decides how much gets published, rather than a detail handled at the end.

**Image supply must support the publishing workflow, not set a target of its own.** The publishing policy is fixed in `content-rules.md` §23 — **up to 3 high-quality articles per day, a ceiling and never a quota** — and nothing about image sourcing changes that. If a suitable, honest, properly licensed cover does not exist for an article, the correct outcome is that the article waits, exactly as it would for a blocked fact or missing business input. **Publishing fewer articles is a valid result; reaching for a misleading image to unblock one is not.**

**Resolve I-1 first.** The answer determines whether there is a usable library at all, or whether photography has to be commissioned before publishing can scale.

### I-3 · No image brief exists for new photography

If real photography is commissioned, a shot list should come from the clusters in `keywords.md` — tower access, service lifts, villa gardens, office strip-outs, before/after pairs, item-level shots (fridge, sofa, mattress, wardrobe). **A half-day with a crew on real jobs would produce more usable assets than any stock library**, and would settle I-1 permanently. Out of scope for this file.

### I-4 · `BLOB_READ_WRITE_TOKEN` must be set

Without it, uploads land in a gitignored local directory and the deployed site shows placeholders. `scripts/seed-images.ts --reupload` exists to migrate existing local uploads to Blob while preserving Media document IDs.

### I-5 · No conflict with the other three files

Checked: `content-structure.md` §12 governs placement and is not duplicated here; `content-rules.md` §6 and §10 govern honesty and keyword usage and are applied here rather than restated; `keywords.md` is untouched by anything in this file. The alt-text policy here matches the one already written in `lib/images.js` and the Media collection's own field description.

---

*End of `image.md`. Read with [`keywords.md`](./keywords.md), [`content-rules.md`](./content-rules.md) and [`content-structure.md`](./content-structure.md).*
