# Codebase Structure

**Analysis Date:** 2026-02-13

## Directory Layout

```
gastei/
├── app/                    # Next.js application
│   ├── src/
│   │   ├── app/           # Pages and routes
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and config
│   │   ├── data/          # Static data
│   │   └── types/         # TypeScript types
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── postcss.config.mjs
├── .planning/codebase/    # GSD planning artifacts
├── PRODUCT_ANALYSIS.md    # Product documentation
└── UI_UX_ANALYSIS.md      # UI/UX analysis
```

## Directory Purposes

**app/src/app:**
- Purpose: Next.js App Router pages and routes
- Contains: Page components, layouts, server actions
- Key files: `page.tsx`, `layout.tsx`, `dashboard/page.tsx`, `actions/waitlist.ts`

**app/src/components:**
- Purpose: All React UI components
- Contains: UI primitives, sections, cards, layouts, animations, waitlist
- Key subdirectories:
  - `ui/` - Radix-based primitive components (button, dialog, input, etc.)
  - `sections/` - Landing page sections (hero, pricing, cta, how-it-works)
  - `layout/` - Header and footer
  - `animations/` - Framer Motion wrappers and Lenis scroll provider
  - `cards/` - Plan cards
  - `waitlist/` - Waitlist dialog and form
  - `remotion/` - Video/animation player components

**app/src/lib:**
- Purpose: Shared utilities and configuration
- Contains: `utils.ts` (cn class merger), `fonts.ts` (Next.js font config)
- Key files: `app/src/lib/utils.ts`, `app/src/lib/fonts.ts`

**app/src/data:**
- Purpose: Static data definitions
- Contains: Plan definitions, category definitions
- Key files: `app/src/data/plans.ts`, `app/src/data/categories.ts`

**app/src/types:**
- Purpose: TypeScript type definitions
- Contains: Interfaces for Category, Plan, WaitlistEntry
- Key files: `app/src/types/index.ts`

**app/src/hooks:**
- Purpose: Custom React hooks
- Contains: Mobile detection, reduced motion preferences
- Key files: `app/src/hooks/use-mobile.ts`, `app/src/hooks/use-reduced-motion.ts`

## Key File Locations

**Entry Points:**
- `app/src/app/layout.tsx`: Root layout - HTML shell, fonts, metadata
- `app/src/app/page.tsx`: Home page - landing page composition
- `app/src/app/dashboard/page.tsx`: Dashboard placeholder

**Configuration:**
- `app/package.json`: Dependencies and scripts
- `app/tsconfig.json`: TypeScript config with `@/*` path alias
- `app/eslint.config.mjs`: ESLint configuration
- `app/postcss.config.mjs`: PostCSS for Tailwind
- `app/components.json`: shadcn/ui component registry

**Core Logic:**
- `app/src/app/actions/waitlist.ts`: Server action for waitlist
- `app/src/components/waitlist/waitlist-form.tsx`: Form component
- `app/src/lib/utils.ts`: Utility functions (cn class merger)

## Naming Conventions

**Files:**
- kebab-case: `hero-section.tsx`, `waitlist-dialog.tsx`
- PascalCase for components: `Button.tsx`, `HeroSection.tsx`

**Directories:**
- kebab-case: `app/src/components/sections/`, `app/src/data/`

**Components:**
- PascalCase: `HeroSection`, `PricingSectionClient`, `WaitlistDialog`
- Functional components with explicit return types where beneficial

**Types:**
- PascalCase: `Category`, `Plan`, `WaitlistEntry`, `CategoryInfo`

## Where to Add New Code

**New Page:**
- Implementation: `app/src/app/[route]/page.tsx`
- Layout (if needed): `app/src/app/[route]/layout.tsx`
- Server actions: `app/src/app/[route]/actions/*.ts`

**New Component:**
- UI primitive: `app/src/components/ui/[name].tsx`
- Feature component: `app/src/components/[feature]/[name].tsx`
- Section: `app/src/components/sections/[name].tsx`

**New Server Action:**
- Implementation: `app/src/app/actions/[name].ts`
- Always mark with `"use server"`

**New Type:**
- Implementation: `app/src/types/index.ts` or `app/src/types/[name].ts`

**New Static Data:**
- Implementation: `app/src/data/[name].ts`

**New Hook:**
- Implementation: `app/src/hooks/use-[name].ts`

**New Utility:**
- Implementation: `app/src/lib/[name].ts`

## Special Directories

**app/.next:**
- Purpose: Next.js build output
- Generated: Yes (build-time)
- Committed: No (.gitignore)

**app/node_modules:**
- Purpose: Dependencies
- Generated: Yes (install-time)
- Committed: No (.gitignore)

**app/src/components/ui:**
- Purpose: shadcn/ui style primitive components
- Pattern: Based on Radix UI primitives with Tailwind
- Contains: button, dialog, input, card, accordion, badge, label, separator

---

*Structure analysis: 2026-02-13*
