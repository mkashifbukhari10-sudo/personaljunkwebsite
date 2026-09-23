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

## Completed assets — sourced, verified, uploaded

**Route C (free licensed stock, Unsplash License — commercial use permitted, modification permitted, attribution not required).** Every image below was **visually inspected before use** and its alt text written from what is actually visible. Provenance recorded here because WebP conversion strips embedded metadata.

| Media ID | File | Source | Photo ID | Licence | Used as | Alt text |
|---|---|---|---|---|---|---|
| 69 | `empty-room-before-handover.webp` | Unsplash | `photo-1757742690834-aa581b9f53b2` | Unsplash License | #6 cover + OG | An empty room with a wooden floor and tall windows, cleared except for a small bracket left on the wall. |
| 70 | `cut-palm-fronds-on-the-ground.webp` | Unsplash | `photo-1728011279859-c4b3bc096035` | Unsplash License | #13 cover + OG | A dense pile of cut palm fronds, green fading to yellow at the cut ends. |
| 71 | `palm-tree-being-pruned.webp` | Unsplash | `photo-1781297770538-605dccdc52a7` | Unsplash License | #13 body | A tree worker roped to a palm trunk cutting fronds, with a chainsaw hanging on a rope below him. |
| 72 | `pickup-truck-loaded-with-waste-final.webp` | Unsplash | `photo-1781425009053-2baffa997d8c` | Unsplash License | #11 cover + OG | A white pickup truck at a kerb, its open bed piled high with tied black rubbish bags. |
| 73 | `laundry-room-cover-final.webp` | Unsplash | `photo-1646592474094-342fbc28736c` | Unsplash License | #20 cover + OG | A washer and dryer side by side in a plain utility room, with a sink beside them and hose connections on the wall behind. |

**Processing applied:** covers cropped to 2400×1350 (entropy crop where the original was portrait), body image kept at intrinsic ratio, all converted to **WebP q82**, 150–537KB each. **Media 72 had a legible third-party number plate blurred out** before upload, per `image.md` §12.

**Cover doubles as OG** on all four — the 2400×1350 source crops cleanly to 1200×630, so no duplicate asset was created.

### Generated editorial imagery — 2026-09-21

Created with OpenAI's built-in image-generation tool under `image.md` §7. These are generic, unbranded editorial illustrations; they do not depict Junk Services Dubai, its crew, vehicles, customers or completed work. Every file was visually inspected before upload. Covers were cropped to 1920×1080 WebP; body images retain their generated 1536×1024 ratio.

| File | Used as | Alt text |
|---|---|---|
| `sofa-doorway-cover.webp` | #7 cover + OG | A large beige corner sofa positioned across a narrow apartment doorway. |
| `sofa-route-measurement.webp` | #7 body | A top-down illustration of a sofa and doorway route with measuring tapes and turning arrows. |
| `service-lift-cover.webp` | #8 cover + OG | An open padded goods lift in a modern building with an empty flatbed trolley outside. |
| `service-lift-protection.webp` | #8 body | A goods lift interior protected with blue wall pads and an empty trolley. |
| `villa-handover-cover.webp` | #27 cover + OG | A mostly empty villa living room with a small group of household items ready to be removed. |
| `villa-clearance-groups.webp` | #27 body | Household items grouped beside a clear route through a villa to an open patio. |
| `mattress-disposal-cover.webp` | #9 cover + OG | A used mattress standing upright beside an open bedroom doorway in a bright apartment. |
| `mattress-route-preparation.webp` | #9 body | A covered mattress beside a measured doorway and a clear apartment corridor. |
| `bulky-item-tower-cover.webp` | #14 cover + OG | A large wrapped cabinet on a trolley beside an open padded service lift in an apartment tower corridor. |
| `tower-route-measurement.webp` | #14 body | A top-down apartment route with a cabinet, doorways, corridor turns and lift opening marked by measuring tapes. |
| `old-sofa-delivery-cover.webp` | #17 cover + OG | An old beige sofa prepared for removal beside an open apartment doorway and a cleared living-room space. |
| `sofa-delivery-route.webp` | #17 body | A top-down apartment plan showing a sofa route through a measured doorway and corridor to a lift. |
| `wardrobe-removal-cover.webp` | #21 cover + OG | A large wooden wardrobe protected with padded corners and wrap beside a clear bedroom doorway. |
| `wardrobe-dismantling-plan.webp` | #21 body | Wardrobe doors, shelves, rails, panels and hardware arranged in organised groups on a clean floor. |
| `before-crew-arrives-cover.webp` | #28 cover + OG | Boxes, an old chair, a small appliance and a rolled rug grouped beside a clear path to an open apartment door. |
| `crew-arrival-route-plan.webp` | #28 body | A top-down apartment plan with removal items grouped away from a clear route through open doors to the lift. |
| `skip-hire-comparison-cover.webp` | #29 cover + OG | An empty skip beside a driveway, separated from a grouped sofa, shelving, mattress, rug and bags ready for collection. |
| `skip-direct-load-comparison.webp` | #29 body | A split top-down property plan comparing repeated loading into a skip with direct loading into a collection vehicle. |

