# Content Structure — Junk Services Dubai

**Status:** Permanent structural specification. Every article must be built to this shape.
**Position in the system:**

| File | Answers |
|---|---|
| [`keywords.md`](./keywords.md) | **What** to target, and **where** it lives |
| [`content-rules.md`](./content-rules.md) | **How** to write it — editorial and SEO policy |
| **`content-structure.md`** (this file) | **What shape** it takes — page anatomy, fields, headings, components, archetypes |

**Authority:** Subordinate to both. This file never overrides a targeting decision in `keywords.md` or an editorial rule in `content-rules.md`. It specifies the container those decisions go into.
**Verified against:** `src/payload/collections/Posts.ts`, `app/(frontend)/blog/[slug]/page.jsx`, `components/blog/PostBody.jsx`, `components/blog/RelatedLinks.jsx`, `lib/content/richtext.jsx`, `lib/content/posts.js`, `lib/schema.js` — as at 2026-09-20.

> **Why this file exists.** The blog template already renders a hero, a standfirst, a byline, a cover image, a related-services module, a related-posts module and a closing CTA band — **automatically, on every article.** Writing as though it doesn't produces articles that repeat themselves, duplicate their own introduction, and end with two CTAs. Structure is not decoration; on this site it is already half-built, and the body has to fit what is already there.

---

## The drafting workflow

Structural assembly happens in this order. **Each step depends on the one before it** — choosing an archetype before knowing what must be covered, or drafting before factual clearance, produces work that has to be thrown away.

```
1  KEYWORD MAPPING            keywords.md → the Pre-Write Mapping Block
                              (content-rules.md §2)
        ▼
2  STATUS / FACTUAL CLEARANCE  READY, or the blocking input genuinely obtained
                              (content-rules.md §7–§8)
        ▼
3  SEARCH INTENT               what the reader actually wants
                              (content-rules.md §5)
        ▼
4  SEMANTIC COVERAGE PLAN      what must be explained — and what must not
                              ★ §9 of this file · mandatory before drafting ★
        ▼
5  CHOOSE ARCHETYPE            the shape that carries that coverage
                              §10
        ▼
6  WRITE                       fields §2–§4 · body §5–§8
        ▼
7  INTERNAL LINKING            placement §11 · relationships §15
                              (which links and how many: content-rules.md §12–§14)
        ▼
8  QA                          structural §16 · editorial content-rules.md §24
```

---

## Hard constraints vs guidance

**Two kinds of rule appear in this file, and they carry very different weight.**

| Marker | Meaning |
|---|---|
| `HARD` (unmarked, stated as fact) | A real technical or CMS constraint. Breaking it means the article fails validation, fails to render, or renders wrongly. **Not negotiable.** |
| `GUIDANCE` / `TYPICAL RANGE` / `DEFAULT` | A design-derived default or an observation about what usually works. **Not a ranking requirement and not enforced anywhere.** |

**The hard constraints are:** excerpt ≤200 characters (CMS-enforced) · a cover image is required to publish (validation-enforced) · a real author is required (required relationship) · body headings start at H2 (editor offers H2–H4 only) · no tables, callouts, accordions, embeds or footnotes (no renderer support) · no table of contents or in-page anchors (headings render without `id`) · body measure 68ch and H1 measure 20ch (fixed in the template).

**Everything numeric other than the excerpt limit is guidance.** Where guidance and the reader conflict, **reader usefulness, search intent, clarity and how the page actually looks in draft preview all win.** Do not treat an advisory range as a target to hit, and do not pad or trim an article to satisfy one.

---

## §0 · The rendered page anatomy

**This is what the template outputs for every published article, in order.** Six of the nine blocks are automatic. Know them before writing a word.

```
┌─────────────────────────────────────────────────────────────┐
│ 1. HERO  (dark)                                   AUTOMATIC │
│    Breadcrumbs: Blog › {title}                              │
│    Date · {readingTime} min read                            │
│    H1  ← post.title                                         │
│    Standfirst paragraph  ← post.excerpt                     │
│    By {author.name} · {author.role} · updated {date}        │
├─────────────────────────────────────────────────────────────┤
│ 2. COVER IMAGE  ← post.coverImage                 AUTOMATIC │
├─────────────────────────────────────────────────────────────┤
│ 3. BODY  ← post.content        ★ THE ONLY PART YOU AUTHOR ★ │
│    max-width 68ch · headings start at H2                    │
├─────────────────────────────────────────────────────────────┤
│ 4. RELATED LINKS                                  AUTOMATIC │
│    "Services" column  ← relatedServices                     │
│    "Areas" column     ← relatedAreas                        │
│    ⚠ Falls back to the first 3 services if both are empty   │
├─────────────────────────────────────────────────────────────┤
│ 5. KEEP READING                                   AUTOMATIC │
│    Up to 3 posts, ranked by shared relatedServices/Areas    │
├─────────────────────────────────────────────────────────────┤
│ 6. CTA BAND                                       AUTOMATIC │
│    "Something to get rid of? Send a photo." + book action   │
├─────────────────────────────────────────────────────────────┤
│ 7. BlogPosting JSON-LD                            AUTOMATIC │
└─────────────────────────────────────────────────────────────┘
```

### The four consequences

These follow directly from the anatomy above and are the most commonly broken rules in this file.

1. **The body must not restate the excerpt.** The excerpt is already on screen, in large type, directly above the body. An opening paragraph that paraphrases it is visible duplication. **The body starts with substance.**
2. **The body must not end with a hand-written CTA block.** A CTA band is appended automatically. A second one immediately above it reads as desperation. In-body CTAs are contextual links inside sentences (§11), never a closing pitch.
3. **The body must not end with a "related articles" or "further reading" list.** Both modules are automatic.
4. **`relatedServices` and `relatedAreas` are structural, not metadata.** They drive the Related Links module *and* the Keep Reading module *and* the site's article-to-article clustering. Getting them wrong silently degrades three things at once (§16).

