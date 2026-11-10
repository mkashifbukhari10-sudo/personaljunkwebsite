# Article Registry — Junk Services Dubai

**Status:** The **live state record** of every article. This is the only file in the content system that changes on every article, and it must be updated as part of publishing — not afterwards.
**Position in the system:**

| File | Answers | Changes |
|---|---|---|
| [`keywords.md`](./keywords.md) | **What** to target, and **where** it lives | Rarely, and under control |
| [`content-rules.md`](./content-rules.md) | **How** content must be written | Rarely |
| [`content-structure.md`](./content-structure.md) | **What shape** an article takes | Rarely |
| [`image.md`](./image.md) | **Which images** may be used | Rarely |
| **`article-registry.md`** (this file) | **What actually exists**, what it owns, and what state it is in | **Every article** |

**Authority:** Subordinate to all four. The registry records decisions; it does not make them. If the registry and `keywords.md` disagree about ownership, `keywords.md` is right and the registry is out of date — **fix the registry.**

**Current state as at 2026-11-10:** **124 published repository articles, all with at least 2,000 body words.** F23, A36, C28 and C29 are dated 2026-11-07. C30 and E33 are dated 2026-11-08 and set to `PUBLISHED` after the owner said “Merge and live” at 23:24 Asia/Karachi. E34 and A37 are dated 2026-11-10 and set to `PUBLISHED` after the owner said “Merge and live”. F24 and H28 are dated 2026-11-10 and set to `PUBLISHED` after the owner said “Merge and live”. Production has not been verified in this record. G24, K21, G25, K20, M29 and M30 stayed unpublished. G26 and M28 stayed out of scope. Existing inspected imagery is reused.

---

## §0 · What this file is for

Four other files tell you how to make an article. **This one tells you what already exists** — which is the question that actually prevents the two failures that kill content programmes at scale.

| Job | Why it needs a ledger |
|---|---|
| **1. Cannibalization guard** | By article 40, nobody remembers what article 12 claimed. The **Claimed Keyword Index (§5)** is the single place to check before commissioning anything. |
| **2. Orphan prevention** | `content-rules.md` §13 requires every article to have an inbound link. The **Reverse-Link Ledger (§6)** is where that gets recorded, and where missing ones become visible. |
| **3. Status tracking** | 19 of the 45 mapped opportunities are blocked. **§7** tracks what unblocks each one, so work can be batched instead of rediscovered per article. |
| **4. Audit trail** | When a ranking moves, or two URLs start competing, the registry is what lets you reconstruct what changed and when. |

**It is a ledger, not a rulebook.** Nothing here overrides the other four files, and no editorial or SEO policy is restated.

### When to touch it

| Moment | Action |
|---|---|
| **Before commissioning** | Check §5 for a conflicting claim. Check §4 for the entry and its status. |
| **At commissioning** | Create the article’s record in §3 with state `DRAFTING`, and mark its §4 queue row as commissioned. **A §3 record does not imply anything is live.** |
| **At publish** | Set the §3 record to `PUBLISHED` and fill its **Published** date, add the primary keyword to §5.2, record the inbound link in §6.1. |
| **When a block clears** | Update §7 and the article's status. Note it in §12. |
| **On any later change** | Update the affected rows and log it in §12. |

> **An article is not "done" until its registry rows exist.** Publishing without registering is how the index silently stops being true — and an untrue index is worse than none, because it gets trusted.

---

## §1 · Registry schema

Field definitions for the Article records table (§3). Keep the column order stable.

| Field | Meaning |
|---|---|
| **ID** | The `keywords.md` Article Opportunity Map number where one exists, or `N-{n}` for an article admitted later via the expansion process. Never reused. |
| **Slug** | The published URL segment. `/blog/{slug}`. |
| **Title** | The live H1. Update if it changes. |
| **Primary keyword** | The one keyword this URL owns. **Must match the claim in §5 exactly.** |
| **Cluster** | SC1–SC6, from `keywords.md`. |
| **Archetype** | A–H, from `content-structure.md` §10. |
| **Money page** | The single primary, as set in `relatedServices`. |
| **Related areas** | From `relatedAreas`. Usually empty. |
| **State** | See §2. A record exists from `DRAFTING` onward — **it does not mean the article is live.** Only `PUBLISHED` and `UPDATED` correspond to a public URL. |
| **Published** | Date of first publish. **Empty until the article actually publishes** — it stays empty through `DRAFTING` and `REVIEW`. |
| **Last reviewed** | Date of the last substantive check — content, facts or links. Empty until first publish. |
| **Facts** | `none` · `sourced` · `business` — whether the article rests on external facts, and whether they were verified. Drives the re-check schedule (§9). |
| **Inbound** | The page providing the required inbound link (§6). Must be filled **by publish**; may be empty while `DRAFTING`. |
| **Notes** | Anything a future reader needs — a merge, a redirect, a pending correction. |

---

## §2 · Article lifecycle

```
  QUEUED ──────► CLEARED ──────► DRAFTING ──────► REVIEW ──────► PUBLISHED
    │               │                                               │
    │               │                                               ├──► UPDATED
    │               │                                               │    (re-reviewed, still live)
    │               │                                               │
    │               │                                               ├──► MERGED
    │               │                                               │    (folded into another URL, redirected)
    │               │                                               │
    │               │                                               └──► RETIRED
    │               │                                                    (removed, redirected)
    │               │
    └──► BLOCKED ───┘                        └──► DROPPED
         (waiting on facts,                       (failed a gate; reason recorded)
          business input or
          capability confirmation)
```

| State | Meaning | Exit condition |
|---|---|---|
| **QUEUED** | Mapped in `keywords.md`, not started. | Status clears and a slot opens. |
| **BLOCKED** | Waiting on source verification, business input or capability confirmation (§7). | The input genuinely arrives. **Never cleared by rewriting around the gap** — `content-rules.md` §8. |
| **CLEARED** | All eight gates in `content-rules.md` §23 pass. Ready to draft. | Drafting starts. |
| **DRAFTING** | Being written. | Draft complete. |
| **REVIEW** | Draft preview checked against the QA lists in `content-rules.md` §24, `content-structure.md` §16 and `image.md` §15. | All three pass. |
| **PUBLISHED** | Live. Registered in §3, §5 and §6. | — |
| **UPDATED** | Live and substantively revised since publish. | — |
| **MERGED** | Folded into another URL; old slug redirects. | — |
| **RETIRED** | Removed; slug redirects. | — |
| **DROPPED** | Never published. **Record why** — a dropped topic that nobody remembers rejecting gets proposed again. | — |

---

## §3 · Active article records

**One record per article, from the moment drafting begins until it is retired.** A record here does **not** mean the article is live — the **State** column says whether it is.

| State in this table | Publicly live? | Published date |
|---|---|---|
| `DRAFTING` · `REVIEW` | **No** — draft only, not indexed | Empty |
| `PUBLISHED` · `UPDATED` | **Yes** — must resolve at `/blog/{slug}` | Set |
| `MERGED` · `RETIRED` | **No** — the old slug must redirect (§8) | Kept, as history |

**124 published records as of 2026-11-10.** F23, A36, C28 and C29 are the repository posts dated 2026-11-07. C30 and E33 are `PUBLISHED` repository posts dated 2026-11-08, with §5.2 claims. E34 and A37 are `PUBLISHED` repository posts dated 2026-11-10, with §5.2 claims. F24 and H28 are `PUBLISHED` repository posts dated 2026-11-10, with §5.2 claims. Production has not been verified in this record. G24, K21, G25, K20, M29 and M30 remain unpublished. G26 and M28 remain out of scope.

