# Codebase Concerns

**Analysis Date:** 2026-02-13

## Tech Debt

**Waitlist Data Persistence:**
- Issue: Waitlist form submissions are logged to console only, not persisted to any database
- Files: `app/src/app/actions/waitlist.ts`
- Impact: User waitlist entries are lost on restart; no email marketing integration
- Fix approach: Implement Vercel Postgres integration and Resend for email notifications (as noted in TODO comment)

**Placeholder Pages:**
- Issue: Dashboard and Revogar (consent revocation) pages show placeholder content
- Files: `app/src/app/dashboard/page.tsx`, `app/src/app/revogar/page.tsx`
- Impact: Core functionality is not implemented; users cannot access intended features
- Fix approach: Implement actual dashboard with expense tracking and consent revocation form

**Incomplete WhatsApp Integration:**
- Issue: Marketing copy mentions WhatsApp integration but no actual WhatsApp webhook/API exists
- Files: `app/src/app/page.tsx` (marketing), no backend implementation
- Impact: Core value proposition not delivered
- Fix approach: Implement WhatsApp Business API webhook handler

## Known Bugs

**Hydration Mismatch in useIsMobile:**
- Symptoms: Initial render shows undefined state before correct mobile/desktop value
- Files: `app/src/hooks/use-mobile.ts`
- Trigger: Page load, especially on mobile devices
- Workaround: Components already handle undefined gracefully with fallback to false

**ScrollTrigger Memory Leak Risk:**
- Symptoms: Potential for orphaned ScrollTrigger instances
- Files: `app/src/components/animations/scroll-reveal.tsx`
- Trigger: Rapid navigation or component unmount/remount cycles
- Workaround: Current cleanup filters and kills triggers by element reference but this is fragile

**Lenis Provider Cleanup Issue:**
- Symptoms: GSAP ticker reference may not be properly removed
- Files: `app/src/components/animations/lenis-provider.tsx`
- Trigger: Component unmount
- Workaround: Uses `gsap.ticker.remove(lenis.raf)` but raf is a bound function reference

## Security Considerations

**No Authentication Implementation:**
- Risk: Dashboard page is publicly accessible
- Files: `app/src/app/dashboard/page.tsx`
- Current mitigation: Page shows placeholder; no actual data exposed
- Recommendations: Implement authentication before adding user data

**Waitlist Data Handling:**
- Risk: Form data logged to console in production
- Files: `app/src/app/actions/waitlist.ts`
- Current mitigation: None
- Recommendations: Remove console.log before production deployment; implement proper data storage

**No Rate Limiting:**
- Risk: Waitlist endpoint could be spammed
- Files: `app/src/app/actions/waitlist.ts`
- Current mitigation: None
- Recommendations: Add rate limiting or CAPTCHA

## Performance Bottlenecks

**Multiple Animation Libraries:**
- Problem: Using framer-motion, gsap, lenis, and remotion simultaneously
- Files: `app/package.json`, multiple animation components
- Cause: Each library adds significant bundle size (~50KB+ each)
- Improvement path: Consider consolidating on one animation library; use CSS animations for simple cases

**Remotion Player Bundle:**
- Problem: Lazy-loaded but still adds significant JS bundle
- Files: `app/src/components/remotion/remotion-player.tsx`
- Cause: Video player library is heavy
- Improvement path: Current mobile fallback is good; could further optimize with dynamic imports

**No Code Splitting on Routes:**
- Problem: All routes load together
- Files: `app/src/app/**/page.tsx`
- Cause: Next.js App Router default behavior but no explicit dynamic imports
- Improvement path: Consider using dynamic imports for heavy components (Remotion)

## Fragile Areas

**ScrollReveal Animation Component:**
- Files: `app/src/components/animations/scroll-reveal.tsx`
- Why fragile: ScrollTrigger cleanup logic kills all triggers matching the element, which could affect other triggers
- Safe modification: Use `ScrollTrigger.getById()` with unique IDs instead of filtering all triggers
- Test coverage: No tests exist

**Lenis Smooth Scroll:**
- Files: `app/src/components/animations/lenis-provider.tsx`
- Why fragile: GSAP ticker cleanup with bound function reference is non-standard
- Safe modification: Store the tick function reference separately for proper removal
- Test coverage: No tests exist

**Custom Tailwind Theme:**
- Files: `app/src/app/globals.css`
- Why fragile: Using CSS variables with Tailwind v4; theme is hardcoded in CSS
- Safe modification: Ensure consistent usage across all components
- Test coverage: Visual testing only

## Scaling Limits

**No Database:**
- Current capacity: Zero - no persistence layer
- Limit: Cannot store any user data
- Scaling path: Add Vercel Postgres or similar; implement Prisma/Drizzle ORM

**No Backend API:**
- Current capacity: Single server action (waitlist)
- Limit: Cannot handle complex business logic or integrations
- Scaling path: Build out API routes in `app/src/app/api/`

**Waitlist Storage:**
- Current capacity: In-memory only (console logs)
- Limit: Data lost on restart; no analytics
- Scaling path: Integrate with database and analytics

## Dependencies at Risk

**Zod v4 (4.3.6):**
- Risk: Very new release; may have breaking changes or bugs
- Impact: Schema validation could behave unexpectedly
- Migration plan: Monitor for updates; consider downgrading to v3 if issues arise

**Next.js 16 (16.1.6):**
- Risk: Very new major version; less community support
- Impact: Potential hidden bugs or breaking changes
- Migration plan: Test thoroughly; stay on latest patch versions

**React 19 (19.2.3):**
- Risk: Latest React with new features; potential compatibility issues
- Impact: Some libraries may not fully support React 19 yet
- Migration plan: Monitor library compatibility; use react-dom@19.2.3 consistently

**Remotion (4.0.419):**
- Risk: Video rendering library; version cadence is fast
- Impact: Could fall behind on updates
- Migration plan: Keep updated; Remotion has good backward compatibility

## Missing Critical Features

**WhatsApp Integration:**
- Problem: Core value proposition not implemented
- Blocks: User acquisition; product-market fit validation
- Priority: High

**User Authentication:**
- Problem: No way to identify or secure users
- Blocks: Any user-specific features (dashboard, history, settings)
- Priority: High

**Data Persistence:**
- Problem: No database; all data is transient
- Blocks: Real product functionality
- Priority: High

**Consent Management:**
- Problem: Placeholder revogar (revoke) page
- Blocks: GDPR LGPD compliance
- Priority: Medium

## Test Coverage Gaps

**No Test Files:**
- What's not tested: Zero tests in entire codebase
- Files: N/A - no test files exist
- Risk: Any refactoring could break functionality without detection
- Priority: Critical

**No Test Configuration:**
- What's not tested: No test runner configured
- Files: `app/package.json` (no test scripts), no jest.config.*, no vitest.config.*
- Risk: Cannot add tests without infrastructure setup
- Priority: Critical

**Component Testing:**
- What's not tested: All UI components and pages
- Files: `app/src/components/**/*.tsx`, `app/src/app/**/*.tsx`
- Risk: UI regressions undetected; edge cases not covered
- Priority: High

**Server Action Testing:**
- What's not tested: Waitlist form submission
- Files: `app/src/app/actions/waitlist.ts`
- Risk: Validation bypasses or data corruption undetected
- Priority: High

---

*Concerns audit: 2026-02-13*