---

## Rejected on inspection — not used

Four candidates were downloaded and inspected, then rejected rather than used weakly:

| Candidate | Intended | Why rejected |
|---|---|---|
| Man carrying a striped mattress along a path | #7 cover | Wrong item (mattress, not sofa) and **German street signage** — visibly not Dubai, and the article is about doorways, not outdoor carrying |
| Styled laundry corner with a washing machine | #20 body | **Visible third-party “PlanetCare” branding**, and a styled product shot rather than the tight recess the article describes |
| Lift car interior, stainless doors | #8 cover | **Legible Washington DC regulatory notice and phone number** — a location contradiction and a legible document under §12 |
| Discarded sofa outside a brick building | #7 body | Held — usable, but without a matching cover it would leave the article with a body image and no cover |

---

## Outstanding slots

| Article | Slot | Status |
|---|---|---|
| #7 sofa-wont-fit-through-door | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-21 |
| #8 service-lift-booking | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-21 |
| #27 villa-handover-clearance | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-21 |
| #9 mattress-disposal | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-22 |
| #14 bulky-items-tower | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-22 |
| #17 old-sofa-before-new-delivery | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-22 |
| #21 wardrobe-removal | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-23 |
| #28 before-the-crew-arrives | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-23 |
| #29 skip-hire-vs-junk-removal | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-23 |
| #6 end-of-tenancy | body | `NEEDED` |
| #11 junk-gone-today | body | `NEEDED` |
| #20 washing-machine-removal | body | `NEEDED` |

**These are the slots where generated editorial imagery is now the better route** (`image.md`, *Editorial imagery for articles*) — a sofa wedged in a doorway and a protected goods lift are both specific enough that generic stock keeps failing the relevance test.

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
| 2026-09-23 | Generated, inspected and uploaded cover + body editorial imagery for #21, #28 and #29. Six WebP files recorded above; all generic and unbranded under the approved article-only generation policy. |
| 2026-09-22 | Generated, inspected and uploaded cover + body editorial imagery for #9, #14 and #17. Six WebP files recorded above; all generic and unbranded under the approved article-only generation policy. |
| 2026-09-21 | Generated, inspected and uploaded cover + body editorial imagery for #7, #8 and #27. Six WebP files recorded above; all generic and unbranded under the approved article-only generation policy. |
| 2026-09-20 | Backlog created. IB-1 to IB-4 registered at `NEEDED`. Route D recorded as blocked pending I-1. |
| 2026-09-20 | **I-1 resolved — existing library is AI-generated (C2PA-confirmed). Route D closed permanently unless §7 is amended.** Route C recommended for all four briefs. |
| 2026-09-20 | **Route C confirmed as the active sourcing route** for article covers. IB-AUDIT-1 logged as deferred work: audit of published images and misleading crew alt text. |
| 2026-09-20 | IB-5, IB-6, IB-7 added for articles #27, #8, #20. Backlog now 7 covers outstanding. |
| 2026-09-20 | **Sourcing attempted across five routes; all closed** (Commons DNS-blocked, Openverse 401, stock needs API keys, no generation tool). No unverified asset used. Blocker detail recorded above. |
| 2026-09-20 | Restructured to **cover + OG + body per article** (21 slots). Generated editorial imagery permitted by `image.md`. **Blocker recorded: no image-generation tool and no licensed-stock access in this environment** — all 21 slots remain `NEEDED`. |
