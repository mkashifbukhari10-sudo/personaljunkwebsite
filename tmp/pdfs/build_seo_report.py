from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak,
    KeepTogether, HRFlowable
)
from reportlab.pdfbase.pdfmetrics import stringWidth
from datetime import date
from pathlib import Path


OUT = Path("output/pdf/junk-services-dubai-seo-keyword-plan.pdf")
OUT.parent.mkdir(parents=True, exist_ok=True)

NAVY = HexColor("#12263A")
INK = HexColor("#1E293B")
TEAL = HexColor("#0F766E")
MINT = HexColor("#DFF5EF")
AMBER = HexColor("#D97706")
PALE = HexColor("#F4F7FA")
MID = HexColor("#64748B")
LINE = HexColor("#D8E0E8")
WHITE = colors.white
RED = HexColor("#B42318")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="CoverTitle", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=30, leading=35, textColor=WHITE, alignment=TA_LEFT, spaceAfter=10))
styles.add(ParagraphStyle(name="CoverSub", parent=styles["BodyText"], fontName="Helvetica", fontSize=13, leading=19, textColor=HexColor("#DCE8F1")))
styles.add(ParagraphStyle(name="H1x", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=20, leading=24, textColor=NAVY, spaceBefore=2, spaceAfter=9))
styles.add(ParagraphStyle(name="H2x", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=13.5, leading=17, textColor=TEAL, spaceBefore=8, spaceAfter=5))
styles.add(ParagraphStyle(name="H3x", parent=styles["Heading3"], fontName="Helvetica-Bold", fontSize=10.5, leading=13, textColor=NAVY, spaceBefore=5, spaceAfter=3))
styles.add(ParagraphStyle(name="Bodyx", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.3, leading=13.7, textColor=INK, spaceAfter=5))
styles.add(ParagraphStyle(name="Small", parent=styles["BodyText"], fontName="Helvetica", fontSize=7.5, leading=10.2, textColor=INK))
styles.add(ParagraphStyle(name="Tiny", parent=styles["BodyText"], fontName="Helvetica", fontSize=6.5, leading=8.2, textColor=INK))
styles.add(ParagraphStyle(name="Note", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.2, leading=11.5, textColor=MID, backColor=PALE, borderColor=LINE, borderWidth=0.5, borderPadding=7, spaceBefore=5, spaceAfter=7))
styles.add(ParagraphStyle(name="Callout", parent=styles["BodyText"], fontName="Helvetica-Bold", fontSize=10.5, leading=14.5, textColor=NAVY, backColor=MINT, borderColor=TEAL, borderWidth=0.8, borderPadding=9, spaceBefore=4, spaceAfter=8))
styles.add(ParagraphStyle(name="TableHead", parent=styles["BodyText"], fontName="Helvetica-Bold", fontSize=7, leading=8.5, textColor=WHITE, alignment=TA_LEFT))
styles.add(ParagraphStyle(name="TableCell", parent=styles["BodyText"], fontName="Helvetica", fontSize=6.8, leading=8.7, textColor=INK))
styles.add(ParagraphStyle(name="TableCellBold", parent=styles["BodyText"], fontName="Helvetica-Bold", fontSize=6.8, leading=8.7, textColor=INK))
styles.add(ParagraphStyle(name="Day", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=14, leading=17, textColor=NAVY, spaceAfter=3))


def P(text, style="Bodyx"):
    return Paragraph(text, styles[style])


def page_header_footer(canvas, doc):
    canvas.saveState()
    w, h = A4
    if doc.page > 1:
        canvas.setStrokeColor(LINE)
        canvas.setLineWidth(0.5)
        canvas.line(18*mm, h-14*mm, w-18*mm, h-14*mm)
        canvas.setFont("Helvetica-Bold", 7.5)
        canvas.setFillColor(NAVY)
        canvas.drawString(18*mm, h-10.8*mm, "JUNK SERVICES DUBAI - SEO OPPORTUNITY REPORT")
        canvas.setFont("Helvetica", 7.5)
        canvas.setFillColor(MID)
        canvas.drawRightString(w-18*mm, h-10.8*mm, "Research date: 15 October 2026")
        canvas.line(18*mm, 13*mm, w-18*mm, 13*mm)
        canvas.drawString(18*mm, 8.7*mm, "Confidential strategy report")
        canvas.drawRightString(w-18*mm, 8.7*mm, f"Page {doc.page}")
    canvas.restoreState()


def pill(text, color=TEAL):
    return Table([[P(text, "Small")]], style=[
        ("BACKGROUND", (0,0), (-1,-1), HexColor("#E8F3F1")),
        ("BOX", (0,0), (-1,-1), 0.5, color),
        ("LEFTPADDING", (0,0), (-1,-1), 5), ("RIGHTPADDING", (0,0), (-1,-1), 5),
        ("TOPPADDING", (0,0), (-1,-1), 2), ("BOTTOMPADDING", (0,0), (-1,-1), 2),
    ])


