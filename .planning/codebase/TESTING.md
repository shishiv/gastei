# Testing Patterns

**Analysis Date:** 2026-02-13

## Test Framework

**Status:** No test framework currently configured

**Recommended:**
- Framework: **Vitest** (Vite-native, Jest-compatible API)
- Config file: `vitest.config.ts`
- Install: `npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/dom`

**Current package.json scripts:**
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

**Missing scripts to add:**
```json
{
  "test": "vitest",
  "test:watch": "vitest --watch",
  "test:coverage": "vitest --coverage"
}
```

## Test File Organization

**Location:** Not yet established

**Recommended structure:**
```
app/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── input.test.tsx      # co-located with component
│   │   └── waitlist/
│   │       ├── waitlist-dialog.tsx
│   │       └── waitlist-dialog.test.tsx
│   ├── hooks/
│   │   ├── use-mobile.ts
│   │   └── use-mobile.test.ts
│   ├── app/
│   │   └── actions/
│   │       ├── waitlist.ts
│   │       └── waitlist.test.ts
│   └── lib/
│       ├── utils.ts
│       └── utils.test.ts
```

**Naming:** `*.test.ts` or `*.test.tsx` for unit tests

## Test Structure

**Recommended pattern:**
```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('ComponentName', () => {
  beforeEach(() => {
    // setup
  });

  afterEach(() => {
    // cleanup
  });

  it('should render correctly', () => {
    // test
  });

  it('should handle user interaction', async () => {
    // async test
  });
});
```

## Mocking

**Framework:** Vitest built-in mocking + `vi`

**Patterns for this codebase:**

**Mock Next.js components:**
```typescript
vi.mock('next/font/google', () => ({
  Inter: () => 'Inter',
}));
```

**Mock UI components (shadcn/ui):**
```typescript
vi.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => children,
  DialogContent: ({ children }: { children: React.ReactNode }) => children,
  DialogHeader: ({ children }: { children: React.ReactNode }) => children,
  DialogTitle: ({ children }: { children: React.ReactNode }) => children,
  DialogDescription: ({ children }: { children: React.ReactNode }) => children,
}));
```

**Mock server actions:**
```typescript
import { joinWaitlist } from '@/app/actions/waitlist';

vi.mock('@/app/actions/waitlist', () => ({
  joinWaitlist: vi.fn(),
}));
```

**Mock window.matchMedia (for useIsMobile):**
```typescript
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

**What to Mock:**
- External dependencies (fonts, analytics)
- Server actions being tested in isolation
- Window/browser APIs (matchMedia, localStorage)
- UI component internals (Radix primitives)

**What NOT to Mock:**
- Component's own logic being tested
- Utility functions being tested directly

## Fixtures and Factories

**Location:** Not yet established

**Recommended: `src/test/fixtures/` or co-located**
```typescript
// fixtures/plans.ts
import type { Plan } from '@/types';

export const mockPlans: Plan[] = [
  {
    id: 'gratis',
    name: 'Gratis',
    price: 0,
    period: '/mes',
    description: 'Perfect to start',
    features: ['30 expenses/month'],
    limits: '30 expenses/month',
  },
];

// fixtures/categories.ts
export const mockCategories = [...]
```

## Coverage

**Requirements:** Not yet established

**Recommended targets:**
- Overall: 70%+ 
- Components: 80%+
- Utilities/hooks: 90%+

**View coverage:**
```bash
npx vitest --coverage
```

## Test Types

**Unit Tests:**
- Utilities: `cn()` function in `src/lib/utils.ts`
- Hooks: `useIsMobile()`, `useReducedMotion()`
- Types: validation schemas

**Integration Tests:**
- Server actions: `joinWaitlist()` with Zod validation
- Component + action integration: form submission flow

**E2E Tests:**
- Not configured
- Recommended: Playwright for full browser testing

## Common Patterns for This Codebase

**Async Testing (Server Actions):**
```typescript
import { joinWaitlist } from '@/app/actions/waitlist';

it('should return success for valid email', async () => {
  const formData = new FormData();
  formData.append('email', 'test@example.com');
  
  const result = await joinWaitlist(null, formData);
  
  expect(result?.success).toBe(true);
});
```

**Error Testing:**
```typescript
it('should return error for invalid email', async () => {
  const formData = new FormData();
  formData.append('email', 'invalid-email');
  
  const result = await joinWaitlist(null, formData);
  
  expect(result?.success).toBe(false);
  expect(result?.message).toContain('invalido');
});
```

**Hook Testing:**
```typescript
import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from './use-mobile';

it('should detect mobile viewport', () => {
  // Mock matchMedia to return true for mobile
  Object.defineProperty(window, 'innerWidth', { value: 375 });
  
  const { result } = renderHook(() => useIsMobile());
  
  expect(result.current).toBe(true);
});
```

---

*Testing analysis: 2026-02-13*