| ID | Slug | Title | Primary keyword | Cluster | Archetype | Money page | Areas | State | Published | Last reviewed | Facts | Inbound | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 6 | `end-of-tenancy-clearance-dubai` | End of Tenancy in Dubai: What Has to Be Gone Before Handover | end of tenancy clearance dubai | SC3 | F | `house-clearance` | — | `UPDATED` | 2026-09-20 | 2026-11-02 | none | `/blog/washing-machine-removal-dubai` | 2233 body words; cover and metadata preserved. 2026-11-01: signpost to M31 where a municipal window finishes after the keys. 2026-11-02: signpost to H25 when one occupant left and the lease continues. |
| 13 | `palm-frond-disposal-dubai` | What to Do With Palm Fronds in Dubai | palm frond removal dubai | SC1 | A | `garden-waste-removal` | — | `UPDATED` | 2026-09-20 | 2026-09-21 | sourced | `/blog/end-of-tenancy-clearance-dubai` | 2403 body words; cover and metadata preserved. |
| 11 | `junk-gone-today-dubai` | Need It Gone Today? What’s Actually Possible in Dubai, and By When | need junk gone today dubai | SC3 | E | `same-day-junk-removal` | — | `UPDATED` | 2026-09-20 | 2026-09-21 | none | `/blog/washing-machine-removal-dubai` | 2323 body words; cover and metadata preserved. |
| 20 | `washing-machine-removal-dubai` | Washing Machine Removal in Dubai: What the Crew Needs to Know First | washing machine removal dubai | SC1 | A | `appliance-disposal` | — | `UPDATED` | 2026-09-20 | 2026-09-21 | sourced | `/blog/end-of-tenancy-clearance-dubai` | 2362 body words; cover and metadata preserved. |
| 7 | `sofa-wont-fit-through-door-dubai` | Your Sofa Won't Fit Through the Door. Here's What Actually Happens Next | sofa won't fit through door dubai | SC1 | G | `sofa-removal` | — | `PUBLISHED` | 2026-09-21 | 2026-09-21 | none | `/blog/service-lift-booking-dubai` | 2022 body words; generated cover + body illustration. |
| 8 | `service-lift-booking-dubai` | Service Lift Booking in Dubai Buildings: How It Actually Works | junk removal service lift dubai | SC4 | G | `residential-junk-removal` | — | `PUBLISHED` | 2026-09-21 | 2026-09-21 | none | `/blog/sofa-wont-fit-through-door-dubai` | 2090 body words; generated cover + body illustration. |
| 27 | `villa-handover-clearance-dubai` | Villa Handover: What Has to Be Gone Before Inspection | villa handover clearance dubai | SC3 | F | `villa-clearance` | — | `UPDATED` | 2026-09-21 | 2026-09-28 | none | `/blog/end-of-tenancy-clearance-dubai` | 2135 body words; generated cover + body illustration; added contextual link to #37. |
| 9 | `mattress-disposal-dubai` | Mattress Disposal in Dubai: Plan the Whole Route | mattress removal dubai | SC1 | A | `furniture-removal` | — | `PUBLISHED` | 2026-09-22 | 2026-09-22 | none | `/blog/old-sofa-before-new-delivery-dubai` | 2217 body words; generated cover + body illustration. |
| 14 | `bulky-items-tower-dubai` | Getting Bulky Items Out of a Dubai Tower | getting bulky items out of a tower dubai | SC4 | G | `residential-junk-removal` | — | `PUBLISHED` | 2026-09-22 | 2026-09-22 | none | `/blog/old-sofa-before-new-delivery-dubai` | 2132 body words; generated cover + body illustration. |
| 17 | `old-sofa-before-new-delivery-dubai` | Remove the Old Sofa Before the New One Arrives | remove old sofa before new delivery dubai | SC1 | G | `sofa-removal` | — | `PUBLISHED` | 2026-09-22 | 2026-09-22 | none | `/blog/mattress-disposal-dubai` | 2249 body words; generated cover + body illustration. |
| 21 | `wardrobe-removal-dubai` | Wardrobe Removal in Dubai: Dismantle or Move It Whole? | wardrobe removal dubai | SC1 | A | `furniture-removal` | — | `PUBLISHED` | 2026-09-23 | 2026-09-23 | none | `/blog/before-the-crew-arrives-dubai` | 2114 body words; generated cover + body illustration. |
| 28 | `before-the-crew-arrives-dubai` | Before the Junk Removal Crew Arrives: A Practical Checklist | what to do before junk removal arrives dubai | SC5 | G | `how-it-works` | — | `PUBLISHED` | 2026-09-23 | 2026-09-23 | none | `/blog/wardrobe-removal-dubai` | 2128 body words; generated cover + body illustration. |
| 29 | `skip-hire-vs-junk-removal-dubai` | Skip Hire or Junk Removal? Choose the Right Setup | skip hire alternative dubai | SC5 | G | `waste-removal` | — | `PUBLISHED` | 2026-09-23 | 2026-09-23 | none | `/blog/before-the-crew-arrives-dubai` | 2354 body words; generated cover + body illustration. |
| 31 | `office-strip-out-dubai` | Office Strip-Out in Dubai: Clear a Floor Without Disruption | office strip out clearance dubai | SC6 | H | `commercial-junk-removal` | — | `UPDATED` | 2026-09-28 | 2026-10-05 | none | `/blog/warehouse-clearance-dubai` | 2200 body words; generated cover + body illustration; added contextual link to #34. |
| 33 | `warehouse-clearance-dubai` | Warehouse Clear-Outs: Plan Around Stock and Access | warehouse clearance dubai | SC6 | H | `commercial-junk-removal` | — | `PUBLISHED` | 2026-09-28 | 2026-09-28 | none | `/blog/office-strip-out-dubai` | 2150 body words; generated cover + body illustration. |
| 37 | `gated-community-clearance-dubai` | Gated Communities: Access, Permits and Timing for a Clearance | gated community clearance access dubai | SC4 | G | `villa-clearance` | — | `PUBLISHED` | 2026-09-28 | 2026-09-28 | none | `/blog/villa-handover-clearance-dubai` | 2003 body words; generated cover + body illustration. |
| 41 | `estate-clearance-dubai` | Clearing a Home After a Bereavement: A Respectful Plan | estate clearance dubai | SC3 | F | `villa-clearance` | — | `PUBLISHED` | 2026-09-29 | 2026-09-29 | none | `/blog/choosing-junk-removal-dubai` | 2007 body words; generated cover + body illustration. |
| 42 | `flatpack-furniture-disposal-dubai` | Flat-Pack Furniture: Will It Survive Another Move? | IKEA furniture disposal dubai | SC1 | A | `furniture-removal` | — | `PUBLISHED` | 2026-09-29 | 2026-09-29 | none | `/blog/estate-clearance-dubai` | 2094 body words; generated cover + body illustration. |
| 45 | `choosing-junk-removal-dubai` | How to Choose a Junk Removal Company in Dubai | junk removal companies in dubai | SC5 | D | `/` | — | `PUBLISHED` | 2026-09-29 | 2026-09-29 | none | `/blog/flatpack-furniture-disposal-dubai` | 2257 body words; generated cover + body illustration. |
| 1 | `dispose-old-furniture-dubai` | How to Dispose of Old Furniture in Dubai | how to dispose of old furniture in dubai | SC1 | A | `furniture-removal` | — | `PUBLISHED` | 2026-09-30 | 2026-09-30 | sourced | `/blog/dubai-municipality-bulky-waste` | 2050 body words; generated cover + body illustration. |
| 2 | `dispose-fridge-dubai` | How to Dispose of a Fridge in Dubai | how to dispose of a fridge in dubai | SC2 | A+B | `appliance-disposal` | — | `PUBLISHED` | 2026-09-30 | 2026-09-30 | sourced | `/blog/dubai-municipality-bulky-waste` | 2048 body words; generated cover + body illustration. |
| 4 | `dubai-municipality-bulky-waste` | How Dubai Municipality Bulky Waste Collection Works | dubai municipality bulky waste collection | SC2 | B | `junk-removal` | — | `PUBLISHED` | 2026-09-30 | 2026-11-01 | sourced | `/blog/dispose-old-furniture-dubai` | 2029 body words; generated cover + body illustration. SEO title is “Bulky Waste Collection: Municipality Guide”. Eligibility sentences were not rewritten. 2026-11-01: signpost to M31. Directory summary re-read the same day; the eligibility wording on this page was left as published. |
| 5 | `municipality-vs-paid-junk-removal-dubai` | Free Municipality Collection or a Paid Crew? A Straight Comparison | junk removal vs municipality collection dubai | SC2 | D | `junk-removal` | — | `PUBLISHED` | 2026-10-01 | 2026-10-01 | sourced | `/blog/free-junk-removal-dubai-truth` | 2146 body words; reused existing cover (#4) + body (#45) media. |
| 30 | `free-junk-removal-dubai-truth` | “Free Junk Removal” in Dubai: What’s Genuinely Free and What Isn’t | free junk removal dubai | SC2 | D | `junk-removal` | — | `PUBLISHED` | 2026-10-01 | 2026-10-01 | sourced | `/blog/municipality-vs-paid-junk-removal-dubai` | 2055 body words; reused existing cover (#28) + body (#1) media. No charity named — charity collection details could not be verified on the charities’ own sites. |
| 38 | `e-waste-disposal-dubai` | E-Waste Disposal in Dubai: The Rules and the Routes | e waste disposal dubai | SC2 | B | `appliance-disposal` | — | `PUBLISHED` | 2026-10-02 | 2026-10-02 | sourced | `/blog/what-dubai-bins-wont-take` | 2066 body words; reused existing cover (#4) + body (#41) media. |
| 44 | `what-dubai-bins-wont-take` | What You Can’t Put in a Dubai Bin | what can't you throw in dubai bins | SC2 | B | `junk-removal` | — | `PUBLISHED` | 2026-10-02 | 2026-10-02 | sourced | `/blog/e-waste-disposal-dubai` | 2046 body words; reused existing Unsplash cover (#11, Media 72) + body (#4) media. |
| 19 | `old-ac-unit-disposal-dubai` | Getting Rid of an Old AC Unit in Dubai | AC unit removal dubai | SC1 | A+B | `appliance-disposal` | — | `PUBLISHED` | 2026-10-02 | 2026-10-02 | sourced | `/blog/e-waste-disposal-dubai` | 2034 body words; reused existing cover (#2 refrigerator — no AC image exists) + body (#8) media. Does not claim the crew disconnects refrigerant (business input still open). |
| 10 | `illegal-dumping-fines-dubai` | Fines for Dumping Furniture in Dubai: What the Law Says | fine for dumping furniture dubai | SC2 | B | `junk-removal` | — | `PUBLISHED` | 2026-10-01 | 2026-10-01 | sourced | `/blog/municipality-vs-paid-junk-removal-dubai` | 2049 body words; reused existing cover (#37) + body (#4) media. States the statutory cap and doubling only; no per-item fine quoted. |
| 15 | `noc-moving-furniture-dubai` | Do You Need an NOC to Move Furniture Out in Dubai? | NOC to move furniture dubai | SC4 | G | `residential-junk-removal` | — | `PUBLISHED` | 2026-10-03 | 2026-10-03 | sourced | `/blog/leaving-dubai-clearance-checklist` | 2680 body words; generated cover + body illustration. |
| 24 | `deposit-deductions-left-furniture-dubai` | Can a Landlord Deduct Your Deposit for Furniture You Left Behind? | will landlord deduct deposit for furniture left dubai | SC3 | F | `house-clearance` | — | `PUBLISHED` | 2026-10-03 | 2026-11-02 | sourced | `/blog/noc-moving-furniture-dubai` | 2386 body words; generated cover + body illustration. 2026-11-02: signpost to H25 when one occupant left and the tenancy is still running. |
| 43 | `leaving-dubai-clearance-checklist` | Leaving Dubai: The Clearance Part of the Checklist | moving out of dubai checklist | SC3 | F | `house-clearance` | — | `PUBLISHED` | 2026-10-03 | 2026-10-03 | sourced | `/blog/deposit-deductions-left-furniture-dubai` | 2360 body words; generated cover + body illustration. |
| 18 | `what-we-take-dubai` | What We Take, What We Don’t, and Why: Dubai Junk Removal Acceptance Guide | what junk removal companies take dubai | SC5 | B | `junk-removal` | — | `PUBLISHED` | 2026-10-04 | 2026-10-04 | business | `/blog/junk-removal-cost-dubai` | 3957 body words; generated cover + body illustration. |
| 25 | `how-much-fits-in-one-load-dubai` | How Much Fits in One Load? Estimating Junk Removal Truck Space in Dubai | how much junk fits in one truck dubai | SC5 | G | `how-it-works` | — | `PUBLISHED` | 2026-10-04 | 2026-10-04 | business | `/blog/what-we-take-dubai` | 3212 body words; generated cover + body illustration. |
| 3 | `junk-removal-cost-dubai` | What Junk Removal Costs in Dubai: Pricing Factors and How Quotes Work | junk removal cost dubai | SC5 | C | `how-it-works` | — | `PUBLISHED` | 2026-10-04 | 2026-10-04 | business | `/blog/how-much-fits-in-one-load-dubai` | 3117 body words; generated cover + body illustration. |
| 34 | `out-of-hours-clearance-dubai` | Why Offices Book Clearances for Nights and Weekends | out of hours clearance dubai | SC6 | H | `commercial-junk-removal` | — | `PUBLISHED` | 2026-10-05 | 2026-10-05 | business | `/blog/office-strip-out-dubai` | 2432 body words; reused existing cover (#31, Media 92) + body (#33, Media 95). Availability claims limited to existing site copy (out of hours available for commercial work; pickups 7 days). |
| 36 | `how-long-villa-clearance-dubai` | How Long Does a Villa Clearance Actually Take? | how long does a villa clearance take dubai | SC3 | F | `villa-clearance` | — | `PUBLISHED` | 2026-10-05 | 2026-10-05 | business | `/blog/soil-sand-pots-disposal-dubai` | 2129 body words; reused existing cover (#25, Media 118) + body (#37, Media 97). Duration stated only as the site's existing range (half a day to two days, 4+ crew, multiple loads); no per-job durations invented. |
| 40 | `soil-sand-pots-disposal-dubai` | Soil, Sand and Pots: The Garden Waste People Forget to Plan For | soil removal dubai | SC1 | A | `garden-waste-removal` | — | `PUBLISHED` | 2026-10-05 | 2026-10-05 | sourced | `/blog/how-long-villa-clearance-dubai` | 2126 body words; reused existing cover (#27 body, Media 79) + body (#29, Media 91). Added contextual link to #26. Cites DM Waste Segregation Guide and Technical Guideline No. 5 (§7.1). |
| 12 | `donate-furniture-dubai` | Where to Donate Furniture in Dubai: What Can Be Passed On | where to donate furniture in dubai | SC1 | A+D | `furniture-removal` | — | `PUBLISHED` | 2026-10-06 | 2026-10-06 | sourced | `/blog/dispose-old-furniture-dubai` | 3040 body words; reused existing cover (#1, Media 114) + body (#1, Media 115) media. Direct reuse criteria, charity operational boundaries and non-donatable items. |
| 16 | `what-happens-to-your-junk-dubai` | What Actually Happens to Your Junk After We Take It | where does junk go after removal dubai | SC2 | B | `junk-removal` | — | `PUBLISHED` | 2026-10-06 | 2026-10-06 | sourced | `/blog/what-dubai-bins-wont-take` | 2918 body words; reused existing cover (#18, Media 127) + body (#18, Media 128) media. Full disposal chain grounded in Law No. (18) of 2024, material segregation, and municipal transfer facilities. |
| 26 | `garden-waste-bins-dubai` | Garden Waste in Dubai: What the Bins Won't Take | garden waste dubai bins | SC1 | A+B | `garden-waste-removal` | — | `PUBLISHED` | 2026-10-06 | 2026-10-06 | sourced | `/blog/soil-sand-pots-disposal-dubai` | 2743 body words; reused existing cover (#13, Media 70) + body (#27, Media 79) media. Details municipal compactor truck limits, soil density weight hazards, and community dumping prohibitions. |
| 22 | `tv-disposal-dubai` | Old TV Disposal in Dubai: Where Screens Actually Go | TV disposal dubai | SC1 | A+B | `appliance-disposal` | — | `PUBLISHED` | 2026-10-07 | 2026-10-07 | sourced | `/blog/e-waste-disposal-dubai` | 2013 stored body words; generated cover + body illustration. E19 conflict resolved in keywords.md. |
| 32 | `office-furniture-removal-dubai` | What Happens to Old Office Furniture in Dubai | office furniture removal dubai | SC6 | H | `commercial-junk-removal` | — | `PUBLISHED` | 2026-10-07 | 2026-10-07 | business | `/blog/office-strip-out-dubai` | 2110 stored body words; generated cover + body illustration. Owner confirmed sorting route; no certified data-erasure claim. |
| 39 | `renovation-waste-removal-dubai` | Renovation Waste in Dubai: Clearing As You Go | renovation waste removal dubai | SC6 | H | `waste-removal` | — | `PUBLISHED` | 2026-10-07 | 2026-10-07 | business | `/blog/skip-hire-vs-junk-removal-dubai` | 2052 stored body words; generated cover + body illustration. Owner confirmed debris collection and required permissions. |
| 35 | `it-equipment-disposal-dubai` | Old Office IT Equipment Disposal in Dubai: Practical and Responsible Steps | IT equipment disposal dubai | SC6 | H | `commercial-junk-removal` | — | `PUBLISHED` | 2026-10-08 | 2026-10-08 | business | `/blog/office-furniture-removal-dubai` | 2636 stored body words; generated cover + body diagram. IT sanitisation boundary confirmed; no certified data-erasure claim. |
| N-1 | `weekend-junk-removal-dubai` | Weekend Junk Removal in Dubai: Booking, Building Access and Timing | weekend junk removal dubai | SC3 | E | `same-day-junk-removal` | — | `PUBLISHED` | 2026-10-08 | 2026-10-08 | business | `/blog/service-lift-booking-dubai` | 2495 stored body words; generated cover + body diagram. Pickups 7 days a week confirmed; Saturday vs Sunday building access and quiet hours. |
| N-2 | `landlord-inspection-clearance-dubai` | Landlord Inspection Clearance in Dubai: Passing Handover Without Deductions | landlord inspection clearance dubai | SC3 | F | `house-clearance` | — | `PUBLISHED` | 2026-10-08 | 2026-10-08 | sourced | `/blog/deposit-deductions-left-furniture-dubai` | 2376 stored body words; generated cover + body diagram. Law No. (26) of 2007 Art. 21 wear and tear standards and room clearance checklist. |
| N-3 | `decluttering-small-dubai-apartment` | Decluttering a Small Dubai Apartment: Start With What Takes Up Floor Space | decluttering tips dubai apartment | SC4 | A | `residential-junk-removal` | — | `PUBLISHED` | 2026-10-09 | 2026-10-09 | sourced | `/blog/seasonal-clear-out-dubai` | 2143 stored body words; keywords.md M17. Reused cover (#18, Media 116) + body (#28, Media 89). Bulky-waste and dumping statements rest on existing §7.1 rows. |
| N-4 | `seasonal-clear-out-dubai` | A Seasonal Clear-Out in Dubai: Set the Collection Date, Then Sort | spring cleaning clearance dubai | SC5 | F | `junk-removal` | — | `PUBLISHED` | 2026-10-09 | 2026-10-09 | sourced | `/blog/pre-ramadan-clear-out-dubai` | 2063 stored body words; keywords.md M18. Reused cover (#41, Media 98) + body (#41, Media 99). Crew/time figures from group 01 site copy; paint/pesticide route cites DM Waste Segregation Guide. |
| N-5 | `pre-ramadan-clear-out-dubai` | Clearing Out the Home Before Ramadan: Make Room Before the Month Begins | ramadan home clear out dubai | SC3 | F | `furniture-removal` | — | `PUBLISHED` | 2026-10-09 | 2026-10-09 | business | `/blog/seasonal-clear-out-dubai` | 2011 stored body words; keywords.md M19. Reused cover (#27, Media 78) + body (#1, Media 105). No Ramadan date stated; building hours during the month stated conditionally. Re-check timing references before Ramadan 2027. |
| N-6 | `storage-room-clearance-dubai` | Storage Room Clearance in Dubai: Sort It, Quote It, Empty It | storage room clearance dubai | SC4 | G | `house-clearance` | — | `PUBLISHED` | 2026-10-10 | 2026-10-10 | none | `/blog/decluttering-small-dubai-apartment` | 2031 stored body words; original cover and body illustrations (Media 134, 135). Inbound from N-3. |
| N-7 | `garage-clearance-dubai` | Garage Clearance in Dubai: Sort Mixed Contents Before Collection | garage clearance dubai | SC3 | F | `villa-clearance` | — | `PUBLISHED` | 2026-10-10 | 2026-10-10 | none | `/blog/how-long-villa-clearance-dubai` | 2028 stored body words; original cover and body illustrations (Media 136, 137). Inbound from #36. |
| N-8 | `garden-furniture-disposal-dubai` | Garden Furniture Disposal in Dubai: What to Keep Separate | garden furniture disposal dubai | SC1 | A | `garden-waste-removal` | — | `PUBLISHED` | 2026-10-10 | 2026-10-10 | none | `/blog/garden-waste-bins-dubai` | 2023 stored body words; original cover and body illustrations (Media 138, 139). Inbound from #26. |
| N-9 | `balcony-clearance-dubai` | Balcony Clearance in Dubai: What Leaves, What Stays, How It Gets Out | balcony clearance dubai | SC4 | G | `residential-junk-removal` | — | `PUBLISHED` | 2026-10-13 | 2026-10-13 | none | `/blog/garden-furniture-disposal-dubai` | 2461 stored body words; keywords.md H21 (owner-requested admission). Expanded from the 2026-10-12 draft. Reused cover (Media 138) + body (Media 117). Building rules conditional; gas cylinders framed as declare-and-ask. |
| N-10 | `childrens-room-clearance-dubai` | Clearing a Child's Room in Dubai: Keepsakes First, Furniture Second | children's room clearance dubai | SC4 | F | `furniture-removal` | — | `PUBLISHED` | 2026-10-13 | 2026-10-13 | none | `/blog/seasonal-clear-out-dubai` | 2491 stored body words; keywords.md H22 (owner-requested admission). Expanded from the 2026-10-12 draft. Reused cover (Media 98) + body (Media 99). No safety-standard or charity claims. |
| N-11 | `packing-material-disposal-dubai` | Packing Material After a Move: Sort It Before You Book a Pickup | packing material disposal dubai | SC1 | A | `junk-removal` | — | `PUBLISHED` | 2026-10-13 | 2026-11-01 | sourced | `/blog/junk-gone-today-dubai` · `/services/junk-removal` | 2542 stored body words; keywords.md F19 (owner-requested admission; cardboard removal dubai recorded as a variant, not a new URL). Expanded from the 2026-10-12 draft, including the owner's 2026-10-13 cardboard section. Reused cover (Media 114) + body (Media 119). Recycling statements cite the DM Waste Segregation Guide already used by #44. Revised 2026-10-29 in place: signpost to office-waste, shop-clearance, retail-fit-out and renovation-waste; FAQs for mover-owned cartons, delivery packaging and flattening; plastic-coated exclusion added to the wet-cardboard answer from the DM sentence already in the body. SEO title and description unchanged. 2026-11-01: signpost to F21 in the wet-cardboard answer. |
| N-12 | `bed-frame-disposal-dubai` | Old Bed Frame to Get Rid Of? Strip It Down or Take It Whole | bed frame disposal dubai | SC1 | A | `furniture-removal` | — | `PUBLISHED` | 2026-10-14 | 2026-10-14 | sourced | `/blog/mattress-disposal-dubai` | 2530 stored body words; keywords.md C15 promoted to BLOG. Reused cover (Media 100) + body (Media 81). Bulky-waste statement rests on the existing services-directory source used by #1 and #4. |
| N-13 | `townhouse-clearance-dubai` | Townhouse Clearance: Start at the Top Floor, Plan Around the Stairs | townhouse clearance dubai | SC3 | F | `villa-clearance` | — | `PUBLISHED` | 2026-10-14 | 2026-10-14 | business | `/blog/garage-clearance-dubai` | 2659 stored body words; keywords.md I12 promoted to BLOG. Reused cover (Media 96) + body (Media 79). Scope statements come from villa and house-clearance seed copy; community rules conditional; no areas named. |
| N-14 | `broken-furniture-disposal-dubai` | Broken Furniture in Dubai: When It Can't Be Reused, Plan the Removal | broken furniture disposal dubai | SC1 | A | `furniture-removal` | — | `PUBLISHED` | 2026-10-14 | 2026-10-14 | sourced | `/blog/dispose-old-furniture-dubai` | 2397 stored body words; keywords.md C9 promoted to BLOG. Reused cover (Media 104) + body (Media 101). Law No. (18) of 2024 Art. 6 and DM bulky-waste statements reuse wording already published in #44 and #10. |
| N-15 | `carpet-disposal-dubai` | Old Carpet or Rug to Clear? Roll It, Check It, Then Book the Route | carpet disposal dubai | SC1 | A | `furniture-removal` | — | `PUBLISHED` | 2026-10-15 | 2026-10-15 | sourced | `/blog/storage-room-clearance-dubai` | 2519 stored body words; keywords.md C23 promoted to BLOG. Reused cover (Media 88) + body (Media 134). Fitted-carpet lifting framed as ask-the-provider; bulky-waste statement uses the existing services-directory source. |
| N-16 | `sofa-bed-removal-dubai` | Sofa Bed Removal in Dubai: Secure the Mechanism Before It Moves | sofa bed removal dubai | SC1 | A | `sofa-removal` | — | `PUBLISHED` | 2026-10-15 | 2026-10-15 | sourced | `/blog/sofa-wont-fit-through-door-dubai` | 2395 stored body words; keywords.md D10 promoted to BLOG. Reused cover (Media 84) + body (Media 75). Crew capabilities only as stated in sofa-removal seed copy; bulky-waste statement uses the existing services-directory source. |
| N-17 | `water-heater-removal-dubai` | Taking Out an Old Water Heater: Ownership, Draining and Collection | water heater removal dubai | SC1 | A | `appliance-disposal` | — | `PUBLISHED` | 2026-10-15 | 2026-10-15 | sourced | `/blog/washing-machine-removal-dubai` | 2434 stored body words; keywords.md E18 promoted to BLOG. Reused cover (Media 73) + body (Media 77). Disconnection left to a qualified technician; no claim that the business disconnects. Law No. (18) of 2024 and DM bulky-waste statements reuse published sources. |
| N-18 | `dryer-disposal-dubai` | Getting Rid of a Tumble Dryer: Unplug, Empty, Unstack, Collect | dryer disposal dubai | SC1 | A | `appliance-disposal` | — | `PUBLISHED` | 2026-10-16 | 2026-10-16 | sourced | `/blog/washing-machine-removal-dubai` | 2307 body words; keywords.md E13. Repository post (content/file-posts.js), dated 2026-10-16 Dubai time; published with the move to repository posts. Bulky-waste statement uses the existing services-directory source. |
| N-19 | `dining-table-removal-dubai` | Glass, Stone or Wood? How a Dining Table Leaves the Apartment | dining table removal dubai | SC1 | A | `furniture-removal` | — | `PUBLISHED` | 2026-10-16 | 2026-10-16 | sourced | `/blog/armchair-removal-dubai` | 2451 body words; keywords.md C20. Repository post, dated 2026-10-16. Also linked from dispose-old-furniture. |
| N-20 | `armchair-removal-dubai` | Wingback, Recliner or Swivel? Getting an Old Armchair Out | armchair removal dubai | SC1 | A | `furniture-removal` | — | `PUBLISHED` | 2026-10-16 | 2026-10-16 | sourced | `/blog/dining-table-removal-dubai` | 2405 body words; keywords.md D12. Repository post, dated 2026-10-16. Also linked from dispose-old-furniture. |
| N-21 | `freezer-disposal-dubai` | Freezer Disposal: Empty, Defrost, Dry, Then Collect | freezer disposal dubai | SC1 | A | `appliance-disposal` | — | `PUBLISHED` | 2026-10-17 | 2026-10-17 | sourced | `/blog/dispose-fridge-dubai` | 2,000+ body words; keywords.md E7. Repository post. Bulky-waste statement reuses the verified services-directory source. |
| N-22 | `oven-removal-dubai` | Old Oven to Remove? Separate Disconnection From Collection | oven removal dubai | SC1 | A | `appliance-disposal` | — | `PUBLISHED` | 2026-10-17 | 2026-10-17 | sourced | `/blog/dishwasher-removal-dubai` | 2,000+ body words; keywords.md E14. Technician boundaries are explicit; no claim that the collection crew disconnects gas or hard-wired appliances. |
| N-23 | `dishwasher-removal-dubai` | Dishwasher Removal: Disconnect, Drain and Protect the Kitchen | dishwasher removal dubai | SC1 | A | `appliance-disposal` | — | `PUBLISHED` | 2026-10-17 | 2026-10-17 | sourced | `/blog/washing-machine-removal-dubai` | 2,000+ body words; keywords.md E16. Plumbing, electrical and cabinet-release responsibilities remain conditional. |
| N-24 | `furniture-dismantling-dubai` | Should You Dismantle Furniture Before Collection? | furniture dismantling dubai | SC1 | A | `furniture-removal` | — | `PUBLISHED` | 2026-10-18 | 2026-10-18 | none | `/blog/wardrobe-removal-dubai` | 2396 body words; keywords.md C10 promoted to BLOG. Repository post. Reused flat-pack cover and wardrobe dismantling body illustration. Scope is preparation and controlled separation; the service page retains the transactional term. |
| N-25 | `maids-room-clearance-dubai` | Clearing a Maid's Room: Consent, Ownership and a Complete Inventory | maid room clearance dubai | SC3 | F | `villa-clearance` | — | `PUBLISHED` | 2026-10-18 | 2026-10-18 | sourced | `/blog/villa-handover-clearance-dubai` | 2308 body words; keywords.md I8 promoted to BLOG. Repository post. Consent and personal-property boundaries are explicit; the bulky-waste statement reuses the verified services-directory source. |
| N-26 | `shop-clearance-dubai` | Closing or Refitting a Shop? Plan the Clearance by Asset and Access | shop clearance dubai | SC6 | H | `commercial-junk-removal` | — | `PUBLISHED` | 2026-10-18 | 2026-10-18 | none | `/blog/office-strip-out-dubai` | 2396 body words; keywords.md K9 promoted to BLOG. Repository post. Retail stock, data and fitted-work boundaries are conditional; no disposal outcome or out-of-hours availability invented. |
| N-27 | `landscaping-waste-removal-dubai` | Landscaping Waste Removal: Sort the Finished Load Before Collection | landscaping waste removal dubai | SC1 | A | `garden-waste-removal` | — | `PUBLISHED` | 2026-10-19 | 2026-10-19 | none | `/blog/garden-furniture-disposal-dubai` | 2283 body words; keywords.md G19 promoted to BLOG. Repository post. Scope separates landscaping work from collection and keeps chemicals, unknown contamination and property rules conditional. |
| N-28 | `majlis-clearance-dubai` | Majlis Clearance: Protect Personal Items and Plan Every Large Piece | majlis clearance dubai | SC3 | F | `villa-clearance` | — | `PUBLISHED` | 2026-10-19 | 2026-10-19 | none | `/blog/villa-handover-clearance-dubai` | 2142 body words; keywords.md I9 promoted to BLOG. Repository post. Ownership, consent and significant belongings are resolved before removal; fitted work stays outside the assumed scope. |
| N-29 | `restaurant-equipment-removal-dubai` | Restaurant Equipment Removal: Disconnect, Empty and Plan the Loading Route | restaurant equipment removal dubai | SC6 | H | `commercial-junk-removal` | — | `PUBLISHED` | 2026-10-19 | 2026-10-19 | none | `/blog/shop-clearance-dubai` | 2388 body words; keywords.md K13 promoted to BLOG. Repository post. Utility work, food safety, refrigeration, residues and fitted systems remain with appropriate responsible providers. |
| N-30 | `tree-branch-removal-dubai` | Tree Branch Removal: Quote the Cut Load, Not the Tree | tree branch removal dubai | SC1 | A | `garden-waste-removal` | — | `PUBLISHED` | 2026-10-20 | 2026-10-20 | none | `/blog/landscaping-waste-removal-dubai` | 2054 body words; keywords.md G10 promoted to BLOG. Repository post. Covers only already-cut material; pruning, cutting and tree surgery remain outside the collection scope. |
| N-31 | `villa-storage-clearance-dubai` | Villa Storage Clearance: Inventory Every Store Before Loading | villa storage clearance dubai | SC3 | F | `villa-clearance` | — | `PUBLISHED` | 2026-10-20 | 2026-10-20 | none | `/blog/villa-handover-clearance-dubai` | 2008 body words; keywords.md I11 promoted to BLOG. Repository post. Property-wide multi-zone inventory stays distinct from the single packed apartment-store article. |
| N-32 | `office-relocation-junk-removal-dubai` | Office Relocation Junk Removal: Keep the Move and Clearance Separate | office relocation junk removal dubai | SC6 | H | `commercial-junk-removal` | — | `PUBLISHED` | 2026-10-20 | 2026-10-20 | none | `/blog/office-furniture-removal-dubai` | 2051 body words; keywords.md K8 promoted to BLOG. Repository post. Clearance remains separate from moving, installation, live IT handling and fixed fit-out work. |
| N-33 | `grass-clippings-disposal-dubai` | Grass Clippings Disposal: Count the Finished Bags, Not the Lawn | grass clippings disposal dubai | SC1 | A | `garden-waste-removal` | — | `PUBLISHED` | 2026-10-21 | 2026-10-21 | none | `/blog/landscaping-waste-removal-dubai` | 2119 body words; keywords.md G12 promoted to BLOG. Repository post. Covers the already-cut grass load; mowing and landscaping remain outside the collection scope. |
| N-34 | `studio-apartment-clearance-dubai` | Studio Apartment Clearance: Make Every Item Decision First | studio apartment clearance dubai | SC3 | F | `house-clearance` | — | `PUBLISHED` | 2026-10-21 | 2026-10-21 | none | `/blog/decluttering-small-dubai-apartment` | 2097 body words; keywords.md H19 promoted to BLOG. Repository post. Owns the one-room inventory and sequencing problem while the service page keeps apartment-clearance transactions. |
| N-35 | `school-office-clearance-dubai` | School Office Clearance: Freeze Assets Before the Closure Window | school office clearance dubai | SC6 | H | `commercial-junk-removal` | — | `PUBLISHED` | 2026-10-21 | 2026-10-21 | none | `/blog/office-furniture-removal-dubai` | 2272 body words; keywords.md K19 promoted to BLOG. Repository post. Limited to authorised administrative-office assets; specialist school rooms remain outside the assumed scope. |
| N-36 | `hedge-trimming-waste-removal-dubai` | Hedge Trimming Waste Removal: Separate Stems, Leaves and Sharp Cuttings | hedge trimming waste removal dubai | SC1 | A | `garden-waste-removal` | — | `PUBLISHED` | 2026-10-22 | 2026-10-22 | none | `/blog/tree-branch-removal-dubai` | 2606 body words; keywords.md G13 promoted to BLOG. Repository post. Covers only already-cut hedge material; trimming and shaping remain outside the collection scope. |
| N-37 | `office-desk-removal-dubai` | Office Desk Removal: Clear Drawers, Cables and Ownership First | office desk removal dubai | SC6 | H | `commercial-junk-removal` | — | `PUBLISHED` | 2026-10-22 | 2026-10-22 | none | `/blog/office-furniture-removal-dubai` | 2664 body words; keywords.md K6 promoted to BLOG. Repository post. Desk-level scope; data erasure, hard-wired power and fixed fit-out stay with the office and appropriate trades. |
| N-38 | `property-clearance-dubai` | Property Clearance: Confirm Authority Before Anything Leaves | property clearance dubai | SC3 | F | `house-clearance` | — | `PUBLISHED` | 2026-10-22 | 2026-11-02 | none | `/blog/landlord-inspection-clearance-dubai` | 2811 body words; keywords.md H6 promoted to BLOG. Repository post. Third-party-arranged clearance; ownership disputes and legal questions stay with the owner or relevant authority. 2026-11-02: signposts to H25 and H26. |
| N-39 | `villa-garden-waste-removal-dubai` | Villa Garden Waste Removal: Map Every Zone and Material | villa garden waste removal dubai | SC1 | G | `garden-waste-removal` | — | `PUBLISHED` | 2026-10-23 | 2026-10-23 | none | `/blog/garden-furniture-disposal-dubai` | 2263 body words; keywords.md G20 promoted to BLOG. Repository post. Owns the multi-zone outdoor inventory and contractor handoff; individual material guides keep their detail. |
| N-40 | `bedroom-furniture-removal-dubai` | Bedroom Furniture Removal: Inventory the Whole Room First | bedroom furniture removal dubai | SC1 | A | `furniture-removal` | — | `PUBLISHED` | 2026-10-23 | 2026-10-23 | none | `/blog/wardrobe-removal-dubai` | 2185 body words; keywords.md C11 promoted to BLOG. Repository post. Owns whole-room coordination; bed, mattress and wardrobe articles retain item-level preparation. |
| N-41 | `retail-fit-out-waste-removal-dubai` | Retail Fit-Out Waste Removal: Release, Sort and Stage Every Load | retail fit out waste removal dubai | SC6 | H | `commercial-junk-removal` | — | `PUBLISHED` | 2026-10-23 | 2026-10-23 | none | `/blog/shop-clearance-dubai` | 2346 body words; keywords.md K10 promoted to BLOG. Repository post. Collection begins after authorised project trades release fixed material; no demolition or technical disconnection implied. |
| N-42 | `l-shaped-sofa-removal-dubai` | L-Shaped Sofa Removal: Map Every Section and Turn | L shaped sofa removal dubai | SC1 | G | `sofa-removal` | — | `PUBLISHED` | 2026-10-24 | 2026-10-24 | none | `/blog/sofa-wont-fit-through-door-dubai` | 2077 body words; keywords.md D8 promoted to BLOG. Repository post. Owns sectional modules and connectors; the existing doorway guide keeps general route geometry. |
| N-43 | `apartment-furniture-removal-dubai` | Apartment Furniture Removal: Build One Lift-Ready Plan | furniture removal apartment dubai | SC1 | G | `residential-junk-removal` | — | `PUBLISHED` | 2026-10-24 | 2026-10-24 | none | `/blog/bulky-items-tower-dubai` | 2000+ body words; keywords.md C22 promoted to BLOG. Repository post. Owns whole-apartment furniture coordination; item guides and tower logistics keep their detailed scopes. |
| N-44 | `office-waste-collection-dubai` | Office Waste Collection: Define the One-Off Load First | office waste collection dubai | SC6 | H | `commercial-junk-removal` | — | `PUBLISHED` | 2026-10-24 | 2026-10-24 | none | `/blog/office-furniture-removal-dubai` | 2121 body words; keywords.md F18 promoted to BLOG. Repository post. Owns a defined one-off loose load and explicitly excludes assumed recurring, data-destruction and technical services. |
| N-45 | `bulky-item-pickup-dubai` | Bulky-Item Pickup: Show the Object and the Whole Route | bulky item pickup dubai | SC1 | G | `junk-removal` | — | `PUBLISHED` | 2026-10-25 | 2026-10-25 | none | `/blog/before-the-crew-arrives-dubai` | 2113 body words; keywords.md A18 promoted to BLOG. Repository post. Owns the object-photo and full-route brief; general acceptance and booking stay with the service page. |
| N-46 | `next-day-junk-removal-dubai` | Next-Day Junk Removal: Use Tonight to Make Tomorrow Work | next day junk removal dubai | SC3 | E | `same-day-junk-removal` | — | `PUBLISHED` | 2026-10-25 | 2026-10-25 | none | `/blog/junk-gone-today-dubai` | 2010 body words; keywords.md B9 promoted to BLOG. Repository post. Owns overnight preparation and next-day deadline control while the service page keeps the urgent booking transaction. |
| N-47 | `old-appliance-removal-dubai` | Old Appliance Removal: Release Every Unit Before Collection | old appliance removal dubai | SC1 | A | `appliance-disposal` | — | `PUBLISHED` | 2026-10-25 | 2026-10-25 | none | `/blog/dispose-fridge-dubai` | 2158 body words; keywords.md E10 promoted to BLOG. Repository post. Owns coordination of several unlike appliances; the individual appliance guides retain item-level preparation. |
| A33 | `treadmill-removal-dubai` | Treadmill Removal in Dubai: Prepare the Machine and the Route | treadmill removal dubai | SC1 | A | `junk-removal` | — | `PUBLISHED` | 2026-10-27 | 2026-10-27 | business | `/blog/bulky-item-pickup-dubai` | 2144 body words. Repository post. Household scope and handling claims limited to existing repository copy; commercial gyms and fixed systems remain conditional. |
| M26 | `decluttering-service-or-junk-removal-dubai` | Decluttering Service or Junk Removal? Choose the Right Help | decluttering service dubai | SC5 | D | `junk-removal` | — | `PUBLISHED` | 2026-10-27 | 2026-10-27 | none | `/blog/decluttering-small-dubai-apartment` | 2115 body words. Repository post. Explicitly states the business does not provide organising and owns only the service-type comparison. |
| H23 | `downsizing-clearance-dubai` | Downsizing in Dubai: Clear for a Smaller Home Without Guesswork | downsizing in dubai | SC3 | F | `house-clearance` | — | `PUBLISHED` | 2026-10-27 | 2026-10-27 | none | `/blog/leaving-dubai-clearance-checklist` | 2358 body words. Repository post. Owns smaller-home capacity and move-versus-clearance sequencing; no selling or valuation advice. |
| C25 | `media-wall-unit-removal-dubai` | Media wall unit removal in Dubai: check the fixings | media wall unit removal dubai | SC1 | A | `furniture-removal` | — | `PUBLISHED` | 2026-10-29 | 2026-10-29 | business | `/blog/tv-disposal-dubai` | 2355 body words. Repository post. Owns loose console versus wall-fixed unit, ownership and the largest rigid section. Fixed joinery stays with a contractor. Crew actions limited to the published acceptance notes. |
| H24 | `clear-apartment-before-selling-dubai` | Clear apartment before selling in Dubai: set the date | clear apartment before selling dubai | SC3 | F | `house-clearance` | — | `PUBLISHED` | 2026-10-29 | 2026-10-29 | none | `/blog/property-clearance-dubai` | 2286 body words. Repository post. Owns a vacant-unit stay/leave inventory and access timing. No price, marketing, commission or legal advice. |
| E30 | `cooker-hood-removal-dubai` | Cooker hood removal in Dubai: release it safely | cooker hood removal dubai | SC1 | A | `appliance-disposal` | — | `PUBLISHED` | 2026-10-28 | 2026-10-28 | business | `/blog/oven-removal-dubai` | 2177 body words. Repository post. Owns a household hood’s type, power, duct and route. The oven guide keeps the cooker; commercial canopies stay with restaurant equipment. No claim the crew cuts cables or building ducts. |
| A34 | `bicycle-removal-dubai` | Bicycle removal in Dubai: locks, size and route | bicycle removal dubai | SC1 | A | `junk-removal` | — | `PUBLISHED` | 2026-10-28 | 2026-10-28 | business | `/blog/garage-clearance-dubai` | 2121 body words. Repository post. Owns locks, handlebar width, declared motors and the store-to-vehicle route. Gym machines stay with the treadmill guide; a mixed garage stays with the garage guide. |
| G22 | `trampoline-removal-dubai` | Trampoline removal in Dubai: fixings and route | trampoline removal dubai | SC1 | A | `garden-waste-removal` | — | `PUBLISHED` | 2026-10-30 | 2026-10-30 | business | `/services/garden-waste-removal` | 2510 body words. Repository post. Owner confirmed collection and on-site dismantling. Buried anchors, concrete footings, fixed services and property repair remain outside the assumed scope. |
| G23 | `bbq-grill-disposal-dubai` | BBQ grill disposal in Dubai: separate the fuel | bbq grill disposal dubai | SC1 | A | `garden-waste-removal` | — | `PUBLISHED` | 2026-10-30 | 2026-10-30 | business | `/services/garden-waste-removal` | 2650 body words. Repository post. Owner confirmed grill, smoker and patio-heater collection. Gas cylinders and other fuel stay with the customer; fixed utility work and outdoor-kitchen demolition remain outside scope. |
| J13 | `walk-up-stairs-no-lift-dubai` | Walk-up stairs when there is no service lift | walk-up stairs with no service lift | SC4 | G | `junk-removal` | `al-barsha` | `PUBLISHED` | 2026-10-31 | 2026-10-31 | business | `/blog/service-lift-booking-dubai` · `/areas/al-barsha` | 3528 body words. Repository post. Owns a shared stair when no goods lift exists. Service-lift booking, tower routes and townhouse stairs stay on their own URLs. Stair-carry statements are limited to the furniture and appliance pages already published. |
| F20 | `shipping-cartons-filling-a-flat-dubai` | Shipping cartons filling a flat after deliveries | shipping cartons filling a flat | SC1 | A | `junk-removal` | — | `PUBLISHED` | 2026-10-31 | 2026-11-01 | none | `/services/junk-removal` · `/blog/packing-material-disposal-dubai` | 3033 body words. Repository post. Owns successive delivery cartons in a flat the resident still lives in. Move sorting, flattening and the recycling test stay with N-11. `cardboard removal dubai` is not retargeted. 2026-11-01: signpost to F21 when a leak soaked the pile. |
| F21 | `wet-cardboard-after-a-leak-dubai` | Wet cardboard a recycling pickup may refuse | wet cardboard after a leak | SC1 | A | `junk-removal` | — | `PUBLISHED` | 2026-11-01 | 2026-11-01 | sourced | `/services/junk-removal` · `/blog/packing-material-disposal-dubai` | 2927 body words. Repository post. Owns cardboard soaked by a leak. Move sorting and the food-soiled or plastic-coated test stay with N-11. Dry delivery volume stays with F20. Water-damaged furniture stays blocked on M30. `cardboard removal dubai` is not retargeted. |
| M31 | `bulky-pickup-after-handover-dubai` | When the bulky pickup is after handover | municipal pickup date after key handover | SC3 | F | `junk-removal` | — | `PUBLISHED` | 2026-11-01 | 2026-11-01 | sourced | `/blog/dubai-municipality-bulky-waste` · `/blog/end-of-tenancy-clearance-dubai` | 2561 body words. Repository post. Owns a municipal window that finishes after the keys. The service description stays with #4. The general comparison stays with #5. The clearance order stays with #6. `bulky waste collection` is not retargeted. Directory summary re-read 2026-11-01. |
| H25 | `flatmate-left-furniture-dubai` | A flatmate left furniture and moved out | flatmate left furniture behind | SC3 | F | `furniture-removal` | — | `PUBLISHED` | 2026-11-02 | 2026-11-02 | none | `/services/furniture-removal` · `/blog/property-clearance-dubai` · `/blog/end-of-tenancy-clearance-dubai` · `/blog/deposit-deductions-left-furniture-dubai` | 3274 body words. Repository post. Owns furniture one occupant left while others still live there. Whole-tenancy handover stays with #6. Third-party vacant clearance stays with N-38. Deposit deductions stay with #24. Whole-apartment furniture stays with N-43. `furniture removal dubai` is not retargeted. |
| H26 | `short-let-furnished-flat-clearance-dubai` | A short-let manager clearing one furnished flat | short-let manager clearing a furnished flat | SC3 | F | `furniture-removal` | `jbr` | `PUBLISHED` | 2026-11-02 | 2026-11-02 | none | `/services/furniture-removal` · `/blog/property-clearance-dubai` · `/areas/jbr` | 2607 body words. Repository post. Owns one furnished flat an operator is clearing. Landlord inventory, operator furniture and guest leftovers stay split. JBR keeps the community page. Vacant third-party clearance stays with N-38. A sofa that will not fit stays with #7. `furniture removal dubai` is not retargeted. |
| C26 | `glass-display-cabinet-removal-dubai` | Glass display cabinet: shelves out first | glass display cabinet removal | SC1 | A | `furniture-removal` | — | `PUBLISHED` | 2026-11-03 | 2026-11-03 | none | `/services/furniture-removal` · `/blog/dining-table-removal-dubai` · `/blog/furniture-dismantling-dubai` | 2653 body words. Repository post. Owns the contents, loose glass shelves, fixed glazing, doors and rigid frame of a freestanding cabinet. Dining-table glass stays with N-19. General dismantling stays with N-24. Fixed joinery remains outside scope. |
| A35 | `bolt-together-shelving-removal-dubai` | Bolt-together metal shelving before it tips | bolt-together metal shelving removal | SC1 | A | `junk-removal` | — | `PUBLISHED` | 2026-11-03 | 2026-11-03 | none | `/services/junk-removal` · `/blog/garage-clearance-dubai` · `/blog/furniture-dismantling-dubai` · `/blog/warehouse-clearance-dubai` | 2632 body words. Repository post. Owns emptying, anchors, braces and the whole-versus-labelled-parts decision for a modest rack. Garage sorting, general dismantling and pallet racking stay on their existing URLs. |
| E31 | `plumbed-water-dispenser-removal-dubai` | Plumbed water dispenser: do not cut the pipe | plumbed water dispenser removal | SC1 | A | `junk-removal` | — | `PUBLISHED` | 2026-11-04 | 2026-11-04 | none | `/services/junk-removal` · `/blog/dispose-fridge-dubai` · `/blog/old-appliance-removal-dubai` · `/blog/water-heater-removal-dubai` | 2485 body words. Repository post. Owns the supply pipe, the reservoir and the free cabinet. A fridge door dispenser stays with #2. A hot-water tank stays with N-17. Several unlike appliances stay with N-47. `junk removal dubai` and `junk removal service in dubai` are not retargeted. |
| F22 | `product-boxes-not-moving-boxes-dubai` | Product boxes, not boxes from a house move | product boxes versus moving boxes | SC1 | A | `junk-removal` | `al-quoz` | `PUBLISHED` | 2026-11-04 | 2026-11-04 | none | `/services/junk-removal` · `/blog/packing-material-disposal-dubai` · `/blog/shop-clearance-dubai` · `/areas/al-quoz` | 2411 body words. Repository post. Owns empty cartons that held stock. A house move stays with N-11. Home deliveries stay with F20. A whole shop stays with N-26. A whole warehouse stays with #33. `cardboard removal dubai` is not retargeted. Al Quoz is the only area link. |
| J14 | `parking-bay-locker-clearance-dubai` | A parking-bay locker on a different level | parking-bay locker separate from the flat | SC4 | G | `junk-removal` | `downtown-dubai` | `PUBLISHED` | 2026-11-05 | 2026-11-05 | none | `/services/junk-removal` · `/blog/dubai-municipality-bulky-waste` · `/blog/storage-room-clearance-dubai` · `/blog/bulky-items-tower-dubai` · `/areas/downtown-dubai` · `/blog/clear-apartment-before-selling-dubai` | 3600 body words. Repository post. Owns the key, level and route of a parking-bay locker. The apartment store stays with H15. A carry that starts in the flat stays with #14. Downtown keeps the same-floor store. `bulky waste collection` is not retargeted. `junk removal dubai` and `junk removal service in dubai` are not retargeted. Downtown is the only area link. |
| H27 | `show-flat-furniture-not-yours-dubai` | Show-flat furniture that is not yours to dump | show-flat furniture that is not the buyer's | SC3 | F | `furniture-removal` | — | `PUBLISHED` | 2026-11-05 | 2026-11-05 | none | `/services/furniture-removal` · `/blog/property-clearance-dubai` · `/blog/clear-apartment-before-selling-dubai` · `/blog/flatpack-furniture-disposal-dubai` | 2529 body words. Repository post. Owns display stock until a written release names it. An owner’s own furniture stays with H24. A home someone lived in stays with N-38. Flat-pack condition stays with #42. `furniture removal dubai` is not retargeted. |
| E32 | `home-printer-and-cables-dubai` | A home printer and a box of old cables | household printer and a box of cables | SC1 | A | `e-waste-disposal` | — | `PUBLISHED` | 2026-11-06 | 2026-11-06 | none | `/services/e-waste-disposal` · `/services/waste-removal` · `/blog/e-waste-disposal-dubai` · `/blog/it-equipment-disposal-dubai` | 3374 body words. Repository post. Owns one emptied home printer and one sorted cable box. Office floors stay with K17. Electronics routes stay with E24. A project load stays on `/services/waste-removal`. `waste collection service dubai`, `junk removal dubai` and `junk removal service in dubai` are not retargeted. |
| C27 | `old-furniture-still-there-on-delivery-day-dubai` | Old furniture still there on delivery day | old furniture still in the room on delivery day | SC3 | F | `furniture-removal` | — | `PUBLISHED` | 2026-11-06 | 2026-11-06 | none | `/services/furniture-removal` · `/blog/old-sofa-before-new-delivery-dubai` · `/blog/bulky-item-pickup-dubai` · `/blog/service-lift-booking-dubai` | 3440 body words. Repository post. Owns the sequence when a large piece is still in the room and a delivery is due. A sofa-for-sofa exchange stays with D15. One object's photo and route stay with A18. The lift booking stays with J7. `furniture removal dubai` is not retargeted. |
| F23 | `polystyrene-after-appliance-delivery-dubai` | Polystyrene left after an appliance delivery | polystyrene after an appliance delivery | SC1 | A | `junk-removal` | — | `PUBLISHED` | 2026-11-07 | 2026-11-07 | none | `/services/junk-removal` · `/blog/packing-material-disposal-dubai` · `/blog/old-appliance-removal-dubai` · `/blog/tv-disposal-dubai` · `/blog/product-boxes-not-moving-boxes-dubai` · `/blog/shipping-cartons-filling-a-flat-dubai` | 2711 body words. Repository post. Owns shaped foam, beads and film after an appliance delivery. A house move stays with F19. Stock cartons stay with F22. Home-delivery volume stays with F20. The machines stay with E10. The screen stays with E19. `cardboard removal service`, `junk removal dubai` and `junk removal service in dubai` are not retargeted. |
| A36 | `duvets-that-will-not-fit-a-chute-dubai` | Duvets and pillows that will not fit a chute | duvets that will not go down the chute | SC1 | A | `junk-removal` | — | `PUBLISHED` | 2026-11-07 | 2026-11-07 | none | `/services/junk-removal` · `/blog/what-dubai-bins-wont-take` · `/blog/mattress-disposal-dubai` · `/blog/what-we-take-dubai` | 2679 body words. Repository post. Owns a counted bag of duvets and pillows that will not fit a chute. The chute rule stays with the bins guide. The mattress stays with C16. The acceptance list stays with A32. `junk removal dubai`, `rubbish removal service` and `trash pickup dubai` are not retargeted. |
| C28 | `oversized-framed-picture-removal-dubai` | An oversized framed picture on the wall | oversized framed picture removal dubai | SC1 | A | `furniture-removal` | — | `PUBLISHED` | 2026-11-07 | 2026-11-07 | none | `/services/furniture-removal` · `/blog/furniture-dismantling-dubai` · `/blog/bulky-item-pickup-dubai` · `/blog/media-wall-unit-removal-dubai` · `/blog/glass-display-cabinet-removal-dubai` | 2729 body words. Repository post. Owns one framed picture, the glazing and the wall fixing. A media wall stays with C25. A glazed cabinet stays with C26. General dismantling stays with C10. The photo-and-route method stays with A18. `furniture removal dubai` is not retargeted. |
| C29 | `freestanding-kitchen-trolley-dubai` | A freestanding kitchen trolley on wheels | freestanding kitchen trolley removal dubai | SC1 | A | `furniture-removal` | — | `PUBLISHED` | 2026-11-07 | 2026-11-07 | none | `/services/furniture-removal` · `/blog/oven-removal-dubai` · `/blog/cooker-hood-removal-dubai` · `/blog/apartment-furniture-removal-dubai` | 2844 body words. Repository post. Owns one empty freestanding trolley. The oven stays with E14. The hood stays with E30. A whole-flat inventory stays with the apartment-furniture guide. Fitted cabinets stay outside. `furniture removal dubai` is not retargeted. |
| C30 | `home-standing-desk-removal-dubai` | A standing desk in a home office | home standing desk removal dubai | SC1 | A | `furniture-removal` | — | `PUBLISHED` | 2026-11-08 | 2026-11-08 | none | `/services/furniture-removal` · `/blog/office-desk-removal-dubai` · `/blog/furniture-dismantling-dubai` · `/blog/it-equipment-disposal-dubai` | 2758 body words. Repository post. Owns one standing desk in a home. A workplace floor stays with K6. General dismantling stays with C10. Office IT stays with K17. `furniture removal dubai` is not retargeted. Claim audit 2026-11-08: no price, volume, licence, hours, guarantee, or instruction to open a motor or cut a cable. Production not verified in this record. |
| E33 | `keyboard-and-amplifier-removal-dubai` | A keyboard and a small amplifier | keyboard and small amplifier removal dubai | SC1 | A | `junk-removal` | — | `PUBLISHED` | 2026-11-08 | 2026-11-08 | none | `/services/junk-removal` · `/services/waste-removal` · `/blog/e-waste-disposal-dubai` · `/blog/bulky-item-pickup-dubai` | 2733 body words. Repository post. Owns one musical keyboard and one small amplifier. Electronics routes stay with E24. The photo-and-route method stays with A18. A project load stays on `/services/waste-removal`. A computer keyboard stays on the acceptance list. A piano is not this page. `waste collection service dubai`, `junk removal dubai` and `junk removal service in dubai` are not retargeted. Claim audit 2026-11-08: no price, volume, licence, hours, guarantee, or instruction to open an amplifier. Production not verified in this record. 2026-11-09: signpost to A37 when the other object is a drum kit. |
| E34 | `projector-and-screen-removal-dubai` | A projector and a pull-down screen | projector and screen removal dubai | SC1 | A | `junk-removal` | — | `PUBLISHED` | 2026-11-10 | 2026-11-10 | none | `/services/junk-removal` · `/blog/tv-disposal-dubai` · `/blog/media-wall-unit-removal-dubai` · `/blog/furniture-dismantling-dubai` · `/blog/e-waste-disposal-dubai` · `/blog/what-we-take-dubai` | 2729 body words. Repository post. Owns one loose projector and one pull-down, freestanding or simple removable screen. A television stays with E19. A media wall or fixed joinery stays with C25. General dismantling stays with C10. Electronics routes stay with E24. The acceptance list keeps a projection television. `junk removal dubai`, `junk removal service in dubai`, `rubbish removal service` and `trash pickup dubai` are not retargeted. Claim audit 2026-11-09: no price, volume, licence, hours, guarantee, or instruction to open the case, cut a lead, or release a ceiling or wall fixing. Production not verified in this record. |
| A37 | `drum-kit-removal-dubai` | A drum kit that will not fit the lift | drum kit removal dubai | SC1 | A | `junk-removal` | — | `PUBLISHED` | 2026-11-10 | 2026-11-10 | none | `/services/junk-removal` · `/services/furniture-removal` · `/blog/bulky-items-tower-dubai` · `/blog/bulky-item-pickup-dubai` · `/blog/keyboard-and-amplifier-removal-dubai` | 2638 body words. Repository post. Owns one multi-piece drum kit, its stands, and the lift comparison. A piano is not this page. A guitar is not this page. The tower route stays with J12. The photo-and-route method stays with A18. Beds and wardrobes stay on `/services/furniture-removal`. `furniture removal dubai`, `junk removal dubai`, `junk removal service in dubai`, `rubbish removal service` and `trash pickup dubai` are not retargeted. Claim audit 2026-11-09: no price, volume, licence, hours, guarantee, or instruction to remove a drum head, force a stand, or carry a shell down a stair. Production not verified in this record. |
| F24 | `shredded-paper-out-of-furniture-load-dubai` | Keep shredded paper out of the furniture | shredded paper kept out of a furniture load | SC6 | A | `waste-removal` | `difc` | `PUBLISHED` | 2026-11-10 | 2026-11-10 | none | `/services/waste-removal` · `/services/office-clearance` · `/blog/office-furniture-removal-dubai` · `/blog/office-waste-collection-dubai` · `/blog/office-desk-removal-dubai` · `/blog/packing-material-disposal-dubai` · `/areas/difc` | 2975 body words. Repository post. Owns already-shredded paper in its own sacks, kept out of the furniture. A one-off office load stays with F18. A workplace desk stays with K6. Office furniture stays with K4. Packing filler stays with F19. `cardboard removal dubai` stays on F19. `cardboard removal service` stays on `/services/junk-removal`. `waste collection service dubai` is not retargeted. `furniture removal dubai` is not retargeted. `junk removal dubai` and `junk removal service in dubai` stay on `/`. DIFC is the only area, because that page already says paper in a pedestal is a records decision. Claim audit 2026-11-10: no price, volume, licence, hours, guarantee, destruction certificate, shredding standard, or new building rule. The locked-pedestal sentence restates the office-clearance page. The DIFC sentence restates that area page. Production not verified in this record. |
| H28 | `lost-property-box-managed-building-dubai` | A lost-property box the building will not store | lost property box in a managed building | SC3 | F | `junk-removal` | — | `PUBLISHED` | 2026-11-10 | 2026-11-10 | none | `/services/junk-removal` · `/blog/property-clearance-dubai` · `/blog/what-we-take-dubai` · `/blog/before-the-crew-arrives-dubai` | 2685 body words. Repository post. Owns one box the building has said, in writing, it will not store, and the name of the person who may send it. A home the arranger does not occupy stays with H6. A household box the booker has already decided to discard stays on the acceptance list. The general arrival check stays with M13. `junk removal dubai`, `junk removal service in dubai`, `rubbish removal service` and `trash pickup dubai` are not retargeted. The money-page anchor is “a trash pickup for that box only”, which is not the head phrase. Claim audit 2026-11-10: no price, volume, licence, hours, guarantee, holding period, or lost-property statute. Production not verified in this record. |

The owner previously deleted drafts #7, #8 and #27. They were recreated as new articles on 2026-09-21 with fresh 2,000+ word bodies and generated editorial imagery. The four earlier articles retained their covers, titles, excerpts, authors, original publication dates, SEO fields and relationships.

---

## §4 · Commissioning queue

The 45 mapped opportunities from the `keywords.md` Article Opportunity Map, with live status. **This is state, not a re-plan** — the topics, money pages and priorities belong to `keywords.md` and are not changed here.

**Status counts as at 2026-09-20**, across the **44 commissionable** opportunities: 19 READY · 6 READY · BUS. INPUT · 15 BLOCKED · SOURCE · 4 BLOCKED · CAPABILITY. **Plus 1 consolidated (#23 → #6), which produces no article.**

**One article has no slug assigned in `keywords.md`** (#35). Per `content-structure.md` §4 the slug is set deliberately at commissioning — **do not auto-generate it from the title.** Record it here once chosen. #22 was assigned `tv-disposal-dubai` on 2026-10-07.

**One opportunity is consolidated, not commissionable** (#23 → #6). See §4.1. **45 mapped IDs · 44 independently commissionable.**

**Active records in §3:** #1 · #2 · #3 · #4 · #5 · #6 · #7 · #8 · #9 · #10 · #11 · #12 · #13 · #14 · #15 · #16 · #17 · #18 · #19 · #20 · #21 · #22 · #24 · #25 · #26 · #27 · #28 · #29 · #30 · #31 · #32 · #33 · #34 · #36 · #37 · #38 · #39 · #40 · #41 · #42 · #43 · #44 · #45. Their Status below stays exactly as `keywords.md` records it (parity is checked in §11); **§3 holds their live state.**


### §4.1 · #23 consolidated into #6 · RESOLVED 2026-09-20

**Decision approved and applied to `keywords.md`. #23 produces no article and no URL.**

`keywords.md` previously said two different things: cluster row **H9** mapped `move out clearance dubai` as a **SUPPORT** keyword on `/blog/end-of-tenancy-clearance-dubai`, while the Article Opportunity Map listed #23 as a separate article claiming that keyword as its primary. **The approved resolution follows H9** — one intent, one URL.

| | Final state |
|---|---|
| **Canonical URL** | `/blog/end-of-tenancy-clearance-dubai` — owned by **#6** |
| **Primary keyword** | `end of tenancy clearance dubai` (#6) |
| **Secondary keyword** | `move out clearance dubai`, plus #23's former secondaries — *moving out rubbish removal*, *clearance before moving* |
| **#6 scope** | Absorbs the move-out timeline as a **section**, and #23's area opportunities (Al Furjan · Creek Harbour) |
| **#23** | **CONSOLIDATED → #6.** ID retained for audit. No slug, no URL, no article, not independently commissionable. |

**Why it is not `MERGED`.** `MERGED` (§2) describes a **published** article later folded into another, which leaves a live URL needing a redirect. **#23 was never published and no URL ever existed**, so there is nothing to redirect and §8 gets no entry. `CONSOLIDATED → #6` is a **pre-publication queue status**, distinct from the article-record lifecycle, and it is deliberately not part of §2's state machine — no real article record ever enters it.

**Guards now in force:**

- #23's slug cell reads *none — consolidated*, so no slug can be inherited or auto-generated.
- Its Month and Priority are `—`, so it cannot be picked up by month-based planning.
- It is excluded from the commissionable count (**45 mapped IDs · 44 commissionable**).
- `move out clearance dubai` may **never** be claimed in §5.2 — it is a secondary of #6's URL, and §5.4 step 2 already stops any keyword listed as a secondary from becoming an article.
- §11 carries explicit checks that #23 cannot enter `DRAFTING` or claim a keyword.

**If #6 is later retired or merged**, its secondary keywords — including `move out clearance dubai` — are released with it and return to the queue as unmapped. They do **not** revert to #23.

#### Month 1 emphasis

| # | Primary keyword | Proposed slug | Money page | Cluster | Mo. | Status |
|---|---|---|---|---|---|---|
| 1 | how to dispose of old furniture in dubai | `dispose-old-furniture-dubai` | `/services/furniture-removal` | SC1 | M1 | BLOCKED · SOURCE |
| 2 | how to dispose of a fridge in dubai | `dispose-fridge-dubai` | `/services/appliance-disposal` | SC2 | M1 | BLOCKED · SOURCE |
| 3 | junk removal cost dubai | `junk-removal-cost-dubai` | `/how-it-works` | SC5 | M1 | READY · BUS. INPUT |
| 4 | dubai municipality bulky waste collection | `dubai-municipality-bulky-waste` | `/services/junk-removal` | SC2 | M1 | BLOCKED · SOURCE |
| 5 | junk removal vs municipality collection dubai | `municipality-vs-paid-junk-removal-dubai` | `/services/junk-removal` | SC2 | M1 | BLOCKED · SOURCE |
| 6 | end of tenancy clearance dubai | `end-of-tenancy-clearance-dubai` | `/services/house-clearance` | SC3 | M1 | READY |
| 7 | sofa won't fit through door dubai | `sofa-wont-fit-through-door-dubai` | `/services/sofa-removal` | SC1 | M1 | READY |
| 8 | junk removal service lift dubai | `service-lift-booking-dubai` | `/services/residential-junk-removal` | SC4 | M1 | READY |
| 9 | mattress removal dubai | `mattress-disposal-dubai` | `/services/furniture-removal` | SC1 | M1 | READY |
| 10 | fine for dumping furniture dubai | `illegal-dumping-fines-dubai` | `/services/junk-removal` | SC2 | M1 | BLOCKED · SOURCE |
| 11 | need junk gone today dubai | `junk-gone-today-dubai` | `/services/same-day-junk-removal` | SC3 | M1 | READY |
| 12 | where to donate furniture in dubai | `donate-furniture-dubai` | `/services/furniture-removal` | SC1 | M1 | BLOCKED · SOURCE |
| 13 | palm frond removal dubai | `palm-frond-disposal-dubai` | `/services/garden-waste-removal` | SC1 | M1 | READY |
| 14 | getting bulky items out of a tower dubai | `bulky-items-tower-dubai` | `/services/residential-junk-removal` | SC4 | M1 | READY |
| 15 | NOC to move furniture dubai | `noc-moving-furniture-dubai` | `/services/residential-junk-removal` | SC4 | M1 | BLOCKED · SOURCE |
| 16 | where does junk go after removal dubai | `what-happens-to-your-junk-dubai` | `/` | SC2 | M1 | BLOCKED · CAPABILITY |
| 17 | remove old sofa before new delivery dubai | `old-sofa-before-new-delivery-dubai` | `/services/sofa-removal` | SC1 | M1 | READY |
| 18 | what junk removal companies take dubai | `what-we-take-dubai` | `/services/junk-removal` | SC5 | M1 | READY · BUS. INPUT |
| 19 | AC unit removal dubai | `old-ac-unit-disposal-dubai` | `/services/appliance-disposal` | SC1 | M1 | BLOCKED · SOURCE |
| 20 | washing machine removal dubai | `washing-machine-removal-dubai` | `/services/appliance-disposal` | SC1 | M1 | READY |
| 21 | wardrobe removal dubai | `wardrobe-removal-dubai` | `/services/furniture-removal` | SC1 | M1 | READY |
| 22 | TV disposal dubai | `tv-disposal-dubai` | `/services/appliance-disposal` | SC1 | M1 | PUBLISHED |
| 23 | move out clearance dubai | *none — consolidated* | `/services/house-clearance` | SC3 | — | **CONSOLIDATED → #6** |
| 24 | will landlord deduct deposit for furniture left dubai | `deposit-deductions-left-furniture-dubai` | `/services/house-clearance` | SC3 | M1 | BLOCKED · SOURCE |
| 25 | how much junk fits in one truck dubai | `how-much-fits-in-one-load-dubai` | `/how-it-works` | SC5 | M1 | READY · BUS. INPUT |
| 26 | garden waste dubai bins | `garden-waste-bins-dubai` | `/services/garden-waste-removal` | SC1 | M1 | BLOCKED · SOURCE |
| 27 | villa handover clearance dubai | `villa-handover-clearance-dubai` | `/services/villa-clearance` | SC3 | M1 | READY |
| 28 | what to do before junk removal arrives dubai | `before-the-crew-arrives-dubai` | `/how-it-works` | SC5 | M1 | READY |
| 29 | skip hire alternative dubai | `skip-hire-vs-junk-removal-dubai` | `/services/waste-removal` | SC5 | M1 | READY |
| 30 | free junk removal dubai | `free-junk-removal-dubai-truth` | `/services/junk-removal` | SC2 | M1 | BLOCKED · SOURCE |

#### Month 2 emphasis

| # | Primary keyword | Proposed slug | Money page | Cluster | Mo. | Status |
|---|---|---|---|---|---|---|
| 31 | office strip out clearance dubai | `office-strip-out-dubai` | `/services/commercial-junk-removal` | SC6 | M2 | READY |
| 32 | office furniture removal dubai | `office-furniture-removal-dubai` | `/services/commercial-junk-removal` | SC6 | M2 | PUBLISHED |
| 33 | warehouse clearance dubai | `warehouse-clearance-dubai` | `/services/commercial-junk-removal` | SC6 | M2 | READY |
| 34 | out of hours clearance dubai | `out-of-hours-clearance-dubai` | `/services/commercial-junk-removal` | SC6 | M2 | READY · BUS. INPUT |
| 35 | IT equipment disposal dubai | `it-equipment-disposal-dubai` | `/services/commercial-junk-removal` | SC6 | M2 | PUBLISHED |
| 36 | how long does a villa clearance take dubai | `how-long-villa-clearance-dubai` | `/services/villa-clearance` | SC3 | M2 | READY · BUS. INPUT |
| 37 | gated community clearance access dubai | `gated-community-clearance-dubai` | `/services/villa-clearance` | SC4 | M2 | READY |
| 38 | e waste disposal dubai | `e-waste-disposal-dubai` | `/services/appliance-disposal` | SC2 | M2 | BLOCKED · SOURCE |
| 39 | renovation waste removal dubai | `renovation-waste-removal-dubai` | `/services/waste-removal` | SC6 | M2 | PUBLISHED |
| 40 | soil removal dubai | `soil-sand-pots-disposal-dubai` | `/services/garden-waste-removal` | SC1 | M2 | READY · BUS. INPUT |
| 41 | estate clearance dubai | `estate-clearance-dubai` | `/services/villa-clearance` | SC3 | M2 | READY |
| 42 | IKEA furniture disposal dubai | `flatpack-furniture-disposal-dubai` | `/services/furniture-removal` | SC1 | M2 | READY |
| 43 | moving out of dubai checklist | `leaving-dubai-clearance-checklist` | `/services/house-clearance` | SC3 | M2 | BLOCKED · SOURCE |
| 44 | what can't you throw in dubai bins | `what-dubai-bins-wont-take` | `/services/junk-removal` | SC2 | M2 | BLOCKED · SOURCE |
| 45 | junk removal companies in dubai | `choosing-junk-removal-dubai` | `/` | SC5 | M2 | READY |

---

## §5 · Claimed keyword index

**The cannibalization guard.** Before commissioning anything, check here. One keyword, one URL — always.

The rule from `keywords.md` restated only as a lookup instruction: **if a proposed primary keyword already appears below, the article does not get created.** Either the existing owner is improved, or the proposal is dropped.

### 5.1 · Claimed by money pages — permanent, never available to an article

These are owned by service, area and static pages. **An article may never claim one of these as its primary keyword.** Source of truth: the *Service Keyword Clusters* and *Existing Page Keyword Ownership* tables in `keywords.md`.

| URL | Primary keyword claimed |
|---|---|
| `/` | junk removal dubai |
| `/services/junk-removal` | junk removal service dubai |
| `/services/garbage-removal` | garbage removal dubai |
| `/services/furniture-removal` | furniture removal dubai |
| `/services/sofa-removal` | sofa removal dubai |
| `/services/appliance-disposal` | appliance disposal dubai · fridge disposal dubai |
| `/services/waste-removal` | waste removal dubai |
| `/services/garden-waste-removal` | garden waste removal dubai |
| `/services/house-clearance` | house clearance dubai |
| `/services/villa-clearance` | villa clearance dubai |
| `/services/same-day-junk-removal` | same day junk removal dubai |
| `/services/residential-junk-removal` | residential junk removal dubai |
| `/services/commercial-junk-removal` | commercial junk removal dubai |
| `/areas/{slug}` × 30 | junk removal {area} — one per area page |
| `/services` · `/areas` | Hubs. No commercial claim. |
| `/how-it-works` | how junk removal works dubai |
| `/contact` | book junk removal dubai · junk removal quote dubai |

**Also unavailable:** every term listed in a money page's `Secondary` column in `keywords.md`. Those live on the owning page, never on a new URL. That is roughly 170 of the 283 mapped keywords — **the largest bucket by design, and the main reason this system does not cannibalize itself.**

### 5.2 · Claimed by published articles

102 articles are published; each primary keyword has one owner.

| Keyword | Owning URL | ID | Claimed on |
|---|---|---|---|
| end of tenancy clearance dubai | `/blog/end-of-tenancy-clearance-dubai` | 6 | 2026-09-20 |
| palm frond removal dubai | `/blog/palm-frond-disposal-dubai` | 13 | 2026-09-20 |
| need junk gone today dubai | `/blog/junk-gone-today-dubai` | 11 | 2026-09-20 |
| washing machine removal dubai | `/blog/washing-machine-removal-dubai` | 20 | 2026-09-20 |
| sofa won't fit through door dubai | `/blog/sofa-wont-fit-through-door-dubai` | 7 | 2026-09-21 |
| junk removal service lift dubai | `/blog/service-lift-booking-dubai` | 8 | 2026-09-21 |
| villa handover clearance dubai | `/blog/villa-handover-clearance-dubai` | 27 | 2026-09-21 |
| mattress removal dubai | `/blog/mattress-disposal-dubai` | 9 | 2026-09-22 |
| getting bulky items out of a tower dubai | `/blog/bulky-items-tower-dubai` | 14 | 2026-09-22 |
| remove old sofa before new delivery dubai | `/blog/old-sofa-before-new-delivery-dubai` | 17 | 2026-09-22 |
| wardrobe removal dubai | `/blog/wardrobe-removal-dubai` | 21 | 2026-09-23 |
| what to do before junk removal arrives dubai | `/blog/before-the-crew-arrives-dubai` | 28 | 2026-09-23 |
| skip hire alternative dubai | `/blog/skip-hire-vs-junk-removal-dubai` | 29 | 2026-09-23 |
| office strip out clearance dubai | `/blog/office-strip-out-dubai` | 31 | 2026-09-28 |
| warehouse clearance dubai | `/blog/warehouse-clearance-dubai` | 33 | 2026-09-28 |
| gated community clearance access dubai | `/blog/gated-community-clearance-dubai` | 37 | 2026-09-28 |
| estate clearance dubai | `/blog/estate-clearance-dubai` | 41 | 2026-09-29 |
| IKEA furniture disposal dubai | `/blog/flatpack-furniture-disposal-dubai` | 42 | 2026-09-29 |
| junk removal companies in dubai | `/blog/choosing-junk-removal-dubai` | 45 | 2026-09-29 |
| how to dispose of old furniture in dubai | `/blog/dispose-old-furniture-dubai` | 1 | 2026-09-30 |
| how to dispose of a fridge in dubai | `/blog/dispose-fridge-dubai` | 2 | 2026-09-30 |
| dubai municipality bulky waste collection | `/blog/dubai-municipality-bulky-waste` | 4 | 2026-09-30 |
| junk removal vs municipality collection dubai | `/blog/municipality-vs-paid-junk-removal-dubai` | 5 | 2026-10-01 |
| free junk removal dubai | `/blog/free-junk-removal-dubai-truth` | 30 | 2026-10-01 |
| fine for dumping furniture dubai | `/blog/illegal-dumping-fines-dubai` | 10 | 2026-10-01 |
| e waste disposal dubai | `/blog/e-waste-disposal-dubai` | 38 | 2026-10-02 |
| what can't you throw in dubai bins | `/blog/what-dubai-bins-wont-take` | 44 | 2026-10-02 |
| AC unit removal dubai | `/blog/old-ac-unit-disposal-dubai` | 19 | 2026-10-02 |
| NOC to move furniture dubai | `/blog/noc-moving-furniture-dubai` | 15 | 2026-10-03 |
| will landlord deduct deposit for furniture left dubai | `/blog/deposit-deductions-left-furniture-dubai` | 24 | 2026-10-03 |
| moving out of dubai checklist | `/blog/leaving-dubai-clearance-checklist` | 43 | 2026-10-03 |
| what junk removal companies take dubai | `/blog/what-we-take-dubai` | 18 | 2026-10-04 |
| how much junk fits in one truck dubai | `/blog/how-much-fits-in-one-load-dubai` | 25 | 2026-10-04 |
| junk removal cost dubai | `/blog/junk-removal-cost-dubai` | 3 | 2026-10-04 |
| out of hours clearance dubai | `/blog/out-of-hours-clearance-dubai` | 34 | 2026-10-05 |
| how long does a villa clearance take dubai | `/blog/how-long-villa-clearance-dubai` | 36 | 2026-10-05 |
| soil removal dubai | `/blog/soil-sand-pots-disposal-dubai` | 40 | 2026-10-05 |
| where to donate furniture in dubai | `/blog/donate-furniture-dubai` | 12 | 2026-10-06 |
| where does junk go after removal dubai | `/blog/what-happens-to-your-junk-dubai` | 16 | 2026-10-06 |
| garden waste dubai bins | `/blog/garden-waste-bins-dubai` | 26 | 2026-10-06 |
| TV disposal dubai | `/blog/tv-disposal-dubai` | 22 | 2026-10-07 |
| office furniture removal dubai | `/blog/office-furniture-removal-dubai` | 32 | 2026-10-07 |
| renovation waste removal dubai | `/blog/renovation-waste-removal-dubai` | 39 | 2026-10-07 |
| IT equipment disposal dubai | `/blog/it-equipment-disposal-dubai` | 35 | 2026-10-08 |
| weekend junk removal dubai | `/blog/weekend-junk-removal-dubai` | N-1 | 2026-10-08 |
| landlord inspection clearance dubai | `/blog/landlord-inspection-clearance-dubai` | N-2 | 2026-10-08 |
| decluttering tips dubai apartment | `/blog/decluttering-small-dubai-apartment` | N-3 | 2026-10-09 |
| spring cleaning clearance dubai | `/blog/seasonal-clear-out-dubai` | N-4 | 2026-10-09 |
| ramadan home clear out dubai | `/blog/pre-ramadan-clear-out-dubai` | N-5 | 2026-10-09 |
| storage room clearance dubai | `/blog/storage-room-clearance-dubai` | N-6 | 2026-10-10 |
| garage clearance dubai | `/blog/garage-clearance-dubai` | N-7 | 2026-10-10 |
| garden furniture disposal dubai | `/blog/garden-furniture-disposal-dubai` | N-8 | 2026-10-10 |
| balcony clearance dubai | `/blog/balcony-clearance-dubai` | N-9 | 2026-10-13 |
| children's room clearance dubai | `/blog/childrens-room-clearance-dubai` | N-10 | 2026-10-13 |
| packing material disposal dubai | `/blog/packing-material-disposal-dubai` | N-11 | 2026-10-13 |
| bed frame disposal dubai | `/blog/bed-frame-disposal-dubai` | N-12 | 2026-10-14 |
| townhouse clearance dubai | `/blog/townhouse-clearance-dubai` | N-13 | 2026-10-14 |
| broken furniture disposal dubai | `/blog/broken-furniture-disposal-dubai` | N-14 | 2026-10-14 |
| carpet disposal dubai | `/blog/carpet-disposal-dubai` | N-15 | 2026-10-15 |
| sofa bed removal dubai | `/blog/sofa-bed-removal-dubai` | N-16 | 2026-10-15 |
| water heater removal dubai | `/blog/water-heater-removal-dubai` | N-17 | 2026-10-15 |
| dryer disposal dubai | `/blog/dryer-disposal-dubai` | N-18 | 2026-10-16 |
| dining table removal dubai | `/blog/dining-table-removal-dubai` | N-19 | 2026-10-16 |
| armchair removal dubai | `/blog/armchair-removal-dubai` | N-20 | 2026-10-16 |
| freezer disposal dubai | `/blog/freezer-disposal-dubai` | N-21 | 2026-10-17 |
| oven removal dubai | `/blog/oven-removal-dubai` | N-22 | 2026-10-17 |
| dishwasher removal dubai | `/blog/dishwasher-removal-dubai` | N-23 | 2026-10-17 |
| furniture dismantling dubai | `/blog/furniture-dismantling-dubai` | N-24 | 2026-10-18 |
| maid room clearance dubai | `/blog/maids-room-clearance-dubai` | N-25 | 2026-10-18 |
| shop clearance dubai | `/blog/shop-clearance-dubai` | N-26 | 2026-10-18 |
| landscaping waste removal dubai | `/blog/landscaping-waste-removal-dubai` | N-27 | 2026-10-19 |
| majlis clearance dubai | `/blog/majlis-clearance-dubai` | N-28 | 2026-10-19 |
| restaurant equipment removal dubai | `/blog/restaurant-equipment-removal-dubai` | N-29 | 2026-10-19 |
| tree branch removal dubai | `/blog/tree-branch-removal-dubai` | N-30 | 2026-10-20 |
| villa storage clearance dubai | `/blog/villa-storage-clearance-dubai` | N-31 | 2026-10-20 |
| office relocation junk removal dubai | `/blog/office-relocation-junk-removal-dubai` | N-32 | 2026-10-20 |
| grass clippings disposal dubai | `/blog/grass-clippings-disposal-dubai` | N-33 | 2026-10-21 |
| studio apartment clearance dubai | `/blog/studio-apartment-clearance-dubai` | N-34 | 2026-10-21 |
| school office clearance dubai | `/blog/school-office-clearance-dubai` | N-35 | 2026-10-21 |
| hedge trimming waste removal dubai | `/blog/hedge-trimming-waste-removal-dubai` | N-36 | 2026-10-22 |
| office desk removal dubai | `/blog/office-desk-removal-dubai` | N-37 | 2026-10-22 |
| property clearance dubai | `/blog/property-clearance-dubai` | N-38 | 2026-10-22 |
| villa garden waste removal dubai | `/blog/villa-garden-waste-removal-dubai` | N-39 | 2026-10-23 |
| bedroom furniture removal dubai | `/blog/bedroom-furniture-removal-dubai` | N-40 | 2026-10-23 |
| retail fit out waste removal dubai | `/blog/retail-fit-out-waste-removal-dubai` | N-41 | 2026-10-23 |
| L shaped sofa removal dubai | `/blog/l-shaped-sofa-removal-dubai` | N-42 | 2026-10-24 |
| furniture removal apartment dubai | `/blog/apartment-furniture-removal-dubai` | N-43 | 2026-10-24 |
| office waste collection dubai | `/blog/office-waste-collection-dubai` | N-44 | 2026-10-24 |
| bulky item pickup dubai | `/blog/bulky-item-pickup-dubai` | N-45 | 2026-10-25 |
| next day junk removal dubai | `/blog/next-day-junk-removal-dubai` | N-46 | 2026-10-25 |
| old appliance removal dubai | `/blog/old-appliance-removal-dubai` | N-47 | 2026-10-25 |
| treadmill removal dubai | `/blog/treadmill-removal-dubai` | A33 | 2026-10-27 |
| decluttering service dubai | `/blog/decluttering-service-or-junk-removal-dubai` | M26 | 2026-10-27 |
| downsizing in dubai | `/blog/downsizing-clearance-dubai` | H23 | 2026-10-27 |
| media wall unit removal dubai | `/blog/media-wall-unit-removal-dubai` | C25 | 2026-10-29 |
| clear apartment before selling dubai | `/blog/clear-apartment-before-selling-dubai` | H24 | 2026-10-29 |
| cooker hood removal dubai | `/blog/cooker-hood-removal-dubai` | E30 | 2026-10-28 |
| bicycle removal dubai | `/blog/bicycle-removal-dubai` | A34 | 2026-10-28 |
| trampoline removal dubai | `/blog/trampoline-removal-dubai` | G22 | 2026-10-30 |
| bbq grill disposal dubai | `/blog/bbq-grill-disposal-dubai` | G23 | 2026-10-30 |
| walk-up stairs with no service lift | `/blog/walk-up-stairs-no-lift-dubai` | J13 | 2026-10-31 |
| shipping cartons filling a flat | `/blog/shipping-cartons-filling-a-flat-dubai` | F20 | 2026-10-31 |
| wet cardboard after a leak | `/blog/wet-cardboard-after-a-leak-dubai` | F21 | 2026-11-01 |
| municipal pickup date after key handover | `/blog/bulky-pickup-after-handover-dubai` | M31 | 2026-11-01 |
| flatmate left furniture behind | `/blog/flatmate-left-furniture-dubai` | H25 | 2026-11-02 |
| short-let manager clearing a furnished flat | `/blog/short-let-furnished-flat-clearance-dubai` | H26 | 2026-11-02 |
| glass display cabinet removal | `/blog/glass-display-cabinet-removal-dubai` | C26 | 2026-11-03 |
| bolt-together metal shelving removal | `/blog/bolt-together-shelving-removal-dubai` | A35 | 2026-11-03 |
| plumbed water dispenser removal | `/blog/plumbed-water-dispenser-removal-dubai` | E31 | 2026-11-04 |
| product boxes versus moving boxes | `/blog/product-boxes-not-moving-boxes-dubai` | F22 | 2026-11-04 |
| parking-bay locker separate from the flat | `/blog/parking-bay-locker-clearance-dubai` | J14 | 2026-11-05 |
| show-flat furniture that is not the buyer's | `/blog/show-flat-furniture-not-yours-dubai` | H27 | 2026-11-05 |
| household printer and a box of cables | `/blog/home-printer-and-cables-dubai` | E32 | 2026-11-06 |
| old furniture still in the room on delivery day | `/blog/old-furniture-still-there-on-delivery-day-dubai` | C27 | 2026-11-06 |
| polystyrene after an appliance delivery | `/blog/polystyrene-after-appliance-delivery-dubai` | F23 | 2026-11-07 |
| duvets that will not go down the chute | `/blog/duvets-that-will-not-fit-a-chute-dubai` | A36 | 2026-11-07 |
| oversized framed picture removal dubai | `/blog/oversized-framed-picture-removal-dubai` | C28 | 2026-11-07 |
| freestanding kitchen trolley removal dubai | `/blog/freestanding-kitchen-trolley-dubai` | C29 | 2026-11-07 |
| home standing desk removal dubai | `/blog/home-standing-desk-removal-dubai` | C30 | 2026-11-08 |
| keyboard and small amplifier removal dubai | `/blog/keyboard-and-amplifier-removal-dubai` | E33 | 2026-11-08 |
| projector and screen removal dubai | `/blog/projector-and-screen-removal-dubai` | E34 | 2026-11-10 |
| drum kit removal dubai | `/blog/drum-kit-removal-dubai` | A37 | 2026-11-10 |
| shredded paper kept out of a furniture load | `/blog/shredded-paper-out-of-furniture-load-dubai` | F24 | 2026-11-10 |
| lost property box in a managed building | `/blog/lost-property-box-managed-building-dubai` | H28 | 2026-11-10 |

### 5.3 · Reserved by the queue

The 45 queued primaries in §4 are **reserved but not claimed**. A reservation blocks a duplicate proposal; it does not block the topic being dropped or reassigned. A reservation becomes a claim only at publish.

### 5.4 · The check, in order

1. Is the proposed primary in **5.1**? → Stop. A money page owns it.
2. Is it in a money page's **Secondary** column in `keywords.md`? → Stop. Strengthen that page instead.
3. Is it in **5.2**? → Stop. An article owns it. Improve that article (`content-rules.md` §25).
4. Is it in **5.3**? → It is already queued. Use the existing entry; do not create a second.
5. Is it mapped in `keywords.md` at all? → If not, it goes through the admission process in *Data-Driven Keyword Expansion* **before** anything is written.
6. Clear on all five? → Proceed, and add the claim at publish.

---

## §6 · Reverse-link ledger

`content-rules.md` §13 requires every published article to carry **at least one meaningful inbound internal link**, and the blog index does not count. This is where that gets recorded, so a missing one is visible rather than assumed.

### 6.1 · Inbound links to articles

**Service-page plans below are not verified as applied. Current contextual article links are recorded after this table.**

| Article | Inbound from | Type | Anchor used | Applied |
|---|---|---|---|---|
| #7 `sofa-wont-fit-through-door-dubai` | `/services/sofa-removal` § “Getting a sofa out of an apartment” | service | “what we measure and why” | ☐ planned |
| #6 `end-of-tenancy-clearance-dubai` | `/services/house-clearance` § “Move-outs, handovers and inspections” | service | “what has to be gone before handover” | ☐ planned |
| #13 `palm-frond-disposal-dubai` | `/services/garden-waste-removal` § “Green waste we collect” | service | “what to do with cut palm fronds” | ☐ planned |
| #11 `junk-gone-today-dubai` | `/services/same-day-junk-removal` § “What makes a same-day slot possible” | service | “what decides whether today works” | ☐ planned |
| #27 `villa-handover-clearance-dubai` | `/services/villa-clearance` § “Every part of the villa” | service | “the spaces that get missed” | ☐ planned |
| #8 `service-lift-booking-dubai` | `/services/residential-junk-removal` § “Building permissions and service lifts” | service | “how a lift booking actually works” | ☐ planned |
| #20 `washing-machine-removal-dubai` | `/services/appliance-disposal` § “Strapped, trolleyed, out in one visit” | service | “what to check before the crew arrives” | ☐ planned |
| #9 `mattress-disposal-dubai` | `/blog/old-sofa-before-new-delivery-dubai` | article | “mattress disposal” | ☑ applied |
| #14 `bulky-items-tower-dubai` | `/blog/old-sofa-before-new-delivery-dubai` | article | “bulky-item tower checklist” | ☑ applied |
| #17 `old-sofa-before-new-delivery-dubai` | `/blog/mattress-disposal-dubai` | article | “old-sofa removal timeline” | ☑ applied |
| #21 `wardrobe-removal-dubai` | `/blog/before-the-crew-arrives-dubai` | article | “wardrobe removal plan” | ☑ applied |
| #28 `before-the-crew-arrives-dubai` | `/blog/wardrobe-removal-dubai` | article | “pre-arrival checklist” | ☑ applied |
| #29 `skip-hire-vs-junk-removal-dubai` | `/blog/before-the-crew-arrives-dubai` | article | “skip-hire comparison” | ☑ applied |
| #31 `office-strip-out-dubai` | `/blog/warehouse-clearance-dubai` | article | “office strip-out plan” | ☑ applied |
| #33 `warehouse-clearance-dubai` | `/blog/office-strip-out-dubai` | article | “warehouse-clearance plan” | ☑ applied |
| #37 `gated-community-clearance-dubai` | `/blog/villa-handover-clearance-dubai` | article | “gated-community clearance guide” | ☑ applied |
| #41 `estate-clearance-dubai` | `/blog/choosing-junk-removal-dubai` | article | “estate-clearance guide” | ☑ applied |
| #42 `flatpack-furniture-disposal-dubai` | `/blog/estate-clearance-dubai` | article | “flat-pack furniture guide” | ☑ applied |
| #45 `choosing-junk-removal-dubai` | `/blog/flatpack-furniture-disposal-dubai` | article | “provider comparison checklist” | ☑ applied |
| #1 `dispose-old-furniture-dubai` | `/blog/dubai-municipality-bulky-waste` | article | “old-furniture guide” | ☑ applied |
| #2 `dispose-fridge-dubai` | `/blog/dubai-municipality-bulky-waste` | article | “fridge-disposal guide” | ☑ applied |
| #4 `dubai-municipality-bulky-waste` | `/blog/dispose-old-furniture-dubai` | article | “official bulky-waste service” | ☑ applied |
| #5 `municipality-vs-paid-junk-removal-dubai` | `/blog/free-junk-removal-dubai-truth` | article | “comparison of free collection and a paid crew” | ☑ applied |
| #30 `free-junk-removal-dubai-truth` | `/blog/municipality-vs-paid-junk-removal-dubai` | article | “guide to what is genuinely free” | ☑ applied |
| #38 `e-waste-disposal-dubai` | `/blog/what-dubai-bins-wont-take` · `/blog/old-ac-unit-disposal-dubai` | article | “e-waste disposal guide” | ☑ applied |
| #44 `what-dubai-bins-wont-take` | `/blog/e-waste-disposal-dubai` | article | “guide to what Dubai bins won’t take” | ☑ applied |
| #19 `old-ac-unit-disposal-dubai` | `/blog/e-waste-disposal-dubai` | article | “old AC unit guide” | ☑ applied |
| #10 `illegal-dumping-fines-dubai` | `/blog/municipality-vs-paid-junk-removal-dubai` | article | “dumping fines guide” | ☑ applied |
| #15 `noc-moving-furniture-dubai` | `/blog/leaving-dubai-clearance-checklist` | article | “NOC to move furniture guide” | ☑ applied |
| #24 `deposit-deductions-left-furniture-dubai` | `/blog/noc-moving-furniture-dubai` | article | “landlord will deduct deposit for furniture left behind” | ☑ applied |
| #43 `leaving-dubai-clearance-checklist` | `/blog/deposit-deductions-left-furniture-dubai` | article | “moving out of Dubai checklist” | ☑ applied |
| #18 `what-we-take-dubai` | `/blog/junk-removal-cost-dubai` | article | “what junk removal companies take in Dubai” | ☑ applied |
| #25 `how-much-fits-in-one-load-dubai` | `/blog/what-we-take-dubai` | article | “how much fits in one load” | ☑ applied |
| #3 `junk-removal-cost-dubai` | `/blog/how-much-fits-in-one-load-dubai` | article | “junk removal cost in Dubai” | ☑ applied |
| #34 `out-of-hours-clearance-dubai` | `/blog/office-strip-out-dubai` | article | “out-of-hours clearance guide” | ☑ applied |
| #36 `how-long-villa-clearance-dubai` | `/blog/soil-sand-pots-disposal-dubai` | article | “how long a villa clearance takes” | ☑ applied |
| #40 `soil-sand-pots-disposal-dubai` | `/blog/how-long-villa-clearance-dubai` | article | “soil, sand and pots” | ☑ applied |
| #12 `donate-furniture-dubai` | `/blog/dispose-old-furniture-dubai` | article | “where to donate furniture in Dubai” | ☑ applied |
| #16 `what-happens-to-your-junk-dubai` | `/blog/what-dubai-bins-wont-take` | article | “what happens to your junk after removal” | ☑ applied |
| #26 `garden-waste-bins-dubai` | `/blog/soil-sand-pots-disposal-dubai` | article | “garden waste in Dubai bins” | ☑ applied |
| #22 `tv-disposal-dubai` | `/blog/e-waste-disposal-dubai` | article | “TV disposal guide” | ☑ applied |
| #32 `office-furniture-removal-dubai` | `/blog/office-strip-out-dubai` | article | “office furniture removal guide” | ☑ applied |
| #39 `renovation-waste-removal-dubai` | `/blog/skip-hire-vs-junk-removal-dubai` | article | “renovation waste removal guide” | ☑ applied |
| #35 `it-equipment-disposal-dubai` | `/blog/office-furniture-removal-dubai` | article | “IT equipment disposal guide” | ☑ applied |
| #N-1 `weekend-junk-removal-dubai` | `/blog/service-lift-booking-dubai` | article | “weekend junk removal guide” | ☑ applied |
| #N-2 `landlord-inspection-clearance-dubai` | `/blog/deposit-deductions-left-furniture-dubai` | article | “landlord inspection clearance guide” | ☑ applied |
| #N-3 `decluttering-small-dubai-apartment` | `/blog/seasonal-clear-out-dubai` | article | “guide to decluttering a small apartment” | ☑ applied |
| #N-4 `seasonal-clear-out-dubai` | `/blog/pre-ramadan-clear-out-dubai` | article | “planning a seasonal clear-out” | ☑ applied |
| #N-5 `pre-ramadan-clear-out-dubai` | `/blog/seasonal-clear-out-dubai` | article | “pre-Ramadan clear-out guide” | ☑ applied |
| #N-6 `storage-room-clearance-dubai` | `/blog/decluttering-small-dubai-apartment` | article | “storage-room clearance guide” | ☑ applied |
| #N-7 `garage-clearance-dubai` | `/blog/how-long-villa-clearance-dubai` | article | “garage-clearance guide” | ☑ applied |
| #N-8 `garden-furniture-disposal-dubai` | `/blog/garden-waste-bins-dubai` | article | “garden furniture disposal guide” | ☑ applied |
| #N-9 `balcony-clearance-dubai` | `/blog/garden-furniture-disposal-dubai` · `/blog/townhouse-clearance-dubai` · `/blog/packing-material-disposal-dubai` | article | “balcony clearance guide” | ☑ applied |
| #N-10 `childrens-room-clearance-dubai` | `/blog/seasonal-clear-out-dubai` · `/blog/bed-frame-disposal-dubai` | article | “children's room clearance guide” | ☑ applied |
| #N-11 `packing-material-disposal-dubai` | `/blog/junk-gone-today-dubai` · `/blog/balcony-clearance-dubai` · `/services/junk-removal` | article · service | “packing-material guide” · “guide to sorting packing material” | ☑ applied |
| #N-12 `bed-frame-disposal-dubai` | `/blog/mattress-disposal-dubai` · `/blog/childrens-room-clearance-dubai` · `/blog/broken-furniture-disposal-dubai` | article | “guide to getting rid of a bed frame” | ☑ applied |
| #N-13 `townhouse-clearance-dubai` | `/blog/garage-clearance-dubai` | article | “townhouse clearance guide” | ☑ applied |
| #N-14 `broken-furniture-disposal-dubai` | `/blog/dispose-old-furniture-dubai` | article | “broken furniture guide” | ☑ applied |
| #N-15 `carpet-disposal-dubai` | `/blog/storage-room-clearance-dubai` | article | “carpet disposal guide” | ☑ applied |
| #N-16 `sofa-bed-removal-dubai` | `/blog/sofa-wont-fit-through-door-dubai` | article | “sofa bed removal guide” | ☑ applied |
| #N-17 `water-heater-removal-dubai` | `/blog/washing-machine-removal-dubai` | article | “water heater removal guide” | ☑ applied |
| #N-18 `dryer-disposal-dubai` | `/blog/washing-machine-removal-dubai` | article | “dryer disposal guide” | ☑ applied |
| #N-19 `dining-table-removal-dubai` | `/blog/armchair-removal-dubai` · `/blog/dispose-old-furniture-dubai` | article | “dining table guide” | ☑ applied |
| #N-20 `armchair-removal-dubai` | `/blog/dining-table-removal-dubai` · `/blog/dispose-old-furniture-dubai` | article | “armchair guide” | ☑ applied |
| #N-21 `freezer-disposal-dubai` | `/blog/dispose-fridge-dubai` | article | “freezer disposal guide” | ☑ applied |
| #N-22 `oven-removal-dubai` | `/blog/dishwasher-removal-dubai` | article | “oven removal guide” | ☑ applied |
| #N-23 `dishwasher-removal-dubai` | `/blog/washing-machine-removal-dubai` · `/blog/oven-removal-dubai` | article | “dishwasher removal guide” | ☑ applied |
| #N-24 `furniture-dismantling-dubai` | `/blog/wardrobe-removal-dubai` | article | “furniture dismantling guide” | ☑ applied |
| #N-25 `maids-room-clearance-dubai` | `/blog/villa-handover-clearance-dubai` | article | “maid's-room clearance guide” | ☑ applied |
| #N-26 `shop-clearance-dubai` | `/blog/office-strip-out-dubai` | article | “shop clearance guide” | ☑ applied |
| #N-27 `landscaping-waste-removal-dubai` | `/blog/garden-furniture-disposal-dubai` | article | “landscaping-waste removal guide” | ☑ applied |
| #N-28 `majlis-clearance-dubai` | `/blog/villa-handover-clearance-dubai` | article | “majlis-clearance guide” | ☑ applied |
| #N-29 `restaurant-equipment-removal-dubai` | `/blog/shop-clearance-dubai` | article | “restaurant-equipment removal guide” | ☑ applied |
| #N-30 `tree-branch-removal-dubai` | `/blog/landscaping-waste-removal-dubai` | article | “tree branch removal guide” | ☑ applied |
| #N-31 `villa-storage-clearance-dubai` | `/blog/villa-handover-clearance-dubai` | article | “villa storage clearance guide” | ☑ applied |
| #N-32 `office-relocation-junk-removal-dubai` | `/blog/office-furniture-removal-dubai` | article | “office-relocation junk-removal guide” | ☑ applied |
| #N-33 `grass-clippings-disposal-dubai` | `/blog/landscaping-waste-removal-dubai` | article | “grass-clippings disposal guide” | ☑ applied |
| #N-34 `studio-apartment-clearance-dubai` | `/blog/decluttering-small-dubai-apartment` | article | “studio-apartment clearance guide” | ☑ applied |
| #N-35 `school-office-clearance-dubai` | `/blog/office-furniture-removal-dubai` | article | “school-office clearance guide” | ☑ applied |
| #N-36 `hedge-trimming-waste-removal-dubai` | `/blog/tree-branch-removal-dubai` | article | “hedge-trimming waste guide” | ☑ applied |
| #N-37 `office-desk-removal-dubai` | `/blog/office-furniture-removal-dubai` | article | “office desk removal guide” | ☑ applied |
| #N-38 `property-clearance-dubai` | `/blog/landlord-inspection-clearance-dubai` | article | “property clearance guide” | ☑ applied |
| #N-39 `villa-garden-waste-removal-dubai` | `/blog/garden-furniture-disposal-dubai` | article | “villa-garden waste removal guide” | ☑ applied |
| #N-40 `bedroom-furniture-removal-dubai` | `/blog/wardrobe-removal-dubai` | article | “bedroom-furniture removal guide” | ☑ applied |
| #N-41 `retail-fit-out-waste-removal-dubai` | `/blog/shop-clearance-dubai` | article | “retail fit-out waste removal guide” | ☑ applied |
| #N-42 `l-shaped-sofa-removal-dubai` | `/blog/sofa-wont-fit-through-door-dubai` | article | “L-shaped sofa removal guide” | ☑ applied |
| #N-43 `apartment-furniture-removal-dubai` | `/blog/bulky-items-tower-dubai` | article | “apartment furniture removal guide” | ☑ applied |
| #N-44 `office-waste-collection-dubai` | `/blog/office-furniture-removal-dubai` | article | “one-off office waste collection guide” | ☑ applied |
| #N-45 `bulky-item-pickup-dubai` | `/blog/before-the-crew-arrives-dubai` | article | “bulky-item pickup photo and route checklist” | ☑ applied |
| #N-46 `next-day-junk-removal-dubai` | `/blog/junk-gone-today-dubai` | article | “next-day junk-removal checklist” | ☑ applied |
| #N-47 `old-appliance-removal-dubai` | `/blog/dispose-fridge-dubai` | article | “old-appliance removal register” | ☑ applied |
| #A33 `treadmill-removal-dubai` | `/blog/bulky-item-pickup-dubai` | article | “treadmill removal guide” | ☑ applied |
| #M26 `decluttering-service-or-junk-removal-dubai` | `/blog/decluttering-small-dubai-apartment` | article | “decluttering service with junk removal” | ☑ applied |
| #H23 `downsizing-clearance-dubai` | `/blog/leaving-dubai-clearance-checklist` | article | “downsizing clearance plan” | ☑ applied |
| #C25 `media-wall-unit-removal-dubai` | `/blog/tv-disposal-dubai` | article | “media-wall unit guide” | ☑ applied |
| #H24 `clear-apartment-before-selling-dubai` | `/blog/property-clearance-dubai` | article | “pre-sale apartment plan” | ☑ applied |
| #E30 `cooker-hood-removal-dubai` | `/blog/oven-removal-dubai` | article | “cooker-hood guide” | ☑ applied |
| #A34 `bicycle-removal-dubai` | `/blog/garage-clearance-dubai` | article | “bicycle removal guide” | ☑ applied |
| #G22 `trampoline-removal-dubai` | `/services/garden-waste-removal` | service | “trampoline removal guide” | ☑ applied |
| #G23 `bbq-grill-disposal-dubai` | `/services/garden-waste-removal` | service | “BBQ grill disposal guide” | ☑ applied |
| #J13 `walk-up-stairs-no-lift-dubai` | `/blog/service-lift-booking-dubai` · `/areas/al-barsha` | article · area | “walk-up stairs guide” | ☑ applied |
| #F20 `shipping-cartons-filling-a-flat-dubai` | `/services/junk-removal` · `/blog/packing-material-disposal-dubai` | service · article | “shipping-carton plan” | ☑ applied |
| #F21 `wet-cardboard-after-a-leak-dubai` | `/services/junk-removal` · `/blog/packing-material-disposal-dubai` | service · article | “note on wet cardboard after a leak” | ☑ applied |
| #M31 `bulky-pickup-after-handover-dubai` | `/blog/dubai-municipality-bulky-waste` · `/blog/end-of-tenancy-clearance-dubai` | article | “guide to a pickup that falls after handover” | ☑ applied |
| #H25 `flatmate-left-furniture-dubai` | `/services/furniture-removal` · `/blog/property-clearance-dubai` · `/blog/end-of-tenancy-clearance-dubai` · `/blog/deposit-deductions-left-furniture-dubai` | service · article | “note on furniture a flatmate left” | ☑ applied |
| #H26 `short-let-furnished-flat-clearance-dubai` | `/services/furniture-removal` · `/blog/property-clearance-dubai` · `/areas/jbr` | service · article · area | “short-let clearance note” | ☑ applied |
| #C26 `glass-display-cabinet-removal-dubai` | `/services/furniture-removal` · `/blog/dining-table-removal-dubai` · `/blog/furniture-dismantling-dubai` | service · article | “glass display-cabinet note” | ☑ applied |
| #A35 `bolt-together-shelving-removal-dubai` | `/services/junk-removal` · `/blog/garage-clearance-dubai` · `/blog/furniture-dismantling-dubai` · `/blog/warehouse-clearance-dubai` | service · article | “metal-shelving note” | ☑ applied |
| #E31 `plumbed-water-dispenser-removal-dubai` | `/services/junk-removal` · `/blog/dispose-fridge-dubai` · `/blog/old-appliance-removal-dubai` · `/blog/water-heater-removal-dubai` | service · article | “plumbed-dispenser note” | ☑ applied |
| #F22 `product-boxes-not-moving-boxes-dubai` | `/services/junk-removal` · `/blog/packing-material-disposal-dubai` · `/blog/shop-clearance-dubai` · `/blog/shipping-cartons-filling-a-flat-dubai` · `/blog/warehouse-clearance-dubai` · `/areas/al-quoz` | service · article · area | “product-box note” | ☑ applied |
| #J14 `parking-bay-locker-clearance-dubai` | `/services/junk-removal` · `/blog/dubai-municipality-bulky-waste` · `/blog/storage-room-clearance-dubai` · `/blog/bulky-items-tower-dubai` · `/areas/downtown-dubai` · `/blog/clear-apartment-before-selling-dubai` | service · article · area | “parking-bay locker note” | ☑ applied |
| #H27 `show-flat-furniture-not-yours-dubai` | `/services/furniture-removal` · `/blog/property-clearance-dubai` · `/blog/clear-apartment-before-selling-dubai` · `/blog/flatpack-furniture-disposal-dubai` | service · article | “show-flat furniture note” | ☑ applied |
| #E32 `home-printer-and-cables-dubai` | `/services/e-waste-disposal` · `/services/waste-removal` · `/blog/e-waste-disposal-dubai` · `/blog/it-equipment-disposal-dubai` | service · article | “home printer and cable note” | ☑ applied |
| #C27 `old-furniture-still-there-on-delivery-day-dubai` | `/services/furniture-removal` · `/blog/old-sofa-before-new-delivery-dubai` · `/blog/bulky-item-pickup-dubai` · `/blog/service-lift-booking-dubai` | service · article | “note on old furniture still there on delivery day” | ☑ applied |
| #F23 `polystyrene-after-appliance-delivery-dubai` | `/services/junk-removal` · `/blog/packing-material-disposal-dubai` · `/blog/old-appliance-removal-dubai` · `/blog/tv-disposal-dubai` · `/blog/product-boxes-not-moving-boxes-dubai` · `/blog/shipping-cartons-filling-a-flat-dubai` | service · article | “polystyrene note” | ☑ applied |
| #A36 `duvets-that-will-not-fit-a-chute-dubai` | `/services/junk-removal` · `/blog/what-dubai-bins-wont-take` · `/blog/mattress-disposal-dubai` · `/blog/what-we-take-dubai` | service · article | “bedding note” | ☑ applied |
| #C28 `oversized-framed-picture-removal-dubai` | `/services/furniture-removal` · `/blog/furniture-dismantling-dubai` · `/blog/bulky-item-pickup-dubai` · `/blog/media-wall-unit-removal-dubai` · `/blog/glass-display-cabinet-removal-dubai` | service · article | “framed-picture note” | ☑ applied |
| #C29 `freestanding-kitchen-trolley-dubai` | `/services/furniture-removal` · `/blog/oven-removal-dubai` · `/blog/cooker-hood-removal-dubai` · `/blog/apartment-furniture-removal-dubai` | service · article | “trolley note” | ☑ applied |
| #C30 `home-standing-desk-removal-dubai` | `/services/furniture-removal` · `/blog/office-desk-removal-dubai` · `/blog/furniture-dismantling-dubai` · `/blog/it-equipment-disposal-dubai` · `/blog/home-printer-and-cables-dubai` | service · article | “standing-desk note” | ☑ applied |
| #E33 `keyboard-and-amplifier-removal-dubai` | `/services/junk-removal` · `/services/waste-removal` · `/blog/e-waste-disposal-dubai` · `/blog/bulky-item-pickup-dubai` · `/blog/what-we-take-dubai` | service · article | “keyboard and amplifier note” | ☑ applied |
| #E34 `projector-and-screen-removal-dubai` | `/services/junk-removal` · `/blog/tv-disposal-dubai` · `/blog/media-wall-unit-removal-dubai` · `/blog/furniture-dismantling-dubai` · `/blog/e-waste-disposal-dubai` · `/blog/what-we-take-dubai` | service · article | “projector and screen note” | ☑ applied |
| #A37 `drum-kit-removal-dubai` | `/services/junk-removal` · `/services/furniture-removal` · `/blog/bulky-items-tower-dubai` · `/blog/bulky-item-pickup-dubai` · `/blog/keyboard-and-amplifier-removal-dubai` | service · article | “drum-kit note” | ☑ applied |
| #F24 `shredded-paper-out-of-furniture-load-dubai` | `/services/waste-removal` · `/services/office-clearance` · `/blog/office-furniture-removal-dubai` · `/blog/office-waste-collection-dubai` · `/blog/office-desk-removal-dubai` · `/blog/packing-material-disposal-dubai` · `/areas/difc` | service · article · area | “shredded-paper note” | ☑ applied |
| #H28 `lost-property-box-managed-building-dubai` | `/services/junk-removal` · `/blog/property-clearance-dubai` · `/blog/what-we-take-dubai` · `/blog/before-the-crew-arrives-dubai` | service · article | “lost-property box note” | ☑ applied |

Verified revision-body inbound links: #6 from the washing-machine guide ("end-of-tenancy planning guide"); #11 from the washing-machine guide ("urgent collection checklist"); #13 and #20 from the tenancy guide. These contextual article links meet the inbound requirement independently of the planned service edits.

*Type:* `service` · `area` · `article` · `pillar`.
*Anchor used* is recorded so that `content-rules.md` §14's anchor-diversity rule can actually be checked across the corpus — the only way to notice the same exact-match anchor appearing six times is to have written them all down.

### 6.2 · Planned reverse-link slots

`keywords.md` contains a *Reverse-link opportunities from existing content* table mapping each service page's existing sections to the articles that should link down from them. **Those are the intended slots.** As each article publishes, record the applied link in 6.1 and tick it here.

| Money page | Existing section | Planned link down | Applied |
|---|---|---|---|
| `/services/junk-removal` | "What we cannot take" | what-dubai-bins-wont-take · illegal-dumping-fines-dubai | ☐ |
| `/services/junk-removal` | "What counts as junk" | packing-material-disposal-dubai | ☑ |
| `/services/furniture-removal` | "Usable furniture is passed on" | donate-furniture-dubai · dispose-old-furniture-dubai | ☐ |
| `/services/sofa-removal` | "Getting a sofa out of an apartment" | sofa-wont-fit-through-door-dubai · service-lift-booking-dubai | ☐ |
| `/services/appliance-disposal` | "Where old appliances go" | dispose-fridge-dubai · e-waste-disposal-dubai | ☐ |
| `/services/house-clearance` | "Move-outs, handovers and inspections" | end-of-tenancy-clearance-dubai · deposit-deductions-left-furniture-dubai · leaving-dubai-clearance-checklist | ☐ |
| `/services/villa-clearance` | "Gate access and community rules" | gated-community-clearance-dubai · villa-handover-clearance-dubai | ☐ |
| `/services/garden-waste-removal` | "Green waste we collect" | palm-frond-disposal-dubai | ☐ |
| `/services/residential-junk-removal` | "Building permissions and service lifts" | service-lift-booking-dubai · noc-moving-furniture-dubai | ☐ |
| `/services/same-day-junk-removal` | "What makes a same-day slot possible" | junk-gone-today-dubai | ☐ |
| `/services/commercial-junk-removal` | "Out of hours and on a schedule" | out-of-hours-clearance-dubai · office-strip-out-dubai | ☐ |
| `/how-it-works` | process steps | junk-removal-cost-dubai · how-much-fits-in-one-load-dubai | ☐ |

**A reverse link is applied by editing the existing page's copy at that point** — not by appending a link list. If the sentence does not want the link, the link is wrong (`content-rules.md` §12, R5).

### 6.3 · Orphan watch

Any article in §3 with an empty **Inbound** column is an orphan and **must not have been published.** If one appears here, it is a process failure: fix the link immediately and log it in §12.

| Article | Days without inbound | Action |
|---|---|---|
| — | *None* | — |

---

## §7 · Verification and unblocking ledger

**All 44 mapped opportunities in Month 1 and Month 2 are now published or resolved. #35 was published on 2026-10-08 alongside expansion articles N-1 and N-2.**

### 7.1 · BLOCKED — source verification required (1 remaining)

Unblocked by verifying against a **primary official source** and citing it. Competitor blogs are not acceptable (`content-rules.md` §7).

| # | Primary keyword | Money page |
|---|---|---|
| — | — | — |

**#22 conflict resolved 2026-10-07:** `keywords.md` cluster row E19 now maps `TV disposal dubai` as BLOG on `/blog/tv-disposal-dubai`. Dubai Municipality's Waste Segregation Guide and bulky-waste service verify the electronics routes described in the draft.

**#12 cleared 2026-10-06:** published structured around verified recipient acceptance conditions (clean, sturdy, verified intake channels) without fabricating charity collection numbers or unsubstantiated pickup promises.

**#26 cleared 2026-10-06:** published focusing on domestic bin limits, compactor damage, weight safety, and Law No. (18) of 2024 prohibitions without inventing municipal green-waste collection routes.

**Verification batches** — resolving these four clears most of the group:

| Batch | Covers | Unblocks |
|---|---|---|
| **A · Municipality bulky waste** | The service, its channels, eligibility, any ground-level/carry-down limit, any area exclusions | 1, 2, 4, 5, 12, 30 |
| **B · Waste rules and penalties** | What may not go in bins, dumping prohibitions, any fines | 10, 26, 44 |
| **C · E-waste and appliances** | Classification of fridges, ACs, TVs; refrigerant handling requirements | 2, 19, 22, 38 |
| **D · Tenancy and building rules** | Deposit/handover norms, NOC requirements | 15, 24, 43 |

**Record each verification below as it completes** — so the next article on the same fact reuses the source instead of re-researching it.

| Fact verified | Source (URL) | Date checked | Checked by | Re-check due |
|---|---|---|---|---|
| Law No. (26) of 2007: Art. 20 (security deposit guarantees property maintenance upon expiry; landlord must refund upon expiry); Art. 21 (tenant must deliver leased property upon lease expiry in the same condition received, ordinary wear and tear excepted); Art. 22 (fees/taxes paid by tenant); amended by Law No. (33) of 2008. Dispute resolution via Rental Dispute Center (RDC) at Dubai Land Department. | [Dubai Legislation Portal — Law No. (26) of 2007 (PDF)](https://dlp.dubai.gov.ae/Legislation%20Reference/2007/Law%20No.%20(26)%20of%202007%20Regarding%20regulation%20between%20the%20lessor%20and%20the%20lessee.pdf) · [Law No. (33) of 2008](https://dlp.dubai.gov.ae/Legislation%20Reference/2009/Law%20No.%20(33)%20of%202008%20Amending%20Law%20No.%20(26)%20of%202007.html) | 2026-10-03 | Claude | 2027-04-03 |
| Law No. (6) of 2019 Concerning Ownership of Jointly Owned Real Property: regulates management and access control of common areas in residential buildings and communities by licensed owners association management companies. Developer community portals (ECM, NCM, DSOA) enforce move-out permits and service lift bookings. | [Dubai Legislation Portal — Law No. (6) of 2019 (PDF)](https://dlp.dubai.gov.ae/Legislation%20Reference/2019/Law%20No.%20(6)%20of%202019%20Concerning%20Ownership%20of%20Jointly%20Owned%20Real%20Property.pdf) | 2026-10-03 | Claude | 2027-04-03 |
| DEWA Move-Out service: official channel for final meter reading, bill settlement, clearance certificate generation and security deposit refund. | [DEWA Move-Out service](https://www.dewa.gov.ae/en/consumer/billing/move-out) | 2026-10-03 | Claude | 2027-04-03 |
| DM Waste Segregation Guide: applies to commercial, residential (villas, buildings, complexes), industrial and institutional sectors; minimum three bins (green recyclables, black general, brown organic — organic colour marked for future implementation); black/clear bag rule; non-recyclable lists per material; e-waste, batteries/lamps and clothing → Smart Sustainability Oasis or approved companies; paint/pesticide containers → approved hazardous waste company; furniture/white goods → bulky waste programme, hotline 800-900; SSO centres listed include Al Twar Center, Quranic Garden Al Khawaneej, Mirdif Park, Nadd Al Hamar Park; non-compliance fines AED 5,000 / 1,000 / 1,000 for organisations and complexes. | [Waste Segregation Guide (PDF)](https://dmpmedia.dm.gov.ae/uploads/2024/12/Waste-Segregation-Guide.pdf) | 2026-10-02 | Claude | 2027-04-02 |
| DM Technical Guideline No. 5 (2015 revision): electrical and electronic equipment is a special-waste sub-category of household waste; horticultural waste is a separate category. | [Technical Guideline No. 5 (PDF)](https://dmpmedia.dm.gov.ae/uploads/2022/01/Technical-Guidelines-no.5-Waste-Classification.pdf) | 2026-10-02 | Claude | 2027-04-02 |
| MOCCAE Ministerial Decree No. (138) of 2023 (announced 15 May 2023): regulates HFCs (“often referred to as refrigerant gases”) UAE-wide incl. free zones for entities engaged in HFC activities; establishments need prior consent to dispose of waste HFCs and equipment containing them; groundwork for gas retrieval and recycling; HFC ban intended by 2040. | [MOCCAE announcement](https://moccae.gov.ae/en/media-center/news/15/5/2023/ministry-of-climate-change-and-environment-issues-a-ministerial-decree-on-the-regulation-of-hydroflu) | 2026-10-02 | Claude | 2027-04-02 |
| Household furniture, electrical appliances and electronics are included; service is free with a published three-working-day time; investment/development and free-zone exclusions apply. | [Dubai Municipality services](https://www.dm.gov.ae/dubai-municipality-services/) · [official bulky-waste announcement](https://www.dm.gov.ae/dubai-municipality-promotes-waste-segregation-through-free-bulky-waste-disposal-service/) | 2026-09-30 | Codex | 2026-12-30 |
| Law No. (18) of 2024: Art. 6 prohibits dumping, discarding or placing waste in public places and storing waste in buildings or public places; Art. 9 requires a DM permit for waste-management activity; Art. 20 caps fines at AED 500,000 and doubles them for a repeat within one year, with the Executive Council Chairman setting the fine schedule; Art. 30 keeps earlier implementing resolutions in force where consistent; issued 4 September 2024. | [Dubai Legislation Portal — Law No. (18) of 2024](https://dlp.dubai.gov.ae/Legislation%20Reference/2024/Law%20No.%20(18)%20of%202024%20Regulating%20Waste%20Management.html) | 2026-10-01 | Claude | 2027-04-01 |
| Executive Council Resolution No. (58) of 2017 schedule: AED 1,000 for disposing of general waste other than at the designated disposal site; AED 10,000 for waste-management activity without a permit; doubling on repeat within a year, capped at AED 100,000. No entry specific to furniture left in public places. | [Dubai Legislation Portal — Resolution No. (58) of 2017](https://dlp.dubai.gov.ae/Legislation%20Reference/2017/Executive%20Council%20Resolution%20No.%20(58)%20of%202017.html) | 2026-10-01 | Claude | 2027-04-01 |
| DM bulky-waste service re-checked: free, three working days, investment-zone exclusion; 2022 announcement states the purpose of eliminating harmful practices including accumulation of bulky waste. | [Dubai Municipality services](https://www.dm.gov.ae/dubai-municipality-services/) | 2026-10-01 | Claude | 2027-01-01 |

### 7.2 · BLOCKED — service capability confirmation required (0 remaining)

Unblocked by the business confirming — and being able to evidence — the capability. **If it cannot, the claim is removed or the article dropped.**

| # | Primary keyword | Capability to confirm |
|---|---|---|
| — | — | — |

**#35 cleared 2026-10-08:** Published with explicit boundary that clearance team does not provide certified cryptographic data erasure; data sanitisation must be performed by client or certified data firm prior to collection, while clearance team handles physical hardware removal and segregation for licensed e-waste handlers under DM Technical Guideline No. 5.

**#32 and #39 cleared 2026-10-07:** The owner confirmed office furniture collection with the stated sorting/reuse route and renovation debris collection with required permissions. The owner confirmed that certified data erasure is not provided; the office furniture article states this explicitly.

**#16 cleared 2026-10-06:** published mapping the real disposal and recycling chain (on-site sorting, scrap metals, cardboard recovery, licensed e-waste, and municipal transfer) under DM Technical Guideline No. 5 and Law No. (18) of 2024.

### 7.3 · READY — business input required (0 remaining)

Unblocked by the business supplying real figures. **None may be invented, estimated or taken from a competitor** (`content-rules.md` §18).

| # | Primary keyword | Input needed |
|---|---|---|
| ~~34~~ | ~~out of hours clearance dubai~~ | **Cleared 2026-10-05** from existing site copy: out-of-hours work available for office/commercial jobs; pickups 7 days a week. |
| ~~36~~ | ~~how long does a villa clearance take dubai~~ | **Published 2026-10-05** using only the site's existing range (half a day to two days; 4+ crew; multiple loads). Real durations from completed jobs would still strengthen it — not supplied. |
| ~~40~~ | ~~soil removal dubai~~ | **Published 2026-10-05** without a weight figure: bagged soil is part of a normal load and large loose volumes are confirmed from photos (existing site copy). A real weight limit is still not supplied; add it if the business provides one. |

### 7.4 · Cross-file dependencies that block publishing entirely

These block **every** article, not individual ones.

| # | Dependency | Source | Status |
|---|---|---|---|
| **D-1** | **A real author record** — required relationship; `content-rules.md` §6 forbids inventing one | `content-rules.md` B-1 | ☐ Open |
| **D-2** | **Cover image supply** — required to publish; depends on D-3. **Tracked per article in [`image-backlog.md`](./image-backlog.md)** (IB-1 to IB-4, all `NEEDED`). | `image.md` I-2 | ☐ Open |
| **D-3** | ~~Provenance of the existing photographs~~ — **RESOLVED 2026-09-20: AI-generated**, C2PA-confirmed. Library unusable for article covers under `image.md` §7; Route D closed. **Does not unblock D-2** — it redirects it to licensed stock or own photography. | `image.md` I-1 | ☑ **Closed** |
| **D-4** | **`BLOB_READ_WRITE_TOKEN` set** — otherwise uploads are invisible to the live site | `image.md` I-4 | ☐ Open |
| **D-5** | **Analytics and Search Console** — nothing is measurable until configured | `keywords.md` Measurement Plan | ☐ Open |
| **D-6** | **C-1 / C-2 pre-publish SEO review** — sign off before publishing at volume | `keywords.md` Cannibalization Map | ☐ Open |
| **D-7** | ~~#6 / #23 slug collision~~ — **RESOLVED 2026-09-20.** Approved decision: #23 consolidated into #6; `move out clearance dubai` is a secondary keyword of `/blog/end-of-tenancy-clearance-dubai`. `keywords.md` corrected to match cluster row H9. | §4.1 | ☑ **Closed** |

> **D-1 and D-2 are the binding ones.** Until an author exists and a cover image can be supplied, **no article can publish regardless of how many are written.** Clearing them is worth more than clearing any verification batch.

---

## §8 · Retired, merged and redirected

Changing a published slug writes a 301 automatically, but the decision still needs recording — a redirect nobody remembers creating is a redirect nobody dares remove.

**Currently empty.**

| Old slug | New destination | Reason | Date | Logged by |
|---|---|---|---|---|
| — | *None* | — | — | — |

**When to merge rather than add** (`content-rules.md` §25): if two articles compete, fold the weaker into the stronger, redirect it, release its keyword claim in §5.2, and log it in §12. **Two half-ranking pages are worth less than one that ranks.**

---

## §9 · Maintenance schedule

Driven by the **Facts** column in §3.

| Facts value | Meaning | Re-check |
|---|---|---|
| **`none`** | Rests only on operational knowledge | On material service change |
| **`sourced`** | Rests on external facts — Municipality, legal, charity, regulatory | **Every 6 months, and whenever the source changes.** Rules and channels change without notice; a stale regulatory article is worse than none |
| **`business`** | Contains business-supplied figures — prices, capacities, durations, availability | **Whenever the underlying figure changes.** A wrong price produces a bad enquiry and a bad first impression |

### Standing checks

| Cadence | Check |
|---|---|
| **Per publish** | §3, §5.2 and §6.1 rows added |
| **Weekly** | Orphan watch (§6.3); any new reverse-link slots now available |
| **Fortnightly** | `sourced` articles whose sources may have moved; external links still resolve |
| **Monthly** | Full registry integrity check (§11); reconcile §5 against `keywords.md` |
| **On Search Console signals** | Two URLs alternating on one query → cannibalization. Check §5, resolve per `keywords.md`, log in §12 |

---

## §10 · Adding an entry — worked example

The shape of a complete registration. **Illustrative only — this article is blocked and not written.**

```
AT COMMISSIONING
  §4  Row 13 status → CLEARED, marked commissioned
  §3  New record, state DRAFTING (not live, Published date empty):
      ID 13 · slug palm-frond-disposal-dubai · archetype A · cluster SC1
      primary keyword "palm frond removal dubai"
      money page /services/garden-waste-removal
      areas jumeirah, arabian-ranches, the-springs

AT PUBLISH
  §3  state → PUBLISHED · Published date set 2026-XX-XX · last reviewed same
      (now, and only now, the URL must resolve publicly)
      facts: none  (operational knowledge only — no Municipality claim)
      inbound: /services/garden-waste-removal
  §5.2 New claim:
      "palm frond removal dubai" → /blog/palm-frond-disposal-dubai · ID 13
  §6.1 New inbound row:
      from /services/garden-waste-removal, section "Green waste we collect"
      type service · anchor "what to do with cut palm fronds"
  §6.2 Tick the garden-waste row
  §12  Log the publish

IF A BLOCK HAD CLEARED FIRST
  §7.1 Record the fact, its source URL, the date and the re-check due date
       — so the next article resting on it reuses the source
```

---

## §11 · Registry integrity checks

Run monthly. **The registry's only value is being true.**

**Checks are state-aware** — a draft is not a broken published article.

**Live state**
- [ ] Every article live at `/blog` has a `PUBLISHED` or `UPDATED` record in §3
- [ ] Every `PUBLISHED` / `UPDATED` record resolves at its `/blog/{slug}` and has a **Published** date
- [ ] Every `PUBLISHED` / `UPDATED` record has its primary keyword in §5.2, exactly once
- [ ] Every `PUBLISHED` / `UPDATED` record has a non-empty **Inbound** value (§6.3)

**In-progress state**
- [ ] Every `DRAFTING` / `REVIEW` record is a valid record — **but is not expected to be live**, has no Published date, and holds no §5.2 claim yet
- [ ] No `DRAFTING` / `REVIEW` record has been sitting unchanged long enough to be abandoned rather than in progress

**Ended state**
- [ ] Every `MERGED` / `RETIRED` record has a matching §8 row, and its old slug still redirects
- [ ] Any keyword released by a merge or retirement has been removed from §5.2

**Uniqueness and ownership**
- [ ] **No two active records (`DRAFTING` → `UPDATED`) hold the same slug**
- [ ] **No consolidated opportunity has become an article** — #23 remains `CONSOLIDATED → #6` with no slug, no record in §3 and no claim in §5.2 (§4.1)
- [ ] **No opportunity marked consolidated has entered `DRAFTING`** — consolidation is a queue status; it never enters the §2 lifecycle
- [ ] No §5.2 claim duplicates a §5.1 money-page claim or a `keywords.md` secondary
- [ ] Every §5.2 keyword is mapped in `keywords.md`

**Content discipline**
- [ ] Every article reaching `REVIEW` has a completed claim audit (`content-rules.md` §7)

**Reconciliation**
- [ ] §4 statuses match the Article Opportunity Map in `keywords.md`
- [ ] §7 ledgers reconcile with §4 statuses
- [ ] Every `sourced` published article has a verification row in §7.1 with a live source
- [ ] No published article is past its re-check date (§9)
- [ ] §12 has an entry for every change since the last check

**If a check fails, fix the registry before writing anything else.** A ledger that is 90% true is trusted and wrong, which is worse than one that is obviously empty.

---

## §12 · Change log

Every change to the registry, newest first. **One line per change.** This is what makes the audit trail real.

Format: `YYYY-MM-DD · what changed · why · who`

| Date | Change | Reason |
|---|---|---|
| 2026-11-10 | Set F24 and H28 to `PUBLISHED`, dated 2026-11-10, with §5.2 claims and inbound links marked applied. Production was not verified in this change. | The owner said “Merge and live”. The parent squash-merge and a production check are still pending. |
| 2026-11-10 | Wrote F24 and H28 as repository review drafts. Admitted `shredded paper kept out of a furniture load` and `lost property box in a managed building` with status `REVIEW`, not `PUBLISHED`. No Published date and no §5.2 claim. Reused existing inspected office-floor and estate-clearance images. Inbound sentences prepared from the waste-removal page, the office-clearance page, the office-furniture, office-waste, office-desk and packing guides, and the DIFC area page, and from the junk-removal page, the property-clearance guide, the acceptance guide and the arrival checklist. Left G24, K21, G25, K20, M29 and M30 unpublished. Left G26 and M28 out of scope. Left the 30-day plan’s water-damaged furniture and piano slots blocked. | The Day 12 slots on the goal-keyword calendar. Both were approved for writing and review on 2026-11-10. The pages are not a published claim. A later merge-and-live approval is required before either row becomes `PUBLISHED`. The repository has no draft flag, so merging this change would make the URLs resolve. |
| 2026-11-10 | Set E34 and A37 to `PUBLISHED`, dated 2026-11-10, with §5.2 claims and inbound links marked applied. Production was not verified in this change. | The owner said “Merge and live”. The parent squash-merge and a production check are still pending. |
| 2026-11-09 | Wrote E34 and A37 as repository review drafts. Admitted `projector and screen removal dubai` and `drum kit removal dubai` with status `REVIEW`, not `PUBLISHED`. No Published date and no §5.2 claim. Reused existing inspected television and tower-lift images. Inbound sentences prepared from the junk-removal page, the television, media-wall, dismantling, e-waste and acceptance guides, and from the junk-removal page, the furniture-removal page, the tower guide, the bulky-item guide and the keyboard guide. Left G24, K21, G25, K20, M29 and M30 unpublished. Left G26 and M28 out of scope. | The Day 11 slots on the goal-keyword calendar. The owner approved both for writing and review on 2026-11-09 (Asia/Karachi). The pages are not live. A later merge-and-live approval is required before either row becomes `PUBLISHED`. |
| 2026-11-08 | Set C30 and E33 to `PUBLISHED`, dated 2026-11-08, with §5.2 claims and inbound links marked applied. Production was not verified in this change. | The owner said “Merge and live” at 23:24 Asia/Karachi. The parent squash-merge and a production check are still pending. |
| 2026-11-08 | Wrote C30 and E33 as repository review drafts. Admitted `home standing desk removal dubai` and `keyboard and small amplifier removal dubai` with status `REVIEW`, not `PUBLISHED`. No Published date and no §5.2 claim. Reused existing inspected office-desk and home-room images. Inbound sentences prepared from the furniture-removal page and the office-desk, dismantling, IT and home-printer guides, and from the junk-removal page, the waste-removal page, the e-waste guide, the bulky-item guide and the acceptance guide. Left G24, K21, G25, K20, M29 and M30 unpublished. Left G26 and M28 out of scope. | The Day 10 slots on the goal-keyword calendar. The owner approved both for writing and review on 2026-11-08 (Asia/Karachi). The pages are not live. A later merge-and-live approval is required before either row becomes `PUBLISHED`. |
| 2026-11-07 | Published F23, A36, C28 and C29 as repository posts dated 2026-11-07. Admitted `polystyrene after an appliance delivery`, `duvets that will not go down the chute`, `oversized framed picture removal dubai` and `freestanding kitchen trolley removal dubai`. Reused existing inspected images. Inbound links from the junk-removal page and the packing, product-box, shipping-carton, old-appliance and television guides; from the junk-removal page and the bins, mattress and acceptance guides; from the furniture-removal page and the dismantling, bulky-item, media-wall and glass-cabinet guides; and from the furniture-removal page and the oven, hood and apartment-furniture guides. Left G24, K21, G25, K20, M29 and M30 unpublished. | The Day 6 catch-up pair and the Day 9 pair on the goal-keyword calendar. The owner approved both pairs on 2026-11-07. The blocked topics still need an owner confirmation or an official source. |
| 2026-11-06 | Published E32 and C27 as repository posts dated 2026-11-06. Admitted `household printer and a box of cables` and `old furniture still in the room on delivery day`. Reused existing inspected office-IT and furniture images. Inbound links from the e-waste service page, the waste-removal page, the e-waste guide and the office IT guide, and from the furniture-removal page, the sofa-before-delivery guide, the bulky-item guide and the service-lift guide. Left G24, K21, G25, K20, M29 and M30 unpublished. | The Day 8 slots on the goal-keyword calendar. The publishing plan’s 11-06 topics still need an owner confirmation and, for K20, an official source. |
| 2026-11-05 | Published J14 and H27 as repository posts dated 2026-11-05. Admitted `parking-bay locker separate from the flat` and `show-flat furniture that is not the buyer's`. Reused existing inspected storage-room and estate-clearance images. Inbound links from the junk-removal page, the municipal guide, the storage-room and tower guides, the Downtown area page and the pre-sale guide, and from the furniture-removal page, the property-clearance guide, the pre-sale guide and the flat-pack guide. Left G24, K21, G25, K20, M29 and M30 unpublished. | The Day 7 slots on the goal-keyword calendar. The publishing plan’s 11-05 topics still need sources and owner statements. |
| 2026-11-04 | Published E31 and F22 as repository posts dated 2026-11-04. Admitted `plumbed water dispenser removal` and `product boxes versus moving boxes`. Reused existing inspected fridge and warehouse images. Inbound links from the junk-removal page, the fridge, old-appliance and water-heater guides, and from the packing, shop, shipping-carton and warehouse guides plus the Al Quoz area page. Left G24, K21, G25, K20, M29 and M30 unpublished. G26 and M28 stayed unpublished because their source conditions were not cleared. | The next two cleared slots on the goal-keyword calendar (Day 5). The publishing plan’s 11-04 topics still need official sources. |
| 2026-11-03 | Published C26 and A35 as repository posts dated 2026-11-03. Admitted `glass display cabinet removal` and `bolt-together metal shelving removal`. Reused existing inspected furniture and garage images. Added inbound links from both money pages and the dining-table, dismantling, garage and warehouse guides. Left all source- and owner-blocked topics unpublished. | The next two cleared slots on the goal-keyword calendar (Day 4); M27 remained source-blocked. |
| 2026-11-02 | Published H25 and H26 as repository posts dated 2026-11-02. Admitted `flatmate left furniture behind` and `short-let manager clearing a furnished flat`. Reused existing inspected images. Inbound links from the furniture-removal page, the property-clearance guide, the end-of-tenancy guide, the deposit guide, and the JBR area page. Left G24, K21, G25, K20, M29 and M30 unpublished. | The next two cleared slots on the goal-keyword calendar (Day 3). The publishing plan’s 11-02 topics still need owner answers. |
| 2026-11-01 | Published F21 and M31 as repository posts dated 2026-11-01. Admitted `wet cardboard after a leak` and `municipal pickup date after key handover`. Reused existing inspected images. Inbound links from the junk-removal page and the packing guide, and from the bulky-waste guide and the end-of-tenancy guide. Left G24, K21, G25, K20, M29 and M30 unpublished. | The next two cleared slots on the goal-keyword calendar. The publishing plan’s remaining named topics still need owner answers or sources. |
| 2026-10-31 | Published J13 and F20 as repository posts dated 2026-10-31. Admitted `walk-up stairs with no service lift` and `shipping cartons filling a flat`. Reused existing inspected images. Inbound links from the service-lift guide and the Al Barsha page, and from the junk-removal page and the packing guide. Left G24, K21, G25, K20, M29 and M30 unpublished. | The next two cleared slots on the goal-keyword calendar. The publishing plan’s remaining named topics still need owner answers or sources. |
| 2026-10-30 | Published G22 as a repository post dated 2026-10-30 after the owner confirmed trampoline and outdoor play-set collection with on-site dismantling. Added the service-page inbound link and reused existing inspected garden imagery. | Owner selected the first of the two business-input questions, clearing G22 only. G23 remained blocked at that point. |
| 2026-10-30 | Published G23 as a repository post dated 2026-10-30 after the owner confirmed grill, smoker and patio-heater collection with gas cylinders retained by the customer. Added the service-page inbound link and reused inspected existing imagery. | Owner then approved the second business-input topic, clearing G23. |
| 2026-10-29 | Retitled `dubai-municipality-bulky-waste` to “How Dubai Municipality Bulky Waste Collection Works” (SEO title “Bulky Waste Collection: Municipality Guide”). Opening sentence uses the same eligibility facts. No new article. | The guide owns “bulky waste collection”. Homepage and service titles were not pointed at that phrase. |
| 2026-10-29 | Published E30 and A34 as repository posts dated 2026-10-28. Admitted `cooker hood removal dubai` and `bicycle removal dubai` after the READY queue was exhausted and G22–G24, K21 and the source-blocked rows were skipped. Reused existing images. Inbound links from the oven and garage guides. | Owner asked for the next two eligible articles with a 2026-10-28 date. No unpublished READY brief remained. |
| 2026-10-29 | Revised N-11 in place. Added a signpost to the office-waste, shop-clearance, retail-fit-out and renovation-waste guides, three FAQs the existing four did not answer, and a contextual inbound link from `/services/junk-removal` (“guide to sorting packing material”). Body is 2542 stored words. SEO title and description unchanged. No new URL: `cardboard removal dubai` stays a variant of F19. | Owner approved the closest compliant option after a new cardboard article was blocked by keyword ownership. |
| 2026-10-29 | Published C25 and H24 as repository posts with 2,000+ body words, existing inspected images, SEO fields and contextual inbound links from the TV-disposal and property-clearance guides. Left G22 unpublished: trampoline collection still requires owner confirmation. No SUPPORT row passed the new-URL gates. | Owner requested the next articles. The 2026-10-29 plan slot is two READY articles; the third queue item is blocked. |
| 2026-10-25 | Added N-45 to N-47 as repository posts: bulky-item pickup, next-day junk removal and multi-appliance removal. Promoted mapped rows A18, B9 and E10 to narrow planning articles, reused existing inspected imagery and added contextual inbound links from the crew-preparation, same-day and fridge guides. | Owner requested the next three articles following the Markdown content system. |
| 2026-10-27 | Published A33, M26 and H23 as repository posts with 2,000+ body words each, explicit scope boundaries, existing inspected cover/body images, SEO fields and contextual inbound links. | Owner requested the next three articles and specified 27/10/26. |
| 2026-10-24 | Added N-42 to N-44 as repository posts: L-shaped sofa removal, apartment furniture removal and one-off office waste collection. Promoted mapped rows D8, C22 and F18 to narrow planning articles, reused existing inspected imagery and added contextual inbound links from the sofa-doorway, tower and office-furniture guides. | Owner requested the next three articles following the Markdown content system. |
| 2026-10-23 | Added N-39 to N-41 as repository posts: villa-garden waste removal, bedroom-furniture removal and retail fit-out waste removal. Promoted mapped rows G20, C11 and K10 to narrow planning articles, reused existing inspected imagery and added contextual inbound links from the garden-furniture, wardrobe and shop-clearance guides. | Owner requested the next three articles following the Markdown content system. |
| 2026-10-22 | Added N-36 to N-38 as repository posts: hedge-trimming waste removal, office desk removal and property clearance. Promoted mapped rows G13, K6 and H6 to narrow planning articles, reused existing inspected imagery and added contextual inbound links from the tree-branch, office-furniture and landlord-inspection guides. | Owner requested the next three articles following the Markdown content system. |
| 2026-10-21 | Added N-33 to N-35 as repository posts: grass-clippings disposal, studio-apartment clearance and school-office clearance. Promoted mapped rows G12, H19 and K19 to narrow planning articles, reused existing inspected imagery and added contextual inbound links from the landscaping-waste, small-apartment and office-furniture guides. | Owner requested the next three articles following the Markdown content system. |
| 2026-10-20 | Added N-30 to N-32 as repository posts: cut tree-branch removal, villa-storage clearance and office-relocation junk removal. Promoted mapped rows G10, I11 and K8 to narrow planning articles, reused existing inspected imagery and added contextual inbound links from the landscaping-waste, villa-handover and office-furniture guides. | Owner requested the next three articles following the Markdown content system, dated 20/10/2026. |
| 2026-10-19 | Added N-27 to N-29 as repository posts: landscaping-waste removal, majlis clearance and restaurant-equipment removal. Promoted mapped rows G19, I9 and K13 to narrow planning articles, reused existing inspected imagery and added contextual inbound links from the garden-furniture, villa-handover and shop-clearance guides. | Owner requested the next three articles following the Markdown content system. |
| 2026-10-18 | Added N-24 to N-26 as repository posts: furniture dismantling, maid's-room clearance and shop clearance. Promoted mapped rows C10, I8 and K9 to narrow planning articles, reused existing inspected imagery and added contextual inbound links from the wardrobe, villa-handover and office-strip-out guides. | Owner requested the next three articles following the Markdown content system. |
| 2026-10-17 | Added N-21 to N-23 as repository posts: freezer disposal, oven removal and dishwasher removal. Promoted mapped rows E7, E14 and E16 to article URLs with narrow preparation scopes, reused existing inspected imagery and added contextual inbound links from the fridge and washing-machine guides plus cross-links between the new kitchen-appliance guides. | Owner requested the next three articles following the Markdown content system. |
| 2026-10-16 | Moved the whole site off Payload CMS and Postgres. All 64 articles are now repository posts in content/file-posts.js plus their Markdown bodies. The 61 previously published articles kept their exact live titles, excerpts, dates, SEO and social fields, covers and services, scraped from the live pages and checked against them. Their Markdown matched the live text except for the pending inbound links and the owner's 2026-10-13 fridge edit, both of which are now part of the posts. Services, areas, FAQs, settings and photography also moved to content/. A full build with no database was compared page by page with the live site: every service, area and static page was identical, and blog differences came only from the three new posts. | Neon free-plan transfer limit exhausted; owner chose a code-only site with the contact form on Resend. |
| 2026-10-16 | Added N-18 to N-20 (dryer disposal, dining table removal and armchair removal) as the first repository posts. They live in content/file-posts.js plus Markdown, with no database writes, because the Neon free-plan network-transfer allowance is exhausted and new articles are now published from the code. State stays REVIEW until a deployment succeeds. Inbound links from washing-machine-removal and dispose-old-furniture were added to their Markdown, pending CMS sync. | Owner asked for daily articles published from the website code instead of the admin. |
| 2026-10-16 | Set the article dates to three per day in Dubai time: N-9 to N-11 on 2026-10-13, N-12 to N-14 on 2026-10-14, N-15 to N-17 on 2026-10-15. N-15 to N-17 had been recorded as 2026-10-16 but were actually published at 23:36 Dubai time on 2026-10-15. The CMS publishedAt and updatedAt were set together so no "updated" label appears. | Owner requested three articles per date. |
| 2026-10-16 | Moved the publication date of N-9 to N-14 from 2026-10-15 to 2026-10-14 (Dubai time) in the CMS, with updatedAt reset to match so no "updated" label appears. Registry Published and Claimed-on dates changed to 2026-10-14. | Owner requested the article date change. |
| 2026-10-16 | Published N-15 to N-17 (carpet disposal, sofa bed removal and water heater removal), promoted from mapped SUPPORT rows C23, D10 and E18. Each has 2,000+ stored body words, SEO fields, one primary service relationship and reused Media for all six image slots. Synced contextual inbound links into storage-room-clearance, sofa-wont-fit-through-door and washing-machine-removal in the CMS. Server-based checks (check:content, check:links, check:blog) were not run because no local production server was available; the three live URLs returned 200. | Owner requested the next three articles using only existing images. |
| 2026-10-15 | Published N-9 to N-14, each with 2,000+ stored body words, SEO fields, one primary service relationship and reused Media for all twelve image slots. N-9 to N-11 are the owner's 2026-10-12 drafts, expanded and admitted in keywords.md as H21, H22 and F19 without Search Console evidence. N-12 to N-14 promote mapped SUPPORT rows C15, I12 and C9 to article URLs. Synced six inbound posts to the CMS: garden-furniture, seasonal, mattress, garage and dispose-old-furniture, plus junk-gone-today with the owner's 2026-10-13 cardboard section. The fridge guide's 2026-10-13 local edit was left unsynced. Six articles in one day exceeds the content-rules.md §23 ceiling of three, at the owner's explicit request. Server-based checks (check:content, check:links, check:blog) were not run because no local production server was available; the six live URLs returned 200. | Owner asked to publish the existing drafts and three new mapped topics. |
| 2026-10-10 | Published N-6, N-7 and N-8 with 2,000+ stored body words each, six original uploaded editorial images (Media 134–139), SEO fields, service relationships and contextual inbound links from N-3, #36 and #26. Updated claimed keywords in §5.2 and synced inbound post bodies in CMS. | Completed publication of storage room, garage, and garden furniture guides per briefs. |
| 2026-10-09 | Set the intended article date for local drafts N-6, N-7 and N-8 to 2026-10-10 in their briefs and records. Published dates remain empty because none is live. | User requested the article-date change. |
| 2026-10-09 | Added a 30-search priority list in keywords.md using already mapped, unpublished-support searches. Reassigned H15, I10 and G18 to distinct article scopes and wrote N-6 through N-8 as local 2,000+ word drafts with six original generated editorial images. They are not published; CMS Media, reverse links and pre-publish QA remain. | User requested the next 30 search priorities and three articles; local drafts are recorded at their actual lifecycle state. |
| 2026-10-09 | Resolved keywords.md A17 as SUPPORT on existing #4 and E29 as SUPPORT on existing #16; removed both proposed duplicate blog URLs from the keyword map. H18 remains held for owner confirmation of specialist heavy-clutter capability. Ranked existing service searches for page improvements, explicitly without search-volume data. No article was commissioned or published. | Prevent competing URLs and use the strongest already-mapped removal searches before speculative expansion. |
| 2026-10-09 | Published N-3, N-4 and N-5 (keywords.md M17, M18, M19 — the remaining mapped `BLOG` rows without a URL that clear all gates) with 2,000+ stored body words, SEO fields and service relationships; six image slots reuse existing Media (no new images). Inbound links: N-4 → N-3 and N-5; N-5 → N-4. Remaining unbuilt `BLOG` rows held, not written: A17 `bulk waste disposal dubai` (conflicts with Article Map #4, which lists it as a secondary — needs a keywords.md ruling, as #22 did); E29 `where do old appliances go dubai` (overlaps #16 and the appliance-disposal section "Where old appliances go" — fails gate 6; recommend re-mapping as SUPPORT); H18 hoarder clearance (capability unconfirmed). | Continued with the remaining mapped opportunities after the 45-item queue closed. |
| 2026-10-08 | Cleared #35's capability requirement with explicit data-sanitisation boundaries, verified 7-day pickup and weekend building access for #N-1, and codified Law No. (26) of 2007 Article 21 handover standards for #N-2. Published #35, #N-1 and #N-2 with 2,000+ stored body words each, six original generated editorial images, SEO fields, service relationships and contextual inbound links. Confirmed all three published rows and six Media records in the CMS database, and synced inbound posts. | Completed the user's requested next three articles and concluded the initial 45-opportunity queue. |
| 2026-10-07 | Resolved #22's keyword conflict and verified its electronics route on Dubai Municipality sources; owner confirmed #32's office-furniture sorting route and #39's renovation-debris service and permissions, and confirmed no certified data erasure. Published #22, #32 and #39 with 2,000+ stored body words each, six original generated images, SEO fields, service relationships and contextual inbound links. Confirmed all three published rows and six Media records in the CMS database. | Completed the user's chosen three articles. |
| 2026-10-06 | Published #12, #16 and #26 with 2,000+ body words each, SEO fields and service relationships. Reused six existing Media documents (no new images). Added contextual inbound links in `/blog/dispose-old-furniture-dubai` (to #12), `/blog/what-dubai-bins-wont-take` (to #16), and `/blog/soil-sand-pots-disposal-dubai` (to #26), resyncing their bodies. Completes Month 1 queue (40 published articles total; only #22 held on keyword conflict). | Completed Month 1 queue opportunities and cleared verification batches A and B. |
| 2026-10-05 | Published #34, #36 and #40 with 2,000+ body words, SEO fields and service relationships. All six image slots reuse existing Media documents (no new images). Added an inbound link to #34 in `/blog/office-strip-out-dubai` (body re-synced, 2170 → 2200 words); #36 and #40 link to each other. Business-input claims limited to existing site copy; no durations, weight limits or availability invented. | Completed the remaining READY · BUS. INPUT queue. |
| 2026-10-04 | Published #18, #25 and #3 with 3,000+ body words each, six generated editorial WebP images, SEO fields, service relationships and mutual contextual inbound links. Formulated pricing structure around transparent photo quotes without fabricated figures per content-rules.md §18, verified 3-ton truck volume metrics, and codified municipal hazardous waste exclusions under Law No. (18) of 2024. Cleared business input for #3, #18 and #25. | Completed the remaining Month 1 queue opportunities in SC5 cluster. |
| 2026-10-03 | Verified Law No. (26) of 2007, Law No. (33) of 2008, Law No. (6) of 2019 and DEWA Move-Out service on official government portals; generated 6 editorial WebP images; published #15, #24 and #43 with 2,000+ body words, SEO fields and mutual contextual inbound links. Cleared verification Batch D. | Cleared verification batch D (tenancy and building clearance rules) using primary official sources. |
| 2026-10-02 | Verified DM Waste Segregation Guide, Technical Guideline No. 5 and MOCCAE Decree No. 138 of 2023; published #38, #44 and #19 with 2,000+ body words, SEO fields and mutual contextual inbound links. All six image slots reuse existing Media documents. #22 held on a keywords.md ownership conflict; #26 left blocked for lack of a primary green-waste source. | Cleared verification batch C (except #22) and #44 from batch B using primary official sources. |
| 2026-10-01 | Verified Law No. (18) of 2024 and Resolution No. (58) of 2017 on the Dubai Legislation Portal and re-checked the DM bulky-waste service; published #5, #30 and #10 with 2,000+ body words, SEO fields and mutual contextual inbound links. All six image slots reuse existing generated Media documents; no new images created. #12 left blocked — charity collection details could not be confirmed on the charities’ own sites. | Cleared the rest of verification batch A plus #10 from batch B using primary official sources. |
| 2026-09-30 | Verified the official Municipality bulky-waste scope, service time and exclusions; published #1, #2 and #4 with 2,000+ body words, six generated images, SEO fields and contextual inbound links. | Resolved the next source-verification batch from primary official sources. |
| 2026-09-29 | Published #41, #42 and #45 with 2,000+ body words, six generated editorial images, SEO fields, service relationships and mutual contextual inbound links. Added their keyword claims and image provenance records. | Completed the remaining fully cleared Month 2 topics in queue order. |
| 2026-09-28 | Published #31, #33 and #37 with 2,000+ body words, six generated editorial images, SEO fields, service relationships and contextual inbound links. Updated #27 with the inbound link for #37 and added all keyword claims and image provenance records. | Continued the next cleared Month 2 topics in queue order. |
| 2026-09-23 | Published #21, #28 and #29 with 2,000+ body words, six generated editorial images, SEO fields, service relationships and mutual contextual inbound links. Added their keyword claims and image provenance records. | Continued the next cleared Month 1 topics in queue order. |
| 2026-09-22 | Published #9, #14 and #17 with 2,000+ body words, six generated editorial images, SEO fields, service relationships and mutual contextual inbound links. Added their keyword claims and image provenance records. | Continued the next cleared Month 1 topics in queue order. |
| 2026-09-20 | **Image sourcing succeeded via Unsplash.** WebFetch reaches stock search pages even though the shell cannot resolve Commons and Openverse is rate-limited. 5 assets sourced, licence-verified, visually inspected, cropped, converted to WebP, uploaded (Media 69–73) and assigned: covers + OG on #6, #11, #13, #20 and a body image on #13. A legible third-party number plate was blurred before upload. **4 candidates rejected on inspection** rather than used weakly. #7, #8, #27 remain without imagery. | Completing the media work end-to-end. |
| 2026-09-20 | ~~Media pass attempted; image sourcing blocked~~ — superseded by the entry above, which succeeded via Unsplash. Original finding: five routes tested (Commons DNS-blocked, Openverse 401 after quota, stock needs API keys, generation tool absent, Route D closed). | Superseded. |
| 2026-09-20 | **Batch completed through stage 4 of the production workflow.** Claim audit run on #6, #7, #11, #13 (13 corrections). Full SEO written for all seven — title, description, canonical, noIndex, OG title/description. Drafts updated in Payload. **Images remain the sole blocker (0 of 21 slots); reverse links held until publish to avoid live 404s.** | Applying the seven-stage workflow to the existing batch. |
| 2026-09-20 | **All seven drafts imported into Payload** via `scripts/import-drafts.ts`; author record `Junk Services Dubai Team` created. All at `_status: draft`, 0 published, no cover images. **#6, #7, #11 and #13 predate the claim-audit rule and still need that pass before `REVIEW`.** | Articles moved from documents into the CMS. |
| 2026-09-20 | Three further articles commissioned and registered at `DRAFTING` (#27, #8, #20). Reverse links recorded; covers IB-5/6/7 opened. **Route C confirmed as the active cover-sourcing route**; IB-AUDIT-1 logged as deferred. | Content workflow continued; covers resolved in parallel. |
| 2026-09-20 | **D-3 resolved** — existing image library determined AI-generated via signed C2PA credentials. Recorded in `image.md` §7 and §16; Route D closed in the backlog. D-2 remains open and now points at licensed stock or own photography. | Forensic inspection of file provenance. |
| 2026-09-20 | Four articles commissioned and registered in §3 at `DRAFTING` (#6, #7, #11, #13). Planned reverse links recorded in §6.1. [`image-backlog.md`](./image-backlog.md) created and linked from D-2. §4 Status values deliberately left unchanged to preserve the §11 parity check. | Articles written and QA’d; held pending cover images. |
| 2026-09-20 | **D-7 resolved.** Approved decision applied: #23 consolidated into #6. `keywords.md` corrected (Article Map rows 6 and 23, cluster row H9, consolidation and accounting note). Registry updated: queue row 23 → `CONSOLIDATED → #6` with no slug, §4.1 rewritten as resolved, D-7 closed, counts restated as 45 IDs / 44 commissionable, §11 checks updated. | Resolves the `keywords.md` contradiction between H9 (consolidated) and Article Map row 23 (separate). |
| 2026-09-20 | §3 renamed *Published articles* → *Active article records*; lifecycle corrected so a record exists from `DRAFTING` onward and only `PUBLISHED`/`UPDATED` imply a live URL (§0, §1, §3, §10, §11 aligned). §4.1 added recording the unresolved #6/#23 slug collision; #23 set to HELD with no slug. D-7 added. §11 rewritten as state-aware checks. | v1 lock review. |
| 2026-09-20 | Registry created. Queue seeded with the 45 mapped opportunities from `keywords.md`; §5.1 populated from the money-page ownership tables; §7 ledgers built from the article statuses; §3, §5.2, §6.1 and §8 initialised empty. | Baseline. 0 published articles, verified against `/blog`. |

---

*End of `article-registry.md`. The state layer for [`keywords.md`](./keywords.md), [`content-rules.md`](./content-rules.md), [`content-structure.md`](./content-structure.md) and [`image.md`](./image.md). Those four decide; this one records.*