def audit_table(rows):
    data = [[P("Area", "TableHead"), P("Finding", "TableHead"), P("Assessment", "TableHead"), P("Action", "TableHead")]]
    for row in rows:
        data.append([P(row[0], "TableCellBold"), P(row[1], "TableCell"), P(row[2], "TableCellBold"), P(row[3], "TableCell")])
    t = Table(data, colWidths=[30*mm, 76*mm, 25*mm, 43*mm], repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), NAVY), ("GRID", (0,0), (-1,-1), 0.35, LINE),
        ("VALIGN", (0,0), (-1,-1), "TOP"), ("ROWBACKGROUNDS", (0,1), (-1,-1), [WHITE, PALE]),
        ("LEFTPADDING", (0,0), (-1,-1), 5), ("RIGHTPADDING", (0,0), (-1,-1), 5),
        ("TOPPADDING", (0,0), (-1,-1), 5), ("BOTTOMPADDING", (0,0), (-1,-1), 5),
    ]))
    return t


plan = [
 (1,"Own the core category","Refresh homepage title/H1 support copy and strengthen the homepage-to-service path.",[
  ("junk removal dubai","Commercial","P1",98,"High","/"),("dubai junk removal","Commercial","P1",95,"High","/"),("junk removal in dubai","Commercial","P1",94,"High","/")]),
 (2,"Capture provider-selection searches","Expand the main junk-removal service page with proof, scope, exclusions, and quote CTA.",[
  ("junk removal service dubai","Commercial","P1",95,"High","/services/junk-removal"),("junk removal services dubai","Commercial","P1",93,"High","/services/junk-removal"),("junk removal company dubai","Commercial","P1",92,"High","/services/junk-removal")]),
 (3,"Win urgent demand","Tighten the same-day page around cutoff time, availability, areas, and an immediate WhatsApp CTA.",[
  ("same day junk removal dubai","Transactional","P1",97,"High","/services/same-day-junk-removal"),("urgent junk removal dubai","Transactional","P1",94,"Med","/services/same-day-junk-removal"),("junk removal today dubai","Transactional","P1",93,"Med","/services/same-day-junk-removal")]),
 (4,"Build the furniture money page","Consolidate removal, disposal, pickup, condition, dismantling, and destination language on one URL.",[
  ("furniture removal dubai","Commercial","P1",97,"High","/services/furniture-removal"),("furniture disposal dubai","Commercial","P1",95,"High","/services/furniture-removal"),("old furniture removal dubai","Commercial","P1",93,"Med","/services/furniture-removal")]),
 (5,"Own the sofa problem","Strengthen the sofa service page and refresh the doorway article with measurements and same-day internal links.",[
  ("sofa removal dubai","Commercial","P1",95,"High","/services/sofa-removal"),("sofa disposal dubai","Commercial","P1",92,"Med","/services/sofa-removal"),("sofa won't fit through door dubai","Problem","P1",91,"Low","/blog/sofa-wont-fit-through-door-dubai")]),
 (6,"Convert appliance and fridge searches","Clarify disconnection responsibility, accepted appliances, carry route, and compliant handling.",[
  ("fridge disposal dubai","Commercial","P1",96,"Med","/services/appliance-disposal"),("fridge removal dubai","Commercial","P1",94,"Med","/services/appliance-disposal"),("appliance removal dubai","Commercial","P1",92,"Med","/services/appliance-disposal")]),
 (7,"Target high-conversion single items","Refresh mattress and wardrobe guides; surface exact item CTAs on the furniture page.",[
  ("mattress removal dubai","Commercial","P1",93,"Med","/blog/mattress-disposal-dubai"),("mattress disposal dubai","Commercial","P1",92,"Med","/blog/mattress-disposal-dubai"),("wardrobe removal dubai","Commercial","P2",88,"Low","/blog/wardrobe-removal-dubai")]),
 (8,"Clarify whole-home clearance","Differentiate house/apartment clearance from routine junk pickup and from villa clearance.",[
  ("house clearance dubai","Commercial","P1",95,"High","/services/house-clearance"),("apartment clearance dubai","Commercial","P1",93,"Med","/services/house-clearance"),("property clearance dubai","Commercial","P2",88,"Med","/services/house-clearance")]),
 (9,"Own the handover deadline","Refresh the tenancy guide with a timeline, inspection checklist, and quote-by-photo CTA.",[
  ("end of tenancy clearance dubai","Commercial","P1",95,"Med","/blog/end-of-tenancy-clearance-dubai"),("move out clearance dubai","Commercial","P1",93,"Med","/blog/end-of-tenancy-clearance-dubai"),("handover clearance dubai","Commercial","P1",92,"Med","/services/house-clearance")]),
 (10,"Position full-villa capability","Add room-by-room scope, crew/load planning, garden/storage coverage, and handover proof.",[
  ("villa clearance dubai","Commercial","P1",96,"High","/services/villa-clearance"),("full villa clearance dubai","Commercial","P1",93,"Med","/services/villa-clearance"),("villa handover clearance dubai","Commercial","P1",92,"Low","/blog/villa-handover-clearance-dubai")]),
 (11,"Exploit the garden-waste gap","Expand accepted-material guidance and separate green waste from soil, pots, and outdoor furniture.",[
  ("garden waste removal dubai","Commercial","P1",94,"Med","/services/garden-waste-removal"),("garden waste collection dubai","Commercial","P1",92,"Med","/services/garden-waste-removal"),("green waste removal dubai","Commercial","P1",90,"Med","/services/garden-waste-removal")]),
 (12,"Strengthen the B2B landing page","Add business hours, access planning, documentation boundaries, and a site-survey CTA.",[
  ("commercial junk removal dubai","Commercial","P1",94,"High","/services/commercial-junk-removal"),("office clearance dubai","Commercial","P1",93,"Med","/services/commercial-junk-removal"),("office junk removal dubai","Commercial","P2",89,"Med","/services/commercial-junk-removal")]),
 (13,"Build office asset authority","Connect furniture, strip-out, and IT guides into one commercial cluster with clear capability limits.",[
  ("office furniture removal dubai","Commercial","P2",90,"Med","/blog/office-furniture-removal-dubai"),("office strip out clearance dubai","Commercial","P2",89,"Low","/blog/office-strip-out-dubai"),("IT equipment disposal dubai","Commercial","P2",88,"Med","/blog/it-equipment-disposal-dubai")]),
 (14,"Capture renovation and fit-out demand","Refresh the waste page and renovation guide; verify every licensing and material claim.",[
  ("renovation waste removal dubai","Commercial","P2",89,"Med","/blog/renovation-waste-removal-dubai"),("construction waste removal dubai","Commercial","P2",88,"High","/services/waste-removal"),("fit out waste removal dubai","Commercial","P2",87,"Med","/services/commercial-junk-removal")]),
 (15,"Lead with Dubai Marina","Add tower-specific proof, service-lift workflow, property types, and unique job evidence.",[
  ("junk removal dubai marina","Local commercial","P1",95,"Med","/areas/dubai-marina"),("furniture removal dubai marina","Local commercial","P2",90,"Low","/areas/dubai-marina"),("apartment clearance dubai marina","Local commercial","P2",89,"Low","/areas/dubai-marina")]),
 (16,"Build the tower-area cluster","Differentiate JLT and JBR pages; connect both to tower access and bulky-item guidance.",[
  ("junk removal jlt","Local commercial","P1",92,"Low","/areas/jlt"),("junk removal jbr","Local commercial","P2",88,"Low","/areas/jbr"),("tower junk removal dubai","Commercial","P2",87,"Low","/services/residential-junk-removal")]),
 (17,"Own central Dubai business districts","Add genuine building/office evidence and strong cross-links between area and B2B pages.",[
  ("junk removal downtown dubai","Local commercial","P1",92,"Med","/areas/downtown-dubai"),("junk removal business bay","Local commercial","P1",93,"Med","/areas/business-bay"),("office clearance business bay","Local commercial","P1",91,"Low","/areas/business-bay")]),
 (18,"Differentiate premium coastal areas","Use verified gate/access and villa/garden details; avoid generic citywide copy.",[
  ("junk removal palm jumeirah","Local commercial","P1",92,"Med","/areas/palm-jumeirah"),("junk removal jumeirah","Local commercial","P2",89,"Low","/areas/jumeirah"),("garden waste removal jumeirah","Local commercial","P2",87,"Low","/areas/jumeirah")]),
 (19,"Target high-value villa communities","Add real community access steps and anonymized job examples to area pages.",[
  ("junk removal arabian ranches","Local commercial","P1",92,"Low","/areas/arabian-ranches"),("villa clearance arabian ranches","Local commercial","P1",93,"Low","/areas/arabian-ranches"),("junk removal dubai hills","Local commercial","P2",89,"Low","/areas/dubai-hills")]),
 (20,"Cover dense apartment communities","Differentiate each area by building type, access, common items, and route-day evidence.",[
  ("junk removal jvc","Local commercial","P1",93,"Med","/areas/jvc"),("junk removal discovery gardens","Local commercial","P2",87,"Low","/areas/discovery-gardens"),("junk removal international city","Local commercial","P2",87,"Low","/areas/international-city")]),
 (21,"Build eastern residential coverage","Use household, appliance, and office/e-waste angles without duplicating service-page copy.",[
  ("junk removal mirdif","Local commercial","P2",89,"Low","/areas/mirdif"),("junk removal al warqa","Local commercial","P3",83,"Low","/areas/al-warqa"),("junk removal dubai silicon oasis","Local commercial","P2",88,"Low","/areas/dubai-silicon-oasis")]),
 (22,"Strengthen mixed-use local pages","Differentiate apartments, shops, older buildings, parking, stairs, and trading-hour constraints.",[
  ("junk removal al barsha","Local commercial","P2",89,"Med","/areas/al-barsha"),("junk removal deira","Local commercial","P2",88,"Med","/areas/deira"),("junk removal bur dubai","Local commercial","P2",87,"Low","/areas/bur-dubai")]),
 (23,"Win industrial and warehouse intent","Add site access, volume assessment, stock separation, and commercial scheduling detail.",[
  ("junk removal al quoz","Local commercial","P2",89,"Med","/areas/al-quoz"),("warehouse clearance al quoz","Local commercial","P2",90,"Low","/areas/al-quoz"),("junk removal dip","Local commercial","P3",83,"Low","/areas/dip")]),
 (24,"Own the free-versus-paid decision","Update the municipality and comparison guides only with current official facts and explicit service limits.",[
  ("dubai municipality bulky waste collection","Informational","P1",94,"Med","/blog/dubai-municipality-bulky-waste"),("free junk removal dubai","Commercial research","P2",87,"High","/blog/free-junk-removal-dubai-truth"),("junk removal vs municipality collection dubai","Comparison","P1",92,"Low","/blog/municipality-vs-paid-junk-removal-dubai")]),
 (25,"Capture price and booking intent","Publish real price logic or ranges only if the business can honor them; strengthen quote tracking.",[
  ("junk removal cost dubai","Commercial research","P1",96,"High","/blog/junk-removal-cost-dubai"),("junk removal quote dubai","Transactional","P1",93,"Med","/contact"),("book junk removal dubai","Transactional","P1",92,"Med","/contact")]),
 (26,"Turn access anxiety into leads","Cross-link the service-lift, NOC, and bulky-item guides to every high-rise area page.",[
  ("junk removal service lift dubai","Problem","P1",92,"Low","/blog/service-lift-booking-dubai"),("NOC to move furniture dubai","Informational","P1",91,"Low","/blog/noc-moving-furniture-dubai"),("getting bulky items out of a tower dubai","Problem","P1",90,"Low","/blog/bulky-items-tower-dubai")]),
 (27,"Build responsible appliance authority","Refresh e-waste and item guides; avoid unverified recycling-rate or certificate claims.",[
  ("e waste disposal dubai","Commercial","P2",90,"High","/blog/e-waste-disposal-dubai"),("TV disposal dubai","Commercial","P2",87,"Low","/blog/tv-disposal-dubai"),("washing machine removal dubai","Commercial","P2",88,"Low","/blog/washing-machine-removal-dubai")]),
 (28,"Own furniture option research","Refresh the options and donation content; convert broken/non-donatable items to paid removal.",[
  ("how to dispose of old furniture in dubai","Informational","P1",95,"Med","/blog/dispose-old-furniture-dubai"),("where to donate furniture in dubai","Informational","P1",90,"High","/blog/donate-furniture-dubai"),("who removes old furniture in dubai","Informational","P1",92,"Low","/blog/dispose-old-furniture-dubai")]),
 (29,"Strengthen local trust signals","Complete/verify GBP, align NAP and service areas, request real reviews, and resolve brand confusion.",[
  ("junk removal near me","Local transactional","P1",96,"High","GBP + /areas"),("best junk removal dubai","Commercial research","P2",88,"High","GBP + /about"),("junk removal dubai reviews","Navigational","P2",86,"Med","GBP + /about")]),
 (30,"Close conversion and measurement gaps","Improve scope/process pages, add CTA events, annotate baseline, and submit priority URLs in GSC.",[
  ("what junk removal companies take dubai","Informational","P2",88,"Low","/blog/what-we-take-dubai"),("how junk removal works dubai","Informational","P1",90,"Low","/how-it-works"),("what to do before junk removal arrives dubai","Informational","P2",86,"Low","/blog/before-the-crew-arrives-dubai")]),
]

