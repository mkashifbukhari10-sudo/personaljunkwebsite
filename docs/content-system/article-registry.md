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

**Current state as at 2026-10-07:** **43 published articles, all with at least 2,000 stored body words.** The latest three cover TV disposal, office furniture and renovation waste, each with original generated cover and body imagery.

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

**43 published records as of 2026-10-07.**

| ID | Slug | Title | Primary keyword | Cluster | Archetype | Money page | Areas | State | Published | Last reviewed | Facts | Inbound | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 6 | `end-of-tenancy-clearance-dubai` | End of Tenancy in Dubai: What Has to Be Gone Before Handover | end of tenancy clearance dubai | SC3 | F | `house-clearance` | — | `UPDATED` | 2026-09-20 | 2026-09-21 | none | `/blog/washing-machine-removal-dubai` | 2233 body words; cover and metadata preserved. |
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
| 4 | `dubai-municipality-bulky-waste` | Dubai Municipality Bulky-Waste Collection: How It Works | dubai municipality bulky waste collection | SC2 | B | `junk-removal` | — | `PUBLISHED` | 2026-09-30 | 2026-09-30 | sourced | `/blog/dispose-old-furniture-dubai` | 2029 body words; generated cover + body illustration. |
| 5 | `municipality-vs-paid-junk-removal-dubai` | Free Municipality Collection or a Paid Crew? A Straight Comparison | junk removal vs municipality collection dubai | SC2 | D | `junk-removal` | — | `PUBLISHED` | 2026-10-01 | 2026-10-01 | sourced | `/blog/free-junk-removal-dubai-truth` | 2146 body words; reused existing cover (#4) + body (#45) media. |
| 30 | `free-junk-removal-dubai-truth` | “Free Junk Removal” in Dubai: What’s Genuinely Free and What Isn’t | free junk removal dubai | SC2 | D | `junk-removal` | — | `PUBLISHED` | 2026-10-01 | 2026-10-01 | sourced | `/blog/municipality-vs-paid-junk-removal-dubai` | 2055 body words; reused existing cover (#28) + body (#1) media. No charity named — charity collection details could not be verified on the charities’ own sites. |
| 38 | `e-waste-disposal-dubai` | E-Waste Disposal in Dubai: The Rules and the Routes | e waste disposal dubai | SC2 | B | `appliance-disposal` | — | `PUBLISHED` | 2026-10-02 | 2026-10-02 | sourced | `/blog/what-dubai-bins-wont-take` | 2066 body words; reused existing cover (#4) + body (#41) media. |
| 44 | `what-dubai-bins-wont-take` | What You Can’t Put in a Dubai Bin | what can't you throw in dubai bins | SC2 | B | `junk-removal` | — | `PUBLISHED` | 2026-10-02 | 2026-10-02 | sourced | `/blog/e-waste-disposal-dubai` | 2046 body words; reused existing Unsplash cover (#11, Media 72) + body (#4) media. |
| 19 | `old-ac-unit-disposal-dubai` | Getting Rid of an Old AC Unit in Dubai | AC unit removal dubai | SC1 | A+B | `appliance-disposal` | — | `PUBLISHED` | 2026-10-02 | 2026-10-02 | sourced | `/blog/e-waste-disposal-dubai` | 2034 body words; reused existing cover (#2 refrigerator — no AC image exists) + body (#8) media. Does not claim the crew disconnects refrigerant (business input still open). |
| 10 | `illegal-dumping-fines-dubai` | Fines for Dumping Furniture in Dubai: What the Law Says | fine for dumping furniture dubai | SC2 | B | `junk-removal` | — | `PUBLISHED` | 2026-10-01 | 2026-10-01 | sourced | `/blog/municipality-vs-paid-junk-removal-dubai` | 2049 body words; reused existing cover (#37) + body (#4) media. States the statutory cap and doubling only; no per-item fine quoted. |
| 15 | `noc-moving-furniture-dubai` | Do You Need an NOC to Move Furniture Out in Dubai? | NOC to move furniture dubai | SC4 | G | `residential-junk-removal` | — | `PUBLISHED` | 2026-10-03 | 2026-10-03 | sourced | `/blog/leaving-dubai-clearance-checklist` | 2680 body words; generated cover + body illustration. |
| 24 | `deposit-deductions-left-furniture-dubai` | Can a Landlord Deduct Your Deposit for Furniture You Left Behind? | will landlord deduct deposit for furniture left dubai | SC3 | F | `house-clearance` | — | `PUBLISHED` | 2026-10-03 | 2026-10-03 | sourced | `/blog/noc-moving-furniture-dubai` | 2386 body words; generated cover + body illustration. |
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
| 35 | IT equipment disposal dubai | *to assign* | `/services/commercial-junk-removal` | SC6 | M2 | BLOCKED · CAPABILITY |
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

Forty articles are published; each primary keyword has one owner.

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

Verified revision-body inbound links: #6 from the washing-machine guide ("end-of-tenancy planning guide"); #11 from the washing-machine guide ("urgent collection checklist"); #13 and #20 from the tenancy guide. These contextual article links meet the inbound requirement independently of the planned service edits.

*Type:* `service` · `area` · `article` · `pillar`.
*Anchor used* is recorded so that `content-rules.md` §14's anchor-diversity rule can actually be checked across the corpus — the only way to notice the same exact-match anchor appearing six times is to have written them all down.

### 6.2 · Planned reverse-link slots

`keywords.md` contains a *Reverse-link opportunities from existing content* table mapping each service page's existing sections to the articles that should link down from them. **Those are the intended slots.** As each article publishes, record the applied link in 6.1 and tick it here.

| Money page | Existing section | Planned link down | Applied |
|---|---|---|---|
| `/services/junk-removal` | "What we cannot take" | what-dubai-bins-wont-take · illegal-dumping-fines-dubai | ☐ |
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

**One mapped article remains blocked (#35 in M2); #22, #32 and #39 were published on 2026-10-07.**

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

### 7.2 · BLOCKED — service capability confirmation required (3 remaining)

Unblocked by the business confirming — and being able to evidence — the capability. **If it cannot, the claim is removed or the article dropped.**

| # | Primary keyword | Capability to confirm |
|---|---|---|
| 35 | IT equipment disposal dubai | Data-secure handling, if claimed |

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