---

## §1 · Field-to-page map

What each CMS field becomes on the rendered page and in search. **Every field below is authored deliberately — none are afterthoughts.**

| Field | Becomes | Spec |
|---|---|---|
| `title` | **H1** in the hero (display type, `max-width: 20ch`, balanced wrap) **and** the default `<title>` and schema `headline` | §2 |
| `excerpt` | **Visible standfirst** under the H1 (`max-width: 58ch`) **and** the meta description **and** the `/blog` card teaser **and** schema `description` | §3 |
| `slug` | The URL: `/blog/{slug}` | §4 |
| `coverImage` | Full-width image between hero and body; the OG/social card; schema `image` | §12 |
| `content` | The body. Rendered at `max-width: 68ch` | §5–§10 |
| `author` | Byline (name · role); schema `author` with `jobTitle`, `description`, `sameAs`, `image` | Must be a real person — `content-rules.md` §6 |
| `publishedAt` | Hero date; schema `datePublished` | Automatic |
| `updatedAt` | "updated {date}" in the byline — **only when >24h after publish**; schema `dateModified` | Automatic |
| `readingTime` | "· N min read" in the hero; schema `timeRequired` | Automatic — **never a target to write toward** |
| `relatedServices` | Related Links "Services" column + Keep Reading ranking | §16 |
| `relatedAreas` | Related Links "Areas" column + Keep Reading ranking | §16 |
| `seo.title` | Overrides `<title>` only — **does not change the H1** | §2 |
| `seo.description` | Overrides the meta description only — **does not change the visible standfirst** | §3 |

---

## §2 · Title and H1

`title` is used in three places at once: the on-page H1, the browser/search title, and the schema headline. **Write it as a headline for a person**; if a different string is better for search, override `seo.title` and leave the H1 human.

### Spec

| Property | Rule |
|---|---|
| Length | `GUIDANCE` — **typically 45–65 characters.** Not a ranking requirement and not enforced. It comes from the page design: the H1 renders at up to 68px on a 20ch measure, so it wraps to 2–3 lines by design, and much beyond that becomes a wall of display type. Search also truncates long `<title>` strings. **A clearer or more accurate title outside this range wins** — check it in draft preview (§16) rather than counting characters. |
| Primary keyword | Present and natural. Front-loaded where the sentence allows, never forced. |
| Case | Sentence case. Not Title Case, not ALL CAPS. |
| Brand | Never in the title — the template appends it. |
| Year | **No "2026", "2027" or "Updated for…"** unless the content is genuinely year-specific. It dates instantly and creates an annual maintenance debt. |

### Prohibited title patterns

- **Service-page phrasing** — "Furniture Removal Services in Dubai", "Best Junk Removal Company Dubai". These are service-page titles; an article using one is competing with its own money page (`content-rules.md` §16).
- **Superlatives and rankings** — "Best", "Top 10", "#1", "Ultimate".
- **Clickbait or curiosity gaps** — "You Won't Believe What Happens to Your Old Sofa".
- **Colon-stacking as a reflex** — "Fridge Disposal Dubai: The Complete Guide: Everything You Need to Know".
- **Repeating the excerpt's phrasing** — they sit two lines apart on screen.

### Patterns that work, by intent

| Intent | Pattern | Example |
|---|---|---|
| Item disposal | *How to dispose of {item} in Dubai* | How to Dispose of a Fridge in Dubai |
| Item disposal, blunter | *What to do with {item} in Dubai* | What to Do With Palm Fronds in Dubai |
| Rules | *{Rule statement}* or *What happens if {action}* | What Happens If You Leave Furniture Outside Your Building |
| Cost | *What {service} actually costs in Dubai* | What Junk Removal Actually Costs in Dubai |
| Comparison | *{A} or {B}?* | Free Municipality Collection or a Paid Crew? |
| Problem | *{The problem}. {The resolution}* | Your Sofa Won't Fit Through the Door. Here's What Happens Next |
| Urgent | *{Deadline framing}* | Need It Gone Today? What's Possible in Dubai, and By When |
| Process | *{Process}: {what it involves}* | Villa Handover: What Has to Be Gone Before Inspection |

Vary these. If three consecutive articles all use "How to dispose of X in Dubai", the fourth uses a different shape.

---

## §3 · Excerpt — standfirst and meta description

**The single most under-written field on this site, and the one with the most jobs.**

It is simultaneously: the large standfirst paragraph under the H1, the meta description in search results, the teaser on `/blog`, and the schema description.

### Spec

| Property | Rule |
|---|---|
| Limit | `HARD` — **200 characters, enforced by the CMS.** Beyond it the field will not save. `GUIDANCE` — aim around 150–160 so it survives as a search snippet. |
| Form | Complete sentences — typically one or two. Not a fragment, not a label. |
| Content | **The answer, or the shape of the answer** — not a description of the article. |
| Keyword | Include naturally if it fits. Do not bend the sentence to fit it. |
| Overlap | **Must not repeat the title's wording.** They are adjacent on screen. |
| Tone | Plain and specific. It is read as a paragraph, not as metadata. |

### The test

> **Read the H1 and the excerpt together, out loud.** If the excerpt only restates the title, rewrite it. It should add the first real piece of information.

**Weak:** *"Learn everything you need to know about disposing of a fridge in Dubai with our complete guide."*
— Describes the article. Says nothing. Wastes the snippet.

**Strong (structure only):** *"A fridge counts as e-waste, so it can’t go out with normal rubbish or be left by the bins. Here are the routes that actually work, and what each one costs you in time."*
— Delivers a fact, sets the stakes, and tells the reader what they’re about to get.