assert len(plan) == 30
all_keywords = [k[0] for d in plan for k in d[3]]
assert len(all_keywords) == 90 and len(set(x.lower() for x in all_keywords)) == 90


story = []

# Cover
cover = Table([[P("SEO OPPORTUNITY REPORT", "Small")], [P("90 high-potential keywords.<br/>One focused 30-day execution plan.", "CoverTitle")], [P("Junk Services Dubai<br/>Website, services, competitors, technical SEO, local SEO, and content priorities", "CoverSub")], [Spacer(1, 42*mm)], [P("Prepared 15 October 2026<br/>Market: Dubai, United Arab Emirates<br/>Domain: junkservicesdubai.com", "CoverSub")]], colWidths=[A4[0]-36*mm], rowHeights=[12*mm, 40*mm, 26*mm, 50*mm, 26*mm])
cover.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,-1), NAVY), ("LEFTPADDING", (0,0), (-1,-1), 16*mm),
    ("RIGHTPADDING", (0,0), (-1,-1), 16*mm), ("TOPPADDING", (0,0), (-1,-1), 4*mm),
    ("BOTTOMPADDING", (0,0), (-1,-1), 4*mm), ("VALIGN", (0,0), (-1,-1), "TOP"),
]))
story += [cover, PageBreak()]

