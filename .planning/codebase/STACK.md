# Technology Stack

**Analysis Date:** 2026-02-13

## Languages

**Primary:**
- TypeScript 5.x - All application code in `app/src/`
- JavaScript - Minimal (ESLint config)

**Styling:**
- CSS (Tailwind CSS 4.x) - Used in `app/src/app/globals.css`

## Runtime

**Environment:**
- Node.js 20+ (required by Next.js 16)
- Browser targets: Modern browsers (ES2017+)

**Package Manager:**
- npm - Lockfile: Not present (no `package-lock.json` or `yarn.lock` found)

## Frameworks

**Core:**
- Next.js 16.1.6 - Full-stack React framework
- React 19.2.3 - UI library

**Styling:**
- Tailwind CSS 4.x - Utility-first CSS framework
- PostCSS - CSS processing (via `@tailwindcss/postcss`)

**UI Components:**
- Radix UI 1.4.3 - Unstyled, accessible component primitives
- Lucide React 0.563.0 - Icon library

**Animation:**
- Framer Motion 12.33.0 - React animation library
- GSAP 3.14.2 - Animation platform
- Lenis 1.3.17 - Smooth scrolling library
- Remotion 4.0.419 - Video/animation in React

**Forms:**
- React Hook Form 7.71.1 - Form state management
- Zod 4.3.6 - Schema validation
- @hookform/resolvers 5.2.2 - Zod resolvers for react-hook-form

**Notifications:**
- Sonner 2.0.7 - Toast notifications

## Key Dependencies

**Critical:**
- next 16.1.6 - Framework
- react 19.2.3 - UI
- tailwindcss 4 - Styling

**Animation & Media:**
- framer-motion 12.33.0 - Declarative animations
- remotion 4.0.419 - Video in React
- @remotion/player 4.0.419 - Video player

**UI & UX:**
- radix-ui 1.4.3 - Headless components
- lucide-react 0.563.0 - Icons
- clsx 2.1.1 - Conditional classnames
- tailwind-merge 3.4.0 - Tailwind class merging
- class-variance-authority 0.7.1 - CVA for variants

**Forms & Validation:**
- react-hook-form 7.71.1 - Form handling
- zod 4.3.6 - Schema validation
- sonner 2.0.7 - Toasts

## Configuration

**Environment:**
- `.env` files not committed to repository
- No environment configuration detected in codebase

**Build:**
- `tsconfig.json` - TypeScript config (target: ES2017, paths: `@/*` → `./src/*`)
- `next.config.ts` - Minimal Next.js config (currently empty)
- `postcss.config.mjs` - PostCSS config for Tailwind 4
- `eslint.config.mjs` - ESLint flat config using `eslint-config-next`

**Tailwind CSS:**
- v4 uses CSS-first configuration in `globals.css`
- `@tailwindcss/postcss` plugin for PostCSS integration

## Platform Requirements

**Development:**
- Node.js 20+
- npm for package management

**Production:**
- Vercel (planned - implied by TODO for Vercel Postgres)
- Edge runtime compatible

---

*Stack analysis: 2026-02-13*
