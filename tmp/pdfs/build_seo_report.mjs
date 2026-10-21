import fs from 'node:fs';
import path from 'node:path';

const py = fs.readFileSync('tmp/pdfs/build_seo_report.py', 'utf8');
const literal = py.slice(py.indexOf('plan = [') + 'plan = '.length, py.indexOf('\n\nassert len(plan)'));

function tuplesToArrays(src) {
  let out = '', quote = null, escape = false;
  for (const ch of src) {
    if (escape) { out += ch; escape = false; continue; }
    if (ch === '\\') { out += ch; escape = true; continue; }
    if (quote) { out += ch; if (ch === quote) quote = null; continue; }
    if (ch === '"' || ch === "'") { quote = ch; out += ch; continue; }
    out += ch === '(' ? '[' : ch === ')' ? ']' : ch;
  }
  return out;
}

const plan = Function(`"use strict"; return (${tuplesToArrays(literal)});`)();
const all = plan.flatMap(d => d[3]);
if (plan.length !== 30 || all.length !== 90 || new Set(all.map(k => k[0].toLowerCase())).size !== 90) {
  throw new Error('Keyword plan must contain 30 days and 90 unique keywords');
}

const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const row = cells => `<tr>${cells.map((c,i)=>`<${i===0?'th':'td'}>${c}</${i===0?'th':'td'}>`).join('')}</tr>`;
const auditRows = [
 ['Crawl surface','106 indexable URLs: 12 services, 30 areas, 57 posts, 1 blog index, 6 static pages.','Strong','Keep the architecture; improve prioritization and internal linking.'],
 ['Crawl hygiene','0 broken links, redirect chains, duplicate titles, canonical errors, missing H1s, missing alt text, or sitemap mismatches.','Strong','Maintain automated crawl checks.'],
 ['Metadata','Blog pagination pages share one meta description.','Minor issue','Generate page-specific descriptions or reconsider deep-pagination indexing.'],
 ['Structured data','465 valid JSON-LD blocks; LocalBusiness and WebSite markup appear sitewide.','Strong base','Add only verified business details; do not fabricate ratings.'],
 ['Performance','Lab Lighthouse: 87 Performance; 100 SEO, Accessibility, Best Practices; LCP 3.3s.','Good','Prioritize LCP and main-thread work on mobile.'],
 ['Content','57 posts already published, many at roughly 11 minutes reading time.','High coverage','Consolidate around commercial clusters and add original evidence.'],
 ['Local SEO','30 area pages exist; rankings still depend on unique local proof and GBP.','Largest upside','Add real jobs, access details, photos, citations, and reviews.'],
 ['Measurement','No supplied GSC/Keyword Planner export; direct CTA tracking is incomplete.','Blocking insight','Instrument WhatsApp/call clicks and establish a baseline.']
];

const techRows = [
 ['Indexability','robots.txt allows crawling; sitemap is live; all crawled pages indexable and represented.','Pass','Keep preview/staging noindex.'],
 ['Architecture','Clear service, area, article, and static-page hierarchy with breadcrumbs.','Pass','Push authority to the top money pages.'],
 ['Titles','No duplicate titles across 106 pages.','Pass','Rewrite only when GSC shows impressions but weak CTR.'],
 ['Descriptions','Blog pages 1-6 reuse one description.','Fix','Add pagination-specific descriptions.'],
 ['Canonicals','No missing canonicals; apex domain is consistent.','Pass','Monitor singular/plural domain confusion separately.'],
 ['Headings','Exactly one H1 on every crawled page.','Pass','Keep one primary intent per page.'],
 ['Images','No missing alt attributes in the crawl.','Pass','Add more real crew and job imagery.'],
 ['Schema','All JSON-LD parsed: service, FAQ, breadcrumb, article, LocalBusiness, WebSite.','Pass','Fill only verified address/geo/hours.'],
 ['Performance','Mobile lab score 87; LCP 3.3s, TBT 250ms, CLS 0.','Improve','Optimize LCP and reduce main-thread JavaScript.'],
 ['Environment docs','CONTENT_CACHE_VERSION is absent from .env.example.','Fix','Document the variable.']
];