story += [P("Executive summary", "H1x"),
          P("The site has a strong technical base and unusually broad topical coverage for a young local-service domain. The fastest route to customers is not another burst of generic articles. It is a disciplined combination of money-page consolidation, high-intent long-tail optimization, proof-rich area pages, Google Business Profile work, and measurement.", "Callout")]

summary_rows = [
 ("Crawl surface","106 indexable URLs: 12 services, 30 areas, 57 posts, 1 blog index, 6 static pages.","Strong","Keep the architecture; improve prioritization and internal linking."),
 ("Crawl hygiene","0 broken links, redirect chains, duplicate titles, canonical errors, missing H1s, missing image alt text, or sitemap mismatches.","Strong","Maintain automated crawl checks after every content batch."),
 ("Metadata","Blog pagination pages share one meta description.","Minor issue","Generate page-specific descriptions or noindex deep pagination if it adds no landing value."),
 ("Structured data","465 valid JSON-LD blocks across the crawl; LocalBusiness and WebSite markup appear sitewide.","Strong base","Add complete real business details where missing; do not fabricate ratings."),
 ("Performance","Lab Lighthouse snapshot: 87 Performance, 100 SEO, 100 Accessibility, 100 Best Practices; LCP 3.3s.","Good, improvable","Prioritize LCP and main-thread work on mobile templates."),
 ("Content","57 blog posts already published, many at roughly 11 minutes reading time.","High coverage","Consolidate around commercial clusters and add original operational evidence."),
 ("Local SEO","30 area pages exist, but rankings will depend on unique local proof plus GBP relevance, distance, and prominence.","Largest upside","Add real jobs, access details, photos, citations, and review velocity."),
 ("Measurement","Repo notes indicate missing/partial CTA analytics and no supplied GSC/Keyword Planner export.","Blocking insight","Instrument WhatsApp/call clicks and establish Day 0 query/page baselines."),
]
story += [audit_table(summary_rows), Spacer(1, 5*mm)]
story += [P("Highest-impact conclusion", "H2x"), P("Focus the first 10 days on pages that can generate enquiries now; days 11-23 on service and local clusters; and days 24-30 on decision content, local trust, and measurement. Treat each day's three terms as one intent cluster on one primary URL - never as three thin pages.")]
story += [P("Important data caveat", "H2x"), P("No authenticated Google Ads Keyword Planner, Google Search Console, Ahrefs, or Semrush export was available. Therefore exact monthly search volume and numeric keyword difficulty are shown as N/V (not verified), not guessed. The report supplies a qualitative SERP competition estimate and an Opportunity Score based on commercial intent, local fit, specificity, current site fit, and observed result quality. Replace N/V with geo-targeted Dubai figures before committing paid budget or making traffic forecasts.", "Note"), PageBreak()]