> **⚠ The claims in that example are illustrative, not cleared.** Whether a fridge is classified as e-waste, and what may or may not be left beside bins, are **`[VERIFY — OFFICIAL SOURCE REQUIRED]`** statements under `content-rules.md` §7. This example demonstrates the *shape* of a good excerpt — a fact, then the offer. **It is not pre-approved copy and must not be reused verbatim.**

### `seo.description`

Leave empty unless the standfirst and the ideal search snippet genuinely need to differ. When both are set, the standfirst stays visible on the page and only the meta description changes.

---

## §4 · Slug

| Rule | Detail |
|---|---|
| Shape | Lowercase, hyphenated, ASCII. Auto-generated from the title if left empty — **do not rely on that.** Set it deliberately. |
| Length | `GUIDANCE` — **typically 3–6 words.** Trim articles and prepositions: `dispose-fridge-dubai`, not `how-to-dispose-of-a-fridge-in-dubai`. Clarity decides; a seventh word that makes the URL readable is fine. |
| Keyword | Contains the core of the primary keyword. |
| Geography | Include `dubai` only where it carries meaning. Not every slug needs it — the whole site is Dubai. |
| Planned slugs | `keywords.md`'s Article Opportunity Map proposes a slug per article. **Use it** unless there is a reason not to, so the plan and the site stay aligned. |
| Stability | Changing a published slug writes a 301 automatically, but still costs signal. **Get it right the first time.** |
| Never | Dates, numbers-as-padding, stop-word chains, or the word `blog`. |

---

## §5 · Heading architecture

### Hard constraints

| Constraint | Consequence |
|---|---|
| **H1 is the post title.** The body must never contain an H1. | The Lexical editor only offers H2/H3/H4 — the constraint is enforced, not just advised. |
| **Body headings start at H2.** H3 nests under H2; H4 under H3. | Never skip a level. Never use a heading for visual size. |
| **Headings render with no `id` attribute.** | **No table of contents and no in-page anchor links are possible** without a code change. Do not write "jump to the section below" or link to a section. Refer to sections by name in prose, or restructure. |
| The auto Related Links module emits its own H2s ("Services", "Areas") after the body. | Body headings should not compete — don't end the body with a heading called "Services" or "Related". |

### Writing headings

- **Descriptive, not decorative.** A reader scanning only the headings should understand the article's shape and find their answer.
- **Specific over generic.** "What the bins won't take" beats "Important considerations".
- **Front-load the meaningful word** — scanning happens on the first two or three words.
- **No keyword stuffing.** A heading describes its section; it is not a placement slot (`content-rules.md` §10).
- **Mix forms across articles** — questions, statements, noun phrases. Do not let every article default to the same heading grammar.
- **Every heading must have content under it.** No stacked headings, no heading followed immediately by another heading.
- **Sections should be substantial.** If a section is one sentence, it is a sentence — fold it into a neighbouring section.

### Typical shape

`TYPICAL RANGE` — most articles land on **3–6 H2s**, but this is an observation, not a target. **The Semantic Coverage Plan (§9) decides how many sections an article needs**; the count follows the coverage. H3s only where a section genuinely subdivides. **H4 is rare** — if you need one, the article is probably over-structured. A short item-disposal piece may need two H2s and a pillar guide eight, and both are correct (`content-rules.md` §22).

---

## §6 · Available body components

The renderer handles **exactly** these node types. Anything else is ignored or falls back to raw text.

### Available

| Component | Renders as | Use for |
|---|---|---|
| **Paragraph** | 17–19px, line-height 1.68, 68ch measure | The default. Most of the article. |
| **H2 / H3 / H4** | Display headings | §5 |
| **Unordered list** | Bulleted, 8px gap | Options, criteria, what's included/excluded |
| **Ordered list** | Numbered | Genuine sequences only — steps in order |
| **Blockquote** | Large type, bronze left rule | **A pull-out for one genuinely important line** — a rule, a limit, a warning. Not for quoting people (there are no real quotes to use — `content-rules.md` §6). |
| **Bold / italic** | Inline | Bold for the load-bearing term in a paragraph. Italic sparingly. |
| **Link** | Bronze with underline | Internal — the editor can link to Posts, Services and Areas as relationships — or external. A `nofollow` checkbox exists for paid/untrusted destinations. |
| **Inline image** | Full-width figure, 720px | §12 |
| **Horizontal rule** | Thin divider | Rare. A genuine section break where a heading would be too heavy. |

### NOT available — plan around these

| Missing | Workaround |
|---|---|
| **Tables** | **There is no table node.** Comparison content — which is a whole archetype (§10-D) — must be built from H3 sections per option, or a bulleted list per option. **Do not attempt markdown table syntax; it will render as literal pipes.** |
| **Callout / info / warning boxes** | Use a blockquote for the one line that matters most. |
| **Accordions / toggles** | Plain H3 + paragraph. |
| **Table of contents** | Not possible (no heading IDs). Omit. |
| **Footnotes** | Link inline to the source instead. |
| **Embeds (video, maps, forms)** | Not supported in the body. |
| **Custom CTA blocks** | The CTA band is automatic. In-body CTAs are contextual links (§11). |

> **Design for what exists.** An article planned around a comparison table will have to be restructured at build time — plan the H3-per-option shape from the outset.

---

## §7 · The opening block

The first screen after the hero. **This is where most articles fail**, by warming up instead of answering.

### Required shape

```
[BODY START]
 ¶1   The direct answer, or the single most important fact.
      2–4 sentences. No preamble, no scene-setting, no restatement
      of the excerpt.

 ¶2   (optional) The immediate qualifier — the exception, the cost,
      the constraint, or what decides which route applies.

 H2   First real section.
```

### Rules