const competitors = [
 ['junkserviceindubai.com','Exact-match relevance, same/similar brand, GBP/review language, broad footprint.','Entity confusion; ownership relationship unknown.','Resolve ownership and primary brand/domain.'],
 ['junkremovalsdubai.com','Large current content program, item/service pages, visible review proof.','Many claims are easy to imitate; freshness alone does not prove experience.','Compete with real operations evidence and better conversion paths.'],
 ['dubaijunkcollection.com','Premium design, fixed-price positioning, strong commercial clarity.','Broad claims leave room for deeper item and access content.','Lead with lifts, gates, crews, route planning, and deadlines.'],
 ['takemyjunkuae.com','Long operating history, free reusable-item collection, large fleet.','Free route is selective; damaged and urgent loads remain openings.','Own the honest free-vs-paid decision.'],
 ['junknear.me / EcoHaul / Dotless','Strong niche pages, polished speed and compliance positioning.','Some claims may lack local proof on individual pages.','Use verified documents, real reviews, and area job evidence.']
];

const table = (heads, rows, cls='') => `<table class="${cls}"><thead><tr>${heads.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
const page = (title, body, cls='') => `<section class="page ${cls}"><header><span>JUNK SERVICES DUBAI - SEO OPPORTUNITY REPORT</span><span>15 OCTOBER 2026</span></header><main><h1>${title}</h1>${body}</main><footer><span>Confidential strategy report</span><span class="pnum"></span></footer></section>`;

let pages = [];
pages.push(`<section class="page cover"><div class="cover-tag">SEO OPPORTUNITY REPORT</div><h1>90 high-potential keywords.<br>One focused 30-day execution plan.</h1><p>Junk Services Dubai</p><p>Website, services, competitors, technical SEO, local SEO, and content priorities</p><div class="cover-meta">Prepared 15 October 2026<br>Market: Dubai, United Arab Emirates<br>Domain: junkservicesdubai.com</div></section>`);

pages.push(page('Executive summary', `
<div class="callout">The site has a strong technical base and unusually broad topical coverage for a young local-service domain. The fastest route to customers is money-page consolidation, high-intent long-tail optimization, proof-rich area pages, Google Business Profile work, and measurement.</div>
${table(['Area','Finding','Assessment','Action'],auditRows)}
<h2>Highest-impact conclusion</h2><p>Focus the first 10 days on pages that can generate enquiries now; days 11-23 on service and local clusters; and days 24-30 on decision content, local trust, and measurement. Treat each day's three terms as one intent cluster on one primary URL - never as three thin pages.</p>
<div class="note"><b>Data caveat.</b> No authenticated Google Ads Keyword Planner, Google Search Console, Ahrefs, or Semrush export was available. Exact monthly search volume and numeric keyword difficulty are shown as N/V (not verified), not guessed. Replace N/V with geo-targeted Dubai figures before forecasting traffic or committing paid budget.</div>`));

pages.push(page('Business and search-market analysis', `
<p>Junk Services Dubai sells labor-included collection: customers send photos, receive an upfront quote, and a crew carries, loads, and removes unwanted items. The offer spans single items, furniture and appliances, garden waste, homes and villas, urgent pickups, and commercial clear-outs.</p>
<h2>Four search-decision patterns</h2>
${table(['Pattern','Search job','Best page','Examples'],[
 ['Immediate removal','Get an item or load gone now','Service / contact','same day, urgent, quote, pickup'],
 ['Specific item','Remove something awkward or non-donatable','Service + guide','sofa, fridge, mattress, wardrobe'],
 ['Property deadline','Clear for handover, move-out, inspection, or refit','Clearance + checklist','end of tenancy, villa handover, office strip-out'],
 ['Local logistics','Find a provider who understands the area','Area page + GBP','Marina, JLT, Business Bay, Arabian Ranches']])}