story += [P("Business and search-market analysis", "H1x"),
 P("Junk Services Dubai sells labor-included collection: a customer sends photos, receives an upfront quote, and a crew carries, loads, and removes unwanted items. The offer spans single bulky items, furniture and appliances, garden waste, whole homes and villas, urgent pickups, and commercial clear-outs. The strongest differentiators in the live copy are same-day availability, photo-based quoting, heavy lifting, building-access planning, property protection, and responsible routing."),
 P("Search demand is fragmented across four decision patterns", "H2x")]

market_data = [
 [P("Pattern","TableHead"),P("Searcher's real job","TableHead"),P("Best page type","TableHead"),P("Examples","TableHead")],
 [P("Immediate removal","TableCellBold"),P("Get an item or load gone now","TableCell"),P("Service / contact","TableCell"),P("same day, urgent, quote, pickup","TableCell")],
 [P("Specific item","TableCellBold"),P("Remove something awkward or non-donatable","TableCell"),P("Service + guide","TableCell"),P("sofa, fridge, mattress, wardrobe","TableCell")],
 [P("Property deadline","TableCellBold"),P("Clear a space for handover, move-out, inspection, or refit","TableCell"),P("Clearance service + checklist","TableCell"),P("end of tenancy, villa handover, office strip-out","TableCell")],
 [P("Local logistics","TableCellBold"),P("Find a provider who understands access in the user's area","TableCell"),P("Area page + GBP","TableCell"),P("Dubai Marina, JLT, Business Bay, Arabian Ranches","TableCell")],
]
t=Table(market_data,colWidths=[32*mm,62*mm,39*mm,41*mm],repeatRows=1)
t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),("GRID",(0,0),(-1,-1),0.35,LINE),("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,PALE]),("VALIGN",(0,0),(-1,-1),"TOP"),("LEFTPADDING",(0,0),(-1,-1),5),("RIGHTPADDING",(0,0),(-1,-1),5),("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5)]))
story += [t, Spacer(1,4*mm), P("Strategic implication", "H2x"), P("The site should not create a new URL for every wording variation. One strong URL should own each intent family, with supporting guides answering real pre-purchase questions and area pages owning geo-modified queries. This protects authority and reduces cannibalization between the homepage, service pages, articles, and local pages."),
 P("Brand/entity risk", "H2x"), P("Search results show junkserviceindubai.com (singular) using essentially the same business name while your site is junkservicesdubai.com (plural). Confirm ownership immediately. If related, define one primary brand/domain and a consolidation or differentiation plan. If unrelated, strengthen GBP, citations, Organization/LocalBusiness data, branded mentions, and review acquisition so Google can distinguish the entities.", "Callout"), PageBreak()]

story += [P("Technical and on-page audit", "H1x")]
tech_rows = [
 ("Indexability","robots.txt allows crawling; sitemap is live; all crawled pages are indexable and represented.","Pass","Keep staging/preview environments noindex."),
 ("Architecture","Clear service, area, article, and static-page hierarchy with breadcrumbs.","Pass","Use hubs to push authority to the top 10 money pages."),
 ("Titles","No duplicate titles across 106 pages.","Pass","Rewrite only when GSC shows impressions but weak CTR."),
 ("Descriptions","Blog pages 1-6 reuse one description.","Fix","Add pagination-specific copy or evaluate indexing need."),
 ("Canonicals","No missing canonicals; apex domain is consistent.","Pass","Monitor singular/plural domain confusion separately."),
 ("Headings","Exactly one H1 on every crawled page.","Pass","Keep primary intent in H1 without stuffing variants."),
 ("Images","No missing alt attributes in the crawl.","Pass","Replace stock/generic imagery with real crew/job evidence over time."),
 ("Schema","All JSON-LD parsed; service, FAQ, breadcrumb, article, LocalBusiness, WebSite present.","Pass","Fill verified address/geo/hours where appropriate; avoid self-serving review markup."),
 ("Performance","Mobile lab score 87; LCP 3.3s, TBT 250ms, CLS 0.","Improve","Compress/priority-load the LCP asset and reduce main-thread JS."),
 ("Environment docs","CONTENT_CACHE_VERSION is read but absent from .env.example.","Fix","Document the variable to protect deployment consistency."),
]
story += [audit_table(tech_rows), Spacer(1,5*mm), P("Content-quality warning", "H2x"), P("The site already has 57 posts. Publishing more pages without original job evidence risks diminishing returns. Every future update should add something competitors cannot easily imitate: anonymized job examples, access constraints, before/after photos, real quote factors, accepted/excluded materials, named process ownership, or verifiable disposal documentation."),
 P("Recommended page ownership", "H2x"), P("Homepage: core head term. Service pages: transactional category terms and close variants. Articles: cost, rules, comparisons, preparation, and item problems. Area pages: local modifier plus one or two locally plausible service combinations. GBP: near-me, reviews, map pack, service-area visibility."), PageBreak()]