- **No H2 before the first paragraph.** The body opens with prose.
- **The first sentence carries information.** Not "Disposing of furniture in Dubai can be tricky." Rather something concrete about the item and its constraint — for example, that a wardrobe usually has to come apart before it leaves the room, because the assembled frame rarely clears a standard doorway. *(Illustrative only: even an operational claim like that is `[BUSINESS INPUT REQUIRED]` if the article states it as a general rule — `content-rules.md` §6.)*
- **Do not re-introduce the topic.** The H1, the standfirst and the cover image have already done it three times.
- **Do not open with the primary keyword as a sentence subject** if it reads mechanically.
- **Do not open with a CTA.**
- **Length:** `GUIDANCE` — **typically 60–150 words before the first H2.** Shorter for a simple query. The real rule is that it must not exceed a screen, because an opening the reader has to scroll through has stopped being an answer.

### Banned openings

Listed in `content-rules.md` §9. The ones that recur most in this niche: *"Are you looking for…"*, *"When it comes to…"*, *"Dubai is a bustling city…"*, *"Getting rid of unwanted items can be challenging…"*, *"In this comprehensive guide…"*.

---

## §8 · The closing block

### Required shape

The body ends when the reader has their answer. **Then stop.**

- **No summary section** that restates what was just said.
- **No "Conclusion" heading.** Ever.
- **No CTA block** — the CTA band is automatic (§0).
- **No "related articles" list** — the Keep Reading module is automatic.
- **No "contact us today"** sign-off.

### What a good ending looks like

Pick whichever genuinely fits:

1. **The next step** — one sentence naming what the reader does now, with the contextual link that helps them do it.
2. **The honest limit** — what the service won't take, when a different route is better, what to check first.
3. **The last useful fact** — the thing worth knowing that didn't fit earlier.

`GUIDANCE` — **usually one or two sentences.** The real rule is the test that follows: if the final paragraph could be deleted without the reader losing anything, delete it (`content-rules.md` §22).

---

## §9 · Semantic Coverage Plan

**Mandatory before body drafting. No article is drafted without one.**

The Semantic Coverage Plan answers a question the keyword mapping cannot: **what does this article actually have to explain for a reader to leave satisfied — and what must it deliberately leave to another page?**

It sits between intent and archetype in the workflow, because what the article must cover determines which structural shape can carry it.

> ### What this is NOT
>
> **This is not a keyword list. It is not an LSI or "related terms" exercise.** Nothing in this plan becomes a placement target.
>
> Specifically, do **not**:
> - set semantic keyword density targets of any kind
> - force synonyms into copy
> - insert every related phrase you can think of
> - expand an article to *appear* comprehensive
> - copy a competitor's entity or heading list
> - introduce a topic that causes cannibalization
>
> **The purpose is comprehension, not coverage scoring.** The plan exists so the article explains its subject completely enough for a real reader, and so the page establishes its topic and context clearly. An article that covers three things properly beats one that name-checks fifteen.
>
> Keyword usage remains governed by `content-rules.md` §10, and nothing here overrides it.

### The plan

Fill this out before drafting. **Include only what is genuinely relevant to the search intent** — an empty row is a valid and common answer.

```
SEMANTIC COVERAGE PLAN

PRIMARY ENTITY / TOPIC
   The one thing this article is about.

SUPPORTING ENTITIES
   Other real things the reader needs named to understand it —
   item types, authorities, property types, equipment, materials.

KEY CONCEPTS
   The ideas that must land for the answer to make sense.

TERMINOLOGY
   The specific vocabulary a knowledgeable person would use, where
   it genuinely aids clarity. Define a term on first use if the
   reader may not know it.

NECESSARY SUBTOPICS
   What must be covered for the answer to be complete. If a subtopic
   is missing, the reader goes back to the SERP.

ATTRIBUTES & CONSTRAINTS
   The properties that change the answer — weight, size, condition,
   floor level, access, timing, volume, material.

PROCESSES & ACTIONS
   What actually happens, and in what order.

LIKELY FOLLOW-UP QUESTIONS
   What a real reader asks next. Each is either answered in the body,
   answered in an FAQ (§13), or deliberately left to a linked page.

RELATIONSHIPS BETWEEN CONCEPTS
   How the pieces connect — what causes what, what rules out what,
   what decides between options. This is usually the part that makes
   an article genuinely useful rather than merely complete.

DUBAI-SPECIFIC CONTEXT
   Local detail that is genuinely relevant AND verified. Anything
   unverified is annotated and follows the status system in
   content-rules.md §7–§8 — it does not get asserted here because it
   appeared in a plan.

OUT OF SCOPE — DELIBERATELY NOT COVERED
   Concepts that belong to another page or intent, each with the page
   that owns it. This row is not optional; it is the cannibalization
   control.
```

### The out-of-scope row is the important one

Most cannibalization enters an article through well-meant completeness — explaining pricing in a rules article, explaining the service in a comparison, drifting into whole-property clearance in an item-disposal piece.

**Name what you are not covering, and which page owns it.** Then link there instead of explaining it. Check the proposed scope against the *Service Keyword Clusters* table and the relevant C-series ruling in `keywords.md` before drafting.

### Depth follows necessity, not comprehensiveness

A subtopic earns its place only if a reader genuinely needs it **for this intent**. Two useful tests:

1. **Removal test** — if this subtopic were cut, would the reader still get a complete answer? If yes, cut it.
2. **Ownership test** — would a reader searching for this subtopic be better served by a different page on this site? If yes, link, don't explain.

Article length still follows intent and complexity (`content-rules.md` §22). **A coverage plan is not a licence to lengthen.**

---

## §10 · Article archetypes

Eight structural templates, keyed to the intents in `content-rules.md` §5 and the clusters in `keywords.md`. **Pick the archetype from the reader's intent, never from the topic.**

These are skeletons, not fill-in-the-blank forms. `content-rules.md` §9 requires structural variety — two articles using the same archetype must not be interchangeable.

