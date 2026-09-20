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

**Status values:** `NEEDED` (nothing sourced) · `SOURCING` (candidate under review) · `SELECTED` (image chosen, awaiting alt text) · `DONE` (uploaded, focal point set, alt text written).

### IB-1 · `sofa-wont-fit-through-door-dubai` — Article #7

| | |
|---|---|
| **Article** | Your Sofa Won't Fit Through the Door. Here's What Actually Happens Next |
| **Subject** | A sofa at a genuine constraint — angled through a doorway, or a corner unit separated into sections with the route protected. The frame must show **the tight point**, not a styled living room. |
| **Crop / dimensions** | Landscape ≥1600px wide; doorway and sofa both in frame; subject centred |
| **Sourcing** | **B or C.** Route A required **only if crew are visible in uniform** — a sofa-and-doorway shot without identifiable crew avoids the constraint entirely and is the easier brief. |
| **Provenance / licensing** | Licence verified before upload; attribution in `caption` if required; credits-register entry for any third-party image |
| **Final alt text** | ⛔ **Write after the image is selected and visually inspected.** Must not name company crew unless Route A. |
| **Status** | `NEEDED` |

### IB-2 · `end-of-tenancy-clearance-dubai` — Article #6

| | |
|---|---|
| **Article** | End of Tenancy in Dubai: What Has to Be Gone Before Handover |
| **Subject** | A part-emptied room mid-clearance — some boxes and a few remaining items, clearly in transition. **Not** a styled empty room and **not** a full removals scene. |
| **Crop / dimensions** | Landscape ≥1600px wide; room depth visible; subject centred |
| **Sourcing** | **B or C** — the subject does not imply this business, so sourcing is open. Easiest brief in the backlog. |
| **Provenance / licensing** | As above. Must not depict an identifiable real home or its contents without consent. |
| **Final alt text** | ⛔ Write after selection and inspection. Must not imply a real customer's property or a completed job. |
| **Status** | `NEEDED` |

### IB-3 · `palm-frond-disposal-dubai` — Article #13

| | |
|---|---|
| **Article** | What to Do With Palm Fronds in Dubai |
| **Subject** | Cut fronds piled at a villa gate or driveway, with the access route visible. **The pile and the way out** — not a decorative palm tree, not a landscaper mid-cut (the article's whole point is that we do not cut). |
| **Crop / dimensions** | Landscape ≥1600px wide; pile and approach both in frame |
| **Sourcing** | **B or C.** Subject does not imply the business. Good CC availability likely for palm/garden waste. |
| **Provenance / licensing** | As above. No named community may be stated in alt text unless provenance confirms the location. |
| **Final alt text** | ⛔ Write after selection and inspection. **Must not name a Dubai community** unless the source confirms where it was taken. |
| **Status** | `NEEDED` |

### IB-4 · `junk-gone-today-dubai` — Article #11

| | |
|---|---|
| **Article** | Need It Gone Today? What's Actually Possible in Dubai, and By When |
| **Subject** | A loaded or part-loaded truck at a kerbside mid-route — conveys routing and movement rather than a posed crew. |
| **Crop / dimensions** | Landscape ≥1600px wide; truck and street context; subject centred |
| **Sourcing** | **Route A if the truck carries this company's livery or crew are identifiable.** Otherwise B or C with a generic vehicle. ⚠️ **Hardest brief in the backlog** — a truck shot reads as "our truck" more readily than the other three. If Route A is unavailable, prefer a subject that does not imply ownership (e.g. a loaded flatbed from behind, no branding). |
| **Provenance / licensing** | As above. No third-party number plates legible. |
| **Final alt text** | ⛔ Write after selection and inspection. **Must not imply the vehicle or crew belong to this business** unless Route A. |
| **Status** | `NEEDED` |

---

## Summary

| Metric | Count |
|---|---|
| Articles awaiting a cover | **7** |
| `NEEDED` | 7 |
| `SOURCING` / `SELECTED` / `DONE` | 0 |
| Route D (existing inventory) | **Closed — library is AI-generated** |
| Final alt text written | **0 — correctly deferred in all cases** |

**Fastest path to unblocking publication:** IB-2 and IB-3 have the loosest briefs (no implied business ownership, open sourcing) and should clear first. IB-4 is the hardest and may need Route A or a deliberately non-implying subject.

**I-1 is resolved and Route D is closed** — the existing library is AI-generated. **Route C (licensed stock) is now the practical path**, and it is already permitted by `image.md` §6 for subjects that do not imply this business. All four briefs can be satisfied that way; IB-2 and IB-3 most easily.

### IB-5 · `villa-handover-clearance-dubai` — Article #27

| | |
|---|---|
| **Article** | Villa Handover: What Has to Be Gone Before Inspection |
| **Subject** | A villa interior or driveway mid-clearance — loaded trolley, stacked boxes, a part-emptied room with villa proportions (double height, marble, garden visible). Must read as **scale**, which is the article’s point. |
| **Crop / dimensions** | Landscape ≥1600px; room or driveway depth visible; subject centred |
| **Sourcing** | **Route C.** Subject must not imply this business — no branded vehicle, no identifiable crew in uniform. |
| **Provenance / licensing** | Commercial web licence, proof retained. Must not depict an identifiable real property. |
| **Final alt text** | ⛔ Write after selection and inspection. Must not imply a real customer’s villa or a completed job. |
| **Status** | `NEEDED` |

### IB-6 · `service-lift-booking-dubai` — Article #8

| | |
|---|---|
| **Article** | Service Lift Booking in Dubai Buildings: How It Actually Works |
| **Subject** | A goods/service lift with its interior protected — padded walls or protective boarding, doors open, ideally something bulky waiting. The **protected lift car** is the subject. |
| **Crop / dimensions** | Landscape ≥1600px. ⚠️ Lift interiors are naturally tall and narrow — a landscape frame needs the lobby or corridor in shot too. Hardest composition in the backlog. |
| **Sourcing** | **Route C.** No identifiable crew in uniform. |
| **Provenance / licensing** | Commercial web licence, proof retained. No identifiable building name or unit number. |
| **Final alt text** | ⛔ Write after selection and inspection. **Must not name a building or community** unless the source confirms it. |
| **Status** | `NEEDED` |

### IB-7 · `washing-machine-removal-dubai` — Article #20

| | |
|---|---|
| **Article** | Washing Machine Removal in Dubai: What the Crew Needs to Know First |
| **Subject** | A washing machine pulled out from its recess in a tight laundry or kitchen — hoses visible, the constrained space obvious. **Not** a showroom appliance shot. |
| **Crop / dimensions** | Landscape ≥1600px; machine and surrounding space both in frame |
| **Sourcing** | **Route C.** Easiest of the three — no business implication in the subject. |
| **Provenance / licensing** | Commercial web licence, proof retained. |
| **Final alt text** | ⛔ Write after selection and inspection. |
| **Status** | `NEEDED` |

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