<h2>Strategic implication</h2><p>One strong URL should own each intent family. Supporting guides answer real pre-purchase questions, and area pages own geo-modified searches. This reduces cannibalization between the homepage, services, articles, and local pages.</p>
<div class="callout"><b>Brand/entity risk.</b> Search results show junkserviceindubai.com (singular) using essentially the same name while your site is junkservicesdubai.com (plural). Confirm ownership immediately. If related, define one primary brand/domain. If unrelated, strengthen GBP, citations, entity data, branded mentions, and reviews.</div>`));

pages.push(page('Technical and on-page audit', `${table(['Area','Finding','Assessment','Action'],techRows)}
<h2>Content-quality warning</h2><p>The site already has 57 posts. Publishing more pages without original job evidence risks diminishing returns. Future updates should add something competitors cannot easily imitate: anonymized job examples, access constraints, before/after photos, real quote factors, accepted/excluded materials, named process ownership, or verifiable disposal documentation.</p>
<h2>Recommended ownership</h2><p><b>Homepage:</b> core head term. <b>Service pages:</b> transactional categories and close variants. <b>Articles:</b> cost, rules, comparisons, preparation, and item problems. <b>Area pages:</b> local modifier plus one or two plausible service combinations. <b>GBP:</b> near-me, reviews, and map-pack visibility.</p>`));

pages.push(page('Competitor and SERP landscape', `<p>Live result sampling shows a crowded market with many exact-match domains and rapidly expanding content libraries. Most rivals repeat the same promises - same day, fixed price, eco-friendly, licensed, WhatsApp - so generic claims are not a durable moat.</p>
${table(['Competitor','Observed strength','Weakness / opening','Response'],competitors)}
<h2>Observed openings</h2><ol><li>Specific-item and access problems show lower apparent competition than head terms.</li><li>Geo + service searches often surface thin pages.</li><li>Free-vs-paid, municipality, handover, lift/NOC, and disposal-route queries reveal urgent decisions.</li><li>B2B searches reward operational detail and documentation.</li><li>Near-me performance depends heavily on GBP completeness, proximity, prominence, links, and reviews.</li></ol>
<div class="note"><b>Do not copy unverified claims.</b> Recycling percentages, 30-minute guarantees, licenses, certificates, insurance, review counts, and municipal claims require evidence.</div>`));

pages.push(page('Keyword methodology and evidence standard', `
<h2>Opportunity Score</h2><p>A 0-100 editorial score, not a Google metric: 30% commercial/lead intent, 25% local/service fit, 20% specificity and likely conversion, 15% observed SERP opening, 10% strength of the current destination page.</p>
<h2>SERP competition</h2><p>Low/Med/High is a qualitative result-page assessment. It is not numeric keyword difficulty. Exact KD is N/V until a tool export is supplied.</p>
<h2>Search volume and numeric KD</h2><p>Every row records Volume/KD as N/V because no authenticated geo-targeted export was available. Recommended replacement sources: Google Ads Keyword Planner set to Dubai; Google Search Console impressions, clicks, position, and ranking URL; optionally Ahrefs or Semrush KD. Record source, geography, date, and match type.</p>
<h2>Priority</h2><p><b>P1:</b> direct lead/revenue or critical local foundation. <b>P2:</b> strong supporting or mid-tail opportunity. <b>P3:</b> useful depth with lower estimated demand or confidence.</p>
<div class="callout">The three keywords scheduled each day are one cluster. Optimize one destination and supporting links. Do not create three pages.</div>`));

for (let i=0;i<plan.length;i+=2) {
  const blocks = plan.slice(i,i+2).map(([day,focus,action,kws]) => `
  <div class="day"><h2>Day ${day}: ${esc(focus)}</h2><p class="action">${esc(action)}</p>
  ${table(['Keyword','Intent','Pri','Opp.','SERP','Vol/KD','Target'],kws.map(([kw,intent,pri,score,serp,target])=>[esc(kw),esc(intent),pri,String(score),serp,'N/V - N/V',`<code>${esc(target)}</code>`]),'schedule')}</div>`).join('');
  pages.push(page(i===0?'30-day plan: 90 prioritized keywords':`30-day plan: Days ${i+1}-${i+2}`, blocks, 'planpage'));
}

const top15 = all.map(k=>({score:k[3],kw:k[0],intent:k[1],pri:k[2],target:k[5]})).sort((a,b)=>b.score-a.score).slice(0,15);
pages.push(page('Top 15 immediate priorities', `<p>If capacity is limited, execute these first. They combine buying intent with a clear destination and/or an observed long-tail opening.</p>
${table(['Rank','Keyword','Intent','Pri','Score','Owner'],top15.map((x,i)=>[String(i+1),esc(x.kw),esc(x.intent),x.pri,String(x.score),`<code>${esc(x.target)}</code>`]))}
<h2>Expected sequencing</h2><p>Head terms are valuable but slow. Early wins are more likely from urgent, item-specific, access-problem, and geo-service combinations. Use those wins to earn links, reviews, engagement, and internal authority that later support the head terms.</p>`));

pages.push(page('Local SEO action plan', `
<p>Google states that local results are mainly based on relevance, distance, and prominence. The site can improve relevance and prominence, but it cannot optimize away distance. A complete, verified Google Business Profile is a core acquisition channel.</p>
<h2>Week 1 - entity and profile</h2><p>Confirm the primary brand/domain; verify GBP; use the correct service-area business setup; complete categories, phone, website, hours, services, description, and service areas; align name, phone, and site across citations.</p>
<h2>Week 2 - evidence</h2><p>Upload genuine crew, truck, before/after, and completed-job photos. Request reviews from real customers and respond naturally.</p>
<h2>Week 3 - local pages</h2><p>Upgrade top area pages with real job examples, access considerations, property types, nearby communities, unique images, and links to matching service/problem guides.</p>
<h2>Week 4 - authority</h2><p>Pursue relevant local citations and partnerships: property managers, communities, relocation providers, fit-out contractors, landscapers, storage operators, and Dubai-focused directories.</p>
<div class="callout">Do not add dozens of new area pages. Improve the existing 30 using demonstrated impressions, real service history, and unique facts.</div>`));

pages.push(page('Measurement framework', `
<p>SEO success is qualified enquiries and booked jobs, not article count. Establish a baseline before execution, then compare by query, page, action, and lead quality.</p>
${table(['Layer','Metric','Source','Decision'],[
 ['Visibility','Impressions, ranking queries, indexed URLs','Google Search Console','Which clusters are being discovered?'],
 ['Relevance','Correct URL, CTR, cannibalization','GSC query + page reports','Is the intended owner winning?'],
 ['Engagement','Article-to-service clicks, pages/session','Plausible or GA4','Do support pages move users?'],
 ['Conversion','WhatsApp, call, form by landing page','Events + Payload Leads','Which pages create enquiries?'],
 ['Business','Qualified leads, booked jobs, revenue','CRM / intake log','Which clusters deserve investment?'],
 ['Local','GBP calls, clicks, directions, reviews','GBP performance','Is map visibility improving?']])}
