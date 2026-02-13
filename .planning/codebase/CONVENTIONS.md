# Coding Conventions

**Analysis Date:** 2026-02-13

## Naming Patterns

**Files:**
- React components: `PascalCase.tsx` (e.g., `waitlist-dialog.tsx`, `input.tsx`)
- Utilities: `kebab-case.ts` (e.g., `utils.ts`, `fonts.ts`)
- Types: `kebab-case.ts` (e.g., `types/index.ts`)
- Data: `kebab-case.ts` (e.g., `plans.ts`, `categories.ts`)
- Server Actions: `kebab-case.ts` (e.g., `waitlist.ts`)

**Functions:**
- camelCase for all functions: `useIsMobile()`, `cn()`, `joinWaitlist()`
- Custom hooks: `use` prefix: `useIsMobile()`, `useReducedMotion()`

**Variables:**
- camelCase: `isMobile`, `formData`, `waitlistOpen`
- Boolean flags: `isMobile`, `isPending`, `open`

**Types:**
- PascalCase for interfaces and types: `Category`, `Plan`, `WaitlistEntry`, `WaitlistState`
- Union types for enums: `Category = "alimentacao" | "transporte" | ...`

## Code Style

**Formatting:**
- Tool: ESLint with `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- No Prettier config detected (relies on ESLint + editor defaults)
- Tailwind CSS v4 with CSS-first configuration in `src/app/globals.css`

**Linting:**
- ESLint 9 with flat config (`eslint.config.mjs`)
- Rules: Next.js core web vitals + TypeScript recommended
- Ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`

## Import Organization

**Order:**
1. React imports: `import * as React from "react"`
2. Next.js/framework: `import { useState } from "react"`
3. External libraries: `import { z } from "zod/v4"`
4. Internal aliases: `import { cn } from "@/lib/utils"`
5. Relative paths: `import { Button } from "./button"`

**Path Aliases:**
- `@/*` maps to `./src/*`
- Examples: `@/components/ui`, `@/lib/utils`, `@/types`, `@/hooks`, `@/data`

## Error Handling

**Server Actions:**
- Use Zod for validation with `safeParse()`
- Return typed state objects: `{ success: boolean; message: string }`
- Pattern in `src/app/actions/waitlist.ts`:
  ```typescript
  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message ?? "Dados invalidos",
    };
  }
  ```

**UI Components:**
- No explicit error boundaries in current code
- Form validation via Zod schema on server action

## Logging

**Framework:** `console.log()` with prefixed tags

**Patterns:**
- Use tag prefix: `console.log("[waitlist] New entry:", result.data)`
- Avoid in production-ready code (TODO comment in `waitlist.ts`)

## Comments

**When to Comment:**
- TODOs for future work: `// TODO: Persist to Vercel Postgres / send via Resend`
- No JSDoc/TSDoc observed in codebase

## Function Design

**Size:** Small, focused functions

**Parameters:**
- Props interfaces for components: `interface WaitlistDialogProps { open: boolean; onOpenChange: (open: boolean) => void; }`
- Form data via `FormData` object in server actions

**Return Values:**
- Explicit return types for server actions: `Promise<WaitlistState>`
- React components implicitly return JSX

## Module Design

**Exports:**
- Named exports for components: `export function WaitlistDialog(...)`
- Named exports for types: `export interface Plan { ... }`
- Constants: `export const plans: Plan[] = [...]`

**Barrel Files:**
- Types use index: `src/types/index.ts` exports all types

## Component Patterns

**Server Components:**
- Default - no directive needed
- Example: `src/app/page.tsx` (implicit server)

**Client Components:**
- `"use client"` directive at top
- Example: `src/components/waitlist/waitlist-dialog.tsx`

**UI Components (shadcn/ui):**
- Style: `new-york`
- Icon library: `lucide-react`
- Located in `src/components/ui/`

---

*Convention analysis: 2026-02-13*