story += [P("Competitor and SERP landscape", "H1x"), P("Live Google-result sampling shows a crowded market with many exact-match domains and rapidly expanding content libraries. Most competitors repeat the same promises - same day, fixed price, eco-friendly, licensed, WhatsApp - so generic claims are not a durable moat.")]
comp = [
 [P("Competitor","TableHead"),P("Observed strength","TableHead"),P("Weakness / opening","TableHead"),P("Response","TableHead")],
 [P("junkserviceindubai.com","TableCellBold"),P("Exact-match relevance, same/similar brand, GBP/review language, broad service and content footprint.","TableCell"),P("Entity confusion; content can look keyword-heavy; ownership relationship unknown.","TableCell"),P("Resolve ownership and primary brand/domain. Strengthen entity consistency.","TableCell")],
 [P("junkremovalsdubai.com","TableCellBold"),P("Large current content program, item/service pages, visible review proof, polished topical clustering.","TableCell"),P("Many claims are easy to imitate; freshness alone does not prove experience.","TableCell"),P("Compete with real operations evidence, local proof, and superior conversion paths.","TableCell")],
 [P("dubaijunkcollection.com","TableCellBold"),P("Premium design, fixed-price positioning, strong commercial clarity, community coverage.","TableCell"),P("Broad claims create openings for deeper item- and access-specific content.","TableCell"),P("Lead with logistics detail: lifts, gates, crews, route planning, handover deadlines.","TableCell")],
 [P("takemyjunkuae.com","TableCellBold"),P("Long operating history, free reusable-item collection, large fleet, strong category association.","TableCell"),P("Free route is selective; damaged/non-reusable and urgent loads remain paid-service opportunities.","TableCell"),P("Own the honest free-vs-paid comparison and non-donatable-item intent.","TableCell")],
 [P("junknear.me / EcoHaul / Dotless","TableCellBold"),P("Strong niche landing pages, polished promises, aggressive speed/compliance positioning.","TableCell"),P("Some claims may be difficult to substantiate; less local proof on individual pages.","TableCell"),P("Use verified documentation, genuine reviews, and area-specific job examples.","TableCell")],
]
t=Table(comp,colWidths=[35*mm,48*mm,47*mm,44*mm],repeatRows=1)
t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),("GRID",(0,0),(-1,-1),0.35,LINE),("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,PALE]),("VALIGN",(0,0),(-1,-1),"TOP"),("LEFTPADDING",(0,0),(-1,-1),5),("RIGHTPADDING",(0,0),(-1,-1),5),("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5)]))
story += [t, Spacer(1,5*mm), P("Observed ranking openings", "H2x"),
 P("1. Specific-item and access problems have lower apparent competition than head terms. 2. Geo + service combinations often surface thin or generic pages. 3. Free-vs-paid, municipality, handover, lift/NOC, and disposal-route searches reveal urgent commercial decisions. 4. B2B searches reward operational detail and documentation. 5. Near-me performance will depend heavily on GBP completeness, proximity, prominence, links, and reviews, not repeated keyword text."),
 P("What not to copy", "H2x"), P("Do not adopt unverifiable recycling percentages, 30-minute guarantees, licenses, disposal certificates, insurance status, review counts, or Dubai Municipality claims merely because competitors use them. Verification is a conversion asset and a legal/reputation safeguard."), PageBreak()]

story += [P("Keyword methodology and evidence standard", "H1x"),
 P("The final 90 were selected from a larger internal inventory and live result sampling. Selection favored customer intent, local specificity, relevance to proven services, fit with an existing page, ability to convert, and a realistic path to differentiation."),
 P("Opportunity Score", "H2x"), P("A 0-100 editorial score, not a Google metric: 30% commercial/lead intent, 25% local/service fit, 20% specificity and likely conversion, 15% observed SERP opening, 10% strength of the current destination page. Scores rank work within this plan; they do not predict traffic."),
 P("SERP competition", "H2x"), P("Low/Med/High is a qualitative assessment from current result sampling. It is deliberately labeled separately from keyword difficulty. Exact numeric KD is N/V until an Ahrefs/Semrush export is supplied."),
 P("Search volume and numeric KD", "H2x"), P("Every keyword row records Volume/KD as N/V because no authenticated, geo-targeted data export was available. Public snippets did not provide defensible figures. Recommended replacement source: Google Ads Keyword Planner set to Dubai (monthly volume/CPC), plus Google Search Console impressions and current ranking URL, and optionally Ahrefs/Semrush KD. Record source, geography, date, and match type."),
 P("Priority", "H2x"), P("P1 = direct lead/revenue or critical local foundation; P2 = strong supporting or mid-tail opportunity; P3 = useful local depth with lower estimated demand or confidence."),
 P("One cluster, one owner", "Callout"), P("The three keywords scheduled each day are a cluster. Optimize one destination and its supporting links. Do not create three pages. This plan protects the homepage from the junk-removal service page, house clearance from villa clearance, garbage removal from waste removal, and service pages from local area pages."), PageBreak()]