---

### A · Item disposal — "how do I get rid of X?"
**Clusters:** SC1 · **Money pages:** furniture / sofa / appliance / garden waste

```
¶  What this item actually requires — the constraint that makes it non-obvious
   (weight, refrigerant, dismantling, hygiene, size)
H2 The realistic routes                    ← the honest list, including free ones
   H3 per route where each needs explaining
H2 What decides which route suits you      ← floor level, condition, timing, access
H2 What actually happens on a collection   ← the operational detail; links to money page
H2 (optional) What can't be taken this way
¶  Close: next step or honest limit
```

**Notes:** the "realistic routes" section is what earns the ranking — it must include routes that aren't this business. Omitting them reads as a sales page and loses the query.

---

### B · Rules and compliance — "am I allowed to?"
**Clusters:** SC2 · **Money pages:** appliance disposal / junk removal / homepage
**⚠ Almost always `BLOCKED — SOURCE VERIFICATION REQUIRED` — see `content-rules.md` §7–§8.**

```
¶  The rule, stated plainly, in the first two sentences
H2 What the rule actually covers            ← scope and exceptions, sourced
H2 What you're expected to do instead       ← the compliant routes, with official links
H2 What happens if you don't                ← only if verified; never invented
H2 Where this leaves you practically        ← the gap the paid service fills
¶  Close: the one thing to remember
```

**Notes:** every factual claim carries a primary source. A blockquote is well used here for the single most important rule. **No fact enters this archetype from a competitor blog.**

---

### C · Cost — "what will this cost?"
**Clusters:** SC5 · **Money pages:** `/how-it-works` · `/contact`
**⚠ `READY — BUSINESS INPUT REQUIRED` unless real pricing exists — `content-rules.md` §18.**

```
¶  The cost position, straight away — a real figure, or the honest
   statement that it's quoted from a photo and why
H2 What actually drives the price           ← volume, access, floor, dismantling, disposal type
H2 Worked situations                        ← real scenarios, real variables. No invented numbers.
H2 What's included                          ← labour, loading, disposal — what people assume is extra
H2 How to get an accurate number            ← the photo-quote process
¶  Close
```

**Notes:** explaining the **variables** is a complete, publishable article and needs no invented figures. Prefer it to a fabricated range — always.

---

### D · Comparison — "which option should I choose?"
**Clusters:** SC2, SC5 · **⚠ No table component exists (§6).**

```
¶  The short answer — which option suits which reader
H2 Option A                                 ← what it is, what it costs, what it requires, who it suits
H2 Option B                                 ← same structure, same depth, honestly
H2 (further options as needed)
H2 How to choose                            ← the decision, framed by the reader's situation
¶  Close
```

**Notes:** **each option gets equal structural weight.** A comparison that gives the rival two lines and this business six paragraphs is not a comparison and will not hold the ranking. Being genuinely useful about when *not* to pay is what makes this archetype work.

---

### E · Urgent — "I need this gone today"
**Clusters:** SC3 · **Money page:** same-day junk removal

```
¶  What is actually possible, and by when — the cut-off, plainly
H2 What makes a same-day slot possible      ← access, volume, location, notice
H2 What to send to get a fast answer        ← the photo, the floor, the access
H2 If today isn't possible                  ← the honest fallback
¶  Close
```

**Notes:** the only archetype where a CTA link may appear **early** — offering help *is* the useful answer. Still contextual, still in a sentence. **No invented response times; no false urgency** (`content-rules.md` §17).

---

### F · Move-out and process — "what has to be gone, by when?"
**Clusters:** SC3 · **Money pages:** house clearance / villa clearance

```
¶  The deadline that actually matters, and what it means
H2 What has to be gone                      ← the specifics
H2 Working backwards from the date          ← the timeline, in order (ordered list earns its place here)
H2 What usually goes wrong                  ← access, notice, volume underestimated
H2 What a clearance covers                  ← links to money page
¶  Close
```

**Notes:** the highest-conviction archetype for conversion, because the reader has a fixed date. **No tenancy-law claims without verification** — deposit and handover rules are source-blocked territory.

---

### G · Access and logistics — "can you even get it out?"
**Clusters:** SC4 · **Money pages:** residential junk removal / sofa removal · **Feeds the area layer**

```
¶  The constraint, named — the lift, the doorway, the stairs, the gate
H2 How it actually works                    ← booking, permissions, timing
H2 What the building or community requires  ← NOC, hours, access routes (verify before asserting)
H2 What the crew does about it              ← dismantling, protection, sequencing
H2 (optional) How this differs by community ← ONLY with genuine, specific differences
¶  Close
```

**Notes:** **the one archetype where area links are usually justified** (§11, `content-rules.md` §15). Still requires something genuinely specific about each area named — and must pass the C-12 substitution test.

---

### H · Commercial / B2B — "how do we clear this without disruption?"
**Clusters:** SC6 · **Money page:** commercial junk removal

```
¶  The operational problem, in business terms — downtime, access, scale
H2 How the clearance is planned             ← survey, scheduling, phasing
H2 Working around the building              ← out of hours, loading bays, service lifts, permits
H2 What happens to the items                ← resale, recycling, secure disposal (⚠ capability-blocked unless confirmed)
H2 How it's priced and scoped               ← process, not invented numbers
¶  Close
```

**Notes:** longer sentences and a more measured register than the consumer archetypes. The reader is building a case internally, not booking. **CTA is late and consultative.** Links only to commercial pages and commercial-district area pages.

---

## §11 · Link placement within the structure

`content-rules.md` §12–§14 governs *which* links and *how many* (contextual, never a quota). This section governs **where they sit**.

