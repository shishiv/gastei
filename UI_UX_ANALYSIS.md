# Gastei - UI/UX Analysis

## What It Is

Gastei is a Brazilian expense tracker that works through WhatsApp. Users record expenses by texting, sending voice messages, or photos of receipts — the app auto-categorizes everything. There's also a web dashboard for analytics.

---

## Pages & User Flows

### Landing Page (`/`)
- **Hero**: Full-screen with an animated WhatsApp phone mockup showing a live chat demo. Stats float alongside it. Strong "Start Free" CTA.
- **How It Works**: 3-step visual walkthrough with connector lines between steps, plus feature highlight cards beneath.
- **Pricing**: Plan cards in a grid with a "Most Popular" badge on the recommended tier. Trust badges below.
- **CTA**: Gradient section with testimonials to close the page.

### Pricing Page (`/precos`)
- Gradient heading, all 4 plan cards, a feature comparison table, and an FAQ accordion.

### Dashboard (`/dashboard`)
- Header with month selector, export button, and "new expense" CTA.
- 4 stat cards (total spent, highest expense, savings, transaction count) with trend indicators (up/down arrows + percentages).
- Bar chart (current vs previous month) and pie chart (spending by category).
- Filterable recent expenses list with category emojis and color-coded backgrounds.

### Privacy Policy (`/privacidade`) & Data Revocation (`/revogar`)
- LGPD compliance pages. Revocation has a warning banner, phone input, confirmation checkbox, and a success state with a protocol number.

---

## Navigation & Layout

- **Sticky header** that turns translucent on scroll. Logo with gradient background, desktop nav links (Home, Pricing, Dashboard), mobile hamburger with slide-down animation.
- **Footer**: Dark background, 5-column grid (Brand/Social, Product, Legal, Support). "Made with green-heart in Brazil."
- Consistent `Header -> Main Content -> Footer` shell across all pages.

---

## Visual Design

- **Color palette**: WhatsApp-inspired greens as primary (#25D366, #128C7E), teal accents (#00A884). 10 distinct category colors for expenses (orange for food, blue for transport, purple for housing, etc.).
- **Typography**: Inter font family. Large bold headings (up to 6xl), clean body text. Clear hierarchy.
- **Spacing**: Generous section padding (py-16 to py-32), rounded corners everywhere — pill-shaped buttons, rounded-2xl cards, the phone mockup has rounded-[3rem].
- **Shadows**: Custom subtle shadows that intensify on hover, giving a "lift" effect.
- **Chat bubbles**: WhatsApp-style — user messages in light green with a tail, bot messages in white with shadow.

---

## Interactions & Animations

- `float` animation (gentle up/down) on decorative elements
- `slide-up` and `fade-in` entrance animations for sections
- Hover states: shadow deepens + slight upward translate (-translate-y-0.5)
- "New" badge with ping/pulse animation in the hero
- Accordion expand/collapse on FAQ and privacy sections

---

## Responsive Behavior

- Mobile-first: single column layouts, hamburger nav
- Tablet: 2-column grids
- Desktop: 4-column grids, full nav visible, phone mockup only appears on larger screens

---

## Overall Impression

The design bridges **casual messaging familiarity** (WhatsApp look and feel) with **professional financial credibility** (clean dashboard, trust badges, LGPD compliance). The copy is conversational, in Brazilian Portuguese, with emphasis on "zero friction." The user journey from landing to understanding to pricing to signup is well-structured with clear CTAs at every stage.
