# Gastei - Product Analysis

## What It Is

Gastei is a WhatsApp-native expense tracker for the Brazilian market. Users log expenses by sending text, voice messages, or receipt photos to a WhatsApp bot. AI handles categorization and data extraction. A web dashboard provides analytics and reports.

**Stage**: Prototype / MVP with real traction (50K+ users, 2M+ expenses tracked, 4.9/5 rating).

---

## Core Problem

Expense tracking apps fail because they require new habits: downloading an app, creating an account, opening it every time you spend. Most people give up within weeks.

For couples and families, the problem is worse - shared finances require both people to use the same tool consistently, which almost never happens. Financial disorganization between partners is a constant source of friction.

---

## Strategic Angle: Couples & Families

The strongest differentiator is the **duo/family plan**. While individual expense tracking is a crowded space, shared household finance through WhatsApp is underserved. The thesis:

- Couples consistently struggle with financial organization together
- Both partners already use WhatsApp daily
- No app downloads, no syncing, no "did you log that purchase?" friction
- A shared dashboard gives visibility without interrogation
- Family plan supports up to 5 members (household, not just couples)

This positions Gastei not as "another expense tracker" but as a **relationship/household finance tool** that happens to work for individuals too.

---

## Value Proposition

**For individuals**: "Track expenses without thinking about it. Text, talk, or snap a receipt - AI does the rest."

**For couples/families**: "Finally see where the household money goes, without nagging each other to use an app."

**Key promises**:
- Zero friction (no app, no login, no new habits)
- Multimodal input (text, voice, photo - whatever is easiest in the moment)
- AI-powered (automatic categorization, receipt OCR, natural language understanding)
- Instant (send a message, expense is logged)

---

## Feature Set

### Expense Capture (All Plans)
- **Text**: "Gastei 50 reais no mercado" - parsed and categorized automatically
- **Voice**: Send an audio message, speech-to-text extracts the data
- **Photo**: Snap a receipt, OCR pulls amount/merchant/date
- **Auto-categorization**: AI assigns one of 10 categories (food, transport, housing, health, education, leisure, groceries, clothing, services, other)

### WhatsApp Interactions (All Plans)
- Log expenses via chat
- Ask questions: "quanto gastei esse mes?"
- Receive monthly summaries
- Get reminder notifications

### Web Dashboard (Pro/Family)
- Monthly totals with month-over-month comparison
- Category breakdown (pie chart)
- Monthly trend analysis (bar chart)
- Recent transactions list with filtering
- Stat cards: total spent, highest expense, savings, transaction count

### Data Export
- CSV (Simples and above)
- PDF (Pro and above)

### Family Features (Family Plan)
- Up to 5 members on one plan
- Shared dashboard
- Consolidated household spending view

---

## Pricing Model

Freemium with usage-based upgrade triggers:

| Plan | Price | Expense Limit | Key Gate |
|------|-------|---------------|----------|
| **Gratis** | R$ 0/mo | 30/month | Entry point |
| **Simples** | R$ 9.90/mo | 200/month | CSV export |
| **Pro** | R$ 29.90/mo | Unlimited | Full dashboard + PDF export |
| **Familiar** | R$ 29.90/mo | Unlimited | Up to 5 members, shared dashboard |

**Family plan economics**: Base R$ 29.90 + R$ 5.90 per additional member (up to 4 extra). A full household of 5 = R$ 53.50/month.

**Conversion levers**:
- Free users hit the 30-expense ceiling (roughly 1/day) and need to upgrade
- Export and dashboard are locked behind paid tiers
- 7-day money-back guarantee and cancel-anytime reduce upgrade friction

---

## Target Audience

**Primary**: Couples and families who struggle with shared financial organization. Both partners use WhatsApp daily - Gastei turns that into a shared expense log without requiring coordination.

**Secondary**: Individual young adults (18-30) and working adults (25-45) who want expense awareness without the overhead of traditional finance apps.

**Geographic**: Brazil. WhatsApp has ~99% penetration. Portuguese-only. BRL pricing. LGPD-compliant.

**Psychographic**: People who value convenience over control. They don't want budgeting spreadsheets or complex tools - they want to know where the money went at the end of the month, effortlessly.

---

## Competitive Positioning

**Against traditional expense apps** (Mobills, Organizze, Guiabolso):
- No download, no account creation, no new app to remember
- "Sem apps, sem login, sem complicacao"

**Against manual tracking** (spreadsheets, notebooks):
- AI eliminates data entry
- Voice and photo capture for speed

**Against banking apps with expense features**:
- Works across all banks and payment methods
- Captures cash expenses too
- Simpler and more focused

**Unique angle**:
- WhatsApp-native in a WhatsApp-dominant market
- Family/couple use case is underserved by competitors
- Multimodal AI input (text + voice + photo) is rare in this price range

---

## Growth & Acquisition

**Primary CTA**: "Comecar Gratis" (Start Free) - appears in header, hero, pricing, and bottom CTA section. WhatsApp-based onboarding means zero signup friction.

**Social proof**: 50K+ users, 2M+ expenses, 4.9 rating (2.3K reviews) displayed prominently on the landing page.

**Trust signals**: 7-day guarantee, cancel anytime, secure payment, LGPD compliance.

**Organic growth potential**:
- Family plan inherently spreads to 4 additional people
- WhatsApp presence means friends/family may see it in use
- No explicit referral program yet (potential opportunity)

**Conversion funnel**:
1. Land on site -> see WhatsApp chat demo
2. Understand the 3-step process
3. Compare pricing plans
4. "Start Free" -> WhatsApp bot onboarding
5. Hit 30-expense limit -> upgrade prompt

---

## Compliance & Trust

Full LGPD (Brazilian data protection law) compliance:

- **Privacy policy** page with detailed data handling disclosures
- **Data revocation** page - dedicated flow for users to exercise deletion rights
- Data processed by Azure (OCR) and OpenAI (NLP) - disclosed transparently
- Data NOT sold to third parties (explicitly stated)
- 30-day deletion after cancellation, 90-day backup retention
- 7-day grace period to cancel a revocation request
- DPO contact information provided

---

## Content & Brand Voice

- **Casual Brazilian Portuguese** - "manda mensagem" not "envie mensagem"
- **Simplicity-first messaging** - short sentences, benefit-driven, no jargon
- **Confidence without hype** - real stats, clear pricing, honest data practices
- **"Anti-app" positioning** - repeatedly emphasizes what users DON'T have to do
- **Emoji-friendly** in the product (categories use emoji), professional on the site

---

## Observations & Opportunities

**Strengths**:
- The family/couple angle is genuinely differentiated
- WhatsApp-native in Brazil is a massive distribution advantage
- Real traction validates the core value prop
- LGPD compliance is thorough and builds trust

**Gaps / considerations**:
- The "Familiar" plan could be more prominently positioned if it's the strategic focus - currently it's the 4th card, not highlighted
- No explicit "couples" or "duo" plan - the family plan starts at 5 members, but the core pain point is 2 people
- No referral mechanism despite the product being inherently social
- Testimonials appear to be placeholders (no real names/photos visible in the code)
- The "Simples" plan is marked as "Most Popular" but the family plan is the strategic bet - potential misalignment
- Dashboard is gated behind Pro/Family - could limit perceived value for free/Simples users who never see what they're missing
