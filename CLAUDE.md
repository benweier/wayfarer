# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wayfarer is a React-based web interface for the SpaceTraders API v2, built with modern React patterns emphasizing Suspense and concurrent features.

## Key Commands

```bash
# Development
pnpm dev              # Start dev server on port 8080
pnpm build            # Production build
pnpm check            # Run all checks (lint, test, build)

# Testing & Quality
pnpm test             # Unit tests with Vitest
pnpm lint             # ESLint + Stylelint  
pnpm tc               # TypeScript check
```

## Architecture

### Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Routing**: TanStack Router (file-based in `/src/routes/conf/`)
- **State**: Zustand (auth), Jotai (atoms), TanStack Query (server state)
- **Styling**: TailwindCSS 4.x + CSS modules
- **Forms**: React Hook Form + Valibot validation
- **UI**: Radix UI primitives with custom implementations

### Code Organization

#### Feature-Based Structure
```
src/features/
├── ship/           # Ship management 
├── waypoint/       # Waypoint operations
├── contract/       # Contract handling
├── auth/           # Authentication
└── system/         # System exploration
```

Each feature contains: components, actions, hooks, types organized by responsibility.

### Development Patterns

#### State Management
```typescript
// Global auth state (Zustand)
const authStore = createStore<AuthStore>()

// Component atoms (Jotai)
const sidebarAtom = atom(false)

// Server state (TanStack Query)
useQuery({ queryKey: ['ships'], queryFn: getShips })
```

#### Routing
- File-based routing in `/src/routes/conf/`
- Routes are lazy-loaded by default
- Authentication guards via route nesting
- Use route loaders for data prefetching

## SpaceTraders API Integration

- Custom fetcher with automatic auth headers in `/src/services/`
- API types in `/src/types/spacetraders.d.ts`
- Error handling for API-specific formats
- Pagination utilities for list endpoints

## Testing

- Unit tests: Vitest + Testing Library
- Test utilities in `/test/utilities/`
- E2E tests: Playwright (see `playwright.config.ts`)
- Always test user interactions, not implementation details

## Code Quality

- ESLint with TypeScript, React, a11y rules
- Stylelint for CSS
- Strict TypeScript configuration
- Pre-commit hooks via Husky