<h2>Day 0</h2><p>Export 28 days from GSC by query and page; capture index coverage, organic sessions, conversions, and GBP performance; record the intended owner for each P1 term.</p>
<h2>Day 30</h2><p>Look first for indexation, new ranking queries, impressions on the intended URL, and long-tail clicks. Diagnose flat clusters before publishing more.</p>
<h2>Day 60-90</h2><p>Evaluate qualified leads and booked work by cluster. Expand winners, consolidate competing pages, and reduce effort on topics that create visibility but no commercial movement.</p>`));

pages.push(page('Sources and research notes', `
<h2>Primary site evidence</h2><p>Live crawl of https://www.junkservicesdubai.com, robots.txt, sitemap.xml, service, area, and article pages on 15 October 2026. Repository architecture, service/area seed content, published article inventory, SEO helpers, schema, robots, sitemap, and controlled keyword inventory. Automated crawl: 106 HTML pages, all indexable and in the sitemap. Local Lighthouse mobile lab run: Performance 87, SEO 100, Accessibility 100, Best Practices 100; LCP 3.3s, TBT 250ms, CLS 0.</p>
<h2>Google and official guidance</h2><p class="sources">Google Business Profile local ranking: https://support.google.com/business/answer/7091<br>Google Search Central LocalBusiness: https://developers.google.com/search/docs/appearance/structured-data/local-business<br>Google Business Profile setup: https://support.google.com/business/answer/7039811<br>Dubai Municipality unwanted-material guideline: https://www.dm.gov.ae/wp-content/uploads/2021/06/Technical-Guideline-No.10-Disposal-of-Unwanted-Materials2.pdf</p>
<h2>Competitor/result sampling</h2><p>Representative domains: junkserviceindubai.com, junkremovalsdubai.com, dubaijunkcollection.com, takemyjunkuae.com, junknear.me, getjunkremovalsdubai.com, dotless.ae, movemyjunkdubai.com, and dubaijunkremovals.com. Queries sampled core, same-day, furniture, villa, garden, commercial, area, appliance, mattress, tenancy, and office intents.</p>
<div class="note"><b>Limitations.</b> Results vary by location, language, device, personalization, and time. This was not an authenticated Dubai-local rank-tracker or Google Ads export. Exact volume, CPC, and numeric KD were not asserted.</div>
<div class="callout">Publish less, prove more. Build each important page around one intent, one owner URL, real Dubai operating evidence, and a measurable path to enquiry.</div>`));

const css = `
@page{size:A4;margin:0}*{box-sizing:border-box}body{margin:0;background:#dfe6ec;color:#1e293b;font-family:Arial,Helvetica,sans-serif}.page{position:relative;width:210mm;height:297mm;margin:0 auto 8mm;background:white;overflow:hidden;page-break-after:always;padding:19mm 18mm 17mm}.page header,.page footer{position:absolute;left:18mm;right:18mm;display:flex;justify-content:space-between;color:#64748b;font-size:7pt;letter-spacing:.04em}.page header{top:8mm;border-bottom:.3mm solid #d8e0e8;padding-bottom:2.5mm;color:#12263a;font-weight:700}.page footer{bottom:7mm;border-top:.3mm solid #d8e0e8;padding-top:2.5mm}.page main{margin-top:4mm}.page h1{font-size:20pt;line-height:1.1;color:#12263a;margin:0 0 5mm}.page h2{font-size:12pt;color:#0f766e;margin:5mm 0 2mm}.page p,.page li{font-size:8.7pt;line-height:1.42;margin:0 0 2.6mm}.page ol{padding-left:5mm}.cover{background:#12263a;color:white;padding:28mm 23mm}.cover h1{color:white;font-size:31pt;line-height:1.12;margin-top:20mm}.cover p{font-size:13pt;line-height:1.5;color:#dce8f1}.cover-tag{font-size:9pt;font-weight:700;letter-spacing:.13em;color:#9be0d1}.cover-meta{position:absolute;left:23mm;bottom:30mm;color:#dce8f1;font-size:11pt;line-height:1.55}.callout,.note{padding:4mm;border-radius:2mm;margin:3mm 0 4mm}.callout{background:#dff5ef;border-left:1.2mm solid #0f766e;font-size:10pt;line-height:1.4;color:#12263a;font-weight:700}.note{background:#f4f7fa;border:.3mm solid #d8e0e8;font-size:8pt;line-height:1.4;color:#475569}table{width:100%;border-collapse:collapse;table-layout:fixed;margin:2mm 0 4mm;font-size:6.7pt;line-height:1.25}th{background:#12263a;color:white;text-align:left;padding:2mm 1.6mm;font-weight:700}td{padding:1.8mm 1.6mm;border:.25mm solid #d8e0e8;vertical-align:top;overflow-wrap:anywhere}tbody tr:nth-child(even){background:#f4f7fa}td:first-child{font-weight:700}code{font-family:Consolas,monospace;font-size:6.1pt;color:#0f766e}.day{margin-bottom:7mm}.day h2{font-size:13pt;color:#12263a;margin:0 0 1.5mm}.action{font-size:7.7pt!important;color:#475569}.schedule{font-size:6.2pt}.schedule th,.schedule td{padding:1.45mm 1.2mm}.schedule th:nth-child(1){width:25%}.schedule th:nth-child(2){width:14%}.schedule th:nth-child(3){width:6%}.schedule th:nth-child(4){width:7%}.schedule th:nth-child(5){width:8%}.schedule th:nth-child(6){width:12%}.schedule th:nth-child(7){width:28%}.sources{font-size:7.8pt!important;overflow-wrap:anywhere}
`;

const html = `<!doctype html><html><head><meta charset="utf-8"><title>Junk Services Dubai SEO Opportunity Report</title><style>${css}</style></head><body>${pages.join('')}</body></html>`;
fs.writeFileSync('tmp/pdfs/junk-services-dubai-seo-report.html', html);
for (const index of [0, 1, 6, 12, 20, pages.length - 1]) {
  const qa = `<!doctype html><html><head><meta charset="utf-8"><style>${css}body{background:white}.page{margin:0}</style></head><body>${pages[index]}</body></html>`;
  fs.writeFileSync(`tmp/pdfs/qa-page-${index + 1}.html`, qa);
}
console.log(path.resolve('tmp/pdfs/junk-services-dubai-seo-report.html'));
