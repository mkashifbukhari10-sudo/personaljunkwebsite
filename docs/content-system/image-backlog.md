# Image Backlog — Junk Services Dubai

**Status:** Live tracking file. One row per article awaiting a cover image.
**Purpose:** A missing cover image must never stall article writing. Articles are written, QA'd and held; the image requirement is tracked here and resolved in parallel.

| File | Role |
|---|---|
| [`image.md`](./image.md) | **The rules** — sourcing, licensing, provenance, honesty, alt text, QA |
| **`image-backlog.md`** (this file) | **The queue** — which articles need what, and where each stands |
| [`article-registry.md`](./article-registry.md) | Article state; D-2 in §7.4 points here |

**Authority:** Subordinate to `image.md`. This file schedules work; it never relaxes a rule.

> ### Active sourcing route: **C — properly licensed stock**
>
> Confirmed 2026-09-20. Until own photography (Route A) exists, article covers are sourced as **properly licensed stock**, under the conditions `image.md` §6 already sets:
>
> - the licence must cover **commercial web use**, and proof is retained
> - the image must **not imply it depicts this business** — not our crew, our customer, our vehicle, our property, or a job we completed
> - **the AI-generated library in `public/images/` is not a source for article covers** (Route D, closed)
> - **final alt text is written only after the selected image has been inspected**, and describes what is visibly there
>
> **A missing cover never stops the next article being written.** Articles are written, QA’d and held at `DRAFTING`; covers are resolved in parallel through this backlog.

---

## Standing rules

Restated only as operating constraints — the reasoning lives in `image.md`.

1. **A missing image blocks publication, not writing.** An article with no cover is complete and held, not unfinished.
2. **Never invent provenance.** If where an image came from cannot be established, it is not used.
3. **Never use competitor images**, search-result images of unknown licence, or anything with an unclear licence.
4. **Final alt text is written only after the actual image is selected and visually inspected.** It describes what is visibly there, and must not imply company crew, a real customer, a completed job or a named location unless provenance supports that claim.
5. **Subject dictates sourcing.** An image that reads as *"this is our crew / our truck / our job"* may only be the business's own photography (`image.md` §7). Where the subject does not imply the business, licensed or Creative Commons sourcing is open.
6. **Every third-party image gets a credits-register entry** and its attribution in the Media `caption` field — EXIF credits are destroyed on upload.
7. **Set the focal point** on every cover. The same file is cropped twice: the page band and the 1200×630 social card.

## Technical spec — all covers

| Property | Requirement |
|---|---|
| Orientation | **Landscape.** Portrait and square are unusable in this slot. |
| Source size | **≥1600px wide; ~2400px on the long edge is ideal** (the pipeline caps at 2400px). |
| Aspect ratio | 16:9 or wider. The page band renders at `clamp(220px, 34vw, 520px)` tall, cover-cropped. |
| Safe area | Subject **horizontally central**; nothing critical near the top or bottom edge. Must survive a 1200×630 crop to the focal point. |
| Text in image | None. |
| File | JPEG or PNG, not pre-crushed. Descriptive filename. |

## Sourcing routes

| Route | When it may be used | Extra requirement |
|---|---|---|
| **A · Own photography** | Always. **Required** where the subject implies this business. | Consent for identifiable people or customer property (`image.md` §12) |
| **B · Creative Commons / public domain** | Where the subject does not imply this business | Licence verified on the source page · attribution in `caption` · credits-register entry. **CC-NC and CC-ND are unusable** — the pipeline re-encodes and crops. |
| **C · Licensed stock** | Where the subject does not imply this business | Licence covering commercial web use · proof retained |
| **D · Approved existing inventory** | ⛔ **CLOSED** — see below | — |

> **Route D is closed. I-1 was resolved on 2026-09-20: the existing library is AI-generated**, confirmed by signed C2PA Content Credentials (OpenAI Media Service API · `gpt-image` v2.0 · `trainedAlgorithmicMedia`). Under `image.md` §7 those images may not depict this business, its crew, its vehicles or its work — which is exactly what an article cover does. **Route D does not reopen unless §7 is deliberately amended, which is a business decision and has not been taken.**
>
> **The Wikimedia Commons area photography is unaffected** and remains genuine licensed material — but it depicts communities, not clearance work, so it does not fit these four briefs.

---

## Backlog

**Every article needs three images:** a **cover**, an **OG/social** image, and at least **one in-content** image with distinct editorial value. Cover and OG may share one asset where the 1200×630 crop genuinely works — do not create a second asset merely to have one.

**Status values:** `NEEDED` · `SOURCING` · `SELECTED` (chosen, awaiting inspection + alt) · `UPLOADED` (in Payload Media, alt written) · `ASSIGNED` (set on the post).

**All 21 slots below are `NEEDED`.** Nothing has been sourced, generated, inspected, uploaded or assigned. See *Blocker* at the foot of this file.