| Position | Rule |
|---|---|
| **Opening paragraph** | **No links.** The first paragraph delivers the answer. A link there pulls the reader out before they get it. |
| **Primary money page** | In the section where the reader's problem meets the service — usually the "what actually happens" or "what it covers" section. Inside a sentence that would exist anyway. |
| **Secondary services** | At the point of genuine relevance, wherever that falls. |
| **Area pages** | Only inside a passage that genuinely discusses that community (archetype G most often). **Never as a list.** |
| **Related articles** | Where the reader's next question naturally arises — mid-body, not collected at the end. |
| **External sources** | Immediately adjacent to the claim they support. Never batched into a "sources" section. |
| **Closing paragraph** | `GUIDANCE` — usually a single link, the next step. More than that competes with itself. |
| **Anywhere** | Never stack two links in one sentence. Never link a whole sentence. |

`GUIDANCE — not a rule, and not a target.` There is no correct number of internal links; `content-rules.md` §12 is explicit that relevance determines quantity. As a sense-check only: if a short article carries links in most of its paragraphs, some are probably decorative. **Judge each link by whether it helps a reader who has never heard of SEO** — never by a count.

---

## §12 · Images

Image sourcing, licensing and alt-text strategy belong to `image.md` (not yet created). **Structure only:**

| Slot | Spec |
|---|---|
| **Cover image** | **Required to publish.** Renders full-width between hero and body, and becomes the social card. Landscape; the crop is wide (up to ~520px tall on a 1320px shell). |
| **Body images** | Optional. Render as a full-width figure at ~720px via the `Media` component. |
| **Placement** | After a paragraph, never immediately after a heading — a heading followed by an image leaves the section with no opening line. |
| **Purpose** | Only where the image genuinely shows something the words can't — an access problem, a load, a before/after. **Decorative stock imagery adds nothing and costs load time.** |
| **Captions** | `Media` renders the media document's `caption` over the image. Use it for attribution where a licence requires it. |
| **Alt text** | Describes the image for someone who cannot see it. **Not a keyword slot** (`content-rules.md` §10). |
| **No** | Inline logos, screenshots of competitor sites, image-only information, text baked into images. |

---

## §13 · FAQ block

FAQs are **optional** and governed by `content-rules.md` §19. Structurally:

- **Placement:** last body section, before the closing paragraph — or omitted.
- **Markup:** an H2 for the block, then **H3 per question**. Never a bold paragraph pretending to be a heading.
- **Question form:** phrased as a person would ask it. "My sofa won't fit through the door. Can you still take it?" — not "Sofa removal door size".
- **Answer length:** `GUIDANCE` — usually 1–3 sentences. The real test: if an answer needs a heading and several paragraphs, it is a body section, not an FAQ.
- **Count:** as many as are genuinely useful. **Zero is valid.** There is no target.
- **No schema.** FAQPage markup is emitted for the homepage, service pages and area pages — **not for posts.** An article cannot produce FAQ schema without a code change, and none is requested.

---

## §14 · Schema output

`BlogPosting` JSON-LD is emitted automatically on every published article (never on drafts). **Nothing is hand-authored.** It is assembled from:

| Schema property | Source |
|---|---|
| `headline` | `title` |
| `description` | `seo.description` or `excerpt` |
| `image` | `coverImage` |
| `datePublished` / `dateModified` | `publishedAt` / `updatedAt` |
| `author` | `author` — including `jobTitle`, `description` (bio), `sameAs`, `image` |
| `timeRequired` | `readingTime` |
| `publisher` / `isPartOf` | Site-level business and website entities |

**Structural consequence:** schema quality is a direct function of field quality. A complete author record with a real role, bio and profile links produces materially stronger `author` markup — which is the part of `BlogPosting` that carries E-E-A-T signal. **Completing the author record once benefits every article.**

---

## §15 · Related-content mechanics

**`relatedServices` and `relatedAreas` do three jobs.** This is the most consequential structural decision in an article, and the easiest to treat as an afterthought.

| Job | Behaviour |
|---|---|
| **1. Related Links module** | Renders "Services" and "Areas" columns under the body. |
| **2. Keep Reading module** | Up to 3 posts, ranked by **how many `relatedServices` and `relatedAreas` they share with this one.** |
| **3. Topic clustering** | Job 2 means these fields *are* the site's article-to-article clustering mechanism. |

### The fallback trap

> **If both fields are empty, the Related Links module falls back to the first three services** — whichever they happen to be. The article then points at services it may have nothing to do with, and scores zero overlap with every other post, so Keep Reading degrades to "newest three".
>
> **Always set `relatedServices` — exactly one primary, plus genuinely relevant others.** It is not optional metadata; it is the article's place in the architecture.

### Rules

- **One primary money page**, first (`content-rules.md` §12).
- **Add secondary services only where genuine.** Over-tagging dilutes the Keep Reading signal — an article tagged with six services clusters with everything and therefore with nothing.
- **`relatedAreas` usually stays empty.** Set it only when the article genuinely discusses those communities — most often archetype G.
- **Setting these fields does not replace body links.** The module is a safety net; contextual in-body links are the real signal (§11).
- **Consistent tagging across a cluster makes Keep Reading work.** Articles in the same `keywords.md` cluster should share their primary service tag so they surface each other.

---

## §16 · Structural QA

Run alongside the editorial QA in `content-rules.md` §24. **This checks shape, not content.**

### FIELDS
- [ ] `title` reads well at display size (typically 45–65 chars), sentence case, no brand, no year, not service-page phrasing
- [ ] `excerpt` ≤200 chars (aim 150–160), delivers information, does **not** restate the title
- [ ] `slug` concise and readable (typically 3–6 words), matches the plan in `keywords.md` where one exists
- [ ] `coverImage` set (publication is blocked without it)
- [ ] `author` set to a real person
- [ ] `relatedServices` set — **exactly one primary**, plus only genuine others
- [ ] `relatedAreas` set only if genuinely justified
- [ ] `seo.*` left empty unless there is a specific reason