story += [P("30-day plan: 90 prioritized keywords", "H1x"), P("Execution sequence is ordered for business impact. Each day's output should be completed, quality-checked, internally linked, and tracked before moving on. Volume/KD remains N/V until verified data is imported.", "Note")]

def day_block(entry):
    day, focus, action, kws = entry
    rows = [[P("Keyword", "TableHead"),P("Intent", "TableHead"),P("Pri", "TableHead"),P("Opp.", "TableHead"),P("SERP", "TableHead"),P("Vol/KD", "TableHead"),P("Target", "TableHead")]]
    for kw,intent,pri,score,serp,target in kws:
        rows.append([P(kw,"TableCellBold"),P(intent,"TableCell"),P(pri,"TableCellBold"),P(str(score),"TableCellBold"),P(serp,"TableCell"),P("N/V - N/V","TableCell"),P(target,"Tiny")])
    table=Table(rows,colWidths=[45*mm,26*mm,10*mm,12*mm,14*mm,21*mm,46*mm],repeatRows=1)
    table.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),("GRID",(0,0),(-1,-1),0.35,LINE),("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,PALE]),("VALIGN",(0,0),(-1,-1),"TOP"),("LEFTPADDING",(0,0),(-1,-1),4),("RIGHTPADDING",(0,0),(-1,-1),4),("TOPPADDING",(0,0),(-1,-1),4),("BOTTOMPADDING",(0,0),(-1,-1),4)]))
    return KeepTogether([P(f"Day {day}: {focus}","Day"),P(action,"Small"),Spacer(1,2*mm),table,Spacer(1,6*mm)])

for i in range(0,30,2):
    story += [day_block(plan[i]), day_block(plan[i+1])]
    if i < 28:
        story.append(PageBreak())

story += [PageBreak(), P("Top 15 immediate priorities", "H1x"), P("If capacity is limited, execute these first. They combine strong buying intent with a clear destination and/or an observed long-tail opening.")]
top15 = sorted([(k[3],k[0],k[1],k[2],k[5]) for d in plan for k in d[3]], reverse=True)[:15]
rows=[[P("Rank","TableHead"),P("Keyword","TableHead"),P("Intent","TableHead"),P("Pri","TableHead"),P("Score","TableHead"),P("Owner","TableHead")]]
for n,(score,kw,intent,pri,target) in enumerate(top15,1): rows.append([P(str(n),"TableCellBold"),P(kw,"TableCellBold"),P(intent,"TableCell"),P(pri,"TableCellBold"),P(str(score),"TableCellBold"),P(target,"Tiny")])
t=Table(rows,colWidths=[12*mm,55*mm,33*mm,13*mm,15*mm,46*mm],repeatRows=1)
t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),("GRID",(0,0),(-1,-1),0.35,LINE),("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,PALE]),("VALIGN",(0,0),(-1,-1),"TOP"),("LEFTPADDING",(0,0),(-1,-1),5),("RIGHTPADDING",(0,0),(-1,-1),5),("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5)]))
story += [t, Spacer(1,6*mm), P("Expected sequencing", "H2x"), P("Head terms are valuable but slow. Early wins are more likely from urgent, item-specific, access-problem, and geo-service combinations. Use those wins to earn links, reviews, engagement, and internal authority that later support the head terms."), PageBreak()]

story += [P("Local SEO action plan", "H1x"),
 P("Google states that local results are mainly based on relevance, distance, and prominence. The website can improve relevance and prominence, but it cannot optimize away distance. A complete, verified Google Business Profile is therefore a core acquisition channel, not an optional citation."),
 P("Week 1 - entity and profile", "H2x"), P("Confirm the primary brand/domain; verify GBP; use the correct service-area business setup; complete categories, phone, website, hours, services, description, and service areas; align the same name/phone/site across major citations."),
 P("Week 2 - evidence", "H2x"), P("Upload genuine crew, truck, before/after, and completed-job photos. Request reviews from real customers after completed work. Respond helpfully and naturally; never script keyword-stuffed reviews."),
 P("Week 3 - local landing pages", "H2x"), P("Upgrade the top area pages with two or three real local job examples, actual access considerations, relevant property types, nearby communities, unique images where available, and internal links to the matching service/problem guides."),
 P("Week 4 - authority and consistency", "H2x"), P("Pursue relevant local citations and partnerships: property managers, building communities, relocation providers, fit-out contractors, landscapers, storage operators, and Dubai-focused directories. Avoid bulk low-quality directory packages."),
 P("Local page quality gate", "Callout"), P("Do not add dozens of new area pages. The site already has 30. Improve the ones with demonstrated impressions, real service history, and unique facts. A local page must answer why this job is different in this area, not merely swap the place name."), PageBreak()]