### IB-1 · `sofa-wont-fit-through-door-dubai` — Article #7

| Purpose | Subject brief | Crop | Route | Provenance | Alt text | Payload |
|---|---|---|---|---|---|---|
| **Cover** | A sofa angled in a doorway, wedged at the tight point — the constraint is the subject | Landscape ≥1600px, subject centred, focal point set | C or generated editorial | To record on selection | ⛔ after inspection | `NEEDED` |
| **OG** | May reuse the cover if the 1200×630 focal crop holds | 1200×630 | As cover | As cover | ⛔ after inspection | `NEEDED` |
| **Body** | A diagram-like or clear photo of the three measurements that matter: clear opening, sofa cross-section, corridor turn | Any ratio, ~720px render | C or generated editorial | To record on selection | ⛔ after inspection | `NEEDED` |

### IB-2 · `end-of-tenancy-clearance-dubai` — Article #6

| Purpose | Subject brief | Crop | Route | Provenance | Alt text | Payload |
|---|---|---|---|---|---|---|
| **Cover** | A part-emptied room mid-clearance — boxes and a few remaining items, clearly in transition | Landscape ≥1600px, subject centred, focal point set | C or generated editorial | To record on selection | ⛔ after inspection | `NEEDED` |
| **OG** | May reuse the cover if the 1200×630 focal crop holds | 1200×630 | As cover | As cover | ⛔ after inspection | `NEEDED` |
| **Body** | A storage room or above-wardrobe space still full — the spaces the article says get missed | Any ratio, ~720px render | C or generated editorial | To record on selection | ⛔ after inspection | `NEEDED` |

### IB-3 · `palm-frond-disposal-dubai` — Article #13

| Purpose | Subject brief | Crop | Route | Provenance | Alt text | Payload |
|---|---|---|---|---|---|---|
| **Cover** | Cut fronds piled at a villa gate or driveway with the access route visible | Landscape ≥1600px, subject centred, focal point set | C or generated editorial | To record on selection | ⛔ after inspection | `NEEDED` |
| **OG** | May reuse the cover if the 1200×630 focal crop holds | 1200×630 | As cover | As cover | ⛔ after inspection | `NEEDED` |
| **Body** | An open truck being loaded with green waste — shows why the load travels uncovered | Any ratio, ~720px render | C or generated editorial | To record on selection | ⛔ after inspection | `NEEDED` |

### IB-4 · `junk-gone-today-dubai` — Article #11

| Purpose | Subject brief | Crop | Route | Provenance | Alt text | Payload |
|---|---|---|---|---|---|---|
| **Cover** | A loaded or part-loaded truck kerbside mid-route — routing, not a posed crew | Landscape ≥1600px, subject centred, focal point set | C or generated editorial | To record on selection | ⛔ after inspection | `NEEDED` |
| **OG** | May reuse the cover if the 1200×630 focal crop holds | 1200×630 | As cover | As cover | ⛔ after inspection | `NEEDED` |
| **Body** | A phone showing a photo being sent of items to be collected — the four things to send | Any ratio, ~720px render | C or generated editorial | To record on selection | ⛔ after inspection | `NEEDED` |

### IB-5 · `villa-handover-clearance-dubai` — Article #27

| Purpose | Subject brief | Crop | Route | Provenance | Alt text | Payload |
|---|---|---|---|---|---|---|
| **Cover** | A villa interior or driveway mid-clearance — must read as scale | Landscape ≥1600px, subject centred, focal point set | C or generated editorial | To record on selection | ⛔ after inspection | `NEEDED` |
| **OG** | May reuse the cover if the 1200×630 focal crop holds | 1200×630 | As cover | As cover | ⛔ after inspection | `NEEDED` |
| **Body** | A storage room under stairs, garage corner or roof terrace — a space the article names | Any ratio, ~720px render | C or generated editorial | To record on selection | ⛔ after inspection | `NEEDED` |

### IB-6 · `service-lift-booking-dubai` — Article #8

| Purpose | Subject brief | Crop | Route | Provenance | Alt text | Payload |
|---|---|---|---|---|---|---|
| **Cover** | A goods/service lift with its interior protected, doors open | Landscape ≥1600px, subject centred, focal point set | C or generated editorial | To record on selection | ⛔ after inspection | `NEEDED` |
| **OG** | May reuse the cover if the 1200×630 focal crop holds | 1200×630 | As cover | As cover | ⛔ after inspection | `NEEDED` |
| **Body** | A stairwell landing with a bulky item mid-carry — the no-lift case | Any ratio, ~720px render | C or generated editorial | To record on selection | ⛔ after inspection | `NEEDED` |

### IB-7 · `washing-machine-removal-dubai` — Article #20

