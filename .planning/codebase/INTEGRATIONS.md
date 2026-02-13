# External Integrations

**Analysis Date:** 2026-02-13

## APIs & External Services

**No external APIs currently integrated.**

The codebase has stub implementations for future integrations:

- **Waitlist API** - Planned: Vercel Postgres or Resend
  - Location: `app/src/app/actions/waitlist.ts`
  - Current: Console log only (`console.log("[waitlist] New entry:", result.data)`)
  - TODO: Persist to Vercel Postgres or send via Resend

## Data Storage

**Databases:**
- None currently integrated
- Planned: Vercel Postgres (per waitlist TODO)

**File Storage:**
- None (static assets only)

**Caching:**
- None

## Authentication & Identity

**Auth Provider:**
- Not implemented
- No auth library detected (no NextAuth, Clerk, Auth0, Supabase Auth)

## Fonts

**Google Fonts:**
- Inter - Loaded via `next/font/google` in `app/src/lib/fonts.ts`

## Monitoring & Observability

**Error Tracking:**
- None configured

**Logs:**
- Console logging only (`console.log` in waitlist action)

## CI/CD & Deployment

**Hosting:**
- Not explicitly configured
- Implied: Vercel (due to Next.js and Vercel Postgres TODO)

**CI Pipeline:**
- None detected (no GitHub Actions, CI config)

## Environment Configuration

**Required env vars:**
- None currently required (no `process.env` usage in code)

**Secrets location:**
- None (no external services integrated)

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None (planned: Resend for waitlist emails)

---

*Integration audit: 2026-02-13*