story += [P("Measurement framework", "H1x"),
 P("SEO success is qualified enquiries and booked jobs, not article count. Establish a baseline before the 30-day execution cycle, then compare by query, landing page, action, and lead quality."),
 P("Instrument first", "H2x")]
measure = [
 [P("Layer","TableHead"),P("Metric","TableHead"),P("Source","TableHead"),P("Decision","TableHead")],
 [P("Visibility","TableCellBold"),P("Impressions, ranking queries, indexed URLs","TableCell"),P("Google Search Console","TableCell"),P("Which clusters are being discovered?","TableCell")],
 [P("Relevance","TableCellBold"),P("Correct URL ranking, CTR, cannibalization","TableCell"),P("GSC query + page reports","TableCell"),P("Is the intended owner winning?","TableCell")],
 [P("Engagement","TableCellBold"),P("Article-to-service clicks, pages/session","TableCell"),P("Plausible or GA4","TableCell"),P("Do support pages move users toward service?","TableCell")],
 [P("Conversion","TableCellBold"),P("WhatsApp, call, form submit by landing page","TableCell"),P("Event tracking + Payload Leads","TableCell"),P("Which pages create enquiries?","TableCell")],
 [P("Business","TableCellBold"),P("Qualified leads, booked jobs, revenue","TableCell"),P("CRM / intake log","TableCell"),P("Which clusters deserve more investment?","TableCell")],
 [P("Local","TableCellBold"),P("GBP calls, website clicks, directions, review growth","TableCell"),P("GBP performance","TableCell"),P("Is map visibility improving?","TableCell")],
]
t=Table(measure,colWidths=[25*mm,55*mm,43*mm,51*mm],repeatRows=1)
t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),("GRID",(0,0),(-1,-1),0.35,LINE),("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,PALE]),("VALIGN",(0,0),(-1,-1),"TOP"),("LEFTPADDING",(0,0),(-1,-1),5),("RIGHTPADDING",(0,0),(-1,-1),5),("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5)]))
story += [t, Spacer(1,6*mm), P("Day 0", "H2x"), P("Export the previous 28 days from GSC by query and page; capture index coverage; record organic sessions and every available conversion; export GBP performance; note the correct owner URL for each P1 keyword."),
 P("Day 30", "H2x"), P("Look first for indexation, new ranking queries, impressions on the intended URL, and early long-tail clicks. Diagnose clusters that remain flat before publishing more. Rewrite titles only when impressions exist and CTR is weak."),
 P("Day 60-90", "H2x"), P("Evaluate qualified leads and booked work by landing cluster. Expand the winners, consolidate pages that compete, and reduce effort on topics that generate visibility but no commercial movement."), PageBreak()]

story += [P("Sources and research notes", "H1x"),
 P("Primary site evidence", "H2x"),
 P("- Live crawl of https://www.junkservicesdubai.com and its robots.txt, sitemap.xml, service, area, and article pages on 15 October 2026.<br/>- Repository architecture, service/area seed content, published article inventory, SEO helpers, schema implementation, robots, sitemap, and the existing controlled keyword inventory.<br/>- Automated crawl checks: 106 HTML pages, all indexable and in the sitemap; one duplicate meta-description pattern on blog pagination.<br/>- Local Lighthouse mobile lab run: Performance 87, SEO 100, Accessibility 100, Best Practices 100; LCP 3.3s, TBT 250ms, CLS 0. Lab data is a snapshot, not field data."),
 P("Google and official guidance", "H2x"),
 P("- Google Business Profile: Tips to improve your local ranking on Google - https://support.google.com/business/answer/7091<br/>- Google Search Central: LocalBusiness structured data - https://developers.google.com/search/docs/appearance/structured-data/local-business<br/>- Google Business Profile: Get started - https://support.google.com/business/answer/7039811<br/>- Dubai Municipality: Disposal of Unwanted Materials technical guideline - https://www.dm.gov.ae/wp-content/uploads/2021/06/Technical-Guideline-No.10-Disposal-of-Unwanted-Materials2.pdf"),
 P("Live competitor/result sampling", "H2x"),
 P("Representative domains reviewed in current results included junkserviceindubai.com, junkremovalsdubai.com, dubaijunkcollection.com, takemyjunkuae.com, junknear.me, getjunkremovalsdubai.com, dotless.ae, movemyjunkdubai.com, dubaijunkremovals.com, and other local exact-match sites. Sampling covered core, same-day, furniture, villa, garden, commercial, local-area, appliance, mattress, tenancy, and office queries."),
 P("Evidence limitations", "H2x"),
 P("Search results vary by location, language, device, personalization, and time. This research was not performed from an authenticated Dubai-local rank tracker or Google Ads account. Exact search volume, CPC, and numeric KD were therefore not asserted. Validate with a Dubai-geotargeted Keyword Planner export and GSC before forecasting traffic or revenue.", "Note"),
 P("Final operating principle", "Callout"),
 P("Publish less, prove more. Build each important page around one intent, one owner URL, real Dubai operating evidence, and a measurable path to WhatsApp, phone, or form enquiry.")]

doc = SimpleDocTemplate(str(OUT), pagesize=A4, rightMargin=18*mm, leftMargin=18*mm, topMargin=19*mm, bottomMargin=17*mm, title="Junk Services Dubai SEO Opportunity Report", author="OpenAI Codex")
doc.build(story, onFirstPage=page_header_footer, onLaterPages=page_header_footer)
print(OUT.resolve())