| Purpose | Subject brief | Crop | Route | Provenance | Alt text | Payload |
|---|---|---|---|---|---|---|
| **Cover** | A washing machine pulled out from its recess, hoses visible, tight space obvious | Landscape ≥1600px, subject centred, focal point set | C or generated editorial | To record on selection | ⛔ after inspection | `NEEDED` |
| **OG** | May reuse the cover if the 1200×630 focal crop holds | 1200×630 | As cover | As cover | ⛔ after inspection | `NEEDED` |
| **Body** | The disconnection point — supply and waste hoses at the wall | Any ratio, ~720px render | C or generated editorial | To record on selection | ⛔ after inspection | `NEEDED` |

---

## Blocker — no image can currently be produced

**Recorded honestly rather than worked around. All 21 image slots are `NEEDED` and none can be completed in the current setup.**

| Route | Why it is unavailable |
|---|---|
| **A · Own photography** | None exists. Requires a shoot. |
| **B · Creative Commons** | Possible in principle, but each candidate must be licence-verified on its source page and downloaded — and CC imagery of clearance work in interiors is scarce. Not attempted rather than guessed at. |
| **C · Licensed stock** | Requires a stock account and a paid licence. Cannot be acquired here, and an unlicensed download would breach `image.md` §6. |
| **D · Existing inventory** | Closed — AI-generated, barred for business depiction. |
| **Generated editorial imagery** | **Permitted by policy as of 2026-09-20, but there is no image-generation tool available in this environment.** The permission is recorded and ready to use; the capability is absent. |

**What this does and does not block.** It does not block writing — content, claim audit, SEO, internal links, Payload drafts and tracking are all complete for the current batch, and the next batch can proceed. **It does block publication**, because `coverImage` is required by field validation and the three-image requirement is unmet.

**To clear it, one of:** supply real photography · supply licensed stock files · generate the images elsewhere and provide the files · grant an environment with image generation. **Once files exist, upload, alt text, assignment and body insertion are straightforward and can be completed immediately.**

---

## Deferred work

### IB-AUDIT-1 · Audit and correct existing website images and alt text

**Status:** `DEFERRED` — logged 2026-09-20, **not to be actioned now.**

**Scope.** The AI-generated library is already published on the homepage, About page and service pages, where it reads as documentary photography of this business, and some alt text asserts company ownership of the people shown.

**What the audit needs to cover:**

| # | Item |
|---|---|
| 1 | **Misleading alt text.** `scripts/seed-images.ts` line 67 states *“Two uniformed **Junk Services Dubai crew** carrying a wrapped sofa…”* — a claim now known to be false. **Highest priority in this item**; it is a false statement in live page content and is correctable independently of any decision about the images themselves. |
| 2 | **Generic “crew” alt text.** Seven further alts describe *“crew”*, *“three crew”*, *“two crew in green uniforms” etc. On the company’s own site these still read as its crew. Decide whether to reword or replace. |
| 3 | **Published AI imagery.** Homepage, About and the twelve service pages. Options: replace with licensed or own photography, retain with honest framing, or accept knowingly — a business decision, not a documentation one. |
| 4 | **`Logo.png`.** Also carries the OpenAI C2PA credentials. A generated brand mark is a different case from generated documentary photography and is likely acceptable, but should be noted deliberately rather than by omission. |
| 5 | **Seed-script descriptions.** `scripts/seed-images.ts` and `public/images/areas/CREDITS.md` both describe the library as *“the site’s own crew photography”*. Correct once the decision on item 3 is taken. |

**Not in scope of this item:** the 25 Wikimedia Commons area photographs, which are genuine licensed material with verified attribution and are unaffected.

**Dependencies:** requires a business decision on item 3 before items 3 and 5 can complete. Items 1 and 2 can proceed independently. Any change here is a **code change** to `scripts/seed-images.ts` plus a re-run, or direct edits in `/admin`.

**Why deferred:** it does not block article production. Article covers take Route C and are unaffected by the published library.

---

## Change log

| Date | Change |
|---|---|
| 2026-09-20 | Backlog created. IB-1 to IB-4 registered at `NEEDED`. Route D recorded as blocked pending I-1. |
| 2026-09-20 | **I-1 resolved — existing library is AI-generated (C2PA-confirmed). Route D closed permanently unless §7 is amended.** Route C recommended for all four briefs. |
| 2026-09-20 | **Route C confirmed as the active sourcing route** for article covers. IB-AUDIT-1 logged as deferred work: audit of published images and misleading crew alt text. |
| 2026-09-20 | IB-5, IB-6, IB-7 added for articles #27, #8, #20. Backlog now 7 covers outstanding. |
| 2026-09-20 | Restructured to **cover + OG + body per article** (21 slots). Generated editorial imagery permitted by `image.md`. **Blocker recorded: no image-generation tool and no licensed-stock access in this environment** — all 21 slots remain `NEEDED`. |
