# Architecture

**Analysis Date:** 2026-02-13

## Pattern Overview

**Overall:** Next.js App Router with Server Components

**Key Characteristics:**
- Server-first architecture with selective client hydration using `"use client"` directive
- Server Actions for form submissions and data mutations
- Component-based UI with atomic design principles
- Radix UI primitives with Tailwind CSS for styling

## Layers

**Presentation Layer:**
- Purpose: User interface and visual components
- Location: `app/src/components/`
- Contains: UI primitives, sections, cards, layouts, animations
- Depends on: `app/src/lib/utils.ts`, `app/src/lib/fonts.ts`
- Used by: Pages in `app/src/app/`

**Page Layer:**
- Purpose: Route handlers and page composition
- Location: `app/src/app/`
- Contains: Page components, layouts, server actions
- Depends on: Components, types, data
- Used by: Next.js router

**Data/Types Layer:**
- Purpose: Type definitions and static data
- Location: `app/src/types/`, `app/src/data/`
- Contains: TypeScript interfaces, static plan data, category definitions
- Used by: Components, pages, actions

**Utility Layer:**
- Purpose: Shared helper functions
- Location: `app/src/lib/`
- Contains: CSS class merging, font configuration
- Used by: All layers

**Hook Layer:**
- Purpose: Custom React hooks for reusable behavior
- Location: `app/src/hooks/`
- Contains: Mobile detection, reduced motion preferences
- Used by: Client components

## Data Flow

**Landing Page Flow:**
1. User visits `/` → Server renders `page.tsx` (marked `"use client"`)
2. Page composes sections: Hero → HowItWorks → Pricing → CTA
3. User clicks "Comecar Gratis" → Opens `WaitlistDialog`
4. User submits form → Server Action `joinWaitlist` validates with Zod
5. Server Action returns success/error → Dialog shows toast via Sonner

**Static Data Flow:**
1. `app/src/data/plans.ts` exports static Plan array
2. `app/src/types/index.ts` defines TypeScript interfaces
3. Components import types and data directly (no API layer yet)

## Key Abstractions

**UI Components (Radix-based):**
- Purpose: Reusable primitive UI elements
- Examples: `app/src/components/ui/button.tsx`, `app/src/components/ui/dialog.tsx`
- Pattern: Compound components with CVA variants

**Section Components:**
- Purpose: Landing page sections
- Examples: `app/src/components/sections/hero-section.tsx`, `app/src/components/sections/pricing-section.tsx`
- Pattern: Functional components with props interfaces

**Animation Components:**
- Purpose: Framer Motion wrappers
- Examples: `app/src/components/animations/motion-wrapper.tsx`, `app/src/components/animations/lenis-provider.tsx`
- Pattern: Higher-order components with motion presets

## Entry Points

**Root Layout:**
- Location: `app/src/app/layout.tsx`
- Triggers: All routes
- Responsibilities: HTML shell, metadata, fonts, toaster

**Home Page:**
- Location: `app/src/app/page.tsx`
- Triggers: GET `/`
- Responsibilities: Landing page composition, waitlist dialog state

**Dashboard Page:**
- Location: `app/src/app/dashboard/page.tsx`
- Triggers: GET `/dashboard`
- Responsibilities: Placeholder - "Em breve"

**Static Pages:**
- Location: `app/src/app/privacidade/page.tsx`, `app/src/app/revogar/page.tsx`, `app/src/app/precos/page.tsx`
- Triggers: GET `/privacidade`, `/revogar`, `/precos`
- Responsibilities: Static content pages

**Server Actions:**
- Location: `app/src/app/actions/waitlist.ts`
- Triggers: Form submissions
- Responsibilities: Email validation (Zod), logging (TODO: persistence)

## Error Handling

**Strategy:** Try-catch with user-friendly error messages

**Patterns:**
- Server Action returns `{ success: boolean; message: string }` discriminated union
- Client displays errors via Sonner toast notifications
- Zod validation errors returned as part of state

## Cross-Cutting Concerns

**Logging:** Console.log with prefixed tags (e.g., `[waitlist]`)

**Validation:** Zod schema validation in server actions

**Authentication:** Not implemented (future: WhatsApp-based auth)

**Styling:** Tailwind CSS with custom CSS variables in `globals.css`

---

*Architecture analysis: 2026-02-13*