### CLAIM AUDIT
- [ ] **The claim audit in `content-rules.md` §7 has been run** — absolutes, frequency hedges, timings, crew sizes, load quantities, availability, pricing, building practices, guarantees, disposal claims and implied experience all swept and sourced

### SEMANTIC COVERAGE (§9)
- [ ] A Semantic Coverage Plan was completed **before** drafting
- [ ] Primary entity, supporting entities and key concepts are all genuinely present in the article
- [ ] Topic-specific terminology used where it aids clarity, and defined on first use where needed
- [ ] Necessary subtopics covered; nothing essential left unanswered
- [ ] Attributes and constraints that change the answer are stated
- [ ] Relationships between concepts are explained, not just listed
- [ ] Likely follow-up questions are answered, sent to an FAQ (§13), or deliberately linked elsewhere
- [ ] Dubai-specific context is genuinely relevant **and** verified (or annotated and blocked)
- [ ] **Out-of-scope row honoured** — no drift into another page’s intent; those concepts are linked, not explained
- [ ] **No coverage padding** — nothing added to appear comprehensive, no forced synonyms, no related-phrase insertion

> **The coverage question, asked last:**
>
> **“Does this article cover the entities, concepts, terminology and follow-up questions necessary to satisfy this specific intent — without drifting into another page’s intent?”**
>
> Both halves must be true. Complete but drifting is cannibalization; tight but incomplete sends the reader back to the SERP.

### BODY SHAPE
- [ ] Opens with prose, not a heading
- [ ] First paragraph delivers the answer — no warm-up, no banned opening
- [ ] **Body does not restate the excerpt**
- [ ] Headings start at H2; no H1; no skipped levels; no stacked headings
- [ ] Every heading has substantial content under it
- [ ] Archetype matches the reader's intent **and carries the coverage plan**, and doesn't duplicate a sibling article's shape
- [ ] No markdown tables (unsupported — §6)
- [ ] No TOC, no in-page anchor links (unsupported — §5)
- [ ] Ordered lists used only for genuine sequences
- [ ] Blockquote used sparingly — typically at most once, for something that earns it

### ENDINGS
- [ ] **No "Conclusion" heading**
- [ ] No summary that restates the article
- [ ] **No hand-written CTA block** — the band is automatic
- [ ] **No "related articles" list** — the module is automatic
- [ ] Closing is 1–2 sentences: next step, honest limit, or last useful fact

### LINKS IN POSITION
- [ ] No links in the opening paragraph
- [ ] Primary money-page link sits in the section where problem meets service
- [ ] Area links only inside passages genuinely about those areas
- [ ] External sources sit beside the claims they support
- [ ] No stacked links, no whole-sentence links
- [ ] Closing paragraph not overloaded with links

### RENDER CHECK
- [ ] Previewed as a draft — hero, cover, body and modules all read as one page
- [ ] H1 wraps acceptably at display size
- [ ] Excerpt reads well as a standfirst **and** as a search snippet
- [ ] Keep Reading surfaces genuinely related posts (or is empty early on, which is fine)

---

## §17 · Worked skeletons

Two complete examples, to show the spec applied. **Neither is an article; both are structure.**

> ### ⚠ Read this before using either example
>
> **The prose in these skeletons is illustrative structure, not cleared copy.** No factual claim shown below has been verified, and **nothing here may be copied into a live article.**
>
> Where a line would assert something unverified, it is annotated:
>
> | Annotation | Meaning |
> |---|---|
> | **`[VERIFY — OFFICIAL SOURCE REQUIRED]`** | Regulatory, Municipality, legal or third-party fact. Must be checked against a primary source and cited (`content-rules.md` §7). |
> | **`[BUSINESS INPUT REQUIRED]`** | Depends on a figure or specific the business must supply — price, duration, capacity, notice period, availability. Never estimated. |
> | **`[CAPABILITY CONFIRMATION REQUIRED]`** | Asserts something about what this business does. Must be confirmed and evidenced, or removed. |
>
> A skeleton demonstrating structure does **not** make its factual content true. Treat every unannotated fact below as unverified too — the annotations mark the obvious cases, not an exhaustive clearance.

### Example 1 — Archetype A + B, item disposal with a rules spine

```
PRIMARY KEYWORD   how to dispose of a fridge in dubai   (E6)
ARCHETYPE         B (rules-heavy) + A (item disposal)
STATUS            BLOCKED — SOURCE VERIFICATION REQUIRED
MONEY PAGE        /services/appliance-disposal
relatedServices   appliance-disposal, junk-removal
relatedAreas      (none)

SEMANTIC COVERAGE PLAN (§9)
  PRIMARY ENTITY      domestic fridge / freezer at end of life
  SUPPORTING          refrigerant, e-waste stream, the disposal routes,
                      the responsible authority  [VERIFY — which authority,
                      and how each route actually operates]
  KEY CONCEPTS        why this item is handled differently from general waste;
                      who carries it down; who is responsible if it is dumped
  TERMINOLOGY         e-waste, refrigerant, bulky waste, licensed handler
                      [define on first use; each term's applicability = VERIFY]
  SUBTOPICS           the rule · the routes · what decides between them ·
                      what happens on a paid collection
  ATTRIBUTES          weight, floor level, lift access, working vs broken,
                      timing
  PROCESSES           requesting a collection · booking a paid crew ·
                      moving it out of the flat
  FOLLOW-UPS          Can I just put it outside? What if it still works?
                      What if I'm on the 30th floor? Who pays?
  RELATIONSHIPS       floor level → whether a free route is usable at all
                      (this is the article's central insight)
  DUBAI CONTEXT       [VERIFY — OFFICIAL SOURCE REQUIRED for every local claim]
  OUT OF SCOPE        whole-property clearance → /services/house-clearance
                      general junk pricing    → cost article
                      selling or trading it   → excluded intent entirely

title    How to Dispose of a Fridge in Dubai            (34 chars)
slug     dispose-fridge-dubai
excerpt  [DRAFT — every claim below is VERIFY-blocked]
         "A fridge isn't treated like ordinary household waste, and the free
         routes have conditions attached. Here's what each one involves, and
         what decides which is realistic for you."      (~160 chars)
         ↑ deliberately written to hold its shape WITHOUT asserting an
           unverified rule. The specific rule goes in only once sourced.

BODY
 ¶   Why a fridge is handled differently from general waste.
                                          [VERIFY — the actual basis for this;
                                           do not assert "refrigerant" or
                                           "e-waste" until sourced]
 H2  What the rules actually say          [VERIFY — OFFICIAL SOURCE REQUIRED
                                           + cite and link]
 H2  The routes available
     H3  Municipality bulky waste         [VERIFY — that it exists as described,
                                           its process, eligibility, any
                                           ground-level or carry-down limit,
                                           and any area exclusions]
     H3  Manufacturer or retailer takeback
                                          [VERIFY — that this is genuinely
                                           offered in Dubai; drop the section
                                           entirely if it cannot be confirmed]
     H3  A paid collection                → links /services/appliance-disposal
 H2  What decides which one suits you     — floor level, lift access, timing,
                                            condition
                                            (operational reasoning: no rule
                                             asserted, so this is writable now)
 H2  What happens on the day              — straps, trolley, floor protection
                                          [CAPABILITY CONFIRMATION REQUIRED
                                           before naming any disposal chain,
                                           "licensed handler" or destination]
 ¶   Close: the single most useful next step.
                                          [do NOT close on "never leave it by
                                           the bins" until that rule is sourced]

NO conclusion · NO CTA block · NO related list
```

**What this example demonstrates:** an article can be fully *planned and structured* while remaining `BLOCKED`. The shape, the coverage plan, the field values and the link targets are all decided. **Only the sourced facts are missing — and the article does not publish until they arrive.** Note the excerpt is deliberately drafted to work without the unverified rule, rather than asserting it and hoping.

### Example 2 — Archetype G, access and logistics

```
PRIMARY KEYWORD   junk removal service lift dubai       (J7)
ARCHETYPE         G (access and logistics)
STATUS            READY (per keywords.md) — but building-requirement claims
                  inside it are VERIFY / BUSINESS INPUT, see annotations
MONEY PAGE        /services/residential-junk-removal
relatedServices   residential-junk-removal, sofa-removal
relatedAreas      dubai-marina, jlt, business-bay        ← justified: the article
                                                            discusses tower access

SEMANTIC COVERAGE PLAN (§9)
  PRIMARY ENTITY      the building service lift, as a constraint on removal
  SUPPORTING          building management, the crew, bulky items, the loading route
  KEY CONCEPTS        the lift is the bottleneck, not the crew; permission is
                      arranged before the crew is dispatched
  TERMINOLOGY         service lift, goods lift, move-in/move-out window, NOC
                      [NOC applicability = VERIFY]
  SUBTOPICS           why buildings control it · how a booking is arranged ·
                      what buildings typically ask for · what happens when the
                      lift isn't available
  ATTRIBUTES          floor level, item size, notice, permitted hours
  PROCESSES           requesting the booking · scheduling around it ·
                      dismantling as the fallback
  FOLLOW-UPS          Do I have to arrange it myself? How much notice?
                      What if my building refuses? What if there's no lift?
  RELATIONSHIPS       notice required → how soon a pickup can realistically happen
  DUBAI CONTEXT       tower-dense communities where this dominates the job
  OUT OF SCOPE        what a pickup costs   → cost article
                      whole-flat clearance  → /services/house-clearance

title    Service Lift Booking in Dubai Buildings        (39 chars)
slug     service-lift-booking-dubai
excerpt  [DRAFT] "In most towers a bulky item can't leave until the service
         lift is booked. Here's who arranges it, what buildings tend to ask
         for, and what to do when the lift isn't an option."  (~165 chars)
         ↑ "most towers" softened from an absolute claim; hedged deliberately
           because building policies vary and none have been surveyed.

BODY
 ¶   The constraint, named: the lift is the bottleneck, not the crew.
                                            (operational, writable now)
 H2  Why buildings control the lift         — protection, scheduling, other
                                              residents
 H2  How a booking actually works           — who asks, what is needed
                                            [BUSINESS INPUT REQUIRED — who
                                             actually makes the request, and
                                             what notice is realistic. Do not
                                             state a notice period until the
                                             business confirms it.]
                                            → links /services/residential-junk-removal
 H2  What buildings commonly ask for        [VERIFY — OFFICIAL SOURCE REQUIRED
                                             before asserting any NOC, permit
                                             or documentation requirement.
                                             Generalising across buildings is
                                             itself an unsupported claim.]
 H2  When the lift isn't an option          — stairs, dismantling, timing
                                            [CAPABILITY CONFIRMATION REQUIRED
                                             before promising a stairs carry]
 ¶   Close: what to send so it can be arranged.
                                            [no promised turnaround unless
                                             confirmed — content-rules.md §17]

Area links sit INSIDE the access discussion — not listed at the end.
```

**What this example demonstrates:** a `READY` status covers the article's *premise*, not every sentence in it. **Individual claims inside a READY article can still require verification or business input** — and an absolute generalisation ("most Dubai towers require…") is an unsupported claim even when no regulation is involved. Hedge it honestly or source it.

---

*End of `content-structure.md`. Read with [`keywords.md`](./keywords.md) (what to target) and [`content-rules.md`](./content-rules.md) (how to write). This file specifies the shape; those two decide the substance.*
